import { f as _sfc_main$1, C as ContentSlot, _ as _export_sfc } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
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
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    iconClass: {
      type: String,
      default: ""
    },
    blurry: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = _sfc_main$1;
      const _component_ContentSlot = ContentSlot;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex" }, _attrs))} data-v-b4c29324><div class="${ssrRenderClass([{ blurry: __props.blurry }, "relative w-full p-8 card rounded-xl"])}" data-v-b4c29324>`);
      if (__props.icon) {
        _push(ssrRenderComponent(_component_Icon, {
          name: __props.icon,
          class: "inline-block w-8 h-8 mb-2 text-2xl"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<div data-v-b4c29324><h3 class="mb-2 text-lg font-semibold tracking-tight" data-v-b4c29324>`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.title,
        unwrap: "p"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Card title `);
          } else {
            return [
              createTextVNode(" Card title ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><p class="inline text-sm font-medium tracking-tight" data-v-b4c29324>`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.description,
        unwrap: "p"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Card description `);
          } else {
            return [
              createTextVNode(" Card description ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
    };
  }
});
const Card_vue_vue_type_style_index_0_scoped_b4c29324_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Card = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b4c29324"]]);
export {
  Card as default
};
//# sourceMappingURL=Card.96e7f462.js.map
