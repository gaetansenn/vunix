import type { InjectionKey, UnwrapNestedRefs } from "vue";
import type { Field } from "./composables/form/field";
import type { Config } from "./utils/config";

export const VunixConfigSymbol: InjectionKey<UnwrapNestedRefs<Config>> = Symbol('vunix-config')
export const VunixFieldSymbol: InjectionKey<Field<unknown>> = Symbol('vunix-field')