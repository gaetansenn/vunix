import { defineComponent, h, useSSRContext } from 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vue/index.mjs';
import __nuxt_component_0 from './TabsHeader.b936d4f5.mjs';
import { _ as _export_sfc } from '../server.mjs';
import 'file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vue/server-renderer/index.mjs';
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

const isTag = (slot, tag) => {
  return slot.type && slot.type.tag && slot.type.tag === tag;
};
const _sfc_main = defineComponent({
  data() {
    return {
      activeTabIndex: 0,
      counter: 0
    };
  },
  render() {
    const slots = this.$slots.default();
    const tabs = slots.filter((slot) => isTag(slot, "code-block") || isTag(slot, "code")).map((slot, index) => {
      var _a, _b, _c;
      return {
        label: ((_a = slot == null ? void 0 : slot.props) == null ? void 0 : _a.filename) || ((_b = slot == null ? void 0 : slot.props) == null ? void 0 : _b.label) || `${index}`,
        active: ((_c = slot == null ? void 0 : slot.props) == null ? void 0 : _c.active) || false,
        component: slot
      };
    });
    return h(
      "div",
      {
        class: {
          "code-group": true,
          "first-tab": this.activeTabIndex === 0
        }
      },
      [
        h(__nuxt_component_0, {
          ref: "tabs-header",
          activeTabIndex: this.activeTabIndex,
          tabs,
          "onUpdate:activeTabIndex": ($event) => this.activeTabIndex = $event
        }),
        h(
          "div",
          {
            class: "code-group-content",
            text: this.activeTabIndex
          },
          slots.map(
            (slot, index) => {
              var _a, _b;
              return h(
                "div",
                {
                  style: {
                    display: index === this.activeTabIndex ? "block" : "none"
                  },
                  class: {
                    "": !isTag(slot, "code")
                  }
                },
                [
                  isTag(slot, "code") ? slot : h(
                    "div",
                    {
                      class: {
                        "preview-canvas": true
                      }
                    },
                    [((_b = (_a = slot.children) == null ? void 0 : _a.default) == null ? void 0 : _b.call(_a)) || h("div")]
                  )
                ]
              );
            }
          )
        )
      ]
    );
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/CodeGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CodeGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-59fe1296"]]);

export { CodeGroup as default };
//# sourceMappingURL=CodeGroup.c3d79e8a.mjs.map
