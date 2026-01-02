import __nuxt_component_0 from "./Icon-ZhGvf9gZ.js";
import __nuxt_component_1 from "./Toggle-B-YC9agS.js";
import __nuxt_component_2 from "./Button-D_TCUDyh.js";
import __nuxt_component_3 from "./Badge-BZslOKNb.js";
import { ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
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
import "./form-DsUILy5F.js";
import "./keyboard-Duq8EHr3.js";
import "./use-resolve-button-type-DOOP2SMg.js";
import "./hidden-Dc_fFmis.js";
import "./description-CsZvF7Vz.js";
import "./tooltip-BtqstB0H.js";
import "./useFormGroup-B3564yef.js";
import "./Link-CS5wywLd.js";
import "./nuxt-link-C6IP2oPu.js";
import "ohash/utils";
import "./link-Bz3Wc5MF.js";
import "./useButtonGroup-6uzJtOJv.js";
import "./button-Bz5rwL6o.js";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const checking = ref(false);
    const updateProgress = ref(0);
    ref(null);
    const currentIndependentStep = ref(null);
    const versionInfo = ref({
      currentVersion: "1.0.4",
      latestVersion: "1.0.5",
      hasUpdate: false,
      currentReleaseDate: "2024-01-15",
      lastChecked: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: "7天 12小时",
      updateInfo: {
        size: 256e5
        // 25.6MB
      }
    });
    const updateSettings = ref({
      autoUpdate: false,
      autoCheck: true,
      autoDownload: false,
      autoInstall: false,
      notifications: true
    });
    const independentSteps = ref({
      download: {
        status: "idle",
        progress: 0,
        logs: [],
        error: ""
      },
      extract: {
        status: "idle",
        progress: 0,
        logs: [],
        error: ""
      },
      backup: {
        status: "idle",
        progress: 0,
        logs: [],
        error: ""
      },
      apply: {
        status: "idle",
        progress: 0,
        logs: [],
        error: ""
      },
      restart: {
        status: "idle",
        progress: 0,
        logs: [],
        error: ""
      }
    });
    const stepStatusData = ref({
      download: {
        isCompleted: false,
        canClick: true
      },
      extract: {
        isCompleted: false,
        canClick: false
      },
      backup: {
        isCompleted: false,
        canClick: false
      },
      apply: {
        isCompleted: false,
        canClick: false
      }
    });
    const checkForUpdates = async () => {
      checking.value = true;
      try {
        const response = await fetch("/api/system/version-check");
        const result = await response.json();
        if (result.success && result.data) {
          const data = result.data;
          versionInfo.value.currentVersion = data.currentVersion;
          versionInfo.value.latestVersion = data.latestVersion;
          versionInfo.value.hasUpdate = data.hasUpdate;
          versionInfo.value.lastChecked = data.lastChecked;
          if (data.updateInfo) {
            versionInfo.value.updateInfo = {
              size: data.updateInfo.size || 0,
              description: data.updateInfo.description,
              downloadUrl: data.updateInfo.downloadUrl,
              publishedAt: data.updateInfo.publishedAt
            };
          }
        } else {
          console.error("版本检查API返回错误:", result.error);
        }
      } catch (error) {
        console.error("检查更新失败:", error);
      } finally {
        checking.value = false;
      }
    };
    const saveUpdateSettings = async () => {
      try {
        console.log("保存更新设置:", updateSettings.value);
      } catch (error) {
        console.error("保存设置失败:", error);
      }
    };
    const executeIndependentStep = async (stepName) => {
      const step = independentSteps.value[stepName];
      if (!step) return;
      step.status = "in_progress";
      step.progress = 0;
      step.logs = [];
      step.error = "";
      currentIndependentStep.value = step;
      try {
        step.logs.push({
          type: "info",
          message: `开始执行${stepName}步骤...`,
          timestamp: Date.now()
        });
        for (let i = 0; i <= 100; i += 10) {
          step.progress = i;
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        step.status = "completed";
        step.logs.push({
          type: "success",
          message: `${stepName}步骤执行完成`,
          timestamp: Date.now()
        });
        stepStatusData.value[stepName] = {
          isCompleted: true,
          canClick: true
        };
      } catch (error) {
        step.status = "error";
        step.error = error.message;
        step.logs.push({
          type: "error",
          message: error.message,
          timestamp: Date.now()
        });
      }
    };
    const resetAllSteps = () => {
      Object.keys(independentSteps.value).forEach((key) => {
        independentSteps.value[key] = {
          status: "idle",
          progress: 0,
          logs: [],
          error: ""
        };
      });
      currentIndependentStep.value = null;
      Object.keys(stepStatusData.value).forEach((key) => {
        stepStatusData.value[key] = {
          isCompleted: false,
          canClick: key === "download" || key === "backup"
        };
      });
    };
    const executeAllSteps = async () => {
      const steps = ["download", "extract", "backup", "apply", "restart"];
      for (const stepName of steps) {
        await executeIndependentStep(stepName);
        if (independentSteps.value[stepName].status === "error") {
          break;
        }
      }
    };
    const openGitHubRepo = () => {
      (void 0).open("https://github.com/cnmbdb/hf-tgnl-admin/releases", "_blank");
    };
    const getStepStatusText = (step, stepName) => {
      if (stepStatusData.value[stepName]) {
        const apiStatus = stepStatusData.value[stepName];
        if (apiStatus.isCompleted) return "已完成";
        if (step.status === "in_progress") return "执行中";
        if (step.status === "error") return "失败";
        return "等待中";
      }
      switch (step.status) {
        case "completed":
          return "已完成";
        case "in_progress":
          return "执行中";
        case "error":
          return "失败";
        default:
          return "等待中";
      }
    };
    const getStepBadgeColor = (step, stepName) => {
      if (stepStatusData.value[stepName]) {
        const apiStatus = stepStatusData.value[stepName];
        if (apiStatus.isCompleted) return "green";
        if (step.status === "in_progress") return "blue";
        if (step.status === "error") return "red";
        return "gray";
      }
      switch (step.status) {
        case "completed":
          return "green";
        case "in_progress":
          return "blue";
        case "error":
          return "red";
        default:
          return "gray";
      }
    };
    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString("zh-CN");
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("zh-CN");
    };
    const formatFileSize = (bytes) => {
      if (!bytes) return "";
      const mb = bytes / (1024 * 1024);
      return `${mb.toFixed(1)} MB`;
    };
    const formatVersionDisplay = (version) => {
      if (!version) return "";
      if (version.includes(".zip")) {
        const match = version.match(/nl-admin-(.+)\.zip$/);
        if (match) {
          return match[1];
        }
      }
      return version.startsWith("v") ? version.substring(1) : version;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_UIcon = __nuxt_component_0;
      const _component_UToggle = __nuxt_component_1;
      const _component_UButton = __nuxt_component_2;
      const _component_UBadge = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto space-y-6" }, _attrs))}><div class="text-center space-y-4"><div class="flex justify-center"><div class="w-16 h-16 bg-[#1a1a1b] border border-[#2a2a2b] rounded-2xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-path",
        class: "w-8 h-8 text-[#00dc82]"
      }, null, _parent));
      _push(`</div></div><h1 class="text-3xl font-bold text-white">更新授权</h1><p class="text-[#9ca3af] max-w-2xl mx-auto"> 管理系统的OTA更新、版本检测和自动升级功能 </p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h2 class="text-xl font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cube",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` 当前版本 </h2><div class="space-y-4"><div class="text-center"><div class="w-20 h-20 bg-[#00dc82]/10 border border-[#00dc82]/20 rounded-full flex items-center justify-center mx-auto mb-4">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-10 h-10 text-[#00dc82]"
      }, null, _parent));
      _push(`</div><div class="text-2xl font-bold text-white">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).currentVersion))}</div><div class="text-sm text-[#9ca3af]">运行正常</div></div><div class="space-y-3"><div class="flex justify-between"><span class="text-[#9ca3af]">发布时间</span><span class="text-white">${ssrInterpolate(formatDate(unref(versionInfo).currentReleaseDate))}</span></div><div class="flex justify-between"><span class="text-[#9ca3af]">运行时间</span><span class="text-[#00dc82]">${ssrInterpolate(unref(versionInfo).uptime)}</span></div><div class="flex justify-between"><span class="text-[#9ca3af]">更新源</span><span class="text-white">GitHub</span></div><div class="flex justify-between"><span class="text-[#9ca3af]">自动更新</span>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(updateSettings).autoUpdate,
        "onUpdate:modelValue": ($event) => unref(updateSettings).autoUpdate = $event,
        onChange: saveUpdateSettings
      }, null, _parent));
      _push(`</div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-white flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-down-circle",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` 更新状态 </h2>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "green",
        size: "sm",
        onClick: checkForUpdates,
        loading: unref(checking),
        variant: "outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 检查更新 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 检查更新 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4">`);
      if (!unref(versionInfo).hasUpdate) {
        _push(`<div class="text-center"><div class="text-3xl font-bold text-[#00dc82]">最新版本</div><div class="text-sm text-[#9ca3af]">系统已是最新版本</div></div>`);
      } else {
        _push(`<div class="text-center"><div class="text-3xl font-bold text-orange-400">有新版本</div><div class="text-sm text-[#9ca3af]">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).latestVersion))} 可用</div></div>`);
      }
      _push(`<div class="space-y-3"><div class="flex justify-between"><span class="text-[#9ca3af]">最后检查</span><span class="text-white">${ssrInterpolate(formatDate(unref(versionInfo).lastChecked))}</span></div><div class="flex justify-between"><span class="text-[#9ca3af]">检查频率</span><span class="text-white">每日自动</span></div>`);
      if (unref(versionInfo).hasUpdate) {
        _push(`<div class="flex justify-between"><span class="text-[#9ca3af]">更新大小</span><span class="text-white">${ssrInterpolate(formatFileSize((_a = unref(versionInfo).updateInfo) == null ? void 0 : _a.size))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(updateProgress) > 0) {
        _push(`<div class="w-full bg-[#2a2a2b] rounded-full h-2"><div class="bg-[#00dc82] h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(updateProgress)}%` })}"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cog-8-tooth",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` 独立更新步骤 </h3><div class="space-y-4"><div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center space-x-4"><div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      if (unref(independentSteps).download.status === "completed") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-5 h-5 text-green-400"
        }, null, _parent));
      } else if (unref(independentSteps).download.status === "error") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-5 h-5 text-red-400"
        }, null, _parent));
      } else if (unref(independentSteps).download.status === "in_progress") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-5 h-5 text-blue-400 animate-spin"
        }, null, _parent));
      } else {
        _push(`<span class="text-sm font-medium text-gray-400">1</span>`);
      }
      _push(`</div><div><div class="text-white font-medium">下载更新包</div><div class="text-sm text-[#9ca3af]">从GitHub下载最新版本</div>`);
      if (unref(independentSteps).download.status === "in_progress" && unref(independentSteps).download.progress !== void 0) {
        _push(`<div class="mt-2"><div class="w-48 bg-gray-700 rounded-full h-2"><div class="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(independentSteps).download.progress || 0}%` })}"></div></div><div class="flex justify-between text-xs text-gray-400 mt-1"><span>${ssrInterpolate(Math.round(unref(independentSteps).download.progress || 0))}%</span>`);
        if (unref(independentSteps).download.logs && unref(independentSteps).download.logs.length > 0) {
          _push(`<span>${ssrInterpolate(((_c = (_b = unref(independentSteps).download.logs) == null ? void 0 : _b.at(-1)) == null ? void 0 : _c.message) || "下载中...")}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: getStepBadgeColor(unref(independentSteps).download, "download"),
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(getStepStatusText(unref(independentSteps).download, "download"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(getStepStatusText(unref(independentSteps).download, "download")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "sm",
        color: "primary",
        onClick: openGitHubRepo
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-top-right-on-square",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 前往下载 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-top-right-on-square",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 前往下载 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center space-x-4"><div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      if (unref(independentSteps).extract.status === "completed") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-5 h-5 text-green-400"
        }, null, _parent));
      } else if (unref(independentSteps).extract.status === "error") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-5 h-5 text-red-400"
        }, null, _parent));
      } else if (unref(independentSteps).extract.status === "in_progress") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-5 h-5 text-blue-400 animate-spin"
        }, null, _parent));
      } else {
        _push(`<span class="text-sm font-medium text-gray-400">2</span>`);
      }
      _push(`</div><div><div class="text-white font-medium">解压文件</div><div class="text-sm text-[#9ca3af]">解压下载的更新包</div></div></div><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: getStepBadgeColor(unref(independentSteps).extract, "extract"),
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(getStepStatusText(unref(independentSteps).extract, "extract"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(getStepStatusText(unref(independentSteps).extract, "extract")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "sm",
        color: unref(stepStatusData).extract.isCompleted ? "green" : "primary",
        loading: unref(independentSteps).extract.status === "in_progress",
        disabled: !unref(stepStatusData).extract.canClick,
        onClick: ($event) => executeIndependentStep("extract")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: unref(stepStatusData).extract.isCompleted ? "i-heroicons-check" : "i-heroicons-archive-box-arrow-down",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(stepStatusData).extract.isCompleted ? "已完成" : "开始解压")}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: unref(stepStatusData).extract.isCompleted ? "i-heroicons-check" : "i-heroicons-archive-box-arrow-down",
                class: "w-4 h-4 mr-2"
              }, null, 8, ["name"]),
              createTextVNode(" " + toDisplayString(unref(stepStatusData).extract.isCompleted ? "已完成" : "开始解压"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center space-x-4"><div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      if (unref(independentSteps).backup.status === "completed") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-5 h-5 text-green-400"
        }, null, _parent));
      } else if (unref(independentSteps).backup.status === "error") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-5 h-5 text-red-400"
        }, null, _parent));
      } else if (unref(independentSteps).backup.status === "in_progress") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-5 h-5 text-blue-400 animate-spin"
        }, null, _parent));
      } else {
        _push(`<span class="text-sm font-medium text-gray-400">3</span>`);
      }
      _push(`</div><div><div class="text-white font-medium">备份当前版本</div><div class="text-sm text-[#9ca3af]">备份整个项目文件夹</div></div></div><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: getStepBadgeColor(unref(independentSteps).backup, "backup"),
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(getStepStatusText(unref(independentSteps).backup, "backup"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(getStepStatusText(unref(independentSteps).backup, "backup")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "sm",
        loading: unref(independentSteps).backup.status === "in_progress",
        disabled: !unref(stepStatusData).backup.canClick,
        onClick: ($event) => executeIndependentStep("backup")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shield-check",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(stepStatusData).backup.isCompleted ? "已完成" : "开始备份")}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-shield-check",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" " + toDisplayString(unref(stepStatusData).backup.isCompleted ? "已完成" : "开始备份"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center space-x-4"><div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      if (unref(independentSteps).apply.status === "completed") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-5 h-5 text-green-400"
        }, null, _parent));
      } else if (unref(independentSteps).apply.status === "error") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-5 h-5 text-red-400"
        }, null, _parent));
      } else if (unref(independentSteps).apply.status === "in_progress") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-5 h-5 text-blue-400 animate-spin"
        }, null, _parent));
      } else {
        _push(`<span class="text-sm font-medium text-gray-400">4</span>`);
      }
      _push(`</div><div><div class="text-white font-medium">应用更新</div><div class="text-sm text-[#9ca3af]">一键更新：停止服务、应用文件、自动重启</div></div></div><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: getStepBadgeColor(unref(independentSteps).apply, "apply"),
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(getStepStatusText(unref(independentSteps).apply, "apply"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(getStepStatusText(unref(independentSteps).apply, "apply")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "sm",
        loading: unref(independentSteps).apply.status === "in_progress",
        disabled: !unref(stepStatusData).apply.canClick,
        onClick: ($event) => executeIndependentStep("apply")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-up-circle",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(stepStatusData).apply.isCompleted ? "已完成" : "开始应用")}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-up-circle",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" " + toDisplayString(unref(stepStatusData).apply.isCompleted ? "已完成" : "开始应用"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center space-x-4"><div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      if (unref(independentSteps).restart.status === "completed") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-5 h-5 text-green-400"
        }, null, _parent));
      } else if (unref(independentSteps).restart.status === "error") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-x-mark",
          class: "w-5 h-5 text-red-400"
        }, null, _parent));
      } else if (unref(independentSteps).restart.status === "in_progress") {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-5 h-5 text-blue-400 animate-spin"
        }, null, _parent));
      } else {
        _push(`<span class="text-sm font-medium text-gray-400">5</span>`);
      }
      _push(`</div><div><div class="text-white font-medium">重启系统</div><div class="text-sm text-[#9ca3af]">自动重启前端和机器人端（第4步完成后自动执行）</div></div></div><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: getStepBadgeColor(unref(independentSteps).restart),
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(getStepStatusText(unref(independentSteps).restart))}`);
          } else {
            return [
              createTextVNode(toDisplayString(getStepStatusText(unref(independentSteps).restart)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "sm",
        loading: unref(independentSteps).restart.status === "in_progress",
        disabled: unref(independentSteps).apply.status !== "completed",
        onClick: ($event) => executeIndependentStep("restart"),
        color: "orange"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(independentSteps).restart.status === "completed" ? "重新启动" : "重启系统")}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" " + toDisplayString(unref(independentSteps).restart.status === "completed" ? "重新启动" : "重启系统"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="mt-6 p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center justify-between"><div><div class="text-white font-medium">批量操作</div><div class="text-sm text-[#9ca3af]">一键执行多个步骤</div></div><div class="flex space-x-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "sm",
        variant: "outline",
        onClick: resetAllSteps
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 重置所有 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 重置所有 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        size: "sm",
        disabled: !unref(versionInfo).hasUpdate,
        onClick: executeAllSteps
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-play",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` 执行全部 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-play",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" 执行全部 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (unref(currentIndependentStep) && unref(currentIndependentStep).logs && unref(currentIndependentStep).logs.length > 0) {
        _push(`<div class="mt-6 p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="text-white font-medium mb-3 flex items-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-document-text",
          class: "w-4 h-4 mr-2"
        }, null, _parent));
        _push(` 执行日志 </div><div class="bg-black rounded p-3 max-h-48 overflow-y-auto"><!--[-->`);
        ssrRenderList(unref(currentIndependentStep).logs, (log, index) => {
          _push(`<div class="${ssrRenderClass([log.type === "error" ? "text-red-400" : log.type === "warning" ? "text-yellow-400" : log.type === "success" ? "text-green-400" : "text-gray-300", "text-xs font-mono mb-1"])}"> [${ssrInterpolate(formatTime(log.timestamp))}] ${ssrInterpolate(log.message)}</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-information-circle",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` 版本详情 </h3><div class="space-y-4"><div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div><div class="text-white font-medium">当前版本</div><div class="text-sm text-[#9ca3af] font-mono">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).currentVersion))}</div></div>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "green",
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`运行中`);
          } else {
            return [
              createTextVNode("运行中")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(versionInfo).hasUpdate) {
        _push(`<div class="grid grid-cols-2 gap-4"><div class="p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg text-center"><div class="text-sm text-[#9ca3af]">当前</div><div class="text-white font-mono">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).currentVersion))}</div></div><div class="p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg text-center"><div class="text-sm text-[#9ca3af]">最新</div><div class="text-[#00dc82] font-mono">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).latestVersion))}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cog-6-tooth",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` 更新设置 </h3><div class="space-y-4"><div class="flex items-center justify-between"><div><div class="text-white font-medium">自动检查更新</div><div class="text-sm text-[#9ca3af]">定期检查新版本</div></div>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(updateSettings).autoCheck,
        "onUpdate:modelValue": ($event) => unref(updateSettings).autoCheck = $event,
        onChange: saveUpdateSettings
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">自动下载更新</div><div class="text-sm text-[#9ca3af]">发现新版本时自动下载</div></div>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(updateSettings).autoDownload,
        "onUpdate:modelValue": ($event) => unref(updateSettings).autoDownload = $event,
        onChange: saveUpdateSettings
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">自动安装更新</div><div class="text-sm text-[#9ca3af]">下载完成后自动安装</div></div>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(updateSettings).autoInstall,
        "onUpdate:modelValue": ($event) => unref(updateSettings).autoInstall = $event,
        onChange: saveUpdateSettings
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">更新通知</div><div class="text-sm text-[#9ca3af]">发现更新时发送通知</div></div>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(updateSettings).notifications,
        "onUpdate:modelValue": ($event) => unref(updateSettings).notifications = $event,
        onChange: saveUpdateSettings
      }, null, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/development/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Coz2JHyI.js.map
