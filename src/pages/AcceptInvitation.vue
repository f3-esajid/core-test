<script setup lang="ts">
import { Button } from 'vue-ui'
import { useAccount, useInvitation } from '@f3-esajid/rails-api'
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { setLocalAccount } from '@/utils'
import { useRouter } from 'vue-router'

const route = useRoute()
const { id, persona, load, reject, saving, loading, inviter, is_invalid } = useInvitation()
const {
  id: account_id,
  create_from_invitation,
  saving: account_saving,
  organization
} = useAccount()
const router = useRouter()

const invitationInvalid = computed(() => {
  return id.value === '' || is_invalid.value
})

const organization_name = computed(() => {
  return persona.value?.organization?.display_name
})

onMounted(async () => {
  await load({
    endpointMethod: 'findByToken',
    data: {
      token: route.params.token,
      fields: {
        invitation: ['...', 'persona', 'inviter', 'is_invalid']
      },
      include: ['persona', 'inviter', 'persona.organization']
    }
  })
})

const acceptInvite = async () => {
  await create_from_invitation({
    notifierOpts: {
      successMessage: 'Invitation accepted.'
    },
    data: {
      invitation_token: route.params.token,
      include: ['organization']
    },
    fields: {
      account: ['...', 'organization']
    }
  })
  // set local account
  setLocalAccount(account_id.value)

  // hard navigate to confirm page
  router
    .push({
      name: 'ConfirmProfile',
      params: {
        orgId: organization.value.id
      }
    })
    .then(() => router.go(0))
}

const rejectInvite = async () => {
  await reject({
    notifierOpts: {
      successMessage: 'Invite rejected'
    }
  })

  router.push('/')
}
</script>
<template>
  <div class="flex min-h-screen items-center justify-center">
    <div v-if="loading" class="rounded-lg px-10 py-20 shadow-lg"></div>
    <div v-else-if="invitationInvalid">
      <h1 class="text-bold my-3 text-center text-2xl">Invite Invalid</h1>
      <p class="text-sm">
        This invite may be expired, or you might not have permission to access it.
      </p>
      <Button
        @click="
          () => {
            router.push('/')
          }
        "
        variant="outline"
        class="hover:bg-primary-100 my-2 w-full bg-primary text-white hover:text-muted"
        >Back</Button
      >
    </div>
    <div v-else class="rounded-lg px-10 py-20 shadow-lg">
      <h1 class="text-center text-2xl">Welcome to {{ organization_name }}</h1>
      <p class="text-normal mt-3 text-sm">
        {{ inviter?.display_name }} invited you to join {{ organization_name }}'s care team
      </p>
      <div class="mt-5 flex flex-col gap-3">
        <Button
          @click="acceptInvite()"
          :loading="account_saving"
          variant="outline"
          class="hover:bg-primary-100 bg-primary text-white hover:text-muted"
          >Accept Invite</Button
        >
        <Button @click="rejectInvite()" :loading="saving" variant="outline">Cancel</Button>
      </div>
    </div>
  </div>
</template>
