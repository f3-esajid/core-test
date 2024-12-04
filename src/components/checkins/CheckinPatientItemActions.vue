<script setup lang="ts">
// COMPONENTS
import { X, ArrowUpDown } from 'lucide-vue-next'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from 'vue-ui'

// PROPS * DATA
defineProps<{
  row: any
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <Tooltip>
      <TooltipTrigger>
        <Button variant="ghost" class="p-1"> <ArrowUpDown /> </Button>
      </TooltipTrigger>

      <TooltipContent> Move </TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger>
        <Button variant="ghost" class="p-1"> <X /> </Button>
      </TooltipTrigger>
      <TooltipContent> Remove </TooltipContent>
    </Tooltip>
  </div>
</template>
