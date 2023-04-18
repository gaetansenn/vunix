<template>
  <ConfigTransition :config="presetConfig" v-bind="newProps">
    <slot />
  </ConfigTransition>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject } from 'vue'

import { props } from './CollapseTransition.props'
import ConfigTransition from '../config/ConfigTransition.vue'
import { injectDefaultValues } from '../../commons/props'
import { VunixConfigSymbol } from '../../../symbols'
import { useConfig } from '../../../composables/config'
import type { ConfigTransitionConfig } from '../config/ConfigTransition.config'
import { keyConfigToAvoid } from '../presetConfig'

export default defineComponent({
  props,
  components: {
    ConfigTransition
  },
  setup(props) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, props, inject(VunixConfigSymbol)?.Icon.defaults)

    const presetConfig = useConfig<ConfigTransitionConfig>({
      props
    }, inject(VunixConfigSymbol), keyConfigToAvoid)

    const { rootPath, configPath, config, ...newProps } = props

    return { presetConfig, newProps }
  },
})
</script>