pragma solidity >= 0.6 .6;

interface UniswapV2 {


    function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) external returns(uint256 amountA, uint256 amountB, uint256 liquidity);

    function addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) external returns(uint256 amountToken, uint256 amountETH, uint256 liquidity);

    function removeLiquidityETH(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) external returns(uint256 amountToken, uint256 amountETH);

    function removeLiquidity(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) external returns(uint256 amountA, uint256 amountB);

    function swapExactETHForTokens(uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external returns(uint256[] memory amounts);

    function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external returns(uint256[] memory amounts);

    function getAmountsOut(uint amountIn, address[] calldata path) external view returns(uint[] memory amounts);

}

interface ERC20 {
    function totalSupply() external view returns(uint supply);

    function balanceOf(address _owner) external view returns(uint balance);

    function transfer(address _to, uint _value) external returns(bool success);

    function transferFrom(address _from, address _to, uint _value) external returns(bool success);

    function approve(address _spender, uint _value) external returns(bool success);

    function allowance(address _owner, address _spender) external view returns(uint remaining);

    function decimals() external view returns(uint digits);
    event Approval(address indexed _owner, address indexed _spender, uint _value);

    function deposit() external payable;

    function withdraw(uint256 wad) external;
}

contract luniSwap {



    address payable owner;
    address ETH_TOKEN_ADDRESS = address(0x0);

    address uniAddress = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    UniswapV2 usi = UniswapV2(uniAddress);
    
    bytes theBytes;

    address wethAddress = 0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6a;
    ERC20 wethToken = ERC20(wethAddress);
    
    address currentCToken;
    address currentLToken;

    uint256 currentMaxLiq;
    bytes32 currentLoanId;

    modifier onlyOwner() {
        if (msg.sender == owner) _;
    }

    constructor() public payable {
        owner = msg.sender;

    }
    
    fallback() external payable {

    }

    function updateUniAddress(address newAddress) onlyOwner public {
        UniswapV2 usi = UniswapV2(newAddress);
    }




    function performUniswap(address sellToken, address buyToken, uint256 amountSent) public returns(uint256 amounts1) {


        ERC20 sellToken1 = ERC20(sellToken);
        ERC20 buyToken1 = ERC20(buyToken);

       if (sellToken1.allowance(address(this), uniAddress) <= amountSent) {

            sellToken1.approve(uniAddress, 100000000000000000000000000000000000);

       }



        require(sellToken1.balanceOf(address(this)) >= amountSent, "You dont have enough Ctoken to perform this in performUniswap");


        address[] memory addresses = new address[](2);

        addresses[0] = sellToken;
        addresses[1] = buyToken;



        uint256[] memory amounts = performUniswapActual(addresses, amountSent);
        uint256 resultingTokens = amounts[1];
        return resultingTokens;

    }

    function performUniswapActual(address[] memory theAddresses, uint amount) public returns(uint256[] memory amounts1) {



        //uint256  amounts = uniswapContract.getAmountsOut(amount,theAddresses );
        uint256 deadline = 1000000000000000;

        uint256[] memory amounts = usi.swapExactTokensForTokens(amount, 1, theAddresses, address(this), deadline);


        return amounts;

    }



    function performTrade(bool isItEther, uint256 amount1) public returns(uint256) {


        uint256 startingETHBalance = address(this).balance;
        ERC20 tokenToReceive = ERC20(currentCToken);
        uint256 startingCBalance = tokenToReceive.balanceOf(address(this));

        
        uint256 amountBack = 0;
        uint256 newETH = address(this).balance - startingETHBalance;
        wethToken.deposit{value: newETH}();
        amountBack = performUniswap(wethAddress, currentLToken, newETH);

        return amountBack;

    }



    function changeOwner(address payable newOwner) public onlyOwner {
        owner = newOwner;
    }

    function getTokenBalance(address tokenAddress) public view returns(uint256) {
        ERC20 theToken = ERC20(tokenAddress);
        return theToken.balanceOf(address(this));
    }

    function withdraw(address token) public onlyOwner returns(bool) {


    //for ether withdrawal from smart contract
        if (address(token) == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
            uint256 amount = address(this).balance;

        
            uint256 rest = address(this).balance;
            msg.sender.transfer(rest);

        }
        //for ether withdrawal from smart contract. Note on dividing by zero: likely will error.
        else {
            ERC20 tokenToken = ERC20(token);
            uint256 tokenBalance = tokenToken.balanceOf(address(this));
            uint256 newTokenBalance = tokenToken.balanceOf(address(this));
            require(tokenToken.transfer(msg.sender, (newTokenBalance)));

        }



        return true;
    }


    function kill() virtual public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
}