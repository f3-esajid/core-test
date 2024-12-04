<script setup lang="ts">
// COMPONENTS
import AppointmentFilterBtn from '@/components/appointment/AppointmentFilterBtn.vue'

// TS
import { useRouter } from 'vue-router'
import { useRouteFilters } from '@f3-esajid/rails-api'

// PROPS * DATA
const router = useRouter()

const {
  with_status,
  update: updateFilters,
  clear: clearFilters
} = useRouteFilters(router, ['with_status'])

function toggleStatus(newStatus: string) {
  if (with_status.value === newStatus) {
    clearFilters('with_status')
  } else {
    updateFilters({ with_status: newStatus }, {})
  }
}
</script>
<template>
  <div class="flex items-center gap-2">
    <AppointmentFilterBtn
      :active="with_status === 'planned'"
      label="Planned"
      color="#52525B"
      @toggle="toggleStatus('planned')"
    />

    <AppointmentFilterBtn
      :active="with_status === 'initiated'"
      label="Completed"
      color="#25c15d"
      @toggle="toggleStatus('initiated')"
    />

    <AppointmentFilterBtn
      :active="!with_status"
      label="All"
      color="#C7D2FE"
      @toggle="clearFilters('with_status')"
    />
  </div>
</template>
