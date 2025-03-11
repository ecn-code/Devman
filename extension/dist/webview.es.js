var Tn = Array.isArray, Wt = Array.from, te = Object.defineProperty, an = Object.getOwnPropertyDescriptor, xn = Object.getOwnPropertyDescriptors, Lt = Object.getPrototypeOf;
function ne(t) {
  return typeof t == "function";
}
const J = () => {
};
function ee(t) {
  return t();
}
function It(t) {
  for (var n = 0; n < t.length; n++)
    t[n]();
}
const R = 2, An = 4, it = 8, yt = 16, M = 32, mt = 64, H = 128, vt = 256, C = 512, B = 1024, lt = 2048, O = 4096, ut = 8192, Cn = 16384, kt = 32768, re = 1 << 18, Nn = 1 << 19, sn = Symbol("$state"), ie = Symbol("");
function Sn(t) {
  return t === this.v;
}
function le(t, n) {
  return t != t ? n == n : t !== n || t !== null && typeof t == "object" || typeof t == "function";
}
function ue(t) {
  return !le(t, this.v);
}
function oe(t) {
  throw new Error("effect_in_teardown");
}
function ae() {
  throw new Error("effect_in_unowned_derived");
}
function se(t) {
  throw new Error("effect_orphan");
}
function fe() {
  throw new Error("effect_update_depth_exceeded");
}
function ce() {
  throw new Error("state_unsafe_local_read");
}
function ve() {
  throw new Error("state_unsafe_mutation");
}
let ot = !1;
function _e() {
  ot = !0;
}
function _t(t) {
  return {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: Sn,
    version: 0
  };
}
// @__NO_SIDE_EFFECTS__
function On(t, n = !1) {
  var r;
  const e = _t(t);
  return n || (e.equals = ue), ot && g !== null && g.l !== null && ((r = g.l).s ?? (r.s = [])).push(e), e;
}
function Z(t, n = !1) {
  return /* @__PURE__ */ de(/* @__PURE__ */ On(t, n));
}
// @__NO_SIDE_EFFECTS__
function de(t) {
  return E !== null && E.f & R && (L === null ? Me([t]) : L.push(t)), t;
}
function Dt(t, n) {
  return V(
    t,
    At(() => x(t))
  ), n;
}
function V(t, n) {
  return E !== null && bt() && E.f & (R | yt) && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (L === null || !L.includes(t)) && ve(), Mt(t, n);
}
function Mt(t, n) {
  return t.equals(n) || (t.v = n, t.version = zn(), Ln(t, B), bt() && p !== null && p.f & C && !(p.f & M) && (A !== null && A.includes(t) ? (F(p, B), xt(p)) : $ === null ? Fe([t]) : $.push(t))), n;
}
function Ln(t, n) {
  var e = t.reactions;
  if (e !== null)
    for (var r = bt(), i = e.length, l = 0; l < i; l++) {
      var u = e[l], a = u.f;
      a & B || !r && u === p || (F(u, n), a & (C | H) && (a & R ? Ln(
        /** @type {Derived} */
        u,
        lt
      ) : xt(
        /** @type {Effect} */
        u
      )));
    }
}
const Yt = 1, jt = 2, In = 4, pe = 8, he = 16, we = 1, Ee = 2, ye = 4, me = 1, ke = 2;
let ge = !1;
var fn, Dn, Mn;
function be() {
  if (fn === void 0) {
    fn = window;
    var t = Element.prototype, n = Node.prototype;
    Dn = an(n, "firstChild").get, Mn = an(n, "nextSibling").get, t.__click = void 0, t.__className = "", t.__attributes = null, t.__styles = null, t.__e = void 0, Text.prototype.__t = void 0;
  }
}
function zt(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function dt(t) {
  return Dn.call(t);
}
// @__NO_SIDE_EFFECTS__
function gt(t) {
  return Mn.call(t);
}
function tt(t, n) {
  return /* @__PURE__ */ dt(t);
}
function Te(t, n) {
  {
    var e = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ dt(
        /** @type {Node} */
        t
      )
    );
    return e instanceof Comment && e.data === "" ? /* @__PURE__ */ gt(e) : e;
  }
}
function pt(t, n = 1, e = !1) {
  let r = t;
  for (; n--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ gt(r);
  return r;
}
function xe(t) {
  t.textContent = "";
}
// @__NO_SIDE_EFFECTS__
function Ae(t) {
  var n = R | B;
  p === null ? n |= H : p.f |= Nn;
  const e = {
    children: null,
    ctx: g,
    deps: null,
    equals: Sn,
    f: n,
    fn: t,
    reactions: null,
    v: (
      /** @type {V} */
      null
    ),
    version: 0,
    parent: p
  };
  if (E !== null && E.f & R) {
    var r = (
      /** @type {Derived} */
      E
    );
    (r.children ?? (r.children = [])).push(e);
  }
  return e;
}
function Fn(t) {
  var n = t.children;
  if (n !== null) {
    t.children = null;
    for (var e = 0; e < n.length; e += 1) {
      var r = n[e];
      r.f & R ? Gt(
        /** @type {Derived} */
        r
      ) : U(
        /** @type {Effect} */
        r
      );
    }
  }
}
function Rn(t) {
  var n, e = p;
  D(t.parent);
  try {
    Fn(t), n = Gn(t);
  } finally {
    D(e);
  }
  return n;
}
function qn(t) {
  var n = Rn(t), e = (j || t.f & H) && t.deps !== null ? lt : C;
  F(t, e), t.equals(n) || (t.v = n, t.version = zn());
}
function Gt(t) {
  Fn(t), rt(t, 0), F(t, ut), t.v = t.children = t.deps = t.ctx = t.reactions = null;
}
function Pn(t) {
  p === null && E === null && se(), E !== null && E.f & H && ae(), Zt && oe();
}
function Ce(t, n) {
  var e = n.last;
  e === null ? n.last = n.first = t : (e.next = t, t.prev = e, n.last = t);
}
function K(t, n, e, r = !0) {
  var i = (t & mt) !== 0, l = p, u = {
    ctx: g,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: t | B,
    first: null,
    fn: n,
    last: null,
    next: null,
    parent: i ? null : l,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (e) {
    var a = z;
    try {
      vn(!0), Tt(u), u.f |= Cn;
    } catch (s) {
      throw U(u), s;
    } finally {
      vn(a);
    }
  } else
    n !== null && xt(u);
  var v = e && u.deps === null && u.first === null && u.nodes_start === null && u.teardown === null && (u.f & Nn) === 0;
  if (!v && !i && r && (l !== null && Ce(u, l), E !== null && E.f & R)) {
    var f = (
      /** @type {Derived} */
      E
    );
    (f.children ?? (f.children = [])).push(u);
  }
  return u;
}
function Ne(t) {
  const n = K(it, null, !1);
  return F(n, C), n.teardown = t, n;
}
function Ft(t) {
  Pn();
  var n = p !== null && (p.f & M) !== 0 && g !== null && !g.m;
  if (n) {
    var e = (
      /** @type {ComponentContext} */
      g
    );
    (e.e ?? (e.e = [])).push({
      fn: t,
      effect: p,
      reaction: E
    });
  } else {
    var r = Kt(t);
    return r;
  }
}
function Se(t) {
  return Pn(), $n(t);
}
function Oe(t) {
  const n = K(mt, t, !0);
  return () => {
    U(n);
  };
}
function Kt(t) {
  return K(An, t, !1);
}
function $n(t) {
  return K(it, t, !0);
}
function cn(t) {
  return Xt(t);
}
function Xt(t, n = 0) {
  return K(it | yt | n, t, !0);
}
function et(t, n = !0) {
  return K(it | M, t, !0, n);
}
function Bn(t) {
  var n = t.teardown;
  if (n !== null) {
    const e = Zt, r = E;
    _n(!0), I(null);
    try {
      n.call(null);
    } finally {
      _n(e), I(r);
    }
  }
}
function Vn(t) {
  var n = t.deriveds;
  if (n !== null) {
    t.deriveds = null;
    for (var e = 0; e < n.length; e += 1)
      Gt(n[e]);
  }
}
function Hn(t, n = !1) {
  var e = t.first;
  for (t.first = t.last = null; e !== null; ) {
    var r = e.next;
    U(e, n), e = r;
  }
}
function Le(t) {
  for (var n = t.first; n !== null; ) {
    var e = n.next;
    n.f & M || U(n), n = e;
  }
}
function U(t, n = !0) {
  var e = !1;
  if ((n || t.f & re) && t.nodes_start !== null) {
    for (var r = t.nodes_start, i = t.nodes_end; r !== null; ) {
      var l = r === i ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ gt(r)
      );
      r.remove(), r = l;
    }
    e = !0;
  }
  Hn(t, n && !e), Vn(t), rt(t, 0), F(t, ut);
  var u = t.transitions;
  if (u !== null)
    for (const v of u)
      v.stop();
  Bn(t);
  var a = t.parent;
  a !== null && a.first !== null && Un(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.parent = t.fn = t.nodes_start = t.nodes_end = null;
}
function Un(t) {
  var n = t.parent, e = t.prev, r = t.next;
  e !== null && (e.next = r), r !== null && (r.prev = e), n !== null && (n.first === t && (n.first = r), n.last === t && (n.last = e));
}
function Rt(t, n) {
  var e = [];
  Jt(t, e, !0), Wn(e, () => {
    U(t), n && n();
  });
}
function Wn(t, n) {
  var e = t.length;
  if (e > 0) {
    var r = () => --e || n();
    for (var i of t)
      i.out(r);
  } else
    n();
}
function Jt(t, n, e) {
  if (!(t.f & O)) {
    if (t.f ^= O, t.transitions !== null)
      for (const u of t.transitions)
        (u.is_global || e) && n.push(u);
    for (var r = t.first; r !== null; ) {
      var i = r.next, l = (r.f & kt) !== 0 || (r.f & M) !== 0;
      Jt(r, n, l ? e : !1), r = i;
    }
  }
}
function ht(t) {
  Yn(t, !0);
}
function Yn(t, n) {
  if (t.f & O) {
    at(t) && Tt(t), t.f ^= O;
    for (var e = t.first; e !== null; ) {
      var r = e.next, i = (e.f & kt) !== 0 || (e.f & M) !== 0;
      Yn(e, i ? n : !1), e = r;
    }
    if (t.transitions !== null)
      for (const l of t.transitions)
        (l.is_global || n) && l.in();
  }
}
let qt = !1, Pt = [];
function Ie() {
  qt = !1;
  const t = Pt.slice();
  Pt = [], It(t);
}
function Qt(t) {
  qt || (qt = !0, queueMicrotask(Ie)), Pt.push(t);
}
function De(t) {
  throw new Error("lifecycle_outside_component");
}
let wt = !1, z = !1, Zt = !1;
function vn(t) {
  z = t;
}
function _n(t) {
  Zt = t;
}
let $t = [], nt = 0;
let E = null;
function I(t) {
  E = t;
}
let p = null;
function D(t) {
  p = t;
}
let L = null;
function Me(t) {
  L = t;
}
let A = null, S = 0, $ = null;
function Fe(t) {
  $ = t;
}
let jn = 0, j = !1, g = null;
function zn() {
  return ++jn;
}
function bt() {
  return !ot || g !== null && g.l === null;
}
function at(t) {
  var u, a;
  var n = t.f;
  if (n & B)
    return !0;
  if (n & lt) {
    var e = t.deps, r = (n & H) !== 0;
    if (e !== null) {
      var i;
      if (n & vt) {
        for (i = 0; i < e.length; i++)
          ((u = e[i]).reactions ?? (u.reactions = [])).push(t);
        t.f ^= vt;
      }
      for (i = 0; i < e.length; i++) {
        var l = e[i];
        if (at(
          /** @type {Derived} */
          l
        ) && qn(
          /** @type {Derived} */
          l
        ), r && p !== null && !j && !((a = l == null ? void 0 : l.reactions) != null && a.includes(t)) && (l.reactions ?? (l.reactions = [])).push(t), l.version > t.version)
          return !0;
      }
    }
    r || F(t, C);
  }
  return !1;
}
function Re(t, n, e) {
  throw t;
}
function Gn(t) {
  var o;
  var n = A, e = S, r = $, i = E, l = j, u = L, a = g, v = t.f;
  A = /** @type {null | Value[]} */
  null, S = 0, $ = null, E = v & (M | mt) ? null : t, j = !z && (v & H) !== 0, L = null, g = t.ctx;
  try {
    var f = (
      /** @type {Function} */
      (0, t.fn)()
    ), s = t.deps;
    if (A !== null) {
      var c;
      if (rt(t, S), s !== null && S > 0)
        for (s.length = S + A.length, c = 0; c < A.length; c++)
          s[S + c] = A[c];
      else
        t.deps = s = A;
      if (!j)
        for (c = S; c < s.length; c++)
          ((o = s[c]).reactions ?? (o.reactions = [])).push(t);
    } else
      s !== null && S < s.length && (rt(t, S), s.length = S);
    return f;
  } finally {
    A = n, S = e, $ = r, E = i, j = l, L = u, g = a;
  }
}
function qe(t, n) {
  let e = n.reactions;
  if (e !== null) {
    var r = e.indexOf(t);
    if (r !== -1) {
      var i = e.length - 1;
      i === 0 ? e = n.reactions = null : (e[r] = e[i], e.pop());
    }
  }
  e === null && n.f & R && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (A === null || !A.includes(n)) && (F(n, lt), n.f & (H | vt) || (n.f ^= vt), rt(
    /** @type {Derived} **/
    n,
    0
  ));
}
function rt(t, n) {
  var e = t.deps;
  if (e !== null)
    for (var r = n; r < e.length; r++)
      qe(t, e[r]);
}
function Tt(t) {
  var n = t.f;
  if (!(n & ut)) {
    F(t, C);
    var e = p;
    p = t;
    try {
      n & yt ? Le(t) : Hn(t), Vn(t), Bn(t);
      var r = Gn(t);
      t.teardown = typeof r == "function" ? r : null, t.version = jn;
    } catch (i) {
      Re(
        /** @type {Error} */
        i
      );
    } finally {
      p = e;
    }
  }
}
function Pe() {
  nt > 1e3 && (nt = 0, fe()), nt++;
}
function $e(t) {
  var n = t.length;
  if (n !== 0) {
    Pe();
    var e = z;
    z = !0;
    try {
      for (var r = 0; r < n; r++) {
        var i = t[r];
        i.f & C || (i.f ^= C);
        var l = [];
        Kn(i, l), Be(l);
      }
    } finally {
      z = e;
    }
  }
}
function Be(t) {
  var n = t.length;
  if (n !== 0)
    for (var e = 0; e < n; e++) {
      var r = t[e];
      !(r.f & (ut | O)) && at(r) && (Tt(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null ? Un(r) : r.fn = null));
    }
}
function Ve() {
  if (wt = !1, nt > 1001)
    return;
  const t = $t;
  $t = [], $e(t), wt || (nt = 0);
}
function xt(t) {
  wt || (wt = !0, queueMicrotask(Ve));
  for (var n = t; n.parent !== null; ) {
    n = n.parent;
    var e = n.f;
    if (e & (mt | M)) {
      if (!(e & C))
        return;
      n.f ^= C;
    }
  }
  $t.push(n);
}
function Kn(t, n) {
  var e = t.first, r = [];
  t:
    for (; e !== null; ) {
      var i = e.f, l = (i & M) !== 0, u = l && (i & C) !== 0;
      if (!u && !(i & O))
        if (i & it) {
          l ? e.f ^= C : at(e) && Tt(e);
          var a = e.first;
          if (a !== null) {
            e = a;
            continue;
          }
        } else
          i & An && r.push(e);
      var v = e.next;
      if (v === null) {
        let c = e.parent;
        for (; c !== null; ) {
          if (t === c)
            break t;
          var f = c.next;
          if (f !== null) {
            e = f;
            continue t;
          }
          c = c.parent;
        }
      }
      e = v;
    }
  for (var s = 0; s < r.length; s++)
    a = r[s], n.push(a), Kn(a, n);
}
function x(t) {
  var a;
  var n = t.f, e = (n & R) !== 0;
  if (e && n & ut) {
    var r = Rn(
      /** @type {Derived} */
      t
    );
    return Gt(
      /** @type {Derived} */
      t
    ), r;
  }
  if (E !== null) {
    L !== null && L.includes(t) && ce();
    var i = E.deps;
    A === null && i !== null && i[S] === t ? S++ : A === null ? A = [t] : A.push(t), $ !== null && p !== null && p.f & C && !(p.f & M) && $.includes(t) && (F(p, B), xt(p));
  } else if (e && /** @type {Derived} */
  t.deps === null) {
    var l = (
      /** @type {Derived} */
      t
    ), u = l.parent;
    u !== null && !((a = u.deriveds) != null && a.includes(l)) && (u.deriveds ?? (u.deriveds = [])).push(l);
  }
  return e && (l = /** @type {Derived} */
  t, at(l) && qn(l)), t.v;
}
function At(t) {
  const n = E;
  try {
    return E = null, t();
  } finally {
    E = n;
  }
}
const He = ~(B | lt | C);
function F(t, n) {
  t.f = t.f & He | n;
}
function Ct(t, n = !1, e) {
  g = {
    p: g,
    c: null,
    e: null,
    m: !1,
    s: t,
    x: null,
    l: null
  }, ot && !n && (g.l = {
    s: null,
    u: null,
    r1: [],
    r2: _t(!1)
  });
}
function Nt(t) {
  const n = g;
  if (n !== null) {
    t !== void 0 && (n.x = t);
    const u = n.e;
    if (u !== null) {
      var e = p, r = E;
      n.e = null;
      try {
        for (var i = 0; i < u.length; i++) {
          var l = u[i];
          D(l.effect), I(l.reaction), Kt(l.fn);
        }
      } finally {
        D(e), I(r);
      }
    }
    g = n.p, n.m = !0;
  }
  return t || /** @type {T} */
  {};
}
function Ue(t) {
  if (!(typeof t != "object" || !t || t instanceof EventTarget)) {
    if (sn in t)
      Bt(t);
    else if (!Array.isArray(t))
      for (let n in t) {
        const e = t[n];
        typeof e == "object" && e && sn in e && Bt(e);
      }
  }
}
function Bt(t, n = /* @__PURE__ */ new Set()) {
  if (typeof t == "object" && t !== null && // We don't want to traverse DOM elements
  !(t instanceof EventTarget) && !n.has(t)) {
    n.add(t), t instanceof Date && t.getTime();
    for (let r in t)
      try {
        Bt(t[r], n);
      } catch {
      }
    const e = Lt(t);
    if (e !== Object.prototype && e !== Array.prototype && e !== Map.prototype && e !== Set.prototype && e !== Date.prototype) {
      const r = xn(e);
      for (let i in r) {
        const l = r[i].get;
        if (l)
          try {
            l.call(t);
          } catch {
          }
      }
    }
  }
}
let dn = !1;
function We() {
  dn || (dn = !0, document.addEventListener(
    "reset",
    (t) => {
      Promise.resolve().then(() => {
        var n;
        if (!t.defaultPrevented)
          for (
            const e of
            /**@type {HTMLFormElement} */
            t.target.elements
          )
            (n = e.__on_r) == null || n.call(e);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function Xn(t) {
  var n = E, e = p;
  I(null), D(null);
  try {
    return t();
  } finally {
    I(n), D(e);
  }
}
function Ye(t, n, e, r = e) {
  t.addEventListener(n, () => Xn(e));
  const i = t.__on_r;
  i ? t.__on_r = () => {
    i(), r();
  } : t.__on_r = r, We();
}
const je = /* @__PURE__ */ new Set(), pn = /* @__PURE__ */ new Set();
function ze(t, n, e, r) {
  function i(l) {
    if (r.capture || Q.call(n, l), !l.cancelBubble)
      return Xn(() => e.call(this, l));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? Qt(() => {
    n.addEventListener(t, i, r);
  }) : n.addEventListener(t, i, r), i;
}
function Et(t, n, e, r, i) {
  var l = { capture: r, passive: i }, u = ze(t, n, e, l);
  (n === document.body || n === window || n === document) && Ne(() => {
    n.removeEventListener(t, u, l);
  });
}
function Q(t) {
  var y;
  var n = this, e = (
    /** @type {Node} */
    n.ownerDocument
  ), r = t.type, i = ((y = t.composedPath) == null ? void 0 : y.call(t)) || [], l = (
    /** @type {null | Element} */
    i[0] || t.target
  ), u = 0, a = t.__root;
  if (a) {
    var v = i.indexOf(a);
    if (v !== -1 && (n === document || n === /** @type {any} */
    window)) {
      t.__root = n;
      return;
    }
    var f = i.indexOf(n);
    if (f === -1)
      return;
    v <= f && (u = v);
  }
  if (l = /** @type {Element} */
  i[u] || t.target, l !== n) {
    te(t, "currentTarget", {
      configurable: !0,
      get() {
        return l || e;
      }
    });
    var s = E, c = p;
    I(null), D(null);
    try {
      for (var o, _ = []; l !== null; ) {
        var d = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var h = l["__" + r];
          if (h !== void 0 && !/** @type {any} */
          l.disabled)
            if (Tn(h)) {
              var [k, ...b] = h;
              k.apply(l, [t, ...b]);
            } else
              h.call(l, t);
        } catch (T) {
          o ? _.push(T) : o = T;
        }
        if (t.cancelBubble || d === n || d === null)
          break;
        l = d;
      }
      if (o) {
        for (let T of _)
          queueMicrotask(() => {
            throw T;
          });
        throw o;
      }
    } finally {
      t.__root = n, delete t.currentTarget, I(s), D(c);
    }
  }
}
function Ge(t) {
  var n = document.createElement("template");
  return n.innerHTML = t, n.content;
}
function Vt(t, n) {
  var e = (
    /** @type {Effect} */
    p
  );
  e.nodes_start === null && (e.nodes_start = t, e.nodes_end = n);
}
// @__NO_SIDE_EFFECTS__
function st(t, n) {
  var e = (n & me) !== 0, r = (n & ke) !== 0, i, l = !t.startsWith("<!>");
  return () => {
    i === void 0 && (i = Ge(l ? t : "<!>" + t), e || (i = /** @type {Node} */
    /* @__PURE__ */ dt(i)));
    var u = (
      /** @type {TemplateNode} */
      r ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (e) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ dt(u)
      ), v = (
        /** @type {TemplateNode} */
        u.lastChild
      );
      Vt(a, v);
    } else
      Vt(u, u);
    return u;
  };
}
function Ke() {
  var t = document.createDocumentFragment(), n = document.createComment(""), e = zt();
  return t.append(n, e), Vt(n, e), t;
}
function G(t, n) {
  t !== null && t.before(
    /** @type {Node} */
    n
  );
}
const Xe = ["touchstart", "touchmove"];
function Je(t) {
  return Xe.includes(t);
}
let Ht = !0;
function Qe(t, n) {
  var e = n == null ? "" : typeof n == "object" ? n + "" : n;
  e !== (t.__t ?? (t.__t = t.nodeValue)) && (t.__t = e, t.nodeValue = e == null ? "" : e + "");
}
function Ze(t, n) {
  return tr(t, n);
}
const Y = /* @__PURE__ */ new Map();
function tr(t, { target: n, anchor: e, props: r = {}, events: i, context: l, intro: u = !0 }) {
  be();
  var a = /* @__PURE__ */ new Set(), v = (c) => {
    for (var o = 0; o < c.length; o++) {
      var _ = c[o];
      if (!a.has(_)) {
        a.add(_);
        var d = Je(_);
        n.addEventListener(_, Q, { passive: d });
        var h = Y.get(_);
        h === void 0 ? (document.addEventListener(_, Q, { passive: d }), Y.set(_, 1)) : Y.set(_, h + 1);
      }
    }
  };
  v(Wt(je)), pn.add(v);
  var f = void 0, s = Oe(() => {
    var c = e ?? n.appendChild(zt());
    return et(() => {
      if (l) {
        Ct({});
        var o = (
          /** @type {ComponentContext} */
          g
        );
        o.c = l;
      }
      i && (r.$$events = i), Ht = u, f = t(c, r) || {}, Ht = !0, l && Nt();
    }), () => {
      var d;
      for (var o of a) {
        n.removeEventListener(o, Q);
        var _ = (
          /** @type {number} */
          Y.get(o)
        );
        --_ === 0 ? (document.removeEventListener(o, Q), Y.delete(o)) : Y.set(o, _);
      }
      pn.delete(v), hn.delete(f), c !== e && ((d = c.parentNode) == null || d.removeChild(c));
    };
  });
  return hn.set(f, s), f;
}
let hn = /* @__PURE__ */ new WeakMap();
function nr(t, n, e, r = null, i = !1) {
  var l = t, u = null, a = null, v = null, f = i ? kt : 0;
  Xt(() => {
    v !== (v = !!n()) && (v ? (u ? ht(u) : u = et(() => e(l)), a && Rt(a, () => {
      a = null;
    })) : (a ? ht(a) : r && (a = et(() => r(l))), u && Rt(u, () => {
      u = null;
    })));
  }, f);
}
function er(t, n) {
  return n;
}
function rr(t, n, e, r) {
  for (var i = [], l = n.length, u = 0; u < l; u++)
    Jt(n[u].e, i, !0);
  var a = l > 0 && i.length === 0 && e !== null;
  if (a) {
    var v = (
      /** @type {Element} */
      /** @type {Element} */
      e.parentNode
    );
    xe(v), v.append(
      /** @type {Element} */
      e
    ), r.clear(), q(t, n[0].prev, n[l - 1].next);
  }
  Wn(i, () => {
    for (var f = 0; f < l; f++) {
      var s = n[f];
      a || (r.delete(s.k), q(t, s.prev, s.next)), U(s.e, !a);
    }
  });
}
function ir(t, n, e, r, i, l = null) {
  var u = t, a = { flags: n, items: /* @__PURE__ */ new Map(), first: null }, v = (n & In) !== 0;
  if (v) {
    var f = (
      /** @type {Element} */
      t
    );
    u = f.appendChild(zt());
  }
  var s = null, c = !1;
  Xt(() => {
    var o = e(), _ = Tn(o) ? o : o == null ? [] : Wt(o), d = _.length;
    if (!(c && d === 0)) {
      c = d === 0;
      {
        var h = (
          /** @type {Effect} */
          E
        );
        lr(_, a, u, i, n, (h.f & O) !== 0, r);
      }
      l !== null && (d === 0 ? s ? ht(s) : s = et(() => l(u)) : s !== null && Rt(s, () => {
        s = null;
      })), e();
    }
  });
}
function lr(t, n, e, r, i, l, u) {
  var en, rn, ln, un;
  var a = (i & pe) !== 0, v = (i & (Yt | jt)) !== 0, f = t.length, s = n.items, c = n.first, o = c, _, d = null, h, k = [], b = [], y, T, w, m;
  if (a)
    for (m = 0; m < f; m += 1)
      y = t[m], T = u(y, m), w = s.get(T), w !== void 0 && ((en = w.a) == null || en.measure(), (h ?? (h = /* @__PURE__ */ new Set())).add(w));
  for (m = 0; m < f; m += 1) {
    if (y = t[m], T = u(y, m), w = s.get(T), w === void 0) {
      var ft = o ? (
        /** @type {TemplateNode} */
        o.e.nodes_start
      ) : e;
      d = or(
        ft,
        n,
        d,
        d === null ? n.first : d.next,
        y,
        T,
        m,
        r,
        i
      ), s.set(T, d), k = [], b = [], o = d.next;
      continue;
    }
    if (v && ur(w, y, m, i), w.e.f & O && (ht(w.e), a && ((rn = w.a) == null || rn.unfix(), (h ?? (h = /* @__PURE__ */ new Set())).delete(w))), w !== o) {
      if (_ !== void 0 && _.has(w)) {
        if (k.length < b.length) {
          var W = b[0], N;
          d = W.prev;
          var nn = k[0], St = k[k.length - 1];
          for (N = 0; N < k.length; N += 1)
            wn(k[N], W, e);
          for (N = 0; N < b.length; N += 1)
            _.delete(b[N]);
          q(n, nn.prev, St.next), q(n, d, nn), q(n, St, W), o = W, d = St, m -= 1, k = [], b = [];
        } else
          _.delete(w), wn(w, o, e), q(n, w.prev, w.next), q(n, w, d === null ? n.first : d.next), q(n, d, w), d = w;
        continue;
      }
      for (k = [], b = []; o !== null && o.k !== T; )
        (l || !(o.e.f & O)) && (_ ?? (_ = /* @__PURE__ */ new Set())).add(o), b.push(o), o = o.next;
      if (o === null)
        continue;
      w = o;
    }
    k.push(w), d = w, o = w.next;
  }
  if (o !== null || _ !== void 0) {
    for (var X = _ === void 0 ? [] : Wt(_); o !== null; )
      (l || !(o.e.f & O)) && X.push(o), o = o.next;
    var Ot = X.length;
    if (Ot > 0) {
      var Zn = i & In && f === 0 ? e : null;
      if (a) {
        for (m = 0; m < Ot; m += 1)
          (ln = X[m].a) == null || ln.measure();
        for (m = 0; m < Ot; m += 1)
          (un = X[m].a) == null || un.fix();
      }
      rr(n, X, Zn, s);
    }
  }
  a && Qt(() => {
    var on;
    if (h !== void 0)
      for (w of h)
        (on = w.a) == null || on.apply();
  }), p.first = n.first && n.first.e, p.last = d && d.e;
}
function ur(t, n, e, r) {
  r & Yt && Mt(t.v, n), r & jt ? Mt(
    /** @type {Value<number>} */
    t.i,
    e
  ) : t.i = e;
}
function or(t, n, e, r, i, l, u, a, v) {
  var f = (v & Yt) !== 0, s = (v & he) === 0, c = f ? s ? /* @__PURE__ */ On(i) : _t(i) : i, o = v & jt ? _t(u) : u, _ = {
    i: o,
    v: c,
    k: l,
    a: null,
    // @ts-expect-error
    e: null,
    prev: e,
    next: r
  };
  try {
    return _.e = et(() => a(t, c, o), ge), _.e.prev = e && e.e, _.e.next = r && r.e, e === null ? n.first = _ : (e.next = _, e.e.next = _.e), r !== null && (r.prev = _, r.e.prev = _.e), _;
  } finally {
  }
}
function wn(t, n, e) {
  for (var r = t.next ? (
    /** @type {TemplateNode} */
    t.next.e.nodes_start
  ) : e, i = n ? (
    /** @type {TemplateNode} */
    n.e.nodes_start
  ) : e, l = (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ); l !== r; ) {
    var u = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ gt(l)
    );
    i.before(l), l = u;
  }
}
function q(t, n, e) {
  n === null ? t.first = e : (n.next = e, n.e.next = e && e.e), e !== null && (e.prev = n, e.e.prev = n && n.e);
}
function ar(t, n, e, r) {
  var i = t.__attributes ?? (t.__attributes = {});
  i[n] !== (i[n] = e) && (n === "style" && "__styles" in t && (t.__styles = {}), n === "loading" && (t[ie] = e), e == null ? t.removeAttribute(n) : typeof e != "string" && sr(t).includes(n) ? t[n] = e : t.setAttribute(n, e));
}
var En = /* @__PURE__ */ new Map();
function sr(t) {
  var n = En.get(t.nodeName);
  if (n)
    return n;
  En.set(t.nodeName, n = []);
  for (var e, r = Lt(t), i = Element.prototype; i !== r; ) {
    e = xn(r);
    for (var l in e)
      e[l].set && n.push(l);
    r = Lt(r);
  }
  return n;
}
const fr = () => performance.now(), P = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (t) => requestAnimationFrame(t)
  ),
  now: () => fr(),
  tasks: /* @__PURE__ */ new Set()
};
function Jn(t) {
  P.tasks.forEach((n) => {
    n.c(t) || (P.tasks.delete(n), n.f());
  }), P.tasks.size !== 0 && P.tick(Jn);
}
function cr(t) {
  let n;
  return P.tasks.size === 0 && P.tick(Jn), {
    promise: new Promise((e) => {
      P.tasks.add(n = { c: t, f: e });
    }),
    abort() {
      P.tasks.delete(n);
    }
  };
}
function ct(t, n) {
  t.dispatchEvent(new CustomEvent(n));
}
function vr(t) {
  if (t === "float")
    return "cssFloat";
  if (t === "offset")
    return "cssOffset";
  if (t.startsWith("--"))
    return t;
  const n = t.split("-");
  return n.length === 1 ? n[0] : n[0] + n.slice(1).map(
    /** @param {any} word */
    (e) => e[0].toUpperCase() + e.slice(1)
  ).join("");
}
function yn(t) {
  const n = {}, e = t.split(";");
  for (const r of e) {
    const [i, l] = r.split(":");
    if (!i || l === void 0)
      break;
    const u = vr(i.trim());
    n[u] = l.trim();
  }
  return n;
}
const _r = (t) => t;
function dr(t, n, e, r) {
  var i = (t & we) !== 0, l = (t & Ee) !== 0, u = i && l, a = (t & ye) !== 0, v = u ? "both" : i ? "in" : "out", f, s = n.inert, c, o;
  function _() {
    var y = E, T = p;
    I(null), D(null);
    try {
      return f ?? (f = e()(n, (r == null ? void 0 : r()) ?? /** @type {P} */
      {}, {
        direction: v
      }));
    } finally {
      I(y), D(T);
    }
  }
  var d = {
    is_global: a,
    in() {
      var y;
      if (n.inert = s, !i) {
        o == null || o.abort(), (y = o == null ? void 0 : o.reset) == null || y.call(o);
        return;
      }
      l || c == null || c.abort(), ct(n, "introstart"), c = Ut(n, _(), o, 1, () => {
        ct(n, "introend"), c == null || c.abort(), c = f = void 0;
      });
    },
    out(y) {
      if (!l) {
        y == null || y(), f = void 0;
        return;
      }
      n.inert = !0, ct(n, "outrostart"), o = Ut(n, _(), c, 0, () => {
        ct(n, "outroend"), y == null || y();
      });
    },
    stop: () => {
      c == null || c.abort(), o == null || o.abort();
    }
  }, h = (
    /** @type {Effect} */
    p
  );
  if ((h.transitions ?? (h.transitions = [])).push(d), i && Ht) {
    var k = a;
    if (!k) {
      for (var b = (
        /** @type {Effect | null} */
        h.parent
      ); b && b.f & kt; )
        for (; (b = b.parent) && !(b.f & yt); )
          ;
      k = !b || (b.f & Cn) !== 0;
    }
    k && Kt(() => {
      At(() => d.in());
    });
  }
}
function Ut(t, n, e, r, i) {
  var l = r === 1;
  if (ne(n)) {
    var u, a = !1;
    return Qt(() => {
      if (!a) {
        var k = n({ direction: l ? "in" : "out" });
        u = Ut(t, k, e, r, i);
      }
    }), {
      abort: () => {
        a = !0, u == null || u.abort();
      },
      deactivate: () => u.deactivate(),
      reset: () => u.reset(),
      t: () => u.t()
    };
  }
  if (e == null || e.deactivate(), !(n != null && n.duration))
    return i(), {
      abort: J,
      deactivate: J,
      reset: J,
      t: () => r
    };
  const { delay: v = 0, css: f, tick: s, easing: c = _r } = n;
  var o = [];
  if (l && e === void 0 && (s && s(0, 1), f)) {
    var _ = yn(f(0, 1));
    o.push(_, _);
  }
  var d = () => 1 - r, h = t.animate(o, { duration: v });
  return h.onfinish = () => {
    var k = (e == null ? void 0 : e.t()) ?? 1 - r;
    e == null || e.abort();
    var b = r - k, y = (
      /** @type {number} */
      n.duration * Math.abs(b)
    ), T = [];
    if (y > 0) {
      if (f)
        for (var w = Math.ceil(y / 16.666666666666668), m = 0; m <= w; m += 1) {
          var ft = k + b * c(m / w), W = f(ft, 1 - ft);
          T.push(yn(W));
        }
      d = () => {
        var N = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          h.currentTime
        );
        return k + b * c(N / y);
      }, s && cr(() => {
        if (h.playState !== "running")
          return !1;
        var N = d();
        return s(N, 1 - N), !0;
      });
    }
    h = t.animate(T, { duration: y, fill: "forwards" }), h.onfinish = () => {
      d = () => r, s == null || s(r, 1 - r), i();
    };
  }, {
    abort: () => {
      h && (h.cancel(), h.effect = null, h.onfinish = J);
    },
    deactivate: () => {
      i = J;
    },
    reset: () => {
      r === 0 && (s == null || s(1, 0));
    },
    t: () => d()
  };
}
function Qn(t, n, e = n) {
  var r = bt();
  Ye(t, "input", () => {
    var i = mn(t) ? kn(t.value) : t.value;
    e(i), r && i !== (i = n()) && (t.value = i ?? "");
  }), $n(() => {
    var i = n();
    mn(t) && i === kn(t.value) || t.type === "date" && !i && !t.value || i !== t.value && (t.value = i ?? "");
  });
}
function mn(t) {
  var n = t.type;
  return n === "number" || n === "range";
}
function kn(t) {
  return t === "" ? null : +t;
}
function tn(t = !1) {
  const n = (
    /** @type {ComponentContextLegacy} */
    g
  ), e = n.l.u;
  if (!e)
    return;
  let r = () => Ue(n.s);
  if (t) {
    let i = 0, l = (
      /** @type {Record<string, any>} */
      {}
    );
    const u = /* @__PURE__ */ Ae(() => {
      let a = !1;
      const v = n.s;
      for (const f in v)
        v[f] !== l[f] && (l[f] = v[f], a = !0);
      return a && i++, i;
    });
    r = () => x(u);
  }
  e.b.length && Se(() => {
    gn(n, r), It(e.b);
  }), Ft(() => {
    const i = At(() => e.m.map(ee));
    return () => {
      for (const l of i)
        typeof l == "function" && l();
    };
  }), e.a.length && Ft(() => {
    gn(n, r), It(e.a);
  });
}
function gn(t, n) {
  if (t.l.s)
    for (const e of t.l.s)
      x(e);
  n();
}
function pr(t) {
  g === null && De(), ot && g.l !== null ? hr(g).m.push(t) : Ft(() => {
    const n = At(t);
    if (typeof n == "function")
      return (
        /** @type {() => void} */
        n
      );
  });
}
function hr(t) {
  var n = (
    /** @type {ComponentContextLegacy} */
    t.l
  );
  return n.u ?? (n.u = { a: [], b: [], m: [] });
}
const wr = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(wr);
_e();
var Er = /* @__PURE__ */ st('<input type="text" placeholder="Enter task title" class="border p-2 rounded w-full" style="background-color: var(--vscode-editor-background); color: var(--vscode-editor-foreground);">');
function yr(t, n) {
  Ct(n, !1);
  let e = Z({ title: "" });
  function r() {
    if (x(e).title.trim()) {
      const u = new CustomEvent("addtask", { detail: { ...x(e) } });
      window.dispatchEvent(u), Dt(e, x(e).title = "");
    }
  }
  function i(u) {
    u.key === "Enter" && r();
  }
  tn();
  var l = Er();
  Qn(l, () => x(e).title, (u) => Dt(e, x(e).title = u)), Et("keypress", l, i), G(t, l), Nt();
}
var mr = /* @__PURE__ */ st('<li class="mb-2 p-0 border rounded"><button class="w-full h-full p-2 text-left"> </button></li>'), kr = /* @__PURE__ */ st('<div class="task-list svelte-eyiu49"><!> <ul></ul></div>');
function gr(t, n) {
  Ct(n, !1);
  let e = Z([]), r = Z("100%"), i = Z("0");
  pr(() => {
    window.addEventListener("addtask", (f) => {
      V(e, [...x(e), f.detail]);
    }), window.addEventListener("edittask", (f) => {
      f.detail ? (V(r, "20%"), V(i, "0")) : (V(r, "100%"), V(i, "0"));
    });
  });
  function l(f) {
    const s = new CustomEvent("edittask", { detail: { ...f } });
    window.dispatchEvent(s);
  }
  tn();
  var u = kr(), a = tt(u);
  yr(a, {});
  var v = pt(a, 2);
  ir(v, 5, () => x(e), er, (f, s) => {
    var c = mr(), o = tt(c), _ = tt(o);
    cn(() => Qe(_, x(s).title)), Et("click", o, () => l(x(s))), G(f, c);
  }), cn(() => ar(u, "style", `width: ${x(r) ?? ""}; left: ${x(i) ?? ""};`)), G(t, u), Nt();
}
function br(t) {
  const n = t - 1;
  return n * n * n + 1;
}
function bn(t) {
  const n = typeof t == "string" && t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return n ? [parseFloat(n[1]), n[2] || "px"] : [
    /** @type {number} */
    t,
    "px"
  ];
}
function Tr(t, { delay: n = 0, duration: e = 400, easing: r = br, x: i = 0, y: l = 0, opacity: u = 0 } = {}) {
  const a = getComputedStyle(t), v = +a.opacity, f = a.transform === "none" ? "" : a.transform, s = v * (1 - u), [c, o] = bn(i), [_, d] = bn(l);
  return {
    delay: n,
    duration: e,
    easing: r,
    css: (h, k) => `
			transform: ${f} translate(${(1 - h) * c}${o}, ${(1 - h) * _}${d});
			opacity: ${v - s * k}`
  };
}
var xr = /* @__PURE__ */ st('<div class="panel svelte-i1uzow"><button class="close-button svelte-i1uzow" aria-label="Close">x</button> <h2 class="text-xl mb-4">Edit Task</h2> <input type="text" placeholder="Enter task title" class="border p-2 rounded w-full mb-4" style="background-color: var(--vscode-editor-background); color: var(--vscode-editor-foreground);"> <button class="p-2 bg-blue-500 text-white rounded w-full" aria-label="Update Task">Update Task</button></div>');
function Ar(t, n) {
  Ct(n, !1);
  let e = { title: "", detail: "" }, r = Z(null);
  window.addEventListener("edittask", (v) => {
    V(r, v.detail);
  });
  function i() {
    const v = new CustomEvent("updatetask", { detail: { ...e } });
    window.dispatchEvent(v);
  }
  function l() {
    const v = new CustomEvent("edittask", { detail: null });
    window.dispatchEvent(v);
  }
  tn();
  var u = Ke(), a = Te(u);
  nr(a, () => x(r), (v) => {
    var f = xr(), s = tt(f), c = pt(s, 4), o = pt(c, 2);
    Et("click", s, l), Qn(c, () => x(r).title, (_) => Dt(r, x(r).title = _)), Et("click", o, i), dr(3, f, () => Tr, () => ({ x: 500, duration: 600 })), G(v, f);
  }), G(t, u), Nt();
}
var Cr = /* @__PURE__ */ st('<div class="h-full flex flex-col justify-center items-center text-2xl"><!> <!></div>');
function Nr(t) {
  var n = Cr(), e = tt(n);
  gr(e, {});
  var r = pt(e, 2);
  Ar(r, {}), G(t, n);
}
const Sr = Ze(Nr, { target: document.getElementById("app") });
export {
  Sr as default
};
