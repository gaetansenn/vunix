import { ref } from "vue";
import svgToDataUri from 'mini-svg-data-uri';

import { useIcon } from "../../icon/icon.composable";
import type { SelectConfig } from "./Select.config";

/**
 * Return carret icon style for select
 * @param config 
 */
export async function useCarret(config: SelectConfig) {
  const carretSvgIcon = await useIcon(config.carret?.icon || 'heroicons-solid:chevron-down')
  const carretSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${carretSvgIcon.icon.value?.width} ${carretSvgIcon.icon.value?.height}">${carretSvgIcon.icon.value?.body}</svg>`
  const style = {
    'background-image': `url("${svgToDataUri(carretSvg)}")`,
  }

  // Replace fill or stroke with custom value if provided
  if (config.carret?.fill) style['background-image'] = style['background-image'].replace(/fill='(\w*)'/g, `fill='${config.carret?.fill}'`)
  if (config.carret?.stroke) style['background-image'] = style['background-image'].replace(/stroke='(\w*)'/g, `stroke='${config.carret?.stroke}'`)

  return { style }
}