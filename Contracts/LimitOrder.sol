pragma solidity ^0.4.1;

contract p2pExchange {
    
    // NOTES:
    // Attribute volume to different Dapps using msg.sender vs tx.origin, allowing custom fee structures (think augur/gnosis integration)
    // Partial fills: divisibility of valueA & valueB
    // Token registry (symbol, name, address, decimals)
    // Separate storage from logic
    
    mapping (bytes32 => bool) public claimed;

    event LogClaim(address indexed signer, address indexed taker, bytes32 indexed hash, address tokenA, address tokenB, uint valueA, uint valueB);

    // Expiring limit order
    /// @notice Mutual exchange of `_tokenA` for `_tokenB` between `_signer` (market maker) and `tx.origin` (taker)
    /// @param _v ECDSA signature provided by `_signer`
    /// @param _r ECDSA signature provided by `_signer`
    /// @param _s ECDSA signature provided by `_signer`
    /// @param _signer Address of the market maker
    /// @param _tokenA Address of an ERC20 Token contract
    /// @param _tokenB Address of an ERC20 Token contract
    /// @param _valueA Total units of `_tokenA` offered by `_signer`
    /// @param _valueB Total units of `_tokenB` requested by `_signer`
    /// @param _expiration block number at which the offer provided by `_signer` expires
    /// @return 
    function claim(
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        address _signer,
        address _tokenA,
        address _tokenB,
        uint256 _valueA,
        uint256 _valueB,
        uint256 _expiration
        ) returns(bool success) {

        bytes32 hash = sha3(_signer,_tokenA,_tokenB,_valueA,_valueB,_expiration);

        // verify signature
        if ( !verifySignature(_signer,hash,_v,_r,_s) ) {
            return false;
        }

        // check expiration
        if ( block.number > _expiration ) {
            return false;
        }

        // verify token balances and approvals
        if ( !verifyApproval(_signer,_tokenA,_valueA)
            || !verifyBalance(_signer,_tokenA,_valueA)
            || !verifyApproval(tx.origin,_tokenB,_valueB) 
            || !verifyBalance(tx.origin,_tokenB,_valueB) ) {
            return false;
        }

        // check that offer hasn't already been claimed
        if ( claimed[hash] ) {
            return false;
        }
        claimed[hash] = true;

        // execute transfer of tokens
        /*if ( !Token(_tokenA).transferFrom(_signer,tx.origin,_valueA)
            || !Token(_tokenB).transferFrom(tx.origin,_signer,_valueB) ) {
            throw;
        }*/

        // LogClaim();
        return true;
    }

    function verifySignature(address signer, bytes32 hash, uint8 v, bytes32 r, bytes32 s) constant returns(bool) {
        return ecrecover(hash, v, r, s) == signer;
	}

	function verifyBalance(address owner, address token, uint amount) constant returns(bool) {
	    return true;
	    //return Token(token).balanceOf(owner) >= amount;
	}
	
	function verifyApproval(address owner, address token, uint amount) constant returns(bool) {
	    return true;
	    //return Token(token).allowance(owner,this) >= amount;
	}

}