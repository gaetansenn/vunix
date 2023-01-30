<template>
  <span v-if="icon.ongoing" :class="config.class" :width="sSize" :height="sSize" />
  <Iconify v-else-if="icon" :class="config.class" :icon="icon.value" :width="sSize" :height="sSize" />
  <span v-else :class="config.class" :style="{ fontSize: sSize, lineHeight: sSize, width: sSize, height: sSize }">{{
    name
  }}</span>
</template>

<script setup lang="ts">

import { Icon as Iconify } from '@iconify/vue/dist/offline'
import { loadIcon } from '@iconify/vue'
import { computed, getCurrentInstance, inject, reactive, watch } from 'vue';

import { props as iconProps } from './Icon.props'
import { injectDefaultValues } from '../commons/props';
import { VunixConfigKey } from '../../../runtime/utils/config';
import { useConfig } from '../../composables/config';
import type { IconConfig } from './Icon.config';

const props = defineProps(iconProps)
const propSize = props.size

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, iconProps, inject(VunixConfigKey)?.Icon.defaults)

const config = useConfig<IconConfig>({
  props
}, inject(VunixConfigKey))

let icon: any = reactive({
  ongoing: false
})

const sSize = computed(() => {
  const size = propSize === config.size ? config.size : props.size as string
  if (String(Number(size)) === size) {
    return `${size}px`
  }

  return size
})

async function loadIconComponent() {
  icon.ongoing = true
  icon.value = await loadIcon(props.name as string).catch(() => undefined)
  icon.ongoing = false
}

watch(() => props.name, loadIconComponent, {
  immediate: true
})
</script>