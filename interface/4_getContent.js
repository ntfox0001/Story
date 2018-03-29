let Web3 = require('web3');
var web3 = new Web3();
var provider = new Web3.providers.HttpProvider("http://localhost:7545");

let truffleContract = require('truffle-contract');
let storyChain = truffleContract(require('../build/contracts/StoryChain.json'));
let frontCover = truffleContract(require('../build/contracts/FrontCover.json'));


storyChain.setProvider(provider);
storyChain.defaults({ from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57" });

// storyChain.deployed().then(rt => {
// });

frontCover.setProvider(provider);
frontCover.defaults({from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", gas: 4712388, gasPrice: 100000000000});

storyChain.at("0xf12b5dd4ead5f743c6baa640b0216200e89b60da").then(sc =>{
    sc.content().then(cont =>{
        console.log(cont);
    });
});

// frontCover.deployed().then(fcCtra => {
//     fcCtra.getChildStory("从前有座山", fcCtra.address).then(addr =>{
//         console.log(addr);
//         storyChain.at("addr").getContent().then(cont =>{
//             console.log(cont);
//         });
//     });

// });




