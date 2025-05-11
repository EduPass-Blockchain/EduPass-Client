<script setup lang="ts">
import { Separator } from '~/components/ui/separator'

definePageMeta({
  middleware: 'get-user',
})

const walletInfo = useWalletInfo()
</script>

<template>
  <div class="container mx-auto min-h-screen px-4">
    <Navbar />

    <h1 class="text-primary text-3xl font-light mb-2">
      Dashboard
    </h1>

    <Separator class="mb-4" />

    <Dashboard :address="walletInfo.address!" />
  </div>
</template>
