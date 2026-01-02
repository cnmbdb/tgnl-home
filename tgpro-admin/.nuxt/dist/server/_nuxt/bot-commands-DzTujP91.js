import "./components-D5RLOpR9.js";
import "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import "./ui-G7Oicn0a.js";
import "./useFormGroup-ZK-CpXpd.js";
import "./Link-xfGBFWPh.js";
import "./useButtonGroup-1gNuWR3y.js";
import { t as Button_default } from "./Button-CMkth-mr.js";
import { t as Badge_default } from "./Badge-NTFE8zPq.js";
import { t as Input_default } from "./Input-Cg9OsLtS.js";
import { t as Textarea_default } from "./Textarea-Da68Uww6.js";
import { t as definePageMeta } from "./composables-BTIC2kjU.js";
import { computed, createTextVNode, createVNode, defineComponent, mergeProps, ref, resolveComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
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
				description: "开始使用机器人",
				response: "欢迎使用我们的机器人！🤖\n\n请选择您需要的功能：\n• /help - 查看帮助信息\n• /buy - 开通会员\n• /info - 查看机器人信息",
				status: "active",
				usageCount: 1234,
				lastUsed: /* @__PURE__ */ new Date("2024-01-15T10:30:00"),
				createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
				updatedAt: /* @__PURE__ */ new Date("2024-01-15T10:30:00")
			},
			{
				id: 2,
				name: "help",
				description: "显示帮助信息",
				response: "📋 帮助信息\n\n可用命令：\n• /start - 开始使用\n• /buy - 开通会员\n• /info - 机器人信息\n• /settings - 个人设置\n\n如需更多帮助，请联系客服。",
				status: "active",
				usageCount: 856,
				lastUsed: /* @__PURE__ */ new Date("2024-01-15T09:15:00"),
				createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
				updatedAt: /* @__PURE__ */ new Date("2024-01-15T09:15:00")
			},
			{
				id: 3,
				name: "buy",
				description: "开通会员",
				response: "💎 会员服务\n\n我们提供以下会员套餐：\n• VIP会员 - ¥99/月\n• 高级会员 - ¥199/月\n• 至尊会员 - ¥399/月\n\n点击下方按钮选择套餐：",
				status: "active",
				usageCount: 432,
				lastUsed: /* @__PURE__ */ new Date("2024-01-14T16:45:00"),
				createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
				updatedAt: /* @__PURE__ */ new Date("2024-01-14T16:45:00")
			},
			{
				id: 4,
				name: "info",
				description: "显示机器人信息",
				response: "ℹ️ 机器人信息\n\n版本：v2.0.1\n运行时间：24/7\n服务用户：10,000+\n响应速度：<100ms\n\n感谢您的使用！",
				status: "active",
				usageCount: 321,
				lastUsed: /* @__PURE__ */ new Date("2024-01-14T14:20:00"),
				createdAt: /* @__PURE__ */ new Date("2024-01-01T00:00:00"),
				updatedAt: /* @__PURE__ */ new Date("2024-01-14T14:20:00")
			},
			{
				id: 5,
				name: "settings",
				description: "用户设置",
				response: "⚙️ 个人设置\n\n您可以在这里配置：\n• 通知设置\n• 语言偏好\n• 隐私设置\n• 账户信息\n\n请选择要修改的设置项：",
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
						if (saveStatus.value === "saved") saveStatus.value = "idle";
					}, 2e3);
				} else throw new Error(response.message);
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
			const _component_UBadge = Badge_default;
			const _component_UIcon = Icon_default;
			const _component_UButton = Button_default;
			const _component_UInput = Input_default;
			const _component_UTextarea = Textarea_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white">机器人命令管理</h1><p class="text-[#9ca3af] mt-1">配置和管理机器人的命令响应</p></div><div class="flex items-center gap-3">`);
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
						_push$1(` 保存中... `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-3 h-3 animate-spin mr-1"
					}), createTextVNode(" 保存中... ")];
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
						_push$1(` 已保存 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-check",
						class: "w-3 h-3 mr-1"
					}), createTextVNode(" 已保存 ")];
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
						_push$1(` 保存失败 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-exclamation-triangle",
						class: "w-3 h-3 mr-1"
					}), createTextVNode(" 保存失败 ")];
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
						_push$1(` 刷新 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 刷新 ")];
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
						_push$1(` 添加命令 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-plus",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 添加命令 ")];
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
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(`${ssrInterpolate(command.status === "active" ? "活跃" : "禁用")}`);
						else return [createTextVNode(toDisplayString(command.status === "active" ? "活跃" : "禁用"), 1)];
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
							_push$1(` ${ssrInterpolate(command.status === "active" ? "禁用" : "启用")}`);
						} else return [createVNode(_component_UIcon, {
							name: command.status === "active" ? "i-heroicons-pause" : "i-heroicons-play",
							class: "w-4 h-4"
						}, null, 8, ["name"]), createTextVNode(" " + toDisplayString(command.status === "active" ? "禁用" : "启用"), 1)];
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
							_push$1(` 删除 `);
						} else return [createVNode(_component_UIcon, {
							name: "i-heroicons-trash",
							class: "w-4 h-4"
						}), createTextVNode(" 删除 ")];
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
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) {
							_push$1(ssrRenderComponent(_component_UIcon, {
								name: "i-heroicons-plus",
								class: "w-4 h-4 mr-2"
							}, null, _parent$1, _scopeId));
							_push$1(` 添加命令 `);
						} else return [createVNode(_component_UIcon, {
							name: "i-heroicons-plus",
							class: "w-4 h-4 mr-2"
						}), createTextVNode(" 添加命令 ")];
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

//# sourceMappingURL=bot-commands-DzTujP91.js.map