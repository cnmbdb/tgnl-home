import Icon_default from './Icon-BQxbVddL.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import Badge_default from './Badge-Bb9IcqQP.mjs';
import Textarea_default from './Textarea-ClW9ULmm.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';
import './useFormGroup-ZK-CpXpd.mjs';

var _sfc_main = {
  __name: "contribution-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const license = ref({
      status: "\u5DF2\u6FC0\u6D3B",
      expiryDate: "2024-12-31",
      maxUsers: 100,
      currentUsers: 45,
      edition: "\u4F01\u4E1A\u7248",
      features: "\u5168\u529F\u80FD",
      remainingDays: 156,
      autoRenewal: true
    });
    const licenseDetails = ref({
      id: "TGP-ENT-2024-XXXX-XXXX-XXXX",
      issuer: "TG Pro Technologies",
      type: "\u5E74\u5EA6\u6388\u6743",
      activatedAt: "2024-01-01 10:30:00",
      lastVerified: "2\u5C0F\u65F6\u524D"
    });
    const features = ref([
      {
        name: "\u673A\u5668\u4EBA\u7BA1\u7406",
        description: "\u521B\u5EFA\u548C\u7BA1\u7406\u591A\u4E2ATelegram\u673A\u5668\u4EBA",
        icon: "i-heroicons-cpu-chip",
        enabled: true
      },
      {
        name: "\u7528\u6237\u7BA1\u7406",
        description: "\u7BA1\u7406\u7528\u6237\u6743\u9650\u548C\u8BBF\u95EE\u63A7\u5236",
        icon: "i-heroicons-users",
        enabled: true
      },
      {
        name: "\u6570\u636E\u5206\u6790",
        description: "\u8BE6\u7EC6\u7684\u4F7F\u7528\u7EDF\u8BA1\u548C\u5206\u6790\u62A5\u544A",
        icon: "i-heroicons-chart-bar",
        enabled: true
      },
      {
        name: "API \u63A5\u53E3",
        description: "\u5B8C\u6574\u7684REST API\u8BBF\u95EE\u6743\u9650",
        icon: "i-heroicons-code-bracket",
        enabled: true
      },
      {
        name: "\u9AD8\u7EA7\u529F\u80FD",
        description: "\u81EA\u5B9A\u4E49\u63D2\u4EF6\u548C\u6269\u5C55\u529F\u80FD",
        icon: "i-heroicons-puzzle-piece",
        enabled: false
      },
      {
        name: "\u6280\u672F\u652F\u6301",
        description: "7x24\u5C0F\u65F6\u6280\u672F\u652F\u6301\u670D\u52A1",
        icon: "i-heroicons-chat-bubble-left-right",
        enabled: true
      }
    ]);
    const licenseHistory = ref([
      {
        id: 1,
        action: "\u6388\u6743\u6FC0\u6D3B",
        description: "\u6210\u529F\u6FC0\u6D3B\u4F01\u4E1A\u7248\u6388\u6743",
        date: "2024-01-01",
        time: "10:30:00",
        icon: "i-heroicons-check-circle"
      },
      {
        id: 2,
        action: "\u6388\u6743\u9A8C\u8BC1",
        description: "\u5B9A\u671F\u6388\u6743\u72B6\u6001\u9A8C\u8BC1",
        date: "2024-01-15",
        time: "14:20:00",
        icon: "i-heroicons-shield-check"
      },
      {
        id: 3,
        action: "\u529F\u80FD\u66F4\u65B0",
        description: "\u65B0\u589E\u9AD8\u7EA7\u5206\u6790\u529F\u80FD",
        date: "2024-02-01",
        time: "09:15:00",
        icon: "i-heroicons-arrow-up-circle"
      },
      {
        id: 4,
        action: "\u6388\u6743\u7EED\u671F",
        description: "\u81EA\u52A8\u7EED\u671F\u81F32024\u5E74\u5E95",
        date: "2024-03-01",
        time: "00:00:00",
        icon: "i-heroicons-calendar-days"
      }
    ]);
    const newLicenseKey = ref("");
    const verifying = ref(false);
    const updating = ref(false);
    const refreshing = ref(false);
    const copyLicenseId = () => {
      (void 0).clipboard.writeText(licenseDetails.value.id);
    };
    const verifyLicense = async () => {
      verifying.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        licenseDetails.value.lastVerified = "\u521A\u521A";
      } finally {
        verifying.value = false;
      }
    };
    const updateLicense = async () => {
      updating.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 3e3));
        newLicenseKey.value = "";
      } finally {
        updating.value = false;
      }
    };
    const validateKey = () => {
    };
    const selectFile = () => {
    };
    const loadMoreHistory = () => {
    };
    const refreshLicense = async () => {
      refreshing.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      } finally {
        refreshing.value = false;
      }
    };
    const exportLicense = () => {
    };
    const contactSupport = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = Icon_default;
      const _component_UButton = Button_default;
      const _component_UBadge = Badge_default;
      const _component_UTextarea = Textarea_default;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto space-y-6" }, _attrs))}><div class="text-center space-y-4"><div class="flex justify-center"><div class="w-16 h-16 bg-[#1a1a1b] border border-[#2a2a2b] rounded-2xl flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-key",
        class: "w-8 h-8 text-[#00dc82]"
      }, null, _parent));
      _push(`</div></div><h1 class="text-3xl font-bold text-white">\u66F4\u65B0\u6388\u6743</h1><p class="text-[#9ca3af] max-w-2xl mx-auto"> \u7BA1\u7406\u7CFB\u7EDF\u6388\u6743\u8BB8\u53EF\u3001\u66F4\u65B0\u6388\u6743\u72B6\u6001\u548C\u8BB8\u53EF\u8BC1\u4FE1\u606F </p></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h2 class="text-xl font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` \u5F53\u524D\u6388\u6743\u72B6\u6001 </h2><div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div class="text-center space-y-2"><div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-6 h-6 text-[#00dc82]"
      }, null, _parent));
      _push(`</div><div class="text-lg font-semibold text-white">${ssrInterpolate(unref(license).status)}</div><div class="text-sm text-[#00dc82]">\u6388\u6743\u72B6\u6001</div><div class="text-xs text-[#9ca3af]">\u6709\u6548\u671F\u81F3: ${ssrInterpolate(unref(license).expiryDate)}</div></div><div class="text-center space-y-2"><div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-users",
        class: "w-6 h-6 text-blue-400"
      }, null, _parent));
      _push(`</div><div class="text-lg font-semibold text-white">${ssrInterpolate(unref(license).maxUsers)}</div><div class="text-sm text-blue-400">\u6700\u5927\u7528\u6237\u6570</div><div class="text-xs text-[#9ca3af]">\u5F53\u524D: ${ssrInterpolate(unref(license).currentUsers)} \u7528\u6237</div></div><div class="text-center space-y-2"><div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-server",
        class: "w-6 h-6 text-purple-400"
      }, null, _parent));
      _push(`</div><div class="text-lg font-semibold text-white">${ssrInterpolate(unref(license).edition)}</div><div class="text-sm text-purple-400">\u6388\u6743\u7248\u672C</div><div class="text-xs text-[#9ca3af]">\u529F\u80FD: ${ssrInterpolate(unref(license).features)}</div></div><div class="text-center space-y-2"><div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-calendar-days",
        class: "w-6 h-6 text-orange-400"
      }, null, _parent));
      _push(`</div><div class="text-lg font-semibold text-white">${ssrInterpolate(unref(license).remainingDays)}</div><div class="text-sm text-orange-400">\u5269\u4F59\u5929\u6570</div><div class="text-xs text-[#9ca3af]">\u81EA\u52A8\u7EED\u671F: ${ssrInterpolate(unref(license).autoRenewal ? "\u5DF2\u542F\u7528" : "\u5DF2\u7981\u7528")}</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-document-text",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` \u8BB8\u53EF\u8BC1\u8BE6\u60C5 </h3><div class="space-y-4"><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u8BB8\u53EF\u8BC1ID</div><div class="text-sm text-[#9ca3af] font-mono">${ssrInterpolate(unref(licenseDetails).id)}</div></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        onClick: copyLicenseId
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-clipboard",
            class: "w-4 h-4"
          }, null, _parent$1, _scopeId));
          else return [createVNode(_component_UIcon, {
            name: "i-heroicons-clipboard",
            class: "w-4 h-4"
          })];
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u6388\u6743\u673A\u6784</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(unref(licenseDetails).issuer)}</div></div></div><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u6388\u6743\u7C7B\u578B</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(unref(licenseDetails).type)}</div></div>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(licenseDetails).type === "\u6C38\u4E45\u6388\u6743" ? "green" : "blue",
        variant: "subtle"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) _push$1(`${ssrInterpolate(unref(licenseDetails).type)}`);
          else return [createTextVNode(toDisplayString(unref(licenseDetails).type), 1)];
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u6FC0\u6D3B\u65F6\u95F4</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(unref(licenseDetails).activatedAt)}</div></div></div><div class="flex items-center justify-between"><div><div class="text-white font-medium">\u6700\u540E\u9A8C\u8BC1</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(unref(licenseDetails).lastVerified)}</div></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        onClick: verifyLicense,
        loading: unref(verifying)
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
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-lock-closed",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` \u529F\u80FD\u6743\u9650 </h3><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(features), (feature) => {
        _push(`<div class="flex items-center justify-between"><div class="flex items-center space-x-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: feature.icon,
          class: "w-5 h-5 text-[#00dc82]"
        }, null, _parent));
        _push(`<div><div class="text-white font-medium">${ssrInterpolate(feature.name)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(feature.description)}</div></div></div><div class="flex items-center space-x-2">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: feature.enabled ? "green" : "gray",
          variant: "subtle",
          size: "xs"
        }, {
          default: withCtx((_, _push$1, _parent$1, _scopeId) => {
            if (_push$1) _push$1(`${ssrInterpolate(feature.enabled ? "\u5DF2\u542F\u7528" : "\u672A\u6388\u6743")}`);
            else return [createTextVNode(toDisplayString(feature.enabled ? "\u5DF2\u542F\u7528" : "\u672A\u6388\u6743"), 1)];
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_UIcon, {
          name: feature.enabled ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
          class: [feature.enabled ? "text-[#00dc82]" : "text-red-400", "w-4 h-4"]
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-up-circle",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` \u66F4\u65B0\u6388\u6743 </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><div><label class="block text-white font-medium mb-2">\u65B0\u6388\u6743\u5BC6\u94A5</label>`);
      _push(ssrRenderComponent(_component_UTextarea, {
        modelValue: unref(newLicenseKey),
        "onUpdate:modelValue": ($event) => isRef(newLicenseKey) ? newLicenseKey.value = $event : null,
        placeholder: "\u8BF7\u8F93\u5165\u65B0\u7684\u6388\u6743\u5BC6\u94A5...",
        rows: "4",
        class: "w-full"
      }, null, _parent));
      _push(`</div><div class="flex space-x-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: updateLicense,
        loading: unref(updating),
        disabled: !unref(newLicenseKey)
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-key",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u66F4\u65B0\u6388\u6743 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-key",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u66F4\u65B0\u6388\u6743 ")];
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        onClick: validateKey,
        disabled: !unref(newLicenseKey)
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shield-check",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u9A8C\u8BC1\u5BC6\u94A5 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-shield-check",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u9A8C\u8BC1\u5BC6\u94A5 ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="space-y-4"><div><div class="text-white font-medium mb-2">\u6388\u6743\u6587\u4EF6\u4E0A\u4F20</div><div class="border-2 border-dashed border-[#2a2a2b] rounded-lg p-6 text-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cloud-arrow-up",
        class: "w-8 h-8 text-[#9ca3af] mx-auto mb-2"
      }, null, _parent));
      _push(`<div class="text-[#9ca3af] mb-2">\u62D6\u62FD\u6388\u6743\u6587\u4EF6\u5230\u6B64\u5904\u6216</div>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        onClick: selectFile
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) _push$1(` \u9009\u62E9\u6587\u4EF6 `);
          else return [createTextVNode(" \u9009\u62E9\u6587\u4EF6 ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6"><h3 class="text-lg font-semibold text-white mb-4 flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-5 h-5 mr-3 text-[#00dc82]"
      }, null, _parent));
      _push(` \u6388\u6743\u5386\u53F2 </h3><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(licenseHistory), (history) => {
        _push(`<div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg"><div class="flex items-center space-x-4"><div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: history.icon,
          class: "w-5 h-5 text-[#00dc82]"
        }, null, _parent));
        _push(`</div><div><div class="text-white font-medium">${ssrInterpolate(history.action)}</div><div class="text-sm text-[#9ca3af]">${ssrInterpolate(history.description)}</div></div></div><div class="text-right"><div class="text-sm text-white">${ssrInterpolate(history.date)}</div><div class="text-xs text-[#9ca3af]">${ssrInterpolate(history.time)}</div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-6 flex justify-center">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        onClick: loadMoreHistory
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-down",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u52A0\u8F7D\u66F4\u591A `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-down",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u52A0\u8F7D\u66F4\u591A ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex justify-center space-x-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: refreshLicense,
        loading: unref(refreshing),
        size: "lg"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-5 h-5 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u5237\u65B0\u6388\u6743 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-path",
            class: "w-5 h-5 mr-2"
          }), createTextVNode(" \u5237\u65B0\u6388\u6743 ")];
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        onClick: exportLicense,
        size: "lg"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-down-tray",
              class: "w-5 h-5 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u5BFC\u51FA\u6388\u6743\u4FE1\u606F `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-down-tray",
            class: "w-5 h-5 mr-2"
          }), createTextVNode(" \u5BFC\u51FA\u6388\u6743\u4FE1\u606F ")];
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        onClick: contactSupport,
        size: "lg"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-chat-bubble-left-right",
              class: "w-5 h-5 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u8054\u7CFB\u652F\u6301 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-chat-bubble-left-right",
            class: "w-5 h-5 mr-2"
          }), createTextVNode(" \u8054\u7CFB\u652F\u6301 ")];
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/development/contribution-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var contribution_guide_default = _sfc_main;

export { contribution_guide_default as default };
//# sourceMappingURL=contribution-guide-Cw-pZhM7.mjs.map
