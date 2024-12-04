import { onMounted, onUnmounted, nextTick, ref, type Ref, watch } from 'vue'

export type Params = {
  initialExpanded?: boolean
  scrollThreshold?: number
  scrollView: Ref<HTMLElement | null>
  scrollToBottomOnMount?: boolean
}

const useExpandableScroll = (params: Params) => {
  const expanded = ref(params.initialExpanded ?? false)
  const scrollThreshold = ref(params.scrollThreshold ?? 75)
  const scrollView = ref<HTMLElement | null>(params.scrollView.value ?? null)
  const scrollToBottomOnMount = ref(params.scrollToBottomOnMount ?? true)
  const prevScrollTop = ref(0)
  const currentlyAtBottom = ref(false)
  const previouslyAtBottom = ref(false)

  const handleScroll = () => {
    if (!scrollView.value) return

    if (currentlyAtBottom.value && previouslyAtBottom.value) {
      setBottomVars()
      return
    }

    const currentScrollTop = scrollView.value?.scrollTop

    // catches the bouncing on specific heights where the expanded section collapses but the new height doesnt have a scrollbar therefore it re-expands
    const hasScrollbar = scrollView.value.scrollHeight > scrollView.value.clientHeight

    if (!hasScrollbar) {
      expanded.value = true
      prevScrollTop.value = currentScrollTop
    }

    if (currentScrollTop === 0 && !hasScrollbar) {
      return
    }

    if (currentScrollTop === 0) {
      expanded.value = true
      prevScrollTop.value = 0
      return
    }

    // prevent manual contract -> scroll from bouncing in the 0-threshold range
    if (!expanded.value && currentScrollTop <= scrollThreshold.value) {
      return
    }

    setBottomVars()

    expanded.value = currentScrollTop <= scrollThreshold.value
    prevScrollTop.value = currentScrollTop
  }

  function setBottomVars() {
    if (!scrollView.value) return
    const { scrollTop, scrollHeight, clientHeight } = scrollView.value
    currentlyAtBottom.value = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    previouslyAtBottom.value = currentlyAtBottom.value
  }

  function scrollToBottom() {
    if (!scrollView.value || !scrollToBottomOnMount.value) return
    scrollView.value.scrollTop = scrollView.value.scrollHeight
  }

  function setupEventListeners() {
    if (!scrollView.value) return
    scrollView.value.scrollTop = scrollView.value.scrollHeight
    scrollView.value.addEventListener('scroll', handleScroll)
  }

  function toggleExpanded() {
    if (!scrollView.value) return
    expanded.value = !expanded.value
  }

  // script setup sends in null for scroll view. once it is mounted, we need to update the ref
  watch(
    () => params.scrollView.value,
    (newValue: HTMLElement | null) => {
      scrollView.value = newValue
    },
    { once: true }
  )

  onMounted(() => {
    nextTick(() => {
      scrollToBottom()
      setupEventListeners()
      handleScroll()
    })
  })

  onUnmounted(() => {
    if (scrollView.value) {
      scrollView.value.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    expanded,
    toggleExpanded,
    handleScroll
  }
}

export { useExpandableScroll }
