<script setup lang="ts">
// COMPONENTS
import { TriangleAlert, Star, EllipsisVertical, ChevronUp, PinOff } from 'lucide-vue-next'
import {
  Badge,
  Button,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  Label,
  Input,
  StickyNote,
  Skeleton,
  ScrollArea
} from 'vue-ui'

import PhoneNumbers from '@/components/patient/PhoneNumbers.vue'

// TS
import { computed, toValue, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePatient, parseAndFormatDate } from 'rails-api'

const route = useRoute()
const router = useRouter()

const props = defineProps<{
  patientId: string | Ref<string>
  loading: boolean | Ref<boolean>
}>()

const {
  gender_identity,
  age,
  legal_name,
  birth_date,
  preferred_name,
  preferred_language_display,
  patient_identifiers,
  update,
  saving
} = usePatient(props.patientId)

const formData = ref(structuredClone({ preferred_name: preferred_name.value }))

// could be handled on the BE, if needed
const display_dob = computed(() => {
  if (!birth_date.value) return ''
  return parseAndFormatDate(birth_date.value)
})

const goToPatientMessages = () => {
  router.push({
    query: { profile_view: 'mini' }
  })
}

const onSave = async () => {
  const [, resp] = await update({
    notifierOpts: {
      successMessage: 'Patient updated successfully'
    },
    data: toValue(formData)
  })
  if (resp) goToPatientMessages()
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
</script>

<template>
  <div v-if="loading" class="flex flex-col space-y-2 px-6 py-4 bg-background h-full">
    <Skeleton class="h-6 w-full rounded-lg" />
    <Skeleton class="h-6 w-1/2 rounded-lg" />
    <Skeleton class="h-6 w-1/3 rounded-lg" />
    <Skeleton class="h-6 w-1/2 rounded-lg" />
  </div>
  <div v-else>
    <ScrollArea class="pb-5 px-6 py-4 z-10 gap-y-2 h-[calc(100vh-9rem)] bg-background">
      <div class="grid grid-cols-2 justify-between">
        <div class="text-lg space-x-2 justify-start">Basic Information</div>

        <div class="pl-6 text-right space-x-5 flex justify-end items-center">
          <div
            class="text-sm bg-yellow-200 text-yellow-900 inline-block rounded-md py-0.5 px-3 cursor-default"
          >
            <TriangleAlert class="w-4 h-4 text-amber-500 inline" /> Medium Risk
          </div>

          <Star class="w-5 h-5 inline cursor-pointer" />

          <Menubar class="w-5 h-5 p-0 border-none cursor-pointer">
            <MenubarMenu>
              <MenubarTrigger class="px-0 bg-background">
                <EllipsisVertical class="w-5 h-5 inline cursor-pointer" />
              </MenubarTrigger>
              <MenubarContent class="dark:border-none">
                <MenubarItem @click="goToPatientMessages()">Back To Messages </MenubarItem>

                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Pause</MenubarItem>
                <MenubarItem>Archive</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      <div class="space-y-4 my-4">
        <section class="space-y-1">
          <Label> Full Name </Label>
          <div class="text-sm">{{ legal_name }}</div>
        </section>

        <section class="space-y-1 px-2">
          <Label> Preferred Name </Label>
          <Input v-model="formData.preferred_name" class="border border-border" />
        </section>

        <section class="space-y-1">
          <Label> Date of Birth </Label>
          <div class="text-sm">{{ display_dob }} ({{ age }})</div>
        </section>

        <section class="space-y-1">
          <Label> MRN </Label>

          <div class="grid grid-cols-[auto_1fr] gap-1 gap-x-5 mt-2">
            <template v-for="mrn in patient_identifiers" :key="mrn?.id">
              <div class="text-muted-foreground">{{ mrn?.identifier_system }}</div>
              <div class="text-foreground">{{ mrn?.identifier_value }}</div>
            </template>
          </div>
        </section>

        <section class="space-y-1">
          <Label> Sex </Label>
          <div class="text-sm">{{ gender_identity }}</div>
        </section>

        <section class="space-y-1">
          <Label> Race </Label>
          <div class="text-sm">American Indian or Alaska Native Asian</div>
        </section>

        <section class="space-y-1 pb-4">
          <Label> Ethnicity </Label>
          <div class="text-sm">Hispanic or Latino</div>
        </section>

        <div class="border border-border"></div>

        <div class="text-xl pt-4">Contact Information</div>

        <section class="space-y-3">
          <PhoneNumbers :patientId="patientId" :organizationId="route.params.orgId as string" />
        </section>

        <section class="space-y-1 px-2">
          <Label> Language </Label>
          <Input class="border border-border" v-model="preferred_language_display" />
        </section>

        <section class="space-y-1 px-2">
          <Label> Contact Preference </Label>
          <Input class="border border-border" />
        </section>
        <div class="text-xl">Tags and Stickies</div>
        <section class="space-y-4">
          <section class="space-x-2">
            <Badge
              variant="secondary"
              class="rounded-sm bg-accent text-foreground hover:bg-gray-300 dark:hover:text-secondary cursor-pointer"
              >This is a tag</Badge
            >
            <Badge
              variant="secondary"
              class="rounded-sm bg-accent text-foreground hover:bg-gray-300 dark:hover:text-secondary cursor-pointer"
              >This is a tag</Badge
            >
          </section>

          <section class="space-y-2 py-1">
            <div class="group space-x-4 ml-1" v-for="pin in pins" :key="pin.id">
              <StickyNote class="inline-block group-hover:drop-shadow-md shadow-gray-900 z-10">
                {{ pin.text }}
              </StickyNote>
              <PinOff
                @click="() => unpin(pin.id)"
                class="w-5 h-5 text-primary inline opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              />
            </div>
          </section>
        </section>

        <section class="space-x-4 space-y-12">
          <Button @click="onSave" :disabled="!!saving" :loading="!!saving">Save</Button>
          <Button variant="outline" @click="goToPatientMessages">Cancel</Button>
        </section>
      </div>
    </ScrollArea>
    <div
      class="relative py-8 pr-8 h-14 flex justify-end items-center border-t border-border bg-background"
    >
      <p class="text-right text-foreground cursor-pointer" @click="goToPatientMessages()">
        <ChevronUp class="w-5 h-5 text-foreground inline mr-2" />Show Less
      </p>
    </div>
  </div>
</template>
