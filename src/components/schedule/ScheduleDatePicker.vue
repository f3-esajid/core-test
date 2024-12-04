<script setup lang="ts">
// COMPONENTS
import { Button, DatePicker } from 'vue-ui'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

// TS
import { computed } from 'vue'
import { useRouteQueryParam } from 'rails-api'
import { today, getLocalTimeZone, toCalendarDate, parseDate } from '@internationalized/date'
import { useRouter } from 'vue-router'

// PROPS * DATA
const router = useRouter()
const { date, update: updateDate, clear: clearDate } = useRouteQueryParam(router, 'date')

const parsedDate = computed(() => {
  if (!date.value) {
    return today(getLocalTimeZone())
  } else {
    return parseDate(date.value.toString())
  }
})

const incrementDate = async () => {
  let calendarDate = toCalendarDate(parsedDate.value)
  updateDate(calendarDate.add({ days: 1 }).toString(), {})
}

const decrementDate = async () => {
  let calendarDate = toCalendarDate(parsedDate.value)
  updateDate(calendarDate.subtract({ days: 1 }).toString(), {})
}
</script>
<template>
  <Button variant="ghost" class="px-1" @click="decrementDate">
    <ChevronLeft />
  </Button>

  <DatePicker :model-value="parsedDate" @update:model-value="updateDate($event.toString(), {})" />

  <Button variant="ghost" class="mr-4 px-1" @click="incrementDate">
    <ChevronRight />
  </Button>

  <Button variant="outline" class="bg-layer-1" @click="clearDate({})"> Today </Button>
</template>
