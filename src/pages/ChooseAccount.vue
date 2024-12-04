<script setup lang="ts">
import { useUserContext } from '@f3-esajid/rails-api'
import { useRouter } from 'vue-router'
const router = useRouter()

const { available_accounts } = useUserContext('user_context_id')

function selectAccount(accountId: string, orgId: string, appId: string) {
  // TODO: Handle app
  router
    .push({
      name: 'RouteToApp',
      params: { orgId, accountId, appId }
    })
    .then(() => router.go(0))
}
</script>
<template>
  <div class="col-span-full m-1 mx-6 border border-dashed border-red-500 p-2">
    <div
      v-for="account in available_accounts"
      :key="account.id.value"
      class="m-6 cursor-pointer border border-dashed border-red-500 p-2"
      @click="selectAccount(account.id, account.organization.id, account.phamily_app_id)"
    >
      {{ account.persona.display_name }}
      <span class="text-italic text-xs">{{ account.phamily_app_id }}</span>
    </div>
  </div>
</template>
