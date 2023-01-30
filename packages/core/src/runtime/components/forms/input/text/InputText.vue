<template>
	<VInputBase v-bind="props" :value="modelValue" @input="$emit('update:modelValue', handleInputChange($event))">
		<template v-slot:leading>
			<slot name="leading" />
		</template>
		<template v-slot:heading>
			<slot name="heading" />
		</template>
	</VInputBase>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject } from 'vue';

import { VunixConfigKey } from '../../../../utils/config';
import { injectDefaultValues } from '../../../commons/props';
import { props as inputProps } from './InputText.props'

const props = defineProps(inputProps)

defineEmits(['update:modelValue'])

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value

// Inject default values
injectDefaultValues(getCurrentInstance()?.props, inputProps, inject(VunixConfigKey)?.InputText.defaults)

</script>