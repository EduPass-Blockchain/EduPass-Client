<script setup lang="ts">
import type { Certificate } from '~/types/certificate.type'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

const { certificate } = defineProps<{
  certificate: Certificate
}>()

const formSchema = toTypedSchema(z.object({
  privacy: z.number(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((fields) => {
  const certificateContract = useCertificateContract()

  if (fields.privacy)
    certificateContract.publicCertificate(certificate.cid)
  else
    certificateContract.privateCertificate(certificate.cid)
})
</script>

<template>
  <Dialog>
    <DialogTrigger class="cursor-pointer" as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Share this certificate?</DialogTitle>
        <DialogDescription>{{ certificate.name }}</DialogDescription>
      </DialogHeader>

      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="privacy">
          <FormItem>
            <FormLabel>Privacy</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="0">
                    Private
                  </SelectItem>

                  <SelectItem :value="1">
                    Public
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button class="w-full">
          Save
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
