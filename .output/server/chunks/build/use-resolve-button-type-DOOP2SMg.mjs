import { ref, onMounted, watchEffect } from 'vue';
import { o as o$1 } from './keyboard-Duq8EHr3.mjs';

function r(t, e) {
  if (t) return t;
  let n = e != null ? e : "button";
  if (typeof n == "string" && n.toLowerCase() === "button") return "button";
}
function s(t, e) {
  let n = ref(r(t.value.type, t.value.as));
  return onMounted(() => {
    n.value = r(t.value.type, t.value.as);
  }), watchEffect(() => {
    var u;
    n.value || o$1(e) && o$1(e) instanceof HTMLButtonElement && !((u = o$1(e)) != null && u.hasAttribute("type")) && (n.value = "button");
  }), n;
}

export { s };
//# sourceMappingURL=use-resolve-button-type-DOOP2SMg.mjs.map
