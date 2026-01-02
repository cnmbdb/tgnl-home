import Icon_default from './Icon-BQxbVddL.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import Badge_default from './Badge-Bb9IcqQP.mjs';
import Input_default from './Input-CbhZIhGI.mjs';
import Select_default from './Select-Cx-ISQOC.mjs';
import Textarea_default from './Textarea-ClW9ULmm.mjs';
import Modal_default from './Modal-BbhoxMMu.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, isRef, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import './components-CqoEyeNn.mjs';
import './server.mjs';
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
import '@iconify/utils/lib/css/icon';
import './_plugin-vue_export-helper-COMwgem8.mjs';
import './ui-G7Oicn0a.mjs';
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';
import './useFormGroup-ZK-CpXpd.mjs';
import './keyboard-CvjRf4Wb.mjs';
import './transition-CG5tIsRm.mjs';
import './micro-task-CYdHJ3PN.mjs';
import './active-element-history-DJ1NL7os.mjs';
import './focus-management-DFaZHIRF.mjs';
import './use-outside-click-B4rja7ys.mjs';
import './hidden-Bsn3DsxF.mjs';
import './open-closed-Dsm1EOia.mjs';
import './portal-BLTG7ywv.mjs';
import './description-Y4p4EFv6.mjs';

var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const showAddModal = ref(false);
    const showPreviewModal = ref(false);
    const searchQuery = ref("");
    const statusFilter = ref("all");
    const previewInlineKeyboardData = ref(null);
    const stats = ref({
      totalInlineKeyboards: 8,
      activeInlineKeyboards: 6,
      totalCallbacks: 24,
      todayClicks: 156
    });
    const newInlineKeyboard = ref({
      name: "",
      description: "",
      buttons: [[{
        text: "\u6309\u94AE1",
        type: "callback",
        value: "callback_data_1"
      }]],
      status: "active"
    });
    const statusOptions = [
      {
        label: "\u5168\u90E8",
        value: "all"
      },
      {
        label: "\u6D3B\u8DC3",
        value: "active"
      },
      {
        label: "\u7981\u7528",
        value: "inactive"
      }
    ];
    const buttonTypeOptions = [
      {
        label: "\u56DE\u8C03\u6570\u636E",
        value: "callback"
      },
      {
        label: "URL\u94FE\u63A5",
        value: "url"
      },
      {
        label: "\u5185\u8054\u67E5\u8BE2",
        value: "switch_inline"
      }
    ];
    const inlineKeyboards = ref([
      {
        id: 1,
        name: "\u786E\u8BA4\u64CD\u4F5C",
        description: "\u7528\u6237\u786E\u8BA4\u64CD\u4F5C\u7684\u5185\u8054\u952E\u76D8",
        buttons: [[{
          text: "\u2705 \u786E\u8BA4",
          type: "callback",
          value: "confirm_action"
        }, {
          text: "\u274C \u53D6\u6D88",
          type: "callback",
          value: "cancel_action"
        }]],
        status: "active",
        clickCount: 456,
        createdAt: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        name: "\u5206\u4EAB\u9009\u9879",
        description: "\u5185\u5BB9\u5206\u4EAB\u76F8\u5173\u9009\u9879",
        buttons: [[{
          text: "\u{1F4F1} \u5206\u4EAB\u5230\u7FA4\u7EC4",
          type: "switch_inline",
          value: "share_group"
        }, {
          text: "\u{1F464} \u79C1\u804A\u5206\u4EAB",
          type: "switch_inline",
          value: "share_private"
        }], [{
          text: "\u{1F517} \u83B7\u53D6\u94FE\u63A5",
          type: "callback",
          value: "get_link"
        }]],
        status: "active",
        clickCount: 234,
        createdAt: "2024-01-14T16:45:00Z"
      },
      {
        id: 3,
        name: "\u5916\u90E8\u94FE\u63A5",
        description: "\u8DF3\u8F6C\u5230\u5916\u90E8\u7F51\u7AD9\u7684\u94FE\u63A5",
        buttons: [[{
          text: "\u{1F4D6} \u5B98\u65B9\u6587\u6863",
          type: "url",
          value: "https://docs.example.com"
        }, {
          text: "\u{1F4AC} \u6280\u672F\u652F\u6301",
          type: "url",
          value: "https://support.example.com"
        }], [{
          text: "\u{1F310} \u5B98\u65B9\u7F51\u7AD9",
          type: "url",
          value: "https://example.com"
        }]],
        status: "active",
        clickCount: 123,
        createdAt: "2024-01-13T11:30:00Z"
      },
      {
        id: 4,
        name: "\u8BC4\u5206\u7CFB\u7EDF",
        description: "\u7528\u6237\u8BC4\u5206\u53CD\u9988\u7CFB\u7EDF",
        buttons: [[
          {
            text: "\u2B50",
            type: "callback",
            value: "rate_1"
          },
          {
            text: "\u2B50\u2B50",
            type: "callback",
            value: "rate_2"
          },
          {
            text: "\u2B50\u2B50\u2B50",
            type: "callback",
            value: "rate_3"
          }
        ], [{
          text: "\u2B50\u2B50\u2B50\u2B50",
          type: "callback",
          value: "rate_4"
        }, {
          text: "\u2B50\u2B50\u2B50\u2B50\u2B50",
          type: "callback",
          value: "rate_5"
        }]],
        status: "inactive",
        clickCount: 67,
        createdAt: "2024-01-12T09:15:00Z"
      }
    ]);
    const filteredInlineKeyboards = computed(() => {
      let filtered = inlineKeyboards.value;
      if (searchQuery.value) filtered = filtered.filter((keyboard) => keyboard.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || keyboard.description.toLowerCase().includes(searchQuery.value.toLowerCase()));
      if (statusFilter.value !== "all") filtered = filtered.filter((keyboard) => keyboard.status === statusFilter.value);
      return filtered;
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("zh-CN");
    };
    const getUniqueButtonTypes = (buttons) => {
      const types = /* @__PURE__ */ new Set();
      buttons.forEach((row) => {
        row.forEach((button) => {
          types.add(button.type);
        });
      });
      return Array.from(types);
    };
    const getTypeColor = (type) => {
      switch (type) {
        case "url":
          return "blue";
        case "callback":
          return "green";
        case "switch_inline":
          return "purple";
        default:
          return "gray";
      }
    };
    const getTypeLabel = (type) => {
      switch (type) {
        case "url":
          return "URL";
        case "callback":
          return "\u56DE\u8C03";
        case "switch_inline":
          return "\u5185\u8054";
        default:
          return type;
      }
    };
    const getValuePlaceholder = (type) => {
      switch (type) {
        case "url":
          return "https://example.com";
        case "callback":
          return "callback_data";
        case "switch_inline":
          return "inline_query";
        default:
          return "\u503C";
      }
    };
    const refreshInlineKeyboards = () => {
      console.log("\u5237\u65B0\u5185\u8054\u952E\u76D8\u5217\u8868");
    };
    const addRow = () => {
      newInlineKeyboard.value.buttons.push([{
        text: "",
        type: "callback",
        value: ""
      }]);
    };
    const removeRow = (index) => {
      newInlineKeyboard.value.buttons.splice(index, 1);
    };
    const addButtonToRow = (rowIndex) => {
      newInlineKeyboard.value.buttons[rowIndex].push({
        text: "",
        type: "callback",
        value: ""
      });
    };
    const removeButtonFromRow = (rowIndex, buttonIndex) => {
      newInlineKeyboard.value.buttons[rowIndex].splice(buttonIndex, 1);
    };
    const createInlineKeyboard = () => {
      if (!newInlineKeyboard.value.name) return;
      const filteredButtons = newInlineKeyboard.value.buttons.map((row) => row.filter((button) => button.text.trim() !== "")).filter((row) => row.length > 0);
      if (filteredButtons.length === 0) return;
      const keyboard = {
        id: Date.now(),
        name: newInlineKeyboard.value.name,
        description: newInlineKeyboard.value.description,
        buttons: filteredButtons,
        status: newInlineKeyboard.value.status,
        clickCount: 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      inlineKeyboards.value.unshift(keyboard);
      newInlineKeyboard.value = {
        name: "",
        description: "",
        buttons: [[{
          text: "\u6309\u94AE1",
          type: "callback",
          value: "callback_data_1"
        }]],
        status: "active"
      };
      showAddModal.value = false;
    };
    const editInlineKeyboard = (keyboard) => {
      console.log("\u7F16\u8F91\u5185\u8054\u952E\u76D8:", keyboard);
    };
    const previewInlineKeyboard = (keyboard) => {
      previewInlineKeyboardData.value = keyboard;
      showPreviewModal.value = true;
    };
    const toggleInlineKeyboardStatus = (keyboard) => {
      keyboard.status = keyboard.status === "active" ? "inactive" : "active";
    };
    const deleteInlineKeyboard = (keyboard) => {
      const index = inlineKeyboards.value.findIndex((k) => k.id === keyboard.id);
      if (index > -1) inlineKeyboards.value.splice(index, 1);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = Icon_default;
      const _component_UButton = Button_default;
      const _component_UInput = Input_default;
      const _component_USelect = Select_default;
      const _component_UBadge = Badge_default;
      const _component_UModal = Modal_default;
      const _component_UTextarea = Textarea_default;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-squares-plus",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> \u5185\u8054\u952E\u76D8 </h1><p class="mt-1 text-sm text-[#9ca3af]">\u7BA1\u7406\u673A\u5668\u4EBA\u7684\u5185\u8054\u952E\u76D8\u6309\u94AE\u548C\u56DE\u8C03\u529F\u80FD</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        onClick: refreshInlineKeyboards
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u5237\u65B0 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-path",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u5237\u65B0 ")];
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "sm",
        class: "bg-[#00dc82] hover:bg-[#00dc82]/80",
        onClick: ($event) => showAddModal.value = true
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u521B\u5EFA\u5185\u8054\u952E\u76D8 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-plus",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u521B\u5EFA\u5185\u8054\u952E\u76D8 ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u603B\u5185\u8054\u952E\u76D8</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).totalInlineKeyboards)}</p></div><div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-squares-plus",
        class: "w-6 h-6 text-blue-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u6D3B\u8DC3\u952E\u76D8</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).activeInlineKeyboards)}</p></div><div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-6 h-6 text-green-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u603B\u56DE\u8C03\u6570</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).totalCallbacks)}</p></div><div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cursor-arrow-ripple",
        class: "w-6 h-6 text-purple-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u4ECA\u65E5\u70B9\u51FB</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).todayClicks)}</p></div><div class="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-hand-raised",
        class: "w-6 h-6 text-orange-400"
      }, null, _parent));
      _push(`</div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="p-4 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-white">\u5185\u8054\u952E\u76D8\u5217\u8868</h2><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(searchQuery),
        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        placeholder: "\u641C\u7D22\u952E\u76D8\u540D\u79F0...",
        class: "w-64",
        icon: "i-heroicons-magnifying-glass"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: unref(statusFilter),
        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
        options: statusOptions,
        class: "w-32"
      }, null, _parent));
      _push(`</div></div></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-[#0c0c0d]"><tr><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u952E\u76D8\u540D\u79F0</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u6309\u94AE\u9884\u89C8</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u56DE\u8C03\u7C7B\u578B</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u72B6\u6001</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u70B9\u51FB\u6B21\u6570</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u521B\u5EFA\u65F6\u95F4</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u64CD\u4F5C</th></tr></thead><tbody class="divide-y divide-[#2a2a2b]"><!--[-->`);
      ssrRenderList(unref(filteredInlineKeyboards), (keyboard) => {
        _push(`<tr class="hover:bg-[#2a2a2b]/50"><td class="px-4 py-3"><div class="text-sm font-medium text-white">${ssrInterpolate(keyboard.name)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(keyboard.description)}</div></td><td class="px-4 py-3"><div class="space-y-1 max-w-xs"><!--[-->`);
        ssrRenderList(keyboard.buttons, (row, rowIndex) => {
          _push(`<div class="flex gap-1"><!--[-->`);
          ssrRenderList(row, (button, buttonIndex) => {
            _push(`<div class="px-2 py-1 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-xs text-white truncate flex items-center gap-1" style="${ssrRenderStyle({ "max-width": "80px" })}">`);
            if (button.type === "url") _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-link",
              class: "w-3 h-3 text-blue-400"
            }, null, _parent));
            else if (button.type === "callback") _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-cursor-arrow-rays",
              class: "w-3 h-3 text-green-400"
            }, null, _parent));
            else if (button.type === "switch_inline") _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path-rounded-square",
              class: "w-3 h-3 text-purple-400"
            }, null, _parent));
            else _push(`<!---->`);
            _push(` ${ssrInterpolate(button.text)}</div>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div></td><td class="px-4 py-3"><div class="flex flex-wrap gap-1"><!--[-->`);
        ssrRenderList(getUniqueButtonTypes(keyboard.buttons), (type) => {
          _push(ssrRenderComponent(_component_UBadge, {
            key: type,
            color: getTypeColor(type),
            variant: "subtle",
            size: "sm"
          }, {
            default: withCtx((_, _push$1, _parent$1, _scopeId) => {
              if (_push$1) _push$1(`${ssrInterpolate(getTypeLabel(type))}`);
              else return [createTextVNode(toDisplayString(getTypeLabel(type)), 1)];
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></td><td class="px-4 py-3">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: keyboard.status === "active" ? "green" : "red",
          variant: "subtle",
          size: "sm"
        }, {
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) _push$1(`${ssrInterpolate(keyboard.status === "active" ? "\u6D3B\u8DC3" : "\u7981\u7528")}`);
            else return [createTextVNode(toDisplayString(keyboard.status === "active" ? "\u6D3B\u8DC3" : "\u7981\u7528"), 1)];
          }),
          _: 2
        }, _parent));
        _push(`</td><td class="px-4 py-3 text-sm text-white">${ssrInterpolate(keyboard.clickCount)}</td><td class="px-4 py-3 text-sm text-[#9ca3af]">${ssrInterpolate(formatDate(keyboard.createdAt))}</td><td class="px-4 py-3"><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          onClick: ($event) => editInlineKeyboard(keyboard)
        }, {
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-pencil",
              class: "w-4 h-4"
            }, null, _parent$1, _scopeId));
            else return [createVNode(_component_UIcon, {
              name: "i-heroicons-pencil",
              class: "w-4 h-4"
            })];
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          onClick: ($event) => previewInlineKeyboard(keyboard)
        }, {
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-eye",
              class: "w-4 h-4"
            }, null, _parent$1, _scopeId));
            else return [createVNode(_component_UIcon, {
              name: "i-heroicons-eye",
              class: "w-4 h-4"
            })];
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          color: keyboard.status === "active" ? "red" : "green",
          onClick: ($event) => toggleInlineKeyboardStatus(keyboard)
        }, {
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
              name: keyboard.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
              class: "w-4 h-4"
            }, null, _parent$1, _scopeId));
            else return [createVNode(_component_UIcon, {
              name: keyboard.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
              class: "w-4 h-4"
            }, null, 8, ["name"])];
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          color: "red",
          onClick: ($event) => deleteInlineKeyboard(keyboard)
        }, {
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-trash",
              class: "w-4 h-4"
            }, null, _parent$1, _scopeId));
            else return [createVNode(_component_UIcon, {
              name: "i-heroicons-trash",
              class: "w-4 h-4"
            })];
          }),
          _: 2
        }, _parent));
        _push(`</div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showAddModal),
        "onUpdate:modelValue": ($event) => isRef(showAddModal) ? showAddModal.value = $event : null,
        ui: { width: "sm:max-w-3xl" }
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>\u521B\u5EFA\u5185\u8054\u952E\u76D8</h3><div class="space-y-4"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UInput, {
              modelValue: unref(newInlineKeyboard).name,
              "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).name = $event,
              label: "\u952E\u76D8\u540D\u79F0",
              placeholder: "\u8F93\u5165\u5185\u8054\u952E\u76D8\u540D\u79F0"
            }, null, _parent$1, _scopeId));
            _push$1(ssrRenderComponent(_component_UTextarea, {
              modelValue: unref(newInlineKeyboard).description,
              "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).description = $event,
              label: "\u63CF\u8FF0",
              placeholder: "\u8F93\u5165\u952E\u76D8\u63CF\u8FF0"
            }, null, _parent$1, _scopeId));
            _push$1(`<div${_scopeId}><label class="block text-sm font-medium text-white mb-2"${_scopeId}>\u6309\u94AE\u5E03\u5C40</label><div class="space-y-3"${_scopeId}><!--[-->`);
            ssrRenderList(unref(newInlineKeyboard).buttons, (row, rowIndex) => {
              _push$1(`<div class="border border-[#2a2a2b] rounded-lg p-3"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><span class="text-sm text-[#9ca3af]"${_scopeId}>\u7B2C ${ssrInterpolate(rowIndex + 1)} \u884C</span><div class="flex gap-2"${_scopeId}>`);
              _push$1(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                size: "xs",
                color: "green",
                onClick: ($event) => addButtonToRow(rowIndex),
                disabled: row.length >= 3
              }, {
                default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                  if (_push$2) _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-4 h-4"
                  }, null, _parent$2, _scopeId$1));
                  else return [createVNode(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-4 h-4"
                  })];
                }),
                _: 2
              }, _parent$1, _scopeId));
              _push$1(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                size: "xs",
                color: "red",
                onClick: ($event) => removeRow(rowIndex),
                disabled: unref(newInlineKeyboard).buttons.length <= 1
              }, {
                default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                  if (_push$2) _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-trash",
                    class: "w-4 h-4"
                  }, null, _parent$2, _scopeId$1));
                  else return [createVNode(_component_UIcon, {
                    name: "i-heroicons-trash",
                    class: "w-4 h-4"
                  })];
                }),
                _: 2
              }, _parent$1, _scopeId));
              _push$1(`</div></div><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(row, (button, buttonIndex) => {
                _push$1(`<div class="grid grid-cols-12 gap-2 items-end"${_scopeId}><div class="col-span-4"${_scopeId}>`);
                _push$1(ssrRenderComponent(_component_UInput, {
                  modelValue: button.text,
                  "onUpdate:modelValue": ($event) => button.text = $event,
                  placeholder: `\u6309\u94AE\u6587\u672C`,
                  size: "sm"
                }, null, _parent$1, _scopeId));
                _push$1(`</div><div class="col-span-3"${_scopeId}>`);
                _push$1(ssrRenderComponent(_component_USelect, {
                  modelValue: button.type,
                  "onUpdate:modelValue": ($event) => button.type = $event,
                  options: buttonTypeOptions,
                  size: "sm"
                }, null, _parent$1, _scopeId));
                _push$1(`</div><div class="col-span-4"${_scopeId}>`);
                _push$1(ssrRenderComponent(_component_UInput, {
                  modelValue: button.value,
                  "onUpdate:modelValue": ($event) => button.value = $event,
                  placeholder: getValuePlaceholder(button.type),
                  size: "sm"
                }, null, _parent$1, _scopeId));
                _push$1(`</div><div class="col-span-1"${_scopeId}>`);
                _push$1(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  color: "red",
                  onClick: ($event) => removeButtonFromRow(rowIndex, buttonIndex),
                  disabled: row.length <= 1
                }, {
                  default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                    if (_push$2) _push$2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-x-mark",
                      class: "w-4 h-4"
                    }, null, _parent$2, _scopeId$1));
                    else return [createVNode(_component_UIcon, {
                      name: "i-heroicons-x-mark",
                      class: "w-4 h-4"
                    })];
                  }),
                  _: 2
                }, _parent$1, _scopeId));
                _push$1(`</div></div>`);
              });
              _push$1(`<!--]--></div></div>`);
            });
            _push$1(`<!--]--></div><div class="mt-3 flex gap-2"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              size: "sm",
              onClick: addRow,
              disabled: unref(newInlineKeyboard).buttons.length >= 6
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) {
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent$2, _scopeId$1));
                  _push$2(` \u6DFB\u52A0\u884C `);
                } else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-plus",
                  class: "w-4 h-4 mr-2"
                }), createTextVNode(" \u6DFB\u52A0\u884C ")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div></div>`);
            _push$1(ssrRenderComponent(_component_USelect, {
              modelValue: unref(newInlineKeyboard).status,
              "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).status = $event,
              label: "\u72B6\u6001",
              options: [{
                label: "\u6D3B\u8DC3",
                value: "active"
              }, {
                label: "\u7981\u7528",
                value: "inactive"
              }]
            }, null, _parent$1, _scopeId));
            _push$1(`</div><div class="flex justify-end gap-2 mt-6"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              onClick: ($event) => showAddModal.value = false
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) _push$2(`\u53D6\u6D88`);
                else return [createTextVNode("\u53D6\u6D88")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(ssrRenderComponent(_component_UButton, {
              color: "primary",
              onClick: createInlineKeyboard
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) _push$2(`\u521B\u5EFA`);
                else return [createTextVNode("\u521B\u5EFA")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div></div>`);
          } else return [createVNode("div", { class: "p-6" }, [
            createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "\u521B\u5EFA\u5185\u8054\u952E\u76D8"),
            createVNode("div", { class: "space-y-4" }, [
              createVNode(_component_UInput, {
                modelValue: unref(newInlineKeyboard).name,
                "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).name = $event,
                label: "\u952E\u76D8\u540D\u79F0",
                placeholder: "\u8F93\u5165\u5185\u8054\u952E\u76D8\u540D\u79F0"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UTextarea, {
                modelValue: unref(newInlineKeyboard).description,
                "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).description = $event,
                label: "\u63CF\u8FF0",
                placeholder: "\u8F93\u5165\u952E\u76D8\u63CF\u8FF0"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", null, [
                createVNode("label", { class: "block text-sm font-medium text-white mb-2" }, "\u6309\u94AE\u5E03\u5C40"),
                createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(newInlineKeyboard).buttons, (row, rowIndex) => {
                  return openBlock(), createBlock("div", {
                    key: rowIndex,
                    class: "border border-[#2a2a2b] rounded-lg p-3"
                  }, [createVNode("div", { class: "flex items-center justify-between mb-2" }, [createVNode("span", { class: "text-sm text-[#9ca3af]" }, "\u7B2C " + toDisplayString(rowIndex + 1) + " \u884C", 1), createVNode("div", { class: "flex gap-2" }, [createVNode(_component_UButton, {
                    variant: "ghost",
                    size: "xs",
                    color: "green",
                    onClick: ($event) => addButtonToRow(rowIndex),
                    disabled: row.length >= 3
                  }, {
                    default: withCtx(() => [createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-4 h-4"
                    })]),
                    _: 1
                  }, 8, ["onClick", "disabled"]), createVNode(_component_UButton, {
                    variant: "ghost",
                    size: "xs",
                    color: "red",
                    onClick: ($event) => removeRow(rowIndex),
                    disabled: unref(newInlineKeyboard).buttons.length <= 1
                  }, {
                    default: withCtx(() => [createVNode(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-4 h-4"
                    })]),
                    _: 1
                  }, 8, ["onClick", "disabled"])])]), createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(row, (button, buttonIndex) => {
                    return openBlock(), createBlock("div", {
                      key: buttonIndex,
                      class: "grid grid-cols-12 gap-2 items-end"
                    }, [
                      createVNode("div", { class: "col-span-4" }, [createVNode(_component_UInput, {
                        modelValue: button.text,
                        "onUpdate:modelValue": ($event) => button.text = $event,
                        placeholder: `\u6309\u94AE\u6587\u672C`,
                        size: "sm"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                      createVNode("div", { class: "col-span-3" }, [createVNode(_component_USelect, {
                        modelValue: button.type,
                        "onUpdate:modelValue": ($event) => button.type = $event,
                        options: buttonTypeOptions,
                        size: "sm"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                      createVNode("div", { class: "col-span-4" }, [createVNode(_component_UInput, {
                        modelValue: button.value,
                        "onUpdate:modelValue": ($event) => button.value = $event,
                        placeholder: getValuePlaceholder(button.type),
                        size: "sm"
                      }, null, 8, [
                        "modelValue",
                        "onUpdate:modelValue",
                        "placeholder"
                      ])]),
                      createVNode("div", { class: "col-span-1" }, [createVNode(_component_UButton, {
                        variant: "ghost",
                        size: "xs",
                        color: "red",
                        onClick: ($event) => removeButtonFromRow(rowIndex, buttonIndex),
                        disabled: row.length <= 1
                      }, {
                        default: withCtx(() => [createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "w-4 h-4"
                        })]),
                        _: 1
                      }, 8, ["onClick", "disabled"])])
                    ]);
                  }), 128))])]);
                }), 128))]),
                createVNode("div", { class: "mt-3 flex gap-2" }, [createVNode(_component_UButton, {
                  variant: "outline",
                  size: "sm",
                  onClick: addRow,
                  disabled: unref(newInlineKeyboard).buttons.length >= 6
                }, {
                  default: withCtx(() => [createVNode(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-4 h-4 mr-2"
                  }), createTextVNode(" \u6DFB\u52A0\u884C ")]),
                  _: 1
                }, 8, ["disabled"])])
              ]),
              createVNode(_component_USelect, {
                modelValue: unref(newInlineKeyboard).status,
                "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).status = $event,
                label: "\u72B6\u6001",
                options: [{
                  label: "\u6D3B\u8DC3",
                  value: "active"
                }, {
                  label: "\u7981\u7528",
                  value: "inactive"
                }]
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            createVNode("div", { class: "flex justify-end gap-2 mt-6" }, [createVNode(_component_UButton, {
              variant: "outline",
              onClick: ($event) => showAddModal.value = false
            }, {
              default: withCtx(() => [createTextVNode("\u53D6\u6D88")]),
              _: 1
            }, 8, ["onClick"]), createVNode(_component_UButton, {
              color: "primary",
              onClick: createInlineKeyboard
            }, {
              default: withCtx(() => [createTextVNode("\u521B\u5EFA")]),
              _: 1
            })])
          ])];
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showPreviewModal),
        "onUpdate:modelValue": ($event) => isRef(showPreviewModal) ? showPreviewModal.value = $event : null
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>\u5185\u8054\u952E\u76D8\u9884\u89C8</h3>`);
            if (unref(previewInlineKeyboardData)) {
              _push$1(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(previewInlineKeyboardData).buttons, (row, rowIndex) => {
                _push$1(`<div class="flex gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(row, (button, buttonIndex) => {
                  _push$1(`<button class="${ssrRenderClass([{
                    "border-blue-500": button.type === "url",
                    "border-green-500": button.type === "callback",
                    "border-purple-500": button.type === "switch_inline"
                  }, "flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors flex items-center justify-center gap-2"])}"${_scopeId}>`);
                  if (button.type === "url") _push$1(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-link",
                    class: "w-4 h-4 text-blue-400"
                  }, null, _parent$1, _scopeId));
                  else if (button.type === "callback") _push$1(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-cursor-arrow-rays",
                    class: "w-4 h-4 text-green-400"
                  }, null, _parent$1, _scopeId));
                  else if (button.type === "switch_inline") _push$1(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-path-rounded-square",
                    class: "w-4 h-4 text-purple-400"
                  }, null, _parent$1, _scopeId));
                  else _push$1(`<!---->`);
                  _push$1(` ${ssrInterpolate(button.text)}</button>`);
                });
                _push$1(`<!--]--></div>`);
              });
              _push$1(`<!--]--><div class="mt-4 text-sm text-[#9ca3af]"${_scopeId}><p${_scopeId}><strong${_scopeId}>\u8BF4\u660E\uFF1A</strong></p><ul class="list-disc list-inside space-y-1 mt-2"${_scopeId}><li${_scopeId}><span class="text-blue-400"${_scopeId}>\u84DD\u8272\u8FB9\u6846</span>\uFF1AURL \u94FE\u63A5\u6309\u94AE</li><li${_scopeId}><span class="text-green-400"${_scopeId}>\u7EFF\u8272\u8FB9\u6846</span>\uFF1A\u56DE\u8C03\u6570\u636E\u6309\u94AE</li><li${_scopeId}><span class="text-purple-400"${_scopeId}>\u7D2B\u8272\u8FB9\u6846</span>\uFF1A\u5185\u8054\u67E5\u8BE2\u6309\u94AE</li></ul></div></div>`);
            } else _push$1(`<!---->`);
            _push$1(`<div class="flex justify-end mt-6"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UButton, { onClick: ($event) => showPreviewModal.value = false }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) _push$2(`\u5173\u95ED`);
                else return [createTextVNode("\u5173\u95ED")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div></div>`);
          } else return [createVNode("div", { class: "p-6" }, [
            createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "\u5185\u8054\u952E\u76D8\u9884\u89C8"),
            unref(previewInlineKeyboardData) ? (openBlock(), createBlock("div", {
              key: 0,
              class: "space-y-2"
            }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(previewInlineKeyboardData).buttons, (row, rowIndex) => {
              return openBlock(), createBlock("div", {
                key: rowIndex,
                class: "flex gap-2"
              }, [(openBlock(true), createBlock(Fragment, null, renderList(row, (button, buttonIndex) => {
                return openBlock(), createBlock("button", {
                  key: buttonIndex,
                  class: ["flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors flex items-center justify-center gap-2", {
                    "border-blue-500": button.type === "url",
                    "border-green-500": button.type === "callback",
                    "border-purple-500": button.type === "switch_inline"
                  }]
                }, [button.type === "url" ? (openBlock(), createBlock(_component_UIcon, {
                  key: 0,
                  name: "i-heroicons-link",
                  class: "w-4 h-4 text-blue-400"
                })) : button.type === "callback" ? (openBlock(), createBlock(_component_UIcon, {
                  key: 1,
                  name: "i-heroicons-cursor-arrow-rays",
                  class: "w-4 h-4 text-green-400"
                })) : button.type === "switch_inline" ? (openBlock(), createBlock(_component_UIcon, {
                  key: 2,
                  name: "i-heroicons-arrow-path-rounded-square",
                  class: "w-4 h-4 text-purple-400"
                })) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(button.text), 1)], 2);
              }), 128))]);
            }), 128)), createVNode("div", { class: "mt-4 text-sm text-[#9ca3af]" }, [createVNode("p", null, [createVNode("strong", null, "\u8BF4\u660E\uFF1A")]), createVNode("ul", { class: "list-disc list-inside space-y-1 mt-2" }, [
              createVNode("li", null, [createVNode("span", { class: "text-blue-400" }, "\u84DD\u8272\u8FB9\u6846"), createTextVNode("\uFF1AURL \u94FE\u63A5\u6309\u94AE")]),
              createVNode("li", null, [createVNode("span", { class: "text-green-400" }, "\u7EFF\u8272\u8FB9\u6846"), createTextVNode("\uFF1A\u56DE\u8C03\u6570\u636E\u6309\u94AE")]),
              createVNode("li", null, [createVNode("span", { class: "text-purple-400" }, "\u7D2B\u8272\u8FB9\u6846"), createTextVNode("\uFF1A\u5185\u8054\u67E5\u8BE2\u6309\u94AE")])
            ])])])) : createCommentVNode("", true),
            createVNode("div", { class: "flex justify-end mt-6" }, [createVNode(_component_UButton, { onClick: ($event) => showPreviewModal.value = false }, {
              default: withCtx(() => [createTextVNode("\u5173\u95ED")]),
              _: 1
            }, 8, ["onClick"])])
          ])];
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/inline-keyboards/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var inline_keyboards_default = index_vue_vue_type_script_setup_true_lang_default;

export { inline_keyboards_default as default };
//# sourceMappingURL=inline-keyboards-BfKJS_G3.mjs.map
