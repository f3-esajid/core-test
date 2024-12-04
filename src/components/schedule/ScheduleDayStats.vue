<script setup lang="ts">
// COMPONENTS
import { Check } from 'lucide-vue-next'
import { Avatar, AvatarFallback, DonutChart, Tooltip, TooltipTrigger, TooltipContent } from 'vue-ui'

// TS
import { computed } from 'vue'
import { parse, format, isToday, isWeekend } from 'date-fns'
import { parseAndFormatDate } from 'rails-api'
import { getLocalTimeZone, today } from '@internationalized/date'
// PROPS * DATA
const props = defineProps<{
  item: any
}>()

// COMPUTED
const dayName = computed(() => {
  return parseAndFormatDate(props.item.event_date, { targetFormat: 'E' })
})
const eventDate = computed(() => {
  return parse(props.item.event_date, 'yyyy-MM-dd', new Date())
})

const isOnToday = computed(() => {
  return isToday(eventDate.value)
})
const isOnWeekend = computed(() => {
  return isWeekend(eventDate.value)
})

const displayDate = computed(() => {
  if (isOnToday.value) {
    return 'Today'
  } else {
    return format(eventDate.value, 'MMM dd')
  }
})

const textColor = computed(() => {
  return {
    'text-[#4A42B2]': isOnToday.value,
    'text-gray-300': isOnWeekend.value
  }
})

const hasScheduled = computed(() => {
  return props.item.total_count !== 0
})

const progress = computed(() => {
  return (props.item.completed_count / props.item.total_count) * 100
})
const isComplete = computed(() => progress.value === 100)
const data = computed(() => {
  return [
    {
      name: 'Completed',
      total: props.item.completed_count
    },
    {
      name: 'Scheduled',
      total: props.item.planned_count
    }
  ]
})
</script>
<template>
  <div
    class="shrink space-y-1 p-1 text-center"
    :class="{ 'rounded-md border border-[#4A42B2] bg-indigo-50': isOnToday }"
  >
    <div class="text-sm text-muted-foreground" :class="textColor">
      {{ dayName }}
    </div>
    <div>
      <Tooltip :disabled="!hasScheduled">
        <TooltipTrigger class="h-12 w-12">
          <div v-if="!hasScheduled">
            <div class="mx-auto h-10 w-10 rounded-full bg-gray-100"></div>
          </div>
          <template v-else-if="isComplete">
            <Avatar class="bg-emerald-600">
              <AvatarFallback>
                <Check class="text-white" />
              </AvatarFallback>
            </Avatar>
          </template>
          <template v-else>
            <!-- NB: COLORS should be bg-positive, bg-muted -->
            <DonutChart
              class="h-12"
              :valueFormatter="(_) => ''"
              :colors="['#059669', '#F5F7FF']"
              index="name"
              :margin="{ left: 0, right: 0 }"
              :showTooltip="false"
              :showLegend="false"
              :category="'total'"
              :data="data"
            />
          </template>
        </TooltipTrigger>

        <TooltipContent>
          <div>{{ item.total_count }} Scheduled</div>
          <div>{{ item.completed_count }} Completed</div>
          <div>{{ item.missed_count }} Missed</div>
        </TooltipContent>
      </Tooltip>
    </div>
    <div class="text-xs text-muted-foreground" :class="textColor">
      {{ displayDate }}
    </div>
  </div>
</template>
