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
    viewBox: "0 0 105 104",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path fill-rule="evenodd" clip-rule="evenodd" d="M104.297.31104.87354.3111V103.735H104.297V.31104ZM93.7196 93.1572V10.8885H11.4509v82.2687h82.2687Z" fill="currentColor"></path></svg>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/icons/IconCodeSandBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IconCodeSandBox = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  IconCodeSandBox as default
};
//# sourceMappingURL=IconCodeSandBox.b29c2ec5.js.map
