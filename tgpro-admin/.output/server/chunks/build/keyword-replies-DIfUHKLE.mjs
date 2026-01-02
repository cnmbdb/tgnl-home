import Icon_default from './Icon-BQxbVddL.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import Badge_default from './Badge-Bb9IcqQP.mjs';
import Input_default from './Input-CbhZIhGI.mjs';
import Select_default from './Select-Cx-ISQOC.mjs';
import Textarea_default from './Textarea-ClW9ULmm.mjs';
import Modal_default from './Modal-BbhoxMMu.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
import './keyboard-CvjRf4Wb.mjs';
import './transition-CG5tIsRm.mjs';
import './micro-task-CYdHJ3PN.mjs';
import './active-element-history-DJ1NL7os.mjs';
import './focus-management-DFaZHIRF.mjs';
import './use-outside-click-B4rja7ys.mjs';
import './hidden-Bsn3DsxF.mjs';
import './open-closed-Dsm1EOia.mjs';
import './portal-BLTG7ywv.mjs';
import './description-Y4p4EFv6.mjs';

var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("commands");
    const hasUnsavedChanges = ref(false);
    const showAddModuleModal = ref(false);
    const newModuleType = ref("text");
    const pendingModuleKey = ref("");
    const pendingModuleCategory = ref("");
    const tabs = [{
      key: "commands",
      label: "\u547D\u4EE4\u56DE\u590D (5\u4E2A)"
    }, {
      key: "buttons",
      label: "\u6309\u94AE\u56DE\u590D (4\u4E2A)"
    }];
    const moduleTypeOptions = [
      {
        label: "\u6587\u6848\u56DE\u590D",
        value: "text"
      },
      {
        label: "\u56FE\u7247\u56DE\u590D",
        value: "image"
      },
      {
        label: "\u6587\u6848+\u5185\u8054\u6309\u94AE",
        value: "text_buttons"
      },
      {
        label: "\u56FE\u7247+\u6587\u6848+\u5185\u8054\u6309\u94AE",
        value: "image_text_buttons"
      }
    ];
    const keywordReplies = ref({
      commands: {},
      buttons: {}
    });
    let autoSaveTimer = null;
    const loadKeywordReplies = async () => {
      try {
        const response = await $fetch("/api/keyword-replies");
        if (response.success) keywordReplies.value = response.data;
      } catch (error) {
        console.error("\u52A0\u8F7D\u5173\u952E\u8BCD\u56DE\u590D\u5931\u8D25:", error);
      }
    };
    const saveKeywordReplies = async () => {
      try {
        await $fetch("/api/keyword-replies", {
          method: "POST",
          body: { keywordReplies: keywordReplies.value }
        });
        hasUnsavedChanges.value = false;
      } catch (error) {
        console.error("\u4FDD\u5B58\u5173\u952E\u8BCD\u56DE\u590D\u5931\u8D25:", error);
      }
    };
    const markAsChanged = () => {
      hasUnsavedChanges.value = true;
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      autoSaveTimer = setTimeout(() => {
        saveKeywordReplies();
      }, 3e3);
    };
    const getModuleTypeLabel = (type) => {
      return {
        text: "\u6587\u6848",
        image: "\u56FE\u7247",
        text_buttons: "\u6587\u6848+\u6309\u94AE",
        image_text_buttons: "\u56FE\u7247+\u6587\u6848+\u6309\u94AE"
      }[type] || type;
    };
    const getModuleTypeColor = (type) => {
      return {
        text: "blue",
        image: "green",
        text_buttons: "purple",
        image_text_buttons: "orange"
      }[type] || "gray";
    };
    const addModule = (key, category) => {
      pendingModuleKey.value = key;
      pendingModuleCategory.value = category;
      showAddModuleModal.value = true;
    };
    const confirmAddModule = () => {
      const category = pendingModuleCategory.value;
      const key = pendingModuleKey.value;
      if (!keywordReplies.value[category][key]) keywordReplies.value[category][key] = [];
      const newModule = {
        id: `module_${Date.now()}`,
        type: newModuleType.value,
        content: "",
        order: keywordReplies.value[category][key].length + 1
      };
      if (newModuleType.value.includes("image")) newModule.image = "";
      if (newModuleType.value.includes("buttons")) newModule.buttons = [[{
        text: "",
        callback_data: ""
      }]];
      keywordReplies.value[category][key].push(newModule);
      markAsChanged();
      showAddModuleModal.value = false;
    };
    const removeModule = (key, category, index) => {
      const categoryData = keywordReplies.value[category];
      categoryData[key].splice(index, 1);
      categoryData[key].forEach((module, i) => {
        module.order = i + 1;
      });
      markAsChanged();
    };
    const moveModule = (key, category, index, direction) => {
      const modules = keywordReplies.value[category][key];
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < modules.length) {
        [modules[index], modules[newIndex]] = [modules[newIndex], modules[index]];
        modules.forEach((module, i) => {
          module.order = i + 1;
        });
        markAsChanged();
      }
    };
    const updateModuleField = (key, category, index, field, value) => {
      const module = keywordReplies.value[category][key][index];
      module[field] = value;
      markAsChanged();
    };
    const updateButtonText = (key, category, moduleIndex, rowIndex, buttonIndex, text) => {
      const module = keywordReplies.value[category][key][moduleIndex];
      if (module.buttons && module.buttons[rowIndex] && module.buttons[rowIndex][buttonIndex]) {
        module.buttons[rowIndex][buttonIndex].text = text;
        markAsChanged();
      }
    };
    const updateButtonAction = (key, category, moduleIndex, rowIndex, buttonIndex, action) => {
      const module = keywordReplies.value[category][key][moduleIndex];
      if (module.buttons && module.buttons[rowIndex] && module.buttons[rowIndex][buttonIndex]) {
        const button = module.buttons[rowIndex][buttonIndex];
        if (action.startsWith("http")) {
          button.url = action;
          delete button.callback_data;
        } else {
          button.callback_data = action;
          delete button.url;
        }
        markAsChanged();
      }
    };
    const addButtonRow = (key, category, moduleIndex) => {
      const module = keywordReplies.value[category][key][moduleIndex];
      if (module.buttons) {
        module.buttons.push([{
          text: "",
          callback_data: ""
        }]);
        markAsChanged();
      }
    };
    const removeButtonRow = (key, category, moduleIndex, rowIndex) => {
      const module = keywordReplies.value[category][key][moduleIndex];
      if (module.buttons) {
        module.buttons.splice(rowIndex, 1);
        markAsChanged();
      }
    };
    const addButtonToLastRow = (key, category, moduleIndex) => {
      const module = keywordReplies.value[category][key][moduleIndex];
      if (module.buttons && module.buttons.length > 0) {
        const lastRowIndex = module.buttons.length - 1;
        const lastRow = module.buttons[lastRowIndex];
        if (lastRow.length < 2) {
          lastRow.push({
            text: "",
            callback_data: ""
          });
          markAsChanged();
        }
      }
    };
    const addButtonToRow = (key, category, moduleIndex, rowIndex) => {
      const module = keywordReplies.value[category][key][moduleIndex];
      if (module.buttons && module.buttons[rowIndex] && module.buttons[rowIndex].length < 2) {
        module.buttons[rowIndex].push({
          text: "",
          callback_data: ""
        });
        markAsChanged();
      }
    };
    const removeButton = (key, category, moduleIndex, rowIndex, buttonIndex) => {
      const module = keywordReplies.value[category][key][moduleIndex];
      if (module.buttons && module.buttons[rowIndex] && module.buttons[rowIndex].length > 1) {
        module.buttons[rowIndex].splice(buttonIndex, 1);
        markAsChanged();
      }
    };
    const moveButtonRow = (key, category, moduleIndex, rowIndex, direction) => {
      const module = keywordReplies.value[category][key][moduleIndex];
      if (module.buttons) {
        const newIndex = rowIndex + direction;
        if (newIndex >= 0 && newIndex < module.buttons.length) {
          [module.buttons[rowIndex], module.buttons[newIndex]] = [module.buttons[newIndex], module.buttons[rowIndex]];
          markAsChanged();
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = Icon_default;
      const _component_UButton = Button_default;
      const _component_UBadge = Badge_default;
      const _component_UInput = Input_default;
      const _component_UTextarea = Textarea_default;
      const _component_UModal = Modal_default;
      const _component_USelect = Select_default;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-white flex items-center gap-3"><div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chat-bubble-left-right",
        class: "w-5 h-5 text-[#00dc82]"
      }, null, _parent));
      _push(`</div> \u5173\u952E\u8BCD\u56DE\u590D\u7BA1\u7406 </h1><p class="mt-1 text-sm text-[#9ca3af]">\u7BA1\u7406\u673A\u5668\u4EBA\u7684\u5173\u952E\u8BCD\u56DE\u590D\u6A21\u5757\uFF0C\u652F\u6301\u6587\u6848\u3001\u56FE\u7247\u3001\u5185\u8054\u6309\u94AE\u7EC4\u5408</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        size: "sm",
        onClick: loadKeywordReplies
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4 mr-2"
            }, null, _parent$1, _scopeId));
            _push$1(` \u5237\u65B0 `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-arrow-path",
            class: "w-4 h-4 mr-2"
          }), createTextVNode(" \u5237\u65B0 ")];
        }),
        _: 1
      }, _parent));
      if (unref(hasUnsavedChanges)) _push(ssrRenderComponent(_component_UBadge, {
        color: "orange",
        variant: "subtle",
        class: "px-3 py-1"
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-clock",
              class: "w-3 h-3 mr-1"
            }, null, _parent$1, _scopeId));
            _push$1(` \u81EA\u52A8\u4FDD\u5B58\u4E2D... `);
          } else return [createVNode(_component_UIcon, {
            name: "i-heroicons-clock",
            class: "w-3 h-3 mr-1"
          }), createTextVNode(" \u81EA\u52A8\u4FDD\u5B58\u4E2D... ")];
        }),
        _: 1
      }, _parent));
      else _push(ssrRenderComponent(_component_UBadge, {
        color: "green",
        variant: "subtle",
        class: "px-3 py-1"
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
      _push(`</div></div><div class="flex gap-4 border-b border-[#2a2a2b]"><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass(["px-4 py-2 text-sm font-medium border-b-2 transition-colors", unref(activeTab) === tab.key ? "text-[#00dc82] border-[#00dc82]" : "text-[#9ca3af] border-transparent hover:text-white hover:border-[#4a4a4b]"])}">${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(activeTab) === "commands") {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(keywordReplies).commands, (command, commandKey) => {
          _push(`<div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-6"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-white flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-command-line",
            class: "w-5 h-5 text-[#00dc82]"
          }, null, _parent));
          _push(` ${ssrInterpolate(commandKey)} \u547D\u4EE4\u56DE\u590D </h3>`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "outline",
            size: "xs",
            onClick: ($event) => addModule(commandKey, "commands")
          }, {
            default: withCtx((_, _push$1, _parent$1, _scopeId) => {
              if (_push$1) {
                _push$1(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-plus",
                  class: "w-4 h-4 mr-1"
                }, null, _parent$1, _scopeId));
                _push$1(` \u6DFB\u52A0\u6A21\u5757 `);
              } else return [createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-1"
              }), createTextVNode(" \u6DFB\u52A0\u6A21\u5757 ")];
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="space-y-4"><!--[-->`);
          ssrRenderList(command, (module, moduleIndex) => {
            _push(`<div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between mb-3"><div class="flex items-center gap-2">`);
            _push(ssrRenderComponent(_component_UBadge, {
              color: getModuleTypeColor(module.type),
              variant: "subtle",
              size: "sm"
            }, {
              default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                if (_push$1) _push$1(`${ssrInterpolate(getModuleTypeLabel(module.type))}`);
                else return [createTextVNode(toDisplayString(getModuleTypeLabel(module.type)), 1)];
              }),
              _: 2
            }, _parent));
            _push(`<span class="text-xs text-[#9ca3af]">\u987A\u5E8F: ${ssrInterpolate(module.order)}</span></div><div class="flex gap-1">`);
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "xs",
              onClick: ($event) => moveModule(commandKey, "commands", moduleIndex, -1),
              disabled: moduleIndex === 0
            }, {
              default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-up",
                  class: "w-3 h-3"
                }, null, _parent$1, _scopeId));
                else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-up",
                  class: "w-3 h-3"
                })];
              }),
              _: 2
            }, _parent));
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "xs",
              onClick: ($event) => moveModule(commandKey, "commands", moduleIndex, 1),
              disabled: moduleIndex === command.length - 1
            }, {
              default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-down",
                  class: "w-3 h-3"
                }, null, _parent$1, _scopeId));
                else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-down",
                  class: "w-3 h-3"
                })];
              }),
              _: 2
            }, _parent));
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "xs",
              color: "red",
              onClick: ($event) => removeModule(commandKey, "commands", moduleIndex)
            }, {
              default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-3 h-3"
                }, null, _parent$1, _scopeId));
                else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-3 h-3"
                })];
              }),
              _: 2
            }, _parent));
            _push(`</div></div><div class="space-y-3">`);
            if (module.type.includes("image")) {
              _push(`<div><label class="block text-sm font-medium text-white mb-2">\u56FE\u7247\u6587\u4EF6\u540D</label>`);
              _push(ssrRenderComponent(_component_UInput, {
                "model-value": module.image,
                "onUpdate:modelValue": ($event) => updateModuleField(commandKey, "commands", moduleIndex, "image", $event),
                placeholder: "\u4F8B\u5982: photo.jpg"
              }, null, _parent));
              _push(`</div>`);
            } else _push(`<!---->`);
            if (module.type.includes("text") || module.type === "text") {
              _push(`<div><label class="block text-sm font-medium text-white mb-2">\u6587\u6848\u5185\u5BB9</label>`);
              _push(ssrRenderComponent(_component_UTextarea, {
                "model-value": module.content,
                "onUpdate:modelValue": ($event) => updateModuleField(commandKey, "commands", moduleIndex, "content", $event),
                placeholder: "\u8F93\u5165\u56DE\u590D\u6587\u6848...",
                rows: 3
              }, null, _parent));
              _push(`</div>`);
            } else _push(`<!---->`);
            if (module.type.includes("buttons")) {
              _push(`<div><label class="block text-sm font-medium text-white mb-2">\u5185\u8054\u6309\u94AE\u914D\u7F6E</label><div class="mb-4 p-3 bg-[#2a2a2b] rounded-lg border border-[#3a3a3b]"><div class="text-xs text-gray-400 mb-2">\u6309\u94AE\u9884\u89C8\uFF08\u5B9E\u9645\u673A\u5668\u4EBA\u5E03\u5C40\uFF09</div><div class="space-y-2"><!--[-->`);
              ssrRenderList(module.buttons || [], (row, rowIndex) => {
                _push(`<div class="flex gap-2"><!--[-->`);
                ssrRenderList(row, (button, buttonIndex) => {
                  _push(`<button class="${ssrRenderClass([row.length === 1 ? "flex-1" : "flex-1", "px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded cursor-pointer transition-colors"])}">${ssrInterpolate(button.text || "\u672A\u8BBE\u7F6E")}</button>`);
                });
                _push(`<!--]--></div>`);
              });
              _push(`<!--]--></div></div><div class="space-y-3"><!--[-->`);
              ssrRenderList(module.buttons || [], (row, rowIndex) => {
                _push(`<div class="border border-[#3a3a3b] rounded-lg p-3"><div class="flex items-center justify-between mb-2"><span class="text-sm text-gray-400">\u7B2C ${ssrInterpolate(rowIndex + 1)} \u884C\u6309\u94AE</span><div class="flex gap-1">`);
                if (rowIndex > 0) _push(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  onClick: ($event) => moveButtonRow(commandKey, "commands", moduleIndex, rowIndex, -1)
                }, {
                  default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                    if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-up",
                      class: "w-3 h-3"
                    }, null, _parent$1, _scopeId));
                    else return [createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-up",
                      class: "w-3 h-3"
                    })];
                  }),
                  _: 2
                }, _parent));
                else _push(`<!---->`);
                if (module.buttons && rowIndex < module.buttons.length - 1) _push(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  onClick: ($event) => moveButtonRow(commandKey, "commands", moduleIndex, rowIndex, 1)
                }, {
                  default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                    if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-down",
                      class: "w-3 h-3"
                    }, null, _parent$1, _scopeId));
                    else return [createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-down",
                      class: "w-3 h-3"
                    })];
                  }),
                  _: 2
                }, _parent));
                else _push(`<!---->`);
                if (row.length < 2) _push(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  color: "green",
                  onClick: ($event) => addButtonToRow(commandKey, "commands", moduleIndex, rowIndex)
                }, {
                  default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                    if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-3 h-3"
                    }, null, _parent$1, _scopeId));
                    else return [createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-3 h-3"
                    })];
                  }),
                  _: 2
                }, _parent));
                else _push(`<!---->`);
                _push(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  color: "red",
                  onClick: ($event) => removeButtonRow(commandKey, "commands", moduleIndex, rowIndex)
                }, {
                  default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                    if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-3 h-3"
                    }, null, _parent$1, _scopeId));
                    else return [createVNode(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-3 h-3"
                    })];
                  }),
                  _: 2
                }, _parent));
                _push(`</div></div><div class="space-y-2"><!--[-->`);
                ssrRenderList(row, (button, buttonIndex) => {
                  _push(`<div class="flex gap-2 items-center"><div class="flex-1 grid grid-cols-2 gap-2">`);
                  _push(ssrRenderComponent(_component_UInput, {
                    "model-value": button.text,
                    "onUpdate:modelValue": ($event) => updateButtonText(commandKey, "commands", moduleIndex, rowIndex, buttonIndex, $event),
                    placeholder: "\u6309\u94AE\u6587\u5B57",
                    size: "sm"
                  }, null, _parent));
                  _push(ssrRenderComponent(_component_UInput, {
                    "model-value": button.callback_data || button.url,
                    "onUpdate:modelValue": ($event) => updateButtonAction(commandKey, "commands", moduleIndex, rowIndex, buttonIndex, $event),
                    placeholder: "callback_data \u6216 url",
                    size: "sm"
                  }, null, _parent));
                  _push(`</div>`);
                  if (row.length > 1) _push(ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    size: "xs",
                    color: "red",
                    onClick: ($event) => removeButton(commandKey, "commands", moduleIndex, rowIndex, buttonIndex)
                  }, {
                    default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                      if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "w-3 h-3"
                      }, null, _parent$1, _scopeId));
                      else return [createVNode(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "w-3 h-3"
                      })];
                    }),
                    _: 2
                  }, _parent));
                  else _push(`<!---->`);
                  _push(`</div>`);
                });
                _push(`<!--]--></div></div>`);
              });
              _push(`<!--]-->`);
              _push(ssrRenderComponent(_component_UButton, {
                variant: "outline",
                size: "xs",
                onClick: ($event) => addButtonRow(commandKey, "commands", moduleIndex)
              }, {
                default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                  if (_push$1) {
                    _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-3 h-3 mr-1"
                    }, null, _parent$1, _scopeId));
                    _push$1(` \u6DFB\u52A0\u6309\u94AE\u884C `);
                  } else return [createVNode(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-3 h-3 mr-1"
                  }), createTextVNode(" \u6DFB\u52A0\u6309\u94AE\u884C ")];
                }),
                _: 2
              }, _parent));
              _push(`</div></div>`);
            } else _push(`<!---->`);
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else _push(`<!---->`);
      if (unref(activeTab) === "buttons") {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(keywordReplies).buttons, (button, buttonKey) => {
          _push(`<div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-6"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-white flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-cursor-arrow-rays",
            class: "w-5 h-5 text-[#00dc82]"
          }, null, _parent));
          _push(` &quot;${ssrInterpolate(buttonKey)}&quot; \u6309\u94AE\u56DE\u590D </h3>`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "outline",
            size: "xs",
            onClick: ($event) => addModule(buttonKey, "buttons")
          }, {
            default: withCtx((_, _push$1, _parent$1, _scopeId) => {
              if (_push$1) {
                _push$1(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-plus",
                  class: "w-4 h-4 mr-1"
                }, null, _parent$1, _scopeId));
                _push$1(` \u6DFB\u52A0\u6A21\u5757 `);
              } else return [createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-1"
              }), createTextVNode(" \u6DFB\u52A0\u6A21\u5757 ")];
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="space-y-4"><!--[-->`);
          ssrRenderList(button, (module, moduleIndex) => {
            _push(`<div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-4"><div class="flex items-center justify-between mb-3"><div class="flex items-center gap-2">`);
            _push(ssrRenderComponent(_component_UBadge, {
              color: getModuleTypeColor(module.type),
              variant: "subtle",
              size: "sm"
            }, {
              default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                if (_push$1) _push$1(`${ssrInterpolate(getModuleTypeLabel(module.type))}`);
                else return [createTextVNode(toDisplayString(getModuleTypeLabel(module.type)), 1)];
              }),
              _: 2
            }, _parent));
            _push(`<span class="text-xs text-[#9ca3af]">\u987A\u5E8F: ${ssrInterpolate(module.order)}</span></div><div class="flex gap-1">`);
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "xs",
              onClick: ($event) => moveModule(buttonKey, "buttons", moduleIndex, -1),
              disabled: moduleIndex === 0
            }, {
              default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-up",
                  class: "w-3 h-3"
                }, null, _parent$1, _scopeId));
                else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-up",
                  class: "w-3 h-3"
                })];
              }),
              _: 2
            }, _parent));
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "xs",
              onClick: ($event) => moveModule(buttonKey, "buttons", moduleIndex, 1),
              disabled: moduleIndex === button.length - 1
            }, {
              default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-down",
                  class: "w-3 h-3"
                }, null, _parent$1, _scopeId));
                else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-down",
                  class: "w-3 h-3"
                })];
              }),
              _: 2
            }, _parent));
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              size: "xs",
              color: "red",
              onClick: ($event) => removeModule(buttonKey, "buttons", moduleIndex)
            }, {
              default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-3 h-3"
                }, null, _parent$1, _scopeId));
                else return [createVNode(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-3 h-3"
                })];
              }),
              _: 2
            }, _parent));
            _push(`</div></div><div class="space-y-3">`);
            if (module.type.includes("image")) {
              _push(`<div><label class="block text-sm font-medium text-white mb-2">\u56FE\u7247\u6587\u4EF6\u540D</label>`);
              _push(ssrRenderComponent(_component_UInput, {
                "model-value": module.image,
                "onUpdate:modelValue": ($event) => updateModuleField(buttonKey, "buttons", moduleIndex, "image", $event),
                placeholder: "\u4F8B\u5982: photo.jpg"
              }, null, _parent));
              _push(`</div>`);
            } else _push(`<!---->`);
            if (module.type.includes("text") || module.type === "text") {
              _push(`<div><label class="block text-sm font-medium text-white mb-2">\u6587\u6848\u5185\u5BB9</label>`);
              _push(ssrRenderComponent(_component_UTextarea, {
                "model-value": module.content,
                "onUpdate:modelValue": ($event) => updateModuleField(buttonKey, "buttons", moduleIndex, "content", $event),
                placeholder: "\u8F93\u5165\u56DE\u590D\u6587\u6848...",
                rows: 3
              }, null, _parent));
              _push(`</div>`);
            } else _push(`<!---->`);
            if (module.type.includes("buttons")) {
              _push(`<div><label class="block text-sm font-medium text-white mb-3">\u5185\u8054\u6309\u94AE\u914D\u7F6E</label><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4 mb-4"><div class="text-xs text-[#9ca3af] mb-2">\u6309\u94AE\u9884\u89C8\uFF08\u771F\u5B9E\u5E03\u5C40\uFF09</div><div class="space-y-2"><!--[-->`);
              ssrRenderList(module.buttons, (row, rowIndex) => {
                _push(`<div class="flex gap-2"><!--[-->`);
                ssrRenderList(row, (button$1, buttonIndex) => {
                  _push(`<div class="flex-1 bg-[#2a2a2b] hover:bg-[#3a3a3b] border border-[#4a4a4b] rounded-lg px-3 py-2 text-center text-sm text-white cursor-pointer transition-colors">${ssrInterpolate(button$1.text || "\u672A\u8BBE\u7F6E")}</div>`);
                });
                _push(`<!--]--></div>`);
              });
              _push(`<!--]--></div><div class="flex gap-2 mt-3">`);
              _push(ssrRenderComponent(_component_UButton, {
                variant: "outline",
                size: "xs",
                onClick: ($event) => addButtonRow(buttonKey, "buttons", moduleIndex)
              }, {
                default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                  if (_push$1) {
                    _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-3 h-3 mr-1"
                    }, null, _parent$1, _scopeId));
                    _push$1(` \u6DFB\u52A0\u884C `);
                  } else return [createVNode(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-3 h-3 mr-1"
                  }), createTextVNode(" \u6DFB\u52A0\u884C ")];
                }),
                _: 2
              }, _parent));
              if (module.buttons.length > 0) _push(ssrRenderComponent(_component_UButton, {
                variant: "outline",
                size: "xs",
                onClick: ($event) => addButtonToLastRow(buttonKey, "buttons", moduleIndex)
              }, {
                default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                  if (_push$1) {
                    _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-3 h-3 mr-1"
                    }, null, _parent$1, _scopeId));
                    _push$1(` \u6DFB\u52A0\u5230\u6700\u540E\u4E00\u884C `);
                  } else return [createVNode(_component_UIcon, {
                    name: "i-heroicons-plus",
                    class: "w-3 h-3 mr-1"
                  }), createTextVNode(" \u6DFB\u52A0\u5230\u6700\u540E\u4E00\u884C ")];
                }),
                _: 2
              }, _parent));
              else _push(`<!---->`);
              _push(`</div></div><div class="space-y-3"><!--[-->`);
              ssrRenderList(module.buttons, (row, rowIndex) => {
                _push(`<div class="bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg p-3"><div class="flex items-center justify-between mb-2"><span class="text-xs font-medium text-[#9ca3af]">\u7B2C ${ssrInterpolate(rowIndex + 1)} \u884C (${ssrInterpolate(row.length)} \u4E2A\u6309\u94AE)</span><div class="flex gap-1">`);
                _push(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  onClick: ($event) => moveButtonRow(buttonKey, "buttons", moduleIndex, rowIndex, -1),
                  disabled: rowIndex === 0
                }, {
                  default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                    if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-up",
                      class: "w-3 h-3"
                    }, null, _parent$1, _scopeId));
                    else return [createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-up",
                      class: "w-3 h-3"
                    })];
                  }),
                  _: 2
                }, _parent));
                _push(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  onClick: ($event) => moveButtonRow(buttonKey, "buttons", moduleIndex, rowIndex, 1),
                  disabled: rowIndex === module.buttons.length - 1
                }, {
                  default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                    if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-down",
                      class: "w-3 h-3"
                    }, null, _parent$1, _scopeId));
                    else return [createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-down",
                      class: "w-3 h-3"
                    })];
                  }),
                  _: 2
                }, _parent));
                _push(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  color: "red",
                  onClick: ($event) => removeButtonRow(buttonKey, "buttons", moduleIndex, rowIndex)
                }, {
                  default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                    if (_push$1) _push$1(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-3 h-3"
                    }, null, _parent$1, _scopeId));
                    else return [createVNode(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-3 h-3"
                    })];
                  }),
                  _: 2
                }, _parent));
                _push(`</div></div><div class="${ssrRenderClass([row.length === 1 ? "grid-cols-1" : "grid-cols-2", "grid gap-2"])}"><!--[-->`);
                ssrRenderList(row, (button$1, buttonIndex) => {
                  _push(`<div class="space-y-2"><div class="text-xs text-[#9ca3af]">\u6309\u94AE ${ssrInterpolate(buttonIndex + 1)}</div>`);
                  _push(ssrRenderComponent(_component_UInput, {
                    "model-value": button$1.text,
                    "onUpdate:modelValue": ($event) => updateButtonText(buttonKey, "buttons", moduleIndex, rowIndex, buttonIndex, $event),
                    placeholder: "\u6309\u94AE\u6587\u5B57",
                    size: "sm"
                  }, null, _parent));
                  _push(ssrRenderComponent(_component_UInput, {
                    "model-value": button$1.callback_data || button$1.url,
                    "onUpdate:modelValue": ($event) => updateButtonAction(buttonKey, "buttons", moduleIndex, rowIndex, buttonIndex, $event),
                    placeholder: "callback_data \u6216 url",
                    size: "sm"
                  }, null, _parent));
                  if (row.length > 1) _push(ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    size: "xs",
                    color: "red",
                    onClick: ($event) => removeButton(buttonKey, "buttons", moduleIndex, rowIndex, buttonIndex)
                  }, {
                    default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                      if (_push$1) {
                        _push$1(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-trash",
                          class: "w-3 h-3 mr-1"
                        }, null, _parent$1, _scopeId));
                        _push$1(` \u5220\u9664\u6B64\u6309\u94AE `);
                      } else return [createVNode(_component_UIcon, {
                        name: "i-heroicons-trash",
                        class: "w-3 h-3 mr-1"
                      }), createTextVNode(" \u5220\u9664\u6B64\u6309\u94AE ")];
                    }),
                    _: 2
                  }, _parent));
                  else _push(`<!---->`);
                  _push(`</div>`);
                });
                _push(`<!--]--></div>`);
                if (row.length < 2) _push(ssrRenderComponent(_component_UButton, {
                  variant: "outline",
                  size: "xs",
                  onClick: ($event) => addButtonToRow(buttonKey, "buttons", moduleIndex, rowIndex),
                  class: "mt-2"
                }, {
                  default: withCtx((_, _push$1, _parent$1, _scopeId) => {
                    if (_push$1) {
                      _push$1(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-plus",
                        class: "w-3 h-3 mr-1"
                      }, null, _parent$1, _scopeId));
                      _push$1(` \u6DFB\u52A0\u6309\u94AE\u5230\u6B64\u884C `);
                    } else return [createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-3 h-3 mr-1"
                    }), createTextVNode(" \u6DFB\u52A0\u6309\u94AE\u5230\u6B64\u884C ")];
                  }),
                  _: 2
                }, _parent));
                else _push(`<!---->`);
                _push(`</div>`);
              });
              _push(`<!--]--></div></div>`);
            } else _push(`<!---->`);
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else _push(`<!---->`);
      _push(ssrRenderComponent(_component_UModal, {
        modelValue: unref(showAddModuleModal),
        "onUpdate:modelValue": ($event) => isRef(showAddModuleModal) ? showAddModuleModal.value = $event : null
      }, {
        default: withCtx((_, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            _push$1(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-white mb-4"${_scopeId}>\u6DFB\u52A0\u65B0\u6A21\u5757</h3><div class="space-y-4"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_USelect, {
              modelValue: unref(newModuleType),
              "onUpdate:modelValue": ($event) => isRef(newModuleType) ? newModuleType.value = $event : null,
              label: "\u6A21\u5757\u7C7B\u578B",
              options: moduleTypeOptions
            }, null, _parent$1, _scopeId));
            _push$1(`<div class="flex justify-end gap-2"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              onClick: ($event) => showAddModuleModal.value = false
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) _push$2(`\u53D6\u6D88`);
                else return [createTextVNode("\u53D6\u6D88")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(ssrRenderComponent(_component_UButton, {
              color: "primary",
              onClick: confirmAddModule
            }, {
              default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) _push$2(`\u6DFB\u52A0`);
                else return [createTextVNode("\u6DFB\u52A0")];
              }),
              _: 1
            }, _parent$1, _scopeId));
            _push$1(`</div></div></div>`);
          } else return [createVNode("div", { class: "p-6" }, [createVNode("h3", { class: "text-lg font-semibold text-white mb-4" }, "\u6DFB\u52A0\u65B0\u6A21\u5757"), createVNode("div", { class: "space-y-4" }, [createVNode(_component_USelect, {
            modelValue: unref(newModuleType),
            "onUpdate:modelValue": ($event) => isRef(newModuleType) ? newModuleType.value = $event : null,
            label: "\u6A21\u5757\u7C7B\u578B",
            options: moduleTypeOptions
          }, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
            variant: "outline",
            onClick: ($event) => showAddModuleModal.value = false
          }, {
            default: withCtx(() => [createTextVNode("\u53D6\u6D88")]),
            _: 1
          }, 8, ["onClick"]), createVNode(_component_UButton, {
            color: "primary",
            onClick: confirmAddModule
          }, {
            default: withCtx(() => [createTextVNode("\u6DFB\u52A0")]),
            _: 1
          })])])])];
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/keyword-replies/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var keyword_replies_default = index_vue_vue_type_script_setup_true_lang_default;

export { keyword_replies_default as default };
//# sourceMappingURL=keyword-replies-DIfUHKLE.mjs.map
