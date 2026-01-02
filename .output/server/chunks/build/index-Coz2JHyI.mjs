import __nuxt_component_0 from './Icon-ZhGvf9gZ.mjs';
import __nuxt_component_1 from './Toggle-B-YC9agS.mjs';
import __nuxt_component_2 from './Button-D_TCUDyh.mjs';
import __nuxt_component_3 from './Badge-BZslOKNb.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
import './form-DsUILy5F.mjs';
import './keyboard-Duq8EHr3.mjs';
import './use-resolve-button-type-DOOP2SMg.mjs';
import './hidden-Dc_fFmis.mjs';
import './description-CsZvF7Vz.mjs';
import './tooltip-BtqstB0H.mjs';
import './useFormGroup-B3564yef.mjs';
import './Link-CS5wywLd.mjs';
import './nuxt-link-C6IP2oPu.mjs';
import './link-Bz3Wc5MF.mjs';
import './useButtonGroup-6uzJtOJv.mjs';
import './button-Bz5rwL6o.mjs';

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
      uptime: "7\u5929 12\u5C0F\u65F6",
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
          console.error("\u7248\u672C\u68C0\u67E5API\u8FD4\u56DE\u9519\u8BEF:", result.error);
        }
      } catch (error) {
        console.error("\u68C0\u67E5\u66F4\u65B0\u5931\u8D25:", error);
      } finally {
        checking.value = false;
      }
    };
    const saveUpdateSettings = async () => {
      try {
        console.log("\u4FDD\u5B58\u66F4\u65B0\u8BBE\u7F6E:", updateSettings.value);
      } catch (error) {
        console.error("\u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25:", error);
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
          message: `\u5F00\u59CB\u6267\u884C${stepName}\u6B65\u9AA4...`,
          timestamp: Date.now()
        });
        for (let i = 0; i <= 100; i += 10) {
          step.progress = i;
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        step.status = "completed";
        step.logs.push({
          type: "success",
          message: `${stepName}\u6B65\u9AA4\u6267\u884C\u5B8C\u6210`,
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
        if (apiStatus.isCompleted) return "\u5DF2\u5B8C\u6210";
        if (step.status === "in_progress") return "\u6267\u884C\u4E2D";
        if (step.status === "error") return "\u5931\u8D25";
        return "\u7B49\u5F85\u4E2D";
      }
      switch (step.status) {
        case "completed":
          return "\u5DF2\u5B8C\u6210";
        case "in_progress":
          return "\u6267\u884C\u4E2D";
        case "error":
          return "\u5931\u8D25";
        default:
          return "\u7B49\u5F85\u4E2D";
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
      _push(`</div></div><h1 class="text-3xl font-bold text-white">\u66F4\u65B0\u6388\u6743</h1><p class="text-[#9ca3af] max-w-2xl mx-auto"> \u7BA1\u7406\u7CFB\u7EDF\u7684OTA\u66F4\u65B0\u3001\u7248\u672C\u68C0\u6D4B\u548C\u81EA\u52A8\u5347\u7EA7\u529F\u80FD </p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h2 class="text-xl font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cube",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` \u5F53\u524D\u7248\u672C </h2><div class="space-y-4"><div class="text-center"><div class="w-20 h-20 bg-[#00dc82]/10 border border-[#00dc82]/20 rounded-full flex items-center justify-center mx-auto mb-4">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-10 h-10 text-[#00dc82]"
      }, null, _parent));
      _push(`</div><div class="text-2xl font-bold text-white">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).currentVersion))}</div><div class="text-sm text-[#9ca3af]">\u8FD0\u884C\u6B63\u5E38</div></div><div class="space-y-3"><div class="flex justify-between"><span class="text-[#9ca3af]">\u53D1\u5E03\u65F6\u95F4</span><span class="text-white">${ssrInterpolate(formatDate(unref(versionInfo).currentReleaseDate))}</span></div><div class="flex justify-between"><span class="text-[#9ca3af]">\u8FD0\u884C\u65F6\u95F4</span><span class="text-[#00dc82]">${ssrInterpolate(unref(versionInfo).uptime)}</span></div><div class="flex justify-between"><span class="text-[#9ca3af]">\u66F4\u65B0\u6E90</span><span class="text-white">GitHub</span></div><div class="flex justify-between"><span class="text-[#9ca3af]">\u81EA\u52A8\u66F4\u65B0</span>`);
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
      _push(` \u66F4\u65B0\u72B6\u6001 </h2>`);
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
            _push2(` \u68C0\u67E5\u66F4\u65B0 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u68C0\u67E5\u66F4\u65B0 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4">`);
      if (!unref(versionInfo).hasUpdate) {
        _push(`<div class="text-center"><div class="text-3xl font-bold text-[#00dc82]">\u6700\u65B0\u7248\u672C</div><div class="text-sm text-[#9ca3af]">\u7CFB\u7EDF\u5DF2\u662F\u6700\u65B0\u7248\u672C</div></div>`);
      } else {
        _push(`<div class="text-center"><div class="text-3xl font-bold text-orange-400">\u6709\u65B0\u7248\u672C</div><div class="text-sm text-[#9ca3af]">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).latestVersion))} \u53EF\u7528</div></div>`);
      }
      _push(`<div class="space-y-3"><div class="flex justify-between"><span class="text-[#9ca3af]">\u6700\u540E\u68C0\u67E5</span><span class="text-white">${ssrInterpolate(formatDate(unref(versionInfo).lastChecked))}</span></div><div class="flex justify-between"><span class="text-[#9ca3af]">\u68C0\u67E5\u9891\u7387</span><span class="text-white">\u6BCF\u65E5\u81EA\u52A8</span></div>`);
      if (unref(versionInfo).hasUpdate) {
        _push(`<div class="flex justify-between"><span class="text-[#9ca3af]">\u66F4\u65B0\u5927\u5C0F</span><span class="text-white">${ssrInterpolate(formatFileSize((_a = unref(versionInfo).updateInfo) == null ? void 0 : _a.size))}</span></div>`);
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
      _push(` \u72EC\u7ACB\u66F4\u65B0\u6B65\u9AA4 </h3><div class="space-y-4"><div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center space-x-4"><div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
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
      _push(`</div><div><div class="text-white font-medium">\u4E0B\u8F7D\u66F4\u65B0\u5305</div><div class="text-sm text-[#9ca3af]">\u4ECEGitHub\u4E0B\u8F7D\u6700\u65B0\u7248\u672C</div>`);
      if (unref(independentSteps).download.status === "in_progress" && unref(independentSteps).download.progress !== void 0) {
        _push(`<div class="mt-2"><div class="w-48 bg-gray-700 rounded-full h-2"><div class="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(independentSteps).download.progress || 0}%` })}"></div></div><div class="flex justify-between text-xs text-gray-400 mt-1"><span>${ssrInterpolate(Math.round(unref(independentSteps).download.progress || 0))}%</span>`);
        if (unref(independentSteps).download.logs && unref(independentSteps).download.logs.length > 0) {
          _push(`<span>${ssrInterpolate(((_c = (_b = unref(independentSteps).download.logs) == null ? void 0 : _b.at(-1)) == null ? void 0 : _c.message) || "\u4E0B\u8F7D\u4E2D...")}</span>`);
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
            _push2(` \u524D\u5F80\u4E0B\u8F7D `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-top-right-on-square",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u524D\u5F80\u4E0B\u8F7D ")
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
      _push(`</div><div><div class="text-white font-medium">\u89E3\u538B\u6587\u4EF6</div><div class="text-sm text-[#9ca3af]">\u89E3\u538B\u4E0B\u8F7D\u7684\u66F4\u65B0\u5305</div></div></div><div class="flex items-center space-x-2">`);
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
            _push2(` ${ssrInterpolate(unref(stepStatusData).extract.isCompleted ? "\u5DF2\u5B8C\u6210" : "\u5F00\u59CB\u89E3\u538B")}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: unref(stepStatusData).extract.isCompleted ? "i-heroicons-check" : "i-heroicons-archive-box-arrow-down",
                class: "w-4 h-4 mr-2"
              }, null, 8, ["name"]),
              createTextVNode(" " + toDisplayString(unref(stepStatusData).extract.isCompleted ? "\u5DF2\u5B8C\u6210" : "\u5F00\u59CB\u89E3\u538B"), 1)
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
      _push(`</div><div><div class="text-white font-medium">\u5907\u4EFD\u5F53\u524D\u7248\u672C</div><div class="text-sm text-[#9ca3af]">\u5907\u4EFD\u6574\u4E2A\u9879\u76EE\u6587\u4EF6\u5939</div></div></div><div class="flex items-center space-x-2">`);
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
            _push2(` ${ssrInterpolate(unref(stepStatusData).backup.isCompleted ? "\u5DF2\u5B8C\u6210" : "\u5F00\u59CB\u5907\u4EFD")}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-shield-check",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" " + toDisplayString(unref(stepStatusData).backup.isCompleted ? "\u5DF2\u5B8C\u6210" : "\u5F00\u59CB\u5907\u4EFD"), 1)
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
      _push(`</div><div><div class="text-white font-medium">\u5E94\u7528\u66F4\u65B0</div><div class="text-sm text-[#9ca3af]">\u4E00\u952E\u66F4\u65B0\uFF1A\u505C\u6B62\u670D\u52A1\u3001\u5E94\u7528\u6587\u4EF6\u3001\u81EA\u52A8\u91CD\u542F</div></div></div><div class="flex items-center space-x-2">`);
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
            _push2(` ${ssrInterpolate(unref(stepStatusData).apply.isCompleted ? "\u5DF2\u5B8C\u6210" : "\u5F00\u59CB\u5E94\u7528")}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-up-circle",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" " + toDisplayString(unref(stepStatusData).apply.isCompleted ? "\u5DF2\u5B8C\u6210" : "\u5F00\u59CB\u5E94\u7528"), 1)
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
      _push(`</div><div><div class="text-white font-medium">\u91CD\u542F\u7CFB\u7EDF</div><div class="text-sm text-[#9ca3af]">\u81EA\u52A8\u91CD\u542F\u524D\u7AEF\u548C\u673A\u5668\u4EBA\u7AEF\uFF08\u7B2C4\u6B65\u5B8C\u6210\u540E\u81EA\u52A8\u6267\u884C\uFF09</div></div></div><div class="flex items-center space-x-2">`);
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
            _push2(` ${ssrInterpolate(unref(independentSteps).restart.status === "completed" ? "\u91CD\u65B0\u542F\u52A8" : "\u91CD\u542F\u7CFB\u7EDF")}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" " + toDisplayString(unref(independentSteps).restart.status === "completed" ? "\u91CD\u65B0\u542F\u52A8" : "\u91CD\u542F\u7CFB\u7EDF"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="mt-6 p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u6279\u91CF\u64CD\u4F5C</div><div class="text-sm text-[#9ca3af]">\u4E00\u952E\u6267\u884C\u591A\u4E2A\u6B65\u9AA4</div></div><div class="flex space-x-2">`);
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
            _push2(` \u91CD\u7F6E\u6240\u6709 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u91CD\u7F6E\u6240\u6709 ")
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
            _push2(` \u6267\u884C\u5168\u90E8 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-play",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u6267\u884C\u5168\u90E8 ")
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
        _push(` \u6267\u884C\u65E5\u5FD7 </div><div class="bg-black rounded p-3 max-h-48 overflow-y-auto"><!--[-->`);
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
      _push(` \u7248\u672C\u8BE6\u60C5 </h3><div class="space-y-4"><div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div><div class="text-white font-medium">\u5F53\u524D\u7248\u672C</div><div class="text-sm text-[#9ca3af] font-mono">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).currentVersion))}</div></div>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "green",
        variant: "subtle"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8FD0\u884C\u4E2D`);
          } else {
            return [
              createTextVNode("\u8FD0\u884C\u4E2D")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(versionInfo).hasUpdate) {
        _push(`<div class="grid grid-cols-2 gap-4"><div class="p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg text-center"><div class="text-sm text-[#9ca3af]">\u5F53\u524D</div><div class="text-white font-mono">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).currentVersion))}</div></div><div class="p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg text-center"><div class="text-sm text-[#9ca3af]">\u6700\u65B0</div><div class="text-[#00dc82] font-mono">v${ssrInterpolate(formatVersionDisplay(unref(versionInfo).latestVersion))}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cog-6-tooth",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` \u66F4\u65B0\u8BBE\u7F6E </h3><div class="space-y-4"><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u81EA\u52A8\u68C0\u67E5\u66F4\u65B0</div><div class="text-sm text-[#9ca3af]">\u5B9A\u671F\u68C0\u67E5\u65B0\u7248\u672C</div></div>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(updateSettings).autoCheck,
        "onUpdate:modelValue": ($event) => unref(updateSettings).autoCheck = $event,
        onChange: saveUpdateSettings
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u81EA\u52A8\u4E0B\u8F7D\u66F4\u65B0</div><div class="text-sm text-[#9ca3af]">\u53D1\u73B0\u65B0\u7248\u672C\u65F6\u81EA\u52A8\u4E0B\u8F7D</div></div>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(updateSettings).autoDownload,
        "onUpdate:modelValue": ($event) => unref(updateSettings).autoDownload = $event,
        onChange: saveUpdateSettings
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u81EA\u52A8\u5B89\u88C5\u66F4\u65B0</div><div class="text-sm text-[#9ca3af]">\u4E0B\u8F7D\u5B8C\u6210\u540E\u81EA\u52A8\u5B89\u88C5</div></div>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(updateSettings).autoInstall,
        "onUpdate:modelValue": ($event) => unref(updateSettings).autoInstall = $event,
        onChange: saveUpdateSettings
      }, null, _parent));
      _push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u66F4\u65B0\u901A\u77E5</div><div class="text-sm text-[#9ca3af]">\u53D1\u73B0\u66F4\u65B0\u65F6\u53D1\u9001\u901A\u77E5</div></div>`);
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

export { _sfc_main as default };
//# sourceMappingURL=index-Coz2JHyI.mjs.map
