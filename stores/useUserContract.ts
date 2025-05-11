import type { User } from '~/types/user.type'
import { ethers } from 'ethers'
import config from '~/config.json'
import userContract from '~/contracts/UserManagerContract.json'
import { Gender } from '~/types/user.type'

export const useUserContract = defineStore('userContract', {
  state: () => ({
    contract: null as ethers.Contract | null,
    user: null as User | null,
  }),

  actions: {
    async initContract() {
      const walletInfo = useWalletInfo()

      if (!walletInfo.address || !walletInfo.provider) {
        throw new Error('Wallet not connected')
      }

      const contractAddr = config.contracts.user.address

      this.contract = new ethers.Contract(
        contractAddr,
        userContract.abi,
        toRaw(walletInfo.signer),
      )

      console.log('Initialized user contract')
    },

    async register(fullName: string, dateOfBirth: number, gender: number) {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      const tx = await this.contract.createUser(
        fullName,
        dateOfBirth,
        gender,
      )
      await tx.wait()

      console.log('User registered')
    },

    async getUserData() {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      try {
        const userData = await this.contract.getCurrentUserData()

        const fullName = userData[0]
        const dateOfBirth = new Date(Number(userData[1])).toLocaleDateString()
        const gender = Number(userData[2]) ? Gender.FEMALE : Gender.MALE

        this.user = {
          fullName,
          dateOfBirth,
          gender,
        }
      }
      catch (err: any) {
        console.log(err)
        throw new Error('User not registered')
      }
    },

    async getOtherUserData(userAddr: string) {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      const user = await this.contract.getOtherUserData(userAddr)

      return {
        fullName: user[0],
        dateOfBirth: new Date(Number(user[1])).toLocaleDateString(),
        gender: user.gender ? Gender.FEMALE : Gender.MALE,
      }
    },

    async listAllNftsOfUser(userAddr: string) {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      const nfts = await this.contract.listAllNftsOfUser(userAddr)

      console.log(nfts)
    },
  },
})
