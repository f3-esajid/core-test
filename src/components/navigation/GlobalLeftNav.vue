<script setup lang="ts">
// COMPONENTS
import { ToggleTheme } from 'vue-ui'
import NavMenu from './NavMenu.vue'

// TS
import { useLayoutStore } from '@/stores/layout'
import AvatarMenu from './AvatarMenu.vue'

// STATE
const { coreNav } = useLayoutStore()
const isDevMode = import.meta.env.MODE === 'development'
</script>

<template>
  <div class="h-full min-w-[72px] max-w-[72px]">
    <NavMenu :items="coreNav">
      <template #append>
        <li v-if="isDevMode">
          <ToggleTheme />
        </li>

        <div class="grow" />

        <li>
          <AvatarMenu />
        </li>
      </template>
    </NavMenu>
  </div>
</template>
