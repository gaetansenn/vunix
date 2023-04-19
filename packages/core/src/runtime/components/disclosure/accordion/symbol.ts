import type { InjectionKey, Ref } from "vue";

export interface AccordionProvide {
  updateModelValue: (id: number, pushValue: boolean) => void
  activeIndex: Readonly<Ref<number>>
}

export const AccordionSymbol: InjectionKey<AccordionProvide> = Symbol('vunix-accordion')