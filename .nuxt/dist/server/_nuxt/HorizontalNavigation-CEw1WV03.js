import __nuxt_component_0 from "./Link-CS5wywLd.js";
import { _ as __nuxt_component_3 } from "./Avatar-CObRxxxv.js";
import __nuxt_component_0$1 from "./Icon-ZhGvf9gZ.js";
import __nuxt_component_3$1 from "./Badge-BZslOKNb.js";
import { defineComponent, mergeProps, withCtx, renderSlot, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, toRef, computed, useSSRContext } from "vue";
import { twJoin } from "tailwind-merge";
import { u as useUI } from "./tooltip-BtqstB0H.js";
import { m as mergeConfig, t as twMerge, a as appConfig } from "../server.mjs";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { a as getULinkProps } from "./link-Bz3Wc5MF.js";
import "./nuxt-link-C6IP2oPu.js";
import "ufo";
import "hookable";
import "ohash/utils";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "klona";
import "@vueuse/core";
import "@iconify/vue";
import "./index-C6m-0LTF.js";
import "@iconify/utils/lib/css/icon";
import "./useButtonGroup-6uzJtOJv.js";
const horizontalNavigation = {
  wrapper: "relative w-full flex items-center justify-between",
  container: "flex items-center min-w-0",
  inner: "min-w-0",
  base: "group relative w-full flex items-center gap-1.5 px-2.5 py-3.5 rounded-md font-medium text-sm focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 disabled:cursor-not-allowed disabled:opacity-75",
  before: "before:absolute before:inset-x-0 before:inset-y-2 before:inset-px before:rounded-md hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50",
  after: "after:absolute after:bottom-0 after:inset-x-2.5 after:block after:h-[2px] after:mt-2",
  active: "text-gray-900 dark:text-white after:bg-primary-500 dark:after:bg-primary-400 after:rounded-full",
  inactive: "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
  label: "truncate relative",
  icon: {
    base: "flex-shrink-0 w-5 h-5 relative",
    active: "text-gray-700 dark:text-gray-200",
    inactive: "text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200"
  },
  avatar: {
    base: "flex-shrink-0",
    size: "2xs"
  },
  badge: {
    base: "flex-shrink-0 ms-auto relative rounded",
    color: "gray",
    variant: "solid",
    size: "xs"
  }
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.horizontalNavigation, horizontalNavigation);
const _sfc_main = defineComponent({
  components: {
    UIcon: __nuxt_component_0$1,
    UAvatar: __nuxt_component_3,
    UBadge: __nuxt_component_3$1,
    ULink: __nuxt_component_0
  },
  inheritAttrs: false,
  props: {
    links: {
      type: Array,
      default: () => []
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("horizontalNavigation", toRef(props, "ui"), config, toRef(props, "class"));
    const sections = computed(() => Array.isArray(props.links[0]) ? props.links : [props.links]);
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      sections,
      getULinkProps,
      twMerge,
      twJoin
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ULink = __nuxt_component_0;
  const _component_UAvatar = __nuxt_component_3;
  const _component_UIcon = __nuxt_component_0$1;
  const _component_UBadge = __nuxt_component_3$1;
  _push(`<nav${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _ctx.attrs, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.sections, (section, sectionIndex) => {
    _push(`<ul class="${ssrRenderClass(_ctx.ui.container)}"><!--[-->`);
    ssrRenderList(section, (link, index) => {
      _push(`<li class="${ssrRenderClass(_ctx.ui.inner)}">`);
      _push(ssrRenderComponent(_component_ULink, mergeProps({ ref_for: true }, _ctx.getULinkProps(link), {
        class: [_ctx.ui.base, _ctx.ui.before, _ctx.ui.after],
        "active-class": _ctx.ui.active,
        "inactive-class": _ctx.ui.inactive,
        onClick: link.click,
        onKeyup: ($event) => $event.target.blur()
      }), {
        default: withCtx(({ isActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "avatar", {
              link,
              isActive
            }, () => {
              if (link.avatar) {
                _push2(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, { size: _ctx.ui.avatar.size, ...link.avatar }, {
                  class: [_ctx.ui.avatar.base]
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "icon", {
              link,
              isActive
            }, () => {
              if (link.icon) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: link.icon,
                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, isActive ? _ctx.ui.icon.active : _ctx.ui.icon.inactive), link.iconClass)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "default", {
              link,
              isActive
            }, () => {
              if (link.label) {
                _push2(`<span class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.label, link.labelClass))}"${_scopeId}>`);
                if (isActive) {
                  _push2(`<span class="sr-only"${_scopeId}> Current page: </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(` ${ssrInterpolate(link.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "badge", {
              link,
              isActive
            }, () => {
              if (link.badge) {
                _push2(ssrRenderComponent(_component_UBadge, mergeProps({ ref_for: true }, {
                  size: _ctx.ui.badge.size,
                  color: _ctx.ui.badge.color,
                  variant: _ctx.ui.badge.variant,
                  ...typeof link.badge === "string" || typeof link.badge === "number" ? { label: link.badge } : link.badge
                }, {
                  class: _ctx.ui.badge.base
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "avatar", {
                link,
                isActive
              }, () => [
                link.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                  key: 0,
                  ref_for: true
                }, { size: _ctx.ui.avatar.size, ...link.avatar }, {
                  class: [_ctx.ui.avatar.base]
                }), null, 16, ["class"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "icon", {
                link,
                isActive
              }, () => [
                link.icon ? (openBlock(), createBlock(_component_UIcon, {
                  key: 0,
                  name: link.icon,
                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, isActive ? _ctx.ui.icon.active : _ctx.ui.icon.inactive), link.iconClass)
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "default", {
                link,
                isActive
              }, () => [
                link.label ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: _ctx.twMerge(_ctx.ui.label, link.labelClass)
                }, [
                  isActive ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "sr-only"
                  }, " Current page: ")) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(link.label), 1)
                ], 2)) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "badge", {
                link,
                isActive
              }, () => [
                link.badge ? (openBlock(), createBlock(_component_UBadge, mergeProps({
                  key: 0,
                  ref_for: true
                }, {
                  size: _ctx.ui.badge.size,
                  color: _ctx.ui.badge.color,
                  variant: _ctx.ui.badge.variant,
                  ...typeof link.badge === "string" || typeof link.badge === "number" ? { label: link.badge } : link.badge
                }, {
                  class: _ctx.ui.badge.base
                }), null, 16, ["class"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</li>`);
    });
    _push(`<!--]--></ul>`);
  });
  _push(`<!--]--></nav>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/navigation/HorizontalNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HorizontalNavigation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  HorizontalNavigation as default
};
//# sourceMappingURL=HorizontalNavigation-CEw1WV03.js.map
