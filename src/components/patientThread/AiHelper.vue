<script setup lang="ts">
import { Wand2 } from 'lucide-vue-next'
import { Card, CardContent, Button } from 'vue-ui'
</script>
<template>
  <Card class="text-teal-foreground mx-4 border-teal-600 bg-teal-50">
    <CardContent class="px-4 py-2">
      <div class="flex justify-between">
        <div class="flex-2 mt-2">
          <Wand2 class="mb-1 mr-2 inline-block" :size="18" />

          <h3 class="mr-2 inline-block">Introduce yourself as the care manager</h3>
        </div>
        <div class="w-4"></div>

        <div class="ml-1 flex-1">
          <div class="mr-4 text-right text-muted-foreground">
            <Button variant="ghost"
              ><Wand2 class="ml-auto mr-2 inline-block" :size="18" /> Draft</Button
            >
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
