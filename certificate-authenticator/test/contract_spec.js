const CertificateNotary = require('Embark/contracts/Certificate');

let accounts;

config({

  contracts: {
    "CertificateNotary": {}
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("CertificateNotary", function () {
  this.timeout(0);

  it("set", async function () {
    await CertificateNotary.methods.createCertificate(0xca35b7d915458ef540ade6068dfe2f44e8fa733c,2,3,4,5,6,2).send({from:accounts[0]});
    let result = await SimpleStorage.methods.get().call();
    assert.strictEqual(parseInt(result, 10),0xca35b7d915458ef540ade6068dfe2f44e8fa733c,2,3,4,5,6,2 );
  });

  it("not owner",async function () {
    try {
    await CertificateNotary.methods.createCertificate().send({from:accounts[0]});
    }catch(error){
      let actualError = error.message
      let expectedError = "not Owner"
      assert.ok(actualError.includes(expectedError))
    }
  });


  // it("get", async function () {
  //   try{
  //   await Certificate.methods.getCertificateDetails().call({from:accounts[5]});
  //   }catch(error){
  //     let actualError = error.message
  //     let expectedError = "not caller cannot verify"
  //     assert.ok(actualError.includes(expectedError))
  //   }
  //   console.log('test2')
  // });

//   it("deployed"),async function(){
//     let address = CertificateNotary.options.address;
//     assert.ok(address)
//   }
// });

  it("should have account with balance", async function() {
    let balance = await web3.eth.getBalance(accounts[0]);
    assert.ok(parseInt(balance, 10) > 0);
  });
})