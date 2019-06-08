const CertificateNotary = require('Embark/contracts/CertificateNotary');
const Certificate = require('Embark/contracts/Certificate');

function didRevertCorrectly(actualError, expectedError) {
  return actualError.includes(expectedError);
}

let expectedErrorMessages = {
  "owner": "caller is not owner",
  "verifier": "caller cannot verify"
}

let accounts;

config({
  contracts: {
    "CertificateNotary": {},
    "Certificate": {
      args: [
        '$accounts[4]',
        '$accounts[0]',
        "Instition1",
        "Eve Brown",
        "Program A230", 
        "Post-graduate degree",
        false,
        (new Date).getTime()
      ]
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("CertificateNotary", function () {
  this.timeout(0);

  it("Owner can create new certificate contract", async function () {
    let result = await CertificateNotary.methods.createCertificate(
      accounts[2],
      'Instition1',
      'Alice Bond',
      'Program T20',
      'advanced diploma',
      true,
      (new Date).getTime()
      ).send();
      
    let log = result.events.ContractCreated;
    assert.ok(log.returnValues[0]);
  });

  it("non Owner cannot create new certificate contract",async function () {
    try {
    await CertificateNotary.methods.createCertificate(
      accounts[3],
      'Instition2',
      'Bob Smith',
      'Program T30',
      'diploma',
      false,
      (new Date).getTime()
    ).send({from: accounts[1]});
    }catch(error){
      assert.ok(didRevertCorrectly(error.message,expectedErrorMessages["owner"]))
    }
  });

  it("can get array of registered cerificates", async function () {
    let result = await CertificateNotary.methods.getRegisteredCertificates().call()
    assert.ok(result)
  });

})

contract("Certificate", function () {
  this.timeout(0);

  it("verifiers can get certificate details", async function () {
    let result = await Certificate.methods.getCertificateDetails().call();
    let result2 = await Certificate.methods.getCertificateDetails().call({from: accounts[4]});
    assert.deepEqual(result, result2)
  });

  it("non verifier cannot get certificate details", async function () {
    try{
    await Certificate.methods.getCertificateDetails().call({from: accounts[5]});
    }catch(error){
      assert.ok(didRevertCorrectly(error.message,expectedErrorMessages["verifier"]))
    }
  });

  it("Owner can add a new verifier", async function () {
    let result = await Certificate.methods.addVerifier(accounts[3]).send({from: accounts[4]});
    log = result.events.verifierAdded;
    assert.equal(log.returnValues[0], accounts[3])
  });

  it("non Owner cannot add a new verifier", async function () {
    try{
    await Certificate.methods.addVerifier(accounts[1]).send({from: accounts[5]});
    }catch(error){
      assert.ok(didRevertCorrectly(error.message,expectedErrorMessages["owner"]))
    }
  });
})