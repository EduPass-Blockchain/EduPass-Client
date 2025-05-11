<script setup lang="ts">
import type { Certificate } from '~/types/certificate.type'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import config from '~/config.json'

const { certificate } = defineProps<{
  certificate: Certificate
}>()

const userContract = useUserContract()
const issuer = await userContract.getOtherUserData(certificate.issuedBy)

const imgPath = `${config['ipfs-domain']}/ipfs/${certificate.image}`
const issueDate = new Date(Number(certificate.issuedAt)).toLocaleDateString()
</script>

<template>
  <Dialog>
    <DialogTrigger class="cursor-pointer" as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ certificate.name }}</DialogTitle>
        <DialogDescription>
          Issued by: {{ issuer.fullName }}
        </DialogDescription>
      </DialogHeader>

      <img
        :src="imgPath"
        class="max-h-[60vh] object-contain object-center w-full"
      >

      <div class="grid grid-cols-2">
        <div class="h-16">
          <p>Course Name</p>
          <p class="text-muted-foreground">
            {{ certificate.courseName }}
          </p>
        </div>

        <div class="h-16">
          <p>Grade</p>
          <p class="text-muted-foreground">
            {{ certificate.grade }}
          </p>
        </div>

        <div class="h-16">
          <p>Description</p>
          <p class="text-muted-foreground">
            {{ certificate.description }}
          </p>
        </div>

        <div class="h-16">
          <p>Issued At</p>
          <p class="text-muted-foreground">
            {{ issueDate }}
          </p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
