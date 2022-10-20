import { defineComponent, h, useSSRContext } from "vue";
import __nuxt_component_0 from "./TabsHeader.b936d4f5.js";
import { _ as _export_sfc } from "../server.mjs";
import "vue/server-renderer";
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
const CodeGroup_vue_vue_type_style_index_0_lang = "";
const CodeGroup_vue_vue_type_style_index_1_scoped_59fe1296_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/CodeGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CodeGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-59fe1296"]]);
export {
  CodeGroup as default
};
//# sourceMappingURL=CodeGroup.c3d79e8a.js.map
