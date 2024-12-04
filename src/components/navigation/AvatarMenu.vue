<script setup lang="ts">
import { inject, computed } from 'vue'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from 'vue-ui'
const kcAdapter: any = inject('keycloakAdapter')
import { useUserContext } from 'rails-api'
import AccountItem from '@/components/navigation/AccountItem.vue'
import { InitialCircle } from 'vue-ui'

// TS
async function logoutKeycloak() {
  await kcAdapter.logout()
}
// STATE
const { available_accounts, selected_account } = useUserContext('user_context_id')

const initials = computed(() => {
  return selected_account?.value?.persona.initials
})
</script>
<template>
  <Menubar dir="ltr" class="mb-4 border-none bg-transparent">
    <MenubarMenu>
      <MenubarTrigger class="cursor-pointer bg-transparent focus:bg-transparent">
        <InitialCircle :initials="initials" class="bg-sky-800 text-white" />
      </MenubarTrigger>
      <MenubarContent class="ml-4">
        <AccountItem :accountId="selected_account.id" />
        <hr />
        <template v-for="account in available_accounts" :key="account.id">
          <AccountItem
            v-if="account.id && account.id.value != selected_account.id.value"
            :accountId="account.id"
          />
        </template>
        <hr class="border-border" />

        <MenubarItem class="cursor-pointer" @click="logoutKeycloak"> Logout</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
