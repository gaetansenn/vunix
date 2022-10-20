import { u as useContent, l as useDocus, k as __nuxt_component_0, f as _sfc_main$1 } from "../server.mjs";
import { defineComponent, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
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
  __name: "PageEditLink",
  __ssrInlineRender: true,
  setup(__props) {
    const { page } = useContent();
    const docus = useDocus();
    const root = computed(() => {
      var _a;
      return ((_a = docus.value.github) == null ? void 0 : _a.root) || "/";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GithubLink = resolveComponent("GithubLink");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = _sfc_main$1;
      _push(ssrRenderComponent(_component_GithubLink, mergeProps({
        "content-dir": unref(root),
        page: unref(page)
      }, _attrs), {
        default: withCtx((data, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="flex"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              href: data == null ? void 0 : data.url,
              target: "_blank",
              rel: "noopener",
              class: "flex items-center inline-block gap-2 text-sm hover:text-primary-500 grow-0"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "heroicons-outline:external-link",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Edit this page on GitHub</span>`);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "heroicons-outline:external-link",
                      class: "w-5 h-5"
                    }),
                    createVNode("span", null, "Edit this page on GitHub")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "flex" }, [
                createVNode(_component_NuxtLink, {
                  href: data == null ? void 0 : data.url,
                  target: "_blank",
                  rel: "noopener",
                  class: "flex items-center inline-block gap-2 text-sm hover:text-primary-500 grow-0"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "heroicons-outline:external-link",
                      class: "w-5 h-5"
                    }),
                    createVNode("span", null, "Edit this page on GitHub")
                  ]),
                  _: 2
                }, 1032, ["href"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/github/PageEditLink.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=PageEditLink.1457fe2a.js.map
