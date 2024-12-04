<script setup lang="ts">
import ScheduleHeader from '@/components/schedule/ScheduleHeader.vue'
import ScheduleItemList from '@/components/schedule/ScheduleItemList.vue'
import ScheduleSummary from '@/components/schedule/ScheduleSummary.vue'
import { ListLoader } from 'vue-ui'
import { parse, isToday } from 'date-fns'

// TS
import { today, getLocalTimeZone, toCalendarDate } from '@internationalized/date'
import { computed, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlanBasedAppointmentGroupCollection, useRouteQueryParam } from 'rails-api'

// PROPS * DATA
const route = useRoute()
const router = useRouter()
const { load, items, loading } = usePlanBasedAppointmentGroupCollection()
const { date } = useRouteQueryParam(router, 'date')
const todaysDate = ref(toCalendarDate(today(getLocalTimeZone())))

// COMPUTED
const scheduleId = computed(() => route.params.scheduleId)
const parsedDate = computed(() => date.value || todaysDate.value.toString())
const requestOpts = computed(() => {
  return {
    smart_fields: {
      presets: ['basic']
    },
    start_date: parsedDate.value,
    assignee_id: scheduleId.value
  }
})

const readOnly = computed(() => {
  if (date.value) {
    return !isToday(parse(date.value.toString(), 'yyyy-MM-dd', new Date()))
  } else {
    return false
  }
})

watch(requestOpts, loadSchedule, { immediate: true })

// METHODS
async function loadSchedule() {
  await load({
    data: requestOpts.value
  })
}
</script>

<template>
  <div class="grid h-full grid-cols-12 space-x-4 overflow-hidden rounded-t-2xl">
    <div class="col-span-12 h-full overflow-y-auto">
      <div class="relative">
        <ScheduleHeader />

        <div class="h-full overflow-auto">
          <div class="grid grid-cols-12 gap-4 px-8 pb-4">
            <div class="col-span-8">
              <ListLoader :loading="loading">
                <ScheduleItemList :items="items" :read-only="readOnly" />
              </ListLoader>
            </div>
            <div class="col-span-4">
              <ScheduleSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
