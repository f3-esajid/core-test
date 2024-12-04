<script setup lang="ts">
// COMPONENTS
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  ValidationFormPhoneInput
} from 'vue-ui'
import { BadgeCheck, Star, Trash } from 'lucide-vue-next'

// TS
import { ref, computed, toValue, type Ref } from 'vue'

import { usePatient, useContactPoint, type APIResult } from 'rails-api'

// PROPS & DATA
const emits = defineEmits<{
  (e: 'add'): void
  (e: 'remove'): void
}>()
const props = defineProps<{
  contactPointId?: string | Ref<string>
  patientId: string | Ref<string>
}>()

const isDialogOpen = ref<boolean>(false)

const {
  saving,
  use,
  verify_state,
  contact_point_value,
  delete: deleteContactPoint,
  errors,
  validate,
  valid,
  isDirty,
  isPersisted,
  save
} = useContactPoint(props.contactPointId)
use.value ||= 'mobile'

const { update_mobile_phone, primary_mobile_contact_point } = usePatient(props.patientId)

const isExisting = computed(() => {
  return isPersisted(toValue(props.contactPointId))
})
const removeItem = async () => {
  const [, resp] = await deleteContactPoint({
    notifierOpts: {
      successMessage: 'Phone number deleted'
    }
  })

  if (resp) {
    await emits('remove')
    isDialogOpen.value = false
  }
}

const updatePrimaryPhone = async () => {
  await update_mobile_phone({
    notifierOpts: {
      successMessage: 'Primary phone number updated'
    },
    data: {
      smart_fields: {
        presets: ['basic'],
        primary_mobile_contact_point: {
          presets: ['basic']
        }
      },
      mobile_phone: contact_point_value.value
    }
  })
}

const updateContactPoint = async () => {
  if (!isDirty()) return

  const [, resp]: APIResult = await save({
    withFields: ['use', 'contact_point_value'],
    notifierOpts: {
      successMessage: 'Phone number updated'
    },
    data: {
      contact_point_system: 'phone',
      patient_id: props.patientId
    }
  })

  if (resp && !isExisting.value) emits('add')
}
</script>

<template>
  <div class="group flex space-x-1 py-1">
    <div class="min-w-8 flex-none self-center">
      <BadgeCheck v-if="verify_state === 'verified'" class="mb-1 inline h-5 w-5 text-emerald-600" />
    </div>
    <div class="w-24 flex-none">
      <Select v-model="use">
        <SelectTrigger class="border border-border">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent class="dark:border-none">
          <SelectItem value="mobile">Mobile</SelectItem>
          <SelectItem value="home">Home</SelectItem>
          <SelectItem value="work">Work</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div class="relative flex-1 pr-4">
      <ValidationFormPhoneInput
        v-model="contact_point_value"
        field="contact_point_value"
        label=""
        class="border border-border"
        :errors="errors?.contact_point_value"
        :placeholder="isExisting ? 'xxx-xxx-xxxx' : 'Enter a new patient phone number...'"
        :validate="validate"
      />
    </div>

    <div class="flex min-w-40 items-center self-start">
      <Button
        v-if="isExisting"
        :loading="saving"
        :disabled="!isDirty() || !valid"
        class="mx-1 w-16"
        @click="updateContactPoint()"
      >
        Save</Button
      >
      <Button
        v-else
        :loading="saving"
        class="mx-1 w-16"
        :disabled="!valid"
        @click="updateContactPoint()"
        >Add
      </Button>

      <Star
        v-if="isExisting && primary_mobile_contact_point?.id === contactPointId"
        class="mx-2 cursor-pointer fill-foreground"
      />
      <Star
        v-else-if="isExisting"
        class="mx-2 hidden cursor-pointer group-hover:block"
        @click="updatePrimaryPhone"
      />

      <Trash
        v-if="isExisting"
        class="mx-2 hidden cursor-pointer text-rose-500 group-hover:block"
        @click="() => (isDialogOpen = true)"
      />
    </div>
  </div>

  <AlertDialog v-model:open="isDialogOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this patient's phone number?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="() => (isDialogOpen = false)">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="removeItem" variant="destructive"
          >Yes, delete it</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
