<script setup lang="ts">
// COMPONENTS
import { Textarea, Tabs, TabsList, TabsContent, TabsTrigger } from 'vue-ui'
import CheckinLLMRefiner from '@/components/checkins/CheckinLLMRefiner.vue'

// TS
import { ref } from 'vue'
import { useCheckin } from '@f3-esajid/rails-api'
import { useGlobalStore } from '@/stores/global'

// PROPS * DATA
const props = defineProps<{
  checkinId: string
}>()
const { translations } = useCheckin(props.checkinId)
const { supported_languages } = useGlobalStore()

const tab = ref('en')
</script>

<template>
  <div>
    <div class="text-md mb-2 font-medium">Review Message</div>
    <Tabs v-model="tab" class="mb-2">
      <TabsList>
        <template v-for="(_, lang) of translations" :key="lang">
          <TabsTrigger :value="lang">
            {{ supported_languages[lang] }}
          </TabsTrigger>
        </template>
      </TabsList>

      <TabsContent v-for="(msg, lang) of translations" :value="lang" :key="lang">
        <Textarea :model-value="msg" />
      </TabsContent>
    </Tabs>
    <CheckinLLMRefiner :checkin-id="checkinId" />
  </div>
</template>
