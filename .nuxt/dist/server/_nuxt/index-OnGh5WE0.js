import __nuxt_component_3 from "./Badge-BZslOKNb.js";
import __nuxt_component_0 from "./Icon-ZhGvf9gZ.js";
import __nuxt_component_2 from "./Button-D_TCUDyh.js";
import __nuxt_component_2$1 from "./Input-B1mh7BSF.js";
import __nuxt_component_4 from "./Textarea-C6iW-dfr.js";
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import "hookable";
import "tailwind-merge";
import "./tooltip-BtqstB0H.js";
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
import "@iconify/vue";
import "./useButtonGroup-6uzJtOJv.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./index-C6m-0LTF.js";
import "@iconify/utils/lib/css/icon";
import "./Link-CS5wywLd.js";
import "./nuxt-link-C6IP2oPu.js";
import "ohash/utils";
import "./link-Bz3Wc5MF.js";
import "./button-Bz5rwL6o.js";
import "./useFormGroup-B3564yef.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const saveStatus = ref("idle");
    const saveTimeouts = /* @__PURE__ */ new Map();
    const commands = ref([
      {
        id: 1,
        name: "start",
        description: "开始使用机器人",
        response: "欢迎使用USDT转TRX，TRX转能量机器人\n\n🔺进U即兑TRX,进TRX即兑能量,\n24小时全自动返,1U起兑\n❗️注意:请勿使用交易所转账,丢失自负!!\n\n‼️有任何问题,请私聊联系老板",
        status: "active",
        usageCount: 2847,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T10:30:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T10:30:00")
      },
      {
        id: 2,
        name: "send",
        description: "发送频道消息",
        response: "📢 频道消息发送功能\n\n管理员专用命令，用于向所有监听的频道发送消息。\n\n使用方法：/send [消息内容]",
        status: "active",
        usageCount: 156,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T09:15:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T09:15:00")
      },
      {
        id: 3,
        name: "power",
        description: "能量相关功能",
        response: "⚡️ TRX转能量服务\n\n• 1小时能量：3.0 TRX\n• 1天能量：9.0 TRX\n• 3天能量：7.0 TRX\n• 预存扣费：10.0 TRX\n\n🔋 24小时自动处理，安全可靠",
        status: "active",
        usageCount: 1432,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T08:45:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T08:45:00")
      },
      {
        id: 4,
        name: "okx",
        description: "查询汇率信息",
        response: "💱 实时汇率查询\n\n当前USDT/TRX汇率信息：\n• 买入汇率：11.5\n• 卖出汇率：根据市场波动\n• 折扣率：90%\n\n汇率实时更新，请以实际交易为准",
        status: "active",
        usageCount: 892,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T07:20:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T07:20:00")
      },
      {
        id: 5,
        name: "reload",
        description: "重新加载配置",
        response: "🔄 配置重载\n\n管理员专用命令，用于重新加载机器人配置文件。\n\n配置已成功重载！",
        status: "active",
        usageCount: 45,
        lastUsed: /* @__PURE__ */ new Date("2024-01-14T16:45:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-14T16:45:00")
      },
      {
        id: 6,
        name: "balance",
        description: "查询账户余额",
        response: "💰 账户余额查询\n\n您的当前余额信息：\n• USDT余额：查询中...\n• TRX余额：查询中...\n• 能量余额：查询中...\n\n请稍候，正在获取最新数据",
        status: "active",
        usageCount: 1256,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T06:30:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T06:30:00")
      },
      {
        id: 7,
        name: "monitor",
        description: "地址监听管理",
        response: "👁️ 地址监听功能\n\n• 添加监听地址\n• 查看已监听地址\n• 删除监听地址\n• 监听状态管理\n\n请选择您需要的操作",
        status: "active",
        usageCount: 678,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T05:15:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T05:15:00")
      },
      {
        id: 8,
        name: "transaction",
        description: "查询交易记录",
        response: "📊 交易记录查询\n\n• 最近交易记录\n• 交易状态查询\n• 交易详情查看\n• 交易统计信息\n\n请选择查询类型",
        status: "active",
        usageCount: 934,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T04:20:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T04:20:00")
      }
    ]);
    const activeCommandsCount = computed(
      () => commands.value.filter((cmd) => cmd.status === "active").length
    );
    const totalUsageToday = computed(
      () => commands.value.reduce((total, cmd) => total + cmd.usageCount, 0)
    );
    const errorRate = computed(() => 1.2);
    const onCommandChange = (command) => {
      if (saveTimeouts.has(command.id)) {
        clearTimeout(saveTimeouts.get(command.id));
        saveTimeouts.delete(command.id);
      }
      const timeout = setTimeout(() => {
        saveCommand(command);
        saveTimeouts.delete(command.id);
      }, 3e3);
      saveTimeouts.set(command.id, timeout);
      command.updatedAt = /* @__PURE__ */ new Date();
    };
    const saveCommand = async (command) => {
      try {
        saveStatus.value = "saving";
        const response = await $fetch("/api/bot-commands", {
          method: "POST",
          body: { commands: [command] }
        });
        if (response.success) {
          saveStatus.value = "saved";
          setTimeout(() => {
            if (saveStatus.value === "saved") {
              saveStatus.value = "idle";
            }
          }, 2e3);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error("保存命令失败:", error);
        saveStatus.value = "error";
        setTimeout(() => {
          saveStatus.value = "idle";
        }, 3e3);
      }
    };
    const saveAllCommands = async () => {
      try {
        saveStatus.value = "saving";
        const response = await $fetch("/api/bot-commands", {
          method: "POST",
          body: { commands: commands.value }
        });
        if (response.success) {
          saveStatus.value = "saved";
          setTimeout(() => {
            if (saveStatus.value === "saved") {
              saveStatus.value = "idle";
            }
          }, 2e3);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error("保存所有命令失败:", error);
        saveStatus.value = "error";
        setTimeout(() => {
          saveStatus.value = "idle";
        }, 3e3);
      }
    };
    const addNewCommand = () => {
      const newCommand = {
        id: Date.now(),
        name: "",
        description: "",
        response: "",
        status: "active",
        usageCount: 0,
        lastUsed: /* @__PURE__ */ new Date(),
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      commands.value.unshift(newCommand);
    };
    const toggleCommandStatus = (command) => {
      command.status = command.status === "active" ? "inactive" : "active";
      command.updatedAt = /* @__PURE__ */ new Date();
      onCommandChange(command);
    };
    const deleteCommand = (index) => {
      const command = commands.value[index];
      if (saveTimeouts.has(command.id)) {
        clearTimeout(saveTimeouts.get(command.id));
        saveTimeouts.delete(command.id);
      }
      commands.value.splice(index, 1);
      saveAllCommands();
    };
    const refreshCommands = () => {
      console.log("刷新命令列表");
    };
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = __nuxt_component_3;
      const _component_UIcon = __nuxt_component_0;
      const _component_UButton = __nuxt_component_2;
      const _component_UInput = __nuxt_component_2$1;
      const _component_UTextarea = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white">机器人命令管理</h1><p class="text-[#9ca3af] mt-1">配置和管理机器人的命令响应</p></div><div class="flex items-center gap-3">`);
      if (unref(saveStatus) === "saving") {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "yellow",
          variant: "subtle"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-3 h-3 animate-spin mr-1"
              }, null, _parent2, _scopeId));
              _push2(` 保存中... `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-3 h-3 animate-spin mr-1"
                }),
                createTextVNode(" 保存中... ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(saveStatus) === "saved") {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "green",
          variant: "subtle"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check",
                class: "w-3 h-3 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` 已保存 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check",
                  class: "w-3 h-3 mr-1"
                }),
                createTextVNode(" 已保存 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(saveStatus) === "error") {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "red",
          variant: "subtle"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-exclamation-triangle",
                class: "w-3 h-3 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` 保存失败 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-exclamation-triangle",
                  class: "w-3 h-3 mr-1"
                }),
                createTextVNode(" 保存失败 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UButton, {
        onClick: refreshCommands,
        variant: "outline",
        size: "sm"
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
        onClick: addNewCommand,
        color: "primary",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 添加命令 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 添加命令 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">总命令数</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(commands).length)}</p></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-command-line",
        class: "w-8 h-8 text-[#00dc82]"
      }, null, _parent));
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">活跃命令</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(activeCommandsCount))}</p></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-play",
        class: "w-8 h-8 text-green-500"
      }, null, _parent));
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">今日使用</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(totalUsageToday))}</p></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chart-bar",
        class: "w-8 h-8 text-blue-500"
      }, null, _parent));
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">错误率</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(errorRate))}%</p></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-exclamation-triangle",
        class: "w-8 h-8 text-red-500"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="p-4 border-b border-[#2a2a2b]"><h2 class="text-lg font-semibold text-white">命令配置</h2><p class="text-sm text-[#9ca3af] mt-1">直接编辑命令信息，修改后将自动保存</p></div><div class="p-4 space-y-4"><!--[-->`);
      ssrRenderList(unref(commands), (command, index) => {
        _push(`<div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4 space-y-4"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><code class="px-2 py-1 bg-[#1a1a1b] rounded text-[#00dc82] text-sm font-mono"> /${ssrInterpolate(command.name)}</code>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: command.status === "active" ? "green" : "red",
          variant: "subtle",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(command.status === "active" ? "活跃" : "禁用")}`);
            } else {
              return [
                createTextVNode(toDisplayString(command.status === "active" ? "活跃" : "禁用"), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          color: command.status === "active" ? "red" : "green",
          onClick: ($event) => toggleCommandStatus(command)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: command.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(command.status === "active" ? "禁用" : "启用")}`);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: command.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
                  class: "w-4 h-4"
                }, null, 8, ["name"]),
                createTextVNode(" " + toDisplayString(command.status === "active" ? "禁用" : "启用"), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          color: "red",
          onClick: ($event) => deleteCommand(index)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-trash",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` 删除 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-4 h-4"
                }),
                createTextVNode(" 删除 ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">命令名称</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: command.name,
          "onUpdate:modelValue": ($event) => command.name = $event,
          placeholder: "例如: start, help, info",
          onInput: ($event) => onCommandChange(command),
          class: "w-full"
        }, null, _parent));
        _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">命令描述</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: command.description,
          "onUpdate:modelValue": ($event) => command.description = $event,
          placeholder: "描述这个命令的功能...",
          onInput: ($event) => onCommandChange(command),
          class: "w-full"
        }, null, _parent));
        _push(`</div></div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">回复内容</label>`);
        _push(ssrRenderComponent(_component_UTextarea, {
          modelValue: command.response,
          "onUpdate:modelValue": ($event) => command.response = $event,
          placeholder: "用户使用此命令时的回复内容...",
          onInput: ($event) => onCommandChange(command),
          rows: 4,
          class: "w-full"
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[#2a2a2b]"><div><p class="text-xs text-[#9ca3af]">使用次数</p><p class="text-sm font-medium text-white">${ssrInterpolate(command.usageCount)}</p></div><div><p class="text-xs text-[#9ca3af]">最后使用</p><p class="text-sm font-medium text-white">${ssrInterpolate(formatDate(command.lastUsed))}</p></div><div><p class="text-xs text-[#9ca3af]">创建时间</p><p class="text-sm font-medium text-white">${ssrInterpolate(formatDate(command.createdAt))}</p></div><div><p class="text-xs text-[#9ca3af]">更新时间</p><p class="text-sm font-medium text-white">${ssrInterpolate(formatDate(command.updatedAt))}</p></div></div></div>`);
      });
      _push(`<!--]-->`);
      if (unref(commands).length === 0) {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-command-line",
          class: "w-12 h-12 text-[#4a4a4b] mx-auto mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-white mb-2">暂无命令配置</h3><p class="text-[#9ca3af] mb-4">开始添加您的第一个机器人命令</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          onClick: addNewCommand,
          color: "primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` 添加命令 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-plus",
                  class: "w-4 h-4 mr-2"
                }),
                createTextVNode(" 添加命令 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bot-commands/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-OnGh5WE0.js.map
