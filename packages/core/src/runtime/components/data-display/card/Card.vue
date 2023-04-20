<script lang="ts">
import { Ref, Slots, getCurrentInstance, h, inject, ref } from 'vue';

import { props as modalProps } from './Card.props'
import { injectDefaultValues } from '../../commons/props';
import { VunixConfigSymbol } from '../../../symbols'
import { useConfig } from '../../../composables/config';
import type { CardConfig } from './Card.config';
import VAccordionItem from '../../disclosure/accordion/item/AccordionItem.vue';

function useAccordionItem(props: any, slots: Slots, opened: Ref<boolean>, config: CardConfig) {
  const accordion = h(VAccordionItem, {
    header: props.header,
    modelValue: opened.value,
    'onUpdate:modelValue': (value: boolean) => opened.value = value,
    rootPath: props.rootPath ? `${props.rootPath}.AccordionItem` : 'Card',
    customConfig: props.config?.AccordionItem,
    size: props.size
  }, {
    'header-content': slots.header,
    footer: slots.footer,
    default: slots.default
  })

  if (slots.footer) return h('div', {}, [accordion, h('div', { class: [config.footer.class, config.footer.size] }, slots.footer())])
  else return accordion
}

function useCard(props: any, slots: Slots, config: CardConfig) {
  const childrens = []

  // Inject header
  if (props.header || slots.header) {
    childrens.push(h('div', { class: [config.header?.class, config.header?.size] }, props.header || slots.header()))
  }

  // Inject content
  if (slots.default) childrens.push(h('div', { class: [config.content?.class, config.content?.size] }, slots.default()))

  // Inject footer
  if (slots.footer) childrens.push(h('div', { class: [config.footer?.class, config.footer?.size] }, slots.footer()))

  return childrens
}

export default {
  components: {
    VAccordionItem
  },
  props: modalProps,
  setup(props, { slots }) {
    // Inject default values
    injectDefaultValues(getCurrentInstance()?.props, modalProps, inject(VunixConfigSymbol)?.Card.defaults)

    const opened = ref(!props.collapsed)

    const config = useConfig<CardConfig>({
      props,
      opened,
      slots
    }, inject(VunixConfigSymbol))

    return () => h('div', { class: [config.class, config.rounded, config.shadow] }, props.collapse ? useAccordionItem(props, slots, opened, config) : useCard(props, slots, config))
  }
}
</script>