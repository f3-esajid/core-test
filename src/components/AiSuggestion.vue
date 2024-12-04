<script setup lang="ts">
import { Wand2 } from 'lucide-vue-next'
import { Button } from 'vue-ui'
</script>
<template>
  <div
    class="mx-4 mt-3 inline-flex h-12 items-center justify-start rounded-lg border border-teal-300 bg-teal-50 px-3 py-1.5"
  >
    <div class="shrink grow basis-0 text-sm font-medium leading-normal text-teal-700">
      Introduce yourself
    </div>
    <div class="flex items-center justify-center rounded-md py-1.5">
      <Button
        variant="ghost"
        class="text-teal-700 text-sm font-medium leading-normal flex space-x-2 hover:bg-teal-100 dark:hover:bg-teal-800"
      >
        <Wand2 class="h-4 w-4 inline-block" /> <span>Draft</span></Button
      >
    </div>
  </div>
</template>
