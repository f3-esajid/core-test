<script setup lang="ts">
// COMPONENTS
import NavigationHistory from '@/components/navigation/NavigationHistory.vue'
import GlobalSearch from '@/components/navigation/GlobalSearch.vue'

// TS
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
const route = useRoute()
const hasContextualNavigation = ref(false)

const handleRouteChange = () => {
  hasContextualNavigation.value = route.matched.some(
    (record) => record.components?.contextual_navigation
  )
}

// STATE

// METHODS

// WATCHERS
watch(route, handleRouteChange, {
  immediate: true
})
</script>

<template>
  <nav
    class="ticky top-0 z-10 grid h-12 max-h-12 w-full grid-cols-12 items-center justify-between py-1"
  >
    <div class="col-span-6 col-start-4">
      <div class="flex items-center space-x-4">
        <NavigationHistory />

        <div class="flex-1">
          <GlobalSearch />
        </div>
      </div>
    </div>
  </nav>
</template>
