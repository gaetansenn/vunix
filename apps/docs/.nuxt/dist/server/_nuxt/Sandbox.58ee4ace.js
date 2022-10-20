import __nuxt_component_0 from "./TabsHeader.b936d4f5.js";
import { j as useColorMode, k as __nuxt_component_0$1, f as _sfc_main$1, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
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
  __name: "Sandbox",
  __ssrInlineRender: true,
  props: {
    src: {
      type: String,
      default: ""
    },
    repo: {
      type: String,
      default: ""
    },
    branch: {
      type: String,
      default: ""
    },
    dir: {
      type: String,
      default: ""
    },
    file: {
      type: String,
      default: "app.vue"
    }
  },
  setup(__props) {
    const props = __props;
    const colorMode = useColorMode();
    const providers = {
      CodeSandBox: () => `https://codesandbox.io/embed/github/${props.repo}/tree/${props.branch}/${props.dir}?hidenavigation=1&theme=${colorMode.value}`,
      StackBlitz: () => `https://stackblitz.com/github/${props.repo}/tree/${props.branch}/${props.dir}?embed=1&file=${props.file}&theme=${colorMode.value}`
    };
    const providersTabs = Object.keys(providers).map((p) => ({ label: p }));
    const activeTabIndex = ref(-1);
    const tabs = ref();
    const url = ref("");
    const provider = ref("");
    const changeProvider = (value) => {
      provider.value = value;
      url.value = props.src || providers[provider.value]();
      localStorage.setItem("docus_sandbox", value);
    };
    const sandBoxUrl = computed(() => {
      var _a;
      return (_a = url.value) == null ? void 0 : _a.replace("?embed=1&", "?").replace("/embed/", "/s/");
    });
    const updateTab = (i) => {
      activeTabIndex.value = i;
      changeProvider(providersTabs[i].label);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TabsHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sandbox my-4 min-h-[500px] w-full" }, _attrs))} data-v-cfa0450b>`);
      if (!__props.src) {
        _push(ssrRenderComponent(_component_TabsHeader, {
          ref_key: "tabs",
          ref: tabs,
          "active-tab-index": activeTabIndex.value,
          tabs: unref(providersTabs),
          "onUpdate:activeTabIndex": updateTab
        }, {
          footer: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute top-1/2 right-0 -translate-y-1/2 transform px-4" data-v-cfa0450b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                class: "u-text-gray-500 hover:u-text-gray-700 flex items-center",
                to: unref(sandBoxUrl),
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "heroicons-outline:arrows-expand",
                      class: "h-6 w-6"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "heroicons-outline:arrows-expand",
                        class: "h-6 w-6"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "absolute top-1/2 right-0 -translate-y-1/2 transform px-4" }, [
                  createVNode(_component_NuxtLink, {
                    class: "u-text-gray-500 hover:u-text-gray-700 flex items-center",
                    to: unref(sandBoxUrl),
                    target: "_blank"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "heroicons-outline:arrows-expand",
                        class: "h-6 w-6"
                      })
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (url.value) {
        _push(`<iframe${ssrRenderAttr("src", url.value)} title="Sandbox editor" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" class="h-full min-h-[700px] w-full overflow-hidden" data-v-cfa0450b></iframe>`);
      } else {
        _push(`<span class="flex-1 text-white" data-v-cfa0450b>Loading Sandbox...</span>`);
      }
      _push(`</div>`);
    };
  }
});
const Sandbox_vue_vue_type_style_index_0_scoped_cfa0450b_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/Sandbox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Sandbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cfa0450b"]]);
export {
  Sandbox as default
};
//# sourceMappingURL=Sandbox.58ee4ace.js.map
