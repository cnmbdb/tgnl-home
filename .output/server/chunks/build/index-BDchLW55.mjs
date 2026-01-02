import __nuxt_component_0 from './Icon-ZhGvf9gZ.mjs';
import __nuxt_component_2 from './Button-D_TCUDyh.mjs';
import __nuxt_component_2$1 from './Input-B1mh7BSF.mjs';
import __nuxt_component_3 from './Select-BtlDiiHD.mjs';
import __nuxt_component_3$1 from './Badge-BZslOKNb.mjs';
import __nuxt_component_4 from './Modal-ECA6ChTs.mjs';
import __nuxt_component_4$1 from './Textarea-C6iW-dfr.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, isRef, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import './index-C6m-0LTF.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'mysql2/promise';
import 'fs';
import 'path';
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
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './Link-CS5wywLd.mjs';
import './nuxt-link-C6IP2oPu.mjs';
import './link-Bz3Wc5MF.mjs';
import './tooltip-BtqstB0H.mjs';
import './useButtonGroup-6uzJtOJv.mjs';
import './button-Bz5rwL6o.mjs';
import './useFormGroup-B3564yef.mjs';
import './transition-D7D2sf6r.mjs';
import './portal-RXXuCQxI.mjs';
import './focus-management-vHH7q6nP.mjs';
import './keyboard-Duq8EHr3.mjs';
import './use-outside-click-BHqYmLlt.mjs';
import './hidden-Dc_fFmis.mjs';
import './active-element-history-Cer4cSOw.mjs';
import './micro-task-B6uncIso.mjs';
import './open-closed-BDzQJ33n.mjs';
import './description-CsZvF7Vz.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const showAddModal = ref(false);
    const showPreviewModal = ref(false);
    const searchQuery = ref("");
    const statusFilter = ref("all");
    const previewKeyboardData = ref(null);
    const stats = ref({
      totalKeyboards: 1,
      activeKeyboards: 1,
      totalButtons: 8,
      todayUsage: 1245
    });
    const newKeyboard = ref({
      name: "",
      description: "",
      layout: [
        [{ text: "\u6309\u94AE1", action: "text" }]
      ],
      status: "active"
    });
    const statusOptions = [
      { label: "\u5168\u90E8", value: "all" },
      { label: "\u6D3B\u8DC3", value: "active" },
      { label: "\u7981\u7528", value: "inactive" }
    ];
    const keyboards = ref([
      {
        id: 1,
        name: "\u4E3B\u952E\u76D8\u83DC\u5355",
        description: "\u673A\u5668\u4EBA\u4E3B\u8981\u529F\u80FD\u952E\u76D8\u5E03\u5C40\uFF08\u56DE\u590D\u952E\u76D8\uFF09",
        type: "reply",
        layout: [
          [
            { text: "\u{1F4B0} \u9884\u5B58\u6263\u8D39", action: "text" },
            { text: "\u2705 USDT\u8F6CTRX", action: "text" }
          ],
          [
            { text: "\u{1F50D} \u67E5\u4EA4\u6613", action: "text" },
            { text: "\u26A1 TRX\u8F6C\u80FD\u91CF", action: "text" }
          ],
          [
            { text: "\u{1F4CD} \u5DF2\u76D1\u542C\u5730\u5740", action: "text" },
            { text: "\u{1F514} \u5F00\u59CB/\u7ED3\u675F\u76D1\u542C", action: "text" }
          ],
          [
            { text: "\u{1F4B3} \u6211\u8981\u5145\u503C", action: "text" },
            { text: "\u{1F464} \u4E2A\u4EBA\u4E2D\u5FC3", action: "text" }
          ]
        ],
        buttonCount: 8,
        status: "active",
        usageCount: 1245,
        createdAt: "2024-01-15T10:30:00Z"
      }
    ]);
    const filteredKeyboards = computed(() => {
      let filtered = keyboards.value;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (keyboard) => keyboard.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || keyboard.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      if (statusFilter.value !== "all") {
        filtered = filtered.filter((keyboard) => keyboard.status === statusFilter.value);
      }
      return filtered;
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("zh-CN");
    };
    const refreshKeyboards = () => {
      console.log("\u5237\u65B0\u952E\u76D8\u5217\u8868");
    };
    const addRow = () => {
      newKeyboard.value.layout.push([{ text: "", action: "text" }]);
    };
    const removeRow = (index) => {
      newKeyboard.value.layout.splice(index, 1);
    };
    const addButtonToRow = (rowIndex) => {
      newKeyboard.value.layout[rowIndex].push({ text: "", action: "text" });
    };
    const createKeyboard = () => {
      if (!newKeyboard.value.name) {
        return;
      }
      const buttonCount = newKeyboard.value.layout.reduce((total, row) => total + row.length, 0);
      const keyboard = {
        id: Date.now(),
        name: newKeyboard.value.name,
        description: newKeyboard.value.description,
        type: "reply",
        layout: newKeyboard.value.layout.map(
          (row) => row.filter((button) => button.text.trim() !== "")
        ).filter((row) => row.length > 0),
        buttonCount,
        status: newKeyboard.value.status,
        usageCount: 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      keyboards.value.unshift(keyboard);
      newKeyboard.value = {
        name: "",
        description: "",
        layout: [
          [{ text: "\u6309\u94AE1", action: "text" }, { text: "\u6309\u94AE2", action: "text" }]
        ],
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
      if (index > -1) {
        keyboards.value.splice(index, 1);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_0;
      const _component_UButton = __nuxt_component_2;
      const _component_UInput = __nuxt_component_2$1;
      const _component_USelect = __nuxt_component_3;
      const _component_UBadge = __nuxt_component_3$1;
      const _component_UModal = __nuxt_component_4;
      const _component_UTextarea = __nuxt_component_4$1;
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
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` \u5237\u65B0 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u5237\u65B0 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "sm",
        class: "bg-[#00dc82] hover:bg-[#00dc82]/80",
        onClick: ($event) => showAddModal.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` \u521B\u5EFA\u952E\u76D8 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u521B\u5EFA\u952E\u76D8 ")
            ];
          }
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
      _push(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
      ssrRenderList(unref(filteredKeyboards), (keyboard) => {
        _push(`<div class="bg-gradient-to-br from-[#1a1a1b] to-[#2a2a2b] border border-[#3a3a3b] rounded-xl p-6 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300 group"><div class="flex items-start justify-between mb-4"><div class="flex-1"><h3 class="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">${ssrInterpolate(keyboard.name)}</h3><p class="text-sm text-[#9ca3af] line-clamp-2">${ssrInterpolate(keyboard.description)}</p></div>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: keyboard.status === "active" ? "green" : "red",
          variant: "subtle",
          size: "sm",
          class: "ml-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(keyboard.status === "active" ? "\u6D3B\u8DC3" : "\u7981\u7528")}`);
            } else {
              return [
                createTextVNode(toDisplayString(keyboard.status === "active" ? "\u6D3B\u8DC3" : "\u7981\u7528"), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="mb-4"><h4 class="text-sm font-medium text-[#9ca3af] mb-3">\u6309\u94AE\u5E03\u5C40</h4><div class="space-y-2"><!--[-->`);
        ssrRenderList(keyboard.layout, (row, rowIndex) => {
          _push(`<div class="grid grid-cols-2 gap-2 w-full"><!--[-->`);
          ssrRenderList(row, (button, buttonIndex) => {
            _push(`<button class="w-full px-3 py-2 bg-gradient-to-r from-[#2a2a2b] to-[#323234] border border-[#3a3a3b] rounded-lg text-sm text-white hover:border-blue-400/30 transition-all duration-200 min-h-[40px] text-center block">${ssrInterpolate(button.text)}</button>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div></div><div class="grid grid-cols-2 gap-4 mb-4 p-3 bg-[#0c0c0d]/50 rounded-lg"><div class="text-center"><div class="text-lg font-semibold text-white">${ssrInterpolate(keyboard.buttonCount)}</div><div class="text-xs text-[#9ca3af]">\u6309\u94AE\u6570\u91CF</div></div><div class="text-center"><div class="text-lg font-semibold text-white">${ssrInterpolate(keyboard.usageCount)}</div><div class="text-xs text-[#9ca3af]">\u4F7F\u7528\u6B21\u6570</div></div></div><div class="text-xs text-[#9ca3af] mb-4"> \u521B\u5EFA\u4E8E ${ssrInterpolate(formatDate(keyboard.createdAt))}</div><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "soft",
          size: "sm",
          class: "flex-1",
          onClick: ($event) => editKeyboard(keyboard)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-pencil",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` \u7F16\u8F91 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-pencil",
                  class: "w-4 h-4 mr-1"
                }),
                createTextVNode(" \u7F16\u8F91 ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          variant: "soft",
          size: "sm",
          onClick: ($event) => previewKeyboard(keyboard)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-eye",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-eye",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          variant: "soft",
          size: "sm",
          color: keyboard.status === "active" ? "red" : "green",
          onClick: ($event) => toggleKeyboardStatus(keyboard)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: keyboard.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: keyboard.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
                  class: "w-4 h-4"
                }, null, 8, ["name"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          variant: "soft",
          size: "sm",
          color: "red",
          onClick: ($event) => deleteKeyboard(keyboard)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-trash",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showAddModal),
        "onUpdate:modelValue": ($event) => isRef(showAddModal) ? showAddModal.value = $event : null,
        ui: { width: "sm:max-w-2xl" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>\u521B\u5EFA\u952E\u76D8</h3><div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(newKeyboard).name,
              "onUpdate:modelValue": ($event) => unref(newKeyboard).name = $event,
              label: "\u952E\u76D8\u540D\u79F0",
              placeholder: "\u8F93\u5165\u952E\u76D8\u540D\u79F0"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UTextarea, {
              modelValue: unref(newKeyboard).description,
              "onUpdate:modelValue": ($event) => unref(newKeyboard).description = $event,
              label: "\u63CF\u8FF0",
              placeholder: "\u8F93\u5165\u952E\u76D8\u63CF\u8FF0"
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><label class="block text-sm font-medium text-white mb-2"${_scopeId}>\u952E\u76D8\u5E03\u5C40</label><div class="space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(newKeyboard).layout, (row, rowIndex) => {
              _push2(`<div class="flex gap-2 items-center"${_scopeId}><div class="flex-1 flex gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(row, (button, buttonIndex) => {
                _push2(`<div class="flex-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UInput, {
                  modelValue: button.text,
                  "onUpdate:modelValue": ($event) => button.text = $event,
                  placeholder: `\u6309\u94AE ${buttonIndex + 1}`,
                  size: "sm"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                size: "xs",
                color: "green",
                onClick: ($event) => addButtonToRow(rowIndex),
                disabled: row.length >= 4
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-4 h-4"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-plus",
                        class: "w-4 h-4"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                size: "xs",
                color: "red",
                onClick: ($event) => removeRow(rowIndex),
                disabled: unref(newKeyboard).layout.length <= 1
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-4 h-4"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-trash",
                        class: "w-4 h-4"
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><div class="mt-2 flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              size: "sm",
              onClick: addRow,
              disabled: unref(newKeyboard).layout.length >= 8
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` \u6DFB\u52A0\u884C `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" \u6DFB\u52A0\u884C ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(newKeyboard).status,
              "onUpdate:modelValue": ($event) => unref(newKeyboard).status = $event,
              label: "\u72B6\u6001",
              options: [
                { label: "\u6D3B\u8DC3", value: "active" },
                { label: "\u7981\u7528", value: "inactive" }
              ]
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end gap-2 mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              onClick: ($event) => showAddModal.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u53D6\u6D88`);
                } else {
                  return [
                    createTextVNode("\u53D6\u6D88")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              onClick: createKeyboard
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u521B\u5EFA`);
                } else {
                  return [
                    createTextVNode("\u521B\u5EFA")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
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
                    createVNode("div", { class: "space-y-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(newKeyboard).layout, (row, rowIndex) => {
                        return openBlock(), createBlock("div", {
                          key: rowIndex,
                          class: "flex gap-2 items-center"
                        }, [
                          createVNode("div", { class: "flex-1 flex gap-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(row, (button, buttonIndex) => {
                              return openBlock(), createBlock("div", {
                                key: buttonIndex,
                                class: "flex-1"
                              }, [
                                createVNode(_component_UInput, {
                                  modelValue: button.text,
                                  "onUpdate:modelValue": ($event) => button.text = $event,
                                  placeholder: `\u6309\u94AE ${buttonIndex + 1}`,
                                  size: "sm"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                              ]);
                            }), 128))
                          ]),
                          createVNode(_component_UButton, {
                            variant: "ghost",
                            size: "xs",
                            color: "green",
                            onClick: ($event) => addButtonToRow(rowIndex),
                            disabled: row.length >= 4
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-plus",
                                class: "w-4 h-4"
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(_component_UButton, {
                            variant: "ghost",
                            size: "xs",
                            color: "red",
                            onClick: ($event) => removeRow(rowIndex),
                            disabled: unref(newKeyboard).layout.length <= 1
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-trash",
                                class: "w-4 h-4"
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"])
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "mt-2 flex gap-2" }, [
                      createVNode(_component_UButton, {
                        variant: "outline",
                        size: "sm",
                        onClick: addRow,
                        disabled: unref(newKeyboard).layout.length >= 8
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-plus",
                            class: "w-4 h-4 mr-2"
                          }),
                          createTextVNode(" \u6DFB\u52A0\u884C ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ]),
                  createVNode(_component_USelect, {
                    modelValue: unref(newKeyboard).status,
                    "onUpdate:modelValue": ($event) => unref(newKeyboard).status = $event,
                    label: "\u72B6\u6001",
                    options: [
                      { label: "\u6D3B\u8DC3", value: "active" },
                      { label: "\u7981\u7528", value: "inactive" }
                    ]
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex justify-end gap-2 mt-6" }, [
                  createVNode(_component_UButton, {
                    variant: "outline",
                    onClick: ($event) => showAddModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u53D6\u6D88")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    onClick: createKeyboard
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u521B\u5EFA")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showPreviewModal),
        "onUpdate:modelValue": ($event) => isRef(showPreviewModal) ? showPreviewModal.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>\u952E\u76D8\u9884\u89C8</h3>`);
            if (unref(previewKeyboardData)) {
              _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(previewKeyboardData).layout, (row, rowIndex) => {
                _push2(`<div class="flex gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(row, (button, buttonIndex) => {
                  _push2(`<button class="flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors"${_scopeId}>${ssrInterpolate(button.text)}</button>`);
                });
                _push2(`<!--]--></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-end mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: ($event) => showPreviewModal.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u5173\u95ED`);
                } else {
                  return [
                    createTextVNode("\u5173\u95ED")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "\u952E\u76D8\u9884\u89C8"),
                unref(previewKeyboardData) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-2"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(previewKeyboardData).layout, (row, rowIndex) => {
                    return openBlock(), createBlock("div", {
                      key: rowIndex,
                      class: "flex gap-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(row, (button, buttonIndex) => {
                        return openBlock(), createBlock("button", {
                          key: buttonIndex,
                          class: "flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors"
                        }, toDisplayString(button.text), 1);
                      }), 128))
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex justify-end mt-6" }, [
                  createVNode(_component_UButton, {
                    onClick: ($event) => showPreviewModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("\u5173\u95ED")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/keyboard-buttons/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BDchLW55.mjs.map
