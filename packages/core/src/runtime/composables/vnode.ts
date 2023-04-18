import { ComponentInternalInstance, getCurrentInstance } from "vue";

/**
 * Return parent component by name
 * @param name 
 * @param level 
 */
export function getParentComponentByName(name: string, component: ComponentInternalInstance | null, level: number = 3): ComponentInternalInstance | null {
  if (!component) return null
  if (!component.parent) return null

  if (component.parent?.type.name === name || component.parent?.type.__name === name) return component.parent
  else if (level !== 0) return getParentComponentByName(name, component.parent, level - 1)

  return null
}

/**
 * Get identifier of component
 * @param id id to return
 * @param prefix prefix to add if no id provided
 */
export const useId = (prefix: string, id?: string | number | undefined) => {
  return id ? `${id}` : `${prefix}${getCurrentInstance()?.uid}`
}