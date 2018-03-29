pragma solidity ^0.4.17;

import "./ConvertLib.sol";
import "./StoryChain.sol";
import "./strings.sol";

contract FrontCover {
    using strings for *;
    
    StoryChain public storyChain;
    string public name;
    
    address owner;

    event childCreated(address child);
    
    function FrontCover(string _name) public {
        owner = msg.sender;
        name = _name;
    }

    function createChildStory(string _content, address _parent) public {
        require(owner == msg.sender);

        StoryChain sc = new StoryChain(this, _content, _parent);

        if (_parent == 0)
        {
            storyChain = sc;
        }
        else
        {
            StoryChain parentsc = StoryChain(_parent);
            parentsc.addChild(sc);
        }
        
        childCreated(address(sc));
    }
}