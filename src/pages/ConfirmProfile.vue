<script setup lang="ts">
import { usePractitioner, useUserContext } from '@f3-esajid/rails-api'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Input, ValidationFormInput } from 'vue-ui'

const router = useRouter()
const { selected_account } = useUserContext('user_context_id')
const organization_name = computed(() => {
  return selected_account.value.persona.organization.display_name
})

const { prefix, given_name, family_name, npi, update, load, validate, errors } = usePractitioner(
  computed(() => selected_account.value.persona.id)
)

onMounted(async () => {
  const personaId = selected_account.value.persona.id
  if (personaId) {
    await load({ data: { id: personaId } })
  }
})

const handleConfirm = async () => {
  const [, resp] = await update({
    notifierOpts: {
      successMessage: 'Profile confirmed!'
    },
    withFields: ['given_name', 'family_name', 'prefix', 'npi']
  })

  if (resp) {
    const orgId = resp.data.data.relationships.organization.data.id

    router
      .push({
        name: 'Home',
        params: { orgId }
      })
      .then(() => router.go(0))
  }
}
</script>
<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="rounded-lg px-10 py-16 shadow-lg">
      <h1 class="text-center text-2xl">Welcome to {{ organization_name }}</h1>
      <p class="text-normal my-3 text-sm">Make sure that your profile looks right.</p>
      <div class="grid grid-cols-2 gap-4">
        <Input type="text" placeholder="Title" v-model="prefix" />

        <!-- Currently not validated -->
        <!-- <ValidationFormInput
  v-model="prefix"
  field="prefix"
  label=""

  :errors="errors?.prefix"
  :placeholder="'Prefix'"
  :validate="validate"
/> -->

        <ValidationFormInput
          v-model="given_name"
          field="given_name"
          label=""
          :errors="errors?.given_name"
          :placeholder="'First Name'"
          :validate="validate"
        />

        <ValidationFormInput
          v-model="npi"
          field="npi"
          label=""
          :errors="errors?.npi"
          :placeholder="'NPI'"
          :validate="validate"
        />

        <ValidationFormInput
          v-model="family_name"
          field="family_name"
          label=""
          :errors="errors?.family_name"
          :placeholder="'Family Name'"
          :validate="validate"
        />
      </div>
      <div class="mt-5 flex flex-col gap-3">
        <Button
          @click="handleConfirm()"
          variant="outline"
          class="hover:bg-primary-100 bg-primary text-white hover:text-muted"
          >Confirm</Button
        >
      </div>
    </div>
  </div>
</template>
