<script setup lang="ts">
// COMPONENTS
import AppointmentFilterBtn from '@/components/appointment/AppointmentFilterBtn.vue'

// TS
import { useRouter } from 'vue-router'
import { useRouteQueryParam } from 'rails-api'

// PROPS * DATA
const router = useRouter()
const { status, update: updateStatus, clear: clearStatus } = useRouteQueryParam(router, 'status')

function toggleStatus(newStatus: string) {
  if (status.value === newStatus) {
    clearStatus({})
  } else {
    updateStatus(newStatus, {})
  }
}
</script>
<template>
  <div class="flex items-center gap-2 px-4">
    <AppointmentFilterBtn
      :active="status === 'scheduled'"
      label="Not Started"
      color="#52525B"
      @toggle="toggleStatus('scheduled')"
    />
    <AppointmentFilterBtn
      :active="status === 'in_progress'"
      label="In Progress"
      color="#3B82F6"
      @toggle="toggleStatus('in_progress')"
    />
    <AppointmentFilterBtn
      :active="status === 'completed'"
      label="Completed"
      color="#25c15d"
      @toggle="toggleStatus('completed')"
    />
  </div>
</template>
