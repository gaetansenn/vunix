import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { u as useClipboard } from './index.085ddc5c.mjs';
import '../server.mjs';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'destr';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'radix3';
import 'cookie-es';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'defu';
import 'fs';
import 'pathe';
import 'url';
import 'unified';
import 'mdast-util-to-string';
import 'micromark/lib/preprocess.js';
import 'micromark/lib/postprocess.js';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'unist-util-position';
import 'html-tags';
import 'slugify';
import 'unist-util-visit';
import 'shiki-es';
import 'unenv/runtime/npm/consola';
import 'vue-router';
import 'property-information';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'pinceau/runtime';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Terminal",
  __ssrInlineRender: true,
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    useClipboard();
    const state = ref("init");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative flex h-64 w-full cursor-pointer flex-col overflow-hidden rounded-lg bg-gray-900" }, _attrs))}>`);
      if (state.value === "copied") {
        _push(`<div class="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center"><div class="absolute top-0 left-0 h-full w-full bg-black opacity-75"></div><div class="z-10 text-lg font-semibold text-gray-100"> Copied! </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative flex h-12 w-full items-center border-b-2 border-gray-800"><div class="ml-4 flex"><div class="h-3 w-3 rounded-full bg-red-400"></div><div class="ml-2 h-3 w-3 rounded-full bg-yellow-400"></div><div class="ml-2 h-3 w-3 rounded-full bg-green-400"></div></div><div class="absolute top-0 left-0 flex h-full w-full items-center justify-center font-semibold"> Bash </div></div><div class="flex flex-1 p-4 font-mono"><span class="mr-2 inline-block select-none font-bold">$</span><span class="inline-block text-gray-200">${ssrInterpolate(__props.content)}</span></div>`);
      if (state.value !== "copied") {
        _push(`<div class="py-2 text-center font-semibold opacity-0 transition-opacity group-hover:opacity-100"> Click to copy </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/Terminal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Terminal.d2884076.mjs.map
