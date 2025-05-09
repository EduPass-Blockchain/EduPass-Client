<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  fullName: z.string(),
  dateOfBirth: z.string().date(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const { handleSubmit, isSubmitting, setFieldValue } = form

const dateOfBirth = ref<DateValue>()
function setDateOfBirthField(value?: DateValue) {
  setFieldValue('dateOfBirth', value?.toString())
}

const onSubmit = handleSubmit((fields) => {
  navigateTo('/dashboard')
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

    <Button class="w-full">
      Register
    </Button>
  </form>
</template>
