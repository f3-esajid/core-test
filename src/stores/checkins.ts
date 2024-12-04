import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { defineStore } from 'pinia'

export type CheckInTheme =
  | 'vitals'
  | 'appointments'
  | 'symptoms'
  | 'medications'
  | 'lifestyle'
  | 'custom'

export const themes: Set<CheckInTheme> = new Set([
  'vitals',
  'appointments',
  'symptoms',
  'medications',
  'lifestyle'
])

export const useCheckinsStore = defineStore('checkins', () => {
  const route = useRoute()
  const selectedTheme = computed(() => {
    return route?.params?.theme
  })
  // const route = useRoute()

  // As an example
  // const memberSections = ...
  return { selectedTheme }
})
