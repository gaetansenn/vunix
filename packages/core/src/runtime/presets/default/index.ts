import type { Config } from '../../utils/config';
import Button from './Button.config';
import InputBase from './InputBase.config';
import Icon from './Icon.config';
import FormGroup from './FormGroup.config';
import InputPassword from './InputPassword.config'
import TextArea from './TextArea.config'
import Select from './Select.config';
import InputRadio from './InputRadio.config'
import InputGroupRadio from './InputGroupRadio.config'
import InputGroupCheckbox from './InputGroupCheckbox.config'
import InputCheckbox from './InputCheckbox.config'
import FadeTransition from './FadeTransition.config'
import AccordionItem from './AccordionItem.config'
import CollapseTransition from './CollapseTransition.config'
import Accordion from './Accordion.config'

export default {
  Button,
  InputBase,
  InputPassword,
  Icon,
  FormGroup,
  TextArea,
  Select,
  InputRadio,
  InputGroupRadio,
  InputCheckbox,
  InputGroupCheckbox,
  Transition: {
    Fade: FadeTransition,
    Collapse: CollapseTransition
  },
  Accordion,
  AccordionItem
} as Config;