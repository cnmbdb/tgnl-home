import { provide, getCurrentInstance, ref, inject, computed } from 'vue';

function useProvideButtonGroup(buttonGroupProps) {
  provide(`group-${getCurrentInstance().uid}`, ref({
    children: [],
    register(child) {
      this.children.push(child);
    },
    unregister(child) {
      const index = this.children.indexOf(child);
      if (index > -1) this.children.splice(index, 1);
    },
    ...buttonGroupProps
  }));
}
function useInjectButtonGroup({ ui, props }) {
  const instance = getCurrentInstance();
  provide("ButtonGroupContextConsumer", true);
  if (inject("ButtonGroupContextConsumer", false)) return {
    size: computed(() => props.size),
    rounded: computed(() => ui.value.rounded)
  };
  let parent = instance.parent;
  let groupContext;
  while (parent && !groupContext) {
    if (parent.type.name === "ButtonGroup") {
      groupContext = inject(`group-${parent.uid}`);
      break;
    }
    parent = parent.parent;
  }
  const positionInGroup = computed(() => groupContext == null ? void 0 : groupContext.value.children.indexOf(instance));
  return {
    size: computed(() => {
      var _a;
      if (!(groupContext == null ? void 0 : groupContext.value)) return props.size;
      return (_a = groupContext == null ? void 0 : groupContext.value.size) != null ? _a : ui.value.default.size;
    }),
    rounded: computed(() => {
      if (!groupContext || positionInGroup.value === -1) return ui.value.rounded;
      if (groupContext.value.children.length === 1) return groupContext.value.ui.rounded;
      if (positionInGroup.value === 0) return groupContext.value.rounded.start;
      if (positionInGroup.value === groupContext.value.children.length - 1) return groupContext.value.rounded.end;
      return "rounded-none";
    })
  };
}

export { useInjectButtonGroup as a, useProvideButtonGroup as u };
//# sourceMappingURL=useButtonGroup-1gNuWR3y.mjs.map
