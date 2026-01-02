import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig, t as getSlotsChildren } from "../server.mjs";
import "./components-D5RLOpR9.js";
import "./_plugin-vue_export-helper-COMwgem8.js";
import "./Icon-CrxV3u_Z.js";
import { H as avatar_default, V as avatarGroup_default, W as useUI } from "./ui-G7Oicn0a.js";
import { t as Avatar_default } from "./Avatar-CBx6NXk5.js";
import { cloneVNode, computed, defineComponent, h, toRef } from "vue";
import { twJoin } from "tailwind-merge";
var avatarConfig = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.avatar, avatar_default);
var avatarGroupConfig = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.avatarGroup, avatarGroup_default);
var AvatarGroup_default = defineComponent({
	inheritAttrs: false,
	props: {
		size: {
			type: String,
			default: null,
			validator(value) {
				return Object.keys(avatarConfig.size).includes(value);
			}
		},
		max: {
			type: Number,
			default: null
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
		const { ui, attrs } = useUI("avatarGroup", toRef(props, "ui"), avatarGroupConfig, toRef(props, "class"));
		const children = computed(() => getSlotsChildren(slots));
		const max = computed(() => typeof props.max === "string" ? Number.parseInt(props.max, 10) : props.max);
		const clones = computed(() => children.value.map((node, index) => {
			const vProps = {};
			if (!props.max || max.value && index < max.value) {
				if (props.size) vProps.size = props.size;
				vProps.class = node.props.class || "";
				vProps.class = twMerge(twJoin(vProps.class, ui.value.ring, ui.value.margin), vProps.class);
				return cloneVNode(node, vProps);
			}
			if (max.value !== void 0 && index === max.value) return h(Avatar_default, {
				size: props.size || avatarConfig.default.size,
				text: `+${children.value.length - max.value}`,
				class: twJoin(ui.value.ring, ui.value.margin)
			});
			return null;
		}).filter(Boolean).reverse());
		return () => h("div", {
			class: ui.value.wrapper,
			...attrs.value
		}, clones.value);
	}
});
export { AvatarGroup_default as default };

//# sourceMappingURL=AvatarGroup-B678Y04S.js.map