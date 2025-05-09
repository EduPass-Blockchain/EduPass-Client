import type { WalletInfo } from '~/types/wallet-info'
import { ethers } from 'ethers'

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

      const provider = new ethers.BrowserProvider(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      this.provider = provider
      this.signer = signer
      this.address = address
      this.connected = true
    },
  },
})
