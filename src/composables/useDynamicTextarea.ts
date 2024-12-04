import { computed, ref } from 'vue'
export type DynamicTextareaParams = {
  initialText?: string
  minRows?: number
  maxRows?: number
}
const useDynamicTextarea = (params?: DynamicTextareaParams) => {
  const textInput = ref(params?.initialText ?? '')
  const minRows = ref(params?.minRows ?? 4)
  const maxRows = ref(params?.maxRows ?? 10)

  const clearInputText = () => {
    textInput.value = ''
  }

  const dynamicRows = computed(() => {
    const lines = textInput.value.split(/\r\n|\r|\n/) // Split the text by newline characters
    if (lines.length <= minRows.value) return minRows.value
    if (lines.length >= maxRows.value) return maxRows.value
    return lines.length
  })

  const onSubmit = () => {
    if (!textInput.value.trim()) {
      console.log('No text to submit')
      return
    }
    console.log('submitting text:', textInput.value)
    clearInputText()
  }

  return {
    textInput,
    dynamicRows,
    onSubmit,
    clearInputText
  }
}

export { useDynamicTextarea }
