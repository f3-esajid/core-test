import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { initializeRouter } from './router'

import { initKeyCloak, initAxios, initApiNotify, runInitializers } from '@/initializers'
//

//
;(async () => {
  const app = createApp(App)

  app.use(createPinia())

  // NOTE: This happens before router is added to ensure initializers are run before
  // first navigation
  await runInitializers(app, [initKeyCloak, initAxios, initApiNotify])
  app.use(initializeRouter())
  app.mount('#app')
})()
