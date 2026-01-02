import Icon_default from './Icon-BQxbVddL.mjs';
import Avatar_default from './Avatar-RiJ55zLR.mjs';
import Checkbox_default from './Checkbox-DU9jOqk6.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import Badge_default from './Badge-Bb9IcqQP.mjs';
import FormGroup_default from './FormGroup-C-BMHVTQ.mjs';
import Input_default from './Input-CbhZIhGI.mjs';
import Select_default from './Select-Cx-ISQOC.mjs';
import Card_default from './Card-CV7B2HPk.mjs';
import Modal_default from './Modal-BbhoxMMu.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, isRef, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import './components-CqoEyeNn.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'mysql2/promise';
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
import 'vue-router';
import 'perfect-debounce';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@iconify/utils/lib/css/icon';
import './_plugin-vue_export-helper-COMwgem8.mjs';
import './ui-G7Oicn0a.mjs';
import './useFormGroup-ZK-CpXpd.mjs';
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';
import './keyboard-CvjRf4Wb.mjs';
import './transition-CG5tIsRm.mjs';
import './micro-task-CYdHJ3PN.mjs';
import './active-element-history-DJ1NL7os.mjs';
import './focus-management-DFaZHIRF.mjs';
import './use-outside-click-B4rja7ys.mjs';
import './hidden-Bsn3DsxF.mjs';
import './open-closed-Dsm1EOia.mjs';
import './portal-BLTG7ywv.mjs';
import './description-Y4p4EFv6.mjs';

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
        label: "\u5168\u90E8\u72B6\u6001",
        value: ""
      },
      {
        label: "\u6D3B\u8DC3",
        value: "active"
      },
      {
        label: "\u975E\u6D3B\u8DC3",
        value: "inactive"
      },
      {
        label: "\u5DF2\u7981\u7528",
        value: "disabled"
      }
    ];
    const roleOptions = [
      {
        label: "\u5168\u90E8\u89D2\u8272",
        value: ""
      },
      {
        label: "\u7BA1\u7406\u5458",
        value: "admin"
      },
      {
        label: "\u666E\u901A\u7528\u6237",
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
              name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username || "\u672A\u77E5\u7528\u6237",
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
        console.error("\u83B7\u53D6\u7528\u6237\u6570\u636E\u5931\u8D25:", error);
      } finally {
        loading.value = false;
      }
    };
    const filteredUsers = computed(() => {
      let filtered = users.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((user) => {
          var _a, _b;
          return user.name.toLowerCase().includes(query) || ((_a = user.email) == null ? void 0 : _a.toLowerCase().includes(query)) || ((_b = user.telegramId) == null ? void 0 : _b.toLowerCase().includes(query));
        });
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
        active: "\u6D3B\u8DC3",
        inactive: "\u975E\u6D3B\u8DC3",
        disabled: "\u5DF2\u7981\u7528"
      }[status] || status;
    };
    const getRoleText = (role) => {
      return {
        admin: "\u7BA1\u7406\u5458",
        moderator: "\u7248\u4E3B",
        user: "\u666E\u901A\u7528\u6237"
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
      } else console.log("\u7F16\u8F91Telegram\u7528\u6237:", user);
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
          alert("\u5BC6\u7801\u786E\u8BA4\u4E0D\u5339\u914D");
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
            alert("\u521B\u5EFA\u7528\u6237\u65F6\u5BC6\u7801\u4E3A\u5FC5\u586B\u9879");
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
          alert(editingUser.value ? "\u7528\u6237\u66F4\u65B0\u6210\u529F" : "\u7528\u6237\u521B\u5EFA\u6210\u529F");
        } else alert(response.error || "\u64CD\u4F5C\u5931\u8D25");
      } catch (error) {
        console.error("\u4FDD\u5B58\u7528\u6237\u5931\u8D25:", error);
        alert(error.message || "\u4FDD\u5B58\u7528\u6237\u5931\u8D25");
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
          alert("\u7528\u6237\u5220\u9664\u6210\u529F");
        } else alert(response.error || "\u5220\u9664\u5931\u8D25");
      } catch (error) {
        console.error("\u5220\u9664\u7528\u6237\u5931\u8D25:", error);
        alert(error.message || "\u5220\u9664\u7528\u6237\u5931\u8D25");
      } finally {
        deleting.value = false;
      }
    };
    const handleFileUpload = (event) => {
      var _a;
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (!file) return;
      selectedFile.value = file;
      importResult.value = null;
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a2;
        try {
          const content = (_a2 = e.target) == null ? void 0 : _a2.result;
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
          console.error("\u6587\u4EF6\u89E3\u6790\u9519\u8BEF:", error);
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
          message: `\u5BFC\u5165\u5931\u8D25: ${error.message || "\u672A\u77E5\u9519\u8BEF"}`
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
      _push(`</div> \u7528\u6237\u7BA1\u7406 </h1><p class="mt-1 text-sm text-[#9ca3af]">\u7BA1\u7406\u7CFB\u7EDF\u7528\u6237\u548C Telegram \u7528\u6237</p></div>`);
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
            _push$1(` \u6DFB\u52A0\u7CFB\u7EDF\u7528\u6237 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-plus",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u6DFB\u52A0\u7CFB\u7EDF\u7528\u6237 ")];
        }),
        _: 1
      }, _parent));
      else _push(`<!---->`);
      _push(`</div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-1"><div class="flex space-x-1"><button class="${ssrRenderClass([{
        "bg-transparent text-[#00dc82] border border-[#00dc82]": unref(activeTab) === "system",
        "text-[#9ca3af] hover:text-white": unref(activeTab) !== "system"
      }, "px-4 py-2 rounded-md transition-all font-medium text-sm"])}"> \u7CFB\u7EDF\u7528\u6237 </button><button class="${ssrRenderClass([{
        "bg-transparent text-[#00dc82] border border-[#00dc82]": unref(activeTab) === "telegram",
        "text-[#9ca3af] hover:text-white": unref(activeTab) !== "telegram"
      }, "px-4 py-2 rounded-md transition-all font-medium text-sm"])}"> Telegram \u7528\u6237 </button></div></div><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-users",
        class: "w-5 h-5 text-blue-400"
      }, null, _parent));
      _push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">\u603B\u7528\u6237\u6570</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(totalUsers))}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-400"
      }, null, _parent));
      _push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">\u6D3B\u8DC3\u7528\u6237</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(activeUsers))}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-5 h-5 text-yellow-400"
      }, null, _parent));
      _push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">\u4ECA\u65E5\u65B0\u589E</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(newUsersToday))}</p></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center"><div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chart-bar",
        class: "w-5 h-5 text-purple-400"
      }, null, _parent));
      _push(`</div><div class="ml-3"><p class="text-sm text-[#9ca3af]">\u5728\u7EBF\u7528\u6237</p><p class="text-xl font-semibold text-white">${ssrInterpolate(unref(onlineUsers))}</p></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4"><div class="flex flex-col sm:flex-row gap-4"><div class="flex-1">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(searchQuery),
        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        placeholder: unref(activeTab) === "system" ? "\u641C\u7D22\u7528\u6237\u540D\u6216\u90AE\u7BB1..." : "\u641C\u7D22\u7528\u6237\u540D\u6216 Telegram ID...",
        icon: "i-heroicons-magnifying-glass",
        class: "w-full"
      }, null, _parent));
      _push(`</div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: unref(statusFilter),
        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
        options: statusOptions,
        placeholder: "\u72B6\u6001",
        class: "w-32"
      }, null, _parent));
      if (unref(activeTab) === "system") _push(ssrRenderComponent(_component_USelect, {
        modelValue: unref(roleFilter),
        "onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
        options: roleOptions,
        placeholder: "\u89D2\u8272",
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
            _push$1(` \u5BFC\u5165\u7528\u6237 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-up-tray",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u5BFC\u5165\u7528\u6237 ")];
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
          if (_push$1) _push$1(` \u91CD\u7F6E `);
          else return [createTextVNode(" \u91CD\u7F6E ")];
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
                _push$2(`<div class="flex items-center justify-between"${_scopeId$1}><h3 class="text-lg font-semibold text-white"${_scopeId$1}>\u5BFC\u5165 Telegram \u7528\u6237</h3>`);
                _push$2(ssrRenderComponent(_component_UButton, {
                  color: "gray",
                  variant: "ghost",
                  icon: "i-heroicons-x-mark-20-solid",
                  onClick: ($event) => showImportModal.value = false
                }, null, _parent$2, _scopeId$1));
                _push$2(`</div>`);
              } else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "\u5BFC\u5165 Telegram \u7528\u6237"), createVNode(_component_UButton, {
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
                    if (_push$3) _push$3(` \u53D6\u6D88 `);
                    else return [createTextVNode(" \u53D6\u6D88 ")];
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
                    if (_push$3) _push$3(`${ssrInterpolate(unref(importing) ? "\u5BFC\u5165\u4E2D..." : "\u5F00\u59CB\u5BFC\u5165")}`);
                    else return [createTextVNode(toDisplayString(unref(importing) ? "\u5BFC\u5165\u4E2D..." : "\u5F00\u59CB\u5BFC\u5165"), 1)];
                  }),
                  _: 1
                }, _parent$2, _scopeId$1));
                _push$2(`</div>`);
              } else return [createVNode("div", { class: "flex justify-end gap-3" }, [createVNode(_component_UButton, {
                color: "gray",
                variant: "outline",
                onClick: ($event) => showImportModal.value = false
              }, {
                default: withCtx(() => [createTextVNode(" \u53D6\u6D88 ")]),
                _: 1
              }, 8, ["onClick"]), createVNode(_component_UButton, {
                color: "primary",
                loading: unref(importing),
                disabled: !unref(selectedFile) || unref(previewData).length === 0,
                onClick: importUsers,
                class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
              }, {
                default: withCtx(() => [createTextVNode(toDisplayString(unref(importing) ? "\u5BFC\u5165\u4E2D..." : "\u5F00\u59CB\u5BFC\u5165"), 1)]),
                _: 1
              }, 8, ["loading", "disabled"])])];
            }),
            default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
              var _a, _b;
              if (_push$2) {
                _push$2(`<div class="space-y-4"${_scopeId$1}><div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6"${_scopeId$1}><div class="text-center"${_scopeId$1}>`);
                _push$2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-cloud-arrow-up",
                  class: "mx-auto h-12 w-12 text-gray-400"
                }, null, _parent$2, _scopeId$1));
                _push$2(`<div class="mt-4"${_scopeId$1}><label for="file-upload" class="cursor-pointer"${_scopeId$1}><span class="mt-2 block text-sm font-medium text-white"${_scopeId$1}> \u70B9\u51FB\u4E0A\u4F20\u6587\u4EF6\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904 </span><input id="file-upload" name="file-upload" type="file" accept=".json,.csv" class="sr-only"${_scopeId$1}></label><p class="mt-2 text-xs text-gray-500"${_scopeId$1}>\u652F\u6301 JSON \u548C CSV \u683C\u5F0F</p></div></div></div>`);
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
                if (unref(previewData).length > 0) _push$2(`<div class="space-y-2"${_scopeId$1}><h4 class="text-sm font-medium text-white"${_scopeId$1}>\u6570\u636E\u9884\u89C8 (\u524D5\u6761)</h4><div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto"${_scopeId$1}><pre class="text-xs text-gray-600 dark:text-gray-300"${_scopeId$1}>${ssrInterpolate(JSON.stringify(unref(previewData).slice(0, 5), null, 2))}</pre></div></div>`);
                else _push$2(`<!---->`);
                _push$2(`<div class="space-y-3"${_scopeId$1}>`);
                _push$2(ssrRenderComponent(_component_UCheckbox, {
                  modelValue: unref(importOptions).updateExisting,
                  "onUpdate:modelValue": ($event) => unref(importOptions).updateExisting = $event,
                  label: "\u66F4\u65B0\u5DF2\u5B58\u5728\u7684\u7528\u6237"
                }, null, _parent$2, _scopeId$1));
                _push$2(ssrRenderComponent(_component_UCheckbox, {
                  modelValue: unref(importOptions).validateData,
                  "onUpdate:modelValue": ($event) => unref(importOptions).validateData = $event,
                  label: "\u9A8C\u8BC1\u6570\u636E\u683C\u5F0F"
                }, null, _parent$2, _scopeId$1));
                _push$2(`</div>`);
                if (unref(importResult)) {
                  _push$2(`<div class="space-y-2"${_scopeId$1}><div class="${ssrRenderClass([unref(importResult).success ? "text-green-600" : "text-red-600", "text-sm font-medium"])}"${_scopeId$1}>${ssrInterpolate(unref(importResult).message)}</div>`);
                  if (unref(importResult).data) _push$2(`<div class="text-xs text-gray-500"${_scopeId$1}> \u6210\u529F: ${ssrInterpolate(unref(importResult).data.imported)}, \u8DF3\u8FC7: ${ssrInterpolate(unref(importResult).data.skipped)}, \u9519\u8BEF: ${ssrInterpolate(((_a = unref(importResult).data.errors) == null ? void 0 : _a.length) || 0)}</div>`);
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
                }, [createVNode("span", { class: "mt-2 block text-sm font-medium text-white" }, " \u70B9\u51FB\u4E0A\u4F20\u6587\u4EF6\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904 "), createVNode("input", {
                  id: "file-upload",
                  name: "file-upload",
                  type: "file",
                  accept: ".json,.csv",
                  class: "sr-only",
                  onChange: handleFileUpload
                }, null, 32)]), createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "\u652F\u6301 JSON \u548C CSV \u683C\u5F0F")])])]),
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
                }, [createVNode("h4", { class: "text-sm font-medium text-white" }, "\u6570\u636E\u9884\u89C8 (\u524D5\u6761)"), createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto" }, [createVNode("pre", { class: "text-xs text-gray-600 dark:text-gray-300" }, toDisplayString(JSON.stringify(unref(previewData).slice(0, 5), null, 2)), 1)])])) : createCommentVNode("", true),
                createVNode("div", { class: "space-y-3" }, [createVNode(_component_UCheckbox, {
                  modelValue: unref(importOptions).updateExisting,
                  "onUpdate:modelValue": ($event) => unref(importOptions).updateExisting = $event,
                  label: "\u66F4\u65B0\u5DF2\u5B58\u5728\u7684\u7528\u6237"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_UCheckbox, {
                  modelValue: unref(importOptions).validateData,
                  "onUpdate:modelValue": ($event) => unref(importOptions).validateData = $event,
                  label: "\u9A8C\u8BC1\u6570\u636E\u683C\u5F0F"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                unref(importResult) ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "space-y-2"
                }, [createVNode("div", { class: [unref(importResult).success ? "text-green-600" : "text-red-600", "text-sm font-medium"] }, toDisplayString(unref(importResult).message), 3), unref(importResult).data ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-xs text-gray-500"
                }, " \u6210\u529F: " + toDisplayString(unref(importResult).data.imported) + ", \u8DF3\u8FC7: " + toDisplayString(unref(importResult).data.skipped) + ", \u9519\u8BEF: " + toDisplayString(((_b = unref(importResult).data.errors) == null ? void 0 : _b.length) || 0), 1)) : createCommentVNode("", true)])) : createCommentVNode("", true)
              ])];
            }),
            _: 1
          }, _parent$1, _scopeId));
          else return [createVNode(_component_UCard, { ui: {
            ring: "",
            divide: "divide-y divide-gray-100 dark:divide-gray-800"
          } }, {
            header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "\u5BFC\u5165 Telegram \u7528\u6237"), createVNode(_component_UButton, {
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
              default: withCtx(() => [createTextVNode(" \u53D6\u6D88 ")]),
              _: 1
            }, 8, ["onClick"]), createVNode(_component_UButton, {
              color: "primary",
              loading: unref(importing),
              disabled: !unref(selectedFile) || unref(previewData).length === 0,
              onClick: importUsers,
              class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
            }, {
              default: withCtx(() => [createTextVNode(toDisplayString(unref(importing) ? "\u5BFC\u5165\u4E2D..." : "\u5F00\u59CB\u5BFC\u5165"), 1)]),
              _: 1
            }, 8, ["loading", "disabled"])])]),
            default: withCtx(() => {
              var _a;
              return [createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6" }, [createVNode("div", { class: "text-center" }, [createVNode(_component_UIcon, {
                  name: "i-heroicons-cloud-arrow-up",
                  class: "mx-auto h-12 w-12 text-gray-400"
                }), createVNode("div", { class: "mt-4" }, [createVNode("label", {
                  for: "file-upload",
                  class: "cursor-pointer"
                }, [createVNode("span", { class: "mt-2 block text-sm font-medium text-white" }, " \u70B9\u51FB\u4E0A\u4F20\u6587\u4EF6\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904 "), createVNode("input", {
                  id: "file-upload",
                  name: "file-upload",
                  type: "file",
                  accept: ".json,.csv",
                  class: "sr-only",
                  onChange: handleFileUpload
                }, null, 32)]), createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "\u652F\u6301 JSON \u548C CSV \u683C\u5F0F")])])]),
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
                }, [createVNode("h4", { class: "text-sm font-medium text-white" }, "\u6570\u636E\u9884\u89C8 (\u524D5\u6761)"), createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto" }, [createVNode("pre", { class: "text-xs text-gray-600 dark:text-gray-300" }, toDisplayString(JSON.stringify(unref(previewData).slice(0, 5), null, 2)), 1)])])) : createCommentVNode("", true),
                createVNode("div", { class: "space-y-3" }, [createVNode(_component_UCheckbox, {
                  modelValue: unref(importOptions).updateExisting,
                  "onUpdate:modelValue": ($event) => unref(importOptions).updateExisting = $event,
                  label: "\u66F4\u65B0\u5DF2\u5B58\u5728\u7684\u7528\u6237"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_UCheckbox, {
                  modelValue: unref(importOptions).validateData,
                  "onUpdate:modelValue": ($event) => unref(importOptions).validateData = $event,
                  label: "\u9A8C\u8BC1\u6570\u636E\u683C\u5F0F"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                unref(importResult) ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "space-y-2"
                }, [createVNode("div", { class: [unref(importResult).success ? "text-green-600" : "text-red-600", "text-sm font-medium"] }, toDisplayString(unref(importResult).message), 3), unref(importResult).data ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-xs text-gray-500"
                }, " \u6210\u529F: " + toDisplayString(unref(importResult).data.imported) + ", \u8DF3\u8FC7: " + toDisplayString(unref(importResult).data.skipped) + ", \u9519\u8BEF: " + toDisplayString(((_a = unref(importResult).data.errors) == null ? void 0 : _a.length) || 0), 1)) : createCommentVNode("", true)])) : createCommentVNode("", true)
              ])];
            }),
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
                _push$2(`<div class="flex items-center justify-between"${_scopeId$1}><h3 class="text-lg font-semibold text-white"${_scopeId$1}>${ssrInterpolate(unref(editingUser) ? "\u7F16\u8F91\u7CFB\u7EDF\u7528\u6237" : "\u65B0\u5EFA\u7CFB\u7EDF\u7528\u6237")}</h3>`);
                _push$2(ssrRenderComponent(_component_UButton, {
                  color: "gray",
                  variant: "ghost",
                  icon: "i-heroicons-x-mark-20-solid",
                  onClick: closeUserModal
                }, null, _parent$2, _scopeId$1));
                _push$2(`</div>`);
              } else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, toDisplayString(unref(editingUser) ? "\u7F16\u8F91\u7CFB\u7EDF\u7528\u6237" : "\u65B0\u5EFA\u7CFB\u7EDF\u7528\u6237"), 1), createVNode(_component_UButton, {
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
                  label: "\u7528\u6237\u540D",
                  name: "username",
                  required: ""
                }, {
                  default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) _push$3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(userForm).username,
                      "onUpdate:modelValue": ($event) => unref(userForm).username = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                      required: ""
                    }, null, _parent$3, _scopeId$2));
                    else return [createVNode(_component_UInput, {
                      modelValue: unref(userForm).username,
                      "onUpdate:modelValue": ($event) => unref(userForm).username = $event,
                      placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                  }),
                  _: 1
                }, _parent$2, _scopeId$1));
                _push$2(ssrRenderComponent(_component_UFormGroup, {
                  label: "\u90AE\u7BB1",
                  name: "email"
                }, {
                  default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) _push$3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(userForm).email,
                      "onUpdate:modelValue": ($event) => unref(userForm).email = $event,
                      type: "email",
                      placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740"
                    }, null, _parent$3, _scopeId$2));
                    else return [createVNode(_component_UInput, {
                      modelValue: unref(userForm).email,
                      "onUpdate:modelValue": ($event) => unref(userForm).email = $event,
                      type: "email",
                      placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                  }),
                  _: 1
                }, _parent$2, _scopeId$1));
                _push$2(ssrRenderComponent(_component_UFormGroup, {
                  label: "\u5BC6\u7801",
                  name: "password",
                  required: !unref(editingUser)
                }, {
                  default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) _push$3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(userForm).password,
                      "onUpdate:modelValue": ($event) => unref(userForm).password = $event,
                      type: "password",
                      placeholder: unref(editingUser) ? "\u7559\u7A7A\u5219\u4E0D\u4FEE\u6539\u5BC6\u7801" : "\u8BF7\u8F93\u5165\u5BC6\u7801"
                    }, null, _parent$3, _scopeId$2));
                    else return [createVNode(_component_UInput, {
                      modelValue: unref(userForm).password,
                      "onUpdate:modelValue": ($event) => unref(userForm).password = $event,
                      type: "password",
                      placeholder: unref(editingUser) ? "\u7559\u7A7A\u5219\u4E0D\u4FEE\u6539\u5BC6\u7801" : "\u8BF7\u8F93\u5165\u5BC6\u7801"
                    }, null, 8, [
                      "modelValue",
                      "onUpdate:modelValue",
                      "placeholder"
                    ])];
                  }),
                  _: 1
                }, _parent$2, _scopeId$1));
                _push$2(ssrRenderComponent(_component_UFormGroup, {
                  label: "\u786E\u8BA4\u5BC6\u7801",
                  name: "confirmPassword",
                  required: !unref(editingUser) && !!unref(userForm).password
                }, {
                  default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) _push$3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(userForm).confirmPassword,
                      "onUpdate:modelValue": ($event) => unref(userForm).confirmPassword = $event,
                      type: "password",
                      placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801"
                    }, null, _parent$3, _scopeId$2));
                    else return [createVNode(_component_UInput, {
                      modelValue: unref(userForm).confirmPassword,
                      "onUpdate:modelValue": ($event) => unref(userForm).confirmPassword = $event,
                      type: "password",
                      placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                  }),
                  _: 1
                }, _parent$2, _scopeId$1));
                _push$2(ssrRenderComponent(_component_UFormGroup, {
                  label: "\u89D2\u8272",
                  name: "role",
                  required: ""
                }, {
                  default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) _push$3(ssrRenderComponent(_component_USelect, {
                      modelValue: unref(userForm).role,
                      "onUpdate:modelValue": ($event) => unref(userForm).role = $event,
                      options: [{
                        label: "\u7BA1\u7406\u5458",
                        value: "admin"
                      }, {
                        label: "\u666E\u901A\u7528\u6237",
                        value: "user"
                      }],
                      placeholder: "\u8BF7\u9009\u62E9\u89D2\u8272"
                    }, null, _parent$3, _scopeId$2));
                    else return [createVNode(_component_USelect, {
                      modelValue: unref(userForm).role,
                      "onUpdate:modelValue": ($event) => unref(userForm).role = $event,
                      options: [{
                        label: "\u7BA1\u7406\u5458",
                        value: "admin"
                      }, {
                        label: "\u666E\u901A\u7528\u6237",
                        value: "user"
                      }],
                      placeholder: "\u8BF7\u9009\u62E9\u89D2\u8272"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])];
                  }),
                  _: 1
                }, _parent$2, _scopeId$1));
                _push$2(ssrRenderComponent(_component_UFormGroup, {
                  label: "\u72B6\u6001",
                  name: "status",
                  required: ""
                }, {
                  default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) _push$3(ssrRenderComponent(_component_USelect, {
                      modelValue: unref(userForm).status,
                      "onUpdate:modelValue": ($event) => unref(userForm).status = $event,
                      options: [{
                        label: "\u6D3B\u8DC3",
                        value: "active"
                      }, {
                        label: "\u975E\u6D3B\u8DC3",
                        value: "inactive"
                      }],
                      placeholder: "\u8BF7\u9009\u62E9\u72B6\u6001"
                    }, null, _parent$3, _scopeId$2));
                    else return [createVNode(_component_USelect, {
                      modelValue: unref(userForm).status,
                      "onUpdate:modelValue": ($event) => unref(userForm).status = $event,
                      options: [{
                        label: "\u6D3B\u8DC3",
                        value: "active"
                      }, {
                        label: "\u975E\u6D3B\u8DC3",
                        value: "inactive"
                      }],
                      placeholder: "\u8BF7\u9009\u62E9\u72B6\u6001"
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
                    if (_push$3) _push$3(` \u53D6\u6D88 `);
                    else return [createTextVNode(" \u53D6\u6D88 ")];
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
                    if (_push$3) _push$3(`${ssrInterpolate(unref(saving) ? "\u4FDD\u5B58\u4E2D..." : unref(editingUser) ? "\u66F4\u65B0" : "\u521B\u5EFA")}`);
                    else return [createTextVNode(toDisplayString(unref(saving) ? "\u4FDD\u5B58\u4E2D..." : unref(editingUser) ? "\u66F4\u65B0" : "\u521B\u5EFA"), 1)];
                  }),
                  _: 1
                }, _parent$2, _scopeId$1));
                _push$2(`</div></form>`);
              } else return [createVNode("form", {
                onSubmit: withModifiers(saveUser, ["prevent"]),
                class: "space-y-4"
              }, [
                createVNode(_component_UFormGroup, {
                  label: "\u7528\u6237\u540D",
                  name: "username",
                  required: ""
                }, {
                  default: withCtx(() => [createVNode(_component_UInput, {
                    modelValue: unref(userForm).username,
                    "onUpdate:modelValue": ($event) => unref(userForm).username = $event,
                    placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, {
                  label: "\u90AE\u7BB1",
                  name: "email"
                }, {
                  default: withCtx(() => [createVNode(_component_UInput, {
                    modelValue: unref(userForm).email,
                    "onUpdate:modelValue": ($event) => unref(userForm).email = $event,
                    type: "email",
                    placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, {
                  label: "\u5BC6\u7801",
                  name: "password",
                  required: !unref(editingUser)
                }, {
                  default: withCtx(() => [createVNode(_component_UInput, {
                    modelValue: unref(userForm).password,
                    "onUpdate:modelValue": ($event) => unref(userForm).password = $event,
                    type: "password",
                    placeholder: unref(editingUser) ? "\u7559\u7A7A\u5219\u4E0D\u4FEE\u6539\u5BC6\u7801" : "\u8BF7\u8F93\u5165\u5BC6\u7801"
                  }, null, 8, [
                    "modelValue",
                    "onUpdate:modelValue",
                    "placeholder"
                  ])]),
                  _: 1
                }, 8, ["required"]),
                createVNode(_component_UFormGroup, {
                  label: "\u786E\u8BA4\u5BC6\u7801",
                  name: "confirmPassword",
                  required: !unref(editingUser) && !!unref(userForm).password
                }, {
                  default: withCtx(() => [createVNode(_component_UInput, {
                    modelValue: unref(userForm).confirmPassword,
                    "onUpdate:modelValue": ($event) => unref(userForm).confirmPassword = $event,
                    type: "password",
                    placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                  _: 1
                }, 8, ["required"]),
                createVNode(_component_UFormGroup, {
                  label: "\u89D2\u8272",
                  name: "role",
                  required: ""
                }, {
                  default: withCtx(() => [createVNode(_component_USelect, {
                    modelValue: unref(userForm).role,
                    "onUpdate:modelValue": ($event) => unref(userForm).role = $event,
                    options: [{
                      label: "\u7BA1\u7406\u5458",
                      value: "admin"
                    }, {
                      label: "\u666E\u901A\u7528\u6237",
                      value: "user"
                    }],
                    placeholder: "\u8BF7\u9009\u62E9\u89D2\u8272"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                  _: 1
                }),
                createVNode(_component_UFormGroup, {
                  label: "\u72B6\u6001",
                  name: "status",
                  required: ""
                }, {
                  default: withCtx(() => [createVNode(_component_USelect, {
                    modelValue: unref(userForm).status,
                    "onUpdate:modelValue": ($event) => unref(userForm).status = $event,
                    options: [{
                      label: "\u6D3B\u8DC3",
                      value: "active"
                    }, {
                      label: "\u975E\u6D3B\u8DC3",
                      value: "inactive"
                    }],
                    placeholder: "\u8BF7\u9009\u62E9\u72B6\u6001"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                  _: 1
                }),
                createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [createVNode(_component_UButton, {
                  color: "gray",
                  variant: "outline",
                  onClick: closeUserModal
                }, {
                  default: withCtx(() => [createTextVNode(" \u53D6\u6D88 ")]),
                  _: 1
                }), createVNode(_component_UButton, {
                  type: "submit",
                  color: "primary",
                  loading: unref(saving),
                  class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
                }, {
                  default: withCtx(() => [createTextVNode(toDisplayString(unref(saving) ? "\u4FDD\u5B58\u4E2D..." : unref(editingUser) ? "\u66F4\u65B0" : "\u521B\u5EFA"), 1)]),
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
            header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, toDisplayString(unref(editingUser) ? "\u7F16\u8F91\u7CFB\u7EDF\u7528\u6237" : "\u65B0\u5EFA\u7CFB\u7EDF\u7528\u6237"), 1), createVNode(_component_UButton, {
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
                label: "\u7528\u6237\u540D",
                name: "username",
                required: ""
              }, {
                default: withCtx(() => [createVNode(_component_UInput, {
                  modelValue: unref(userForm).username,
                  "onUpdate:modelValue": ($event) => unref(userForm).username = $event,
                  placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
                  required: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                _: 1
              }),
              createVNode(_component_UFormGroup, {
                label: "\u90AE\u7BB1",
                name: "email"
              }, {
                default: withCtx(() => [createVNode(_component_UInput, {
                  modelValue: unref(userForm).email,
                  "onUpdate:modelValue": ($event) => unref(userForm).email = $event,
                  type: "email",
                  placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                _: 1
              }),
              createVNode(_component_UFormGroup, {
                label: "\u5BC6\u7801",
                name: "password",
                required: !unref(editingUser)
              }, {
                default: withCtx(() => [createVNode(_component_UInput, {
                  modelValue: unref(userForm).password,
                  "onUpdate:modelValue": ($event) => unref(userForm).password = $event,
                  type: "password",
                  placeholder: unref(editingUser) ? "\u7559\u7A7A\u5219\u4E0D\u4FEE\u6539\u5BC6\u7801" : "\u8BF7\u8F93\u5165\u5BC6\u7801"
                }, null, 8, [
                  "modelValue",
                  "onUpdate:modelValue",
                  "placeholder"
                ])]),
                _: 1
              }, 8, ["required"]),
              createVNode(_component_UFormGroup, {
                label: "\u786E\u8BA4\u5BC6\u7801",
                name: "confirmPassword",
                required: !unref(editingUser) && !!unref(userForm).password
              }, {
                default: withCtx(() => [createVNode(_component_UInput, {
                  modelValue: unref(userForm).confirmPassword,
                  "onUpdate:modelValue": ($event) => unref(userForm).confirmPassword = $event,
                  type: "password",
                  placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                _: 1
              }, 8, ["required"]),
              createVNode(_component_UFormGroup, {
                label: "\u89D2\u8272",
                name: "role",
                required: ""
              }, {
                default: withCtx(() => [createVNode(_component_USelect, {
                  modelValue: unref(userForm).role,
                  "onUpdate:modelValue": ($event) => unref(userForm).role = $event,
                  options: [{
                    label: "\u7BA1\u7406\u5458",
                    value: "admin"
                  }, {
                    label: "\u666E\u901A\u7528\u6237",
                    value: "user"
                  }],
                  placeholder: "\u8BF7\u9009\u62E9\u89D2\u8272"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                _: 1
              }),
              createVNode(_component_UFormGroup, {
                label: "\u72B6\u6001",
                name: "status",
                required: ""
              }, {
                default: withCtx(() => [createVNode(_component_USelect, {
                  modelValue: unref(userForm).status,
                  "onUpdate:modelValue": ($event) => unref(userForm).status = $event,
                  options: [{
                    label: "\u6D3B\u8DC3",
                    value: "active"
                  }, {
                    label: "\u975E\u6D3B\u8DC3",
                    value: "inactive"
                  }],
                  placeholder: "\u8BF7\u9009\u62E9\u72B6\u6001"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])]),
                _: 1
              }),
              createVNode("div", { class: "flex justify-end gap-3 pt-4" }, [createVNode(_component_UButton, {
                color: "gray",
                variant: "outline",
                onClick: closeUserModal
              }, {
                default: withCtx(() => [createTextVNode(" \u53D6\u6D88 ")]),
                _: 1
              }), createVNode(_component_UButton, {
                type: "submit",
                color: "primary",
                loading: unref(saving),
                class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
              }, {
                default: withCtx(() => [createTextVNode(toDisplayString(unref(saving) ? "\u4FDD\u5B58\u4E2D..." : unref(editingUser) ? "\u66F4\u65B0" : "\u521B\u5EFA"), 1)]),
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
                _push$2(`<div class="flex items-center justify-between"${_scopeId$1}><h3 class="text-lg font-semibold text-white"${_scopeId$1}>\u786E\u8BA4\u5220\u9664</h3>`);
                _push$2(ssrRenderComponent(_component_UButton, {
                  color: "gray",
                  variant: "ghost",
                  icon: "i-heroicons-x-mark-20-solid",
                  onClick: ($event) => showDeleteModal.value = false
                }, null, _parent$2, _scopeId$1));
                _push$2(`</div>`);
              } else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "\u786E\u8BA4\u5220\u9664"), createVNode(_component_UButton, {
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
                    if (_push$3) _push$3(` \u53D6\u6D88 `);
                    else return [createTextVNode(" \u53D6\u6D88 ")];
                  }),
                  _: 1
                }, _parent$2, _scopeId$1));
                _push$2(ssrRenderComponent(_component_UButton, {
                  color: "red",
                  loading: unref(deleting),
                  onClick: confirmDelete
                }, {
                  default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) _push$3(`${ssrInterpolate(unref(deleting) ? "\u5220\u9664\u4E2D..." : "\u786E\u8BA4\u5220\u9664")}`);
                    else return [createTextVNode(toDisplayString(unref(deleting) ? "\u5220\u9664\u4E2D..." : "\u786E\u8BA4\u5220\u9664"), 1)];
                  }),
                  _: 1
                }, _parent$2, _scopeId$1));
                _push$2(`</div>`);
              } else return [createVNode("div", { class: "flex justify-end gap-3" }, [createVNode(_component_UButton, {
                color: "gray",
                variant: "outline",
                onClick: ($event) => showDeleteModal.value = false
              }, {
                default: withCtx(() => [createTextVNode(" \u53D6\u6D88 ")]),
                _: 1
              }, 8, ["onClick"]), createVNode(_component_UButton, {
                color: "red",
                loading: unref(deleting),
                onClick: confirmDelete
              }, {
                default: withCtx(() => [createTextVNode(toDisplayString(unref(deleting) ? "\u5220\u9664\u4E2D..." : "\u786E\u8BA4\u5220\u9664"), 1)]),
                _: 1
              }, 8, ["loading"])])];
            }),
            default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
              var _a, _b, _c, _d;
              if (_push$2) _push$2(`<div class="space-y-4"${_scopeId$1}><p class="text-white"${_scopeId$1}> \u786E\u5B9A\u8981\u5220\u9664\u7528\u6237 <span class="font-semibold text-[#00dc82]"${_scopeId$1}>${ssrInterpolate(((_a = unref(deletingUser)) == null ? void 0 : _a.username) || ((_b = unref(deletingUser)) == null ? void 0 : _b.name))}</span> \u5417\uFF1F </p><p class="text-sm text-[#9ca3af]"${_scopeId$1}> \u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C\u3002 </p></div>`);
              else return [createVNode("div", { class: "space-y-4" }, [createVNode("p", { class: "text-white" }, [
                createTextVNode(" \u786E\u5B9A\u8981\u5220\u9664\u7528\u6237 "),
                createVNode("span", { class: "font-semibold text-[#00dc82]" }, toDisplayString(((_c = unref(deletingUser)) == null ? void 0 : _c.username) || ((_d = unref(deletingUser)) == null ? void 0 : _d.name)), 1),
                createTextVNode(" \u5417\uFF1F ")
              ]), createVNode("p", { class: "text-sm text-[#9ca3af]" }, " \u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C\u3002 ")])];
            }),
            _: 1
          }, _parent$1, _scopeId));
          else return [createVNode(_component_UCard, { ui: {
            ring: "",
            divide: "divide-y divide-gray-100 dark:divide-gray-800"
          } }, {
            header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "text-lg font-semibold text-white" }, "\u786E\u8BA4\u5220\u9664"), createVNode(_component_UButton, {
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
              default: withCtx(() => [createTextVNode(" \u53D6\u6D88 ")]),
              _: 1
            }, 8, ["onClick"]), createVNode(_component_UButton, {
              color: "red",
              loading: unref(deleting),
              onClick: confirmDelete
            }, {
              default: withCtx(() => [createTextVNode(toDisplayString(unref(deleting) ? "\u5220\u9664\u4E2D..." : "\u786E\u8BA4\u5220\u9664"), 1)]),
              _: 1
            }, 8, ["loading"])])]),
            default: withCtx(() => {
              var _a, _b;
              return [createVNode("div", { class: "space-y-4" }, [createVNode("p", { class: "text-white" }, [
                createTextVNode(" \u786E\u5B9A\u8981\u5220\u9664\u7528\u6237 "),
                createVNode("span", { class: "font-semibold text-[#00dc82]" }, toDisplayString(((_a = unref(deletingUser)) == null ? void 0 : _a.username) || ((_b = unref(deletingUser)) == null ? void 0 : _b.name)), 1),
                createTextVNode(" \u5417\uFF1F ")
              ]), createVNode("p", { class: "text-sm text-[#9ca3af]" }, " \u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C\u3002 ")])];
            }),
            _: 1
          })];
        }),
        _: 1
      }, _parent));
      _push(`<div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg overflow-hidden"><div class="px-4 py-3 border-b border-[#2a2a2b]"><h3 class="text-lg font-medium text-white">${ssrInterpolate(unref(activeTab) === "system" ? "\u7CFB\u7EDF\u7528\u6237\u5217\u8868" : "Telegram \u7528\u6237\u5217\u8868")}</h3></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-[#0c0c0d]"><tr><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u7528\u6237</th>`);
      if (unref(activeTab) === "telegram") _push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">TGID</th>`);
      else _push(`<!---->`);
      _push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u72B6\u6001</th>`);
      if (unref(activeTab) === "system") _push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u89D2\u8272</th>`);
      else _push(`<!---->`);
      if (unref(activeTab) === "telegram") _push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u4F59\u989D</th>`);
      else _push(`<!---->`);
      _push(`<th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u6700\u540E\u6D3B\u8DC3</th><th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">\u64CD\u4F5C</th></tr></thead><tbody class="divide-y divide-[#2a2a2b]"><!--[-->`);
      ssrRenderList(unref(filteredUsers), (user) => {
        _push(`<tr class="hover:bg-[#2a2a2b]/50 transition-colors"><td class="px-4 py-3"><div class="flex items-center">`);
        _push(ssrRenderComponent(_component_UAvatar, {
          src: user.avatar,
          alt: user.name,
          size: "sm",
          class: "mr-3"
        }, null, _parent));
        _push(`<div><div class="text-sm font-medium text-white">${ssrInterpolate(user.name)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(user.email || (user.username ? "@" + user.username : "\u65E0\u7528\u6237\u540D"))}</div></div></div></td>`);
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
      _push(`<!--]--></tbody></table></div><div class="px-4 py-3 border-t border-[#2a2a2b] flex items-center justify-between"><div class="text-sm text-[#9ca3af]"> \u663E\u793A ${ssrInterpolate((unref(currentPage) - 1) * pageSize + 1)} - ${ssrInterpolate(Math.min(unref(currentPage) * pageSize, unref(totalUsers)))} \u6761\uFF0C\u5171 ${ssrInterpolate(unref(totalUsers))} \u6761 </div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        disabled: unref(currentPage) === 1,
        onClick: ($event) => currentPage.value--
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) _push$1(` \u4E0A\u4E00\u9875 `);
          else return [createTextVNode(" \u4E0A\u4E00\u9875 ")];
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
          if (_push$1) _push$1(` \u4E0B\u4E00\u9875 `);
          else return [createTextVNode(" \u4E0B\u4E00\u9875 ")];
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
//# sourceMappingURL=users-FX6bDaAf.mjs.map
