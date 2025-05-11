<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import * as z from 'zod'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

const formSchema = toTypedSchema(z.object({
  fullName: z.string(),
  dateOfBirth: z.number(),
  gender: z.number().gte(0).lte(1),
}))

const form = useForm({
  validationSchema: formSchema,
})

const ready = ref(true)

const { handleSubmit, isSubmitting, setFieldValue } = form

const dateOfBirth = ref<DateValue>()
function setDateOfBirthField(value?: DateValue) {
  setFieldValue('dateOfBirth', value?.toDate('UTC').getTime())
}

const onSubmit = handleSubmit(async (fields) => {
  ready.value = false

  try {
    const userContract = useUserContract()
    await userContract.register(fields.fullName, fields.dateOfBirth, fields.gender)

    navigateTo('/connect')
    ready.value = true
  }
  catch (error) {
    ready.value = true
    console.error(error)
  }
})

const todayDate = today(getLocalTimeZone())
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="fullName">
      <FormItem>
        <FormLabel>Full name</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" placeholder="Ex: James Bond" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="dateOfBirth">
      <FormItem>
        <FormLabel for="dateOfBirth">
          Date of birth
        </FormLabel>
        <FormControl>
          <DatePicker v-model="dateOfBirth" :disabled="isSubmitting" :max-value="todayDate" :min-value="new CalendarDate(1900, 1, 1)" @update:model-value="setDateOfBirthField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="gender">
      <FormItem>
        <FormLabel>Gender</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem :value="0">
                Male
              </SelectItem>

              <SelectItem :value="1">
                Female
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="w-full" :disabled="!ready">
      Register
    </Button>
  </form>
</template>
