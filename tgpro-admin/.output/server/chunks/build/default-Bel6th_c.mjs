import { w as useRoute, f as nuxt_link_default, m as useCookie, C as navigateTo } from './server.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import Avatar_default from './Avatar-RiJ55zLR.mjs';
import Dropdown_default from './Dropdown-YMSaHnp6.mjs';
import { l as logo_default } from './logo-C6xj12lo.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createBlock, createCommentVNode, createVNode, createTextVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import '../nitro/nitro.mjs';
import 'mysql2/promise';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'vue-router';
import 'perfect-debounce';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './components-CqoEyeNn.mjs';
import '@iconify/utils/lib/css/icon';
import './_plugin-vue_export-helper-COMwgem8.mjs';
import './ui-G7Oicn0a.mjs';
import './Kbd-B6q0WgYi.mjs';
import './keyboard-CvjRf4Wb.mjs';
import './focus-management-DFaZHIRF.mjs';
import './use-outside-click-B4rja7ys.mjs';
import './use-resolve-button-type-eioNRL5V.mjs';
import './calculate-active-index-B5ynhl2N.mjs';
import './open-closed-Dsm1EOia.mjs';
import './use-text-value-BRFxtlLF.mjs';
import './usePopper-CMZCG_Qh.mjs';

var default_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarOpen = ref(false);
    const isMobile = ref(false);
    const adminAvatar = ref("");
    const navigationGroups = [
      {
        name: "\u9996\u9875",
        icon: "i-heroicons-home",
        expanded: ref(true),
        items: [{
          name: "\u4EEA\u8868\u677F",
          href: "/dashboard",
          icon: "i-heroicons-squares-2x2"
        }]
      },
      {
        name: "\u7BA1\u7406",
        icon: "i-heroicons-cog-6-tooth",
        expanded: ref(true),
        items: [
          {
            name: "\u673A\u5668\u4EBA\u7BA1\u7406",
            href: "/bots",
            icon: "i-heroicons-cpu-chip"
          },
          {
            name: "\u673A\u5668\u4EBA\u547D\u4EE4",
            href: "/bot-commands",
            icon: "i-heroicons-command-line"
          },
          {
            name: "\u5173\u952E\u8BCD\u56DE\u590D",
            href: "/keyword-replies",
            icon: "i-heroicons-chat-bubble-left-right"
          },
          {
            name: "\u952E\u76D8\u6309\u94AE",
            href: "/keyboard-buttons",
            icon: "i-heroicons-rectangle-group"
          },
          {
            name: "\u5185\u8054\u952E\u76D8",
            href: "/inline-keyboards",
            icon: "i-heroicons-squares-plus"
          },
          {
            name: "\u7528\u6237\u7BA1\u7406",
            href: "/users",
            icon: "i-heroicons-users"
          },
          {
            name: "\u8BA2\u5355\u7BA1\u7406",
            href: "/orders",
            icon: "i-heroicons-shopping-bag"
          }
        ]
      },
      {
        name: "\u8BBE\u7F6E",
        icon: "i-heroicons-cog-6-tooth",
        expanded: ref(false),
        items: [{
          name: "\u66F4\u65B0\u6388\u6743",
          href: "/license",
          icon: "i-heroicons-key"
        }, {
          name: "\u7CFB\u7EDF\u8BBE\u7F6E",
          href: "/development",
          icon: "i-heroicons-wrench-screwdriver"
        }]
      }
    ];
    const handleLogout = () => {
      const isLoggedIn = useCookie("isLoggedIn", { default: () => false });
      isLoggedIn.value = false;
      navigateTo("/");
    };
    const userMenuItems = [[{
      label: "\u4E2A\u4EBA\u8BBE\u7F6E",
      icon: "i-heroicons-user-circle",
      click: () => console.log("\u4E2A\u4EBA\u8BBE\u7F6E")
    }, {
      label: "\u9000\u51FA\u767B\u5F55",
      icon: "i-heroicons-arrow-right-on-rectangle",
      click: handleLogout
    }]];
    const pageTitle = computed(() => {
      const route = useRoute();
      for (const group of navigationGroups) {
        const currentNav = group.items.find((item) => item.href === route.path);
        if (currentNav) return currentNav.name;
      }
      return "\u4EEA\u8868\u677F";
    });
    watch(() => useRoute().path, () => {
      if (isMobile.value) sidebarOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = Icon_default;
      const _component_NuxtLink = nuxt_link_default;
      const _component_UDropdown = Dropdown_default;
      const _component_UAvatar = Avatar_default;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0c0c0d]" }, _attrs))}><div class="${ssrRenderClass([{
        "-translate-x-full": !unref(sidebarOpen) && unref(isMobile),
        "translate-x-0": unref(sidebarOpen) || !unref(isMobile)
      }, "fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a1b] border-r border-[#2a2a2b] lg:translate-x-0"])}"><div class="flex items-center justify-center h-20 px-4 border-b border-[#2a2a2b]"><img${ssrRenderAttr("src", logo_default)} alt="Logo" class="h-16 w-auto object-contain"></div><nav class="mt-4 px-2"><!--[-->`);
      ssrRenderList(navigationGroups, (group) => {
        _push(`<div class="mb-6"><button class="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#9ca3af] hover:text-white transition-colors group uppercase tracking-wider"><span class="flex items-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: group.icon,
          class: "w-4 h-4 mr-2"
        }, null, _parent));
        _push(` ${ssrInterpolate(group.name)}</span>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chevron-down",
          class: ["w-3 h-3 transition-transform duration-200", { "rotate-180": group.expanded.value }]
        }, null, _parent));
        _push(`</button><div class="mt-1 space-y-0.5 relative" style="${ssrRenderStyle(group.expanded.value ? null : { display: "none" })}"><div class="absolute left-3 top-0 bottom-0 w-px bg-[#374151]"></div><!--[-->`);
        ssrRenderList(group.items, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.name,
            to: item.href,
            class: ["flex items-center pl-6 pr-3 py-2 text-sm transition-all group relative ml-3", {
              "text-[#00dc82]": _ctx.$route.path === item.href,
              "text-[#9ca3af] hover:text-white": _ctx.$route.path !== item.href
            }]
          }, {
            default: withCtx((_, _push$1, _parent$1, _scopeId) => {
              if (_push$1) {
                if (_ctx.$route.path === item.href) _push$1(`<div class="absolute left-0 top-0 bottom-0 w-px bg-[#00dc82]"${_scopeId}></div>`);
                else _push$1(`<!---->`);
                _push$1(ssrRenderComponent(_component_UIcon, {
                  name: item.icon,
                  class: ["w-4 h-4 mr-3 transition-colors", {
                    "text-[#00dc82]": _ctx.$route.path === item.href,
                    "text-[#9ca3af] group-hover:text-white": _ctx.$route.path !== item.href
                  }]
                }, null, _parent$1, _scopeId));
                _push$1(` ${ssrInterpolate(item.name)}`);
              } else return [
                _ctx.$route.path === item.href ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute left-0 top-0 bottom-0 w-px bg-[#00dc82]"
                })) : createCommentVNode("", true),
                createVNode(_component_UIcon, {
                  name: item.icon,
                  class: ["w-4 h-4 mr-3 transition-colors", {
                    "text-[#00dc82]": _ctx.$route.path === item.href,
                    "text-[#9ca3af] group-hover:text-white": _ctx.$route.path !== item.href
                  }]
                }, null, 8, ["name", "class"]),
                createTextVNode(" " + toDisplayString(item.name), 1)
              ];
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></nav></div><div class="lg:pl-64"><div class="sticky top-0 z-40 flex h-16 bg-[#1a1a1b] border-b border-[#2a2a2b]"><button class="px-4 text-[#9ca3af] hover:text-[#00dc82] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00dc82] lg:hidden transition-colors">`);
      _push(ssrRenderComponent(unref(Bars3Icon), { class: "w-6 h-6" }, null, _parent));
      _push(`</button><div class="flex justify-between flex-1 px-4"><div class="flex items-center"><h2 class="text-lg font-semibold text-white">${ssrInterpolate(unref(pageTitle))}</h2></div><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_UDropdown, {
        items: userMenuItems,
        popper: { placement: "bottom-start" }
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#2a2a2b] transition-all"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UAvatar, {
              src: unref(adminAvatar),
              alt: "\u7BA1\u7406\u5458\u5934\u50CF",
              size: "sm"
            }, null, _parent$1, _scopeId));
            _push$1(`<div class="hidden md:block text-sm"${_scopeId}><div class="font-medium text-white"${_scopeId}>Admin</div><div class="text-[#9ca3af]"${_scopeId}>\u7BA1\u7406\u5458</div></div></div>`);
          } else return [createVNode("div", { class: "flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#2a2a2b] transition-all" }, [createVNode(_component_UAvatar, {
            src: unref(adminAvatar),
            alt: "\u7BA1\u7406\u5458\u5934\u50CF",
            size: "sm"
          }, null, 8, ["src"]), createVNode("div", { class: "hidden md:block text-sm" }, [createVNode("div", { class: "font-medium text-white" }, "Admin"), createVNode("div", { class: "text-[#9ca3af]" }, "\u7BA1\u7406\u5458")])])];
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><main class="p-6 bg-[#0c0c0d] min-h-screen">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      if (unref(sidebarOpen)) _push(`<div class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-all"></div>`);
      else _push(`<!---->`);
      _push(`</div>`);
    };
  }
});
var _sfc_setup = default_vue_vue_type_script_setup_true_lang_default.setup;
default_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = default_vue_vue_type_script_setup_true_lang_default;

export { default_default as default };
//# sourceMappingURL=default-Bel6th_c.mjs.map
