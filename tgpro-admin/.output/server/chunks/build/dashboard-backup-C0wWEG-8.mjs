import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import Badge_default from './Badge-Bb9IcqQP.mjs';
import Card_default from './Card-CV7B2HPk.mjs';
import { ref, mergeProps, withCtx, createVNode, createTextVNode, unref, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
import './ui-G7Oicn0a.mjs';
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';

var _sfc_main = {
  __name: "dashboard-backup",
  __ssrInlineRender: true,
  setup(__props) {
    const telegramLoading = ref(false);
    const apiLoading = ref(false);
    const telegramStatus = ref({
      connected: true,
      color: "green",
      text: "\u5728\u7EBF",
      lastUpdate: "\u521A\u521A"
    });
    const telegramStats = ref({
      activeUsers: 1247,
      messagesCount: 3856
    });
    const apiStatus = ref({
      connected: true,
      color: "green",
      text: "\u6B63\u5E38",
      responseTime: 45
    });
    const apiStats = ref({
      requestCount: 12847,
      uptime: 99.9
    });
    const refreshTelegramStatus = async () => {
      telegramLoading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        telegramStatus.value.lastUpdate = (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit"
        });
        const isConnected = Math.random() > 0.1;
        telegramStatus.value.connected = isConnected;
        telegramStatus.value.color = isConnected ? "green" : "red";
        telegramStatus.value.text = isConnected ? "\u5728\u7EBF" : "\u79BB\u7EBF";
        telegramStats.value.activeUsers = Math.floor(Math.random() * 2e3) + 1e3;
        telegramStats.value.messagesCount = Math.floor(Math.random() * 5e3) + 2e3;
      } catch (error) {
        console.error("\u5237\u65B0Telegram\u72B6\u6001\u5931\u8D25:", error);
      } finally {
        telegramLoading.value = false;
      }
    };
    const refreshApiStatus = async () => {
      apiLoading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const isConnected = Math.random() > 0.05;
        apiStatus.value.connected = isConnected;
        apiStatus.value.color = isConnected ? "green" : "red";
        apiStatus.value.text = isConnected ? "\u6B63\u5E38" : "\u5F02\u5E38";
        apiStatus.value.responseTime = Math.floor(Math.random() * 100) + 20;
        apiStats.value.requestCount = Math.floor(Math.random() * 2e4) + 1e4;
        apiStats.value.uptime = (Math.random() * 0.5 + 99.5).toFixed(1);
      } catch (error) {
        console.error("\u5237\u65B0API\u72B6\u6001\u5931\u8D25:", error);
      } finally {
        apiLoading.value = false;
      }
    };
    const viewTelegramLogs = () => {
      console.log("\u67E5\u770BTelegram\u65E5\u5FD7");
    };
    const viewApiMetrics = () => {
      console.log("\u67E5\u770BAPI\u6307\u6807");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = Badge_default;
      const _component_UIcon = Icon_default;
      const _component_UCard = Card_default;
      const _component_UButton = Button_default;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-black" }, _attrs))} data-v-7a8e9811><div class="bg-transparent border-b border-gray-700" data-v-7a8e9811><div class="px-6 py-4" data-v-7a8e9811><div class="flex items-center justify-between" data-v-7a8e9811><div data-v-7a8e9811><h1 class="text-2xl font-bold text-white" data-v-7a8e9811>\u4EEA\u8868\u677F</h1><p class="text-sm text-gray-400 mt-1" data-v-7a8e9811>\u76D1\u63A7\u60A8\u7684Telegram\u673A\u5668\u4EBA\u548CAPI\u670D\u52A1\u72B6\u6001</p></div><div class="flex items-center space-x-3" data-v-7a8e9811>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "green",
        variant: "soft",
        size: "lg"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-signal",
              class: "w-4 h-4 mr-1"
            }, null, _parent$1, _scopeId));
            _push$1(` \u7CFB\u7EDF\u8FD0\u884C\u4E2D `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-signal",
            class: "w-4 h-4 mr-1"
          }), createTextVNode(" \u7CFB\u7EDF\u8FD0\u884C\u4E2D ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="px-6 py-6" data-v-7a8e9811><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-v-7a8e9811>`);
      _push(ssrRenderComponent(_component_UCard, { class: "bg-gray-900/70 backdrop-blur-md border border-gray-700/40 shadow-lg hover:shadow-xl transition-all duration-200" }, {
        header: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="flex items-center justify-between" data-v-7a8e9811${_scopeId}><div class="flex items-center space-x-3" data-v-7a8e9811${_scopeId}><div class="p-2 bg-gray-800/50 rounded-lg" data-v-7a8e9811${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-simple-icons-telegram",
              class: "w-6 h-6 text-blue-400"
            }, null, _parent$1, _scopeId));
            _push$1(`</div><div data-v-7a8e9811${_scopeId}><h3 class="text-lg font-semibold text-white" data-v-7a8e9811${_scopeId}>Telegram\u673A\u5668\u4EBA</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId}>\u8FDE\u63A5\u72B6\u6001\u76D1\u63A7</p></div></div>`);
            _push$1(ssrRenderComponent(_component_UBadge, {
              color: unref(telegramStatus).color,
              variant: "soft"
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) _push$2(`${ssrInterpolate(unref(telegramStatus).text)}`);
                else return [createTextVNode(toDisplayString(unref(telegramStatus).text), 1)];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div>`);
          } else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("div", { class: "flex items-center space-x-3" }, [createVNode("div", { class: "p-2 bg-gray-800/50 rounded-lg" }, [createVNode(_component_UIcon, {
            name: "i-simple-icons-telegram",
            class: "w-6 h-6 text-blue-400"
          })]), createVNode("div", null, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "Telegram\u673A\u5668\u4EBA"), createVNode("p", { class: "text-sm text-gray-400" }, "\u8FDE\u63A5\u72B6\u6001\u76D1\u63A7")])]), createVNode(_component_UBadge, {
            color: unref(telegramStatus).color,
            variant: "soft"
          }, {
            default: withCtx(() => [createTextVNode(toDisplayString(unref(telegramStatus).text), 1)]),
            _: 1
          }, 8, ["color"])])];
        }),
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="space-y-4" data-v-7a8e9811${_scopeId}><div class="flex items-center justify-between p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="flex items-center space-x-3" data-v-7a8e9811${_scopeId}><div class="relative" data-v-7a8e9811${_scopeId}><div class="${ssrRenderClass(["w-3 h-3 rounded-full", unref(telegramStatus).connected ? "bg-green-500" : "bg-red-500"])}" data-v-7a8e9811${_scopeId}></div>`);
            if (unref(telegramStatus).connected) _push$1(`<div class="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" data-v-7a8e9811${_scopeId}></div>`);
            else _push$1(`<!---->`);
            _push$1(`</div><span class="text-sm font-medium text-gray-300" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(telegramStatus).connected ? "\u5DF2\u8FDE\u63A5" : "\u8FDE\u63A5\u65AD\u5F00")}</span></div><span class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}> \u6700\u540E\u66F4\u65B0: ${ssrInterpolate(unref(telegramStatus).lastUpdate)}</span></div><div class="grid grid-cols-2 gap-4" data-v-7a8e9811${_scopeId}><div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="text-2xl font-bold text-white" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(telegramStats).activeUsers)}</div><div class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}>\u6D3B\u8DC3\u7528\u6237</div></div><div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="text-2xl font-bold text-white" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(telegramStats).messagesCount)}</div><div class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}>\u4ECA\u65E5\u6D88\u606F</div></div></div><div class="flex space-x-2" data-v-7a8e9811${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UButton, {
              size: "sm",
              variant: "soft",
              color: "blue",
              onClick: refreshTelegramStatus,
              loading: unref(telegramLoading)
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) {
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent$2, _scopeId$1));
                  _push$2(` \u5237\u65B0\u72B6\u6001 `);
                } else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-4 h-4 mr-1"
                }), createTextVNode(" \u5237\u65B0\u72B6\u6001 ")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(ssrRenderComponent(_component_UButton, {
              size: "sm",
              variant: "outline",
              color: "gray",
              onClick: viewTelegramLogs
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) {
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-document-text",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent$2, _scopeId$1));
                  _push$2(` \u67E5\u770B\u65E5\u5FD7 `);
                } else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-document-text",
                  class: "w-4 h-4 mr-1"
                }), createTextVNode(" \u67E5\u770B\u65E5\u5FD7 ")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div></div>`);
          } else return [createVNode("div", { class: "space-y-4" }, [
            createVNode("div", { class: "flex items-center justify-between p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "flex items-center space-x-3" }, [createVNode("div", { class: "relative" }, [createVNode("div", { class: ["w-3 h-3 rounded-full", unref(telegramStatus).connected ? "bg-green-500" : "bg-red-500"] }, null, 2), unref(telegramStatus).connected ? (openBlock(), createBlock("div", {
              key: 0,
              class: "absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"
            })) : createCommentVNode("", true)]), createVNode("span", { class: "text-sm font-medium text-gray-300" }, toDisplayString(unref(telegramStatus).connected ? "\u5DF2\u8FDE\u63A5" : "\u8FDE\u63A5\u65AD\u5F00"), 1)]), createVNode("span", { class: "text-xs text-gray-400" }, " \u6700\u540E\u66F4\u65B0: " + toDisplayString(unref(telegramStatus).lastUpdate), 1)]),
            createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode("div", { class: "text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "text-2xl font-bold text-white" }, toDisplayString(unref(telegramStats).activeUsers), 1), createVNode("div", { class: "text-xs text-gray-400" }, "\u6D3B\u8DC3\u7528\u6237")]), createVNode("div", { class: "text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "text-2xl font-bold text-white" }, toDisplayString(unref(telegramStats).messagesCount), 1), createVNode("div", { class: "text-xs text-gray-400" }, "\u4ECA\u65E5\u6D88\u606F")])]),
            createVNode("div", { class: "flex space-x-2" }, [createVNode(_component_UButton, {
              size: "sm",
              variant: "soft",
              color: "blue",
              onClick: refreshTelegramStatus,
              loading: unref(telegramLoading)
            }, {
              default: withCtx(() => [createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-1"
              }), createTextVNode(" \u5237\u65B0\u72B6\u6001 ")]),
              _: 1
            }, 8, ["loading"]), createVNode(_component_UButton, {
              size: "sm",
              variant: "outline",
              color: "gray",
              onClick: viewTelegramLogs
            }, {
              default: withCtx(() => [createVNode(_component_UIcon, {
                name: "i-heroicons-document-text",
                class: "w-4 h-4 mr-1"
              }), createTextVNode(" \u67E5\u770B\u65E5\u5FD7 ")]),
              _: 1
            })])
          ])];
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, { class: "bg-gray-900/70 backdrop-blur-md border border-gray-700/40 shadow-lg hover:shadow-xl transition-all duration-200" }, {
        header: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="flex items-center justify-between" data-v-7a8e9811${_scopeId}><div class="flex items-center space-x-3" data-v-7a8e9811${_scopeId}><div class="p-2 bg-gray-800/50 rounded-lg" data-v-7a8e9811${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-server",
              class: "w-6 h-6 text-green-400"
            }, null, _parent$1, _scopeId));
            _push$1(`</div><div data-v-7a8e9811${_scopeId}><h3 class="text-lg font-semibold text-white" data-v-7a8e9811${_scopeId}>API\u670D\u52A1</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId}>\u63A5\u53E3\u8FDE\u63A5\u72B6\u6001</p></div></div>`);
            _push$1(ssrRenderComponent(_component_UBadge, {
              color: unref(apiStatus).color,
              variant: "soft"
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) _push$2(`${ssrInterpolate(unref(apiStatus).text)}`);
                else return [createTextVNode(toDisplayString(unref(apiStatus).text), 1)];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div>`);
          } else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("div", { class: "flex items-center space-x-3" }, [createVNode("div", { class: "p-2 bg-gray-800/50 rounded-lg" }, [createVNode(_component_UIcon, {
            name: "i-heroicons-server",
            class: "w-6 h-6 text-green-400"
          })]), createVNode("div", null, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "API\u670D\u52A1"), createVNode("p", { class: "text-sm text-gray-400" }, "\u63A5\u53E3\u8FDE\u63A5\u72B6\u6001")])]), createVNode(_component_UBadge, {
            color: unref(apiStatus).color,
            variant: "soft"
          }, {
            default: withCtx(() => [createTextVNode(toDisplayString(unref(apiStatus).text), 1)]),
            _: 1
          }, 8, ["color"])])];
        }),
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="space-y-4" data-v-7a8e9811${_scopeId}><div class="flex items-center justify-between p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="flex items-center space-x-3" data-v-7a8e9811${_scopeId}><div class="relative" data-v-7a8e9811${_scopeId}><div class="${ssrRenderClass(["w-3 h-3 rounded-full", unref(apiStatus).connected ? "bg-green-500" : "bg-red-500"])}" data-v-7a8e9811${_scopeId}></div>`);
            if (unref(apiStatus).connected) _push$1(`<div class="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" data-v-7a8e9811${_scopeId}></div>`);
            else _push$1(`<!---->`);
            _push$1(`</div><span class="text-sm font-medium text-gray-300" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(apiStatus).connected ? "\u670D\u52A1\u6B63\u5E38" : "\u670D\u52A1\u5F02\u5E38")}</span></div><span class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}> \u54CD\u5E94\u65F6\u95F4: ${ssrInterpolate(unref(apiStatus).responseTime)}ms </span></div><div class="grid grid-cols-2 gap-4" data-v-7a8e9811${_scopeId}><div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="text-2xl font-bold text-white" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(apiStats).requestsCount)}</div><div class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}>\u4ECA\u65E5\u8BF7\u6C42</div></div><div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="text-2xl font-bold text-white" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(apiStats).uptime)}%</div><div class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}>\u53EF\u7528\u6027</div></div></div><div class="flex space-x-2" data-v-7a8e9811${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UButton, {
              size: "sm",
              variant: "soft",
              color: "green",
              onClick: refreshApiStatus,
              loading: unref(apiLoading)
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) {
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent$2, _scopeId$1));
                  _push$2(` \u5237\u65B0\u72B6\u6001 `);
                } else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-4 h-4 mr-1"
                }), createTextVNode(" \u5237\u65B0\u72B6\u6001 ")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(ssrRenderComponent(_component_UButton, {
              size: "sm",
              variant: "outline",
              color: "gray",
              onClick: viewApiMetrics
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) {
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-chart-bar",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent$2, _scopeId$1));
                  _push$2(` \u67E5\u770B\u6307\u6807 `);
                } else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-chart-bar",
                  class: "w-4 h-4 mr-1"
                }), createTextVNode(" \u67E5\u770B\u6307\u6807 ")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div></div>`);
          } else return [createVNode("div", { class: "space-y-4" }, [
            createVNode("div", { class: "flex items-center justify-between p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "flex items-center space-x-3" }, [createVNode("div", { class: "relative" }, [createVNode("div", { class: ["w-3 h-3 rounded-full", unref(apiStatus).connected ? "bg-green-500" : "bg-red-500"] }, null, 2), unref(apiStatus).connected ? (openBlock(), createBlock("div", {
              key: 0,
              class: "absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"
            })) : createCommentVNode("", true)]), createVNode("span", { class: "text-sm font-medium text-gray-300" }, toDisplayString(unref(apiStatus).connected ? "\u670D\u52A1\u6B63\u5E38" : "\u670D\u52A1\u5F02\u5E38"), 1)]), createVNode("span", { class: "text-xs text-gray-400" }, " \u54CD\u5E94\u65F6\u95F4: " + toDisplayString(unref(apiStatus).responseTime) + "ms ", 1)]),
            createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode("div", { class: "text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "text-2xl font-bold text-white" }, toDisplayString(unref(apiStats).requestsCount), 1), createVNode("div", { class: "text-xs text-gray-400" }, "\u4ECA\u65E5\u8BF7\u6C42")]), createVNode("div", { class: "text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "text-2xl font-bold text-white" }, toDisplayString(unref(apiStats).uptime) + "%", 1), createVNode("div", { class: "text-xs text-gray-400" }, "\u53EF\u7528\u6027")])]),
            createVNode("div", { class: "flex space-x-2" }, [createVNode(_component_UButton, {
              size: "sm",
              variant: "soft",
              color: "green",
              onClick: refreshApiStatus,
              loading: unref(apiLoading)
            }, {
              default: withCtx(() => [createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-1"
              }), createTextVNode(" \u5237\u65B0\u72B6\u6001 ")]),
              _: 1
            }, 8, ["loading"]), createVNode(_component_UButton, {
              size: "sm",
              variant: "outline",
              color: "gray",
              onClick: viewApiMetrics
            }, {
              default: withCtx(() => [createVNode(_component_UIcon, {
                name: "i-heroicons-chart-bar",
                class: "w-4 h-4 mr-1"
              }), createTextVNode(" \u67E5\u770B\u6307\u6807 ")]),
              _: 1
            })])
          ])];
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UCard, { class: "mt-8 bg-gray-900/70 backdrop-blur-md border border-gray-700/40 shadow-lg" }, {
        header: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="flex items-center space-x-3" data-v-7a8e9811${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-bolt",
              class: "w-5 h-5 text-yellow-500"
            }, null, _parent$1, _scopeId));
            _push$1(`<h3 class="text-lg font-semibold text-white" data-v-7a8e9811${_scopeId}>\u5FEB\u901F\u64CD\u4F5C</h3></div>`);
          } else return [createVNode("div", { class: "flex items-center space-x-3" }, [createVNode(_component_UIcon, {
            name: "i-heroicons-bolt",
            class: "w-5 h-5 text-yellow-500"
          }), createVNode("h3", { class: "text-lg font-semibold text-white" }, "\u5FEB\u901F\u64CD\u4F5C")])];
        }),
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-7a8e9811${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UCard, { class: "bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70" }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) {
                  _push$2(`<div class="text-center p-4" data-v-7a8e9811${_scopeId$1}><div class="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" data-v-7a8e9811${_scopeId$1}>`);
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-users",
                    class: "w-6 h-6 text-green-400"
                  }, null, _parent$2, _scopeId$1));
                  _push$2(`</div><h3 class="font-medium text-white mb-1" data-v-7a8e9811${_scopeId$1}>\u7528\u6237\u7BA1\u7406</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId$1}>\u7BA1\u7406\u7528\u6237\u548C\u6743\u9650</p></div>`);
                } else return [createVNode("div", { class: "text-center p-4" }, [
                  createVNode("div", { class: "w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
                    name: "i-heroicons-users",
                    class: "w-6 h-6 text-green-400"
                  })]),
                  createVNode("h3", { class: "font-medium text-white mb-1" }, "\u7528\u6237\u7BA1\u7406"),
                  createVNode("p", { class: "text-sm text-gray-400" }, "\u7BA1\u7406\u7528\u6237\u548C\u6743\u9650")
                ])];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(ssrRenderComponent(_component_UCard, { class: "bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70" }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) {
                  _push$2(`<div class="text-center p-4" data-v-7a8e9811${_scopeId$1}><div class="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" data-v-7a8e9811${_scopeId$1}>`);
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-chart-bar",
                    class: "w-6 h-6 text-purple-400"
                  }, null, _parent$2, _scopeId$1));
                  _push$2(`</div><h3 class="font-medium text-white mb-1" data-v-7a8e9811${_scopeId$1}>\u6570\u636E\u7EDF\u8BA1</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId$1}>\u67E5\u770B\u8BE6\u7EC6\u7EDF\u8BA1</p></div>`);
                } else return [createVNode("div", { class: "text-center p-4" }, [
                  createVNode("div", { class: "w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
                    name: "i-heroicons-chart-bar",
                    class: "w-6 h-6 text-purple-400"
                  })]),
                  createVNode("h3", { class: "font-medium text-white mb-1" }, "\u6570\u636E\u7EDF\u8BA1"),
                  createVNode("p", { class: "text-sm text-gray-400" }, "\u67E5\u770B\u8BE6\u7EC6\u7EDF\u8BA1")
                ])];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(ssrRenderComponent(_component_UCard, { class: "bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70" }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) {
                  _push$2(`<div class="text-center p-4" data-v-7a8e9811${_scopeId$1}><div class="w-12 h-12 bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" data-v-7a8e9811${_scopeId$1}>`);
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-wrench-screwdriver",
                    class: "w-6 h-6 text-orange-400"
                  }, null, _parent$2, _scopeId$1));
                  _push$2(`</div><h3 class="font-medium text-white mb-1" data-v-7a8e9811${_scopeId$1}>\u5F00\u53D1\u5DE5\u5177</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId$1}>API\u6D4B\u8BD5\u548C\u8C03\u8BD5</p></div>`);
                } else return [createVNode("div", { class: "text-center p-4" }, [
                  createVNode("div", { class: "w-12 h-12 bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
                    name: "i-heroicons-wrench-screwdriver",
                    class: "w-6 h-6 text-orange-400"
                  })]),
                  createVNode("h3", { class: "font-medium text-white mb-1" }, "\u5F00\u53D1\u5DE5\u5177"),
                  createVNode("p", { class: "text-sm text-gray-400" }, "API\u6D4B\u8BD5\u548C\u8C03\u8BD5")
                ])];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div>`);
          } else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
            createVNode(_component_UCard, { class: "bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70" }, {
              default: withCtx(() => [createVNode("div", { class: "text-center p-4" }, [
                createVNode("div", { class: "w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
                  name: "i-heroicons-users",
                  class: "w-6 h-6 text-green-400"
                })]),
                createVNode("h3", { class: "font-medium text-white mb-1" }, "\u7528\u6237\u7BA1\u7406"),
                createVNode("p", { class: "text-sm text-gray-400" }, "\u7BA1\u7406\u7528\u6237\u548C\u6743\u9650")
              ])]),
              _: 1
            }),
            createVNode(_component_UCard, { class: "bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70" }, {
              default: withCtx(() => [createVNode("div", { class: "text-center p-4" }, [
                createVNode("div", { class: "w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
                  name: "i-heroicons-chart-bar",
                  class: "w-6 h-6 text-purple-400"
                })]),
                createVNode("h3", { class: "font-medium text-white mb-1" }, "\u6570\u636E\u7EDF\u8BA1"),
                createVNode("p", { class: "text-sm text-gray-400" }, "\u67E5\u770B\u8BE6\u7EC6\u7EDF\u8BA1")
              ])]),
              _: 1
            }),
            createVNode(_component_UCard, { class: "bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70" }, {
              default: withCtx(() => [createVNode("div", { class: "text-center p-4" }, [
                createVNode("div", { class: "w-12 h-12 bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
                  name: "i-heroicons-wrench-screwdriver",
                  class: "w-6 h-6 text-orange-400"
                })]),
                createVNode("h3", { class: "font-medium text-white mb-1" }, "\u5F00\u53D1\u5DE5\u5177"),
                createVNode("p", { class: "text-sm text-gray-400" }, "API\u6D4B\u8BD5\u548C\u8C03\u8BD5")
              ])]),
              _: 1
            })
          ])];
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard-backup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dashboard_backup_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-7a8e9811"]]);

export { dashboard_backup_default as default };
//# sourceMappingURL=dashboard-backup-C0wWEG-8.mjs.map
