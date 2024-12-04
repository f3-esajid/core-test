<script setup lang="ts">
type Props = {
  date: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="px-4 py-1">
    <div class="my-2 flex items-center justify-center">
      <div class="w-full border-t border-gray-300"></div>
      <div class="rounded-full border px-4 py-1 text-gray-500">{{ props.date }}</div>
      <div class="w-full border-t border-gray-300"></div>
    </div>
  </div>
</template>
