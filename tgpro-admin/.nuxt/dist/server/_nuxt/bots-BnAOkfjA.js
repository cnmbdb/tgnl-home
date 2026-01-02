import "./components-D5RLOpR9.js";
import "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import "./ui-G7Oicn0a.js";
import "./form-1BInePM-.js";
import "./keyboard-CvjRf4Wb.js";
import "./use-resolve-button-type-eioNRL5V.js";
import "./hidden-Bsn3DsxF.js";
import "./description-Y4p4EFv6.js";
import { t as Toggle_default } from "./Toggle-tNsPBJRu.js";
import "./useFormGroup-ZK-CpXpd.js";
import "./Link-xfGBFWPh.js";
import "./useButtonGroup-1gNuWR3y.js";
import { t as Button_default } from "./Button-CMkth-mr.js";
import { t as Badge_default } from "./Badge-NTFE8zPq.js";
import { t as Input_default } from "./Input-Cg9OsLtS.js";
import { t as Textarea_default } from "./Textarea-Da68Uww6.js";
import { t as useToast } from "./useToast-C_VA77Lb.js";
import { t as definePageMeta } from "./composables-BTIC2kjU.js";
import { createTextVNode, createVNode, isRef, mergeProps, ref, resolveComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
var _sfc_main = {
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const botConfig = ref({
			token: "",
			controlAddress: "",
			adminId: "",
			customerServiceId: "",
			tiaozhuan: "",
			threePrice: "",
			sixPrice: "",
			yearPrice: "",
			resHash: "",
			resCookie: "",
			walletMnemonic: "",
			dbHost: "",
			dbUser: "",
			dbPassword: "",
			dbName: "",
			dbPort: "",
			tronApiKey: ""
		});
		const isSaving = ref(false);
		const lastSaved = ref(false);
		let saveTimeout = null;
		const isRestarting = ref(false);
		const showRestartProgress = ref(false);
		const restartProgress = ref(0);
		const restartStatus = ref("");
		const hotReloadEnabled = ref(false);
		const handleConfigChange = () => {
			if (saveTimeout) clearTimeout(saveTimeout);
			lastSaved.value = false;
			saveTimeout = setTimeout(() => {
				saveConfig();
			}, 3e3);
		};
		const handleHotReloadToggle = () => {
			console.log("热更新状态切换:", hotReloadEnabled.value);
			if (hotReloadEnabled.value) saveConfig();
		};
		const saveConfig = async () => {
			try {
				isSaving.value = true;
				console.log("保存配置:", botConfig.value);
				const response = await $fetch("/api/bot-config", {
					method: "POST",
					body: {
						...botConfig.value,
						hotReload: hotReloadEnabled.value
					}
				});
				if (response.success) {
					console.log("配置保存成功");
					lastSaved.value = true;
					if (hotReloadEnabled.value) useToast().add({
						title: "配置已保存并热更新",
						description: "机器人配置已自动重载，无需重启",
						icon: "i-heroicons-bolt",
						color: "green"
					});
					setTimeout(() => {
						lastSaved.value = false;
					}, 3e3);
				} else {
					console.error("保存配置失败:", response.error);
					useToast().add({
						title: "保存失败",
						description: response.error || "配置保存失败，请重试",
						icon: "i-heroicons-exclamation-triangle",
						color: "red"
					});
				}
			} catch (error) {
				console.error("保存配置失败:", error);
				useToast().add({
					title: "保存失败",
					description: "网络错误，请检查连接后重试",
					icon: "i-heroicons-exclamation-triangle",
					color: "red"
				});
			} finally {
				isSaving.value = false;
			}
		};
		const restartBot = async () => {
			try {
				isRestarting.value = true;
				showRestartProgress.value = true;
				restartProgress.value = 0;
				restartStatus.value = "正在检查机器人进程...";
				const updateProgress = (progress, status) => {
					restartProgress.value = progress;
					restartStatus.value = status;
				};
				const response = await $fetch("/api/restart-bot", { method: "POST" });
				if (response.success) {
					updateProgress(20, "正在停止现有进程...");
					await new Promise((resolve) => setTimeout(resolve, 1e3));
					updateProgress(50, "正在清理资源...");
					await new Promise((resolve) => setTimeout(resolve, 1e3));
					updateProgress(80, "正在启动机器人...");
					await new Promise((resolve) => setTimeout(resolve, 1500));
					updateProgress(100, "重启完成");
					setTimeout(() => {
						showRestartProgress.value = false;
						restartProgress.value = 0;
						restartStatus.value = "";
					}, 2e3);
					console.log("机器人重启成功");
				} else {
					console.error("重启机器人失败:", response.error);
					restartStatus.value = "重启失败: " + response.error;
				}
			} catch (error) {
				console.error("重启机器人失败:", error);
				restartStatus.value = "重启失败: " + error.message;
			} finally {
				isRestarting.value = false;
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = Icon_default;
			const _component_UButton = Button_default;
			const _component_UBadge = Badge_default;
			const _component_UToggle = Toggle_default;
			const _component_UInput = Input_default;
			const _component_UTextarea = Textarea_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-cpu-chip",
				class: "w-5 h-5 text-[#00dc82]"
			}, null, _parent));
			_push(`</div> 机器人管理 </h1><p class="mt-1 text-sm text-[#9ca3af]">监控和管理 Telegram 机器人状态</p></div><div class="flex gap-2">`);
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
						_push$1(` 刷新状态 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 刷新状态 ")];
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
							name: "i-heroicons-plus",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 添加机器人 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-plus",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 添加机器人 ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h3 class="text-lg font-medium text-white">机器人配置</h3><div class="flex items-center gap-2">`);
			if (unref(isSaving)) _push(ssrRenderComponent(_component_UBadge, {
				color: "yellow",
				variant: "subtle",
				size: "sm"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-arrow-path",
							class: "w-3 h-3 mr-1 animate-spin"
						}, null, _parent$1, _scopeId));
						_push$1(` 保存中... `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-3 h-3 mr-1 animate-spin"
					}), createTextVNode(" 保存中... ")];
				}),
				_: 1
			}, _parent));
			else if (unref(lastSaved)) _push(ssrRenderComponent(_component_UBadge, {
				color: "green",
				variant: "subtle",
				size: "sm"
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
			else _push(`<!---->`);
			_push(`<div class="flex items-center gap-2 px-3 py-1 bg-[#1a1a1b] rounded-lg border border-[#2a2a2b]">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-bolt",
				class: "w-4 h-4 text-[#00dc82]"
			}, null, _parent));
			_push(`<span class="text-sm text-[#9ca3af]">热更新</span>`);
			_push(ssrRenderComponent(_component_UToggle, {
				modelValue: unref(hotReloadEnabled),
				"onUpdate:modelValue": ($event) => isRef(hotReloadEnabled) ? hotReloadEnabled.value = $event : null,
				size: "sm",
				onChange: handleHotReloadToggle
			}, null, _parent));
			_push(`</div>`);
			_push(ssrRenderComponent(_component_UButton, {
				color: "primary",
				size: "sm",
				class: "bg-[#00dc82] hover:bg-[#00dc82]/80",
				onClick: restartBot,
				loading: unref(isRestarting),
				disabled: unref(hotReloadEnabled)
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-arrow-path",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 重启机器人 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 重启机器人 ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UButton, {
				color: "primary",
				size: "sm",
				class: "bg-[#00dc82] hover:bg-[#00dc82]/80",
				onClick: saveConfig,
				loading: unref(isSaving)
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-check",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` ${ssrInterpolate(unref(hotReloadEnabled) ? "保存并热更新" : "立即保存")}`);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-check",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" " + toDisplayString(unref(hotReloadEnabled) ? "保存并热更新" : "立即保存"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
			if (unref(showRestartProgress)) _push(`<div class="mt-3 flex justify-end"><div class="w-48"><div class="flex items-center justify-between text-xs text-[#9ca3af] mb-1"><span>重启进度</span><span>${ssrInterpolate(unref(restartProgress))}%</span></div><div class="w-full bg-[#2a2a2b] rounded-full h-2"><div class="bg-[#00dc82] h-2 rounded-full transition-all duration-300 ease-out" style="${ssrRenderStyle({ width: unref(restartProgress) + "%" })}"></div></div><div class="text-xs text-[#9ca3af] mt-1">${ssrInterpolate(unref(restartStatus))}</div></div></div>`);
			else _push(`<!---->`);
			_push(`</div><div class="p-4 space-y-6"><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-cog-6-tooth",
				class: "w-4 h-4 mr-2"
			}, null, _parent));
			_push(` 基础配置 </h4><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">Bot Token</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).token,
				"onUpdate:modelValue": ($event) => unref(botConfig).token = $event,
				placeholder: "请输入机器人令牌",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">管理员 ID</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).adminId,
				"onUpdate:modelValue": ($event) => unref(botConfig).adminId = $event,
				placeholder: "请输入管理员ID",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">客服链接</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).customerServiceId,
				"onUpdate:modelValue": ($event) => unref(botConfig).customerServiceId = $event,
				placeholder: "请输入客服链接",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">钱包地址</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).controlAddress,
				"onUpdate:modelValue": ($event) => unref(botConfig).controlAddress = $event,
				placeholder: "请输入钱包地址",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div class="md:col-span-2"><label class="block text-sm font-medium text-[#9ca3af] mb-2">机器人连接</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).tiaozhuan,
				"onUpdate:modelValue": ($event) => unref(botConfig).tiaozhuan = $event,
				placeholder: "请输入机器人连接",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-currency-dollar",
				class: "w-4 h-4 mr-2"
			}, null, _parent));
			_push(` 价格配置 </h4><div class="grid grid-cols-1 gap-4 md:grid-cols-3"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">3个月价格</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).threePrice,
				"onUpdate:modelValue": ($event) => unref(botConfig).threePrice = $event,
				type: "number",
				placeholder: "请输入3个月价格",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">6个月价格</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).sixPrice,
				"onUpdate:modelValue": ($event) => unref(botConfig).sixPrice = $event,
				type: "number",
				placeholder: "请输入6个月价格",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">年费价格</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).yearPrice,
				"onUpdate:modelValue": ($event) => unref(botConfig).yearPrice = $event,
				type: "number",
				placeholder: "请输入年费价格",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-globe-alt",
				class: "w-4 h-4 mr-2"
			}, null, _parent));
			_push(` 资源配置 </h4><div class="grid grid-cols-1 gap-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">资源哈希</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).resHash,
				"onUpdate:modelValue": ($event) => unref(botConfig).resHash = $event,
				placeholder: "请输入资源哈希",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">资源Cookie</label>`);
			_push(ssrRenderComponent(_component_UTextarea, {
				modelValue: unref(botConfig).resCookie,
				"onUpdate:modelValue": ($event) => unref(botConfig).resCookie = $event,
				placeholder: "请输入资源Cookie",
				class: "bg-[#0c0c0d]",
				rows: 3,
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">钱包助记词</label>`);
			_push(ssrRenderComponent(_component_UTextarea, {
				modelValue: unref(botConfig).walletMnemonic,
				"onUpdate:modelValue": ($event) => unref(botConfig).walletMnemonic = $event,
				placeholder: "请输入钱包助记词（用空格分隔）",
				class: "bg-[#0c0c0d]",
				rows: 2,
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-circle-stack",
				class: "w-4 h-4 mr-2"
			}, null, _parent));
			_push(` 数据库配置 </h4><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库主机</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).dbHost,
				"onUpdate:modelValue": ($event) => unref(botConfig).dbHost = $event,
				placeholder: "请输入数据库主机地址",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库端口</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).dbPort,
				"onUpdate:modelValue": ($event) => unref(botConfig).dbPort = $event,
				type: "number",
				placeholder: "请输入数据库端口",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库名称</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).dbName,
				"onUpdate:modelValue": ($event) => unref(botConfig).dbName = $event,
				placeholder: "请输入数据库名称",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库用户</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).dbUser,
				"onUpdate:modelValue": ($event) => unref(botConfig).dbUser = $event,
				placeholder: "请输入数据库用户名",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div><div class="md:col-span-2"><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库密码</label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).dbPassword,
				"onUpdate:modelValue": ($event) => unref(botConfig).dbPassword = $event,
				type: "password",
				placeholder: "请输入数据库密码",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-key",
				class: "w-4 h-4 mr-2"
			}, null, _parent));
			_push(` Tron API 配置 </h4><div class="grid grid-cols-1 gap-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2"> Tron API Key <span class="text-xs text-[#6b7280] ml-2">(来自 hy.py 文件)</span></label>`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(botConfig).tronApiKey,
				"onUpdate:modelValue": ($event) => unref(botConfig).tronApiKey = $event,
				placeholder: "请输入 Tron API Key",
				class: "bg-[#0c0c0d]",
				onInput: handleConfigChange
			}, null, _parent));
			_push(`<p class="mt-1 text-xs text-[#6b7280]"> 修改后将自动保存到 hy.py 文件中的 tron_api_key 变量 </p></div></div></div></div></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bots/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var bots_default = _sfc_main;
export { bots_default as default };

//# sourceMappingURL=bots-BnAOkfjA.js.map