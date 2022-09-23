<template>
  <component :is="is" v-bind="attrs" :class="[config.class, config.size, config.variant, config.rounded]">
    <slot />
    <component :is="isLoading" v-if="loading" :class="[config.loading.fixed, config.loading.size]" role="alert" aria-busy="true" />
  </component>
</template>

<!-- <script lang="ts">
const typeTypes = ['a', 'nuxt-link', 'router-link', 'button', 'div', 'span'] as const
type TypeType = typeof typeTypes[number]

export default {}
</script> -->

<script setup lang="ts">
import pick from 'lodash/pick'
import { computed, ConcreteComponent, getCurrentInstance, onMounted, resolveComponent } from 'vue'
import { ButtonConfig, buttonConfig, IconType } from '../utils/config'
import { useConfig } from '../composables/config'
import { sizeProp, toProp, variantProp, roundedProp } from './commons/props'
import { aTag, buttonTag } from './commons/tags'
import { toAriaBoolean } from './commons/accessibilityAttrs'
import { useNuxtLink } from '../composables/nuxt'
import { tagProp, TypeType } from './DwButtonProps'


const props = defineProps({
  ...sizeProp,
  ...aTag,
  ...toProp,
  ...buttonTag,
  ...variantProp,
  ...roundedProp,
  /**
   * @description Use to display a loader to notify the user that a processing taking place.
   * You can customize the loading content from the congiguration file or by using the scope slot loading
   * @type {Boolean}
  */
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean
  },
  ...tagProp,
  /**
   * @description Use to set button as toggle button
   * @type {Boolean}
  */
  toggle: {
    type: Boolean
  }
})

const nuxtLink = useNuxtLink()

console.log('resolve component in setup', resolveComponent('nuxt-link'))

const is = computed<TypeType | ConcreteComponent | string>(() => {
  if (props.type) return props.type as TypeType
  if (props.href) {
    return 'a'
  } else if (props.to) {
    return true ? resolveComponent('nuxt-link') : 'router-link'
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
        'aria-disabled': toAriaBoolean(props.disabled)
      }
    }
  }
})

const config = useConfig<ButtonConfig>({
  props
}, buttonConfig)

const isLoading = computed<IconType>(() => {
  if (typeof config.loading.icon === 'string') return 'div'

  return config.loading.icon
})
</script>
