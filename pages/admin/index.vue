<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

definePageMeta({
  middleware: ['get-user', 'is-admin'],
})

const formSchema = toTypedSchema(z.object({
  walletAddress: z.string(),
  role: z.union([
    z.literal('admin'),
    z.literal('org'),
    z.literal('student'),
  ]),
}))

const form = useForm({
  validationSchema: formSchema,
})

const roleManagerContract = useRoleManagerContract()

const onSubmit = form.handleSubmit(async (values) => {
  await roleManagerContract.setRole(values.walletAddress, values.role)
  console.log('Role assigned successfully!')
})
</script>

<template>
  <div class="container mx-auto min-h-screen">
    <Navbar />
    <div class="py-4 text-3xl">
      Admin
    </div>

    <div>
      <h2 class="text-xl py-2">
        Role management
      </h2>

      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="walletAddress">
          <FormItem>
            <FormLabel>User address</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" placeholder="Ex: 0x78bd..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="role">
          <FormItem>
            <FormLabel>Role</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select a role to assign for this user" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="org">
                    Organization
                  </SelectItem>

                  <SelectItem value="admin">
                    Admin
                  </SelectItem>

                  <SelectItem value="student">
                    Student
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button class="w-full">
          Submit
        </Button>
      </form>
    </div>
  </div>
</template>
