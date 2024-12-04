<script setup lang="ts">
// COMPONENTS
import { TableCell, TableRow, Badge } from 'vue-ui'
import CheckinPatientItemActions from '@/components/checkins/CheckinPatientItemActions.vue'

// TS
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { parseAndFormatDistanceToNow } from 'rails-api'

// PROPS * DATA
defineProps<{
  row: any
}>()
const router = useRouter()

const selectedState = ref(false)

// METHODS
function openPatient() {}
function selectPatient() {
  selectedState.value = !selectedState.value
}
</script>
<template>
  <TableRow
    class="group grid cursor-pointer grid-cols-12 items-center border hover:shadow-md dark:hover:shadow-blue-50/50"
    @click.stop="openPatient()"
  >
    <TableCell class="col-span-3">
      <div>
        {{ row.display_name }}

        {{ row.name }}
      </div>

      <div class="text-sm text-muted-foreground">{{ row.displayDob }}</div>
    </TableCell>
    <TableCell class="col-span-7">
      <div class="flex flex-wrap gap-1">
        <Badge variant="outline" v-for="topic in row.topics" :key="topic"> {{ topic }} </Badge>
      </div>
    </TableCell>

    <TableCell class="col-span-2 justify-self-end">
      <div class="block group-hover:hidden">
        {{ parseAndFormatDistanceToNow(row.last_contact) }} ago
      </div>
      <div class="hidden group-hover:block">
        <CheckinPatientItemActions :row="row" />
      </div>
    </TableCell>
  </TableRow>
</template>
