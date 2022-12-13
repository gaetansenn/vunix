<template>
  <component :is="is" v-bind="attrs" :class="[config.class, config.size, config.variant, config.rounded]">
    <slot />
    <component :is="loadingComponent" v-if="loading" :class="[config.loading.fixed, config.loading.size]" role="alert" aria-busy="true" />
  </component>
</template>

<script setup lang="ts">
import pick from 'lodash/pick'
import { computed, type ConcreteComponent, resolveComponent, inject } from 'vue'

import { type IconType, VunixConfigKey } from '../../../utils/config'
import { useConfig } from '../../../composables/config'
import { sizeProp, toProp, variantProp, roundedProp } from '../../commons/props'
import { aTag, buttonTag } from '../../commons/tags'
import { toAriaBoolean } from '../../commons/accessibilityAttrs'
import { props as buttonProps, type TypeType } from './Button.props'
import { buttonConfig, type ButtonConfig } from './Button.config'

// get button config
const _config = inject(VunixConfigKey)

console.log(_config)

const props = defineProps({
  ...sizeProp,
  ...toProp,
  ...variantProp,
  ...roundedProp,
  ...buttonProps,
  ...buttonTag,
  ...aTag,
})

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
        disabled: props.disabled || props.loading,
        type: props.type,
        ...pick(props, Object.keys(buttonTag)),
      }
    }
  }
})

const config = useConfig<ButtonConfig>({
  props
}, buttonConfig)

const loadingComponent = computed<IconType>(() => {
  if (typeof config.loading.icon === 'string') return 'div'

  return config.loading.icon
})
</script>
