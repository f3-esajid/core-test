<script setup lang="ts">
// COMPONENTS
import {
  ArrowRight,
  Rocket,
  Hourglass,
  ClipboardList,
  FileBarChart2,
  Settings,
  CheckCircle,
  CalendarClock,
  Timer
} from 'lucide-vue-next'
import { Button, Progress, Tooltip, TooltipContent, TooltipTrigger } from 'vue-ui'

// TS
import { computed } from 'vue'
import { usePlanBasedAppointmentGroup } from '@f3-esajid/rails-api'
import { useRoute, useRouter, type RouteLocationRaw } from 'vue-router'

// PROPS * DATA
const route = useRoute()
const router = useRouter()
const props = withDefaults(
  defineProps<{
    itemId: string
    focusedItemId: string
    focused?: boolean
    readOnly: boolean
  }>(),
  {
    focused: false
  }
)
const emits = defineEmits<{
  (e: 'update:focusedItemId', value: string): void
}>()

const {
  is_completed,
  is_in_progress,
  completed_count,
  total_count,
  plan_template_key,
  effortLevel,
  appointment_format,
  plan_template
} = usePlanBasedAppointmentGroup(props.itemId)

// COMPUTED
const isGroupAppt = computed(() => appointment_format.value === 'group')
const progress = computed(() => {
  if (completed_count.value && total_count.value) {
    return (completed_count.value / total_count.value) * 100
  } else {
    return 0
  }
})
const focused = computed(() => props.focusedItemId == props.itemId)

const iconForType = computed(() => {
  switch (plan_template_key.value) {
    case 'standard':
      return CalendarClock
    case 'program_intro':
      return Rocket
    case 'custom':
      return Hourglass
    case 'care_plan_init':
      return ClipboardList
    case 'care_plan_review':
      return CalendarClock
    case 'progress_review':
      return FileBarChart2
    default:
      return Settings
  }
})
const msgForEffortLevel = computed(() => {
  switch (effortLevel.value) {
    case 1:
      return 'Quick - minimal time and effort'
    case 2:
      return 'Moderate - some time and attention required'
    case 3:
      return 'Extended - requires more time and focus'
    default:
      return 'Quick - minimal time and effort'
  }
})
// METHODS
function handleApptStart() {
  if (props.readOnly) return
  let routerOpts: RouteLocationRaw
  if (isGroupAppt.value) {
    // TODO: theme should be read from a global calendar
    routerOpts = {
      name: 'Checkins',
      params: {
        theme: 'symptoms'
      }
    }
  } else {
    routerOpts = {
      name: 'Appointment',
      query: {
        filters: {
          with_status: 'planned',
          with_plan_template_key: plan_template_key.value
        } as any
      }
    }
    if (route?.query?.date && routerOpts?.query) {
      routerOpts.query.date = route?.query?.date
    }
  }
  router.push(routerOpts)
}
</script>
<template>
  <div
    class="group grid cursor-pointer grid-cols-12 items-center gap-4 rounded-2xl border border-border bg-layer-1 p-2"
    :class="{
      'border-positive bg-positive/10': is_completed,
      'border-primary bg-primary/10': focused && !readOnly,
      'cursor-not-allowed opacity-70': readOnly,
      'shadow-sm hover:shadow-lg dark:shadow-blue-50/10': !readOnly
    }"
    @click="!readOnly && emits('update:focusedItemId', itemId)"
  >
    <div class="col-span-1 justify-self-center">
      <component
        :is="iconForType"
        :class="[is_completed ? 'text-positive' : 'text-primary', { 'opacity-70': readOnly }]"
      />
    </div>

    <div class="col-span-9">
      <div class="grid-rows-auto grid gap-2">
        <div class="text-xl text-foreground">
          {{ plan_template?.label }}
        </div>
        <div class="flex items-center justify-between text-sm text-muted-foreground">
          <div v-if="is_completed">{{ completed_count }} Patients</div>
          <div v-else>
            {{ (Number(total_count) || 0) - (Number(completed_count) || 0) }} Patients Remaining
          </div>
          <Tooltip>
            <TooltipTrigger>
              <div v-if="!is_completed && !readOnly" class="flex items-center">
                <Timer
                  v-for="i in effortLevel"
                  :key="i"
                  :class="['text-primary', { 'opacity-70': readOnly }]"
                  :size="16"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {{ msgForEffortLevel }}
            </TooltipContent>
          </Tooltip>
        </div>
        <Progress
          v-if="is_in_progress"
          :model-value="progress"
          class="h-2"
          primary-color="bg-primary/80"
          :class="{
            'bg-layer-1': focused && !readOnly,
            'opacity-70': readOnly
          }"
        />
      </div>
    </div>
    <div class="col-span-2 justify-self-center">
      <template v-if="is_completed">
        <div class="flex items-center gap-4 text-positive" :class="{ 'opacity-70': readOnly }">
          <CheckCircle />
        </div>
      </template>
      <template v-else>
        <template v-if="!readOnly">
          <Button
            :variant="focused && !readOnly ? 'default' : 'ghost'"
            :class="{
              'hover:bg-primary/90 group-hover:bg-primary group-hover:text-primary-foreground':
                !readOnly,
              'cursor-not-allowed opacity-70': readOnly
            }"
            @click="handleApptStart()"
            :disabled="readOnly"
          >
            <div class="flex items-center space-x-2">
              <ArrowRight />
              <div>
                <template v-if="is_in_progress"> Continue </template>
                <template v-else> Start </template>
              </div>
            </div>
          </Button>
        </template>
      </template>
    </div>
  </div>
</template>
