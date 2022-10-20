import { defineComponent, ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TabsHeader",
  __ssrInlineRender: true,
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTabIndex: {
      type: Number,
      required: true
    }
  },
  emits: ["update:activeTabIndex"],
  setup(__props, { emit }) {
    const props = __props;
    const tabsRef = ref();
    const highlightUnderline = ref();
    const updateHighlightUnderlinePosition = (activeTab) => {
      if (!activeTab) {
        return;
      }
      highlightUnderline.value.style.left = `${activeTab.offsetLeft}px`;
      highlightUnderline.value.style.top = `${activeTab.offsetTop}px`;
      highlightUnderline.value.style.width = `${activeTab.clientWidth}px`;
      highlightUnderline.value.style.height = `${activeTab.clientHeight}px`;
      highlightUnderline.value.style.transform = "scale(1)";
      highlightUnderline.value.style.opacity = 1;
    };
    watch(
      tabsRef,
      (newVal) => {
        if (!newVal) {
          return;
        }
        setTimeout(() => {
          updateHighlightUnderlinePosition(tabsRef.value.children[props.activeTabIndex]);
        }, 50);
      },
      {
        immediate: true
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tabs-header relative bg-gray-800 text-white" }, _attrs))} data-v-5a59e144>`);
      if (__props.tabs) {
        _push(`<div class="relative z-0 px-2" data-v-5a59e144><!--[-->`);
        ssrRenderList(__props.tabs, ({ label }, i) => {
          _push(`<button class="${ssrRenderClass([[__props.activeTabIndex === i ? "text-white" : "text-gray-200 hover:text-white"], "xs:py-3 xs:my-0 relative my-2 rounded-lg px-2 py-1.5 font-mono text-sm tracking-tight focus:outline-none"])}" data-v-5a59e144>${ssrInterpolate(label)}</button>`);
        });
        _push(`<!--]--><span class="highlight-underline xs:py-1.5 absolute -z-[1]" style="${ssrRenderStyle({
          transform: `scale(0)`,
          opacity: 0
        })}" data-v-5a59e144><span class="flex h-full w-full rounded-lg bg-gray-700 dark:bg-gray-900" data-v-5a59e144></span></span></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const TabsHeader_vue_vue_type_style_index_0_scoped_5a59e144_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/TabsHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5a59e144"]]);
export {
  __nuxt_component_0 as default
};
//# sourceMappingURL=TabsHeader.b936d4f5.js.map
