import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig, t as getSlotsChildren } from "../server.mjs";
import { R as buttonGroup_default, W as useUI, z as button_default } from "./ui-G7Oicn0a.js";
import { n as useProvideButtonGroup } from "./useButtonGroup-1gNuWR3y.js";
import { computed, defineComponent, h, toRef } from "vue";
import { twJoin } from "tailwind-merge";
var buttonConfig = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.button, button_default);
var buttonGroupConfig = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.buttonGroup, buttonGroup_default);
var ButtonGroup_default = defineComponent({
	name: "ButtonGroup",
	inheritAttrs: false,
	props: {
		size: {
			type: String,
			default: null,
			validator(value) {
				return Object.keys(buttonConfig.size).includes(value);
			}
		},
		orientation: {
			type: String,
			default: "horizontal",
			validator(value) {
				return ["horizontal", "vertical"].includes(value);
			}
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
		const { ui, attrs } = useUI("buttonGroup", toRef(props, "ui"), buttonGroupConfig);
		const children = computed(() => getSlotsChildren(slots));
		const wrapperClass = computed(() => {
			return twMerge(twJoin(ui.value.wrapper[props.orientation], ui.value.rounded, ui.value.shadow), props.class);
		});
		const rounded = computed(() => ui.value.orientation[ui.value.rounded][props.orientation]);
		useProvideButtonGroup({
			orientation: toRef(props, "orientation"),
			size: toRef(props, "size"),
			ui,
			rounded
		});
		return () => h("div", {
			class: wrapperClass.value,
			...attrs.value
		}, children.value);
	}
});
export { ButtonGroup_default as default };

//# sourceMappingURL=ButtonGroup-CEm0fqt9.js.map