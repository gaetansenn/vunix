import { useTestContext } from '@nuxt/test-utils'
import { describe, test, expect } from 'vitest'

import { setupNuxtVunix } from './util'

describe('vunix module', async () => {
  await setupNuxtVunix()

  test('check injection of inter font', () => {
    const nuxt = useTestContext().nuxt

    expect(nuxt?.options.app.head.link).toContainEqual({
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter.css'
    })
  })

  test('check transpilation of @heroicons/vue', () => {
    const nuxt = useTestContext().nuxt

    expect(nuxt?.options.build.transpile).toContain('@heroicons/vue')
  })

  test('check nuxt tailwind config injected', () => {
    const nuxt = useTestContext().nuxt
    const vfsKey = Object.keys(nuxt?.vfs as object).find(k => k.includes('tailwind.config.'))

    expect(nuxt?.vfs[vfsKey as string]).contains("core/dist/runtime/utils/config.{ts,mjs}")
    expect(nuxt?.vfs[vfsKey as string]).contains("core/dist/runtime/components/**/*.{vue,js,ts,mjs}")
  })
})