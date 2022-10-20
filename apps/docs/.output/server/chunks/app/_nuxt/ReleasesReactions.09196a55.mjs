import _sfc_main$1 from './Badge.5ffc7c46.mjs';
import { defineComponent, computed, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "ReleasesReactions",
  __ssrInlineRender: true,
  props: {
    release: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const map = {
      "+1": "\u{1F44D}",
      "-1": "\u{1F44E}",
      laugh: "\u{1F602}",
      hooray: "\u{1F389}",
      confused: "\u{1F615}",
      heart: "\u2764\uFE0F",
      rocket: "\u{1F680}",
      eyes: "\u{1F440}"
    };
    const reactions = computed(() => {
      var _a, _b;
      if (!((_a = props.release) == null ? void 0 : _a.reactions)) {
        return {};
      }
      return Object.entries((_b = props.release) == null ? void 0 : _b.reactions).reduce((acc, [key, value]) => {
        if (["url", "total_count"].includes(key) || value === 0) {
          return acc;
        }
        acc.push({
          key,
          value
        });
        return acc;
      }, []);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$1;
      if (unref(reactions).length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-1 flex-wrap gap-4" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(reactions), (reaction) => {
          _push(ssrRenderComponent(_component_Badge, {
            key: reaction.key,
            type: "gray"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(map[reaction.key])} <span class="ml-2 font-semibold"${_scopeId}>${ssrInterpolate(reaction.value)}</span>`);
              } else {
                return [
                  createTextVNode(toDisplayString(map[reaction.key]) + " ", 1),
                  createVNode("span", { class: "ml-2 font-semibold" }, toDisplayString(reaction.value), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/github/ReleasesReactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ReleasesReactions.09196a55.mjs.map
