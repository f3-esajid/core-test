<script setup lang="ts">
// COMPONENTS
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Badge,
  DropdownMenuSeparator
} from 'vue-ui'
import { ChevronDown } from 'lucide-vue-next'

// TS
import { useCheckinsStore, themes, type CheckInTheme } from '@/stores/checkins'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { titleize } from '@f3-esajid/rails-api'

// PROPS * DATA
const router = useRouter()
const { selectedTheme } = storeToRefs(useCheckinsStore())

// METHODS
function selectTheme(t: CheckInTheme) {
  router.push({ params: { theme: t } })
}
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" class="ml-1 px-2 text-primary">
        <div class="flex items-center justify-between">
          <div class="mr-2 text-xl">{{ titleize(selectedTheme.toString()) }}</div>
          <ChevronDown />
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        v-for="t in themes"
        :key="t"
        class="flex cursor-pointer items-center gap-2 hover:bg-muted"
        @click="selectTheme(t)"
      >
        {{ titleize(t) }}

        <Badge v-if="selectedTheme === t" class="py-0"> selected </Badge>
      </DropdownMenuItem>
      <DropdownMenuSeparator />

      <DropdownMenuItem
        class="flex cursor-pointer items-center gap-2 hover:bg-muted"
        @click="selectTheme('custom')"
      >
        Custom

        <Badge v-if="selectedTheme === 'custom'" class="py-0"> Selected </Badge>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
