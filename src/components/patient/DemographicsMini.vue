<script setup lang="ts">
// COMPONENTS
import {
  TriangleAlert,
  Star,
  EllipsisVertical,
  ChevronDown,
  ChevronUp,
  PinOff,
  Tag
} from 'lucide-vue-next'

import {
  Badge,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  StickyNote,
  Skeleton
} from 'vue-ui'

// TS
import { computed, onMounted, onUnmounted, ref, toRefs, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePatient, parseAndFormatDate } from 'rails-api'

import { useExpandableScroll } from '@/composables/useExpandableScroll'
import PhoneNumberDisplay from './PhoneNumberDisplay.vue'

// PROPS & DATA
const props = defineProps<{
  scrollableContent: HTMLElement | null
  patientId: string | Ref<string>
  loading: boolean | Ref<boolean>
}>()

const tagsExpanded = ref(false)
const tagsRef = ref<HTMLElement | null>(null)
const isTagsOverflowing = ref(false)

const { scrollableContent } = toRefs(props)

const router = useRouter()
const {
  age,
  gender_abbrev,
  legal_name,
  display_name,
  birth_date,
  primary_mobile_contact_point,
  primary_patient_identifier,
  coverages
} = usePatient(props.patientId)

const { expanded: isDemographicExpanded, toggleExpanded } = useExpandableScroll({
  scrollView: scrollableContent
})

// could be handled on the BE, if needed
const display_dob = computed(() => {
  if (!birth_date.value) return ''
  return parseAndFormatDate(birth_date.value)
})

const openFullDemographics = () => {
  router.push({ query: { profile_view: 'full' } })
}

const pins = [
  {
    id: '1',
    text: 'Patient will be on vacation in July'
  },
  {
    id: '2',
    text: 'Patient will be on vacation in Sept'
  },
  {
    id: '3',
    text: 'Patient is diabetic'
  }
]

const unpin = (id: string) => {
  console.log('unpin', id)
}

const checkOverflow = () => {
  if (tagsRef.value) {
    isTagsOverflowing.value = tagsRef.value.scrollHeight > tagsRef.value.clientHeight
  }
}

onMounted(() => {
  checkOverflow()
  window.addEventListener('resize', checkOverflow)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOverflow)
})

