import Icon_default from './Icon-BQxbVddL.mjs';
import Toggle_default from './Toggle-D7wSDC1Y.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import Badge_default from './Badge-Bb9IcqQP.mjs';
import Input_default from './Input-CbhZIhGI.mjs';
import Textarea_default from './Textarea-ClW9ULmm.mjs';
import { u as useToast } from './useToast-C_VA77Lb.mjs';
import { ref, mergeProps, withCtx, createVNode, createTextVNode, unref, isRef, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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
import './form-1BInePM-.mjs';
import './keyboard-CvjRf4Wb.mjs';
import './use-resolve-button-type-eioNRL5V.mjs';
import './hidden-Bsn3DsxF.mjs';
import './description-Y4p4EFv6.mjs';
import './useFormGroup-ZK-CpXpd.mjs';
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';

var _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const botConfig = ref({
      token: "",
      controlAddress: "",
      adminId: "",
      customerServiceId: "",
      tiaozhuan: "",
      threePrice: "",
      sixPrice: "",
      yearPrice: "",
      resHash: "",
      resCookie: "",
      walletMnemonic: "",
      dbHost: "",
      dbUser: "",
      dbPassword: "",
      dbName: "",
      dbPort: "",
      tronApiKey: ""
    });
    const isSaving = ref(false);
    const lastSaved = ref(false);
    let saveTimeout = null;
    const isRestarting = ref(false);
    const showRestartProgress = ref(false);
    const restartProgress = ref(0);
    const restartStatus = ref("");
    const hotReloadEnabled = ref(false);
    const handleConfigChange = () => {
      if (saveTimeout) clearTimeout(saveTimeout);
      lastSaved.value = false;
      saveTimeout = setTimeout(() => {
        saveConfig();
      }, 3e3);
    };
    const handleHotReloadToggle = () => {
      console.log("\u70ED\u66F4\u65B0\u72B6\u6001\u5207\u6362:", hotReloadEnabled.value);
      if (hotReloadEnabled.value) saveConfig();
    };
    const saveConfig = async () => {
      try {
        isSaving.value = true;
        console.log("\u4FDD\u5B58\u914D\u7F6E:", botConfig.value);
        const response = await $fetch("/api/bot-config", {
          method: "POST",
          body: {
            ...botConfig.value,
            hotReload: hotReloadEnabled.value
          }
        });
        if (response.success) {
          console.log("\u914D\u7F6E\u4FDD\u5B58\u6210\u529F");
          lastSaved.value = true;
          if (hotReloadEnabled.value) useToast().add({
            title: "\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u70ED\u66F4\u65B0",
            description: "\u673A\u5668\u4EBA\u914D\u7F6E\u5DF2\u81EA\u52A8\u91CD\u8F7D\uFF0C\u65E0\u9700\u91CD\u542F",
            icon: "i-heroicons-bolt",
            color: "green"
          });
          setTimeout(() => {
            lastSaved.value = false;
          }, 3e3);
        } else {
          console.error("\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:", response.error);
          useToast().add({
            title: "\u4FDD\u5B58\u5931\u8D25",
            description: response.error || "\u914D\u7F6E\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
            icon: "i-heroicons-exclamation-triangle",
            color: "red"
          });
        }
      } catch (error) {
        console.error("\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25:", error);
        useToast().add({
          title: "\u4FDD\u5B58\u5931\u8D25",
          description: "\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\u540E\u91CD\u8BD5",
          icon: "i-heroicons-exclamation-triangle",
          color: "red"
        });
      } finally {
        isSaving.value = false;
      }
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
        const response = await $fetch("/api/restart-bot", { method: "POST" });
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
      const _component_UIcon = Icon_default;
      const _component_UButton = Button_default;
      const _component_UBadge = Badge_default;
      const _component_UToggle = Toggle_default;
      const _component_UInput = Input_default;
      const _component_UTextarea = Textarea_default;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cpu-chip",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> \u673A\u5668\u4EBA\u7BA1\u7406 </h1><p class="mt-1 text-sm text-[#9ca3af]">\u76D1\u63A7\u548C\u7BA1\u7406 Telegram \u673A\u5668\u4EBA\u72B6\u6001</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u5237\u65B0\u72B6\u6001 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-path",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u5237\u65B0\u72B6\u6001 ")];
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
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u6DFB\u52A0\u673A\u5668\u4EBA `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-plus",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u6DFB\u52A0\u673A\u5668\u4EBA ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg"><div class="px-4 py-3 border-b border-[#2a2a2b]"><div class="flex items-center justify-between"><h3 class="text-lg font-medium text-white">\u673A\u5668\u4EBA\u914D\u7F6E</h3><div class="flex items-center gap-2">`);
      if (unref(isSaving)) _push(ssrRenderComponent(_component_UBadge, {
        color: "yellow",
        variant: "subtle",
        size: "sm"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-3 h-3 mr-1 animate-spin"
            }, null, _parent$1, _scopeId));
            _push$1(` \u4FDD\u5B58\u4E2D... `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-path",
            class: "w-3 h-3 mr-1 animate-spin"
          }), createTextVNode(" \u4FDD\u5B58\u4E2D... ")];
        }),
        _: 1
      }, _parent));
      else if (unref(lastSaved)) _push(ssrRenderComponent(_component_UBadge, {
        color: "green",
        variant: "subtle",
        size: "sm"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check",
              class: "w-3 h-3 mr-1"
            }, null, _parent$1, _scopeId));
            _push$1(` \u5DF2\u4FDD\u5B58 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-check",
            class: "w-3 h-3 mr-1"
          }), createTextVNode(" \u5DF2\u4FDD\u5B58 ")];
        }),
        _: 1
      }, _parent));
      else _push(`<!---->`);
      _push(`<div class="flex items-center gap-2 px-3 py-1 bg-[#1a1a1b] rounded-lg border border-[#2a2a2b]">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-4 h-4 text-[#00dc82]"
      }, null, _parent));
      _push(`<span class="text-sm text-[#9ca3af]">\u70ED\u66F4\u65B0</span>`);
      _push(ssrRenderComponent(_component_UToggle, {
        modelValue: unref(hotReloadEnabled),
        "onUpdate:modelValue": ($event) => isRef(hotReloadEnabled) ? hotReloadEnabled.value = $event : null,
        size: "sm",
        onChange: handleHotReloadToggle
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "sm",
        class: "bg-[#00dc82] hover:bg-[#00dc82]/80",
        onClick: restartBot,
        loading: unref(isRestarting),
        disabled: unref(hotReloadEnabled)
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u91CD\u542F\u673A\u5668\u4EBA `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-path",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u91CD\u542F\u673A\u5668\u4EBA ")];
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
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` ${ssrInterpolate(unref(hotReloadEnabled) ? "\u4FDD\u5B58\u5E76\u70ED\u66F4\u65B0" : "\u7ACB\u5373\u4FDD\u5B58")}`);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-check",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" " + toDisplayString(unref(hotReloadEnabled) ? "\u4FDD\u5B58\u5E76\u70ED\u66F4\u65B0" : "\u7ACB\u5373\u4FDD\u5B58"), 1)];
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(showRestartProgress)) _push(`<div class="mt-3 flex justify-end"><div class="w-48"><div class="flex items-center justify-between text-xs text-[#9ca3af] mb-1"><span>\u91CD\u542F\u8FDB\u5EA6</span><span>${ssrInterpolate(unref(restartProgress))}%</span></div><div class="w-full bg-[#2a2a2b] rounded-full h-2"><div class="bg-[#00dc82] h-2 rounded-full transition-all duration-300 ease-out" style="${ssrRenderStyle({ width: unref(restartProgress) + "%" })}"></div></div><div class="text-xs text-[#9ca3af] mt-1">${ssrInterpolate(unref(restartStatus))}</div></div></div>`);
      else _push(`<!---->`);
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
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u94B1\u5305\u5730\u5740</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).controlAddress,
        "onUpdate:modelValue": ($event) => unref(botConfig).controlAddress = $event,
        placeholder: "\u8BF7\u8F93\u5165\u94B1\u5305\u5730\u5740",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div class="md:col-span-2"><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u673A\u5668\u4EBA\u8FDE\u63A5</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).tiaozhuan,
        "onUpdate:modelValue": ($event) => unref(botConfig).tiaozhuan = $event,
        placeholder: "\u8BF7\u8F93\u5165\u673A\u5668\u4EBA\u8FDE\u63A5",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-currency-dollar",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` \u4EF7\u683C\u914D\u7F6E </h4><div class="grid grid-cols-1 gap-4 md:grid-cols-3"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">3\u4E2A\u6708\u4EF7\u683C</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).threePrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).threePrice = $event,
        type: "number",
        placeholder: "\u8BF7\u8F93\u51653\u4E2A\u6708\u4EF7\u683C",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">6\u4E2A\u6708\u4EF7\u683C</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).sixPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).sixPrice = $event,
        type: "number",
        placeholder: "\u8BF7\u8F93\u51656\u4E2A\u6708\u4EF7\u683C",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u5E74\u8D39\u4EF7\u683C</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).yearPrice,
        "onUpdate:modelValue": ($event) => unref(botConfig).yearPrice = $event,
        type: "number",
        placeholder: "\u8BF7\u8F93\u5165\u5E74\u8D39\u4EF7\u683C",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-globe-alt",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` \u8D44\u6E90\u914D\u7F6E </h4><div class="grid grid-cols-1 gap-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u8D44\u6E90\u54C8\u5E0C</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).resHash,
        "onUpdate:modelValue": ($event) => unref(botConfig).resHash = $event,
        placeholder: "\u8BF7\u8F93\u5165\u8D44\u6E90\u54C8\u5E0C",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u8D44\u6E90Cookie</label>`);
      _push(ssrRenderComponent(_component_UTextarea, {
        modelValue: unref(botConfig).resCookie,
        "onUpdate:modelValue": ($event) => unref(botConfig).resCookie = $event,
        placeholder: "\u8BF7\u8F93\u5165\u8D44\u6E90Cookie",
        class: "bg-[#0c0c0d]",
        rows: 3,
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u94B1\u5305\u52A9\u8BB0\u8BCD</label>`);
      _push(ssrRenderComponent(_component_UTextarea, {
        modelValue: unref(botConfig).walletMnemonic,
        "onUpdate:modelValue": ($event) => unref(botConfig).walletMnemonic = $event,
        placeholder: "\u8BF7\u8F93\u5165\u94B1\u5305\u52A9\u8BB0\u8BCD\uFF08\u7528\u7A7A\u683C\u5206\u9694\uFF09",
        class: "bg-[#0c0c0d]",
        rows: 2,
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-circle-stack",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` \u6570\u636E\u5E93\u914D\u7F6E </h4><div class="grid grid-cols-1 gap-4 md:grid-cols-2"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u4E3B\u673A</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).dbHost,
        "onUpdate:modelValue": ($event) => unref(botConfig).dbHost = $event,
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u4E3B\u673A\u5730\u5740",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u7AEF\u53E3</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).dbPort,
        "onUpdate:modelValue": ($event) => unref(botConfig).dbPort = $event,
        type: "number",
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u7AEF\u53E3",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u540D\u79F0</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).dbName,
        "onUpdate:modelValue": ($event) => unref(botConfig).dbName = $event,
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u540D\u79F0",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u7528\u6237</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).dbUser,
        "onUpdate:modelValue": ($event) => unref(botConfig).dbUser = $event,
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u7528\u6237\u540D",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div><div class="md:col-span-2"><label class="block text-sm font-medium text-[#9ca3af] mb-2">\u6570\u636E\u5E93\u5BC6\u7801</label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).dbPassword,
        "onUpdate:modelValue": ($event) => unref(botConfig).dbPassword = $event,
        type: "password",
        placeholder: "\u8BF7\u8F93\u5165\u6570\u636E\u5E93\u5BC6\u7801",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`</div></div></div><div><h4 class="text-md font-medium text-white mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-key",
        class: "w-4 h-4 mr-2"
      }, null, _parent));
      _push(` Tron API \u914D\u7F6E </h4><div class="grid grid-cols-1 gap-4"><div><label class="block text-sm font-medium text-[#9ca3af] mb-2"> Tron API Key <span class="text-xs text-[#6b7280] ml-2">(\u6765\u81EA hy.py \u6587\u4EF6)</span></label>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(botConfig).tronApiKey,
        "onUpdate:modelValue": ($event) => unref(botConfig).tronApiKey = $event,
        placeholder: "\u8BF7\u8F93\u5165 Tron API Key",
        class: "bg-[#0c0c0d]",
        onInput: handleConfigChange
      }, null, _parent));
      _push(`<p class="mt-1 text-xs text-[#6b7280]"> \u4FEE\u6539\u540E\u5C06\u81EA\u52A8\u4FDD\u5B58\u5230 hy.py \u6587\u4EF6\u4E2D\u7684 tron_api_key \u53D8\u91CF </p></div></div></div></div></div></div>`);
    };
  }
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bots/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var bots_default = _sfc_main;

export { bots_default as default };
//# sourceMappingURL=bots-BnAOkfjA.mjs.map
