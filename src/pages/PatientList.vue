<script setup lang="ts">
// import ListViewHeader from '@/components/p24core/components/ListViewHeader.vue'
</script>

<template>
  <!-- <ListViewHeader title="All Patients" /> -->
  <div class="col-span-full m-1 mx-6 flex border border-dashed border-red-500 p-2">
    <RouterLink
      :to="{
        name: 'carePlan',
        params: { patientId: '1' }
      }"
    >
      Example patient profile
    </RouterLink>
  </div>
</template>