const tags = [
  'This is a tag 1',
  'This is a tag 2',
  'This is a tag 3',
  'This is a tag 4',
  'This is a tag 5',
  'This is a tag 6',
  'This is a tag 7',
  'This is a tag 8',
  'This is a tag 9',
  'This is a tag 10'
]
</script>
<template>
  <div
    class="bg-background z-10 gap-y-2 border-b border-border px-6 py-4 pb-5 shadow-[0_10px_20px_-20px_rgb(0,0,0,0.3)] shadow-gray-900"
  >
    <div v-if="loading" class="flex flex-col space-y-2">
      <Skeleton class="h-6 w-full rounded-lg" />
      <Skeleton class="h-6 w-1/2 rounded-lg" />
      <Skeleton v-if="isDemographicExpanded" class="h-6 w-1/3 rounded-lg" />
      <Skeleton v-if="isDemographicExpanded" class="h-6 w-1/2 rounded-lg" />
    </div>
    <div v-else>
      <div class="grid grid-cols-2 justify-between">
        <div class="justify-start space-x-2 text-2xl">
          {{ display_name }}
        </div>

        <div class="flex items-center justify-end space-x-5 pl-6 text-right">
          <div
            class="inline-block cursor-default rounded-md bg-yellow-200 px-3 py-0.5 text-sm text-yellow-900"
          >
            <TriangleAlert class="inline h-4 w-4 text-amber-500" /> Medium Risk
          </div>

          <Star class="inline h-5 w-5 cursor-pointer" />

          <ChevronDown
            v-if="!isDemographicExpanded"
            class="inline h-5 w-5 cursor-pointer text-gray-500"
            @click="toggleExpanded"
          />

          <Menubar v-else class="h-5 w-5 cursor-pointer border-none p-0">
            <MenubarMenu>
              <MenubarTrigger class="bg-background px-0">
                <EllipsisVertical class="inline h-5 w-5 cursor-pointer" />
              </MenubarTrigger>
              <MenubarContent class="dark:border-none">
                <MenubarItem @click="openFullDemographics()">Full Profile </MenubarItem>
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Pause</MenubarItem>
                <MenubarItem>Archive</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      <div class="mt-2 space-x-2">
        <span class="text-foreground">{{ display_dob }} ({{ age }})</span>
        <span class="text-muted-foreground">|</span>

        <span class="text-foreground">{{ gender_abbrev }}</span>
        <span class="text-muted-foreground">|</span>

        <span class="text-muted-foreground">MRN</span>
        <span class="text-foreground">{{ primary_patient_identifier?.identifier_value }}</span>

        <span class="text-muted-foreground" v-if="primary_mobile_contact_point?.contact_point_value"
          >|</span
        >
        <PhoneNumberDisplay
          class="text-muted-foreground"
          v-if="primary_mobile_contact_point?.contact_point_value"
          :value="primary_mobile_contact_point.contact_point_value"
          :verifiedState="primary_mobile_contact_point.verify_state"
        />
      </div>
    </div>

    <div
      class="transition-height relative space-y-2 overflow-hidden duration-300 ease-in-out"
      :class="{
        'max-h-0': !isDemographicExpanded,
        'mt-2 max-h-80': isDemographicExpanded
      }"
    >
      <div class="mt-2 grid grid-cols-[auto_1fr] gap-1 gap-x-5">
        <div class="text-muted-foreground">Full Name</div>
        <div class="text-foreground">{{ legal_name }}</div>

        <div class="text-muted-foreground">Schedule</div>
        <div class="text-foreground">Every Tuesday</div>

        <div class="text-muted-foreground">Primary Insurance</div>

        <div class="text-foreground">{{ coverages?.[0]?.plan_name }}</div>
      </div>

      <div class="space-x-2">
        <div class="relative">
          <div
            class="flex max-w-[calc(100%-7rem)] flex-wrap gap-2 overflow-hidden transition-[max-height] duration-300 ease-in-out"
            :class="{ 'max-h-6': !tagsExpanded, 'max-h-[300px]': tagsExpanded }"
            ref="tagsRef"
          >
            <Badge
              v-for="(item, index) in tags"
              :key="index"
              variant="secondary"
              class="cursor-pointer rounded-sm bg-accent text-foreground hover:bg-gray-300 dark:hover:text-secondary"
              >{{ item }}</Badge
            >
            <div
              class="ml-2 flex cursor-pointer items-center text-xs font-semibold text-foreground"
            >
              <Tag class="mr-2 inline h-4 w-4" />Add Tag
            </div>
          </div>
          <div
            class="absolute bottom-0 right-0 cursor-pointer text-muted-foreground"
            @click="() => (tagsExpanded = !tagsExpanded)"
            v-if="isTagsOverflowing"
          >
            {{ tagsExpanded ? 'Show Less' : '...Show More' }}
          </div>
        </div>
      </div>

      <div class="space-y-2 py-1">
        <div class="group ml-1 space-x-4" v-for="pin in pins" :key="pin.id">
          <StickyNote class="z-10 inline-block shadow-gray-900 group-hover:drop-shadow-md">
            {{ pin.text }}
          </StickyNote>
          <PinOff
            @click="() => unpin(pin.id)"
            class="inline h-5 w-5 cursor-pointer text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      </div>

      <div class="absolute bottom-0 right-0">
        <ChevronUp class="inline h-5 w-5 cursor-pointer text-gray-500" @click="toggleExpanded" />
      </div>
    </div>
  </div>
</template>
