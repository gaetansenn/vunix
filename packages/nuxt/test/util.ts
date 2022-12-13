import { setup } from '@nuxt/test-utils'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export const r = (s: string = '') => resolve('./fixtures/basic/' + s)

export const setupNuxtVunix = (vunix = {}) => {
  return setup({
    rootDir: r(),
    server: true,
    browser: false
  })
}