import { k as __nuxt_component_0, _ as _export_sfc } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, renderSlot, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProseH2",
  __ssrInlineRender: true,
  props: {
    id: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<h2${ssrRenderAttrs(mergeProps({ id: __props.id }, _attrs))} data-v-7c4bb2fc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        href: `#${__props.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</h2>`);
    };
  }
});
const ProseH2_vue_vue_type_style_index_0_scoped_7c4bb2fc_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/prose/ProseH2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProseH2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7c4bb2fc"]]);
export {
  ProseH2 as default
};
//# sourceMappingURL=ProseH2.773f78cc.js.map
