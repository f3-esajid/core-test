<script setup lang="ts">
// COMPONENTS
import CheckinItem from '@/components/checkins/CheckinItem.vue'
import type { CheckinResource } from '@f3-esajid/rails-api'

// TS
import { ref } from 'vue'

// PROPS * DATA
defineProps<{
  items: CheckinResource[]
}>()

const currentCheckinId = ref('')

// METHODS
function handleToggle(id: string) {
  if (currentCheckinId.value == id) {
    currentCheckinId.value = ''
  } else {
    currentCheckinId.value = id
  }
}
</script>
<template>
  <div class="space-y-4">
    <template v-for="item in items" :key="item.id">
      <CheckinItem
        :checkin-id="item.id.toString()"
        :currentCheckinId="currentCheckinId"
        @toggle="handleToggle(item.id.toString())"
      />
    </template>
  </div>
</template>
