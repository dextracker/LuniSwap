import {useLuniPriceContract} from '../hooks/useContract'
import { Contract } from '@ethersproject/contracts'
export class luniPrice{

    public luniPriceContract:Contract|null; 
    constructor(){
        this.luniPriceContract = useLuniPriceContract();
    }

    getTokenToTokenPrice(token1:string, token2:string, amountOutMin:number, amountIn: number){

    }
    swapExactTokenForToken(token1:string, token2:string, amountIn: number){

    }
}