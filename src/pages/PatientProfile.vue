<script setup lang="ts">
// COMPONENTS
import DemographicsFull from '@/components/patient/DemographicsFull.vue'
import PatientProfileLanding from '@/components/patient/PatientProfileLanding.vue'

// TS
import { onMounted, computed } from 'vue'

import { usePatient } from '@f3-esajid/rails-api'
import { useRoute } from 'vue-router'

const route = useRoute()

const patientId = computed(() => {
  return route.params.patientId as string
})
const viewingDemographics = computed(() => {
  return route.query.profile_view == 'full'
})

const { loading, load } = usePatient(patientId)

onMounted(async () => {
  await load({
    data: {
      smart_fields: {
        presets: ['basic'],
        primary_mobile_contact_point: {
          presets: ['basic']
        },
        primary_patient_identifier: {
          presets: ['basic']
        },
        patient_identifiers: {
          presets: ['basic']
        },
        coverages: { presets: ['basic'] }
      }
    }
  })
})
</script>

<template>
  <KeepAlive>
    <DemographicsFull v-if="viewingDemographics" :patient-id="patientId" :loading="loading" />

    <PatientProfileLanding v-else :patient-id="patientId" :loading="loading" />
  </KeepAlive>
</template>
