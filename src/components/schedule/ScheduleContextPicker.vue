<script setup lang="ts">
import { Button, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from 'vue-ui'
import { ChevronDown } from 'lucide-vue-next'
import SubscribeToSchedulePopup from '@/components/schedule/SubscribeToSchedulePopup.vue'
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" class="mr-8">
        <div class="flex items-center justify-between">
          <div class="mr-2 text-xl">My Schedule</div>
          <ChevronDown />
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <SubscribeToSchedulePopup />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
