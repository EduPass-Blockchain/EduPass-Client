import { ethers } from 'ethers'
import config from '~/config.json'
import certificateContract from '~/contracts/CertificateContract.json'

export const useCertificateContract = defineStore('certificateContract', {
  state: () => ({
    contract: null as ethers.Contract | null,
  }),

  actions: {
    async initContract() {
      const walletInfo = useWalletInfo()

      if (!walletInfo.address || !walletInfo.provider) {
        throw new Error('Wallet not connected')
      }

      const contractAddr = config.contracts.certificate.address

      this.contract = new ethers.Contract(
        contractAddr,
        certificateContract.abi,
        toRaw(walletInfo.signer),
      )

      console.log('Initialized certificate contract')
    },

    async createCertificate(userAddr: string, tokenUri: string) {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      const tx = await this.contract.createCertificate(userAddr, tokenUri)
      await tx.wait()

      console.log('Certificate created:', tx)
    },

    async getCertificate(userAddr: string) {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      const certiCids = await this.contract.listAllCertificatesOfUser(userAddr)

      return certiCids
    },
  },
})
