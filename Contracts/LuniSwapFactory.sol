pragma solidity ^0.7.0;

import "https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol";


//LuniSwapFactory contract address 0xe65450F9bdB043E5Ffd685d78efb34545489f70e;
contract LuniSwapFactory {
    
    address internal constant UNISWAP_FACTORY_ADDRESS = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    
    UniswapV2Factory public uniswapFactory;
    
    
    constructor() public {
        uniswapFactory = UniswapV2Factory(UNISWAP_FACTORY_ADDRESS);
    }
    
   function getPair(address baseToken, address quoteToken) public view returns (address pair) {
        return uniswapFactory.getPair(baseToken, quoteToken);
   }
}