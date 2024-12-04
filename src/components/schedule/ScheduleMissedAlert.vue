<script setup>
import { Alert, AlertDescription, AlertTitle, Button } from 'vue-ui'
import { AlertTriangle } from 'lucide-vue-next'
</script>
<template>
  <Alert variant="warning" class="mb-4 flex items-center justify-between">
    <AlertTriangle class="h-8 w-8" />
    <div class="ml-4">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription> You have 10 missed appointments from yesterday </AlertDescription>
    </div>
    <div class="flex items-center gap-2 text-right">
      <Button variant="ghost" size="sm"> Dismiss </Button>
      <Button variant="outline" size="sm"> Reschedule </Button>
    </div>
  </Alert>
</template>
