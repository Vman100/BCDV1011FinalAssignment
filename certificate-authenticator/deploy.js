const ethers = require('ethers');
const contractInfo = require('./build/contracts/CertificateNotary.json');

let provider = ethers.getDefaultProvider("kovan")
let privateKey = process.env.PK;
let wallet = new ethers.Wallet(privateKey, provider)

let abi = contractInfo.abiDefinition
let bytecode = contractInfo.code
let cf = new ethers.ContractFactory(abi,bytecode, wallet)

async function Deploy() {
  let contract = await cf.deploy()
  await contract.deployed()
  console.log(contract)
}
Deploy()



