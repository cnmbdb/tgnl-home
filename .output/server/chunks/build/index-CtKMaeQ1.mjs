import __nuxt_component_0 from './Icon-ZhGvf9gZ.mjs';
import __nuxt_component_2 from './Button-D_TCUDyh.mjs';
import __nuxt_component_3 from './Badge-BZslOKNb.mjs';
import __nuxt_component_1 from './Toggle-B-YC9agS.mjs';
import __nuxt_component_2$1 from './Input-B1mh7BSF.mjs';
import { ref, reactive, mergeProps, withCtx, createVNode, createTextVNode, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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
import './form-DsUILy5F.mjs';
import './keyboard-Duq8EHr3.mjs';
import './use-resolve-button-type-DOOP2SMg.mjs';
import './hidden-Dc_fFmis.mjs';
import './description-CsZvF7Vz.mjs';
import './useFormGroup-B3564yef.mjs';

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
        console.log("\u4FDD\u5B58\u914D\u7F6E:", botConfig.value);
        const response = await $fetch("/api/bot-config", {
          method: "POST",
          body: botConfig.value
        });
        if (response.success) {
          console.log("\u914D\u7F6E\u4FDD\u5B58\u6210\u529F");
          lastSaved.value = true;
          setTimeout(() => {
            lastSaved.value = false;
          }, 3e3);
        } else {
          console.error("\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:", response.error);
        }
      } catch (error) {
        console.error("\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:", error);
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
          console.log("\u914D\u7F6E\u70ED\u91CD\u8F7D\u6210\u529F:", response.message);
          const toast = useToast();
          toast.add({
            title: "\u70ED\u91CD\u8F7D\u6210\u529F",
            description: "\u673A\u5668\u4EBA\u914D\u7F6E\u5DF2\u91CD\u65B0\u52A0\u8F7D\uFF0C\u65E0\u9700\u91CD\u542F",
            icon: "i-heroicons-check-circle",
            color: "green"
          });
          setTimeout(() => {
            reloadSuccess.value = false;
          }, 3e3);
        } else {
          console.error("\u914D\u7F6E\u70ED\u91CD\u8F7D\u5931\u8D25:", response.error);
          const toast = useToast();
          toast.add({
            title: "\u70ED\u91CD\u8F7D\u5931\u8D25",
            description: response.error || "\u914D\u7F6E\u91CD\u8F7D\u65F6\u53D1\u751F\u9519\u8BEF",
            icon: "i-heroicons-exclamation-triangle",
            color: "red"
          });
        }
      } catch (error) {
        console.error("\u914D\u7F6E\u70ED\u91CD\u8F7D\u5931\u8D25:", error);
        const toast = useToast();
        toast.add({
          title: "\u70ED\u91CD\u8F7D\u5931\u8D25",
          description: error.message || "\u7F51\u7EDC\u9519\u8BEF\u6216\u670D\u52A1\u5668\u5F02\u5E38",
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
        title: enabled ? "\u70ED\u91CD\u8F7D\u5DF2\u542F\u7528" : "\u70ED\u91CD\u8F7D\u5DF2\u7981\u7528",
        description: enabled ? "\u914D\u7F6E\u53D8\u66F4\u65F6\u5C06\u81EA\u52A8\u91CD\u8F7D" : "\u914D\u7F6E\u53D8\u66F4\u65F6\u9700\u8981\u624B\u52A8\u91CD\u542F",
        icon: enabled ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
        color: enabled ? "green" : "orange"
      });
    };
    const restartBot = async () => {
      try {
        isRestarting.value = true;
        showRestartProgress.value = true;
        restartProgress.value = 0;
        restartStatus.value = "\u6B63\u5728\u68C0\u67E5\u673A\u5668\u4EBA\u8FDB\u7A0B...";
        const updateProgress = (progress, status) => {
          restartProgress.value = progress;
          restartStatus.value = status;
        };
        const response = await $fetch("/api/restart-bot", {
          method: "POST"
        });
        if (response.success) {
          updateProgress(20, "\u6B63\u5728\u505C\u6B62\u73B0\u6709\u8FDB\u7A0B...");
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          updateProgress(50, "\u6B63\u5728\u6E05\u7406\u8D44\u6E90...");
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          updateProgress(80, "\u6B63\u5728\u542F\u52A8\u673A\u5668\u4EBA...");
          await new Promise((resolve) => setTimeout(resolve, 1500));
          updateProgress(100, "\u91CD\u542F\u5B8C\u6210");
          setTimeout(() => {
            showRestartProgress.value = false;
            restartProgress.value = 0;
            restartStatus.value = "";
          }, 2e3);
          console.log("\u673A\u5668\u4EBA\u91CD\u542F\u6210\u529F");
        } else {
          console.error("\u91CD\u542F\u673A\u5668\u4EBA\u5931\u8D25:", response.error);
          restartStatus.value = "\u91CD\u542F\u5931\u8D25: " + response.error;
        }
      } catch (error) {
        console.error("\u91CD\u542F\u673A\u5668\u4EBA\u5931\u8D25:", error);
        restartStatus.value = "\u91CD\u542F\u5931\u8D25: " + error.message;
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
      _push(`</div> \u673A\u5668\u4EBA\u7BA1\u7406 </h1><p class="mt-1 text-sm text-[#9ca3af]">\u76D1\u63A7\u548C\u7BA1\u7406\u80FD\u91CF\u51FA\u79DF\u673A\u5668\u4EBA\u72B6\u6001</p></div><div class="flex gap-2">`);
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
            _push2(` \u6DFB\u52A0\u673A\u5668\u4EBA `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u6DFB\u52A0\u673A\u5668\u4EBA ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h3 class="text-lg font-medium text-white">\u673A\u5668\u4EBA\u914D\u7F6E</h3><div class="flex items-center gap-2">`);
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
              _push2(` \u4FDD\u5B58\u4E2D... `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-3 h-3 mr-1 animate-spin"
                }),
                createTextVNode(" \u4FDD\u5B58\u4E2D... ")
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
              _push2(` \u5DF2\u4FDD\u5B58 `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check",
                  class: "w-3 h-3 mr-1"
                }),
                createTextVNode(" \u5DF2\u4FDD\u5B58 ")
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
      _push(`<span class="text-sm text-[#9ca3af]">\u70ED\u66F4\u65B0</span>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(hotReloadEnabled),
        "onUpdate:modelValue": ($event) => isRef(hotReloadEnabled) ? hotReloadEnabled.value = $event : null,
        onChange: toggleHotReload,
        loading: unref(isReloading),
        color: "primary",
        size: "sm"
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([unref(hotReloadEnabled) ? "text-[#00dc82]" : "text-[#9ca3af]", "text-xs font-medium"])}">${ssrInterpolate(unref(hotReloadEnabled) ? "\u5DF2\u542F\u7528" : "\u5DF2\u7981\u7528")}</span></div>`);
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
            _push2(` \u91CD\u542F\u673A\u5668\u4EBA `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u91CD\u542F\u673A\u5668\u4EBA ")
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
            _push2(` \u7ACB\u5373\u4FDD\u5B58 `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-check",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" \u7ACB\u5373\u4FDD\u5B58 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(showRestartProgress)) {
        _push(`<div class="mt-3 flex justify-end"><div class="w-48"><div class="flex items-center justify-between text-xs text-[#9ca3af] mb-1"><span>\u91CD\u542F\u8FDB\u5EA6</span><span>${ssrInterpolate(unref(restartProgress))}%</span></div><div class="w-full bg-[#2a2a2b] rounded-full h-2"><div class="bg-[#00dc82] h-2 rounded-full transition-all duration-300 ease-out" style="${ssrRenderStyle({ width: unref(restartProgress) + "%" })}"></div></div><div class="text-xs text-[#9ca3af] mt-1">${ssrInterpolate(unref(restartStatus))}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="p-4 space-y-6"><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cog-6-tooth",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` \u57FA\u7840\u914D\u7F6E </h4><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">Bot Token</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).token,
        "onUpdate:modelValue": ($event) => unref(botConfig).token = $event,
        placeholder: "\u8BF7\u8F93\u5165\u673A\u5668\u4EBA\u4EE4\u724C",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u7BA1\u7406\u5458 ID</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).adminId,
        "onUpdate:modelValue": ($event) => unref(botConfig).adminId = $event,
        placeholder: "\u8BF7\u8F93\u5165\u7BA1\u7406\u5458ID",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u5BA2\u670D\u94FE\u63A5</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).customerServiceId,
        "onUpdate:modelValue": ($event) => unref(botConfig).customerServiceId = $event,
        placeholder: "\u8BF7\u8F93\u5165\u5BA2\u670D\u94FE\u63A5",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u673A\u5668\u4EBAID</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).botId,
        "onUpdate:modelValue": ($event) => unref(botConfig).botId = $event,
        placeholder: "\u8BF7\u8F93\u5165\u673A\u5668\u4EBAID",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u7FA4\u7EC4\u94FE\u63A5</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).groupLink,
        "onUpdate:modelValue": ($event) => unref(botConfig).groupLink = $event,
        placeholder: "\u8BF7\u8F93\u5165\u7FA4\u7EC4\u94FE\u63A5",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u63A7\u5236\u5730\u5740</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).controlAddress,
        "onUpdate:modelValue": ($event) => unref(botConfig).controlAddress = $event,
        placeholder: "\u8BF7\u8F93\u5165\u63A7\u5236\u5730\u5740",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u79C1\u94A5</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).privateKey,
        "onUpdate:modelValue": ($event) => unref(botConfig).privateKey = $event,
        placeholder: "\u8BF7\u8F93\u5165\u79C1\u94A5",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u7528\u6237\u540D</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).username,
        "onUpdate:modelValue": ($event) => unref(botConfig).username = $event,
        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u5BC6\u7801</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).password,
        "onUpdate:modelValue": ($event) => unref(botConfig).password = $event,
        type: "password",
        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u5E7F\u544A\u65F6\u95F4</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).adTime,
        "onUpdate:modelValue": ($event) => unref(botConfig).adTime = $event,
        placeholder: "\u8BF7\u8F93\u5165\u5E7F\u544A\u65F6\u95F4",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6C47\u7387\u6298\u6263</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).huilvZhekou,
        "onUpdate:modelValue": ($event) => unref(botConfig).huilvZhekou = $event,
        type: "number",
        step: "0.01",
        placeholder: "\u8BF7\u8F93\u5165\u6C47\u7387\u6298\u6263",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-currency-dollar",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` \u4EF7\u683C\u914D\u7F6E </h4><div class="grid grid-cols-1 gap-4 md:grid-cols-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u5C0F\u65F6\u4EF7\u683C</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).hourPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).hourPrice = $event,
        type: "number",
        step: "0.1",
        placeholder: "\u8BF7\u8F93\u5165\u5C0F\u65F6\u4EF7\u683C",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u65E5\u4EF7\u683C</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).dayPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).dayPrice = $event,
        type: "number",
        step: "0.1",
        placeholder: "\u8BF7\u8F93\u5165\u65E5\u4EF7\u683C",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u4E09\u65E5\u4EF7\u683C</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).threeDayPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).threeDayPrice = $event,
        type: "number",
        step: "0.1",
        placeholder: "\u8BF7\u8F93\u5165\u4E09\u65E5\u4EF7\u683C",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u9884\u5B58\u4EF7\u683C</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).yucunPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).yucunPrice = $event,
        type: "number",
        step: "0.1",
        placeholder: "\u8BF7\u8F93\u5165\u9884\u5B58\u4EF7\u683C",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><div class="flex items-center justify-between mb-3"><h4 class="text-md font-medium text-white flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-circle-stack",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` \u6570\u636E\u5E93\u914D\u7F6E </h4></div><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u4E3B\u673A</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbHost,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbHost = $event,
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u4E3B\u673A\u5730\u5740",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u7AEF\u53E3</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbPort,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbPort = $event,
        type: "number",
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u7AEF\u53E3",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u540D\u79F0</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbName,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbName = $event,
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u540D\u79F0",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u7528\u6237</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbUser,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbUser = $event,
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u7528\u6237\u540D",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div><div class="md:col-span-2"><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u5BC6\u7801</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(dbConfig).dbPassword,
        "onUpdate:modelValue": ($event) => unref(dbConfig).dbPassword = $event,
        type: "password",
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u5BC6\u7801",
        class: "bg-[#0c0c0d]",
        onInput: handleDbConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-key",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` Tron API \u914D\u7F6E </h4><div class="grid grid-cols-1 gap-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2"> Tron API Key <span class="text-xs text-[#6b7280] ml-2">(\u6765\u81EA al.py \u6587\u4EF6)</span></label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).tronApiKey,
        "onUpdate:modelValue": ($event) => unref(botConfig).tronApiKey = $event,
        placeholder: "\u8BF7\u8F93\u5165 Tron API Key",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`<p class="mt-1 text-xs text-[#6b7280]"> \u4FEE\u6539\u540E\u5C06\u81EA\u52A8\u4FDD\u5B58\u5230 al.py \u6587\u4EF6\u4E2D\u7684 API_KEY \u53D8\u91CF </p></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bots/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CtKMaeQ1.mjs.map
