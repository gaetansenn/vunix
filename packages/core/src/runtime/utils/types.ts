import type { Ref } from 'vue';

export type MaybeRef<T> = Ref<T> | T
export type Object<T> = { [key: string]: T }