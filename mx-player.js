//#region \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), t = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var ee = Array.isArray;
	function S() {}
	var C = {
		H: null,
		A: null,
		T: null,
		S: null
	}, te = Object.prototype.hasOwnProperty;
	function ne(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function re(e, t) {
		return ne(e.type, t, e.props);
	}
	function ie(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ae(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var oe = /\/+/g;
	function se(e, t) {
		return typeof e == "object" && e && e.key != null ? ae("" + e.key) : t.toString(36);
	}
	function ce(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(S, S) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function w(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, w(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + se(e, 0) : a, ee(o) ? (i = "", c != null && (i = c.replace(oe, "$&/") + "/"), w(o, r, i, "", function(e) {
			return e;
		})) : o != null && (ie(o) && (o = re(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(oe, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ee(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + se(a, u), c += w(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + se(a, u++), c += w(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return w(ce(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function le(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return w(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ue(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var T = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, E = {
		map: le,
		forEach: function(e, t, n) {
			le(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return le(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return le(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!ie(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = E, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return C.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !te.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return ne(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) te.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return ne(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = ie, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ue
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = C.T, n = {};
		C.T = n;
		try {
			var r = e(), i = C.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(S, T);
		} catch (e) {
			T(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), C.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return C.H.useCacheRefresh();
	}, e.use = function(e) {
		return C.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return C.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return C.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return C.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return C.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return C.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return C.H.useEffectEvent(e);
	}, e.useId = function() {
		return C.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return C.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return C.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return C.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return C.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return C.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return C.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return C.H.useRef(e);
	}, e.useState = function(e) {
		return C.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return C.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return C.H.useTransition();
	}, e.version = "19.2.8";
})), n = /* @__PURE__ */ e(((e, n) => {
	n.exports = t();
})), r = /* @__PURE__ */ e(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, ee || (ee = !0, ie());
		else {
			var t = n(l);
			t !== null && se(x, t.startTime - e);
		}
	}
	var ee = !1, S = -1, C = 5, te = -1;
	function ne() {
		return g ? !0 : !(e.unstable_now() - te < C);
	}
	function re() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			te = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(S), S = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ne());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && se(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
				}
			} finally {
				i ? ie() : ee = !1;
			}
		}
	}
	var ie;
	if (typeof y == "function") ie = function() {
		y(re);
	};
	else if (typeof MessageChannel < "u") {
		var ae = new MessageChannel(), oe = ae.port2;
		ae.port1.onmessage = re, ie = function() {
			oe.postMessage(null);
		};
	} else ie = function() {
		_(re, 0);
	};
	function se(t, n) {
		S = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(S), S = -1) : h = !0, se(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, ie()))), r;
	}, e.unstable_shouldYield = ne, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), i = /* @__PURE__ */ e(((e, t) => {
	t.exports = r();
})), a = /* @__PURE__ */ e(((e) => {
	var t = n();
	function r(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function i() {}
	var a = {
		d: {
			f: i,
			r: function() {
				throw Error(r(522));
			},
			D: i,
			C: i,
			L: i,
			m: i,
			X: i,
			S: i,
			M: i
		},
		p: 0,
		findDOMNode: null
	}, o = Symbol.for("react.portal");
	function s(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: o,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function l(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, e.createPortal = function(e, t) {
		var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(r(299));
		return s(e, t, null, n);
	}, e.flushSync = function(e) {
		var t = c.T, n = a.p;
		try {
			if (c.T = null, a.p = 2, e) return e();
		} finally {
			c.T = t, a.p = n, a.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, a.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && a.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin), i = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? a.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: i,
				fetchPriority: o
			}) : n === "script" && a.d.X(e, {
				crossOrigin: r,
				integrity: i,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = l(t.as, t.crossOrigin);
				a.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? a.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin);
			a.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = l(t.as, t.crossOrigin);
			a.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else a.d.m(e);
	}, e.requestFormReset = function(e) {
		a.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return c.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return c.H.useHostTransitionStatus();
	}, e.version = "19.2.8";
})), o = /* @__PURE__ */ e(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = a();
})), s = /* @__PURE__ */ e(((e) => {
	var t = i(), r = n(), a = o();
	function s(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function c(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function l(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function u(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function d(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function f(e) {
		if (l(e) !== e) throw Error(s(188));
	}
	function p(e) {
		var t = e.alternate;
		if (!t) {
			if (t = l(e), t === null) throw Error(s(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var i = n.return;
			if (i === null) break;
			var a = i.alternate;
			if (a === null) {
				if (r = i.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (i.child === a.child) {
				for (a = i.child; a;) {
					if (a === n) return f(i), e;
					if (a === r) return f(i), t;
					a = a.sibling;
				}
				throw Error(s(188));
			}
			if (n.return !== r.return) n = i, r = a;
			else {
				for (var o = !1, c = i.child; c;) {
					if (c === n) {
						o = !0, n = i, r = a;
						break;
					}
					if (c === r) {
						o = !0, r = i, n = a;
						break;
					}
					c = c.sibling;
				}
				if (!o) {
					for (c = a.child; c;) {
						if (c === n) {
							o = !0, n = a, r = i;
							break;
						}
						if (c === r) {
							o = !0, r = a, n = i;
							break;
						}
						c = c.sibling;
					}
					if (!o) throw Error(s(189));
				}
			}
			if (n.alternate !== r) throw Error(s(190));
		}
		if (n.tag !== 3) throw Error(s(188));
		return n.stateNode.current === n ? e : t;
	}
	function m(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = m(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), re = Symbol.for("react.memo"), ie = Symbol.for("react.lazy"), ae = Symbol.for("react.activity"), oe = Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
	function ce(e) {
		return typeof e != "object" || !e ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var w = Symbol.for("react.client.reference");
	function le(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === w ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case te: return "Suspense";
			case ne: return "SuspenseList";
			case ae: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case S: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case C:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case re: return t = e.displayName || null, t === null ? le(e.type) || "Memo" : t;
			case ie:
				t = e._payload, e = e._init;
				try {
					return le(e(t));
				} catch {}
		}
		return null;
	}
	var ue = Array.isArray, T = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, E = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, fe = [], pe = -1;
	function D(e) {
		return { current: e };
	}
	function me(e) {
		0 > pe || (e.current = fe[pe], fe[pe] = null, pe--);
	}
	function O(e, t) {
		pe++, fe[pe] = e.current, e.current = t;
	}
	var he = D(null), ge = D(null), _e = D(null), ve = D(null);
	function ye(e, t) {
		switch (O(_e, t), O(ge, e), O(he, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		me(he), O(he, e);
	}
	function be() {
		me(he), me(ge), me(_e);
	}
	function xe(e) {
		e.memoizedState !== null && O(ve, e);
		var t = he.current, n = Hd(t, e.type);
		t !== n && (O(ge, e), O(he, n));
	}
	function Se(e) {
		ge.current === e && (me(he), me(ge)), ve.current === e && (me(ve), Qf._currentValue = de);
	}
	var Ce, we;
	function k(e) {
		if (Ce === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Ce = t && t[1] || "", we = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Ce + e + we;
	}
	var Te = !1;
	function Ee(e, t) {
		if (!e || Te) return "";
		Te = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Te = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? k(n) : "";
	}
	function De(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return k(e.type);
			case 16: return k("Lazy");
			case 13: return e.child !== t && t !== null ? k("Suspense Fallback") : k("Suspense");
			case 19: return k("SuspenseList");
			case 0:
			case 15: return Ee(e.type, !1);
			case 11: return Ee(e.type.render, !1);
			case 1: return Ee(e.type, !0);
			case 31: return k("Activity");
			default: return "";
		}
	}
	function Oe(e) {
		try {
			var t = "", n = null;
			do
				t += De(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var ke = Object.prototype.hasOwnProperty, Ae = t.unstable_scheduleCallback, je = t.unstable_cancelCallback, Me = t.unstable_shouldYield, Ne = t.unstable_requestPaint, Pe = t.unstable_now, Fe = t.unstable_getCurrentPriorityLevel, Ie = t.unstable_ImmediatePriority, Le = t.unstable_UserBlockingPriority, Re = t.unstable_NormalPriority, ze = t.unstable_LowPriority, Be = t.unstable_IdlePriority, Ve = t.log, He = t.unstable_setDisableYieldValue, Ue = null, A = null;
	function We(e) {
		if (typeof Ve == "function" && He(e), A && typeof A.setStrictMode == "function") try {
			A.setStrictMode(Ue, e);
		} catch {}
	}
	var Ge = Math.clz32 ? Math.clz32 : Je, Ke = Math.log, qe = Math.LN2;
	function Je(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ke(e) / qe | 0) | 0;
	}
	var Ye = 256, Xe = 262144, Ze = 4194304;
	function Qe(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function $e(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Qe(n))) : i = Qe(o) : i = Qe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Qe(n))) : i = Qe(o)) : i = Qe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function et(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function tt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function nt() {
		var e = Ze;
		return Ze <<= 1, !(Ze & 62914560) && (Ze = 4194304), e;
	}
	function rt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function it(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function at(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ge(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ot(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ot(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ge(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function st(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ge(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function j(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ct(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function ct(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function lt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function ut() {
		var e = E.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function dt(e, t) {
		var n = E.p;
		try {
			return E.p = e, t();
		} finally {
			E.p = n;
		}
	}
	var ft = Math.random().toString(36).slice(2), pt = "__reactFiber$" + ft, mt = "__reactProps$" + ft, ht = "__reactContainer$" + ft, gt = "__reactEvents$" + ft, _t = "__reactListeners$" + ft, vt = "__reactHandles$" + ft, yt = "__reactResources$" + ft, bt = "__reactMarker$" + ft;
	function xt(e) {
		delete e[pt], delete e[mt], delete e[gt], delete e[_t], delete e[vt];
	}
	function St(e) {
		var t = e[pt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ht] || n[pt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[pt]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Ct(e) {
		if (e = e[pt] || e[ht]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function wt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(s(33));
	}
	function Tt(e) {
		var t = e[yt];
		return t ||= e[yt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function M(e) {
		e[bt] = !0;
	}
	var Et = /* @__PURE__ */ new Set(), Dt = {};
	function Ot(e, t) {
		kt(e, t), kt(e + "Capture", t);
	}
	function kt(e, t) {
		for (Dt[e] = t, e = 0; e < t.length; e++) Et.add(t[e]);
	}
	var At = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), jt = {}, Mt = {};
	function Nt(e) {
		return ke.call(Mt, e) ? !0 : ke.call(jt, e) ? !1 : At.test(e) ? Mt[e] = !0 : (jt[e] = !0, !1);
	}
	function Pt(e, t, n) {
		if (Nt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Ft(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function It(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Lt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Rt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function zt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Bt(e) {
		if (!e._valueTracker) {
			var t = Rt(e) ? "checked" : "value";
			e._valueTracker = zt(e, t, "" + e[t]);
		}
	}
	function Vt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Rt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Ht(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Ut = /[\n"\\]/g;
	function Wt(e) {
		return e.replace(Ut, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Gt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Lt(t)) : e.value !== "" + Lt(t) && (e.value = "" + Lt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : qt(e, o, Lt(n)) : qt(e, o, Lt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Lt(s) : e.removeAttribute("name");
	}
	function Kt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Bt(e);
				return;
			}
			n = n == null ? "" : "" + Lt(n), t = t == null ? n : "" + Lt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Bt(e);
	}
	function qt(e, t, n) {
		t === "number" && Ht(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Jt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Lt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Yt(e, t, n) {
		if (t != null && (t = "" + Lt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Lt(n);
	}
	function Xt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(s(92));
				if (ue(r)) {
					if (1 < r.length) throw Error(s(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Lt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Bt(e);
	}
	function Zt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Qt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function $t(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Qt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function en(e, t, n) {
		if (t != null && typeof t != "object") throw Error(s(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var i in t) r = t[i], t.hasOwnProperty(i) && n[i] !== r && $t(e, i, r);
		} else for (var a in t) t.hasOwnProperty(a) && $t(e, a, t[a]);
	}
	function tn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var nn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), rn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function an(e) {
		return rn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function on() {}
	var sn = null;
	function cn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var ln = null, un = null;
	function dn(e) {
		var t = Ct(e);
		if (t && (e = t.stateNode)) {
			var n = e[mt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Gt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Wt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var i = r[mt] || null;
								if (!i) throw Error(s(90));
								Gt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Vt(r);
					}
					break a;
				case "textarea":
					Yt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Jt(e, !!n.multiple, t, !1);
			}
		}
	}
	var fn = !1;
	function pn(e, t, n) {
		if (fn) return e(t, n);
		fn = !0;
		try {
			return e(t);
		} finally {
			if (fn = !1, (ln !== null || un !== null) && (bu(), ln && (t = ln, e = un, un = ln = null, dn(t), e))) for (t = 0; t < e.length; t++) dn(e[t]);
		}
	}
	function mn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[mt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(s(231, t, typeof n));
		return n;
	}
	var hn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), gn = !1;
	if (hn) try {
		var _n = {};
		Object.defineProperty(_n, "passive", { get: function() {
			gn = !0;
		} }), window.addEventListener("test", _n, _n), window.removeEventListener("test", _n, _n);
	} catch {
		gn = !1;
	}
	var vn = null, yn = null, bn = null;
	function xn() {
		if (bn) return bn;
		var e, t = yn, n = t.length, r, i = "value" in vn ? vn.value : vn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return bn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Sn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Cn() {
		return !0;
	}
	function wn() {
		return !1;
	}
	function Tn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Cn : wn, this.isPropagationStopped = wn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Cn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Cn);
			},
			persist: function() {},
			isPersistent: Cn
		}), t;
	}
	var En = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Dn = Tn(En), On = h({}, En, {
		view: 0,
		detail: 0
	}), kn = Tn(On), An, jn, Mn, Nn = h({}, On, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Wn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Mn && (Mn && e.type === "mousemove" ? (An = e.screenX - Mn.screenX, jn = e.screenY - Mn.screenY) : jn = An = 0, Mn = e), An);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : jn;
		}
	}), Pn = Tn(Nn), Fn = Tn(h({}, Nn, { dataTransfer: 0 })), In = Tn(h({}, On, { relatedTarget: 0 })), Ln = Tn(h({}, En, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Rn = Tn(h({}, En, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), zn = Tn(h({}, En, { data: 0 })), Bn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Vn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Hn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Un(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Hn[e]) ? !!t[e] : !1;
	}
	function Wn() {
		return Un;
	}
	var Gn = Tn(h({}, On, {
		key: function(e) {
			if (e.key) {
				var t = Bn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Sn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Vn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Wn,
		charCode: function(e) {
			return e.type === "keypress" ? Sn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Sn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Kn = Tn(h({}, Nn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), qn = Tn(h({}, On, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Wn
	})), Jn = Tn(h({}, En, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Yn = Tn(h({}, Nn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Xn = Tn(h({}, En, {
		newState: 0,
		oldState: 0
	})), Zn = [
		9,
		13,
		27,
		32
	], Qn = hn && "CompositionEvent" in window, $n = null;
	hn && "documentMode" in document && ($n = document.documentMode);
	var er = hn && "TextEvent" in window && !$n, tr = hn && (!Qn || $n && 8 < $n && 11 >= $n), nr = " ", rr = !1;
	function ir(e, t) {
		switch (e) {
			case "keyup": return Zn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function ar(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var or = !1;
	function sr(e, t) {
		switch (e) {
			case "compositionend": return ar(t);
			case "keypress": return t.which === 32 ? (rr = !0, nr) : null;
			case "textInput": return e = t.data, e === nr && rr ? null : e;
			default: return null;
		}
	}
	function cr(e, t) {
		if (or) return e === "compositionend" || !Qn && ir(e, t) ? (e = xn(), bn = yn = vn = null, or = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return tr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var lr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function ur(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!lr[e.type] : t === "textarea";
	}
	function dr(e, t, n, r) {
		ln ? un ? un.push(r) : un = [r] : ln = r, t = Ed(t, "onChange"), 0 < t.length && (n = new Dn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var fr = null, pr = null;
	function mr(e) {
		yd(e, 0);
	}
	function hr(e) {
		if (Vt(wt(e))) return e;
	}
	function gr(e, t) {
		if (e === "change") return t;
	}
	var _r = !1;
	if (hn) {
		var vr;
		if (hn) {
			var yr = "oninput" in document;
			if (!yr) {
				var br = document.createElement("div");
				br.setAttribute("oninput", "return;"), yr = typeof br.oninput == "function";
			}
			vr = yr;
		} else vr = !1;
		_r = vr && (!document.documentMode || 9 < document.documentMode);
	}
	function xr() {
		fr && (fr.detachEvent("onpropertychange", Sr), pr = fr = null);
	}
	function Sr(e) {
		if (e.propertyName === "value" && hr(pr)) {
			var t = [];
			dr(t, pr, e, cn(e)), pn(mr, t);
		}
	}
	function Cr(e, t, n) {
		e === "focusin" ? (xr(), fr = t, pr = n, fr.attachEvent("onpropertychange", Sr)) : e === "focusout" && xr();
	}
	function wr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return hr(pr);
	}
	function Tr(e, t) {
		if (e === "click") return hr(t);
	}
	function Er(e, t) {
		if (e === "input" || e === "change") return hr(t);
	}
	function Dr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Or = typeof Object.is == "function" ? Object.is : Dr;
	function kr(e, t) {
		if (Or(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!ke.call(t, i) || !Or(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Ar(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function jr(e, t) {
		var n = Ar(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Ar(n);
		}
	}
	function Mr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Mr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Nr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Ht(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ht(e.document);
		}
		return t;
	}
	function Pr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Fr = hn && "documentMode" in document && 11 >= document.documentMode, Ir = null, Lr = null, Rr = null, zr = !1;
	function Br(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		zr || Ir == null || Ir !== Ht(r) || (r = Ir, "selectionStart" in r && Pr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Rr && kr(Rr, r) || (Rr = r, r = Ed(Lr, "onSelect"), 0 < r.length && (t = new Dn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Ir)));
	}
	function Vr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Hr = {
		animationend: Vr("Animation", "AnimationEnd"),
		animationiteration: Vr("Animation", "AnimationIteration"),
		animationstart: Vr("Animation", "AnimationStart"),
		transitionrun: Vr("Transition", "TransitionRun"),
		transitionstart: Vr("Transition", "TransitionStart"),
		transitioncancel: Vr("Transition", "TransitionCancel"),
		transitionend: Vr("Transition", "TransitionEnd")
	}, Ur = {}, Wr = {};
	hn && (Wr = document.createElement("div").style, "AnimationEvent" in window || (delete Hr.animationend.animation, delete Hr.animationiteration.animation, delete Hr.animationstart.animation), "TransitionEvent" in window || delete Hr.transitionend.transition);
	function Gr(e) {
		if (Ur[e]) return Ur[e];
		if (!Hr[e]) return e;
		var t = Hr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Wr) return Ur[e] = t[n];
		return e;
	}
	var Kr = Gr("animationend"), qr = Gr("animationiteration"), Jr = Gr("animationstart"), Yr = Gr("transitionrun"), Xr = Gr("transitionstart"), Zr = Gr("transitioncancel"), Qr = Gr("transitionend"), $r = /* @__PURE__ */ new Map(), ei = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ei.push("scrollEnd");
	function ti(e, t) {
		$r.set(e, t), Ot(t, [e]);
	}
	var ni = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ri = [], ii = 0, ai = 0;
	function oi() {
		for (var e = ii, t = ai = ii = 0; t < e;) {
			var n = ri[t];
			ri[t++] = null;
			var r = ri[t];
			ri[t++] = null;
			var i = ri[t];
			ri[t++] = null;
			var a = ri[t];
			if (ri[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ui(n, i, a);
		}
	}
	function si(e, t, n, r) {
		ri[ii++] = e, ri[ii++] = t, ri[ii++] = n, ri[ii++] = r, ai |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ci(e, t, n, r) {
		return si(e, t, n, r), di(e);
	}
	function li(e, t) {
		return si(e, null, null, t), di(e);
	}
	function ui(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ge(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function di(e) {
		if (50 < du) throw du = 0, fu = null, Error(s(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var fi = {};
	function pi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function mi(e, t, n, r) {
		return new pi(e, t, n, r);
	}
	function hi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function gi(e, t) {
		var n = e.alternate;
		return n === null ? (n = mi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function _i(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function vi(e, t, n, r, i, a) {
		var o = 0;
		if (r = e, typeof e == "function") hi(e) && (o = 1);
		else if (typeof e == "string") o = Uf(e, n, he.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ae: return e = mi(31, n, t, i), e.elementType = ae, e.lanes = a, e;
			case y: return yi(n.children, i, a, t);
			case b:
				o = 8, i |= 24;
				break;
			case x: return e = mi(12, n, t, i | 2), e.elementType = x, e.lanes = a, e;
			case te: return e = mi(13, n, t, i), e.elementType = te, e.lanes = a, e;
			case ne: return e = mi(19, n, t, i), e.elementType = ne, e.lanes = a, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case S:
						o = 10;
						break a;
					case ee:
						o = 9;
						break a;
					case C:
						o = 11;
						break a;
					case re:
						o = 14;
						break a;
					case ie:
						o = 16, r = null;
						break a;
				}
				o = 29, n = Error(s(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = mi(o, n, t, i), t.elementType = e, t.type = r, t.lanes = a, t;
	}
	function yi(e, t, n, r) {
		return e = mi(7, e, r, t), e.lanes = n, e;
	}
	function bi(e, t, n) {
		return e = mi(6, e, null, t), e.lanes = n, e;
	}
	function xi(e) {
		var t = mi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Si(e, t, n) {
		return t = mi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ci = /* @__PURE__ */ new WeakMap();
	function wi(e, t) {
		if (typeof e == "object" && e) {
			var n = Ci.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Oe(t)
			}, Ci.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Oe(t)
		};
	}
	var Ti = [], Ei = 0, Di = null, Oi = 0, ki = [], Ai = 0, ji = null, Mi = 1, Ni = "";
	function Pi(e, t) {
		Ti[Ei++] = Oi, Ti[Ei++] = Di, Di = e, Oi = t;
	}
	function Fi(e, t, n) {
		ki[Ai++] = Mi, ki[Ai++] = Ni, ki[Ai++] = ji, ji = e;
		var r = Mi;
		e = Ni;
		var i = 32 - Ge(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ge(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Mi = 1 << 32 - Ge(t) + i | n << i | r, Ni = a + e;
		} else Mi = 1 << a | n << i | r, Ni = e;
	}
	function Ii(e) {
		e.return !== null && (Pi(e, 1), Fi(e, 1, 0));
	}
	function Li(e) {
		for (; e === Di;) Di = Ti[--Ei], Ti[Ei] = null, Oi = Ti[--Ei], Ti[Ei] = null;
		for (; e === ji;) ji = ki[--Ai], ki[Ai] = null, Ni = ki[--Ai], ki[Ai] = null, Mi = ki[--Ai], ki[Ai] = null;
	}
	function Ri(e, t) {
		ki[Ai++] = Mi, ki[Ai++] = Ni, ki[Ai++] = ji, Mi = t.id, Ni = t.overflow, ji = e;
	}
	var zi = null, N = null, P = !1, Bi = null, Vi = !1, Hi = Error(s(519));
	function Ui(e) {
		throw Yi(wi(Error(s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Hi;
	}
	function Wi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[pt] = e, t[mt] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Kt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Xt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = on), t = !0) : t = !1, t || Ui(e, !0);
	}
	function Gi(e) {
		for (zi = e.return; zi;) switch (zi.tag) {
			case 5:
			case 31:
			case 13:
				Vi = !1;
				return;
			case 27:
			case 3:
				Vi = !0;
				return;
			default: zi = zi.return;
		}
	}
	function Ki(e) {
		if (e !== zi) return !1;
		if (!P) return Gi(e), P = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Ud(e.type, e.memoizedProps)), n = !n), n && N && Ui(e), Gi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(317));
			N = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(317));
			N = uf(e);
		} else t === 27 ? (t = N, Zd(e.type) ? (e = lf, lf = null, N = e) : N = t) : N = zi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function qi() {
		N = zi = null, P = !1;
	}
	function Ji() {
		var e = Bi;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Bi = null), e;
	}
	function Yi(e) {
		Bi === null ? Bi = [e] : Bi.push(e);
	}
	var Xi = D(null), Zi = null, Qi = null;
	function $i(e, t, n) {
		O(Xi, t._currentValue), t._currentValue = n;
	}
	function ea(e) {
		e._currentValue = Xi.current, me(Xi);
	}
	function ta(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function na(e, t, n, r) {
		var i = e.child;
		for (i !== null && (i.return = e); i !== null;) {
			var a = i.dependencies;
			if (a !== null) {
				var o = i.child;
				a = a.firstContext;
				a: for (; a !== null;) {
					var c = a;
					a = i;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), ta(a.return, n, e), r || (o = null);
						break a;
					}
					a = c.next;
				}
			} else if (i.tag === 18) {
				if (o = i.return, o === null) throw Error(s(341));
				o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), ta(o, n, e), o = null;
			} else o = i.child;
			if (o !== null) o.return = i;
			else for (o = i; o !== null;) {
				if (o === e) {
					o = null;
					break;
				}
				if (i = o.sibling, i !== null) {
					i.return = o.return, o = i;
					break;
				}
				o = o.return;
			}
			i = o;
		}
	}
	function ra(e, t, n, r) {
		e = null;
		for (var i = t, a = !1; i !== null;) {
			if (!a) {
				if (i.flags & 524288) a = !0;
				else if (i.flags & 262144) break;
			}
			if (i.tag === 10) {
				var o = i.alternate;
				if (o === null) throw Error(s(387));
				if (o = o.memoizedProps, o !== null) {
					var c = i.type;
					Or(i.pendingProps.value, o.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (i === ve.current) {
				if (o = i.alternate, o === null) throw Error(s(387));
				o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			i = i.return;
		}
		e !== null && na(t, e, n, r), t.flags |= 262144;
	}
	function ia(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Or(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function aa(e) {
		Zi = e, Qi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function oa(e) {
		return ca(Zi, e);
	}
	function sa(e, t) {
		return Zi === null && aa(e), ca(e, t);
	}
	function ca(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Qi === null) {
			if (e === null) throw Error(s(308));
			Qi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Qi = Qi.next = t;
		return n;
	}
	var la = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ua = t.unstable_scheduleCallback, da = t.unstable_NormalPriority, F = {
		$$typeof: S,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function fa() {
		return {
			controller: new la(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function pa(e) {
		e.refCount--, e.refCount === 0 && ua(da, function() {
			e.controller.abort();
		});
	}
	var ma = null, ha = 0, ga = 0, _a = null;
	function va(e, t) {
		if (ma === null) {
			var n = ma = [];
			ha = 0, ga = dd(), _a = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ha++, t.then(ya, ya), t;
	}
	function ya() {
		if (--ha === 0 && ma !== null) {
			_a !== null && (_a.status = "fulfilled");
			var e = ma;
			ma = null, ga = 0, _a = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ba(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var xa = T.S;
	T.S = function(e, t) {
		eu = Pe(), typeof t == "object" && t && typeof t.then == "function" && va(e, t), xa !== null && xa(e, t);
	};
	var Sa = D(null);
	function Ca() {
		var e = Sa.current;
		return e === null ? K.pooledCache : e;
	}
	function wa(e, t) {
		t === null ? O(Sa, Sa.current) : O(Sa, t.pool);
	}
	function Ta() {
		var e = Ca();
		return e === null ? null : {
			parent: F._currentValue,
			pool: e
		};
	}
	var Ea = Error(s(460)), Da = Error(s(474)), Oa = Error(s(542)), ka = { then: function() {} };
	function Aa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ja(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(on, on), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Fa(e), e;
			default:
				if (typeof t.status == "string") t.then(on, on);
				else {
					if (e = K, e !== null && 100 < e.shellSuspendCounter) throw Error(s(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Fa(e), e;
				}
				throw Na = t, Ea;
		}
	}
	function Ma(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Na = e, Ea) : e;
		}
	}
	var Na = null;
	function Pa() {
		if (Na === null) throw Error(s(459));
		var e = Na;
		return Na = null, e;
	}
	function Fa(e) {
		if (e === Ea || e === Oa) throw Error(s(483));
	}
	var Ia = null, La = 0;
	function Ra(e) {
		var t = La;
		return La += 1, Ia === null && (Ia = []), ja(Ia, e, t);
	}
	function za(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ba(e, t) {
		throw t.$$typeof === g ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Va(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function i(e, t) {
			return e = gi(e, t), e.index = 0, e.sibling = null, e;
		}
		function a(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function o(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = bi(n, e.mode, r), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var a = n.type;
			return a === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === ie && Ma(a) === t.type) ? (t = i(t, n.props), za(t, n), t.return = e, t) : (t = vi(n.type, n.key, n.props, null, e.mode, r), za(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Si(n, e.mode, r), t.return = e, t) : (t = i(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, a) {
			return t === null || t.tag !== 7 ? (t = yi(n, e.mode, r, a), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = bi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = vi(t.type, t.key, t.props, null, e.mode, n), za(n, t), n.return = e, n;
					case v: return t = Si(t, e.mode, n), t.return = e, t;
					case ie: return t = Ma(t), f(e, t, n);
				}
				if (ue(t) || ce(t)) return t = yi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ra(t), n);
				if (t.$$typeof === S) return f(e, sa(e, t), n);
				Ba(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case ie: return n = Ma(n), p(e, t, n, r);
				}
				if (ue(n) || ce(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ra(n), r);
				if (n.$$typeof === S) return p(e, t, sa(e, n), r);
				Ba(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ie: return r = Ma(r), m(e, t, n, r, i);
				}
				if (ue(r) || ce(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ra(r), i);
				if (r.$$typeof === S) return m(e, t, n, sa(t, r), i);
				Ba(t, r);
			}
			return null;
		}
		function h(i, o, s, c) {
			for (var l = null, u = null, d = o, h = o = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), P && Pi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (o = a(d, o, h), u === null ? l = d : u.sibling = d, u = d);
				return P && Pi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), o = a(g, o, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), P && Pi(i, h), l;
		}
		function g(i, o, c, l) {
			if (c == null) throw Error(s(151));
			for (var u = null, d = null, h = o, g = o = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(i, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(i, h), o = a(y, o, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(i, h), P && Pi(i, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (o = a(v, o, g), d === null ? u = v : d.sibling = v, d = v);
				return P && Pi(i, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), o = a(v, o, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(i, e);
			}), P && Pi(i, g), u;
		}
		function b(e, r, a, c) {
			if (typeof a == "object" && a && a.type === y && a.key === null && (a = a.props.children), typeof a == "object" && a) {
				switch (a.$$typeof) {
					case _:
						a: {
							for (var l = a.key; r !== null;) {
								if (r.key === l) {
									if (l = a.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = i(r, a.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ie && Ma(l) === r.type) {
										n(e, r.sibling), c = i(r, a.props), za(c, a), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							a.type === y ? (c = yi(a.props.children, e.mode, c, a.key), c.return = e, e = c) : (c = vi(a.type, a.key, a.props, null, e.mode, c), za(c, a), c.return = e, e = c);
						}
						return o(e);
					case v:
						a: {
							for (l = a.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === a.containerInfo && r.stateNode.implementation === a.implementation) {
									n(e, r.sibling), c = i(r, a.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Si(a, e.mode, c), c.return = e, e = c;
						}
						return o(e);
					case ie: return a = Ma(a), b(e, r, a, c);
				}
				if (ue(a)) return h(e, r, a, c);
				if (ce(a)) {
					if (l = ce(a), typeof l != "function") throw Error(s(150));
					return a = l.call(a), g(e, r, a, c);
				}
				if (typeof a.then == "function") return b(e, r, Ra(a), c);
				if (a.$$typeof === S) return b(e, r, sa(e, a), c);
				Ba(e, a);
			}
			return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (a = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), c = i(r, a), c.return = e, e = c) : (n(e, r), c = bi(a, e.mode, c), c.return = e, e = c), o(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				La = 0;
				var i = b(e, t, n, r);
				return Ia = null, i;
			} catch (t) {
				if (t === Ea || t === Oa) throw t;
				var a = mi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ha = Va(!0), Ua = Va(!1), Wa = !1;
	function Ga(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Ka(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function qa(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ja(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, G & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = di(e), ui(e, null, n), t;
		}
		return si(e, r, t, n), di(e);
	}
	function Ya(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	function Xa(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Za = !1;
	function Qa() {
		if (Za) {
			var e = _a;
			if (e !== null) throw e;
		}
	}
	function $a(e, t, n, r) {
		Za = !1;
		var i = e.updateQueue;
		Wa = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (J & f) === f : (r & f) === f) {
					f !== 0 && f === ga && (Za = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Wa = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function eo(e, t) {
		if (typeof e != "function") throw Error(s(191, e));
		e.call(t);
	}
	function to(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) eo(n[e], t);
	}
	var no = D(null), ro = D(0);
	function io(e, t) {
		e = Wl, O(ro, e), O(no, t), Wl = e | t.baseLanes;
	}
	function ao() {
		O(ro, Wl), O(no, no.current);
	}
	function oo() {
		Wl = ro.current, me(no), me(ro);
	}
	var so = D(null), co = null;
	function lo(e) {
		var t = e.alternate;
		O(I, I.current & 1), O(so, e), co === null && (t === null || no.current !== null || t.memoizedState !== null) && (co = e);
	}
	function uo(e) {
		O(I, I.current), O(so, e), co === null && (co = e);
	}
	function fo(e) {
		e.tag === 22 ? (O(I, I.current), O(so, e), co === null && (co = e)) : po(e);
	}
	function po() {
		O(I, I.current), O(so, so.current);
	}
	function mo(e) {
		me(so), co === e && (co = null), me(I);
	}
	var I = D(0);
	function ho(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var go = 0, L = null, R = null, z = null, _o = !1, vo = !1, yo = !1, bo = 0, xo = 0, So = null, Co = 0;
	function B() {
		throw Error(s(321));
	}
	function wo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Or(e[n], t[n])) return !1;
		return !0;
	}
	function To(e, t, n, r, i, a) {
		return go = a, L = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, T.H = e === null || e.memoizedState === null ? Vs : Hs, yo = !1, a = n(r, i), yo = !1, vo && (a = Do(t, n, r, i)), Eo(e), a;
	}
	function Eo(e) {
		T.H = Bs;
		var t = R !== null && R.next !== null;
		if (go = 0, z = R = L = null, _o = !1, xo = 0, So = null, t) throw Error(s(300));
		e === null || H || (e = e.dependencies, e !== null && ia(e) && (H = !0));
	}
	function Do(e, t, n, r) {
		L = e;
		var i = 0;
		do {
			if (vo && (So = null), xo = 0, vo = !1, 25 <= i) throw Error(s(301));
			if (i += 1, z = R = null, e.updateQueue != null) {
				var a = e.updateQueue;
				a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
			}
			T.H = Us, a = t(n, r);
		} while (vo);
		return a;
	}
	function Oo() {
		var e = T.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Po(t) : t, e = e.useState()[0], (R === null ? null : R.memoizedState) !== e && (L.flags |= 1024), t;
	}
	function ko() {
		var e = bo !== 0;
		return bo = 0, e;
	}
	function Ao(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function jo(e) {
		if (_o) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			_o = !1;
		}
		go = 0, z = R = L = null, vo = !1, xo = bo = 0, So = null;
	}
	function Mo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return z === null ? L.memoizedState = z = e : z = z.next = e, z;
	}
	function V() {
		if (R === null) {
			var e = L.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = R.next;
		var t = z === null ? L.memoizedState : z.next;
		if (t !== null) z = t, R = e;
		else {
			if (e === null) throw L.alternate === null ? Error(s(467)) : Error(s(310));
			R = e, e = {
				memoizedState: R.memoizedState,
				baseState: R.baseState,
				baseQueue: R.baseQueue,
				queue: R.queue,
				next: null
			}, z === null ? L.memoizedState = z = e : z = z.next = e;
		}
		return z;
	}
	function No() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Po(e) {
		var t = xo;
		return xo += 1, So === null && (So = []), e = ja(So, e, t), t = L, (z === null ? t.memoizedState : z.next) === null && (t = t.alternate, T.H = t === null || t.memoizedState === null ? Vs : Hs), e;
	}
	function Fo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Po(e);
			if (e.$$typeof === S) return oa(e);
		}
		throw Error(s(438, String(e)));
	}
	function Io(e) {
		var t = null, n = L.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = L.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = No(), L.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = oe;
		return t.index++, n;
	}
	function Lo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Ro(e) {
		return zo(V(), R, e);
	}
	function zo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(s(311));
		r.lastRenderedReducer = n;
		var i = e.baseQueue, a = r.pending;
		if (a !== null) {
			if (i !== null) {
				var o = i.next;
				i.next = a.next, a.next = o;
			}
			t.baseQueue = i = a, r.pending = null;
		}
		if (a = e.baseState, i === null) e.memoizedState = a;
		else {
			t = i.next;
			var c = o = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (go & f) === f : (J & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ga && (d = !0);
					else if ((go & p) === p) {
						u = u.next, p === ga && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, o = a) : l = l.next = f, L.lanes |= p, Gl |= p;
					f = u.action, yo && n(a, f), a = u.hasEagerState ? u.eagerState : n(a, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, o = a) : l = l.next = p, L.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? o = a : l.next = c, !Or(a, e.memoizedState) && (H = !0, d && (n = _a, n !== null))) throw n;
			e.memoizedState = a, e.baseState = o, e.baseQueue = l, r.lastRenderedState = a;
		}
		return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Bo(e) {
		var t = V(), n = t.queue;
		if (n === null) throw Error(s(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, a = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var o = i = i.next;
			do
				a = e(a, o.action), o = o.next;
			while (o !== i);
			Or(a, t.memoizedState) || (H = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
		}
		return [a, r];
	}
	function Vo(e, t, n) {
		var r = L, i = V(), a = P;
		if (a) {
			if (n === void 0) throw Error(s(407));
			n = n();
		} else n = t();
		var o = !Or((R || i).memoizedState, n);
		if (o && (i.memoizedState = n, H = !0), i = i.queue, fs(Wo.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || z !== null && z.memoizedState.tag & 1) {
			if (r.flags |= 2048, ss(9, { destroy: void 0 }, Uo.bind(null, r, i, n, t), null), K === null) throw Error(s(349));
			a || go & 127 || Ho(r, t, n);
		}
		return n;
	}
	function Ho(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = L.updateQueue, t === null ? (t = No(), L.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Uo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Go(t) && Ko(e);
	}
	function Wo(e, t, n) {
		return n(function() {
			Go(t) && Ko(e);
		});
	}
	function Go(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Or(e, n);
		} catch {
			return !0;
		}
	}
	function Ko(e) {
		var t = li(e, 2);
		t !== null && hu(t, e, 2);
	}
	function qo(e) {
		var t = Mo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), yo) {
				We(!0);
				try {
					n();
				} finally {
					We(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Lo,
			lastRenderedState: e
		}, t;
	}
	function Jo(e, t, n, r) {
		return e.baseState = n, zo(e, R, typeof r == "function" ? r : Lo);
	}
	function Yo(e, t, n, r, i) {
		if (Ls(e)) throw Error(s(485));
		if (e = t.action, e !== null) {
			var a = {
				payload: i,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					a.listeners.push(e);
				}
			};
			T.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, Xo(t, a)) : (a.next = n.next, t.pending = n.next = a);
		}
	}
	function Xo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = T.T, o = {};
			T.T = o;
			try {
				var s = n(i, r), c = T.S;
				c !== null && c(o, s), Zo(e, t, s);
			} catch (n) {
				$o(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), T.T = a;
			}
		} else try {
			a = n(i, r), Zo(e, t, a);
		} catch (n) {
			$o(e, t, n);
		}
	}
	function Zo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Qo(e, t, n);
		}, function(n) {
			return $o(e, t, n);
		}) : Qo(e, t, n);
	}
	function Qo(e, t, n) {
		t.status = "fulfilled", t.value = n, es(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Xo(e, n)));
	}
	function $o(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, es(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function es(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function ts(e, t) {
		return t;
	}
	function ns(e, t) {
		if (P) {
			var n = K.formState;
			if (n !== null) {
				a: {
					var r = L;
					if (P) {
						if (N) {
							b: {
								for (var i = N, a = Vi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								N = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ui(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Mo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ts,
			lastRenderedState: t
		}, n.queue = r, n = Ps.bind(null, L, r), r.dispatch = n, r = qo(!1), a = Is.bind(null, L, !1, r.queue), r = Mo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Yo.bind(null, L, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function rs(e) {
		return is(V(), R, e);
	}
	function is(e, t, n) {
		if (t = zo(e, t, ts)[0], e = Ro(Lo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Po(t);
		} catch (e) {
			throw e === Ea ? Oa : e;
		}
		else r = t;
		t = V();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (L.flags |= 2048, ss(9, { destroy: void 0 }, as.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function as(e, t) {
		e.action = t;
	}
	function os(e) {
		var t = V(), n = R;
		if (n !== null) return is(t, n, e);
		V(), t = t.memoizedState, n = V();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ss(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = L.updateQueue, t === null && (t = No(), L.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function cs() {
		return V().memoizedState;
	}
	function ls(e, t, n, r) {
		var i = Mo();
		L.flags |= e, i.memoizedState = ss(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function us(e, t, n, r) {
		var i = V();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		R !== null && r !== null && wo(r, R.memoizedState.deps) ? i.memoizedState = ss(t, a, n, r) : (L.flags |= e, i.memoizedState = ss(1 | t, a, n, r));
	}
	function ds(e, t) {
		ls(8390656, 8, e, t);
	}
	function fs(e, t) {
		us(2048, 8, e, t);
	}
	function ps(e) {
		L.flags |= 4;
		var t = L.updateQueue;
		if (t === null) t = No(), L.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ms(e) {
		var t = V().memoizedState;
		return ps({
			ref: t,
			nextImpl: e
		}), function() {
			if (G & 2) throw Error(s(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function hs(e, t) {
		return us(4, 2, e, t);
	}
	function gs(e, t) {
		return us(4, 4, e, t);
	}
	function _s(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function vs(e, t, n) {
		n = n == null ? null : n.concat([e]), us(4, 4, _s.bind(null, t, e), n);
	}
	function ys() {}
	function bs(e, t) {
		var n = V();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && wo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function xs(e, t) {
		var n = V();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && wo(t, r[1])) return r[0];
		if (r = e(), yo) {
			We(!0);
			try {
				e();
			} finally {
				We(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Ss(e, t, n) {
		return n === void 0 || go & 1073741824 && !(J & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), L.lanes |= e, Gl |= e, n);
	}
	function Cs(e, t, n, r) {
		return Or(n, t) ? n : no.current === null ? !(go & 42) || go & 1073741824 && !(J & 261930) ? (H = !0, e.memoizedState = n) : (e = mu(), L.lanes |= e, Gl |= e, t) : (e = Ss(e, n, r), Or(e, t) || (H = !0), e);
	}
	function ws(e, t, n, r, i) {
		var a = E.p;
		E.p = a !== 0 && 8 > a ? a : 8;
		var o = T.T, s = {};
		T.T = s, Is(e, !1, t, n);
		try {
			var c = i(), l = T.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Fs(e, t, ba(c, r), pu(e)) : Fs(e, t, r, pu(e));
		} catch (n) {
			Fs(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			E.p = a, o !== null && s.types !== null && (o.types = s.types), T.T = o;
		}
	}
	function Ts() {}
	function Es(e, t, n, r) {
		if (e.tag !== 5) throw Error(s(476));
		var i = Ds(e).queue;
		ws(e, i, t, de, n === null ? Ts : function() {
			return Os(e), n(r);
		});
	}
	function Ds(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: de,
			baseState: de,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Lo,
				lastRenderedState: de
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Lo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Os(e) {
		var t = Ds(e);
		t.next === null && (t = e.alternate.memoizedState), Fs(e, t.next.queue, {}, pu());
	}
	function ks() {
		return oa(Qf);
	}
	function As() {
		return V().memoizedState;
	}
	function js() {
		return V().memoizedState;
	}
	function Ms(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = qa(n);
					var r = Ja(t, e, n);
					r !== null && (hu(r, t, n), Ya(r, t, n)), t = { cache: fa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ns(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ls(e) ? Rs(t, n) : (n = ci(e, t, n, r), n !== null && (hu(n, e, r), zs(n, t, r)));
	}
	function Ps(e, t, n) {
		Fs(e, t, n, pu());
	}
	function Fs(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ls(e)) Rs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Or(s, o)) return si(e, t, i, 0), K === null && oi(), !1;
			} catch {}
			if (n = ci(e, t, i, r), n !== null) return hu(n, e, r), zs(n, t, r), !0;
		}
		return !1;
	}
	function Is(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ls(e)) {
			if (t) throw Error(s(479));
		} else t = ci(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Ls(e) {
		var t = e.alternate;
		return e === L || t !== null && t === L;
	}
	function Rs(e, t) {
		vo = _o = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function zs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	var Bs = {
		readContext: oa,
		use: Fo,
		useCallback: B,
		useContext: B,
		useEffect: B,
		useImperativeHandle: B,
		useLayoutEffect: B,
		useInsertionEffect: B,
		useMemo: B,
		useReducer: B,
		useRef: B,
		useState: B,
		useDebugValue: B,
		useDeferredValue: B,
		useTransition: B,
		useSyncExternalStore: B,
		useId: B,
		useHostTransitionStatus: B,
		useFormState: B,
		useActionState: B,
		useOptimistic: B,
		useMemoCache: B,
		useCacheRefresh: B
	};
	Bs.useEffectEvent = B;
	var Vs = {
		readContext: oa,
		use: Fo,
		useCallback: function(e, t) {
			return Mo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: oa,
		useEffect: ds,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ls(4194308, 4, _s.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ls(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ls(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Mo();
			t = t === void 0 ? null : t;
			var r = e();
			if (yo) {
				We(!0);
				try {
					e();
				} finally {
					We(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Mo();
			if (n !== void 0) {
				var i = n(t);
				if (yo) {
					We(!0);
					try {
						n(t);
					} finally {
						We(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ns.bind(null, L, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Mo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = qo(e);
			var t = e.queue, n = Ps.bind(null, L, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ys,
		useDeferredValue: function(e, t) {
			return Ss(Mo(), e, t);
		},
		useTransition: function() {
			var e = qo(!1);
			return e = ws.bind(null, L, e.queue, !0, !1), Mo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = L, i = Mo();
			if (P) {
				if (n === void 0) throw Error(s(407));
				n = n();
			} else {
				if (n = t(), K === null) throw Error(s(349));
				J & 127 || Ho(r, t, n);
			}
			i.memoizedState = n;
			var a = {
				value: n,
				getSnapshot: t
			};
			return i.queue = a, ds(Wo.bind(null, r, a, e), [e]), r.flags |= 2048, ss(9, { destroy: void 0 }, Uo.bind(null, r, a, n, t), null), n;
		},
		useId: function() {
			var e = Mo(), t = K.identifierPrefix;
			if (P) {
				var n = Ni, r = Mi;
				n = (r & ~(1 << 32 - Ge(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = bo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Co++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: ks,
		useFormState: ns,
		useActionState: ns,
		useOptimistic: function(e) {
			var t = Mo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Is.bind(null, L, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Io,
		useCacheRefresh: function() {
			return Mo().memoizedState = Ms.bind(null, L);
		},
		useEffectEvent: function(e) {
			var t = Mo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (G & 2) throw Error(s(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Hs = {
		readContext: oa,
		use: Fo,
		useCallback: bs,
		useContext: oa,
		useEffect: fs,
		useImperativeHandle: vs,
		useInsertionEffect: hs,
		useLayoutEffect: gs,
		useMemo: xs,
		useReducer: Ro,
		useRef: cs,
		useState: function() {
			return Ro(Lo);
		},
		useDebugValue: ys,
		useDeferredValue: function(e, t) {
			return Cs(V(), R.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ro(Lo)[0], t = V().memoizedState;
			return [typeof e == "boolean" ? e : Po(e), t];
		},
		useSyncExternalStore: Vo,
		useId: As,
		useHostTransitionStatus: ks,
		useFormState: rs,
		useActionState: rs,
		useOptimistic: function(e, t) {
			return Jo(V(), R, e, t);
		},
		useMemoCache: Io,
		useCacheRefresh: js
	};
	Hs.useEffectEvent = ms;
	var Us = {
		readContext: oa,
		use: Fo,
		useCallback: bs,
		useContext: oa,
		useEffect: fs,
		useImperativeHandle: vs,
		useInsertionEffect: hs,
		useLayoutEffect: gs,
		useMemo: xs,
		useReducer: Bo,
		useRef: cs,
		useState: function() {
			return Bo(Lo);
		},
		useDebugValue: ys,
		useDeferredValue: function(e, t) {
			var n = V();
			return R === null ? Ss(n, e, t) : Cs(n, R.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Bo(Lo)[0], t = V().memoizedState;
			return [typeof e == "boolean" ? e : Po(e), t];
		},
		useSyncExternalStore: Vo,
		useId: As,
		useHostTransitionStatus: ks,
		useFormState: os,
		useActionState: os,
		useOptimistic: function(e, t) {
			var n = V();
			return R === null ? (n.baseState = e, [e, n.queue.dispatch]) : Jo(n, R, e, t);
		},
		useMemoCache: Io,
		useCacheRefresh: js
	};
	Us.useEffectEvent = ms;
	function Ws(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Gs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = qa(r);
			i.payload = t, n != null && (i.callback = n), t = Ja(e, i, r), t !== null && (hu(t, e, r), Ya(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = qa(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ja(e, i, r), t !== null && (hu(t, e, r), Ya(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = qa(n);
			r.tag = 2, t != null && (r.callback = t), t = Ja(e, r, n), t !== null && (hu(t, e, n), Ya(t, e, n));
		}
	};
	function Ks(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !kr(n, r) || !kr(i, a) : !0;
	}
	function qs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Gs.enqueueReplaceState(t, t.state, null);
	}
	function Js(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Ys(e) {
		ni(e);
	}
	function Xs(e) {
		console.error(e);
	}
	function Zs(e) {
		ni(e);
	}
	function Qs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function $s(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function ec(e, t, n) {
		return n = qa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Qs(e, t);
		}, n;
	}
	function tc(e) {
		return e = qa(e), e.tag = 3, e;
	}
	function nc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				$s(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			$s(t, n, r), typeof i != "function" && (ru === null ? ru = /* @__PURE__ */ new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function rc(e, t, n, r, i) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ra(t, n, i, !0), n = so.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return co === null ? Du() : n.alternate === null && X === 0 && (X = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === ka ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Gu(e, r, i)), !1;
					case 22: return n.flags |= 65536, r === ka ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Gu(e, r, i)), !1;
				}
				throw Error(s(435, n.tag));
			}
			return Gu(e, r, i), Du(), !1;
		}
		if (P) return t = so.current, t === null ? (r !== Hi && (t = Error(s(423), { cause: r }), Yi(wi(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = wi(r, n), i = ec(e.stateNode, r, i), Xa(e, i), X !== 4 && (X = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== Hi && (e = Error(s(422), { cause: r }), Yi(wi(e, n)))), !1;
		var a = Error(s(520), { cause: r });
		if (a = wi(a, n), Xl === null ? Xl = [a] : Xl.push(a), X !== 4 && (X = 2), t === null) return !0;
		r = wi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = ec(n.stateNode, r, e), Xa(n, e), !1;
				case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (ru === null || !ru.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = tc(i), nc(i, e, n, r), Xa(n, i), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var ic = Error(s(461)), H = !1;
	function ac(e, t, n, r) {
		t.child = e === null ? Ua(t, null, n, r) : Ha(t, e.child, n, r);
	}
	function oc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return aa(t), r = To(e, t, n, o, a, i), s = ko(), e !== null && !H ? (Ao(e, t, i), Ac(e, t, i)) : (P && s && Ii(t), t.flags |= 1, ac(e, t, r, i), t.child);
	}
	function sc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !hi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, cc(e, t, a, r, i)) : (e = vi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !jc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? kr : n, n(o, r) && e.ref === t.ref) return Ac(e, t, i);
		}
		return t.flags |= 1, e = gi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function cc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (kr(a, r) && e.ref === t.ref) if (H = !1, t.pendingProps = r = a, jc(e, i)) e.flags & 131072 && (H = !0);
			else return t.lanes = e.lanes, Ac(e, t, i);
		}
		return gc(e, t, n, r, i);
	}
	function lc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return dc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && wa(t, a === null ? null : a.cachePool), a === null ? ao() : io(t, a), fo(t);
			else return r = t.lanes = 536870912, dc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && wa(t, null), ao(), po(t)) : (wa(t, a.cachePool), io(t, a), po(t), t.memoizedState = null);
		return ac(e, t, i, n), t.child;
	}
	function uc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function dc(e, t, n, r, i) {
		var a = Ca();
		return a = a === null ? null : {
			parent: F._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && wa(t, null), ao(), fo(t), e !== null && ra(e, t, r, !0), t.childLanes = i, null;
	}
	function fc(e, t) {
		return t = Tc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function pc(e, t, n) {
		return Ha(t, e.child, null, n), e = fc(t, t.pendingProps), e.flags |= 2, mo(t), t.memoizedState = null, e;
	}
	function mc(e, t, n) {
		var r = t.pendingProps, i = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (P) {
				if (r.mode === "hidden") return e = fc(t, r), t.lanes = 536870912, uc(null, e);
				if (uo(t), (e = N) ? (e = rf(e, Vi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ji === null ? null : {
						id: Mi,
						overflow: Ni
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = xi(e), n.return = t, t.child = n, zi = t, N = null)) : e = null, e === null) throw Ui(t);
				return t.lanes = 536870912, null;
			}
			return fc(t, r);
		}
		var a = e.memoizedState;
		if (a !== null) {
			var o = a.dehydrated;
			if (uo(t), i) if (t.flags & 256) t.flags &= -257, t = pc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(s(558));
			else if (H || ra(e, t, n, !1), i = (n & e.childLanes) !== 0, H || i) {
				if (r = K, r !== null && (o = j(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, li(e, o), hu(r, e, o), ic;
				Du(), t = pc(e, t, n);
			} else e = a.treeContext, N = cf(o.nextSibling), zi = t, P = !0, Bi = null, Vi = !1, e !== null && Ri(t, e), t = fc(t, r), t.flags |= 4096;
			return t;
		}
		return e = gi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function hc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(s(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function gc(e, t, n, r, i) {
		return aa(t), n = To(e, t, n, r, void 0, i), r = ko(), e !== null && !H ? (Ao(e, t, i), Ac(e, t, i)) : (P && r && Ii(t), t.flags |= 1, ac(e, t, n, i), t.child);
	}
	function _c(e, t, n, r, i, a) {
		return aa(t), t.updateQueue = null, n = Do(t, r, n, i), Eo(e), r = ko(), e !== null && !H ? (Ao(e, t, a), Ac(e, t, a)) : (P && r && Ii(t), t.flags |= 1, ac(e, t, n, a), t.child);
	}
	function vc(e, t, n, r, i) {
		if (aa(t), t.stateNode === null) {
			var a = fi, o = n.contextType;
			typeof o == "object" && o && (a = oa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Gs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ga(t), o = n.contextType, a.context = typeof o == "object" && o ? oa(o) : fi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ws(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Gs.enqueueReplaceState(a, a.state, null), $a(t, r, a, i), Qa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Js(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = fi, typeof u == "object" && u && (o = oa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && qs(t, a, r, o), Wa = !1;
			var f = t.memoizedState;
			a.state = f, $a(t, r, a, i), Qa(), l = t.memoizedState, s || f !== l || Wa ? (typeof d == "function" && (Ws(t, n, d, r), l = t.memoizedState), (c = Wa || Ks(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ka(e, t), o = t.memoizedProps, u = Js(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = fi, typeof l == "object" && l && (c = oa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && qs(t, a, r, c), Wa = !1, f = t.memoizedState, a.state = f, $a(t, r, a, i), Qa();
			var p = t.memoizedState;
			o !== d || f !== p || Wa || e !== null && e.dependencies !== null && ia(e.dependencies) ? (typeof s == "function" && (Ws(t, n, s, r), p = t.memoizedState), (u = Wa || Ks(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ia(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, hc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ha(t, e.child, null, i), t.child = Ha(t, null, n, i)) : ac(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Ac(e, t, i), e;
	}
	function yc(e, t, n, r) {
		return qi(), t.flags |= 256, ac(e, t, n, r), t.child;
	}
	var bc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function xc(e) {
		return {
			baseLanes: e,
			cachePool: Ta()
		};
	}
	function Sc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function Cc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(I.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (P) {
				if (i ? lo(t) : po(t), (e = N) ? (e = rf(e, Vi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ji === null ? null : {
						id: Mi,
						overflow: Ni
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = xi(e), n.return = t, t.child = n, zi = t, N = null)) : e = null, e === null) throw Ui(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, i ? (po(t), i = t.mode, c = Tc({
				mode: "hidden",
				children: c
			}, i), r = yi(r, i, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = xc(n), r.childLanes = Sc(e, o, n), t.memoizedState = bc, uc(null, r)) : (lo(t), wc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (a) t.flags & 256 ? (lo(t), t.flags &= -257, t = Ec(e, t, n)) : t.memoizedState === null ? (po(t), c = r.fallback, i = t.mode, r = Tc({
				mode: "visible",
				children: r.children
			}, i), c = yi(c, i, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ha(t, e.child, null, n), r = t.child, r.memoizedState = xc(n), r.childLanes = Sc(e, o, n), t.memoizedState = bc, t = uc(null, r)) : (po(t), t.child = e.child, t.flags |= 128, t = null);
			else if (lo(t), of(c)) {
				if (o = c.nextSibling && c.nextSibling.dataset, o) var u = o.dgst;
				o = u, r = Error(s(419)), r.stack = "", r.digest = o, Yi({
					value: r,
					source: null,
					stack: null
				}), t = Ec(e, t, n);
			} else if (H || ra(e, t, n, !1), o = (n & e.childLanes) !== 0, H || o) {
				if (o = K, o !== null && (r = j(o, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, li(e, r), hu(o, e, r), ic;
				af(c) || Du(), t = Ec(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, N = cf(c.nextSibling), zi = t, P = !0, Bi = null, Vi = !1, e !== null && Ri(t, e), t = wc(t, r.children), t.flags |= 4096);
			return t;
		}
		return i ? (po(t), c = r.fallback, i = t.mode, l = e.child, u = l.sibling, r = gi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = yi(c, i, n, null), c.flags |= 2) : c = gi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, uc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = xc(n) : (i = c.cachePool, i === null ? i = Ta() : (l = F._currentValue, i = i.parent === l ? i : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: i
		}), r.memoizedState = c, r.childLanes = Sc(e, o, n), t.memoizedState = bc, uc(e.child, r)) : (lo(t), n = e.child, e = n.sibling, n = gi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function wc(e, t) {
		return t = Tc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Tc(e, t) {
		return e = mi(22, e, null, t), e.lanes = 0, e;
	}
	function Ec(e, t, n) {
		return Ha(t, e.child, null, n), e = wc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Dc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), ta(e.return, t, n);
	}
	function Oc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function kc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = I.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, O(I, o), ac(e, t, r, n), r = P ? Oi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Dc(e, n, t);
			else if (e.tag === 19) Dc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ho(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Oc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && ho(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Oc(t, !0, n, null, a, r);
				break;
			case "together":
				Oc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Ac(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (ra(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(s(153));
		if (t.child !== null) {
			for (e = t.child, n = gi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = gi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function jc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && ia(e)));
	}
	function Mc(e, t, n) {
		switch (t.tag) {
			case 3:
				ye(t, t.stateNode.containerInfo), $i(t, F, e.memoizedState.cache), qi();
				break;
			case 27:
			case 5:
				xe(t);
				break;
			case 4:
				ye(t, t.stateNode.containerInfo);
				break;
			case 10:
				$i(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, uo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (lo(t), e = Ac(e, t, n), e === null ? null : e.sibling) : Cc(e, t, n) : (lo(t), t.flags |= 128, null);
				lo(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (ra(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return kc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), O(I, I.current), r) break;
				return null;
			case 22: return t.lanes = 0, lc(e, t, n, t.pendingProps);
			case 24: $i(t, F, e.memoizedState.cache);
		}
		return Ac(e, t, n);
	}
	function Nc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) H = !0;
		else {
			if (!jc(e, n) && !(t.flags & 128)) return H = !1, Mc(e, t, n);
			H = !!(e.flags & 131072);
		}
		else H = !1, P && t.flags & 1048576 && Fi(t, Oi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ma(t.elementType), t.type = e, typeof e == "function") hi(e) ? (r = Js(e, r), t.tag = 1, t = vc(null, t, e, r, n)) : (t.tag = 0, t = gc(null, t, e, r, n));
					else {
						if (e != null) {
							var i = e.$$typeof;
							if (i === C) {
								t.tag = 11, t = oc(null, t, e, r, n);
								break a;
							}
							if (i === re) {
								t.tag = 14, t = sc(null, t, e, r, n);
								break a;
							}
						}
						throw t = le(e) || e, Error(s(306, t, ""));
					}
				}
				return t;
			case 0: return gc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, i = Js(r, t.pendingProps), vc(e, t, r, i, n);
			case 3:
				a: {
					if (ye(t, t.stateNode.containerInfo), e === null) throw Error(s(387));
					r = t.pendingProps;
					var a = t.memoizedState;
					i = a.element, Ka(e, t), $a(t, r, null, n);
					var o = t.memoizedState;
					if (r = o.cache, $i(t, F, r), r !== a.cache && na(t, [F], n, !0), Qa(), r = o.element, a.isDehydrated) if (a = {
						element: r,
						isDehydrated: !1,
						cache: o.cache
					}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
						t = yc(e, t, r, n);
						break a;
					} else if (r !== i) {
						i = wi(Error(s(424)), t), Yi(i), t = yc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (N = cf(e.firstChild), zi = t, P = !0, Bi = null, Vi = !0, n = Ua(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (qi(), r === i) {
							t = Ac(e, t, n);
							break a;
						}
						ac(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return hc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : P || (n = t.type, e = t.pendingProps, r = Bd(_e.current).createElement(n), r[pt] = t, r[mt] = e, Pd(r, n, e), M(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return xe(t), e === null && P && (r = t.stateNode = ff(t.type, t.pendingProps, _e.current), zi = t, Vi = !0, i = N, Zd(t.type) ? (lf = i, N = cf(r.firstChild)) : N = i), ac(e, t, t.pendingProps.children, n), hc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && P && ((i = r = N) && (r = tf(r, t.type, t.pendingProps, Vi), r === null ? i = !1 : (t.stateNode = r, zi = t, N = cf(r.firstChild), Vi = !1, i = !0)), i || Ui(t)), xe(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Ud(i, a) ? r = null : o !== null && Ud(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = To(e, t, Oo, null, null, n), Qf._currentValue = i), hc(e, t), ac(e, t, r, n), t.child;
			case 6: return e === null && P && ((e = n = N) && (n = nf(n, t.pendingProps, Vi), n === null ? e = !1 : (t.stateNode = n, zi = t, N = null, e = !0)), e || Ui(t)), null;
			case 13: return Cc(e, t, n);
			case 4: return ye(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ha(t, null, r, n) : ac(e, t, r, n), t.child;
			case 11: return oc(e, t, t.type, t.pendingProps, n);
			case 7: return ac(e, t, t.pendingProps, n), t.child;
			case 8: return ac(e, t, t.pendingProps.children, n), t.child;
			case 12: return ac(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, $i(t, t.type, r.value), ac(e, t, r.children, n), t.child;
			case 9: return i = t.type._context, r = t.pendingProps.children, aa(t), i = oa(i), r = r(i), t.flags |= 1, ac(e, t, r, n), t.child;
			case 14: return sc(e, t, t.type, t.pendingProps, n);
			case 15: return cc(e, t, t.type, t.pendingProps, n);
			case 19: return kc(e, t, n);
			case 31: return mc(e, t, n);
			case 22: return lc(e, t, n, t.pendingProps);
			case 24: return aa(t), r = oa(F), e === null ? (i = Ca(), i === null && (i = K, a = fa(), i.pooledCache = a, a.refCount++, a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
				parent: r,
				cache: i
			}, Ga(t), $i(t, F, i)) : ((e.lanes & n) !== 0 && (Ka(e, t), $a(t, null, null, n), Qa()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, $i(t, F, r), r !== i.cache && na(t, [F], n, !0)) : (i = {
				parent: r,
				cache: r
			}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), $i(t, F, r))), ac(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(s(156, t.tag));
	}
	function Pc(e) {
		e.flags |= 4;
	}
	function Fc(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (wu()) e.flags |= 8192;
			else throw Na = ka, Da;
		} else e.flags &= -16777217;
	}
	function Ic(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (wu()) e.flags |= 8192;
		else throw Na = ka, Da;
	}
	function Lc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : nt(), e.lanes |= t, Yl |= t);
	}
	function Rc(e, t) {
		if (!P) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function U(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function zc(e, t, n) {
		var r = t.pendingProps;
		switch (Li(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return U(t), null;
			case 1: return U(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ea(F), be(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ki(t) ? Pc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ji())), U(t), null;
			case 26:
				var i = t.type, a = t.memoizedState;
				return e === null ? (Pc(t), a === null ? (U(t), Fc(t, i, null, r, n)) : (U(t), Ic(t, a))) : a ? a === e.memoizedState ? (U(t), t.flags &= -16777217) : (Pc(t), U(t), Ic(t, a)) : (e = e.memoizedProps, e !== r && Pc(t), U(t), Fc(t, i, e, r, n)), null;
			case 27:
				if (Se(t), n = _e.current, i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(s(166));
						return U(t), null;
					}
					e = he.current, Ki(t) ? Wi(t, e) : (e = ff(i, r, n), t.stateNode = e, Pc(t));
				}
				return U(t), null;
			case 5:
				if (Se(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(s(166));
						return U(t), null;
					}
					if (a = he.current, Ki(t)) Wi(t, a);
					else {
						var o = Bd(_e.current);
						switch (a) {
							case 1:
								a = o.createElementNS("http://www.w3.org/2000/svg", i);
								break;
							case 2:
								a = o.createElementNS("http://www.w3.org/1998/Math/MathML", i);
								break;
							default: switch (i) {
								case "svg":
									a = o.createElementNS("http://www.w3.org/2000/svg", i);
									break;
								case "math":
									a = o.createElementNS("http://www.w3.org/1998/Math/MathML", i);
									break;
								case "script":
									a = o.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
									break;
								case "select":
									a = typeof r.is == "string" ? o.createElement("select", { is: r.is }) : o.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
									break;
								default: a = typeof r.is == "string" ? o.createElement(i, { is: r.is }) : o.createElement(i);
							}
						}
						a[pt] = t, a[mt] = r;
						a: for (o = t.child; o !== null;) {
							if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
							else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
								o.child.return = o, o = o.child;
								continue;
							}
							if (o === t) break a;
							for (; o.sibling === null;) {
								if (o.return === null || o.return === t) break a;
								o = o.return;
							}
							o.sibling.return = o.return, o = o.sibling;
						}
						t.stateNode = a;
						a: switch (Pd(a, i, r), i) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Pc(t);
					}
				}
				return U(t), Fc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
					if (e = _e.current, Ki(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, i = zi, i !== null) switch (i.tag) {
							case 27:
							case 5: r = i.memoizedProps;
						}
						e[pt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Ui(t, !0);
					} else e = Bd(e).createTextNode(r), e[pt] = t, t.stateNode = e;
				}
				return U(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ki(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(s(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(s(557));
							e[pt] = t;
						} else qi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						U(t), e = !1;
					} else n = Ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (mo(t), t) : (mo(t), null);
					if (t.flags & 128) throw Error(s(558));
				}
				return U(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (i = Ki(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!i) throw Error(s(318));
							if (i = t.memoizedState, i = i === null ? null : i.dehydrated, !i) throw Error(s(317));
							i[pt] = t;
						} else qi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						U(t), i = !1;
					} else i = Ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
					if (!i) return t.flags & 256 ? (mo(t), t) : (mo(t), null);
				}
				return mo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Lc(t, t.updateQueue), U(t), null);
			case 4: return be(), e === null && Sd(t.stateNode.containerInfo), U(t), null;
			case 10: return ea(t.type), U(t), null;
			case 19:
				if (me(I), r = t.memoizedState, r === null) return U(t), null;
				if (i = !!(t.flags & 128), a = r.rendering, a === null) if (i) Rc(r, !1);
				else {
					if (X !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (a = ho(e), a !== null) {
							for (t.flags |= 128, Rc(r, !1), e = a.updateQueue, t.updateQueue = e, Lc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) _i(n, e), n = n.sibling;
							return O(I, I.current & 1 | 2), P && Pi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Pe() > tu && (t.flags |= 128, i = !0, Rc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!i) if (e = ho(a), e !== null) {
						if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Lc(t, e), Rc(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !P) return U(t), null;
					} else 2 * Pe() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, i = !0, Rc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
				}
				return r.tail === null ? (U(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Pe(), e.sibling = null, n = I.current, O(I, i ? n & 1 | 2 : n & 1), P && Pi(t, r.treeForkCount), e);
			case 22:
			case 23: return mo(t), oo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (U(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : U(t), n = t.updateQueue, n !== null && Lc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && me(Sa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ea(F), U(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(s(156, t.tag));
	}
	function Bc(e, t) {
		switch (Li(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return ea(F), be(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Se(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (mo(t), t.alternate === null) throw Error(s(340));
					qi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (mo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(s(340));
					qi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return me(I), null;
			case 4: return be(), null;
			case 10: return ea(t.type), null;
			case 22:
			case 23: return mo(t), oo(), e !== null && me(Sa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return ea(F), null;
			case 25: return null;
			default: return null;
		}
	}
	function Vc(e, t) {
		switch (Li(t), t.tag) {
			case 3:
				ea(F), be();
				break;
			case 26:
			case 27:
			case 5:
				Se(t);
				break;
			case 4:
				be();
				break;
			case 31:
				t.memoizedState !== null && mo(t);
				break;
			case 13:
				mo(t);
				break;
			case 19:
				me(I);
				break;
			case 10:
				ea(t.type);
				break;
			case 22:
			case 23:
				mo(t), oo(), e !== null && me(Sa);
				break;
			case 24: ea(F);
		}
	}
	function Hc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Uc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Wc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				to(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Gc(e, t, n) {
		n.props = Js(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Kc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function qc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Z(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Z(e, t, n);
		}
		else n.current = null;
	}
	function Jc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Yc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[mt] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Xc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Zc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Xc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = on));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for ($c(e, t, n), e = e.sibling; e !== null;) $c(e, t, n), e = e.sibling;
	}
	function el(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[pt] = e, t[mt] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var tl = !1, nl = !1, rl = !1, il = typeof WeakSet == "function" ? WeakSet : Set, al = null;
	function ol(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Nr(e), Pr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var i = r.anchorOffset, a = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, a.nodeType;
					} catch {
						n = null;
						break a;
					}
					var o = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || i !== 0 && f.nodeType !== 3 || (c = o + i), f !== a || r !== 0 && f.nodeType !== 3 || (l = o + r), f.nodeType === 3 && (o += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === i && (c = o), p === a && ++d === r && (l = o), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, al = t; al !== null;) if (t = al, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, al = e;
		else for (; al !== null;) {
			switch (t = al, a = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && a !== null) {
						e = void 0, n = t, i = a.memoizedProps, a = a.memoizedState, r = n.stateNode;
						try {
							var h = Js(n.type, i);
							e = r.getSnapshotBeforeUpdate(h, a), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(s(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, al = e;
				break;
			}
			al = t.return;
		}
	}
	function sl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				xl(e, n), r & 4 && Hc(5, n);
				break;
			case 1:
				if (xl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Z(n, n.return, e);
				}
				else {
					var i = Js(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				r & 64 && Wc(n), r & 512 && Kc(n, n.return);
				break;
			case 3:
				if (xl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						to(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && el(n);
			case 26:
			case 5:
				xl(e, n), t === null && r & 4 && Jc(n), r & 512 && Kc(n, n.return);
				break;
			case 12:
				xl(e, n);
				break;
			case 31:
				xl(e, n), r & 4 && fl(e, n);
				break;
			case 13:
				xl(e, n), r & 4 && pl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || tl, !r) {
					t = t !== null && t.memoizedState !== null || nl, i = tl;
					var a = nl;
					tl = r, (nl = t) && !a ? Cl(e, n, !!(n.subtreeFlags & 8772)) : xl(e, n), tl = i, nl = a;
				}
				break;
			case 30: break;
			default: xl(e, n);
		}
	}
	function cl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, cl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && xt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var W = null, ll = !1;
	function ul(e, t, n) {
		for (n = n.child; n !== null;) dl(e, t, n), n = n.sibling;
	}
	function dl(e, t, n) {
		if (A && typeof A.onCommitFiberUnmount == "function") try {
			A.onCommitFiberUnmount(Ue, n);
		} catch {}
		switch (n.tag) {
			case 26:
				nl || qc(n, t), ul(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				nl || qc(n, t);
				var r = W, i = ll;
				Zd(n.type) && (W = n.stateNode, ll = !1), ul(e, t, n), pf(n.stateNode), W = r, ll = i;
				break;
			case 5: nl || qc(n, t);
			case 6:
				if (r = W, i = ll, W = null, ul(e, t, n), W = r, ll = i, W !== null) if (ll) try {
					(W.nodeType === 9 ? W.body : W.nodeName === "HTML" ? W.ownerDocument.body : W).removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				else try {
					W.removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				break;
			case 18:
				W !== null && (ll ? (e = W, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(W, n.stateNode));
				break;
			case 4:
				r = W, i = ll, W = n.stateNode.containerInfo, ll = !0, ul(e, t, n), W = r, ll = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Uc(2, n, t), nl || Uc(4, n, t), ul(e, t, n);
				break;
			case 1:
				nl || (qc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Gc(n, t, r)), ul(e, t, n);
				break;
			case 21:
				ul(e, t, n);
				break;
			case 22:
				nl = (r = nl) || n.memoizedState !== null, ul(e, t, n), nl = r;
				break;
			default: ul(e, t, n);
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function pl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function ml(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new il()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new il()), t;
			default: throw Error(s(435, e.tag));
		}
	}
	function hl(e, t) {
		var n = ml(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function gl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r], a = e, o = t, c = o;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							W = c.stateNode, ll = !1;
							break a;
						}
						break;
					case 5:
						W = c.stateNode, ll = !1;
						break a;
					case 3:
					case 4:
						W = c.stateNode.containerInfo, ll = !0;
						break a;
				}
				c = c.return;
			}
			if (W === null) throw Error(s(160));
			dl(a, o, i), W = null, ll = !1, a = i.alternate, a !== null && (a.return = null), i.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) vl(t, e), t = t.sibling;
	}
	var _l = null;
	function vl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				gl(t, e), yl(e), r & 4 && (Uc(3, e, e.return), Hc(3, e), Uc(5, e, e.return));
				break;
			case 1:
				gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), r & 64 && tl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var i = _l;
				if (gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), r & 4) {
					var a = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, i = i.ownerDocument || i;
							b: switch (r) {
								case "title":
									a = i.getElementsByTagName("title")[0], (!a || a[bt] || a[pt] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = i.createElement(r), i.head.insertBefore(a, i.querySelector("head > title"))), Pd(a, r, n), a[pt] = e, M(a), r = a;
									break a;
								case "link":
									var o = Vf("link", "href", i).get(r + (n.href || ""));
									if (o) {
										for (var c = 0; c < o.length; c++) if (a = o[c], a.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && a.getAttribute("rel") === (n.rel == null ? null : n.rel) && a.getAttribute("title") === (n.title == null ? null : n.title) && a.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											o.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), Pd(a, r, n), i.head.appendChild(a);
									break;
								case "meta":
									if (o = Vf("meta", "content", i).get(r + (n.content || ""))) {
										for (c = 0; c < o.length; c++) if (a = o[c], a.getAttribute("content") === (n.content == null ? null : "" + n.content) && a.getAttribute("name") === (n.name == null ? null : n.name) && a.getAttribute("property") === (n.property == null ? null : n.property) && a.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && a.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											o.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), Pd(a, r, n), i.head.appendChild(a);
									break;
								default: throw Error(s(468, r));
							}
							a[pt] = e, M(a), r = a;
						}
						e.stateNode = r;
					} else Hf(i, e.type, e.stateNode);
					else e.stateNode = If(i, r, e.memoizedProps);
					else a === r ? r === null && e.stateNode !== null && Yc(e, e.memoizedProps, n.memoizedProps) : (a === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : a.count--, r === null ? Hf(i, e.type, e.stateNode) : If(i, r, e.memoizedProps));
				}
				break;
			case 27:
				gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), n !== null && r & 4 && Yc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), e.flags & 32) {
					i = e.stateNode;
					try {
						Zt(i, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (i = e.memoizedProps, Yc(e, i, n === null ? i : n.memoizedProps)), r & 1024 && (rl = !0);
				break;
			case 6:
				if (gl(t, e), yl(e), r & 4) {
					if (e.stateNode === null) throw Error(s(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, i = _l, _l = gf(t.containerInfo), gl(t, e), _l = i, yl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				rl && (rl = !1, bl(e));
				break;
			case 4:
				r = _l, _l = gf(e.stateNode.containerInfo), gl(t, e), yl(e), _l = r;
				break;
			case 12:
				gl(t, e), yl(e);
				break;
			case 31:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 13:
				gl(t, e), yl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = Pe()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 22:
				i = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = tl, d = nl;
				if (tl = u || i, nl = d || l, gl(t, e), nl = d, tl = u, yl(e), r & 8192) a: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || l || tl || nl || Sl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (a = l.stateNode, i) o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = i ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								i ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, hl(e, n))));
				break;
			case 19:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: gl(t, e), yl(e);
		}
	}
	function yl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Xc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(s(160));
				switch (n.tag) {
					case 27:
						var i = n.stateNode;
						$c(e, Zc(e), i);
						break;
					case 5:
						var a = n.stateNode;
						n.flags & 32 && (Zt(a, ""), n.flags &= -33), $c(e, Zc(e), a);
						break;
					case 3:
					case 4:
						var o = n.stateNode.containerInfo;
						Qc(e, Zc(e), o);
						break;
					default: throw Error(s(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function bl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			bl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function xl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) sl(e, t.alternate, t), t = t.sibling;
	}
	function Sl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Uc(4, t, t.return), Sl(t);
					break;
				case 1:
					qc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Gc(t, t.return, n), Sl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					qc(t, t.return), Sl(t);
					break;
				case 22:
					t.memoizedState === null && Sl(t);
					break;
				case 30:
					Sl(t);
					break;
				default: Sl(t);
			}
			e = e.sibling;
		}
	}
	function Cl(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Cl(i, a, n), Hc(4, a);
					break;
				case 1:
					if (Cl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) eo(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Wc(a), Kc(a, a.return);
					break;
				case 27: el(a);
				case 26:
				case 5:
					Cl(i, a, n), n && r === null && o & 4 && Jc(a), Kc(a, a.return);
					break;
				case 12:
					Cl(i, a, n);
					break;
				case 31:
					Cl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 13:
					Cl(i, a, n), n && o & 4 && pl(i, a);
					break;
				case 22:
					a.memoizedState === null && Cl(i, a, n), Kc(a, a.return);
					break;
				case 30: break;
				default: Cl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function wl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && pa(n));
	}
	function Tl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pa(e));
	}
	function El(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Dl(e, t, n, r), t = t.sibling;
	}
	function Dl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				El(e, t, n, r), i & 2048 && Hc(9, t);
				break;
			case 1:
				El(e, t, n, r);
				break;
			case 3:
				El(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pa(e)));
				break;
			case 12:
				if (i & 2048) {
					El(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else El(e, t, n, r);
				break;
			case 31:
				El(e, t, n, r);
				break;
			case 13:
				El(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? El(e, t, n, r) : (a._visibility |= 2, Ol(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? El(e, t, n, r) : kl(e, t), i & 2048 && wl(o, t);
				break;
			case 24:
				El(e, t, n, r), i & 2048 && Tl(t.alternate, t);
				break;
			default: El(e, t, n, r);
		}
	}
	function Ol(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ol(a, o, s, c, i), Hc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ol(a, o, s, c, i)) : u._visibility & 2 ? Ol(a, o, s, c, i) : kl(a, o), i && l & 2048 && wl(o.alternate, o);
					break;
				case 24:
					Ol(a, o, s, c, i), i && l & 2048 && Tl(o.alternate, o);
					break;
				default: Ol(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function kl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					kl(n, r), i & 2048 && wl(r.alternate, r);
					break;
				case 24:
					kl(n, r), i & 2048 && Tl(r.alternate, r);
					break;
				default: kl(n, r);
			}
			t = t.sibling;
		}
	}
	var Al = 8192;
	function jl(e, t, n) {
		if (e.subtreeFlags & Al) for (e = e.child; e !== null;) Ml(e, t, n), e = e.sibling;
	}
	function Ml(e, t, n) {
		switch (e.tag) {
			case 26:
				jl(e, t, n), e.flags & Al && e.memoizedState !== null && Gf(n, _l, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				jl(e, t, n);
				break;
			case 3:
			case 4:
				var r = _l;
				_l = gf(e.stateNode.containerInfo), jl(e, t, n), _l = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Al, Al = 16777216, jl(e, t, n), Al = r) : jl(e, t, n));
				break;
			default: jl(e, t, n);
		}
	}
	function Nl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Fl(e), e = e.sibling;
	}
	function Fl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Pl(e), e.flags & 2048 && Uc(9, e, e.return);
				break;
			case 3:
				Pl(e);
				break;
			case 12:
				Pl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Il(e)) : Pl(e);
				break;
			default: Pl(e);
		}
	}
	function Il(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Uc(8, t, t.return), Il(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Il(t));
					break;
				default: Il(t);
			}
			e = e.sibling;
		}
	}
	function Ll(e, t) {
		for (; al !== null;) {
			var n = al;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Uc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: pa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, al = r;
			else a: for (n = e; al !== null;) {
				r = al;
				var i = r.sibling, a = r.return;
				if (cl(r), r === n) {
					al = null;
					break a;
				}
				if (i !== null) {
					i.return = a, al = i;
					break a;
				}
				al = a;
			}
		}
	}
	var Rl = {
		getCacheForType: function(e) {
			var t = oa(F), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return oa(F).controller.signal;
		}
	}, zl = typeof WeakMap == "function" ? WeakMap : Map, G = 0, K = null, q = null, J = 0, Y = 0, Bl = null, Vl = !1, Hl = !1, Ul = !1, Wl = 0, X = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return G & 2 && J !== 0 ? J & -J : T.T === null ? ut() : dd();
	}
	function mu() {
		if (Jl === 0) if (!(J & 536870912) || P) {
			var e = Xe;
			Xe <<= 1, !(Xe & 3932160) && (Xe = 262144), Jl = e;
		} else Jl = 536870912;
		return e = so.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === K && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, J, Jl, !1)), it(e, n), (!(G & 2) || e !== K) && (e === K && (!(G & 2) && (Kl |= n), X === 4 && yu(e, J, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (G & 6) throw Error(s(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || et(e, t), i = r ? Au(e, t) : Ou(e, t, !0), a = r;
		do {
			if (i === 0) {
				Hl && !r && yu(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, a && !vu(n)) {
				i = Ou(e, t, !1), a = !1;
				continue;
			}
			if (i === 2) {
				if (a = t, e.errorRecoveryDisabledLanes & a) var o = 0;
				else o = e.pendingLanes & -536870913, o = o === 0 ? o & 536870912 ? 536870912 : 0 : o;
				if (o !== 0) {
					t = o;
					a: {
						var c = e;
						i = Xl;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (Su(c, o).flags |= 256), o = Ou(c, o, !1), o !== 2) {
							if (Ul && !l) {
								c.errorRecoveryDisabledLanes |= a, Kl |= a, i = 4;
								break a;
							}
							a = Zl, Zl = i, a !== null && (Zl === null ? Zl = a : Zl.push.apply(Zl, a));
						}
						i = o;
					}
					if (a = !1, i !== 2) continue;
				}
			}
			if (i === 1) {
				Su(e, 0), yu(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, a = i, a) {
					case 0:
					case 1: throw Error(s(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						yu(r, t, Jl, !Vl);
						break a;
					case 2:
						Zl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(s(329));
				}
				if ((t & 62914560) === t && (i = $l + 300 - Pe(), 10 < i)) {
					if (yu(r, t, Jl, !Vl), $e(r, 0, !0) !== 0) break a;
					su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, a, "Throttled", -0, 0), i);
					break a;
				}
				_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, a, null, -0, 0);
			}
			break;
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: on
			}, Ml(t, a, d);
			var m = (a & 62914560) === a ? $l - Pe() : (a & 4194048) === a ? eu - Pe() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Or(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ge(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ot(e, n, t);
	}
	function bu() {
		return G & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (q !== null) {
			if (Y === 0) var e = q.return;
			else e = q, Qi = Zi = null, jo(e), Ia = null, La = 0, e = q;
			for (; e !== null;) Vc(e.alternate, e), e = e.return;
			q = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), K = e, q = n = gi(e.current, null), J = t, Y = 0, Bl = null, Vl = !1, Hl = et(e, t), Ul = !1, Yl = Jl = ql = Kl = Gl = X = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ge(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, oi(), n;
	}
	function Cu(e, t) {
		L = null, T.H = Bs, t === Ea || t === Oa ? (t = Pa(), Y = 3) : t === Da ? (t = Pa(), Y = 4) : Y = t === ic ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Bl = t, q === null && (X = 1, Qs(e, wi(t, e.current)));
	}
	function wu() {
		var e = so.current;
		return e === null ? !0 : (J & 4194048) === J ? co === null : (J & 62914560) === J || J & 536870912 ? e === co : !1;
	}
	function Tu() {
		var e = T.H;
		return T.H = Bs, e === null ? Bs : e;
	}
	function Eu() {
		var e = T.A;
		return T.A = Rl, e;
	}
	function Du() {
		X = 4, Vl || (J & 4194048) !== J && so.current !== null || (Hl = !0), !(Gl & 134217727) && !(Kl & 134217727) || K === null || yu(K, J, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = G;
		G |= 2;
		var i = Tu(), a = Eu();
		(K !== e || J !== t) && (nu = null, Su(e, t)), t = !1;
		var o = X;
		a: do
			try {
				if (Y !== 0 && q !== null) {
					var s = q, c = Bl;
					switch (Y) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							so.current === null && (t = !0);
							var l = Y;
							if (Y = 0, Bl = null, Pu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = Y, Y = 0, Bl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = X;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Qi = Zi = null, G = r, T.H = i, T.A = a, q === null && (K = null, J = 0, oi()), o;
	}
	function ku() {
		for (; q !== null;) Mu(q);
	}
	function Au(e, t) {
		var n = G;
		G |= 2;
		var r = Tu(), i = Eu();
		K !== e || J !== t ? (nu = null, tu = Pe() + 500, Su(e, t)) : Hl = et(e, t);
		a: do
			try {
				if (Y !== 0 && q !== null) {
					t = q;
					var a = Bl;
					b: switch (Y) {
						case 1:
							Y = 0, Bl = null, Pu(e, t, a, 1);
							break;
						case 2:
						case 9:
							if (Aa(a)) {
								Y = 0, Bl = null, Nu(t);
								break;
							}
							t = function() {
								Y !== 2 && Y !== 9 || K !== e || (Y = 7), rd(e);
							}, a.then(t, t);
							break a;
						case 3:
							Y = 7;
							break a;
						case 4:
							Y = 5;
							break a;
						case 7:
							Aa(a) ? (Y = 0, Bl = null, Nu(t)) : (Y = 0, Bl = null, Pu(e, t, a, 7));
							break;
						case 5:
							var o = null;
							switch (q.tag) {
								case 26: o = q.memoizedState;
								case 5:
								case 27:
									var c = q;
									if (o ? Wf(o) : c.stateNode.complete) {
										Y = 0, Bl = null;
										var l = c.sibling;
										if (l !== null) q = l;
										else {
											var u = c.return;
											u === null ? q = null : (q = u, Fu(u));
										}
										break b;
									}
							}
							Y = 0, Bl = null, Pu(e, t, a, 5);
							break;
						case 6:
							Y = 0, Bl = null, Pu(e, t, a, 6);
							break;
						case 8:
							xu(), X = 6;
							break a;
						default: throw Error(s(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return Qi = Zi = null, T.H = r, T.A = i, G = n, q === null ? (K = null, J = 0, oi(), X) : 0;
	}
	function ju() {
		for (; q !== null && !Me();) Mu(q);
	}
	function Mu(e) {
		var t = Nc(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = _c(n, t, t.pendingProps, t.type, void 0, J);
				break;
			case 11:
				t = _c(n, t, t.pendingProps, t.type.render, t.ref, J);
				break;
			case 5: jo(t);
			default: Vc(n, t), t = q = _i(t, Wl), t = Nc(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Pu(e, t, n, r) {
		Qi = Zi = null, jo(t), Ia = null, La = 0;
		var i = t.return;
		try {
			if (rc(e, i, t, n, J)) {
				X = 1, Qs(e, wi(n, e.current)), q = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw q = i, t;
			X = 1, Qs(e, wi(n, e.current)), q = null;
			return;
		}
		t.flags & 32768 ? (P || r === 1 ? e = !0 : Hl || J & 536870912 ? e = !1 : (Vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = so.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Vl);
				return;
			}
			e = t.return;
			var n = zc(t.alternate, t, Wl);
			if (n !== null) {
				q = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				q = t;
				return;
			}
			q = t = e;
		} while (t !== null);
		X === 0 && (X = 5);
	}
	function Iu(e, t) {
		do {
			var n = Bc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, q = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				q = e;
				return;
			}
			q = e = n;
		} while (e !== null);
		X = 6, q = null;
	}
	function Lu(e, t, n, r, i, a, o, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (G & 6) throw Error(s(327));
		if (t !== null) {
			if (t === e.current) throw Error(s(177));
			if (a = t.lanes | t.childLanes, a |= ai, at(e, n, a, o, c, l), e === K && (q = K = null, J = 0), ou = t, au = e, su = n, cu = a, lu = i, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Re, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = T.T, T.T = null, i = E.p, E.p = 2, o = G, G |= 4;
				try {
					ol(e, t, n);
				} finally {
					G = o, E.p = i, T.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = T.T, T.T = null;
				var r = E.p;
				E.p = 2;
				var i = G;
				G |= 4;
				try {
					vl(t, e);
					var a = zd, o = Nr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Mr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Pr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = jr(s, h), v = jr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					G = i, E.p = r, T.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = T.T, T.T = null;
				var r = E.p;
				E.p = 2;
				var i = G;
				G |= 4;
				try {
					sl(e, t.alternate, t);
				} finally {
					G = i, E.p = r, T.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, Ne();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), lt(n), t = t.stateNode, A && typeof A.onCommitFiberRoot == "function") try {
				A.onCommitFiberRoot(Ue, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = T.T, i = E.p, E.p = 2, T.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					T.T = t, E.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, pa(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = lt(su), r = T.T, i = E.p;
		try {
			E.p = 32 > n ? 32 : n, T.T = null, n = lu, lu = null;
			var a = au, o = su;
			if (iu = 0, ou = au = null, su = 0, G & 6) throw Error(s(331));
			var c = G;
			if (G |= 4, Fl(a.current), Dl(a, a.current, o, n), G = c, id(0, !1), A && typeof A.onPostCommitFiberRoot == "function") try {
				A.onPostCommitFiberRoot(Ue, a);
			} catch {}
			return !0;
		} finally {
			E.p = i, T.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = wi(n, t), t = ec(e.stateNode, t, 2), e = Ja(e, t, 2), e !== null && (it(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = wi(n, e), n = tc(2), r = Ja(t, n, 2), r !== null && (nc(n, r, t, e), it(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new zl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, K === e && (J & n) === n && (X === 4 || X === 3 && (J & 62914560) === J && 300 > Pe() - $l ? !(G & 2) && Su(e, 0) : ql |= n, Yl === J && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = nt()), e = li(e, t), e !== null && (it(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, i = e.memoizedState;
				i !== null && (n = i.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(s(314));
		}
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return Ae(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Ge(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ld(r, a));
					} else a = J, a = $e(r, r === K ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || et(r, a) || (n = !0, ld(r, a));
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = Pe(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ge(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = tt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = K, n = J, n = $e(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && je(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || et(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && je(r), lt(n)) {
				case 2:
				case 8:
					n = Le;
					break;
				case 32:
					n = Re;
					break;
				case 268435456:
					n = Be;
					break;
				default: n = Re;
			}
			return r = cd.bind(null, e), n = Ae(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && je(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = J;
		return r = $e(e, e === K ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, Pe()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			G & 6 ? Ae(Ie, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = ga;
			e === 0 && (e = Ye, Ye <<= 1, !(Ye & 261888) && (Ye = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : an("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[mt] || null).action), o = r.submitter;
			o && (t = (t = o[mt] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Dn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								Es(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), Es(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var hd = 0; hd < ei.length; hd++) {
		var gd = ei[hd];
		ti(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	ti(Kr, "onAnimationEnd"), ti(qr, "onAnimationIteration"), ti(Jr, "onAnimationStart"), ti("dblclick", "onDoubleClick"), ti("focusin", "onFocus"), ti("focusout", "onBlur"), ti(Yr, "onTransitionRun"), ti(Xr, "onTransitionStart"), ti(Zr, "onTransitionCancel"), ti(Qr, "onTransitionEnd"), kt("onMouseEnter", ["mouseout", "mouseover"]), kt("onMouseLeave", ["mouseout", "mouseover"]), kt("onPointerEnter", ["pointerout", "pointerover"]), kt("onPointerLeave", ["pointerout", "pointerover"]), Ot("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ot("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ot("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Ot("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ot("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ot("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ni(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ni(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[gt];
		n === void 0 && (n = t[gt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, Et.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !gn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var s = r.stateNode.containerInfo;
				if (s === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var c = o.tag;
					if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = St(s), o === null) return;
					if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		pn(function() {
			var r = a, i = cn(n), o = [];
			a: {
				var s = $r.get(e);
				if (s !== void 0) {
					var c = Dn, u = e;
					switch (e) {
						case "keypress": if (Sn(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = Gn;
							break;
						case "focusin":
							u = "focus", c = In;
							break;
						case "focusout":
							u = "blur", c = In;
							break;
						case "beforeblur":
						case "afterblur":
							c = In;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							c = Pn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = Fn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = qn;
							break;
						case Kr:
						case qr:
						case Jr:
							c = Ln;
							break;
						case Qr:
							c = Jn;
							break;
						case "scroll":
						case "scrollend":
							c = kn;
							break;
						case "wheel":
							c = Yn;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = Rn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							c = Kn;
							break;
						case "toggle":
						case "beforetoggle": c = Xn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? s === null ? null : s + "Capture" : s;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = mn(m, p), g != null && d.push(Td(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (s = new c(s, u, null, n, i), o.push({
						event: s,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== sn && (u = n.relatedTarget || n.fromElement) && (St(u) || u[ht])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (u = n.relatedTarget || n.toElement, c = r, u = u ? St(u) : null, u !== null && (f = l(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (c = null, u = r), c !== u)) {
						if (d = Pn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Kn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? s : wt(c), h = u == null ? s : wt(u), s = new d(g, m + "leave", c, n, i), s.target = f, s.relatedTarget = h, g = null, St(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, c && u) b: {
							for (d = Dd, p = c, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						c !== null && Od(o, s, c, d, !1), u !== null && f !== null && Od(o, f, u, d, !0);
					}
				}
				a: {
					if (s = r ? wt(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var v = gr;
					else if (ur(s)) if (_r) v = Er;
					else {
						v = wr;
						var y = Cr;
					}
					else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && tn(r.elementType) && (v = gr) : v = Tr;
					if (v &&= v(e, r)) {
						dr(o, v, n, i);
						break a;
					}
					y && y(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && qt(s, "number", s.value);
				}
				switch (y = r ? wt(r) : window, e) {
					case "focusin":
						(ur(y) || y.contentEditable === "true") && (Ir = y, Lr = r, Rr = null);
						break;
					case "focusout":
						Rr = Lr = Ir = null;
						break;
					case "mousedown":
						zr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						zr = !1, Br(o, n, i);
						break;
					case "selectionchange": if (Fr) break;
					case "keydown":
					case "keyup": Br(o, n, i);
				}
				var b;
				if (Qn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else or ? ir(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (tr && n.locale !== "ko" && (or || x !== "onCompositionStart" ? x === "onCompositionEnd" && or && (b = xn()) : (vn = i, yn = "value" in vn ? vn.value : vn.textContent, or = !0)), y = Ed(r, x), 0 < y.length && (x = new zn(x, e, null, n, i), o.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = ar(n), b !== null && (x.data = b)))), (b = er ? sr(e, n) : cr(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new zn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: y,
					listeners: x
				}), y.data = b)), md(o, e, r, n, i);
			}
			yd(o, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = mn(e, n), i != null && r.unshift(Td(e, i, a)), i = mn(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = mn(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = mn(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function $(e, t, n, r, i, a) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Zt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Zt(e, "" + r);
				break;
			case "className":
				Ft(e, "class", r);
				break;
			case "tabIndex":
				Ft(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Ft(e, n, r);
				break;
			case "style":
				en(e, r, a);
				break;
			case "data": if (t !== "object") {
				Ft(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = an("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof a == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", i.name, i, null), $(e, t, "formEncType", i.formEncType, i, null), $(e, t, "formMethod", i.formMethod, i, null), $(e, t, "formTarget", i.formTarget, i, null)) : ($(e, t, "encType", i.encType, i, null), $(e, t, "method", i.method, i, null), $(e, t, "target", i.target, i, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = an("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = on);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(s(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(s(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = an("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), Pt(e, "popover", r);
				break;
			case "xlinkActuate":
				It(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				It(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				It(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				It(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				It(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				It(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				It(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				It(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				It(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Pt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = nn.get(n) || n, Pt(e, n, r));
		}
	}
	function Nd(e, t, n, r, i, a) {
		switch (n) {
			case "style":
				en(e, r, a);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(s(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(s(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Zt(e, r) : (typeof r == "number" || typeof r == "bigint") && Zt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = on);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Dt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[mt] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
					typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Pt(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, i = !1, a;
				for (a in n) if (n.hasOwnProperty(a)) {
					var o = n[a];
					if (o != null) switch (a) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							i = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(s(137, t));
						default: $(e, t, a, o, n, null);
					}
				}
				i && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = a = o = i = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							i = d;
							break;
						case "type":
							o = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							a = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(s(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				Kt(e, a, c, l, u, o, i, !1);
				return;
			case "select":
				for (i in Q("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (c = n[i], c != null)) switch (i) {
					case "value":
						a = c;
						break;
					case "defaultValue":
						o = c;
						break;
					case "multiple": r = c;
					default: $(e, t, i, c, n, null);
				}
				t = a, n = o, e.multiple = !!r, t == null ? n != null && Jt(e, !!r, n, !0) : Jt(e, !!r, t, !1);
				return;
			case "textarea":
				for (o in Q("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (c = n[o], c != null)) switch (o) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						i = c;
						break;
					case "children":
						a = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(s(91));
						break;
					default: $(e, t, o, c, n, null);
				}
				Xt(e, r, i, a);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(s(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (tn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var i = null, a = null, o = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							a = m;
							break;
						case "name":
							i = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							o = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(s(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Gt(e, o, c, l, u, d, a, i);
				return;
			case "select":
				for (a in m = o = c = p = null, n) if (l = n[a], n.hasOwnProperty(a) && l != null) switch (a) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(a) || $(e, t, a, null, r, l);
				}
				for (i in r) if (a = r[i], l = n[i], r.hasOwnProperty(i) && (a != null || l != null)) switch (i) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						c = a;
						break;
					case "multiple": o = a;
					default: a !== l && $(e, t, i, a, r, l);
				}
				t = c, n = o, r = m, p == null ? !!r != !!n && (t == null ? Jt(e, !!n, n ? [] : "", !1) : Jt(e, !!n, t, !0)) : Jt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (i = n[c], n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, i);
				}
				for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
					case "value":
						p = i;
						break;
					case "defaultValue":
						m = i;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (i != null) throw Error(s(91));
						break;
					default: i !== a && $(e, t, o, i, r, a);
				}
				Yt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(s(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (tn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Wd && (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") pf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, pf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[bt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && pf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), xt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[bt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(s(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(s(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(s(454));
				return e;
			default: throw Error(s(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		xt(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = E.d;
	E.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = Ct(e);
		t !== null && t.tag === 5 && t.type === "form" ? Os(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Wt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), M(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Wt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Wt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Wt(n.imageSizes) + "\"]")) : i += "[href=\"" + Wt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), M(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Wt(r) + "\"][href=\"" + Wt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), M(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = Tt(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					M(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = Tt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), M(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = Tt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), M(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var i = (i = _e.current) ? gf(i) : null;
		if (!i) throw Error(s(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = Tt(i).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var a = Tt(i).hoistableStyles, o = a.get(e);
					if (o || (i = i.ownerDocument || i, o = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, a.set(e, o), (a = i.querySelector(jf(e))) && !a._p && (o.instance = a, o.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), a || Nf(i, e, n, o.state))), t && r === null) throw Error(s(528, ""));
					return o;
				}
				if (t && r !== null) throw Error(s(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = Tt(i).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(s(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + Wt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), M(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Wt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Wt(n.href) + "\"]");
				if (r) return t.instance = r, M(r), r;
				var i = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), M(r), Pd(r, "style", i), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				i = Af(n.href);
				var a = e.querySelector(jf(i));
				if (a) return t.state.loading |= 4, t.instance = a, M(a), a;
				r = Mf(n), (i = mf.get(i)) && Rf(r, i), a = (e.ownerDocument || e).createElement("link"), M(a);
				var o = a;
				return o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), t.state.loading |= 4, Lf(a, n.precedence, e), t.instance = a;
			case "script": return a = Pf(n.src), (i = e.querySelector(Ff(a))) ? (t.instance = i, M(i), i) : (r = n, (i = mf.get(a)) && (r = h({}, n), zf(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), M(i), Pd(i, "link", r), e.head.appendChild(i), t.instance = i);
			case "void": return null;
			default: throw Error(s(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[bt] || a[pt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, M(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), M(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: S,
		Provider: null,
		Consumer: null,
		_currentValue: de,
		_currentValue2: de,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = rt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = rt(0), this.hiddenUpdates = rt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = mi(3, null, null, t), e.current = a, a.stateNode = e, t = fa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ga(a), e;
	}
	function tp(e) {
		return e ? (e = fi, e) : fi;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = qa(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ja(e, r, t), n !== null && (hu(n, e, t), Ya(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = li(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = ct(t);
			var n = li(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = E.p;
		try {
			E.p = 2, up(e, t, n, r);
		} finally {
			E.p = a, T.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = E.p;
		try {
			E.p = 8, up(e, t, n, r);
		} finally {
			E.p = a, T.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = Ct(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Qe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ge(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(G & 6) && (tu = Pe() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = li(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = cn(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = St(e), e !== null) {
			var t = l(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = u(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = d(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Fe()) {
				case Ie: return 2;
				case Le: return 8;
				case Re:
				case ze: return 32;
				case Be: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Ct(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = St(e.target);
		if (t !== null) {
			var n = l(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = u(n), t !== null) {
						e.blockedOn = t, dt(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = d(n), t !== null) {
						e.blockedOn = t, dt(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				sn = r, n.target.dispatchEvent(r), sn = null;
			} else return t = Ct(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = Ct(n);
				a !== null && (e.splice(t, 3), t -= 3, Es(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[mt] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[mt] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(s(409));
		var n = t.current;
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[ht] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = ut();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = r.version;
	if (Lp !== "19.2.8") throw Error(s(527, Lp, "19.2.8"));
	E.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
		return e = p(t), e = e === null ? null : m(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: T,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Ue = zp.inject(Rp), A = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!c(e)) throw Error(s(299));
		var n = !1, r = "", i = Ys, a = Xs, o = Zs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, i, a, o, Pp), e[ht] = t.current, Sd(e), new Fp(t);
	};
})), c = /* @__PURE__ */ e(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = s();
})), l = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), u = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), d = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), f = (e) => {
	let t = d(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, p = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, m = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, h = n(), g = (0, h.createContext)({}), _ = () => (0, h.useContext)(g), v = (0, h.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: f = !1, color: g = "currentColor", className: v = "" } = _() ?? {}, y = r ?? f ? Number(n ?? d) * 24 / Number(t ?? u) : n ?? d;
	return (0, h.createElement)("svg", {
		ref: c,
		...p,
		width: t ?? u ?? p.width,
		height: t ?? u ?? p.height,
		stroke: e ?? g,
		strokeWidth: y,
		className: l("lucide", v, i),
		...!a && !m(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, h.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), y = (e, t) => {
	let n = (0, h.forwardRef)(({ className: n, ...r }, i) => (0, h.createElement)(v, {
		ref: i,
		iconNode: t,
		className: l(`lucide-${u(f(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = f(e), n;
}, b = y("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), x = y("captions", [["rect", {
	width: "18",
	height: "14",
	x: "3",
	y: "5",
	rx: "2",
	ry: "2",
	key: "12ruh7"
}], ["path", {
	d: "M7 15h4M15 15h2M7 11h2M13 11h4",
	key: "1ueiar"
}]]), ee = y("chart-column", [
	["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}],
	["path", {
		d: "M18 17V9",
		key: "2bz60n"
	}],
	["path", {
		d: "M13 17V5",
		key: "1frdt8"
	}],
	["path", {
		d: "M8 17v-3",
		key: "17ska0"
	}]
]), S = y("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), C = y("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]), te = y("maximize-2", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "m21 3-7 7",
		key: "1l2asr"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M9 21H3v-6",
		key: "wtvkvv"
	}]
]), ne = y("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]), re = y("minimize-2", [
	["path", {
		d: "m14 10 7-7",
		key: "oa77jy"
	}],
	["path", {
		d: "M20 10h-6V4",
		key: "mjg0md"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M4 14h6v6",
		key: "rmj7iw"
	}]
]), ie = y("pause", [["rect", {
	x: "14",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "kaeet6"
}], ["rect", {
	x: "5",
	y: "3",
	width: "5",
	height: "18",
	rx: "1",
	key: "1wsw3u"
}]]), ae = y("picture-in-picture-2", [["path", {
	d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4",
	key: "daa4of"
}], ["rect", {
	width: "10",
	height: "7",
	x: "12",
	y: "13",
	rx: "2",
	key: "1nb8gs"
}]]), oe = y("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]), se = y("rectangle-horizontal", [["rect", {
	width: "20",
	height: "12",
	x: "2",
	y: "6",
	rx: "2",
	key: "9lu3g6"
}]]), ce = y("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]), w = y("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), le = y("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]), ue = y("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), T = y("skip-forward", [["path", {
	d: "M21 4v16",
	key: "7j8fe9"
}], ["path", {
	d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
	key: "zs4d6"
}]]), E = y("volume-2", [
	["path", {
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
		key: "uqj9uw"
	}],
	["path", {
		d: "M16 9a5 5 0 0 1 0 6",
		key: "1q6k2b"
	}],
	["path", {
		d: "M19.364 18.364a9 9 0 0 0 0-12.728",
		key: "ijwkga"
	}]
]), de = y("volume-x", [
	["path", {
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
		key: "uqj9uw"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "9",
		y2: "15",
		key: "1ewh16"
	}],
	["line", {
		x1: "16",
		x2: "22",
		y1: "9",
		y2: "15",
		key: "5ykzw1"
	}]
]), fe = y("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), pe = c(), D = /^﻿/;
function me(e) {
	return e.replace(/\{[^}]*\\p[1-9][^}]*\}[^{]*/g, "").replace(/\{[^}]*\}/g, "").replace(/\\N/gi, "\n").replace(/\\h/gi, " ").replace(/\\\{/g, "{").replace(/\\\}/g, "}").split("\n").map((e) => e.trim()).join("\n").trim();
}
function O(e) {
	let t = e.replace(D, "").trim();
	if (!t) return "";
	let n = t.match(/^Dialogue:\s*(.*)$/is), r = (n ? n[1] : t).split(","), i = n ? 9 : 8;
	return me(r.length > i ? r.slice(i).join(",") : t);
}
function he(e, t) {
	return e.filter((e) => t >= e.start && t < e.end);
}
//#endregion
//#region src/lib/codec.ts
var ge = {
	A_AAC: "mp4a.40.2",
	A_FLAC: "flac",
	A_OPUS: "opus",
	A_VORBIS: "vorbis",
	"A_MPEG/L3": "mp3",
	A_AC3: "ac-3",
	"A_AC-3": "ac-3",
	A_EAC3: "ec-3",
	"A_E-AC-3": "ec-3"
}, _e = /* @__PURE__ */ new Set([
	"mp3",
	"ac-3",
	"ec-3"
]);
function ve(e) {
	let t = e.codecId.toUpperCase();
	return t === "V_MPEG4/ISO/AVC" ? xe(e.codecPrivate) || "avc1.640028" : t === "V_MPEGH/ISO/HEVC" ? Se(e.codecPrivate) || "hvc1.1.6.L150.B0" : ge[t] ?? null;
}
function ye(e) {
	let t = e.codec ?? ve(e);
	if (!(t && _e.has(t))) return t === "flac" ? be(e.codecPrivate) : e.codecPrivate;
}
function be(e) {
	if (!e || e.byteLength === 0) return e;
	let t = new Uint8Array(e);
	if (t.length < 4) return e;
	let n = [
		102,
		76,
		97,
		67
	], r = t.length >= 4 && t[0] === n[0] && t[1] === n[1] && t[2] === n[2] && t[3] === n[3], i = r ? t.subarray(4) : t, a = i.length >= 4 && !(i[0] & 127) && (i[1] << 16 | i[2] << 8 | i[3]) == 34, o = a || i.length !== 34 ? [] : [
		128,
		0,
		0,
		34
	];
	if (r && (a || i.length !== 34)) return e;
	let s = new Uint8Array(n.length + o.length + i.length);
	return s.set(n, 0), s.set(o, n.length), s.set(i, n.length + o.length), s.buffer;
}
function xe(e) {
	if (!e || e.byteLength < 4) return null;
	let t = new Uint8Array(e);
	return t[0] !== 1 || t.length < 4 ? null : `avc1.${[
		t[1],
		t[2],
		t[3]
	].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
function Se(e) {
	if (!e || e.byteLength < 13) return null;
	let t = new Uint8Array(e);
	if (t[0] !== 1) return null;
	let n = (t[1] & 192) >> 6, r = (t[1] & 32) >> 5, i = t[1] & 31, a = new DataView(t.buffer, t.byteOffset, t.byteLength).getUint32(2), o = [
		`${[
			"",
			"A",
			"B",
			"C"
		][n]}${i}`,
		Ce(a).toString(16),
		`${r ? "H" : "L"}${t[12]}`
	], s = Array.from(t.subarray(6, 12));
	for (; s.length && s[s.length - 1] === 0;) s.pop();
	return o.push(...s.map((e) => e.toString(16).toUpperCase().padStart(2, "0"))), `hvc1.${o.join(".")}`;
}
function Ce(e) {
	let t = 0;
	for (let n = 0; n < 32; n += 1) t = t << 1 | e >>> n & 1;
	return t >>> 0;
}
var we = {
	"V_MPEGH/ISO/HEVC": "H.265/HEVC",
	"V_MPEG4/ISO/AVC": "H.264/AVC",
	V_AV1: "AV1",
	V_VP9: "VP9",
	V_VP8: "VP8",
	V_MPEG2: "MPEG-2",
	V_MPEG1: "MPEG-1",
	A_AAC: "AAC",
	A_OPUS: "Opus",
	A_AC3: "AC-3",
	"A_AC-3": "AC-3",
	A_EAC3: "E-AC-3",
	"A_E-AC-3": "E-AC-3",
	"A_MPEG/L3": "MP3",
	"A_MPEG/L2": "MP2",
	A_VORBIS: "Vorbis",
	A_TRUEHD: "TrueHD",
	A_FLAC: "FLAC",
	A_ALAC: "ALAC",
	A_AC4: "AC-4",
	"A_PCM/INT/LIT": "PCM",
	"A_PCM/INT/BIG": "PCM",
	"A_PCM/FLOAT/IEEE": "PCM",
	"S_TEXT/UTF8": "UTF-8",
	"S_TEXT/ASCII": "ASCII",
	"S_TEXT/ASS": "ASS",
	"S_TEXT/SSA": "SSA",
	S_ASS: "ASS",
	S_SSA: "SSA"
};
function k(e) {
	return we[e.codecId.toUpperCase()] || (e.codec || e.codecId).replace(/^[VAS]_/, "").replace(/\/ISO\//g, "/").replace(/_/g, " ");
}
function Te(e) {
	let t = e.language && e.language !== "und" ? ` · ${e.language}` : "", n = e.name ? ` · ${e.name}` : "";
	return e.kind === "video" ? `${e.width || "?"}×${e.height || "?"} · ${k(e)}` : e.kind === "audio" ? `${k(e)} · ${e.channels || 2}ch${t}${n}` : `${k(e)}${t}${n}`;
}
var Ee = /* @__PURE__ */ new Set([
	"S_TEXT/UTF8",
	"S_TEXT/ASCII",
	"S_TEXT/ASS",
	"S_TEXT/SSA",
	"S_ASS",
	"S_SSA"
]);
function De(e) {
	return e.kind === "subtitle" && Ee.has(e.codecId.toUpperCase());
}
function Oe(e) {
	let t = e.codecId.toUpperCase();
	return t === "S_TEXT/ASS" || t === "S_TEXT/SSA" || t === "S_ASS" || t === "S_SSA";
}
//#endregion
//#region src/lib/subtitle-style.ts
var ke = [
	{
		id: "system",
		label: "系统默认",
		stack: "system-ui, -apple-system, \"Segoe UI\", sans-serif"
	},
	{
		id: "sans",
		label: "黑体",
		stack: "\"Noto Sans SC\", \"PingFang SC\", \"Microsoft YaHei\", \"Hiragino Sans GB\", sans-serif"
	},
	{
		id: "serif",
		label: "宋体",
		stack: "\"Noto Serif SC\", \"Source Han Serif SC\", \"Songti SC\", SimSun, Georgia, serif"
	},
	{
		id: "kai",
		label: "楷体",
		stack: "\"Kaiti SC\", STKaiti, KaiTi, \"Noto Serif SC\", serif"
	},
	{
		id: "rounded",
		label: "圆体",
		stack: "\"Yuanti SC\", STYuanti, \"Hiragino Maru Gothic ProN\", Quicksand, sans-serif"
	},
	{
		id: "mono",
		label: "等宽",
		stack: "ui-monospace, SFMono-Regular, Consolas, \"Noto Sans Mono CJK SC\", monospace"
	}
], Ae = {
	font: "system",
	scale: 1,
	offset: 0
}, je = {
	min: .6,
	max: 2.4,
	step: .1
}, Me = {
	min: -11,
	max: 74,
	step: 1
}, Ne = "mx-player-pro:subtitle-style:";
function Pe(e) {
	return (ke.find((t) => t.id === e) || ke[0]).stack;
}
function Fe(e) {
	return Number.isFinite(e) ? Math.round(Math.min(je.max, Math.max(je.min, e)) * 10) / 10 : Ae.scale;
}
function Ie(e) {
	return Number.isFinite(e) ? Math.round(Math.min(Me.max, Math.max(Me.min, e))) : Ae.offset;
}
function Le(e) {
	return {
		font: ke.some((t) => t.id === e?.font) ? e.font : Ae.font,
		scale: Fe(Number(e?.scale)),
		offset: Ie(Number(e?.offset))
	};
}
function Re(e) {
	if (e.kind === "file") return "local-file";
	try {
		return new URL(e.url).hostname || "unknown-host";
	} catch {
		return "unknown-host";
	}
}
function ze(e) {
	try {
		let t = localStorage.getItem(Ne + e);
		return t ? Le(JSON.parse(t)) : { ...Ae };
	} catch {
		return { ...Ae };
	}
}
function Be(e, t) {
	try {
		localStorage.setItem(Ne + e, JSON.stringify(Le(t)));
	} catch {}
}
var Ve = .004, He = class {
	items = [];
	floor = -Infinity;
	dropped = 0;
	push(e) {
		if (e.timestamp < this.floor) {
			e.close(), this.dropped += 1;
			return;
		}
		let t = this.items.length;
		for (; t > 0 && this.items[t - 1].timestamp > e.timestamp;) --t;
		for (this.items.splice(t, 0, e); this.items.length > 12;) this.items.shift()?.close(), this.dropped += 1;
	}
	take(e) {
		let t = e + Ve;
		if (!this.items.length || this.items[0].timestamp > t) return null;
		let n = this.items.shift();
		for (; this.items.length && this.items[0].timestamp <= t;) n.close(), this.dropped += 1, n = this.items.shift();
		let r = e - n.timestamp, i = this.items.filter((e) => e.timestamp <= t).length;
		return {
			frame: n,
			skipDraw: r > .25 && i >= 2
		};
	}
	setFloor(e) {
		this.floor = e;
		let t = [];
		for (let n of this.items) n.timestamp < e ? (n.close(), this.dropped += 1) : t.push(n);
		this.items = t;
	}
	clearFloor() {
		this.floor = -Infinity;
	}
	flush() {
		for (let e of this.items) e.close();
		this.items = [];
	}
	get length() {
		return this.items.length;
	}
	get horizon() {
		return this.items.length ? this.items[this.items.length - 1].timestamp : -Infinity;
	}
}, Ue = class {
	anchorMedia = 0;
	anchorWall = 0;
	rate = 1;
	running = !1;
	now;
	constructor(e = () => performance.now()) {
		this.now = e, this.anchorWall = e();
	}
	get currentTime() {
		return this.running ? this.anchorMedia + (this.now() - this.anchorWall) / 1e3 * this.rate : this.anchorMedia;
	}
	start() {
		this.running ||= (this.anchorWall = this.now(), !0);
	}
	stop() {
		this.running &&= (this.anchorMedia = this.currentTime, !1);
	}
	reset(e) {
		this.anchorMedia = e, this.anchorWall = this.now();
	}
	setRate(e) {
		this.anchorMedia = this.currentTime, this.anchorWall = this.now(), this.rate = e;
	}
	get isRunning() {
		return this.running;
	}
}, A = class {
	spans = [];
	hold = 0;
	contextTime;
	constructor(e) {
		this.contextTime = e;
	}
	get primed() {
		return this.spans.length > 0;
	}
	addSpan(e) {
		this.spans.push(e), this.spans.sort((e, t) => e.startAt - t.startAt);
	}
	get currentTime() {
		let e = this.contextTime(), t = null;
		for (let n of this.spans) {
			if (e >= n.startAt && e < n.endAt) return n.mediaStart + (e - n.startAt) * n.rate;
			n.startAt <= e && (t = n);
		}
		return t ? t.mediaStart + (t.endAt - t.startAt) * t.rate : this.hold;
	}
	prune() {
		if (this.spans.length <= 1) return;
		let e = this.contextTime(), t = this.spans.filter((t) => t.endAt >= e - 1);
		this.spans = t.length ? t : this.spans.slice(-1);
	}
	start() {}
	stop() {}
	reset(e) {
		this.spans = [], this.hold = e;
	}
	setRate(e) {}
	get scheduledUntil() {
		return this.spans.reduce((e, t) => Math.max(e, t.endAt), 0);
	}
	get mediaEnd() {
		let e = this.spans[this.spans.length - 1];
		return e ? e.mediaStart + (e.endAt - e.startAt) * e.rate : this.hold;
	}
}, We = class {
	monotonic;
	audio;
	held = !1;
	holdValue = 0;
	constructor(e, t = null) {
		this.monotonic = e, this.audio = t;
	}
	get currentTime() {
		if (this.held) return this.holdValue;
		if (!this.audio?.primed) return this.monotonic.currentTime;
		let e = this.audio.currentTime;
		return this.monotonic.reset(e), e;
	}
	start() {
		this.held = !1, this.audio || this.monotonic.start(), this.audio?.start();
	}
	stop() {
		this.monotonic.stop(), this.audio?.stop();
	}
	hold() {
		this.held || (this.holdValue = this.currentTime, this.held = !0, this.monotonic.stop());
	}
	resume() {
		this.held && (this.held = !1, this.monotonic.reset(this.holdValue), this.audio || this.monotonic.start());
	}
	get isHeld() {
		return this.held;
	}
	reset(e) {
		this.held = !1, this.holdValue = e, this.monotonic.reset(e), this.audio?.reset(e);
	}
	setRate(e) {
		this.monotonic.setRate(e), this.audio?.setRate(e);
	}
};
function Ge(e) {
	return e.inFlight || e.eof || e.bufferedBytes >= 100663296 ? !1 : e.bufferedAhead < (e.playing ? 20 : 3);
}
function Ke(e) {
	return e.decodeQueueSize < 8 && e.frameQueueLength < 6;
}
function qe(e) {
	return e.decodeQueueSize < 8 && e.audioHorizonAhead < 1;
}
//#endregion
//#region src/lib/packet-buffer.ts
var Je = class {
	queues = {
		video: [],
		audio: []
	};
	ends = {
		video: -Infinity,
		audio: -Infinity
	};
	active = {
		video: !1,
		audio: !1
	};
	bytes = 0;
	setActive(e, t) {
		this.active[e] = t, !t && (this.dropQueue(e), this.ends[e] = -Infinity);
	}
	isActive(e) {
		return this.active[e];
	}
	push(e, t) {
		this.active[e] && (this.queues[e].push(t), this.bytes += t.data.byteLength, this.ends[e] = Math.max(this.ends[e], t.timestamp / 1e6));
	}
	peek(e) {
		return this.queues[e][0];
	}
	endOf(e) {
		return this.ends[e];
	}
	shift(e) {
		let t = this.queues[e].shift();
		return t && (this.bytes -= t.data.byteLength), t;
	}
	pending(e) {
		return this.queues[e].length;
	}
	get byteLength() {
		return this.bytes;
	}
	get length() {
		return this.queues.video.length + this.queues.audio.length;
	}
	get bufferedEnd() {
		let e = Infinity;
		for (let t of ["video", "audio"]) this.active[t] && (e = Math.min(e, this.ends[t]));
		return Number.isFinite(e) ? e : -Infinity;
	}
	bufferedAhead(e) {
		let t = this.bufferedEnd;
		return t === -Infinity ? 0 : Math.max(0, t - e);
	}
	clear() {
		this.dropQueue("video"), this.dropQueue("audio"), this.ends.video = -Infinity, this.ends.audio = -Infinity, this.bytes = 0;
	}
	dropQueue(e) {
		for (let t of this.queues[e]) this.bytes -= t.data.byteLength;
		this.queues[e] = [], this.bytes < 0 && (this.bytes = 0);
	}
}, Ye = 5e3, Xe = class {
	timestamp;
	frame;
	closed = !1;
	constructor(e) {
		this.frame = e, this.timestamp = (e.timestamp || 0) / 1e6;
	}
	get image() {
		return this.frame;
	}
	close() {
		this.closed || (this.closed = !0, this.frame.close());
	}
}, Ze = class {
	canvas;
	onStatus;
	ctx = null;
	videoDecoder = null;
	audioDecoder = null;
	videoConfig = null;
	audioConfig = null;
	audioContext = null;
	gainNode = null;
	frames = new He();
	packets = new Je();
	clock = new We(new Ue());
	audioClock = null;
	scheduledSources = /* @__PURE__ */ new Set();
	pendingAudio = [];
	audioScheduleEnd = 0;
	playbackRate = 1;
	volume = 1;
	playing = !1;
	stalled = !1;
	endOfStream = !1;
	flushed = !1;
	awaitingKeyframe = !0;
	previewPending = !1;
	seekTarget = 0;
	audioWaitSince = 0;
	audioPrimed = !1;
	raf = null;
	constructor(e, t) {
		this.canvas = e, this.onStatus = t;
	}
	get currentTime() {
		return this.clock.currentTime;
	}
	get isStalled() {
		return this.stalled;
	}
	stats() {
		let e = this.clock.currentTime, t = this.packets.bufferedEnd;
		return {
			currentTime: e,
			bufferedStart: this.seekTarget,
			bufferedEnd: t === -Infinity ? this.seekTarget : t,
			bufferedAhead: this.packets.bufferedAhead(e),
			bufferedBytes: this.packets.byteLength,
			stalled: this.stalled,
			droppedFrames: this.frames.dropped
		};
	}
	async configure(e, t) {
		this.close();
		let n = globalThis;
		if (!n.VideoDecoder || !n.EncodedVideoChunk) {
			this.onStatus({
				videoReady: !1,
				audioReady: !1,
				error: "当前浏览器不支持 WebCodecs VideoDecoder"
			});
			return;
		}
		this.ctx = this.canvas.getContext("2d", {
			alpha: !1,
			desynchronized: !0
		}), this.audioClock = null, this.clock = new We(new Ue()), this.frames.clearFloor(), this.awaitingKeyframe = !0, this.endOfStream = !1, this.flushed = !1, this.stalled = !1, this.seekTarget = 0, this.audioPrimed = !1, this.packets.setActive("video", !!(e?.codec && e.width && e.height)), this.packets.setActive("audio", !!t?.codec);
		let r = !1, i = !1, a, o;
		if (e?.codec && e.width && e.height) {
			let t = {
				codec: e.codec,
				codedWidth: e.width,
				codedHeight: e.height,
				description: ye(e)
			};
			try {
				if ((await n.VideoDecoder.isConfigSupported?.(t))?.supported === !1) a = `DECODER_UNSUPPORTED_VIDEO:${e.codec}`;
				else {
					let i = n.VideoDecoder;
					this.videoConfig = t, this.videoDecoder = new i({
						output: (e) => this.acceptFrame(e),
						error: (e) => this.failVideo(e)
					}), this.videoDecoder.configure(t), r = !0, this.canvas.width = e.width, this.canvas.height = e.height;
				}
			} catch (e) {
				a = `DECODER_ERROR_VIDEO:${Qe(e)}`;
			}
		}
		if (t?.codec && n.AudioDecoder && n.EncodedAudioChunk) {
			let e = {
				codec: t.codec,
				sampleRate: t.sampleRate || 48e3,
				numberOfChannels: t.channels || 2,
				description: ye(t)
			};
			try {
				if ((await n.AudioDecoder.isConfigSupported?.(e))?.supported === !1) o = `DECODER_UNSUPPORTED_AUDIO:${t.codec}`;
				else {
					let t = n.AudioDecoder;
					this.audioConfig = e, this.audioDecoder = new t({
						output: (e) => this.onAudioData(e),
						error: (e) => this.failAudio(e)
					}), this.audioDecoder.configure(e), i = !0;
				}
			} catch (e) {
				o = `DECODER_ERROR_AUDIO:${Qe(e)}`;
			}
		} else t && (o = `DECODER_UNSUPPORTED_AUDIO:${k(t)}`);
		this.packets.setActive("video", r), this.packets.setActive("audio", i), this.onStatus({
			videoReady: r,
			audioReady: i,
			error: a ?? o
		});
	}
	async configureAudio(e) {
		let t = globalThis;
		this.disposeAudioPipeline(), this.audioWaitSince = performance.now(), this.audioPrimed = !1;
		let n = !1, r;
		if (e?.codec && t.AudioDecoder && t.EncodedAudioChunk) {
			let i = {
				codec: e.codec,
				sampleRate: e.sampleRate || 48e3,
				numberOfChannels: e.channels || 2,
				description: ye(e)
			};
			try {
				if ((await t.AudioDecoder.isConfigSupported?.(i))?.supported === !1) r = `DECODER_UNSUPPORTED_AUDIO:${e.codec}`;
				else {
					let e = t.AudioDecoder;
					this.audioConfig = i, this.audioDecoder = new e({
						output: (e) => this.onAudioData(e),
						error: (e) => this.failAudio(e)
					}), this.audioDecoder.configure(i), n = !0;
				}
			} catch (e) {
				r = `DECODER_ERROR_AUDIO:${Qe(e)}`;
			}
		} else e && (r = `DECODER_UNSUPPORTED_AUDIO:${k(e)}`);
		this.packets.setActive("audio", n), this.onStatus({
			videoReady: this.videoDecoder !== null,
			audioReady: n,
			error: r
		});
	}
	enqueue(e, t, n) {
		e.trackId === t ? this.packets.push("video", e) : e.trackId === n && this.packets.push("audio", e);
	}
	needsPackets(e = this.playing, t = !1, n = !1) {
		return !this.packets.isActive("video") && !this.packets.isActive("audio") ? !1 : Ge({
			bufferedAhead: this.packets.bufferedAhead(this.clock.currentTime),
			bufferedBytes: this.packets.byteLength,
			playing: e,
			eof: t,
			inFlight: n
		});
	}
	tick() {
		this.audioClock?.prune(), this.pumpDecoders(), this.drainPendingAudio(), this.updateStall();
	}
	play() {
		this.playing = !0, this.previewPending = !1, this.stalled = !1, this.audioWaitSince = performance.now(), this.ensureAudioContext(), this.audioContext?.resume(), this.clock.start(), this.tick(), this.startRenderLoop();
	}
	pause() {
		this.playing = !1, this.stalled = !1, this.clock.stop(), this.audioContext?.suspend(), this.stopRenderLoop();
	}
	setVolume(e) {
		this.volume = Math.max(0, Math.min(1, e)), this.gainNode && (this.gainNode.gain.value = this.volume);
	}
	setPlaybackRate(e) {
		let t = Math.max(.25, Math.min(4, e));
		this.playbackRate = t, this.clock.setRate(t);
	}
	seekTo(e) {
		this.seekTarget = e, this.audioPrimed = !1, this.clock.reset(e), this.packets.clear(), this.frames.flush(), this.frames.setFloor(e), this.stopScheduledAudio(), this.pendingAudio.forEach((e) => e.close()), this.pendingAudio = [], this.endOfStream = !1, this.flushed = !1, this.stalled = !1, this.audioWaitSince = performance.now(), this.resetDecoders(), this.previewPending = !this.playing;
	}
	reset() {
		this.seekTo(this.clock.currentTime);
	}
	markEndOfStream() {
		this.endOfStream = !0, this.tick();
	}
	close() {
		this.stopRenderLoop(), this.playing = !1, this.stalled = !1, this.previewPending = !1, this.packets.clear(), this.frames.flush(), this.stopScheduledAudio(), this.pendingAudio.forEach((e) => e.close()), this.pendingAudio = [];
		try {
			this.videoDecoder?.close();
		} catch {}
		try {
			this.audioDecoder?.close();
		} catch {}
		this.videoDecoder = null, this.audioDecoder = null, this.audioContext?.close().catch(() => void 0), this.audioContext = null, this.gainNode = null, this.audioClock = null, this.ctx = null;
	}
	pumpDecoders() {
		let e = globalThis;
		for (; this.videoDecoder && e.EncodedVideoChunk && this.packets.pending("video") && Ke(this.decodePressure("video"));) {
			let t = this.packets.shift("video");
			if (!t) break;
			if (!(this.awaitingKeyframe && !t.key)) {
				this.awaitingKeyframe = !1;
				try {
					this.videoDecoder.decode(new e.EncodedVideoChunk({
						type: t.key ? "key" : "delta",
						timestamp: t.timestamp,
						duration: t.duration || void 0,
						data: t.data
					}));
				} catch (e) {
					this.failVideo(e);
					break;
				}
			}
		}
		for (; this.playing && this.audioDecoder && e.EncodedAudioChunk && this.packets.pending("audio") && qe(this.decodePressure("audio"));) {
			let t = this.packets.shift("audio");
			if (!t) break;
			try {
				this.audioDecoder.decode(new e.EncodedAudioChunk({
					type: "key",
					timestamp: t.timestamp,
					duration: t.duration || void 0,
					data: t.data
				}));
			} catch (e) {
				this.failAudio(e);
				break;
			}
		}
		this.checkAudioLiveness(), this.endOfStream && !this.packets.length && !this.flushed && (this.flushed = !0, this.flushDecoders());
	}
	decodePressure(e) {
		let t = this.audioContext;
		return {
			decodeQueueSize: (e === "video" ? this.videoDecoder : this.audioDecoder)?.decodeQueueSize ?? 0,
			frameQueueLength: this.frames.length,
			audioHorizonAhead: t ? Math.max(0, this.audioScheduleEnd - t.currentTime) : 0
		};
	}
	checkAudioLiveness() {
		!this.playing || !this.packets.isActive("audio") || this.packets.endOf("video") !== -Infinity && (this.audioPrimed || performance.now() - this.audioWaitSince < Ye || (this.packets.setActive("audio", !1), this.rebuildClockWithoutAudio(), this.onStatus({
			videoReady: this.videoDecoder !== null,
			audioReady: !1,
			error: "DECODER_ERROR_AUDIO:音频轨没有解码输出"
		})));
	}
	updateStall() {
		if (!this.playing) return;
		let e = this.packets.bufferedAhead(this.clock.currentTime);
		if (this.stalled) {
			if (e < 1.5 && !this.endOfStream) return;
			this.stalled = !1, this.clock.resume(), this.audioContext?.resume();
			return;
		}
		this.endOfStream || e > .2 || this.frames.length > 0 || (this.stalled = !0, this.clock.hold(), this.audioContext?.suspend());
	}
	async flushDecoders() {
		try {
			await this.videoDecoder?.flush();
		} catch {}
		try {
			await this.audioDecoder?.flush();
		} catch {}
	}
	resetDecoders() {
		if (this.awaitingKeyframe = !0, this.videoDecoder && this.videoConfig) try {
			this.videoDecoder.reset(), this.videoDecoder.configure(this.videoConfig);
		} catch {
			this.recreateVideoDecoder();
		}
		if (this.audioDecoder && this.audioConfig) try {
			this.audioDecoder.reset(), this.audioDecoder.configure(this.audioConfig);
		} catch {
			this.recreateAudioDecoder();
		}
	}
	recreateVideoDecoder() {
		let e = globalThis;
		if (!(!e.VideoDecoder || !this.videoConfig)) {
			try {
				this.videoDecoder?.close();
			} catch {}
			try {
				this.videoDecoder = new e.VideoDecoder({
					output: (e) => this.acceptFrame(e),
					error: (e) => this.failVideo(e)
				}), this.videoDecoder.configure(this.videoConfig);
			} catch (e) {
				this.failVideo(e);
			}
		}
	}
	recreateAudioDecoder() {
		let e = globalThis;
		if (!(!e.AudioDecoder || !this.audioConfig)) {
			try {
				this.audioDecoder?.close();
			} catch {}
			try {
				this.audioDecoder = new e.AudioDecoder({
					output: (e) => this.onAudioData(e),
					error: (e) => this.failAudio(e)
				}), this.audioDecoder.configure(this.audioConfig);
			} catch (e) {
				this.failAudio(e);
			}
		}
	}
	failVideo(e) {
		try {
			this.videoDecoder?.close();
		} catch {}
		this.videoDecoder = null, this.packets.setActive("video", !1), this.frames.flush(), this.onStatus({
			videoReady: !1,
			audioReady: this.audioDecoder !== null,
			error: `DECODER_ERROR_VIDEO:${Qe(e)}`
		});
	}
	failAudio(e) {
		this.disposeAudioPipeline(), this.onStatus({
			videoReady: this.videoDecoder !== null,
			audioReady: !1,
			error: `DECODER_ERROR_AUDIO:${Qe(e)}`
		});
	}
	disposeAudioPipeline() {
		try {
			this.audioDecoder?.close();
		} catch {}
		this.audioDecoder = null, this.audioConfig = null, this.packets.setActive("audio", !1), this.stopScheduledAudio(), this.pendingAudio.forEach((e) => e.close()), this.pendingAudio = [], this.audioPrimed = !1, this.rebuildClockWithoutAudio(), this.audioContext?.close().catch(() => void 0), this.audioContext = null, this.gainNode = null;
	}
	rebuildClockWithoutAudio() {
		if (!this.audioClock) return;
		let e = this.clock.currentTime;
		this.audioClock = null, this.clock = new We(new Ue()), this.clock.reset(e), this.clock.setRate(this.playbackRate), this.playing && !this.stalled && this.clock.start();
	}
	startRenderLoop() {
		if (this.raf !== null) return;
		let e = () => {
			this.raf = requestAnimationFrame(e), this.renderTick();
		};
		this.raf = requestAnimationFrame(e);
	}
	stopRenderLoop() {
		this.raf !== null && (cancelAnimationFrame(this.raf), this.raf = null);
	}
	renderTick() {
		this.tick();
		let e = this.frames.take(this.clock.currentTime);
		e && (!e.skipDraw && this.ctx && this.ctx.drawImage(e.frame.image, 0, 0, this.canvas.width, this.canvas.height), e.frame.close());
	}
	renderPreviewFrame() {
		let e = this.frames.take(this.seekTarget);
		e && (this.ctx && this.ctx.drawImage(e.frame.image, 0, 0, this.canvas.width, this.canvas.height), e.frame.close());
	}
	acceptFrame(e) {
		this.frames.push(new Xe(e)), this.previewPending && (this.previewPending = !1, this.renderPreviewFrame());
	}
	onAudioData(e) {
		if ((e.timestamp || 0) / 1e6 + e.numberOfFrames / e.sampleRate < this.seekTarget) {
			e.close();
			return;
		}
		this.pendingAudio.push(e), this.drainPendingAudio();
	}
	drainPendingAudio() {
		if (!this.pendingAudio.length) return;
		let e = this.ensureAudioContext();
		if (e) for (; this.pendingAudio.length;) {
			if (this.audioScheduleEnd - e.currentTime >= 1) return;
			let t = this.pendingAudio.shift();
			if (!t) return;
			try {
				this.scheduleAudio(e, t), t.close(), this.audioPrimed = !0;
			} catch (e) {
				t.close(), this.failAudio(e);
				return;
			}
		}
	}
	ensureAudioContext() {
		if (this.audioContext) return this.audioContext;
		if (!this.audioDecoder) return null;
		let e = globalThis.AudioContext;
		return e ? (this.audioContext = new e(), this.gainNode = this.audioContext.createGain(), this.gainNode.gain.value = this.volume, this.gainNode.connect(this.audioContext.destination), this.audioClock = new A(() => this.audioContext?.currentTime ?? 0), this.clock = new We(new Ue(), this.audioClock), this.clock.reset(this.seekTarget), this.clock.setRate(this.playbackRate), this.playing && this.clock.start(), this.audioScheduleEnd = this.audioContext.currentTime, this.audioContext) : null;
	}
	scheduleAudio(e, t) {
		let n = e.createBuffer(t.numberOfChannels, t.numberOfFrames, t.sampleRate);
		for (let e = 0; e < t.numberOfChannels; e += 1) {
			let r = new Float32Array(t.numberOfFrames);
			t.copyTo(r, {
				planeIndex: e,
				format: "f32-planar"
			}), n.copyToChannel(r, e);
		}
		let r = (t.timestamp || 0) / 1e6, i = Math.max(e.currentTime + .03, this.audioScheduleEnd), a = e.createBufferSource();
		a.buffer = n, a.playbackRate.value = this.playbackRate, this.gainNode && a.connect(this.gainNode), a.start(i);
		let o = n.duration / this.playbackRate;
		a.onended = () => this.scheduledSources.delete(a), this.scheduledSources.add(a), this.audioScheduleEnd = i + o, this.audioClock?.addSpan({
			startAt: i,
			endAt: i + o,
			mediaStart: r,
			rate: this.playbackRate
		});
	}
	stopScheduledAudio() {
		let e = this.clock.currentTime;
		for (let e of this.scheduledSources) try {
			e.stop();
		} catch {}
		this.scheduledSources.clear(), this.audioScheduleEnd = this.audioContext?.currentTime ?? 0, this.audioClock?.reset(e);
	}
};
function Qe(e) {
	return e instanceof Error ? e.message : typeof e == "string" ? e : "未知解码错误";
}
//#endregion
//#region src/lib/playback-error.ts
var $e = [
	[/^CORS_BLOCKED(?:$|:)/i, "媒体服务器拒绝网页跨域读取。直接下载可用不代表网页可以读取响应；请为媒体响应配置 Access-Control-Allow-Origin，并允许 GET、HEAD、OPTIONS，暴露 Content-Length、Content-Range、Accept-Ranges。"],
	[/^RANGE_HTTP_401(?:$|:)/i, "媒体地址返回 401 Unauthorized，签名或访问凭证无效。请重新生成直链。"],
	[/^RANGE_HTTP_403(?:$|:)/i, "媒体地址返回 403 Forbidden，当前来源没有读取权限。"],
	[/^RANGE_UNSUPPORTED(?:$|:)/i, "媒体服务器没有返回 206 Partial Content，无法按需定位读取。"],
	[/^DECODER_ERROR_VIDEO(?:$|:)/i, "视频解码失败。当前文件的这一段数据可能已损坏，或浏览器不支持该视频配置。可尝试后退 5 秒继续播放；若整段都无法播放，请换用其他文件验证。"],
	[/^DECODER_ERROR_AUDIO(?:$|:)/i, "音频解码失败，已继续播放视频。可在设置中切换其他音频轨。"],
	[/^DECODER_UNSUPPORTED_VIDEO(?:$|:)/i, (e) => `当前浏览器不支持该视频编码${e ? `（${e}）` : ""}。请使用最新版 Chrome 或 Edge，或改用 H.264 文件。`],
	[/^DECODER_UNSUPPORTED_AUDIO(?:$|:)/i, (e) => `当前浏览器不支持该音频编码${e ? `（${e}）` : ""}，视频仍可播放。`],
	[/^MKV_CLUSTER_TRUNCATED(?:$|:)/i, "文件在此处意外结束，可能下载不完整。请重新下载完整文件后再播放。"],
	[/^MKV_CLUSTER_UNBOUNDED(?:$|:)/i, "文件结构异常（Cluster 长度未声明且过大），无法安全解析。"],
	[/^MKV_CLUSTER_HEADER_INVALID(?:$|:)/i, "读取到无法识别的 Cluster 结构，文件可能已损坏。"],
	[/^MKV_NO_KEYFRAME(?:$|:)/i, "该位置附近找不到关键帧，无法开始解码。请尝试从头播放或改选其他时间点。"],
	[/^MKV_NO_CLUSTER(?:$|:)/i, "文件中没有找到可播放的 Cluster 数据。"],
	[/^MKV_SEGMENT_NOT_FOUND(?:$|:)/i, "不是有效的 Matroska 文件：找不到 Segment 结构。"],
	[/^MKV_TRACKS_NOT_FOUND(?:$|:)/i, "文件中没有找到任何音视频轨道信息。"],
	[/^MKV_EBML_HEADER_INVALID(?:$|:)/i, "文件头不是有效的 EBML/Matroska 结构，请确认这是 MKV 文件。"],
	[/^WORKER_CREATE_FAILED(?:$|:)/i, "解封装 Worker 创建失败。若站点的内容安全策略禁止 blob: Worker，请在播放器配置中提供同源 workerUrl。"],
	[/^WORKER_RUNTIME_FAILED(?:$|:)/i, "解封装 Worker 启动失败。请检查页面是否允许 worker/blob 脚本；在线实操可改用最新版浏览器后重试。"],
	[/^DEMUX_INIT_TIMEOUT(?:$|:)/i, "媒体初始化超时。请确认本地文件可正常读取，或云端地址允许 CORS 与 Range 请求。"]
];
function et(e) {
	for (let [t, n] of $e) {
		if (!t.test(e)) continue;
		if (typeof n == "string") return n;
		let r = e.slice(e.indexOf(":") + 1).trim();
		return n(e.includes(":") ? r : "");
	}
	return e;
}
//#endregion
//#region src/worker/demux.worker.ts?worker&inline
var tt = "const e={A_AAC:`mp4a.40.2`,A_FLAC:`flac`,A_OPUS:`opus`,A_VORBIS:`vorbis`,\"A_MPEG/L3\":`mp3`,A_AC3:`ac-3`,\"A_AC-3\":`ac-3`,A_EAC3:`ec-3`,\"A_E-AC-3\":`ec-3`};function t(t){let i=t.codecId.toUpperCase();return i===`V_MPEG4/ISO/AVC`?n(t.codecPrivate)||`avc1.640028`:i===`V_MPEGH/ISO/HEVC`?r(t.codecPrivate)||`hvc1.1.6.L150.B0`:e[i]??null}function n(e){if(!e||e.byteLength<4)return null;let t=new Uint8Array(e);return t[0]!==1||t.length<4?null:`avc1.${[t[1],t[2],t[3]].map(e=>e.toString(16).padStart(2,`0`)).join(``)}`}function r(e){if(!e||e.byteLength<13)return null;let t=new Uint8Array(e);if(t[0]!==1)return null;let n=(t[1]&192)>>6,r=(t[1]&32)>>5,a=t[1]&31,o=new DataView(t.buffer,t.byteOffset,t.byteLength).getUint32(2),s=[`${[``,`A`,`B`,`C`][n]}${a}`,i(o).toString(16),`${r?`H`:`L`}${t[12]}`],c=Array.from(t.subarray(6,12));for(;c.length&&c[c.length-1]===0;)c.pop();return s.push(...c.map(e=>e.toString(16).toUpperCase().padStart(2,`0`))),`hvc1.${s.join(`.`)}`}function i(e){let t=0;for(let n=0;n<32;n+=1)t=t<<1|e>>>n&1;return t>>>0}const a=new Set([`S_TEXT/UTF8`,`S_TEXT/ASCII`,`S_TEXT/ASS`,`S_TEXT/SSA`,`S_ASS`,`S_SSA`]);function o(e){return e.kind===`subtitle`&&a.has(e.codecId.toUpperCase())}function s(e,t){if(t>=e.length)return null;let n=e[t];if(n===0)return null;let r=128,i=1;for(;i<=8&&!(n&r);)r>>=1,i+=1;if(i>8||t+i>e.length)return null;let a=n&r-1,o=a===r-1;for(let n=1;n<i;n+=1){let r=e[t+n];a=a*256+r,r!==255&&(o=!1)}return o?{length:i,value:a,unknown:!0}:Number.isSafeInteger(a)?{length:i,value:a,unknown:!1}:null}function c(e,t){if(t<0||t>=e.length)return null;let n=e[t];if(n===0)return null;let r=128,i=1;for(;i<=4&&!(n&r);)r>>=1,i+=1;if(i>4||t+i>=e.length)return null;let a=0;for(let n=0;n<i;n+=1)a=a*256+e[t+n];let o=s(e,t+i);if(!o)return null;let c=t+i+o.length;if(o.unknown)return{id:a,data:c,size:-1,end:e.length,unknownSize:!0,truncated:!1};if(!Number.isSafeInteger(c+o.value))return null;let l=c+o.value;return{id:a,data:c,size:o.value,end:l,unknownSize:!1,truncated:l>e.length}}function l(e,t,n,r){let i=t,a=Math.min(n,e.length);for(;i<a;){let t=c(e,i);if(!t||t.truncated||t.end>a||t.end<=i)return{complete:!1,consumed:i};r(t),i=t.end}return{complete:i===a,consumed:i}}function u(e,t,n,r){let i=t,a=Math.min(n,e.length);for(;i<a;){let t=c(e,i);if(!t)return null;if(t.id===r)return t;if(t.truncated||t.unknownSize||t.end<=i)return null;i=t.end}return null}function d(e,t){let n=0;for(let r=t.data;r<Math.min(t.end,e.length);r+=1)n=n*256+e[r];return n}function f(e,t){let n=e[t]<<8|e[t+1];return n&32768?n-65536:n}function p(e,t){return new TextDecoder().decode(e.subarray(t.data,Math.min(t.end,e.length))).replace(/\\0+$/,``)}function m(e,t){if(t.end>e.length)return 0;let n=new DataView(e.buffer,e.byteOffset+t.data,t.size);return t.size===4?n.getFloat32(0):t.size===8?n.getFloat64(0):d(e,t)}function h(e,t){return e.slice(t.data,Math.min(t.end,e.length)).buffer}function g(e,t,n,r){let i=[],a=t;for(let t=0;t<r;t+=1){let t=0;for(;;){if(a>=n)return null;let r=e[a];if(a+=1,t+=r,r!==255)break}i.push(t)}return{sizes:i,offset:a}}function _(e,t,n,r){let i=[],a=t,o=s(e,a);if(!o||a+o.length>n)return null;a+=o.length,i.push(o.value);for(let t=1;t<r;t+=1){let t=s(e,a);if(!t||a+t.length>n)return null;a+=t.length;let r=2**(7*t.length-1)-1,o=i[i.length-1]+(t.value-r);if(o<0)return null;i.push(o)}return{sizes:i,offset:a}}function v(e,t,n){let r=Math.min(t.end,e.length);if(r-t.data<4)return[];let i=s(e,t.data);if(!i||t.data+i.length+3>r)return[];let a=i.value;if(!n.trackIds.has(a))return[];let o=f(e,t.data+i.length),c=e[t.data+i.length+2],l=t.data+i.length+3,u=(c&6)>>1,d=n.kind===`simple`?!!(c&128):!n.groupHasReference,p=Math.round((n.clusterTime+o)*n.timecodeScale/1e3),m=n.defaultDurations?.get(a),h=n.blockDurationTicks===void 0?void 0:Math.round(n.blockDurationTicks*n.timecodeScale/1e3);if(u===0)return[{trackId:a,timestamp:p,duration:h===void 0?m===void 0?0:Math.round(m/1e3):h,key:d,data:e.slice(l,r)}];if(l>=r)return[];let v=e[l]+1;if(v<1)return[];let y=l+1,b;if(u===2){let e=r-y;if(e<=0||e%v!==0)return[];b=Array(v).fill(e/v)}else{let t=u===1?g(e,y,r,v-1):_(e,y,r,v-1);if(!t)return[];y=t.offset;let n=t.sizes.reduce((e,t)=>e+t,0),i=r-y;if(n>i)return[];b=[...t.sizes,i-n]}if(b.some(e=>e<0))return[];let x=h===void 0?m===void 0?0:Math.round(m/1e3):Math.round(h/v),S=[];for(let t=0;t<b.length;t+=1){let n=b[t];if(y+n>r)return[];S.push({trackId:a,timestamp:p+t*x,duration:x,key:d,data:e.slice(y,y+n)}),y+=n}return S}const y=[26,69,223,163];function b(e){return e.length>=y.length&&y.every((t,n)=>e[n]===t)}const x={segment:408125543,info:357149030,timecodeScale:2807729,duration:17545,tracks:374648427,trackEntry:174,trackNumber:215,trackType:131,codecId:134,codecPrivate:25506,language:2274716,name:21358,defaultDuration:2352003,video:224,pixelWidth:176,pixelHeight:186,audio:225,samplingFrequency:181,channels:159,cues:475249515,cuePoint:187,cueTime:179,cueTrackPositions:183,cueTrack:247,cueClusterPosition:241,cueRelativePosition:240,seekHead:290298740,seek:19899,seekId:21419,seekPosition:21420,cluster:524531317,timecode:231,simpleBlock:163,blockGroup:160,block:161,blockDuration:155,referenceBlock:251},S=new Set([x.timecode,22612,167,171,x.simpleBlock,x.blockGroup,175]),C=[1048576,4194304,16777216],w=65536,T=67108864;function E(e,n){let r=0,i=0,a=``,o,s,c,u,f,g,_,v;l(e,n.data,n.end,t=>{t.id===x.trackNumber?r=d(e,t):t.id===x.trackType?i=d(e,t):t.id===x.codecId?a=p(e,t):t.id===x.codecPrivate?o=h(e,t):t.id===x.language?s=p(e,t):t.id===x.name?c=p(e,t):t.id===x.defaultDuration?v=d(e,t):t.id===x.video?l(e,t.data,t.end,t=>{t.id===x.pixelWidth&&(u=d(e,t)),t.id===x.pixelHeight&&(f=d(e,t))}):t.id===x.audio&&l(e,t.data,t.end,t=>{t.id===x.samplingFrequency&&(g=Math.round(m(e,t))),t.id===x.channels&&(_=d(e,t))})});let y=i===1?`video`:i===2?`audio`:i===17?`subtitle`:null;if(!r||!y||!a)return null;let b={id:r,kind:y,codecId:a,codecPrivate:o,language:s,name:c,width:u,height:f,sampleRate:g,channels:_,defaultDurationNs:v};return b.codec=t(b)||void 0,b}var D=class{loader;selected=new Set;metadata=null;cues=[];clusterIndex=[];defaultDurations=new Map;segmentDataStart=0;segmentEnd=1/0;firstClusterOffset=0;cursor=0;atEnd=!1;constructor(e){this.loader=e}get endOfStream(){return this.atEnd}async init(){let e=await this.loader.probe();if(e.cors===`blocked`)throw Error(`CORS_BLOCKED:${e.message||``}`);let t=e.size??this.loader.totalSize??C[C.length-1],n=new Uint8Array,r=null,i=!1;for(let e of C){if(n=await this.loader.read(0,Math.min(e,t)),!b(n))throw Error(`MKV_EBML_HEADER_INVALID`);if(r=u(n,0,n.length,x.segment),!r){if(!c(n,0)||n.length>=t)throw Error(`MKV_SEGMENT_NOT_FOUND`);continue}if(i=u(n,r.data,Math.min(r.end,n.length),x.tracks)?.truncated===!1,i||n.length>=t)break}if(!r)throw Error(`MKV_SEGMENT_NOT_FOUND`);this.segmentDataStart=r.data,this.segmentEnd=r.unknownSize?this.loader.totalSize??t:Math.min(r.data+r.size,this.loader.totalSize??1/0);let a=1e6,s=0,f=[],p=null,h=null;if(l(n,r.data,Math.min(r.end,n.length),e=>{e.id===x.info?l(n,e.data,e.end,e=>{e.id===x.timecodeScale&&(a=d(n,e)),e.id===x.duration&&(s=m(n,e))}):e.id===x.tracks?l(n,e.data,e.end,e=>{if(e.id===x.trackEntry){let t=E(n,e);t&&f.push(t)}}):e.id===x.cues?p=e:e.id===x.seekHead&&(h=e)}),!f.length)throw Error(`MKV_TRACKS_NOT_FOUND`);this.selected.clear();for(let e of[`video`,`audio`]){let t=f.find(t=>t.kind===e);t&&this.selected.add(t.id)}f.filter(o).forEach(e=>this.selected.add(e.id)),this.defaultDurations=new Map(f.filter(e=>e.defaultDurationNs).map(e=>[e.id,e.defaultDurationNs])),this.metadata={tracks:f,duration:s?s*a/1e9:0,timecodeScale:a},p?this.parseCues(n,p,a):h&&await this.loadCuesViaSeekHead(n,h,a);let g=await this.locateFirstCluster(n,r);if(g<0)throw Error(`MKV_NO_CLUSTER`);return this.firstClusterOffset=g,this.cursor=g,this.atEnd=!1,this.metadata}async locateFirstCluster(e,t){let n=e,r=0,i=t.data,a=0;for(;i<this.segmentEnd&&a<4096;){if(a+=1,i<r||i-r+16>n.length){let e=await this.loader.readWindow(i,w);if(n=e.bytes,r=e.base,i-r>=n.length)return-1}let e=c(n,i-r);if(!e)return-1;if(e.id===x.cluster)return i;if(e.unknownSize)return-1;e.id===x.cues&&!this.cues.length&&!e.truncated&&this.parseCues(n,e,this.metadata?.timecodeScale??1e6);let t=r+e.end;if(t<=i)return-1;i=t}return-1}async loadCuesViaSeekHead(e,t,n){let r=-1;if(l(e,t.data,t.end,t=>{if(t.id!==x.seek)return;let n=0,i=-1;l(e,t.data,t.end,t=>{t.id===x.seekId&&(n=d(e,t)),t.id===x.seekPosition&&(i=d(e,t))}),n===x.cues&&i>=0&&(r=i)}),r<0)return;let i=this.segmentDataStart+r;try{let{bytes:e,base:t}=await this.loader.readWindow(i,w),r=c(e,i-t);if(!r||r.id!==x.cues)return;let a=r.end-(i-t),o=r.truncated?await this.loader.readWindow(i,a):{bytes:e,base:t},s=c(o.bytes,i-o.base);s&&s.id===x.cues&&!s.truncated&&this.parseCues(o.bytes,s,n)}catch{}}parseCues(e,t,n){let r=[];l(e,t.data,Math.min(t.end,e.length),t=>{if(t.id!==x.cuePoint)return;let i=0;l(e,t.data,t.end,t=>{if(t.id===x.cueTime&&(i=d(e,t)),t.id===x.cueTrackPositions){let a=0,o=-1;l(e,t.data,t.end,t=>{t.id===x.cueTrack&&(a=d(e,t)),t.id===x.cueClusterPosition&&(o=d(e,t))}),o>=0&&r.push({time:i*n/1e9,offset:this.segmentDataStart+o,track:a})}})}),this.cues=r.sort((e,t)=>e.time-t.time)}resolveSeekOffset(e){let t=this.cueOffsetFor(e);return t>=0?t:this.indexOffsetFor(e)?.offset??this.firstClusterOffset}cueOffsetFor(e){let t=this.metadata?.tracks.find(e=>e.kind===`video`),n=t?this.cues.filter(e=>e.track===t.id):[],r=n.length?n:this.cues,i=-1;for(let t of r)if(t.time<=e)i=t.offset;else break;return i}indexOffsetFor(e){let t=null;for(let n of this.clusterIndex)n.time<=e&&(!t||n.time>=t.time)&&(t=n);return t}async seekOffsetFor(e){if(e<=0)return this.resolveSeekOffset(e);let t=this.cueOffsetFor(e);if(t>=0)return t;let n=this.indexOffsetFor(e);if(n&&e-n.time<=4)return n.offset;let r=n?.offset??this.firstClusterOffset,i=await this.scanForCluster(e,n?.time??0,r);return i>=0?i:r}async scanForCluster(e,t,n){let r=Number.isFinite(this.segmentEnd)?this.segmentEnd:this.loader.totalSize??0;if(!r||r<=n)return-1;let i=n,a=r,o=t<=e?n:-1;for(let t=0;t<12&&i<a;t+=1){let t=Math.floor((i+a)/2),n=await this.clusterAtOrAfter(t,a);if(!n||n.offset>=a){a=t;continue}n.time<=e?(o=n.offset,i=n.offset+1):a=t}return o}async clusterAtOrAfter(e,t){let n=Math.max(e,0);for(let e=0;e<8&&n<t;e+=1){let{bytes:e,base:t}=await this.loader.readWindow(n,262144),r=n-t;if(r>=e.length)return null;for(let n=r;n+4<=e.length;n+=1){if(e[n]!==31||e[n+1]!==67||e[n+2]!==182||e[n+3]!==117)continue;let r=c(e,n);if(!r||r.id!==x.cluster)continue;let i=-1;if(l(e,r.data,Math.min(r.end,e.length),t=>{i<0&&t.id===x.timecode&&(i=d(e,t))}),i<0)continue;let a=t+n,o=i*(this.metadata?.timecodeScale??1e6)/1e9;return this.recordCluster(a,o),{offset:a,time:o}}n=t+Math.max(e.length-3,1)}return null}async packetsFor(e=0){if(!this.metadata)throw Error(`DEMUX_NOT_INITIALIZED`);return this.cursor=await this.seekOffsetFor(e),this.atEnd=!1,this.next()}async next(){if(!this.metadata)throw Error(`DEMUX_NOT_INITIALIZED`);let e=[],t=0,n=1/0,r=-1/0;for(;!this.atEnd&&this.cursor<this.segmentEnd;){let i=await this.readClusterAt(this.cursor);if(i.nextOffset<=this.cursor){this.atEnd=!0;break}if(this.cursor=i.nextOffset,this.cursor>=this.segmentEnd&&(this.atEnd=!0),i.packets.length){t+=1;for(let t of i.packets){e.push(t);let i=t.timestamp/1e6;i<n&&(n=i),i>r&&(r=i)}}if(i.truncated||e.length&&(t>=24||r-n>=2))break}return this.cursor>=this.segmentEnd&&(this.atEnd=!0),e}select(e,t){this.metadata?.tracks.find(n=>n.id===t&&n.kind===e)&&e!==`subtitle`&&(this.metadata?.tracks.filter(t=>t.kind===e).forEach(e=>this.selected.delete(e.id)),this.selected.add(t))}async readClusterAt(e){let{bytes:t,base:n}=await this.loader.readWindow(e,w),r=e-n;if(r>=t.length)return{packets:[],nextOffset:this.segmentEnd,truncated:!0};let i=c(t,r);if(!i)throw Error(`MKV_CLUSTER_HEADER_INVALID`);if(i.id!==x.cluster)return i.unknownSize?{packets:[],nextOffset:this.segmentEnd,truncated:!1}:{packets:[],nextOffset:n+i.end,truncated:!1};if(i.unknownSize)return this.readUnboundedCluster(e);let a=i.data-r+i.size;if(e+a>this.segmentEnd){let n=Math.min(t.length-r,Math.max(0,this.segmentEnd-e));return{packets:this.parseClusterBody(t,r,r+n,e),nextOffset:this.segmentEnd,truncated:!0}}if(a>t.length-r){let i=await this.loader.readWindow(e,a);if(t=i.bytes,n=i.base,r=e-n,a>t.length-r){let n=Math.max(0,t.length-r);return{packets:this.parseClusterBody(t,r,r+n,e),nextOffset:this.segmentEnd,truncated:!0}}}return{packets:this.parseClusterBody(t,r,r+a,e),nextOffset:e+a,truncated:!1}}async readUnboundedCluster(e){let t=w;for(;;){let{bytes:n,base:r}=await this.loader.readWindow(e,t),i=e-r,a=c(n,i);if(!a)throw Error(`MKV_CLUSTER_HEADER_INVALID`);let o=a.data,s=-1,l=!1;for(;o<n.length;){let e=c(n,o);if(!e){l=!0;break}if(!S.has(e.id)){s=o;break}if(e.truncated){l=!0;break}o=e.end}if(s<0&&l&&n.length-i>=t&&t<T){t*=4;continue}let u=s>=0?s:Math.min(o,n.length);if(s<0&&t>=T)throw Error(`MKV_CLUSTER_UNBOUNDED`);return{packets:this.parseClusterBody(n,i,u,e),nextOffset:r+u,truncated:!1}}}parseClusterBody(e,t,n,r){let i=c(e,t);if(!i)return[];let a=0,o=[],s=new Set(this.selected),u=this.metadata?.timecodeScale||1e6;return l(e,i.data,Math.min(n,e.length),t=>{if(t.id===x.timecode){a=d(e,t),this.recordCluster(r,a*u/1e9);return}if(t.id===x.simpleBlock){o.push(...v(e,t,{clusterTime:a,timecodeScale:u,trackIds:s,kind:`simple`,defaultDurations:this.defaultDurations}));return}if(t.id===x.blockGroup){let n=!1,r;l(e,t.data,t.end,t=>{t.id===x.referenceBlock&&(n=!0),t.id===x.blockDuration&&(r=d(e,t))}),l(e,t.data,t.end,t=>{t.id===x.block&&o.push(...v(e,t,{clusterTime:a,timecodeScale:u,trackIds:s,kind:`group`,groupHasReference:n,blockDurationTicks:r,defaultDurations:this.defaultDurations}))})}}),o}recordCluster(e,t){this.clusterIndex.some(t=>t.offset===e)||(this.clusterIndex.push({offset:e,time:t}),this.clusterIndex.sort((e,t)=>e.offset-t.offset))}},O=class{source;chunkSize;chunks=new Map;inflight=new Map;cachedBytes=0;downloadedBytes=0;size=null;contentType=null;rangeSupport=!1;fullBody=null;lastProbe={size:null,contentType:null,acceptsRanges:!1,status:null,cors:`unknown`};constructor(e,t=1048576){this.source=e,this.chunkSize=t}async probe(){if(this.source.kind===`file`)return this.size=this.source.file.size,this.contentType=this.source.file.type||`video/x-matroska`,this.rangeSupport=!0,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:!0,status:200,cors:`ok`},this.lastProbe;let e=null;try{e=await fetch(this.source.url,{method:`HEAD`,redirect:`follow`})}catch{}if(e&&(this.size=this.parseLength(e.headers.get(`content-length`)),this.contentType=e.headers.get(`content-type`),this.rangeSupport=e.headers.get(`accept-ranges`)?.toLowerCase()===`bytes`,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:this.rangeSupport,status:e.status,cors:`ok`,message:e.ok&&this.rangeSupport?void 0:e.ok?`正在验证 GET Range 响应`:`探测请求返回 HTTP ${e.status}`},e.ok&&this.rangeSupport))return this.lastProbe;try{let e=await fetch(this.source.url,{headers:{Range:`bytes=0-0`},redirect:`follow`});return this.updateFromResponse(e),e.body&&await e.body.cancel(),this.lastProbe}catch(t){return this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:!1,status:e?.status||null,cors:`blocked`,message:t instanceof Error?t.message:`跨域或网络请求被阻止`},this.lastProbe}}async read(e,t){if(e<0||t<=0)throw Error(`READ_RANGE_INVALID`);let n=this.size===null?t:Math.min(t,Math.max(0,this.size-e));if(n<=0)return new Uint8Array;if(this.source.kind===`file`)return new Uint8Array(await this.source.file.slice(e,e+n).arrayBuffer());if(this.fullBody)return this.fullBody.slice(e,e+n);let r=Math.floor(e/this.chunkSize),i=Math.floor((e+n-1)/this.chunkSize);await this.ensureChunks(r,i);let a=this.fullBody;return a?a.slice(e,e+n):(this.prefetch(i+1,i+4),this.assemble(e,n))}async readChunk(e){return this.read(e,this.chunkSize)}async readWindow(e,t){if(e<0||t<=0)throw Error(`READ_RANGE_INVALID`);if(this.source.kind===`file`)return{bytes:await this.read(e,t),base:e};let n=Math.floor(e/this.chunkSize)*this.chunkSize,r=e-n+t,i=Math.max(this.chunkSize,r);return{bytes:await this.read(n,i),base:n}}async ensureChunks(e,t){let n=[],r=-1;for(let i=e;i<=t+1;i+=1){let e=i<=t&&!this.chunks.has(i)&&!this.inflight.has(i);e&&r<0&&(r=i),!e&&r>=0&&(n.push(this.startRun(r,i-1)),r=-1);let a=i<=t?this.inflight.get(i):void 0;a&&n.push(a)}n.length&&await Promise.all(n)}startRun(e,t){let n=this.fetchRun(e,t).finally(()=>{for(let r=e;r<=t;r+=1)this.inflight.get(r)===n&&this.inflight.delete(r)});for(let r=e;r<=t;r+=1)this.inflight.set(r,n);return n}prefetch(e,t){if(this.fullBody||this.size===null)return;let n=Math.floor(Math.max(0,this.size-1)/this.chunkSize),r=Math.min(t,n);for(let t=e;t<=r;t+=1){if(this.chunks.has(t)||this.inflight.has(t))continue;let e=t;for(;e+1<=r&&!this.chunks.has(e+1)&&!this.inflight.has(e+1);)e+=1;this.startRun(t,e).catch(()=>void 0),t=e}}async fetchRun(e,t){let n=e*this.chunkSize,r=(t+1)*this.chunkSize-1,i=this.size===null?r:Math.min(r,this.size-1);if(i<n)return;let a=await this.fetchWithRetry({Range:`bytes=${n}-${i}`});if(a.status===416){(this.size===null||this.size>n)&&(this.size=n);return}if(!a.ok)throw Error(`RANGE_HTTP_${a.status}`);let o=new Uint8Array(await a.arrayBuffer());if(this.downloadedBytes+=o.byteLength,a.status===206){if(this.updateFromResponse(a),!o.byteLength){(this.size===null||this.size>n)&&(this.size=n);return}this.storeChunks(n,o);return}if(a.status===200){if(o.byteLength>536870912)throw Error(`RANGE_UNSUPPORTED:服务器忽略 Range 且文件过大`);this.fullBody=o,this.size=o.byteLength,this.contentType=a.headers.get(`content-type`)||this.contentType,this.rangeSupport=!1,this.chunks.clear(),this.cachedBytes=0,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:!1,status:a.status,cors:`ok`,message:`资源未返回 206 Partial Content，将使用完整响应读取`};return}throw Error(`RANGE_HTTP_${a.status}`)}async fetchWithRetry(e){let t=this.source.kind===`url`?this.source.url:``,n=null;for(let r=0;r<2;r+=1)try{let n=await fetch(t,{headers:e,redirect:`follow`});if(n.status>=500&&r===0){await k(200);continue}return n}catch(e){n=e,r===0&&await k(200)}throw n instanceof Error?n:Error(`RANGE_NETWORK_ERROR`)}storeChunks(e,t){for(let n=0;n<t.byteLength;n+=this.chunkSize){let r=(e+n)/this.chunkSize;if(!Number.isInteger(r))continue;let i=t.slice(n,n+this.chunkSize),a=this.chunks.get(r);a&&(this.cachedBytes-=a.byteLength),this.chunks.set(r,i),this.cachedBytes+=i.byteLength}this.evict()}evict(){for(;this.cachedBytes>134217728;){let e=this.chunks.keys().next();if(e.done)break;let t=this.chunks.get(e.value);this.chunks.delete(e.value),this.cachedBytes-=t?.byteLength??0}}assemble(e,t){let n=new Uint8Array(t),r=0;for(;r<t;){let i=e+r,a=Math.floor(i/this.chunkSize),o=this.chunks.get(a);if(!o)break;this.chunks.delete(a),this.chunks.set(a,o);let s=i-a*this.chunkSize;if(s>=o.byteLength)break;let c=Math.min(o.byteLength-s,t-r);n.set(o.subarray(s,s+c),r),r+=c}return r===t?n:n.slice(0,r)}parseLength(e){let t=Number(e);return Number.isFinite(t)&&t>0?t:null}updateFromResponse(e){let t=e.headers.get(`content-range`)?.match(/^bytes\\s+(\\d+)-(\\d+)\\/(\\d+|\\*)$/i),n=t?.[3]&&t[3]!==`*`?Number(t[3]):null;n&&Number.isFinite(n)&&(this.size=n),this.contentType=e.headers.get(`content-type`)||this.contentType,this.rangeSupport=e.status===206,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:this.rangeSupport,status:e.status,cors:`ok`,message:this.rangeSupport?void 0:`资源未返回 206 Partial Content`}}get totalSize(){return this.size}get supportsRange(){return this.rangeSupport}get probeInfo(){return this.lastProbe}get networkBytes(){return this.downloadedBytes}};function k(e){return new Promise(t=>setTimeout(t,e))}let A=null,j=!1,M=0,N=Promise.resolve();function P(e){if(e.type===`packets`){let t=e.packets.map(e=>e.data.buffer);self.postMessage(e,t)}else self.postMessage(e)}self.onmessage=e=>{let t=e.data;t.type===`init`?M=0:`epoch`in t&&t.epoch>M&&(M=t.epoch),N=N.then(()=>F(t)).catch(()=>void 0)};async function F(e){let t=`epoch`in e?e.epoch:0;try{if(e.type===`init`){j=!1;let t=new O(e.source);A=new D(t),P({type:`progress`,phase:`加载 TypeScript 解封装器`,value:.08}),P({type:`progress`,phase:`读取 Matroska 头部`,value:.1}),P({type:`metadata`,metadata:await A.init(),probe:t.probeInfo}),P({type:`progress`,phase:`解析首个 Cluster`,value:.35});let n=await A.packetsFor(0);j=!0,P({type:`packets`,packets:n,epoch:0});return}if(!A||!j){(e.type===`next`||e.type===`seek`||e.type===`select-track`)&&P({type:`packets`,packets:[],epoch:t});return}if(t<M&&(e.type===`next`||e.type===`seek`))return;if(e.type===`seek`)P({type:`progress`,phase:`定位关键帧`,value:.2}),P({type:`packets`,packets:await A.packetsFor(e.time),epoch:t});else if(e.type===`next`){let e=await A.next();e.length?P({type:`packets`,packets:e,epoch:t}):A.endOfStream?P({type:`eof`,epoch:t}):P({type:`packets`,packets:[],epoch:t})}else e.type===`select-track`?(A.select(e.kind,e.trackId),e.kind===`subtitle`?P({type:`packets`,packets:[],epoch:t}):P({type:`packets`,packets:await A.packetsFor(e.time),epoch:t})):e.type===`close`&&(A=null,j=!1,P({type:`eof`,epoch:t}))}catch(e){P({type:`error`,code:e instanceof Error?e.message.split(`:`)[0]:`DEMUX_ERROR`,message:e instanceof Error?e.message:`Matroska 解析失败`})}}\n//# sourceMappingURL=demux.worker-BWgC37uP.js.map", nt = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", tt], { type: "text/javascript;charset=utf-8" });
function rt(e) {
	let t;
	try {
		if (t = nt && (self.URL || self.webkitURL).createObjectURL(nt), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(tt), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region src/worker/worker-factory.ts
var it = {
	name: "mx-player-demux",
	type: "module"
};
function at(e, t, n = Worker) {
	return e ? new n(e, it) : new t(it);
}
//#endregion
//#region src/worker/create-demux-worker.ts
function ot(e) {
	try {
		return at(e, rt);
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		throw Error(`WORKER_CREATE_FAILED:${t}`);
	}
}
//#endregion
//#region node_modules/.pnpm/react@19.2.8/node_modules/react/cjs/react-jsx-runtime.production.js
var st = /* @__PURE__ */ e(((e) => {
	var t = Symbol.for("react.transitional.element");
	function n(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.jsx = n, e.jsxs = n;
})), j = (/* @__PURE__ */ e(((e, t) => {
	t.exports = st();
})))();
function ct({ currentTime: e, duration: t, bufferedEnd: n, source: r, onSeek: i }) {
	let a = (0, h.useRef)(null), o = (0, h.useRef)(null), [s, c] = (0, h.useState)(""), [l, u] = (0, h.useState)(!1), [d, f] = (0, h.useState)(0), [p, m] = (0, h.useState)(80), [g, _] = (0, h.useState)(!1), [v, y] = (0, h.useState)(!1);
	(0, h.useEffect)(() => {
		if (!r) {
			c("");
			return;
		}
		if (r.kind === "url") {
			c(r.url);
			return;
		}
		let e = URL.createObjectURL(r.file);
		return c(e), () => URL.revokeObjectURL(e);
	}, [r]), (0, h.useEffect)(() => {
		_(!1), y(!1), u(!1), o.current !== null && window.clearTimeout(o.current), o.current = null;
	}, [s]), (0, h.useEffect)(() => () => {
		o.current !== null && window.clearTimeout(o.current);
	}, []);
	let b = Number.isFinite(t) && t > 0 ? t : .01, x = lt(Math.max(0, e) / b * 100), ee = lt(Math.max(0, n) / b * 100);
	function S(e) {
		o.current !== null && window.clearTimeout(o.current), o.current = window.setTimeout(() => {
			o.current = null;
			let t = a.current;
			if (!t || v || t.readyState < 1) return;
			let n = Math.min(Math.max(0, e), Math.max(0, b - .05));
			try {
				t.currentTime = n, t.pause();
			} catch {
				y(!0);
			}
		}, 80);
	}
	function C(e) {
		if (e.pointerType && !["mouse", "pen"].includes(e.pointerType)) return;
		let t = e.currentTarget.getBoundingClientRect();
		if (t.width <= 0) return;
		let n = Math.min(t.width, Math.max(0, e.clientX - t.left)), r = Math.min(80, t.width / 2), i = n / t.width * b;
		m(Math.min(t.width - r, Math.max(r, n))), f(i), u(!0), S(i);
	}
	function te(e) {
		i(Number(e.target.value));
	}
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "mx-player-progress",
		"data-player-control": !0,
		onPointerMove: C,
		onPointerLeave: () => u(!1),
		children: [
			l && /* @__PURE__ */ (0, j.jsxs)("div", {
				className: `mx-player-progress-preview ${g ? "frame-ready" : ""}`,
				style: { left: `${p}px` },
				"aria-hidden": "true",
				children: [
					s && !v && /* @__PURE__ */ (0, j.jsx)("video", {
						ref: a,
						className: "mx-player-progress-preview-video",
						src: s,
						muted: !0,
						playsInline: !0,
						preload: "auto",
						onLoadedMetadata: () => S(d),
						onSeeked: () => _(!0),
						onError: () => y(!0)
					}),
					/* @__PURE__ */ (0, j.jsx)("span", { className: "mx-player-progress-preview-empty" }),
					/* @__PURE__ */ (0, j.jsx)("time", { children: ut(d) })
				]
			}),
			/* @__PURE__ */ (0, j.jsxs)("div", {
				className: "mx-player-progress-rail",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, j.jsx)("span", {
					className: "buffered",
					style: { width: `${ee}%` }
				}), /* @__PURE__ */ (0, j.jsx)("span", {
					className: "played",
					style: { width: `${x}%` }
				})]
			}),
			/* @__PURE__ */ (0, j.jsx)("input", {
				type: "range",
				min: "0",
				max: b,
				step: "0.05",
				value: Math.min(Math.max(0, e), b),
				"aria-label": "播放进度",
				"aria-valuetext": `${ut(e)}，已缓冲至 ${ut(n)}`,
				onChange: te
			})
		]
	});
}
function lt(e) {
	return Math.min(100, Math.max(0, Number.isFinite(e) ? e : 0));
}
function ut(e) {
	let t = Math.max(0, Math.floor(Number.isFinite(e) ? e : 0)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60).toString().padStart(n ? 2 : 1, "0"), i = (t % 60).toString().padStart(2, "0");
	return n ? `${n}:${r}:${i}` : `${r}:${i}`;
}
//#endregion
//#region src/components/PlayerSurface.tsx
var dt = "1.2.6", ft = 2048, pt = "ABCabc123", mt = "字幕示例", ht = 34, gt = 4, _t = 42, vt = {
	currentTime: 0,
	bufferedStart: 0,
	bufferedEnd: 0,
	bufferedAhead: 0,
	bufferedBytes: 0,
	stalled: !1,
	droppedFrames: 0
}, yt = (0, h.forwardRef)(function(e, t) {
	let { source: n, label: r = "MX Player Pro", onExit: i, embedded: a = !1, autoplay: o = !1, initialVolume: s = .85, initialMuted: c = !1, workerUrl: l, onNext: u, qualities: d = [], selectedQuality: f = "auto", onQualityChange: p, danmaku: m, className: g, style: _ } = e, v = (0, h.useRef)(null), y = (0, h.useRef)(null), ee = (0, h.useRef)(null), S = (0, h.useRef)(null), C = (0, h.useRef)(0), w = (0, h.useRef)(!1), fe = (0, h.useRef)(!1), pe = (0, h.useRef)(!1), D = (0, h.useRef)(null), ge = (0, h.useRef)(null), _e = (0, h.useRef)(null), ve = (0, h.useRef)({
		x: 0,
		y: 0
	}), ye = (0, h.useRef)(!1), [be, xe] = (0, h.useState)(null), [Se, Ce] = (0, h.useState)(null), [we, k] = (0, h.useState)(n ? "正在连接媒体…" : "等待媒体地址"), [Ee, ke] = (0, h.useState)(""), [je, Me] = (0, h.useState)(!1), [Ne, Le] = (0, h.useState)(c), [Re, Ve] = (0, h.useState)(Mt(s)), [He, Ue] = (0, h.useState)(1), [A, We] = (0, h.useState)(0), [Ge, Ke] = (0, h.useState)(), [qe, Je] = (0, h.useState)(), [Ye, Xe] = (0, h.useState)(!0), [Qe, $e] = (0, h.useState)(null), [tt, nt] = (0, h.useState)(!1), [rt, it] = (0, h.useState)([]), [at, st] = (0, h.useState)(!1), [lt, ut] = (0, h.useState)(!1), [dt, ht] = (0, h.useState)("track"), [gt, yt] = (0, h.useState)(!1), [Nt, Pt] = (0, h.useState)(() => ze(jt(n))), [Ft, It] = (0, h.useState)(!0), [Lt, Rt] = (0, h.useState)(!1), [zt, Bt] = (0, h.useState)(!1), [Vt, Ht] = (0, h.useState)({
		open: !1,
		x: 0,
		y: 0
	}), [Ut, Wt] = (0, h.useState)(!1), [Gt, Kt] = (0, h.useState)(!1), [qt, Jt] = (0, h.useState)("等待 WebCodecs…"), [Yt, Xt] = (0, h.useState)(vt), [Zt, Qt] = (0, h.useState)(m?.visible ?? !0), [$t, en] = (0, h.useState)(0), tn = (0, h.useRef)(!1), nn = (0, h.useRef)(void 0), rn = (0, h.useRef)(void 0), an = (0, h.useRef)([]), on = (0, h.useRef)(!0), sn = (0, h.useRef)(/* @__PURE__ */ new Set()), cn = (0, h.useRef)(!1), ln = (0, h.useRef)(null), un = (0, h.useRef)(!1), dn = (0, h.useRef)(/* @__PURE__ */ new Map()), fn = (0, h.useRef)(/* @__PURE__ */ new Map()), pn = (0, h.useRef)(""), mn = (0, h.useRef)(() => void 0), hn = (0, h.useRef)(() => void 0), gn = (0, h.useRef)(0), _n = (0, h.useRef)(jt(n)), vn = (0, h.useRef)(!1), yn = (0, h.useRef)(() => void 0), bn = (0, h.useRef)(!1), xn = (0, h.useRef)(!1), Sn = (0, h.useRef)(!1), Cn = (0, h.useRef)(e), wn = (0, h.useRef)(null), Tn = (0, h.useRef)(null);
	Cn.current = e;
	let En = be?.tracks.filter((e) => e.kind === "video") || [], Dn = be?.tracks.filter((e) => e.kind === "audio") || [], On = be?.tracks.filter((e) => e.kind === "subtitle") || [], kn = On.filter(De), An = be?.duration || 0, jn = kn.find((e) => e.id === Qe), Mn = Dt(En.find((e) => e.id === Ge) || En[0], Dn.find((e) => e.id === qe) || Dn[0]), Nn = lt || gt;
	tn.current = je, nn.current = Ge, rn.current = qe, ln.current = Qe, un.current = tt, bn.current = lt, xn.current = gt, gn.current = An, mn.current = In, hn.current = Pn, yn.current = lr, (0, h.useImperativeHandle)(t, () => ({
		play: zn,
		pause: Bn,
		toggle: Vn,
		seek: Hn,
		setVolume: mr,
		setMuted: (e) => {
			Le(e), S.current?.setVolume(e ? 0 : Re);
		},
		setPlaybackRate: (e) => {
			let t = Math.max(.25, Math.min(4, e));
			Ue(t), S.current?.setPlaybackRate(t);
		},
		requestFullscreen: Wn,
		requestPictureInPicture: Gn,
		getState: () => ({
			ready: pe.current,
			playing: tn.current,
			currentTime: S.current?.currentTime ?? A,
			duration: An,
			volume: Re,
			muted: Ne,
			playbackRate: He,
			bufferedAhead: Yt.bufferedAhead,
			stalled: Yt.stalled,
			error: Ee || null
		}),
		getTracks: () => be?.tracks ?? []
	})), (0, h.useEffect)(() => {
		let e = y.current;
		if (!e || !n) {
			xe(null), Ce(null), k("等待媒体地址"), ke(""), Me(!1), We(0), Xt(vt);
			return;
		}
		xe(null), Ce(null), k("正在连接媒体…"), ke(""), Me(!1), tn.current = !1, We(0), Xt(vt), it([]), pn.current = "";
		let t;
		try {
			t = ot(l);
		} catch (e) {
			let t = et(e instanceof Error ? e.message : String(e));
			ke(t), k("Worker 创建失败"), Cn.current.onError?.({ message: t });
			return;
		}
		let r = new Ze(e, (e) => {
			if (Jt(e.error ? et(e.error) : `${e.videoReady ? "视频就绪" : "视频不可用"} · ${e.audioReady ? "音频就绪" : "音频不可用"}`), e.error && !/^DECODER_(?:ERROR|UNSUPPORTED)_AUDIO/i.test(e.error)) {
				let t = et(e.error);
				ke(t), Cn.current.onError?.({ message: t });
			}
			if (e.error && /^DECODER_(?:ERROR|UNSUPPORTED)_AUDIO/i.test(e.error) && on.current) {
				let e = rn.current;
				if (e !== void 0 && !sn.current.has(e)) {
					sn.current.add(e);
					let t = an.current.findIndex((t) => t.id === e), n = (t >= 0 ? [...an.current.slice(t + 1), ...an.current.slice(0, t)] : an.current).find((e) => !!e.codec && !sn.current.has(e.id));
					n && window.setTimeout(() => {
						S.current !== r || !on.current || rn.current !== e || Un("audio", n.id, { automatic: !0 });
					}, 0);
				}
			}
		});
		ee.current = t, S.current = r, C.current = 0, w.current = !1, fe.current = !1, pe.current = !1, cn.current = !1;
		let i = (e, n) => {
			if (ee.current !== t) return;
			w.current = !1, pe.current = !1;
			let r = et(n ? `${e}:${n}` : e);
			ke(r), k("解封装失败"), Cn.current.onError?.({ message: r });
		};
		t.onmessage = (e) => mn.current(e.data), t.onerror = (e) => {
			i("WORKER_RUNTIME_FAILED", e.message || "Worker 运行时异常");
		}, t.onmessageerror = () => {
			i("WORKER_RUNTIME_FAILED", "Worker 消息无法反序列化");
		}, t.postMessage({
			type: "init",
			source: n
		});
		let a = window.setTimeout(() => {
			!cn.current && ee.current === t && i("DEMUX_INIT_TIMEOUT");
		}, 15e3), o = window.setInterval(() => {
			let e = S.current;
			if (!e) return;
			e.tick();
			let t = e.stats();
			Xt(t);
			let n = gn.current ? Math.min(t.currentTime, gn.current) : t.currentTime;
			We(n), Cn.current.onTimeUpdate?.({
				currentTime: n,
				duration: gn.current
			}), Fn(n), hn.current();
		}, 100);
		return () => {
			window.clearInterval(o), window.clearTimeout(a), t.postMessage({ type: "close" }), t.terminate(), r.close(), ee.current = null, S.current = null;
		};
	}, [
		n,
		l,
		$t
	]), (0, h.useEffect)(() => {
		function e() {
			Rt(document.fullscreenElement === v.current);
		}
		function t(e) {
			let t = e.target, n = t instanceof Element ? t : null, r = !!(t && v.current?.contains(t)), i = !!n?.closest(".subtitle-menu"), a = !!n?.closest("[data-subtitle-toggle]");
			if (xn.current) {
				r || (Ht((e) => e.open ? {
					...e,
					open: !1
				} : e), st(!1));
				return;
			}
			r && bn.current && !i && !a && (Sn.current = !0, window.setTimeout(() => {
				Sn.current = !1;
			}, 0), yn.current()), !r && (Ht((e) => e.open ? {
				...e,
				open: !1
			} : e), st(!1), yn.current());
		}
		return document.addEventListener("fullscreenchange", e), document.addEventListener("pointerdown", t), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("pointerdown", t);
		};
	}, []), (0, h.useEffect)(() => () => {
		D.current !== null && window.clearTimeout(D.current), ge.current !== null && window.clearTimeout(ge.current), _e.current !== null && window.clearTimeout(_e.current), Tn.current?.getTracks().forEach((e) => e.stop()), Tn.current = null, wn.current?.remove(), wn.current = null;
	}, []), (0, h.useEffect)(() => {
		let e = jt(n);
		_n.current = e, Pt(ze(e));
	}, [n]), (0, h.useEffect)(() => {
		Be(_n.current, Nt);
	}, [Nt]);
	function Pn() {
		!pe.current || w.current || fe.current || S.current?.needsPackets(tn.current, fe.current, w.current) && (w.current = !0, ee.current?.postMessage({
			type: "next",
			epoch: C.current
		}));
	}
	function Fn(e) {
		let t = ln.current, n = un.current && t !== null ? dn.current.get(t) : void 0, r = n ? he(n, e).map((e) => e.text) : [], i = r.join(" ");
		i !== pn.current && (pn.current = i, it(r));
	}
	function In(e) {
		if (e.type === "progress") {
			k(e.phase);
			return;
		}
		if (e.type === "error") {
			w.current = !1;
			let t = et(e.message);
			ke(t), k("读取失败"), Cn.current.onError?.({ message: t });
			return;
		}
		if (e.type === "metadata") {
			cn.current = !0;
			let t = e.metadata.tracks, n = t.find((e) => e.kind === "video"), r = t.find((e) => e.kind === "audio");
			xe({
				tracks: t,
				duration: e.metadata.duration
			}), Ce(e.probe), Ke(n?.id), Je(r?.id), Xe(!0), nn.current = n?.id, rn.current = r?.id, an.current = t.filter((e) => e.kind === "audio"), on.current = !0, sn.current = /* @__PURE__ */ new Set(), $e(null), ln.current = null, nt(!1), un.current = !1, dn.current = /* @__PURE__ */ new Map(), fn.current = new Map(t.filter(De).map((e) => [e.id, Oe(e)])), pn.current = "", it([]), k("轨道已识别"), pe.current = !0, S.current?.configure(n, r), S.current?.setVolume(Ne ? 0 : Re), Cn.current.onReady?.({
				tracks: t,
				duration: e.metadata.duration
			}), o && window.setTimeout(() => {
				!tn.current && !Nn && Vn();
			}, 0);
			return;
		}
		if (e.type === "packets") {
			if (e.epoch < C.current) return;
			w.current = !1, e.packets.forEach((e) => Ln(e)), e.packets.length && Pn();
			return;
		}
		if (e.type === "eof") {
			if (e.epoch < C.current) return;
			w.current = !1, fe.current = !0, S.current?.markEndOfStream(), k("已到达文件末端"), Cn.current.onEnded?.();
		}
	}
	function Ln(e) {
		let t = fn.current.get(e.trackId);
		if (t !== void 0) {
			let n = new TextDecoder().decode(e.data), r = t ? O(n) : me(n.trim());
			r && Rn(e, r);
			return;
		}
		S.current?.enqueue(e, nn.current, rn.current);
	}
	function Rn(e, t) {
		let n = e.timestamp / 1e6, r = n + (e.duration > 0 ? e.duration / 1e6 : 3), i = dn.current.get(e.trackId) || [], a = i.length;
		for (; a > 0 && i[a - 1].start > n;) --a;
		if (!(a > 0 && i[a - 1].start === n && i[a - 1].text === t)) {
			for (let e = a; e < i.length && i[e].start === n; e += 1) if (i[e].text === t) return;
			i.splice(a, 0, {
				start: n,
				end: r,
				text: t
			}), i.length > ft && i.splice(0, i.length - ft), dn.current.set(e.trackId, i);
		}
	}
	function zn() {
		if (Nn || !pe.current || !S.current || tn.current) {
			Jn(Nn);
			return;
		}
		Me(!0), tn.current = !0, S.current.play(), Pn(), Cn.current.onPlay?.(), Jn();
	}
	function Bn() {
		!S.current || !tn.current || (Me(!1), tn.current = !1, S.current.pause(), Cn.current.onPause?.(), Jn());
	}
	function Vn() {
		if (Nn) {
			Jn(!0);
			return;
		}
		tn.current ? Bn() : zn(), Jn();
	}
	function Hn(e) {
		let t = Math.max(0, Math.min(e, An || e));
		We(t), C.current += 1, fe.current = !1, w.current = !1, S.current?.seekTo(t), Fn(t), ee.current?.postMessage({
			type: "seek",
			time: t,
			epoch: C.current
		}), w.current = !0, Jn();
	}
	function Un(e, t, n) {
		if (e === "subtitle") {
			$e(t), ln.current = t, nt(t !== null), un.current = t !== null, lr(!gt), Fn(S.current?.currentTime ?? A);
			return;
		}
		let r = n?.automatic ?? t === null;
		on.current = r, Xe(r);
		let i = t ?? an.current.find((e) => !!e.codec)?.id;
		if (i === void 0) {
			Je(void 0), rn.current = void 0;
			return;
		}
		Je(i), rn.current = i, sn.current.has(i) && sn.current.delete(i);
		let a = S.current?.currentTime ?? 0;
		C.current += 1, fe.current = !1;
		let o = C.current, s = S.current, c = an.current.find((e) => e.id === i);
		if (!s || !c) {
			w.current = !1;
			return;
		}
		w.current = !0, s.configureAudio(c).then(() => {
			o === C.current && rn.current === i && S.current === s && (s.seekTo(a), ee.current?.postMessage({
				type: "select-track",
				kind: e,
				trackId: i,
				time: a,
				epoch: o
			}));
		}).catch(() => {
			w.current = !1;
		});
	}
	function Wn() {
		let e = v.current;
		e && (document.fullscreenElement ? document.exitFullscreen() : e.requestFullscreen());
	}
	async function Gn() {
		let e = y.current, t = document;
		if (t.pictureInPictureElement) {
			await t.exitPictureInPicture?.();
			return;
		}
		if (!e?.captureStream) throw Error("当前浏览器不支持 Canvas 画中画。");
		let n = wn.current;
		n || (n = document.createElement("video"), n.muted = !0, n.playsInline = !0, n.style.display = "none", document.body.appendChild(n), wn.current = n), Tn.current?.getTracks().forEach((e) => e.stop());
		let r = e.captureStream(30);
		if (Tn.current = r, n.srcObject = r, await n.play(), !n.requestPictureInPicture) throw Error("当前浏览器不支持画中画。");
		await n.requestPictureInPicture();
	}
	function Kn() {
		let e = !zt;
		Bt(e), Cn.current.onTheaterChange?.(e);
	}
	function qn() {
		let e = !Zt;
		Qt(e), m?.onToggle?.(e);
	}
	function Jn(e = !1) {
		It(!0), ge.current !== null && window.clearTimeout(ge.current), !(e || Yn()) && (ge.current = window.setTimeout(() => It(!1), 5e3));
	}
	function Yn() {
		return Vt.open || Ut || Gt || at || lt || gt;
	}
	function Xn(e) {
		if (!M(e.target)) {
			if (Sn.current) {
				Sn.current = !1;
				return;
			}
			ir(), D.current !== null && window.clearTimeout(D.current), D.current = window.setTimeout(() => {
				D.current = null, Vn();
			}, 220);
		}
	}
	function Zn(e) {
		M(e.target) || (D.current !== null && (window.clearTimeout(D.current), D.current = null), Wn());
	}
	function Qn(e) {
		let t = e.target;
		if ([
			"INPUT",
			"TEXTAREA",
			"SELECT",
			"BUTTON"
		].includes(t.tagName)) return;
		let n = e.key.toLowerCase();
		if ([
			" ",
			"arrowleft",
			"arrowright",
			"arrowup",
			"arrowdown",
			"j",
			"l",
			"m",
			"f",
			"escape"
		].includes(n)) {
			if (e.preventDefault(), n === "escape") {
				ir(), Wt(!1), Kt(!1), st(!1), lr();
				return;
			}
			Jn(), n === " " ? Vn() : n === "arrowleft" ? Hn(A - 5) : n === "arrowright" ? Hn(A + 5) : n === "j" ? Hn(A - 10) : n === "l" ? Hn(A + 10) : n === "arrowup" ? mr(Math.min(1, Re + .05)) : n === "arrowdown" ? mr(Math.max(0, Re - .05)) : n === "m" ? hr() : n === "f" && Wn();
		}
	}
	function $n(e) {
		if (M(e.target)) return;
		let t = e.touches[0];
		t && (ve.current = {
			x: t.clientX,
			y: t.clientY
		}, ye.current = !1, _e.current !== null && window.clearTimeout(_e.current), _e.current = window.setTimeout(() => {
			ye.current = !0, rr(ve.current.x, ve.current.y);
		}, 500));
	}
	function er(e) {
		let t = e.touches[0];
		!t || _e.current === null || (Math.abs(t.clientX - ve.current.x) > 10 || Math.abs(t.clientY - ve.current.y) > 10) && (window.clearTimeout(_e.current), _e.current = null);
	}
	function tr(e) {
		if (!M(e.target)) {
			if (e.preventDefault(), _e.current !== null && (window.clearTimeout(_e.current), _e.current = null), ye.current) {
				ye.current = !1;
				return;
			}
			Ft ? It(!1) : Jn();
		}
	}
	function nr(e) {
		e.preventDefault(), rr(e.clientX, e.clientY);
	}
	function rr(e, t) {
		let n = v.current;
		if (!n) return;
		let r = n.getBoundingClientRect(), i = Math.max(8, Math.min(e - r.left, r.width - 234 - 8)), a = Math.max(8, Math.min(t - r.top, r.height - 84 - 8));
		Ht({
			open: !0,
			x: i,
			y: a
		}), st(!1), lr(), Jn(!0), n.focus();
	}
	function ir() {
		Ht((e) => e.open ? {
			...e,
			open: !1
		} : e);
	}
	function ar() {
		ir(), Wt(!0), st(!1), lr(), Jn(!0);
	}
	function or() {
		ir(), Kt(!0), st(!1), lr(), Jn(!0);
	}
	function sr() {
		if (lt || gt) {
			lr(!0);
			return;
		}
		cr(), ut(!0), ht("track"), st(!1), Jn(!0);
	}
	function cr() {
		Nn || (vn.current = !je), je && (Me(!1), tn.current = !1, S.current?.pause(), Cn.current.onPause?.());
	}
	function lr(e = !1) {
		!lt && !gt || (ut(!1), e && yt(!1), (e || !gt) && !vn.current && (Me(!0), tn.current = !0, S.current?.play(), Pn(), Cn.current.onPlay?.()), Jn());
	}
	function ur() {
		cr(), st(!1), Pt((e) => e.offset < _t ? {
			...e,
			offset: _t
		} : e), yt(!0), Jn(!0);
	}
	function dr() {
		yt(!1), Jn();
	}
	function fr(e) {
		if (!v.current) return;
		e.stopPropagation();
		let t = v.current, n = e.clientY, r = Nt.offset, i = t.getBoundingClientRect().height;
		function a(e) {
			let t = -(e.clientY - n) / i * 100;
			Pt((e) => ({
				...e,
				offset: Ie(r + t)
			}));
		}
		function o() {
			document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", o);
		}
		document.addEventListener("pointermove", a), document.addEventListener("pointerup", o);
	}
	function pr(e) {
		let t = e.currentTarget.parentElement?.getBoundingClientRect();
		if (!t) return;
		e.stopPropagation(), e.preventDefault();
		let n = t.top + t.height / 2, r = Math.abs(e.clientY - n), i = Nt.scale;
		if (r < 1) return;
		function a(e) {
			let t = Math.abs(e.clientY - n);
			Pt((e) => ({
				...e,
				scale: Fe(t / r * i)
			}));
		}
		function o() {
			document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", o);
		}
		document.addEventListener("pointermove", a), document.addEventListener("pointerup", o);
	}
	function mr(e) {
		Ve(e), Le(e <= 0), S.current?.setVolume(e);
	}
	function hr() {
		let e = !Ne;
		Le(e), S.current?.setVolume(e ? 0 : Re);
	}
	let gr = [
		["源", n?.kind === "file" ? "本地文件" : n ? Ot(r) : "未加载"],
		["状态", Yt.stalled ? "缓冲中" : we],
		["HTTP", String(Se?.status || "--")],
		["CORS", Se?.cors === "ok" ? "允许" : Se?.cors === "blocked" ? "阻断" : "未知"],
		["Range", Se?.acceptsRanges ? "206 Partial Content" : "完整响应 / 不支持 206"],
		["视频", En[0] ? Te(En[0]) : "未识别"],
		["音频", Dn[0] ? Te(Dn[0]) : "未识别"],
		["字幕", `${On.length} 条（${kn.length} 条可用）`],
		["缓冲", `${Yt.bufferedAhead.toFixed(1)} 秒 · ${kt(Yt.bufferedBytes)}`],
		["丢帧", String(Yt.droppedFrames)],
		["解码器", qt]
	];
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: `${a ? "mx-player-embed" : "player-page"} ${zt ? "is-theater" : ""} ${g || ""}`.trim(),
		style: _,
		children: [!a && /* @__PURE__ */ (0, j.jsxs)("header", {
			className: "player-topbar",
			children: [
				/* @__PURE__ */ (0, j.jsxs)("button", {
					className: "back-button",
					onClick: i,
					children: [
						/* @__PURE__ */ (0, j.jsx)(b, {
							size: 18,
							"aria-hidden": "true"
						}),
						" ",
						/* @__PURE__ */ (0, j.jsx)("span", { children: "重新选择" })
					]
				}),
				/* @__PURE__ */ (0, j.jsx)("div", {
					className: "player-title",
					title: r,
					children: r
				}),
				/* @__PURE__ */ (0, j.jsx)("div", {
					className: "player-topbar-right",
					children: /* @__PURE__ */ (0, j.jsxs)("span", {
						className: "status-dot",
						children: [
							/* @__PURE__ */ (0, j.jsx)("i", {}),
							" ",
							we
						]
					})
				})
			]
		}), /* @__PURE__ */ (0, j.jsx)("main", {
			className: a ? "mx-player-embed-main" : "player-layout",
			children: /* @__PURE__ */ (0, j.jsxs)("section", {
				className: "player-column",
				children: [/* @__PURE__ */ (0, j.jsxs)("div", {
					ref: v,
					className: "player-frame",
					tabIndex: 0,
					onMouseMove: () => Jn(),
					onMouseLeave: () => {
						Yn() || It(!1);
					},
					onClick: Xn,
					onDoubleClick: Zn,
					onContextMenu: nr,
					onKeyDown: Qn,
					onTouchStart: $n,
					onTouchMove: er,
					onTouchEnd: tr,
					"aria-label": "MX Player 视频播放器",
					children: [
						/* @__PURE__ */ (0, j.jsx)("canvas", {
							ref: y,
							className: "video-canvas",
							"aria-label": "视频画面"
						}),
						!be && !Ee && /* @__PURE__ */ (0, j.jsxs)("div", {
							className: "player-loading",
							"data-player-control": !0,
							children: [/* @__PURE__ */ (0, j.jsx)("span", { className: "spinner" }), /* @__PURE__ */ (0, j.jsx)("strong", { children: we })]
						}),
						be && !Ee && Yt.stalled && /* @__PURE__ */ (0, j.jsxs)("div", {
							className: "player-buffering",
							"data-player-control": !0,
							children: [/* @__PURE__ */ (0, j.jsx)("span", { className: "spinner" }), /* @__PURE__ */ (0, j.jsx)("strong", { children: "缓冲中…" })]
						}),
						Ee && /* @__PURE__ */ (0, j.jsxs)("div", {
							className: "player-error",
							"data-player-control": !0,
							children: [
								/* @__PURE__ */ (0, j.jsx)("strong", { children: "无法播放此媒体" }),
								/* @__PURE__ */ (0, j.jsx)("span", { children: Ee }),
								n && /* @__PURE__ */ (0, j.jsxs)("button", {
									className: "secondary-button",
									onClick: () => en((e) => e + 1),
									children: [/* @__PURE__ */ (0, j.jsx)(ce, { size: 15 }), " 重新读取"]
								})
							]
						}),
						(rt.length > 0 || gt) && /* @__PURE__ */ (0, j.jsxs)("div", {
							className: `subtitle-overlay ${gt ? "is-editing" : ""}`,
							style: {
								"--subtitle-font": Pe(Nt.font),
								"--subtitle-scale": Nt.scale,
								"--subtitle-offset": `${Nt.offset}%`
							},
							"data-player-control": gt ? "" : void 0,
							onPointerDown: gt ? fr : void 0,
							children: [gt ? /* @__PURE__ */ (0, j.jsx)("span", {
								className: "subtitle-sample",
								children: mt
							}) : rt.length > 0 ? rt.flatMap((e, t) => e.split("\n").map((e, n) => /* @__PURE__ */ (0, j.jsx)("span", { children: e }, `${t}-${n}-${e}`))) : /* @__PURE__ */ (0, j.jsx)("span", {
								className: "subtitle-sample",
								children: pt
							}), gt && /* @__PURE__ */ (0, j.jsxs)(h.Fragment, { children: [/* @__PURE__ */ (0, j.jsx)("span", {
								className: "subtitle-handle is-top",
								onPointerDown: pr,
								title: "拖动调整大小"
							}), /* @__PURE__ */ (0, j.jsx)("span", {
								className: "subtitle-handle is-bottom",
								onPointerDown: pr,
								title: "拖动调整大小"
							})] })]
						}),
						Ut && /* @__PURE__ */ (0, j.jsx)(Ct, {
							rows: gr,
							onClose: () => Wt(!1)
						}),
						Gt && /* @__PURE__ */ (0, j.jsx)(wt, { onClose: () => Kt(!1) }),
						lt && /* @__PURE__ */ (0, j.jsx)(xt, {
							page: dt,
							tracks: kn,
							selectedId: Qe,
							enabled: tt,
							style: Nt,
							onSelect: (e) => Un("subtitle", e),
							onFontChange: (e) => Pt((t) => ({
								...t,
								font: e
							})),
							onPage: ht,
							onEdit: ur
						}),
						gt && /* @__PURE__ */ (0, j.jsx)(St, {
							style: Nt,
							onReset: () => Pt({ ...Ae }),
							onDone: dr
						}),
						/* @__PURE__ */ (0, j.jsxs)("div", {
							className: `player-controls ${Ft ? "is-visible" : ""}`,
							"data-player-control": !0,
							onClick: (e) => e.stopPropagation(),
							children: [/* @__PURE__ */ (0, j.jsxs)("div", {
								className: "player-control-row",
								children: [/* @__PURE__ */ (0, j.jsxs)("div", {
									className: "player-control-group",
									children: [
										/* @__PURE__ */ (0, j.jsx)("button", {
											className: "control-button",
											title: Nn ? "字幕菜单打开时已暂停" : je ? "暂停" : "播放",
											"aria-label": je ? "暂停" : "播放",
											disabled: Nn,
											onClick: Vn,
											children: je ? /* @__PURE__ */ (0, j.jsx)(ie, { size: 21 }) : /* @__PURE__ */ (0, j.jsx)(oe, {
												size: 21,
												fill: "currentColor"
											})
										}),
										u && /* @__PURE__ */ (0, j.jsx)("button", {
											className: "control-button",
											title: "下一集",
											"aria-label": "下一集",
											onClick: u,
											children: /* @__PURE__ */ (0, j.jsx)(T, { size: 20 })
										}),
										/* @__PURE__ */ (0, j.jsx)("button", {
											className: "control-button",
											title: Ne ? "取消静音" : "静音",
											"aria-label": Ne ? "取消静音" : "静音",
											onClick: hr,
											children: Ne ? /* @__PURE__ */ (0, j.jsx)(de, { size: 20 }) : /* @__PURE__ */ (0, j.jsx)(E, { size: 20 })
										}),
										/* @__PURE__ */ (0, j.jsx)("input", {
											className: "volume-slider",
											type: "range",
											min: "0",
											max: "1",
											step: "0.01",
											value: Ne ? 0 : Re,
											style: { "--volume": `${(Ne ? 0 : Re) * 100}%` },
											onChange: (e) => mr(Number(e.target.value)),
											"aria-label": "音量"
										}),
										/* @__PURE__ */ (0, j.jsxs)("span", {
											className: "time-readout",
											children: [
												At(A),
												" / ",
												At(An)
											]
										}),
										m && /* @__PURE__ */ (0, j.jsx)("button", {
											className: `control-button ${Zt ? "is-active" : ""}`,
											title: Zt ? "隐藏弹幕" : "显示弹幕",
											"aria-label": Zt ? "隐藏弹幕" : "显示弹幕",
											"aria-pressed": Zt,
											onClick: qn,
											children: /* @__PURE__ */ (0, j.jsx)(ne, { size: 20 })
										}),
										m?.onCompose && /* @__PURE__ */ (0, j.jsx)("button", {
											className: "control-button",
											title: "发送弹幕",
											"aria-label": "发送弹幕",
											onClick: m.onCompose,
											children: /* @__PURE__ */ (0, j.jsx)(le, { size: 19 })
										})
									]
								}), /* @__PURE__ */ (0, j.jsxs)("div", {
									className: "player-control-group secondary",
									children: [
										kn.length > 0 && /* @__PURE__ */ (0, j.jsx)("button", {
											"data-subtitle-toggle": !0,
											className: `control-button ${tt ? "is-active" : ""}`,
											title: jn ? `字幕：${Et(jn)}` : "字幕",
											"aria-label": "字幕",
											"aria-pressed": tt,
											onClick: sr,
											children: /* @__PURE__ */ (0, j.jsx)(x, { size: 20 })
										}),
										/* @__PURE__ */ (0, j.jsx)("button", {
											className: "control-button",
											title: "画中画",
											"aria-label": "画中画",
											onClick: () => void Gn().catch((e) => {
												let t = e instanceof Error ? e.message : String(e);
												ke(t), Cn.current.onError?.({ message: t });
											}),
											children: /* @__PURE__ */ (0, j.jsx)(ae, { size: 20 })
										}),
										/* @__PURE__ */ (0, j.jsx)("button", {
											className: `control-button ${zt ? "is-active" : ""}`,
											title: "剧场模式",
											"aria-label": "剧场模式",
											"aria-pressed": zt,
											onClick: Kn,
											children: /* @__PURE__ */ (0, j.jsx)(se, { size: 20 })
										}),
										/* @__PURE__ */ (0, j.jsx)("button", {
											className: `control-button ${at ? "is-active" : ""}`,
											title: "设置",
											"aria-label": "设置",
											onClick: () => {
												let e = !at;
												st(e), lr(), Jn(e);
											},
											children: /* @__PURE__ */ (0, j.jsx)(ue, { size: 20 })
										}),
										/* @__PURE__ */ (0, j.jsx)("button", {
											className: "control-button",
											title: Lt ? "退出全屏" : "全屏",
											"aria-label": Lt ? "退出全屏" : "全屏",
											onClick: Wn,
											children: Lt ? /* @__PURE__ */ (0, j.jsx)(re, { size: 20 }) : /* @__PURE__ */ (0, j.jsx)(te, { size: 20 })
										})
									]
								})]
							}), /* @__PURE__ */ (0, j.jsx)(ct, {
								currentTime: A,
								duration: An,
								bufferedEnd: Yt.bufferedEnd,
								source: n,
								onSeek: Hn
							})]
						}),
						at && /* @__PURE__ */ (0, j.jsx)(Tt, {
							rate: He,
							setRate: (e) => {
								Ue(e), S.current?.setPlaybackRate(e);
							},
							audioTracks: Dn,
							subtitleTracks: kn,
							audioTrackId: qe,
							audioAuto: Ye,
							subtitleTrackId: Qe,
							selectTrack: Un,
							qualities: d,
							selectedQuality: f,
							onQualityChange: p
						}),
						Vt.open && /* @__PURE__ */ (0, j.jsx)(bt, {
							x: Vt.x,
							y: Vt.y,
							onClose: ir,
							onStats: ar,
							onAbout: or
						})
					]
				}), !a && /* @__PURE__ */ (0, j.jsxs)("div", {
					className: "player-status-line",
					children: [
						/* @__PURE__ */ (0, j.jsx)("span", { children: Yt.stalled ? "缓冲中…" : qt }),
						/* @__PURE__ */ (0, j.jsxs)("span", { children: [
							"已缓冲 ",
							Yt.bufferedAhead.toFixed(1),
							" 秒"
						] }),
						/* @__PURE__ */ (0, j.jsxs)("span", { children: ["当前时间 ", At(A)] }),
						/* @__PURE__ */ (0, j.jsx)("span", {
							className: "player-codec-summary",
							children: Mn
						})
					]
				})]
			})
		})]
	});
});
function bt({ x: e, y: t, onClose: n, onStats: r, onAbout: i }) {
	let a = (0, h.useRef)(null);
	(0, h.useEffect)(() => {
		a.current?.querySelector("button")?.focus();
	}, []);
	function o(e) {
		let t = Array.from(a.current?.querySelectorAll("button") || []), r = t.indexOf(document.activeElement);
		if (e.key === "Escape") {
			e.preventDefault(), n();
			return;
		}
		!["ArrowDown", "ArrowUp"].includes(e.key) || !t.length || (e.preventDefault(), t[(r + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length]?.focus());
	}
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		ref: a,
		className: "context-menu",
		role: "menu",
		"data-player-control": !0,
		style: {
			left: e,
			top: t
		},
		onKeyDown: o,
		onClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, j.jsxs)("button", {
				role: "menuitem",
				onClick: r,
				children: [/* @__PURE__ */ (0, j.jsx)(ee, { size: 15 }), " 播放器统计"]
			}),
			/* @__PURE__ */ (0, j.jsx)("span", { className: "menu-separator" }),
			/* @__PURE__ */ (0, j.jsxs)("button", {
				role: "menuitem",
				onClick: i,
				children: [/* @__PURE__ */ (0, j.jsx)(C, { size: 15 }), " 关于 MX Player Pro"]
			})
		]
	});
}
function xt({ page: e, tracks: t, selectedId: n, enabled: r, style: i, onSelect: a, onFontChange: o, onPage: s, onEdit: c }) {
	let l = e === "font", u = t.length + 1, d = u * ht + (u - 1) * gt;
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "subtitle-menu",
		role: "menu",
		"data-player-control": !0,
		onClick: (e) => e.stopPropagation(),
		children: [/* @__PURE__ */ (0, j.jsxs)("div", {
			className: "subtitle-menu-head",
			children: [
				/* @__PURE__ */ (0, j.jsx)("button", {
					className: `subtitle-tab ${l ? "" : "is-active"}`,
					onClick: () => s("track"),
					children: "字幕"
				}),
				/* @__PURE__ */ (0, j.jsx)("button", {
					className: `subtitle-tab ${l ? "is-active" : ""}`,
					onClick: () => s("font"),
					children: "选择字体"
				}),
				/* @__PURE__ */ (0, j.jsx)("button", {
					className: "control-button subtitle-head-icon",
					title: "编辑",
					"aria-label": "编辑字幕样式",
					onClick: c,
					children: /* @__PURE__ */ (0, j.jsx)(ue, { size: 20 })
				})
			]
		}), /* @__PURE__ */ (0, j.jsx)("div", {
			className: "subtitle-menu-body",
			style: { "--menu-body-height": `${d}px` },
			children: l ? ke.map((e) => /* @__PURE__ */ (0, j.jsxs)("button", {
				className: `subtitle-font-item ${i.font === e.id ? "is-selected" : ""}`,
				onClick: () => o(e.id),
				children: [/* @__PURE__ */ (0, j.jsxs)("span", {
					className: "subtitle-font-name",
					children: [e.label, i.font === e.id ? /* @__PURE__ */ (0, j.jsx)(S, { size: 13 }) : null]
				}), /* @__PURE__ */ (0, j.jsx)("span", {
					className: "subtitle-font-sample",
					style: { fontFamily: e.stack },
					children: pt
				})]
			}, e.id)) : /* @__PURE__ */ (0, j.jsxs)(h.Fragment, { children: [/* @__PURE__ */ (0, j.jsx)("button", {
				className: !r || n === null ? "is-selected" : "",
				onClick: () => a(null),
				children: "关闭"
			}), t.map((e) => /* @__PURE__ */ (0, j.jsx)("button", {
				className: r && n === e.id ? "is-selected" : "",
				onClick: () => a(e.id),
				children: Et(e)
			}, e.id))] })
		})]
	});
}
function St({ style: e, onReset: t, onDone: n }) {
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "subtitle-edit-bar",
		"data-player-control": !0,
		onClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, j.jsx)("span", {
				className: "subtitle-edit-hint",
				children: "拖动字幕调整位置，拖动上下边框调整大小"
			}),
			/* @__PURE__ */ (0, j.jsxs)("em", { children: [
				Math.round(e.scale * 100),
				"% · ",
				e.offset > 0 ? `+${e.offset}` : e.offset
			] }),
			/* @__PURE__ */ (0, j.jsxs)("button", {
				onClick: t,
				children: [/* @__PURE__ */ (0, j.jsx)(w, { size: 13 }), " 恢复默认"]
			}),
			/* @__PURE__ */ (0, j.jsxs)("button", {
				onClick: n,
				children: [/* @__PURE__ */ (0, j.jsx)(S, { size: 14 }), " 完成"]
			})
		]
	});
}
function Ct({ rows: e, onClose: t }) {
	return /* @__PURE__ */ (0, j.jsxs)("section", {
		className: "player-modal player-stats",
		"data-player-control": !0,
		children: [/* @__PURE__ */ (0, j.jsxs)("header", { children: [/* @__PURE__ */ (0, j.jsx)("strong", { children: "播放器统计" }), /* @__PURE__ */ (0, j.jsx)("button", {
			className: "modal-close",
			title: "关闭",
			"aria-label": "关闭",
			onClick: t,
			children: /* @__PURE__ */ (0, j.jsx)(fe, { size: 17 })
		})] }), /* @__PURE__ */ (0, j.jsx)("dl", { children: e.map(([e, t]) => /* @__PURE__ */ (0, j.jsxs)(h.Fragment, { children: [/* @__PURE__ */ (0, j.jsx)("dt", { children: e }), /* @__PURE__ */ (0, j.jsx)("dd", { children: t })] }, e)) })]
	});
}
function wt({ onClose: e }) {
	return /* @__PURE__ */ (0, j.jsxs)("section", {
		className: "player-modal player-about",
		"data-player-control": !0,
		children: [
			/* @__PURE__ */ (0, j.jsx)("button", {
				className: "modal-close",
				title: "关闭",
				"aria-label": "关闭",
				onClick: e,
				children: /* @__PURE__ */ (0, j.jsx)(fe, { size: 17 })
			}),
			/* @__PURE__ */ (0, j.jsx)("strong", { children: "MX Player" }),
			/* @__PURE__ */ (0, j.jsxs)("span", { children: ["v", dt] }),
			/* @__PURE__ */ (0, j.jsx)("p", { children: "纯客户端 Matroska 播放器。文件和链接只在本机读取，视频帧由 WebCodecs 输出。" })
		]
	});
}
function Tt({ rate: e, setRate: t, audioTracks: n, subtitleTracks: r, audioTrackId: i, audioAuto: a, subtitleTrackId: o, selectTrack: s, qualities: c, selectedQuality: l, onQualityChange: u }) {
	return /* @__PURE__ */ (0, j.jsxs)("div", {
		className: "settings-panel",
		"data-player-control": !0,
		children: [
			/* @__PURE__ */ (0, j.jsxs)("label", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "播放速度" }), /* @__PURE__ */ (0, j.jsx)("select", {
				value: e,
				onChange: (e) => t(Number(e.target.value)),
				children: [
					.5,
					.75,
					1,
					1.25,
					1.5,
					2
				].map((e) => /* @__PURE__ */ (0, j.jsxs)("option", {
					value: e,
					children: [e, "×"]
				}, e))
			})] }),
			c.length > 0 && /* @__PURE__ */ (0, j.jsxs)("label", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "清晰度" }), /* @__PURE__ */ (0, j.jsxs)("select", {
				value: l,
				onChange: (e) => u?.(e.target.value),
				children: [/* @__PURE__ */ (0, j.jsx)("option", {
					value: "auto",
					children: "自动"
				}), c.map((e) => /* @__PURE__ */ (0, j.jsx)("option", {
					value: e.id,
					children: e.label
				}, e.id))]
			})] }),
			/* @__PURE__ */ (0, j.jsxs)("label", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "音频轨" }), /* @__PURE__ */ (0, j.jsxs)("select", {
				value: a ? "" : i ?? "",
				onChange: (e) => s("audio", e.target.value ? Number(e.target.value) : null),
				children: [/* @__PURE__ */ (0, j.jsx)("option", {
					value: "",
					children: "自动"
				}), n.map((e) => /* @__PURE__ */ (0, j.jsx)("option", {
					value: e.id,
					children: Te(e)
				}, e.id))]
			})] }),
			r.length > 0 && /* @__PURE__ */ (0, j.jsxs)("label", { children: [/* @__PURE__ */ (0, j.jsx)("span", { children: "字幕轨" }), /* @__PURE__ */ (0, j.jsxs)("select", {
				value: o ?? "",
				onChange: (e) => s("subtitle", e.target.value ? Number(e.target.value) : null),
				children: [/* @__PURE__ */ (0, j.jsx)("option", {
					value: "",
					children: "关闭"
				}), r.map((e) => /* @__PURE__ */ (0, j.jsx)("option", {
					value: e.id,
					children: Et(e)
				}, e.id))]
			})] })
		]
	});
}
function M(e) {
	return e instanceof Element && !!e.closest("[data-player-control]");
}
function Et(e) {
	return [e.language, e.name].filter(Boolean).join(" · ") || `字幕轨 ${e.id}`;
}
function Dt(e, t) {
	let n = [];
	return e && n.push(k(e)), t && n.push(`${k(t)} · ${t.channels || 2}ch`), n.join(" · ") || "编码待识别";
}
function Ot(e) {
	try {
		return new URL(e).hostname || "远程 URL";
	} catch {
		return "远程 URL";
	}
}
function kt(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(0)} KB` : `${(e / 1024 / 1024).toFixed(1)} MB`;
}
function At(e) {
	if (!Number.isFinite(e) || e < 0) return "00:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}`;
}
function jt(e) {
	return e ? Re(e) : "unknown-host";
}
function Mt(e) {
	return Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : .85;
}
//#endregion
//#region src/sdk/MXPlayer.ts
var Nt = class {
	container;
	root;
	surfaceRef = (0, h.createRef)();
	listeners = /* @__PURE__ */ new Map();
	options;
	source;
	label;
	destroyed = !1;
	detachDrop = null;
	constructor(e) {
		let t = typeof e.playerElm == "string" ? document.querySelector(e.playerElm) : e.playerElm;
		if (!t) throw Error(`MX Player: 找不到容器元素 ${String(e.playerElm)}`);
		this.container = t, this.options = { ...e }, this.source = e.url ? {
			kind: "url",
			url: e.url
		} : e.file ? {
			kind: "file",
			file: e.file
		} : void 0, this.label = e.label || Pt(this.source), this.container.classList.add("mxplayer-container"), this.root = (0, pe.createRoot)(t), e.localPlayback && this.enableLocalPlayback(), this.render();
	}
	async load(e) {
		if (this.destroyed) throw Error("MX Player: 播放器已销毁");
		this.source = e, this.label = Pt(e), this.render();
	}
	play() {
		this.surfaceRef.current?.play();
	}
	pause() {
		this.surfaceRef.current?.pause();
	}
	toggle() {
		this.surfaceRef.current?.toggle();
	}
	seek(e) {
		this.surfaceRef.current?.seek(e);
	}
	setVolume(e) {
		this.options.volume = e, this.surfaceRef.current?.setVolume(e);
	}
	setMuted(e) {
		this.options.muted = e, this.surfaceRef.current?.setMuted(e);
	}
	setPlaybackRate(e) {
		this.surfaceRef.current?.setPlaybackRate(e);
	}
	requestFullscreen() {
		this.surfaceRef.current?.requestFullscreen();
	}
	requestPictureInPicture() {
		return this.surfaceRef.current?.requestPictureInPicture() ?? Promise.resolve();
	}
	getState() {
		return this.surfaceRef.current?.getState() ?? {
			ready: !1,
			playing: !1,
			currentTime: 0,
			duration: 0,
			volume: Ft(this.options.volume ?? .85),
			muted: this.options.muted ?? !1,
			playbackRate: 1,
			bufferedAhead: 0,
			stalled: !1,
			error: null
		};
	}
	get tracks() {
		return this.surfaceRef.current?.getTracks() ?? [];
	}
	on(e, t) {
		let n = this.listeners.get(e) ?? /* @__PURE__ */ new Set();
		return n.add(t), this.listeners.set(e, n), this;
	}
	off(e, t) {
		return this.listeners.get(e)?.delete(t), this;
	}
	destroy() {
		this.destroyed || (this.destroyed = !0, this.detachDrop?.(), this.detachDrop = null, this.root.unmount(), this.listeners.clear(), this.container.classList.remove("mxplayer-container", "mxplayer-dragging"));
	}
	render() {
		let e = this.options.danmaku ? {
			...this.options.danmaku,
			onToggle: (e) => {
				this.options.danmaku?.onToggle?.(e), this.emit("danmakuchange", { visible: e });
			}
		} : void 0;
		this.root.render((0, h.createElement)(yt, {
			ref: this.surfaceRef,
			source: this.source,
			label: this.label,
			embedded: !0,
			autoplay: this.options.autoplay,
			initialVolume: this.options.volume,
			initialMuted: this.options.muted,
			workerUrl: this.options.workerUrl,
			onNext: this.options.onNext,
			qualities: this.options.qualities,
			selectedQuality: this.options.selectedQuality,
			danmaku: e,
			onReady: (e) => this.emit("ready", e),
			onPlay: () => this.emit("play", void 0),
			onPause: () => this.emit("pause", void 0),
			onTimeUpdate: (e) => this.emit("timeupdate", e),
			onEnded: () => this.emit("ended", void 0),
			onError: (e) => this.emit("error", e),
			onTheaterChange: (e) => {
				this.options.onTheaterChange?.(e), this.emit("theaterchange", { enabled: e });
			},
			onQualityChange: (e) => {
				this.options.selectedQuality = e, this.options.onQualityChange?.(e), this.emit("qualitychange", { qualityId: e }), this.render();
			}
		}));
	}
	enableLocalPlayback() {
		let e = (e) => {
			e.preventDefault(), this.container.classList.add("mxplayer-dragging");
		}, t = () => this.container.classList.remove("mxplayer-dragging"), n = (e) => {
			e.preventDefault(), this.container.classList.remove("mxplayer-dragging");
			let t = e.dataTransfer?.files?.[0];
			if (t) {
				if (!t.name.toLowerCase().endsWith(".mkv") && t.type !== "video/x-matroska") {
					this.emit("error", { message: "请拖入 Matroska (.mkv) 文件。" });
					return;
				}
				this.load({
					kind: "file",
					file: t
				});
			}
		};
		this.container.addEventListener("dragover", e), this.container.addEventListener("dragleave", t), this.container.addEventListener("drop", n), this.detachDrop = () => {
			this.container.removeEventListener("dragover", e), this.container.removeEventListener("dragleave", t), this.container.removeEventListener("drop", n);
		};
	}
	emit(e, t) {
		let n = this.listeners.get(e);
		if (n) for (let e of n) try {
			e(t);
		} catch (e) {
			console.error("[MXPlayer] 事件回调异常", e);
		}
	}
};
function Pt(e) {
	if (!e) return "MX Player Pro";
	if (e.kind === "file") return e.file.name;
	try {
		let t = new URL(e.url);
		return decodeURIComponent(t.pathname.split("/").filter(Boolean).pop() || "") || t.hostname || e.url;
	} catch {
		return e.url;
	}
}
function Ft(e) {
	return Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : .85;
}
//#endregion
//#region src/index.ts
var It = "1.2.6";
//#endregion
export { Nt as MXPlayer, It as VERSION };

//# sourceMappingURL=mx-player.js.map