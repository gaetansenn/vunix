import { u as useContent, l as useDocus, k as __nuxt_component_0$3, f as _sfc_main$k } from '../server.mjs';
import { defineComponent, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/ohmyfetch/dist/node.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/ufo/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/hookable/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unctx/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/destr/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/nitropack/node_modules/h3/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/defu/dist/defu.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/scule/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/property-information/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/html-tags/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/@iconify/vue/dist/offline.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/@iconify/vue/dist/iconify.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/ohash/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/cookie-es/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/pinceau/dist/runtime.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unstorage/dist/drivers/fs.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/radix3/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/pinceau/dist/nitro.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/pathe/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unified/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/mdast-util-to-string/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/micromark/lib/preprocess.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/micromark/lib/postprocess.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unist-util-stringify-position/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/micromark-util-character/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/micromark-util-chunked/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/micromark-util-resolve-all/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/remark-emoji/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/rehype-slug/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/remark-squeeze-paragraphs/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/rehype-external-links/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/remark-gfm/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/rehype-sort-attributes/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/rehype-raw/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/remark-mdc/dist/index.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/remark-parse/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/remark-rehype/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/mdast-util-to-hast/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/detab/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unist-builder/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/mdurl/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unist-util-position/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/slugify/slugify.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unist-util-visit/index.js';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/shiki-es/dist/shiki.node.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/unenv/runtime/npm/consola.mjs';

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
      const _component_NuxtLink = __nuxt_component_0$3;
      const _component_Icon = _sfc_main$k;
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

export { _sfc_main as default };
//# sourceMappingURL=PageEditLink.1457fe2a.mjs.map
