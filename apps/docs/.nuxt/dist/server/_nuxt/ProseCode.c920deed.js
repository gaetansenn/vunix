import _sfc_main$1 from "./CopyButton.27fa6c2b.js";
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "./index.085ddc5c.js";
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
  __name: "ProseCode",
  __ssrInlineRender: true,
  props: {
    code: {
      type: String,
      default: ""
    },
    language: {
      type: String,
      default: null
    },
    filename: {
      type: String,
      default: null
    },
    highlights: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CopyButton = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[`highlight-${__props.language}`], "prose-code group w-full text-gray-50"]
      }, _attrs))} data-v-1a812aac>`);
      if (__props.filename) {
        _push(`<span class="filename absolute top-1 right-1 z-0 rounded-lg py-1 pr-2 font-mono text-xs leading-none tracking-tight text-gray-400 opacity-100" data-v-1a812aac>${ssrInterpolate(__props.filename)}</span>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_CopyButton, {
        content: __props.code,
        class: "copy-button absolute right-1 bottom-1 scale-0 opacity-0 transition"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const ProseCode_vue_vue_type_style_index_0_scoped_1a812aac_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/prose/ProseCode.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProseCode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1a812aac"]]);
export {
  ProseCode as default
};
//# sourceMappingURL=ProseCode.c920deed.js.map
