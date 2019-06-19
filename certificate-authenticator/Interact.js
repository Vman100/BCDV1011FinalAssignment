const ethers = require('ethers');
const contractInfo = require('./build/contracts/CertificateNotary.json');

let provider = ethers.getDefaultProvider("kovan")
let privateKey = process.env.PK;
let wallet = new ethers.Wallet(privateKey, provider)

let abi = contractInfo.abiDefinition
let contractAddress = "0xEe52B02a3A28e6b15b0495933267d9443f93f30A"
let contract = new ethers.Contract(contractAddress, abi, provider).connect(wallet)

async function createCertificate() {
  let tx = await contract.createCertificate(
    '0xF345d7263648C19D24eDe0E474aFD7fCdbF220f0',
    'IssuerA',
    'StudentA',
    'ProgramA',
    'typeA',
    true,
    (new Date).getTime()
  )
  console.log(tx)
}
//createCertificate()

contract.on("ContractCreated", (newCertificate) => {
  console.log('newCertificate', newCertificate)
})

async function getRegisteredCertificates() {
  let tx = await contract.getRegisteredCertificates()
  console.log(tx)
}
//getRegisteredCertificates()