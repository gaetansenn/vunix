import { u as useContent, l as useDocus, f as _sfc_main$k, k as __nuxt_component_0$3 } from '../server.mjs';
import { defineComponent, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vue/server-renderer/index.mjs';
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
  __name: "PageContributors",
  __ssrInlineRender: true,
  setup(__props) {
    const { page } = useContent();
    const docus = useDocus();
    const root = computed(() => {
      var _a;
      return ((_a = docus.value.github) == null ? void 0 : _a.root) || "/";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_GithubFileContributors = resolveComponent("GithubFileContributors");
      const _component_Icon = _sfc_main$k;
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_GithubFileContributors, mergeProps({
        source: unref(root) + ((_a = unref(page)) == null ? void 0 : _a._file)
      }, _attrs), {
        default: withCtx(({ contributors, pending }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col gap-4"${_scopeId}><span class="flex items-center inline-block gap-2 text-sm grow-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons-outline:user-group",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Contributors</span></span>`);
            if (contributors == null ? void 0 : contributors.length) {
              _push2(`<div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(contributors, (contributor) => {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  key: contributor.login,
                  alt: contributor.name,
                  title: `@${contributor.login} on GitHub`,
                  to: `https://github.com/${contributor.login}`
                }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img${ssrRenderAttr("src", contributor.avatar_url)} class="inline-block w-6 h-6 transition-colors rounded-full u-ring-gray-200 hover:ring-primary-500 ring-2"${_scopeId2}>`);
                    } else {
                      return [
                        createVNode("img", {
                          src: contributor.avatar_url,
                          class: "inline-block w-6 h-6 transition-colors rounded-full u-ring-gray-200 hover:ring-primary-500 ring-2"
                        }, null, 8, ["src"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else if (pending) {
              _push2(`<span class="block w-6 h-6 opacity-0"${_scopeId}>\xA0</span>`);
            } else if (!pending && !(contributors == null ? void 0 : contributors.length)) {
              _push2(`<span class="block u-text-gray-500"${_scopeId}>No contributors.</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col gap-4" }, [
                createVNode("span", { class: "flex items-center inline-block gap-2 text-sm grow-0" }, [
                  createVNode(_component_Icon, {
                    name: "heroicons-outline:user-group",
                    class: "w-5 h-5"
                  }),
                  createVNode("span", null, "Contributors")
                ]),
                (contributors == null ? void 0 : contributors.length) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex flex-wrap gap-2"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(contributors, (contributor) => {
                    return openBlock(), createBlock(_component_NuxtLink, {
                      key: contributor.login,
                      alt: contributor.name,
                      title: `@${contributor.login} on GitHub`,
                      to: `https://github.com/${contributor.login}`
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: contributor.avatar_url,
                          class: "inline-block w-6 h-6 transition-colors rounded-full u-ring-gray-200 hover:ring-primary-500 ring-2"
                        }, null, 8, ["src"])
                      ]),
                      _: 2
                    }, 1032, ["alt", "title", "to"]);
                  }), 128))
                ])) : pending ? (openBlock(), createBlock("span", {
                  key: 1,
                  class: "block w-6 h-6 opacity-0"
                }, "\xA0")) : !pending && !(contributors == null ? void 0 : contributors.length) ? (openBlock(), createBlock("span", {
                  key: 2,
                  class: "block u-text-gray-500"
                }, "No contributors.")) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/github/PageContributors.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=PageContributors.69cf98d5.mjs.map
