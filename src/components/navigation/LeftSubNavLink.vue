<script setup lang="ts">
// TS
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Button } from 'vue-ui'

// STATE
const route = useRoute()
const props = defineProps<{
  item: any
}>()

const matched = computed(() => {
  return (
    route.name == props.item.routeInfo.name &&
    Object.keys(props.item.routeInfo.params).every(
      (e) => route.params[e] === props.item.routeInfo.params[e]
    )
  )
})
</script>
<template>
  <RouterLink :to="props.item.routeInfo" :key="props.item.routeInfo.name">
    <Button
      class="my-2 w-full justify-between rounded hover:bg-muted"
      variant="ghost"
      :class="{
        'bg-primary/90 text-primary-foreground hover:bg-primary hover:shadow-sm': matched
      }"
    >
      <div class="grid grid-cols-6">
        <component :is="item.icon" class="col-span-1" />
        <span class="col-span-5 py-1 pl-4 text-left"> {{ props.item.label }} </span>
      </div>
    </Button>
  </RouterLink>
</template>
