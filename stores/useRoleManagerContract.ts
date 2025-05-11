import { ethers } from 'ethers'
import config from '~/config.json'
import roleManagerContract from '~/contracts/RoleManagerContract.json'

export const useRoleManagerContract = defineStore('roleManagerContract', {
  state: () => ({
    contract: null as ethers.Contract | null,
    role: 'student' as 'admin' | 'org' | 'student',
  }),

  actions: {
    async initContract() {
      const walletInfo = useWalletInfo()

      if (!walletInfo.address || !walletInfo.provider) {
        throw new Error('Wallet not connected')
      }

      const contractAddr = config.contracts.roleManager.address

      this.contract = new ethers.Contract(
        contractAddr,
        roleManagerContract.abi,
        toRaw(walletInfo.signer),
      )

      console.log('user role:', await this.getRole())

      console.log('Initialized role manager contract')
    },

    async getRole() {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      const walletInfo = useWalletInfo()

      const role = Number(await this.contract.getRole(walletInfo.address))
      this.role = role === 0 ? 'admin' : role === 1 ? 'org' : 'student'
      return this.role
    },

    async setRole(address: string, role: 'admin' | 'org' | 'student') {
      if (!this.contract) {
        throw new Error('Contract not initialized')
      }

      if (role === 'admin')
        return this.contract.setAdminRole(address)
      if (role === 'org')
        return this.contract.setOrganizationRole(address)
      return this.contract.setStudentRole(address)
    },

  },
})
