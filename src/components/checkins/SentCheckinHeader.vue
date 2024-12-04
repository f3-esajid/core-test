<script setup lang="ts">
// COMPONENTS
import { Button } from 'vue-ui'
import { ListFilter } from 'lucide-vue-next'
import CheckinFilters from '@/components/checkins/CheckinFilters.vue'

// TS
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// PROPS * DATA
const filtersOpen = ref(false)
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
    <div class="grid grid-cols-12 items-center p-4 transition-shadow duration-300">
      <div class="col-span-10">
        <div class="flex items-center gap-2">
          <div class="select-none text-lg">You sent 3 check-ins today!</div>
        </div>
      </div>
      <div class="col-span-2 justify-self-end">
        <Button
          variant="ghost"
          @click="filtersOpen = !filtersOpen"
          :class="{ 'bg-muted': filtersOpen }"
        >
          <div class="flex items-center gap-2">
            FILTER
            <ListFilter />
          </div>
        </Button>
      </div>

      <div v-if="filtersOpen" class="col-span-12 mt-2">
        <CheckinFilters />
      </div>
    </div>
  </div>
</template>
