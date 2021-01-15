import { Contract } from '@ethersproject/contracts'
import { CurrencyAmount, Pair, Percent, Price} from '@uniswap/sdk';
//import { LUNIORDER_ABI } from '../constants/abis/luniorder';
import {useLuniOrderContract} from '../hooks/useContract'
import { useActiveWeb3React } from '../hooks'
import { BigNumber } from 'ethers';


export interface SwapParameters {
    /**
     * The method to call on the Uniswap V2 Router.
     */
    methodName: string;
    /**
     * The arguments to pass to the method, all hex encoded.
     */
    args: (string | string[])[];
    /**
     * The amount of wei to send in hex.
     */
    value: string;
}

/**
 * Options for producing the arguments to send call to the router.
 */
export interface TradeOptions {
    /**
     * How much the execution price is allowed to move unfavorably from the trade execution price.
     */
    allowedSlippage: Percent;
    /**
     * How long the swap is valid until it expires, in seconds.
     * This will be used to produce a `deadline` parameter which is computed from when the swap call parameters
     * are generated.
     */
    deadline: number;
    /**
     * The account that should receive the output of the swap.
     */
    recipient: string;
    /**
     * Whether any of the tokens in the path are fee on transfer tokens, which should be handled with special methods
     */
    feeOnTransfer?: boolean;
}
// export declare class LuniOrder {



export class luniOrder {
    public luniOrderContract:Contract|null;
    public deadline:BigNumber|undefined;
    public tokenPair:Pair[]|undefined;
    public amount:CurrencyAmount|undefined;
    public price:Price|undefined;
    constructor(_deadline:BigNumber|undefined,_tokenPair:Pair[]|undefined,_amount:CurrencyAmount|undefined,_price:Price|undefined){
        
        this.luniOrderContract = useLuniOrderContract();
        this.deadline = _deadline;
        this.tokenPair = _tokenPair;
        this.amount = _amount;
        this.price = _price;
        
    }
       

    deployContract(){
        const { account } = useActiveWeb3React()
        console.log(account);
        //const orderContract = new web3.eth.Contract(LUNIORDER_ABI)
    }

    setDeadline(_deadline:BigNumber){}
    checkHash(_deadline:BigNumber,_tokenPair:Pair[],_amount:CurrencyAmount,_price:CurrencyAmount){}
    getDeadline(){}
    getHash(){}
    getOrderPrice(){}
    getQuotePair(){}
}