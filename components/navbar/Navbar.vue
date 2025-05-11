<script setup lang="ts">
import { useUserContract } from '~/stores/useUserContract'

const userContract = useUserContract()
const walletInfo = useWalletInfo()
</script>

<template>
  <div class="grid grid-cols-[1fr_auto] py-4 items-center">
    <div>
      <NuxtLink class="text-primary font-semibold text-xl" to="/">
        EduPass
      </NuxtLink>
    </div>

    <div>
      <NuxtLink :to="`/profile/${walletInfo.address}`">
        {{ userContract.user?.fullName }}
      </NuxtLink>
    </div>
  </div>
</template>
