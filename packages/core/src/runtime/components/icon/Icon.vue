<template>
  <span v-if="icon.ongoing" :class="config.class" :width="sSize" :height="sSize" />
  <Iconify v-else-if="icon" :class="config.class" :icon="icon.value" :width="sSize" :height="sSize" />
  <span v-else :class="config.class" :style="{ fontSize: sSize, lineHeight: sSize, width: sSize, height: sSize }">{{
    name
  }}</span>
</template>

<script setup lang="ts">

import { Icon as Iconify } from '@iconify/vue/dist/offline'
import { computed, getCurrentInstance, inject, toRef } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import { props as iconProps } from './Icon.props'
import { injectDefaultValues } from '../commons/props';
import { VunixConfigSymbol } from '../../symbols'
import { useConfig } from '../../composables/config';
import type { IconConfig } from './Icon.config';
import { useIcon } from './icon.composable';

const props = defineProps(iconProps)
// Inject default values
injectDefaultValues(getCurrentInstance()?.props, iconProps, inject(VunixConfigSymbol)?.Icon.defaults)

const propSize = props.size
const config = useConfig<IconConfig>({
  props
}, inject(VunixConfigSymbol))

const sSize: ComputedRef<string> = computed(() => {
  const size: string = Object.keys(config.sizes).includes(propSize as string) ? config.size as string : props.size as string

  if (String(Number(size)) === size) {
    return `${size}px`
  }

  return size
})

const { icon } = await useIcon(toRef(props, 'name') as Ref<String>)
</script>