<script setup lang="ts">
import type { Certificate } from '~/types/certificate.type'
import axios from 'axios'
import { Skeleton } from '~/components/ui/skeleton'
import config from '~/config.json'

const { address } = defineProps<{ address: string }>()

const certificateContract = useCertificateContract()

const { data, error, pending } = await useAsyncData(async () => {
  const certiCids = await certificateContract.getCertificate(address)

  return await Promise.all(
    certiCids.map(async (cid: string) => (await axios.get<Certificate>(`${config['ipfs-domain']}/ipfs/${cid}`)).data),
  )
})
</script>

<template>
  <div v-if="pending">
    <Skeleton class="h-40 w-full" />
  </div>

  <div v-if="error">
    <p class="text-red-500 text-center mt-12">
      Failed to fetch certificates, maybe the user does not exist or the ID you provided is invalid.
    </p>
  </div>

  <div v-if="!pending && !data?.length">
    <p class="text-muted-foreground text-center mt-12">
      No certificates found for this user.
    </p>
  </div>

  <div v-else class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <DashboardDialog v-for="certi in data" :key="certi.image" :certificate="certi">
      <Card>
        <img
          :src="`${config['ipfs-domain']}/ipfs/${certi.image}`"
          class="max-h-40 object-cover"
          alt="Certificate"
        >
        <CardHeader>
          <CardTitle class="text-start">
            {{ certi.name }}
          </CardTitle>
        </CardHeader>
      </Card>
    </DashboardDialog>
  </div>
</template>
