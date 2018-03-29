let Web3 = require('web3');
var provider = new Web3.providers.HttpProvider("http://localhost:7545");
let truffleContract = require('truffle-contract');
let MetaCoin = truffleContract(require('../build/contracts/MetaCoin.json'));

MetaCoin.setProvider(provider);
MetaCoin.defaults({from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"});

MetaCoin.deployed().then(contract => {
    
    contract.getBalance.call("0x627306090abaB3A6e1400e9345bC60c78a8BEf57").then(rt => {
        console.log(rt.toNumber());
    });
    contract.sendCoin("0xf17f52151EbEF6C7334FAD080c5704D77216b732", 1).then(() => {
        contract.getBalance.call("0xf17f52151EbEF6C7334FAD080c5704D77216b732").then(rt => {
            console.log(rt.toNumber());
        });
    });

    contract.sendCoin("0x29D290Bc257340d6b7F1AC90F59100c1d6e82489", 1, {from:"0xf17f52151EbEF6C7334FAD080c5704D77216b732", gasPrice: 3}).then(() => {
        contract.getBalance.call("0x29D290Bc257340d6b7F1AC90F59100c1d6e82489", {from:"0xf17f52151EbEF6C7334FAD080c5704D77216b732"}).then(rt => {
            console.log(rt.toNumber());
        });
    });
});