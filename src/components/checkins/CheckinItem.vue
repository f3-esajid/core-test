<script setup lang="ts">
// COMPONENTS
import { User } from 'lucide-vue-next'
import { Collapsible, CollapsibleContent, Button } from 'vue-ui'

import CheckinPatientList from '@/components/checkins/CheckinPatientList.vue'
import CheckinMessage from '@/components/checkins/CheckinMessage.vue'

// TS
import { ref, computed } from 'vue'
import { useCheckin } from '@f3-esajid/rails-api'
// PROPS * DATA
const props = defineProps<{
  checkinId: string
  currentCheckinId?: string
}>()

const emits = defineEmits<{
  (e: 'toggle'): Promise<void>
}>()
const sent = ref(false)

// COMPUTED
const selected = computed(() => props.checkinId === props.currentCheckinId)
const { title, patients } = useCheckin(props.checkinId)

// METHODS
function send() {
  // eslint-disable-next-line vue/no-mutating-props
  sent.value = true
  emits('toggle')
}
</script>
<template>
  <div
    class="hover:bg-layer-accent w-full rounded-2xl border bg-layer-1 hover:border-border"
    :class="{
      'rounded-t-2xl border-x border-t border-border': selected,
      'bg-positive/30 hover:bg-positive/40': sent
    }"
  >
    <div class="flex h-12 cursor-pointer items-center gap-4" @click.prevent.stop="emits('toggle')">
      <div class="ml-4 flex shrink items-center">
        <div class="text-md mr-1 select-none font-medium">{{ title }}</div>
      </div>
      <div class="flex grow items-center gap-2 text-sm text-muted-foreground">
        <User :size="16" />
        {{ patients.length }}
      </div>
    </div>

    <Collapsible :open="selected">
      <CollapsibleContent>
        <div class="border-border p-4">
          <div class="grid grid-cols-12 gap-x-8">
            <div class="col-span-6">
              <CheckinPatientList :checkin-id="checkinId" />
            </div>
            <div class="col-span-6">
              <CheckinMessage :checkin-id="checkinId" />
            </div>
            <div class="col-span-12 justify-self-end">
              <Button class="m-8" @click.stop="send()"> Approve and Send </Button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
