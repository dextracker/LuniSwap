import { BigNumber } from '@ethersproject/bignumber'
import {BigNumberish} from 'ethers'
import { Contract, ContractFactory } from '@ethersproject/contracts'
import { JSBI, Percent, Router, SwapParameters, Trade, TradeType } from '@uniswap/sdk'
import { useMemo } from 'react'
import { BIPS_BASE, INITIAL_ALLOWED_SLIPPAGE } from '../constants'
import { getTradeVersion, useV1TradeExchangeAddress } from '../data/V1'
import { useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin, getRouterContract, isAddress, shortenAddress } from '../utils'
import isZero from '../utils/isZero'
import v1SwapArguments from '../utils/v1SwapArguments'
import { useActiveWeb3React } from './index'
import { useLuniClaimContract, useLuniOrderContract, useV1ExchangeContract, useLuniPriceContract } from './useContract'
//import useTransactionDeadline from './useTransactionDeadline'
import useENS from './useENS'
import { Version } from './useToggledVersion'
import {useOrderListContract} from './useContract'
import { luniOrder} from '../data/luniOrder'
//import {luniClaim} from '../data/luniClaim'

import {OrderList} from '../data/OrderList'
//import { luniPrice } from '../data/luniPrice'
// import { LUNIPRICE_BYTECODE} from '../constants/abis/luniprice'
import {utils} from 'ethers'
import {Web3Provider} from '@ethersproject/providers'
import { LUNIORDER_ABI, LUNIORDER_BYTECODE} from '../constants/abis/luniorder'
//import { report } from 'process'
//import DeadlineInput from '../components/DeadlineInput'

export enum OrderListCallbackState {
  INVALID,
  LOADING,
  VALID
}

interface SwapCall {
  contract: Contract
  parameters: SwapParameters | any
}

interface SuccessfulCall {
  call: SwapCall
  gasEstimate: BigNumber
}

interface FailedCall {
  call: SwapCall
  error: Error
}

type EstimatedSwapCall = SuccessfulCall | FailedCall

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */
function useOrderListArgs(
  trade: Trade | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  recipientAddressOrName: string | null ,// the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  deadline: number | null
): SwapCall[] {
  const { account, chainId, library } = useActiveWeb3React()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  // const deadline = useTransactionDeadline()
  
  const v1Exchange = useV1ExchangeContract(useV1TradeExchangeAddress(trade), true)

  return useMemo(() => {
    const tradeVersion = getTradeVersion(trade)
    
    if (!trade || !recipient || !library || !account || !tradeVersion || !chainId || !deadline) return []

    const contract: Contract | null =
      tradeVersion === Version.v2 ? getRouterContract(chainId, library, account) : v1Exchange
    if (!contract) {
      return []
    }

    const swapMethods = []
    // const orderListMethods = []
    // const luniClaimMethods = []
    // const luniOrderMethods = []


    // const data = "";
    // const pair = "";
    // const price = "";
    // const deadline = "";
    // const amount = "";
    
    // const item: OrderListItem = (data:OrderListItem["data"],pair:OrderListItem["pair"],price:OrderListItem["price"],_deadline:OrderListItem["deadline"],amount:OrderListItem["amount"]) =>{
    //     item.data = data;
    //     item.pair = pair;
    //     item.price = price; 
    // };
    switch (tradeVersion) {
      case Version.v2:
        
        swapMethods.push(
          Router.swapCallParameters(trade, {
            feeOnTransfer: false,
            allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
            recipient,
            deadline: deadline
          })
        )
        // luniOrderMethods.push(
        //   LuniOrder.orderListParameters(trade,{
        //     feeOnTransfer: false,
        //     allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
        //     recipient,
        //     deadline: deadline.toNumber()
        //   })
        // )


        //luni order to call later
        //const L_Order = new luniOrder(deadline, trade.route.pairs, trade.inputAmount, trade.outputAmount);
        //claim to add to list
        //const L_Claim = new luniClaim();
        //orderListMethods.push(L_Order);
        //luniClaimMethods.push(L_Claim);
        //luniOrderMethods.push(L_Order);
        //const orderList = new OrderList();
        //const order = new OrderListItem(2,'',2,'',2,'');
        //orderList.addOrder(order);
        //console.log(orderList);

        if (trade.tradeType === TradeType.EXACT_INPUT) {
          swapMethods.push(
            Router.swapCallParameters(trade, {
              feeOnTransfer: true,
              allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
              recipient,
              deadline: deadline
            })
          )
        }
        break
      case Version.v1:
        swapMethods.push(
          v1SwapArguments(trade, {
            allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
            recipient,
            deadline: deadline
          })
        )
        break
    }
    // return swapMethods.map(parameters => ({ parameters, contract })), orderListMethods.map(parameters => ({ parameters, contract })), luniClaimMethods.map(parameters => ({ parameters, contract })))
    return swapMethods.map(parameters => ({ parameters, contract }))
  }, [account, allowedSlippage, chainId, deadline, library, recipient, trade, v1Exchange])
}

