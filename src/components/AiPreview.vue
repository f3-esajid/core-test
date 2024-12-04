<script setup lang="ts">
import { Button, Textarea } from 'vue-ui'
import { RotateCw } from 'lucide-vue-next'

const mockText = "Wonderful! I'm here if you need anything. Take care, and we'll talk soon!"

const emits = defineEmits<{
  (e: 'insert', value: string): Promise<void>
  (e: 'discard'): Promise<void>
}>()

const props = defineProps<{
  withPrompt?: boolean
}>()

const onInsert = async () => {
  await emits('insert', mockText)
}
</script>
<template>
  <div
    class="mx-4 my-0 mb-4 mt-4 max-h-[8rem] min-h-[8rem] rounded-2xl border border-border bg-accent"
  >
    <!-- Expanding text row -->
    <div class="max-h-20 min-h-20 flex-grow overflow-auto px-4 py-2 text-sm text-teal-700">
      {{ mockText }}
    </div>
    <!-- Fixed size button row -->
    <div class="flex h-8 items-center justify-end space-x-1 px-2">
      <Textarea
        class="h-6 items-center justify-center border-none text-sm font-normal leading-normal text-gray-400"
        placeholder="Ask AI to generate..."
        v-if="props.withPrompt"
      />
      <Button
        variant="ghost"
        class="flex px-2 text-sm font-medium leading-normal text-muted-foreground"
      >
        <RotateCw class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        class="flex px-2 text-sm font-medium leading-normal text-muted-foreground"
        @click="() => emits('discard')"
      >
        Discard
      </Button>
      <Button
        variant="ghost"
        class="flex bg-teal-600 px-2 text-sm font-medium leading-normal text-muted-foreground text-white hover:bg-teal-700 hover:text-white"
        @click="onInsert"
      >
        Insert
      </Button>
    </div>
  </div>
</template>
