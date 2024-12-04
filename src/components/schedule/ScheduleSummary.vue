<script setup lang="ts">
// COMPONENTS
import ScheduleDayStats from '@/components/schedule/ScheduleDayStats.vue'
import { Button } from 'vue-ui'
import { TriangleAlert } from 'lucide-vue-next'

// TS
import { today, getLocalTimeZone } from '@internationalized/date'
import { subDays } from 'date-fns'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDateBasedAppointmentGroupCollection } from 'rails-api'

// PROPS * DATA

const route = useRoute()
const { load, items } = useDateBasedAppointmentGroupCollection()

// COMPUTED
const scheduleId = computed(() => route.params.scheduleId)
const pastWeek = computed(() => {
  const date = today(getLocalTimeZone()).toDate(getLocalTimeZone())
  return getPastWorkingDates(7, date)
})

const missedCount = computed(() => {
  return items.value.reduce((ret, curr) => ret + curr.missed_count, 0)
})

const requestOpts = computed(() => {
  return {
    smart_fields: {
      presets: ['basic']
    },
    assignee_id: scheduleId.value,
    event_dates: pastWeek.value
  }
})

// LIFECYCLE
watch(requestOpts, loadSummary, { immediate: true })

// METHODS
function getPastWorkingDates(numDays: number, fromDate: Date) {
  const workingDates = []
  for (let i = 0; i < numDays; i++) {
    let calendarDate = subDays(fromDate, i)
    workingDates.push(calendarDate.toString())
  }

  return workingDates
}

async function loadSummary() {
  await load({
    data: requestOpts.value
  })
}
</script>
<template>
  <div
    class="rounded-xl border border-border bg-layer-1 px-6 py-4 shadow-lg dark:shadow-blue-50/10"
  >
    <div>
      <h2 class="text-lg font-semibold">Past 7 Days</h2>
    </div>
    <div class="mb-4 mt-2 grid grid-cols-7 items-center gap-0">
      <ScheduleDayStats v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
  <div
    class="mt-4 rounded-xl border border-border bg-layer-1 px-6 py-4 shadow-lg dark:shadow-blue-50/10"
  >
    <div v-if="missedCount > 0" class="text-sm text-muted-foreground">
      <div class="flex items-center">
        <TriangleAlert class="mr-2" />
        You have {{ missedCount }} missed follow-ups remaining.
      </div>
      <div class="flex items-center justify-end">
        <Button variant="ghost" class="text-primary"> Reschedule</Button>
      </div>
    </div>
  </div>
</template>
