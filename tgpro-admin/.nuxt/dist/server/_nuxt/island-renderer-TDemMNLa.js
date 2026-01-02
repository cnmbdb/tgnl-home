import { x as createError, y as injectHead } from "../server.mjs";
import { createVNode, defineAsyncComponent, defineComponent, onErrorCaptured } from "vue";
const islandComponents = {};
var island_renderer_default = defineComponent({
	name: "IslandRenderer",
	props: { context: {
		type: Object,
		required: true
	} },
	setup(props) {
		injectHead().entries.clear();
		const component = islandComponents[props.context.name];
		if (!component) throw createError({
			statusCode: 404,
			statusMessage: `Island component not found: ${props.context.name}`
		});
		onErrorCaptured((e) => {
			console.log(e);
		});
		return () => createVNode(component || "span", {
			...props.context.props,
			"data-island-uid": ""
		});
	}
});
export { island_renderer_default as default };

//# sourceMappingURL=island-renderer-TDemMNLa.js.map