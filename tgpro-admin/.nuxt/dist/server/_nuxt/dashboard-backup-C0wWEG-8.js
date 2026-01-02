import "./components-D5RLOpR9.js";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import "./ui-G7Oicn0a.js";
import "./Link-xfGBFWPh.js";
import "./useButtonGroup-1gNuWR3y.js";
import { t as Button_default } from "./Button-CMkth-mr.js";
import { t as Badge_default } from "./Badge-NTFE8zPq.js";
import { t as Card_default } from "./Card-BW8lEMKL.js";
import { t as definePageMeta } from "./composables-BTIC2kjU.js";
import "./interval-BZ5NHAfS.js";
import { createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, openBlock, ref, resolveComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
var _sfc_main = {
	__name: "dashboard-backup",
	__ssrInlineRender: true,
	setup(__props) {
		const telegramLoading = ref(false);
		const apiLoading = ref(false);
		const telegramStatus = ref({
			connected: true,
			color: "green",
			text: "在线",
			lastUpdate: "刚刚"
		});
		const telegramStats = ref({
			activeUsers: 1247,
			messagesCount: 3856
		});
		const apiStatus = ref({
			connected: true,
			color: "green",
			text: "正常",
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
				const isConnected = Math.random() > .1;
				telegramStatus.value.connected = isConnected;
				telegramStatus.value.color = isConnected ? "green" : "red";
				telegramStatus.value.text = isConnected ? "在线" : "离线";
				telegramStats.value.activeUsers = Math.floor(Math.random() * 2e3) + 1e3;
				telegramStats.value.messagesCount = Math.floor(Math.random() * 5e3) + 2e3;
			} catch (error) {
				console.error("刷新Telegram状态失败:", error);
			} finally {
				telegramLoading.value = false;
			}
		};
		const refreshApiStatus = async () => {
			apiLoading.value = true;
			try {
				await new Promise((resolve) => setTimeout(resolve, 800));
				const isConnected = Math.random() > .05;
				apiStatus.value.connected = isConnected;
				apiStatus.value.color = isConnected ? "green" : "red";
				apiStatus.value.text = isConnected ? "正常" : "异常";
				apiStatus.value.responseTime = Math.floor(Math.random() * 100) + 20;
				apiStats.value.requestCount = Math.floor(Math.random() * 2e4) + 1e4;
				apiStats.value.uptime = (Math.random() * .5 + 99.5).toFixed(1);
			} catch (error) {
				console.error("刷新API状态失败:", error);
			} finally {
				apiLoading.value = false;
			}
		};
		const viewTelegramLogs = () => {
			console.log("查看Telegram日志");
		};
		const viewApiMetrics = () => {
			console.log("查看API指标");
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UBadge = Badge_default;
			const _component_UIcon = Icon_default;
			const _component_UCard = Card_default;
			const _component_UButton = Button_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-black" }, _attrs))} data-v-7a8e9811><div class="bg-transparent border-b border-gray-700" data-v-7a8e9811><div class="px-6 py-4" data-v-7a8e9811><div class="flex items-center justify-between" data-v-7a8e9811><div data-v-7a8e9811><h1 class="text-2xl font-bold text-white" data-v-7a8e9811>仪表板</h1><p class="text-sm text-gray-400 mt-1" data-v-7a8e9811>监控您的Telegram机器人和API服务状态</p></div><div class="flex items-center space-x-3" data-v-7a8e9811>`);
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
						_push$1(` 系统运行中 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-signal",
						class: "w-4 h-4 mr-1"
					}), createTextVNode(" 系统运行中 ")];
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
						_push$1(`</div><div data-v-7a8e9811${_scopeId}><h3 class="text-lg font-semibold text-white" data-v-7a8e9811${_scopeId}>Telegram机器人</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId}>连接状态监控</p></div></div>`);
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
					})]), createVNode("div", null, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "Telegram机器人"), createVNode("p", { class: "text-sm text-gray-400" }, "连接状态监控")])]), createVNode(_component_UBadge, {
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
						_push$1(`</div><span class="text-sm font-medium text-gray-300" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(telegramStatus).connected ? "已连接" : "连接断开")}</span></div><span class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}> 最后更新: ${ssrInterpolate(unref(telegramStatus).lastUpdate)}</span></div><div class="grid grid-cols-2 gap-4" data-v-7a8e9811${_scopeId}><div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="text-2xl font-bold text-white" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(telegramStats).activeUsers)}</div><div class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}>活跃用户</div></div><div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="text-2xl font-bold text-white" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(telegramStats).messagesCount)}</div><div class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}>今日消息</div></div></div><div class="flex space-x-2" data-v-7a8e9811${_scopeId}>`);
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
									_push$2(` 刷新状态 `);
								} else return [createVNode(_component_UIcon, {
									name: "i-heroicons-arrow-path",
									class: "w-4 h-4 mr-1"
								}), createTextVNode(" 刷新状态 ")];
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
									_push$2(` 查看日志 `);
								} else return [createVNode(_component_UIcon, {
									name: "i-heroicons-document-text",
									class: "w-4 h-4 mr-1"
								}), createTextVNode(" 查看日志 ")];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(`</div></div>`);
					} else return [createVNode("div", { class: "space-y-4" }, [
						createVNode("div", { class: "flex items-center justify-between p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "flex items-center space-x-3" }, [createVNode("div", { class: "relative" }, [createVNode("div", { class: ["w-3 h-3 rounded-full", unref(telegramStatus).connected ? "bg-green-500" : "bg-red-500"] }, null, 2), unref(telegramStatus).connected ? (openBlock(), createBlock("div", {
							key: 0,
							class: "absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"
						})) : createCommentVNode("", true)]), createVNode("span", { class: "text-sm font-medium text-gray-300" }, toDisplayString(unref(telegramStatus).connected ? "已连接" : "连接断开"), 1)]), createVNode("span", { class: "text-xs text-gray-400" }, " 最后更新: " + toDisplayString(unref(telegramStatus).lastUpdate), 1)]),
						createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode("div", { class: "text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "text-2xl font-bold text-white" }, toDisplayString(unref(telegramStats).activeUsers), 1), createVNode("div", { class: "text-xs text-gray-400" }, "活跃用户")]), createVNode("div", { class: "text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "text-2xl font-bold text-white" }, toDisplayString(unref(telegramStats).messagesCount), 1), createVNode("div", { class: "text-xs text-gray-400" }, "今日消息")])]),
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
							}), createTextVNode(" 刷新状态 ")]),
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
							}), createTextVNode(" 查看日志 ")]),
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
						_push$1(`</div><div data-v-7a8e9811${_scopeId}><h3 class="text-lg font-semibold text-white" data-v-7a8e9811${_scopeId}>API服务</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId}>接口连接状态</p></div></div>`);
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
					})]), createVNode("div", null, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "API服务"), createVNode("p", { class: "text-sm text-gray-400" }, "接口连接状态")])]), createVNode(_component_UBadge, {
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
						_push$1(`</div><span class="text-sm font-medium text-gray-300" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(apiStatus).connected ? "服务正常" : "服务异常")}</span></div><span class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}> 响应时间: ${ssrInterpolate(unref(apiStatus).responseTime)}ms </span></div><div class="grid grid-cols-2 gap-4" data-v-7a8e9811${_scopeId}><div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="text-2xl font-bold text-white" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(apiStats).requestsCount)}</div><div class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}>今日请求</div></div><div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" data-v-7a8e9811${_scopeId}><div class="text-2xl font-bold text-white" data-v-7a8e9811${_scopeId}>${ssrInterpolate(unref(apiStats).uptime)}%</div><div class="text-xs text-gray-400" data-v-7a8e9811${_scopeId}>可用性</div></div></div><div class="flex space-x-2" data-v-7a8e9811${_scopeId}>`);
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
									_push$2(` 刷新状态 `);
								} else return [createVNode(_component_UIcon, {
									name: "i-heroicons-arrow-path",
									class: "w-4 h-4 mr-1"
								}), createTextVNode(" 刷新状态 ")];
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
									_push$2(` 查看指标 `);
								} else return [createVNode(_component_UIcon, {
									name: "i-heroicons-chart-bar",
									class: "w-4 h-4 mr-1"
								}), createTextVNode(" 查看指标 ")];
							}),
							_: 1
						}, _parent$1, _scopeId));
						_push$1(`</div></div>`);
					} else return [createVNode("div", { class: "space-y-4" }, [
						createVNode("div", { class: "flex items-center justify-between p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "flex items-center space-x-3" }, [createVNode("div", { class: "relative" }, [createVNode("div", { class: ["w-3 h-3 rounded-full", unref(apiStatus).connected ? "bg-green-500" : "bg-red-500"] }, null, 2), unref(apiStatus).connected ? (openBlock(), createBlock("div", {
							key: 0,
							class: "absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"
						})) : createCommentVNode("", true)]), createVNode("span", { class: "text-sm font-medium text-gray-300" }, toDisplayString(unref(apiStatus).connected ? "服务正常" : "服务异常"), 1)]), createVNode("span", { class: "text-xs text-gray-400" }, " 响应时间: " + toDisplayString(unref(apiStatus).responseTime) + "ms ", 1)]),
						createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode("div", { class: "text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "text-2xl font-bold text-white" }, toDisplayString(unref(apiStats).requestsCount), 1), createVNode("div", { class: "text-xs text-gray-400" }, "今日请求")]), createVNode("div", { class: "text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30" }, [createVNode("div", { class: "text-2xl font-bold text-white" }, toDisplayString(unref(apiStats).uptime) + "%", 1), createVNode("div", { class: "text-xs text-gray-400" }, "可用性")])]),
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
							}), createTextVNode(" 刷新状态 ")]),
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
							}), createTextVNode(" 查看指标 ")]),
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
						_push$1(`<h3 class="text-lg font-semibold text-white" data-v-7a8e9811${_scopeId}>快速操作</h3></div>`);
					} else return [createVNode("div", { class: "flex items-center space-x-3" }, [createVNode(_component_UIcon, {
						name: "i-heroicons-bolt",
						class: "w-5 h-5 text-yellow-500"
					}), createVNode("h3", { class: "text-lg font-semibold text-white" }, "快速操作")])];
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
									_push$2(`</div><h3 class="font-medium text-white mb-1" data-v-7a8e9811${_scopeId$1}>用户管理</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId$1}>管理用户和权限</p></div>`);
								} else return [createVNode("div", { class: "text-center p-4" }, [
									createVNode("div", { class: "w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
										name: "i-heroicons-users",
										class: "w-6 h-6 text-green-400"
									})]),
									createVNode("h3", { class: "font-medium text-white mb-1" }, "用户管理"),
									createVNode("p", { class: "text-sm text-gray-400" }, "管理用户和权限")
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
									_push$2(`</div><h3 class="font-medium text-white mb-1" data-v-7a8e9811${_scopeId$1}>数据统计</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId$1}>查看详细统计</p></div>`);
								} else return [createVNode("div", { class: "text-center p-4" }, [
									createVNode("div", { class: "w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
										name: "i-heroicons-chart-bar",
										class: "w-6 h-6 text-purple-400"
									})]),
									createVNode("h3", { class: "font-medium text-white mb-1" }, "数据统计"),
									createVNode("p", { class: "text-sm text-gray-400" }, "查看详细统计")
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
									_push$2(`</div><h3 class="font-medium text-white mb-1" data-v-7a8e9811${_scopeId$1}>开发工具</h3><p class="text-sm text-gray-400" data-v-7a8e9811${_scopeId$1}>API测试和调试</p></div>`);
								} else return [createVNode("div", { class: "text-center p-4" }, [
									createVNode("div", { class: "w-12 h-12 bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
										name: "i-heroicons-wrench-screwdriver",
										class: "w-6 h-6 text-orange-400"
									})]),
									createVNode("h3", { class: "font-medium text-white mb-1" }, "开发工具"),
									createVNode("p", { class: "text-sm text-gray-400" }, "API测试和调试")
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
								createVNode("h3", { class: "font-medium text-white mb-1" }, "用户管理"),
								createVNode("p", { class: "text-sm text-gray-400" }, "管理用户和权限")
							])]),
							_: 1
						}),
						createVNode(_component_UCard, { class: "bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70" }, {
							default: withCtx(() => [createVNode("div", { class: "text-center p-4" }, [
								createVNode("div", { class: "w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
									name: "i-heroicons-chart-bar",
									class: "w-6 h-6 text-purple-400"
								})]),
								createVNode("h3", { class: "font-medium text-white mb-1" }, "数据统计"),
								createVNode("p", { class: "text-sm text-gray-400" }, "查看详细统计")
							])]),
							_: 1
						}),
						createVNode(_component_UCard, { class: "bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70" }, {
							default: withCtx(() => [createVNode("div", { class: "text-center p-4" }, [
								createVNode("div", { class: "w-12 h-12 bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-3" }, [createVNode(_component_UIcon, {
									name: "i-heroicons-wrench-screwdriver",
									class: "w-6 h-6 text-orange-400"
								})]),
								createVNode("h3", { class: "font-medium text-white mb-1" }, "开发工具"),
								createVNode("p", { class: "text-sm text-gray-400" }, "API测试和调试")
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

//# sourceMappingURL=dashboard-backup-C0wWEG-8.js.map