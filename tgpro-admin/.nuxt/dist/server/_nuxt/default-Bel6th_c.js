import { C as navigateTo, f as nuxt_link_default, m as useCookie, w as useRoute } from "../server.mjs";
import "./components-D5RLOpR9.js";
import "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import "./ui-G7Oicn0a.js";
import { t as Avatar_default } from "./Avatar-CBx6NXk5.js";
import "./Kbd-DfgTbPkH.js";
import "./keyboard-CvjRf4Wb.js";
import "./focus-management-DFaZHIRF.js";
import "./use-outside-click-B4rja7ys.js";
import "./use-resolve-button-type-eioNRL5V.js";
import "./calculate-active-index-B5ynhl2N.js";
import "./open-closed-Dsm1EOia.js";
import "./use-text-value-BRFxtlLF.js";
import { t as Dropdown_default } from "./Dropdown-CVzNln5Z.js";
import "./usePopper-CMZCG_Qh.js";
import { t as logo_default } from "./logo-C6xj12lo.js";
import { computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeProps, openBlock, ref, resolveComponent, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { Bars3Icon } from "@heroicons/vue/24/outline";
var default_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "default",
	__ssrInlineRender: true,
	setup(__props) {
		const sidebarOpen = ref(false);
		const isMobile = ref(false);
		const adminAvatar = ref("");
		const navigationGroups = [
			{
				name: "首页",
				icon: "i-heroicons-home",
				expanded: ref(true),
				items: [{
					name: "仪表板",
					href: "/dashboard",
					icon: "i-heroicons-squares-2x2"
				}]
			},
			{
				name: "管理",
				icon: "i-heroicons-cog-6-tooth",
				expanded: ref(true),
				items: [
					{
						name: "机器人管理",
						href: "/bots",
						icon: "i-heroicons-cpu-chip"
					},
					{
						name: "机器人命令",
						href: "/bot-commands",
						icon: "i-heroicons-command-line"
					},
					{
						name: "关键词回复",
						href: "/keyword-replies",
						icon: "i-heroicons-chat-bubble-left-right"
					},
					{
						name: "键盘按钮",
						href: "/keyboard-buttons",
						icon: "i-heroicons-rectangle-group"
					},
					{
						name: "内联键盘",
						href: "/inline-keyboards",
						icon: "i-heroicons-squares-plus"
					},
					{
						name: "用户管理",
						href: "/users",
						icon: "i-heroicons-users"
					},
					{
						name: "订单管理",
						href: "/orders",
						icon: "i-heroicons-shopping-bag"
					}
				]
			},
			{
				name: "设置",
				icon: "i-heroicons-cog-6-tooth",
				expanded: ref(false),
				items: [{
					name: "更新授权",
					href: "/license",
					icon: "i-heroicons-key"
				}, {
					name: "系统设置",
					href: "/development",
					icon: "i-heroicons-wrench-screwdriver"
				}]
			}
		];
		const handleLogout = () => {
			const isLoggedIn = useCookie("isLoggedIn", { default: () => false });
			isLoggedIn.value = false;
			navigateTo("/");
		};
		const userMenuItems = [[{
			label: "个人设置",
			icon: "i-heroicons-user-circle",
			click: () => console.log("个人设置")
		}, {
			label: "退出登录",
			icon: "i-heroicons-arrow-right-on-rectangle",
			click: handleLogout
		}]];
		const pageTitle = computed(() => {
			const route = useRoute();
			for (const group of navigationGroups) {
				const currentNav = group.items.find((item) => item.href === route.path);
				if (currentNav) return currentNav.name;
			}
			return "仪表板";
		});
		watch(() => useRoute().path, () => {
			if (isMobile.value) sidebarOpen.value = false;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = Icon_default;
			const _component_NuxtLink = nuxt_link_default;
			const _component_UDropdown = Dropdown_default;
			const _component_UAvatar = Avatar_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0c0c0d]" }, _attrs))}><div class="${ssrRenderClass([{
				"-translate-x-full": !unref(sidebarOpen) && unref(isMobile),
				"translate-x-0": unref(sidebarOpen) || !unref(isMobile)
			}, "fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a1b] border-r border-[#2a2a2b] lg:translate-x-0"])}"><div class="flex items-center justify-center h-20 px-4 border-b border-[#2a2a2b]"><img${ssrRenderAttr("src", logo_default)} alt="Logo" class="h-16 w-auto object-contain"></div><nav class="mt-4 px-2"><!--[-->`);
			ssrRenderList(navigationGroups, (group) => {
				_push(`<div class="mb-6"><button class="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#9ca3af] hover:text-white transition-colors group uppercase tracking-wider"><span class="flex items-center">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: group.icon,
					class: "w-4 h-4 mr-2"
				}, null, _parent));
				_push(` ${ssrInterpolate(group.name)}</span>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-heroicons-chevron-down",
					class: ["w-3 h-3 transition-transform duration-200", { "rotate-180": group.expanded.value }]
				}, null, _parent));
				_push(`</button><div class="mt-1 space-y-0.5 relative" style="${ssrRenderStyle(group.expanded.value ? null : { display: "none" })}"><div class="absolute left-3 top-0 bottom-0 w-px bg-[#374151]"></div><!--[-->`);
				ssrRenderList(group.items, (item) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: item.name,
						to: item.href,
						class: ["flex items-center pl-6 pr-3 py-2 text-sm transition-all group relative ml-3", {
							"text-[#00dc82]": _ctx.$route.path === item.href,
							"text-[#9ca3af] hover:text-white": _ctx.$route.path !== item.href
						}]
					}, {
						default: withCtx((_, _push$1, _parent$1, _scopeId) => {
							if (_push$1) {
								if (_ctx.$route.path === item.href) _push$1(`<div class="absolute left-0 top-0 bottom-0 w-px bg-[#00dc82]"${_scopeId}></div>`);
								else _push$1(`<!---->`);
								_push$1(ssrRenderComponent(_component_UIcon, {
									name: item.icon,
									class: ["w-4 h-4 mr-3 transition-colors", {
										"text-[#00dc82]": _ctx.$route.path === item.href,
										"text-[#9ca3af] group-hover:text-white": _ctx.$route.path !== item.href
									}]
								}, null, _parent$1, _scopeId));
								_push$1(` ${ssrInterpolate(item.name)}`);
							} else return [
								_ctx.$route.path === item.href ? (openBlock(), createBlock("div", {
									key: 0,
									class: "absolute left-0 top-0 bottom-0 w-px bg-[#00dc82]"
								})) : createCommentVNode("", true),
								createVNode(_component_UIcon, {
									name: item.icon,
									class: ["w-4 h-4 mr-3 transition-colors", {
										"text-[#00dc82]": _ctx.$route.path === item.href,
										"text-[#9ca3af] group-hover:text-white": _ctx.$route.path !== item.href
									}]
								}, null, 8, ["name", "class"]),
								createTextVNode(" " + toDisplayString(item.name), 1)
							];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></div>`);
			});
			_push(`<!--]--></nav></div><div class="lg:pl-64"><div class="sticky top-0 z-40 flex h-16 bg-[#1a1a1b] border-b border-[#2a2a2b]"><button class="px-4 text-[#9ca3af] hover:text-[#00dc82] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00dc82] lg:hidden transition-colors">`);
			_push(ssrRenderComponent(unref(Bars3Icon), { class: "w-6 h-6" }, null, _parent));
			_push(`</button><div class="flex justify-between flex-1 px-4"><div class="flex items-center"><h2 class="text-lg font-semibold text-white">${ssrInterpolate(unref(pageTitle))}</h2></div><div class="flex items-center">`);
			_push(ssrRenderComponent(_component_UDropdown, {
				items: userMenuItems,
				popper: { placement: "bottom-start" }
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(`<div class="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#2a2a2b] transition-all"${_scopeId}>`);
						_push$1(ssrRenderComponent(_component_UAvatar, {
							src: unref(adminAvatar),
							alt: "管理员头像",
							size: "sm"
						}, null, _parent$1, _scopeId));
						_push$1(`<div class="hidden md:block text-sm"${_scopeId}><div class="font-medium text-white"${_scopeId}>Admin</div><div class="text-[#9ca3af]"${_scopeId}>管理员</div></div></div>`);
					} else return [createVNode("div", { class: "flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#2a2a2b] transition-all" }, [createVNode(_component_UAvatar, {
						src: unref(adminAvatar),
						alt: "管理员头像",
						size: "sm"
					}, null, 8, ["src"]), createVNode("div", { class: "hidden md:block text-sm" }, [createVNode("div", { class: "font-medium text-white" }, "Admin"), createVNode("div", { class: "text-[#9ca3af]" }, "管理员")])])];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div><main class="p-6 bg-[#0c0c0d] min-h-screen">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main></div>`);
			if (unref(sidebarOpen)) _push(`<div class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-all"></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
var _sfc_setup = default_vue_vue_type_script_setup_true_lang_default.setup;
default_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = default_vue_vue_type_script_setup_true_lang_default;
export { default_default as default };

//# sourceMappingURL=default-Bel6th_c.js.map