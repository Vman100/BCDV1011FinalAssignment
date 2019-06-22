const ethers = require('ethers');
const certificateNotaryInfo = require('./build/contracts/CertificateNotary.json');
const certificateInfo = require('./build/contracts/Certificate.json');

const provider = ethers.getDefaultProvider("kovan")
let wallet = new ethers.Wallet(process.env.PK, provider)

const certificateNotaryAbi = certificateNotaryInfo.abiDefinition
const certificateAbi = certificateInfo.abiDefinition
const certificateNotaryAddress = "0xEe52B02a3A28e6b15b0495933267d9443f93f30A"

let certificateNotery = new ethers.Contract(certificateNotaryAddress, certificateNotaryAbi, wallet)
let certificate

const createCertificate = async (values) => {
  await certificateNotery.createCertificate(...values, (new Date).getTime())
}
//createCertificate()

const getRegisteredCertificates = async () => {
  let tx = await certificateNotery.getRegisteredCertificates()
  return tx
}
//getRegisteredCertificates()
const setCertificateInterface = (address) => {
  certificate = new ethers.Contract(address, certificateAbi, wallet)
}

const getCertificateDetails = async () => {
  let tx = await certificate.getCertificateDetails()
  return tx
}

const certificateNoteryListener = () => {
  certificateNotery.on("ContractCreated", (newCertificate) => {
    console.log('newCertificate', newCertificate)
  })
}

module.exports = {
  createCertificate, 
  getRegisteredCertificates, 
  setCertificateInterface,
  getCertificateDetails,
  certificateNoteryListener
} 