<script setup lang="ts">
import { Smartphone, BadgeCheck } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipTrigger } from 'vue-ui'
import { parseAndFormatPhone } from 'rails-api'

defineProps<{
  value: string
  verifiedState: string
}>()
</script>
<template>
  <span
    ><Smartphone class="mb-1 inline h-4 w-4" />
    <Tooltip>
      <TooltipTrigger>
        <span class="mx-2">
          {{ parseAndFormatPhone(value) }}
        </span>
      </TooltipTrigger>
      <TooltipContent class="bg-black text-white">
        <p>Phone Number</p>
      </TooltipContent>
    </Tooltip>
    <BadgeCheck v-if="verifiedState === 'verified'" class="mb-1 inline h-4 w-4 text-emerald-600"
  /></span>
</template>
