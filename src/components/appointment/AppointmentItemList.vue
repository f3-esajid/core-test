<script setup lang="ts">
// COMPONENTS
import { DataTable } from 'vue-ui'
import AppointmentItem from '@/components/appointment/AppointmentItem.vue'

// TS
import { type Reactive } from 'vue'
import type { AppointmentResource } from '@f3-esajid/rails-api'

// PROPS * DATA
defineProps<{
  items: Reactive<AppointmentResource[]>
}>()

const columns = [
  {
    name: 'display_name',
    label: 'Name',
    field: 'name',
    headerClasses: 'text-muted-foreground bg-layer-0'
  },
  {
    name: 'remarks',
    label: 'Remarks',
    field: '',
    headerClasses: 'text-muted-foreground bg-layer-0'
  },
  {
    name: 'care_plan',
    label: 'Care Plan',
    field: '',
    headerClasses: 'text-muted-foreground bg-layer-0'
  },
  {
    name: 'last_contact',
    label: 'Last Contact',
    field: '',
    headerClasses: 'text-muted-foreground bg-layer-0'
  },
  {
    name: 'action_button',
    label: '',
    field: '',
    headerClasses: 'text-muted-foreground bg-layer-0'
  }
]

// COMPUTED
</script>
<template>
  <div class="overflow-hidden rounded-lg border border-border">
    <DataTable :rows="items" :columns="columns" class="rounded-2xl bg-layer-1">
      <template #body-row="{ row }">
        <AppointmentItem :row="row" />
      </template>
    </DataTable>
  </div>
</template>
