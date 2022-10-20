import { p as useRoute, q as useContentHead, o as _sfc_main$2 } from "../server.mjs";
import { defineComponent, useSlots, h, useSSRContext } from "vue";
import "destr";
import { withTrailingSlash } from "ufo";
import _sfc_main$1 from "./ContentQuery.79eb4b5c.js";
import "ohmyfetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "h3";
import "defu";
import "vue-router";
import "scule";
import "property-information";
import "html-tags";
import "vue/server-renderer";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "ohash";
import "cookie-es";
import "pinceau/runtime";
import "./asyncData.b059d69b.js";
const _sfc_main = defineComponent({
  name: "ContentDoc",
  props: {
    tag: {
      type: String,
      required: false,
      default: "div"
    },
    excerpt: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      required: false,
      default: void 0
    },
    query: {
      type: Object,
      required: false,
      default: void 0
    },
    head: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  render(ctx) {
    const slots = useSlots();
    const { tag, excerpt, path, query, head } = ctx;
    const contentQueryProps = {
      ...query || {},
      path: path || (query == null ? void 0 : query.path) || withTrailingSlash(useRoute().path),
      find: "one"
    };
    const emptyNode = (slot, data) => h("pre", null, JSON.stringify({ message: "You should use slots with <ContentDoc>", slot, data }, null, 2));
    return h(
      _sfc_main$1,
      contentQueryProps,
      {
        default: (slots == null ? void 0 : slots.default) ? ({ data, refresh, isPartial }) => {
          var _a;
          if (head) {
            useContentHead(data);
          }
          return (_a = slots.default) == null ? void 0 : _a.call(slots, { doc: data, refresh, isPartial, excerpt, ...this.$attrs });
        } : ({ data }) => {
          if (head) {
            useContentHead(data);
          }
          return h(
            _sfc_main$2,
            { value: data, excerpt, tag, ...this.$attrs },
            { empty: (bindings) => (slots == null ? void 0 : slots.empty) ? slots.empty(bindings) : emptyNode("default", data) }
          );
        },
        empty: (bindings) => {
          var _a;
          return ((_a = slots == null ? void 0 : slots.empty) == null ? void 0 : _a.call(slots, bindings)) || h("p", null, "Document is empty, overwrite this content with #empty slot in <ContentDoc>.");
        },
        "not-found": (bindings) => {
          var _a;
          return ((_a = slots == null ? void 0 : slots["not-found"]) == null ? void 0 : _a.call(slots, bindings)) || h("p", null, "Document not found, overwrite this content with #not-found slot in <ContentDoc>.");
        }
      }
    );
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt/content/dist/runtime/components/ContentDoc.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ContentDoc.da2d71e0.js.map
