<script setup lang="ts">
// COMPONENTS
import AppointmentFilters from '@/components/appointment/AppointmentFilters.vue'

// TS
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { usePlanTemplate } from '@f3-esajid/rails-api'
// PROPS * DATA
const props = defineProps<{
  planKey: string
}>()
const { label } = usePlanTemplate(props.planKey)

const target = ref(null)
const targetIsVisible = ref(false)

useIntersectionObserver(
  target,
  ([{ intersectionRatio }]) => {
    targetIsVisible.value = intersectionRatio < 1
  },
  { threshold: [1] }
)
</script>
<template>
  <div
    ref="target"
    class="sticky-header-helper sticky z-10 overflow-hidden bg-layer-0"
    :class="{ 'shadow-md dark:shadow-blue-50/10': targetIsVisible }"
  >
    <div class="grid grid-cols-12 items-center px-8 py-4 transition-shadow duration-300">
      <div class="col-span-10">
        <div class="flex items-center">
          <div class="text-xl">
            {{ label }}
          </div>
        </div>
      </div>
      <div class="col-span-2 text-right"></div>
      <div class="col-span-12 mt-4">
        <AppointmentFilters />
      </div>
    </div>
  </div>
</template>
