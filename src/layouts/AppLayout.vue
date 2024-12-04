<script setup lang="ts">
// COMPONENTS
import TopNav from '@/components/navigation/TopNav.vue'
import GlobalLeftNav from '@/components/navigation/GlobalLeftNav.vue'
// TS

// STATE
</script>

<template>
  <main class="absolute inset-0 overflow-hidden bg-indigo-200 dark:bg-slate-800">
    <div class="flex h-full w-full flex-col">
      <div class="shrink-0">
        <TopNav />
      </div>

      <div class="flex flex-grow overflow-auto">
        <GlobalLeftNav />

        <div class="flex min-h-0 min-w-0 flex-grow flex-col rounded-tl-lg bg-layer-0">
          <RouterView />
        </div>
      </div>
    </div>
  </main>
</template>
