import Icon_default from './Icon-BQxbVddL.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import Badge_default from './Badge-Bb9IcqQP.mjs';
import Input_default from './Input-CbhZIhGI.mjs';
import Textarea_default from './Textarea-ClW9ULmm.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
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
        response: "\u6B22\u8FCE\u4F7F\u7528\u6211\u4EEC\u7684\u673A\u5668\u4EBA\uFF01\u{1F916}\n\n\u8BF7\u9009\u62E9\u60A8\u9700\u8981\u7684\u529F\u80FD\uFF1A\n\u2022 /help - \u67E5\u770B\u5E2E\u52A9\u4FE1\u606F\n\u2022 /buy - \u5F00\u901A\u4F1A\u5458\n\u2022 /info - \u67E5\u770B\u673A\u5668\u4EBA\u4FE1\u606F",
        status: "active",
        usageCount: 1234,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T10:30:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T10:30:00")
      },
      {
        id: 2,
        name: "help",
        description: "\u663E\u793A\u5E2E\u52A9\u4FE1\u606F",
        response: "\u{1F4CB} \u5E2E\u52A9\u4FE1\u606F\n\n\u53EF\u7528\u547D\u4EE4\uFF1A\n\u2022 /start - \u5F00\u59CB\u4F7F\u7528\n\u2022 /buy - \u5F00\u901A\u4F1A\u5458\n\u2022 /info - \u673A\u5668\u4EBA\u4FE1\u606F\n\u2022 /settings - \u4E2A\u4EBA\u8BBE\u7F6E\n\n\u5982\u9700\u66F4\u591A\u5E2E\u52A9\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D\u3002",
        status: "active",
        usageCount: 856,
        lastUsed: /* @__PURE__ */ new Date("2024-01-15T09:15:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-15T09:15:00")
      },
      {
        id: 3,
        name: "buy",
        description: "\u5F00\u901A\u4F1A\u5458",
        response: "\u{1F48E} \u4F1A\u5458\u670D\u52A1\n\n\u6211\u4EEC\u63D0\u4F9B\u4EE5\u4E0B\u4F1A\u5458\u5957\u9910\uFF1A\n\u2022 VIP\u4F1A\u5458 - \xA599/\u6708\n\u2022 \u9AD8\u7EA7\u4F1A\u5458 - \xA5199/\u6708\n\u2022 \u81F3\u5C0A\u4F1A\u5458 - \xA5399/\u6708\n\n\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u9009\u62E9\u5957\u9910\uFF1A",
        status: "active",
        usageCount: 432,
        lastUsed: /* @__PURE__ */ new Date("2024-01-14T16:45:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-14T16:45:00")
      },
      {
        id: 4,
        name: "info",
        description: "\u663E\u793A\u673A\u5668\u4EBA\u4FE1\u606F",
        response: "\u2139\uFE0F \u673A\u5668\u4EBA\u4FE1\u606F\n\n\u7248\u672C\uFF1Av2.0.1\n\u8FD0\u884C\u65F6\u95F4\uFF1A24/7\n\u670D\u52A1\u7528\u6237\uFF1A10,000+\n\u54CD\u5E94\u901F\u5EA6\uFF1A<100ms\n\n\u611F\u8C22\u60A8\u7684\u4F7F\u7528\uFF01",
        status: "active",
        usageCount: 321,
        lastUsed: /* @__PURE__ */ new Date("2024-01-14T14:20:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-14T14:20:00")
      },
      {
        id: 5,
        name: "settings",
        description: "\u7528\u6237\u8BBE\u7F6E",
        response: "\u2699\uFE0F \u4E2A\u4EBA\u8BBE\u7F6E\n\n\u60A8\u53EF\u4EE5\u5728\u8FD9\u91CC\u914D\u7F6E\uFF1A\n\u2022 \u901A\u77E5\u8BBE\u7F6E\n\u2022 \u8BED\u8A00\u504F\u597D\n\u2022 \u9690\u79C1\u8BBE\u7F6E\n\u2022 \u8D26\u6237\u4FE1\u606F\n\n\u8BF7\u9009\u62E9\u8981\u4FEE\u6539\u7684\u8BBE\u7F6E\u9879\uFF1A",
        status: "inactive",
        usageCount: 123,
        lastUsed: /* @__PURE__ */ new Date("2024-01-13T14:20:00"),
        createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
        updatedAt: /* @__PURE__ */ new Date("2024-01-13T14:20:00")
      }
    ]);
    const activeCommandsCount = computed(() => commands.value.filter((cmd) => cmd.status === "active").length);
    const totalUsageToday = computed(() => commands.value.reduce((total, cmd) => total + cmd.usageCount, 0));
    const errorRate = computed(() => 2.1);
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
            if (saveStatus.value === "saved") saveStatus.value = "idle";
          }, 2e3);
        } else throw new Error(response.message);
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
            if (saveStatus.value === "saved") saveStatus.value = "idle";
          }, 2e3);
        } else throw new Error(response.message);
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
      const _component_UBadge = Badge_default;
      const _component_UIcon = Icon_default;
      const _component_UButton = Button_default;
      const _component_UInput = Input_default;
      const _component_UTextarea = Textarea_default;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white">\u673A\u5668\u4EBA\u547D\u4EE4\u7BA1\u7406</h1><p class="text-[#9ca3af] mt-1">\u914D\u7F6E\u548C\u7BA1\u7406\u673A\u5668\u4EBA\u7684\u547D\u4EE4\u54CD\u5E94</p></div><div class="flex items-center gap-3">`);
      if (unref(saveStatus) === "saving") _push(ssrRenderComponent(_component_UBadge, {
        color: "yellow",
        variant: "subtle"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-3 h-3 animate-spin mr-1"
            }, null, _parent$1, _scopeId));
            _push$1(` \u4FDD\u5B58\u4E2D... `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-path",
            class: "w-3 h-3 animate-spin mr-1"
          }), createTextVNode(" \u4FDD\u5B58\u4E2D... ")];
        }),
        _: 1
      }, _parent));
      else if (unref(saveStatus) === "saved") _push(ssrRenderComponent(_component_UBadge, {
        color: "green",
        variant: "subtle"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check",
              class: "w-3 h-3 mr-1"
            }, null, _parent$1, _scopeId));
            _push$1(` \u5DF2\u4FDD\u5B58 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-check",
            class: "w-3 h-3 mr-1"
          }), createTextVNode(" \u5DF2\u4FDD\u5B58 ")];
        }),
        _: 1
      }, _parent));
      else if (unref(saveStatus) === "error") _push(ssrRenderComponent(_component_UBadge, {
        color: "red",
        variant: "subtle"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-triangle",
              class: "w-3 h-3 mr-1"
            }, null, _parent$1, _scopeId));
            _push$1(` \u4FDD\u5B58\u5931\u8D25 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-exclamation-triangle",
            class: "w-3 h-3 mr-1"
          }), createTextVNode(" \u4FDD\u5B58\u5931\u8D25 ")];
        }),
        _: 1
      }, _parent));
      else _push(`<!---->`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: refreshCommands,
        variant: "outline",
        size: "sm"
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
        onClick: addNewCommand,
        color: "primary",
        size: "sm"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u6DFB\u52A0\u547D\u4EE4 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-plus",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u6DFB\u52A0\u547D\u4EE4 ")];
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
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) _push$1(`${ssrInterpolate(command.status === "active" ? "\u6D3B\u8DC3" : "\u7981\u7528")}`);
            else return [createTextVNode(toDisplayString(command.status === "active" ? "\u6D3B\u8DC3" : "\u7981\u7528"), 1)];
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
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) {
              _push$1(ssrRenderComponent(_component_UIcon, {
                name: command.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
                class: "w-4 h-4"
              }, null, _parent$1, _scopeId));
              _push$1(` ${ssrInterpolate(command.status === "active" ? "\u7981\u7528" : "\u542F\u7528")}`);
            } else return [createVNode(_component_UIcon, {
              name: command.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
              class: "w-4 h-4"
            }, null, 8, ["name"]), createTextVNode(" " + toDisplayString(command.status === "active" ? "\u7981\u7528" : "\u542F\u7528"), 1)];
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          color: "red",
          onClick: ($event) => deleteCommand(index)
        }, {
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) {
              _push$1(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-trash",
                class: "w-4 h-4"
              }, null, _parent$1, _scopeId));
              _push$1(` \u5220\u9664 `);
            } else return [createVNode(_component_UIcon, {
              name: "i-heroicons-trash",
              class: "w-4 h-4"
            }), createTextVNode(" \u5220\u9664 ")];
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
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) {
              _push$1(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }, null, _parent$1, _scopeId));
              _push$1(` \u6DFB\u52A0\u547D\u4EE4 `);
            } else return [createVNode(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-2"
            }), createTextVNode(" \u6DFB\u52A0\u547D\u4EE4 ")];
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else _push(`<!---->`);
      _push(`</div></div></div>`);
    };
  }
});
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bot-commands/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var bot_commands_default = index_vue_vue_type_script_setup_true_lang_default;

export { bot_commands_default as default };
//# sourceMappingURL=bot-commands-DzTujP91.mjs.map
