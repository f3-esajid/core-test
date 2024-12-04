import { defineInitializer } from '.'
import { apiNotify } from 'rails-api'
import { toast } from 'vue-ui'

export default defineInitializer('initApiNotify', async () => {
  apiNotify.onSuccess = (message: string) => {
    toast.success(message)
  }
  apiNotify.onError = (errors) => {
    errors.forEach((error) => {
      if (error.title) {
        const opts: any = {}
        if (error.detail) {
          opts.description = error.detail
        }
        if (!error?.meta?.attribute) {
          toast.error(error.title, opts)
        }
      }
      console.error(`Error: `, error)
    })
  }
})
