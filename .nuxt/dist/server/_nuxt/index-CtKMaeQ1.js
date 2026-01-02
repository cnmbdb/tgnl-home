import __nuxt_component_0 from "./Icon-ZhGvf9gZ.js";
import __nuxt_component_2 from "./Button-D_TCUDyh.js";
import __nuxt_component_3 from "./Badge-BZslOKNb.js";
import __nuxt_component_1 from "./Toggle-B-YC9agS.js";
import __nuxt_component_2$1 from "./Input-B1mh7BSF.js";
import { ref, reactive, mergeProps, withCtx, createVNode, createTextVNode, unref, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
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
import "./form-DsUILy5F.js";
import "./keyboard-Duq8EHr3.js";
import "./use-resolve-button-type-DOOP2SMg.js";
import "./hidden-Dc_fFmis.js";
import "./description-CsZvF7Vz.js";
import "./useFormGroup-B3564yef.js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const botConfig = ref({
      // 基础配置 - 从config.txt读取
      token: "",
      adminId: "",
      customerServiceId: "",
      botId: "",
      groupLink: "",
      controlAddress: "",
      privateKey: "",
      username: "",
      password: "",
      adTime: "",
      huilvZhekou: "",
      // 价格配置 - 从config.txt读取
      hourPrice: "",
      dayPrice: "",
      threeDayPrice: "",
      yucunPrice: "",
      // API配置 - 从al.py读取
      tronApiKey: ""
    });
    const dbConfig = reactive({
      dbHost: "",
      dbPort: "",
      dbName: "",
      dbUser: "",
      dbPassword: "",
      tgDbHost: "",
      tgDbPort: "",
      tgDbName: "",
      tgDbUser: "",
      tgDbPassword: "",
      viteDbHost: "",
      viteDbName: "",
      viteDbUser: "",
      viteDbPassword: ""
    });
    const isSaving = ref(false);
    const lastSaved = ref(false);
    ref(false);
    ref(false);
    ref(false);
    const isRestarting = ref(false);
    const showRestartProgress = ref(false);
    const restartProgress = ref(0);
    const restartStatus = ref("");
    const isReloading = ref(false);
    const reloadSuccess = ref(false);
    const hotReloadEnabled = ref(false);
    let saveTimeout = null;
    const handleConfigChange = () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
      lastSaved.value = false;
      saveTimeout = setTimeout(async () => {
        await saveConfig();
        if (hotReloadEnabled.value) {
          await reloadConfig();
        }
      }, 3e3);
    };
    const handleDbConfigChange = () => {
    };
    const saveConfig = async () => {
      try {
        isSaving.value = true;
        console.log("保存配置:", botConfig.value);
        const response = await $fetch("/api/bot-config", {
          method: "POST",
          body: botConfig.value
        });
        if (response.success) {
          console.log("配置保存成功");
          lastSaved.value = true;
          setTimeout(() => {
            lastSaved.value = false;
          }, 3e3);
        } else {
          console.error("保存配置失败:", response.error);
        }
      } catch (error) {
        console.error("保存配置失败:", error);
      } finally {
        isSaving.value = false;
      }
    };
    const reloadConfig = async () => {
      try {
        isReloading.value = true;
        await saveConfig();
        const response = await $fetch("/api/bot-reload", {
          method: "POST",
          body: {
            adminToken: "admin-token"
            // 这里应该使用实际的管理员令牌
          }
        });
        if (response.success) {
          reloadSuccess.value = true;
          console.log("配置热重载成功:", response.message);
          const toast = useToast();
          toast.add({
            title: "热重载成功",
            description: "机器人配置已重新加载，无需重启",
            icon: "i-heroicons-check-circle",
            color: "green"
          });
          setTimeout(() => {
            reloadSuccess.value = false;
          }, 3e3);
        } else {
          console.error("配置热重载失败:", response.error);
          const toast = useToast();
          toast.add({
            title: "热重载失败",
            description: response.error || "配置重载时发生错误",
            icon: "i-heroicons-exclamation-triangle",
            color: "red"
          });
        }
      } catch (error) {
        console.error("配置热重载失败:", error);
        const toast = useToast();
        toast.add({
          title: "热重载失败",
          description: error.message || "网络错误或服务器异常",
          icon: "i-heroicons-exclamation-triangle",
          color: "red"
        });
      } finally {
        isReloading.value = false;
      }
    };
    const toggleHotReload = async (enabled) => {
      if (enabled) {
        await saveConfig();
        await reloadConfig();
      }
      localStorage.setItem("hotReloadEnabled", enabled.toString());
      const toast = useToast();
      toast.add({
        title: enabled ? "热重载已启用" : "热重载已禁用",
        description: enabled ? "配置变更时将自动重载" : "配置变更时需要手动重启",
        icon: enabled ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
        color: enabled ? "green" : "orange"
      });
    };
    const restartBot = async () => {
      try {
        isRestarting.value = true;
        showRestartProgress.value = true;
        restartProgress.value = 0;
        restartStatus.value = "正在检查机器人进程...";
        const updateProgress = (progress, status) => {
          restartProgress.value = progress;
          restartStatus.value = status;
        };
        const response = await $fetch("/api/restart-bot", {
          method: "POST"
        });
        if (response.success) {
          updateProgress(20, "正在停止现有进程...");
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          updateProgress(50, "正在清理资源...");
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          updateProgress(80, "正在启动机器人...");
          await new Promise((resolve) => setTimeout(resolve, 1500));
          updateProgress(100, "重启完成");
          setTimeout(() => {
            showRestartProgress.value = false;
            restartProgress.value = 0;
            restartStatus.value = "";
          }, 2e3);
          console.log("机器人重启成功");
        } else {
          console.error("重启机器人失败:", response.error);
          restartStatus.value = "重启失败: " + response.error;
        }
      } catch (error) {
        console.error("重启机器人失败:", error);
        restartStatus.value = "重启失败: " + error.message;
      } finally {
        isRestarting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_0;
      const _component_UButton = __nuxt_component_2;
      const _component_UBadge = __nuxt_component_3;
      const _component_UToggle = __nuxt_component_1;
      const _component_UInput = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cpu-chip",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> 机器人管理 </h1><p class="mt-1 text-sm text-[#9ca3af]">监控和管理能量出租机器人状态</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm"
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
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "sm",
        class: "bg-[#00dc82] hover:bg-[#00dc82]/80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 添加机器人 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 添加机器人 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h3 class="text-lg font-medium text-white">机器人配置</h3><div class="flex items-center gap-2">`);
      if (unref(isSaving)) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "yellow",
          variant: "subtle",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-3 h-3 mr-1 animate-spin"
              }, null, _parent2, _scopeId));
              _push2(` 保存中... `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-3 h-3 mr-1 animate-spin"
                }),
                createTextVNode(" 保存中... ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(lastSaved)) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "green",
          variant: "subtle",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check",
                class: "w-3 h-3 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` 已保存 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check",
                  class: "w-3 h-3 mr-1"
                }),
                createTextVNode(" 已保存 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center space-x-3 px-3 py-2 rounded-lg border border-[#374151] bg-[#1f2937]/50">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: ["w-4 h-4", unref(hotReloadEnabled) ? "text-[#00dc82]" : "text-[#9ca3af]"]
      }, null, _parent));
      _push(`<span class="text-sm text-[#9ca3af]">热更新</span>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(hotReloadEnabled),
        "onUpdate:modelValue": ($event) => isRef(hotReloadEnabled) ? hotReloadEnabled.value = $event : null,
        onChange: toggleHotReload,
        loading: unref(isReloading),
        color: "primary",
        size: "sm"
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([unref(hotReloadEnabled) ? "text-[#00dc82]" : "text-[#9ca3af]", "text-xs font-medium"])}">${ssrInterpolate(unref(hotReloadEnabled) ? "已启用" : "已禁用")}</span></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "sm",
        class: "bg-[#00dc82] hover:bg-[#00dc82]/80",
        onClick: restartBot,
        loading: unref(isRestarting)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 重启机器人 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 重启机器人 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "sm",
        class: "bg-[#00dc82] hover:bg-[#00dc82]/80",
        onClick: saveConfig,
        loading: unref(isSaving)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 立即保存 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-check",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 立即保存 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(showRestartProgress)) {
        _push(`<div class="mt-3 flex justify-end"><div class="w-48"><div class="flex items-center justify-between text-xs text-[#9ca3af] mb-1"><span>重启进度</span><span>${ssrInterpolate(unref(restartProgress))}%</span></div><div class="w-full bg-[#2a2a2b] rounded-full h-2"><div class="bg-[#00dc82] h-2 rounded-full transition-all duration-300 ease-out" style="${ssrRenderStyle({ width: unref(restartProgress) + "%" })}"></div></div><div class="text-xs text-[#9ca3af] mt-1">${ssrInterpolate(unref(restartStatus))}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-4 space-y-6"><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cog-6-tooth",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` 基础配置 </h4><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">Bot Token</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).token,
        "onUpdate:modelValue": ($event) => unref(botConfig).token = $event,
        placeholder: "请输入机器人令牌",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">管理员 ID</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).adminId,
        "onUpdate:modelValue": ($event) => unref(botConfig).adminId = $event,
        placeholder: "请输入管理员ID",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">客服链接</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).customerServiceId,
        "onUpdate:modelValue": ($event) => unref(botConfig).customerServiceId = $event,
        placeholder: "请输入客服链接",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">机器人ID</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).botId,
        "onUpdate:modelValue": ($event) => unref(botConfig).botId = $event,
        placeholder: "请输入机器人ID",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">群组链接</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).groupLink,
        "onUpdate:modelValue": ($event) => unref(botConfig).groupLink = $event,
        placeholder: "请输入群组链接",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">控制地址</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).controlAddress,
        "onUpdate:modelValue": ($event) => unref(botConfig).controlAddress = $event,
        placeholder: "请输入控制地址",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">私钥</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).privateKey,
        "onUpdate:modelValue": ($event) => unref(botConfig).privateKey = $event,
        placeholder: "请输入私钥",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">用户名</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).username,
        "onUpdate:modelValue": ($event) => unref(botConfig).username = $event,
        placeholder: "请输入用户名",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">密码</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).password,
        "onUpdate:modelValue": ($event) => unref(botConfig).password = $event,
        type: "password",
        placeholder: "请输入密码",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">广告时间</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).adTime,
        "onUpdate:modelValue": ($event) => unref(botConfig).adTime = $event,
        placeholder: "请输入广告时间",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">汇率折扣</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).huilvZhekou,
        "onUpdate:modelValue": ($event) => unref(botConfig).huilvZhekou = $event,
        type: "number",
        step: "0.01",
        placeholder: "请输入汇率折扣",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-currency-dollar",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` 价格配置 </h4><div class="grid grid-cols-1 gap-4 md:grid-cols-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">小时价格</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).hourPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).hourPrice = $event,
        type: "number",
        step: "0.1",
        placeholder: "请输入小时价格",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">日价格</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).dayPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).dayPrice = $event,
        type: "number",
        step: "0.1",
        placeholder: "请输入日价格",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">三日价格</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).threeDayPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).threeDayPrice = $event,
        type: "number",
        step: "0.1",
        placeholder: "请输入三日价格",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">预存价格</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).yucunPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).yucunPrice = $event,
        type: "number",
        step: "0.1",
        placeholder: "请输入预存价格",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><div class="flex items-center justify-between mb-3"><h4 class="text-md font-medium text-white flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-circle-stack",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` 数据库配置 </h4></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库主机</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbHost,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbHost = $event,
        placeholder: "请输入数据库主机地址",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库端口</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbPort,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbPort = $event,
        type: "number",
        placeholder: "请输入数据库端口",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库名称</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbName,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbName = $event,
        placeholder: "请输入数据库名称",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库用户</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbUser,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbUser = $event,
        placeholder: "请输入数据库用户名",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div><div class="md:col-span-2"><label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库密码</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbPassword,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbPassword = $event,
        type: "password",
        placeholder: "请输入数据库密码",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-key",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` Tron API 配置 </h4><div class="grid grid-cols-1 gap-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2"> Tron API Key <span class="text-xs text-[#6b7280] ml-2">(来自 al.py 文件)</span></label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).tronApiKey,
        "onUpdate:modelValue": ($event) => unref(botConfig).tronApiKey = $event,
        placeholder: "请输入 Tron API Key",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`<p class="mt-1 text-xs text-[#6b7280]"> 修改后将自动保存到 al.py 文件中的 API_KEY 变量 </p></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bots/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CtKMaeQ1.js.map
