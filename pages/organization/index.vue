<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import config from '~/config.json'

definePageMeta({
  middleware: ['get-user', 'is-organization'],
})

const formSchema = toTypedSchema(z.object({
  recipientAddress: z.string(),
  name: z.string(),
  courseName: z.string().optional(),
  grade: z.number().optional(),
  description: z.string().optional(),
  file: z.instanceof(File),
}))

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const req = axios.create({
  baseURL: config['backend-host'],
})

const certificateContract = useCertificateContract()
const walletInfo = useWalletInfo()

const onSubmit = handleSubmit(async (values) => {
  const formData = new FormData()
  formData.append('file', values.file)

  const imageCid = (await req.post('/ipfs/upload-image', formData)).data

  const certificateData = {
    issuedBy: walletInfo.address,
    name: values.name,
    courseName: values.courseName,
    grade: values.grade,
    description: values.description,
    image: imageCid,
    issuedAt: Date.now(),
  }

  const jsonCid = (await req.post('/ipfs/upload-json', certificateData)).data

  await certificateContract.createCertificate(values.recipientAddress, jsonCid)
})
</script>

<template>
  <div class="container mx-auto">
    <Navbar />

    <h1 class="py-4 text-3xl">
      Organization
    </h1>

    <h2 class="text-xl py-2">
      Assign certificate
    </h2>

    <form class="space-y-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="recipientAddress">
        <FormItem>
          <FormLabel>Recipient address</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" placeholder="Ex: 0x78bd..." />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Certificate name</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" placeholder="Ex: Professor Diploma" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="courseName">
        <FormItem>
          <FormLabel>Course name</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" placeholder="Course name" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="grade">
        <FormItem>
          <FormLabel>Grade</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" placeholder="Ex: 3.60" step="0.01" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Certificate description</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" placeholder="Ex: This is a diploma for the professor role" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="file">
        <FormItem>
          <FormLabel>Certificate image</FormLabel>
          <FormControl>
            <Input type="file" v-bind="componentField" placeholder="Ex: This is a diploma for the professor role" accept="image/*" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full" :disabled="isSubmitting">
        Assign new certificate
      </Button>
    </form>
  </div>
</template>
