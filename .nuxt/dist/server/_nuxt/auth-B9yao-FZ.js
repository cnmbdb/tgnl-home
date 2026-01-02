import { d as defineNuxtRouteMiddleware, n as navigateTo } from "../server.mjs";
import { u as useCookie } from "./cookie-DPcGNCao.js";
import "vue";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "klona";
import "@vueuse/core";
import "tailwind-merge";
import "@iconify/vue";
import "vue/server-renderer";
import "cookie-es";
import "destr";
import "ohash";
const auth = defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = useCookie("isLoggedIn", {
    default: () => false
  });
  if (!isLoggedIn.value && to.path !== "/") {
    return navigateTo("/");
  }
  if (isLoggedIn.value && to.path === "/") {
    return navigateTo("/dashboard");
  }
});
export {
  auth as default
};
//# sourceMappingURL=auth-B9yao-FZ.js.map
