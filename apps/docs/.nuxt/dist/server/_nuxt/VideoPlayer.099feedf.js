import _sfc_main$1 from "./NuxtImg.7faf3ed8.js";
import { defineComponent, computed, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
  __name: "VideoPlayer",
  __ssrInlineRender: true,
  props: {
    poster: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    sources: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const provider = computed(() => {
      if (props.src && props.src.includes("youtube.com/watch")) {
        const match = props.src.match(/\?v=([^&]*)/);
        return {
          name: "youtube",
          src: `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1`,
          poster: props.poster || `https://i3.ytimg.com/vi/${match[1]}/hqdefault.jpg`
        };
      }
    });
    const loaded = ref(false);
    if (!props.src && !props.sources.length) {
      throw new Error("VideoPlayer: you need to provide either `src` or `sources` props");
    }
    const src = computed(() => {
      var _a, _b;
      return props.src || ((_b = (_a = props.sources) == null ? void 0 : _a[0]) == null ? void 0 : _b.src) || false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative inline-block my-4 overflow-hidden bg-black bg-opacity-25 rounded-lg video-player", { loaded: loaded.value }]
      }, _attrs))} data-v-11a5685e>`);
      if (unref(provider) ? unref(provider).poster : __props.poster) {
        _push(ssrRenderComponent(_component_NuxtImg, {
          "image-classes": "video absolute top-0 left-0 h-full w-full object-fit",
          src: unref(provider) ? unref(provider).poster : __props.poster
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (loaded.value) {
        _push(`<div class="absolute top-0 left-0 w-full h-full video" data-v-11a5685e>`);
        if (!unref(provider)) {
          _push(`<video${ssrRenderAttr("poster", __props.poster)} controls autoplay data-v-11a5685e>`);
          if (unref(src)) {
            _push(`<source${ssrRenderAttr("src", unref(src))} data-v-11a5685e>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(__props.sources, (source) => {
            _push(`<source${ssrRenderAttr("src", source.src || source)}${ssrRenderAttr("type", source.type)} data-v-11a5685e>`);
          });
          _push(`<!--]--></video>`);
        } else if (unref(provider).name === "youtube") {
          _push(`<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"${ssrIncludeBooleanAttr(_ctx.autoplay) ? " autoplay" : ""} class="w-full h-full"${ssrRenderAttr("src", unref(provider).src)} data-v-11a5685e></iframe>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loaded.value) {
        _push(`<div class="absolute top-0 left-0 w-full h-full cursor-pointer overlay" data-v-11a5685e><button class="play" data-v-11a5685e></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const VideoPlayer_vue_vue_type_style_index_0_scoped_11a5685e_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/content/VideoPlayer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VideoPlayer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-11a5685e"]]);
export {
  VideoPlayer as default
};
//# sourceMappingURL=VideoPlayer.099feedf.js.map
