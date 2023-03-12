<template>
  <InputGroup :config="props.config" :config-path="props.configPath" :root-path="props.rootPath" :required="required"
    :description="description" :label="label" :optional-label="optionalLabel">
    <textarea v-model="field.value.value" v-bind="boundProps"
      :class="[config.class, config.variant, config.size, config.rounded]" />
    <template v-if="$attrs.maxlength" #bottom>
      <div :class="config.counter?.class">
        <span :class="config.counter?.currentLength">{{ modelValue?.length }}</span>
        <span :class="config.counter?.spliter">/</span>
        <span :class="config.counter?.totalLength">{{ $attrs.maxlength }}</span>
      </div>
    </template>
  </InputGroup>
</template>
  
<script lang="ts">
import { defineComponent, getCurrentInstance, inject, ref, useAttrs } from 'vue';

import InputGroup from '../input/group/InputGroup.vue'
import { injectDefaultValues } from '@core/runtime/components/commons/props';
import { props as textAreaProps } from './TextArea.props'
import { VunixConfigSymbol } from '@core/runtime/symbols';
import { useBindInputField, useField } from '@core/runtime/composables/form/field';
import { useConfig } from '../../../composables/config';
import { useFocus } from '@vueuse/core';
import type { TextAreaConfig } from './TextArea.config';

export default defineComponent({
  components: {
    InputGroup,
  },
  inheritAttrs: false,
  props: textAreaProps,
  emits: ['update:modelValue', 'focus', 'blur'],
  setup(props) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, textAreaProps, inject(VunixConfigSymbol)?.TextArea.defaults)

    const input = ref(null)
    // TODO: Check if we keep useFocus 
    const { focused } = useFocus(input)

    const config = useConfig<TextAreaConfig>({
      props,
      focused
    }, inject(VunixConfigSymbol))

    const { field } = useField<string>(props.name as string, props.rules, {
      required: props.required
    })
    const boundProps = useBindInputField(field, props, useAttrs())

    return { boundProps, config, props, field }
  }
})
</script>
  