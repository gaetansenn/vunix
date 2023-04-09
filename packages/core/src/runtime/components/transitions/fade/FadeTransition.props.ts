import { Transition } from 'vue'
import { configProp } from "../../commons/props"

export const props = {
  ...Transition.props,
  ...configProp('Transition.Fade')
}