import __nuxt_component_0 from './Icon-ZhGvf9gZ.mjs';
import __nuxt_component_3 from './Select-BtlDiiHD.mjs';
import __nuxt_component_2 from './Button-D_TCUDyh.mjs';
import __nuxt_component_2$1 from './Input-B1mh7BSF.mjs';
import __nuxt_component_3$1 from './Badge-BZslOKNb.mjs';
import { defineComponent, ref, computed, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
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
import './tooltip-BtqstB0H.mjs';
import './useFormGroup-B3564yef.mjs';
import './useButtonGroup-6uzJtOJv.mjs';
import './Link-CS5wywLd.mjs';
import './nuxt-link-C6IP2oPu.mjs';
import './link-Bz3Wc5MF.mjs';
import './button-Bz5rwL6o.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const statusFilter = ref("all");
    const selectedTimeRange = ref("7d");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const timeRangeOptions = [
      { label: "\u4ECA\u5929", value: "1d" },
      { label: "7\u5929", value: "7d" },
      { label: "30\u5929", value: "30d" },
      { label: "90\u5929", value: "90d" }
    ];
    const statusOptions = [
      { label: "\u5168\u90E8", value: "all" },
      { label: "\u5F85\u4ED8\u6B3E", value: "pending" },
      { label: "\u5DF2\u4ED8\u6B3E", value: "paid" },
      { label: "\u5904\u7406\u4E2D", value: "processing" },
      { label: "\u5DF2\u53D1\u8D27", value: "shipped" },
      { label: "\u5DF2\u5B8C\u6210", value: "completed" },
      { label: "\u5DF2\u53D6\u6D88", value: "cancelled" }
    ];
    const orders = ref([]);
    const loading = ref(false);
    const stats = computed(() => {
      const totalOrders2 = orders.value.length;
      const totalRevenue = orders.value.reduce((sum, order) => sum + order.amount, 0);
      const successOrders = orders.value.filter((order) => order.status === "completed").length;
      const failedOrders = orders.value.filter((order) => order.status === "cancelled").length;
      const completionRate = totalOrders2 > 0 ? (successOrders / totalOrders2 * 100).toFixed(1) : "0";
      return {
        totalOrders: totalOrders2,
        totalRevenue,
        pendingOrders: failedOrders,
        completionRate: parseFloat(completionRate),
        orderGrowth: 12.5,
        // 暂时保持静态值
        revenueGrowth: 18.3
        // 暂时保持静态值
      };
    });
    const fetchOrders = async () => {
      loading.value = true;
      try {
        const response = await $fetch("/api/orders");
        if (response.success) {
          orders.value = response.data.map((order) => ({
            id: order.id,
            orderNumber: `ORD-${order.id}`,
            user: {
              name: order.username,
              email: `${order.username}@telegram.com`
            },
            product: "Telegram Premium Gift",
            quantity: 1,
            amount: order.amount,
            status: order.status === "success" ? "completed" : "cancelled",
            createdAt: order.createdAt
          }));
        }
      } catch (error) {
        console.error("\u83B7\u53D6\u8BA2\u5355\u6570\u636E\u5931\u8D25:", error);
      } finally {
        loading.value = false;
      }
    };
    const filteredOrders = computed(() => {
      let filtered = orders.value;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (order) => order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.product.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      if (statusFilter.value !== "all") {
        filtered = filtered.filter((order) => order.status === statusFilter.value);
      }
      return filtered;
    });
    const totalOrders = computed(() => filteredOrders.value.length);
    const totalPages = computed(() => Math.ceil(totalOrders.value / pageSize.value));
    const formatNumber = (num) => {
      return new Intl.NumberFormat("zh-CN").format(num);
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString("zh-CN");
    };
    const getStatusColor = (status) => {
      const colors = {
        pending: "orange",
        paid: "blue",
        processing: "purple",
        shipped: "cyan",
        completed: "green",
        cancelled: "red"
      };
      return colors[status] || "gray";
    };
    const getStatusLabel = (status) => {
      const labels = {
        pending: "\u5F85\u4ED8\u6B3E",
        paid: "\u5DF2\u4ED8\u6B3E",
        processing: "\u5904\u7406\u4E2D",
        shipped: "\u5DF2\u53D1\u8D27",
        completed: "\u5DF2\u5B8C\u6210",
        cancelled: "\u5DF2\u53D6\u6D88"
      };
      return labels[status] || status;
    };
    const refreshOrders = () => {
      fetchOrders();
    };
    const viewOrder = (order) => {
      console.log("\u67E5\u770B\u8BA2\u5355:", order);
    };
    const processOrder = (order) => {
      order.status = "processing";
      console.log("\u5904\u7406\u8BA2\u5355:", order);
    };
    const cancelOrder = (order) => {
      order.status = "cancelled";
      console.log("\u53D6\u6D88\u8BA2\u5355:", order);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_0;
      const _component_USelect = __nuxt_component_3;
      const _component_UButton = __nuxt_component_2;
      const _component_UInput = __nuxt_component_2$1;
      const _component_UBadge = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chart-bar",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> \u6570\u636E\u5206\u6790 </h1><p class="mt-1 text-sm text-[#9ca3af]">\u5206\u6790\u80FD\u91CF\u51FA\u79DF\u4E1A\u52A1\u6570\u636E\u548C\u8D8B\u52BF</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: unref(selectedTimeRange),
        "onUpdate:modelValue": ($event) => isRef(selectedTimeRange) ? selectedTimeRange.value = $event : null,
        options: timeRangeOptions,
        class: "w-32"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        onClick: refreshOrders
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` \u5237\u65B0 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u5237\u65B0 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "sm",
        class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-down-tray",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` \u5BFC\u51FA\u8BA2\u5355 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-down-tray",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u5BFC\u51FA\u8BA2\u5355 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u603B\u8BA2\u5355\u6570</p><p class="text-2xl font-bold text-white">${ssrInterpolate(formatNumber(unref(stats).totalOrders))}</p><div class="flex items-center mt-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: unref(stats).orderGrowth >= 0 ? "i-heroicons-arrow-trending-up" : "i-heroicons-arrow-trending-down",
        class: [unref(stats).orderGrowth >= 0 ? "text-green-400" : "text-red-400", "w-4 h-4 mr-1"]
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([unref(stats).orderGrowth >= 0 ? "text-green-400" : "text-red-400", "text-sm"])}">${ssrInterpolate(Math.abs(unref(stats).orderGrowth))}% </span><span class="text-[#9ca3af] text-sm ml-1">vs \u4E0A\u671F</span></div></div><div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-bag",
        class: "w-6 h-6 text-blue-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u603B\u9500\u552E\u989D</p><p class="text-2xl font-bold text-white">\xA5${ssrInterpolate(formatNumber(unref(stats).totalRevenue))}</p><div class="flex items-center mt-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: unref(stats).revenueGrowth >= 0 ? "i-heroicons-arrow-trending-up" : "i-heroicons-arrow-trending-down",
        class: [unref(stats).revenueGrowth >= 0 ? "text-green-400" : "text-red-400", "w-4 h-4 mr-1"]
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([unref(stats).revenueGrowth >= 0 ? "text-green-400" : "text-red-400", "text-sm"])}">${ssrInterpolate(Math.abs(unref(stats).revenueGrowth))}% </span><span class="text-[#9ca3af] text-sm ml-1">vs \u4E0A\u671F</span></div></div><div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-currency-dollar",
        class: "w-6 h-6 text-green-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u5F85\u5904\u7406\u8BA2\u5355</p><p class="text-2xl font-bold text-white">${ssrInterpolate(formatNumber(unref(stats).pendingOrders))}</p><div class="flex items-center mt-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-4 h-4 mr-1 text-orange-400"
      }, null, _parent));
      _push(`<span class="text-orange-400 text-sm">\u9700\u8981\u5904\u7406</span></div></div><div class="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-6 h-6 text-orange-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">\u5B8C\u6210\u7387</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).completionRate)}%</p><div class="flex items-center mt-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-4 h-4 mr-1 text-green-400"
      }, null, _parent));
      _push(`<span class="text-green-400 text-sm">\u5DF2\u5B8C\u6210</span></div></div><div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chart-pie",
        class: "w-6 h-6 text-purple-400"
      }, null, _parent));
      _push(`</div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="p-4 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-white">\u8BA2\u5355\u5217\u8868</h2><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(searchQuery),
        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        placeholder: "\u641C\u7D22\u8BA2\u5355\u53F7\u3001\u7528\u6237...",
        class: "w-64",
        icon: "i-heroicons-magnifying-glass"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: unref(statusFilter),
        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
        options: statusOptions,
        class: "w-32"
      }, null, _parent));
      _push(`</div></div></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-[#0c0c0d]"><tr><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u8BA2\u5355\u53F7</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u7528\u6237</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u5546\u54C1</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u91D1\u989D</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u72B6\u6001</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u521B\u5EFA\u65F6\u95F4</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u64CD\u4F5C</th></tr></thead><tbody class="divide-y divide-[#2a2a2b]"><!--[-->`);
      ssrRenderList(unref(filteredOrders), (order) => {
        _push(`<tr class="hover:bg-[#2a2a2b]/50"><td class="px-4 py-3"><div class="text-sm font-medium text-white">${ssrInterpolate(order.orderNumber)}</div></td><td class="px-4 py-3"><div class="flex items-center"><div class="w-8 h-8 bg-[#2a2a2b] rounded-full flex items-center justify-center mr-3"><span class="text-xs font-medium text-white">${ssrInterpolate(order.user.name.charAt(0))}</span></div><div><div class="text-sm font-medium text-white">${ssrInterpolate(order.user.name)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(order.user.email)}</div></div></div></td><td class="px-4 py-3"><div class="text-sm text-white">${ssrInterpolate(order.product)}</div><div class="text-sm text-[#9ca3af]">\u6570\u91CF: ${ssrInterpolate(order.quantity)}</div></td><td class="px-4 py-3"><div class="text-sm font-medium text-white">\xA5${ssrInterpolate(formatNumber(order.amount))}</div></td><td class="px-4 py-3">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: getStatusColor(order.status),
          variant: "subtle",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(getStatusLabel(order.status))}`);
            } else {
              return [
                createTextVNode(toDisplayString(getStatusLabel(order.status)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td><td class="px-4 py-3 text-sm text-[#9ca3af]">${ssrInterpolate(formatDate(order.createdAt))}</td><td class="px-4 py-3"><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "xs",
          onClick: ($event) => viewOrder(order)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-eye",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-eye",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        if (order.status === "pending") {
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            size: "xs",
            color: "green",
            onClick: ($event) => processOrder(order)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-check",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-check",
                    class: "w-4 h-4"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (order.status === "pending") {
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            size: "xs",
            color: "red",
            onClick: ($event) => cancelOrder(order)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-x-mark",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-4 h-4"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="px-4 py-3 border-t border-[#2a2a2b] flex items-center justify-between"><div class="text-sm text-[#9ca3af]"> \u663E\u793A ${ssrInterpolate((unref(currentPage) - 1) * unref(pageSize) + 1)} \u5230 ${ssrInterpolate(Math.min(unref(currentPage) * unref(pageSize), unref(totalOrders)))} \u6761\uFF0C\u5171 ${ssrInterpolate(unref(totalOrders))} \u6761 </div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        disabled: unref(currentPage) === 1,
        onClick: ($event) => currentPage.value--
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u4E0A\u4E00\u9875 `);
          } else {
            return [
              createTextVNode(" \u4E0A\u4E00\u9875 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        disabled: unref(currentPage) === unref(totalPages),
        onClick: ($event) => currentPage.value++
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u4E0B\u4E00\u9875 `);
          } else {
            return [
              createTextVNode(" \u4E0B\u4E00\u9875 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/analytics/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BTPQh6Bw.mjs.map
