import { resolveComponent } from "vue"

export function useNuxtLink () {
  const component = resolveComponent('NuxtLink')

  console.log('resolve component from composable', component)

  return true
}
