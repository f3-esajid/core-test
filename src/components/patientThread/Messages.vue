<script setup lang="ts">
import MessageBubble from '@/components/patientThread/MessageBubble.vue'
// import type { Message } from 'rails-schema'
// TODO: Fix once these are real
type Message = {
  body: string
}
import { toRef } from 'vue'

const messages: any[] = [
  {
    id: toRef(87878),
    body: 'How are you feeling this week with your diabetes and hypertension?',
    media_urls: toRef([]),
    created_at: toRef(''),
    delivery_state: toRef(''),
    has_delivery_errors: toRef(false),
    deliver_at: toRef(''),
    conversation_id: toRef(87878),
    auto_reply_to_id: toRef(7878),
    auto_triage_level: toRef(9898),
    current_triage_level: toRef(87878),
    sender: { name: 'Care Manager', id: 87878, role: 'cm' }
  },
  {
    id: toRef(2345),
    body: "Blood sugar's been stable, but my blood pressure was 158/92 yesterday. Feeling a bit stressed.",
    media_urls: toRef([]),
    created_at: toRef(''),
    delivery_state: toRef(''),
    has_delivery_errors: toRef(false),
    deliver_at: toRef(''),
    conversation_id: toRef(87878),
    auto_reply_to_id: toRef(7878),
    auto_triage_level: toRef(9898),
    current_triage_level: toRef(87878),
    sender: { name: 'Patient', id: 87878, role: 'patient' }
  },
  {
    id: toRef(87879),
    body: 'Have you been taking your bp medication? Any changes in diet or exercise this week?',
    media_urls: toRef([]),
    created_at: toRef(''),
    delivery_state: toRef(''),
    has_delivery_errors: toRef(false),
    deliver_at: toRef(''),
    conversation_id: toRef(87878),
    auto_reply_to_id: toRef(7878),
    auto_triage_level: toRef(9898),
    current_triage_level: toRef(87878),
    sender: { name: 'Care Manager', id: 87878, role: 'cm' }
  },
  {
    id: toRef(87880),
    body: 'Yes, taking meds. Been eating more salt lately with work stress. Probably why bp is high.',
    media_urls: toRef([]),
    created_at: toRef(''),
    delivery_state: toRef(''),
    has_delivery_errors: toRef(false),
    deliver_at: toRef(''),
    conversation_id: toRef(87878),
    auto_reply_to_id: toRef(7878),
    auto_triage_level: toRef(9898),
    current_triage_level: toRef(87878),
    sender: { name: 'Patient', id: 87878, role: 'patient' }
  },
  {
    id: toRef(87881),
    body: "Let's schedule a quick telehealth check-in to review your diet and stress management strategies. How's Thursday at 3pm?",
    media_urls: toRef([]),
    created_at: toRef(''),
    delivery_state: toRef(''),
    has_delivery_errors: toRef(false),
    deliver_at: toRef(''),
    conversation_id: toRef(87878),
    auto_reply_to_id: toRef(7878),
    auto_triage_level: toRef(9898),
    current_triage_level: toRef(87878),
    sender: { name: 'Care Manager', id: 87878, role: 'cm' }
  },
  {
    id: toRef(87882),
    body: 'Thursday works. Thanks for checking in.',
    media_urls: toRef([]),
    created_at: toRef(''),
    delivery_state: toRef(''),
    has_delivery_errors: toRef(false),
    deliver_at: toRef(''),
    conversation_id: toRef(87878),
    auto_reply_to_id: toRef(7878),
    auto_triage_level: toRef(9898),
    current_triage_level: toRef(87878),
    sender: { name: 'Patient', id: 87878, role: 'patient' }
  }
]
</script>
<template>
  <div class="px-6 py-1" v-if="!messages.length">
    <div class="flex h-full flex-col items-center justify-center">
      <h3 class="mt-4 text-lg font-medium text-accent">No messages</h3>
      <p class="mt-2 text-accent">It looks like there are no messages to display.</p>
    </div>
  </div>
  <!-- Chat messages area -->
  <div v-else class="h-full space-y-4 pb-4">
    <div class="px-6 py-1">
      <div class="my-2 flex items-center justify-center">
        <div class="w-full border-t border-border"></div>
        <div class="rounded-full border border-border px-4 py-1 text-muted-foreground">
          Yesterday
        </div>
        <div class="w-full border-t border-border"></div>
      </div>
    </div>
    <MessageBubble
      v-for="message in messages"
      :message="message"
      sent="10:10 AM"
      :key="message.id"
      :align="message.sender.role === 'cm' ? 'right' : 'left'"
      class="px-6"
    />
    <div class="px-6 py-1">
      <div class="my-2 flex items-center justify-center">
        <div class="px-4 text-muted-foreground">John Smith consented yesterday</div>
      </div>
    </div>
    <div class="px-6 py-1">
      <div class="my-2 flex items-center justify-center">
        <div class="w-full border-t border-border"></div>
        <div class="rounded-full border border-border px-4 py-1 text-muted-foreground">Today</div>
        <div class="w-full border-t border-border"></div>
      </div>
    </div>
    <div class="px-6 py-1">
      <div class="my-2 flex items-center justify-end">
        <div class="w-full border-t border-red-500"></div>
        <div class="px-4 py-1 text-lg text-red-500">New</div>
      </div>
    </div>
    <MessageBubble
      v-for="message in messages"
      :message="message"
      sent="10:10 AM"
      :key="message.id"
      :align="message.sender.role === 'cm' ? 'right' : 'left'"
      class="px-6"
    />
  </div>
</template>
