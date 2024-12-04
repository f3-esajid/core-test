import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useGlobalConfig } from 'rails-api'

export const useGlobalStore = defineStore('global', () => {
  const currentOrgId = ref('')

  const userContextId = computed(() => {
    return `user_context:${currentOrgId.value}`
  })
  const { supported_languages, gender_identities } = useGlobalConfig('global_config_id')

  return { currentOrgId, userContextId, supported_languages, gender_identities }
})
