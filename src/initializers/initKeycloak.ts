import type { App } from 'vue'

import { defineInitializer } from '.'
import { KeycloakAdapter } from '@f3-esajid/rails-api'

export default defineInitializer('initKeycloak', async (app: App) => {
  const kc = new KeycloakAdapter({
    url: import.meta.env.VITE_KC_SERVER_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CORE_CLIENT
  })

  app.config.globalProperties.$keycloak = kc.keycloak
  app.provide('keycloakAdapter', kc)

  try {
    const authenticated = await kc.initialize()

    if (authenticated) {
      kc.refreshKeycloakTokenPeriodically()
    } else {
      window.location.reload()
    }
  } catch (error) {
    console.error(error)
  }
})
