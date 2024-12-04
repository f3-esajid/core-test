import type { App, Plugin } from 'vue'

export type Initializer = Plugin & {
  name: string
  run: Function
}

export function defineInitializer(name: string, run: Function) {
  return {
    name: name,
    install(app: App) {
      app.config.globalProperties.initializers ||= {}
      app.config.globalProperties.initializers[name] = run
    },
    run
  } as Initializer
}

async function usePlugin(app: App, plugin: Initializer) {
  if (plugin.name in Object.keys(app.config.globalProperties?.$initializers || {})) {
    // Already initialized!
    console.warn(`${plugin.name} has already been initialized!`)
    return
  }
  app.use(plugin)
  await app.config.globalProperties.initializers[plugin.name](app)
}

export async function runInitializers(app: App, plugins: Initializer[]) {
  for (const p of plugins) {
    await usePlugin(app, p)
  }
}
