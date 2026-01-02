import { r as mergeConfig, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import { u as useUI, Q as modal_default } from './ui-G7Oicn0a.mjs';
import { s } from './keyboard-CvjRf4Wb.mjs';
import { h as he, S as Se, G as Ge, Y as Ye } from './transition-CG5tIsRm.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, renderSlot, createBlock, createCommentVNode, openBlock, toRef, computed, useId, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
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
import './micro-task-CYdHJ3PN.mjs';
import './active-element-history-DJ1NL7os.mjs';
import './focus-management-DFaZHIRF.mjs';
import './use-outside-click-B4rja7ys.mjs';
import './hidden-Bsn3DsxF.mjs';
import './open-closed-Dsm1EOia.mjs';
import './portal-BLTG7ywv.mjs';
import './description-Y4p4EFv6.mjs';

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.modal, modal_default);
var _sfc_main = defineComponent({
  components: {
    HDialog: Ye,
    HDialogPanel: Ge,
    TransitionRoot: Se,
    TransitionChild: he
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    appear: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Boolean,
      default: true
    },
    preventClose: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    class: {
      type: [
        String,
        Object,
        Array
      ],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    "update:modelValue",
    "close",
    "close-prevented",
    "after-leave"
  ],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("modal", toRef(props, "ui"), config, toRef(props, "class"));
    const isOpen = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const transitionClass = computed(() => {
      if (!props.transition) return {};
      return { ...ui.value.transition };
    });
    function close(value) {
      if (props.preventClose) {
        emit("close-prevented");
        return;
      }
      isOpen.value = value;
      emit("close");
    }
    const onAfterLeave = () => {
      emit("after-leave");
    };
    s(() => useId());
    return {
      ui,
      attrs,
      isOpen,
      transitionClass,
      onAfterLeave,
      close
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TransitionRoot = resolveComponent("TransitionRoot");
  const _component_HDialog = resolveComponent("HDialog");
  const _component_TransitionChild = resolveComponent("TransitionChild");
  const _component_HDialogPanel = resolveComponent("HDialogPanel");
  _push(ssrRenderComponent(_component_TransitionRoot, mergeProps({
    appear: _ctx.appear,
    show: _ctx.isOpen,
    as: "template",
    onAfterLeave: _ctx.onAfterLeave
  }, _attrs), {
    default: withCtx((_, _push$1, _parent$1, _scopeId) => {
      if (_push$1) _push$1(ssrRenderComponent(_component_HDialog, mergeProps({ class: _ctx.ui.wrapper }, _ctx.attrs, { onClose: _ctx.close }), {
        default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
          if (_push$2) {
            if (_ctx.overlay) _push$2(ssrRenderComponent(_component_TransitionChild, mergeProps({
              as: "template",
              appear: _ctx.appear
            }, _ctx.ui.overlay.transition, { class: _ctx.ui.overlay.transition.enterFrom }), {
              default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
                if (_push$3) _push$3(`<div class="${ssrRenderClass([_ctx.ui.overlay.base, _ctx.ui.overlay.background])}"${_scopeId$2}></div>`);
                else return [createVNode("div", { class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background] }, null, 2)];
              }),
              _: 1
            }, _parent$2, _scopeId$1));
            else _push$2(`<!---->`);
            _push$2(`<div class="${ssrRenderClass(_ctx.ui.inner)}"${_scopeId$1}><div class="${ssrRenderClass([_ctx.ui.container, !_ctx.fullscreen && _ctx.ui.padding])}"${_scopeId$1}>`);
            _push$2(ssrRenderComponent(_component_TransitionChild, mergeProps({
              as: "template",
              appear: _ctx.appear
            }, _ctx.transitionClass, { class: _ctx.transitionClass.enterFrom }), {
              default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
                if (_push$3) _push$3(ssrRenderComponent(_component_HDialogPanel, { class: [
                  _ctx.ui.base,
                  _ctx.ui.background,
                  _ctx.ui.ring,
                  _ctx.ui.shadow,
                  _ctx.fullscreen ? _ctx.ui.fullscreen : [
                    _ctx.ui.width,
                    _ctx.ui.height,
                    _ctx.ui.rounded,
                    _ctx.ui.margin
                  ]
                ] }, {
                  default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
                    if (_push$4) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$4, _parent$4, _scopeId$3);
                    else return [renderSlot(_ctx.$slots, "default")];
                  }),
                  _: 3
                }, _parent$3, _scopeId$2));
                else return [createVNode(_component_HDialogPanel, { class: [
                  _ctx.ui.base,
                  _ctx.ui.background,
                  _ctx.ui.ring,
                  _ctx.ui.shadow,
                  _ctx.fullscreen ? _ctx.ui.fullscreen : [
                    _ctx.ui.width,
                    _ctx.ui.height,
                    _ctx.ui.rounded,
                    _ctx.ui.margin
                  ]
                ] }, {
                  default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
                  _: 3
                }, 8, ["class"])];
              }),
              _: 3
            }, _parent$2, _scopeId$1));
            _push$2(`</div></div>`);
          } else return [_ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
            key: 0,
            as: "template",
            appear: _ctx.appear
          }, _ctx.ui.overlay.transition, { class: _ctx.ui.overlay.transition.enterFrom }), {
            default: withCtx(() => [createVNode("div", { class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background] }, null, 2)]),
            _: 1
          }, 16, ["appear", "class"])) : createCommentVNode("", true), createVNode("div", { class: _ctx.ui.inner }, [createVNode("div", { class: [_ctx.ui.container, !_ctx.fullscreen && _ctx.ui.padding] }, [createVNode(_component_TransitionChild, mergeProps({
            as: "template",
            appear: _ctx.appear
          }, _ctx.transitionClass, { class: _ctx.transitionClass.enterFrom }), {
            default: withCtx(() => [createVNode(_component_HDialogPanel, { class: [
              _ctx.ui.base,
              _ctx.ui.background,
              _ctx.ui.ring,
              _ctx.ui.shadow,
              _ctx.fullscreen ? _ctx.ui.fullscreen : [
                _ctx.ui.width,
                _ctx.ui.height,
                _ctx.ui.rounded,
                _ctx.ui.margin
              ]
            ] }, {
              default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
              _: 3
            }, 8, ["class"])]),
            _: 3
          }, 16, ["appear", "class"])], 2)], 2)];
        }),
        _: 3
      }, _parent$1, _scopeId));
      else return [createVNode(_component_HDialog, mergeProps({ class: _ctx.ui.wrapper }, _ctx.attrs, { onClose: _ctx.close }), {
        default: withCtx(() => [_ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
          key: 0,
          as: "template",
          appear: _ctx.appear
        }, _ctx.ui.overlay.transition, { class: _ctx.ui.overlay.transition.enterFrom }), {
          default: withCtx(() => [createVNode("div", { class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background] }, null, 2)]),
          _: 1
        }, 16, ["appear", "class"])) : createCommentVNode("", true), createVNode("div", { class: _ctx.ui.inner }, [createVNode("div", { class: [_ctx.ui.container, !_ctx.fullscreen && _ctx.ui.padding] }, [createVNode(_component_TransitionChild, mergeProps({
          as: "template",
          appear: _ctx.appear
        }, _ctx.transitionClass, { class: _ctx.transitionClass.enterFrom }), {
          default: withCtx(() => [createVNode(_component_HDialogPanel, { class: [
            _ctx.ui.base,
            _ctx.ui.background,
            _ctx.ui.ring,
            _ctx.ui.shadow,
            _ctx.fullscreen ? _ctx.ui.fullscreen : [
              _ctx.ui.width,
              _ctx.ui.height,
              _ctx.ui.rounded,
              _ctx.ui.margin
            ]
          ] }, {
            default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
            _: 3
          }, 8, ["class"])]),
          _: 3
        }, 16, ["appear", "class"])], 2)], 2)]),
        _: 3
      }, 16, ["class", "onClose"])];
    }),
    _: 3
  }, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/overlays/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Modal_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Modal_default as default };
//# sourceMappingURL=Modal-BbhoxMMu.mjs.map
