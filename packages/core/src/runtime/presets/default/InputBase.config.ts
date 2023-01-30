
import type { InputBaseConfig } from '../../components';
import { KeyValue, RoundedEnum, SizeEnum } from '../../utils/config';

const config = {
  class: 'inline-flex',
  input: {
    class: 'placeholder:transition-all focus:placeholder:pl-1 appearance-none bg-transparent focus:outline-none w-full'
  },
  variants: {
    default: 'bg-gray-100 border border-gray-200 text-gray-800 [&>input]:placeholder:text-gray-500 [&.focused]:border-blue-300 group-[&.focused]:ring-blue-300 [&.focused]:ring-2',
  },
  size: ({ props }) => {
    // Due to content optimisation https://tailwindcss.com/docs/content-configuration
    const commons: KeyValue<string> = {
      [SizeEnum.sm]: 'py-1.5 text-xs',
      [SizeEnum.md]: 'py-2 text-sm',
      [SizeEnum.lg]: 'py-2 text-xl',
    }
    const classes = [commons[props.size]]

    const padding: KeyValue<string> = {
      [SizeEnum.sm]: 'px-3',
      [SizeEnum.md]: 'px-3',
      [SizeEnum.lg]: 'px-3',
    }
    const leftPadding: KeyValue<string> = {
      [SizeEnum.sm]: 'pl-3',
      [SizeEnum.md]: 'pl-3',
      [SizeEnum.lg]: 'pl-3',
    }
    const rightPadding: KeyValue<string> = {
      [SizeEnum.sm]: 'pr-3',
      [SizeEnum.md]: 'pr-3',
      [SizeEnum.lg]: 'pr-3',
    }
    const leadingSpacing: KeyValue<string> = {
      [SizeEnum.sm]: 'pl-1.5',
      [SizeEnum.md]: 'pl-2',
      [SizeEnum.lg]: 'pl-2',
    }
    const trailingSpacing: KeyValue<string> = {
      [SizeEnum.sm]: 'pr-1.5',
      [SizeEnum.md]: 'pr-2',
      [SizeEnum.lg]: 'pr-2',
    }

    if (props.leading) classes.push(leadingSpacing[props.size])
    if (props.trailing) classes.push(trailingSpacing[props.size])
    if (!props.leading && !props.trailing) classes.push(padding[props.size])
    else if (!props.trailing) classes.push(rightPadding[props.size])
    else if (!props.leading) classes.push(leftPadding[props.size])

    return classes.join(' ')
  },
  defaults: {
    rounded: RoundedEnum.lg
  },
  leading: {
    class: ({ props }) => {
      const spacing: KeyValue<string> = {
        [SizeEnum.sm]: 'pr-1',
        [SizeEnum.md]: 'pr-1',
        [SizeEnum.lg]: 'pr-1',
      }

      return `text-gray-400 font-semibold pointer-events-none inset-y-0 right-0 flex items-center ${spacing[props.size]}`
    },
    sizes: {
      [SizeEnum.sm]: '1.25rem',
      [SizeEnum.md]: '1.375rem',
      [SizeEnum.lg]: '1.5rem',
    },
  },
  trailing: {
    class: ({ props }) => {
      const spacing: KeyValue<string> = {
        [SizeEnum.sm]: 'pl-1',
        [SizeEnum.md]: 'pl-1',
        [SizeEnum.lg]: 'pl-1',
      }

      return `text-gray-400 font-semibold pointer-events-none inset-y-0 left-0 flex items-center ${spacing[props.size]}`
    },
    sizes: {
      [SizeEnum.sm]: '1.25rem',
      [SizeEnum.md]: '1.375rem',
      [SizeEnum.lg]: '1.5rem',
    },
  }
} as InputBaseConfig;

export default config;