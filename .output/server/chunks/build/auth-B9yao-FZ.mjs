import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useCookie } from './cookie-DPcGNCao.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'mysql2/promise';
import 'fs';
import 'path';
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
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import 'vue/server-renderer';

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

export { auth as default };
//# sourceMappingURL=auth-B9yao-FZ.mjs.map
