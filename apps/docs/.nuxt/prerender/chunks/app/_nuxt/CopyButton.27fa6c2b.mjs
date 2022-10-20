import { f as _sfc_main$k } from '../server.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vue/server-renderer/index.mjs';
import { u as useClipboard } from './index.085ddc5c.mjs';
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
  __name: "CopyButton",
  __ssrInlineRender: true,
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    useClipboard();
    const state = ref("init");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = _sfc_main$k;
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "copy rounded-lg bg-gray-800 px-2 py-2 font-mono text-xs font-semibold leading-none text-gray-400 focus:outline-none dark:bg-black" }, _attrs))}>`);
      if (state.value === "copied") {
        _push(ssrRenderComponent(_component_Icon, {
          name: "fa-check",
          class: "h-4 w-4"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "fa-copy",
          class: "h-4 w-4"
        }, null, _parent));
      }
      _push(`</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/CopyButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CopyButton.27fa6c2b.mjs.map
