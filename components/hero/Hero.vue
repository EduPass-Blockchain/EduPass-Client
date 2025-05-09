<template>
  <div class="@container container min-h-screen flex mx-auto select-none">
    <div class="my-auto px-4">
      <h1 class="text-6xl mb-8 text-primary font-semibold">
        EduPass
      </h1>

      <h2 class="font-semibold text-2xl @sm:text-4xl mb-4">
        The ultimate solution for
        <br>
        <b class="text-primary">digitized certifications</b>
      </h2>

      <h3 class="text-muted-foreground italic mb-6">
        Seamlessly verify and share your credentials with EduPass' cutting-edge digital solution.
      </h3>

      <div class="flex">
        <Button as-child>
          <NuxtLink to="/connect">
            Get started
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
