import { g as useUnwrap, f as _sfc_main$1, C as ContentSlot } from "../server.mjs";
import { defineComponent, useSlots, computed, h, useSSRContext } from "vue";
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
import "vue/server-renderer";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "ohash";
import "cookie-es";
import "pinceau/runtime";
const iconTypeMap = {
  primary: "heroicons-outline:check",
  info: "heroicons-outline:information-circle",
  success: "heroicons-outline:check-circle",
  warning: "heroicons-outline:exclamation",
  danger: "heroicons-outline:exclamation-circle"
};
const _sfc_main = defineComponent({
  props: {
    icon: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "info", "success", "warning", "danger"].includes(value)
    }
  },
  setup(props) {
    const slots = useSlots();
    const { flatUnwrap, unwrap } = useUnwrap();
    const iconName = computed(() => props.icon || iconTypeMap[props.type]);
    return () => {
      var _a;
      const items = flatUnwrap((_a = slots.default && slots.default()) != null ? _a : [], ["ul"]).map((li) => unwrap(li, ["li"]));
      return h(
        "ul",
        items.map(
          (item) => h("li", { class: "mb-3 flex items-center" }, [
            h("span", { class: `list-${props.type} mt-px mr-3 flex-shrink-0` }, h(_sfc_main$1, { name: iconName.value, class: "h-6 w-6" })),
            h("span", h(ContentSlot, { use: () => item }))
          ])
        )
      );
    };
  }
});
const List_vue_vue_type_style_index_0_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/List.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=List.4823f5dc.js.map
