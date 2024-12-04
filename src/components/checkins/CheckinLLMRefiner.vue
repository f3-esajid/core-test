<script setup lang="ts">
import { Badge } from 'vue-ui'
import { useCheckin } from '@f3-esajid/rails-api'
import { Layers } from 'lucide-vue-next'
const props = defineProps<{
  checkinId: string
}>()
const { translations } = useCheckin(props.checkinId)
</script>
<template>
  <div class="mb-2 flex items-center gap-2">
    <Badge
      variant="outline"
      class="bg:text-teal-50/50 cursor-pointer border-teal-300 bg-teal-50 text-teal-600 hover:bg-teal-100/10 hover:text-teal-700 hover:shadow-sm"
    >
      👋 Make it constructive
    </Badge>
    <Badge
      variant="outline"
      class="bg:text-teal-50/50 cursor-pointer border-teal-300 bg-teal-50 text-teal-600 hover:bg-teal-100/10 hover:text-teal-700 hover:shadow-sm"
    >
      😊 Make it friendly
    </Badge>
    <Badge
      variant="outline"
      class="bg:text-teal-50/50 cursor-pointer border-teal-300 bg-teal-50 text-teal-600 hover:bg-teal-100/10 hover:text-teal-700 hover:shadow-sm"
    >
      👔 Make it formal
    </Badge>
    <Badge
      variant="outline"
      class="cursor-pointer text-muted-foreground hover:bg-accent hover:shadow-sm"
    >
      <Layers :size="14" class="mr-1" />More
    </Badge>
  </div>
</template>
