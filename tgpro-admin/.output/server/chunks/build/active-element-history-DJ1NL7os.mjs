import { t } from './micro-task-CYdHJ3PN.mjs';

function o() {
  let a = [], s = {
    addEventListener(e, t$3, r, i) {
      return e.addEventListener(t$3, r, i), s.add(() => e.removeEventListener(t$3, r, i));
    },
    requestAnimationFrame(...e) {
      let t$3 = requestAnimationFrame(...e);
      s.add(() => cancelAnimationFrame(t$3));
    },
    nextFrame(...e) {
      s.requestAnimationFrame(() => {
        s.requestAnimationFrame(...e);
      });
    },
    setTimeout(...e) {
      let t$3 = setTimeout(...e);
      s.add(() => clearTimeout(t$3));
    },
    microTask(...e) {
      let t$3 = { current: true };
      return t(() => {
        t$3.current && e[0]();
      }), s.add(() => {
        t$3.current = false;
      });
    },
    style(e, t$3, r) {
      let i = e.style.getPropertyValue(t$3);
      return Object.assign(e.style, { [t$3]: r }), this.add(() => {
        Object.assign(e.style, { [t$3]: i });
      });
    },
    group(e) {
      let t$3 = o();
      return e(t$3), this.add(() => t$3.dispose());
    },
    add(e) {
      return a.push(e), () => {
        let t$3 = a.indexOf(e);
        if (t$3 >= 0) for (let r of a.splice(t$3, 1)) r();
      };
    },
    dispose() {
      for (let e of a.splice(0)) e();
    }
  };
  return s;
}
var t$1 = [];

export { o, t$1 as t };
//# sourceMappingURL=active-element-history-DJ1NL7os.mjs.map
