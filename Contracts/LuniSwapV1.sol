pragma solidity ^0.7.0;

interface  IUniswap {
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
      external
      returns (uint[] memory amounts);
      
    function WETH() external pure returns(address);
    
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns(uint[] memory amounts);

    function swapExactTokensForTokens(
      uint amountIn,
      uint amountOutMin,
      address[] calldata path,
      address to,
      uint deadline
    ) external returns (uint[] memory amounts);

    function swapTokensForExactTokens(
      uint amountOut,
      uint amountInMax,
      address[] calldata path,
      address to,
      uint deadline
    ) external returns (uint[] memory amounts);
  
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
      external
      payable
      returns (uint[] memory amounts);
  
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
      external
      returns (uint[] memory amounts);
}

interface IERC20{
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract LuniSwapV1 {
    IUniswap uniswap;
    
    constructor(){
        address _uniswap = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
        uniswap = IUniswap(_uniswap);
    }
    
    function swapTokensForEth(address token, uint amountIn,
    uint deadline)
    
    external{
        IERC20(token).transferFrom(msg.sender, address(this), amountIn);
        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = uniswap.WETH();
        IERC20(token).approve(address(uniswap), amountIn);
        
        uint256[] memory amountOutMinEth = uniswap.getAmountsOut(address(this).balance,path);
        uniswap.swapExactTokensForETH(amountIn, amountOutMinEth[1] , path,msg.sender,deadline);
    }
}