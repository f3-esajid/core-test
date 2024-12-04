<script setup lang="ts">
// COMPONENTS
import { Button } from 'vue-ui'
import { Plus } from 'lucide-vue-next'
import ScheduleFilters from '@/components/schedule/ScheduleFilters.vue'
import ScheduleDatePicker from '@/components/schedule/ScheduleDatePicker.vue'
import ScheduleContextPicker from '@/components/schedule/ScheduleContextPicker.vue'

// TS
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// PROPS * DATA
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
    class="sticky-header-helper sticky z-10 overflow-hidden bg-layer-0 px-4"
    :class="targetIsVisible ? 'shadow-md dark:shadow-blue-50/10' : ''"
  >
    <div class="grid grid-cols-12 items-center py-4 transition-shadow duration-300">
      <div class="col-span-10">
        <div class="flex items-center">
          <ScheduleContextPicker />
          <ScheduleDatePicker />
        </div>
      </div>
      <div class="col-span-2 text-right">
        <Button variant="outline" class="justify-self-end bg-layer-1">
          <div class="flex items-center">
            <Plus class="mr-2" />
            Add New
          </div>
        </Button>
      </div>
      <div class="col-span-12 mt-4">
        <ScheduleFilters />
      </div>
    </div>
  </div>
</template>
