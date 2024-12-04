<script setup lang="ts">
import { Input } from 'vue-ui'
import { Search } from 'lucide-vue-next'
</script>
<template>
  <Input placeholder="Search" class="mx-auto h-8 rounded-md border-border">
    <template #icon>
      <Search class="text-primary" />
    </template>
  </Input>
</template>
