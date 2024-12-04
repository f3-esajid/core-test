<script setup lang="ts">
// COMPONENTS
import CheckinHeader from '@/components/checkins/CheckinHeader.vue'
import CheckinItemList from '@/components/checkins/CheckinItemList.vue'

// TS
import { today, getLocalTimeZone, toCalendarDate } from '@internationalized/date'
import { watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCheckinsStore } from '@/stores/checkins'
import { useCheckinCollection, useRouteQueryParam } from 'rails-api'

// PROPS * DATA
const route = useRoute()
const router = useRouter()

const { date } = useRouteQueryParam(router, 'date')

const { selectedTheme } = storeToRefs(useCheckinsStore())
const { load, items } = useCheckinCollection()

// COMPUTED
const scheduleId = computed(() => route.params.scheduleId)
const parsedDate = computed(
  () => date.value || toCalendarDate(today(getLocalTimeZone())).toString()
)
const requestOpts = computed(() => {
  return {
    smart_fields: {
      presets: ['basic'],
      patients: {
        presets: ['basic']
      }
    },
    theme: selectedTheme.value,
    date: parsedDate.value,
    assignee_id: scheduleId.value
  }
})

// LIFECYCLE
watch(requestOpts, loadSchedule, { immediate: true })

// METHODS
async function loadSchedule() {
  await load({
    data: requestOpts.value
  })
}
</script>
<template>
  <div class="grid h-full grid-cols-12 overflow-hidden rounded-t-2xl">
    <div class="col-span-12 h-full overflow-y-scroll">
      <div class="relative">
        <CheckinHeader :items="items" />
        <div class="grid grid-cols-12 px-8 pb-4">
          <div class="col-span-12">
            <CheckinItemList :items="items" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
