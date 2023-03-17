import { getCurrentInstance } from "vue"

export const useId = (id: string) => {
  return id || `v-form-${getCurrentInstance()?.uid}`
}