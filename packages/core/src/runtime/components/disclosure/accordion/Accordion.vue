<script lang="ts">
import { getCurrentInstance, h, inject, provide, readonly } from 'vue';

import { props as accordionProps } from './Accordion.props'
import { injectDefaultValues } from '../../commons/props';
import type { AccordionConfig } from './Accordion.config';
import { VunixConfigSymbol } from '../../../symbols';
import { useConfig } from '../../../composables/config';
import { useModelWrapper } from '../../../composables/form/field';
import { AccordionSymbol } from './symbol';

export default {
  name: 'Accordion',
  props: accordionProps,
  setup(props, { slots, emit }) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, accordionProps, inject(VunixConfigSymbol)?.Accordion.defaults)

    const config = useConfig<AccordionConfig>({
      props
    }, inject(VunixConfigSymbol))

    const activeIndex = useModelWrapper(props, emit, 'activeIndex')

    provide(AccordionSymbol, {
      updateModelValue(id: number, pushValue: boolean) {
        // Convert value to array of value if multiple true
        if (props.multiple) {
          if (!Array.isArray(activeIndex.value)) {
            if (activeIndex.value) activeIndex.value = [activeIndex.value]
            else activeIndex.value = []
          }
        }

        if (props.multiple) {
          if (pushValue && !activeIndex.value.includes(id)) activeIndex.value.push(id)
          else if (!pushValue) {
            const valueIndex = activeIndex.value.indexOf(id)

            if (valueIndex !== -1) activeIndex.value.splice(valueIndex, 1)
          }
        } else if (pushValue) activeIndex.value = id
        else activeIndex.value = null
      },
      activeIndex: readonly(activeIndex)
    })

    // Using render function to inject index of AccordionItem inside default slot
    return () => h('div', { class: config.class }, slots.default().map((slot, index) => {
      return h(slot.type, { ...slot.props, index }, slot.children)
    }))
  }
}
</script>