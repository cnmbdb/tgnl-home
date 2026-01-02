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
import { t as Select_default } from "./Select-BYgtsgZz.js";
import { t as definePageMeta } from "./composables-BTIC2kjU.js";
import { computed, createTextVNode, createVNode, defineComponent, isRef, mergeProps, ref, resolveComponent, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const searchQuery = ref("");
		const statusFilter = ref("all");
		const selectedTimeRange = ref("7d");
		const currentPage = ref(1);
		const pageSize = ref(10);
		const timeRangeOptions = [
			{
				label: "今天",
				value: "1d"
			},
			{
				label: "7天",
				value: "7d"
			},
			{
				label: "30天",
				value: "30d"
			},
			{
				label: "90天",
				value: "90d"
			}
		];
		const statusOptions = [
			{
				label: "全部",
				value: "all"
			},
			{
				label: "待付款",
				value: "pending"
			},
			{
				label: "已付款",
				value: "paid"
			},
			{
				label: "处理中",
				value: "processing"
			},
			{
				label: "已发货",
				value: "shipped"
			},
			{
				label: "已完成",
				value: "completed"
			},
			{
				label: "已取消",
				value: "cancelled"
			}
		];
		const orders = ref([]);
		const loading = ref(false);
		const stats = computed(() => {
			const totalOrders$1 = orders.value.length;
			const totalRevenue = orders.value.reduce((sum, order) => sum + order.amount, 0);
			const successOrders = orders.value.filter((order) => order.status === "completed").length;
			const failedOrders = orders.value.filter((order) => order.status === "cancelled").length;
			const completionRate = totalOrders$1 > 0 ? (successOrders / totalOrders$1 * 100).toFixed(1) : "0";
			return {
				totalOrders: totalOrders$1,
				totalRevenue,
				pendingOrders: failedOrders,
				completionRate: parseFloat(completionRate),
				orderGrowth: 12.5,
				revenueGrowth: 18.3
			};
		});
		const fetchOrders = async () => {
			loading.value = true;
			try {
				const response = await $fetch("/api/orders");
				if (response.success) orders.value = response.data.map((order) => ({
					id: order.id,
					orderNumber: `ORD-${order.id}`,
					user: {
						name: order.username,
						email: `${order.username}@telegram.com`
					},
					product: getProductName(order.productType),
					quantity: 1,
					amount: order.amount,
					status: mapOrderStatus(order.status),
					createdAt: order.createdAt
				}));
			} catch (error) {
				console.error("获取订单数据失败:", error);
			} finally {
				loading.value = false;
			}
		};
		const filteredOrders = computed(() => {
			let filtered = orders.value;
			if (searchQuery.value) filtered = filtered.filter((order) => order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.product.toLowerCase().includes(searchQuery.value.toLowerCase()));
			if (statusFilter.value !== "all") filtered = filtered.filter((order) => order.status === statusFilter.value);
			return filtered;
		});
		const totalOrders = computed(() => filteredOrders.value.length);
		const totalPages = computed(() => Math.ceil(totalOrders.value / pageSize.value));
		const mapOrderStatus = (status) => {
			return {
				"pending": "pending",
				"processing": "processing",
				"completed": "completed",
				"failed": "failed",
				"success": "completed"
			}[status] || status;
		};
		const getProductName = (productType) => {
			return {
				"3_month": "Telegram Premium 3个月",
				"6_month": "Telegram Premium 6个月",
				"12_month": "Telegram Premium 12个月"
			}[productType] || "Telegram Premium";
		};
		const formatNumber = (num) => {
			return new Intl.NumberFormat("zh-CN").format(num);
		};
		const formatDate = (dateString) => {
			return new Date(dateString).toLocaleString("zh-CN");
		};
		const getStatusColor = (status) => {
			return {
				pending: "orange",
				paid: "blue",
				processing: "purple",
				shipped: "cyan",
				completed: "green",
				cancelled: "red",
				failed: "red"
			}[status] || "gray";
		};
		const getStatusLabel = (status) => {
			return {
				pending: "待付款",
				paid: "已付款",
				processing: "处理中",
				shipped: "已发货",
				completed: "已完成",
				cancelled: "已取消",
				failed: "失败"
			}[status] || status;
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
		const retryOrder = async (order) => {
			try {
				const response = await $fetch("/api/orders/retry", {
					method: "POST",
					body: { orderId: order.id }
				});
				if (response.success) {
					console.log("重新开通订单成功:", response.message);
					await refreshOrders();
				} else console.error("重新开通订单失败:", response.error);
			} catch (error) {
				console.error("重新开通失败:", error);
			}
		};
		const confirmDeleteOrder = (order) => {
			if (confirm(`确定要删除订单 ${order.orderNumber} 吗？此操作不可撤销。`)) deleteOrder(order);
		};
		const deleteOrder = async (order) => {
			try {
				const response = await $fetch("/api/orders", {
					method: "DELETE",
					body: { orderId: order.id }
				});
				if (response.success) {
					console.log("删除订单成功:", response.message);
					await refreshOrders();
				} else console.error("删除订单失败:", response.error);
			} catch (error) {
				console.error("删除订单失败:", error);
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = Icon_default;
			const _component_USelect = Select_default;
			const _component_UButton = Button_default;
			const _component_UInput = Input_default;
			const _component_UBadge = Badge_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-shopping-bag",
				class: "w-5 h-5 text-[#00dc82]"
			}, null, _parent));
			_push(`</div> 订单管理 </h1><p class="mt-1 text-sm text-[#9ca3af]">管理所有订单信息和交易记录</p></div><div class="flex gap-2">`);
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
				color: "primary",
				size: "sm",
				class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-arrow-down-tray",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 导出订单 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-down-tray",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 导出订单 ")];
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
			_push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between"><div><p class="text-sm text-[#9ca3af]">总销售额</p><p class="text-2xl font-bold text-white">¥${ssrInterpolate(formatNumber(unref(stats).totalRevenue))}</p><div class="flex items-center mt-1">`);
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
			_push(`</div></div></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-[#0c0c0d]"><tr><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">订单号</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">用户</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">商品</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">金额</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">状态</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">创建时间</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">操作</th></tr></thead><tbody class="divide-y divide-[#2a2a2b]"><!--[-->`);
			ssrRenderList(unref(filteredOrders), (order) => {
				_push(`<tr class="hover:bg-[#2a2a2b]/50"><td class="px-4 py-3"><div class="text-sm font-medium text-white">${ssrInterpolate(order.orderNumber)}</div></td><td class="px-4 py-3"><div class="flex items-center"><div class="w-8 h-8 bg-[#2a2a2b] rounded-full flex items-center justify-center mr-3"><span class="text-xs font-medium text-white">${ssrInterpolate(order.user.name.charAt(0))}</span></div><div><div class="text-sm font-medium text-white">${ssrInterpolate(order.user.name)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(order.user.email)}</div></div></div></td><td class="px-4 py-3"><div class="text-sm text-white">${ssrInterpolate(order.product)}</div><div class="text-sm text-[#9ca3af]">数量: ${ssrInterpolate(order.quantity)}</div></td><td class="px-4 py-3"><div class="text-sm font-medium text-white">¥${ssrInterpolate(formatNumber(order.amount))}</div></td><td class="px-4 py-3">`);
				_push(ssrRenderComponent(_component_UBadge, {
					color: getStatusColor(order.status),
					variant: "subtle",
					size: "sm"
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(`${ssrInterpolate(getStatusLabel(order.status))}`);
						else return [createTextVNode(toDisplayString(getStatusLabel(order.status)), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</td><td class="px-4 py-3 text-sm text-[#9ca3af]">${ssrInterpolate(formatDate(order.createdAt))}</td><td class="px-4 py-3"><div class="flex gap-2">`);
				_push(ssrRenderComponent(_component_UButton, {
					variant: "ghost",
					size: "xs",
					onClick: ($event) => viewOrder(order)
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-eye",
							class: "w-4 h-4"
						}, null, _parent$1, _scopeId));
						else return [createVNode(_component_UIcon, {
							name: "i-heroicons-eye",
							class: "w-4 h-4"
						})];
					}),
					_: 2
				}, _parent));
				if (order.status === "cancelled" || order.status === "failed") _push(ssrRenderComponent(_component_UButton, {
					variant: "ghost",
					size: "xs",
					color: "blue",
					onClick: ($event) => retryOrder(order),
					title: "重新开通"
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
					_: 2
				}, _parent));
				else _push(`<!---->`);
				if (order.status === "pending") _push(ssrRenderComponent(_component_UButton, {
					variant: "ghost",
					size: "xs",
					color: "green",
					onClick: ($event) => processOrder(order)
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-check",
							class: "w-4 h-4"
						}, null, _parent$1, _scopeId));
						else return [createVNode(_component_UIcon, {
							name: "i-heroicons-check",
							class: "w-4 h-4"
						})];
					}),
					_: 2
				}, _parent));
				else _push(`<!---->`);
				_push(ssrRenderComponent(_component_UButton, {
					variant: "ghost",
					size: "xs",
					color: "red",
					onClick: ($event) => confirmDeleteOrder(order),
					title: "删除订单"
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-trash",
							class: "w-4 h-4"
						}, null, _parent$1, _scopeId));
						else return [createVNode(_component_UIcon, {
							name: "i-heroicons-trash",
							class: "w-4 h-4"
						})];
					}),
					_: 2
				}, _parent));
				_push(`</div></td></tr>`);
			});
			_push(`<!--]--></tbody></table></div><div class="px-4 py-3 border-t border-[#2a2a2b] flex items-center justify-between"><div class="text-sm text-[#9ca3af]"> 显示 ${ssrInterpolate((unref(currentPage) - 1) * unref(pageSize) + 1)} 到 ${ssrInterpolate(Math.min(unref(currentPage) * unref(pageSize), unref(totalOrders)))} 条，共 ${ssrInterpolate(unref(totalOrders))} 条 </div><div class="flex gap-2">`);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				size: "sm",
				disabled: unref(currentPage) === 1,
				onClick: ($event) => currentPage.value--
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(` 上一页 `);
					else return [createTextVNode(" 上一页 ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				size: "sm",
				disabled: unref(currentPage) === unref(totalPages),
				onClick: ($event) => currentPage.value++
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(` 下一页 `);
					else return [createTextVNode(" 下一页 ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div>`);
		};
	}
});
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var orders_default = index_vue_vue_type_script_setup_true_lang_default;
export { orders_default as default };

//# sourceMappingURL=orders-PpKj65Nq.js.map