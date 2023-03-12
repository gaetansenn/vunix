import { isRef, reactive, unref, watch } from 'vue';
import { IconifyIcon, loadIcon } from '@iconify/vue';
import type { MaybeRef } from '@core/runtime/utils/types';

interface Icon {
  ongoing: boolean,
  value?: Required<IconifyIcon>
}

export async function useIcon(name: MaybeRef<String>) {
  const icon = reactive({
    ongoing: false,
  }) as Icon

  async function loadIconComponent() {
    icon.ongoing = true
    icon.value = await loadIcon(unref(name) as string).catch(() => undefined)
    icon.ongoing = false
  }

  // Watch to name icon change if value is a ref
  if (isRef(name)) watch(() => name, loadIconComponent)

  await loadIconComponent()

  return { icon, loadIconComponent }
}