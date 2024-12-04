<script setup lang="ts">
// COMPONENTS
import Messages from '@/components/patientThread/Messages.vue'
import MessageInput from '@/components/patientThread/MessageInput.vue'
import DemographicsMini from '@/components/patient/DemographicsMini.vue'
import AiPreview from '@/components/AiPreview.vue'
import AiMessageFloater from '@/components/AiMessageFloater.vue'
import AiSuggestion from '@/components/AiSuggestion.vue'

// TS
import { ref, type Ref } from 'vue'

// PROPS * DATA
defineProps<{
  patientId: string | Ref<string>
  loading: boolean | Ref<boolean>
}>()

const messageInput = ref<string>('')
const scrollableContent = ref<HTMLElement | null>(null)

type ShowInput = 'ai-preview' | 'message-input'
const inputType = ref<ShowInput>('message-input')
const showSuggestion = ref(true)

const setInputType = (value: ShowInput) => {
  console.debug('setShow', value)
  inputType.value = value
}

const onInsert = async (value: string) => {
  console.debug('onInsert', value)
  messageInput.value = value
  showSuggestion.value = false
  setInputType('message-input')
}
</script>

<template>
  <DemographicsMini
    :scrollableContent="scrollableContent"
    :patient-id="patientId"
    :loading="loading"
    class="bg-background"
  />

  <div class="relative z-50">
    <AiMessageFloater class="absolute top-0 left-0 z-50" />
  </div>

  <div class="overflow-y-auto h-full" ref="scrollableContent">
    <Messages />
  </div>

  <AiSuggestion v-if="showSuggestion" @click="setInputType('ai-preview')" />

  <AiPreview
    :with-prompt="false"
    v-if="inputType === 'ai-preview'"
    @insert="onInsert"
    @discard="setInputType('message-input')"
  />

  <MessageInput :initialText="messageInput" v-if="inputType === 'message-input'" />
</template>
