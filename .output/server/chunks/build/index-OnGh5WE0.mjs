import __nuxt_component_3 from './Badge-BZslOKNb.mjs';
import __nuxt_component_0 from './Icon-ZhGvf9gZ.mjs';
import __nuxt_component_2 from './Button-D_TCUDyh.mjs';
import __nuxt_component_2$1 from './Input-B1mh7BSF.mjs';
import __nuxt_component_4 from './Textarea-C6iW-dfr.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import 'tailwind-merge';
import './tooltip-BtqstB0H.mjs';
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
import '@iconify/vue';
import './useButtonGroup-6uzJtOJv.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './index-C6m-0LTF.mjs';
import '@iconify/utils/lib/css/icon';
import './Link-CS5wywLd.mjs';
import './nuxt-link-C6IP2oPu.mjs';
import './link-Bz3Wc5MF.mjs';
import './button-Bz5rwL6o.mjs';
import './useFormGroup-B3564yef.mjs';

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
        description: "\u5F00\u59CB\u4F7F\u7528\u673A\u5668\u4EBA",
        response: "\u6B22\u8FCE\u4F7F\u7528USDT\u8F6CTRX\uFF0CTRX\u8F6C\u80FD\u91CF\u673A\u5668\u4EBA\n\n\u{1F53A}\u8FDBU\u5373\u5151TRX,\u8FDBTRX\u5373\u5151\u80FD\u91CF,\n24\u5C0F\u65F6\u5168\u81EA\u52A8\u8FD4,1U\u8D77\u5151\n\u2757\uFE0F\u6CE8\u610F:\u8BF7\u52FF\u4F7F\u7528\u4EA4\u6613\u6240\u8F6C\u8D26,\u4E22\u5931\u81EA\u8D1F!!\n\n\u203C\uFE0F\u6709\u4EFB\u4F55\u95EE\u9898,\u8BF7\u79C1\u804A\u8054\u7CFB\u8001\u677F",
        status: "active",
        usageCount: 2847,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T10:30:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T10:30:00")
      },
      {
        id: 2,
        name: "send",
        description: "\u53D1\u9001\u9891\u9053\u6D88\u606F",
        response: "\u{1F4E2} \u9891\u9053\u6D88\u606F\u53D1\u9001\u529F\u80FD\n\n\u7BA1\u7406\u5458\u4E13\u7528\u547D\u4EE4\uFF0C\u7528\u4E8E\u5411\u6240\u6709\u76D1\u542C\u7684\u9891\u9053\u53D1\u9001\u6D88\u606F\u3002\n\n\u4F7F\u7528\u65B9\u6CD5\uFF1A/send [\u6D88\u606F\u5185\u5BB9]",
        status: "active",
        usageCount: 156,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T09:15:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T09:15:00")
      },
      {
        id: 3,
        name: "power",
        description: "\u80FD\u91CF\u76F8\u5173\u529F\u80FD",
        response: "\u26A1\uFE0F TRX\u8F6C\u80FD\u91CF\u670D\u52A1\n\n\u2022 1\u5C0F\u65F6\u80FD\u91CF\uFF1A3.0 TRX\n\u2022 1\u5929\u80FD\u91CF\uFF1A9.0 TRX\n\u2022 3\u5929\u80FD\u91CF\uFF1A7.0 TRX\n\u2022 \u9884\u5B58\u6263\u8D39\uFF1A10.0 TRX\n\n\u{1F50B} 24\u5C0F\u65F6\u81EA\u52A8\u5904\u7406\uFF0C\u5B89\u5168\u53EF\u9760",
        status: "active",
        usageCount: 1432,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T08:45:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T08:45:00")
      },
      {
        id: 4,
        name: "okx",
        description: "\u67E5\u8BE2\u6C47\u7387\u4FE1\u606F",
        response: "\u{1F4B1} \u5B9E\u65F6\u6C47\u7387\u67E5\u8BE2\n\n\u5F53\u524DUSDT/TRX\u6C47\u7387\u4FE1\u606F\uFF1A\n\u2022 \u4E70\u5165\u6C47\u7387\uFF1A11.5\n\u2022 \u5356\u51FA\u6C47\u7387\uFF1A\u6839\u636E\u5E02\u573A\u6CE2\u52A8\n\u2022 \u6298\u6263\u7387\uFF1A90%\n\n\u6C47\u7387\u5B9E\u65F6\u66F4\u65B0\uFF0C\u8BF7\u4EE5\u5B9E\u9645\u4EA4\u6613\u4E3A\u51C6",
        status: "active",
        usageCount: 892,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T07:20:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T07:20:00")
      },
      {
        id: 5,
        name: "reload",
        description: "\u91CD\u65B0\u52A0\u8F7D\u914D\u7F6E",
        response: "\u{1F504} \u914D\u7F6E\u91CD\u8F7D\n\n\u7BA1\u7406\u5458\u4E13\u7528\u547D\u4EE4\uFF0C\u7528\u4E8E\u91CD\u65B0\u52A0\u8F7D\u673A\u5668\u4EBA\u914D\u7F6E\u6587\u4EF6\u3002\n\n\u914D\u7F6E\u5DF2\u6210\u529F\u91CD\u8F7D\uFF01",
        status: "active",
        usageCount: 45,
        lastUsed: /* @__PURE__ */ new Date("2024-01-14T16:45:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-14T16:45:00")
      },
      {
        id: 6,
        name: "balance",
        description: "\u67E5\u8BE2\u8D26\u6237\u4F59\u989D",
        response: "\u{1F4B0} \u8D26\u6237\u4F59\u989D\u67E5\u8BE2\n\n\u60A8\u7684\u5F53\u524D\u4F59\u989D\u4FE1\u606F\uFF1A\n\u2022 USDT\u4F59\u989D\uFF1A\u67E5\u8BE2\u4E2D...\n\u2022 TRX\u4F59\u989D\uFF1A\u67E5\u8BE2\u4E2D...\n\u2022 \u80FD\u91CF\u4F59\u989D\uFF1A\u67E5\u8BE2\u4E2D...\n\n\u8BF7\u7A0D\u5019\uFF0C\u6B63\u5728\u83B7\u53D6\u6700\u65B0\u6570\u636E",
        status: "active",
        usageCount: 1256,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T06:30:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T06:30:00")
      },
      {
        id: 7,
        name: "monitor",
        description: "\u5730\u5740\u76D1\u542C\u7BA1\u7406",
        response: "\u{1F441}\uFE0F \u5730\u5740\u76D1\u542C\u529F\u80FD\n\n\u2022 \u6DFB\u52A0\u76D1\u542C\u5730\u5740\n\u2022 \u67E5\u770B\u5DF2\u76D1\u542C\u5730\u5740\n\u2022 \u5220\u9664\u76D1\u542C\u5730\u5740\n\u2022 \u76D1\u542C\u72B6\u6001\u7BA1\u7406\n\n\u8BF7\u9009\u62E9\u60A8\u9700\u8981\u7684\u64CD\u4F5C",
        status: "active",
        usageCount: 678,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T05:15:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T05:15:00")
      },
      {
        id: 8,
        name: "transaction",
        description: "\u67E5\u8BE2\u4EA4\u6613\u8BB0\u5F55",
        response: "\u{1F4CA} \u4EA4\u6613\u8BB0\u5F55\u67E5\u8BE2\n\n\u2022 \u6700\u8FD1\u4EA4\u6613\u8BB0\u5F55\n\u2022 \u4EA4\u6613\u72B6\u6001\u67E5\u8BE2\n\u2022 \u4EA4\u6613\u8BE6\u60C5\u67E5\u770B\n\u2022 \u4EA4\u6613\u7EDF\u8BA1\u4FE1\u606F\n\n\u8BF7\u9009\u62E9\u67E5\u8BE2\u7C7B\u578B",
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
        console.error("\u4FDD\u5B58\u547D\u4EE4\u5931\u8D25:", error);
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
        console.error("\u4FDD\u5B58\u6240\u6709\u547D\u4EE4\u5931\u8D25:", error);
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
      console.log("\u5237\u65B0\u547D\u4EE4\u5217\u8868");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white">\u673A\u5668\u4EBA\u547D\u4EE4\u7BA1\u7406</h1><p class="text-[#9ca3af] mt-1">\u914D\u7F6E\u548C\u7BA1\u7406\u673A\u5668\u4EBA\u7684\u547D\u4EE4\u54CD\u5E94</p></div><div class="flex items-center gap-3">`);
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
              _push2(` \u4FDD\u5B58\u4E2D... `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-3 h-3 animate-spin mr-1"
                }),
                createTextVNode(" \u4FDD\u5B58\u4E2D... ")
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
              _push2(` \u5DF2\u4FDD\u5B58 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check",
                  class: "w-3 h-3 mr-1"
                }),
                createTextVNode(" \u5DF2\u4FDD\u5B58 ")
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
              _push2(` \u4FDD\u5B58\u5931\u8D25 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-exclamation-triangle",
                  class: "w-3 h-3 mr-1"
                }),
                createTextVNode(" \u4FDD\u5B58\u5931\u8D25 ")
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
            _push2(` \u6DFB\u52A0\u547D\u4EE4 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u6DFB\u52A0\u547D\u4EE4 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u603B\u547D\u4EE4\u6570</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(commands).length)}</p></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-command-line",
        class: "w-8 h-8 text-[#00dc82]"
      }, null, _parent));
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u6D3B\u8DC3\u547D\u4EE4</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(activeCommandsCount))}</p></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-play",
        class: "w-8 h-8 text-green-500"
      }, null, _parent));
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u4ECA\u65E5\u4F7F\u7528</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(totalUsageToday))}</p></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chart-bar",
        class: "w-8 h-8 text-blue-500"
      }, null, _parent));
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u9519\u8BEF\u7387</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(errorRate))}%</p></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-exclamation-triangle",
        class: "w-8 h-8 text-red-500"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="p-4 border-b border-[#2a2a2b]"><h2 class="text-lg font-semibold text-white">\u547D\u4EE4\u914D\u7F6E</h2><p class="text-sm text-[#9ca3af] mt-1">\u76F4\u63A5\u7F16\u8F91\u547D\u4EE4\u4FE1\u606F\uFF0C\u4FEE\u6539\u540E\u5C06\u81EA\u52A8\u4FDD\u5B58</p></div><div class="p-4 space-y-4"><!--[-->`);
      ssrRenderList(unref(commands), (command, index) => {
        _push(`<div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4 space-y-4"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><code class="px-2 py-1 bg-[#1a1a1b] rounded text-[#00dc82] text-sm font-mono"> /${ssrInterpolate(command.name)}</code>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: command.status === "active" ? "green" : "red",
          variant: "subtle",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(command.status === "active" ? "\u6D3B\u8DC3" : "\u7981\u7528")}`);
            } else {
              return [
                createTextVNode(toDisplayString(command.status === "active" ? "\u6D3B\u8DC3" : "\u7981\u7528"), 1)
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
              _push2(` ${ssrInterpolate(command.status === "active" ? "\u7981\u7528" : "\u542F\u7528")}`);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: command.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
                  class: "w-4 h-4"
                }, null, 8, ["name"]),
                createTextVNode(" " + toDisplayString(command.status === "active" ? "\u7981\u7528" : "\u542F\u7528"), 1)
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
              _push2(` \u5220\u9664 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-4 h-4"
                }),
                createTextVNode(" \u5220\u9664 ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u547D\u4EE4\u540D\u79F0</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: command.name,
          "onUpdate:modelValue": ($event) => command.name = $event,
          placeholder: "\u4F8B\u5982: start, help, info",
          onInput: ($event) => onCommandChange(command),
          class: "w-full"
        }, null, _parent));
        _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u547D\u4EE4\u63CF\u8FF0</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: command.description,
          "onUpdate:modelValue": ($event) => command.description = $event,
          placeholder: "\u63CF\u8FF0\u8FD9\u4E2A\u547D\u4EE4\u7684\u529F\u80FD...",
          onInput: ($event) => onCommandChange(command),
          class: "w-full"
        }, null, _parent));
        _push(`</div></div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u56DE\u590D\u5185\u5BB9</label>`);
        _push(ssrRenderComponent(_component_UTextarea, {
          modelValue: command.response,
          "onUpdate:modelValue": ($event) => command.response = $event,
          placeholder: "\u7528\u6237\u4F7F\u7528\u6B64\u547D\u4EE4\u65F6\u7684\u56DE\u590D\u5185\u5BB9...",
          onInput: ($event) => onCommandChange(command),
          rows: 4,
          class: "w-full"
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[#2a2a2b]"><div><p class="text-xs text-[#9ca3af]">\u4F7F\u7528\u6B21\u6570</p><p class="text-sm font-medium text-white">${ssrInterpolate(command.usageCount)}</p></div><div><p class="text-xs text-[#9ca3af]">\u6700\u540E\u4F7F\u7528</p><p class="text-sm font-medium text-white">${ssrInterpolate(formatDate(command.lastUsed))}</p></div><div><p class="text-xs text-[#9ca3af]">\u521B\u5EFA\u65F6\u95F4</p><p class="text-sm font-medium text-white">${ssrInterpolate(formatDate(command.createdAt))}</p></div><div><p class="text-xs text-[#9ca3af]">\u66F4\u65B0\u65F6\u95F4</p><p class="text-sm font-medium text-white">${ssrInterpolate(formatDate(command.updatedAt))}</p></div></div></div>`);
      });
      _push(`<!--]-->`);
      if (unref(commands).length === 0) {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-command-line",
          class: "w-12 h-12 text-[#4a4a4b] mx-auto mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-white mb-2">\u6682\u65E0\u547D\u4EE4\u914D\u7F6E</h3><p class="text-[#9ca3af] mb-4">\u5F00\u59CB\u6DFB\u52A0\u60A8\u7684\u7B2C\u4E00\u4E2A\u673A\u5668\u4EBA\u547D\u4EE4</p>`);
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
              _push2(` \u6DFB\u52A0\u547D\u4EE4 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-plus",
                  class: "w-4 h-4 mr-2"
                }),
                createTextVNode(" \u6DFB\u52A0\u547D\u4EE4 ")
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

export { _sfc_main as default };
//# sourceMappingURL=index-OnGh5WE0.mjs.map
