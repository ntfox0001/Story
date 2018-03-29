let Web3 = require('web3');
var web3 = new Web3();
var provider = new Web3.providers.HttpProvider("http://localhost:7545");

let truffleContract = require('truffle-contract');
let storyChain = truffleContract(require('../build/contracts/StoryChain.json'));
let frontCover = truffleContract(require('../build/contracts/FrontCover.json'));


frontCover.setProvider(provider);
frontCover.defaults({from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", gas: 4712388, gasPrice: 100000000000});



frontCover.at("0xf12b5dd4ead5f743c6baa640b0216200e89b60da").then(fcCtra => {
     return fcCtra.createChildStory("从前有座山", "0x0").then(rt =>{
         console.log(rt);
     });
});    
frontCover.at("0xf12b5dd4ead5f743c6baa640b0216200e89b60da").then(fcCtra => {
    console.log(fcCtra.address);
    console.log(fcCtra);
    fcCtra.storyChain().then(n=>{
        console.log(n);
    });

});

