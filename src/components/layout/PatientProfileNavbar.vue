<script setup lang="ts">
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-vue-next'
</script>
<template>
  <div class="ml-2 mr-6 mt-3 flex items-center">
    <div><ArrowLeft class="cursor-pointer text-primary" /></div>
    <div class="mx-auto flex-grow"></div>

    <div class="space-x-4">
      <span class="text-muted-foreground">1 of 12</span>
      <ChevronLeft class="inline-block cursor-pointer" />
      <ChevronRight class="inline-block cursor-pointer" />
    </div>
  </div>
</template>
