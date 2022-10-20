import { getContext } from 'unctx'

export const dwUiCtx = getContext<any>('dw-vunix-core')

export function useDwUi (): any {
  const instance = dwUiCtx.tryUse()
  if (!instance) {
    throw new Error('DwUi instance is unavailable!')
  }
  return instance
}

export function tryUseDwUi (): any | null {
  return dwUiCtx.tryUse()
}
