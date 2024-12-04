<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { TooltipProvider, Toaster } from 'vue-ui'
import { useGlobalConfig } from 'rails-api'
const { load: loadGlobalConfig } = useGlobalConfig()

onMounted(async () => {
  // Load global state
  await loadGlobalConfig({
    endpointMethod: 'load',
    data: {
      smart_fields: {
        presets: ['basic'],
        plan_templates: {
          presets: ['basic']
        }
      }
    }
  })
})
</script>

<template>
  <TooltipProvider :delayDuration="250">
    <RouterView />
  </TooltipProvider>
  <Toaster richColors />
</template>
