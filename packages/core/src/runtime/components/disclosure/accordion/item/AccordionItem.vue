<template>
  <div :class="config.class">
    <slot name="header" :toggle="toggle">
      <component :is="tag" :class="[config.header.class, config.header.size]">
        <Button :class="[config.header.button.class, config.header.button.size]" :aria-expanded="modelValue"
          :id="`${id}-button`" :aria-controls="`${id}-region`" @click="toggle"
          :root-path="$props.rootPath ? `${$props.rootPath}.Button` : 'Button'" :custom-config="$props.config?.Card"
          block>
          <span :class="[config.header.button.content.class, config.header.button.content.size]">
            <slot name="header-content">
              {{ $props.header }}
            </slot>
          </span>
          <slot name="icon">
            <div :class="config.header.button.icon?.class">
              <Icon v-if="typeof config.header.button.icon?.icon === 'string'" :name="config.header.button.icon?.icon"
                :size="config.header.button.icon?.size" />
              <component v-else :is="config.header.button.icon?.icon" :class="config.header.button.icon?.size" />
            </div>
          </slot>
        </Button>
      </component>
    </slot>
    <VCollapseTransition>
      <div v-show="modelValue" role="region" :ariaLabelledby="`${id}-button`" :id="`${id}-region`"
        :class="config.content?.wrapper">
        <div :class="config.content?.class">
          <slot />
        </div>
      </div>
    </VCollapseTransition>
  </div>
</template>

<script lang="ts">
import { WritableComputedRef, computed, defineComponent } from 'vue';

import { getCurrentInstance, inject } from 'vue';

import { props as accordionItemProps } from './AccordionItem.props'
import { injectDefaultValues } from '../../../commons/props';
import { VunixConfigSymbol } from '../../../../symbols'
import { useConfig } from '../../../../composables/config';
import type { AccordionItemConfig } from './AccordionItem.config';
import { getParentComponentByName, useId } from '../../../../../runtime/composables/vnode';
import { useModelWrapper } from '../../../../../runtime/composables/form/field';
import Button from '../../../elements/button/Button.vue';
import Icon from '../../../icon/Icon.vue'
import VCollapseTransition from '../../../transitions/collapse/CollapseTransition.vue'
import { AccordionProvide, AccordionSymbol } from '../symbol';

export default defineComponent({
  inheritAttrs: false,
  components: {
    Button,
    Icon,
    VCollapseTransition
  },
  props: accordionItemProps,
  setup(props, { emit }) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, accordionItemProps, inject(VunixConfigSymbol)?.AccordionItem.defaults)

    let modelValue: WritableComputedRef<boolean>;
    // Get identifier of component
    const id = useId('v-accordion-item-')
    // Get Accordion parent component
    const accordion = getParentComponentByName('Accordion', getCurrentInstance(), 1)

    // Handle Accordion component wrapper
    if (accordion) {
      const parentControls = inject(AccordionSymbol) as AccordionProvide

      modelValue = computed({
        set() {
          // update modelValue of parent
          parentControls?.updateModelValue(props.index as number, !modelValue.value)
        },
        get() {
          if (Array.isArray(parentControls.activeIndex.value)) return parentControls.activeIndex.value.includes(props.index)
          else return parentControls.activeIndex.value === props.index
        }
      })
    } else modelValue = useModelWrapper(props, emit, 'modelValue')

    const config = useConfig<AccordionItemConfig>({
      props,
      opened: modelValue
    }, inject(VunixConfigSymbol))

    const toggle = () => {
      modelValue.value = !modelValue.value
    }

    return { config, modelValue, id, toggle }
  }
})
</script>