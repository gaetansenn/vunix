<template>
  <span v-if="icon.ongoing" :class="config.class" :width="sSize" :height="sSize" />
  <Iconify v-else-if="icon" :class="config.class" :icon="icon.value" :width="sSize" :height="sSize" />
  <span v-else :class="config.class" :style="{ fontSize: sSize, lineHeight: sSize, width: sSize, height: sSize }">{{
    name
  }}</span>
</template>

<script setup lang="ts">

import { Icon as Iconify } from '@iconify/vue/dist/offline'
import { computed, getCurrentInstance, inject, Ref, toRef } from 'vue';

import { props as iconProps } from './Icon.props'
import { injectDefaultValues } from '../commons/props';
import { VunixConfigSymbol } from '../../symbols'
import { useConfig } from '../../composables/config';
import type { IconConfig } from './Icon.config';
import { useIcon } from './icon.composable';

const props = defineProps(iconProps)
const propSize = props.size

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, iconProps, inject(VunixConfigSymbol)?.Icon.defaults)

const config = useConfig<IconConfig>({
  props
}, inject(VunixConfigSymbol))

const sSize = computed(() => {
  const size = propSize === config.size ? config.size : props.size as string
  if (String(Number(size)) === size) {
    return `${size}px`
  }

  return size
})

const { icon } = await useIcon(toRef(props, 'name') as Ref<String>)
</script>