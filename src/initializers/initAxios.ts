import { type App } from 'vue'

import { defineInitializer } from '.'
import {
  axios,
  addBaseURL,
  addDefaultHeaders,
  addBearerAuthInterceptor,
  handle401Interceptor
} from '@f3-esajid/rails-api'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

export default defineInitializer('initAxios', async (app: App) => {
  const { currentOrgId } = storeToRefs(useGlobalStore())

  axios.interceptors.request.use(
    (config) => {
      config.headers['Organization-Id'] = currentOrgId.value
      config.headers['Account-Id'] = localStorage.getItem('ph_accountId')
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  addDefaultHeaders(axios)
  addBaseURL(axios, import.meta.env.VITE_API_URL)
  addBearerAuthInterceptor(axios, app.config.globalProperties.$keycloak)
  handle401Interceptor(axios, app.config.globalProperties.$keycloak)

  app.config.globalProperties.$apiAxios = axios
})
