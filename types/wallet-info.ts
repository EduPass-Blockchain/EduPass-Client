import type { ethers } from 'ethers'

export interface WalletInfo {
  address: string | null
  signer: ethers.Signer | null
  provider: ethers.Provider | null
  connected: boolean
}
