<script setup lang="ts">
// COMPONENTS
import { Badge, Button } from 'vue-ui'

// TS
import { computed } from 'vue'
import { useRoute, RouterLink, type RouteMap } from 'vue-router'
import { type MenuItem } from '@/stores/layout'

// STATE
const props = defineProps<{ menuItem: MenuItem; badgeCount?: number }>()
const route = useRoute()
const isActive = computed(() => {
  return route.matched.some((rt) => rt.name == props.menuItem.routeInfo.name)
})
</script>

<template>
  <RouterLink :to="{ ...props.menuItem.routeInfo }" class="w-full">
    <li
      class="h-18 group relative flex w-full cursor-pointer flex-col items-center justify-between rounded py-2"
    >
      <Button
        variant="ghost"
        class="p-2 group-hover:bg-muted"
        :class="{
          'bg-muted': isActive
        }"
      >
        <component
          v-if="props.menuItem.icon"
          :is="props.menuItem.icon"
          :size="20"
          class="w-6 group-hover:scale-110"
        />
      </Button>

      <div class="w-full truncate px-2 text-center text-xs">
        {{ props.menuItem.label }}
      </div>

      <Badge v-if="badgeCount" class="absolute right-2 top-0 px-2 text-xs" variant="destructive">
        {{ badgeCount }}
      </Badge>
    </li>
  </RouterLink>
</template>
