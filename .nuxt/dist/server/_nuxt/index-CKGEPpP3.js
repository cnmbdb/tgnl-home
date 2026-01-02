import __nuxt_component_0 from "./Icon-ZhGvf9gZ.js";
import __nuxt_component_2 from "./Button-D_TCUDyh.js";
import __nuxt_component_3 from "./Badge-BZslOKNb.js";
import __nuxt_component_2$1 from "./Input-B1mh7BSF.js";
import { ref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import "hookable";
import { u as useToast } from "./useToast-BMHYguAT.js";
import "./index-C6m-0LTF.js";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "klona";
import "@vueuse/core";
import "tailwind-merge";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Link-CS5wywLd.js";
import "./nuxt-link-C6IP2oPu.js";
import "ohash/utils";
import "./link-Bz3Wc5MF.js";
import "./tooltip-BtqstB0H.js";
import "./useButtonGroup-6uzJtOJv.js";
import "./button-Bz5rwL6o.js";
import "./useFormGroup-B3564yef.js";
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
        title: "刷新成功",
        description: "授权信息已更新",
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
            title: "验证成功",
            description: '订单有效，请点击"立即激活"按钮完成授权',
            icon: "i-heroicons-check-circle",
            color: "green"
          });
        } else {
          toast.add({
            title: "验证失败",
            description: (data == null ? void 0 : data.message) || "订单验证失败",
            icon: "i-heroicons-x-circle",
            color: "red"
          });
        }
      } catch (error) {
        console.error("Validate order error:", error);
        orderValidation.value = {
          valid: false,
          message: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "验证过程出错"
        };
        toast.add({
          title: "验证失败",
          description: ((_b = error.data) == null ? void 0 : _b.message) || error.message || "无法验证订单",
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
            title: "激活成功",
            description: "授权已成功激活，当前服务器IP已自动绑定",
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
          title: "激活失败",
          description: ((_b = error.data) == null ? void 0 : _b.message) || error.message || "无法激活授权",
          icon: "i-heroicons-x-circle",
          color: "red"
        });
      } finally {
        activating.value = false;
      }
    };
    const deactivateLicense = async () => {
      var _a;
      if (!confirm("确定要取消授权吗？此操作将删除当前授权记录，不可恢复！")) {
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
            title: "取消成功",
            description: "授权已取消，您可以重新激活其他订单",
            icon: "i-heroicons-check-circle",
            color: "green"
          });
          await fetchLicenseInfo();
        }
      } catch (error) {
        console.error("Deactivate license error:", error);
        toast.add({
          title: "取消失败",
          description: ((_a = error.data) == null ? void 0 : _a.message) || error.message || "无法取消授权",
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
      _push(`</div> 授权管理 </h1><p class="mt-1 text-sm text-[#9ca3af]">管理许可证授权和服务器IP绑定</p></div>`);
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
            _push2(` 刷新状态 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 刷新状态 ")
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
        _push(` 当前授权状态 </h3></div><div class="p-6 space-y-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div class="flex-1 min-w-0"><p class="text-xs text-[#9ca3af] mb-1">订单号</p><p class="${ssrRenderClass([!licenseInfo.value.isActive ? "text-gray-500" : "", "text-lg font-bold text-white truncate"])}">${ssrInterpolate(licenseInfo.value.orderNumber || "未知")}</p></div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-shopping-cart",
          class: "w-8 h-8 text-blue-400 opacity-50 flex-shrink-0 ml-2"
        }, null, _parent));
        _push(`</div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-xs text-[#9ca3af] mb-1">授权状态</p><p class="${ssrRenderClass([licenseInfo.value.isActive ? "text-green-400" : "text-red-400", "text-lg font-bold"])}">${ssrInterpolate(licenseInfo.value.isActive ? "已激活" : "未激活")}</p></div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: licenseInfo.value.isActive ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
          class: ["w-8 h-8 opacity-50", licenseInfo.value.isActive ? "text-green-400" : "text-red-400"]
        }, null, _parent));
        _push(`</div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div class="flex-1 min-w-0"><p class="text-xs text-[#9ca3af] mb-1">服务器IP</p><p class="text-lg font-bold text-white truncate">${ssrInterpolate(licenseInfo.value.serverIp || "localhost")}</p></div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-server",
          class: "w-8 h-8 text-purple-400 opacity-50 flex-shrink-0 ml-2"
        }, null, _parent));
        _push(`</div></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-xs text-[#9ca3af] mb-1">授权IP数</p><p class="text-lg font-bold text-white">${ssrInterpolate(((_a = licenseInfo.value.authorizedIps) == null ? void 0 : _a.length) || 0)}</p></div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-globe-alt",
          class: "w-8 h-8 text-yellow-400 opacity-50"
        }, null, _parent));
        _push(`</div></div></div>`);
        if (licenseInfo.value.authorizedIps && licenseInfo.value.authorizedIps.length > 0) {
          _push(`<div><h4 class="text-sm font-medium text-white mb-3">已授权IP地址</h4><div class="space-y-2"><!--[-->`);
          ssrRenderList(licenseInfo.value.authorizedIps, (ip, index) => {
            _push(`<div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 flex items-center justify-between"><div class="flex items-center gap-3">`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-globe-alt",
              class: "w-5 h-5 text-[#00dc82]"
            }, null, _parent));
            _push(`<div><p class="text-white font-mono">${ssrInterpolate(ip)}</p>`);
            if (ip === licenseInfo.value.serverIp) {
              _push(`<p class="text-xs text-[#00dc82] mt-0.5">当前服务器</p>`);
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
                  _push2(`已授权`);
                } else {
                  return [
                    createTextVNode("已授权")
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
      _push(` ${ssrInterpolate(((_b = licenseInfo.value) == null ? void 0 : _b.isActive) ? "更换授权" : "WordPress订单激活")}</h3><a href="https://hfz.pw/shop/2101.html" target="_blank" class="text-sm text-[#00dc82] hover:text-[#00dc82]/80 flex items-center gap-1"> 前往商城 `);
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
        _push(`<div><h4 class="text-sm font-medium text-yellow-500 mb-1">警告</h4><p class="text-sm text-yellow-500/80"> 当前订单已激活授权，如需更换其他订单，请先取消当前授权。 取消授权后，当前授权记录将被永久删除，不可恢复！ </p></div></div></div>`);
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
              _push2(` 取消授权 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" 取消授权 ")
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
        _push(`<div class="text-sm text-[#9ca3af]"><p class="mb-2">在 <a href="https://hfz.pw/shop/2101.html" target="_blank" class="text-[#00dc82] hover:text-[#00dc82]/80">HFZ商城</a> 购买授权后，使用订单号即可激活</p><p>订单号可在确认邮件或商城订单页面找到</p></div></div></div><div><label class="block text-white font-medium mb-2">WordPress订单号</label>`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: orderNumber.value,
          "onUpdate:modelValue": ($event) => orderNumber.value = $event,
          placeholder: "请输入订单号，例如：202501010001234",
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
          _push(`<div class="flex-1"><div class="${ssrRenderClass([((_h = orderValidation.value) == null ? void 0 : _h.valid) ? "text-green-400" : "text-red-400", "font-medium mb-1"])}">${ssrInterpolate(((_i = orderValidation.value) == null ? void 0 : _i.valid) ? "订单验证成功" : "订单验证失败")}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate((_j = orderValidation.value) == null ? void 0 : _j.message)}</div>`);
          if (((_k = orderValidation.value) == null ? void 0 : _k.valid) && ((_l = orderValidation.value) == null ? void 0 : _l.license)) {
            _push(`<div class="mt-4 space-y-4"><div class="grid grid-cols-3 gap-4"><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(((_n = (_m = orderValidation.value) == null ? void 0 : _m.license) == null ? void 0 : _n.edition) || "N/A")}</p><p class="text-xs text-[#9ca3af] mt-1">授权版本</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate(((_p = (_o = orderValidation.value) == null ? void 0 : _o.license) == null ? void 0 : _p.customerEmail) || "N/A")}</p><p class="text-xs text-[#9ca3af] mt-1">客户邮箱</p></div><div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-md p-3 text-center"><p class="text-lg font-bold text-white">${ssrInterpolate((_r = (_q = orderValidation.value) == null ? void 0 : _q.license) == null ? void 0 : _r.orderNumber)}</p><p class="text-xs text-[#9ca3af] mt-1">订单号</p></div></div>`);
            if ((_s = orderValidation.value) == null ? void 0 : _s.activated) {
              _push(`<div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4"><div class="flex items-center gap-2 text-green-400">`);
              _push(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-5 h-5"
              }, null, _parent));
              _push(`<span class="font-medium">授权激活成功</span></div><p class="text-sm text-[#9ca3af] mt-2"> 授权已成功激活，当前服务器IP已自动绑定到此订单 </p></div>`);
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
              _push2(` 验证订单 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-shield-check",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" 验证订单 ")
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
              _push2(` 立即激活 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-sparkles",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" 立即激活 ")
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CKGEPpP3.js.map
