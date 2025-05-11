import type { WalletInfo } from '~/types/wallet-info'
import { ethers } from 'ethers'
import { defineStore } from 'pinia'
import config from '~/config.json'
import { useRoleManagerContract } from '~/stores/useRoleManagerContract'

export class EthereumWalletExtensionNotFoundError extends Error {}

export const useWalletInfo = defineStore('walletInfo', {
  state: () => ({
    address: null,
    signer: null,
    provider: null,
    connected: false,
  }) as WalletInfo,

  actions: {
    async connect() {
      if (!window.ethereum) {
        throw new EthereumWalletExtensionNotFoundError()
      }

      await this.addEthereumChain()

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      this.provider = provider
      this.signer = signer
      this.address = address
      this.connected = true

      const userContract = useUserContract()
      const certificateContract = useCertificateContract()
      const roleManagerContract = useRoleManagerContract()
      await certificateContract.initContract()
      await userContract.initContract()
      await roleManagerContract.initContract()
    },

    async addEthereumChain() {
      try {
        await window.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: config.chain.chainIdHex,
            chainName: 'EduPass Net',
            rpcUrls: config.chain.rpcUrls,
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            blockExplorerUrls: null,
          }],
        })
      }
      catch (e) {
        console.log('Chain already added')
      }
    },

    // async createWallet(provider: ethers.JsonRpcProvider) {
    //   const wallet = ethers.Wallet.createRandom()
    //   const address = wallet.address
    //
    //   wallet.connect(provider)
    //   const signer = await provider.getSigner(address)
    //
    //   this.provider = provider
    //   this.signer = signer
    //   this.address = address
    //   this.connected = true
    // },
  },
})
