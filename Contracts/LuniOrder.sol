pragma solidity 0.5.6;


contract LuniOrder {
    uint256 public deadline;
    address payable owner;
    address public quoteToken;
    uint public price;
    uint public amount;
    
    modifier onlyOwner() {
        if (msg.sender == address(owner)) _;
    }
    constructor(uint256 _deadline, address _quoteToken, uint _amount, uint _price) public {
    //constructor(){
        
        deadline = _deadline;
        quoteToken = _quoteToken;
        amount = _amount;
        price = _price;
        
        /*
        deadline = 1602872372 ;
        quoteToken = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
        amount = 1000000000000000000;
        price = 250000000000000000;
        */
        owner = msg.sender;
        
    }
    function setDeadline(uint256 _deadline) onlyOwner public{
        deadline = _deadline;
    }
    
    function getDeadline() onlyOwner public view returns (uint256 _deadline){
        return deadline;
    }
    
    
    
    /*function lockTokens() onlyOwner public view{
        
    }*/
}
