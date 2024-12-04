<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'vue-ui'
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel :default-size="50">
      <div class="flex h-full flex-col">
        <RouterView name="left" />
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel :default-size="50">
      <div class="flex h-full flex-col">
        <RouterView name="right" />
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
