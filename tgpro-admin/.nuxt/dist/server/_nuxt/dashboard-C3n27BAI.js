import "./components-D5RLOpR9.js";
import "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import "./ui-G7Oicn0a.js";
import "./Link-xfGBFWPh.js";
import "./useButtonGroup-1gNuWR3y.js";
import { t as Button_default } from "./Button-CMkth-mr.js";
import { t as Badge_default } from "./Badge-NTFE8zPq.js";
import { t as definePageMeta } from "./composables-BTIC2kjU.js";
import "./interval-BZ5NHAfS.js";
import { createTextVNode, createVNode, mergeProps, ref, resolveComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
var _sfc_main = {
	__name: "dashboard",
	__ssrInlineRender: true,
	setup(__props) {
		const systemStatus = ref({
			status: "正常运行",
			onlineUsers: 1247,
			cpuUsage: 45,
			memoryUsage: 68
		});
		const telegramService = ref({
			status: "online",
			activeUsers: 1247,
			messagesCount: 3856,
			lastUpdate: "刚刚"
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
				icon: "i-heroicons-user-plus",
				message: "新用户注册",
				time: "2分钟前",
				type: "success",
				status: "成功"
			},
			{
				id: 2,
				icon: "i-heroicons-exclamation-triangle",
				message: "API 响应时间较慢",
				time: "5分钟前",
				type: "warning",
				status: "警告"
			},
			{
				id: 3,
				icon: "i-heroicons-arrow-path",
				message: "系统自动备份完成",
				time: "10分钟前",
				type: "success",
				status: "完成"
			},
			{
				id: 4,
				icon: "i-heroicons-server",
				message: "服务器重启",
				time: "1小时前",
				type: "info",
				status: "信息"
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
				console.error("获取机器人状态失败:", error);
				botProcesses.value = [];
				processCount.value = 0;
			}
		};
		const refreshBotStatus = async () => {
			await fetchBotStatus();
		};
		const formatDateTime = (dateString) => {
			return new Date(dateString).toLocaleString("zh-CN", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = Icon_default;
			const _component_UButton = Button_default;
			const _component_UBadge = Badge_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-chart-bar",
				class: "w-5 h-5 text-[#00dc82]"
			}, null, _parent));
			_push(`</div> 系统仪表板 </h1><p class="mt-1 text-sm text-[#9ca3af]">监控系统状态和性能指标</p></div><div class="flex gap-2">`);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				size: "sm"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-arrow-path",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 刷新数据 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 刷新数据 ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UButton, {
				color: "primary",
				size: "sm",
				class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-cog-6-tooth",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 系统设置 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-cog-6-tooth",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 系统设置 ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-signal",
				class: "w-5 h-5 text-green-400"
			}, null, _parent));
			_push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">系统状态</p><p class="text-xl font-semibold text-green-400">${ssrInterpolate(unref(systemStatus).status)}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-users",
				class: "w-5 h-5 text-blue-400"
			}, null, _parent));
			_push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">在线用户</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(systemStatus).onlineUsers)}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-cpu-chip",
				class: "w-5 h-5 text-purple-400"
			}, null, _parent));
			_push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">CPU 使用率</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(systemStatus).cpuUsage)}%</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-circle-stack",
				class: "w-5 h-5 text-yellow-400"
			}, null, _parent));
			_push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">内存使用</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(systemStatus).memoryUsage)}%</p></div></div></div></div><div class="grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b] flex items-center justify-between"><h3 class="text-lg font-medium text-white flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-simple-icons-telegram",
				class: "w-5 h-5 text-blue-400"
			}, null, _parent));
			_push(` Telegram 机器人 </h3>`);
			_push(ssrRenderComponent(_component_UBadge, {
				color: unref(telegramService).status === "online" ? "green" : "red",
				variant: "subtle"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`${ssrInterpolate(unref(telegramService).status === "online" ? "在线" : "离线")}`);
					else return [createTextVNode(toDisplayString(unref(telegramService).status === "online" ? "在线" : "离线"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="p-4 space-y-4"><div class="grid grid-cols-2 gap-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(telegramService).activeUsers)}</p><p class="text-xs text-[#9ca3af]">活跃用户</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(telegramService).messagesCount)}</p><p class="text-xs text-[#9ca3af]">今日消息</p></div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-4"><div class="flex items-center justify-between mb-3"><h4 class="text-sm font-medium text-white flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-cpu-chip",
				class: "w-4 h-4 text-blue-400"
			}, null, _parent));
			_push(` 机器人进程状态 `);
			if (unref(processCount) !== void 0) _push(ssrRenderComponent(_component_UBadge, {
				color: unref(processCount) > 0 ? "green" : "red",
				variant: "subtle",
				size: "xs"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`${ssrInterpolate(unref(processCount))} 个进程 `);
					else return [createTextVNode(toDisplayString(unref(processCount)) + " 个进程 ", 1)];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</h4>`);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "ghost",
				size: "xs",
				onClick: refreshBotStatus
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-3 h-3"
					}, null, _parent$1, _scopeId));
					else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-3 h-3"
					})];
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
						default: withCtx((_, _push$1, _parent$1, _scopeId) => {
							if (_push$1) _push$1(`运行中`);
							else return [createTextVNode("运行中")];
						}),
						_: 2
					}, _parent));
					_push(`</div><div class="grid grid-cols-2 gap-3 text-xs"><div><span class="text-[#9ca3af]">进程ID:</span><span class="text-white ml-1">${ssrInterpolate(process.pid)}</span></div><div><span class="text-[#9ca3af]">运行时间:</span><span class="text-white ml-1">${ssrInterpolate(process.uptime)}</span></div><div><span class="text-[#9ca3af]">CPU:</span><span class="text-white ml-1">${ssrInterpolate(process.cpuUsage)}%</span></div><div><span class="text-[#9ca3af]">内存:</span><span class="text-white ml-1">${ssrInterpolate(process.memUsage)}%</span></div></div><div class="mt-2 text-xs"><span class="text-[#9ca3af]">启动时间:</span><span class="text-white ml-1">${ssrInterpolate(formatDateTime(process.startedAt))}</span></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else {
				_push(`<div class="text-center py-4">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-heroicons-exclamation-triangle",
					class: "w-8 h-8 text-yellow-400 mx-auto mb-2"
				}, null, _parent));
				_push(`<p class="text-sm text-[#9ca3af]">未检测到机器人进程</p></div>`);
			}
			_push(`</div><div class="flex items-center justify-between p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-md"><div class="flex items-center space-x-3"><div class="relative"><div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div><div class="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div></div><span class="text-white font-medium">已连接</span></div><span class="text-sm text-[#9ca3af]">最后更新: ${ssrInterpolate(unref(telegramService).lastUpdate)}</span></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b] flex items-center justify-between"><h3 class="text-lg font-medium text-white flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-server",
				class: "w-5 h-5 text-green-400"
			}, null, _parent));
			_push(` API 服务 </h3>`);
			_push(ssrRenderComponent(_component_UBadge, {
				color: unref(apiService).status === "normal" ? "green" : "red",
				variant: "subtle"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`${ssrInterpolate(unref(apiService).status === "normal" ? "正常" : "异常")}`);
					else return [createTextVNode(toDisplayString(unref(apiService).status === "normal" ? "正常" : "异常"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="p-4 space-y-4"><div class="grid grid-cols-2 gap-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(apiService).requestsCount)}</p><p class="text-xs text-[#9ca3af]">今日请求</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(apiService).uptime)}%</p><p class="text-xs text-[#9ca3af]">可用性</p></div></div><div class="flex items-center justify-between p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-md"><div class="flex items-center space-x-3"><div class="relative"><div class="w-3 h-3 bg-green-400 rounded-full"></div></div><span class="text-white font-medium">服务正常</span></div><span class="text-sm text-[#9ca3af]">响应时间: ${ssrInterpolate(unref(apiService).responseTime)}ms</span></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b] flex items-center justify-between"><h3 class="text-lg font-medium text-white flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-circle-stack",
				class: "w-5 h-5 text-blue-400"
			}, null, _parent));
			_push(` 数据库状态 </h3>`);
			_push(ssrRenderComponent(_component_UBadge, {
				color: unref(database).status === "connected" ? "green" : "red",
				variant: "subtle"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`${ssrInterpolate(unref(database).status === "connected" ? "已连接" : "连接失败")}`);
					else return [createTextVNode(toDisplayString(unref(database).status === "connected" ? "已连接" : "连接失败"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="p-4"><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(unref(database).totalUsers)}</p><p class="text-xs text-[#9ca3af]">总用户数</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(unref(database).totalMessages)}</p><p class="text-xs text-[#9ca3af]">总消息数</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(unref(database).dbSize)}</p><p class="text-xs text-[#9ca3af]">数据库大小</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(unref(database).connections)}</p><p class="text-xs text-[#9ca3af]">活跃连接</p></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b]"><h3 class="text-lg font-medium text-white">快速操作</h3></div><div class="p-4"><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-4 hover:bg-[#2a2a2b]/50 transition-colors cursor-pointer"><div class="text-center"><div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-arrow-path",
				class: "w-6 h-6 text-blue-400"
			}, null, _parent));
			_push(`</div><h4 class="text-sm font-medium text-white mb-1">刷新状态</h4><p class="text-xs text-[#9ca3af]">更新所有服务状态</p></div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-4 hover:bg-[#2a2a2b]/50 transition-colors cursor-pointer"><div class="text-center"><div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-document-text",
				class: "w-6 h-6 text-green-400"
			}, null, _parent));
			_push(`</div><h4 class="text-sm font-medium text-white mb-1">查看日志</h4><p class="text-xs text-[#9ca3af]">系统运行日志</p></div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-4 hover:bg-[#2a2a2b]/50 transition-colors cursor-pointer"><div class="text-center"><div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-cog-6-tooth",
				class: "w-6 h-6 text-purple-400"
			}, null, _parent));
			_push(`</div><h4 class="text-sm font-medium text-white mb-1">系统设置</h4><p class="text-xs text-[#9ca3af]">配置系统参数</p></div></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b]"><h3 class="text-lg font-medium text-white">最近活动</h3></div><div class="p-4"><div class="space-y-3"><!--[-->`);
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
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(`${ssrInterpolate(activity.status)}`);
						else return [createTextVNode(toDisplayString(activity.status), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</div>`);
			});
			_push(`<!--]--></div></div></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dashboard_default = _sfc_main;
export { dashboard_default as default };

//# sourceMappingURL=dashboard-C3n27BAI.js.map