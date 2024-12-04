<script setup lang="ts">
// COMPONENTS
import ScheduleItem from '@/components/schedule/ScheduleItem.vue'

// TS
import { computed, onMounted, ref, type Reactive } from 'vue'
import { partition } from 'lodash'
import { useRouteQueryParam, type PlanBasedAppointmentGroupResource } from 'rails-api'
import { useRouter } from 'vue-router'

// PROPS * DATA
const props = defineProps<{
  items: Reactive<PlanBasedAppointmentGroupResource[]>
  readOnly: boolean
}>()
const router = useRouter()
const { status } = useRouteQueryParam(router, 'status')
const focusedItemId = ref('')

// COMPUTED
const filteredItems = computed(() => {
  if (status.value) {
    return props.items.filter(
      (item: Reactive<PlanBasedAppointmentGroupResource>) => item[`is_${status.value}`]
    )
  } else {
    return props.items
  }
})
const apptsByFormat = computed<
  [Reactive<PlanBasedAppointmentGroupResource>[], Reactive<PlanBasedAppointmentGroupResource>[]]
>(() =>
  partition(
    filteredItems.value,
    (e: Reactive<PlanBasedAppointmentGroupResource>) => e.appointment_format === 'group'
  )
)

// LIFECYCLE
onMounted(() => {
  let breakCheck = false

  for (let group of apptsByFormat.value) {
    for (let item of group) {
      if (item && !item.is_completed) {
        focusedItemId.value = item.id
        breakCheck = true
        break
      }
    }
    if (breakCheck) break
  }
})
</script>
<template>
  <div class="space-y-4" v-if="items.length">
    <div class="text-xs text-muted-foreground" v-if="apptsByFormat[0].length">
      👋 <span class="font-medium"> Group Appointments</span> allow you to reach out to multiple
      patients at once.
    </div>

    <template v-for="item of apptsByFormat[0]" :key="item.id">
      <ScheduleItem
        :item-id="item.id"
        v-model:focusedItemId="focusedItemId"
        :read-only="readOnly"
      />
    </template>

    <div class="text-xs text-muted-foreground" v-if="apptsByFormat[1].length">
      👉 <span class="font-medium"> Individual Appointments </span> help you follow up on
      patient-specific needs.
    </div>

    <template v-for="item in apptsByFormat[1]" :key="item.id">
      <ScheduleItem
        :item-id="item.id"
        v-model:focusedItemId="focusedItemId"
        :read-only="readOnly"
      />
    </template>
  </div>
  <div v-else class="mx-auto space-y-6 p-6 text-center text-lg font-semibold text-muted-foreground">
    <img src="@/assets/calendar.svg" class="mx-auto" />
    <div>You have no scheduled appointments today</div>
  </div>
</template>
