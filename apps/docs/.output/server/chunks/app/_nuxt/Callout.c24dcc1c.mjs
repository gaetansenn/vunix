import { C as ContentSlot, f as _sfc_main$k } from '../server.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "Callout",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "info",
      validator(value) {
        return ["info", "success", "warning", "danger", "primary"].includes(value);
      }
    },
    modelValue: {
      required: false,
      default: ref(false)
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const isOpen = ref(props.modelValue);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentSlot = ContentSlot;
      const _component_Icon = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative px-4 mt-4 mb-4 text-sm leading-relaxed callout rounded-xl", [__props.type]]
      }, _attrs))}><span class="flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.summary
      }, null, _parent));
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons-outline:chevron-right",
        class: ["w-5 h-5 transition-transform transform", {
          "rotate-90": isOpen.value
        }]
      }, null, _parent));
      _push(`</span><div style="${ssrRenderStyle(isOpen.value ? null : { display: "none" })}" class="-mt-4">`);
      _push(ssrRenderComponent(_component_ContentSlot, {
        use: _ctx.$slots.content
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/Callout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Callout.c24dcc1c.mjs.map
