let Web3 = require('web3');
var web3 = new Web3();
var provider = new Web3.providers.HttpProvider("http://192.168.1.48:8545");

web3.setProvider(provider);

var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance("0x627306090abaB3A6e1400e9345bC60c78a8BEf57");
console.log(balance.toNumber());
// web3.eth.sendTransaction({
//         from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
//         to: "0x29D290Bc257340d6b7F1AC90F59100c1d6e82489",
//         value: 10000000000000000000
// });
       
var balance2 = web3.eth.getBalance("0x6db0aaf2bd8dc17940347ef8632d8c5476860c60");
console.log(balance2.toNumber());
