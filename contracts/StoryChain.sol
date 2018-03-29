pragma solidity ^0.4.2;

import "./ConvertLib.sol";

contract StoryChain {
    string public content;
    uint32 public praise;
    address public parent;
    address[] public children;
    address public frontCover;

    event PraiseCallback(address sender);

    function StoryChain(address _frontCover, string _content, address _parent) public {
        content = _content;
        parent = _parent;
        frontCover = _frontCover;
    }

    function praise() public {
        praise++;
        PraiseCallback(msg.sender);
    }

    function addChild(address _child) public {
        //require(msg.sender == frontCover);

        children.push(address(_child));
    }

    function getInfo() public view returns (string, uint32, address, address[], address) {
        return (content, praise, parent, children, frontCover);
    }
}
