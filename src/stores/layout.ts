import { type RouteRecordName } from 'vue-router'
import { computed } from 'vue'
import { defineStore } from 'pinia'
import { CalendarRange, FileText, Inbox, Users } from 'lucide-vue-next'
import { useUserContext } from '@f3-esajid/rails-api'

const { selected_account } = useUserContext('user_context_id')
const personaId = computed(() => {
  return selected_account.value.persona.id
})

export type MenuSection = {
  label: string
  routeName: RouteRecordName
  items: MenuItem[]
}

export type MenuItem = {
  label: string
  icon?: any // Icon vs removed in current release of lucide
  truncate?: boolean
  showInMenu: boolean
  showInBreadCrumb: boolean
  onlyWhenRouteActive: boolean
  linkToRoute: boolean
  routeInfo: {
    name: RouteRecordName
    params?: Record<string, string | number>
  }
}

export const useLayoutStore = defineStore('layout', () => {
  // const route = useRoute()

  const coreNav: MenuItem[] = [
    {
      label: 'Schedule',
      icon: CalendarRange,
      showInMenu: true,
      showInBreadCrumb: true,
      onlyWhenRouteActive: true,
      linkToRoute: true,
      routeInfo: {
        name: 'Schedule',
        params: { schedule: 'practitioner', scheduleId: personaId.value }
      }
    },
    {
      label: 'Inbox',
      icon: Inbox,
      showInMenu: true,
      showInBreadCrumb: true,
      onlyWhenRouteActive: true,
      linkToRoute: true,
      routeInfo: {
        name: 'Inbox',
        params: { mailbox: 'practitioner', mailboxId: personaId.value, folder: 'new' }
      }
    },
    {
      label: 'Encounters',
      icon: FileText,
      showInMenu: true,
      showInBreadCrumb: true,
      onlyWhenRouteActive: true,
      linkToRoute: true,
      routeInfo: {
        name: 'Encounters',
        params: { listType: 'user', listId: 1 }
      }
    },
    {
      label: 'Patients',
      icon: Users,
      showInMenu: true,
      showInBreadCrumb: true,
      onlyWhenRouteActive: true,
      linkToRoute: true,
      routeInfo: {
        name: 'ListPatients',
        params: { listType: 'user', listId: 1 }
      }
    }
  ]

  // As an example
  // const memberSections = ...
  return { coreNav }
})
