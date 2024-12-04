<script setup lang="ts">
import { X, Search } from 'lucide-vue-next'
import { Badge, Input } from 'vue-ui'
import { ref } from 'vue'
const tags = [
  { name: 'Ongoing Conversation', count: 1 },

  { name: 'Invalid Phone Number', count: 1 },

  { name: 'Inactivity for Long Time', count: 1 },

  { name: 'With CCM Consent', count: 42 },

  { name: '99490 0-5 mins', count: 33 },

  { name: 'Has Care Plan', count: 40 },

  { name: 'Age 65+', count: 44 },

  { name: 'Hyperlipidemia', count: 44 },

  { name: 'Hypertension', count: 33 },
  { name: 'High Risk Cardiovascular', count: 15 },
  { name: 'Smoker', count: 13 }
]
const search = ref('')
</script>
<template>
  <div>
    <div class="my-4">
      <Input placeholder="Search" class="mx-auto h-8 rounded-md border-border">
        <template #icon>
          <Search class="text-primary" />
        </template>
      </Input>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <Badge variant="outline" v-for="t in tags" :key="t.name" class="rounded py-1 text-xs">
        <div class="flex items-center gap-4">
          <span>{{ t.name }} </span>
          <span class="text-muted-foreground"> {{ t.count }} </span>
          <X :size="14" />
        </div>
      </Badge>
    </div>
  </div>
</template>
