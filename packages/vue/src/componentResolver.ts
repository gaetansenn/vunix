import type { ComponentResolver } from 'unplugin-vue-components'

export function ComponentResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^V[A-Z]/)) {
        return { name, from: '@vunix/vue' }
      }
    },
  }
}