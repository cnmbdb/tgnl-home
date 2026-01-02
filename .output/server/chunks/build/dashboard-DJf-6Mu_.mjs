import __nuxt_component_0 from './Icon-ZhGvf9gZ.mjs';
import __nuxt_component_2 from './Button-D_TCUDyh.mjs';
import __nuxt_component_3 from './Badge-BZslOKNb.mjs';
import { ref, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
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

const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const systemStatus = ref({
      status: "\u6B63\u5E38\u8FD0\u884C",
      activeUsers: 1247,
      todayTransactions: 156,
      totalEnergyRented: 125e6
    });
    const telegramService = ref({
      status: "online",
      activeUsers: 1247,
      energyTransactions: 156,
      lastUpdate: "\u521A\u521A"
    });
    const apiService = ref({
      status: "normal",
      requestsCount: 12847,
      uptime: 99.9,
      responseTime: 45
    });
    const database = ref({
      status: "connected",
      totalUsers: 5432,
      totalMessages: 98765,
      dbSize: "2.3GB",
      connections: 12
    });
    const botProcesses = ref([]);
    const processCount = ref(0);
    const recentActivities = ref([
      {
        id: 1,
        icon: "i-heroicons-bolt",
        message: "\u7528\u6237\u5B8C\u6210\u80FD\u91CF\u51FA\u79DF\u4EA4\u6613",
        time: "2\u5206\u949F\u524D",
        type: "success",
        status: "\u6210\u529F"
      },
      {
        id: 2,
        icon: "i-heroicons-user-plus",
        message: "\u65B0\u7528\u6237\u5F00\u59CB\u4F7F\u7528\u80FD\u91CF\u51FA\u79DF\u670D\u52A1",
        time: "5\u5206\u949F\u524D",
        type: "success",
        status: "\u6210\u529F"
      },
      {
        id: 3,
        icon: "i-heroicons-currency-dollar",
        message: "\u5927\u989D\u80FD\u91CF\u4EA4\u6613\u5B8C\u6210",
        time: "10\u5206\u949F\u524D",
        type: "success",
        status: "\u5B8C\u6210"
      },
      {
        id: 4,
        icon: "i-heroicons-arrow-path",
        message: "\u673A\u5668\u4EBA\u81EA\u52A8\u5904\u7406\u80FD\u91CF\u5206\u914D",
        time: "15\u5206\u949F\u524D",
        type: "info",
        status: "\u5904\u7406\u4E2D"
      }
    ]);
    const fetchBotStatus = async () => {
      try {
        const response = await $fetch("/api/bot-status");
        if (response.success) {
          botProcesses.value = response.data.processes;
          processCount.value = response.data.processCount || response.data.processes.length;
        }
      } catch (error) {
        console.error("\u83B7\u53D6\u673A\u5668\u4EBA\u72B6\u6001\u5931\u8D25:", error);
        botProcesses.value = [];
        processCount.value = 0;
      }
    };
    const refreshBotStatus = async () => {
      await fetchBotStatus();
    };
    const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    };
    const formatEnergy = (energy) => {
      if (energy >= 1e8) {
        return (energy / 1e8).toFixed(1) + "\u4EBF";
      } else if (energy >= 1e4) {
        return (energy / 1e4).toFixed(1) + "\u4E07";
      } else {
        return energy.toString();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_0;
      const _component_UButton = __nuxt_component_2;
      const _component_UBadge = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> \u80FD\u91CF\u51FA\u79DF\u7BA1\u7406\u7CFB\u7EDF </h1><p class="mt-1 text-sm text-[#9ca3af]">\u76D1\u63A7\u80FD\u91CF\u51FA\u79DF\u673A\u5668\u4EBA\u72B6\u6001\u548C\u4EA4\u6613\u6570\u636E</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` \u5237\u65B0\u6570\u636E `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u5237\u65B0\u6570\u636E ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "sm",
        class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-cog-6-tooth",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` \u7CFB\u7EDF\u8BBE\u7F6E `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-cog-6-tooth",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u7CFB\u7EDF\u8BBE\u7F6E ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-5 h-5 text-green-400"
      }, null, _parent));
      _push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">\u673A\u5668\u4EBA\u72B6\u6001</p><p class="text-xl font-semibold text-green-400">${ssrInterpolate(unref(systemStatus).status)}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-users",
        class: "w-5 h-5 text-blue-400"
      }, null, _parent));
      _push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">\u6D3B\u8DC3\u7528\u6237</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(systemStatus).activeUsers)}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-currency-dollar",
        class: "w-5 h-5 text-purple-400"
      }, null, _parent));
      _push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">\u4ECA\u65E5\u4EA4\u6613</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(systemStatus).todayTransactions)}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-5 h-5 text-yellow-400"
      }, null, _parent));
      _push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">\u603B\u80FD\u91CF\u51FA\u79DF</p><p class="text-xl font-semibold text-white">${ssrInterpolate(formatEnergy(unref(systemStatus).totalEnergyRented))}</p></div></div></div></div><div class="grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b] flex items-center justify-between"><h3 class="text-lg font-medium text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-simple-icons-telegram",
        class: "w-5 h-5 text-blue-400"
      }, null, _parent));
      _push(` \u80FD\u91CF\u51FA\u79DF\u673A\u5668\u4EBA </h3>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(telegramService).status === "online" ? "green" : "red",
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(telegramService).status === "online" ? "\u5728\u7EBF" : "\u79BB\u7EBF")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(telegramService).status === "online" ? "\u5728\u7EBF" : "\u79BB\u7EBF"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="p-4 space-y-4"><div class="grid grid-cols-2 gap-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(telegramService).activeUsers)}</p><p class="text-xs text-[#9ca3af]">\u6D3B\u8DC3\u7528\u6237</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(telegramService).energyTransactions)}</p><p class="text-xs text-[#9ca3af]">\u80FD\u91CF\u4EA4\u6613</p></div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-4"><div class="flex items-center justify-between mb-3"><h4 class="text-sm font-medium text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cpu-chip",
        class: "w-4 h-4 text-blue-400"
      }, null, _parent));
      _push(` \u673A\u5668\u4EBA\u8FDB\u7A0B\u72B6\u6001 `);
      if (unref(processCount) !== void 0) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: unref(processCount) > 0 ? "green" : "red",
          variant: "subtle",
          size: "xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(processCount))} \u4E2A\u8FDB\u7A0B `);
            } else {
              return [
                createTextVNode(toDisplayString(unref(processCount)) + " \u4E2A\u8FDB\u7A0B ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</h4>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        size: "xs",
        onClick: refreshBotStatus
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-3 h-3"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-3 h-3"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(botProcesses).length > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(botProcesses), (process) => {
          _push(`<div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-md p-3"><div class="flex items-center justify-between mb-2"><div class="flex items-center space-x-2"><div class="w-2 h-2 bg-green-400 rounded-full"></div><span class="text-sm font-medium text-white">${ssrInterpolate(process.name)}</span></div>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: "green",
            variant: "subtle",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u8FD0\u884C\u4E2D`);
              } else {
                return [
                  createTextVNode("\u8FD0\u884C\u4E2D")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="grid grid-cols-2 gap-3 text-xs"><div><span class="text-[#9ca3af]">\u8FDB\u7A0BID:</span><span class="text-white ml-1">${ssrInterpolate(process.pid)}</span></div><div><span class="text-[#9ca3af]">\u8FD0\u884C\u65F6\u95F4:</span><span class="text-white ml-1">${ssrInterpolate(process.uptime)}</span></div><div><span class="text-[#9ca3af]">CPU:</span><span class="text-white ml-1">${ssrInterpolate(process.cpuUsage)}%</span></div><div><span class="text-[#9ca3af]">\u5185\u5B58:</span><span class="text-white ml-1">${ssrInterpolate(process.memUsage)}%</span></div></div><div class="mt-2 text-xs"><span class="text-[#9ca3af]">\u542F\u52A8\u65F6\u95F4:</span><span class="text-white ml-1">${ssrInterpolate(formatDateTime(process.startedAt))}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-8 h-8 text-yellow-400 mx-auto mb-2"
        }, null, _parent));
        _push(`<p class="text-sm text-[#9ca3af]">\u672A\u68C0\u6D4B\u5230\u673A\u5668\u4EBA\u8FDB\u7A0B</p></div>`);
      }
      _push(`</div><div class="flex items-center justify-between p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-md"><div class="flex items-center space-x-3"><div class="relative"><div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div><div class="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div></div><span class="text-white font-medium">\u5DF2\u8FDE\u63A5</span></div><span class="text-sm text-[#9ca3af]">\u6700\u540E\u66F4\u65B0: ${ssrInterpolate(unref(telegramService).lastUpdate)}</span></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b] flex items-center justify-between"><h3 class="text-lg font-medium text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-server",
        class: "w-5 h-5 text-green-400"
      }, null, _parent));
      _push(` API \u670D\u52A1 </h3>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(apiService).status === "normal" ? "green" : "red",
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(apiService).status === "normal" ? "\u6B63\u5E38" : "\u5F02\u5E38")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(apiService).status === "normal" ? "\u6B63\u5E38" : "\u5F02\u5E38"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="p-4 space-y-4"><div class="grid grid-cols-2 gap-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(apiService).requestsCount)}</p><p class="text-xs text-[#9ca3af]">\u4ECA\u65E5\u8BF7\u6C42</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(apiService).uptime)}%</p><p class="text-xs text-[#9ca3af]">\u53EF\u7528\u6027</p></div></div><div class="flex items-center justify-between p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-md"><div class="flex items-center space-x-3"><div class="relative"><div class="w-3 h-3 bg-green-400 rounded-full"></div></div><span class="text-white font-medium">\u670D\u52A1\u6B63\u5E38</span></div><span class="text-sm text-[#9ca3af]">\u54CD\u5E94\u65F6\u95F4: ${ssrInterpolate(unref(apiService).responseTime)}ms</span></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b] flex items-center justify-between"><h3 class="text-lg font-medium text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-circle-stack",
        class: "w-5 h-5 text-blue-400"
      }, null, _parent));
      _push(` \u6570\u636E\u5E93\u72B6\u6001 </h3>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(database).status === "connected" ? "green" : "red",
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(database).status === "connected" ? "\u5DF2\u8FDE\u63A5" : "\u8FDE\u63A5\u5931\u8D25")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(database).status === "connected" ? "\u5DF2\u8FDE\u63A5" : "\u8FDE\u63A5\u5931\u8D25"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="p-4"><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(unref(database).totalUsers)}</p><p class="text-xs text-[#9ca3af]">\u603B\u7528\u6237\u6570</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(unref(database).totalMessages)}</p><p class="text-xs text-[#9ca3af]">\u603B\u6D88\u606F\u6570</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(unref(database).dbSize)}</p><p class="text-xs text-[#9ca3af]">\u6570\u636E\u5E93\u5927\u5C0F</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(unref(database).connections)}</p><p class="text-xs text-[#9ca3af]">\u6D3B\u8DC3\u8FDE\u63A5</p></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b]"><h3 class="text-lg font-medium text-white">\u5FEB\u901F\u64CD\u4F5C</h3></div><div class="p-4"><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-4 hover:bg-[#2a2a2b]/50 transition-colors cursor-pointer"><div class="text-center"><div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-path",
        class: "w-6 h-6 text-blue-400"
      }, null, _parent));
      _push(`</div><h4 class="text-sm font-medium text-white mb-1">\u5237\u65B0\u72B6\u6001</h4><p class="text-xs text-[#9ca3af]">\u66F4\u65B0\u6240\u6709\u670D\u52A1\u72B6\u6001</p></div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-4 hover:bg-[#2a2a2b]/50 transition-colors cursor-pointer"><div class="text-center"><div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-document-text",
        class: "w-6 h-6 text-green-400"
      }, null, _parent));
      _push(`</div><h4 class="text-sm font-medium text-white mb-1">\u67E5\u770B\u65E5\u5FD7</h4><p class="text-xs text-[#9ca3af]">\u7CFB\u7EDF\u8FD0\u884C\u65E5\u5FD7</p></div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-4 hover:bg-[#2a2a2b]/50 transition-colors cursor-pointer"><div class="text-center"><div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cog-6-tooth",
        class: "w-6 h-6 text-purple-400"
      }, null, _parent));
      _push(`</div><h4 class="text-sm font-medium text-white mb-1">\u7CFB\u7EDF\u8BBE\u7F6E</h4><p class="text-xs text-[#9ca3af]">\u914D\u7F6E\u7CFB\u7EDF\u53C2\u6570</p></div></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b]"><h3 class="text-lg font-medium text-white">\u6700\u8FD1\u6D3B\u52A8</h3></div><div class="p-4"><div class="space-y-3"><!--[-->`);
      ssrRenderList(unref(recentActivities), (activity) => {
        _push(`<div class="flex items-center space-x-3 p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-md"><div class="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: activity.icon,
          class: "w-4 h-4 text-blue-400"
        }, null, _parent));
        _push(`</div><div class="flex-1"><p class="text-sm text-white">${ssrInterpolate(activity.message)}</p><p class="text-xs text-[#9ca3af]">${ssrInterpolate(activity.time)}</p></div>`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: activity.type === "success" ? "green" : activity.type === "warning" ? "yellow" : "red",
          variant: "subtle",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(activity.status)}`);
            } else {
              return [
                createTextVNode(toDisplayString(activity.status), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-DJf-6Mu_.mjs.map