interface ILuniSwapOrder{
  order:luniOrder,
  list:OrderList
}

interface ILuniSwap{
  luniOrder:Contract,
  orderList:Contract,
  luniClaim:Contract,
  luniPrice:Contract
}



function makeOrderCallArgs(
  trade: Trade | undefined,
  sender: string | null | undefined,
  luni: Contract | null,
  deadline: BigNumberish |undefined
):ILuniSwapOrder{
  
  const order = new luniOrder(BigNumber.from(123), trade?.route.pairs, trade?.inputAmount, trade?.executionPrice)
  const list = retrieveOrderList(luni)
  return <ILuniSwapOrder>{
    order: order,
    list: list
  }
}

function retrieveOrderList(orderListContract:Contract|null){
  //get the current on chain orderList
  return new OrderList(orderListContract);
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useOrderListCallback(
  trade: Trade | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  deadline:number|null
): { state: OrderListCallbackState; callback: null | (() => Promise<string>); error: string | null } {
  //library is the provider
  const { account, chainId, library } = useActiveWeb3React()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  
  
  const swapCalls = useOrderListArgs(trade, allowedSlippage, recipientAddressOrName, deadline)
  
  const addTransaction = useTransactionAdder()
  

  //creates an object that holds all of the contracts for luniswap
  const orderListContract: Contract | null  = useOrderListContract()  
  const luniClaimContract: Contract | null = useLuniClaimContract()
  const luniOrderContract: Contract | null = useLuniOrderContract()
  const luniPriceContract: Contract | null = useLuniPriceContract()
  
  const luniSwap:ILuniSwap = <ILuniSwap>{
    
    luniOrder: luniOrderContract,
    orderList: orderListContract,
    luniClaim: luniClaimContract,
    luniPrice: luniPriceContract,
  }

  
  
  // luniOrderFactory.deploy(deadline, pair, amount, price)
  
  // let gasTest: Promise<string>;
  // let i: number = 0;
  // if(account){
  //   if(i === 0){
  //   gasTest = testCalls(luniSwap, addTransaction,1, account, library);
  //   console.log("GAS PRICE:   " );
  //   console.log(gasTest);
  //   i += 1
  //   }
  // }
  
  
  //luniSwap.luniOrder.deploy();
  console.log(luniSwap);
  //gets the current on chain order list for luniswap
  const orderList = retrieveOrderList(luniSwap.orderList);  
  //create a object for calling luniswap
  const limitCalls = makeOrderCallArgs(trade, account,orderListContract,'20');
  console.log(orderList);
  console.log(limitCalls);

  //contract.callStatic[methodName](...args, options).then(result =>{
  //
  //})


  

  

  return useMemo(() => {
    if (!trade || !library || !account || !chainId) {
      return { state: OrderListCallbackState.INVALID, callback: null, error: 'Missing dependencies' }
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return { state: OrderListCallbackState.INVALID, callback: null, error: 'Invalid recipient' }
      } else {
        return { state: OrderListCallbackState.LOADING, callback: null, error: null }
      }
    }

    const tradeVersion = getTradeVersion(trade)
    let i: number = 0;
    
    

    return {
      state: OrderListCallbackState.VALID,
      callback: async function onSwap(): Promise<string> {
        if(account){
          if(i === 0){
          await testCalls(luniSwap, addTransaction,1, account, library);
          console.log("GAS PRICE:   ");
          //console.log(gasTest);
          i += 1
          }
        }

        const estimatedCalls: EstimatedSwapCall[] = await Promise.all(
          //useOrderListArgs and map to contract
          swapCalls.map(call => {
            const {
              parameters: { methodName, args, value },
              contract
            } = call
            //checks to see if any tokens have been sent with the transaction
            const options = !value || isZero(value) ? {} : { value }

            //estimates the gas usage of the executing contract
            return contract.estimateGas[methodName](...args, options)
              .then(gasEstimate => {
                return {
                  call,
                  gasEstimate
                }
              })
              .catch(gasError => {
                console.debug('Gas estimate failed, trying eth_call to extract error', call)

                return contract.callStatic[methodName](...args, options)
                  .then(result => {
                    console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
                    return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') }
                  })
                  .catch(callError => {
                    console.debug('Call threw error', call, callError)
                    let errorMessage: string
                    switch (callError.reason) {
                      case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
                      case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
                        errorMessage =
                          'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.'
                        break
                      default:
                        errorMessage = `The transaction cannot succeed due to error: ${callError.reason}. This is probably an issue with one of the tokens you are swapping.`
                    }
                    return { call, error: new Error(errorMessage) }
                  })
              })
          })
        )

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        const successfulEstimation = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall =>
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])
        )

        if (!successfulEstimation) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
          throw new Error('Unexpected error. Please contact support: none of the calls threw an error')
        }

        const {
          call: {
            contract,
            parameters: { methodName, args, value }
          },
          gasEstimate
        } = successfulEstimation

        return contract[methodName](...args, {
          gasLimit: calculateGasMargin(gasEstimate),
          ...(value && !isZero(value) ? { value, from: account } : { from: account })
        })
          .then((response: any) => {
            const inputSymbol = trade.inputAmount.currency.symbol
            const outputSymbol = trade.outputAmount.currency.symbol
            const inputAmount = trade.inputAmount.toSignificant(3)
            const outputAmount = trade.outputAmount.toSignificant(3)

            const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`
            const withRecipient =
              recipient === account
                ? base
                : `${base} to ${
                    recipientAddressOrName && isAddress(recipientAddressOrName)
                      ? shortenAddress(recipientAddressOrName)
                      : recipientAddressOrName
                  }`

            const withVersion =
              tradeVersion === Version.v2 ? withRecipient : `${withRecipient} on ${(tradeVersion as any).toUpperCase()}`

            addTransaction(response, {
              summary: withVersion
            })

            return response.hash
          })
          .catch((error: any) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, methodName, args, value)
              throw new Error(`Swap failed: ${error.message}`)
            }
          })
      },
      error: null
    }
  }, [trade, library, account, chainId, recipient, recipientAddressOrName, swapCalls, addTransaction])
}


// interface addHeadResponse{
//   id: BigNumber,
//   data: string,
//   deadline: BigNumber,
//   amount: BigNumber,
//   price: BigNumber,
//   pair: string,
//   sender: string
// }

async function testCalls(luniSwap:any, addTransaction:any,id:number, recipient:any, library:Web3Provider|undefined){
  //const callID:BigNumber = BigNumber.from(id);
  // const getByID = await luniSwap.orderList.callStatic["get"](callID).then(
  //   (response: any) =>{
  //     //addTransaction(response,{
  //     //  summary: Version.v2
  //     //})
  //     const addHead: addHeadResponse = {
  //       id: BigNumber.from(response[0]),
  //       data: response[1],
  //       deadline: BigNumber.from(response[2]),
  //       amount: BigNumber.from(response[3]),
  //       price: BigNumber.from(response[4]),
  //       pair: response[5],
  //       sender: response[6]
  //     };
      
  //     console.log(addHead)
  //     console.log(response)
  //     return response
  //   }
  // );
  // const options = utils.parseUnits('1000000000000000000',"wei")
  const luniOrderFactory: ContractFactory = new ContractFactory(new utils.Interface(LUNIORDER_ABI),LUNIORDER_BYTECODE, library?.getSigner(recipient).connectUnchecked());
  const gasTx = luniOrderFactory.getDeployTransaction('1603742574',utils.getAddress("0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"),utils.parseUnits('1000000000000000000',"wei"),utils.parseUnits('250000000000000000',"wei"));
  const estGas: any = await library?.estimateGas(gasTx);
  console.log(estGas);
  const gas = BigNumber.from(estGas._hex);
  console.log(gas);
  // luniOrderFactory.estimateGas[methodName](...args, options)
  //             .then(gasEstimate => {
  //               return {
  //                 call,
  //                 gasEstimate
  //               }
  //             })
  
  
  // const contract = await luniOrderFactory.deploy(1603742574,"0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",utils.parseUnits('1000000000000000000',"wei"),utils.parseUnits('250000000000000000',"wei"),[{gasLimit: "50000"}])
  // const contract = await luniOrderFactory.deploy(1603742574,"0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",utils.parseUnits('1000000000000000000',"wei"),utils.parseUnits('250000000000000000',"wei"),{
  //   gasLimit: calculateGasMargin(BigNumber.from(estGas)),
  //   from: recipient
  (function() {
    const _contract = luniOrderFactory.deploy('1603742574',utils.getAddress("0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"),'1000000000000000000','250000000000000000').then((cont) => {
      cont.deployTransaction.wait();
      console.log(cont.deployTransaction);
    }).catch((error) => {
      let hash = error.transactionHash;
      console.log("Failed to deploy in: ", hash)
    });
    
    console.log(_contract);
    // console.log("CONTRACT ADDRESS: " + contract.address);
    // await contract.deployed();

  })();
          
  // })
  
  // ,{
  //   gasLimit: calculateGasMargin(gas),
    
          
  // }
  
  
  
  // console.log("CONTRACT Transaction: " + contract.deployTransaction);
  // contract.deployTransaction.wait();
  // console.log(contract.value());
  
  // const gasOrderList = await luniSwap.orderList.callStatic["objects"]('0').then(
  //   (response: any) =>{
  //     return response
  //   }
  // );
  const gasOrderList = "";

  // const findByData = await luniSwap.orderList.callStatic["findIdForData"]('0').then(
  //   (response: any) =>{
  //     return response
  //   }
  // );
  // console.log(findByData);

  // const luniOrder = await luniSwap.luniOrder.deploy





  // const addOrderToList = await  luniSwap.orderList.callStatic["addHead"]().then(

  // )
  //console.log(getByID)
  console.log("OBJECTS");
  console.log(gasOrderList);
  
  return gasOrderList
}
