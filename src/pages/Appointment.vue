<script setup lang="ts">
// COMPONENTS
import AppointmentHeader from '@/components/appointment/AppointmentHeader.vue'
import AppointmentItemList from '@/components/appointment/AppointmentItemList.vue'
import PlanTemplateSummary from '@/components/appointment/PlanTemplateSummary.vue'

// TS
import { today, getLocalTimeZone, toCalendarDate } from '@internationalized/date'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppointmentCollection, useRouteQueryParam } from 'rails-api'

// PROPS * DATA
const { load, items } = useAppointmentCollection()

const route = useRoute()
const router = useRouter()

// COMPUTED
const { date } = useRouteQueryParam(router, 'date')
const todaysDate = ref(toCalendarDate(today(getLocalTimeZone())))
const parsedDate = computed(() => date.value || todaysDate.value.toString())

const planKey = computed(() => {
  const filters = route?.query?.filters as any
  return filters.with_plan_template_key
})

const requestOpts = computed(() => {
  const filters = route.query?.filters as any
  return {
    smart_fields: {
      presets: ['basic'],
      patient: {
        presets: ['basic']
      }
    },
    filters: {
      ...filters,
      with_assignee: route.params.scheduleId,
      with_event_date: parsedDate.value
    }
  }
})

// LIFECYCLE
onMounted(async () => {
  loadAppointments()
})
watch(requestOpts, loadAppointments)

// Methods
async function loadAppointments() {
  await load({
    data: requestOpts.value
  })
}
</script>

<template>
  <div class="grid h-full grid-cols-12 space-x-4 overflow-hidden rounded-t-2xl">
    <div class="col-span-12 h-full overflow-y-auto">
      <div class="relative">
        <AppointmentHeader :plan-key="planKey" />

        <div class="h-full overflow-scroll">
          <div class="grid grid-cols-12 gap-4 px-8 pb-4">
            <div class="col-span-8">
              <AppointmentItemList :items="items" />
            </div>
            <div class="col-span-4">
              <PlanTemplateSummary :plan-key="planKey" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
