pragma solidity ^0.4.4;

library ConvertLib{
	function convert(uint amount,uint conversionRate) public pure returns (uint convertedAmount)
	{
		return amount * conversionRate;
	}

    function Addr2String(address input) internal pure returns (string memory str) {
		bytes memory byteArray = new bytes(20);
		for (uint i = 0; i < 20; i++) {
			byteArray[i] = byte(uint8(uint(input) / (2**(8*(19 - i)))));
		}
		str = string(byteArray);
	}
    function bytes32ToString(bytes32 b32) internal pure returns (string out) {
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = b32[i];
            }
        return string(bytesArray);
    }
    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
    
        assembly {
            result := mload(add(source, 32))
        }
    }
}
