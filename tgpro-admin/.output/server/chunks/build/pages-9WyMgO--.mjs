import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import { l as logo_default } from './logo-C6xj12lo.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import Input_default from './Input-CbhZIhGI.mjs';
import { defineComponent, useSSRContext, ref, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import './server.mjs';
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
import './Icon-BQxbVddL.mjs';
import './components-CqoEyeNn.mjs';
import '@iconify/utils/lib/css/icon';
import './ui-G7Oicn0a.mjs';
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';
import './useFormGroup-ZK-CpXpd.mjs';

var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loginForm = ref({
      username: "",
      password: ""
    });
    const loading = ref(false);
    const errorMessage = ref("");
    watch(loginForm, (newVal, oldVal) => {
      console.log("Form data changed:", {
        old: oldVal,
        new: newVal
      });
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = Input_default;
      const _component_UButton = Button_default;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0c0c0d] flex items-center justify-center" }, _attrs))} data-v-55861d20><div class="w-full max-w-md" data-v-55861d20><div class="text-center mb-8" data-v-55861d20><img${ssrRenderAttr("src", logo_default)} alt="Logo" class="h-16 w-auto mx-auto mb-4" data-v-55861d20><h1 class="text-2xl font-bold text-white mb-2" data-v-55861d20>\u7BA1\u7406\u540E\u53F0</h1><p class="text-[#9ca3af]" data-v-55861d20>\u8BF7\u8F93\u5165\u60A8\u7684\u767B\u5F55\u51ED\u636E</p></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-6" data-v-55861d20><form class="space-y-4" data-v-55861d20><div data-v-55861d20><label for="username" class="block text-sm font-medium text-white mb-2" data-v-55861d20> \u7528\u6237\u540D </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        id: "username",
        modelValue: unref(loginForm).username,
        "onUpdate:modelValue": ($event) => unref(loginForm).username = $event,
        type: "text",
        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
        disabled: unref(loading),
        class: "w-full text-white",
        style: {
          "background-color": "black !important",
          "color": "white !important"
        },
        size: "lg"
      }, null, _parent));
      _push(`</div><div data-v-55861d20><label for="password" class="block text-sm font-medium text-white mb-2" data-v-55861d20> \u5BC6\u7801 </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        id: "password",
        modelValue: unref(loginForm).password,
        "onUpdate:modelValue": ($event) => unref(loginForm).password = $event,
        type: "password",
        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
        disabled: unref(loading),
        class: "w-full text-white",
        style: {
          "background-color": "black !important",
          "color": "white !important"
        },
        size: "lg"
      }, null, _parent));
      _push(`</div>`);
      if (unref(errorMessage)) _push(`<div class="text-red-400 text-sm text-center" data-v-55861d20>${ssrInterpolate(unref(errorMessage))}</div>`);
      else _push(`<!---->`);
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        loading: unref(loading),
        disabled: unref(loading),
        class: "w-full text-center flex items-center justify-center",
        size: "lg",
        color: "primary"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) _push$1(`${ssrInterpolate(unref(loading) ? "\u767B\u5F55\u4E2D..." : "\u767B\u5F55")}`);
          else return [createTextVNode(toDisplayString(unref(loading) ? "\u767B\u5F55\u4E2D..." : "\u767B\u5F55"), 1)];
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div></div>`);
    };
  }
});
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = /* @__PURE__ */ __plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-55861d20"]]);

export { pages_default as default };
//# sourceMappingURL=pages-9WyMgO--.mjs.map
