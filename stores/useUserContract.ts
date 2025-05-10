import type { User } from '~/types/user.type'
import { ethers } from 'ethers'
import config from '~/config.json'
import userContract from '~/contracts/UserContract.json'
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

      const contract = new ethers.Contract(
        contractAddr,
        userContract.abi,
        toRaw(walletInfo.signer),
      )

      this.contract = contract

      console.log('Initialized user contract')
    },

    async register(fullName: string, dateOfBirth: number, gender: number) {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      console.log(await this.contract.createUser(
        fullName,
        dateOfBirth,
        gender,
      ))

      console.log('User registered')
    },

    async getUserData() {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      try {
        const userData = await this.contract.getMyUserData()
        console.log(userData)

        const fullName = userData[0]
        const dateOfBirth = new Date(Number(userData[1])).toLocaleDateString()
        const gender = Number(userData[2]) ? Gender.FEMALE : Gender.MALE

        this.user = {
          fullName,
          dateOfBirth,
          gender,
        }

        console.log(this.user)
      }
      catch (err: any) {
        console.log(err)
        throw new Error('User not registered')
      }
    },

    getOtherUserData(userAddr: string) {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      return this.contract.getOtherUserData(userAddr)
    },
  },
})
