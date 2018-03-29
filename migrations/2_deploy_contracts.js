var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var FrontCover = artifacts.require("./FrontCover.sol");
var StoryChain = artifacts.require("./StoryChain.sol");


module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  //deployer.link(ConvertLib, FrontCover);
  deployer.deploy(FrontCover);
  //deployer.link(ConvertLib, StoryChain);
  //deployer.deploy(StoryChain);
};
