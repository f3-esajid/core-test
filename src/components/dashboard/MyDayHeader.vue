<script setup lang="ts">
import { Button } from 'vue-ui'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

type Props = {
  title: string
}
const props = defineProps<Props>()

// todo: expand capabilities for date changes, etc
</script>
<template>
  <div class="col-span-full mx-6 my-5">
    <div class="flex items-center">
      <h3 class="mr-2 inline-block scroll-m-20 text-3xl font-medium tracking-tight">
        {{ props.title }}
      </h3>

      <div class="mx-auto flex-grow"></div>

      <div class="space-x-4">
        <span class="text-xl font-medium">Feb 12th</span>
        <Button variant="outline">Today</Button>
        <ChevronLeft class="inline-block cursor-pointer" />
        <ChevronRight class="inline-block cursor-pointer" />
      </div>
    </div>
  </div>
</template>
