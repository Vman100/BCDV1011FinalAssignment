const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const contractInterface = require('./Interact')

server.use(bodyParser.json());
server.set('port', 3001);

const prepareData = (data, method) => {
  let params = []
  if (method === 'createCerificate') {
    params.push('studentAddress', 'issuerName', 'studentName', 
    'programName', 'CertificateType', 'isHonors')
  } else if(method === 'addVeifier') {
    params.push('verifierAddress')
  }
  for (let key in data) {
    if (data[key] === '') {
      delete data[key]
    }
  }
  let Args = Object.keys(data)
    .filter(key => params.includes(key))
    .map(key => {
      return key
    })

  let values = Args.map(col => {
    return data[col]
  })
  return {Args, values}
}

server.get('/certificates/:Address', async (req, res) => {
  await contractInterface.setCertificateInterface(req.params.Address)
  let tx = await contractInterface.getCertificateDetails()
	res.send(tx);
});

server.get('/certificateFactory', async (req, res) => {
  let tx = await contractInterface.getRegisteredCertificates()
	res.send(tx);
});

server.post('/certificateFactory', async (req, res) => {
  let cerificateData = prepareData({ ...req.query }, 'createCerificate')
  if(cerificateData.Args.length === 6){
    await contractInterface.createCertificate(cerificateData.values)
    res.send('received');
  } else {
    res.status(400).send("Missing Arguments");
  }
})

contractInterface.certificateNoteryListener()

server.listen(3001);