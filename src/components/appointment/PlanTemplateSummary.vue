<script setup lang="ts">
// COMPONENTS

// TS
import { usePlanTemplate } from 'rails-api'

const props = defineProps<{
  planKey: string
}>()

const { label, description, steps } = usePlanTemplate(props.planKey)

// PROPS * DATA
</script>
<template>
  <div class="rounded-xl border border-teal-300 bg-teal-50 p-2 p-4 text-teal-600">
    <div class="mb-4 text-xl font-medium">
      {{ label }}
    </div>

    <div class="mb-4">
      {{ description }}
    </div>
    <ul class="list-disc space-y-2 px-4">
      <template v-for="step in steps" :key="step">
        <li class="text-sm">{{ step.description }}</li>
      </template>
    </ul>
  </div>
</template>
