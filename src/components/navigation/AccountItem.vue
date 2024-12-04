<script setup lang="ts">
import { MenubarItem } from 'vue-ui'
import { useAccount } from '@f3-esajid/rails-api'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
  accountId: string
}>()

const { phamily_app_id, persona, organization } = useAccount(props.accountId)

const personaName = computed(() => persona?.value?.display_name)
const orgId = computed(() => organization?.value?.id)
const orgName = computed(() => organization?.value?.display_name)

const router = useRouter()

function swapToAccount() {
  // TODO: Handle app
  router
    .push({
      name: 'RouteToApp',
      params: {
        orgId: orgId.value,
        accountId: props.accountId
      }
    })
    .then(() => router.go(0))
}
</script>
<template>
  <MenubarItem class="cursor-pointer" @click="swapToAccount">
    {{ personaName }}
    @ {{ orgName }} @ {{ phamily_app_id }}
  </MenubarItem>
</template>
