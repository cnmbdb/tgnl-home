import __nuxt_component_0 from "./Icon-ZhGvf9gZ.js";
import __nuxt_component_3 from "./Select-BtlDiiHD.js";
import __nuxt_component_2 from "./Button-D_TCUDyh.js";
import __nuxt_component_2$1 from "./Input-B1mh7BSF.js";
import __nuxt_component_3$1 from "./Badge-BZslOKNb.js";
import { defineComponent, ref, computed, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import "hookable";
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
import "./tooltip-BtqstB0H.js";
import "./useFormGroup-B3564yef.js";
import "./useButtonGroup-6uzJtOJv.js";
import "./Link-CS5wywLd.js";
import "./nuxt-link-C6IP2oPu.js";
import "ohash/utils";
import "./link-Bz3Wc5MF.js";
import "./button-Bz5rwL6o.js";
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
      { label: "今天", value: "1d" },
      { label: "7天", value: "7d" },
      { label: "30天", value: "30d" },
      { label: "90天", value: "90d" }
    ];
    const statusOptions = [
      { label: "全部", value: "all" },
      { label: "待付款", value: "pending" },
      { label: "已付款", value: "paid" },
      { label: "处理中", value: "processing" },
      { label: "已发货", value: "shipped" },
      { label: "已完成", value: "completed" },
      { label: "已取消", value: "cancelled" }
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
        console.log("订单API响应:", response);
        if (response && response.success && response.data) {
          orders.value = response.data;
          console.log("订单数据加载成功:", orders.value.length, "条");
        } else {
          console.error("订单数据加载失败:", (response == null ? void 0 : response.error) || "未知错误");
          if ((response == null ? void 0 : response.error) === "未授权访问") {
            console.warn("需要登录才能查看订单");
          }
        }
      } catch (error) {
        console.error("获取订单数据失败:", error);
      } finally {
        loading.value = false;
      }
    };
    const filteredOrders = computed(() => {
      let filtered = orders.value;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (order) => order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.username.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.nickname.toLowerCase().includes(searchQuery.value.toLowerCase()) || String(order.chatId).includes(searchQuery.value)
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
        pending: "待付款",
        paid: "已付款",
        processing: "处理中",
        shipped: "已发货",
        completed: "已完成",
        cancelled: "已取消"
      };
      return labels[status] || status;
    };
    const refreshOrders = () => {
      fetchOrders();
    };
    const viewOrder = (order) => {
      console.log("查看订单:", order);
    };
    const processOrder = (order) => {
      order.status = "processing";
      console.log("处理订单:", order);
    };
    const cancelOrder = (order) => {
      order.status = "cancelled";
      console.log("取消订单:", order);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_0;
      const _component_USelect = __nuxt_component_3;
      const _component_UButton = __nuxt_component_2;
      const _component_UInput = __nuxt_component_2$1;
      const _component_UBadge = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-bag",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> 订单管理 </h1><p class="mt-1 text-sm text-[#9ca3af]">管理所有能量出租订单记录</p></div><div class="flex gap-2">`);
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
            _push2(` 刷新 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 刷新 ")
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
            _push2(` 导出订单 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-down-tray",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 导出订单 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">总订单数</p><p class="text-2xl font-bold text-white">${ssrInterpolate(formatNumber(unref(stats).totalOrders))}</p><div class="flex items-center mt-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: unref(stats).orderGrowth >= 0 ? "i-heroicons-arrow-trending-up" : "i-heroicons-arrow-trending-down",
        class: [unref(stats).orderGrowth >= 0 ? "text-green-400" : "text-red-400", "w-4 h-4 mr-1"]
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([unref(stats).orderGrowth >= 0 ? "text-green-400" : "text-red-400", "text-sm"])}">${ssrInterpolate(Math.abs(unref(stats).orderGrowth))}% </span><span class="text-[#9ca3af] text-sm ml-1">vs 上期</span></div></div><div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-bag",
        class: "w-6 h-6 text-blue-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">总能量出租额</p><p class="text-2xl font-bold text-white">${ssrInterpolate(formatNumber(unref(stats).totalRevenue))} 能量</p><div class="flex items-center mt-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: unref(stats).revenueGrowth >= 0 ? "i-heroicons-arrow-trending-up" : "i-heroicons-arrow-trending-down",
        class: [unref(stats).revenueGrowth >= 0 ? "text-green-400" : "text-red-400", "w-4 h-4 mr-1"]
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([unref(stats).revenueGrowth >= 0 ? "text-green-400" : "text-red-400", "text-sm"])}">${ssrInterpolate(Math.abs(unref(stats).revenueGrowth))}% </span><span class="text-[#9ca3af] text-sm ml-1">vs 上期</span></div></div><div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-currency-dollar",
        class: "w-6 h-6 text-green-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">待处理订单</p><p class="text-2xl font-bold text-white">${ssrInterpolate(formatNumber(unref(stats).pendingOrders))}</p><div class="flex items-center mt-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-4 h-4 mr-1 text-orange-400"
      }, null, _parent));
      _push(`<span class="text-orange-400 text-sm">需要处理</span></div></div><div class="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-6 h-6 text-orange-400"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">完成率</p><p class="text-2xl font-bold text-white">${ssrInterpolate(unref(stats).completionRate)}%</p><div class="flex items-center mt-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-4 h-4 mr-1 text-green-400"
      }, null, _parent));
      _push(`<span class="text-green-400 text-sm">已完成</span></div></div><div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chart-pie",
        class: "w-6 h-6 text-purple-400"
      }, null, _parent));
      _push(`</div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="p-4 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-white">订单列表</h2><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(searchQuery),
        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        placeholder: "搜索订单号、用户...",
        class: "w-64",
        icon: "i-heroicons-magnifying-glass"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: unref(statusFilter),
        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
        options: statusOptions,
        class: "w-32"
      }, null, _parent));
      _push(`</div></div></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-[#0c0c0d]"><tr><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">订单号</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">用户</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">能量数量</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">金额</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">状态</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">创建时间</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">操作</th></tr></thead><tbody class="divide-y divide-[#2a2a2b]"><!--[-->`);
      ssrRenderList(unref(filteredOrders), (order) => {
        var _a;
        _push(`<tr class="hover:bg-[#2a2a2b]/50"><td class="px-4 py-3"><div class="text-sm font-medium text-white">${ssrInterpolate(order.orderNumber)}</div></td><td class="px-4 py-3"><div class="flex items-center"><div class="w-8 h-8 bg-[#2a2a2b] rounded-full flex items-center justify-center mr-3"><span class="text-xs font-medium text-white">${ssrInterpolate(((_a = order.nickname) == null ? void 0 : _a.charAt(0)) || "U")}</span></div><div><div class="text-sm font-medium text-white">${ssrInterpolate(order.nickname || "未设置")}</div><div class="text-sm text-[#9ca3af]">@${ssrInterpolate(order.username)}</div></div></div></td><td class="px-4 py-3"><div class="text-sm text-white">能量出租</div><div class="text-sm text-[#9ca3af]">Chat ID: ${ssrInterpolate(order.chatId)}</div></td><td class="px-4 py-3"><div class="text-sm font-medium text-white">${ssrInterpolate(order.amount.toFixed(2))} TRX</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(formatNumber(order.amountSun))} SUN</div></td><td class="px-4 py-3">`);
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
      _push(`<!--]--></tbody></table></div><div class="px-4 py-3 border-t border-[#2a2a2b] flex items-center justify-between"><div class="text-sm text-[#9ca3af]"> 显示 ${ssrInterpolate((unref(currentPage) - 1) * unref(pageSize) + 1)} 到 ${ssrInterpolate(Math.min(unref(currentPage) * unref(pageSize), unref(totalOrders)))} 条，共 ${ssrInterpolate(unref(totalOrders))} 条 </div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        disabled: unref(currentPage) === 1,
        onClick: ($event) => currentPage.value--
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 上一页 `);
          } else {
            return [
              createTextVNode(" 上一页 ")
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
            _push2(` 下一页 `);
          } else {
            return [
              createTextVNode(" 下一页 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DB7y0336.js.map
