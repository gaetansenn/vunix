import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ohmyfetch";
import "ufo";
import "#internal/nitro";
import "hookable";
import "unctx";
import "destr";
import "h3";
import "defu";
import "vue-router";
import "scule";
import "property-information";
import "html-tags";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "ohash";
import "cookie-es";
import "pinceau/runtime";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 124 124",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M48 82.5887L57.1066 98.175C59.3073 101.942 64.8092 101.942 67.0102 98.175L101 40H72.8834L48 82.5887Z" fill="currentColor"></path><path d="M77 33H104.936L105.23 32.4924C107.417 28.718 104.684 24 100.31 24H82.2142L77 33Z" fill="currentColor"></path><path d="M74 24L68.7601 33H19.0689L18.7734 32.4924C16.5759 28.718 19.3228 24 23.7177 24H74Z" fill="currentColor"></path><path d="M65 40L44 76L23 40H65Z" fill="currentColor"></path></svg>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/icons/IconVueTelescope.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IconVueTelescope = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  IconVueTelescope as default
};
//# sourceMappingURL=IconVueTelescope.91de1f01.js.map
