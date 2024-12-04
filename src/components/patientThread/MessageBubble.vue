<script setup lang="ts">
import { InitialCircle } from 'vue-ui'

// import type { Message } from 'rails-schema'
// TODO: Fix once these are real
type Message = {
  body: string
}

type Props = {
  message: Partial<Message>
  align: 'left' | 'right'
  sent: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'flex-row-reverse': props.align === 'right',
      'justify-start': props.align === 'left'
    }"
    class="mt-2 flex flex-row"
    v-bind="$attrs"
  >
    <div class="mx-1 flex items-end text-sm" v-if="props.align === 'right'">
      <InitialCircle initials="PS" class="bg-gray-200 text-muted-foreground" />
    </div>
    <div
      class="flex max-w-[75%] rounded-3xl p-3"
      :class="{
        'bg-primary text-primary-foreground': props.align === 'right',
        'bg-background': props.align === 'left'
      }"
    >
      {{ props.message?.body }}
    </div>
    <div class="mx-1 flex items-end text-sm text-muted-foreground">{{ props.sent }}</div>
  </div>
</template>
