import "./components-D5RLOpR9.js";
import "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import "./ui-G7Oicn0a.js";
import "./useFormGroup-ZK-CpXpd.js";
import "./Link-xfGBFWPh.js";
import "./useButtonGroup-1gNuWR3y.js";
import { t as Button_default } from "./Button-CMkth-mr.js";
import { t as Badge_default } from "./Badge-NTFE8zPq.js";
import { t as Textarea_default } from "./Textarea-Da68Uww6.js";
import { t as definePageMeta } from "./composables-BTIC2kjU.js";
import { createTextVNode, createVNode, isRef, mergeProps, ref, resolveComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
var _sfc_main = {
	__name: "contribution-guide",
	__ssrInlineRender: true,
	setup(__props) {
		const license = ref({
			status: "已激活",
			expiryDate: "2024-12-31",
			maxUsers: 100,
			currentUsers: 45,
			edition: "企业版",
			features: "全功能",
			remainingDays: 156,
			autoRenewal: true
		});
		const licenseDetails = ref({
			id: "TGP-ENT-2024-XXXX-XXXX-XXXX",
			issuer: "TG Pro Technologies",
			type: "年度授权",
			activatedAt: "2024-01-01 10:30:00",
			lastVerified: "2小时前"
		});
		const features = ref([
			{
				name: "机器人管理",
				description: "创建和管理多个Telegram机器人",
				icon: "i-heroicons-cpu-chip",
				enabled: true
			},
			{
				name: "用户管理",
				description: "管理用户权限和访问控制",
				icon: "i-heroicons-users",
				enabled: true
			},
			{
				name: "数据分析",
				description: "详细的使用统计和分析报告",
				icon: "i-heroicons-chart-bar",
				enabled: true
			},
			{
				name: "API 接口",
				description: "完整的REST API访问权限",
				icon: "i-heroicons-code-bracket",
				enabled: true
			},
			{
				name: "高级功能",
				description: "自定义插件和扩展功能",
				icon: "i-heroicons-puzzle-piece",
				enabled: false
			},
			{
				name: "技术支持",
				description: "7x24小时技术支持服务",
				icon: "i-heroicons-chat-bubble-left-right",
				enabled: true
			}
		]);
		const licenseHistory = ref([
			{
				id: 1,
				action: "授权激活",
				description: "成功激活企业版授权",
				date: "2024-01-01",
				time: "10:30:00",
				icon: "i-heroicons-check-circle"
			},
			{
				id: 2,
				action: "授权验证",
				description: "定期授权状态验证",
				date: "2024-01-15",
				time: "14:20:00",
				icon: "i-heroicons-shield-check"
			},
			{
				id: 3,
				action: "功能更新",
				description: "新增高级分析功能",
				date: "2024-02-01",
				time: "09:15:00",
				icon: "i-heroicons-arrow-up-circle"
			},
			{
				id: 4,
				action: "授权续期",
				description: "自动续期至2024年底",
				date: "2024-03-01",
				time: "00:00:00",
				icon: "i-heroicons-calendar-days"
			}
		]);
		const newLicenseKey = ref("");
		const verifying = ref(false);
		const updating = ref(false);
		const refreshing = ref(false);
		const copyLicenseId = () => {
			(void 0).clipboard.writeText(licenseDetails.value.id);
		};
		const verifyLicense = async () => {
			verifying.value = true;
			try {
				await new Promise((resolve) => setTimeout(resolve, 2e3));
				licenseDetails.value.lastVerified = "刚刚";
			} finally {
				verifying.value = false;
			}
		};
		const updateLicense = async () => {
			updating.value = true;
			try {
				await new Promise((resolve) => setTimeout(resolve, 3e3));
				newLicenseKey.value = "";
			} finally {
				updating.value = false;
			}
		};
		const validateKey = () => {};
		const selectFile = () => {};
		const loadMoreHistory = () => {};
		const refreshLicense = async () => {
			refreshing.value = true;
			try {
				await new Promise((resolve) => setTimeout(resolve, 2e3));
			} finally {
				refreshing.value = false;
			}
		};
		const exportLicense = () => {};
		const contactSupport = () => {};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = Icon_default;
			const _component_UButton = Button_default;
			const _component_UBadge = Badge_default;
			const _component_UTextarea = Textarea_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto space-y-6" }, _attrs))}><div class="text-center space-y-4"><div class="flex justify-center"><div class="w-16 h-16 bg-[#1a1a1b] border border-[#2a2a2b] rounded-2xl flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-key",
				class: "w-8 h-8 text-[#00dc82]"
			}, null, _parent));
			_push(`</div></div><h1 class="text-3xl font-bold text-white">更新授权</h1><p class="text-[#9ca3af] max-w-2xl mx-auto"> 管理系统授权许可、更新授权状态和许可证信息 </p></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h2 class="text-xl font-semibold text-white mb-4 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-shield-check",
				class: "w-5 h-5 mr-3 text-[#00dc82]"
			}, null, _parent));
			_push(` 当前授权状态 </h2><div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="text-center space-y-2"><div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-check-circle",
				class: "w-6 h-6 text-[#00dc82]"
			}, null, _parent));
			_push(`</div><div class="text-lg font-semibold text-white">${ssrInterpolate(unref(license).status)}</div><div class="text-sm text-[#00dc82]">授权状态</div><div class="text-xs text-[#9ca3af]">有效期至: ${ssrInterpolate(unref(license).expiryDate)}</div></div><div class="text-center space-y-2"><div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-users",
				class: "w-6 h-6 text-blue-400"
			}, null, _parent));
			_push(`</div><div class="text-lg font-semibold text-white">${ssrInterpolate(unref(license).maxUsers)}</div><div class="text-sm text-blue-400">最大用户数</div><div class="text-xs text-[#9ca3af]">当前: ${ssrInterpolate(unref(license).currentUsers)} 用户</div></div><div class="text-center space-y-2"><div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-server",
				class: "w-6 h-6 text-purple-400"
			}, null, _parent));
			_push(`</div><div class="text-lg font-semibold text-white">${ssrInterpolate(unref(license).edition)}</div><div class="text-sm text-purple-400">授权版本</div><div class="text-xs text-[#9ca3af]">功能: ${ssrInterpolate(unref(license).features)}</div></div><div class="text-center space-y-2"><div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-calendar-days",
				class: "w-6 h-6 text-orange-400"
			}, null, _parent));
			_push(`</div><div class="text-lg font-semibold text-white">${ssrInterpolate(unref(license).remainingDays)}</div><div class="text-sm text-orange-400">剩余天数</div><div class="text-xs text-[#9ca3af]">自动续期: ${ssrInterpolate(unref(license).autoRenewal ? "已启用" : "已禁用")}</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-document-text",
				class: "w-5 h-5 mr-3 text-[#00dc82]"
			}, null, _parent));
			_push(` 许可证详情 </h3><div class="space-y-4"><div class="flex items-center justify-between"><div><div class="text-white font-medium">许可证ID</div><div class="text-sm text-[#9ca3af] font-mono">${ssrInterpolate(unref(licenseDetails).id)}</div></div>`);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				size: "sm",
				onClick: copyLicenseId
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
						name: "i-heroicons-clipboard",
						class: "w-4 h-4"
					}, null, _parent$1, _scopeId));
					else return [createVNode(_component_UIcon, {
						name: "i-heroicons-clipboard",
						class: "w-4 h-4"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">授权机构</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(unref(licenseDetails).issuer)}</div></div></div><div class="flex items-center justify-between"><div><div class="text-white font-medium">授权类型</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(unref(licenseDetails).type)}</div></div>`);
			_push(ssrRenderComponent(_component_UBadge, {
				color: unref(licenseDetails).type === "永久授权" ? "green" : "blue",
				variant: "subtle"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`${ssrInterpolate(unref(licenseDetails).type)}`);
					else return [createTextVNode(toDisplayString(unref(licenseDetails).type), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">激活时间</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(unref(licenseDetails).activatedAt)}</div></div></div><div class="flex items-center justify-between"><div><div class="text-white font-medium">最后验证</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(unref(licenseDetails).lastVerified)}</div></div>`);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				size: "sm",
				onClick: verifyLicense,
				loading: unref(verifying)
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-4 h-4"
					}, null, _parent$1, _scopeId));
					else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-4 h-4"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-lock-closed",
				class: "w-5 h-5 mr-3 text-[#00dc82]"
			}, null, _parent));
			_push(` 功能权限 </h3><div class="space-y-4"><!--[-->`);
			ssrRenderList(unref(features), (feature) => {
				_push(`<div class="flex items-center justify-between"><div class="flex items-center space-x-3">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: feature.icon,
					class: "w-5 h-5 text-[#00dc82]"
				}, null, _parent));
				_push(`<div><div class="text-white font-medium">${ssrInterpolate(feature.name)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(feature.description)}</div></div></div><div class="flex items-center space-x-2">`);
				_push(ssrRenderComponent(_component_UBadge, {
					color: feature.enabled ? "green" : "gray",
					variant: "subtle",
					size: "xs"
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(`${ssrInterpolate(feature.enabled ? "已启用" : "未授权")}`);
						else return [createTextVNode(toDisplayString(feature.enabled ? "已启用" : "未授权"), 1)];
					}),
					_: 2
				}, _parent));
				_push(ssrRenderComponent(_component_UIcon, {
					name: feature.enabled ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
					class: [feature.enabled ? "text-[#00dc82]" : "text-red-400", "w-4 h-4"]
				}, null, _parent));
				_push(`</div></div>`);
			});
			_push(`<!--]--></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-arrow-up-circle",
				class: "w-5 h-5 mr-3 text-[#00dc82]"
			}, null, _parent));
			_push(` 更新授权 </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><div><label class="block text-white font-medium mb-2">新授权密钥</label>`);
			_push(ssrRenderComponent(_component_UTextarea, {
				modelValue: unref(newLicenseKey),
				"onUpdate:modelValue": ($event) => isRef(newLicenseKey) ? newLicenseKey.value = $event : null,
				placeholder: "请输入新的授权密钥...",
				rows: "4",
				class: "w-full"
			}, null, _parent));
			_push(`</div><div class="flex space-x-4">`);
			_push(ssrRenderComponent(_component_UButton, {
				onClick: updateLicense,
				loading: unref(updating),
				disabled: !unref(newLicenseKey)
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-key",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 更新授权 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-key",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 更新授权 ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				onClick: validateKey,
				disabled: !unref(newLicenseKey)
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-shield-check",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 验证密钥 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-shield-check",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 验证密钥 ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="space-y-4"><div><div class="text-white font-medium mb-2">授权文件上传</div><div class="border-2 border-dashed border-[#2a2a2b] rounded-lg p-6 text-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-cloud-arrow-up",
				class: "w-8 h-8 text-[#9ca3af] mx-auto mb-2"
			}, null, _parent));
			_push(`<div class="text-[#9ca3af] mb-2">拖拽授权文件到此处或</div>`);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				onClick: selectFile
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(` 选择文件 `);
					else return [createTextVNode(" 选择文件 ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-clock",
				class: "w-5 h-5 mr-3 text-[#00dc82]"
			}, null, _parent));
			_push(` 授权历史 </h3><div class="space-y-4"><!--[-->`);
			ssrRenderList(unref(licenseHistory), (history) => {
				_push(`<div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center space-x-4"><div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: history.icon,
					class: "w-5 h-5 text-[#00dc82]"
				}, null, _parent));
				_push(`</div><div><div class="text-white font-medium">${ssrInterpolate(history.action)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(history.description)}</div></div></div><div class="text-right"><div class="text-sm text-white">${ssrInterpolate(history.date)}</div><div class="text-xs text-[#9ca3af]">${ssrInterpolate(history.time)}</div></div></div>`);
			});
			_push(`<!--]--></div><div class="mt-6 flex justify-center">`);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				onClick: loadMoreHistory
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-arrow-down",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 加载更多 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-down",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 加载更多 ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="flex justify-center space-x-4">`);
			_push(ssrRenderComponent(_component_UButton, {
				onClick: refreshLicense,
				loading: unref(refreshing),
				size: "lg"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-arrow-path",
							class: "w-5 h-5 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 刷新授权 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-path",
						class: "w-5 h-5 mr-2"
					}), createTextVNode(" 刷新授权 ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				onClick: exportLicense,
				size: "lg"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-arrow-down-tray",
							class: "w-5 h-5 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 导出授权信息 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-down-tray",
						class: "w-5 h-5 mr-2"
					}), createTextVNode(" 导出授权信息 ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				onClick: contactSupport,
				size: "lg"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-chat-bubble-left-right",
							class: "w-5 h-5 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 联系支持 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-chat-bubble-left-right",
						class: "w-5 h-5 mr-2"
					}), createTextVNode(" 联系支持 ")];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/development/contribution-guide.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var contribution_guide_default = _sfc_main;
export { contribution_guide_default as default };

//# sourceMappingURL=contribution-guide-Cw-pZhM7.js.map