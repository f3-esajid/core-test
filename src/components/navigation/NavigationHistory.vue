<script setup lang="ts">
import { Button } from 'vue-ui'
import { ArrowLeft, ArrowRight, History } from 'lucide-vue-next'
</script>
<template>
  <div class="space-x-1">
    <Button variant="ghost" class="h-8 px-2 py-0">
      <ArrowLeft />
    </Button>
    <Button variant="ghost" class="h-8 px-2 py-0">
      <ArrowRight />
    </Button>
    <Button variant="ghost" class="h-8 px-2 py-0">
      <History />
    </Button>
  </div>
</template>
