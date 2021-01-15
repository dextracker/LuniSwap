//import { send } from 'react-ga';
import { Pair, Percent, Trade } from '@uniswap/sdk/dist/entities';
import { Contract } from 'ethers';
// import { Pair, Percent, Trade } from '../../node_modules/@uniswap/sdk/dist/entities';


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
    ttl: number;
    /**
     * The account that should receive the output of the swap.
     */
    recipient: string;
    /**
     * Whether any of the tokens in the path are fee on transfer tokens, which should be handled with special methods
     */
    feeOnTransfer?: boolean;
}
export interface TradeOptionsDeadline extends Omit<TradeOptions, 'ttl'> {
    /**
     * When the transaction expires.
     * This is an atlernate to specifying the ttl, for when you do not want to use local time.
     */
    deadline: number;
}
/**
 * The parameters to use in the call to the Uniswap V2 Router to execute a trade.
 */
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
export declare abstract class OrderListBase {

    constructor();

    static orderListParameters(trade: Trade, options: TradeOptions | TradeOptionsDeadline):SwapParameters;
}


export class OrderListItem {
    constructor(amount:number, data: string, deadline: number, pair: string, price: number, sender: string){
        
        this.data = data;
        this.pair = pair;
        this.deadline = deadline;
        this.price = price;
        this.amount = amount;
        this.sender = sender;
        return this;
    }
    //hashed string of the limit order
    data: string| undefined;

    //token pair for price
    pair: Pair| undefined| string;

    //expiry for limit order
    deadline: number | undefined;

    //price in wei of the limit order
    price: number| undefined;
    //amount of tokens to buy/sell
    amount: number| undefined;
    // address of sender of order
    sender: string| undefined;
}
/**
 * Represents the Order List provided by LuniSwap
 */
export class OrderList{
    public item!: OrderListItem; 
    public orderList: OrderListItem[] = [];
    constructor(orderListContract:Contract|null){      
        //call contract and recursively construct the object from on chain data                           
        return this;
    };
    /**
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
     * @param trade to produce call parameters for
     * @param options options for the call parameters
     */
    public addOrder(listItem:OrderListItem){
        this.orderList.push(listItem);
        return(this.orderList);
    };
    // public removeOrder(listItem:OrderListItem){
    //     this.orderList.(this.orderList.indexOf(listItem));
    //     return(this.orderList);
    // };
}
