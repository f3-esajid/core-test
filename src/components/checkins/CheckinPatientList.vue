<script setup lang="ts">
// COMPONENTS
import { DataTable, Tabs, TabsList, TabsContent, TabsTrigger } from 'vue-ui'
import CheckinPatientItem from '@/components/checkins/CheckinPatientItem.vue'
import CheckinPatientTags from '@/components/checkins/CheckinPatientTags.vue'

// TS
import { ref } from 'vue'
import { useCheckin } from 'rails-api'

// PROPS * DATA
const props = defineProps<{
  checkinId: string
}>()

const { patients } = useCheckin(props.checkinId)

const columns = [
  {
    name: 'display_name',
    label: 'Name',
    field: 'display_name'
  }
]
const tab = ref('tags')

// METHODS
function handleOpen() {}
</script>

<template>
  <div>
    <Tabs v-model="tab" class="mb-2">
      <TabsList>
        <TabsTrigger value="tags"> Tag Summary </TabsTrigger>
        <TabsTrigger value="patients"> Patient List </TabsTrigger>
      </TabsList>

      <TabsContent value="tags">
        <CheckinPatientTags />
      </TabsContent>
      <TabsContent value="patients">
        <div class="h-96 overflow-auto rounded-2xl border border-border">
          <div class="grid grid-cols-12 items-center bg-layer-0 p-4 text-sm text-muted-foreground">
            <div class="col-span-3">Name</div>
            <div class="col-span-7">Tags</div>
            <div class="col-span-2"></div>
          </div>
          <DataTable
            class="rounded"
            :rows="patients"
            :columns="columns"
            @row-click="handleOpen"
            hideHeader
          >
            <template #body-row="{ row }">
              <CheckinPatientItem :row="row" />
            </template>
          </DataTable>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
