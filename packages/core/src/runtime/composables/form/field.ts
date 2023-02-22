import { computed, getCurrentInstance, InjectionKey, provide, Ref, ref, ToRefs, unref, UnwrapRef, watch } from 'vue';

import { required } from '@vunix/rules'
import type { MaybeRef } from '../../utils/types';
import { VunixFieldSymbol } from '../../symbols';
import type { RuleExpression } from './rules';

export type ValueType<T> = T | UnwrapRef<NonNullable<T>> | UnwrapRef<T> | undefined

export interface FieldOptions<T = unknown> {
  required: boolean,
  initialValue?: MaybeRef<T | undefined>; // Could be modelValue from prop
  label?: MaybeRef<string>;
  modelPropName?: string; // Default modelValue
  validateOnValueUpdate?: boolean;
  validateOnVmodelUpdate?: boolean; // Apply validation on v-model value update
}

export interface FieldMeta<T> {
  touched: boolean; // If the field has been blurred
  dirty: boolean; // field value changed
  valid: boolean; // All validation passed
}

export interface FieldField<T> {
  value: Ref<ValueType<T>>,
  errors: Ref<string[]>,
  errorMessage: Ref<string>,
  onInput: (event: Event) => void,
  onChange: (event: Event) => void,
  onBlur: (event: Event) => void,
  onFocus: (event: Event) => void,
  validate: (value: MaybeRef<ValueType<T>>) => Promise<ValidationResult>
}

export interface ValidationResult {
  errors: string[];
  valid: boolean;
}

export interface Field<T> {
  meta: ToRefs<FieldMeta<T>>,
  field: FieldField<T>
}


function normalizeOptions<T>(name: string, opts?: FieldOptions<T>): FieldOptions<T> {
  const defaults = (): Partial<FieldOptions> => ({
    initialValue: undefined,
    label: name,
    validateOnValueUpdate: true,
    validateOnVmodelUpdate: false,
    modelPropName: 'modelValue'
  })

  if (!opts) return defaults() as FieldOptions<T>

  return {
    ...defaults(),
    ...opts,
    initialValue: unref(opts?.initialValue)
  }
}

export function useField<T = unknown>(name: MaybeRef<string>, rules?: RuleExpression<ValueType<T>>[], opts?: FieldOptions<T>) {
  const emit = getCurrentInstance()?.emit as any
  const options = normalizeOptions(unref(name), opts)
  // create field value
  const field: FieldField<T> = {
    value: ref(getCurrentInstance()?.props.modelValue as T || opts?.initialValue || undefined),
    errors: ref([]),
    errorMessage: computed(() => field.errors.value[0]),
    onInput,
    onChange,
    onBlur,
    onFocus,
    validate,
  }
  const meta: ToRefs<FieldMeta<T>> = {
    dirty: ref(false),
    valid: ref(true),
    touched: ref(false)
  }
  const props = getCurrentInstance()?.props
  // Sync v-model with field value
  watch(() => props?.modelValue, (newValue) => {
    field.value.value = newValue as T

    // Handle validation
    if (options.validateOnVmodelUpdate) onChange()
  })


  function onInput(event: Event) {
    emit(`update:${options.modelPropName}`, (event.target as HTMLInputElement).value)

    field.value.value = (event.target as HTMLInputElement).value as ValueType<T>

    meta.dirty.value = true
  }

  function onChange() {
    // Handle validation process
    if (options.validateOnValueUpdate) validate(field.value)
  }

  function onBlur(event: Event) {
    meta.touched.value = true

    // Validate on touched
    validate(field.value)

    // Emit blur event
    emit('blur', event)
  }

  function onFocus(event: Event) {
    // Emit focus event
    emit('focus', event)
  }

  // Inject required rule if provided from props
  if (opts?.required) rules = [required, ...(rules || [])]

  async function validate(value: MaybeRef<ValueType<T>>): Promise<ValidationResult> {
    const validReturn = { errors: [], valid: true }

    // Restore to valid
    field.errors.value = []
    meta.valid.value = true

    if (!rules) return validReturn

    value = unref(value)

    rules.forEach((rule) => {
      // Rule function type
      if (rule instanceof Function) {
        const valid = rule(value as ValueType<T>)

        if (typeof valid === 'string') field.errors.value.push(valid)

        if (valid === false || typeof valid === 'string') {
          meta.valid.value = false
        }
      }

      // TODO: Rule string type
    })

    // Handle error message
    if (!meta.valid.value) {
      field.errors.value = handleError()

      return { errors: field.errors.value, valid: false }
    } else field.errors.value = []

    return validReturn
  }

  function handleError(): string[] {
    return [`The field ${name} is not valid`]
  }

  provide(VunixFieldSymbol as InjectionKey<Field<T>>, { field, meta })

  return {
    field,
    meta
  }
}

export function useBindField<T>(field: FieldField<T>, props: any, attrs: any) {
  return computed(() => {
    const _props = {
      ...props,
      ...attrs,
      onInput: field.onInput,
      onChange: field.onChange,
      onBlur: field.onBlur,
      onFocus: field.onFocus,
      value: field.value.value,
      error: !!field.errors.value.length
    }

    return _props
  })
}