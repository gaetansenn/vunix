import { m as useRuntimeConfig, o as _sfc_main$1, _ as _export_sfc } from "../server.mjs";
import _sfc_main$2 from "./ReleasesReactions.09196a55.js";
import { defineComponent, resolveComponent, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import "destr";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import "ohmyfetch";
import "ufo";
import "#internal/nitro";
import "hookable";
import "unctx";
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
import "./Badge.5ffc7c46.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Releases",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    if (!(config == null ? void 0 : config.github)) {
      throw new Error("If you want to use `Releases` component, you must specify: `owner`, `repo` and `branch` in your nuxt.config `github` key.");
    }
    const formatDateByLocale = (date) => {
      const currentLocale = "en-US";
      try {
        return new Intl.DateTimeFormat(currentLocale, {
          day: "numeric",
          month: "long",
          year: "numeric"
        }).format(Date.parse(date));
      } catch (_) {
        return date;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GithubReleases = resolveComponent("GithubReleases");
      const _component_ContentRenderer = _sfc_main$1;
      const _component_ReleasesReactions = _sfc_main$2;
      _push(ssrRenderComponent(_component_GithubReleases, _attrs, {
        default: withCtx(({ releases }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(releases, (release) => {
              var _a;
              _push2(`<div class="release mb-6 flex flex-col-reverse border-gray-100 pb-6 dark:border-gray-800 lg:flex-row lg:border-b" data-v-525ef678${_scopeId}><div class="flex-1" data-v-525ef678${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ContentRenderer, {
                value: release,
                class: "docus-content"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_ReleasesReactions, {
                class: "lg:mb-4",
                release
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="release-meta z-1 sticky -mt-8 flex w-full flex-row items-center justify-between gap-2 self-start px-8 text-right lg:w-1/4 lg:flex-col lg:items-end lg:bg-transparent lg:px-0 lg:pt-8 lg:backdrop-blur-none" data-v-525ef678${_scopeId}><a${ssrRenderAttr("href", release.url)} target="_blank" data-v-525ef678${_scopeId}><h2${ssrRenderAttr("id", release.name)} class="hover:text-primary-500 u-text-gray-900 cursor-pointer text-2xl font-bold lg:text-3xl" data-v-525ef678${_scopeId}>${ssrInterpolate(release.name)}</h2></a><div class="flex flex-col gap-2 pb-4" data-v-525ef678${_scopeId}>`);
              if (release.author) {
                _push2(`<a target="_blank"${ssrRenderAttr("href", release.author.url)} class="hover:u-text-gray-900 mt-4 flex items-center justify-end gap-2 lg:mt-0" data-v-525ef678${_scopeId}><div class="flex-shrink-0" data-v-525ef678${_scopeId}><img class="h-6 w-6 rounded-full"${ssrRenderAttr("src", (_a = release.author) == null ? void 0 : _a.avatar)} alt="" data-v-525ef678${_scopeId}></div><p class="text-sm lg:text-base" data-v-525ef678${_scopeId}>@${ssrInterpolate(release.author.name)}</p></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-xs lg:text-base" data-v-525ef678${_scopeId}>${ssrInterpolate(formatDateByLocale(release.date))}</p></div></div></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(releases, (release) => {
                var _a;
                return openBlock(), createBlock("div", {
                  key: release.name,
                  class: "release mb-6 flex flex-col-reverse border-gray-100 pb-6 dark:border-gray-800 lg:flex-row lg:border-b"
                }, [
                  createVNode("div", { class: "flex-1" }, [
                    createVNode(_component_ContentRenderer, {
                      value: release,
                      class: "docus-content"
                    }, null, 8, ["value"]),
                    createVNode(_component_ReleasesReactions, {
                      class: "lg:mb-4",
                      release
                    }, null, 8, ["release"])
                  ]),
                  createVNode("div", { class: "release-meta z-1 sticky -mt-8 flex w-full flex-row items-center justify-between gap-2 self-start px-8 text-right lg:w-1/4 lg:flex-col lg:items-end lg:bg-transparent lg:px-0 lg:pt-8 lg:backdrop-blur-none" }, [
                    createVNode("a", {
                      href: release.url,
                      target: "_blank"
                    }, [
                      createVNode("h2", {
                        id: release.name,
                        class: "hover:text-primary-500 u-text-gray-900 cursor-pointer text-2xl font-bold lg:text-3xl"
                      }, toDisplayString(release.name), 9, ["id"])
                    ], 8, ["href"]),
                    createVNode("div", { class: "flex flex-col gap-2 pb-4" }, [
                      release.author ? (openBlock(), createBlock("a", {
                        key: 0,
                        target: "_blank",
                        href: release.author.url,
                        class: "hover:u-text-gray-900 mt-4 flex items-center justify-end gap-2 lg:mt-0"
                      }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("img", {
                            class: "h-6 w-6 rounded-full",
                            src: (_a = release.author) == null ? void 0 : _a.avatar,
                            alt: ""
                          }, null, 8, ["src"])
                        ]),
                        createVNode("p", { class: "text-sm lg:text-base" }, "@" + toDisplayString(release.author.name), 1)
                      ], 8, ["href"])) : createCommentVNode("", true),
                      createVNode("p", { class: "text-xs lg:text-base" }, toDisplayString(formatDateByLocale(release.date)), 1)
                    ])
                  ])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const Releases_vue_vue_type_style_index_0_scoped_525ef678_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/@nuxt-themes/docus-edge/components/github/Releases.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Releases = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-525ef678"]]);
export {
  Releases as default
};
//# sourceMappingURL=Releases.03c898f1.js.map
