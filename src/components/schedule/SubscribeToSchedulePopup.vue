<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input, MenubarItem, Skeleton } from 'vue-ui'
import { Search } from 'lucide-vue-next'
import { usePractitionerCollection } from 'rails-api'
import { useDebounceFn } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()
const { items, load, loading } = usePractitionerCollection()
const search = ref('')
const activelyTyping = ref(false)
const MAX_RESULTS = 5

watch(search, useDebounceFn(loadPractitioners, 250), { immediate: true })

async function loadPractitioners() {
  activelyTyping.value = false
  await load({
    data: {
      smart_fields: {
        presets: ['basic']
      },
      filters: {
        search_by: { name: search.value }
      },
      limit: MAX_RESULTS
    }
  })
}

const onPractitionerSelect = (val: any) => {
  router.push({
    name: 'Schedule',
    params: { scheduleId: val }
  })
}
</script>
<template>
  <div class="space-y-4 p-4">
    <div class="space-y-1">
      <div class="text-lg">Select a Schedule</div>
      <Input
        placeholder="Search"
        class="mx-auto h-8 rounded-md border-border"
        v-model="search"
        @input="() => (activelyTyping = true)"
      >
        <template #icon>
          <Search class="text-primary" />
        </template>
      </Input>
    </div>

    <div class="space-y-2">
      <div class="text-sm text-muted-foreground">
        {{ search ? 'Results' : 'Recent' }}
      </div>

      <div class="space-y-2" v-if="search && (loading || activelyTyping)">
        <Skeleton class="h-4 w-[90%]" />
        <Skeleton class="h-4 w-[100%]" />
        <Skeleton class="h-4 w-[80%]" />
      </div>

      <div v-if="!loading && !activelyTyping" class="">
        <MenubarItem v-if="!items.length && !loading && !activelyTyping"
          >No practitioners found</MenubarItem
        >
        <MenubarItem
          v-else-if="!loading"
          v-for="item in items"
          :key="item.id || 0"
          @click="() => onPractitionerSelect(item.id)"
          >{{ item.display_name }}</MenubarItem
        >
      </div>
    </div>
  </div>
</template>
