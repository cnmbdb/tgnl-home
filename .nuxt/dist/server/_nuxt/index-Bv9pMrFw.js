import __nuxt_component_0 from "./Icon-ZhGvf9gZ.js";
import __nuxt_component_2 from "./Button-D_TCUDyh.js";
import __nuxt_component_2$1 from "./Input-B1mh7BSF.js";
import __nuxt_component_3 from "./Select-BtlDiiHD.js";
import __nuxt_component_3$1 from "./Badge-BZslOKNb.js";
import __nuxt_component_4 from "./Modal-ECA6ChTs.js";
import __nuxt_component_4$1 from "./Textarea-C6iW-dfr.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, isRef, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
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
    const previewInlineKeyboardData = ref(null);
    const stats = ref({
      totalInlineKeyboards: 7,
      activeInlineKeyboards: 7,
      totalCallbacks: 28,
      todayClicks: 342
    });
    const newInlineKeyboard = ref({
      name: "",
      description: "",
      buttons: [
        [{ text: "按钮1", type: "callback", value: "callback_data_1" }]
      ],
      status: "active"
    });
    const statusOptions = [
      { label: "全部", value: "all" },
      { label: "活跃", value: "active" },
      { label: "禁用", value: "inactive" }
    ];
    const buttonTypeOptions = [
      { label: "回调数据", value: "callback" },
      { label: "URL链接", value: "url" },
      { label: "内联查询", value: "switch_inline" }
    ];
    const inlineKeyboards = ref([
      {
        id: 1,
        name: "能量购买选项",
        description: "TRX转能量的时长和次数选择",
        buttons: [
          [
            { text: "1小时1次", type: "callback", value: "energy_1h_1" },
            { text: "1小时3次", type: "callback", value: "energy_1h_3" },
            { text: "1小时5次", type: "callback", value: "energy_1h_5" }
          ],
          [
            { text: "1天1次", type: "callback", value: "energy_1d_1" },
            { text: "1天3次", type: "callback", value: "energy_1d_3" },
            { text: "1天5次", type: "callback", value: "energy_1d_5" }
          ],
          [
            { text: "3天1次", type: "callback", value: "energy_3d_1" },
            { text: "3天3次", type: "callback", value: "energy_3d_3" },
            { text: "3天5次", type: "callback", value: "energy_3d_5" }
          ]
        ],
        status: "active",
        clickCount: 1245,
        createdAt: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        name: "地址管理",
        description: "监听地址的绑定和删除操作",
        buttons: [
          [
            { text: "绑定地址", type: "callback", value: "bind_address" },
            { text: "删除地址", type: "callback", value: "delete_address" }
          ]
        ],
        status: "active",
        clickCount: 567,
        createdAt: "2024-01-14T16:45:00Z"
      },
      {
        id: 3,
        name: "支付确认",
        description: "订单支付确认和取消操作",
        buttons: [
          [
            { text: "确认支付", type: "callback", value: "confirm_payment" },
            { text: "取消订单", type: "callback", value: "cancel_order" }
          ]
        ],
        status: "active",
        clickCount: 892,
        createdAt: "2024-01-13T11:30:00Z"
      },
      {
        id: 4,
        name: "充值金额选择",
        description: "预设充值金额快速选择",
        buttons: [
          [
            { text: "100", type: "callback", value: "recharge_100" },
            { text: "200", type: "callback", value: "recharge_200" },
            { text: "500", type: "callback", value: "recharge_500" }
          ],
          [
            { text: "1000", type: "callback", value: "recharge_1000" },
            { text: "2000", type: "callback", value: "recharge_2000" },
            { text: "5000", type: "callback", value: "recharge_5000" }
          ]
        ],
        status: "active",
        clickCount: 734,
        createdAt: "2024-01-12T09:15:00Z"
      },
      {
        id: 5,
        name: "支付方式选择",
        description: "多种支付方式选择界面",
        buttons: [
          [
            { text: "银行卡", type: "callback", value: "pay_bank" },
            { text: "支付宝", type: "callback", value: "pay_alipay" }
          ],
          [
            { text: "微信", type: "callback", value: "pay_wechat" },
            { text: "所有", type: "callback", value: "pay_all" }
          ]
        ],
        status: "active",
        clickCount: 456,
        createdAt: "2024-01-11T14:20:00Z"
      },
      {
        id: 6,
        name: "汇率查询",
        description: "实时汇率查询功能",
        buttons: [
          [
            { text: "查询汇率", type: "callback", value: "check_rate" }
          ]
        ],
        status: "active",
        clickCount: 234,
        createdAt: "2024-01-10T16:30:00Z"
      },
      {
        id: 7,
        name: "客服和群组",
        description: "联系客服和加入群组的快捷入口",
        buttons: [
          [
            { text: "联系客服", type: "url", value: "https://t.me/customer_service" },
            { text: "加入群组", type: "url", value: "https://t.me/energy_group" }
          ]
        ],
        status: "active",
        clickCount: 123,
        createdAt: "2024-01-09T12:45:00Z"
      }
    ]);
    const filteredInlineKeyboards = computed(() => {
      let filtered = inlineKeyboards.value;
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
          return "回调";
        case "switch_inline":
          return "内联";
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
          return "值";
      }
    };
    const refreshInlineKeyboards = () => {
      console.log("刷新内联键盘列表");
    };
    const addRow = () => {
      newInlineKeyboard.value.buttons.push([{ text: "", type: "callback", value: "" }]);
    };
    const removeRow = (index) => {
      newInlineKeyboard.value.buttons.splice(index, 1);
    };
    const addButtonToRow = (rowIndex) => {
      newInlineKeyboard.value.buttons[rowIndex].push({ text: "", type: "callback", value: "" });
    };
    const removeButtonFromRow = (rowIndex, buttonIndex) => {
      newInlineKeyboard.value.buttons[rowIndex].splice(buttonIndex, 1);
    };
    const createInlineKeyboard = () => {
      if (!newInlineKeyboard.value.name) {
        return;
      }
      const filteredButtons = newInlineKeyboard.value.buttons.map((row) => row.filter((button) => button.text.trim() !== "")).filter((row) => row.length > 0);
      if (filteredButtons.length === 0) {
        return;
      }
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
        buttons: [
          [{ text: "按钮1", type: "callback", value: "callback_data_1" }]
        ],
        status: "active"
      };
      showAddModal.value = false;
    };
    const editInlineKeyboard = (keyboard) => {
      console.log("编辑内联键盘:", keyboard);
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
      if (index > -1) {
        inlineKeyboards.value.splice(index, 1);
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
        name: "i-heroicons-squares-plus",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> 内联键盘 </h1><p class="mt-1 text-sm text-[#9ca3af]">管理机器人的内联键盘按钮和回调功能</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        onClick: refreshInlineKeyboards
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
            _push2(` 创建内联键盘 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 创建内联键盘 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">总内联键盘</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).totalInlineKeyboards)}</p></div><div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-squares-plus",
        class: "w-6 h-6 text-blue-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">活跃键盘</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).activeInlineKeyboards)}</p></div><div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-6 h-6 text-green-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">总回调数</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).totalCallbacks)}</p></div><div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cursor-arrow-ripple",
        class: "w-6 h-6 text-purple-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">今日点击</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).todayClicks)}</p></div><div class="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-hand-raised",
        class: "w-6 h-6 text-orange-400"
      }, null, _parent));
      _push(`</div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="p-4 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-white">内联键盘列表</h2><div class="flex gap-2">`);
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
      ssrRenderList(unref(filteredInlineKeyboards), (keyboard) => {
        _push(`<div class="bg-gradient-to-br from-[#1a1a1b] to-[#2a2a2b] border border-[#3a3a3b] rounded-xl p-6 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300 shadow-lg"><div class="mb-4"><h3 class="text-lg font-semibold text-white mb-2">${ssrInterpolate(keyboard.name)}</h3><p class="text-sm text-[#9ca3af] mb-3">${ssrInterpolate(keyboard.description)}</p><div class="flex items-center justify-between mb-3">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: keyboard.status === "active" ? "green" : "red",
          variant: "subtle",
          size: "sm"
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
        _push(`<div class="flex flex-wrap gap-1"><!--[-->`);
        ssrRenderList(getUniqueButtonTypes(keyboard.buttons), (type) => {
          _push(ssrRenderComponent(_component_UBadge, {
            key: type,
            color: getTypeColor(type),
            variant: "subtle",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(getTypeLabel(type))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(getTypeLabel(type)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div></div><div class="mb-4"><h4 class="text-sm font-medium text-[#9ca3af] mb-2">按钮预览</h4><div class="space-y-2 max-h-32 overflow-y-auto"><!--[-->`);
        ssrRenderList(keyboard.buttons, (row, rowIndex) => {
          _push(`<!--[--><!--[-->`);
          ssrRenderList(row, (button, buttonIndex) => {
            _push(`<div class="w-full px-3 py-2 bg-gradient-to-r from-[#2a2a2b] to-[#323234] border border-[#3a3a3b] rounded-lg text-xs text-white flex items-center justify-center hover:border-blue-400/50 transition-all duration-200"><span class="font-medium truncate">${ssrInterpolate(button.text)}</span></div>`);
          });
          _push(`<!--]--><!--]-->`);
        });
        _push(`<!--]--></div></div><div class="mb-4 grid grid-cols-2 gap-4 text-sm"><div><span class="text-[#9ca3af]">点击次数</span><div class="text-white font-medium">${ssrInterpolate(keyboard.clickCount)}</div></div><div><span class="text-[#9ca3af]">创建时间</span><div class="text-white font-medium text-xs">${ssrInterpolate(formatDate(keyboard.createdAt))}</div></div></div><div class="flex gap-2 pt-4 border-t border-[#3a3a3b]">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          onClick: ($event) => editInlineKeyboard(keyboard),
          class: "flex-1"
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
          variant: "ghost",
          size: "xs",
          onClick: ($event) => previewInlineKeyboard(keyboard)
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
          variant: "ghost",
          size: "xs",
          color: keyboard.status === "active" ? "red" : "green",
          onClick: ($event) => toggleInlineKeyboardStatus(keyboard)
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
          variant: "ghost",
          size: "xs",
          color: "red",
          onClick: ($event) => deleteInlineKeyboard(keyboard)
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
        ui: { width: "sm:max-w-3xl" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>创建内联键盘</h3><div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(newInlineKeyboard).name,
              "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).name = $event,
              label: "键盘名称",
              placeholder: "输入内联键盘名称"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UTextarea, {
              modelValue: unref(newInlineKeyboard).description,
              "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).description = $event,
              label: "描述",
              placeholder: "输入键盘描述"
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><label class="block text-sm font-medium text-white mb-2"${_scopeId}>按钮布局</label><div class="space-y-3"${_scopeId}><!--[-->`);
            ssrRenderList(unref(newInlineKeyboard).buttons, (row, rowIndex) => {
              _push2(`<div class="border border-[#2a2a2b] rounded-lg p-3"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><span class="text-sm text-[#9ca3af]"${_scopeId}>第 ${ssrInterpolate(rowIndex + 1)} 行</span><div class="flex gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                size: "xs",
                color: "green",
                onClick: ($event) => addButtonToRow(rowIndex),
                disabled: row.length >= 3
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
                disabled: unref(newInlineKeyboard).buttons.length <= 1
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
              _push2(`</div></div><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(row, (button, buttonIndex) => {
                _push2(`<div class="grid grid-cols-12 gap-2 items-end"${_scopeId}><div class="col-span-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UInput, {
                  modelValue: button.text,
                  "onUpdate:modelValue": ($event) => button.text = $event,
                  placeholder: `按钮文本`,
                  size: "sm"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="col-span-3"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_USelect, {
                  modelValue: button.type,
                  "onUpdate:modelValue": ($event) => button.type = $event,
                  options: buttonTypeOptions,
                  size: "sm"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="col-span-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UInput, {
                  modelValue: button.value,
                  "onUpdate:modelValue": ($event) => button.value = $event,
                  placeholder: getValuePlaceholder(button.type),
                  size: "sm"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="col-span-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  color: "red",
                  onClick: ($event) => removeButtonFromRow(rowIndex, buttonIndex),
                  disabled: row.length <= 1
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "w-4 h-4"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "w-4 h-4"
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-3 flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              size: "sm",
              onClick: addRow,
              disabled: unref(newInlineKeyboard).buttons.length >= 6
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
              modelValue: unref(newInlineKeyboard).status,
              "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).status = $event,
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
              onClick: createInlineKeyboard
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
                createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "创建内联键盘"),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode(_component_UInput, {
                    modelValue: unref(newInlineKeyboard).name,
                    "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).name = $event,
                    label: "键盘名称",
                    placeholder: "输入内联键盘名称"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UTextarea, {
                    modelValue: unref(newInlineKeyboard).description,
                    "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).description = $event,
                    label: "描述",
                    placeholder: "输入键盘描述"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-white mb-2" }, "按钮布局"),
                    createVNode("div", { class: "space-y-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(newInlineKeyboard).buttons, (row, rowIndex) => {
                        return openBlock(), createBlock("div", {
                          key: rowIndex,
                          class: "border border-[#2a2a2b] rounded-lg p-3"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                            createVNode("span", { class: "text-sm text-[#9ca3af]" }, "第 " + toDisplayString(rowIndex + 1) + " 行", 1),
                            createVNode("div", { class: "flex gap-2" }, [
                              createVNode(_component_UButton, {
                                variant: "ghost",
                                size: "xs",
                                color: "green",
                                onClick: ($event) => addButtonToRow(rowIndex),
                                disabled: row.length >= 3
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
                                disabled: unref(newInlineKeyboard).buttons.length <= 1
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-trash",
                                    class: "w-4 h-4"
                                  })
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(row, (button, buttonIndex) => {
                              return openBlock(), createBlock("div", {
                                key: buttonIndex,
                                class: "grid grid-cols-12 gap-2 items-end"
                              }, [
                                createVNode("div", { class: "col-span-4" }, [
                                  createVNode(_component_UInput, {
                                    modelValue: button.text,
                                    "onUpdate:modelValue": ($event) => button.text = $event,
                                    placeholder: `按钮文本`,
                                    size: "sm"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "col-span-3" }, [
                                  createVNode(_component_USelect, {
                                    modelValue: button.type,
                                    "onUpdate:modelValue": ($event) => button.type = $event,
                                    options: buttonTypeOptions,
                                    size: "sm"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "col-span-4" }, [
                                  createVNode(_component_UInput, {
                                    modelValue: button.value,
                                    "onUpdate:modelValue": ($event) => button.value = $event,
                                    placeholder: getValuePlaceholder(button.type),
                                    size: "sm"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                ]),
                                createVNode("div", { class: "col-span-1" }, [
                                  createVNode(_component_UButton, {
                                    variant: "ghost",
                                    size: "xs",
                                    color: "red",
                                    onClick: ($event) => removeButtonFromRow(rowIndex, buttonIndex),
                                    disabled: row.length <= 1
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UIcon, {
                                        name: "i-heroicons-x-mark",
                                        class: "w-4 h-4"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick", "disabled"])
                                ])
                              ]);
                            }), 128))
                          ])
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "mt-3 flex gap-2" }, [
                      createVNode(_component_UButton, {
                        variant: "outline",
                        size: "sm",
                        onClick: addRow,
                        disabled: unref(newInlineKeyboard).buttons.length >= 6
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
                    modelValue: unref(newInlineKeyboard).status,
                    "onUpdate:modelValue": ($event) => unref(newInlineKeyboard).status = $event,
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
                    onClick: createInlineKeyboard
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
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>内联键盘预览</h3>`);
            if (unref(previewInlineKeyboardData)) {
              _push2(`<div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(previewInlineKeyboardData).buttons, (row, rowIndex) => {
                _push2(`<div class="flex gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(row, (button, buttonIndex) => {
                  _push2(`<button class="${ssrRenderClass([{
                    "border-blue-500": button.type === "url",
                    "border-green-500": button.type === "callback",
                    "border-purple-500": button.type === "switch_inline"
                  }, "flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors flex items-center justify-center gap-2"])}"${_scopeId}>`);
                  if (button.type === "url") {
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-link",
                      class: "w-4 h-4 text-blue-400"
                    }, null, _parent2, _scopeId));
                  } else if (button.type === "callback") {
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-cursor-arrow-rays",
                      class: "w-4 h-4 text-green-400"
                    }, null, _parent2, _scopeId));
                  } else if (button.type === "switch_inline") {
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-path-rounded-square",
                      class: "w-4 h-4 text-purple-400"
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(` ${ssrInterpolate(button.text)}</button>`);
                });
                _push2(`<!--]--></div>`);
              });
              _push2(`<!--]--><div class="mt-4 text-sm text-[#9ca3af]"${_scopeId}><p${_scopeId}><strong${_scopeId}>说明：</strong></p><ul class="list-disc list-inside space-y-1 mt-2"${_scopeId}><li${_scopeId}><span class="text-blue-400"${_scopeId}>蓝色边框</span>：URL 链接按钮</li><li${_scopeId}><span class="text-green-400"${_scopeId}>绿色边框</span>：回调数据按钮</li><li${_scopeId}><span class="text-purple-400"${_scopeId}>紫色边框</span>：内联查询按钮</li></ul></div></div>`);
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
                createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "内联键盘预览"),
                unref(previewInlineKeyboardData) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-2"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(previewInlineKeyboardData).buttons, (row, rowIndex) => {
                    return openBlock(), createBlock("div", {
                      key: rowIndex,
                      class: "flex gap-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(row, (button, buttonIndex) => {
                        return openBlock(), createBlock("button", {
                          key: buttonIndex,
                          class: ["flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors flex items-center justify-center gap-2", {
                            "border-blue-500": button.type === "url",
                            "border-green-500": button.type === "callback",
                            "border-purple-500": button.type === "switch_inline"
                          }]
                        }, [
                          button.type === "url" ? (openBlock(), createBlock(_component_UIcon, {
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
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(button.text), 1)
                        ], 2);
                      }), 128))
                    ]);
                  }), 128)),
                  createVNode("div", { class: "mt-4 text-sm text-[#9ca3af]" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, "说明：")
                    ]),
                    createVNode("ul", { class: "list-disc list-inside space-y-1 mt-2" }, [
                      createVNode("li", null, [
                        createVNode("span", { class: "text-blue-400" }, "蓝色边框"),
                        createTextVNode("：URL 链接按钮")
                      ]),
                      createVNode("li", null, [
                        createVNode("span", { class: "text-green-400" }, "绿色边框"),
                        createTextVNode("：回调数据按钮")
                      ]),
                      createVNode("li", null, [
                        createVNode("span", { class: "text-purple-400" }, "紫色边框"),
                        createTextVNode("：内联查询按钮")
                      ])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/inline-keyboards/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Bv9pMrFw.js.map
