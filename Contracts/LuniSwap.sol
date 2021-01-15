pragma solidity ^0.7.0;

import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";
import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router01.sol";
//import "https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol";

contract LuniSwap {
    
  address internal constant UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D ;
  address internal constant LUNISWAP_FACTORY_ADDRESS = 0xe65450F9bdB043E5Ffd685d78efb34545489f70e;
  
  //UniswapV2ERC20 token;
  IUniswapV2Router02 public uniswapRouter;
  
  address private multiDaiKovan = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
  address private weth = 0xd0A1E359811322d97991E03f863a0C30C2cF029C;

  constructor() {
    uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
  }

  function convertEthToDai(uint daiAmount) public payable {
    uint deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
    uniswapRouter.swapETHForExactTokens{ value: msg.value }(daiAmount, getPathForETHtoDAI(), address(this), deadline);
    
    // refund leftover ETH to user
    (bool success,) = msg.sender.call{ value: address(this).balance }("");
    require(success, "refund failed");
  }
  
  
   /*Swaps an exact amount of input tokens for as many output tokens as possible, along the route determined by
   the path. The first element of path is the input token, the last is the output token, and any intermediate 
   elements represent intermediate pairs to trade through (if, for example, a direct pair does not exist)*/
  function swapExactTokenForToken(address token1, address token2, uint amountOutMin, uint amountIn) public {
    uint deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!  
    
    uniswapRouter.swapExactTokensForTokens(amountIn, amountOutMin, getPathForTokenToToken(token1,token2), address(this), deadline);
      
      
    (bool success,) = msg.sender.call{ value: address(this).balance }("");
    require(success, "refund failed");
  }
  
  function getEstimatedETHforDAI(uint daiAmount) public view returns (uint[] memory) {
    return uniswapRouter.getAmountsIn(daiAmount, getPathForETHtoDAI());
  }
  
  function getTokenToTokenPrice(address token1, address token2, uint amountIn) public view returns (uint[] memory){
      
      return uniswapRouter.getAmountsOut(amountIn, getPathForTokenToToken(token1,token2));
  }
  

  function getPathForTokenToToken(address token1,address token2) public view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = token1;
    path[1] = token2;
    
    return path;
  }
  function getPathForETHtoDAI() private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = uniswapRouter.WETH();
    path[1] = multiDaiKovan;
    
    return path;
  }
  
  // important to receive ETH
  receive() payable external {}
}