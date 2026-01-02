import __nuxt_component_0 from "./Icon-ZhGvf9gZ.js";
import __nuxt_component_2 from "./Button-D_TCUDyh.js";
import __nuxt_component_2$1 from "./Input-B1mh7BSF.js";
import __nuxt_component_3 from "./Select-BtlDiiHD.js";
import __nuxt_component_3$1 from "./Badge-BZslOKNb.js";
import __nuxt_component_4 from "./Modal-ECA6ChTs.js";
import __nuxt_component_4$1 from "./Textarea-C6iW-dfr.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, isRef, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import "hookable";
import "./index-C6m-0LTF.js";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "klona";
import "@vueuse/core";
import "tailwind-merge";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Link-CS5wywLd.js";
import "./nuxt-link-C6IP2oPu.js";
import "ohash/utils";
import "./link-Bz3Wc5MF.js";
import "./tooltip-BtqstB0H.js";
import "./useButtonGroup-6uzJtOJv.js";
import "./button-Bz5rwL6o.js";
import "./useFormGroup-B3564yef.js";
import "./transition-D7D2sf6r.js";
import "./portal-RXXuCQxI.js";
import "./focus-management-vHH7q6nP.js";
import "./keyboard-Duq8EHr3.js";
import "./use-outside-click-BHqYmLlt.js";
import "./hidden-Dc_fFmis.js";
import "./active-element-history-Cer4cSOw.js";
import "./micro-task-B6uncIso.js";
import "./open-closed-BDzQJ33n.js";
import "./description-CsZvF7Vz.js";
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
        [{ text: "按钮1", action: "text" }]
      ],
      status: "active"
    });
    const statusOptions = [
      { label: "全部", value: "all" },
      { label: "活跃", value: "active" },
      { label: "禁用", value: "inactive" }
    ];
    const keyboards = ref([
      {
        id: 1,
        name: "主键盘菜单",
        description: "机器人主要功能键盘布局（回复键盘）",
        type: "reply",
        layout: [
          [
            { text: "💰 预存扣费", action: "text" },
            { text: "✅ USDT转TRX", action: "text" }
          ],
          [
            { text: "🔍 查交易", action: "text" },
            { text: "⚡ TRX转能量", action: "text" }
          ],
          [
            { text: "📍 已监听地址", action: "text" },
            { text: "🔔 开始/结束监听", action: "text" }
          ],
          [
            { text: "💳 我要充值", action: "text" },
            { text: "👤 个人中心", action: "text" }
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
      console.log("刷新键盘列表");
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
          [{ text: "按钮1", action: "text" }, { text: "按钮2", action: "text" }]
        ],
        status: "active"
      };
      showAddModal.value = false;
    };
    const editKeyboard = (keyboard) => {
      console.log("编辑键盘:", keyboard);
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
      _push(`</div> 键盘按钮 </h1><p class="mt-1 text-sm text-[#9ca3af]">管理机器人的自定义键盘按钮布局</p></div><div class="flex gap-2">`);
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
            _push2(` 刷新 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 刷新 ")
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
            _push2(` 创建键盘 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 创建键盘 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">总键盘数</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).totalKeyboards)}</p></div><div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-rectangle-group",
        class: "w-6 h-6 text-blue-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">活跃键盘</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).activeKeyboards)}</p></div><div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-6 h-6 text-green-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">总按钮数</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).totalButtons)}</p></div><div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-squares-2x2",
        class: "w-6 h-6 text-purple-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">今日使用</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).todayUsage)}</p></div><div class="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cursor-arrow-rays",
        class: "w-6 h-6 text-orange-400"
      }, null, _parent));
      _push(`</div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="p-4 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-white">键盘列表</h2><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(searchQuery),
        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        placeholder: "搜索键盘名称...",
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
              _push2(`${ssrInterpolate(keyboard.status === "active" ? "活跃" : "禁用")}`);
            } else {
              return [
                createTextVNode(toDisplayString(keyboard.status === "active" ? "活跃" : "禁用"), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="mb-4"><h4 class="text-sm font-medium text-[#9ca3af] mb-3">按钮布局</h4><div class="space-y-2"><!--[-->`);
        ssrRenderList(keyboard.layout, (row, rowIndex) => {
          _push(`<div class="grid grid-cols-2 gap-2 w-full"><!--[-->`);
          ssrRenderList(row, (button, buttonIndex) => {
            _push(`<button class="w-full px-3 py-2 bg-gradient-to-r from-[#2a2a2b] to-[#323234] border border-[#3a3a3b] rounded-lg text-sm text-white hover:border-blue-400/30 transition-all duration-200 min-h-[40px] text-center block">${ssrInterpolate(button.text)}</button>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div></div><div class="grid grid-cols-2 gap-4 mb-4 p-3 bg-[#0c0c0d]/50 rounded-lg"><div class="text-center"><div class="text-lg font-semibold text-white">${ssrInterpolate(keyboard.buttonCount)}</div><div class="text-xs text-[#9ca3af]">按钮数量</div></div><div class="text-center"><div class="text-lg font-semibold text-white">${ssrInterpolate(keyboard.usageCount)}</div><div class="text-xs text-[#9ca3af]">使用次数</div></div></div><div class="text-xs text-[#9ca3af] mb-4"> 创建于 ${ssrInterpolate(formatDate(keyboard.createdAt))}</div><div class="flex gap-2">`);
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
              _push2(` 编辑 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-pencil",
                  class: "w-4 h-4 mr-1"
                }),
                createTextVNode(" 编辑 ")
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
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>创建键盘</h3><div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(newKeyboard).name,
              "onUpdate:modelValue": ($event) => unref(newKeyboard).name = $event,
              label: "键盘名称",
              placeholder: "输入键盘名称"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UTextarea, {
              modelValue: unref(newKeyboard).description,
              "onUpdate:modelValue": ($event) => unref(newKeyboard).description = $event,
              label: "描述",
              placeholder: "输入键盘描述"
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><label class="block text-sm font-medium text-white mb-2"${_scopeId}>键盘布局</label><div class="space-y-2"${_scopeId}><!--[-->`);
            ssrRenderList(unref(newKeyboard).layout, (row, rowIndex) => {
              _push2(`<div class="flex gap-2 items-center"${_scopeId}><div class="flex-1 flex gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(row, (button, buttonIndex) => {
                _push2(`<div class="flex-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UInput, {
                  modelValue: button.text,
                  "onUpdate:modelValue": ($event) => button.text = $event,
                  placeholder: `按钮 ${buttonIndex + 1}`,
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
                  _push3(` 添加行 `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" 添加行 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(newKeyboard).status,
              "onUpdate:modelValue": ($event) => unref(newKeyboard).status = $event,
              label: "状态",
              options: [
                { label: "活跃", value: "active" },
                { label: "禁用", value: "inactive" }
              ]
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end gap-2 mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              onClick: ($event) => showAddModal.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`取消`);
                } else {
                  return [
                    createTextVNode("取消")
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
                  _push3(`创建`);
                } else {
                  return [
                    createTextVNode("创建")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "创建键盘"),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode(_component_UInput, {
                    modelValue: unref(newKeyboard).name,
                    "onUpdate:modelValue": ($event) => unref(newKeyboard).name = $event,
                    label: "键盘名称",
                    placeholder: "输入键盘名称"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UTextarea, {
                    modelValue: unref(newKeyboard).description,
                    "onUpdate:modelValue": ($event) => unref(newKeyboard).description = $event,
                    label: "描述",
                    placeholder: "输入键盘描述"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-white mb-2" }, "键盘布局"),
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
                                  placeholder: `按钮 ${buttonIndex + 1}`,
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
                          createTextVNode(" 添加行 ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ]),
                  createVNode(_component_USelect, {
                    modelValue: unref(newKeyboard).status,
                    "onUpdate:modelValue": ($event) => unref(newKeyboard).status = $event,
                    label: "状态",
                    options: [
                      { label: "活跃", value: "active" },
                      { label: "禁用", value: "inactive" }
                    ]
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex justify-end gap-2 mt-6" }, [
                  createVNode(_component_UButton, {
                    variant: "outline",
                    onClick: ($event) => showAddModal.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode("取消")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    onClick: createKeyboard
                  }, {
                    default: withCtx(() => [
                      createTextVNode("创建")
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
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>键盘预览</h3>`);
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
                  _push3(`关闭`);
                } else {
                  return [
                    createTextVNode("关闭")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "键盘预览"),
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
                      createTextVNode("关闭")
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BDchLW55.js.map
