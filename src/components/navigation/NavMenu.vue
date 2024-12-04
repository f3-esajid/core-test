<script setup lang="ts">
// COMPONENTS
import NavItem from './NavItem.vue'

// TS
import { type MenuItem } from '@/stores/layout'

// PROPS * DATA
defineProps<{
  items: MenuItem[]
}>()
</script>
<template>
  <ul class="flex h-full content-center items-center justify-between space-y-2 sm:flex-col">
    <NavItem v-for="item in items" :key="item.label" :menuItem="item" />
    <slot name="append" />
  </ul>
</template>
