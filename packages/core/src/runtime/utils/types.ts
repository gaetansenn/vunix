import type { Ref } from 'vue';

export type MaybeRef<T> = Ref<T> | T
export type Object<T> = { [key: string]: T }
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};