<script setup lang="ts">
import { Separator } from '~/components/ui/separator'
import { Skeleton } from '~/components/ui/skeleton'

definePageMeta({
  middleware: 'get-user',
})

const route = useRoute()
const { address } = route.params

const userContract = useUserContract()
const { data, error, pending } = await useAsyncData(address as string, () => userContract.getOtherUserData(address as string))
</script>

<template>
  <div class="container mx-auto">
    <Navbar />

    <div v-if="pending">
      <Skeleton class="h-40 w-full" />
    </div>

    <div v-else-if="error || !data">
      <p class="text-red-500 text-center mt-12">
        Failed to fetch user data, maybe the user does not exist or the ID you provided is invalid.
      </p>
    </div>

    <div v-else>
      <h1 class="text-4xl text-primary font-light">
        {{ data.fullName }}
      </h1>
      <h2 class="text-muted-foreground">
        <span class="text-black">
          User address:
        </span> {{ address }}
      </h2>

      <Separator class="mb-4 mt-2" />

      <div class="grid grid-cols-[auto_auto_1fr] gap-4 mb-8">
        <p>{{ data.gender }}</p>
        <Separator orientation="vertical" />
        <p>{{ data.dateOfBirth }}</p>
      </div>

      <Dashboard :address="address as string" />
    </div>
  </div>
</template>
