import { configProp, sizeProp } from "../../../commons/props"

const accordionItemProps = {
  /**
   * @description v-model value of expanded
   */
  modelValue: {
    type: Boolean
  },
  /**
   * @description Header tag type
   * @type {string}
   */
  tag: {
    type: String,
    defaultValue: 'h2'
  },
  /**
   * @description Header text content
   */
  header: {
    type: String
  },
  /**
   * @description index injected by Accordion component to handle active index
   */
  index: {
    type: Number
  }
}

export const props = {
  ...accordionItemProps,
  ...sizeProp,
  ...configProp('AccordionItem')
}