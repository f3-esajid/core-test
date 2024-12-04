<script setup lang="ts">
import { Button, Textarea } from 'vue-ui'
import { Send } from 'lucide-vue-next'
import { useDynamicTextarea, type DynamicTextareaParams } from '@/composables/useDynamicTextarea'

const props = defineProps<DynamicTextareaParams>()
const { onSubmit, dynamicRows, textInput } = useDynamicTextarea(props)
</script>

<template>
  <div class="relative p-4">
    <Textarea
      v-model="textInput"
      class="rounded-2xl border border-border px-3 py-5"
      :rows="dynamicRows"
      placeholder="Type a message..."
    ></Textarea>

    <Button
      variant="ghost"
      class="absolute bottom-[2rem] right-5 z-10 rounded-md px-3 py-1 font-bold text-primary"
      @click="onSubmit"
    >
      <Send />
    </Button>
  </div>
</template>
