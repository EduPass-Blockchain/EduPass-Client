<script setup lang="ts">
definePageMeta({
  middleware: 'get-user',
})
</script>

<template>
  <div class="container mx-auto min-h-screen px-4">
    <Navbar />

    <h1 class="text-primary text-3xl font-light">
      Dashboard
    </h1>
  </div>
</template>
