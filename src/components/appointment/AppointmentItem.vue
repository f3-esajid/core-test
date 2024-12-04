<script setup lang="ts">
// COMPONENTS
import { TableCell, TableRow, Button } from 'vue-ui'
import { Play } from 'lucide-vue-next'
import MiniCarePlanProgress from '@/components/patient/MiniCarePlanProgress.vue'

// TS
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { parseAndFormatDistanceToNow } from 'rails-api'

// PROPS * DATA
const props = defineProps<{
  row: any
}>()
const router = useRouter()
const initiated = computed(() => props.row.status === 'initiated')

function openPatient() {
  router.push({
    name: 'carePlan',
    params: {
      patientId: props.row.patient.id
    }
  })
}
</script>
<template>
  <TableRow class="group items-center border-b hover:shadow-sm dark:hover:shadow-blue-50/50">
    <TableCell class="w-3/12 p-0">
      <div class="flex">
        <div
          class="min-h-full w-[8px] min-w-[8px] shrink"
          :class="{ 'bg-positive': initiated }"
        ></div>
        <div class="grow p-4">
          <div>
            {{ row.patient.display_name }}
          </div>
          <div>
            <span class="text-muted-foreground">{{ row.patient.displayDob }} </span>
          </div>
        </div>
      </div>
    </TableCell>

    <TableCell class="w-4/12">
      <div class="line-clamp-2">
        {{ row.remarks }}
      </div>
    </TableCell>
    <TableCell class="w-2/12">
      <div class="pr-4">
        <MiniCarePlanProgress :patient-id="row.patient.id" />
      </div>
    </TableCell>
    <TableCell class="w-2/12">
      <div class="line-clamp-2">
        {{ parseAndFormatDistanceToNow(row.patient.last_contact) }} ago
      </div>
    </TableCell>

    <TableCell class="w-1/12">
      <template v-if="!initiated">
        <Button class="rounded-full" size="xs" @click="openPatient()">
          <Play fill="#fff" :size="14" />
        </Button>
      </template>
    </TableCell>
  </TableRow>
</template>
