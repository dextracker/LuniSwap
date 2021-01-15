import { Contract } from '@ethersproject/contracts'
import {useLuniClaimContract} from '../hooks/useContract'
export class luniClaim{
    public luniClaimContract:Contract|null;
    constructor(){
        this.luniClaimContract = useLuniClaimContract();
    }

    claimOrder(contractHash:string){
        
    }
    refundOrder(){
        
    }
    getHash(){

    }
    getDeadline(){

    }
    getTime(){

    }
    checkPrice(){

    }
}