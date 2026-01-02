import { i } from './focus-management-DFaZHIRF.mjs';
import { ref, watchEffect } from 'vue';

function r(e) {
  return [e.screenX, e.screenY];
}
function u$1() {
  let e = ref([-1, -1]);
  return {
    wasMoved(n) {
      let t = r(n);
      return e.value[0] === t[0] && e.value[1] === t[1] ? false : (e.value = t, true);
    },
    update(n) {
      e.value = r(n);
    }
  };
}
function i$1({ container: e, accept: t, walk: d, enabled: o }) {
  watchEffect(() => {
    let r$1 = e.value;
    if (!r$1 || o !== void 0 && !o.value) return;
    let l = i(e);
    if (!l) return;
    let c$1 = Object.assign((f$1) => t(f$1), { acceptNode: t }), n = l.createTreeWalker(r$1, NodeFilter.SHOW_ELEMENT, c$1, false);
    for (; n.nextNode(); ) d(n.currentNode);
  });
}
function u(l) {
  throw new Error("Unexpected object: " + l);
}
var c = ((i$2) => (i$2[i$2.First = 0] = "First", i$2[i$2.Previous = 1] = "Previous", i$2[i$2.Next = 2] = "Next", i$2[i$2.Last = 3] = "Last", i$2[i$2.Specific = 4] = "Specific", i$2[i$2.Nothing = 5] = "Nothing", i$2))(c || {});
function f(l, n) {
  let t = n.resolveItems();
  if (t.length <= 0) return null;
  let r$1 = n.resolveActiveIndex(), s = r$1 != null ? r$1 : -1;
  switch (l.focus) {
    case 0:
      for (let e = 0; e < t.length; ++e) if (!n.resolveDisabled(t[e], e, t)) return e;
      return r$1;
    case 1:
      s === -1 && (s = t.length);
      for (let e = s - 1; e >= 0; --e) if (!n.resolveDisabled(t[e], e, t)) return e;
      return r$1;
    case 2:
      for (let e = s + 1; e < t.length; ++e) if (!n.resolveDisabled(t[e], e, t)) return e;
      return r$1;
    case 3:
      for (let e = t.length - 1; e >= 0; --e) if (!n.resolveDisabled(t[e], e, t)) return e;
      return r$1;
    case 4:
      for (let e = 0; e < t.length; ++e) if (n.resolveId(t[e], e, t) === l.id) return e;
      return r$1;
    case 5:
      return null;
    default:
      u(l);
  }
}

export { c, f, i$1 as i, u$1 as u };
//# sourceMappingURL=calculate-active-index-B5ynhl2N.mjs.map
