<template>
  <component :is="is" v-bind="attrs" :class="[config.class, config.size, config.variant, config.rounded]">
    <slot />
    <component :is="loadingComponent" v-if="loading" :class="[config.loading.class, config.loading.size]" role="alert"
      aria-busy="true" />
  </component>
</template>

<script setup lang="ts">
import pick from 'lodash/pick.js'
import { computed, type ConcreteComponent, resolveComponent, inject, getCurrentInstance } from 'vue'

import { type IconType, VunixConfigKey } from '../../../utils/config'
import { useConfig } from '../../../composables/config'
import { toProp, injectDefaultValues } from '../../commons/props'
import { aTag, buttonTag } from '../../commons/tags'
import { props as buttonProps, type TypeType } from './Button.props'
import type { ButtonConfig } from './Button.config'

const props = defineProps(buttonProps)

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, buttonProps, inject(VunixConfigKey)?.Button.defaults)

const is = computed<TypeType | ConcreteComponent | string>(() => {
  if (props.type) return props.type as TypeType
  if (props.href) {
    return 'a'
  } else if (props.to) {
    const nuxtLink = resolveComponent('nuxt-link')

    return typeof nuxtLink !== 'string' ? nuxtLink : 'router-link'
  }

  return 'button'
})

const attrs = computed(() => {
  const value = (is.value as ConcreteComponent)?.name || is.value

  switch (value) {
    case 'a': return pick(props, Object.keys(aTag))
    case 'router-link':
    case 'NuxtLink':
    case 'nuxt-link': return pick(props, Object.keys(toProp))
    default: {
      return {
        ...pick(props, Object.keys(buttonTag)),
        disabled: props.disabled || props.loading,
        type: props.type,
      }
    }
  }
})

const config = useConfig<ButtonConfig>({
  props
}, inject(VunixConfigKey))

const loadingComponent = computed<IconType>(() => {
  if (typeof config.loading.icon === 'string') return 'div'

  return config.loading.icon
})
</script>
