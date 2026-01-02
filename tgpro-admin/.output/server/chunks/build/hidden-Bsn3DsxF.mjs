import { A } from './keyboard-CvjRf4Wb.mjs';
import { defineComponent } from 'vue';

var u = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(u || {});
var f = defineComponent({
  name: "Hidden",
  props: {
    as: {
      type: [Object, String],
      default: "div"
    },
    features: {
      type: Number,
      default: 1
    }
  },
  setup(t, { slots: n, attrs: i }) {
    return () => {
      var r;
      let { features: e, ...d } = t;
      return A({
        ourProps: {
          "aria-hidden": (e & 2) === 2 ? true : (r = d["aria-hidden"]) != null ? r : void 0,
          hidden: (e & 4) === 4 ? true : void 0,
          style: {
            position: "fixed",
            top: 1,
            left: 1,
            width: 1,
            height: 0,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
            ...(e & 4) === 4 && (e & 2) !== 2 && { display: "none" }
          }
        },
        theirProps: d,
        slot: {},
        attrs: i,
        slots: n,
        name: "Hidden"
      });
    };
  }
});

export { f, u };
//# sourceMappingURL=hidden-Bsn3DsxF.mjs.map
