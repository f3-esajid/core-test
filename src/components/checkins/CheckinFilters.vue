<script setup lang="ts">
// COMPONENTS
import {
  Button,
  Input,
  MenubarItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from 'vue-ui'
import { Search, ListFilter } from 'lucide-vue-next'
</script>
<template>
  <div class="flex items-center gap-4">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          <div class="flex items-center justify-between gap-2">
            <div>Select Providers</div>
            <ListFilter />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div class="space-y-4 p-4">
          <div>
            <div class="text-lg">Select Providers</div>
            <Input placeholder="Search" class="mx-auto h-8 rounded-md border-border">
              <template #icon>
                <Search class="text-primary" />
              </template>
            </Input>
          </div>
          <div class="text-sm text-muted-foreground">Recent</div>
          <MenubarItem>Carla Espinosa</MenubarItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          <div class="flex items-center justify-between gap-2">
            <div>Select Cohorts</div>
            <ListFilter />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div class="space-y-4 p-4">
          <div>
            <div class="text-lg">Select Cohorts</div>
            <Input placeholder="Search" class="mx-auto h-8 rounded-md border-border">
              <template #icon>
                <Search class="text-primary" />
              </template>
            </Input>
          </div>
          <div class="text-sm text-muted-foreground">Recent</div>
          <MenubarItem>August Launch</MenubarItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
