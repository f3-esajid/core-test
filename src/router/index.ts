import { computed, nextTick } from 'vue'
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext,
  type RouterOptions,
  type RouteRecordRaw
} from 'vue-router'
import { useUserContext, type APIResult, deparam, urlParam } from '@f3-esajid/rails-api'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { setLocalAccount } from '@/utils'

const { load } = useUserContext()

const appMap = {
  [import.meta.env.VITE_KC_MANAGE_CLIENT]: {
    url: String(import.meta.env.VITE_MANAGE_WEB_URL)
  },
  [import.meta.env.VITE_KC_CORE_CLIENT]: {
    url: String(import.meta.env.VITE_CORE_WEB_URL)
  }
} as { [key: string]: { url: string } }

async function loadUserContext(orgId: string) {
  const { currentOrgId } = storeToRefs(useGlobalStore())
  currentOrgId.value = orgId

  return await load({
    endpointMethod: 'load',
    data: {
      smart_fields: {
        available_accounts: {
          persona: {
            polymorphic: {
              practitioner: {
                presets: ['basic']
              },
              manager: {
                presets: ['basic']
              },
              administrator: {
                presets: ['basic']
              }
            }
          },
          organization: {
            presets: ['basic']
          }
        },
        selected_account: {
          presets: ['basic']
        }
      }
    }
  })
}

const loadUserContextGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  // If account is already set, continue.
  // Otherwise redirect to ChooseAccountRoute

  const [, resp] = await loadUserContext(String(to.params.orgId || ''))
  const resolvedSelectedAccount = resp?.data?.data?.relationships?.selected_account?.data

  if (resolvedSelectedAccount) {
    setLocalAccount(resp.data.data.relationships.selected_account.data?.id)
    next()
  } else if (to.name !== 'ChooseAccount') {
    next({ name: 'ChooseAccount' })
  } else {
    next()
  }
}

const { selected_account } = useUserContext('user_context_id')
const personaId = computed(() => {
  return selected_account.value?.persona?.id
})

const accountRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    beforeEnter: loadUserContextGuard,
    component: () => {
      // will never hit because the beforeEnter function redirects
      return import('@/layouts/AppLayout.vue')
    }
  },
  {
    path: '/route_to_app/:appId/organization/:orgId/account/:accountId',
    name: 'RouteToApp',

    redirect: (to) => {
      if (to.params.appId === import.meta.env.VITE_KC_CORE_CLIENT) {
        setLocalAccount(to.params.accountId)
        return {
          name: 'Schedule',
          params: {
            orgId: to.params.orgId + '',
            schedule: 'practitioner',
            scheduleId: personaId.value || '1',
            folder: 'all'
          }
        }
      } else {
        const lookup = appMap[String(to.params.appId)]
        window.location.href = `${lookup.url}/route_to_app/${to.params.appId}/organization/${to.params.orgId}/account/${to.params.accountId}`
        return {}
      }
    }
  },
  {
    path: '/choose_account',
    name: 'ChooseAccount',

    beforeEnter: loadUserContextGuard,
    components: {
      default() {
        return import('@/pages/ChooseAccount.vue')
      }
    }
  },
  {
    path: '/invitations/accept/:token',
    name: 'AcceptInvitation',

    components: {
      default() {
        return import('@/pages/AcceptInvitation.vue')
      }
    }
  }
]

const appRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect(to) {
      return {
        name: 'Schedule',
        params: {
          orgId: to.params.orgId,
          schedule: 'practitioner',
          scheduleId: personaId.value || '1',
          folder: 'all'
        }
      }
    }
  },
  {
    path: 'schedule/:schedule/:scheduleId/checkins/:theme',
    name: 'Checkins',
    components: {
      default() {
        return import('@/pages/Checkins.vue')
      }
    }
  },
  {
    path: 'schedule/:schedule/:scheduleId',
    name: 'Schedule',
    components: {
      default() {
        return import('@/pages/Schedule.vue')
      }
    }
  },

  {
    path: 'schedule/:schedule/:scheduleId/appointment',
    name: 'Appointment',
    components: {
      default() {
        return import('@/pages/Appointment.vue')
      }
    }
  },
  {
    path: 'inbox/:mailbox/:mailboxId/:folder',
    name: 'Inbox',
    components: {
      default() {
        return import('@/pages/Inbox.vue')
      }
    }
  },
  {
    path: 'patients/:listType/:listId',
    name: 'ListPatients',
    components: {
      default() {
        return import('@/pages/PatientList.vue')
      }
    }
  },

  {
    path: 'patient/:patientId',
    name: 'PatientProfile',
    components: {
      default() {
        return import('@/layouts/TwoColumnLayout.vue')
      },
      contextual_navigation() {
        return import('@/components/layout/PatientProfileNavbar.vue')
      }
    },
    children: [
      {
        path: 'plan',
        name: 'carePlan',
        components: {
          left() {
            return import('@/pages/PatientProfile.vue')
          }
          // right() {
          //   return import('@/pages/RightPane.vue')
          // }
        }
      },
      {
        path: 'encounters',
        name: 'encounters',
        components: {
          left() {
            return import('@/pages/PatientProfile.vue')
          }
          // right() {
          //   return import('@/pages/RightPane.vue')
          // }
        }
      }
    ]
  },
  {
    path: 'encounters/:listType/:listId',
    name: 'Encounters',
    components: {
      default() {
        return import('@/pages/EncounterList.vue')
      }
    }
  },
  {
    path: 'confirm_profile',
    name: 'ConfirmProfile',
    components: {
      default() {
        return import('@/pages/ConfirmProfile.vue')
      }
    }
  }
]

const routerOptions: RouterOptions = {
  history: createWebHistory(import.meta.env.BASE_URL),
  parseQuery: deparam,
  stringifyQuery: (object) => urlParam(object),
  routes: [
    ...accountRoutes,
    {
      path: '/o/:orgId',
      beforeEnter: loadUserContextGuard,
      children: [
        {
          path: '',
          component: () => {
            return import('@/layouts/AppLayout.vue')
          },
          children: appRoutes
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => {
        return import('@/pages/NotFound.vue')
      }
    }
  ]
}

export function initializeRouter() {
  routerOptions.history = createWebHistory(import.meta.env.BASE_URL)
  return createRouter(routerOptions)
}
