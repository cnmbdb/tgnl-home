import { r as mergeConfig, t as getSlotsChildren, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import { u as useUI, i as meterGroup_default, m as meter_default } from './ui-G7Oicn0a.mjs';
import { defineComponent, toRef, computed, cloneVNode, h } from 'vue';
import { twJoin } from 'tailwind-merge';
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
import '@iconify/vue';
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './components-CqoEyeNn.mjs';
import '@iconify/utils/lib/css/icon';
import './_plugin-vue_export-helper-COMwgem8.mjs';

var meterConfig = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.meter, meter_default);
var meterGroupConfig = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.meterGroup, meterGroup_default);
var MeterGroup_default = defineComponent({
  components: { UIcon: Icon_default },
  inheritAttrs: false,
  slots: Object,
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    size: {
      type: String,
      default: () => meterConfig.default.size,
      validator(value) {
        return Object.keys(meterConfig.meter.bar.size).includes(value);
      }
    },
    indicator: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: () => meterGroupConfig.default.icon
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
  setup(props, { slots }) {
    const { ui, attrs } = useUI("meterGroup", toRef(props, "ui"), meterGroupConfig);
    const { ui: uiMeter } = useUI("meter", void 0, meterConfig);
    if (!slots.default) throw new Error("Meter Group has no Meter children.");
    const normalizedMin = computed(() => props.min > props.max ? props.max : props.min);
    const normalizedMax = computed(() => props.max < props.min ? props.min : props.max);
    const children = computed(() => getSlotsChildren(slots));
    const rounded = computed(() => ui.value.orientation[ui.value.rounded]);
    function clampPercent(value, min, max) {
      if (min == max) return value < min ? 0 : 100;
      if (min > max) max = [min, min = max][0];
      const percent2 = (value - min) / (max - min) * 100;
      return Math.max(0, Math.min(100, percent2));
    }
    const labels = computed(() => {
      return children.value.map((node) => node.props.label);
    });
    const percents = computed(() => {
      return children.value.map((node) => clampPercent(node.props.value, props.min, props.max));
    });
    const percent = computed(() => {
      return Math.max(0, Math.max(percents.value.reduce((prev, percent2) => prev + percent2, 0)));
    });
    const clones = computed(() => children.value.map((node, index) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      const vProps = {};
      vProps.style = { width: `${percents.value[index]}%` };
      vProps.size = props.size;
      vProps.min = normalizedMin.value;
      vProps.max = normalizedMax.value;
      vProps.ui = ((_a = node.props) == null ? void 0 : _a.ui) || {};
      vProps.ui.wrapper = ((_c = (_b = node.props) == null ? void 0 : _b.ui) == null ? void 0 : _c.wrapper) || "";
      vProps.ui.wrapper += [
        (_e = (_d = node.props) == null ? void 0 : _d.ui) == null ? void 0 : _e.wrapper,
        ui.value.background,
        ui.value.transition
      ].filter(Boolean).join(" ");
      vProps.ui.meter = ((_g = (_f = node.props) == null ? void 0 : _f.ui) == null ? void 0 : _g.meter) || {};
      vProps.ui.meter.background = `bg-${node.props.color}-500 dark:bg-${node.props.color}-400`;
      vProps.ui.meter.rounded = "rounded-none";
      vProps.ui.meter.bar = ((_j = (_i = (_h = node.props) == null ? void 0 : _h.ui) == null ? void 0 : _i.meter) == null ? void 0 : _j.bar) || {};
      if (index === 0) vProps.ui.meter.rounded = `${rounded.value.left} rounded-e-none`;
      if (index === children.value.length - 1) vProps.ui.meter.rounded = `${rounded.value.right} rounded-s-none`;
      labels.value[index] = node.props.label;
      const clone = cloneVNode(node, vProps);
      (_k = clone.children) == null ? true : delete _k.label;
      (_l = clone.props) == null ? true : delete _l.indicator;
      (_m = clone.props) == null ? true : delete _m.label;
      return clone;
    }));
    const baseClass = computed(() => {
      return twJoin(ui.value.base, ui.value.background, ui.value.rounded, ui.value.shadow, uiMeter.value.meter.size[props.size]);
    });
    const indicatorContainerClass = computed(() => {
      return twJoin(uiMeter.value.indicator.container);
    });
    const indicatorClass = computed(() => {
      return twJoin(uiMeter.value.indicator.text, uiMeter.value.indicator.size[props.size]);
    });
    const vNodeChildren = computed(() => {
      const vNodeSlots = [
        void 0,
        h("div", { class: baseClass.value }, clones.value),
        void 0
      ];
      if (props.indicator) vNodeSlots[0] = h("div", { class: indicatorContainerClass.value }, [h("div", {
        class: indicatorClass.value,
        style: { width: `${percent.value}%` }
      }, Math.round(percent.value) + "%")]);
      else if (slots.indicator) vNodeSlots[0] = slots.indicator({ percent: percent.value });
      vNodeSlots[2] = h("ol", { class: ui.value.list }, labels.value.map((label, key) => {
        var _a, _b;
        return h("li", { class: computed(() => {
          var _a2, _b2, _c, _d;
          return twJoin(uiMeter.value.label.base, uiMeter.value.label.text, (_d = uiMeter.value.color[(_a2 = clones.value[key]) == null ? void 0 : _a2.props.color]) != null ? _d : uiMeter.value.label.color.replaceAll("{color}", (_c = (_b2 = clones.value[key]) == null ? void 0 : _b2.props.color) != null ? _c : uiMeter.value.default.color), uiMeter.value.label.size[props.size]);
        }).value }, [h(Icon_default, { name: (_b = (_a = clones.value[key]) == null ? void 0 : _a.props.icon) != null ? _b : props.icon }), `${label} (${Math.round(percents.value[key])}%)`]);
      }));
      return vNodeSlots;
    });
    return () => h("div", {
      class: ui.value.wrapper,
      ...attrs.value
    }, vNodeChildren.value);
  }
});

export { MeterGroup_default as default };
//# sourceMappingURL=MeterGroup-BV6LwsS_.mjs.map
