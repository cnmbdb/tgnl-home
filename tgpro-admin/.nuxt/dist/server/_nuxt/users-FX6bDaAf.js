import "./components-D5RLOpR9.js";
import "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import "./ui-G7Oicn0a.js";
import { t as Avatar_default } from "./Avatar-CBx6NXk5.js";
import "./micro-task-CYdHJ3PN.js";
import "./active-element-history-DJ1NL7os.js";
import "./keyboard-CvjRf4Wb.js";
import "./focus-management-DFaZHIRF.js";
import "./use-outside-click-B4rja7ys.js";
import "./hidden-Bsn3DsxF.js";
import "./open-closed-Dsm1EOia.js";
import "./portal-BLTG7ywv.js";
import "./transition-CG5tIsRm.js";
import "./description-Y4p4EFv6.js";
import "./useFormGroup-ZK-CpXpd.js";
import { t as Checkbox_default } from "./Checkbox-CDLPJSxq.js";
import "./Link-xfGBFWPh.js";
import "./useButtonGroup-1gNuWR3y.js";
import { t as Button_default } from "./Button-CMkth-mr.js";
import { t as Badge_default } from "./Badge-NTFE8zPq.js";
import { t as FormGroup_default } from "./FormGroup-jUwssykP.js";
import { t as Input_default } from "./Input-Cg9OsLtS.js";
import { t as Select_default } from "./Select-BYgtsgZz.js";
import { t as Card_default } from "./Card-BW8lEMKL.js";
import { t as Modal_default } from "./Modal-BeF6XFDg.js";
import { t as definePageMeta } from "./composables-BTIC2kjU.js";
import { computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, h, isRef, mergeProps, openBlock, ref, resolveComponent, toDisplayString, unref, useSSRContext, watch, withCtx, withModifiers } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
var pageSize = 10;
var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const activeTab = ref("system");
		const searchQuery = ref("");
		const statusFilter = ref("");
		const roleFilter = ref("");
		const currentPage = ref(1);
		const users = ref([]);
		const totalUsers = ref(0);
		const activeUsers = ref(0);
		const newUsersToday = ref(0);
		const onlineUsers = ref(0);
		const loading = ref(false);
		const showUserModal = ref(false);
		const showDeleteModal = ref(false);
		const editingUser = ref(null);
		const deletingUser = ref(null);
		const saving = ref(false);
		const deleting = ref(false);
		const userForm = ref({
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			role: "user",
			status: "active"
		});
		const showImportModal = ref(false);
		const selectedFile = ref(null);
		const previewData = ref([]);
		const importing = ref(false);
		const importResult = ref(null);
		const importOptions = ref({
			updateExisting: false,
			validateData: true
		});
		const statusOptions = [
			{
				label: "全部状态",
				value: ""
			},
			{
				label: "活跃",
				value: "active"
			},
			{
				label: "非活跃",
				value: "inactive"
			},
			{
				label: "已禁用",
				value: "disabled"
			}
		];
		const roleOptions = [
			{
				label: "全部角色",
				value: ""
			},
			{
				label: "管理员",
				value: "admin"
			},
			{
				label: "普通用户",
				value: "user"
			}
		];
		const fetchUsers = async () => {
			loading.value = true;
			try {
				if (activeTab.value === "system") {
					const query = {
						page: currentPage.value,
						limit: pageSize
					};
					if (searchQuery.value) query.search = searchQuery.value;
					if (statusFilter.value) query.status = statusFilter.value;
					if (roleFilter.value) query.role = roleFilter.value;
					const response = await $fetch("/api/system-users", { query });
					if (response.success && response.data) {
						users.value = response.data.users.map((user) => ({
							...user,
							name: user.username,
							lastActive: new Date(user.last_login || user.created_at)
						}));
						totalUsers.value = response.data.pagination.total;
						if (response.data.stats) {
							activeUsers.value = response.data.stats.active_count || 0;
							newUsersToday.value = response.data.stats.total_users || 0;
							onlineUsers.value = response.data.stats.admin_count || 0;
						}
					}
				} else {
					const query = {
						page: currentPage.value,
						limit: pageSize
					};
					if (searchQuery.value) query.search = searchQuery.value;
					if (statusFilter.value) query.status = statusFilter.value;
					const response = await $fetch("/api/tg-users", { query });
					if (response.success && response.data) {
						users.value = response.data.users.map((user) => ({
							...user,
							name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username || "未知用户",
							telegramId: user.tg_user_id,
							lastActive: new Date(user.last_activity || user.created_at)
						}));
						totalUsers.value = response.data.pagination.total;
						if (response.data.stats) {
							activeUsers.value = response.data.stats.active_count || 0;
							newUsersToday.value = response.data.stats.today_new_users || 0;
							onlineUsers.value = response.data.stats.active_count || 0;
						}
					}
				}
			} catch (error) {
				console.error("获取用户数据失败:", error);
			} finally {
				loading.value = false;
			}
		};
		const filteredUsers = computed(() => {
			let filtered = users.value;
			if (searchQuery.value) {
				const query = searchQuery.value.toLowerCase();
				filtered = filtered.filter((user) => user.name.toLowerCase().includes(query) || user.email?.toLowerCase().includes(query) || user.telegramId?.toLowerCase().includes(query));
			}
			if (statusFilter.value) filtered = filtered.filter((user) => user.status === statusFilter.value);
			if (roleFilter.value && activeTab.value === "system") filtered = filtered.filter((user) => user.role === roleFilter.value);
			return filtered;
		});
		const resetFilters = () => {
			searchQuery.value = "";
			statusFilter.value = "";
			roleFilter.value = "";
			currentPage.value = 1;
		};
		const getStatusText = (status) => {
			return {
				active: "活跃",
				inactive: "非活跃",
				disabled: "已禁用"
			}[status] || status;
		};
		const getRoleText = (role) => {
			return {
				admin: "管理员",
				moderator: "版主",
				user: "普通用户"
			}[role] || role;
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
		const formatBalance = (balance) => {
			if (!balance) return "0.00";
			return (balance / 1e6).toFixed(2);
		};
		const editUser = (user) => {
			if (activeTab.value === "system") {
				editingUser.value = user;
				userForm.value = {
					username: user.username,
					email: user.email || "",
					password: "",
					confirmPassword: "",
					role: user.role,
					status: user.status
				};
				showUserModal.value = true;
			} else console.log("编辑Telegram用户:", user);
		};
		const deleteUser = (user) => {
			deletingUser.value = user;
			showDeleteModal.value = true;
		};
		const closeUserModal = () => {
			showUserModal.value = false;
			editingUser.value = null;
			userForm.value = {
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
				role: "user",
				status: "active"
			};
		};
		const saveUser = async () => {
			saving.value = true;
			try {
				if (userForm.value.password && userForm.value.password !== userForm.value.confirmPassword) {
					alert("密码确认不匹配");
					return;
				}
				const userData = {
					username: userForm.value.username,
					email: userForm.value.email,
					role: userForm.value.role,
					status: userForm.value.status
				};
				if (userForm.value.password && userForm.value.password.trim() !== "") userData.password = userForm.value.password;
				let response;
				if (editingUser.value) response = await $fetch("/api/system-users", {
					method: "PUT",
					body: {
						id: editingUser.value.id,
						...userData
					}
				});
				else {
					if (!userForm.value.password || userForm.value.password.trim() === "") {
						alert("创建用户时密码为必填项");
						return;
					}
					response = await $fetch("/api/system-users", {
						method: "POST",
						body: userData
					});
				}
				if (response.success) {
					closeUserModal();
					await fetchUsers();
					alert(editingUser.value ? "用户更新成功" : "用户创建成功");
				} else alert(response.error || "操作失败");
			} catch (error) {
				console.error("保存用户失败:", error);
				alert(error.message || "保存用户失败");
			} finally {
				saving.value = false;
			}
		};
		const confirmDelete = async () => {
			if (!deletingUser.value) return;
			deleting.value = true;
			try {
				const response = await $fetch("/api/system-users", {
					method: "DELETE",
					query: { id: deletingUser.value.id }
				});
				if (response.success) {
					showDeleteModal.value = false;
					deletingUser.value = null;
					await fetchUsers();
					alert("用户删除成功");
				} else alert(response.error || "删除失败");
			} catch (error) {
				console.error("删除用户失败:", error);
				alert(error.message || "删除用户失败");
			} finally {
				deleting.value = false;
			}
		};
		const handleFileUpload = (event) => {
			const file = event.target.files?.[0];
			if (!file) return;
			selectedFile.value = file;
			importResult.value = null;
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const content = e.target?.result;
					let data = [];
					if (file.name.endsWith(".json")) data = JSON.parse(content);
					else if (file.name.endsWith(".csv")) {
						const lines = content.split("\n");
						const headers = lines[0].split(",").map((h$1) => h$1.trim());
						data = lines.slice(1).filter((line) => line.trim()).map((line) => {
							const values = line.split(",").map((v) => v.trim());
							const obj = {};
							headers.forEach((header, index) => {
								obj[header] = values[index] || "";
							});
							return obj;
						});
					}
					if (Array.isArray(data)) previewData.value = data;
					else previewData.value = [data];
				} catch (error) {
					console.error("文件解析错误:", error);
					previewData.value = [];
				}
			};
			reader.readAsText(file);
		};
		const importUsers = async () => {
			if (!selectedFile.value || previewData.value.length === 0) return;
			importing.value = true;
			importResult.value = null;
			try {
				const response = await $fetch("/api/import-users", {
					method: "POST",
					body: {
						users: previewData.value,
						updateExisting: importOptions.value.updateExisting
					}
				});
				importResult.value = response;
				if (response.success) {
					await fetchUsers();
					setTimeout(() => {
						showImportModal.value = false;
						selectedFile.value = null;
						previewData.value = [];
						importResult.value = null;
					}, 3e3);
				}
			} catch (error) {
				importResult.value = {
					success: false,
					message: `导入失败: ${error.message || "未知错误"}`
				};
			} finally {
				importing.value = false;
			}
		};
		watch([
			activeTab,
			searchQuery,
			statusFilter,
			currentPage
		], () => {
			fetchUsers();
		}, { immediate: false });
		watch(activeTab, () => {
			resetFilters();
			fetchUsers();
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = Icon_default;
			const _component_UButton = Button_default;
			const _component_UInput = Input_default;
			const _component_USelect = Select_default;
			const _component_UModal = Modal_default;
			const _component_UCard = Card_default;
			const _component_UCheckbox = Checkbox_default;
			const _component_UFormGroup = FormGroup_default;
			const _component_UAvatar = Avatar_default;
			const _component_UBadge = Badge_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-users",
				class: "w-5 h-5 text-[#00dc82]"
			}, null, _parent));
			_push(`</div> 用户管理 </h1><p class="mt-1 text-sm text-[#9ca3af]">管理系统用户和 Telegram 用户</p></div>`);
			if (unref(activeTab) === "system") _push(ssrRenderComponent(_component_UButton, {
				onClick: ($event) => {
					showUserModal.value = true;
					editingUser.value = null;
				},
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
						_push$1(` 添加系统用户 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-plus",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 添加系统用户 ")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-1"><div class="flex space-x-1"><button class="${ssrRenderClass([{
				"bg-transparent text-[#00dc82] border border-[#00dc82]": unref(activeTab) === "system",
				"text-[#9ca3af] hover:text-white": unref(activeTab) !== "system"
			}, "px-4 py-2 rounded-md transition-all font-medium text-sm"])}"> 系统用户 </button><button class="${ssrRenderClass([{
				"bg-transparent text-[#00dc82] border border-[#00dc82]": unref(activeTab) === "telegram",
				"text-[#9ca3af] hover:text-white": unref(activeTab) !== "telegram"
			}, "px-4 py-2 rounded-md transition-all font-medium text-sm"])}"> Telegram 用户 </button></div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-users",
				class: "w-5 h-5 text-blue-400"
			}, null, _parent));
			_push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">总用户数</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(totalUsers))}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-check-circle",
				class: "w-5 h-5 text-green-400"
			}, null, _parent));
			_push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">活跃用户</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(activeUsers))}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-clock",
				class: "w-5 h-5 text-yellow-400"
			}, null, _parent));
			_push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">今日新增</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(newUsersToday))}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: "i-heroicons-chart-bar",
				class: "w-5 h-5 text-purple-400"
			}, null, _parent));
			_push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">在线用户</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(onlineUsers))}</p></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex flex-col sm:flex-row gap-4"><div class="flex-1">`);
			_push(ssrRenderComponent(_component_UInput, {
				modelValue: unref(searchQuery),
				"onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
				placeholder: unref(activeTab) === "system" ? "搜索用户名或邮箱..." : "搜索用户名或 Telegram ID...",
				icon: "i-heroicons-magnifying-glass",
				class: "w-full"
			}, null, _parent));
			_push(`</div><div class="flex gap-2">`);
			_push(ssrRenderComponent(_component_USelect, {
				modelValue: unref(statusFilter),
				"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
				options: statusOptions,
				placeholder: "状态",
				class: "w-32"
			}, null, _parent));
			if (unref(activeTab) === "system") _push(ssrRenderComponent(_component_USelect, {
				modelValue: unref(roleFilter),
				"onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
				options: roleOptions,
				placeholder: "角色",
				class: "w-32"
			}, null, _parent));
			else _push(`<!---->`);
			if (unref(activeTab) === "telegram") _push(ssrRenderComponent(_component_UButton, {
				onClick: ($event) => showImportModal.value = true,
				color: "primary",
				size: "sm",
				class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-arrow-up-tray",
							class: "w-4 h-4 mr-2"
						}, null, _parent$1, _scopeId));
						_push$1(` 导入用户 `);
					} else return [createVNode(_component_UIcon, {
						name: "i-heroicons-arrow-up-tray",
						class: "w-4 h-4 mr-2"
					}), createTextVNode(" 导入用户 ")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "outline",
				onClick: resetFilters,
				size: "sm"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(` 重置 `);
					else return [createTextVNode(" 重置 ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div>`);
			_push(ssrRenderComponent(_component_UModal, {
				modelValue: unref(showImportModal),
				"onUpdate:modelValue": ($event) => isRef(showImportModal) ? showImportModal.value = $event : null,
				ui: { width: "sm:max-w-2xl" }
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(_component_UCard, { ui: {
						ring: "",
						divide: "divide-y divide-gray-100 dark:divide-gray-800"
					} }, {
						header: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<div class="flex items-center justify-between"${_scopeId$1}><h3 class="text-lg font-semibold text-white"${_scopeId$1}>导入 Telegram 用户</h3>`);
								_push$2(ssrRenderComponent(_component_UButton, {
									color: "gray",
									variant: "ghost",
									icon: "i-heroicons-x-mark-20-solid",
									onClick: ($event) => showImportModal.value = false
								}, null, _parent$2, _scopeId$1));
								_push$2(`</div>`);
							} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "导入 Telegram 用户"), createVNode(_component_UButton, {
								color: "gray",
								variant: "ghost",
								icon: "i-heroicons-x-mark-20-solid",
								onClick: ($event) => showImportModal.value = false
							}, null, 8, ["onClick"])])];
						}),
						footer: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<div class="flex justify-end gap-3"${_scopeId$1}>`);
								_push$2(ssrRenderComponent(_component_UButton, {
									color: "gray",
									variant: "outline",
									onClick: ($event) => showImportModal.value = false
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(` 取消 `);
										else return [createTextVNode(" 取消 ")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(_component_UButton, {
									color: "primary",
									loading: unref(importing),
									disabled: !unref(selectedFile) || unref(previewData).length === 0,
									onClick: importUsers,
									class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(`${ssrInterpolate(unref(importing) ? "导入中..." : "开始导入")}`);
										else return [createTextVNode(toDisplayString(unref(importing) ? "导入中..." : "开始导入"), 1)];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(`</div>`);
							} else return [createVNode("div", { class: "flex justify-end gap-3" }, [createVNode(_component_UButton, {
								color: "gray",
								variant: "outline",
								onClick: ($event) => showImportModal.value = false
							}, {
								default: withCtx(() => [createTextVNode(" 取消 ")]),
								_: 1
							}, 8, ["onClick"]), createVNode(_component_UButton, {
								color: "primary",
								loading: unref(importing),
								disabled: !unref(selectedFile) || unref(previewData).length === 0,
								onClick: importUsers,
								class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(importing) ? "导入中..." : "开始导入"), 1)]),
								_: 1
							}, 8, ["loading", "disabled"])])];
						}),
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<div class="space-y-4"${_scopeId$1}><div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6"${_scopeId$1}><div class="text-center"${_scopeId$1}>`);
								_push$2(ssrRenderComponent(_component_UIcon, {
									name: "i-heroicons-cloud-arrow-up",
									class: "mx-auto h-12 w-12 text-gray-400"
								}, null, _parent$2, _scopeId$1));
								_push$2(`<div class="mt-4"${_scopeId$1}><label for="file-upload" class="cursor-pointer"${_scopeId$1}><span class="mt-2 block text-sm font-medium text-white"${_scopeId$1}> 点击上传文件或拖拽文件到此处 </span><input id="file-upload" name="file-upload" type="file" accept=".json,.csv" class="sr-only"${_scopeId$1}></label><p class="mt-2 text-xs text-gray-500"${_scopeId$1}>支持 JSON 和 CSV 格式</p></div></div></div>`);
								if (unref(selectedFile)) {
									_push$2(`<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"${_scopeId$1}><div class="flex items-center justify-between"${_scopeId$1}><div class="flex items-center"${_scopeId$1}>`);
									_push$2(ssrRenderComponent(_component_UIcon, {
										name: "i-heroicons-document-text",
										class: "h-5 w-5 text-gray-400 mr-2"
									}, null, _parent$2, _scopeId$1));
									_push$2(`<span class="text-sm text-white"${_scopeId$1}>${ssrInterpolate(unref(selectedFile).name)}</span></div>`);
									_push$2(ssrRenderComponent(_component_UButton, {
										color: "gray",
										variant: "ghost",
										size: "xs",
										onClick: ($event) => selectedFile.value = null
									}, {
										default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) _push$3(ssrRenderComponent(_component_UIcon, {
												name: "i-heroicons-x-mark",
												class: "h-4 w-4"
											}, null, _parent$3, _scopeId$2));
											else return [createVNode(_component_UIcon, {
												name: "i-heroicons-x-mark",
												class: "h-4 w-4"
											})];
										}),
										_: 1
									}, _parent$2, _scopeId$1));
									_push$2(`</div></div>`);
								} else _push$2(`<!---->`);
								if (unref(previewData).length > 0) _push$2(`<div class="space-y-2"${_scopeId$1}><h4 class="text-sm font-medium text-white"${_scopeId$1}>数据预览 (前5条)</h4><div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto"${_scopeId$1}><pre class="text-xs text-gray-600 dark:text-gray-300"${_scopeId$1}>${ssrInterpolate(JSON.stringify(unref(previewData).slice(0, 5), null, 2))}</pre></div></div>`);
								else _push$2(`<!---->`);
								_push$2(`<div class="space-y-3"${_scopeId$1}>`);
								_push$2(ssrRenderComponent(_component_UCheckbox, {
									modelValue: unref(importOptions).updateExisting,
									"onUpdate:modelValue": ($event) => unref(importOptions).updateExisting = $event,
									label: "更新已存在的用户"
								}, null, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(_component_UCheckbox, {
									modelValue: unref(importOptions).validateData,
									"onUpdate:modelValue": ($event) => unref(importOptions).validateData = $event,
									label: "验证数据格式"
								}, null, _parent$2, _scopeId$1));
								_push$2(`</div>`);
								if (unref(importResult)) {
									_push$2(`<div class="space-y-2"${_scopeId$1}><div class="${ssrRenderClass([unref(importResult).success ? "text-green-600" : "text-red-600", "text-sm font-medium"])}"${_scopeId$1}>${ssrInterpolate(unref(importResult).message)}</div>`);
									if (unref(importResult).data) _push$2(`<div class="text-xs text-gray-500"${_scopeId$1}> 成功: ${ssrInterpolate(unref(importResult).data.imported)}, 跳过: ${ssrInterpolate(unref(importResult).data.skipped)}, 错误: ${ssrInterpolate(unref(importResult).data.errors?.length || 0)}</div>`);
									else _push$2(`<!---->`);
									_push$2(`</div>`);
								} else _push$2(`<!---->`);
								_push$2(`</div>`);
							} else return [createVNode("div", { class: "space-y-4" }, [
								createVNode("div", { class: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6" }, [createVNode("div", { class: "text-center" }, [createVNode(_component_UIcon, {
									name: "i-heroicons-cloud-arrow-up",
									class: "mx-auto h-12 w-12 text-gray-400"
								}), createVNode("div", { class: "mt-4" }, [createVNode("label", {
									for: "file-upload",
									class: "cursor-pointer"
								}, [createVNode("span", { class: "mt-2 block text-sm font-medium text-white" }, " 点击上传文件或拖拽文件到此处 "), createVNode("input", {
									id: "file-upload",
									name: "file-upload",
									type: "file",
									accept: ".json,.csv",
									class: "sr-only",
									onChange: handleFileUpload
								}, null, 32)]), createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "支持 JSON 和 CSV 格式")])])]),
								unref(selectedFile) ? (openBlock(), createBlock("div", {
									key: 0,
									class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
								}, [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("div", { class: "flex items-center" }, [createVNode(_component_UIcon, {
									name: "i-heroicons-document-text",
									class: "h-5 w-5 text-gray-400 mr-2"
								}), createVNode("span", { class: "text-sm text-white" }, toDisplayString(unref(selectedFile).name), 1)]), createVNode(_component_UButton, {
									color: "gray",
									variant: "ghost",
									size: "xs",
									onClick: ($event) => selectedFile.value = null
								}, {
									default: withCtx(() => [createVNode(_component_UIcon, {
										name: "i-heroicons-x-mark",
										class: "h-4 w-4"
									})]),
									_: 1
								}, 8, ["onClick"])])])) : createCommentVNode("", true),
								unref(previewData).length > 0 ? (openBlock(), createBlock("div", {
									key: 1,
									class: "space-y-2"
								}, [createVNode("h4", { class: "text-sm font-medium text-white" }, "数据预览 (前5条)"), createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto" }, [createVNode("pre", { class: "text-xs text-gray-600 dark:text-gray-300" }, toDisplayString(JSON.stringify(unref(previewData).slice(0, 5), null, 2)), 1)])])) : createCommentVNode("", true),
								createVNode("div", { class: "space-y-3" }, [createVNode(_component_UCheckbox, {
									modelValue: unref(importOptions).updateExisting,
									"onUpdate:modelValue": ($event) => unref(importOptions).updateExisting = $event,
									label: "更新已存在的用户"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_UCheckbox, {
									modelValue: unref(importOptions).validateData,
									"onUpdate:modelValue": ($event) => unref(importOptions).validateData = $event,
									label: "验证数据格式"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								unref(importResult) ? (openBlock(), createBlock("div", {
									key: 2,
									class: "space-y-2"
								}, [createVNode("div", { class: [unref(importResult).success ? "text-green-600" : "text-red-600", "text-sm font-medium"] }, toDisplayString(unref(importResult).message), 3), unref(importResult).data ? (openBlock(), createBlock("div", {
									key: 0,
									class: "text-xs text-gray-500"
								}, " 成功: " + toDisplayString(unref(importResult).data.imported) + ", 跳过: " + toDisplayString(unref(importResult).data.skipped) + ", 错误: " + toDisplayString(unref(importResult).data.errors?.length || 0), 1)) : createCommentVNode("", true)])) : createCommentVNode("", true)
							])];
						}),
						_: 1
					}, _parent$1, _scopeId));
					else return [createVNode(_component_UCard, { ui: {
						ring: "",
						divide: "divide-y divide-gray-100 dark:divide-gray-800"
					} }, {
						header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "导入 Telegram 用户"), createVNode(_component_UButton, {
							color: "gray",
							variant: "ghost",
							icon: "i-heroicons-x-mark-20-solid",
							onClick: ($event) => showImportModal.value = false
						}, null, 8, ["onClick"])])]),
						footer: withCtx(() => [createVNode("div", { class: "flex justify-end gap-3" }, [createVNode(_component_UButton, {
							color: "gray",
							variant: "outline",
							onClick: ($event) => showImportModal.value = false
						}, {
							default: withCtx(() => [createTextVNode(" 取消 ")]),
							_: 1
						}, 8, ["onClick"]), createVNode(_component_UButton, {
							color: "primary",
							loading: unref(importing),
							disabled: !unref(selectedFile) || unref(previewData).length === 0,
							onClick: importUsers,
							class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(importing) ? "导入中..." : "开始导入"), 1)]),
							_: 1
						}, 8, ["loading", "disabled"])])]),
						default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [
							createVNode("div", { class: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6" }, [createVNode("div", { class: "text-center" }, [createVNode(_component_UIcon, {
								name: "i-heroicons-cloud-arrow-up",
								class: "mx-auto h-12 w-12 text-gray-400"
							}), createVNode("div", { class: "mt-4" }, [createVNode("label", {
								for: "file-upload",
								class: "cursor-pointer"
							}, [createVNode("span", { class: "mt-2 block text-sm font-medium text-white" }, " 点击上传文件或拖拽文件到此处 "), createVNode("input", {
								id: "file-upload",
								name: "file-upload",
								type: "file",
								accept: ".json,.csv",
								class: "sr-only",
								onChange: handleFileUpload
							}, null, 32)]), createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "支持 JSON 和 CSV 格式")])])]),
							unref(selectedFile) ? (openBlock(), createBlock("div", {
								key: 0,
								class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
							}, [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("div", { class: "flex items-center" }, [createVNode(_component_UIcon, {
								name: "i-heroicons-document-text",
								class: "h-5 w-5 text-gray-400 mr-2"
							}), createVNode("span", { class: "text-sm text-white" }, toDisplayString(unref(selectedFile).name), 1)]), createVNode(_component_UButton, {
								color: "gray",
								variant: "ghost",
								size: "xs",
								onClick: ($event) => selectedFile.value = null
							}, {
								default: withCtx(() => [createVNode(_component_UIcon, {
									name: "i-heroicons-x-mark",
									class: "h-4 w-4"
								})]),
								_: 1
							}, 8, ["onClick"])])])) : createCommentVNode("", true),
							unref(previewData).length > 0 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "space-y-2"
							}, [createVNode("h4", { class: "text-sm font-medium text-white" }, "数据预览 (前5条)"), createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto" }, [createVNode("pre", { class: "text-xs text-gray-600 dark:text-gray-300" }, toDisplayString(JSON.stringify(unref(previewData).slice(0, 5), null, 2)), 1)])])) : createCommentVNode("", true),
							createVNode("div", { class: "space-y-3" }, [createVNode(_component_UCheckbox, {
								modelValue: unref(importOptions).updateExisting,
								"onUpdate:modelValue": ($event) => unref(importOptions).updateExisting = $event,
								label: "更新已存在的用户"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_UCheckbox, {
								modelValue: unref(importOptions).validateData,
								"onUpdate:modelValue": ($event) => unref(importOptions).validateData = $event,
								label: "验证数据格式"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							unref(importResult) ? (openBlock(), createBlock("div", {
								key: 2,
								class: "space-y-2"
							}, [createVNode("div", { class: [unref(importResult).success ? "text-green-600" : "text-red-600", "text-sm font-medium"] }, toDisplayString(unref(importResult).message), 3), unref(importResult).data ? (openBlock(), createBlock("div", {
								key: 0,
								class: "text-xs text-gray-500"
							}, " 成功: " + toDisplayString(unref(importResult).data.imported) + ", 跳过: " + toDisplayString(unref(importResult).data.skipped) + ", 错误: " + toDisplayString(unref(importResult).data.errors?.length || 0), 1)) : createCommentVNode("", true)])) : createCommentVNode("", true)
						])]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UModal, {
				modelValue: unref(showUserModal),
				"onUpdate:modelValue": ($event) => isRef(showUserModal) ? showUserModal.value = $event : null,
				ui: { width: "sm:max-w-md" }
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(_component_UCard, { ui: {
						ring: "",
						divide: "divide-y divide-gray-100 dark:divide-gray-800"
					} }, {
						header: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<div class="flex items-center justify-between"${_scopeId$1}><h3 class="text-lg font-semibold text-white"${_scopeId$1}>${ssrInterpolate(unref(editingUser) ? "编辑系统用户" : "新建系统用户")}</h3>`);
								_push$2(ssrRenderComponent(_component_UButton, {
									color: "gray",
									variant: "ghost",
									icon: "i-heroicons-x-mark-20-solid",
									onClick: closeUserModal
								}, null, _parent$2, _scopeId$1));
								_push$2(`</div>`);
							} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, toDisplayString(unref(editingUser) ? "编辑系统用户" : "新建系统用户"), 1), createVNode(_component_UButton, {
								color: "gray",
								variant: "ghost",
								icon: "i-heroicons-x-mark-20-solid",
								onClick: closeUserModal
							})])];
						}),
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<form class="space-y-4"${_scopeId$1}>`);
								_push$2(ssrRenderComponent(_component_UFormGroup, {
									label: "用户名",
									name: "username",
									required: ""
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(ssrRenderComponent(_component_UInput, {
											modelValue: unref(userForm).username,
											"onUpdate:modelValue": ($event) => unref(userForm).username = $event,
											placeholder: "请输入用户名",
											required: ""
										}, null, _parent$3, _scopeId$2));
										else return [createVNode(_component_UInput, {
											modelValue: unref(userForm).username,
											"onUpdate:modelValue": ($event) => unref(userForm).username = $event,
											placeholder: "请输入用户名",
											required: ""
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(_component_UFormGroup, {
									label: "邮箱",
									name: "email"
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(ssrRenderComponent(_component_UInput, {
											modelValue: unref(userForm).email,
											"onUpdate:modelValue": ($event) => unref(userForm).email = $event,
											type: "email",
											placeholder: "请输入邮箱地址"
										}, null, _parent$3, _scopeId$2));
										else return [createVNode(_component_UInput, {
											modelValue: unref(userForm).email,
											"onUpdate:modelValue": ($event) => unref(userForm).email = $event,
											type: "email",
											placeholder: "请输入邮箱地址"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(_component_UFormGroup, {
									label: "密码",
									name: "password",
									required: !unref(editingUser)
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(ssrRenderComponent(_component_UInput, {
											modelValue: unref(userForm).password,
											"onUpdate:modelValue": ($event) => unref(userForm).password = $event,
											type: "password",
											placeholder: unref(editingUser) ? "留空则不修改密码" : "请输入密码"
										}, null, _parent$3, _scopeId$2));
										else return [createVNode(_component_UInput, {
											modelValue: unref(userForm).password,
											"onUpdate:modelValue": ($event) => unref(userForm).password = $event,
											type: "password",
											placeholder: unref(editingUser) ? "留空则不修改密码" : "请输入密码"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"placeholder"
										])];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(_component_UFormGroup, {
									label: "确认密码",
									name: "confirmPassword",
									required: !unref(editingUser) && !!unref(userForm).password
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(ssrRenderComponent(_component_UInput, {
											modelValue: unref(userForm).confirmPassword,
											"onUpdate:modelValue": ($event) => unref(userForm).confirmPassword = $event,
											type: "password",
											placeholder: "请再次输入密码"
										}, null, _parent$3, _scopeId$2));
										else return [createVNode(_component_UInput, {
											modelValue: unref(userForm).confirmPassword,
											"onUpdate:modelValue": ($event) => unref(userForm).confirmPassword = $event,
											type: "password",
											placeholder: "请再次输入密码"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(_component_UFormGroup, {
									label: "角色",
									name: "role",
									required: ""
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(ssrRenderComponent(_component_USelect, {
											modelValue: unref(userForm).role,
											"onUpdate:modelValue": ($event) => unref(userForm).role = $event,
											options: [{
												label: "管理员",
												value: "admin"
											}, {
												label: "普通用户",
												value: "user"
											}],
											placeholder: "请选择角色"
										}, null, _parent$3, _scopeId$2));
										else return [createVNode(_component_USelect, {
											modelValue: unref(userForm).role,
											"onUpdate:modelValue": ($event) => unref(userForm).role = $event,
											options: [{
												label: "管理员",
												value: "admin"
											}, {
												label: "普通用户",
												value: "user"
											}],
											placeholder: "请选择角色"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(_component_UFormGroup, {
									label: "状态",
									name: "status",
									required: ""
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(ssrRenderComponent(_component_USelect, {
											modelValue: unref(userForm).status,
											"onUpdate:modelValue": ($event) => unref(userForm).status = $event,
											options: [{
												label: "活跃",
												value: "active"
											}, {
												label: "非活跃",
												value: "inactive"
											}],
											placeholder: "请选择状态"
										}, null, _parent$3, _scopeId$2));
										else return [createVNode(_component_USelect, {
											modelValue: unref(userForm).status,
											"onUpdate:modelValue": ($event) => unref(userForm).status = $event,
											options: [{
												label: "活跃",
												value: "active"
											}, {
												label: "非活跃",
												value: "inactive"
											}],
											placeholder: "请选择状态"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(`<div class="flex justify-end gap-3 pt-4"${_scopeId$1}>`);
								_push$2(ssrRenderComponent(_component_UButton, {
									color: "gray",
									variant: "outline",
									onClick: closeUserModal
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(` 取消 `);
										else return [createTextVNode(" 取消 ")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(_component_UButton, {
									type: "submit",
									color: "primary",
									loading: unref(saving),
									class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(`${ssrInterpolate(unref(saving) ? "保存中..." : unref(editingUser) ? "更新" : "创建")}`);
										else return [createTextVNode(toDisplayString(unref(saving) ? "保存中..." : unref(editingUser) ? "更新" : "创建"), 1)];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(`</div></form>`);
							} else return [createVNode("form", {
								onSubmit: withModifiers(saveUser, ["prevent"]),
								class: "space-y-4"
							}, [
								createVNode(_component_UFormGroup, {
									label: "用户名",
									name: "username",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(userForm).username,
										"onUpdate:modelValue": ($event) => unref(userForm).username = $event,
										placeholder: "请输入用户名",
										required: ""
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, {
									label: "邮箱",
									name: "email"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(userForm).email,
										"onUpdate:modelValue": ($event) => unref(userForm).email = $event,
										type: "email",
										placeholder: "请输入邮箱地址"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, {
									label: "密码",
									name: "password",
									required: !unref(editingUser)
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(userForm).password,
										"onUpdate:modelValue": ($event) => unref(userForm).password = $event,
										type: "password",
										placeholder: unref(editingUser) ? "留空则不修改密码" : "请输入密码"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"placeholder"
									])]),
									_: 1
								}, 8, ["required"]),
								createVNode(_component_UFormGroup, {
									label: "确认密码",
									name: "confirmPassword",
									required: !unref(editingUser) && !!unref(userForm).password
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(userForm).confirmPassword,
										"onUpdate:modelValue": ($event) => unref(userForm).confirmPassword = $event,
										type: "password",
										placeholder: "请再次输入密码"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["required"]),
								createVNode(_component_UFormGroup, {
									label: "角色",
									name: "role",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(userForm).role,
										"onUpdate:modelValue": ($event) => unref(userForm).role = $event,
										options: [{
											label: "管理员",
											value: "admin"
										}, {
											label: "普通用户",
											value: "user"
										}],
										placeholder: "请选择角色"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, {
									label: "状态",
									name: "status",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(userForm).status,
										"onUpdate:modelValue": ($event) => unref(userForm).status = $event,
										options: [{
											label: "活跃",
											value: "active"
										}, {
											label: "非活跃",
											value: "inactive"
										}],
										placeholder: "请选择状态"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [createVNode(_component_UButton, {
									color: "gray",
									variant: "outline",
									onClick: closeUserModal
								}, {
									default: withCtx(() => [createTextVNode(" 取消 ")]),
									_: 1
								}), createVNode(_component_UButton, {
									type: "submit",
									color: "primary",
									loading: unref(saving),
									class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(unref(saving) ? "保存中..." : unref(editingUser) ? "更新" : "创建"), 1)]),
									_: 1
								}, 8, ["loading"])])
							], 32)];
						}),
						_: 1
					}, _parent$1, _scopeId));
					else return [createVNode(_component_UCard, { ui: {
						ring: "",
						divide: "divide-y divide-gray-100 dark:divide-gray-800"
					} }, {
						header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, toDisplayString(unref(editingUser) ? "编辑系统用户" : "新建系统用户"), 1), createVNode(_component_UButton, {
							color: "gray",
							variant: "ghost",
							icon: "i-heroicons-x-mark-20-solid",
							onClick: closeUserModal
						})])]),
						default: withCtx(() => [createVNode("form", {
							onSubmit: withModifiers(saveUser, ["prevent"]),
							class: "space-y-4"
						}, [
							createVNode(_component_UFormGroup, {
								label: "用户名",
								name: "username",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(userForm).username,
									"onUpdate:modelValue": ($event) => unref(userForm).username = $event,
									placeholder: "请输入用户名",
									required: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, {
								label: "邮箱",
								name: "email"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(userForm).email,
									"onUpdate:modelValue": ($event) => unref(userForm).email = $event,
									type: "email",
									placeholder: "请输入邮箱地址"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, {
								label: "密码",
								name: "password",
								required: !unref(editingUser)
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(userForm).password,
									"onUpdate:modelValue": ($event) => unref(userForm).password = $event,
									type: "password",
									placeholder: unref(editingUser) ? "留空则不修改密码" : "请输入密码"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"placeholder"
								])]),
								_: 1
							}, 8, ["required"]),
							createVNode(_component_UFormGroup, {
								label: "确认密码",
								name: "confirmPassword",
								required: !unref(editingUser) && !!unref(userForm).password
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(userForm).confirmPassword,
									"onUpdate:modelValue": ($event) => unref(userForm).confirmPassword = $event,
									type: "password",
									placeholder: "请再次输入密码"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}, 8, ["required"]),
							createVNode(_component_UFormGroup, {
								label: "角色",
								name: "role",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(userForm).role,
									"onUpdate:modelValue": ($event) => unref(userForm).role = $event,
									options: [{
										label: "管理员",
										value: "admin"
									}, {
										label: "普通用户",
										value: "user"
									}],
									placeholder: "请选择角色"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, {
								label: "状态",
								name: "status",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(userForm).status,
									"onUpdate:modelValue": ($event) => unref(userForm).status = $event,
									options: [{
										label: "活跃",
										value: "active"
									}, {
										label: "非活跃",
										value: "inactive"
									}],
									placeholder: "请选择状态"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [createVNode(_component_UButton, {
								color: "gray",
								variant: "outline",
								onClick: closeUserModal
							}, {
								default: withCtx(() => [createTextVNode(" 取消 ")]),
								_: 1
							}), createVNode(_component_UButton, {
								type: "submit",
								color: "primary",
								loading: unref(saving),
								class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(saving) ? "保存中..." : unref(editingUser) ? "更新" : "创建"), 1)]),
								_: 1
							}, 8, ["loading"])])
						], 32)]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UModal, {
				modelValue: unref(showDeleteModal),
				"onUpdate:modelValue": ($event) => isRef(showDeleteModal) ? showDeleteModal.value = $event : null,
				ui: { width: "sm:max-w-md" }
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(ssrRenderComponent(_component_UCard, { ui: {
						ring: "",
						divide: "divide-y divide-gray-100 dark:divide-gray-800"
					} }, {
						header: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<div class="flex items-center justify-between"${_scopeId$1}><h3 class="text-lg font-semibold text-white"${_scopeId$1}>确认删除</h3>`);
								_push$2(ssrRenderComponent(_component_UButton, {
									color: "gray",
									variant: "ghost",
									icon: "i-heroicons-x-mark-20-solid",
									onClick: ($event) => showDeleteModal.value = false
								}, null, _parent$2, _scopeId$1));
								_push$2(`</div>`);
							} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "确认删除"), createVNode(_component_UButton, {
								color: "gray",
								variant: "ghost",
								icon: "i-heroicons-x-mark-20-solid",
								onClick: ($event) => showDeleteModal.value = false
							}, null, 8, ["onClick"])])];
						}),
						footer: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<div class="flex justify-end gap-3"${_scopeId$1}>`);
								_push$2(ssrRenderComponent(_component_UButton, {
									color: "gray",
									variant: "outline",
									onClick: ($event) => showDeleteModal.value = false
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(` 取消 `);
										else return [createTextVNode(" 取消 ")];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(ssrRenderComponent(_component_UButton, {
									color: "red",
									loading: unref(deleting),
									onClick: confirmDelete
								}, {
									default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
										if (_push$3) _push$3(`${ssrInterpolate(unref(deleting) ? "删除中..." : "确认删除")}`);
										else return [createTextVNode(toDisplayString(unref(deleting) ? "删除中..." : "确认删除"), 1)];
									}),
									_: 1
								}, _parent$2, _scopeId$1));
								_push$2(`</div>`);
							} else return [createVNode("div", { class: "flex justify-end gap-3" }, [createVNode(_component_UButton, {
								color: "gray",
								variant: "outline",
								onClick: ($event) => showDeleteModal.value = false
							}, {
								default: withCtx(() => [createTextVNode(" 取消 ")]),
								_: 1
							}, 8, ["onClick"]), createVNode(_component_UButton, {
								color: "red",
								loading: unref(deleting),
								onClick: confirmDelete
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(deleting) ? "删除中..." : "确认删除"), 1)]),
								_: 1
							}, 8, ["loading"])])];
						}),
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) _push$2(`<div class="space-y-4"${_scopeId$1}><p class="text-white"${_scopeId$1}> 确定要删除用户 <span class="font-semibold text-[#00dc82]"${_scopeId$1}>${ssrInterpolate(unref(deletingUser)?.username || unref(deletingUser)?.name)}</span> 吗？ </p><p class="text-sm text-[#9ca3af]"${_scopeId$1}> 此操作不可撤销，请谨慎操作。 </p></div>`);
							else return [createVNode("div", { class: "space-y-4" }, [createVNode("p", { class: "text-white" }, [
								createTextVNode(" 确定要删除用户 "),
								createVNode("span", { class: "font-semibold text-[#00dc82]" }, toDisplayString(unref(deletingUser)?.username || unref(deletingUser)?.name), 1),
								createTextVNode(" 吗？ ")
							]), createVNode("p", { class: "text-sm text-[#9ca3af]" }, " 此操作不可撤销，请谨慎操作。 ")])];
						}),
						_: 1
					}, _parent$1, _scopeId));
					else return [createVNode(_component_UCard, { ui: {
						ring: "",
						divide: "divide-y divide-gray-100 dark:divide-gray-800"
					} }, {
						header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "确认删除"), createVNode(_component_UButton, {
							color: "gray",
							variant: "ghost",
							icon: "i-heroicons-x-mark-20-solid",
							onClick: ($event) => showDeleteModal.value = false
						}, null, 8, ["onClick"])])]),
						footer: withCtx(() => [createVNode("div", { class: "flex justify-end gap-3" }, [createVNode(_component_UButton, {
							color: "gray",
							variant: "outline",
							onClick: ($event) => showDeleteModal.value = false
						}, {
							default: withCtx(() => [createTextVNode(" 取消 ")]),
							_: 1
						}, 8, ["onClick"]), createVNode(_component_UButton, {
							color: "red",
							loading: unref(deleting),
							onClick: confirmDelete
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(deleting) ? "删除中..." : "确认删除"), 1)]),
							_: 1
						}, 8, ["loading"])])]),
						default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [createVNode("p", { class: "text-white" }, [
							createTextVNode(" 确定要删除用户 "),
							createVNode("span", { class: "font-semibold text-[#00dc82]" }, toDisplayString(unref(deletingUser)?.username || unref(deletingUser)?.name), 1),
							createTextVNode(" 吗？ ")
						]), createVNode("p", { class: "text-sm text-[#9ca3af]" }, " 此操作不可撤销，请谨慎操作。 ")])]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`<div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg overflow-hidden"><div class="px-4 py-3 border-b border-[#2a2a2b]"><h3 class="text-lg font-medium text-white">${ssrInterpolate(unref(activeTab) === "system" ? "系统用户列表" : "Telegram 用户列表")}</h3></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-[#0c0c0d]"><tr><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">用户</th>`);
			if (unref(activeTab) === "telegram") _push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">TGID</th>`);
			else _push(`<!---->`);
			_push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">状态</th>`);
			if (unref(activeTab) === "system") _push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">角色</th>`);
			else _push(`<!---->`);
			if (unref(activeTab) === "telegram") _push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">余额</th>`);
			else _push(`<!---->`);
			_push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">最后活跃</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">操作</th></tr></thead><tbody class="divide-y divide-[#2a2a2b]"><!--[-->`);
			ssrRenderList(unref(filteredUsers), (user) => {
				_push(`<tr class="hover:bg-[#2a2a2b]/50 transition-colors"><td class="px-4 py-3"><div class="flex items-center">`);
				_push(ssrRenderComponent(_component_UAvatar, {
					src: user.avatar,
					alt: user.name,
					size: "sm",
					class: "mr-3"
				}, null, _parent));
				_push(`<div><div class="text-sm font-medium text-white">${ssrInterpolate(user.name)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(user.email || (user.username ? "@" + user.username : "无用户名"))}</div></div></div></td>`);
				if (unref(activeTab) === "telegram") _push(`<td class="px-4 py-3"><div class="text-sm text-white font-mono">${ssrInterpolate(user.telegramId || user.tg_user_id)}</div></td>`);
				else _push(`<!---->`);
				_push(`<td class="px-4 py-3">`);
				_push(ssrRenderComponent(_component_UBadge, {
					color: user.status === "active" ? "green" : user.status === "inactive" ? "gray" : "red",
					variant: "subtle",
					size: "sm"
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(`${ssrInterpolate(getStatusText(user.status))}`);
						else return [createTextVNode(toDisplayString(getStatusText(user.status)), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</td>`);
				if (unref(activeTab) === "system") {
					_push(`<td class="px-4 py-3">`);
					_push(ssrRenderComponent(_component_UBadge, {
						color: user.role === "admin" ? "blue" : user.role === "moderator" ? "purple" : "gray",
						variant: "subtle",
						size: "sm"
					}, {
						default: withCtx((_, _push$1, _parent$1, _scopeId) => {
							if (_push$1) _push$1(`${ssrInterpolate(getRoleText(user.role))}`);
							else return [createTextVNode(toDisplayString(getRoleText(user.role)), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</td>`);
				} else _push(`<!---->`);
				if (unref(activeTab) === "telegram") _push(`<td class="px-4 py-3"><div class="text-sm text-white font-medium">${ssrInterpolate(formatBalance(user.balance))} USDT </div></td>`);
				else _push(`<!---->`);
				_push(`<td class="px-4 py-3 text-sm text-[#9ca3af]">${ssrInterpolate(formatDate(user.lastActive))}</td><td class="px-4 py-3"><div class="flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_UButton, {
					variant: "ghost",
					size: "sm",
					onClick: ($event) => editUser(user)
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
							name: "i-heroicons-pencil",
							class: "w-4 h-4"
						}, null, _parent$1, _scopeId));
						else return [createVNode(_component_UIcon, {
							name: "i-heroicons-pencil",
							class: "w-4 h-4"
						})];
					}),
					_: 2
				}, _parent));
				_push(ssrRenderComponent(_component_UButton, {
					variant: "ghost",
					size: "sm",
					color: "red",
					onClick: ($event) => deleteUser(user)
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
			_push(`<!--]--></tbody></table></div><div class="px-4 py-3 border-t border-[#2a2a2b] flex items-center justify-between"><div class="text-sm text-[#9ca3af]"> 显示 ${ssrInterpolate((unref(currentPage) - 1) * pageSize + 1)} - ${ssrInterpolate(Math.min(unref(currentPage) * pageSize, unref(totalUsers)))} 条，共 ${ssrInterpolate(unref(totalUsers))} 条 </div><div class="flex items-center gap-2">`);
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
				disabled: unref(currentPage) * pageSize >= unref(totalUsers),
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var users_default = index_vue_vue_type_script_setup_true_lang_default;
export { users_default as default };

//# sourceMappingURL=users-FX6bDaAf.js.map