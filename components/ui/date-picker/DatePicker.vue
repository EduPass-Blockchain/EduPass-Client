<script setup lang="ts">
import type { DateValue } from '@internationalized/date'

import { DateFormatter } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { toDate } from 'reka-ui/date'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { FormControl } from '~/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/utils'

interface Props {
  minValue?: DateValue
  maxValue?: DateValue
  calendarLabel?: string
  modelValue?: DateValue
  disabled?: boolean
}

defineProps<Props>()

defineEmits<{
  (e: 'update:modelValue', value?: DateValue): void
}>()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <FormControl>
        <Button
          variant="outline" :class="cn(
            'ps-3 text-start font-normal w-full',
            !modelValue && 'text-muted-foreground',
            $attrs.class as string,
          )"
          :disabled="disabled"
          type="button"
        >
          <span>{{ modelValue ? df.format(toDate(modelValue)) : "Pick a date" }}</span>
          <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
        </Button>
        <input hidden>
      </FormControl>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        :model-value="modelValue"
        :calendar-label="calendarLabel"
        :min-value="minValue"
        :max-value="maxValue"
        @update:model-value="(value?: DateValue) => $emit('update:modelValue', value)"
      />
    </PopoverContent>
  </Popover>
</template>
