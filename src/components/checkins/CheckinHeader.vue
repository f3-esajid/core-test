<script setup lang="ts">
// COMPONENTS
import { Button } from 'vue-ui'
import { ListFilter } from 'lucide-vue-next'
import CheckinThemePicker from '@/components/checkins/CheckinThemePicker.vue'
import CheckinFilters from '@/components/checkins/CheckinFilters.vue'

// TS
import { computed, ref, type Reactive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { type CheckinResource } from 'rails-api'

// PROPS * DATA
const props = defineProps<{
  items: CheckinResource[]
}>()

const target = ref(null)
const targetIsVisible = ref(false)

useIntersectionObserver(
  target,
  ([{ intersectionRatio }]) => {
    targetIsVisible.value = intersectionRatio < 1
  },
  { threshold: [1] }
)

const filtersOpen = ref(false)

// COMPUTED
const total = computed(() =>
  props.items?.reduce((ret, e: any) => ret + (e.patients?.length || 0), 0)
)
</script>
<template>
  <div
    ref="target"
    class="sticky z-10 overflow-hidden border-t-[1px] border-t-transparent bg-layer-0 px-4"
    style="top: -1px"
    :class="targetIsVisible ? 'shadow-md dark:shadow-blue-50/10' : ''"
  >
    <div class="grid grid-cols-12 items-center p-4 transition-shadow duration-300">
      <div class="col-span-10">
        <div class="flex items-center">
          <div class="select-none text-xl">
            Let's Check-in with {{ total }} Patients Today about
          </div>
          <CheckinThemePicker />
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
