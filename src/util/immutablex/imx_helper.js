import { ETHTokenType, ImmutableXClient } from '@imtbl/imx-sdk'
import { ethers, providers } from 'ethers'
import Web3 from 'web3'
import config from '../../core/utils/config'

const CONTRACTS = {
  ropsten: {
    starkContractAddress: '0x4527BE8f31E2ebFbEF4fCADDb5a17447B27d2aef',
    registrationContractAddress: '0x6C21EC8DE44AE44D0992ec3e2d9f1aBb6207D864',
  },
  mainnet: {
    starkContractAddress: '',
    registrationContractAddress: '',
  },
}

const IMMUTABLEX_CLIENTS = {}

export class IMXHelper {
  publicApiUrl = ''
  starkContractAddress = ''
  registrationContractAddress = ''

  /**
   * @param {number} chainId
   */
  constructor(chainId) {
    if (chainId == 8) {
      this.publicApiUrl = config.immutableX.Mainnet
      this.starkContractAddress = CONTRACTS.mainnet.starkContractAddress
      this.registrationContractAddress =
        CONTRACTS.mainnet.registrationContractAddress
    }
    if (chainId == 88) {
      this.publicApiUrl = config.immutableX.Rinkeby
      this.starkContractAddress = CONTRACTS.ropsten.starkContractAddress
      this.registrationContractAddress =
        CONTRACTS.ropsten.registrationContractAddress
    }
  }

  /**
   * @param {string | number | undefined} addressOrIndex
   * @param {boolean} alwaysNew
   * @returns {Promise<ImmutableXClient>}
   */
  async getImmutableXClient(addressOrIndex = '', alwaysNew = false) {
    const immutableXClientKey = String(addressOrIndex)

    if (IMMUTABLEX_CLIENTS[immutableXClientKey] && !alwaysNew) {
      return IMMUTABLEX_CLIENTS[immutableXClientKey]
    }

    if (!this.starkContractAddress) {
      throw new Error('Sorry, miss param [starkContractAddress]')
    }
    if (!this.registrationContractAddress) {
      throw new Error('Sorry, miss param [registrationContractAddress]')
    }

    let signer = undefined
    if (addressOrIndex) {
      const web3Provider = new Web3(window.ethereum)
      const provider = new providers.Web3Provider(web3Provider.currentProvider)
      signer = provider.getSigner(addressOrIndex)
    }

    return (IMMUTABLEX_CLIENTS[immutableXClientKey] =
      await ImmutableXClient.build({
        publicApiUrl: this.publicApiUrl,
        signer,
        starkContractAddress: this.starkContractAddress,
        registrationContractAddress: this.registrationContractAddress,
      }))
  }

  /**
   * @param {string} user
   * @param {string} s
   * @returns {Promise<ethers.BigNumber>}
   */
  async getBalanceBySymbol(user, s = 'ETH') {
    if (!user) {
      throw new Error('Sorry, miss param [user]')
    }
    if (!s) {
      throw new Error('Sorry, miss param [s]')
    }

    let balance = ethers.BigNumber.from(0)

    try {
      const imxc = await this.getImmutableXClient()
      const data = await imxc.listBalances({ user })

      if (!data.result) {
        return balance
      }

      for (const item of data.result) {
        if (item.symbol.toUpperCase() != s.toUpperCase()) {
          continue
        }

        balance = balance.add(item.balance)
      }
    } catch (err) {
      console.warn('GetBalanceBySymbol failed: ' + err.message)
    }

    return balance
  }

  /**
   * IMX transfer => Eth transaction
   * @param {any} transfer IMX transfer
   * @returns
   */
  toTransaction(transfer) {
    const timeStampMs = transfer.timestamp.getTime()
    const nonce = this.timestampToNonce(timeStampMs)

    // When it is ETH
    let contractAddress = transfer.token.data.token_address
    if (transfer.token.type == ETHTokenType.ETH) {
      contractAddress = '0x0000000000000000000000000000000000000000'
    }

    const transaction = {
      timeStamp: parseInt(timeStampMs / 1000),
      hash: transfer.transaction_id,
      nonce,
      blockHash: '',
      transactionIndex: 0,
      from: transfer.user,
      to: transfer.receiver,
      value: transfer.token.data.quantity + '',
      txreceipt_status: transfer.status,
      contractAddress,
      confirmations: 0,
    }

    return transaction
  }

  /**
   * The api does not return the nonce value, timestamp(ms) last three number is the nonce
   *  (warnning: there is a possibility of conflict)
   * @param {number | string} timestamp ms
   * @returns {string}
   */
  timestampToNonce(timestamp) {
    let nonce = 0

    if (timestamp) {
      timestamp = String(timestamp)
      const match = timestamp.match(/(\d{3})$/i)
      if (match && match.length > 1) {
        nonce = Number(match[1]) || 0
      }

      if (nonce > 900) {
        nonce = nonce - 100
      }
    }

    return nonce + ''
  }
}
