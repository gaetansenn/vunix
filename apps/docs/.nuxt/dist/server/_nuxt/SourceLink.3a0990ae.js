import __nuxt_component_0 from "./ProseP.37a41574.js";
import { k as __nuxt_component_0$1, f as _sfc_main$1 } from "../server.mjs";
import { defineComponent, resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
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
  __name: "SourceLink",
  __ssrInlineRender: true,
  props: {
    source: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProseP = __nuxt_component_0;
      const _component_GithubLink = resolveComponent("GithubLink");
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = _sfc_main$1;
      _push(ssrRenderComponent(_component_ProseP, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_GithubLink, {
              source: __props.source,
              edit: false
            }, {
              default: withCtx((data, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    href: data == null ? void 0 : data.url,
                    target: "_blank",
                    rel: "noopener",
                    class: "hover:text-primary-500 flex items-center gap-1 text-sm font-semibold"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "fa-brands:github",
                          class: "mr-1 h-5 w-5"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Show Source</span>`);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "fa-brands:github",
                            class: "mr-1 h-5 w-5"
                          }),
                          createVNode("span", null, "Show Source")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, {
                      href: data == null ? void 0 : data.url,
                      target: "_blank",
                      rel: "noopener",
                      class: "hover:text-primary-500 flex items-center gap-1 text-sm font-semibold"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "fa-brands:github",
                          class: "mr-1 h-5 w-5"
                        }),
                        createVNode("span", null, "Show Source")
                      ]),
                      _: 2
                    }, 1032, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_GithubLink, {
                source: __props.source,
                edit: false
              }, {
                default: withCtx((data) => [
                  createVNode(_component_NuxtLink, {
                    href: data == null ? void 0 : data.url,
                    target: "_blank",
                    rel: "noopener",
                    class: "hover:text-primary-500 flex items-center gap-1 text-sm font-semibold"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "fa-brands:github",
                        class: "mr-1 h-5 w-5"
                      }),
                      createVNode("span", null, "Show Source")
                    ]),
                    _: 2
                  }, 1032, ["href"])
                ]),
                _: 1
              }, 8, ["source"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/SourceLink.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=SourceLink.3a0990ae.js.map
