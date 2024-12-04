<script setup lang="ts">
import { ref } from 'vue'
import { Wand2 } from 'lucide-vue-next'
const expanded = ref(false)
</script>
<template>
  <div class="w-full">
    <div
      class="m-2 min-w-9 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out"
      @click="expanded = !expanded"
      :class="expanded ? 'inset-x-0 w-[97%]' : 'w-9'"
    >
      <div
        class="inline-flex h-9 w-full items-center justify-start gap-2 whitespace-nowrap rounded-lg border border-teal-300 bg-teal-50 p-2 text-teal-600 shadow"
      >
        <Wand2 class="h-4 w-4 flex-shrink-0" /><span class="ml-1"
          >Jane enrolled and consented yesterday
        </span>
      </div>
    </div>
  </div>
</template>
