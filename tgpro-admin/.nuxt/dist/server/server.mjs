import { Fragment, Suspense, Transition, cloneVNode, computed, createApp, createElementBlock, createVNode, defineAsyncComponent, defineComponent, effectScope, getCurrentInstance, getCurrentScope, h, hasInjectionContext, inject, isReactive, isReadonly, isRef, isShallow, mergeProps, nextTick, onErrorCaptured, onServerPrefetch, provide, reactive, ref, resolveComponent, resolveDynamicComponent, shallowReactive, shallowRef, toRaw, toRef, toValue, unref, useId, useSSRContext, watch, withCtx } from "vue";
import { $fetch as $fetch$1 } from "ofetch";
import { baseURL } from "#internal/nuxt/paths";
import { createHooks } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/hookable/dist/index.mjs";
import { executeAsync, getContext } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/unctx/dist/index.mjs";
import { createError, deleteCookie, getCookie, getRequestHeader, getRequestHeaders, sanitizeStatusCode, setCookie } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/h3/dist/index.mjs";
import { hasProtocol, isScriptProtocol, joinURL, parseQuery, withQuery, withTrailingSlash, withoutTrailingSlash } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/ufo/dist/index.mjs";
import { RouterView, START_LOCATION, START_LOCATION as START_LOCATION$1, createMemoryHistory, createRouter, useRoute as useRoute$1 } from "vue-router";
import { createRouter as createRouter$1, toRouteMatcher } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/radix3/dist/index.mjs";
import { createDefu, defu, defuFn } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/defu/dist/defu.mjs";
import { headSymbol, useHead } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/@unhead/vue/dist/index.mjs";
import { isEqual } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/ohash/dist/index.mjs";
import { debounce } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/perfect-debounce/dist/index.mjs";
import { parse } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import destr from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/destr/dist/index.mjs";
import { klona } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/klona/dist/index.mjs";
import { createSharedComposable } from "@vueuse/core";
import { extendTailwindMerge } from "tailwind-merge";
import { _api, addAPIProvider, setCustomIconsLoader } from "@iconify/vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (all) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
if (!globalThis.$fetch) globalThis.$fetch = $fetch$1.create({ baseURL: baseURL() });
if (!("global" in globalThis)) globalThis.global = globalThis;
const nuxtLinkDefaults = {
	"componentName": "NuxtLink",
	"prefetch": true,
	"prefetchOn": { "visibility": true }
};
const asyncDataDefaults = {
	"value": null,
	"errorValue": null,
	"deep": true
};
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		globalName: "nuxt",
		versions: {
			get nuxt() {
				return "3.20.0";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const contextCaller = async function(hooks, args) {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin$2) {
	if (plugin$2.hooks) nuxtApp.hooks.addHooks(plugin$2.hooks);
}
async function applyPlugin(nuxtApp, plugin$2) {
	if (typeof plugin$2 === "function") {
		const { provide: provide$1 } = await nuxtApp.runWithContext(() => plugin$2(nuxtApp)) || {};
		if (provide$1 && typeof provide$1 === "object") for (const key in provide$1) nuxtApp.provide(key, provide$1[key]);
	}
}
async function applyPlugins(nuxtApp, plugins) {
	const resolvedPlugins = /* @__PURE__ */ new Set();
	const unresolvedPlugins = [];
	const parallels = [];
	let error = void 0;
	let promiseDepth = 0;
	async function executePlugin(plugin$2) {
		const unresolvedPluginsForThisPlugin = plugin$2.dependsOn?.filter((name) => plugins.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
		if (unresolvedPluginsForThisPlugin.length > 0) unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin$2]);
		else {
			const promise = applyPlugin(nuxtApp, plugin$2).then(async () => {
				if (plugin$2._name) {
					resolvedPlugins.add(plugin$2._name);
					await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
						if (dependsOn.has(plugin$2._name)) {
							dependsOn.delete(plugin$2._name);
							if (dependsOn.size === 0) {
								promiseDepth++;
								await executePlugin(unexecutedPlugin);
							}
						}
					}));
				}
			}).catch((e) => {
				if (!plugin$2.parallel && !nuxtApp.payload.error) throw e;
				error ||= e;
			});
			if (plugin$2.parallel) parallels.push(promise);
			else await promise;
		}
	}
	for (const plugin$2 of plugins) {
		if (nuxtApp.ssrContext?.islandContext && plugin$2.env?.islands === false) continue;
		registerPluginHooks(nuxtApp, plugin$2);
	}
	for (const plugin$2 of plugins) {
		if (nuxtApp.ssrContext?.islandContext && plugin$2.env?.islands === false) continue;
		await executePlugin(plugin$2);
	}
	await Promise.all(parallels);
	if (promiseDepth) for (let i = 0; i < promiseDepth; i++) await Promise.all(parallels);
	if (error) throw nuxtApp.payload.error || error;
}
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin$2) {
	if (typeof plugin$2 === "function") return plugin$2;
	const _name = plugin$2._name || plugin$2.name;
	delete plugin$2.name;
	return Object.assign(plugin$2.setup || (() => {}), plugin$2, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
function callWithNuxt(nuxt, setup, args) {
	const fn = () => args ? setup(...args) : setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw new Error("[nuxt] instance unavailable");
	return nuxtAppInstance;
}
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
import.meta.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
	return useNuxtApp()?.$router;
};
const useRoute = () => {
	if (hasInjectionContext()) return inject(PageRouteSymbol, useNuxtApp()._route);
	return useNuxtApp()._route;
};
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
		const { protocol } = new URL(toPath, "http://localhost");
		if (protocol && isScriptProtocol(protocol)) throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
			const encodedHeader = encodeURL(location2, isExternalHost);
			nuxtApp.ssrContext._renderResponse = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._scope.stop();
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
	const url = new URL(location2, "http://localhost");
	if (!isExternalHost) return url.pathname + url.search + url.hash;
	if (location2.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
	const nuxtError = createError$1(error);
	try {
		const error2 = /* @__PURE__ */ useError();
		error2.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
const createError$1 = (error) => {
	const nuxtError = createError(error);
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	return nuxtError;
};
var unhead_default = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		nuxtApp.vueApp.use(head);
	}
});
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	useNuxtApp().ssrContext._preloadManifest = true;
	return defu({}, ...toRouteMatcher(createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })).matchAll(path).reverse());
}
var index_vue_macro_true_vue_type_script_setup_true_lang_default = { layout: false };
var dashboard_default = {
	title: "系统仪表板",
	description: "监控系统状态和性能指标"
};
var bots_default = {
	title: "机器人管理",
	description: "管理和配置 Telegram 机器人"
};
var index_vue_macro_true_vue_type_script_setup_true_lang_default$1 = { title: "用户管理" };
var license_default = {
	title: "授权管理",
	description: "管理许可证授权和服务器IP绑定"
};
var dashboard_backup_default = { title: "仪表板" };
var development_default = {
	title: "更新授权",
	description: "管理系统的OTA更新、版本检测和自动升级功能"
};
var contribution_guide_default = {
	title: "更新授权",
	description: "管理系统授权许可、更新授权状态和许可证信息"
};
var virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Froutes_default = [
	{
		name: "index",
		path: "/",
		meta: index_vue_macro_true_vue_type_script_setup_true_lang_default || {},
		component: () => import("./_nuxt/pages-9WyMgO--.js")
	},
	{
		name: "dashboard",
		path: "/dashboard",
		meta: dashboard_default || {},
		component: () => import("./_nuxt/dashboard-C3n27BAI.js")
	},
	{
		name: "bots",
		path: "/bots",
		meta: {
			...bots_default || {},
			"middleware": "auth"
		},
		component: () => import("./_nuxt/bots-BnAOkfjA.js")
	},
	{
		name: "users",
		path: "/users",
		meta: {
			...index_vue_macro_true_vue_type_script_setup_true_lang_default$1 || {},
			"middleware": "auth"
		},
		component: () => import("./_nuxt/users-FX6bDaAf.js")
	},
	{
		name: "orders",
		path: "/orders",
		meta: { "middleware": "auth" },
		component: () => import("./_nuxt/orders-PpKj65Nq.js")
	},
	{
		name: "license",
		path: "/license",
		meta: {
			...license_default || {},
			"middleware": "auth"
		},
		component: () => import("./_nuxt/license-Cfm2MCeS.js")
	},
	{
		name: "analytics",
		path: "/analytics",
		meta: { "middleware": "auth" },
		component: () => import("./_nuxt/analytics-RnSPW9BI.js")
	},
	{
		name: "dashboard-backup",
		path: "/dashboard-backup",
		meta: dashboard_backup_default || {},
		component: () => import("./_nuxt/dashboard-backup-C0wWEG-8.js")
	},
	{
		name: "development",
		path: "/development",
		meta: development_default || {},
		component: () => import("./_nuxt/development-APhzOOll.js")
	},
	{
		name: "bot-commands",
		path: "/bot-commands",
		meta: { "middleware": "auth" },
		component: () => import("./_nuxt/bot-commands-DzTujP91.js")
	},
	{
		name: "keyword-replies",
		path: "/keyword-replies",
		meta: { "middleware": "auth" },
		component: () => import("./_nuxt/keyword-replies-DIfUHKLE.js")
	},
	{
		name: "inline-keyboards",
		path: "/inline-keyboards",
		meta: { "middleware": "auth" },
		component: () => import("./_nuxt/inline-keyboards-BfKJS_G3.js")
	},
	{
		name: "keyboard-buttons",
		path: "/keyboard-buttons",
		meta: { "middleware": "auth" },
		component: () => import("./_nuxt/keyboard-buttons-BCfnWmSm.js")
	},
	{
		name: "development-contribution-guide",
		path: "/development/contribution-guide",
		meta: contribution_guide_default || {},
		component: () => import("./_nuxt/contribution-guide-Cw-pZhM7.js")
	}
];
const _wrapInTransition = (props, children) => {
	return { default: () => children.default?.() };
};
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
	const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
	return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION$1) return false;
	if (generateRouteKey(to) !== generateRouteKey(from)) return true;
	if (to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default)) return false;
	return true;
}
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
	return new Promise((resolve) => {
		if (from === START_LOCATION) {
			resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
			return;
		}
		nuxtApp.hooks.hookOnce(hookToWait, () => {
			requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
		});
	});
} };
function _getHashElementScrollMarginTop(selector) {
	try {
		const elem = (void 0).querySelector(selector);
		if (elem) return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
	} catch {}
	return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	const isPageNavigation = isChangingPage(to, from);
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	...router_options_default
};
const globalMiddleware = [/* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError$1({
		fatal: false,
		statusCode: result && result.statusCode || 404,
		statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
}, 1), /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {}, 1)];
const namedMiddleware = { auth: () => import("./_nuxt/auth-Dd1UmxXA.js") };
var router_default = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
		const history = virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Froutes_default : virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
				}
			},
			history,
			routes
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		nuxtApp.hook("page:finish", syncCurrentRoute);
		router.afterEach((to, from) => {
			if (to.matched[to.matched.length - 1]?.components?.default === from.matched[from.matched.length - 1]?.components?.default) syncCurrentRoute();
		});
		const route = {};
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		if (!nuxtApp.ssrContext?.islandContext) router.afterEach(async (to, _from, failure) => {
			delete nuxtApp._processingMiddleware;
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error2) {
			[__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			if (!nuxtApp.ssrContext?.islandContext) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry$1 of toArray(componentMiddleware)) middlewareEntries.add(entry$1);
				}
				{
					const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
					if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
					else middlewareEntries.delete(key);
				}
				for (const entry$1 of middlewareEntries) {
					const middleware = typeof entry$1 === "string" ? nuxtApp._middleware.named[entry$1] || await namedMiddleware[entry$1]?.().then((r) => r.default || r) : entry$1;
					if (!middleware) throw new Error(`Unknown route middleware: '${entry$1}'.`);
					try {
						const result = await nuxtApp.runWithContext(() => middleware(to, from));
						if (result === false || result instanceof Error) {
							const error2 = result || createError$1({
								statusCode: 404,
								statusMessage: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error2));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error2 = createError$1(err);
						if (error2.fatal) await nuxtApp.runWithContext(() => showError(error2));
						return error2;
					}
				}
			}
		});
		router.onError(async () => {
			delete nuxtApp._processingMiddleware;
			await nuxtApp.callHook("page:loading:end");
		});
		router.afterEach((to) => {
			if (to.matched.length === 0) return nuxtApp.runWithContext(() => showError(createError$1({
				statusCode: 404,
				fatal: false,
				statusMessage: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error2) {
				await nuxtApp.runWithContext(() => showError(error2));
			}
		});
		return { provide: { router } };
	}
}, 1);
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || tryUseNuxtApp();
	return nuxt?.ssrContext?.head || nuxt?.runWithContext(() => {
		if (hasInjectionContext()) return inject(headSymbol);
	});
}
function useHead$1(input, options = {}) {
	const head = injectHead(options.nuxt);
	if (head) return useHead(input, {
		head,
		...options
	});
}
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext._payloadReducers[name] = reduce;
}
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
var revive_payload_server_default = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:revive-payload:server",
	setup() {
		for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
	}
});
var capi_exports = /* @__PURE__ */ __export({
	del: () => del,
	install: () => install,
	set: () => set
});
import * as import_vue from "vue";
__reExport(capi_exports, import_vue);
const install = () => {};
function set(target, key, val) {
	if (Array.isArray(target)) {
		target.length = Math.max(target.length, key);
		target.splice(key, 1, val);
		return val;
	}
	target[key] = val;
	return val;
}
function del(target, key) {
	if (Array.isArray(target)) {
		target.splice(key, 1);
		return;
	}
	delete target[key];
}
var vue_demi_exports = /* @__PURE__ */ __export({
	Vue2: () => void 0,
	del: () => del,
	install: () => install,
	isVue2: () => false,
	isVue3: () => true,
	set: () => set
});
__reExport(vue_demi_exports, capi_exports);
var setActivePinia = (pinia) => pinia;
var piniaSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia") : Symbol();
var MutationType;
(function(MutationType$1) {
	MutationType$1["direct"] = "direct";
	MutationType$1["patchObject"] = "patch object";
	MutationType$1["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
var IS_CLIENT = false;
var { assign: assign$1 } = Object;
function createPinia() {
	const scope = (0, vue_demi_exports.effectScope)(true);
	const state = scope.run(() => (0, vue_demi_exports.ref)({}));
	let _p = [];
	let toBeInstalled = [];
	const pinia = (0, vue_demi_exports.markRaw)({
		install(app) {
			setActivePinia(pinia);
			pinia._a = app;
			app.provide(piniaSymbol, pinia);
			app.config.globalProperties.$pinia = pinia;
			/* istanbul ignore else */
			if ((process.env.NODE_ENV !== "production" || false) && !(process.env.NODE_ENV === "test") && IS_CLIENT);
			toBeInstalled.forEach((plugin$2) => _p.push(plugin$2));
			toBeInstalled = [];
		},
		use(plugin$2) {
			if (!this._a && true) toBeInstalled.push(plugin$2);
			else _p.push(plugin$2);
			return this;
		},
		_p,
		_a: null,
		_e: scope,
		_s: /* @__PURE__ */ new Map(),
		state
	});
	if ((process.env.NODE_ENV !== "production" || false) && !(process.env.NODE_ENV === "test") && IS_CLIENT);
	return pinia;
}
process.env.NODE_ENV;
var { assign } = Object;
var server_placeholder_default$2 = defineComponent({
	name: "ServerPlaceholder",
	render() {
		return createElementBlock("div");
	}
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
	name: "ClientOnly",
	inheritAttrs: false,
	props: [
		"fallback",
		"placeholder",
		"placeholderTag",
		"fallbackTag"
	],
	setup(props, { slots, attrs }) {
		const mounted = shallowRef(false);
		const vm = getCurrentInstance();
		if (vm) vm._nuxtClientOnly = true;
		provide(clientOnlySymbol, true);
		return () => {
			if (mounted.value) {
				const vnodes = slots.default?.();
				if (vnodes && vnodes.length === 1) return [cloneVNode(vnodes[0], attrs)];
				return vnodes;
			}
			const slot = slots.fallback || slots.placeholder;
			if (slot) return h(slot);
			const fallbackStr = props.fallback || props.placeholder || "";
			return createElementBlock(props.fallbackTag || props.placeholderTag || "span", attrs, fallbackStr);
		};
	}
});
var isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (_isAutoKeyNeeded(args[0], args[1])) args.unshift(autoKey);
	let [_key, _handler, options = {}] = args;
	const key = computed(() => toValue(_key));
	if (typeof key.value !== "string") throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
	if (typeof _handler !== "function") throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
	const nuxtApp = useNuxtApp();
	options.server ??= true;
	options.default ??= getDefault;
	options.getCachedData ??= getDefaultCachedData;
	options.lazy ??= false;
	options.immediate ??= true;
	options.deep ??= asyncDataDefaults.deep;
	options.dedupe ??= "cancel";
	options._functionName;
	nuxtApp._asyncData[key.value];
	function createInitialFetch() {
		const initialFetchOptions = {
			cause: "initial",
			dedupe: options.dedupe
		};
		if (!nuxtApp._asyncData[key.value]?._init) {
			initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
			nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
		}
		return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
	}
	const initialFetch = createInitialFetch();
	const asyncData = nuxtApp._asyncData[key.value];
	asyncData._deps++;
	if (options.server !== false && nuxtApp.payload.serverRendered && options.immediate) {
		const promise = initialFetch();
		if (getCurrentInstance()) onServerPrefetch(() => promise);
		else nuxtApp.hook("app:created", async () => {
			await promise;
		});
	}
	const asyncReturn = {
		data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
		pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
		status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
		error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
		refresh: (...args2) => {
			if (!nuxtApp._asyncData[key.value]?._init) return createInitialFetch()();
			return nuxtApp._asyncData[key.value].execute(...args2);
		},
		execute: (...args2) => asyncReturn.refresh(...args2),
		clear: () => {
			const entry$1 = nuxtApp._asyncData[key.value];
			if (entry$1?._abortController) try {
				entry$1._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
			} finally {
				entry$1._abortController = void 0;
			}
			clearNuxtDataByKey(nuxtApp, key.value);
		}
	};
	const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
	Object.assign(asyncDataPromise, asyncReturn);
	return asyncDataPromise;
}
function writableComputedRef(getter) {
	return computed({
		get() {
			return getter()?.value;
		},
		set(value) {
			const ref2 = getter();
			if (ref2) ref2.value = value;
		}
	});
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
	if (typeof keyOrFetcher === "string") return false;
	if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) return false;
	if (typeof keyOrFetcher === "function" && typeof fetcher === "function") return false;
	return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
	if (key in nuxtApp.payload.data) nuxtApp.payload.data[key] = void 0;
	if (key in nuxtApp.payload._errors) nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
	if (nuxtApp._asyncData[key]) {
		nuxtApp._asyncData[key].data.value = void 0;
		nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
		nuxtApp._asyncData[key].pending.value = false;
		nuxtApp._asyncData[key].status.value = "idle";
	}
	if (key in nuxtApp._asyncDataPromises) nuxtApp._asyncDataPromises[key] = void 0;
}
function pick(obj, keys) {
	const newObj = {};
	for (const key of keys) newObj[key] = obj[key];
	return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
	nuxtApp.payload._errors[key] ??= asyncDataDefaults.errorValue;
	const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
	const handler = !import.meta.prerender || !nuxtApp.ssrContext?._sharedPrerenderCache ? _handler : (nuxtApp2, options2) => {
		const value = nuxtApp2.ssrContext._sharedPrerenderCache.get(key);
		if (value) return value;
		const promise = Promise.resolve().then(() => nuxtApp2.runWithContext(() => _handler(nuxtApp2, options2)));
		nuxtApp2.ssrContext._sharedPrerenderCache.set(key, promise);
		return promise;
	};
	const _ref = options.deep ? ref : shallowRef;
	const hasCachedData = initialCachedData != null;
	const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
		if (!keys || keys.includes(key)) await asyncData.execute({ cause: "refresh:hook" });
	});
	const asyncData = {
		data: _ref(hasCachedData ? initialCachedData : options.default()),
		pending: shallowRef(!hasCachedData),
		error: toRef(nuxtApp.payload._errors, key),
		status: shallowRef("idle"),
		execute: (...args) => {
			const [_opts, newValue = void 0] = args;
			const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
			if (nuxtApp._asyncDataPromises[key]) {
				if (isDefer(opts.dedupe ?? options.dedupe)) return nuxtApp._asyncDataPromises[key];
			}
			if (opts.cause === "initial" || nuxtApp.isHydrating) {
				const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
				if (cachedData != null) {
					nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
					asyncData.error.value = asyncDataDefaults.errorValue;
					asyncData.status.value = "success";
					return Promise.resolve(cachedData);
				}
			}
			asyncData.pending.value = true;
			if (asyncData._abortController) asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
			asyncData._abortController = new AbortController();
			asyncData.status.value = "pending";
			const promise = new Promise((resolve, reject) => {
				try {
					const timeout = opts.timeout ?? options.timeout;
					const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], timeout);
					if (mergedSignal.aborted) {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
						return;
					}
					mergedSignal.addEventListener("abort", () => {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
					}, { once: true });
					return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
				} catch (err) {
					reject(err);
				}
			}).then(async (_result) => {
				let result = _result;
				if (options.transform) result = await options.transform(_result);
				if (options.pick) result = pick(result, options.pick);
				nuxtApp.payload.data[key] = result;
				asyncData.data.value = result;
				asyncData.error.value = asyncDataDefaults.errorValue;
				asyncData.status.value = "success";
			}).catch((error) => {
				if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) return;
				if (asyncData._abortController?.signal.aborted) return;
				if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
					asyncData.status.value = "idle";
					return;
				}
				asyncData.error.value = createError$1(error);
				asyncData.data.value = unref(options.default());
				asyncData.status.value = "error";
			}).finally(() => {
				asyncData.pending.value = false;
				delete nuxtApp._asyncDataPromises[key];
			});
			nuxtApp._asyncDataPromises[key] = promise;
			return nuxtApp._asyncDataPromises[key];
		},
		_execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
		_default: options.default,
		_deps: 0,
		_init: true,
		_hash: void 0,
		_off: () => {
			unsubRefreshAsyncData();
			if (nuxtApp._asyncData[key]?._init) nuxtApp._asyncData[key]._init = false;
			if (!hasCustomGetCachedData) nextTick(() => {
				if (!nuxtApp._asyncData[key]?._init) {
					clearNuxtDataByKey(nuxtApp, key);
					asyncData.execute = () => Promise.resolve();
					asyncData.data.value = asyncDataDefaults.value;
				}
			});
		}
	};
	return asyncData;
}
var getDefault = () => asyncDataDefaults.value;
var getDefaultCachedData = (key, nuxtApp, ctx) => {
	if (nuxtApp.isHydrating) return nuxtApp.payload.data[key];
	if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") return nuxtApp.static.data[key];
};
function mergeAbortSignals(signals, timeout) {
	const list = signals.filter((s) => !!s);
	if (typeof timeout === "number" && timeout >= 0) {
		const timeoutSignal = AbortSignal.timeout?.(timeout);
		if (timeoutSignal) list.push(timeoutSignal);
	}
	if (AbortSignal.any) return AbortSignal.any(list);
	const controller = new AbortController();
	for (const sig of list) if (sig.aborted) {
		const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
		return controller.signal;
	}
	const onAbort = () => {
		const reason = list.find((s) => s.aborted)?.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
	};
	for (const sig of list) sig.addEventListener?.("abort", onAbort, { once: true });
	return controller.signal;
}
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
	if (init !== void 0 && typeof init !== "function") throw new Error("[nuxt] [useState] init must be a function: " + init);
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return initialValue;
		}
		state.value = initialValue;
	}
	return state;
}
function useRequestEvent(nuxtApp) {
	nuxtApp ||= useNuxtApp();
	return nuxtApp.ssrContext?.event;
}
var CookieDefaults = {
	path: "/",
	watch: true,
	decode: (val) => destr(decodeURIComponent(val)),
	encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
	const opts = {
		...CookieDefaults,
		..._opts
	};
	opts.filter ??= (key) => key === name;
	const cookies = readRawCookies(opts) || {};
	let delay;
	if (opts.maxAge !== void 0) delay = opts.maxAge * 1e3;
	else if (opts.expires) delay = opts.expires.getTime() - Date.now();
	const cookie = ref(klona(delay !== void 0 && delay <= 0 ? void 0 : cookies[name] ?? opts.default?.()));
	{
		const nuxtApp = useNuxtApp();
		const writeFinalCookieValue = () => {
			if (opts.readonly || isEqual(cookie.value, cookies[name])) return;
			nuxtApp._cookies ||= {};
			if (name in nuxtApp._cookies) {
				if (isEqual(cookie.value, nuxtApp._cookies[name])) return;
			}
			nuxtApp._cookies[name] = cookie.value;
			writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
		};
		const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
		nuxtApp.hooks.hookOnce("app:error", () => {
			unhook();
			return writeFinalCookieValue();
		});
	}
	return cookie;
}
function readRawCookies(opts = {}) {
	return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
}
function writeServerCookie(event, name, value, opts = {}) {
	if (event) {
		if (value !== null && value !== void 0) return setCookie(event, name, value, opts);
		if (getCookie(event, name) !== void 0) return deleteCookie(event, name, opts);
	}
}
const useId$1 = useId;
var firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtLink(options) {
	const componentName = options.componentName || "NuxtLink";
	function checkPropConflicts(props, main, sub) {}
	function isHashLinkWithoutHashMode(link) {
		return typeof link === "string" && link.startsWith("#");
	}
	function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
		const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
		if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") return to;
		if (typeof to === "string") return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
		const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
		return {
			...to,
			name: void 0,
			path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
		};
	}
	function useNuxtLink(props) {
		const router = useRouter();
		const config$1 = /* @__PURE__ */ useRuntimeConfig();
		const hasTarget = computed(() => !!props.target && props.target !== "_self");
		const isAbsoluteUrl = computed(() => {
			const path = props.to || props.href || "";
			return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
		});
		const builtinRouterLink = resolveComponent("RouterLink");
		const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
		const isExternal = computed(() => {
			if (props.external) return true;
			const path = props.to || props.href || "";
			if (typeof path === "object") return false;
			return path === "" || isAbsoluteUrl.value;
		});
		const to = computed(() => {
			checkPropConflicts(props, "to", "href");
			const path = props.to || props.href || "";
			if (isExternal.value) return path;
			return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
		});
		const link = isExternal.value ? void 0 : useBuiltinLink?.({
			...props,
			to
		});
		const href = computed(() => {
			const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
			if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) return to.value;
			if (isExternal.value) {
				const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
				return applyTrailingSlashBehavior(typeof path === "object" ? router.resolve(path).href : path, effectiveTrailingSlash);
			}
			if (typeof to.value === "object") return router.resolve(to.value)?.href ?? null;
			return applyTrailingSlashBehavior(joinURL(config$1.app.baseURL, to.value), effectiveTrailingSlash);
		});
		return {
			to,
			hasTarget,
			isAbsoluteUrl,
			isExternal,
			href,
			isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
			isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
			route: link?.route ?? computed(() => router.resolve(to.value)),
			async navigate(_e) {
				await navigateTo(href.value, {
					replace: props.replace,
					external: isExternal.value || hasTarget.value
				});
			}
		};
	}
	return defineComponent({
		name: componentName,
		props: {
			to: {
				type: [String, Object],
				default: void 0,
				required: false
			},
			href: {
				type: [String, Object],
				default: void 0,
				required: false
			},
			target: {
				type: String,
				default: void 0,
				required: false
			},
			rel: {
				type: String,
				default: void 0,
				required: false
			},
			noRel: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetchOn: {
				type: [String, Object],
				default: void 0,
				required: false
			},
			noPrefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			activeClass: {
				type: String,
				default: void 0,
				required: false
			},
			exactActiveClass: {
				type: String,
				default: void 0,
				required: false
			},
			prefetchedClass: {
				type: String,
				default: void 0,
				required: false
			},
			replace: {
				type: Boolean,
				default: void 0,
				required: false
			},
			ariaCurrentValue: {
				type: String,
				default: void 0,
				required: false
			},
			external: {
				type: Boolean,
				default: void 0,
				required: false
			},
			custom: {
				type: Boolean,
				default: void 0,
				required: false
			},
			trailingSlash: {
				type: String,
				default: void 0,
				required: false
			}
		},
		useLink: useNuxtLink,
		setup(props, { slots }) {
			const router = useRouter();
			const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
			shallowRef(false);
			const el = void 0;
			const elRef = void 0;
			async function prefetch(nuxtApp = useNuxtApp()) {}
			return () => {
				if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
					const routerLinkProps = {
						ref: elRef,
						to: to.value,
						activeClass: props.activeClass || options.activeClass,
						exactActiveClass: props.exactActiveClass || options.exactActiveClass,
						replace: props.replace,
						ariaCurrentValue: props.ariaCurrentValue,
						custom: props.custom
					};
					if (!props.custom) routerLinkProps.rel = props.rel || void 0;
					return h(resolveComponent("RouterLink"), routerLinkProps, slots.default);
				}
				const target = props.target || null;
				checkPropConflicts(props, "noRel", "rel");
				const rel = firstNonUndefined(props.noRel ? "" : props.rel, options.externalRelAttribute, isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : "") || null;
				if (props.custom) {
					if (!slots.default) return null;
					return slots.default({
						href: href.value,
						navigate,
						prefetch,
						get route() {
							if (!href.value) return;
							const url = new URL(href.value, "http://localhost");
							return {
								path: url.pathname,
								fullPath: url.pathname,
								get query() {
									return parseQuery(url.search);
								},
								hash: url.hash,
								params: {},
								name: void 0,
								matched: [],
								redirectedFrom: void 0,
								meta: {},
								href: href.value
							};
						},
						rel,
						target,
						isExternal: isExternal.value || hasTarget.value,
						isActive: false,
						isExactActive: false
					});
				}
				return h("a", {
					ref: el,
					href: href.value || null,
					rel,
					target,
					onClick: (event) => {
						if (isExternal.value || hasTarget.value) return;
						event.preventDefault();
						return props.replace ? router.replace(href.value) : router.push(href.value);
					}
				}, slots.default?.());
			};
		}
	});
}
var nuxt_link_default = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
	const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
	if (hasProtocol(to) && !to.startsWith("http")) return to;
	return normalizeFn(to, true);
}
var virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default = /* @__PURE__ */ defuFn({
	"nuxt": {},
	"icon": {
		"provider": "server",
		"class": "",
		"aliases": {},
		"iconifyApiEndpoint": "https://api.iconify.design",
		"localApiEndpoint": "/api/_nuxt_icon",
		"fallbackToApi": true,
		"cssSelectorPrefix": "i-",
		"cssWherePseudo": true,
		"mode": "css",
		"attrs": { "aria-hidden": true },
		"collections": [
			"academicons",
			"akar-icons",
			"ant-design",
			"arcticons",
			"basil",
			"bi",
			"bitcoin-icons",
			"bpmn",
			"brandico",
			"bx",
			"bxl",
			"bxs",
			"bytesize",
			"carbon",
			"catppuccin",
			"cbi",
			"charm",
			"ci",
			"cib",
			"cif",
			"cil",
			"circle-flags",
			"circum",
			"clarity",
			"codicon",
			"covid",
			"cryptocurrency",
			"cryptocurrency-color",
			"dashicons",
			"devicon",
			"devicon-plain",
			"ei",
			"el",
			"emojione",
			"emojione-monotone",
			"emojione-v1",
			"entypo",
			"entypo-social",
			"eos-icons",
			"ep",
			"et",
			"eva",
			"f7",
			"fa",
			"fa-brands",
			"fa-regular",
			"fa-solid",
			"fa6-brands",
			"fa6-regular",
			"fa6-solid",
			"fad",
			"fe",
			"feather",
			"file-icons",
			"flag",
			"flagpack",
			"flat-color-icons",
			"flat-ui",
			"flowbite",
			"fluent",
			"fluent-emoji",
			"fluent-emoji-flat",
			"fluent-emoji-high-contrast",
			"fluent-mdl2",
			"fontelico",
			"fontisto",
			"formkit",
			"foundation",
			"fxemoji",
			"gala",
			"game-icons",
			"geo",
			"gg",
			"gis",
			"gravity-ui",
			"gridicons",
			"grommet-icons",
			"guidance",
			"healthicons",
			"heroicons",
			"heroicons-outline",
			"heroicons-solid",
			"hugeicons",
			"humbleicons",
			"ic",
			"icomoon-free",
			"icon-park",
			"icon-park-outline",
			"icon-park-solid",
			"icon-park-twotone",
			"iconamoon",
			"iconoir",
			"icons8",
			"il",
			"ion",
			"iwwa",
			"jam",
			"la",
			"lets-icons",
			"line-md",
			"logos",
			"ls",
			"lucide",
			"lucide-lab",
			"mage",
			"majesticons",
			"maki",
			"map",
			"marketeq",
			"material-symbols",
			"material-symbols-light",
			"mdi",
			"mdi-light",
			"medical-icon",
			"memory",
			"meteocons",
			"mi",
			"mingcute",
			"mono-icons",
			"mynaui",
			"nimbus",
			"nonicons",
			"noto",
			"noto-v1",
			"octicon",
			"oi",
			"ooui",
			"openmoji",
			"oui",
			"pajamas",
			"pepicons",
			"pepicons-pencil",
			"pepicons-pop",
			"pepicons-print",
			"ph",
			"pixelarticons",
			"prime",
			"ps",
			"quill",
			"radix-icons",
			"raphael",
			"ri",
			"rivet-icons",
			"si-glyph",
			"simple-icons",
			"simple-line-icons",
			"skill-icons",
			"solar",
			"streamline",
			"streamline-emojis",
			"subway",
			"svg-spinners",
			"system-uicons",
			"tabler",
			"tdesign",
			"teenyicons",
			"token",
			"token-branded",
			"topcoat",
			"twemoji",
			"typcn",
			"uil",
			"uim",
			"uis",
			"uit",
			"uiw",
			"unjs",
			"vaadin",
			"vs",
			"vscode-icons",
			"websymbol",
			"weui",
			"whh",
			"wi",
			"wpf",
			"zmdi",
			"zondicons"
		],
		"fetchTimeout": 1500
	},
	"ui": {
		"primary": "green",
		"gray": "cool",
		"colors": [
			"red",
			"orange",
			"amber",
			"yellow",
			"lime",
			"green",
			"emerald",
			"teal",
			"cyan",
			"sky",
			"blue",
			"indigo",
			"violet",
			"purple",
			"fuchsia",
			"pink",
			"rose",
			"primary"
		],
		"strategy": "merge"
	}
});
function useAppConfig() {
	const nuxtApp = useNuxtApp();
	nuxtApp._appConfig ||= klona(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default);
	return nuxtApp._appConfig;
}
var plugin_vue3_default = /* @__PURE__ */ defineNuxtPlugin({
	name: "pinia",
	setup(nuxtApp) {
		const pinia = createPinia();
		nuxtApp.vueApp.use(pinia);
		setActivePinia(pinia);
		nuxtApp.payload.pinia = pinia.state.value;
		return { provide: { pinia } };
	}
});
var Accordion_default = defineAsyncComponent(() => import("./_nuxt/Accordion--y63Onus.js").then((r) => r["default"] || r.default || r));
var Alert_default = defineAsyncComponent(() => import("./_nuxt/Alert-BxHqwDvj.js").then((r) => r["default"] || r.default || r));
var Avatar_default = defineAsyncComponent(() => import("./_nuxt/Avatar-RiJ55zLR.js").then((r) => r["default"] || r.default || r));
var AvatarGroup_default = defineAsyncComponent(() => import("./_nuxt/AvatarGroup-B678Y04S.js").then((r) => r["default"] || r.default || r));
var Badge_default = defineAsyncComponent(() => import("./_nuxt/Badge-Bb9IcqQP.js").then((r) => r["default"] || r.default || r));
var Button_default = defineAsyncComponent(() => import("./_nuxt/Button-B1clF2nP.js").then((r) => r["default"] || r.default || r));
var ButtonGroup_default = defineAsyncComponent(() => import("./_nuxt/ButtonGroup-CEm0fqt9.js").then((r) => r["default"] || r.default || r));
var Carousel_default = defineAsyncComponent(() => import("./_nuxt/Carousel-DQaGlC9C.js").then((r) => r["default"] || r.default || r));
var Chip_default = defineAsyncComponent(() => import("./_nuxt/Chip-CwJm2tnn.js").then((r) => r["default"] || r.default || r));
var Dropdown_default = defineAsyncComponent(() => import("./_nuxt/Dropdown-YMSaHnp6.js").then((r) => r["default"] || r.default || r));
var Icon_default = defineAsyncComponent(() => import("./_nuxt/Icon-BQxbVddL.js").then((r) => r["default"] || r.default || r));
var Kbd_default = defineAsyncComponent(() => import("./_nuxt/Kbd-B6q0WgYi.js").then((r) => r["default"] || r.default || r));
var Link_default = defineAsyncComponent(() => import("./_nuxt/Link-CL8ivRbg.js").then((r) => r["default"] || r.default || r));
var Meter_default = defineAsyncComponent(() => import("./_nuxt/Meter-DRL7lJFj.js").then((r) => r["default"] || r.default || r));
var MeterGroup_default = defineAsyncComponent(() => import("./_nuxt/MeterGroup-BV6LwsS_.js").then((r) => r["default"] || r.default || r));
var Progress_default = defineAsyncComponent(() => import("./_nuxt/Progress-CDhee4s0.js").then((r) => r["default"] || r.default || r));
var Checkbox_default = defineAsyncComponent(() => import("./_nuxt/Checkbox-DU9jOqk6.js").then((r) => r["default"] || r.default || r));
var Form_default = defineAsyncComponent(() => import("./_nuxt/Form-Da8A1NFL.js").then((r) => r["default"] || r.default || r));
var FormGroup_default = defineAsyncComponent(() => import("./_nuxt/FormGroup-C-BMHVTQ.js").then((r) => r["default"] || r.default || r));
var Input_default = defineAsyncComponent(() => import("./_nuxt/Input-CbhZIhGI.js").then((r) => r["default"] || r.default || r));
var InputMenu_default = defineAsyncComponent(() => import("./_nuxt/InputMenu-CV105MzK.js").then((r) => r["default"] || r.default || r));
var Radio_default = defineAsyncComponent(() => import("./_nuxt/Radio-aeVn_7jN.js").then((r) => r["default"] || r.default || r));
var RadioGroup_default = defineAsyncComponent(() => import("./_nuxt/RadioGroup-DnPNvloc.js").then((r) => r["default"] || r.default || r));
var Range_default = defineAsyncComponent(() => import("./_nuxt/Range-DmYjY98D.js").then((r) => r["default"] || r.default || r));
var Select_default = defineAsyncComponent(() => import("./_nuxt/Select-Cx-ISQOC.js").then((r) => r["default"] || r.default || r));
var SelectMenu_default = defineAsyncComponent(() => import("./_nuxt/SelectMenu-D72j-RJr.js").then((r) => r["default"] || r.default || r));
var Textarea_default = defineAsyncComponent(() => import("./_nuxt/Textarea-ClW9ULmm.js").then((r) => r["default"] || r.default || r));
var Toggle_default = defineAsyncComponent(() => import("./_nuxt/Toggle-D7wSDC1Y.js").then((r) => r["default"] || r.default || r));
var Table_default = defineAsyncComponent(() => import("./_nuxt/Table-4-cEq18p.js").then((r) => r["default"] || r.default || r));
var Card_default = defineAsyncComponent(() => import("./_nuxt/Card-CV7B2HPk.js").then((r) => r["default"] || r.default || r));
var Container_default = defineAsyncComponent(() => import("./_nuxt/Container-CU98n4RS.js").then((r) => r["default"] || r.default || r));
var Divider_default = defineAsyncComponent(() => import("./_nuxt/Divider-Ddhjrdke.js").then((r) => r["default"] || r.default || r));
var Skeleton_default = defineAsyncComponent(() => import("./_nuxt/Skeleton-DTw_175A.js").then((r) => r["default"] || r.default || r));
var Breadcrumb_default = defineAsyncComponent(() => import("./_nuxt/Breadcrumb-Cag7lz-w.js").then((r) => r["default"] || r.default || r));
var CommandPalette_default = defineAsyncComponent(() => import("./_nuxt/CommandPalette-noZ4qn7j.js").then((r) => r["default"] || r.default || r));
var CommandPaletteGroup_default = defineAsyncComponent(() => import("./_nuxt/CommandPaletteGroup-Dpky3S1g.js").then((r) => r["default"] || r.default || r));
var HorizontalNavigation_default = defineAsyncComponent(() => import("./_nuxt/HorizontalNavigation-CzaVZKrM.js").then((r) => r["default"] || r.default || r));
var Pagination_default = defineAsyncComponent(() => import("./_nuxt/Pagination-DF7FzyKw.js").then((r) => r["default"] || r.default || r));
var Tabs_default = defineAsyncComponent(() => import("./_nuxt/Tabs-BA-VGK81.js").then((r) => r["default"] || r.default || r));
var VerticalNavigation_default = defineAsyncComponent(() => import("./_nuxt/VerticalNavigation-DjrjXQl5.js").then((r) => r["default"] || r.default || r));
var ContextMenu_default = defineAsyncComponent(() => import("./_nuxt/ContextMenu-CjvrV2EK.js").then((r) => r["default"] || r.default || r));
var Modal_default = defineAsyncComponent(() => import("./_nuxt/Modal-BbhoxMMu.js").then((r) => r["default"] || r.default || r));
var server_placeholder_default = defineAsyncComponent(() => import("./_nuxt/server-placeholder-BOvhNubJ.js").then((r) => r["default"] || r.default || r));
var Notification_default = defineAsyncComponent(() => import("./_nuxt/Notification-DJwR7WOQ.js").then((r) => r["default"] || r.default || r));
var Notifications_default = defineAsyncComponent(() => import("./_nuxt/Notifications-D82kc3kv.js").then((r) => r["default"] || r.default || r));
var Popover_default = defineAsyncComponent(() => import("./_nuxt/Popover-LuMswdJ3.js").then((r) => r["default"] || r.default || r));
var Slideover_default = defineAsyncComponent(() => import("./_nuxt/Slideover-c0hApqtk.js").then((r) => r["default"] || r.default || r));
var server_placeholder_default$1 = defineAsyncComponent(() => import("./_nuxt/server-placeholder-BOvhNubJ.js").then((r) => r["default"] || r.default || r));
var Tooltip_default = defineAsyncComponent(() => import("./_nuxt/Tooltip-eZfphyc4.js").then((r) => r["default"] || r.default || r));
var components_default = defineAsyncComponent(() => import("./_nuxt/components-CqoEyeNn.js").then((r) => r["default"] || r.default || r));
var lazyGlobalComponents = [
	["UAccordion", Accordion_default],
	["UAlert", Alert_default],
	["UAvatar", Avatar_default],
	["UAvatarGroup", AvatarGroup_default],
	["UBadge", Badge_default],
	["UButton", Button_default],
	["UButtonGroup", ButtonGroup_default],
	["UCarousel", Carousel_default],
	["UChip", Chip_default],
	["UDropdown", Dropdown_default],
	["UIcon", Icon_default],
	["UKbd", Kbd_default],
	["ULink", Link_default],
	["UMeter", Meter_default],
	["UMeterGroup", MeterGroup_default],
	["UProgress", Progress_default],
	["UCheckbox", Checkbox_default],
	["UForm", Form_default],
	["UFormGroup", FormGroup_default],
	["UInput", Input_default],
	["UInputMenu", InputMenu_default],
	["URadio", Radio_default],
	["URadioGroup", RadioGroup_default],
	["URange", Range_default],
	["USelect", Select_default],
	["USelectMenu", SelectMenu_default],
	["UTextarea", Textarea_default],
	["UToggle", Toggle_default],
	["UTable", Table_default],
	["UCard", Card_default],
	["UContainer", Container_default],
	["UDivider", Divider_default],
	["USkeleton", Skeleton_default],
	["UBreadcrumb", Breadcrumb_default],
	["UCommandPalette", CommandPalette_default],
	["UCommandPaletteGroup", CommandPaletteGroup_default],
	["UHorizontalNavigation", HorizontalNavigation_default],
	["UPagination", Pagination_default],
	["UTabs", Tabs_default],
	["UVerticalNavigation", VerticalNavigation_default],
	["UContextMenu", ContextMenu_default],
	["UModal", Modal_default],
	["UModals", server_placeholder_default],
	["UNotification", Notification_default],
	["UNotifications", Notifications_default],
	["UPopover", Popover_default],
	["USlideover", Slideover_default],
	["USlideovers", server_placeholder_default$1],
	["UTooltip", Tooltip_default],
	["Icon", components_default]
];
var virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fcomponents_plugin_default = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:global-components",
	setup(nuxtApp) {
		for (const [name, component] of lazyGlobalComponents) {
			nuxtApp.vueApp.component(name, component);
			nuxtApp.vueApp.component("Lazy" + name, component);
		}
	}
});
const slidOverInjectionKey = Symbol("nuxt-ui.slideover");
function _useSlideover() {
	const slideoverState = inject(slidOverInjectionKey);
	const isOpen = ref(false);
	function open(component, props) {
		if (!slideoverState) throw new Error("useSlideover() is called without provider");
		slideoverState.value = {
			component,
			props: props ?? {}
		};
		isOpen.value = true;
	}
	async function close() {
		if (!slideoverState) return;
		isOpen.value = false;
	}
	function reset() {
		slideoverState.value = {
			component: "div",
			props: {}
		};
	}
	function patch(props) {
		if (!slideoverState) return;
		slideoverState.value = {
			...slideoverState.value,
			props: {
				...slideoverState.value.props,
				...props
			}
		};
	}
	return {
		open,
		close,
		reset,
		patch,
		isOpen
	};
}
createSharedComposable(_useSlideover);
var slideovers_default = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
	const slideoverState = shallowRef({
		component: "div",
		props: {}
	});
	nuxtApp.vueApp.provide(slidOverInjectionKey, slideoverState);
});
const modalInjectionKey = Symbol("nuxt-ui.modal");
function _useModal() {
	const modalState = inject(modalInjectionKey);
	const isOpen = ref(false);
	function open(component, props) {
		if (!modalState) throw new Error("useModal() is called without provider");
		modalState.value = {
			component,
			props: props ?? {}
		};
		isOpen.value = true;
	}
	async function close() {
		if (!modalState) return;
		isOpen.value = false;
	}
	function reset() {
		modalState.value = {
			component: "div",
			props: {}
		};
	}
	function patch(props) {
		if (!modalState) return;
		modalState.value = {
			...modalState.value,
			props: {
				...modalState.value.props,
				...props
			}
		};
	}
	return {
		open,
		close,
		reset,
		patch,
		isOpen
	};
}
createSharedComposable(_useModal);
var modals_default = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
	const modalState = shallowRef({
		component: "div",
		props: {}
	});
	nuxtApp.vueApp.provide(modalInjectionKey, modalState);
});
function omit(object, keysToOmit) {
	const result = { ...object };
	for (const key of keysToOmit) delete result[key];
	return result;
}
function get(object, path, defaultValue) {
	if (typeof path === "string") path = path.split(".").map((key) => {
		const numKey = Number(key);
		return Number.isNaN(numKey) ? key : numKey;
	});
	let result = object;
	for (const key of path) {
		if (result === void 0 || result === null) return defaultValue;
		result = result[key];
	}
	return result !== void 0 ? result : defaultValue;
}
const nuxtLinkProps = {
	to: {
		type: [String, Object],
		default: void 0,
		required: false
	},
	href: {
		type: [String, Object],
		default: void 0,
		required: false
	},
	target: {
		type: String,
		default: void 0,
		required: false
	},
	rel: {
		type: String,
		default: void 0,
		required: false
	},
	noRel: {
		type: Boolean,
		default: void 0,
		required: false
	},
	prefetch: {
		type: Boolean,
		default: void 0,
		required: false
	},
	noPrefetch: {
		type: Boolean,
		default: void 0,
		required: false
	},
	activeClass: {
		type: String,
		default: void 0,
		required: false
	},
	exactActiveClass: {
		type: String,
		default: void 0,
		required: false
	},
	prefetchedClass: {
		type: String,
		default: void 0,
		required: false
	},
	replace: {
		type: Boolean,
		default: void 0,
		required: false
	},
	ariaCurrentValue: {
		type: String,
		default: void 0,
		required: false
	},
	external: {
		type: Boolean,
		default: void 0,
		required: false
	}
};
var uLinkProps = {
	as: {
		type: String,
		default: "button"
	},
	type: {
		type: String,
		default: "button"
	},
	disabled: {
		type: Boolean,
		default: null
	},
	active: {
		type: Boolean,
		default: void 0
	},
	exact: {
		type: Boolean,
		default: false
	},
	exactQuery: {
		type: Boolean,
		default: false
	},
	exactHash: {
		type: Boolean,
		default: false
	},
	inactiveClass: {
		type: String,
		default: void 0
	}
};
const getNuxtLinkProps = (props) => {
	return Object.keys(nuxtLinkProps).reduce((acc, key) => {
		if (props[key] !== void 0) acc[key] = props[key];
		return acc;
	}, {});
};
const getULinkProps = (props) => {
	const keys = Object.keys(props);
	const ariaKeys = keys.filter((key) => key.startsWith("aria-"));
	const dataKeys = keys.filter((key) => key.startsWith("data-"));
	return [
		...Object.keys(nuxtLinkProps),
		...Object.keys(uLinkProps),
		...ariaKeys,
		...dataKeys
	].reduce((acc, key) => {
		if (props[key] !== void 0) acc[key] = props[key];
		return acc;
	}, {});
};
const twMerge = extendTailwindMerge(defu({ extend: { classGroups: { icons: [(classPart) => classPart.startsWith("i-")] } } }, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui?.tailwindMerge));
var defuTwMerge = createDefu((obj, key, value, namespace) => {
	if (namespace === "default" || namespace.startsWith("default.")) return false;
	if (namespace === "popper" || namespace.startsWith("popper.")) return false;
	if (namespace.endsWith("avatar") && key === "size") return false;
	if (namespace.endsWith("chip") && key === "size") return false;
	if (namespace.endsWith("badge") && key === "size" || key === "color" || key === "variant") return false;
	if (typeof obj[key] === "string" && typeof value === "string" && obj[key] && value) {
		obj[key] = twMerge(obj[key], value);
		return true;
	}
});
function mergeConfig(strategy, ...configs) {
	if (strategy === "override") return defu({}, ...configs);
	return defuTwMerge({}, ...configs);
}
var rxHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
function parseConfigValue(value) {
	return rxHex.test(value) ? hexToRgb(value) : value;
}
function hexToRgb(hex) {
	hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(_, r, g, b) {
		return r + r + g + g + b + b;
	});
	const result = rxHex.exec(hex);
	return result ? `${Number.parseInt(result[1], 16)} ${Number.parseInt(result[2], 16)} ${Number.parseInt(result[3], 16)}` : null;
}
function getSlotsChildren(slots) {
	let children = slots.default?.();
	if (children?.length) children = children.flatMap((c) => {
		if (typeof c.type === "symbol") {
			if (typeof c.children === "string") return;
			return c.children;
		} else if (c.type.name === "ContentSlot") return c.ctx.slots.default?.();
		return c;
	}).filter(Boolean);
	return children || [];
}
function looseToNumber(val) {
	const n = Number.parseFloat(val);
	return Number.isNaN(n) ? val : n;
}
var _inherit = "inherit";
var _current = "currentColor";
var _transparent = "transparent";
var _black = "#000";
var _white = "#fff";
var _slate = {
	"50": "#f8fafc",
	"100": "#f1f5f9",
	"200": "#e2e8f0",
	"300": "#cbd5e1",
	"400": "#94a3b8",
	"500": "#64748b",
	"600": "#475569",
	"700": "#334155",
	"800": "#1e293b",
	"900": "#0f172a",
	"950": "#020617"
};
var _gray = {
	"50": "rgb(var(--color-gray-50) / <alpha-value>)",
	"100": "rgb(var(--color-gray-100) / <alpha-value>)",
	"200": "rgb(var(--color-gray-200) / <alpha-value>)",
	"300": "rgb(var(--color-gray-300) / <alpha-value>)",
	"400": "rgb(var(--color-gray-400) / <alpha-value>)",
	"500": "rgb(var(--color-gray-500) / <alpha-value>)",
	"600": "rgb(var(--color-gray-600) / <alpha-value>)",
	"700": "rgb(var(--color-gray-700) / <alpha-value>)",
	"800": "rgb(var(--color-gray-800) / <alpha-value>)",
	"900": "rgb(var(--color-gray-900) / <alpha-value>)",
	"950": "rgb(var(--color-gray-950) / <alpha-value>)"
};
var _zinc = {
	"50": "#fafafa",
	"100": "#f4f4f5",
	"200": "#e4e4e7",
	"300": "#d4d4d8",
	"400": "#a1a1aa",
	"500": "#71717a",
	"600": "#52525b",
	"700": "#3f3f46",
	"800": "#27272a",
	"900": "#18181b",
	"950": "#09090b"
};
var _neutral = {
	"50": "#fafafa",
	"100": "#f5f5f5",
	"200": "#e5e5e5",
	"300": "#d4d4d4",
	"400": "#a3a3a3",
	"500": "#737373",
	"600": "#525252",
	"700": "#404040",
	"800": "#262626",
	"900": "#171717",
	"950": "#0a0a0a"
};
var _stone = {
	"50": "#fafaf9",
	"100": "#f5f5f4",
	"200": "#e7e5e4",
	"300": "#d6d3d1",
	"400": "#a8a29e",
	"500": "#78716c",
	"600": "#57534e",
	"700": "#44403c",
	"800": "#292524",
	"900": "#1c1917",
	"950": "#0c0a09"
};
var _red = {
	"50": "#fef2f2",
	"100": "#fee2e2",
	"200": "#fecaca",
	"300": "#fca5a5",
	"400": "#f87171",
	"500": "#ef4444",
	"600": "#dc2626",
	"700": "#b91c1c",
	"800": "#991b1b",
	"900": "#7f1d1d",
	"950": "#450a0a"
};
var _orange = {
	"50": "#fff7ed",
	"100": "#ffedd5",
	"200": "#fed7aa",
	"300": "#fdba74",
	"400": "#fb923c",
	"500": "#f97316",
	"600": "#ea580c",
	"700": "#c2410c",
	"800": "#9a3412",
	"900": "#7c2d12",
	"950": "#431407"
};
var _amber = {
	"50": "#fffbeb",
	"100": "#fef3c7",
	"200": "#fde68a",
	"300": "#fcd34d",
	"400": "#fbbf24",
	"500": "#f59e0b",
	"600": "#d97706",
	"700": "#b45309",
	"800": "#92400e",
	"900": "#78350f",
	"950": "#451a03"
};
var _yellow = {
	"50": "#fefce8",
	"100": "#fef9c3",
	"200": "#fef08a",
	"300": "#fde047",
	"400": "#facc15",
	"500": "#eab308",
	"600": "#ca8a04",
	"700": "#a16207",
	"800": "#854d0e",
	"900": "#713f12",
	"950": "#422006"
};
var _lime = {
	"50": "#f7fee7",
	"100": "#ecfccb",
	"200": "#d9f99d",
	"300": "#bef264",
	"400": "#a3e635",
	"500": "#84cc16",
	"600": "#65a30d",
	"700": "#4d7c0f",
	"800": "#3f6212",
	"900": "#365314",
	"950": "#1a2e05"
};
var _green = {
	"50": "#f0fdf4",
	"100": "#dcfce7",
	"200": "#bbf7d0",
	"300": "#86efac",
	"400": "#4ade80",
	"500": "#22c55e",
	"600": "#16a34a",
	"700": "#15803d",
	"800": "#166534",
	"900": "#14532d",
	"950": "#052e16"
};
var _emerald = {
	"50": "#ecfdf5",
	"100": "#d1fae5",
	"200": "#a7f3d0",
	"300": "#6ee7b7",
	"400": "#34d399",
	"500": "#10b981",
	"600": "#059669",
	"700": "#047857",
	"800": "#065f46",
	"900": "#064e3b",
	"950": "#022c22"
};
var _teal = {
	"50": "#f0fdfa",
	"100": "#ccfbf1",
	"200": "#99f6e4",
	"300": "#5eead4",
	"400": "#2dd4bf",
	"500": "#14b8a6",
	"600": "#0d9488",
	"700": "#0f766e",
	"800": "#115e59",
	"900": "#134e4a",
	"950": "#042f2e"
};
var _cyan = {
	"50": "#ecfeff",
	"100": "#cffafe",
	"200": "#a5f3fc",
	"300": "#67e8f9",
	"400": "#22d3ee",
	"500": "#06b6d4",
	"600": "#0891b2",
	"700": "#0e7490",
	"800": "#155e75",
	"900": "#164e63",
	"950": "#083344"
};
var _sky = {
	"50": "#f0f9ff",
	"100": "#e0f2fe",
	"200": "#bae6fd",
	"300": "#7dd3fc",
	"400": "#38bdf8",
	"500": "#0ea5e9",
	"600": "#0284c7",
	"700": "#0369a1",
	"800": "#075985",
	"900": "#0c4a6e",
	"950": "#082f49"
};
var _blue = {
	"50": "#eff6ff",
	"100": "#dbeafe",
	"200": "#bfdbfe",
	"300": "#93c5fd",
	"400": "#60a5fa",
	"500": "#3b82f6",
	"600": "#2563eb",
	"700": "#1d4ed8",
	"800": "#1e40af",
	"900": "#1e3a8a",
	"950": "#172554"
};
var _indigo = {
	"50": "#eef2ff",
	"100": "#e0e7ff",
	"200": "#c7d2fe",
	"300": "#a5b4fc",
	"400": "#818cf8",
	"500": "#6366f1",
	"600": "#4f46e5",
	"700": "#4338ca",
	"800": "#3730a3",
	"900": "#312e81",
	"950": "#1e1b4b"
};
var _violet = {
	"50": "#f5f3ff",
	"100": "#ede9fe",
	"200": "#ddd6fe",
	"300": "#c4b5fd",
	"400": "#a78bfa",
	"500": "#8b5cf6",
	"600": "#7c3aed",
	"700": "#6d28d9",
	"800": "#5b21b6",
	"900": "#4c1d95",
	"950": "#2e1065"
};
var _purple = {
	"50": "#faf5ff",
	"100": "#f3e8ff",
	"200": "#e9d5ff",
	"300": "#d8b4fe",
	"400": "#c084fc",
	"500": "#a855f7",
	"600": "#9333ea",
	"700": "#7e22ce",
	"800": "#6b21a8",
	"900": "#581c87",
	"950": "#3b0764"
};
var _fuchsia = {
	"50": "#fdf4ff",
	"100": "#fae8ff",
	"200": "#f5d0fe",
	"300": "#f0abfc",
	"400": "#e879f9",
	"500": "#d946ef",
	"600": "#c026d3",
	"700": "#a21caf",
	"800": "#86198f",
	"900": "#701a75",
	"950": "#4a044e"
};
var _pink = {
	"50": "#fdf2f8",
	"100": "#fce7f3",
	"200": "#fbcfe8",
	"300": "#f9a8d4",
	"400": "#f472b6",
	"500": "#ec4899",
	"600": "#db2777",
	"700": "#be185d",
	"800": "#9d174d",
	"900": "#831843",
	"950": "#500724"
};
var _rose = {
	"50": "#fff1f2",
	"100": "#ffe4e6",
	"200": "#fecdd3",
	"300": "#fda4af",
	"400": "#fb7185",
	"500": "#f43f5e",
	"600": "#e11d48",
	"700": "#be123c",
	"800": "#9f1239",
	"900": "#881337",
	"950": "#4c0519"
};
var _primary = {
	"50": "rgb(var(--color-primary-50) / <alpha-value>)",
	"100": "rgb(var(--color-primary-100) / <alpha-value>)",
	"200": "rgb(var(--color-primary-200) / <alpha-value>)",
	"300": "rgb(var(--color-primary-300) / <alpha-value>)",
	"400": "rgb(var(--color-primary-400) / <alpha-value>)",
	"500": "rgb(var(--color-primary-500) / <alpha-value>)",
	"600": "rgb(var(--color-primary-600) / <alpha-value>)",
	"700": "rgb(var(--color-primary-700) / <alpha-value>)",
	"800": "rgb(var(--color-primary-800) / <alpha-value>)",
	"900": "rgb(var(--color-primary-900) / <alpha-value>)",
	"950": "rgb(var(--color-primary-950) / <alpha-value>)",
	"DEFAULT": "rgb(var(--color-primary-DEFAULT) / <alpha-value>)"
};
var _cool = {
	"50": "#f9fafb",
	"100": "#f3f4f6",
	"200": "#e5e7eb",
	"300": "#d1d5db",
	"400": "#9ca3af",
	"500": "#6b7280",
	"600": "#4b5563",
	"700": "#374151",
	"800": "#1f2937",
	"900": "#111827",
	"950": "#030712"
};
var config = {
	"inherit": _inherit,
	"current": _current,
	"transparent": _transparent,
	"black": _black,
	"white": _white,
	"slate": _slate,
	"gray": _gray,
	"zinc": _zinc,
	"neutral": _neutral,
	"stone": _stone,
	"red": _red,
	"orange": _orange,
	"amber": _amber,
	"yellow": _yellow,
	"lime": _lime,
	"green": _green,
	"emerald": _emerald,
	"teal": _teal,
	"cyan": _cyan,
	"sky": _sky,
	"blue": _blue,
	"indigo": _indigo,
	"violet": _violet,
	"purple": _purple,
	"fuchsia": _fuchsia,
	"pink": _pink,
	"rose": _rose,
	"primary": _primary,
	"cool": _cool
};
var colors_default = /* @__PURE__ */ defineNuxtPlugin(() => {
	const appConfig = useAppConfig();
	useNuxtApp();
	const root = computed(() => {
		const primary = get(config, appConfig.ui.primary);
		const gray = get(config, appConfig.ui.gray);
		if (!primary) console.warn(`[@nuxt/ui] Primary color '${appConfig.ui.primary}' not found in Tailwind config`);
		if (!gray) console.warn(`[@nuxt/ui] Gray color '${appConfig.ui.gray}' not found in Tailwind config`);
		return `:root {
${Object.entries(primary || config.green).map(([key, value]) => `--color-primary-${key}: ${parseConfigValue(value)};`).join("\n")}
--color-primary-DEFAULT: var(--color-primary-500);

${Object.entries(gray || config.cool).map(([key, value]) => `--color-gray-${key}: ${parseConfigValue(value)};`).join("\n")}
}

.dark {
  --color-primary-DEFAULT: var(--color-primary-400);
}
`;
	});
	useHead$1({ style: [{
		innerHTML: () => root.value,
		tagPriority: -2,
		id: "nuxt-ui-colors"
	}] });
});
const preference = "dark";
var virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fplugins_server_default = [
	unhead_default,
	router_default,
	revive_payload_server_default,
	plugin_vue3_default,
	virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fcomponents_plugin_default,
	slideovers_default,
	modals_default,
	colors_default,
	/* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
		const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}) : useState("color-mode", () => reactive({
			preference,
			value: preference,
			unknown: true,
			forced: false
		})).value;
		const htmlAttrs = {};
		useHead$1({ htmlAttrs });
		useRouter().afterEach((to) => {
			const forcedColorMode = to.meta.colorMode;
			if (forcedColorMode && forcedColorMode !== "system") {
				colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
				colorMode.forced = true;
			} else if (forcedColorMode === "system") console.warn("You cannot force the colorMode to system at the page level.");
		});
		nuxtApp.provide("colorMode", colorMode);
	}),
	/* @__PURE__ */ defineNuxtPlugin({
		name: "@nuxt/icon",
		setup() {
			const configs = /* @__PURE__ */ useRuntimeConfig();
			const options = useAppConfig().icon;
			_api.setFetch($fetch.native);
			const resources = [];
			if (options.provider === "server") {
				const baseURL$1 = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
				resources.push(baseURL$1 + (options.localApiEndpoint || "/api/_nuxt_icon"));
				if (options.fallbackToApi === true || options.fallbackToApi === "client-only") resources.push(options.iconifyApiEndpoint);
			} else if (options.provider === "none") _api.setFetch(() => Promise.resolve(new Response()));
			else resources.push(options.iconifyApiEndpoint);
			async function customIconLoader(icons, prefix) {
				try {
					const data = await $fetch(resources[0] + "/" + prefix + ".json", { query: { icons: icons.join(",") } });
					if (!data || data.prefix !== prefix || !data.icons) throw new Error("Invalid data" + JSON.stringify(data));
					return data;
				} catch (e) {
					console.error("Failed to load custom icons", e);
					return null;
				}
			}
			addAPIProvider("", { resources });
			for (const prefix of options.customCollections || []) if (prefix) setCustomIconsLoader(customIconLoader, prefix);
		}
	})
];
var virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Flayouts_default = { default: defineAsyncComponent(() => import("./_nuxt/default-Bel6th_c.js").then((m) => m.default || m)) };
var LayoutLoader = defineComponent({
	name: "LayoutLoader",
	inheritAttrs: false,
	props: {
		name: String,
		layoutProps: Object
	},
	setup(props, context) {
		return () => h(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Flayouts_default[props.name], props.layoutProps, context.slots);
	}
});
var nuxt_layout_default = defineComponent({
	name: "NuxtLayout",
	inheritAttrs: false,
	props: {
		name: {
			type: [
				String,
				Boolean,
				Object
			],
			default: null
		},
		fallback: {
			type: [String, Object],
			default: null
		}
	},
	setup(props, context) {
		const nuxtApp = useNuxtApp();
		const injectedRoute = inject(PageRouteSymbol);
		const route = !injectedRoute || injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
		const layout = computed(() => {
			let layout2 = unref(props.name) ?? route?.meta.layout ?? "default";
			if (layout2 && !(layout2 in virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Flayouts_default)) {
				if (props.fallback) layout2 = unref(props.fallback);
			}
			return layout2;
		});
		const layoutRef = shallowRef();
		context.expose({ layoutRef });
		const done = nuxtApp.deferHydration();
		let lastLayout;
		return () => {
			const hasLayout = layout.value && layout.value in virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Flayouts_default;
			const transitionProps = route?.meta.layoutTransition ?? false;
			const previouslyRenderedLayout = lastLayout;
			lastLayout = layout.value;
			return _wrapInTransition(hasLayout && transitionProps, { default: () => h(Suspense, {
				suspensible: true,
				onResolve: () => {
					nextTick(done);
				}
			}, { default: () => h(LayoutProvider, {
				layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
				key: layout.value || void 0,
				name: layout.value,
				shouldProvide: !props.name,
				isRenderingNewLayout: (name) => {
					return name !== previouslyRenderedLayout && name === layout.value;
				},
				hasTransition: !!transitionProps
			}, context.slots) }) }).default();
		};
	}
});
var LayoutProvider = defineComponent({
	name: "NuxtLayoutProvider",
	inheritAttrs: false,
	props: {
		name: { type: [String, Boolean] },
		layoutProps: { type: Object },
		hasTransition: { type: Boolean },
		shouldProvide: { type: Boolean },
		isRenderingNewLayout: {
			type: Function,
			required: true
		}
	},
	setup(props, context) {
		const name = props.name;
		if (props.shouldProvide) provide(LayoutMetaSymbol, { isCurrent: (route) => name === (route.meta.layout ?? "default") });
		const injectedRoute = inject(PageRouteSymbol);
		if (injectedRoute && injectedRoute === useRoute()) {
			const vueRouterRoute = useRoute$1();
			const reactiveChildRoute = {};
			for (const _key in vueRouterRoute) {
				const key = _key;
				Object.defineProperty(reactiveChildRoute, key, {
					enumerable: true,
					get: () => {
						return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
					}
				});
			}
			provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
		}
		return () => {
			if (!name || typeof name === "string" && !(name in virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Flayouts_default)) return context.slots.default?.();
			return h(LayoutLoader, {
				key: name,
				layoutProps: props.layoutProps,
				name
			}, context.slots);
		};
	}
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean
	},
	setup(props) {
		const previousKey = props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) Object.defineProperty(route, key, {
			get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
			enumerable: true
		});
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
const RouteProvider = defineRouteProvider();
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: (routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			} });
		};
	}
});
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
var app_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "app",
	__ssrInlineRender: true,
	setup(__props) {
		useHead$1({
			title: "TG Pro Admin - Telegram机器人管理后台",
			meta: [{
				name: "description",
				content: "Telegram机器人会员管理后台系统"
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLayout = nuxt_layout_default;
			const _component_NuxtPage = page_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_NuxtLayout, null, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(_component_NuxtPage, null, null, _parent$1, _scopeId));
					else return [createVNode(_component_NuxtPage)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup$2 = app_vue_vue_type_script_setup_true_lang_default.setup;
app_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = app_vue_vue_type_script_setup_true_lang_default;
var _sfc_main$1 = {
	__name: "nuxt-error-page",
	__ssrInlineRender: true,
	props: { error: Object },
	setup(__props) {
		const _error = __props.error;
		_error.stack && _error.stack.split("\n").splice(1).map((line) => {
			return {
				text: line.replace("webpack:/", "").replace(".vue", ".js").trim(),
				internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
			};
		}).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
		const statusCode = Number(_error.statusCode || 500);
		const is404 = statusCode === 404;
		const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
		const description = _error.message || _error.toString();
		const stack = void 0;
		const _Error404 = defineAsyncComponent(() => import("./_nuxt/error-404-DNC3tuwi.js"));
		const _Error = defineAsyncComponent(() => import("./_nuxt/error-500-BUETGIOb.js"));
		const ErrorTemplate = is404 ? _Error404 : _Error;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({
				statusCode: unref(statusCode),
				statusMessage: unref(statusMessage),
				description: unref(description),
				stack: unref(stack)
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var nuxt_error_page_default = _sfc_main$1;
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const IslandRenderer = () => null;
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
		const error = /* @__PURE__ */ useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(nuxt_error_page_default), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var nuxt_root_default = _sfc_main;
var entry = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(nuxt_root_default);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$1(error);
	}
	if (ssrContext?._renderResponse) throw new Error("skipping render");
	return vueApp;
};
var entry_default = (ssrContext) => entry(ssrContext);
export { navigateTo as C, useRuntimeConfig as E, defineNuxtRouteMiddleware as S, useNuxtApp as T, server_placeholder_default$2 as _, getNuxtLinkProps as a, useHead$1 as b, get as c, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default as d, entry_default as default, nuxt_link_default as f, useAsyncData as g, useState as h, twMerge as i, omit as l, useCookie as m, looseToNumber as n, getULinkProps as o, useId$1 as p, mergeConfig as r, nuxtLinkProps as s, getSlotsChildren as t, useAppConfig as u, vue_demi_exports as v, useRoute as w, createError$1 as x, injectHead as y };

//# sourceMappingURL=server.mjs.map