import { configProp, sizeProp } from "../../commons/props"

const accordionProps = {
  /**
   * @description v-model activeIndex of expanded items
   */
  activeIndex: {
    type: [String, Number, Array]
  },
  /**
   * @description handle multiple accordion item selection
  */
  multiple: {
    type: Boolean
  }
}

export const props = {
  ...accordionProps,
  ...sizeProp,
  ...configProp('Accordion')
}