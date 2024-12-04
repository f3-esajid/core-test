<script setup lang="ts">
// COMPONENTS
import { Button } from 'vue-ui'
import { Squircle, Check } from 'lucide-vue-next'

// PROPS * DATA
defineProps<{
  active: boolean
  color: string
  label: string
}>()

const emits = defineEmits<{
  (e: 'toggle'): void
}>()
</script>
<template>
  <Button variant="outline" class="rounded-2xl bg-layer-1 px-4" size="xs" @click="emits('toggle')">
    <div class="flex items-center gap-2">
      <template v-if="active">
        <Check :size="14" />
      </template>
      <template v-else>
        <Squircle :stroke-width="0" :size="14" :class="`text-[${color}]`" :fill="`${color}`" />
      </template>
      <div>{{ label }}</div>
    </div>
  </Button>
</template>
