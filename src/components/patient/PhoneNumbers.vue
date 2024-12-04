<script setup lang="ts">
// COMPONENTS
import { Label } from 'vue-ui'
import ContactPointForm from './ContactPointForm.vue'

// TS
import { nextTick, onMounted, ref, type Ref } from 'vue'
import { useContactPointCollection } from 'rails-api'

// PROPS & DATA
const props = defineProps<{
  patientId: string | Ref<string>
  organizationId: string
}>()

const { load, items: contactPoints } = useContactPointCollection()
const renderComponent = ref(true)

// LIFECYCLE
onMounted(fetchContactPoints)

// METHODS
async function fetchContactPoints() {
  await load({
    data: {
      filters: {
        with_patient: props.patientId
      },
      smart_fields: {
        presets: ['basic']
      }
    }
  })
}

// used because adding a phone number updates the store value but
// we want to clear it to reset the form for additional numbers
const onAddContactPoint = async () => {
  await fetchContactPoints()
  renderComponent.value = false
  await nextTick()
  renderComponent.value = true
}
</script>

<template>
  <Label>Phone Number</Label>
  <ContactPointForm
    v-for="contactPoint of contactPoints"
    :contactPointId="contactPoint?.id"
    :patientId="patientId"
    :key="contactPoint?.id"
    @remove="fetchContactPoints()"
  />
  <ContactPointForm :patientId="patientId" v-if="renderComponent" @add="onAddContactPoint" />
</template>
