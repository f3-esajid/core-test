<script setup lang="ts">
// COMPONENTS
import { Award } from 'lucide-vue-next'
import { Progress } from 'vue-ui'

// TS
import { usePatient } from 'rails-api'
import { computed } from 'vue'

// PROPS * DATA
const props = defineProps<{
  patientId: string
}>()
const { care_plan_progress } = usePatient(props.patientId)

// COMPUTED
const completed = computed(() => {
  return parseInt(care_plan_progress.value.toString()) >= 3
})
const progress = computed(() => {
  return Math.min(parseInt(care_plan_progress.value.toString()) * 25, 100)
})
</script>
<template>
  <div class="relative">
    <Progress :model-value="progress" primary-color="bg-positive/80" class="h-2 bg-muted" />
    <div
      class="z-1 absolute bottom-1/2 left-1/2 -mb-3 rounded-full bg-layer-1 p-0.5 text-positive shadow-md"
      :class="{ 'bg-positive text-white': completed }"
    >
      <Award :size="20" />
    </div>
  </div>
</template>
