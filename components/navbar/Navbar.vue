<script setup lang="ts">
import { useUserContract } from '~/stores/useUserContract'

const userContract = useUserContract()
</script>

<template>
  <div class="grid grid-cols-[1fr_auto] py-4">
    <div>
      <div class="font-light text-primary">
        EduPass
      </div>
    </div>

    <div>
      User: {{ userContract.user?.fullName }}
    </div>
  </div>
</template>
