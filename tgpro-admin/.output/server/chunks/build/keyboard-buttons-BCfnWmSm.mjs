import Icon_default from './Icon-BQxbVddL.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import Badge_default from './Badge-Bb9IcqQP.mjs';
import Input_default from './Input-CbhZIhGI.mjs';
import Select_default from './Select-Cx-ISQOC.mjs';
import Textarea_default from './Textarea-ClW9ULmm.mjs';
import Modal_default from './Modal-BbhoxMMu.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, isRef, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
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
    const previewKeyboardData = ref(null);
    const stats = ref({
      totalKeyboards: 15,
      activeKeyboards: 12,
      totalButtons: 68,
      todayUsage: 234
    });
    const newKeyboard = ref({
      name: "",
      description: "",
      layout: [[{
        text: "\u6309\u94AE1",
        action: "text"
      }, {
        text: "\u6309\u94AE2",
        action: "text"
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
    const keyboards = ref([
      {
        id: 1,
        name: "\u4E3B\u83DC\u5355",
        description: "\u673A\u5668\u4EBA\u4E3B\u83DC\u5355\u952E\u76D8",
        layout: [
          [{
            text: "\u{1F4CA} \u6570\u636E\u7EDF\u8BA1",
            action: "callback"
          }, {
            text: "\u{1F465} \u7528\u6237\u7BA1\u7406",
            action: "callback"
          }],
          [{
            text: "\u{1F916} \u673A\u5668\u4EBA\u8BBE\u7F6E",
            action: "callback"
          }],
          [{
            text: "\u2753 \u5E2E\u52A9",
            action: "callback"
          }, {
            text: "\u{1F4DE} \u8054\u7CFB\u5BA2\u670D",
            action: "callback"
          }]
        ],
        buttonCount: 5,
        status: "active",
        usageCount: 1234,
        createdAt: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        name: "\u8BBE\u7F6E\u83DC\u5355",
        description: "\u673A\u5668\u4EBA\u8BBE\u7F6E\u76F8\u5173\u529F\u80FD",
        layout: [
          [{
            text: "\u{1F527} \u57FA\u7840\u8BBE\u7F6E",
            action: "callback"
          }, {
            text: "\u{1F3A8} \u754C\u9762\u8BBE\u7F6E",
            action: "callback"
          }],
          [{
            text: "\u{1F514} \u901A\u77E5\u8BBE\u7F6E",
            action: "callback"
          }, {
            text: "\u{1F510} \u5B89\u5168\u8BBE\u7F6E",
            action: "callback"
          }],
          [{
            text: "\u{1F519} \u8FD4\u56DE\u4E3B\u83DC\u5355",
            action: "callback"
          }]
        ],
        buttonCount: 5,
        status: "active",
        usageCount: 567,
        createdAt: "2024-01-14T16:45:00Z"
      },
      {
        id: 3,
        name: "\u5FEB\u901F\u64CD\u4F5C",
        description: "\u5E38\u7528\u529F\u80FD\u5FEB\u901F\u8BBF\u95EE",
        layout: [[
          {
            text: "\u{1F4DD} \u65B0\u5EFA",
            action: "callback"
          },
          {
            text: "\u{1F4CB} \u5217\u8868",
            action: "callback"
          },
          {
            text: "\u{1F50D} \u641C\u7D22",
            action: "callback"
          }
        ], [{
          text: "\u2B50 \u6536\u85CF",
          action: "callback"
        }, {
          text: "\u{1F4E4} \u5206\u4EAB",
          action: "callback"
        }]],
        buttonCount: 5,
        status: "inactive",
        usageCount: 89,
        createdAt: "2024-01-13T11:30:00Z"
      }
    ]);
    const filteredKeyboards = computed(() => {
      let filtered = keyboards.value;
      if (searchQuery.value) filtered = filtered.filter((keyboard) => keyboard.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || keyboard.description.toLowerCase().includes(searchQuery.value.toLowerCase()));
      if (statusFilter.value !== "all") filtered = filtered.filter((keyboard) => keyboard.status === statusFilter.value);
      return filtered;
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("zh-CN");
    };
    const refreshKeyboards = () => {
      console.log("\u5237\u65B0\u952E\u76D8\u5217\u8868");
    };
    const addRow = () => {
      newKeyboard.value.layout.push([{
        text: "",
        action: "text"
      }]);
    };
    const removeRow = (index) => {
      newKeyboard.value.layout.splice(index, 1);
    };
    const addButtonToRow = (rowIndex) => {
      newKeyboard.value.layout[rowIndex].push({
        text: "",
        action: "text"
      });
    };
    const createKeyboard = () => {
      if (!newKeyboard.value.name) return;
      const buttonCount = newKeyboard.value.layout.reduce((total, row) => total + row.length, 0);
      const keyboard = {
        id: Date.now(),
        name: newKeyboard.value.name,
        description: newKeyboard.value.description,
        layout: newKeyboard.value.layout.map((row) => row.filter((button) => button.text.trim() !== "")).filter((row) => row.length > 0),
        buttonCount,
        status: newKeyboard.value.status,
        usageCount: 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      keyboards.value.unshift(keyboard);
      newKeyboard.value = {
        name: "",
        description: "",
        layout: [[{
          text: "\u6309\u94AE1",
          action: "text"
        }, {
          text: "\u6309\u94AE2",
          action: "text"
        }]],
        status: "active"
      };
      showAddModal.value = false;
    };
    const editKeyboard = (keyboard) => {
      console.log("\u7F16\u8F91\u952E\u76D8:", keyboard);
    };
    const previewKeyboard = (keyboard) => {
      previewKeyboardData.value = keyboard;
      showPreviewModal.value = true;
    };
    const toggleKeyboardStatus = (keyboard) => {
      keyboard.status = keyboard.status === "active" ? "inactive" : "active";
    };
    const deleteKeyboard = (keyboard) => {
      const index = keyboards.value.findIndex((k) => k.id === keyboard.id);
      if (index > -1) keyboards.value.splice(index, 1);
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
        name: "i-heroicons-rectangle-group",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> \u952E\u76D8\u6309\u94AE </h1><p class="mt-1 text-sm text-[#9ca3af]">\u7BA1\u7406\u673A\u5668\u4EBA\u7684\u81EA\u5B9A\u4E49\u952E\u76D8\u6309\u94AE\u5E03\u5C40</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        onClick: refreshKeyboards
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
            _push$1(` \u521B\u5EFA\u952E\u76D8 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-plus",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u521B\u5EFA\u952E\u76D8 ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u603B\u952E\u76D8\u6570</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).totalKeyboards)}</p></div><div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-rectangle-group",
        class: "w-6 h-6 text-blue-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u6D3B\u8DC3\u952E\u76D8</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).activeKeyboards)}</p></div><div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-6 h-6 text-green-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u603B\u6309\u94AE\u6570</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).totalButtons)}</p></div><div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-squares-2x2",
        class: "w-6 h-6 text-purple-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u4ECA\u65E5\u4F7F\u7528</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).todayUsage)}</p></div><div class="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cursor-arrow-rays",
        class: "w-6 h-6 text-orange-400"
      }, null, _parent));
      _push(`</div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="p-4 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-white">\u952E\u76D8\u5217\u8868</h2><div class="flex gap-2">`);
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
      _push(`</div></div></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-[#0c0c0d]"><tr><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u952E\u76D8\u540D\u79F0</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u5E03\u5C40\u9884\u89C8</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u6309\u94AE\u6570\u91CF</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u72B6\u6001</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u4F7F\u7528\u6B21\u6570</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u521B\u5EFA\u65F6\u95F4</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u64CD\u4F5C</th></tr></thead><tbody class="divide-y divide-[#2a2a2b]"><!--[-->`);
      ssrRenderList(unref(filteredKeyboards), (keyboard) => {
        _push(`<tr class="hover:bg-[#2a2a2b]/50"><td class="px-4 py-3"><div class="text-sm font-medium text-white">${ssrInterpolate(keyboard.name)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(keyboard.description)}</div></td><td class="px-4 py-3"><div class="space-y-1 max-w-xs"><!--[-->`);
        ssrRenderList(keyboard.layout, (row, rowIndex) => {
          _push(`<div class="flex gap-1"><!--[-->`);
          ssrRenderList(row, (button, buttonIndex) => {
            _push(`<div class="px-2 py-1 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-xs text-white truncate" style="${ssrRenderStyle({ "max-width": "60px" })}">${ssrInterpolate(button.text)}</div>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div></td><td class="px-4 py-3"><div class="text-sm text-white">${ssrInterpolate(keyboard.buttonCount)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(keyboard.layout.length)} \u884C</div></td><td class="px-4 py-3">`);
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
        _push(`</td><td class="px-4 py-3 text-sm text-white">${ssrInterpolate(keyboard.usageCount)}</td><td class="px-4 py-3 text-sm text-[#9ca3af]">${ssrInterpolate(formatDate(keyboard.createdAt))}</td><td class="px-4 py-3"><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          onClick: ($event) => editKeyboard(keyboard)
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
          onClick: ($event) => previewKeyboard(keyboard)
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
          onClick: ($event) => toggleKeyboardStatus(keyboard)
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
          onClick: ($event) => deleteKeyboard(keyboard)
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
        ui: { width: "sm:max-w-2xl" }
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>\u521B\u5EFA\u952E\u76D8</h3><div class="space-y-4"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UInput, {
              modelValue: unref(newKeyboard).name,
              "onUpdate:modelValue": ($event) => unref(newKeyboard).name = $event,
              label: "\u952E\u76D8\u540D\u79F0",
              placeholder: "\u8F93\u5165\u952E\u76D8\u540D\u79F0"
            }, null, _parent$1, _scopeId));
            _push$1(ssrRenderComponent(_component_UTextarea, {
              modelValue: unref(newKeyboard).description,
              "onUpdate:modelValue": ($event) => unref(newKeyboard).description = $event,
              label: "\u63CF\u8FF0",
              placeholder: "\u8F93\u5165\u952E\u76D8\u63CF\u8FF0"
            }, null, _parent$1, _scopeId));
            _push$1(`<div${_scopeId}><label class="block text-sm font-medium text-white mb-2"${_scopeId}>\u952E\u76D8\u5E03\u5C40</label><div class="space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(newKeyboard).layout, (row, rowIndex) => {
              _push$1(`<div class="flex gap-2 items-center"${_scopeId}><div class="flex-1 flex gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(row, (button, buttonIndex) => {
                _push$1(`<div class="flex-1"${_scopeId}>`);
                _push$1(ssrRenderComponent(_component_UInput, {
                  modelValue: button.text,
                  "onUpdate:modelValue": ($event) => button.text = $event,
                  placeholder: `\u6309\u94AE ${buttonIndex + 1}`,
                  size: "sm"
                }, null, _parent$1, _scopeId));
                _push$1(`</div>`);
              });
              _push$1(`<!--]--></div>`);
              _push$1(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                size: "xs",
                color: "green",
                onClick: ($event) => addButtonToRow(rowIndex),
                disabled: row.length >= 4
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
                disabled: unref(newKeyboard).layout.length <= 1
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
              _push$1(`</div>`);
            });
            _push$1(`<!--]--></div><div class="mt-2 flex gap-2"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              size: "sm",
              onClick: addRow,
              disabled: unref(newKeyboard).layout.length >= 8
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
              modelValue: unref(newKeyboard).status,
              "onUpdate:modelValue": ($event) => unref(newKeyboard).status = $event,
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
              onClick: createKeyboard
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) _push$2(`\u521B\u5EFA`);
                else return [createTextVNode("\u521B\u5EFA")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div></div>`);
          } else return [createVNode("div", { class: "p-6" }, [
            createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "\u521B\u5EFA\u952E\u76D8"),
            createVNode("div", { class: "space-y-4" }, [
              createVNode(_component_UInput, {
                modelValue: unref(newKeyboard).name,
                "onUpdate:modelValue": ($event) => unref(newKeyboard).name = $event,
                label: "\u952E\u76D8\u540D\u79F0",
                placeholder: "\u8F93\u5165\u952E\u76D8\u540D\u79F0"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UTextarea, {
                modelValue: unref(newKeyboard).description,
                "onUpdate:modelValue": ($event) => unref(newKeyboard).description = $event,
                label: "\u63CF\u8FF0",
                placeholder: "\u8F93\u5165\u952E\u76D8\u63CF\u8FF0"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode("div", null, [
                createVNode("label", { class: "block text-sm font-medium text-white mb-2" }, "\u952E\u76D8\u5E03\u5C40"),
                createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(newKeyboard).layout, (row, rowIndex) => {
                  return openBlock(), createBlock("div", {
                    key: rowIndex,
                    class: "flex gap-2 items-center"
                  }, [
                    createVNode("div", { class: "flex-1 flex gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(row, (button, buttonIndex) => {
                      return openBlock(), createBlock("div", {
                        key: buttonIndex,
                        class: "flex-1"
                      }, [createVNode(_component_UInput, {
                        modelValue: button.text,
                        "onUpdate:modelValue": ($event) => button.text = $event,
                        placeholder: `\u6309\u94AE ${buttonIndex + 1}`,
                        size: "sm"
                      }, null, 8, [
                        "modelValue",
                        "onUpdate:modelValue",
                        "placeholder"
                      ])]);
                    }), 128))]),
                    createVNode(_component_UButton, {
                      variant: "ghost",
                      size: "xs",
                      color: "green",
                      onClick: ($event) => addButtonToRow(rowIndex),
                      disabled: row.length >= 4
                    }, {
                      default: withCtx(() => [createVNode(_component_UIcon, {
                        name: "i-heroicons-plus",
                        class: "w-4 h-4"
                      })]),
                      _: 1
                    }, 8, ["onClick", "disabled"]),
                    createVNode(_component_UButton, {
                      variant: "ghost",
                      size: "xs",
                      color: "red",
                      onClick: ($event) => removeRow(rowIndex),
                      disabled: unref(newKeyboard).layout.length <= 1
                    }, {
                      default: withCtx(() => [createVNode(_component_UIcon, {
                        name: "i-heroicons-trash",
                        class: "w-4 h-4"
                      })]),
                      _: 1
                    }, 8, ["onClick", "disabled"])
                  ]);
                }), 128))]),
                createVNode("div", { class: "mt-2 flex gap-2" }, [createVNode(_component_UButton, {
                  variant: "outline",
                  size: "sm",
                  onClick: addRow,
                  disabled: unref(newKeyboard).layout.length >= 8
                }, {
                  default: withCtx(() => [createVNode(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-4 h-4 mr-2"
                  }), createTextVNode(" \u6DFB\u52A0\u884C ")]),
                  _: 1
                }, 8, ["disabled"])])
              ]),
              createVNode(_component_USelect, {
                modelValue: unref(newKeyboard).status,
                "onUpdate:modelValue": ($event) => unref(newKeyboard).status = $event,
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
              onClick: createKeyboard
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
            _push$1(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>\u952E\u76D8\u9884\u89C8</h3>`);
            if (unref(previewKeyboardData)) {
              _push$1(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(previewKeyboardData).layout, (row, rowIndex) => {
                _push$1(`<div class="flex gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(row, (button, buttonIndex) => {
                  _push$1(`<button class="flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors"${_scopeId}>${ssrInterpolate(button.text)}</button>`);
                });
                _push$1(`<!--]--></div>`);
              });
              _push$1(`<!--]--></div>`);
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
            createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "\u952E\u76D8\u9884\u89C8"),
            unref(previewKeyboardData) ? (openBlock(), createBlock("div", {
              key: 0,
              class: "space-y-2"
            }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(previewKeyboardData).layout, (row, rowIndex) => {
              return openBlock(), createBlock("div", {
                key: rowIndex,
                class: "flex gap-2"
              }, [(openBlock(true), createBlock(Fragment, null, renderList(row, (button, buttonIndex) => {
                return openBlock(), createBlock("button", {
                  key: buttonIndex,
                  class: "flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors"
                }, toDisplayString(button.text), 1);
              }), 128))]);
            }), 128))])) : createCommentVNode("", true),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/keyboard-buttons/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var keyboard_buttons_default = index_vue_vue_type_script_setup_true_lang_default;

export { keyboard_buttons_default as default };
//# sourceMappingURL=keyboard-buttons-BCfnWmSm.mjs.map
