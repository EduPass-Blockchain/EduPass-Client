import type { ethers } from 'ethers'

export interface WalletInfo {
  address: string | null
  signer: ethers.Signer | null
  provider: ethers.BrowserProvider | null
  connected: boolean
}
