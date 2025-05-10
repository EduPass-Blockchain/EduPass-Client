<script setup lang="ts">
import { useWalletInfo } from '~/stores/useWalletInfo'

const hasEthereum = ref(false)
const walletInfo = useWalletInfo()
const userContract = useUserContract()
const isFinishedChecking = ref(false)

onMounted(async () => {
  hasEthereum.value = typeof window !== 'undefined' && !!window.ethereum

  if (hasEthereum.value) {
    try {
      await walletInfo.connect()
    }
    catch (e) {
      console.error(e)
    }

    try {
      await userContract.getUserData()
    }
    catch (e) {
      navigateTo('/register')
    }
  }

  isFinishedChecking.value = true
})
</script>

<template>
  <div v-if="isFinishedChecking" class="text-center min-h-screen flex items-center justify-center select-none">
    <div v-if="!hasEthereum" class="">
      <h1 class="text-2xl mb-2">
        Wallet is not installed
      </h1>
      <p>
        Please install
        <Button variant="link" href="https://metamask.io/" as="a" class="px-0" target="_blank">
          MetaMask
        </Button>
        to connect with EduPass
      </p>
    </div>

    <div v-else-if="!walletInfo.connected">
      <h1 class="text-2xl mb-2">
        Connecting
      </h1>
      <p>After finished setting up your wallet, refresh this page</p>
    </div>

    <div v-else>
      <h1 class="text-2xl mb-2">
        Connected with Ethereum wallet
      </h1>
      <p class="mb-4">
        Address: {{ walletInfo.address }}
      </p>
      <Button as-child>
        <NuxtLink to="/dashboard">
          Go to Dashboard
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
