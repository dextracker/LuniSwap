

import React, { useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

import {  ButtonRed} from '../../components/Button'
// import { useOrderListContract, useLuniSwapContract, useLuniClaimContract, useLuniPriceContract, useLuniOrderContract} from '../../hooks/useContract'
import { useOrderListContract, useLuniClaimContract, useLuniPriceContract, useLuniOrderContract} from '../../hooks/useContract'
import { PaddedColumn } from '../SearchModal/styleds'
import {  Contract, ContractFactory, ethers, utils, Web3Provider } from 'ethers'
import { LUNIORDER_ABI, LUNIORDER_BYTECODE} from '../../constants/abis/luniorder'
import { useActiveWeb3React } from '../../hooks'
import useENS from '../../hooks/useENS'
//import { BigNumber } from '@ethersproject/bignumber'
import {useAllTokens} from '../../hooks/Tokens'
import { ORDERLIST_ABI, ORDERLIST_ADDRESS} from '../../constants/abis/orderlist'
//import { LUNIPRICE_ABI, LUNIPRICE_ADDRESS } from '../../constants/abis/luniprice'
import { Interface } from 'ethers/lib/utils'
import { LUNICLAIM_ABI, LUNICLAIM_BYTECODE } from '../../constants/abis/luniclaim'
//import { luniPrice } from '../../data/luniPrice'
//import { ORDERLIST_ABI, ORDERLIST_BYTECODE } from '../../constants/abis/orderlist'


//import { Token, Pair } from "@uniswap/sdk";

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

interface LuniTransaction {
    recipientAddressOrName: string | null
    deadline: string | null
    input: string | null
    output: string | null
    price: string | null
    token1: string | undefined
    token2: string | undefined
    id: string

}
interface ILuniSwap{
    luniOrder:Contract | null ,
    orderList:Contract | null ,
    luniClaim:Contract | null ,
    luniPrice:Contract | null
}
// interface ByteCode{
//   linkReferences: {};
//   object: string;
//   opcodes: string;
//   sourceMap: string;
// }

var tokenList: {[key: string]: string} = {
    "Dai Stablecoin": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "Uniswap": "0x2404fc115dbcb35dcae5465bd878d155b34017e3",
    "Ether": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "Wrapped Ether": "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
    "Maker": "0x2404fc115dbcb35dcae5465bd878d155b34017e3"

}


function createContractFactory(library:Web3Provider | undefined, recipient: string | null | undefined, ABI:Interface, BYTECODE:string){
    return new ContractFactory(ABI,BYTECODE, library?.getSigner(recipient));
}
//  function orderListTransaction(library:Web3Provider | undefined, recipient: string | null | undefined){
//    return new ContractFactory(new utils.Interface(ORDERLIST_ABI),ORDERLIST_BYTECODE, library?.getSigner(recipient).connectUnchecked());
//  }

function getToken(name: string){

    return tokenList[name];
}

export default function LuniClaimsButton({
    recipientAddressOrName,
    deadline,
    input,
    output,
    token1,
    token2,
    id,

}: LuniTransaction) {
  const { account, chainId, library } = useActiveWeb3React()
  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  let tx: LuniTransaction;
  if( !library || !recipient || !chainId || !account || !deadline){
      tx = {
        recipientAddressOrName : null,
        deadline : null,
        input : null,
        output: null,
        price : null,
        token1 : undefined,
        token2 : undefined,
        id : ""
      }
    console.log(tx)
  }
  else{
    //const pairAddress = Pair.getAddress(new Token(chainId, token1 as string ,18),new Token(chainId, token2?.toString(),18))
    tx = {
        recipientAddressOrName : recipient,
        deadline : deadline,
        input : input,
        output: output,
        price : null,
        token1 : getToken(token1!),
        token2 : getToken(token2!),
        id : "",

      }
  }
  let [sendTransaction, txSendState] = useState(Boolean);

  console.log(sendTransaction, txSendState);

  const orderListContract: Contract | null  = useOrderListContract()
  const luniClaimContract: Contract | null = useLuniClaimContract()
  const luniOrderContract: Contract | null = useLuniOrderContract()
  const luniPriceContract: Contract | null = useLuniPriceContract()


  const luniSwap :ILuniSwap = {

    luniOrder: luniOrderContract,
    orderList: orderListContract,
    luniClaim: luniClaimContract,
    luniPrice: luniPriceContract,
  }
  console.log(luniSwap);
  const tokenList = useAllTokens();
  //const loadedUrlParams = useDefaultsFromURLSearch()
  //const loadedInputCurrency = useCurrency(loadedUrlParams?.inputCurrencyId)
  //const loadedOutputCurrency = useCurrency(loadedUrlParams?.outputCurrencyId)
  return (
          <LabelRow>
              <PaddedColumn gap='20px'>
                <ButtonRed id="createLuniClaims" onClick={async () =>
                    {

                        console.log(tokenList);

                        //luniOrder needs to be deployed for every order
                        const contractFactory = createContractFactory(library, recipient,new utils.Interface(LUNIORDER_ABI),"0x" + LUNIORDER_BYTECODE.object.toString());
                        //luniClaim needs to be deployed for every order
                        const luniClaimFactory = createContractFactory(library, recipient,new utils.Interface(LUNICLAIM_ABI),"0x" + LUNICLAIM_BYTECODE.object.toString());
                        // const orderListTx = orderListTransaction(library, recipient);

                        //need to add order to orderList for every order but not deploy
                        const orderList = new ethers.Contract(ORDERLIST_ADDRESS, ORDERLIST_ABI, library);



                        //const luniPriceTx = new ethers.Contract(LUNIPRICE_ADDRESS,LUNIPRICE_ABI, library);
                        //const luniOrderTx = new ethers.Contract(LUNIORDER_ADDRESS, LUNIORDER_ABI, library);
                        // console.log(contractFactory);
                        // console.log(utils.parseEther(tx.input!).toString());
                        //var price = await luniPriceTx.callStatic.getTokenToTokenPrice(utils.getAddress(tx.token1!),utils.getAddress(tx.token2!),utils.parseEther(tx.input!).toString());
                        // console.log(price);
                        // console.log(tx);
                        //var temp = await orderListTx.callStatic.head();
                        //var temp2 = await orderListTx.callStatic.get(temp);
                        //console.log(temp);
                        //console.log(temp2);
                        //const gasTx: any = await contractFactory.getDeployTransaction(tx.deadline,  utils.getAddress("0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"), utils.parseUnits(tx.input!, 18), utils.parseUnits(tx.output!, 18));
                         
                        //const gasEst: any = await library?.estimateGas(gasTx)
                        //console.log(gasEst);
                        //const gas = await BigNumber.from(gasEst._hex);
                        //console.log(gas);

                        // (function(){
                        //     let inp :string = tx.input!;
                        //     let out :string = tx.output!;

                        //     console.log(tx.token1);
                        //     const _contract = contractFactory.deploy(tx.deadline, utils.getAddress(tx.token1!), utils.parseUnits(inp, 18), utils.parseUnits(out, 18)).then(async (cont) => {
                        //         await cont.deployed();
                        //         console.log(orderListTx);
                        //         console.log(cont.deployTransaction);
                        //         const luniClaimTx = luniClaimFactory.deploy();
                        //         console.log(luniClaimTx);
                        //       }).catch((error) => {
                        //         let hash = error.transactionHash;
                        //         console.log("Failed to deploy in: ", hash)
                        //       });
                        //     console.log(_contract);
                        // })();

                         (async function(){
                           let inp :string = tx.input!;
                           let out :string = tx.output!;
                           let price = ethers.utils.parseEther((Number(inp)/Number(out)).toFixed(10));
                          
                          
                          
                           
                      //     console.log(tx.token1);
                      try{
                          
                           
                           //let wallet = new ethers.Wallet(,library)
                           let _contract = await contractFactory.deploy(tx.deadline, utils.getAddress(tx.token1!), utils.parseUnits(inp, 18), utils.parseUnits(out, 18));
                           await _contract.deployed();
                           
                           console.log(_contract.deployTransaction.hash);
                           let luniOrderContract = new ethers.Contract(_contract.address, LUNIORDER_ABI, library)
                           
                           let luniClaimTx = await luniClaimFactory.deploy(_contract.deployTransaction.hash, tx.recipientAddressOrName, tx.deadline, {value: utils.parseUnits(inp,18)} );                           
                           await luniClaimTx.deployed();
                           //divide base 10
                           let hashedSecret= await luniOrderContract.callStatic.hashedSecret();
                           let temp = utils.parseUnits(inp, 18);
                           console.log(temp);
                           let orderListTx = await orderList.callStatic.addHead(luniOrderContract.callStatic.hashedSecret(), tx.deadline, utils.parseUnits(inp, 18), price,  utils.getAddress(tx.token1!), tx.recipientAddressOrName);
                           //let orderListTx = await orderList.populateTransaction.addHead(hashedSecret, tx.deadline, utils.parseUnits(inp, 18), price,  utils.getAddress(tx.token1!), tx.recipientAddressOrName);
                           //let orderListGas = await library?.estimateGas(orderListTx);
                           console.log(orderListTx);
                           let orderTx = await orderList.populateTransaction.findIdForData(hashedSecret);
                           let orderGas = await library?.estimateGas(orderTx);
                           let order = await orderList.callStatic.findIdForData(luniOrderContract.callStatic.hashedSecret());
                           //let orderCall = await library?.call(order);
                           console.log(orderGas);
                           console.log(order);
                           let o = await orderList.callStatic.get(order);
                           console.log(o);
                      }
                      catch(error){
                        console.log(error)
                      }


                      //         //console.log(cont.deployTransaction);

                      //         //console.log(luniClaimTx);
                      //       //}).catch((error) => {
                      //       //  let hash = error.transactionHash;
                      //       //  console.log("Failed to deploy in: ", hash)
                      //       //});

                      //     let temp = await _contract.deployed();
                      //     console.log(_contract);
                      //     console.log(temp);
                           console.log(orderList);
                           
                           //let temp2 = await luniClaimTx.deployed();
                           //console.log(luniClaimTx);
                           //console.log(temp2);

                       })();
                    }
                }>Create Order</ButtonRed>
              </PaddedColumn>

          </LabelRow>
  )
}
