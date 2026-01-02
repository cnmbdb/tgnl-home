import __nuxt_component_0 from './Icon-ZhGvf9gZ.mjs';
import __nuxt_component_2 from './Button-D_TCUDyh.mjs';
import __nuxt_component_3 from './Badge-BZslOKNb.mjs';
import __nuxt_component_2$1 from './Input-B1mh7BSF.mjs';
import { ref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useToast } from './useToast-BMHYguAT.mjs';
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
import './useFormGroup-B3564yef.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const orderNumber = ref("");
    const orderValidation = ref(null);
    const licenseInfo = ref(null);
    const loading = ref(false);
    const validating = ref(false);
    const activating = ref(false);
    const deactivating = ref(false);
    const fetchLicenseInfo = async () => {
      loading.value = true;
      try {
        const data = await $fetch("/api/license/info");
        licenseInfo.value = data;
      } catch (error) {
        console.error("Failed to fetch license info:", error);
        licenseInfo.value = {
          isActive: false,
          orderNumber: null,
          serverIp: null,
          authorizedIps: []
        };
      } finally {
        loading.value = false;
      }
    };
    const refreshLicenseInfo = async () => {
      await fetchLicenseInfo();
      toast.add({
        title: "\u5237\u65B0\u6210\u529F",
        description: "\u6388\u6743\u4FE1\u606F\u5DF2\u66F4\u65B0",
        icon: "i-heroicons-check-circle",
        color: "green"
      });
    };
    const validateOrder = async () => {
      var _a, _b;
      if (!orderNumber.value) return;
      validating.value = true;
      orderValidation.value = null;
      try {
        const data = await $fetch("/api/license/validate-order", {
          method: "POST",
          body: {
            orderNumber: orderNumber.value
          }
        });
        orderValidation.value = {
          ...data,
          activated: false
        };
        if (data == null ? void 0 : data.valid) {
          toast.add({
            title: "\u9A8C\u8BC1\u6210\u529F",
            description: '\u8BA2\u5355\u6709\u6548\uFF0C\u8BF7\u70B9\u51FB"\u7ACB\u5373\u6FC0\u6D3B"\u6309\u94AE\u5B8C\u6210\u6388\u6743',
            icon: "i-heroicons-check-circle",
            color: "green"
          });
        } else {
          toast.add({
            title: "\u9A8C\u8BC1\u5931\u8D25",
            description: (data == null ? void 0 : data.message) || "\u8BA2\u5355\u9A8C\u8BC1\u5931\u8D25",
            icon: "i-heroicons-x-circle",
            color: "red"
          });
        }
      } catch (error) {
        console.error("Validate order error:", error);
        orderValidation.value = {
          valid: false,
          message: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "\u9A8C\u8BC1\u8FC7\u7A0B\u51FA\u9519"
        };
        toast.add({
          title: "\u9A8C\u8BC1\u5931\u8D25",
          description: ((_b = error.data) == null ? void 0 : _b.message) || error.message || "\u65E0\u6CD5\u9A8C\u8BC1\u8BA2\u5355",
          icon: "i-heroicons-x-circle",
          color: "red"
        });
      } finally {
        validating.value = false;
      }
    };
    const activateWithOrder = async () => {
      var _a, _b;
      if (!orderNumber.value || !((_a = orderValidation.value) == null ? void 0 : _a.valid)) return;
      activating.value = true;
      try {
        const data = await $fetch("/api/license/activate-order", {
          method: "POST",
          body: {
            orderNumber: orderNumber.value
          }
        });
        if (data == null ? void 0 : data.success) {
          toast.add({
            title: "\u6FC0\u6D3B\u6210\u529F",
            description: "\u6388\u6743\u5DF2\u6210\u529F\u6FC0\u6D3B\uFF0C\u5F53\u524D\u670D\u52A1\u5668IP\u5DF2\u81EA\u52A8\u7ED1\u5B9A",
            icon: "i-heroicons-check-circle",
            color: "green"
          });
          orderValidation.value = {
            ...orderValidation.value,
            activated: true,
            license: {
              ...orderValidation.value.license,
              ...data.license
            }
          };
          await fetchLicenseInfo();
          setTimeout(() => {
            orderNumber.value = "";
            orderValidation.value = null;
          }, 3e3);
        }
      } catch (error) {
        console.error("Activate order error:", error);
        toast.add({
          title: "\u6FC0\u6D3B\u5931\u8D25",
          description: ((_b = error.data) == null ? void 0 : _b.message) || error.message || "\u65E0\u6CD5\u6FC0\u6D3B\u6388\u6743",
          icon: "i-heroicons-x-circle",
          color: "red"
        });
      } finally {
        activating.value = false;
      }
    };
    const deactivateLicense = async () => {
      var _a;
      if (!confirm("\u786E\u5B9A\u8981\u53D6\u6D88\u6388\u6743\u5417\uFF1F\u6B64\u64CD\u4F5C\u5C06\u5220\u9664\u5F53\u524D\u6388\u6743\u8BB0\u5F55\uFF0C\u4E0D\u53EF\u6062\u590D\uFF01")) {
        return;
      }
      deactivating.value = true;
      try {
        const data = await $fetch("/api/license/deactivate", {
          method: "POST",
          body: {
            orderNumber: licenseInfo.value.orderNumber
          }
        });
        if (data == null ? void 0 : data.success) {
          toast.add({
            title: "\u53D6\u6D88\u6210\u529F",
            description: "\u6388\u6743\u5DF2\u53D6\u6D88\uFF0C\u60A8\u53EF\u4EE5\u91CD\u65B0\u6FC0\u6D3B\u5176\u4ED6\u8BA2\u5355",
            icon: "i-heroicons-check-circle",
            color: "green"
          });
          await fetchLicenseInfo();
        }
      } catch (error) {
        console.error("Deactivate license error:", error);
        toast.add({
          title: "\u53D6\u6D88\u5931\u8D25",
          description: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "\u65E0\u6CD5\u53D6\u6D88\u6388\u6743",
          icon: "i-heroicons-x-circle",
          color: "red"
        });
      } finally {
        deactivating.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
      const _component_UIcon = __nuxt_component_0;
      const _component_UButton = __nuxt_component_2;
      const _component_UBadge = __nuxt_component_3;
      const _component_UInput = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-key",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> \u6388\u6743\u7BA1\u7406 </h1><p class="mt-1 text-sm text-[#9ca3af]">\u7BA1\u7406\u8BB8\u53EF\u8BC1\u6388\u6743\u548C\u670D\u52A1\u5668IP\u7ED1\u5B9A</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: refreshLicenseInfo,
        loading: loading.value,
        variant: "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` \u5237\u65B0\u72B6\u6001 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u5237\u65B0\u72B6\u6001 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (licenseInfo.value) {
        _push(`<div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b]"><h3 class="text-lg font-medium text-white flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-shield-check",
          class: "w-5 h-5 text-green-400"
        }, null, _parent));
        _push(` \u5F53\u524D\u6388\u6743\u72B6\u6001 </h3></div><div class="p-6 space-y-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div class="flex-1 min-w-0"><p class="text-xs text-[#9ca3af] mb-1">\u8BA2\u5355\u53F7</p><p class="${ssrRenderClass([!licenseInfo.value.isActive ? "text-gray-500" : "", "text-lg font-bold text-white truncate"])}">${ssrInterpolate(licenseInfo.value.orderNumber || "\u672A\u77E5")}</p></div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-shopping-cart",
          class: "w-8 h-8 text-blue-400 opacity-50 flex-shrink-0 ml-2"
        }, null, _parent));
        _push(`</div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-xs text-[#9ca3af] mb-1">\u6388\u6743\u72B6\u6001</p><p class="${ssrRenderClass([licenseInfo.value.isActive ? "text-green-400" : "text-red-400", "text-lg font-bold"])}">${ssrInterpolate(licenseInfo.value.isActive ? "\u5DF2\u6FC0\u6D3B" : "\u672A\u6FC0\u6D3B")}</p></div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: licenseInfo.value.isActive ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
          class: ["w-8 h-8 opacity-50", licenseInfo.value.isActive ? "text-green-400" : "text-red-400"]
        }, null, _parent));
        _push(`</div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div class="flex-1 min-w-0"><p class="text-xs text-[#9ca3af] mb-1">\u670D\u52A1\u5668IP</p><p class="text-lg font-bold text-white truncate">${ssrInterpolate(licenseInfo.value.serverIp || "localhost")}</p></div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-server",
          class: "w-8 h-8 text-purple-400 opacity-50 flex-shrink-0 ml-2"
        }, null, _parent));
        _push(`</div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-xs text-[#9ca3af] mb-1">\u6388\u6743IP\u6570</p><p class="text-lg font-bold text-white">${ssrInterpolate(((_a = licenseInfo.value.authorizedIps) == null ? void 0 : _a.length) || 0)}</p></div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-globe-alt",
          class: "w-8 h-8 text-yellow-400 opacity-50"
        }, null, _parent));
        _push(`</div></div></div>`);
        if (licenseInfo.value.authorizedIps && licenseInfo.value.authorizedIps.length > 0) {
          _push(`<div><h4 class="text-sm font-medium text-white mb-3">\u5DF2\u6388\u6743IP\u5730\u5740</h4><div class="space-y-2"><!--[-->`);
          ssrRenderList(licenseInfo.value.authorizedIps, (ip, index) => {
            _push(`<div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 flex items-center justify-between"><div class="flex items-center gap-3">`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-globe-alt",
              class: "w-5 h-5 text-[#00dc82]"
            }, null, _parent));
            _push(`<div><p class="text-white font-mono">${ssrInterpolate(ip)}</p>`);
            if (ip === licenseInfo.value.serverIp) {
              _push(`<p class="text-xs text-[#00dc82] mt-0.5">\u5F53\u524D\u670D\u52A1\u5668</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
            _push(ssrRenderComponent(_component_UBadge, {
              color: "green",
              variant: "subtle"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`\u5DF2\u6388\u6743`);
                } else {
                  return [
                    createTextVNode("\u5DF2\u6388\u6743")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b] flex items-center justify-between"><h3 class="text-lg font-medium text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-cart",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(` ${ssrInterpolate(((_b = licenseInfo.value) == null ? void 0 : _b.isActive) ? "\u66F4\u6362\u6388\u6743" : "WordPress\u8BA2\u5355\u6FC0\u6D3B")}</h3><a href="https://hfz.pw/shop/2101.html" target="_blank" class="text-sm text-[#00dc82] hover:text-[#00dc82]/80 flex items-center gap-1"> \u524D\u5F80\u5546\u57CE `);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-top-right-on-square",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</a></div><div class="p-6 space-y-4">`);
      if ((_c = licenseInfo.value) == null ? void 0 : _c.isActive) {
        _push(`<div><div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4"><div class="flex items-start gap-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
        }, null, _parent));
        _push(`<div><h4 class="text-sm font-medium text-yellow-500 mb-1">\u8B66\u544A</h4><p class="text-sm text-yellow-500/80"> \u5F53\u524D\u8BA2\u5355\u5DF2\u6FC0\u6D3B\u6388\u6743\uFF0C\u5982\u9700\u66F4\u6362\u5176\u4ED6\u8BA2\u5355\uFF0C\u8BF7\u5148\u53D6\u6D88\u5F53\u524D\u6388\u6743\u3002 \u53D6\u6D88\u6388\u6743\u540E\uFF0C\u5F53\u524D\u6388\u6743\u8BB0\u5F55\u5C06\u88AB\u6C38\u4E45\u5220\u9664\uFF0C\u4E0D\u53EF\u6062\u590D\uFF01 </p></div></div></div>`);
        _push(ssrRenderComponent(_component_UButton, {
          onClick: deactivateLicense,
          loading: deactivating.value,
          color: "red",
          size: "lg",
          class: "w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-trash",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` \u53D6\u6D88\u6388\u6743 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" \u53D6\u6D88\u6388\u6743 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-start gap-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-information-circle",
          class: "w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0"
        }, null, _parent));
        _push(`<div class="text-sm text-[#9ca3af]"><p class="mb-2">\u5728 <a href="https://hfz.pw/shop/2101.html" target="_blank" class="text-[#00dc82] hover:text-[#00dc82]/80">HFZ\u5546\u57CE</a> \u8D2D\u4E70\u6388\u6743\u540E\uFF0C\u4F7F\u7528\u8BA2\u5355\u53F7\u5373\u53EF\u6FC0\u6D3B</p><p>\u8BA2\u5355\u53F7\u53EF\u5728\u786E\u8BA4\u90AE\u4EF6\u6216\u5546\u57CE\u8BA2\u5355\u9875\u9762\u627E\u5230</p></div></div></div><div><label class="block text-white font-medium mb-2">WordPress\u8BA2\u5355\u53F7</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: orderNumber.value,
          "onUpdate:modelValue": ($event) => orderNumber.value = $event,
          placeholder: "\u8BF7\u8F93\u5165\u8BA2\u5355\u53F7\uFF0C\u4F8B\u5982\uFF1A202501010001234",
          size: "lg",
          class: "w-full",
          disabled: validating.value || activating.value
        }, null, _parent));
        _push(`</div>`);
        if ((_d = orderValidation.value) == null ? void 0 : _d.message) {
          _push(`<div class="${ssrRenderClass([((_e = orderValidation.value) == null ? void 0 : _e.valid) ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30", "p-4 rounded-lg border"])}"><div class="flex items-start gap-3">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: ((_f = orderValidation.value) == null ? void 0 : _f.valid) ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
            class: ["w-5 h-5 mt-0.5 flex-shrink-0", ((_g = orderValidation.value) == null ? void 0 : _g.valid) ? "text-green-400" : "text-red-400"]
          }, null, _parent));
          _push(`<div class="flex-1"><div class="${ssrRenderClass([((_h = orderValidation.value) == null ? void 0 : _h.valid) ? "text-green-400" : "text-red-400", "font-medium mb-1"])}">${ssrInterpolate(((_i = orderValidation.value) == null ? void 0 : _i.valid) ? "\u8BA2\u5355\u9A8C\u8BC1\u6210\u529F" : "\u8BA2\u5355\u9A8C\u8BC1\u5931\u8D25")}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate((_j = orderValidation.value) == null ? void 0 : _j.message)}</div>`);
          if (((_k = orderValidation.value) == null ? void 0 : _k.valid) && ((_l = orderValidation.value) == null ? void 0 : _l.license)) {
            _push(`<div class="mt-4 space-y-4"><div class="grid grid-cols-3 gap-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(((_n = (_m = orderValidation.value) == null ? void 0 : _m.license) == null ? void 0 : _n.edition) || "N/A")}</p><p class="text-xs text-[#9ca3af] mt-1">\u6388\u6743\u7248\u672C</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(((_p = (_o = orderValidation.value) == null ? void 0 : _o.license) == null ? void 0 : _p.customerEmail) || "N/A")}</p><p class="text-xs text-[#9ca3af] mt-1">\u5BA2\u6237\u90AE\u7BB1</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate((_r = (_q = orderValidation.value) == null ? void 0 : _q.license) == null ? void 0 : _r.orderNumber)}</p><p class="text-xs text-[#9ca3af] mt-1">\u8BA2\u5355\u53F7</p></div></div>`);
            if ((_s = orderValidation.value) == null ? void 0 : _s.activated) {
              _push(`<div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4"><div class="flex items-center gap-2 text-green-400">`);
              _push(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-5 h-5"
              }, null, _parent));
              _push(`<span class="font-medium">\u6388\u6743\u6FC0\u6D3B\u6210\u529F</span></div><p class="text-sm text-[#9ca3af] mt-2"> \u6388\u6743\u5DF2\u6210\u529F\u6FC0\u6D3B\uFF0C\u5F53\u524D\u670D\u52A1\u5668IP\u5DF2\u81EA\u52A8\u7ED1\u5B9A\u5230\u6B64\u8BA2\u5355 </p></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-3">`);
        _push(ssrRenderComponent(_component_UButton, {
          onClick: validateOrder,
          loading: validating.value,
          disabled: !orderNumber.value || activating.value,
          variant: "outline",
          size: "lg",
          class: "flex-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shield-check",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` \u9A8C\u8BC1\u8BA2\u5355 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-shield-check",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" \u9A8C\u8BC1\u8BA2\u5355 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          onClick: activateWithOrder,
          loading: activating.value,
          disabled: !((_t = orderValidation.value) == null ? void 0 : _t.valid) || validating.value,
          size: "lg",
          class: "flex-1 bg-[#00dc82] hover:bg-[#00dc82]/80"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-sparkles",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` \u7ACB\u5373\u6FC0\u6D3B `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-sparkles",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" \u7ACB\u5373\u6FC0\u6D3B ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--]-->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/license/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CKGEPpP3.mjs.map
