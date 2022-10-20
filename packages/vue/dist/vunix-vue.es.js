import { reactive as et, markRaw as tt, computed as C, openBlock as R, createElementBlock as rt, createElementVNode as at, defineComponent as nt, resolveComponent as it, createBlock as ee, resolveDynamicComponent as te, unref as d, mergeProps as ot, withCtx as st, renderSlot as lt, normalizeClass as ut, createCommentVNode as ct } from "vue";
var x = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ft = Array.isArray, h = ft, vt = typeof x == "object" && x && x.Object === Object && x, je = vt, dt = je, pt = typeof self == "object" && self && self.Object === Object && self, gt = dt || pt || Function("return this")(), y = gt, ht = y, _t = ht.Symbol, P = _t, re = P, Ie = Object.prototype, yt = Ie.hasOwnProperty, bt = Ie.toString, A = re ? re.toStringTag : void 0;
function $t(e) {
  var t = yt.call(e, A), r = e[A];
  try {
    e[A] = void 0;
    var a = !0;
  } catch {
  }
  var n = bt.call(e);
  return a && (t ? e[A] = r : delete e[A]), n;
}
var mt = $t, Tt = Object.prototype, Ot = Tt.toString;
function At(e) {
  return Ot.call(e);
}
var St = At, ae = P, xt = mt, Ct = St, wt = "[object Null]", Pt = "[object Undefined]", ne = ae ? ae.toStringTag : void 0;
function jt(e) {
  return e == null ? e === void 0 ? Pt : wt : ne && ne in Object(e) ? xt(e) : Ct(e);
}
var S = jt;
function It(e) {
  return e != null && typeof e == "object";
}
var b = It, Mt = S, Ft = b, Dt = "[object Symbol]";
function Lt(e) {
  return typeof e == "symbol" || Ft(e) && Mt(e) == Dt;
}
var k = Lt, Et = h, Gt = k, Bt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/;
function Nt(e, t) {
  if (Et(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Gt(e) ? !0 : zt.test(e) || !Bt.test(e) || t != null && e in Object(t);
}
var Rt = Nt;
function Ht(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var g = Ht, Ut = S, Kt = g, kt = "[object AsyncFunction]", Vt = "[object Function]", qt = "[object GeneratorFunction]", Xt = "[object Proxy]";
function Zt(e) {
  if (!Kt(e))
    return !1;
  var t = Ut(e);
  return t == Vt || t == qt || t == kt || t == Xt;
}
var V = Zt, Jt = y, Yt = Jt["__core-js_shared__"], Wt = Yt, z = Wt, ie = function() {
  var e = /[^.]+$/.exec(z && z.keys && z.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Qt(e) {
  return !!ie && ie in e;
}
var er = Qt, tr = Function.prototype, rr = tr.toString;
function ar(e) {
  if (e != null) {
    try {
      return rr.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var nr = ar, ir = V, or = er, sr = g, lr = nr, ur = /[\\^$.*+?()[\]{}|]/g, cr = /^\[object .+?Constructor\]$/, fr = Function.prototype, vr = Object.prototype, dr = fr.toString, pr = vr.hasOwnProperty, gr = RegExp(
  "^" + dr.call(pr).replace(ur, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function hr(e) {
  if (!sr(e) || or(e))
    return !1;
  var t = ir(e) ? gr : cr;
  return t.test(lr(e));
}
var _r = hr;
function yr(e, t) {
  return e?.[t];
}
var br = yr, $r = _r, mr = br;
function Tr(e, t) {
  var r = mr(e, t);
  return $r(r) ? r : void 0;
}
var q = Tr, Or = q, Ar = Or(Object, "create"), j = Ar, oe = j;
function Sr() {
  this.__data__ = oe ? oe(null) : {}, this.size = 0;
}
var xr = Sr;
function Cr(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var wr = Cr, Pr = j, jr = "__lodash_hash_undefined__", Ir = Object.prototype, Mr = Ir.hasOwnProperty;
function Fr(e) {
  var t = this.__data__;
  if (Pr) {
    var r = t[e];
    return r === jr ? void 0 : r;
  }
  return Mr.call(t, e) ? t[e] : void 0;
}
var Dr = Fr, Lr = j, Er = Object.prototype, Gr = Er.hasOwnProperty;
function Br(e) {
  var t = this.__data__;
  return Lr ? t[e] !== void 0 : Gr.call(t, e);
}
var zr = Br, Nr = j, Rr = "__lodash_hash_undefined__";
function Hr(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Nr && t === void 0 ? Rr : t, this;
}
var Ur = Hr, Kr = xr, kr = wr, Vr = Dr, qr = zr, Xr = Ur;
function $(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
$.prototype.clear = Kr;
$.prototype.delete = kr;
$.prototype.get = Vr;
$.prototype.has = qr;
$.prototype.set = Xr;
var Zr = $;
function Jr() {
  this.__data__ = [], this.size = 0;
}
var Yr = Jr;
function Wr(e, t) {
  return e === t || e !== e && t !== t;
}
var I = Wr, Qr = I;
function ea(e, t) {
  for (var r = e.length; r--; )
    if (Qr(e[r][0], t))
      return r;
  return -1;
}
var M = ea, ta = M, ra = Array.prototype, aa = ra.splice;
function na(e) {
  var t = this.__data__, r = ta(t, e);
  if (r < 0)
    return !1;
  var a = t.length - 1;
  return r == a ? t.pop() : aa.call(t, r, 1), --this.size, !0;
}
var ia = na, oa = M;
function sa(e) {
  var t = this.__data__, r = oa(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var la = sa, ua = M;
function ca(e) {
  return ua(this.__data__, e) > -1;
}
var fa = ca, va = M;
function da(e, t) {
  var r = this.__data__, a = va(r, e);
  return a < 0 ? (++this.size, r.push([e, t])) : r[a][1] = t, this;
}
var pa = da, ga = Yr, ha = ia, _a = la, ya = fa, ba = pa;
function m(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
m.prototype.clear = ga;
m.prototype.delete = ha;
m.prototype.get = _a;
m.prototype.has = ya;
m.prototype.set = ba;
var F = m, $a = q, ma = y, Ta = $a(ma, "Map"), Me = Ta, se = Zr, Oa = F, Aa = Me;
function Sa() {
  this.size = 0, this.__data__ = {
    hash: new se(),
    map: new (Aa || Oa)(),
    string: new se()
  };
}
var xa = Sa;
function Ca(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var wa = Ca, Pa = wa;
function ja(e, t) {
  var r = e.__data__;
  return Pa(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var D = ja, Ia = D;
function Ma(e) {
  var t = Ia(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Fa = Ma, Da = D;
function La(e) {
  return Da(this, e).get(e);
}
var Ea = La, Ga = D;
function Ba(e) {
  return Ga(this, e).has(e);
}
var za = Ba, Na = D;
function Ra(e, t) {
  var r = Na(this, e), a = r.size;
  return r.set(e, t), this.size += r.size == a ? 0 : 1, this;
}
var Ha = Ra, Ua = xa, Ka = Fa, ka = Ea, Va = za, qa = Ha;
function T(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
T.prototype.clear = Ua;
T.prototype.delete = Ka;
T.prototype.get = ka;
T.prototype.has = Va;
T.prototype.set = qa;
var Fe = T, De = Fe, Xa = "Expected a function";
function X(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Xa);
  var r = function() {
    var a = arguments, n = t ? t.apply(this, a) : a[0], o = r.cache;
    if (o.has(n))
      return o.get(n);
    var s = e.apply(this, a);
    return r.cache = o.set(n, s) || o, s;
  };
  return r.cache = new (X.Cache || De)(), r;
}
X.Cache = De;
var Za = X, Ja = Za, Ya = 500;
function Wa(e) {
  var t = Ja(e, function(a) {
    return r.size === Ya && r.clear(), a;
  }), r = t.cache;
  return t;
}
var Qa = Wa, en = Qa, tn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, rn = /\\(\\)?/g, an = en(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(tn, function(r, a, n, o) {
    t.push(n ? o.replace(rn, "$1") : a || r);
  }), t;
}), nn = an;
function on(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length, n = Array(a); ++r < a; )
    n[r] = t(e[r], r, e);
  return n;
}
var sn = on, le = P, ln = sn, un = h, cn = k, fn = 1 / 0, ue = le ? le.prototype : void 0, ce = ue ? ue.toString : void 0;
function Le(e) {
  if (typeof e == "string")
    return e;
  if (un(e))
    return ln(e, Le) + "";
  if (cn(e))
    return ce ? ce.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -fn ? "-0" : t;
}
var vn = Le, dn = vn;
function pn(e) {
  return e == null ? "" : dn(e);
}
var gn = pn, hn = h, _n = Rt, yn = nn, bn = gn;
function $n(e, t) {
  return hn(e) ? e : _n(e, t) ? [e] : yn(bn(e));
}
var L = $n, mn = k, Tn = 1 / 0;
function On(e) {
  if (typeof e == "string" || mn(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Tn ? "-0" : t;
}
var Z = On, An = L, Sn = Z;
function xn(e, t) {
  t = An(t, e);
  for (var r = 0, a = t.length; e != null && r < a; )
    e = e[Sn(t[r++])];
  return r && r == a ? e : void 0;
}
var Cn = xn, wn = q, Pn = function() {
  try {
    var e = wn(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Ee = Pn, fe = Ee;
function jn(e, t, r) {
  t == "__proto__" && fe ? fe(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var J = jn, In = J, Mn = I, Fn = Object.prototype, Dn = Fn.hasOwnProperty;
function Ln(e, t, r) {
  var a = e[t];
  (!(Dn.call(e, t) && Mn(a, r)) || r === void 0 && !(t in e)) && In(e, t, r);
}
var Ge = Ln, En = 9007199254740991, Gn = /^(?:0|[1-9]\d*)$/;
function Bn(e, t) {
  var r = typeof e;
  return t = t ?? En, !!t && (r == "number" || r != "symbol" && Gn.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var E = Bn, zn = Ge, Nn = L, Rn = E, ve = g, Hn = Z;
function Un(e, t, r, a) {
  if (!ve(e))
    return e;
  t = Nn(t, e);
  for (var n = -1, o = t.length, s = o - 1, i = e; i != null && ++n < o; ) {
    var l = Hn(t[n]), u = r;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (n != s) {
      var f = i[l];
      u = a ? a(f, l, i) : void 0, u === void 0 && (u = ve(f) ? f : Rn(t[n + 1]) ? [] : {});
    }
    zn(i, l, u), i = i[l];
  }
  return e;
}
var Kn = Un, kn = Cn, Vn = Kn, qn = L;
function Xn(e, t, r) {
  for (var a = -1, n = t.length, o = {}; ++a < n; ) {
    var s = t[a], i = kn(e, s);
    r(i, s) && Vn(o, qn(s, e), i);
  }
  return o;
}
var Zn = Xn;
function Jn(e, t) {
  return e != null && t in Object(e);
}
var Yn = Jn, Wn = S, Qn = b, ei = "[object Arguments]";
function ti(e) {
  return Qn(e) && Wn(e) == ei;
}
var ri = ti, de = ri, ai = b, Be = Object.prototype, ni = Be.hasOwnProperty, ii = Be.propertyIsEnumerable, oi = de(function() {
  return arguments;
}()) ? de : function(e) {
  return ai(e) && ni.call(e, "callee") && !ii.call(e, "callee");
}, G = oi, si = 9007199254740991;
function li(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= si;
}
var Y = li, ui = L, ci = G, fi = h, vi = E, di = Y, pi = Z;
function gi(e, t, r) {
  t = ui(t, e);
  for (var a = -1, n = t.length, o = !1; ++a < n; ) {
    var s = pi(t[a]);
    if (!(o = e != null && r(e, s)))
      break;
    e = e[s];
  }
  return o || ++a != n ? o : (n = e == null ? 0 : e.length, !!n && di(n) && vi(s, n) && (fi(e) || ci(e)));
}
var hi = gi, _i = Yn, yi = hi;
function bi(e, t) {
  return e != null && yi(e, t, _i);
}
var $i = bi, mi = Zn, Ti = $i;
function Oi(e, t) {
  return mi(e, t, function(r, a) {
    return Ti(e, a);
  });
}
var Ai = Oi;
function Si(e, t) {
  for (var r = -1, a = t.length, n = e.length; ++r < a; )
    e[n + r] = t[r];
  return e;
}
var xi = Si, pe = P, Ci = G, wi = h, ge = pe ? pe.isConcatSpreadable : void 0;
function Pi(e) {
  return wi(e) || Ci(e) || !!(ge && e && e[ge]);
}
var ji = Pi, Ii = xi, Mi = ji;
function ze(e, t, r, a, n) {
  var o = -1, s = e.length;
  for (r || (r = Mi), n || (n = []); ++o < s; ) {
    var i = e[o];
    t > 0 && r(i) ? t > 1 ? ze(i, t - 1, r, a, n) : Ii(n, i) : a || (n[n.length] = i);
  }
  return n;
}
var Fi = ze, Di = Fi;
function Li(e) {
  var t = e == null ? 0 : e.length;
  return t ? Di(e, 1) : [];
}
var Ei = Li;
function Gi(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var Bi = Gi, zi = Bi, he = Math.max;
function Ni(e, t, r) {
  return t = he(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var a = arguments, n = -1, o = he(a.length - t, 0), s = Array(o); ++n < o; )
      s[n] = a[t + n];
    n = -1;
    for (var i = Array(t + 1); ++n < t; )
      i[n] = a[n];
    return i[t] = r(s), zi(e, this, i);
  };
}
var Ne = Ni;
function Ri(e) {
  return function() {
    return e;
  };
}
var Hi = Ri;
function Ui(e) {
  return e;
}
var Re = Ui, Ki = Hi, _e = Ee, ki = Re, Vi = _e ? function(e, t) {
  return _e(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ki(t),
    writable: !0
  });
} : ki, qi = Vi, Xi = 800, Zi = 16, Ji = Date.now;
function Yi(e) {
  var t = 0, r = 0;
  return function() {
    var a = Ji(), n = Zi - (a - r);
    if (r = a, n > 0) {
      if (++t >= Xi)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var Wi = Yi, Qi = qi, eo = Wi, to = eo(Qi), He = to, ro = Ei, ao = Ne, no = He;
function io(e) {
  return no(ao(e, void 0, ro), e + "");
}
var oo = io, so = Ai, lo = oo, uo = lo(function(e, t) {
  return e == null ? {} : so(e, t);
}), N = uo, co = F;
function fo() {
  this.__data__ = new co(), this.size = 0;
}
var vo = fo;
function po(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var go = po;
function ho(e) {
  return this.__data__.get(e);
}
var _o = ho;
function yo(e) {
  return this.__data__.has(e);
}
var bo = yo, $o = F, mo = Me, To = Fe, Oo = 200;
function Ao(e, t) {
  var r = this.__data__;
  if (r instanceof $o) {
    var a = r.__data__;
    if (!mo || a.length < Oo - 1)
      return a.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new To(a);
  }
  return r.set(e, t), this.size = r.size, this;
}
var So = Ao, xo = F, Co = vo, wo = go, Po = _o, jo = bo, Io = So;
function O(e) {
  var t = this.__data__ = new xo(e);
  this.size = t.size;
}
O.prototype.clear = Co;
O.prototype.delete = wo;
O.prototype.get = Po;
O.prototype.has = jo;
O.prototype.set = Io;
var Mo = O, Fo = J, Do = I;
function Lo(e, t, r) {
  (r !== void 0 && !Do(e[t], r) || r === void 0 && !(t in e)) && Fo(e, t, r);
}
var Ue = Lo;
function Eo(e) {
  return function(t, r, a) {
    for (var n = -1, o = Object(t), s = a(t), i = s.length; i--; ) {
      var l = s[e ? i : ++n];
      if (r(o[l], l, o) === !1)
        break;
    }
    return t;
  };
}
var Go = Eo, Bo = Go, zo = Bo(), No = zo, H = { exports: {} };
(function(e, t) {
  var r = y, a = t && !t.nodeType && t, n = a && !0 && e && !e.nodeType && e, o = n && n.exports === a, s = o ? r.Buffer : void 0, i = s ? s.allocUnsafe : void 0;
  function l(u, f) {
    if (f)
      return u.slice();
    var p = u.length, _ = i ? i(p) : new u.constructor(p);
    return u.copy(_), _;
  }
  e.exports = l;
})(H, H.exports);
var Ro = y, Ho = Ro.Uint8Array, Uo = Ho, ye = Uo;
function Ko(e) {
  var t = new e.constructor(e.byteLength);
  return new ye(t).set(new ye(e)), t;
}
var ko = Ko, Vo = ko;
function qo(e, t) {
  var r = t ? Vo(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Xo = qo;
function Zo(e, t) {
  var r = -1, a = e.length;
  for (t || (t = Array(a)); ++r < a; )
    t[r] = e[r];
  return t;
}
var Jo = Zo, Yo = g, be = Object.create, Wo = function() {
  function e() {
  }
  return function(t) {
    if (!Yo(t))
      return {};
    if (be)
      return be(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Qo = Wo;
function es(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var ts = es, rs = ts, as = rs(Object.getPrototypeOf, Object), Ke = as, ns = Object.prototype;
function is(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || ns;
  return e === r;
}
var ke = is, os = Qo, ss = Ke, ls = ke;
function us(e) {
  return typeof e.constructor == "function" && !ls(e) ? os(ss(e)) : {};
}
var cs = us, fs = V, vs = Y;
function ds(e) {
  return e != null && vs(e.length) && !fs(e);
}
var W = ds, ps = W, gs = b;
function hs(e) {
  return gs(e) && ps(e);
}
var _s = hs, w = { exports: {} };
function ys() {
  return !1;
}
var bs = ys;
(function(e, t) {
  var r = y, a = bs, n = t && !t.nodeType && t, o = n && !0 && e && !e.nodeType && e, s = o && o.exports === n, i = s ? r.Buffer : void 0, l = i ? i.isBuffer : void 0, u = l || a;
  e.exports = u;
})(w, w.exports);
var $s = S, ms = Ke, Ts = b, Os = "[object Object]", As = Function.prototype, Ss = Object.prototype, Ve = As.toString, xs = Ss.hasOwnProperty, Cs = Ve.call(Object);
function ws(e) {
  if (!Ts(e) || $s(e) != Os)
    return !1;
  var t = ms(e);
  if (t === null)
    return !0;
  var r = xs.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Ve.call(r) == Cs;
}
var Ps = ws, js = S, Is = Y, Ms = b, Fs = "[object Arguments]", Ds = "[object Array]", Ls = "[object Boolean]", Es = "[object Date]", Gs = "[object Error]", Bs = "[object Function]", zs = "[object Map]", Ns = "[object Number]", Rs = "[object Object]", Hs = "[object RegExp]", Us = "[object Set]", Ks = "[object String]", ks = "[object WeakMap]", Vs = "[object ArrayBuffer]", qs = "[object DataView]", Xs = "[object Float32Array]", Zs = "[object Float64Array]", Js = "[object Int8Array]", Ys = "[object Int16Array]", Ws = "[object Int32Array]", Qs = "[object Uint8Array]", el = "[object Uint8ClampedArray]", tl = "[object Uint16Array]", rl = "[object Uint32Array]", c = {};
c[Xs] = c[Zs] = c[Js] = c[Ys] = c[Ws] = c[Qs] = c[el] = c[tl] = c[rl] = !0;
c[Fs] = c[Ds] = c[Vs] = c[Ls] = c[qs] = c[Es] = c[Gs] = c[Bs] = c[zs] = c[Ns] = c[Rs] = c[Hs] = c[Us] = c[Ks] = c[ks] = !1;
function al(e) {
  return Ms(e) && Is(e.length) && !!c[js(e)];
}
var nl = al;
function il(e) {
  return function(t) {
    return e(t);
  };
}
var ol = il, U = { exports: {} };
(function(e, t) {
  var r = je, a = t && !t.nodeType && t, n = a && !0 && e && !e.nodeType && e, o = n && n.exports === a, s = o && r.process, i = function() {
    try {
      var l = n && n.require && n.require("util").types;
      return l || s && s.binding && s.binding("util");
    } catch {
    }
  }();
  e.exports = i;
})(U, U.exports);
var sl = nl, ll = ol, $e = U.exports, me = $e && $e.isTypedArray, ul = me ? ll(me) : sl, qe = ul;
function cl(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var Xe = cl, fl = Ge, vl = J;
function dl(e, t, r, a) {
  var n = !r;
  r || (r = {});
  for (var o = -1, s = t.length; ++o < s; ) {
    var i = t[o], l = a ? a(r[i], e[i], i, r, e) : void 0;
    l === void 0 && (l = e[i]), n ? vl(r, i, l) : fl(r, i, l);
  }
  return r;
}
var pl = dl;
function gl(e, t) {
  for (var r = -1, a = Array(e); ++r < e; )
    a[r] = t(r);
  return a;
}
var hl = gl, _l = hl, yl = G, bl = h, $l = w.exports, ml = E, Tl = qe, Ol = Object.prototype, Al = Ol.hasOwnProperty;
function Sl(e, t) {
  var r = bl(e), a = !r && yl(e), n = !r && !a && $l(e), o = !r && !a && !n && Tl(e), s = r || a || n || o, i = s ? _l(e.length, String) : [], l = i.length;
  for (var u in e)
    (t || Al.call(e, u)) && !(s && (u == "length" || n && (u == "offset" || u == "parent") || o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || ml(u, l))) && i.push(u);
  return i;
}
var xl = Sl;
function Cl(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var wl = Cl, Pl = g, jl = ke, Il = wl, Ml = Object.prototype, Fl = Ml.hasOwnProperty;
function Dl(e) {
  if (!Pl(e))
    return Il(e);
  var t = jl(e), r = [];
  for (var a in e)
    a == "constructor" && (t || !Fl.call(e, a)) || r.push(a);
  return r;
}
var Ll = Dl, El = xl, Gl = Ll, Bl = W;
function zl(e) {
  return Bl(e) ? El(e, !0) : Gl(e);
}
var Ze = zl, Nl = pl, Rl = Ze;
function Hl(e) {
  return Nl(e, Rl(e));
}
var Ul = Hl, Te = Ue, Kl = H.exports, kl = Xo, Vl = Jo, ql = cs, Oe = G, Ae = h, Xl = _s, Zl = w.exports, Jl = V, Yl = g, Wl = Ps, Ql = qe, Se = Xe, eu = Ul;
function tu(e, t, r, a, n, o, s) {
  var i = Se(e, r), l = Se(t, r), u = s.get(l);
  if (u) {
    Te(e, r, u);
    return;
  }
  var f = o ? o(i, l, r + "", e, t, s) : void 0, p = f === void 0;
  if (p) {
    var _ = Ae(l), B = !_ && Zl(l), Q = !_ && !B && Ql(l);
    f = l, _ || B || Q ? Ae(i) ? f = i : Xl(i) ? f = Vl(i) : B ? (p = !1, f = Kl(l, !0)) : Q ? (p = !1, f = kl(l, !0)) : f = [] : Wl(l) || Oe(l) ? (f = i, Oe(i) ? f = eu(i) : (!Yl(i) || Jl(i)) && (f = ql(l))) : p = !1;
  }
  p && (s.set(l, f), n(f, l, a, o, s), s.delete(l)), Te(e, r, f);
}
var ru = tu, au = Mo, nu = Ue, iu = No, ou = ru, su = g, lu = Ze, uu = Xe;
function Je(e, t, r, a, n) {
  e !== t && iu(t, function(o, s) {
    if (n || (n = new au()), su(o))
      ou(e, t, s, r, Je, a, n);
    else {
      var i = a ? a(uu(e, s), o, s + "", e, t, n) : void 0;
      i === void 0 && (i = o), nu(e, s, i);
    }
  }, lu);
}
var cu = Je, fu = Re, vu = Ne, du = He;
function pu(e, t) {
  return du(vu(e, t, fu), e + "");
}
var gu = pu, hu = I, _u = W, yu = E, bu = g;
function $u(e, t, r) {
  if (!bu(r))
    return !1;
  var a = typeof t;
  return (a == "number" ? _u(r) && yu(t, r.length) : a == "string" && t in r) ? hu(r[t], e) : !1;
}
var mu = $u, Tu = gu, Ou = mu;
function Au(e) {
  return Tu(function(t, r) {
    var a = -1, n = r.length, o = n > 1 ? r[n - 1] : void 0, s = n > 2 ? r[2] : void 0;
    for (o = e.length > 3 && typeof o == "function" ? (n--, o) : void 0, s && Ou(r[0], r[1], s) && (o = n < 3 ? void 0 : o, n = 1), t = Object(t); ++a < n; ) {
      var i = r[a];
      i && e(t, i, a, o);
    }
    return t;
  });
}
var Su = Au, xu = cu, Cu = Su, wu = Cu(function(e, t, r) {
  xu(e, t, r);
}), Pu = wu;
function Ye(e, t) {
  Object.keys(e).forEach((r) => {
    typeof e[r] == "function" ? e[r].name === "render" ? tt(e[r]) : e[r] = C(e[r].bind(null, t)) : typeof e[r] == "object" && Ye(e[r], t);
  });
}
const ju = (e, t) => {
  const r = Pu({}, t);
  return Ye(r, e), et(r);
}, Iu = "default", Mu = "sm", Fu = ({ props: e }) => ({
  xs: "rounded-sm",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full"
})[e.rounded];
var v = /* @__PURE__ */ ((e) => (e.xs = "xs", e.sm = "sm", e.md = "md", e.lg = "lg", e.xl = "xl", e))(v || {});
const Du = "sm", Lu = {
  size: {
    type: String,
    default: Du
  }
}, Eu = {
  rounded: {
    type: String,
    default: Mu
  }
}, xe = {
  to: {
    type: [String, Object],
    default: void 0
  }
}, Gu = {
  variant: {
    type: String,
    default: Iu
  }
}, Bu = {
  name: {
    type: String,
    default: void 0
  }
}, zu = {
  formaction: {
    type: String,
    default: void 0
  }
}, Nu = {
  form: {
    type: String,
    default: void 0
  }
}, Ru = {
  disabled: {
    type: Boolean,
    default: void 0
  }
}, Hu = {
  autofocus: {
    type: Boolean,
    default: void 0
  }
}, Uu = {
  href: {
    type: String,
    default: void 0
  }
}, Ku = {
  download: {
    type: String,
    default: void 0
  }
}, ku = {
  hreflang: {
    type: String,
    default: void 0
  }
}, We = {
  target: {
    type: String,
    default: void 0,
    validator: (e) => [
      "_blank",
      "_self",
      "_parent",
      "_top",
      "framename"
    ].includes(e)
  }
}, Vu = {
  rel: {
    type: String,
    default: void 0,
    validator: (e) => [
      "alternate",
      "author",
      "bookmark",
      "external",
      "help",
      "license",
      "next",
      "nofollow",
      "noopener",
      "noreferrer",
      "prev",
      "search",
      "tag"
    ].includes(e)
  }
}, Ce = {
  ...Hu,
  ...Ru,
  ...Nu,
  ...zu,
  formenctype: {
    type: String,
    default: void 0,
    validator: (e) => [
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain"
    ].includes(e)
  },
  formtarget: We.target,
  ...Bu,
  type: {
    type: String,
    default: void 0,
    validator: (e) => [
      "button",
      "reset",
      "submit"
    ].includes(e)
  },
  value: {
    type: String,
    default: void 0
  }
}, we = {
  ...Ku,
  ...Uu,
  ...ku,
  media: {
    type: String,
    default: void 0
  },
  ping: {
    type: String,
    default: void 0
  },
  referrerpolicy: {
    type: String,
    default: void 0,
    validator: (e) => [
      "no-referrer",
      "no-referrer-when-downgrade",
      "origin",
      "origin-when-cross-origin",
      "same-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ].includes(e)
  },
  ...Vu,
  ...We,
  type: {
    type: String,
    default: void 0
  }
}, Pe = ["false", "true"];
function qu(e) {
  return e ? Pe[0] : Pe[1];
}
const Xu = ["a", "nuxt-link", "router-link", "button", "div", "span"], Zu = {
  tag: {
    type: String,
    default: void 0,
    validator: (e) => Xu.includes(e)
  },
  loading: {
    type: Boolean,
    default: !1
  },
  block: {
    type: Boolean,
    default: !1
  },
  toggle: {
    type: Boolean,
    default: void 0
  }
};
function Ju(e, t) {
  return R(), rt("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    at("path", {
      "fill-rule": "evenodd",
      d: "M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z",
      "clip-rule": "evenodd"
    })
  ]);
}
const Qe = {
  class: ({ props: e }) => `inline-flex transition ease-in-out duration-150 items-center justify-center border disabled:cursor-not-allowed focus:outline-none focus:shadow-outline ${e.block ? "flex w-full" : "inline-flex"}`,
  variants: {
    default: "bg-blue-100 text-blue-900",
    outline: "",
    text: ""
  },
  rounded: Fu,
  variant: ({ props: e }) => Qe.variants[e.variant],
  size: ({ props: e }) => ({
    [v.xs]: "px-2 py-2 text-xs leading-4",
    [v.sm]: "px-3 py-2 text-sm leading-4",
    [v.md]: "px-4 py-2 text-sm leading-5",
    [v.lg]: "px-4 py-2 text-base leading-6",
    [v.xl]: "px-6 py-3 text-base leading-6"
  })[e.size],
  loading: {
    fixed: "ml-3 animate-spin",
    size: ({ props: e }) => ({
      [v.xs]: "h-4 w-4",
      [v.sm]: "h-4 w-4",
      [v.md]: "h-5 w-5",
      [v.lg]: "h-6 w-6",
      [v.xl]: "h-6 w-6"
    })[e.size],
    icon: Ju
  }
}, Yu = /* @__PURE__ */ nt({
  __name: "Button",
  props: {
    ...Lu,
    ...we,
    ...xe,
    ...Ce,
    ...Gu,
    ...Eu,
    ...Zu
  },
  setup(e) {
    const t = e, r = C(() => {
      if (t.type)
        return t.type;
      if (t.href)
        return "a";
      if (t.to) {
        const s = it("nuxt-link");
        return typeof s != "string" ? s : "router-link";
      }
      return "button";
    }), a = C(() => {
      switch (r.value?.name || r.value) {
        case "a":
          return N(t, Object.keys(we));
        case "router-link":
        case "NuxtLink":
        case "nuxt-link":
          return N(t, Object.keys(xe));
        default:
          return {
            disabled: t.disabled || t.loading,
            type: t.type,
            ...N(t, Object.keys(Ce)),
            "aria-disabled": qu(t.disabled)
          };
      }
    }), n = ju({
      props: t
    }, Qe), o = C(() => typeof n.loading.icon == "string" ? "div" : n.loading.icon);
    return (s, i) => (R(), ee(te(d(r)), ot(d(a), {
      class: [d(n).class, d(n).size, d(n).variant, d(n).rounded]
    }), {
      default: st(() => [
        lt(s.$slots, "default"),
        s.loading ? (R(), ee(te(d(o)), {
          key: 0,
          class: ut([d(n).loading.fixed, d(n).loading.size]),
          role: "alert",
          "aria-busy": "true"
        }, null, 8, ["class"])) : ct("", !0)
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), K = { DwButton: Yu }, Wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K
}, Symbol.toStringTag, { value: "Module" })), ec = {
  install(e) {
    console.log("components :>> ", Wu);
    for (const t in K) {
      const r = K[t];
      e.component(r.__name, r);
    }
  }
};
export {
  ec as uiVue
};
