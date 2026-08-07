import { defineComponent as e, h as t, onBeforeUnmount as n, onMounted as r, ref as i, watch as a } from "vue";
//#region \0rolldown/runtime.js
var o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = /* @__PURE__ */ o(((e) => {
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
	function te() {}
	var S = {
		H: null,
		A: null,
		T: null,
		S: null
	}, C = Object.prototype.hasOwnProperty;
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
	function w(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function T(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var E = /\/+/g;
	function ie(e, t) {
		return typeof e == "object" && e && e.key != null ? T("" + e.key) : t.toString(36);
	}
	function ae(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(te, te) : (e.status = "pending", e.then(function(t) {
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
	function D(e, r, i, a, o) {
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
				case d: return c = e._init, D(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + ie(e, 0) : a, ee(o) ? (i = "", c != null && (i = c.replace(E, "$&/") + "/"), D(o, r, i, "", function(e) {
			return e;
		})) : o != null && (w(o) && (o = re(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(E, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ee(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + ie(a, u), c += D(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ie(a, u++), c += D(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return D(ae(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function oe(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return D(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function se(e) {
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
	var O = typeof reportError == "function" ? reportError : function(e) {
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
	}, k = {
		map: oe,
		forEach: function(e, t, n) {
			oe(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return oe(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return oe(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!w(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = k, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return S.H.useMemoCache(e);
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
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !C.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
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
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) C.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
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
	}, e.isValidElement = w, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: se
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = S.T, n = {};
		S.T = n;
		try {
			var r = e(), i = S.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(te, O);
		} catch (e) {
			O(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), S.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return S.H.useCacheRefresh();
	}, e.use = function(e) {
		return S.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return S.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return S.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return S.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return S.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return S.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return S.H.useEffectEvent(e);
	}, e.useId = function() {
		return S.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return S.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return S.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return S.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return S.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return S.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return S.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return S.H.useRef(e);
	}, e.useState = function(e) {
		return S.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return S.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return S.H.useTransition();
	}, e.version = "19.2.8";
})), c = /* @__PURE__ */ o(((e, t) => {
	process.env.NODE_ENV !== "production" && (function() {
		function n(e, t) {
			Object.defineProperty(a.prototype, e, { get: function() {
				console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
			} });
		}
		function r(e) {
			return typeof e != "object" || !e ? null : (e = ve && e[ve] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function i(e, t) {
			e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
			var n = e + "." + t;
			ye[n] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, e), ye[n] = !0);
		}
		function a(e, t, n) {
			this.props = e, this.context = t, this.refs = xe, this.updater = n || be;
		}
		function o() {}
		function s(e, t, n) {
			this.props = e, this.context = t, this.refs = xe, this.updater = n || be;
		}
		function c() {}
		function l(e) {
			return "" + e;
		}
		function u(e) {
			try {
				l(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var n = t.error, r = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return n.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", r), l(e);
			}
		}
		function d(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === we ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case k: return "Fragment";
				case le: return "Profiler";
				case ce: return "StrictMode";
				case pe: return "Suspense";
				case me: return "SuspenseList";
				case _e: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case O: return "Portal";
				case de: return e.displayName || "Context";
				case ue: return (e._context.displayName || "Context") + ".Consumer";
				case fe:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case he: return t = e.displayName || null, t === null ? d(e.type) || "Memo" : t;
				case ge:
					t = e._payload, e = e._init;
					try {
						return d(e(t));
					} catch {}
			}
			return null;
		}
		function f(e) {
			if (e === k) return "<>";
			if (typeof e == "object" && e && e.$$typeof === ge) return "<...>";
			try {
				var t = d(e);
				return t ? "<" + t + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function p() {
			var e = j.A;
			return e === null ? null : e.getOwner();
		}
		function m() {
			return Error("react-stack-top-frame");
		}
		function h(e) {
			if (Te.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function g(e, t) {
			function n() {
				De || (De = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function _() {
			var e = d(this.type);
			return ke[e] || (ke[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function v(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: se,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: _
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function y(e, t) {
			return t = v(e.type, t, e.props, e._owner, e._debugStack, e._debugTask), e._store && (t._store.validated = e._store.validated), t;
		}
		function b(e) {
			x(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === ge && (e._payload.status === "fulfilled" ? x(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function x(e) {
			return typeof e == "object" && !!e && e.$$typeof === se;
		}
		function ee(e) {
			var t = {
				"=": "=0",
				":": "=2"
			};
			return "$" + e.replace(/[=:]/g, function(e) {
				return t[e];
			});
		}
		function te(e, t) {
			return typeof e == "object" && e && e.key != null ? (u(e.key), ee("" + e.key)) : t.toString(36);
		}
		function S(e) {
			switch (e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
				default: switch (typeof e.status == "string" ? e.then(c, c) : (e.status = "pending", e.then(function(t) {
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
		function C(e, t, n, i, a) {
			var o = typeof e;
			(o === "undefined" || o === "boolean") && (e = null);
			var s = !1;
			if (e === null) s = !0;
			else switch (o) {
				case "bigint":
				case "string":
				case "number":
					s = !0;
					break;
				case "object": switch (e.$$typeof) {
					case se:
					case O:
						s = !0;
						break;
					case ge: return s = e._init, C(s(e._payload), t, n, i, a);
				}
			}
			if (s) {
				s = e, a = a(s);
				var c = i === "" ? "." + te(s, 0) : i;
				return Ce(a) ? (n = "", c != null && (n = c.replace(Ne, "$&/") + "/"), C(a, t, n, "", function(e) {
					return e;
				})) : a != null && (x(a) && (a.key != null && (s && s.key === a.key || u(a.key)), n = y(a, n + (a.key == null || s && s.key === a.key ? "" : ("" + a.key).replace(Ne, "$&/") + "/") + c), i !== "" && s != null && x(s) && s.key == null && s._store && !s._store.validated && (n._store.validated = 2), a = n), t.push(a)), 1;
			}
			if (s = 0, c = i === "" ? "." : i + ":", Ce(e)) for (var l = 0; l < e.length; l++) i = e[l], o = c + te(i, l), s += C(i, t, n, o, a);
			else if (l = r(e), typeof l == "function") for (l === e.entries && (Me || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Me = !0), e = l.call(e), l = 0; !(i = e.next()).done;) i = i.value, o = c + te(i, l++), s += C(i, t, n, o, a);
			else if (o === "object") {
				if (typeof e.then == "function") return C(S(e), t, n, i, a);
				throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
			}
			return s;
		}
		function ne(e, t, n) {
			if (e == null) return e;
			var r = [], i = 0;
			return C(e, r, "", "", function(e) {
				return t.call(n, e, i++);
			}), r;
		}
		function re(e) {
			if (e._status === -1) {
				var t = e._ioInfo;
				t != null && (t.start = t.end = performance.now()), t = e._result;
				var n = t();
				if (n.then(function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 1, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now()), n.status === void 0 && (n.status = "fulfilled", n.value = t);
					}
				}, function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 2, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now()), n.status === void 0 && (n.status = "rejected", n.reason = t);
					}
				}), t = e._ioInfo, t != null) {
					t.value = n;
					var r = n.displayName;
					typeof r == "string" && (t.name = r);
				}
				e._status === -1 && (e._status = 0, e._result = n);
			}
			if (e._status === 1) return t = e._result, t === void 0 && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", t), "default" in t || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", t), t.default;
			throw e._result;
		}
		function w() {
			var e = j.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		function T() {
			j.asyncTransitions--;
		}
		function E(e) {
			if (Ie === null) try {
				var n = ("require" + Math.random()).slice(0, 7);
				Ie = (t && t[n]).call(t, "timers").setImmediate;
			} catch {
				Ie = function(e) {
					!1 === Fe && (Fe = !0, typeof MessageChannel > "u" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var t = new MessageChannel();
					t.port1.onmessage = e, t.port2.postMessage(void 0);
				};
			}
			return Ie(e);
		}
		function ie(e) {
			return 1 < e.length && typeof AggregateError == "function" ? AggregateError(e) : e[0];
		}
		function ae(e, t) {
			t !== Le - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Le = t;
		}
		function D(e, t, n) {
			var r = j.actQueue;
			if (r !== null) if (r.length !== 0) try {
				oe(r), E(function() {
					return D(e, t, n);
				});
				return;
			} catch (e) {
				j.thrownErrors.push(e);
			}
			else j.actQueue = null;
			0 < j.thrownErrors.length ? (r = ie(j.thrownErrors), j.thrownErrors.length = 0, n(r)) : t(e);
		}
		function oe(e) {
			if (!ze) {
				ze = !0;
				var t = 0;
				try {
					for (; t < e.length; t++) {
						var n = e[t];
						do {
							j.didUsePromise = !1;
							var r = n(!1);
							if (r !== null) {
								if (j.didUsePromise) {
									e[t] = n, e.splice(0, t);
									return;
								}
								n = r;
							} else break;
						} while (1);
					}
					e.length = 0;
				} catch (n) {
					e.splice(0, t + 1), j.thrownErrors.push(n);
				} finally {
					ze = !1;
				}
			}
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var se = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), ce = Symbol.for("react.strict_mode"), le = Symbol.for("react.profiler"), ue = Symbol.for("react.consumer"), de = Symbol.for("react.context"), fe = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), me = Symbol.for("react.suspense_list"), he = Symbol.for("react.memo"), ge = Symbol.for("react.lazy"), _e = Symbol.for("react.activity"), ve = Symbol.iterator, ye = {}, be = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function(e) {
				i(e, "forceUpdate");
			},
			enqueueReplaceState: function(e) {
				i(e, "replaceState");
			},
			enqueueSetState: function(e) {
				i(e, "setState");
			}
		}, A = Object.assign, xe = {};
		Object.freeze(xe), a.prototype.isReactComponent = {}, a.prototype.setState = function(e, t) {
			if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, e, t, "setState");
		}, a.prototype.forceUpdate = function(e) {
			this.updater.enqueueForceUpdate(this, e, "forceUpdate");
		};
		var Se = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		for (Ve in Se) Se.hasOwnProperty(Ve) && n(Ve, Se[Ve]);
		o.prototype = a.prototype, Se = s.prototype = new o(), Se.constructor = s, A(Se, a.prototype), Se.isPureReactComponent = !0;
		var Ce = Array.isArray, we = Symbol.for("react.client.reference"), j = {
			H: null,
			A: null,
			T: null,
			S: null,
			actQueue: null,
			asyncTransitions: 0,
			isBatchingLegacy: !1,
			didScheduleLegacyUpdate: !1,
			didUsePromise: !1,
			thrownErrors: [],
			getCurrentStack: null,
			recentlyCreatedOwnerStacks: 0
		}, Te = Object.prototype.hasOwnProperty, Ee = console.createTask ? console.createTask : function() {
			return null;
		};
		Se = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var De, Oe, ke = {}, Ae = Se.react_stack_bottom_frame.bind(Se, m)(), je = Ee(f(m)), Me = !1, Ne = /\/+/g, Pe = typeof reportError == "function" ? reportError : function(e) {
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
		}, Fe = !1, Ie = null, Le = 0, Re = !1, ze = !1, Be = typeof queueMicrotask == "function" ? function(e) {
			queueMicrotask(function() {
				return queueMicrotask(e);
			});
		} : E;
		Se = Object.freeze({
			__proto__: null,
			c: function(e) {
				return w().useMemoCache(e);
			}
		});
		var Ve = {
			map: ne,
			forEach: function(e, t, n) {
				ne(e, function() {
					t.apply(this, arguments);
				}, n);
			},
			count: function(e) {
				var t = 0;
				return ne(e, function() {
					t++;
				}), t;
			},
			toArray: function(e) {
				return ne(e, function(e) {
					return e;
				}) || [];
			},
			only: function(e) {
				if (!x(e)) throw Error("React.Children.only expected to receive a single React element child.");
				return e;
			}
		};
		e.Activity = _e, e.Children = Ve, e.Component = a, e.Fragment = k, e.Profiler = le, e.PureComponent = s, e.StrictMode = ce, e.Suspense = pe, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = j, e.__COMPILER_RUNTIME = Se, e.act = function(e) {
			var t = j.actQueue, n = Le;
			Le++;
			var r = j.actQueue = t === null ? [] : t, i = !1;
			try {
				var a = e();
			} catch (e) {
				j.thrownErrors.push(e);
			}
			if (0 < j.thrownErrors.length) throw ae(t, n), e = ie(j.thrownErrors), j.thrownErrors.length = 0, e;
			if (typeof a == "object" && a && typeof a.then == "function") {
				var o = a;
				return Be(function() {
					i || Re || (Re = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				}), { then: function(e, a) {
					i = !0, o.then(function(i) {
						if (ae(t, n), n === 0) {
							try {
								oe(r), E(function() {
									return D(i, e, a);
								});
							} catch (e) {
								j.thrownErrors.push(e);
							}
							if (0 < j.thrownErrors.length) {
								var o = ie(j.thrownErrors);
								j.thrownErrors.length = 0, a(o);
							}
						} else e(i);
					}, function(e) {
						ae(t, n), 0 < j.thrownErrors.length ? (e = ie(j.thrownErrors), j.thrownErrors.length = 0, a(e)) : a(e);
					});
				} };
			}
			var s = a;
			if (ae(t, n), n === 0 && (oe(r), r.length !== 0 && Be(function() {
				i || Re || (Re = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), j.actQueue = null), 0 < j.thrownErrors.length) throw e = ie(j.thrownErrors), j.thrownErrors.length = 0, e;
			return { then: function(e, t) {
				i = !0, n === 0 ? (j.actQueue = r, E(function() {
					return D(s, e, t);
				})) : e(s);
			} };
		}, e.cache = function(e) {
			return function() {
				return e.apply(null, arguments);
			};
		}, e.cacheSignal = function() {
			return null;
		}, e.captureOwnerStack = function() {
			var e = j.getCurrentStack;
			return e === null ? null : e();
		}, e.cloneElement = function(e, t, n) {
			if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
			var r = A({}, e.props), i = e.key, a = e._owner;
			if (t != null) {
				var o;
				a: {
					if (Te.call(t, "ref") && (o = Object.getOwnPropertyDescriptor(t, "ref").get) && o.isReactWarning) {
						o = !1;
						break a;
					}
					o = t.ref !== void 0;
				}
				for (s in o && (a = p()), h(t) && (u(t.key), i = "" + t.key), t) !Te.call(t, s) || s === "key" || s === "__self" || s === "__source" || s === "ref" && t.ref === void 0 || (r[s] = t[s]);
			}
			var s = arguments.length - 2;
			if (s === 1) r.children = n;
			else if (1 < s) {
				o = Array(s);
				for (var c = 0; c < s; c++) o[c] = arguments[c + 2];
				r.children = o;
			}
			for (r = v(e.type, i, r, a, e._debugStack, e._debugTask), i = 2; i < arguments.length; i++) b(arguments[i]);
			return r;
		}, e.createContext = function(e) {
			return e = {
				$$typeof: de,
				_currentValue: e,
				_currentValue2: e,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			}, e.Provider = e, e.Consumer = {
				$$typeof: ue,
				_context: e
			}, e._currentRenderer = null, e._currentRenderer2 = null, e;
		}, e.createElement = function(e, t, n) {
			for (var r = 2; r < arguments.length; r++) b(arguments[r]);
			r = {};
			var i = null;
			if (t != null) for (c in Oe || !("__self" in t) || "key" in t || (Oe = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), h(t) && (u(t.key), i = "" + t.key), t) Te.call(t, c) && c !== "key" && c !== "__self" && c !== "__source" && (r[c] = t[c]);
			var a = arguments.length - 2;
			if (a === 1) r.children = n;
			else if (1 < a) {
				for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
				Object.freeze && Object.freeze(o), r.children = o;
			}
			if (e && e.defaultProps) for (c in a = e.defaultProps, a) r[c] === void 0 && (r[c] = a[c]);
			i && g(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e);
			var c = 1e4 > j.recentlyCreatedOwnerStacks++;
			return v(e, i, r, p(), c ? Error("react-stack-top-frame") : Ae, c ? Ee(f(e)) : je);
		}, e.createRef = function() {
			var e = { current: null };
			return Object.seal(e), e;
		}, e.forwardRef = function(e) {
			e != null && e.$$typeof === he ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e == "function" ? e.length !== 0 && e.length !== 2 && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.") : console.error("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e), e != null && e.defaultProps != null && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
			var t = {
				$$typeof: fe,
				render: e
			}, n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.isValidElement = x, e.lazy = function(e) {
			e = {
				_status: -1,
				_result: e
			};
			var t = {
				$$typeof: ge,
				_payload: e,
				_init: re
			}, n = {
				name: "lazy",
				start: -1,
				end: -1,
				value: null,
				owner: null,
				debugStack: Error("react-stack-top-frame"),
				debugTask: console.createTask ? console.createTask("lazy()") : null
			};
			return e._ioInfo = n, t._debugInfo = [{ awaited: n }], t;
		}, e.memo = function(e, t) {
			e ?? console.error("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e), t = {
				$$typeof: he,
				type: e,
				compare: t === void 0 ? null : t
			};
			var n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.startTransition = function(e) {
			var t = j.T, n = {};
			n._updatedFibers = /* @__PURE__ */ new Set(), j.T = n;
			try {
				var r = e(), i = j.S;
				i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && (j.asyncTransitions++, r.then(T, T), r.then(c, Pe));
			} catch (e) {
				Pe(e);
			} finally {
				t === null && n._updatedFibers && (e = n._updatedFibers.size, n._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), t !== null && n.types !== null && (t.types !== null && t.types !== n.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), t.types = n.types), j.T = t;
			}
		}, e.unstable_useCacheRefresh = function() {
			return w().useCacheRefresh();
		}, e.use = function(e) {
			return w().use(e);
		}, e.useActionState = function(e, t, n) {
			return w().useActionState(e, t, n);
		}, e.useCallback = function(e, t) {
			return w().useCallback(e, t);
		}, e.useContext = function(e) {
			var t = w();
			return e.$$typeof === ue && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"), t.useContext(e);
		}, e.useDebugValue = function(e, t) {
			return w().useDebugValue(e, t);
		}, e.useDeferredValue = function(e, t) {
			return w().useDeferredValue(e, t);
		}, e.useEffect = function(e, t) {
			return e ?? console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"), w().useEffect(e, t);
		}, e.useEffectEvent = function(e) {
			return w().useEffectEvent(e);
		}, e.useId = function() {
			return w().useId();
		}, e.useImperativeHandle = function(e, t, n) {
			return w().useImperativeHandle(e, t, n);
		}, e.useInsertionEffect = function(e, t) {
			return e ?? console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"), w().useInsertionEffect(e, t);
		}, e.useLayoutEffect = function(e, t) {
			return e ?? console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"), w().useLayoutEffect(e, t);
		}, e.useMemo = function(e, t) {
			return w().useMemo(e, t);
		}, e.useOptimistic = function(e, t) {
			return w().useOptimistic(e, t);
		}, e.useReducer = function(e, t, n) {
			return w().useReducer(e, t, n);
		}, e.useRef = function(e) {
			return w().useRef(e);
		}, e.useState = function(e) {
			return w().useState(e);
		}, e.useSyncExternalStore = function(e, t, n) {
			return w().useSyncExternalStore(e, t, n);
		}, e.useTransition = function() {
			return w().useTransition();
		}, e.version = "19.2.8", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), l = /* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? s() : c();
})), u = /* @__PURE__ */ o(((e) => {
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
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, ee || (ee = !0, w());
		else {
			var t = n(l);
			t !== null && ie(x, t.startTime - e);
		}
	}
	var ee = !1, te = -1, S = 5, C = -1;
	function ne() {
		return g ? !0 : !(e.unstable_now() - C < S);
	}
	function re() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			C = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(te), te = -1), p = !0;
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
								u !== null && ie(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
				}
			} finally {
				i ? w() : ee = !1;
			}
		}
	}
	var w;
	if (typeof y == "function") w = function() {
		y(re);
	};
	else if (typeof MessageChannel < "u") {
		var T = new MessageChannel(), E = T.port2;
		T.port1.onmessage = re, w = function() {
			E.postMessage(null);
		};
	} else w = function() {
		_(re, 0);
	};
	function ie(t, n) {
		te = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : S = 0 < e ? Math.floor(1e3 / e) : 5;
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(te), te = -1) : h = !0, ie(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, w()))), r;
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
})), d = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {
			if (x = !1, C) {
				var t = e.unstable_now();
				w = t;
				var n = !0;
				try {
					a: {
						y = !1, b && (b = !1, te(ne), ne = -1), v = !0;
						var a = _;
						try {
							b: {
								for (o(t), g = r(p); g !== null && !(g.expirationTime > t && c());) {
									var u = g.callback;
									if (typeof u == "function") {
										g.callback = null, _ = g.priorityLevel;
										var d = u(g.expirationTime <= t);
										if (t = e.unstable_now(), typeof d == "function") {
											g.callback = d, o(t), n = !0;
											break b;
										}
										g === r(p) && i(p), o(t);
									} else i(p);
									g = r(p);
								}
								if (g !== null) n = !0;
								else {
									var f = r(m);
									f !== null && l(s, f.startTime - t), n = !1;
								}
							}
							break a;
						} finally {
							g = null, _ = a, v = !1;
						}
					}
				} finally {
					n ? T() : C = !1;
				}
			}
		}
		function n(e, t) {
			var n = e.length;
			e.push(t);
			a: for (; 0 < n;) {
				var r = n - 1 >>> 1, i = e[r];
				if (0 < a(i, t)) e[r] = t, e[n] = i, n = r;
				else break a;
			}
		}
		function r(e) {
			return e.length === 0 ? null : e[0];
		}
		function i(e) {
			if (e.length === 0) return null;
			var t = e[0], n = e.pop();
			if (n !== t) {
				e[0] = n;
				a: for (var r = 0, i = e.length, o = i >>> 1; r < o;) {
					var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
					if (0 > a(c, n)) l < i && 0 > a(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
					else if (l < i && 0 > a(u, n)) e[r] = u, e[l] = n, r = l;
					else break a;
				}
			}
			return t;
		}
		function a(e, t) {
			var n = e.sortIndex - t.sortIndex;
			return n === 0 ? e.id - t.id : n;
		}
		function o(e) {
			for (var t = r(m); t !== null;) {
				if (t.callback === null) i(m);
				else if (t.startTime <= e) i(m), t.sortIndex = t.expirationTime, n(p, t);
				else break;
				t = r(m);
			}
		}
		function s(e) {
			if (b = !1, o(e), !y) if (r(p) !== null) y = !0, C || (C = !0, T());
			else {
				var t = r(m);
				t !== null && l(s, t.startTime - e);
			}
		}
		function c() {
			return x ? !0 : !(e.unstable_now() - w < re);
		}
		function l(t, n) {
			ne = ee(function() {
				t(e.unstable_now());
			}, n);
		}
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
			var u = performance;
			e.unstable_now = function() {
				return u.now();
			};
		} else {
			var d = Date, f = d.now();
			e.unstable_now = function() {
				return d.now() - f;
			};
		}
		var p = [], m = [], h = 1, g = null, _ = 3, v = !1, y = !1, b = !1, x = !1, ee = typeof setTimeout == "function" ? setTimeout : null, te = typeof clearTimeout == "function" ? clearTimeout : null, S = typeof setImmediate < "u" ? setImmediate : null, C = !1, ne = -1, re = 5, w = -1;
		if (typeof S == "function") var T = function() {
			S(t);
		};
		else if (typeof MessageChannel < "u") {
			var E = new MessageChannel(), ie = E.port2;
			E.port1.onmessage = t, T = function() {
				ie.postMessage(null);
			};
		} else T = function() {
			ee(t, 0);
		};
		e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
			e.callback = null;
		}, e.unstable_forceFrameRate = function(e) {
			0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : re = 0 < e ? Math.floor(1e3 / e) : 5;
		}, e.unstable_getCurrentPriorityLevel = function() {
			return _;
		}, e.unstable_next = function(e) {
			switch (_) {
				case 1:
				case 2:
				case 3:
					var t = 3;
					break;
				default: t = _;
			}
			var n = _;
			_ = t;
			try {
				return e();
			} finally {
				_ = n;
			}
		}, e.unstable_requestPaint = function() {
			x = !0;
		}, e.unstable_runWithPriority = function(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: break;
				default: e = 3;
			}
			var n = _;
			_ = e;
			try {
				return t();
			} finally {
				_ = n;
			}
		}, e.unstable_scheduleCallback = function(t, i, a) {
			var o = e.unstable_now();
			switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, t) {
				case 1:
					var c = -1;
					break;
				case 2:
					c = 250;
					break;
				case 5:
					c = 1073741823;
					break;
				case 4:
					c = 1e4;
					break;
				default: c = 5e3;
			}
			return c = a + c, t = {
				id: h++,
				callback: i,
				priorityLevel: t,
				startTime: a,
				expirationTime: c,
				sortIndex: -1
			}, a > o ? (t.sortIndex = a, n(m, t), r(p) === null && t === r(m) && (b ? (te(ne), ne = -1) : b = !0, l(s, a - o))) : (t.sortIndex = c, n(p, t), y || v || (y = !0, C || (C = !0, T()))), t;
		}, e.unstable_shouldYield = c, e.unstable_wrapCallback = function(e) {
			var t = _;
			return function() {
				var n = _;
				_ = t;
				try {
					return e.apply(this, arguments);
				} finally {
					_ = n;
				}
			};
		}, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? u() : d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = l();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
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
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.8";
})), m = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {}
		function n(e) {
			return "" + e;
		}
		function r(e, t, r) {
			var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			try {
				n(i);
				var a = !1;
			} catch {
				a = !0;
			}
			return a && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object"), n(i)), {
				$$typeof: d,
				key: i == null ? null : "" + i,
				children: e,
				containerInfo: t,
				implementation: r
			};
		}
		function i(e, t) {
			if (e === "font") return "";
			if (typeof t == "string") return t === "use-credentials" ? t : "";
		}
		function a(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : "something with type \"" + typeof e + "\"";
		}
		function o(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : typeof e == "string" ? JSON.stringify(e) : typeof e == "number" ? "`" + e + "`" : "something with type \"" + typeof e + "\"";
		}
		function s() {
			var e = f.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var c = l(), u = {
			d: {
				f: t,
				r: function() {
					throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
				},
				D: t,
				C: t,
				L: t,
				m: t,
				X: t,
				S: t,
				M: t
			},
			p: 0,
			findDOMNode: null
		}, d = Symbol.for("react.portal"), f = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, e.createPortal = function(e, t) {
			var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error("Target container is not a DOM element.");
			return r(e, t, null, n);
		}, e.flushSync = function(e) {
			var t = f.T, n = u.p;
			try {
				if (f.T = null, u.p = 2, e) return e();
			} finally {
				f.T = t, u.p = n, u.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
			}
		}, e.preconnect = function(e, t) {
			typeof e == "string" && e ? t != null && typeof t != "object" ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", o(t)) : t != null && typeof t.crossOrigin != "string" && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", a(t.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, u.d.C(e, t));
		}, e.prefetchDNS = function(e) {
			if (typeof e != "string" || !e) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e));
			else if (1 < arguments.length) {
				var t = arguments[1];
				typeof t == "object" && t.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t));
			}
			typeof e == "string" && u.d.D(e);
		}, e.preinit = function(e, t) {
			if (typeof e == "string" && e ? typeof t != "object" || !t ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", o(t)) : t.as !== "style" && t.as !== "script" && console.error("ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are \"style\" and \"script\".", o(t.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && t && typeof t.as == "string") {
				var n = t.as, r = i(n, t.crossOrigin), s = typeof t.integrity == "string" ? t.integrity : void 0, c = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
				n === "style" ? u.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c
				}) : n === "script" && u.d.X(e, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		}, e.preinitModule = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && t.as !== "script" && (n += " The `as` option encountered was " + o(t.as) + "."), n) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", n);
			else switch (n = t && typeof t.as == "string" ? t.as : "script", n) {
				case "script": break;
				default: n = o(n), console.error("ReactDOM.preinitModule(): Currently the only supported \"as\" type for this function is \"script\" but received \"%s\" instead. This warning was generated for `href` \"%s\". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)", n, e);
			}
			typeof e == "string" && (typeof t == "object" && t ? (t.as == null || t.as === "script") && (n = i(t.as, t.crossOrigin), u.d.M(e, {
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			})) : t ?? u.d.M(e));
		}, e.preload = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), typeof t != "object" || !t ? n += " The `options` argument encountered was " + a(t) + "." : typeof t.as == "string" && t.as || (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel=\"preload\" as=\"...\" />` tag.%s", n), typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
				n = t.as;
				var r = i(n, t.crossOrigin);
				u.d.L(e, n, {
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
			var n = "";
			typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && typeof t.as != "string" && (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel=\"modulepreload\" as=\"...\" />` tag.%s", n), typeof e == "string" && (t ? (n = i(t.as, t.crossOrigin), u.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			})) : u.d.m(e));
		}, e.requestFormReset = function(e) {
			u.d.r(e);
		}, e.unstable_batchedUpdates = function(e, t) {
			return e(t);
		}, e.useFormState = function(e, t, n) {
			return s().useFormState(e, t, n);
		}, e.useFormStatus = function() {
			return s().useHostTransitionStatus();
		}, e.version = "19.2.8", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), h = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = p()) : t.exports = m();
})), g = /* @__PURE__ */ o(((e) => {
	var t = f(), n = l(), r = h();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
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
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function u(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return u(a), e;
					if (s === r) return u(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, l = a.child; l;) {
					if (l === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (l === r) {
						c = !0, r = a, n = s;
						break;
					}
					l = l.sibling;
				}
				if (!c) {
					for (l = s.child; l;) {
						if (l === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (l === r) {
							c = !0, r = s, n = a;
							break;
						}
						l = l.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var m = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), te = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), re = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), T = Symbol.for("react.activity"), E = Symbol.for("react.memo_cache_sentinel"), ie = Symbol.iterator;
	function ae(e) {
		return typeof e != "object" || !e ? null : (e = ie && e[ie] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var D = Symbol.for("react.client.reference");
	function oe(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === D ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case C: return "Suspense";
			case ne: return "SuspenseList";
			case T: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case te: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case S:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case re: return t = e.displayName || null, t === null ? oe(e.type) || "Memo" : t;
			case w:
				t = e._payload, e = e._init;
				try {
					return oe(e(t));
				} catch {}
		}
		return null;
	}
	var se = Array.isArray, O = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ce = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, le = [], ue = -1;
	function de(e) {
		return { current: e };
	}
	function fe(e) {
		0 > ue || (e.current = le[ue], le[ue] = null, ue--);
	}
	function pe(e, t) {
		ue++, le[ue] = e.current, e.current = t;
	}
	var me = de(null), he = de(null), ge = de(null), _e = de(null);
	function ve(e, t) {
		switch (pe(ge, t), pe(he, e), pe(me, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? tf(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = tf(t), e = nf(t, e);
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
		fe(me), pe(me, e);
	}
	function ye() {
		fe(me), fe(he), fe(ge);
	}
	function be(e) {
		e.memoizedState !== null && pe(_e, e);
		var t = me.current, n = nf(t, e.type);
		t !== n && (pe(he, e), pe(me, n));
	}
	function A(e) {
		he.current === e && (fe(me), fe(he)), _e.current === e && (fe(_e), up._currentValue = ce);
	}
	var xe, Se;
	function Ce(e) {
		if (xe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			xe = t && t[1] || "", Se = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + xe + e + Se;
	}
	var we = !1;
	function j(e, t) {
		if (!e || we) return "";
		we = !0;
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
			we = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ce(n) : "";
	}
	function Te(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ce(e.type);
			case 16: return Ce("Lazy");
			case 13: return e.child !== t && t !== null ? Ce("Suspense Fallback") : Ce("Suspense");
			case 19: return Ce("SuspenseList");
			case 0:
			case 15: return j(e.type, !1);
			case 11: return j(e.type.render, !1);
			case 1: return j(e.type, !0);
			case 31: return Ce("Activity");
			default: return "";
		}
	}
	function Ee(e) {
		try {
			var t = "", n = null;
			do
				t += Te(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var De = Object.prototype.hasOwnProperty, Oe = t.unstable_scheduleCallback, ke = t.unstable_cancelCallback, Ae = t.unstable_shouldYield, je = t.unstable_requestPaint, Me = t.unstable_now, Ne = t.unstable_getCurrentPriorityLevel, Pe = t.unstable_ImmediatePriority, Fe = t.unstable_UserBlockingPriority, Ie = t.unstable_NormalPriority, Le = t.unstable_LowPriority, Re = t.unstable_IdlePriority, ze = t.log, Be = t.unstable_setDisableYieldValue, Ve = null, He = null;
	function Ue(e) {
		if (typeof ze == "function" && Be(e), He && typeof He.setStrictMode == "function") try {
			He.setStrictMode(Ve, e);
		} catch {}
	}
	var We = Math.clz32 ? Math.clz32 : qe, Ge = Math.log, Ke = Math.LN2;
	function qe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ge(e) / Ke | 0) | 0;
	}
	var Je = 256, Ye = 262144, Xe = 4194304;
	function Ze(e) {
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
	function Qe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o) : i = Ze(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o)) : i = Ze(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function $e(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function et(e, t) {
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
	function tt() {
		var e = Xe;
		return Xe <<= 1, !(Xe & 62914560) && (Xe = 4194304), e;
	}
	function nt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function rt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function it(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - We(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && at(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function at(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - We(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ot(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - We(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function st(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : M(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function M(e) {
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
	function ct(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function lt() {
		var e = k.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ep(e.type)) : e;
	}
	function ut(e, t) {
		var n = k.p;
		try {
			return k.p = e, t();
		} finally {
			k.p = n;
		}
	}
	var dt = Math.random().toString(36).slice(2), ft = "__reactFiber$" + dt, pt = "__reactProps$" + dt, mt = "__reactContainer$" + dt, ht = "__reactEvents$" + dt, gt = "__reactListeners$" + dt, _t = "__reactHandles$" + dt, vt = "__reactResources$" + dt, yt = "__reactMarker$" + dt;
	function bt(e) {
		delete e[ft], delete e[pt], delete e[ht], delete e[gt], delete e[_t];
	}
	function xt(e) {
		var t = e[ft];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[mt] || n[ft]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Tf(e); e !== null;) {
					if (n = e[ft]) return n;
					e = Tf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function St(e) {
		if (e = e[ft] || e[mt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Ct(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function wt(e) {
		var t = e[vt];
		return t ||= e[vt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Tt(e) {
		e[yt] = !0;
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
		return De.call(Mt, e) ? !0 : De.call(jt, e) ? !1 : At.test(e) ? Mt[e] = !0 : (jt[e] = !0, !1);
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
				if (n != null) throw Error(i(92));
				if (se(r)) {
					if (1 < r.length) throw Error(i(93));
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
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && $t(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && $t(e, o, t[o]);
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
		var t = St(e);
		if (t && (e = t.stateNode)) {
			var n = e[pt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Gt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Wt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[pt] || null;
								if (!a) throw Error(i(90));
								Gt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
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
			if (fn = !1, (ln !== null || un !== null) && (Mu(), ln && (t = ln, e = un, un = ln = null, dn(t), e))) for (t = 0; t < e.length; t++) dn(e[t]);
		}
	}
	function mn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[pt] || null;
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
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
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
		return m(t.prototype, {
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
	}, Dn = Tn(En), On = m({}, En, {
		view: 0,
		detail: 0
	}), kn = Tn(On), An, jn, Mn, Nn = m({}, On, {
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
	}), Pn = Tn(Nn), Fn = Tn(m({}, Nn, { dataTransfer: 0 })), In = Tn(m({}, On, { relatedTarget: 0 })), Ln = Tn(m({}, En, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Rn = Tn(m({}, En, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), zn = Tn(m({}, En, { data: 0 })), Bn = {
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
	var Gn = Tn(m({}, On, {
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
	})), Kn = Tn(m({}, Nn, {
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
	})), qn = Tn(m({}, On, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Wn
	})), Jn = Tn(m({}, En, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Yn = Tn(m({}, Nn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Xn = Tn(m({}, En, {
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
		ln ? un ? un.push(r) : un = [r] : ln = r, t = zd(t, "onChange"), 0 < t.length && (n = new Dn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var fr = null, pr = null;
	function mr(e) {
		Md(e, 0);
	}
	function hr(e) {
		if (Vt(Ct(e))) return e;
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
			if (!De.call(t, i) || !Or(e[i], t[i])) return !1;
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
		}), Rr && kr(Rr, r) || (Rr = r, r = zd(Lr, "onSelect"), 0 < r.length && (t = new Dn("onSelect", "select", null, t, n), e.push({
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
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - We(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function di(e) {
		if (50 < Cu) throw Cu = 0, wu = null, Error(i(185));
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
	function vi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") hi(e) && (s = 1);
		else if (typeof e == "string") s = tp(e, n, me.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case T: return e = mi(31, n, t, a), e.elementType = T, e.lanes = o, e;
			case y: return yi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = mi(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case C: return e = mi(13, n, t, a), e.elementType = C, e.lanes = o, e;
			case ne: return e = mi(19, n, t, a), e.elementType = ne, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case te:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case S:
						s = 11;
						break a;
					case re:
						s = 14;
						break a;
					case w:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = mi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
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
				stack: Ee(t)
			}, Ci.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ee(t)
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
		var i = 32 - We(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - We(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Mi = 1 << 32 - We(t) + i | n << i | r, Ni = a + e;
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
	var zi = null, Bi = null, N = !1, Vi = null, Hi = !1, Ui = Error(i(519));
	function Wi(e) {
		throw Xi(wi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ui;
	}
	function Gi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[ft] = e, t[pt] = r, n) {
			case "dialog":
				z("cancel", t), z("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				z("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Ad.length; n++) z(Ad[n], t);
				break;
			case "source":
				z("error", t);
				break;
			case "img":
			case "image":
			case "link":
				z("error", t), z("load", t);
				break;
			case "details":
				z("toggle", t);
				break;
			case "input":
				z("invalid", t), Kt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				z("invalid", t);
				break;
			case "textarea": z("invalid", t), Xt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Gd(t.textContent, n) ? (r.popover != null && (z("beforetoggle", t), z("toggle", t)), r.onScroll != null && z("scroll", t), r.onScrollEnd != null && z("scrollend", t), r.onClick != null && (t.onclick = on), t = !0) : t = !1, t || Wi(e, !0);
	}
	function Ki(e) {
		for (zi = e.return; zi;) switch (zi.tag) {
			case 5:
			case 31:
			case 13:
				Hi = !1;
				return;
			case 27:
			case 3:
				Hi = !0;
				return;
			default: zi = zi.return;
		}
	}
	function qi(e) {
		if (e !== zi) return !1;
		if (!N) return Ki(e), N = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || rf(e.type, e.memoizedProps)), n = !n), n && Bi && Wi(e), Ki(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Bi = wf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Bi = wf(e);
		} else t === 27 ? (t = Bi, ff(e.type) ? (e = Cf, Cf = null, Bi = e) : Bi = t) : Bi = zi ? Sf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ji() {
		Bi = zi = null, N = !1;
	}
	function Yi() {
		var e = Vi;
		return e !== null && (lu === null ? lu = e : lu.push.apply(lu, e), Vi = null), e;
	}
	function Xi(e) {
		Vi === null ? Vi = [e] : Vi.push(e);
	}
	var Zi = de(null), Qi = null, $i = null;
	function ea(e, t, n) {
		pe(Zi, t._currentValue), t._currentValue = n;
	}
	function ta(e) {
		e._currentValue = Zi.current, fe(Zi);
	}
	function na(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ra(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), na(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), na(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function ia(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Or(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === _e.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [up] : e.push(up));
			}
			a = a.return;
		}
		e !== null && ra(t, e, n, r), t.flags |= 262144;
	}
	function aa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Or(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function oa(e) {
		Qi = e, $i = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function sa(e) {
		return la(Qi, e);
	}
	function ca(e, t) {
		return Qi === null && oa(e), la(e, t);
	}
	function la(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, $i === null) {
			if (e === null) throw Error(i(308));
			$i = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else $i = $i.next = t;
		return n;
	}
	var ua = typeof AbortController < "u" ? AbortController : function() {
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
	}, da = t.unstable_scheduleCallback, fa = t.unstable_NormalPriority, pa = {
		$$typeof: te,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ma() {
		return {
			controller: new ua(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ha(e) {
		e.refCount--, e.refCount === 0 && da(fa, function() {
			e.controller.abort();
		});
	}
	var ga = null, P = 0, F = 0, _a = null;
	function va(e, t) {
		if (ga === null) {
			var n = ga = [];
			P = 0, F = wd(), _a = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return P++, t.then(ya, ya), t;
	}
	function ya() {
		if (--P === 0 && ga !== null) {
			_a !== null && (_a.status = "fulfilled");
			var e = ga;
			ga = null, F = 0, _a = null;
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
	var xa = O.S;
	O.S = function(e, t) {
		fu = Me(), typeof t == "object" && t && typeof t.then == "function" && va(e, t), xa !== null && xa(e, t);
	};
	var Sa = de(null);
	function Ca() {
		var e = Sa.current;
		return e === null ? Yl.pooledCache : e;
	}
	function wa(e, t) {
		t === null ? pe(Sa, Sa.current) : pe(Sa, t.pool);
	}
	function Ta() {
		var e = Ca();
		return e === null ? null : {
			parent: pa._currentValue,
			pool: e
		};
	}
	var Ea = Error(i(460)), Da = Error(i(474)), Oa = Error(i(542)), ka = { then: function() {} };
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
					if (e = Yl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
		if (Na === null) throw Error(i(459));
		var e = Na;
		return Na = null, e;
	}
	function Fa(e) {
		if (e === Ea || e === Oa) throw Error(i(483));
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
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
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
		function a(e, t) {
			return e = gi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = bi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === w && Ma(i) === t.type) ? (t = a(t, n.props), za(t, n), t.return = e, t) : (t = vi(n.type, n.key, n.props, null, e.mode, r), za(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Si(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = yi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = bi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = vi(t.type, t.key, t.props, null, e.mode, n), za(n, t), n.return = e, n;
					case v: return t = Si(t, e.mode, n), t.return = e, t;
					case w: return t = Ma(t), f(e, t, n);
				}
				if (se(t) || ae(t)) return t = yi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ra(t), n);
				if (t.$$typeof === te) return f(e, ca(e, t), n);
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
					case w: return n = Ma(n), p(e, t, n, r);
				}
				if (se(n) || ae(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ra(n), r);
				if (n.$$typeof === te) return p(e, t, ca(e, n), r);
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
					case w: return r = Ma(r), m(e, t, n, r, i);
				}
				if (se(r) || ae(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ra(r), i);
				if (r.$$typeof === te) return m(e, t, n, ca(t, r), i);
				Ba(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), N && Pi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return N && Pi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), N && Pi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), N && Pi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return N && Pi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), N && Pi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === w && Ma(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), za(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === y ? (c = yi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = vi(o.type, o.key, o.props, null, e.mode, c), za(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Si(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case w: return o = Ma(o), b(e, r, o, c);
				}
				if (se(o)) return h(e, r, o, c);
				if (ae(o)) {
					if (l = ae(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ra(o), c);
				if (o.$$typeof === te) return b(e, r, ca(e, o), c);
				Ba(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = bi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
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
		if (r = r.shared, Jl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = di(e), ui(e, null, n), t;
		}
		return si(e, r, t, n), di(e);
	}
	function Ya(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
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
				if (p ? (Xl & f) === f : (r & f) === f) {
					f !== 0 && f === F && (Za = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var h = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (h = g.payload, typeof h == "function") {
									d = h.call(_, d, f);
									break a;
								}
								d = h;
								break a;
							case 3: h.flags = h.flags & -65537 | 128;
							case 0:
								if (h = g.payload, f = typeof h == "function" ? h.call(_, d, f) : h, f == null) break a;
								d = m({}, d, f);
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), iu |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function eo(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function to(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) eo(n[e], t);
	}
	var no = de(null), ro = de(0);
	function io(e, t) {
		e = nu, pe(ro, e), pe(no, t), nu = e | t.baseLanes;
	}
	function ao() {
		pe(ro, nu), pe(no, no.current);
	}
	function oo() {
		nu = ro.current, fe(no), fe(ro);
	}
	var so = de(null), co = null;
	function lo(e) {
		var t = e.alternate;
		pe(ho, ho.current & 1), pe(so, e), co === null && (t === null || no.current !== null || t.memoizedState !== null) && (co = e);
	}
	function uo(e) {
		pe(ho, ho.current), pe(so, e), co === null && (co = e);
	}
	function fo(e) {
		e.tag === 22 ? (pe(ho, ho.current), pe(so, e), co === null && (co = e)) : po(e);
	}
	function po() {
		pe(ho, ho.current), pe(so, so.current);
	}
	function mo(e) {
		fe(so), co === e && (co = null), fe(ho);
	}
	var ho = de(0);
	function go(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || yf(n) || bf(n))) return t;
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
	var _o = 0, I = null, vo = null, yo = null, bo = !1, xo = !1, So = !1, Co = 0, wo = 0, To = null, Eo = 0;
	function Do() {
		throw Error(i(321));
	}
	function Oo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Or(e[n], t[n])) return !1;
		return !0;
	}
	function ko(e, t, n, r, i, a) {
		return _o = a, I = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Ks : qs, So = !1, a = n(r, i), So = !1, xo && (a = jo(t, n, r, i)), Ao(e), a;
	}
	function Ao(e) {
		O.H = Gs;
		var t = vo !== null && vo.next !== null;
		if (_o = 0, yo = vo = I = null, bo = !1, wo = 0, To = null, t) throw Error(i(300));
		e === null || uc || (e = e.dependencies, e !== null && aa(e) && (uc = !0));
	}
	function jo(e, t, n, r) {
		I = e;
		var a = 0;
		do {
			if (xo && (To = null), wo = 0, xo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, yo = vo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			O.H = Js, o = t(n, r);
		} while (xo);
		return o;
	}
	function Mo() {
		var e = O.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? zo(t) : t, e = e.useState()[0], (vo === null ? null : vo.memoizedState) !== e && (I.flags |= 1024), t;
	}
	function No() {
		var e = Co !== 0;
		return Co = 0, e;
	}
	function Po(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Fo(e) {
		if (bo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			bo = !1;
		}
		_o = 0, yo = vo = I = null, xo = !1, wo = Co = 0, To = null;
	}
	function Io() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return yo === null ? I.memoizedState = yo = e : yo = yo.next = e, yo;
	}
	function Lo() {
		if (vo === null) {
			var e = I.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = vo.next;
		var t = yo === null ? I.memoizedState : yo.next;
		if (t !== null) yo = t, vo = e;
		else {
			if (e === null) throw I.alternate === null ? Error(i(467)) : Error(i(310));
			vo = e, e = {
				memoizedState: vo.memoizedState,
				baseState: vo.baseState,
				baseQueue: vo.baseQueue,
				queue: vo.queue,
				next: null
			}, yo === null ? I.memoizedState = yo = e : yo = yo.next = e;
		}
		return yo;
	}
	function Ro() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function zo(e) {
		var t = wo;
		return wo += 1, To === null && (To = []), e = ja(To, e, t), t = I, (yo === null ? t.memoizedState : yo.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Ks : qs), e;
	}
	function Bo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return zo(e);
			if (e.$$typeof === te) return sa(e);
		}
		throw Error(i(438, String(e)));
	}
	function Vo(e) {
		var t = null, n = I.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = I.alternate;
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
		}, n === null && (n = Ro(), I.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = E;
		return t.index++, n;
	}
	function Ho(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Uo(e) {
		return Wo(Lo(), vo, e);
	}
	function Wo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (_o & f) === f : (Xl & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === F && (d = !0);
					else if ((_o & p) === p) {
						u = u.next, p === F && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, I.lanes |= p, iu |= p;
					f = u.action, So && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, I.lanes |= f, iu |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Or(o, e.memoizedState) && (uc = !0, d && (n = _a, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Go(e) {
		var t = Lo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Or(o, t.memoizedState) || (uc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Ko(e, t, n) {
		var r = I, a = Lo(), o = N;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Or((vo || a).memoizedState, n);
		if (s && (a.memoizedState = n, uc = !0), a = a.queue, _s(Yo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || yo !== null && yo.memoizedState.tag & 1) {
			if (r.flags |= 2048, fs(9, { destroy: void 0 }, Jo.bind(null, r, a, n, t), null), Yl === null) throw Error(i(349));
			o || _o & 127 || qo(r, t, n);
		}
		return n;
	}
	function qo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = I.updateQueue, t === null ? (t = Ro(), I.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Jo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Xo(t) && Zo(e);
	}
	function Yo(e, t, n) {
		return n(function() {
			Xo(t) && Zo(e);
		});
	}
	function Xo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Or(e, n);
		} catch {
			return !0;
		}
	}
	function Zo(e) {
		var t = li(e, 2);
		t !== null && Du(t, e, 2);
	}
	function Qo(e) {
		var t = Io();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), So) {
				Ue(!0);
				try {
					n();
				} finally {
					Ue(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ho,
			lastRenderedState: e
		}, t;
	}
	function $o(e, t, n, r) {
		return e.baseState = n, Wo(e, vo, typeof r == "function" ? r : Ho);
	}
	function es(e, t, n, r, a) {
		if (Hs(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			O.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, ts(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function ts(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = O.T, o = {};
			O.T = o;
			try {
				var s = n(i, r), c = O.S;
				c !== null && c(o, s), ns(e, t, s);
			} catch (n) {
				is(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), O.T = a;
			}
		} else try {
			a = n(i, r), ns(e, t, a);
		} catch (n) {
			is(e, t, n);
		}
	}
	function ns(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			rs(e, t, n);
		}, function(n) {
			return is(e, t, n);
		}) : rs(e, t, n);
	}
	function rs(e, t, n) {
		t.status = "fulfilled", t.value = n, as(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, ts(e, n)));
	}
	function is(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, as(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function as(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function os(e, t) {
		return t;
	}
	function ss(e, t) {
		if (N) {
			var n = Yl.formState;
			if (n !== null) {
				a: {
					var r = I;
					if (N) {
						if (Bi) {
							b: {
								for (var i = Bi, a = Hi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = Sf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Bi = Sf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Wi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Io(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: os,
			lastRenderedState: t
		}, n.queue = r, n = zs.bind(null, I, r), r.dispatch = n, r = Qo(!1), a = Vs.bind(null, I, !1, r.queue), r = Io(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = es.bind(null, I, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function cs(e) {
		return ls(Lo(), vo, e);
	}
	function ls(e, t, n) {
		if (t = Wo(e, t, os)[0], e = Uo(Ho)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = zo(t);
		} catch (e) {
			throw e === Ea ? Oa : e;
		}
		else r = t;
		t = Lo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (I.flags |= 2048, fs(9, { destroy: void 0 }, us.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function us(e, t) {
		e.action = t;
	}
	function ds(e) {
		var t = Lo(), n = vo;
		if (n !== null) return ls(t, n, e);
		Lo(), t = t.memoizedState, n = Lo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function fs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = I.updateQueue, t === null && (t = Ro(), I.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ps() {
		return Lo().memoizedState;
	}
	function ms(e, t, n, r) {
		var i = Io();
		I.flags |= e, i.memoizedState = fs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function hs(e, t, n, r) {
		var i = Lo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		vo !== null && r !== null && Oo(r, vo.memoizedState.deps) ? i.memoizedState = fs(t, a, n, r) : (I.flags |= e, i.memoizedState = fs(1 | t, a, n, r));
	}
	function gs(e, t) {
		ms(8390656, 8, e, t);
	}
	function _s(e, t) {
		hs(2048, 8, e, t);
	}
	function vs(e) {
		I.flags |= 4;
		var t = I.updateQueue;
		if (t === null) t = Ro(), I.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ys(e) {
		var t = Lo().memoizedState;
		return vs({
			ref: t,
			nextImpl: e
		}), function() {
			if (Jl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function bs(e, t) {
		return hs(4, 2, e, t);
	}
	function xs(e, t) {
		return hs(4, 4, e, t);
	}
	function Ss(e, t) {
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
	function Cs(e, t, n) {
		n = n == null ? null : n.concat([e]), hs(4, 4, Ss.bind(null, t, e), n);
	}
	function ws() {}
	function Ts(e, t) {
		var n = Lo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Oo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Es(e, t) {
		var n = Lo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Oo(t, r[1])) return r[0];
		if (r = e(), So) {
			Ue(!0);
			try {
				e();
			} finally {
				Ue(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Ds(e, t, n) {
		return n === void 0 || _o & 1073741824 && !(Xl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Eu(), I.lanes |= e, iu |= e, n);
	}
	function Os(e, t, n, r) {
		return Or(n, t) ? n : no.current === null ? !(_o & 42) || _o & 1073741824 && !(Xl & 261930) ? (uc = !0, e.memoizedState = n) : (e = Eu(), I.lanes |= e, iu |= e, t) : (e = Ds(e, n, r), Or(e, t) || (uc = !0), e);
	}
	function ks(e, t, n, r, i) {
		var a = k.p;
		k.p = a !== 0 && 8 > a ? a : 8;
		var o = O.T, s = {};
		O.T = s, Vs(e, !1, t, n);
		try {
			var c = i(), l = O.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Bs(e, t, ba(c, r), Tu(e)) : Bs(e, t, r, Tu(e));
		} catch (n) {
			Bs(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Tu());
		} finally {
			k.p = a, o !== null && s.types !== null && (o.types = s.types), O.T = o;
		}
	}
	function As() {}
	function js(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Ms(e).queue;
		ks(e, a, t, ce, n === null ? As : function() {
			return Ns(e), n(r);
		});
	}
	function Ms(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ce,
			baseState: ce,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ho,
				lastRenderedState: ce
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
				lastRenderedReducer: Ho,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ns(e) {
		var t = Ms(e);
		t.next === null && (t = e.alternate.memoizedState), Bs(e, t.next.queue, {}, Tu());
	}
	function Ps() {
		return sa(up);
	}
	function Fs() {
		return Lo().memoizedState;
	}
	function Is() {
		return Lo().memoizedState;
	}
	function Ls(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Tu();
					e = qa(n);
					var r = Ja(t, e, n);
					r !== null && (Du(r, t, n), Ya(r, t, n)), t = { cache: ma() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Rs(e, t, n) {
		var r = Tu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Hs(e) ? Us(t, n) : (n = ci(e, t, n, r), n !== null && (Du(n, e, r), Ws(n, t, r)));
	}
	function zs(e, t, n) {
		Bs(e, t, n, Tu());
	}
	function Bs(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Hs(e)) Us(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Or(s, o)) return si(e, t, i, 0), Yl === null && oi(), !1;
			} catch {}
			if (n = ci(e, t, i, r), n !== null) return Du(n, e, r), Ws(n, t, r), !0;
		}
		return !1;
	}
	function Vs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: wd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Hs(e)) {
			if (t) throw Error(i(479));
		} else t = ci(e, n, r, 2), t !== null && Du(t, e, 2);
	}
	function Hs(e) {
		var t = e.alternate;
		return e === I || t !== null && t === I;
	}
	function Us(e, t) {
		xo = bo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ws(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	var Gs = {
		readContext: sa,
		use: Bo,
		useCallback: Do,
		useContext: Do,
		useEffect: Do,
		useImperativeHandle: Do,
		useLayoutEffect: Do,
		useInsertionEffect: Do,
		useMemo: Do,
		useReducer: Do,
		useRef: Do,
		useState: Do,
		useDebugValue: Do,
		useDeferredValue: Do,
		useTransition: Do,
		useSyncExternalStore: Do,
		useId: Do,
		useHostTransitionStatus: Do,
		useFormState: Do,
		useActionState: Do,
		useOptimistic: Do,
		useMemoCache: Do,
		useCacheRefresh: Do
	};
	Gs.useEffectEvent = Do;
	var Ks = {
		readContext: sa,
		use: Bo,
		useCallback: function(e, t) {
			return Io().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: sa,
		useEffect: gs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ms(4194308, 4, Ss.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ms(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ms(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Io();
			t = t === void 0 ? null : t;
			var r = e();
			if (So) {
				Ue(!0);
				try {
					e();
				} finally {
					Ue(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Io();
			if (n !== void 0) {
				var i = n(t);
				if (So) {
					Ue(!0);
					try {
						n(t);
					} finally {
						Ue(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Rs.bind(null, I, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Io();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Qo(e);
			var t = e.queue, n = zs.bind(null, I, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ws,
		useDeferredValue: function(e, t) {
			return Ds(Io(), e, t);
		},
		useTransition: function() {
			var e = Qo(!1);
			return e = ks.bind(null, I, e.queue, !0, !1), Io().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = I, a = Io();
			if (N) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Yl === null) throw Error(i(349));
				Xl & 127 || qo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, gs(Yo.bind(null, r, o, e), [e]), r.flags |= 2048, fs(9, { destroy: void 0 }, Jo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Io(), t = Yl.identifierPrefix;
			if (N) {
				var n = Ni, r = Mi;
				n = (r & ~(1 << 32 - We(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Co++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Eo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ps,
		useFormState: ss,
		useActionState: ss,
		useOptimistic: function(e) {
			var t = Io();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Vs.bind(null, I, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Vo,
		useCacheRefresh: function() {
			return Io().memoizedState = Ls.bind(null, I);
		},
		useEffectEvent: function(e) {
			var t = Io(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Jl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, qs = {
		readContext: sa,
		use: Bo,
		useCallback: Ts,
		useContext: sa,
		useEffect: _s,
		useImperativeHandle: Cs,
		useInsertionEffect: bs,
		useLayoutEffect: xs,
		useMemo: Es,
		useReducer: Uo,
		useRef: ps,
		useState: function() {
			return Uo(Ho);
		},
		useDebugValue: ws,
		useDeferredValue: function(e, t) {
			return Os(Lo(), vo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Uo(Ho)[0], t = Lo().memoizedState;
			return [typeof e == "boolean" ? e : zo(e), t];
		},
		useSyncExternalStore: Ko,
		useId: Fs,
		useHostTransitionStatus: Ps,
		useFormState: cs,
		useActionState: cs,
		useOptimistic: function(e, t) {
			return $o(Lo(), vo, e, t);
		},
		useMemoCache: Vo,
		useCacheRefresh: Is
	};
	qs.useEffectEvent = ys;
	var Js = {
		readContext: sa,
		use: Bo,
		useCallback: Ts,
		useContext: sa,
		useEffect: _s,
		useImperativeHandle: Cs,
		useInsertionEffect: bs,
		useLayoutEffect: xs,
		useMemo: Es,
		useReducer: Go,
		useRef: ps,
		useState: function() {
			return Go(Ho);
		},
		useDebugValue: ws,
		useDeferredValue: function(e, t) {
			var n = Lo();
			return vo === null ? Ds(n, e, t) : Os(n, vo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Go(Ho)[0], t = Lo().memoizedState;
			return [typeof e == "boolean" ? e : zo(e), t];
		},
		useSyncExternalStore: Ko,
		useId: Fs,
		useHostTransitionStatus: Ps,
		useFormState: ds,
		useActionState: ds,
		useOptimistic: function(e, t) {
			var n = Lo();
			return vo === null ? (n.baseState = e, [e, n.queue.dispatch]) : $o(n, vo, e, t);
		},
		useMemoCache: Vo,
		useCacheRefresh: Is
	};
	Js.useEffectEvent = ys;
	function Ys(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : m({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Xs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Tu(), i = qa(r);
			i.payload = t, n != null && (i.callback = n), t = Ja(e, i, r), t !== null && (Du(t, e, r), Ya(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Tu(), i = qa(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ja(e, i, r), t !== null && (Du(t, e, r), Ya(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Tu(), r = qa(n);
			r.tag = 2, t != null && (r.callback = t), t = Ja(e, r, n), t !== null && (Du(t, e, n), Ya(t, e, n));
		}
	};
	function Zs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !kr(n, r) || !kr(i, a) : !0;
	}
	function Qs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Xs.enqueueReplaceState(t, t.state, null);
	}
	function $s(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = m({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function ec(e) {
		ni(e);
	}
	function tc(e) {
		console.error(e);
	}
	function nc(e) {
		ni(e);
	}
	function rc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function ic(e, t, n) {
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
	function ac(e, t, n) {
		return n = qa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			rc(e, t);
		}, n;
	}
	function oc(e) {
		return e = qa(e), e.tag = 3, e;
	}
	function sc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				ic(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			ic(t, n, r), typeof i != "function" && (hu === null ? hu = /* @__PURE__ */ new Set([this]) : hu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function cc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ia(t, n, a, !0), n = so.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return co === null ? zu() : n.alternate === null && ru === 0 && (ru = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ka ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), id(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ka ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), id(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return id(e, r, a), zu(), !1;
		}
		if (N) return t = so.current, t === null ? (r !== Ui && (t = Error(i(423), { cause: r }), Xi(wi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = wi(r, n), a = ac(e.stateNode, r, a), Xa(e, a), ru !== 4 && (ru = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ui && (e = Error(i(422), { cause: r }), Xi(wi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = wi(o, n), R === null ? R = [o] : R.push(o), ru !== 4 && (ru = 2), t === null) return !0;
		r = wi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = ac(n.stateNode, r, e), Xa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (hu === null || !hu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = oc(a), sc(a, e, n, r), Xa(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var lc = Error(i(461)), uc = !1;
	function dc(e, t, n, r) {
		t.child = e === null ? Ua(t, null, n, r) : Ha(t, e.child, n, r);
	}
	function fc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return oa(t), r = ko(e, t, n, o, a, i), s = No(), e !== null && !uc ? (Po(e, t, i), Ic(e, t, i)) : (N && s && Ii(t), t.flags |= 1, dc(e, t, r, i), t.child);
	}
	function pc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !hi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, mc(e, t, a, r, i)) : (e = vi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Lc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? kr : n, n(o, r) && e.ref === t.ref) return Ic(e, t, i);
		}
		return t.flags |= 1, e = gi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function mc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (kr(a, r) && e.ref === t.ref) if (uc = !1, t.pendingProps = r = a, Lc(e, i)) e.flags & 131072 && (uc = !0);
			else return t.lanes = e.lanes, Ic(e, t, i);
		}
		return Sc(e, t, n, r, i);
	}
	function hc(e, t, n, r) {
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
				return _c(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && wa(t, a === null ? null : a.cachePool), a === null ? ao() : io(t, a), fo(t);
			else return r = t.lanes = 536870912, _c(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && wa(t, null), ao(), po(t)) : (wa(t, a.cachePool), io(t, a), po(t), t.memoizedState = null);
		return dc(e, t, i, n), t.child;
	}
	function gc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function _c(e, t, n, r, i) {
		var a = Ca();
		return a = a === null ? null : {
			parent: pa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && wa(t, null), ao(), fo(t), e !== null && ia(e, t, r, !0), t.childLanes = i, null;
	}
	function vc(e, t) {
		return t = jc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function yc(e, t, n) {
		return Ha(t, e.child, null, n), e = vc(t, t.pendingProps), e.flags |= 2, mo(t), t.memoizedState = null, e;
	}
	function bc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (N) {
				if (r.mode === "hidden") return e = vc(t, r), t.lanes = 536870912, gc(null, e);
				if (uo(t), (e = Bi) ? (e = vf(e, Hi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ji === null ? null : {
						id: Mi,
						overflow: Ni
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = xi(e), n.return = t, t.child = n, zi = t, Bi = null)) : e = null, e === null) throw Wi(t);
				return t.lanes = 536870912, null;
			}
			return vc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (uo(t), a) if (t.flags & 256) t.flags &= -257, t = yc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (uc || ia(e, t, n, !1), a = (n & e.childLanes) !== 0, uc || a) {
				if (r = Yl, r !== null && (s = st(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, li(e, s), Du(r, e, s), lc;
				zu(), t = yc(e, t, n);
			} else e = o.treeContext, Bi = Sf(s.nextSibling), zi = t, N = !0, Vi = null, Hi = !1, e !== null && Ri(t, e), t = vc(t, r), t.flags |= 4096;
			return t;
		}
		return e = gi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function xc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Sc(e, t, n, r, i) {
		return oa(t), n = ko(e, t, n, r, void 0, i), r = No(), e !== null && !uc ? (Po(e, t, i), Ic(e, t, i)) : (N && r && Ii(t), t.flags |= 1, dc(e, t, n, i), t.child);
	}
	function Cc(e, t, n, r, i, a) {
		return oa(t), t.updateQueue = null, n = jo(t, r, n, i), Ao(e), r = No(), e !== null && !uc ? (Po(e, t, a), Ic(e, t, a)) : (N && r && Ii(t), t.flags |= 1, dc(e, t, n, a), t.child);
	}
	function wc(e, t, n, r, i) {
		if (oa(t), t.stateNode === null) {
			var a = fi, o = n.contextType;
			typeof o == "object" && o && (a = sa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Xs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ga(t), o = n.contextType, a.context = typeof o == "object" && o ? sa(o) : fi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ys(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Xs.enqueueReplaceState(a, a.state, null), $a(t, r, a, i), Qa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = $s(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = fi, typeof u == "object" && u && (o = sa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Qs(t, a, r, o), Wa = !1;
			var f = t.memoizedState;
			a.state = f, $a(t, r, a, i), Qa(), l = t.memoizedState, s || f !== l || Wa ? (typeof d == "function" && (Ys(t, n, d, r), l = t.memoizedState), (c = Wa || Zs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ka(e, t), o = t.memoizedProps, u = $s(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = fi, typeof l == "object" && l && (c = sa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Qs(t, a, r, c), Wa = !1, f = t.memoizedState, a.state = f, $a(t, r, a, i), Qa();
			var p = t.memoizedState;
			o !== d || f !== p || Wa || e !== null && e.dependencies !== null && aa(e.dependencies) ? (typeof s == "function" && (Ys(t, n, s, r), p = t.memoizedState), (u = Wa || Zs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && aa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, xc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ha(t, e.child, null, i), t.child = Ha(t, null, n, i)) : dc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Ic(e, t, i), e;
	}
	function Tc(e, t, n, r) {
		return Ji(), t.flags |= 256, dc(e, t, n, r), t.child;
	}
	var Ec = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Dc(e) {
		return {
			baseLanes: e,
			cachePool: Ta()
		};
	}
	function Oc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= su), e;
	}
	function kc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(ho.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (N) {
				if (a ? lo(t) : po(t), (e = Bi) ? (e = vf(e, Hi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ji === null ? null : {
						id: Mi,
						overflow: Ni
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = xi(e), n.return = t, t.child = n, zi = t, Bi = null)) : e = null, e === null) throw Wi(t);
				return bf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (po(t), a = t.mode, c = jc({
				mode: "hidden",
				children: c
			}, a), r = yi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = Dc(n), r.childLanes = Oc(e, s, n), t.memoizedState = Ec, gc(null, r)) : (lo(t), Ac(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (lo(t), t.flags &= -257, t = Mc(e, t, n)) : t.memoizedState === null ? (po(t), c = r.fallback, a = t.mode, r = jc({
				mode: "visible",
				children: r.children
			}, a), c = yi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ha(t, e.child, null, n), r = t.child, r.memoizedState = Dc(n), r.childLanes = Oc(e, s, n), t.memoizedState = Ec, t = gc(null, r)) : (po(t), t.child = e.child, t.flags |= 128, t = null);
			else if (lo(t), bf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Xi({
					value: r,
					source: null,
					stack: null
				}), t = Mc(e, t, n);
			} else if (uc || ia(e, t, n, !1), s = (n & e.childLanes) !== 0, uc || s) {
				if (s = Yl, s !== null && (r = st(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, li(e, r), Du(s, e, r), lc;
				yf(c) || zu(), t = Mc(e, t, n);
			} else yf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Bi = Sf(c.nextSibling), zi = t, N = !0, Vi = null, Hi = !1, e !== null && Ri(t, e), t = Ac(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (po(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = gi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = yi(c, a, n, null), c.flags |= 2) : c = gi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, gc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = Dc(n) : (a = c.cachePool, a === null ? a = Ta() : (l = pa._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = Oc(e, s, n), t.memoizedState = Ec, gc(e.child, r)) : (lo(t), n = e.child, e = n.sibling, n = gi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Ac(e, t) {
		return t = jc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function jc(e, t) {
		return e = mi(22, e, null, t), e.lanes = 0, e;
	}
	function Mc(e, t, n) {
		return Ha(t, e.child, null, n), e = Ac(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Nc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), na(e.return, t, n);
	}
	function Pc(e, t, n, r, i, a) {
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
	function Fc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = ho.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, pe(ho, o), dc(e, t, r, n), r = N ? Oi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Nc(e, n, t);
			else if (e.tag === 19) Nc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && go(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Pc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && go(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Pc(t, !0, n, null, a, r);
				break;
			case "together":
				Pc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Ic(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), iu |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (ia(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = gi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = gi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Lc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && aa(e)));
	}
	function Rc(e, t, n) {
		switch (t.tag) {
			case 3:
				ve(t, t.stateNode.containerInfo), ea(t, pa, e.memoizedState.cache), Ji();
				break;
			case 27:
			case 5:
				be(t);
				break;
			case 4:
				ve(t, t.stateNode.containerInfo);
				break;
			case 10:
				ea(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, uo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (lo(t), e = Ic(e, t, n), e === null ? null : e.sibling) : kc(e, t, n) : (lo(t), t.flags |= 128, null);
				lo(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (ia(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Fc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), pe(ho, ho.current), r) break;
				return null;
			case 22: return t.lanes = 0, hc(e, t, n, t.pendingProps);
			case 24: ea(t, pa, e.memoizedState.cache);
		}
		return Ic(e, t, n);
	}
	function zc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) uc = !0;
		else {
			if (!Lc(e, n) && !(t.flags & 128)) return uc = !1, Rc(e, t, n);
			uc = !!(e.flags & 131072);
		}
		else uc = !1, N && t.flags & 1048576 && Fi(t, Oi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ma(t.elementType), t.type = e, typeof e == "function") hi(e) ? (r = $s(e, r), t.tag = 1, t = wc(null, t, e, r, n)) : (t.tag = 0, t = Sc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === S) {
								t.tag = 11, t = fc(null, t, e, r, n);
								break a;
							}
							if (a === re) {
								t.tag = 14, t = pc(null, t, e, r, n);
								break a;
							}
						}
						throw t = oe(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Sc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = $s(r, t.pendingProps), wc(e, t, r, a, n);
			case 3:
				a: {
					if (ve(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ka(e, t), $a(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ea(t, pa, r), r !== o.cache && ra(t, [pa], n, !0), Qa(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = Tc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = wi(Error(i(424)), t), Xi(a), t = Tc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Bi = Sf(e.firstChild), zi = t, N = !0, Vi = null, Hi = !0, n = Ua(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ji(), r === a) {
							t = Ic(e, t, n);
							break a;
						}
						dc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return xc(e, t), e === null ? (n = Hf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : N || (n = t.type, e = t.pendingProps, r = ef(ge.current).createElement(n), r[ft] = t, r[pt] = e, Jd(r, n, e), Tt(r), t.stateNode = r) : t.memoizedState = Hf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return be(t), e === null && N && (r = t.stateNode = Ef(t.type, t.pendingProps, ge.current), zi = t, Hi = !0, a = Bi, ff(t.type) ? (Cf = a, Bi = Sf(r.firstChild)) : Bi = a), dc(e, t, t.pendingProps.children, n), xc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && N && ((a = r = Bi) && (r = gf(r, t.type, t.pendingProps, Hi), r === null ? a = !1 : (t.stateNode = r, zi = t, Bi = Sf(r.firstChild), Hi = !1, a = !0)), a || Wi(t)), be(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, rf(a, o) ? r = null : s !== null && rf(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = ko(e, t, Mo, null, null, n), up._currentValue = a), xc(e, t), dc(e, t, r, n), t.child;
			case 6: return e === null && N && ((e = n = Bi) && (n = _f(n, t.pendingProps, Hi), n === null ? e = !1 : (t.stateNode = n, zi = t, Bi = null, e = !0)), e || Wi(t)), null;
			case 13: return kc(e, t, n);
			case 4: return ve(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ha(t, null, r, n) : dc(e, t, r, n), t.child;
			case 11: return fc(e, t, t.type, t.pendingProps, n);
			case 7: return dc(e, t, t.pendingProps, n), t.child;
			case 8: return dc(e, t, t.pendingProps.children, n), t.child;
			case 12: return dc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, ea(t, t.type, r.value), dc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, oa(t), a = sa(a), r = r(a), t.flags |= 1, dc(e, t, r, n), t.child;
			case 14: return pc(e, t, t.type, t.pendingProps, n);
			case 15: return mc(e, t, t.type, t.pendingProps, n);
			case 19: return Fc(e, t, n);
			case 31: return bc(e, t, n);
			case 22: return hc(e, t, n, t.pendingProps);
			case 24: return oa(t), r = sa(pa), e === null ? (a = Ca(), a === null && (a = Yl, o = ma(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ga(t), ea(t, pa, a)) : ((e.lanes & n) !== 0 && (Ka(e, t), $a(t, null, null, n), Qa()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ea(t, pa, r), r !== a.cache && ra(t, [pa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ea(t, pa, r))), dc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Bc(e) {
		e.flags |= 4;
	}
	function Vc(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Iu()) e.flags |= 8192;
			else throw Na = ka, Da;
		} else e.flags &= -16777217;
	}
	function Hc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !np(t)) if (Iu()) e.flags |= 8192;
		else throw Na = ka, Da;
	}
	function Uc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : tt(), e.lanes |= t, cu |= t);
	}
	function Wc(e, t) {
		if (!N) switch (e.tailMode) {
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
	function Gc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Kc(e, t, n) {
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
			case 14: return Gc(t), null;
			case 1: return Gc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ta(pa), ye(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (qi(t) ? Bc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Yi())), Gc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Bc(t), o === null ? (Gc(t), Vc(t, a, null, r, n)) : (Gc(t), Hc(t, o))) : o ? o === e.memoizedState ? (Gc(t), t.flags &= -16777217) : (Bc(t), Gc(t), Hc(t, o)) : (e = e.memoizedProps, e !== r && Bc(t), Gc(t), Vc(t, a, e, r, n)), null;
			case 27:
				if (A(t), n = ge.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Bc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Gc(t), null;
					}
					e = me.current, qi(t) ? Gi(t, e) : (e = Ef(a, r, n), t.stateNode = e, Bc(t));
				}
				return Gc(t), null;
			case 5:
				if (A(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Bc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Gc(t), null;
					}
					if (o = me.current, qi(t)) Gi(t, o);
					else {
						var s = ef(ge.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[ft] = t, o[pt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Jd(o, a, r), a) {
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
						r && Bc(t);
					}
				}
				return Gc(t), Vc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Bc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ge.current, qi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = zi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ft] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Gd(e.nodeValue, n)), e || Wi(t, !0);
					} else e = ef(e).createTextNode(r), e[ft] = t, t.stateNode = e;
				}
				return Gc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = qi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ft] = t;
						} else Ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Gc(t), e = !1;
					} else n = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (mo(t), t) : (mo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Gc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = qi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ft] = t;
						} else Ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Gc(t), a = !1;
					} else a = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (mo(t), t) : (mo(t), null);
				}
				return mo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Uc(t, t.updateQueue), Gc(t), null);
			case 4: return ye(), e === null && Fd(t.stateNode.containerInfo), Gc(t), null;
			case 10: return ta(t.type), Gc(t), null;
			case 19:
				if (fe(ho), r = t.memoizedState, r === null) return Gc(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) if (a) Wc(r, !1);
				else {
					if (ru !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = go(e), o !== null) {
							for (t.flags |= 128, Wc(r, !1), e = o.updateQueue, t.updateQueue = e, Uc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) _i(n, e), n = n.sibling;
							return pe(ho, ho.current & 1 | 2), N && Pi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Me() > pu && (t.flags |= 128, a = !0, Wc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = go(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Uc(t, e), Wc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !N) return Gc(t), null;
					} else 2 * Me() - r.renderingStartTime > pu && n !== 536870912 && (t.flags |= 128, a = !0, Wc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Gc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Me(), e.sibling = null, n = ho.current, pe(ho, a ? n & 1 | 2 : n & 1), N && Pi(t, r.treeForkCount), e);
			case 22:
			case 23: return mo(t), oo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Gc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Gc(t), n = t.updateQueue, n !== null && Uc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && fe(Sa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ta(pa), Gc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function qc(e, t) {
		switch (Li(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return ta(pa), ye(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return A(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (mo(t), t.alternate === null) throw Error(i(340));
					Ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (mo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return fe(ho), null;
			case 4: return ye(), null;
			case 10: return ta(t.type), null;
			case 22:
			case 23: return mo(t), oo(), e !== null && fe(Sa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return ta(pa), null;
			case 25: return null;
			default: return null;
		}
	}
	function Jc(e, t) {
		switch (Li(t), t.tag) {
			case 3:
				ta(pa), ye();
				break;
			case 26:
			case 27:
			case 5:
				A(t);
				break;
			case 4:
				ye();
				break;
			case 31:
				t.memoizedState !== null && mo(t);
				break;
			case 13:
				mo(t);
				break;
			case 19:
				fe(ho);
				break;
			case 10:
				ta(t.type);
				break;
			case 22:
			case 23:
				mo(t), oo(), e !== null && fe(Sa);
				break;
			case 24: ta(pa);
		}
	}
	function Yc(e, t) {
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
			rd(t, t.return, e);
		}
	}
	function Xc(e, t, n) {
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
								rd(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			rd(t, t.return, e);
		}
	}
	function Zc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				to(t, n);
			} catch (t) {
				rd(e, e.return, t);
			}
		}
	}
	function Qc(e, t, n) {
		n.props = $s(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			rd(e, t, n);
		}
	}
	function $c(e, t) {
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
			rd(e, t, n);
		}
	}
	function el(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			rd(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			rd(e, t, n);
		}
		else n.current = null;
	}
	function tl(e) {
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
			rd(e, e.return, t);
		}
	}
	function nl(e, t, n) {
		try {
			var r = e.stateNode;
			Yd(r, e.type, n, t), r[pt] = t;
		} catch (t) {
			rd(e, e.return, t);
		}
	}
	function rl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ff(e.type) || e.tag === 4;
	}
	function il(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || rl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && ff(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function al(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = on));
		else if (r !== 4 && (r === 27 && ff(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (al(e, t, n), e = e.sibling; e !== null;) al(e, t, n), e = e.sibling;
	}
	function ol(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && ff(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (ol(e, t, n), e = e.sibling; e !== null;) ol(e, t, n), e = e.sibling;
	}
	function sl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Jd(t, r, n), t[ft] = e, t[pt] = n;
		} catch (t) {
			rd(e, e.return, t);
		}
	}
	var cl = !1, ll = !1, ul = !1, dl = typeof WeakSet == "function" ? WeakSet : Set, fl = null;
	function pl(e, t) {
		if (e = e.containerInfo, Qd = yp, e = Nr(e), Pr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
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
		for ($d = {
			focusedElem: e,
			selectionRange: n
		}, yp = !1, fl = t; fl !== null;) if (t = fl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, fl = e;
		else for (; fl !== null;) {
			switch (t = fl, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = $s(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							rd(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) hf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								hf(e);
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
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, fl = e;
				break;
			}
			fl = t.return;
		}
	}
	function ml(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				kl(e, n), r & 4 && Yc(5, n);
				break;
			case 1:
				if (kl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					rd(n, n.return, e);
				}
				else {
					var i = $s(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						rd(n, n.return, e);
					}
				}
				r & 64 && Zc(n), r & 512 && $c(n, n.return);
				break;
			case 3:
				if (kl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
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
						rd(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && sl(n);
			case 26:
			case 5:
				kl(e, n), t === null && r & 4 && tl(n), r & 512 && $c(n, n.return);
				break;
			case 12:
				kl(e, n);
				break;
			case 31:
				kl(e, n), r & 4 && bl(e, n);
				break;
			case 13:
				kl(e, n), r & 4 && xl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = sd.bind(null, n), xf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || cl, !r) {
					t = t !== null && t.memoizedState !== null || ll, i = cl;
					var a = ll;
					cl = r, (ll = t) && !a ? jl(e, n, !!(n.subtreeFlags & 8772)) : kl(e, n), cl = i, ll = a;
				}
				break;
			case 30: break;
			default: kl(e, n);
		}
	}
	function hl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, hl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && bt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var gl = null, _l = !1;
	function vl(e, t, n) {
		for (n = n.child; n !== null;) yl(e, t, n), n = n.sibling;
	}
	function yl(e, t, n) {
		if (He && typeof He.onCommitFiberUnmount == "function") try {
			He.onCommitFiberUnmount(Ve, n);
		} catch {}
		switch (n.tag) {
			case 26:
				ll || el(n, t), vl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				ll || el(n, t);
				var r = gl, i = _l;
				ff(n.type) && (gl = n.stateNode, _l = !1), vl(e, t, n), Df(n.stateNode), gl = r, _l = i;
				break;
			case 5: ll || el(n, t);
			case 6:
				if (r = gl, i = _l, gl = null, vl(e, t, n), gl = r, _l = i, gl !== null) if (_l) try {
					(gl.nodeType === 9 ? gl.body : gl.nodeName === "HTML" ? gl.ownerDocument.body : gl).removeChild(n.stateNode);
				} catch (e) {
					rd(n, t, e);
				}
				else try {
					gl.removeChild(n.stateNode);
				} catch (e) {
					rd(n, t, e);
				}
				break;
			case 18:
				gl !== null && (_l ? (e = gl, pf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Gp(e)) : pf(gl, n.stateNode));
				break;
			case 4:
				r = gl, i = _l, gl = n.stateNode.containerInfo, _l = !0, vl(e, t, n), gl = r, _l = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Xc(2, n, t), ll || Xc(4, n, t), vl(e, t, n);
				break;
			case 1:
				ll || (el(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Qc(n, t, r)), vl(e, t, n);
				break;
			case 21:
				vl(e, t, n);
				break;
			case 22:
				ll = (r = ll) || n.memoizedState !== null, vl(e, t, n), ll = r;
				break;
			default: vl(e, t, n);
		}
	}
	function bl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Gp(e);
			} catch (e) {
				rd(t, t.return, e);
			}
		}
	}
	function xl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Gp(e);
		} catch (e) {
			rd(t, t.return, e);
		}
	}
	function Sl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new dl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new dl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Cl(e, t) {
		var n = Sl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = cd.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function wl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (ff(c.type)) {
							gl = c.stateNode, _l = !1;
							break a;
						}
						break;
					case 5:
						gl = c.stateNode, _l = !1;
						break a;
					case 3:
					case 4:
						gl = c.stateNode.containerInfo, _l = !0;
						break a;
				}
				c = c.return;
			}
			if (gl === null) throw Error(i(160));
			yl(o, s, a), gl = null, _l = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) El(t, e), t = t.sibling;
	}
	var Tl = null;
	function El(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				wl(t, e), Dl(e), r & 4 && (Xc(3, e, e.return), Yc(3, e), Xc(5, e, e.return));
				break;
			case 1:
				wl(t, e), Dl(e), r & 512 && (ll || n === null || el(n, n.return)), r & 64 && cl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = Tl;
				if (wl(t, e), Dl(e), r & 512 && (ll || n === null || el(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[yt] || o[ft] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Jd(o, r, n), o[ft] = e, Tt(o), r = o;
									break a;
								case "link":
									var s = $f("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Jd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = $f("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Jd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[ft] = e, Tt(o), r = o;
						}
						e.stateNode = r;
					} else ep(a, e.type, e.stateNode);
					else e.stateNode = Jf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && nl(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? ep(a, e.type, e.stateNode) : Jf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				wl(t, e), Dl(e), r & 512 && (ll || n === null || el(n, n.return)), n !== null && r & 4 && nl(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (wl(t, e), Dl(e), r & 512 && (ll || n === null || el(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Zt(a, "");
					} catch (t) {
						rd(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, nl(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (ul = !0);
				break;
			case 6:
				if (wl(t, e), Dl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						rd(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Qf = null, a = Tl, Tl = B(t.containerInfo), wl(t, e), Tl = a, Dl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Gp(t.containerInfo);
				} catch (t) {
					rd(e, e.return, t);
				}
				ul && (ul = !1, Ol(e));
				break;
			case 4:
				r = Tl, Tl = B(e.stateNode.containerInfo), wl(t, e), Dl(e), Tl = r;
				break;
			case 12:
				wl(t, e), Dl(e);
				break;
			case 31:
				wl(t, e), Dl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Cl(e, r)));
				break;
			case 13:
				wl(t, e), Dl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (du = Me()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Cl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = cl, d = ll;
				if (cl = u || a, ll = d || l, wl(t, e), ll = d, cl = u, Dl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || cl || ll || Al(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								rd(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								rd(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? mf(m, !0) : mf(l.stateNode, !1);
							} catch (e) {
								rd(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, Cl(e, n))));
				break;
			case 19:
				wl(t, e), Dl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Cl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: wl(t, e), Dl(e);
		}
	}
	function Dl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (rl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						ol(e, il(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Zt(o, ""), n.flags &= -33), ol(e, il(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						al(e, il(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				rd(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Ol(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Ol(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function kl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) ml(e, t.alternate, t), t = t.sibling;
	}
	function Al(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Xc(4, t, t.return), Al(t);
					break;
				case 1:
					el(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Qc(t, t.return, n), Al(t);
					break;
				case 27: Df(t.stateNode);
				case 26:
				case 5:
					el(t, t.return), Al(t);
					break;
				case 22:
					t.memoizedState === null && Al(t);
					break;
				case 30:
					Al(t);
					break;
				default: Al(t);
			}
			e = e.sibling;
		}
	}
	function jl(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					jl(i, a, n), Yc(4, a);
					break;
				case 1:
					if (jl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						rd(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) eo(c[i], s);
						} catch (e) {
							rd(r, r.return, e);
						}
					}
					n && o & 64 && Zc(a), $c(a, a.return);
					break;
				case 27: sl(a);
				case 26:
				case 5:
					jl(i, a, n), n && r === null && o & 4 && tl(a), $c(a, a.return);
					break;
				case 12:
					jl(i, a, n);
					break;
				case 31:
					jl(i, a, n), n && o & 4 && bl(i, a);
					break;
				case 13:
					jl(i, a, n), n && o & 4 && xl(i, a);
					break;
				case 22:
					a.memoizedState === null && jl(i, a, n), $c(a, a.return);
					break;
				case 30: break;
				default: jl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Ml(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ha(n));
	}
	function Nl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ha(e));
	}
	function Pl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Fl(e, t, n, r), t = t.sibling;
	}
	function Fl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Pl(e, t, n, r), i & 2048 && Yc(9, t);
				break;
			case 1:
				Pl(e, t, n, r);
				break;
			case 3:
				Pl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ha(e)));
				break;
			case 12:
				if (i & 2048) {
					Pl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						rd(t, t.return, e);
					}
				} else Pl(e, t, n, r);
				break;
			case 31:
				Pl(e, t, n, r);
				break;
			case 13:
				Pl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Pl(e, t, n, r) : (a._visibility |= 2, Il(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? Pl(e, t, n, r) : Ll(e, t), i & 2048 && Ml(o, t);
				break;
			case 24:
				Pl(e, t, n, r), i & 2048 && Nl(t.alternate, t);
				break;
			default: Pl(e, t, n, r);
		}
	}
	function Il(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Il(a, o, s, c, i), Yc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Il(a, o, s, c, i)) : u._visibility & 2 ? Il(a, o, s, c, i) : Ll(a, o), i && l & 2048 && Ml(o.alternate, o);
					break;
				case 24:
					Il(a, o, s, c, i), i && l & 2048 && Nl(o.alternate, o);
					break;
				default: Il(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Ll(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Ll(n, r), i & 2048 && Ml(r.alternate, r);
					break;
				case 24:
					Ll(n, r), i & 2048 && Nl(r.alternate, r);
					break;
				default: Ll(n, r);
			}
			t = t.sibling;
		}
	}
	var Rl = 8192;
	function zl(e, t, n) {
		if (e.subtreeFlags & Rl) for (e = e.child; e !== null;) Bl(e, t, n), e = e.sibling;
	}
	function Bl(e, t, n) {
		switch (e.tag) {
			case 26:
				zl(e, t, n), e.flags & Rl && e.memoizedState !== null && rp(n, Tl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				zl(e, t, n);
				break;
			case 3:
			case 4:
				var r = Tl;
				Tl = B(e.stateNode.containerInfo), zl(e, t, n), Tl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Rl, Rl = 16777216, zl(e, t, n), Rl = r) : zl(e, t, n));
				break;
			default: zl(e, t, n);
		}
	}
	function Vl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Hl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				fl = r, Gl(r, e);
			}
			Vl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Ul(e), e = e.sibling;
	}
	function Ul(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Hl(e), e.flags & 2048 && Xc(9, e, e.return);
				break;
			case 3:
				Hl(e);
				break;
			case 12:
				Hl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Wl(e)) : Hl(e);
				break;
			default: Hl(e);
		}
	}
	function Wl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				fl = r, Gl(r, e);
			}
			Vl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Xc(8, t, t.return), Wl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Wl(t));
					break;
				default: Wl(t);
			}
			e = e.sibling;
		}
	}
	function Gl(e, t) {
		for (; fl !== null;) {
			var n = fl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Xc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ha(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, fl = r;
			else a: for (n = e; fl !== null;) {
				r = fl;
				var i = r.sibling, a = r.return;
				if (hl(r), r === n) {
					fl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, fl = i;
					break a;
				}
				fl = a;
			}
		}
	}
	var Kl = {
		getCacheForType: function(e) {
			var t = sa(pa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return sa(pa).controller.signal;
		}
	}, ql = typeof WeakMap == "function" ? WeakMap : Map, Jl = 0, Yl = null, L = null, Xl = 0, Zl = 0, Ql = null, $l = !1, eu = !1, tu = !1, nu = 0, ru = 0, iu = 0, au = 0, ou = 0, su = 0, cu = 0, R = null, lu = null, uu = !1, du = 0, fu = 0, pu = Infinity, mu = null, hu = null, gu = 0, _u = null, vu = null, yu = 0, bu = 0, xu = null, Su = null, Cu = 0, wu = null;
	function Tu() {
		return Jl & 2 && Xl !== 0 ? Xl & -Xl : O.T === null ? lt() : wd();
	}
	function Eu() {
		if (su === 0) if (!(Xl & 536870912) || N) {
			var e = Ye;
			Ye <<= 1, !(Ye & 3932160) && (Ye = 262144), su = e;
		} else su = 536870912;
		return e = so.current, e !== null && (e.flags |= 32), su;
	}
	function Du(e, t, n) {
		(e === Yl && (Zl === 2 || Zl === 9) || e.cancelPendingCommit !== null) && (Pu(e, 0), ju(e, Xl, su, !1)), rt(e, n), (!(Jl & 2) || e !== Yl) && (e === Yl && (!(Jl & 2) && (au |= n), ru === 4 && ju(e, Xl, su, !1)), gd(e));
	}
	function Ou(e, t, n) {
		if (Jl & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || $e(e, t), a = r ? Hu(e, t) : Bu(e, t, !0), o = r;
		do {
			if (a === 0) {
				eu && !r && ju(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Au(n)) {
				a = Bu(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = R;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (Pu(c, s).flags |= 256), s = Bu(c, s, !1), s !== 2) {
							if (tu && !l) {
								c.errorRecoveryDisabledLanes |= o, au |= o, a = 4;
								break a;
							}
							o = lu, lu = a, o !== null && (lu === null ? lu = o : lu.push.apply(lu, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				Pu(e, 0), ju(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						ju(r, t, su, !$l);
						break a;
					case 2:
						lu = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = du + 300 - Me(), 10 < a)) {
					if (ju(r, t, su, !$l), Qe(r, 0, !0) !== 0) break a;
					yu = t, r.timeoutHandle = sf(ku.bind(null, r, n, lu, mu, uu, t, su, au, cu, $l, o, "Throttled", -0, 0), a);
					break a;
				}
				ku(r, n, lu, mu, uu, t, su, au, cu, $l, o, null, -0, 0);
			}
			break;
		} while (1);
		gd(e);
	}
	function ku(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
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
			}, Bl(t, a, d);
			var m = (a & 62914560) === a ? du - Me() : (a & 4194048) === a ? fu - Me() : 0;
			if (m = ap(d, m), m !== null) {
				yu = a, e.cancelPendingCommit = m(Yu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), ju(e, a, o, !l);
				return;
			}
		}
		Yu(e, t, a, n, r, i, o, s, c);
	}
	function Au(e) {
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
	function ju(e, t, n, r) {
		t &= ~ou, t &= ~au, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - We(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && at(e, n, t);
	}
	function Mu() {
		return Jl & 6 ? !0 : (_d(0, !1), !1);
	}
	function Nu() {
		if (L !== null) {
			if (Zl === 0) var e = L.return;
			else e = L, $i = Qi = null, Fo(e), Ia = null, La = 0, e = L;
			for (; e !== null;) Jc(e.alternate, e), e = e.return;
			L = null;
		}
	}
	function Pu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, cf(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), yu = 0, Nu(), Yl = e, L = n = gi(e.current, null), Xl = t, Zl = 0, Ql = null, $l = !1, eu = $e(e, t), tu = !1, cu = su = ou = au = iu = ru = 0, lu = R = null, uu = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - We(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return nu = t, oi(), n;
	}
	function Fu(e, t) {
		I = null, O.H = Gs, t === Ea || t === Oa ? (t = Pa(), Zl = 3) : t === Da ? (t = Pa(), Zl = 4) : Zl = t === lc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Ql = t, L === null && (ru = 1, rc(e, wi(t, e.current)));
	}
	function Iu() {
		var e = so.current;
		return e === null ? !0 : (Xl & 4194048) === Xl ? co === null : (Xl & 62914560) === Xl || Xl & 536870912 ? e === co : !1;
	}
	function Lu() {
		var e = O.H;
		return O.H = Gs, e === null ? Gs : e;
	}
	function Ru() {
		var e = O.A;
		return O.A = Kl, e;
	}
	function zu() {
		ru = 4, $l || (Xl & 4194048) !== Xl && so.current !== null || (eu = !0), !(iu & 134217727) && !(au & 134217727) || Yl === null || ju(Yl, Xl, su, !1);
	}
	function Bu(e, t, n) {
		var r = Jl;
		Jl |= 2;
		var i = Lu(), a = Ru();
		(Yl !== e || Xl !== t) && (mu = null, Pu(e, t)), t = !1;
		var o = ru;
		a: do
			try {
				if (Zl !== 0 && L !== null) {
					var s = L, c = Ql;
					switch (Zl) {
						case 8:
							Nu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							so.current === null && (t = !0);
							var l = Zl;
							if (Zl = 0, Ql = null, Ku(e, s, c, l), n && eu) {
								o = 0;
								break a;
							}
							break;
						default: l = Zl, Zl = 0, Ql = null, Ku(e, s, c, l);
					}
				}
				Vu(), o = ru;
				break;
			} catch (t) {
				Fu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, $i = Qi = null, Jl = r, O.H = i, O.A = a, L === null && (Yl = null, Xl = 0, oi()), o;
	}
	function Vu() {
		for (; L !== null;) Wu(L);
	}
	function Hu(e, t) {
		var n = Jl;
		Jl |= 2;
		var r = Lu(), a = Ru();
		Yl !== e || Xl !== t ? (mu = null, pu = Me() + 500, Pu(e, t)) : eu = $e(e, t);
		a: do
			try {
				if (Zl !== 0 && L !== null) {
					t = L;
					var o = Ql;
					b: switch (Zl) {
						case 1:
							Zl = 0, Ql = null, Ku(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Aa(o)) {
								Zl = 0, Ql = null, Gu(t);
								break;
							}
							t = function() {
								Zl !== 2 && Zl !== 9 || Yl !== e || (Zl = 7), gd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Zl = 7;
							break a;
						case 4:
							Zl = 5;
							break a;
						case 7:
							Aa(o) ? (Zl = 0, Ql = null, Gu(t)) : (Zl = 0, Ql = null, Ku(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (L.tag) {
								case 26: s = L.memoizedState;
								case 5:
								case 27:
									var c = L;
									if (s ? np(s) : c.stateNode.complete) {
										Zl = 0, Ql = null;
										var l = c.sibling;
										if (l !== null) L = l;
										else {
											var u = c.return;
											u === null ? L = null : (L = u, qu(u));
										}
										break b;
									}
							}
							Zl = 0, Ql = null, Ku(e, t, o, 5);
							break;
						case 6:
							Zl = 0, Ql = null, Ku(e, t, o, 6);
							break;
						case 8:
							Nu(), ru = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Uu();
				break;
			} catch (t) {
				Fu(e, t);
			}
		while (1);
		return $i = Qi = null, O.H = r, O.A = a, Jl = n, L === null ? (Yl = null, Xl = 0, oi(), ru) : 0;
	}
	function Uu() {
		for (; L !== null && !Ae();) Wu(L);
	}
	function Wu(e) {
		var t = zc(e.alternate, e, nu);
		e.memoizedProps = e.pendingProps, t === null ? qu(e) : L = t;
	}
	function Gu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Cc(n, t, t.pendingProps, t.type, void 0, Xl);
				break;
			case 11:
				t = Cc(n, t, t.pendingProps, t.type.render, t.ref, Xl);
				break;
			case 5: Fo(t);
			default: Jc(n, t), t = L = _i(t, nu), t = zc(n, t, nu);
		}
		e.memoizedProps = e.pendingProps, t === null ? qu(e) : L = t;
	}
	function Ku(e, t, n, r) {
		$i = Qi = null, Fo(t), Ia = null, La = 0;
		var i = t.return;
		try {
			if (cc(e, i, t, n, Xl)) {
				ru = 1, rc(e, wi(n, e.current)), L = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw L = i, t;
			ru = 1, rc(e, wi(n, e.current)), L = null;
			return;
		}
		t.flags & 32768 ? (N || r === 1 ? e = !0 : eu || Xl & 536870912 ? e = !1 : ($l = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = so.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Ju(t, e)) : qu(t);
	}
	function qu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Ju(t, $l);
				return;
			}
			e = t.return;
			var n = Kc(t.alternate, t, nu);
			if (n !== null) {
				L = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				L = t;
				return;
			}
			L = t = e;
		} while (t !== null);
		ru === 0 && (ru = 5);
	}
	function Ju(e, t) {
		do {
			var n = qc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, L = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				L = e;
				return;
			}
			L = e = n;
		} while (e !== null);
		ru = 6, L = null;
	}
	function Yu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			ed();
		while (gu !== 0);
		if (Jl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= ai, it(e, n, o, s, c, l), e === Yl && (L = Yl = null, Xl = 0), vu = t, _u = e, yu = n, bu = o, xu = a, Su = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, ld(Ie, function() {
				return td(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = O.T, O.T = null, a = k.p, k.p = 2, s = Jl, Jl |= 4;
				try {
					pl(e, t, n);
				} finally {
					Jl = s, k.p = a, O.T = r;
				}
			}
			gu = 1, Xu(), Zu(), Qu();
		}
	}
	function Xu() {
		if (gu === 1) {
			gu = 0;
			var e = _u, t = vu, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = O.T, O.T = null;
				var r = k.p;
				k.p = 2;
				var i = Jl;
				Jl |= 4;
				try {
					El(t, e);
					var a = $d, o = Nr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
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
					yp = !!Qd, $d = Qd = null;
				} finally {
					Jl = i, k.p = r, O.T = n;
				}
			}
			e.current = t, gu = 2;
		}
	}
	function Zu() {
		if (gu === 2) {
			gu = 0;
			var e = _u, t = vu, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = O.T, O.T = null;
				var r = k.p;
				k.p = 2;
				var i = Jl;
				Jl |= 4;
				try {
					ml(e, t.alternate, t);
				} finally {
					Jl = i, k.p = r, O.T = n;
				}
			}
			gu = 3;
		}
	}
	function Qu() {
		if (gu === 4 || gu === 3) {
			gu = 0, je();
			var e = _u, t = vu, n = yu, r = Su;
			t.subtreeFlags & 10256 || t.flags & 10256 ? gu = 5 : (gu = 0, vu = _u = null, $u(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (hu = null), ct(n), t = t.stateNode, He && typeof He.onCommitFiberRoot == "function") try {
				He.onCommitFiberRoot(Ve, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = O.T, i = k.p, k.p = 2, O.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					O.T = t, k.p = i;
				}
			}
			yu & 3 && ed(), gd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === wu ? Cu++ : (Cu = 0, wu = e) : Cu = 0, _d(0, !1);
		}
	}
	function $u(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ha(t)));
	}
	function ed() {
		return Xu(), Zu(), Qu(), td();
	}
	function td() {
		if (gu !== 5) return !1;
		var e = _u, t = bu;
		bu = 0;
		var n = ct(yu), r = O.T, a = k.p;
		try {
			k.p = 32 > n ? 32 : n, O.T = null, n = xu, xu = null;
			var o = _u, s = yu;
			if (gu = 0, vu = _u = null, yu = 0, Jl & 6) throw Error(i(331));
			var c = Jl;
			if (Jl |= 4, Ul(o.current), Fl(o, o.current, s, n), Jl = c, _d(0, !1), He && typeof He.onPostCommitFiberRoot == "function") try {
				He.onPostCommitFiberRoot(Ve, o);
			} catch {}
			return !0;
		} finally {
			k.p = a, O.T = r, $u(e, t);
		}
	}
	function nd(e, t, n) {
		t = wi(n, t), t = ac(e.stateNode, t, 2), e = Ja(e, t, 2), e !== null && (rt(e, 2), gd(e));
	}
	function rd(e, t, n) {
		if (e.tag === 3) nd(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				nd(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (hu === null || !hu.has(r))) {
					e = wi(n, e), n = oc(2), r = Ja(t, n, 2), r !== null && (sc(n, r, t, e), rt(r, 2), gd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function id(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new ql();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (tu = !0, i.add(n), e = ad.bind(null, e, t, n), t.then(e, e));
	}
	function ad(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Yl === e && (Xl & n) === n && (ru === 4 || ru === 3 && (Xl & 62914560) === Xl && 300 > Me() - du ? !(Jl & 2) && Pu(e, 0) : ou |= n, cu === Xl && (cu = 0)), gd(e);
	}
	function od(e, t) {
		t === 0 && (t = tt()), e = li(e, t), e !== null && (rt(e, t), gd(e));
	}
	function sd(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), od(e, n);
	}
	function cd(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), od(e, n);
	}
	function ld(e, t) {
		return Oe(e, t);
	}
	var ud = null, dd = null, fd = !1, pd = !1, md = !1, hd = 0;
	function gd(e) {
		e !== dd && e.next === null && (dd === null ? ud = dd = e : dd = dd.next = e), pd = !0, fd || (fd = !0, Cd());
	}
	function _d(e, t) {
		if (!md && pd) {
			md = !0;
			do
				for (var n = !1, r = ud; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - We(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, Sd(r, a));
					} else a = Xl, a = Qe(r, r === Yl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || $e(r, a) || (n = !0, Sd(r, a));
					r = r.next;
				}
			while (n);
			md = !1;
		}
	}
	function vd() {
		yd();
	}
	function yd() {
		pd = fd = !1;
		var e = 0;
		hd !== 0 && of() && (e = hd);
		for (var t = Me(), n = null, r = ud; r !== null;) {
			var i = r.next, a = bd(r, t);
			a === 0 ? (r.next = null, n === null ? ud = i : n.next = i, i === null && (dd = n)) : (n = r, (e !== 0 || a & 3) && (pd = !0)), r = i;
		}
		gu !== 0 && gu !== 5 || _d(e, !1), hd !== 0 && (hd = 0);
	}
	function bd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - We(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = et(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Yl, n = Xl, n = Qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Zl === 2 || Zl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && ke(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || $e(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && ke(r), ct(n)) {
				case 2:
				case 8:
					n = Fe;
					break;
				case 32:
					n = Ie;
					break;
				case 268435456:
					n = Re;
					break;
				default: n = Ie;
			}
			return r = xd.bind(null, e), n = Oe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && ke(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function xd(e, t) {
		if (gu !== 0 && gu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (ed() && e.callbackNode !== n) return null;
		var r = Xl;
		return r = Qe(e, e === Yl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Ou(e, r, t), bd(e, Me()), e.callbackNode != null && e.callbackNode === n ? xd.bind(null, e) : null);
	}
	function Sd(e, t) {
		if (ed()) return null;
		Ou(e, t, !0);
	}
	function Cd() {
		uf(function() {
			Jl & 6 ? Oe(Pe, vd) : yd();
		});
	}
	function wd() {
		if (hd === 0) {
			var e = F;
			e === 0 && (e = Je, Je <<= 1, !(Je & 261888) && (Je = 256)), hd = e;
		}
		return hd;
	}
	function Td(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : an("" + e);
	}
	function Ed(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function Dd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Td((i[pt] || null).action), o = r.submitter;
			o && (t = (t = o[pt] || null) ? Td(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Dn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (hd !== 0) {
								var e = o ? Ed(i, o) : new FormData(i);
								js(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? Ed(i, o) : new FormData(i), js(n, {
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
	for (var Od = 0; Od < ei.length; Od++) {
		var kd = ei[Od];
		ti(kd.toLowerCase(), "on" + (kd[0].toUpperCase() + kd.slice(1)));
	}
	ti(Kr, "onAnimationEnd"), ti(qr, "onAnimationIteration"), ti(Jr, "onAnimationStart"), ti("dblclick", "onDoubleClick"), ti("focusin", "onFocus"), ti("focusout", "onBlur"), ti(Yr, "onTransitionRun"), ti(Xr, "onTransitionStart"), ti(Zr, "onTransitionCancel"), ti(Qr, "onTransitionEnd"), kt("onMouseEnter", ["mouseout", "mouseover"]), kt("onMouseLeave", ["mouseout", "mouseover"]), kt("onPointerEnter", ["pointerout", "pointerover"]), kt("onPointerLeave", ["pointerout", "pointerover"]), Ot("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ot("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ot("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Ot("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ot("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ot("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Ad = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), jd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ad));
	function Md(e, t) {
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
	function z(e, t) {
		var n = t[ht];
		n === void 0 && (n = t[ht] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Id(t, e, 2, !1), n.add(r));
	}
	function Nd(e, t, n) {
		var r = 0;
		t && (r |= 4), Id(n, e, r, t);
	}
	var Pd = "_reactListening" + Math.random().toString(36).slice(2);
	function Fd(e) {
		if (!e[Pd]) {
			e[Pd] = !0, Et.forEach(function(t) {
				t !== "selectionchange" && (jd.has(t) || Nd(t, !1, e), Nd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Pd] || (t[Pd] = !0, Nd("selectionchange", !1, t));
		}
	}
	function Id(e, t, n, r) {
		switch (Ep(t)) {
			case 2:
				var i = bp;
				break;
			case 8:
				i = xp;
				break;
			default: i = Sp;
		}
		n = i.bind(null, t, n, e), i = void 0, !gn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Ld(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = xt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		pn(function() {
			var r = a, i = cn(n), s = [];
			a: {
				var c = $r.get(e);
				if (c !== void 0) {
					var l = Dn, u = e;
					switch (e) {
						case "keypress": if (Sn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Gn;
							break;
						case "focusin":
							u = "focus", l = In;
							break;
						case "focusout":
							u = "blur", l = In;
							break;
						case "beforeblur":
						case "afterblur":
							l = In;
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
							l = Pn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Fn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = qn;
							break;
						case Kr:
						case qr:
						case Jr:
							l = Ln;
							break;
						case Qr:
							l = Jn;
							break;
						case "scroll":
						case "scrollend":
							l = kn;
							break;
						case "wheel":
							l = Yn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Rn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Kn;
							break;
						case "toggle":
						case "beforetoggle": l = Xn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = mn(m, p), g != null && d.push(Rd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== sn && (u = n.relatedTarget || n.fromElement) && (xt(u) || u[mt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? xt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Pn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Kn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : Ct(l), h = u == null ? c : Ct(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, xt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Bd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
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
						l !== null && Vd(s, c, l, d, !1), u !== null && f !== null && Vd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? Ct(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = gr;
					else if (ur(c)) if (_r) v = Er;
					else {
						v = wr;
						var y = Cr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && tn(r.elementType) && (v = gr) : v = Tr;
					if (v &&= v(e, r)) {
						dr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && qt(c, "number", c.value);
				}
				switch (y = r ? Ct(r) : window, e) {
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
						zr = !1, Br(s, n, i);
						break;
					case "selectionchange": if (Fr) break;
					case "keydown":
					case "keyup": Br(s, n, i);
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
				x && (tr && n.locale !== "ko" && (or || x !== "onCompositionStart" ? x === "onCompositionEnd" && or && (b = xn()) : (vn = i, yn = "value" in vn ? vn.value : vn.textContent, or = !0)), y = zd(r, x), 0 < y.length && (x = new zn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = ar(n), b !== null && (x.data = b)))), (b = er ? sr(e, n) : cr(e, n)) && (x = zd(r, "onBeforeInput"), 0 < x.length && (y = new zn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), Dd(s, e, r, n, i);
			}
			Md(s, t);
		});
	}
	function Rd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function zd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = mn(e, n), i != null && r.unshift(Rd(e, i, a)), i = mn(e, t), i != null && r.push(Rd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Bd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Vd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = mn(n, a), l != null && o.unshift(Rd(n, l, c))) : i || (l = mn(n, a), l != null && o.push(Rd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Hd = /\r\n?/g, Ud = /\u0000|\uFFFD/g;
	function Wd(e) {
		return (typeof e == "string" ? e : "" + e).replace(Hd, "\n").replace(Ud, "");
	}
	function Gd(e, t) {
		return t = Wd(t), Wd(e) === t;
	}
	function Kd(e, t, n, r, a, o) {
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
				en(e, r, o);
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
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && Kd(e, t, "name", a.name, a, null), Kd(e, t, "formEncType", a.formEncType, a, null), Kd(e, t, "formMethod", a.formMethod, a, null), Kd(e, t, "formTarget", a.formTarget, a, null)) : (Kd(e, t, "encType", a.encType, a, null), Kd(e, t, "method", a.method, a, null), Kd(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = an("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = on);
				break;
			case "onScroll":
				r != null && z("scroll", e);
				break;
			case "onScrollEnd":
				r != null && z("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
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
				z("beforetoggle", e), z("toggle", e), Pt(e, "popover", r);
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
	function qd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				en(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Zt(e, r) : (typeof r == "number" || typeof r == "bigint") && Zt(e, "" + r);
				break;
			case "onScroll":
				r != null && z("scroll", e);
				break;
			case "onScrollEnd":
				r != null && z("scrollend", e);
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
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[pt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Pt(e, n, r);
			}
		}
	}
	function Jd(e, t, n) {
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
				z("error", e), z("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Kd(e, t, o, s, n, null);
					}
				}
				a && Kd(e, t, "srcSet", n.srcSet, n, null), r && Kd(e, t, "src", n.src, n, null);
				return;
			case "input":
				z("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Kd(e, t, r, d, n, null);
					}
				}
				Kt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in z("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Kd(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Jt(e, !!r, n, !0) : Jt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in z("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Kd(e, t, s, c, n, null);
				}
				Xt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Kd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				z("beforetoggle", e), z("toggle", e), z("cancel", e), z("close", e);
				break;
			case "iframe":
			case "object":
				z("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Ad.length; r++) z(Ad[r], e);
				break;
			case "image":
				z("error", e), z("load", e);
				break;
			case "details":
				z("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": z("error", e), z("load", e);
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
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Kd(e, t, u, r, n, null);
				}
				return;
			default: if (tn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && qd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Kd(e, t, c, r, n, null));
	}
	function Yd(e, t, n, r) {
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
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Kd(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Kd(e, t, p, m, r, f);
					}
				}
				Gt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Kd(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Kd(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Jt(e, !!n, n ? [] : "", !1) : Jt(e, !!n, t, !0)) : Jt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Kd(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Kd(e, t, s, a, r, o);
				}
				Yt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Kd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Kd(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Kd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Kd(e, t, u, p, r, m);
				}
				return;
			default: if (tn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && qd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || qd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Kd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Kd(e, t, f, p, r, m);
	}
	function Xd(e) {
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
	function Zd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Xd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Xd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Qd = null, $d = null;
	function ef(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function tf(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function nf(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function rf(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var af = null;
	function of() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== af && (af = e, !0) : (af = null, !1);
	}
	var sf = typeof setTimeout == "function" ? setTimeout : void 0, cf = typeof clearTimeout == "function" ? clearTimeout : void 0, lf = typeof Promise == "function" ? Promise : void 0, uf = typeof queueMicrotask == "function" ? queueMicrotask : lf === void 0 ? sf : function(e) {
		return lf.resolve(null).then(e).catch(df);
	};
	function df(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function ff(e) {
		return e === "head";
	}
	function pf(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Gp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") Df(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, Df(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[yt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && Df(e.ownerDocument.body);
			n = i;
		} while (n);
		Gp(t);
	}
	function mf(e, t) {
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
	function hf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					hf(n), bt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function gf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[yt]) switch (t) {
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
			if (e = Sf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function _f(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Sf(e.nextSibling), e === null)) return null;
		return e;
	}
	function vf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Sf(e.nextSibling), e === null)) return null;
		return e;
	}
	function yf(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function bf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function xf(e, t) {
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
	function Sf(e) {
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
	var Cf = null;
	function wf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return Sf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function Tf(e) {
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
	function Ef(e, t, n) {
		switch (t = ef(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function Df(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		bt(e);
	}
	var Of = /* @__PURE__ */ new Map(), kf = /* @__PURE__ */ new Set();
	function B(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var Af = k.d;
	k.d = {
		f: jf,
		r: Mf,
		D: Ff,
		C: If,
		L: Lf,
		m: Rf,
		X: Bf,
		S: zf,
		M: Vf
	};
	function jf() {
		var e = Af.f(), t = Mu();
		return e || t;
	}
	function Mf(e) {
		var t = St(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ns(t) : Af.r(e);
	}
	var Nf = typeof document > "u" ? null : document;
	function Pf(e, t, n) {
		var r = Nf;
		if (r && typeof t == "string" && t) {
			var i = Wt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), kf.has(i) || (kf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Jd(t, "link", e), Tt(t), r.head.appendChild(t)));
		}
	}
	function Ff(e) {
		Af.D(e), Pf("dns-prefetch", e, null);
	}
	function If(e, t) {
		Af.C(e, t), Pf("preconnect", e, t);
	}
	function Lf(e, t, n) {
		Af.L(e, t, n);
		var r = Nf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Wt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Wt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Wt(n.imageSizes) + "\"]")) : i += "[href=\"" + Wt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Uf(e);
					break;
				case "script": a = qf(e);
			}
			Of.has(a) || (e = m({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Of.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Wf(a)) || t === "script" && r.querySelector(V(a)) || (t = r.createElement("link"), Jd(t, "link", e), Tt(t), r.head.appendChild(t)));
		}
	}
	function Rf(e, t) {
		Af.m(e, t);
		var n = Nf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Wt(r) + "\"][href=\"" + Wt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = qf(e);
			}
			if (!Of.has(a) && (e = m({
				rel: "modulepreload",
				href: e
			}, t), Of.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(V(a))) return;
				}
				r = n.createElement("link"), Jd(r, "link", e), Tt(r), n.head.appendChild(r);
			}
		}
	}
	function zf(e, t, n) {
		Af.S(e, t, n);
		var r = Nf;
		if (r && e) {
			var i = wt(r).hoistableStyles, a = Uf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Wf(a))) s.loading = 5;
				else {
					e = m({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Of.get(a)) && Xf(e, n);
					var c = o = r.createElement("link");
					Tt(c), Jd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Yf(o, t, r);
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
	function Bf(e, t) {
		Af.X(e, t);
		var n = Nf;
		if (n && e) {
			var r = wt(n).hoistableScripts, i = qf(e), a = r.get(i);
			a || (a = n.querySelector(V(i)), a || (e = m({
				src: e,
				async: !0
			}, t), (t = Of.get(i)) && Zf(e, t), a = n.createElement("script"), Tt(a), Jd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Vf(e, t) {
		Af.M(e, t);
		var n = Nf;
		if (n && e) {
			var r = wt(n).hoistableScripts, i = qf(e), a = r.get(i);
			a || (a = n.querySelector(V(i)), a || (e = m({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Of.get(i)) && Zf(e, t), a = n.createElement("script"), Tt(a), Jd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Hf(e, t, n, r) {
		var a = (a = ge.current) ? B(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Uf(n.href), n = wt(a).hoistableStyles, r = n.get(t), r || (r = {
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
					e = Uf(n.href);
					var o = wt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Wf(e))) && !o._p && (s.instance = o, s.state.loading = 5), Of.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Of.set(e, n), o || Kf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = qf(n), n = wt(a).hoistableScripts, r = n.get(t), r || (r = {
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
			default: throw Error(i(444, e));
		}
	}
	function Uf(e) {
		return "href=\"" + Wt(e) + "\"";
	}
	function Wf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Gf(e) {
		return m({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Kf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Jd(t, "link", n), Tt(t), e.head.appendChild(t));
	}
	function qf(e) {
		return "[src=\"" + Wt(e) + "\"]";
	}
	function V(e) {
		return "script[async]" + e;
	}
	function Jf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Wt(n.href) + "\"]");
				if (r) return t.instance = r, Tt(r), r;
				var a = m({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Tt(r), Jd(r, "style", a), Yf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Uf(n.href);
				var o = e.querySelector(Wf(a));
				if (o) return t.state.loading |= 4, t.instance = o, Tt(o), o;
				r = Gf(n), (a = Of.get(a)) && Xf(r, a), o = (e.ownerDocument || e).createElement("link"), Tt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Jd(o, "link", r), t.state.loading |= 4, Yf(o, n.precedence, e), t.instance = o;
			case "script": return o = qf(n.src), (a = e.querySelector(V(o))) ? (t.instance = a, Tt(a), a) : (r = n, (a = Of.get(o)) && (r = m({}, n), Zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Tt(a), Jd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Yf(r, n.precedence, e));
		return t.instance;
	}
	function Yf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Xf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Qf = null;
	function $f(e, t, n) {
		if (Qf === null) {
			var r = /* @__PURE__ */ new Map(), i = Qf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Qf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[yt] || a[ft] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function ep(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function tp(e, t, n) {
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
	function np(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function rp(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Uf(r.href), a = t.querySelector(Wf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = op.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Tt(a);
					return;
				}
				a = t.ownerDocument || t, r = Gf(r), (i = Of.get(i)) && Xf(r, i), a = a.createElement("link"), Tt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Jd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = op.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var ip = 0;
	function ap(e, t) {
		return e.stylesheets && e.count === 0 && cp(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && cp(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && ip === 0 && (ip = 62500 * Zd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && cp(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > ip ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function op() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) cp(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var sp = null;
	function cp(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, sp = /* @__PURE__ */ new Map(), t.forEach(lp, e), sp = null, op.call(e));
	}
	function lp(e, t) {
		if (!(t.state.loading & 4)) {
			var n = sp.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), sp.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = op.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var up = {
		$$typeof: te,
		Provider: null,
		Consumer: null,
		_currentValue: ce,
		_currentValue2: ce,
		_threadCount: 0
	};
	function dp(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = nt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = nt(0), this.hiddenUpdates = nt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function fp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new dp(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = mi(3, null, null, t), e.current = a, a.stateNode = e, t = ma(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ga(a), e;
	}
	function pp(e) {
		return e ? (e = fi, e) : fi;
	}
	function mp(e, t, n, r, i, a) {
		i = pp(i), r.context === null ? r.context = i : r.pendingContext = i, r = qa(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ja(e, r, t), n !== null && (Du(n, e, t), Ya(n, e, t));
	}
	function hp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function gp(e, t) {
		hp(e, t), (e = e.alternate) && hp(e, t);
	}
	function _p(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = li(e, 67108864);
			t !== null && Du(t, e, 67108864), gp(e, 67108864);
		}
	}
	function vp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Tu();
			t = M(t);
			var n = li(e, t);
			n !== null && Du(n, e, t), gp(e, t);
		}
	}
	var yp = !0;
	function bp(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = k.p;
		try {
			k.p = 2, Sp(e, t, n, r);
		} finally {
			k.p = a, O.T = i;
		}
	}
	function xp(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = k.p;
		try {
			k.p = 8, Sp(e, t, n, r);
		} finally {
			k.p = a, O.T = i;
		}
	}
	function Sp(e, t, n, r) {
		if (yp) {
			var i = Cp(r);
			if (i === null) Ld(e, t, r, wp, n), Fp(e, r);
			else if (Lp(i, e, t, n, r)) r.stopPropagation();
			else if (Fp(e, r), t & 4 && -1 < Pp.indexOf(e)) {
				for (; i !== null;) {
					var a = St(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ze(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - We(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									gd(a), !(Jl & 6) && (pu = Me() + 500, _d(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = li(a, 2), s !== null && Du(s, a, 2), Mu(), gp(a, 2);
					}
					if (a = Cp(r), a === null && Ld(e, t, r, wp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Ld(e, t, r, null, n);
		}
	}
	function Cp(e) {
		return e = cn(e), Tp(e);
	}
	var wp = null;
	function Tp(e) {
		if (wp = null, e = xt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return wp = e, null;
	}
	function Ep(e) {
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
			case "message": switch (Ne()) {
				case Pe: return 2;
				case Fe: return 8;
				case Ie:
				case Le: return 32;
				case Re: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Dp = !1, Op = null, kp = null, Ap = null, jp = /* @__PURE__ */ new Map(), Mp = /* @__PURE__ */ new Map(), Np = [], Pp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Fp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Op = null;
				break;
			case "dragenter":
			case "dragleave":
				kp = null;
				break;
			case "mouseover":
			case "mouseout":
				Ap = null;
				break;
			case "pointerover":
			case "pointerout":
				jp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Mp.delete(t.pointerId);
		}
	}
	function Ip(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = St(t), t !== null && _p(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Lp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Op = Ip(Op, e, t, n, r, i), !0;
			case "dragenter": return kp = Ip(kp, e, t, n, r, i), !0;
			case "mouseover": return Ap = Ip(Ap, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return jp.set(a, Ip(jp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Mp.set(a, Ip(Mp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Rp(e) {
		var t = xt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ut(e.priority, function() {
							vp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ut(e.priority, function() {
							vp(n);
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
	function zp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = Cp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				sn = r, n.target.dispatchEvent(r), sn = null;
			} else return t = St(n), t !== null && _p(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Bp(e, t, n) {
		zp(e) && n.delete(t);
	}
	function Vp() {
		Dp = !1, Op !== null && zp(Op) && (Op = null), kp !== null && zp(kp) && (kp = null), Ap !== null && zp(Ap) && (Ap = null), jp.forEach(Bp), Mp.forEach(Bp);
	}
	function Hp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Dp || (Dp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Vp)));
	}
	var Up = null;
	function Wp(e) {
		Up !== e && (Up = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Up === e && (Up = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Tp(r || n) === null) continue;
					break;
				}
				var a = St(n);
				a !== null && (e.splice(t, 3), t -= 3, js(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Gp(e) {
		function t(t) {
			return Hp(t, e);
		}
		Op !== null && Hp(Op, e), kp !== null && Hp(kp, e), Ap !== null && Hp(Ap, e), jp.forEach(t), Mp.forEach(t);
		for (var n = 0; n < Np.length; n++) {
			var r = Np[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Np.length && (n = Np[0], n.blockedOn === null);) Rp(n), n.blockedOn === null && Np.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[pt] || null;
			if (typeof a == "function") o || Wp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[pt] || null) s = o.formAction;
					else if (Tp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Wp(n);
			}
		}
	}
	function Kp() {
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
	function qp(e) {
		this._internalRoot = e;
	}
	Jp.prototype.render = qp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		mp(n, Tu(), e, t, null, null);
	}, Jp.prototype.unmount = qp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			mp(e.current, 2, null, e, null, null), Mu(), t[mt] = null;
		}
	};
	function Jp(e) {
		this._internalRoot = e;
	}
	Jp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = lt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Np.length && t !== 0 && t < Np[n].priority; n++);
			Np.splice(n, 0, e), n === 0 && Rp(e);
		}
	};
	var Yp = n.version;
	if (Yp !== "19.2.8") throw Error(i(527, Yp, "19.2.8"));
	k.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Xp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: O,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Zp.isDisabled && Zp.supportsFiber) try {
			Ve = Zp.inject(Xp), He = Zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = ec, s = tc, c = nc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = fp(e, 1, !1, null, null, n, r, null, o, s, c, Kp), e[mt] = t.current, Fd(e), new qp(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!a(e)) throw Error(i(299));
		var r = !1, o = "", s = ec, c = tc, l = nc, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = fp(e, 1, !0, t, n ?? null, r, o, u, s, c, l, Kp), t.context = pp(null), n = t.current, r = Tu(), r = M(r), o = qa(r), o.callback = null, Ja(n, o, r), n = r, t.current.lanes = n, rt(t, n), gd(t), e[mt] = t.current, Fd(e), new Jp(t);
	}, e.version = "19.2.8";
})), _ = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			for (e = e.memoizedState; e !== null && 0 < t;) e = e.next, t--;
			return e;
		}
		function n(e, t, r, i) {
			if (r >= t.length) return i;
			var a = t[r], o = qf(e) ? e.slice() : B({}, e);
			return o[a] = n(e[a], t, r + 1, i), o;
		}
		function r(e, t, n) {
			if (t.length !== n.length) console.warn("copyWithRename() expects paths of the same length");
			else {
				for (var r = 0; r < n.length - 1; r++) if (t[r] !== n[r]) {
					console.warn("copyWithRename() expects paths to be the same except for the deepest key");
					return;
				}
				return i(e, t, n, 0);
			}
		}
		function i(e, t, n, r) {
			var a = t[r], o = qf(e) ? e.slice() : B({}, e);
			return r + 1 === t.length ? (o[n[r]] = o[a], qf(o) ? o.splice(a, 1) : delete o[a]) : o[a] = i(e[a], t, n, r + 1), o;
		}
		function a(e, t, n) {
			var r = t[n], i = qf(e) ? e.slice() : B({}, e);
			return n + 1 === t.length ? (qf(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = a(e[r], t, n + 1), i);
		}
		function o() {
			return !1;
		}
		function s() {
			return null;
		}
		function c() {
			console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
		}
		function u() {
			console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
		}
		function d() {}
		function p() {}
		function m(e) {
			var t = [];
			return e.forEach(function(e) {
				t.push(e);
			}), t.sort().join(", ");
		}
		function g(e, t, n, r) {
			return new yr(e, t, n, r);
		}
		function _(e, t) {
			e.context === Pg && (ef(e.current, 2, t, e, null, null), sl());
		}
		function v(e, t) {
			if (Fg !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Nl(), vr(e.current, t, n), sl();
			}
		}
		function y(e) {
			Fg = e;
		}
		function b(e) {
			return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
		}
		function x(e) {
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
		function ee(e) {
			if (e.tag === 13) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function te(e) {
			if (e.tag === 31) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function S(e) {
			if (x(e) !== e) throw Error("Unable to find node on an unmounted component.");
		}
		function C(e) {
			var t = e.alternate;
			if (!t) {
				if (t = x(e), t === null) throw Error("Unable to find node on an unmounted component.");
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
						if (a === n) return S(i), e;
						if (a === r) return S(i), t;
						a = a.sibling;
					}
					throw Error("Unable to find node on an unmounted component.");
				}
				if (n.return !== r.return) n = i, r = a;
				else {
					for (var o = !1, s = i.child; s;) {
						if (s === n) {
							o = !0, n = i, r = a;
							break;
						}
						if (s === r) {
							o = !0, r = i, n = a;
							break;
						}
						s = s.sibling;
					}
					if (!o) {
						for (s = a.child; s;) {
							if (s === n) {
								o = !0, n = a, r = i;
								break;
							}
							if (s === r) {
								o = !0, r = a, n = i;
								break;
							}
							s = s.sibling;
						}
						if (!o) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
					}
				}
				if (n.alternate !== r) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
			}
			if (n.tag !== 3) throw Error("Unable to find node on an unmounted component.");
			return n.stateNode.current === n ? e : t;
		}
		function ne(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = ne(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function re(e) {
			return typeof e != "object" || !e ? null : (e = Gf && e[Gf] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function w(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Kf ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case Nf: return "Fragment";
				case Ff: return "Profiler";
				case Pf: return "StrictMode";
				case zf: return "Suspense";
				case Bf: return "SuspenseList";
				case Uf: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case Mf: return "Portal";
				case Lf: return e.displayName || "Context";
				case If: return (e._context.displayName || "Context") + ".Consumer";
				case Rf:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case Vf: return t = e.displayName || null, t === null ? w(e.type) || "Memo" : t;
				case Hf:
					t = e._payload, e = e._init;
					try {
						return w(e(t));
					} catch {}
			}
			return null;
		}
		function T(e) {
			return typeof e.tag == "number" ? E(e) : typeof e.name == "string" ? e.name : null;
		}
		function E(e) {
			var t = e.type;
			switch (e.tag) {
				case 31: return "Activity";
				case 24: return "Cache";
				case 9: return (t._context.displayName || "Context") + ".Consumer";
				case 10: return t.displayName || "Context";
				case 18: return "DehydratedFragment";
				case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
				case 7: return "Fragment";
				case 26:
				case 27:
				case 5: return t;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return w(t);
				case 8: return t === Pf ? "StrictMode" : "Mode";
				case 22: return "Offscreen";
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 1:
				case 0:
				case 14:
				case 15:
					if (typeof t == "function") return t.displayName || t.name || null;
					if (typeof t == "string") return t;
					break;
				case 29:
					if (t = e._debugInfo, t != null) {
						for (var n = t.length - 1; 0 <= n; n--) if (typeof t[n].name == "string") return t[n].name;
					}
					if (e.return !== null) return E(e.return);
			}
			return null;
		}
		function ie(e) {
			return { current: e };
		}
		function ae(e, t) {
			0 > Qf ? console.error("Unexpected pop.") : (t !== Zf[Qf] && console.error("Unexpected Fiber popped."), e.current = Xf[Qf], Xf[Qf] = null, Zf[Qf] = null, Qf--);
		}
		function D(e, t, n) {
			Qf++, Xf[Qf] = e.current, Zf[Qf] = n, e.current = t;
		}
		function oe(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function se(e, t) {
			D(tp, t, e), D(ep, e, e), D($f, null, e);
			var n = t.nodeType;
			switch (n) {
				case 9:
				case 11:
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? Vu(t) : US;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = Vu(t), t = Hu(t, n);
				else switch (n) {
					case "svg":
						t = WS;
						break;
					case "math":
						t = GS;
						break;
					default: t = US;
				}
			}
			n = n.toLowerCase(), n = Vt(null, n), n = {
				context: t,
				ancestorInfo: n
			}, ae($f, e), D($f, n, e);
		}
		function O(e) {
			ae($f, e), ae(ep, e), ae(tp, e);
		}
		function k() {
			return oe($f.current);
		}
		function ce(e) {
			e.memoizedState !== null && D(np, e, e);
			var t = oe($f.current), n = e.type, r = Hu(t.context, n);
			n = Vt(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (D(ep, e, e), D($f, r, e));
		}
		function le(e) {
			ep.current === e && (ae($f, e), ae(ep, e)), np.current === e && (ae(np, e), bC._currentValue = yC);
		}
		function ue() {}
		function de() {
			if (rp === 0) {
				ip = console.log, ap = console.info, op = console.warn, sp = console.error, cp = console.group, lp = console.groupCollapsed, up = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: ue,
					writable: !0
				};
				Object.defineProperties(console, {
					info: e,
					log: e,
					warn: e,
					error: e,
					group: e,
					groupCollapsed: e,
					groupEnd: e
				});
			}
			rp++;
		}
		function fe() {
			if (rp--, rp === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: B({}, e, { value: ip }),
					info: B({}, e, { value: ap }),
					warn: B({}, e, { value: op }),
					error: B({}, e, { value: sp }),
					group: B({}, e, { value: cp }),
					groupCollapsed: B({}, e, { value: lp }),
					groupEnd: B({}, e, { value: up })
				});
			}
			0 > rp && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		function pe(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function me(e) {
			if (dp === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				dp = t && t[1] || "", fp = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + dp + e + fp;
		}
		function he(e, t) {
			if (!e || pp) return "";
			var n = mp.get(e);
			if (n !== void 0) return n;
			pp = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = V.H, V.H = null, de();
			try {
				var i = { DetermineComponentFrameRoot: function() {
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
				i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
				a && a.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var o = i.DetermineComponentFrameRoot(), s = o[0], c = o[1];
				if (s && c) {
					var l = s.split("\n"), u = c.split("\n");
					for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot");) a++;
					for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot");) o++;
					if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o];) o--;
					for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
						if (a !== 1 || o !== 1) do
							if (a--, o--, 0 > o || l[a] !== u[o]) {
								var d = "\n" + l[a].replace(" at new ", " at ");
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && mp.set(e, d), d;
							}
						while (1 <= a && 0 <= o);
						break;
					}
				}
			} finally {
				pp = !1, V.H = r, fe(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? me(l) : "", typeof e == "function" && mp.set(e, l), l;
		}
		function ge(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return me(e.type);
				case 16: return me("Lazy");
				case 13: return e.child !== t && t !== null ? me("Suspense Fallback") : me("Suspense");
				case 19: return me("SuspenseList");
				case 0:
				case 15: return he(e.type, !1);
				case 11: return he(e.type.render, !1);
				case 1: return he(e.type, !0);
				case 31: return me("Activity");
				default: return "";
			}
		}
		function _e(e) {
			try {
				var t = "", n = null;
				do {
					t += ge(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = pe(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = me(s + (c ? " [" + c + "]" : ""));
							}
							t = o + p;
						}
					}
					n = e, e = e.return;
				} while (e);
				return t;
			} catch (e) {
				return "\nError generating stack: " + e.message + "\n" + e.stack;
			}
		}
		function ve(e) {
			return (e = e ? e.displayName || e.name : "") ? me(e) : "";
		}
		function ye() {
			if (hp === null) return null;
			var e = hp._debugOwner;
			return e == null ? null : T(e);
		}
		function be() {
			if (hp === null) return "";
			var e = hp;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += me(e.type);
						break;
					case 13:
						t += me("Suspense");
						break;
					case 19:
						t += me("SuspenseList");
						break;
					case 31:
						t += me("Activity");
						break;
					case 30:
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += ve(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += ve(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = pe(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + pe(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function A(e, t, n, r, i, a, o) {
			var s = hp;
			xe(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				xe(s);
			}
		}
		function xe(e) {
			V.getCurrentStack = e === null ? null : be, gp = !1, hp = e;
		}
		function Se(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function Ce(e) {
			try {
				return we(e), !1;
			} catch {
				return !0;
			}
		}
		function we(e) {
			return "" + e;
		}
		function j(e, t) {
			if (Ce(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, Se(e)), we(e);
		}
		function Te(e, t) {
			if (Ce(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, Se(e)), we(e);
		}
		function Ee(e) {
			if (Ce(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", Se(e)), we(e);
		}
		function De(e) {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
			var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (t.isDisabled) return !0;
			if (!t.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
			try {
				jp = t.inject(e), Mp = t;
			} catch (e) {
				console.error("React instrumentation encountered an error: %o.", e);
			}
			return !!t.checkDCE;
		}
		function Oe(e) {
			if (typeof kp == "function" && Ap(e), Mp && typeof Mp.setStrictMode == "function") try {
				Mp.setStrictMode(jp, e);
			} catch (e) {
				Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function ke(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (Ip(e) / Lp | 0) | 0;
		}
		function Ae(e) {
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
				default: return console.error("Should have found matching lanes. This is a bug in React."), e;
			}
		}
		function je(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ae(n))) : i = Ae(o) : i = Ae(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ae(n))) : i = Ae(o)) : i = Ae(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function Me(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function Ne(e, t) {
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
				default: return console.error("Should have found matching lanes. This is a bug in React."), -1;
			}
		}
		function Pe() {
			var e = Bp;
			return Bp <<= 1, !(Bp & 62914560) && (Bp = 4194304), e;
		}
		function Fe(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function Ie(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function Le(e, t, n, r, i, a) {
			var o = e.pendingLanes;
			e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
			var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
			for (n = o & ~n; 0 < n;) {
				var u = 31 - Fp(n), d = 1 << u;
				s[u] = 0, c[u] = -1;
				var f = l[u];
				if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
					var p = f[u];
					p !== null && (p.lane &= -536870913);
				}
				n &= ~d;
			}
			r !== 0 && Re(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function Re(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Fp(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function ze(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Fp(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function Be(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : Ve(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function Ve(e) {
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
		function He(e, t, n) {
			if (Pp) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Fp(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function Ue(e, t) {
			if (Pp) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Fp(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function We(e) {
			return e &= -e, Vp !== 0 && Vp < e ? Hp !== 0 && Hp < e ? e & 134217727 ? Up : Wp : Hp : Vp;
		}
		function Ge() {
			var e = Jf.p;
			return e === 0 ? (e = window.event, e === void 0 ? Up : ff(e.type)) : e;
		}
		function Ke(e, t) {
			var n = Jf.p;
			try {
				return Jf.p = e, t();
			} finally {
				Jf.p = n;
			}
		}
		function qe(e) {
			delete e[Kp], delete e[qp], delete e[Yp], delete e[Xp], delete e[Zp];
		}
		function Je(e) {
			var t = e[Kp];
			if (t) return t;
			for (var n = e.parentNode; n;) {
				if (t = n[Jp] || n[Kp]) {
					if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Sd(e); e !== null;) {
						if (n = e[Kp]) return n;
						e = Sd(e);
					}
					return t;
				}
				e = n, n = e.parentNode;
			}
			return null;
		}
		function Ye(e) {
			if (e = e[Kp] || e[Jp]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function Xe(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function Ze(e) {
			var t = e[Qp];
			return t ||= e[Qp] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function Qe(e) {
			e[$p] = !0;
		}
		function $e(e, t) {
			et(e, t), et(e + "Capture", t);
		}
		function et(e, t) {
			tm[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), tm[e] = t;
			var n = e.toLowerCase();
			for (nm[n] = e, e === "onDoubleClick" && (nm.ondblclick = e), e = 0; e < t.length; e++) em.add(t[e]);
		}
		function tt(e, t) {
			rm[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function nt(e) {
			return _p.call(om, e) ? !0 : _p.call(am, e) ? !1 : im.test(e) ? om[e] = !0 : (am[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function rt(e, t, n) {
			if (nt(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = e.getAttribute(t), e === "" && !0 === n || (j(n, t), e === "" + n ? n : e);
			}
		}
		function it(e, t, n) {
			if (nt(t)) if (n === null) e.removeAttribute(t);
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
				j(n, t), e.setAttribute(t, "" + n);
			}
		}
		function at(e, t, n) {
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
				j(n, t), e.setAttribute(t, "" + n);
			}
		}
		function ot(e, t, n, r) {
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
				j(r, n), e.setAttributeNS(t, n, "" + r);
			}
		}
		function st(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return Ee(e), e;
				default: return "";
			}
		}
		function M(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function ct(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						Ee(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						Ee(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function lt(e) {
			if (!e._valueTracker) {
				var t = M(e) ? "checked" : "value";
				e._valueTracker = ct(e, t, "" + e[t]);
			}
		}
		function ut(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = M(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
		}
		function dt(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function ft(e) {
			return e.replace(sm, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function pt(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || lm || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", ye() || "A component", t.type), lm = !0), t.value === void 0 || t.defaultValue === void 0 || cm || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", ye() || "A component", t.type), cm = !0);
		}
		function mt(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (j(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + st(t)) : e.value !== "" + st(t) && (e.value = "" + st(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : gt(e, o, st(n)) : gt(e, o, st(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (j(s, "name"), e.name = "" + st(s)) : e.removeAttribute("name");
		}
		function ht(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (j(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					lt(e);
					return;
				}
				n = n == null ? "" : "" + st(n), t = t == null ? n : "" + st(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (j(o, "name"), e.name = o), lt(e);
		}
		function gt(e, t, n) {
			t === "number" && dt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
		}
		function _t(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? Of.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || dm || (dm = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || fm || (fm = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || um || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), um = !0);
		}
		function vt() {
			var e = ye();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function yt(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + st(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function bt(e, t) {
			for (e = 0; e < mm.length; e++) {
				var n = mm[e];
				if (t[n] != null) {
					var r = qf(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, vt()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, vt());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || pm || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), pm = !0);
		}
		function xt(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || hm || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", ye() || "A component"), hm = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function St(e, t, n) {
			if (t != null && (t = "" + st(t), t !== e.value && (e.value = t), n == null)) {
				e.defaultValue !== t && (e.defaultValue = t);
				return;
			}
			e.defaultValue = n == null ? "" : "" + st(n);
		}
		function Ct(e, t, n, r) {
			if (t == null) {
				if (r != null) {
					if (n != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (qf(r)) {
						if (1 < r.length) throw Error("<textarea> can only have at most one child.");
						r = r[0];
					}
					n = r;
				}
				n ??= "", t = n;
			}
			n = st(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), lt(e);
		}
		function wt(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? wt(e.children[0], t) : e;
		}
		function Tt(e) {
			return "  " + "  ".repeat(e);
		}
		function Et(e) {
			return "+ " + "  ".repeat(e);
		}
		function Dt(e) {
			return "- " + "  ".repeat(e);
		}
		function Ot(e) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return e.type;
				case 16: return "Lazy";
				case 31: return "Activity";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 0:
				case 15: return e = e.type, e.displayName || e.name || null;
				case 11: return e = e.type.render, e.displayName || e.name || null;
				case 1: return e = e.type, e.displayName || e.name || null;
				default: return null;
			}
		}
		function kt(e, t) {
			return gm.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function At(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return Et(n) + kt(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), Et(n) + kt(e, r) + "\n" + Dt(n) + kt(t, r) + "\n";
			}
			return Tt(n) + kt(e, r) + "\n";
		}
		function jt(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function Mt(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (qf(e)) return "[...]";
					if (e.$$typeof === jf) return (t = w(e.type)) ? "<" + t + ">" : "<...>";
					var n = jt(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = Mt(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
								n += n === "" ? "..." : ", ...";
								break;
							}
							n += (n === "" ? "" : ",") + r + ":" + i;
						}
						return "{" + n + "}";
					}
					return n;
				case "function": return (t = e.displayName || e.name) ? "function " + t : "function";
				default: return String(e);
			}
		}
		function Nt(e, t) {
			return typeof e != "string" || gm.test(e) ? "{" + Mt(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function Pt(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = Nt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function Ft(e, t, n) {
			var r = "", i = B({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = Mt(e[a], o);
				t.hasOwnProperty(a) ? (o = Mt(t[a], o), r += Et(n) + a + ": " + s + "\n", r += Dt(n) + a + ": " + o + "\n") : r += Et(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = Mt(i[c], 120 - 2 * n - c.length - 2), r += Dt(n) + c + ": " + e + "\n");
			return r;
		}
		function It(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += Pt(e, t, Tt(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = Nt(l, s);
						s = Nt(c, s), typeof l == "object" && l && typeof c == "object" && c && jt(l) === "Object" && jt(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += Tt(r + 1) + o + "={{\n" + Ft(l, c, r + 2) + Tt(r + 1) + "}}\n" : (i += Et(r + 1) + o + "=" + u + "\n", i += Dt(r + 1) + o + "=" + s + "\n");
					} else i += Tt(r + 1) + o + "=" + Nt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += Dt(r + 1) + e + "=" + Nt(n[e], t) + "\n";
					}
				}), i = i === "" ? Tt(r) + "<" + e + ">\n" : Tt(r) + "<" + e + "\n" + i + Tt(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += At(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + At("" + t, null, r + 1) : i + At("" + t, void 0, r + 1)), i;
		}
		function Lt(e, t) {
			var n = Ot(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += Lt(e, t), e = e.sibling;
				return n;
			}
			return Tt(t) + "<" + n + ">\n";
		}
		function Rt(e, t) {
			var n = wt(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return Tt(t) + "...\n" + Rt(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += Tt(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = At(i, e.serverProps, t), t++;
			else if (a = Ot(e.fiber), a !== null) if (e.serverProps === void 0) {
				r = t;
				var o = 120 - 2 * r - a.length - 2, s = "";
				for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
					var c = Nt(i[l], 15);
					if (o -= l.length + c.length + 2, 0 > o) {
						s += " ...";
						break;
					}
					s += " " + l + "=" + c;
				}
				r = Tt(r) + "<" + a + s + ">\n", t++;
			} else e.serverProps === null ? (r = Pt(a, i, Et(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = It(a, i, e.serverProps, t), t++);
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += Rt(o, t), a++) : l += Lt(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += Tt(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (Dt(t) + kt(a, 120 - 2 * t) + "\n") : l + Pt(a.type, a.props, Dt(t));
			return n + r + l;
		}
		function zt(e) {
			try {
				return "\n\n" + Rt(e, 0);
			} catch {
				return "";
			}
		}
		function Bt(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : zt(i).replaceAll(/^[+-]/gm, ">");
		}
		function Vt(e, t) {
			var n = B({}, e || xm), r = { tag: t };
			return vm.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), ym.indexOf(t) !== -1 && (n.pTagInButtonScope = null), _m.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function Ht(e, t, n) {
			switch (t) {
				case "select": return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
				case "optgroup": return e === "option" || e === "#text";
				case "option": return e === "#text";
				case "tr": return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
				case "tbody":
				case "thead":
				case "tfoot": return e === "tr" || e === "style" || e === "script" || e === "template";
				case "colgroup": return e === "col" || e === "template";
				case "table": return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
				case "head": return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
				case "html":
					if (n) break;
					return e === "head" || e === "body" || e === "frameset";
				case "frameset": return e === "frame";
				case "#document": if (!n) return e === "html";
			}
			switch (e) {
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
				case "rp":
				case "rt": return bm.indexOf(t) === -1;
				case "caption":
				case "col":
				case "colgroup":
				case "frameset":
				case "frame":
				case "tbody":
				case "td":
				case "tfoot":
				case "th":
				case "thead":
				case "tr": return t == null;
				case "head": return n || t === null;
				case "html": return n && t === "#document" || t === null;
				case "body": return n && (t === "#document" || t === "html") || t === null;
			}
			return !0;
		}
		function Ut(e, t) {
			switch (e) {
				case "address":
				case "article":
				case "aside":
				case "blockquote":
				case "center":
				case "details":
				case "dialog":
				case "dir":
				case "div":
				case "dl":
				case "fieldset":
				case "figcaption":
				case "figure":
				case "footer":
				case "header":
				case "hgroup":
				case "main":
				case "menu":
				case "nav":
				case "ol":
				case "p":
				case "section":
				case "summary":
				case "ul":
				case "pre":
				case "listing":
				case "table":
				case "hr":
				case "xmp":
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t.pTagInButtonScope;
				case "form": return t.formTag || t.pTagInButtonScope;
				case "li": return t.listItemTagAutoclosing;
				case "dd":
				case "dt": return t.dlItemTagAutoclosing;
				case "button": return t.buttonTagInScope;
				case "a": return t.aTagInScope;
				case "nobr": return t.nobrTagInScope;
			}
			return null;
		}
		function Wt(e, t) {
			for (; e;) {
				switch (e.tag) {
					case 5:
					case 26:
					case 27: if (e.type === t) return e;
				}
				e = e.return;
			}
			return null;
		}
		function Gt(e, t) {
			t ||= xm;
			var n = t.current;
			if (t = (n = Ht(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : Ut(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, Sm[t]) return !1;
			Sm[t] = !0;
			var i = (t = hp) ? Wt(t.return, r) : null, a = t !== null && i !== null ? Bt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || A(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function Kt(e, t, n) {
			if (n || Ht("#text", t, !1)) return !0;
			if (n = "#text|" + t, Sm[n]) return !1;
			Sm[n] = !0;
			var r = (n = hp) ? Wt(n, t) : null;
			return n = n !== null && r !== null ? Bt(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function qt(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function Jt(e) {
			return e.replace(Om, function(e, t) {
				return t.toUpperCase();
			});
		}
		function Yt(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? Am.hasOwnProperty(t) && Am[t] || (Am[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, Jt(t.replace(Dm, "ms-")))) : Em.test(t) ? Am.hasOwnProperty(t) && Am[t] || (Am[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !km.test(n) || jm.hasOwnProperty(n) && jm[n] || (jm[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(km, ""))), typeof n == "number" && (isNaN(n) ? Mm || (Mm = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Nm || (Nm = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Pm.has(t) ? t === "float" ? e.cssFloat = n : (Te(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function Xt(e, t, n) {
			if (t != null && typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			if (t && Object.freeze(t), e = e.style, n != null) {
				if (t) {
					var r = {};
					if (n) {
						for (var i in n) if (n.hasOwnProperty(i) && !t.hasOwnProperty(i)) for (var a = Cm[i] || [i], o = 0; o < a.length; o++) r[a[o]] = i;
					}
					for (var s in t) if (t.hasOwnProperty(s) && (!n || n[s] !== t[s])) for (i = Cm[s] || [s], a = 0; a < i.length; a++) r[i[a]] = s;
					for (var c in s = {}, t) for (i = Cm[c] || [c], a = 0; a < i.length; a++) s[i[a]] = c;
					for (var l in c = {}, r) if (i = r[l], (a = s[l]) && i !== a && (o = i + "," + a, !c[o])) {
						c[o] = !0, o = console;
						var u = t[i];
						o.error.call(o, "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", u == null || typeof u == "boolean" || u === "" ? "Removing" : "Updating", i, a);
					}
				}
				for (var d in n) !n.hasOwnProperty(d) || t != null && t.hasOwnProperty(d) || (d.indexOf("--") === 0 ? e.setProperty(d, "") : d === "float" ? e.cssFloat = "" : e[d] = "");
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && Yt(e, f, l);
			} else for (r in t) t.hasOwnProperty(r) && Yt(e, r, t[r]);
		}
		function Zt(e) {
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
		function Qt(e) {
			return Lm.get(e) || e;
		}
		function $t(e, t) {
			if (_p.call(Bm, t) && Bm[t]) return !0;
			if (Hm.test(t)) {
				if (e = "aria-" + t.slice(4).toLowerCase(), e = zm.hasOwnProperty(e) ? e : null, e == null) return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Bm[t] = !0;
				if (t !== e) return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, e), Bm[t] = !0;
			}
			if (Vm.test(t)) {
				if (e = t.toLowerCase(), e = zm.hasOwnProperty(e) ? e : null, e == null) return Bm[t] = !0, !1;
				t !== e && (console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, e), Bm[t] = !0);
			}
			return !0;
		}
		function en(e, t) {
			var n = [], r;
			for (r in t) $t(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function tn(e, t, n, r) {
			if (_p.call(Wm, t) && Wm[t]) return !0;
			var i = t.toLowerCase();
			if (i === "onfocusin" || i === "onfocusout") return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Wm[t] = !0;
			if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction")) return !0;
			if (r != null) {
				if (e = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(t)) return !0;
				if (r = e.hasOwnProperty(i) ? e[i] : null, r != null) return console.error("Invalid event handler property `%s`. Did you mean `%s`?", t, r), Wm[t] = !0;
				if (Gm.test(t)) return console.error("Unknown event handler property `%s`. It will be ignored.", t), Wm[t] = !0;
			} else if (Gm.test(t)) return Km.test(t) && console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Wm[t] = !0;
			if (qm.test(t) || Jm.test(t)) return !0;
			if (i === "innerhtml") return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Wm[t] = !0;
			if (i === "aria") return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Wm[t] = !0;
			if (i === "is" && n != null && typeof n != "string") return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Wm[t] = !0;
			if (typeof n == "number" && isNaN(n)) return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Wm[t] = !0;
			if (Rm.hasOwnProperty(i)) {
				if (i = Rm[i], i !== t) return console.error("Invalid DOM property `%s`. Did you mean `%s`?", t, i), Wm[t] = !0;
			} else if (t !== i) return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, i), Wm[t] = !0;
			switch (t) {
				case "dangerouslySetInnerHTML":
				case "children":
				case "style":
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": return !0;
				case "innerText":
				case "textContent": return !0;
			}
			switch (typeof n) {
				case "boolean": switch (t) {
					case "autoFocus":
					case "checked":
					case "multiple":
					case "muted":
					case "selected":
					case "contentEditable":
					case "spellCheck":
					case "draggable":
					case "value":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
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
					case "capture":
					case "download":
					case "inert": return !0;
					default: return i = t.toLowerCase().slice(0, 5), i === "data-" || i === "aria-" || (n ? console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.", n, t, t, n, t) : console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", n, t, t, n, t, t, t), Wm[t] = !0);
				}
				case "function":
				case "symbol": return Wm[t] = !0, !1;
				case "string": if (n === "false" || n === "true") {
					switch (t) {
						case "checked":
						case "selected":
						case "multiple":
						case "muted":
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
						case "inert": break;
						default: return !0;
					}
					console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : "Although this works, it will not work as expected if you pass the string \"false\".", t, n), Wm[t] = !0;
				}
			}
			return !0;
		}
		function nn(e, t, n) {
			var r = [], i;
			for (i in t) tn(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function rn(e) {
			return Ym.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function an() {}
		function on(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function sn(e) {
			var t = Ye(e);
			if (t && (e = t.stateNode)) {
				var n = e[qp] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (mt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (j(t, "name"), n = n.querySelectorAll("input[name=\"" + ft("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[qp] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									mt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && ut(r);
						}
						break a;
					case "textarea":
						St(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && yt(e, !!n.multiple, t, !1);
				}
			}
		}
		function cn(e, t, n) {
			if ($m) return e(t, n);
			$m = !0;
			try {
				return e(t);
			} finally {
				if ($m = !1, (Zm !== null || Qm !== null) && (sl(), Zm && (t = Zm, e = Qm, Qm = Zm = null, sn(t), e))) for (t = 0; t < e.length; t++) sn(e[t]);
			}
		}
		function ln(e, t) {
			var n = e.stateNode;
			if (n === null) return null;
			var r = n[qp] || null;
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
			if (n && typeof n != "function") throw Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof n + "` type.");
			return n;
		}
		function un() {
			if (ah) return ah;
			var e, t = ih, n = t.length, r, i = "value" in rh ? rh.value : rh.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return ah = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function dn(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function fn() {
			return !0;
		}
		function pn() {
			return !1;
		}
		function mn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? fn : pn, this.isPropagationStopped = pn, this;
			}
			return B(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = fn);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = fn);
				},
				persist: function() {},
				isPersistent: fn
			}), t;
		}
		function hn(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = Ch[e]) ? !!t[e] : !1;
		}
		function gn() {
			return hn;
		}
		function _n(e, t) {
			switch (e) {
				case "keyup": return Ah.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== jh;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function vn(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function yn(e, t) {
			switch (e) {
				case "compositionend": return vn(t);
				case "keypress": return t.which === Ih ? (Rh = !0, Lh) : null;
				case "textInput": return e = t.data, e === Lh && Rh ? null : e;
				default: return null;
			}
		}
		function bn(e, t) {
			if (zh) return e === "compositionend" || !Mh && _n(e, t) ? (e = un(), ah = ih = rh = null, zh = !1, e) : null;
			switch (e) {
				case "paste": return null;
				case "keypress":
					if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
						if (t.char && 1 < t.char.length) return t.char;
						if (t.which) return String.fromCharCode(t.which);
					}
					return null;
				case "compositionend": return Fh && t.locale !== "ko" ? null : t.data;
				default: return null;
			}
		}
		function xn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!Bh[e.type] : t === "textarea";
		}
		function Sn(e) {
			if (!eh) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function Cn(e, t, n, r) {
			Zm ? Qm ? Qm.push(r) : Qm = [r] : Zm = r, t = mu(t, "onChange"), 0 < t.length && (n = new sh("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function wn(e) {
			cu(e, 0);
		}
		function Tn(e) {
			if (ut(Xe(e))) return e;
		}
		function En(e, t) {
			if (e === "change") return t;
		}
		function Dn() {
			Vh && (Vh.detachEvent("onpropertychange", On), Hh = Vh = null);
		}
		function On(e) {
			if (e.propertyName === "value" && Tn(Hh)) {
				var t = [];
				Cn(t, Hh, e, on(e)), cn(wn, t);
			}
		}
		function kn(e, t, n) {
			e === "focusin" ? (Dn(), Vh = t, Hh = n, Vh.attachEvent("onpropertychange", On)) : e === "focusout" && Dn();
		}
		function An(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return Tn(Hh);
		}
		function jn(e, t) {
			if (e === "click") return Tn(t);
		}
		function Mn(e, t) {
			if (e === "input" || e === "change") return Tn(t);
		}
		function Nn(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function Pn(e, t) {
			if (Wh(e, t)) return !0;
			if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
			var n = Object.keys(e), r = Object.keys(t);
			if (n.length !== r.length) return !1;
			for (r = 0; r < n.length; r++) {
				var i = n[r];
				if (!_p.call(t, i) || !Wh(e[i], t[i])) return !1;
			}
			return !0;
		}
		function Fn(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function In(e, t) {
			var n = Fn(e);
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
				n = Fn(n);
			}
		}
		function Ln(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ln(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function Rn(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = dt(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = dt(e.document);
			}
			return t;
		}
		function zn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function Bn(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			Yh || Kh == null || Kh !== dt(r) || (r = Kh, "selectionStart" in r && zn(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), Jh && Pn(Jh, r) || (Jh = r, r = mu(qh, "onSelect"), 0 < r.length && (t = new sh("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = Kh)));
		}
		function Vn(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function Hn(e) {
			if (Zh[e]) return Zh[e];
			if (!Xh[e]) return e;
			var t = Xh[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in Qh) return Zh[e] = t[n];
			return e;
		}
		function Un(e, t) {
			og.set(e, t), $e(t, [e]);
		}
		function Wn(e) {
			for (var t = mg, n = 0; n < e.length; n++) {
				var r = e[n];
				if (typeof r == "object" && r) if (qf(r) && r.length === 2 && typeof r[0] == "string") {
					if (t !== mg && t !== _g) return hg;
					t = _g;
				} else return hg;
				else {
					if (typeof r == "function" || typeof r == "string" && 50 < r.length || t !== mg && t !== gg) return hg;
					t = gg;
				}
			}
			return t;
		}
		function Gn(e, t, n, r) {
			for (var i in e) _p.call(e, i) && i[0] !== "_" && Kn(i, e[i], t, n, r);
		}
		function Kn(e, t, n, r, i) {
			switch (typeof t) {
				case "object":
					if (t === null) {
						t = "null";
						break;
					}
					if (t.$$typeof === jf) {
						var a = w(t.type) || "…", o = t.key;
						t = t.props;
						var s = Object.keys(t), c = s.length;
						if (o == null && c === 0) {
							t = "<" + a + " />";
							break;
						}
						if (3 > r || c === 1 && s[0] === "children" && o == null) {
							t = "<" + a + " … />";
							break;
						}
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && Kn("key", o, n, r + 1, i), e = !1, t) l === "children" ? t.children != null && (!qf(t.children) || 0 < t.children.length) && (e = !0) : _p.call(t, l) && l[0] !== "_" && Kn(l, t[l], n, r + 1, i);
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), a === "Array") {
						if (l = Wn(t), l === gg || l === mg) {
							t = JSON.stringify(t);
							break;
						}
						if (l === _g) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length; e++) a = t[e], Kn(a[0], a[1], n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, Kn(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, Kn(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && Gn(t, n, r + 1, i);
					return;
				case "function":
					t = t.name === "" ? "() => {}" : t.name + "() {}";
					break;
				case "string":
					t = t === pg ? "…" : JSON.stringify(t);
					break;
				case "undefined":
					t = "undefined";
					break;
				case "boolean":
					t = t ? "true" : "false";
					break;
				default: t = String(t);
			}
			n.push([i + "\xA0\xA0".repeat(r) + e, t]);
		}
		function qn(e, t, n, r) {
			var i = !0;
			for (o in e) o in t || (n.push([vg + "\xA0\xA0".repeat(r) + o, "…"]), i = !1);
			for (var a in t) if (a in e) {
				var o = e[a], s = t[a];
				if (o !== s) {
					if (r === 0 && a === "children") i = "\xA0\xA0".repeat(r) + a, n.push([vg + i, "…"], [yg + i, "…"]);
					else {
						if (!(3 <= r)) {
							if (typeof o == "object" && typeof s == "object" && o !== null && s !== null && o.$$typeof === s.$$typeof) if (s.$$typeof === jf) {
								if (o.type === s.type && o.key === s.key) {
									o = w(s.type) || "…", i = "\xA0\xA0".repeat(r) + a, o = "<" + o + " … />", n.push([vg + i, o], [yg + i, o]), i = !1;
									continue;
								}
							} else {
								var c = Object.prototype.toString.call(o), l = Object.prototype.toString.call(s);
								if (c === l && (l === "[object Object]" || l === "[object Array]")) {
									c = [bg + "\xA0\xA0".repeat(r) + a, l === "[object Array]" ? "Array" : ""], n.push(c), l = n.length, qn(o, s, n, r + 1) ? l === n.length && (c[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
									continue;
								}
							}
							else if (typeof o == "function" && typeof s == "function" && o.name === s.name && o.length === s.length && (c = Function.prototype.toString.call(o), l = Function.prototype.toString.call(s), c === l)) {
								o = s.name === "" ? "() => {}" : s.name + "() {}", n.push([bg + "\xA0\xA0".repeat(r) + a, o + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						Kn(a, o, n, r, vg), Kn(a, s, n, r, yg);
					}
					i = !1;
				}
			} else n.push([yg + "\xA0\xA0".repeat(r) + a, "…"]), i = !1;
			return i;
		}
		function Jn(e) {
			U = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function Yn(e, t, n, r) {
			xg && (Tg.start = t, Tg.end = n, wg.color = "warning", wg.tooltipText = r, wg.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, Tg)) : performance.measure(r, Tg));
		}
		function Xn(e, t, n) {
			Yn(e, t, n, "Reconnect");
		}
		function Zn(e, t, n, r, i) {
			var a = E(e);
			if (a !== null && xg) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				r = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				s = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Eg], l = qn(o.memoizedProps, l, c, 0), 1 < c.length && (l && !Cg && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Cg = !0, c[0] = Og, wg.color = "warning", wg.tooltipText = Dg) : (wg.color = r, wg.tooltipText = a), wg.properties = c, Tg.start = t, Tg.end = n, s == null ? performance.measure("​" + a, Tg) : s.run(performance.measure.bind(performance, "​" + a, Tg)))) : s == null ? console.timeStamp(a, t, n, Sg, void 0, r) : s.run(console.timeStamp.bind(console, a, t, n, Sg, void 0, r));
			}
		}
		function Qn(e, t, n, r) {
			if (xg) {
				var i = E(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && Kn("key", e.key, o, 0, ""), e.memoizedProps !== null && Gn(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
						start: t,
						end: n,
						detail: { devtools: {
							color: "error",
							track: Sg,
							tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
							properties: o
						} }
					}, a ? a.run(performance.measure.bind(performance, "​" + i, e)) : performance.measure("​" + i, e);
				}
			}
		}
		function $n(e, t, n, r, i) {
			if (i !== null) {
				if (xg) {
					var a = E(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && Kn("key", e.key, r, 0, ""), e.memoizedProps !== null && Gn(e.memoizedProps, r, 0, ""), t = {
							start: t,
							end: n,
							detail: { devtools: {
								color: "error",
								track: Sg,
								tooltipText: "A lifecycle or effect errored",
								properties: r
							} }
						}, (e = e._debugTask) ? e.run(performance.measure.bind(performance, "​" + a, t)) : performance.measure("​" + a, t);
					}
				}
			} else a = E(e), a !== null && xg && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, Sg, void 0, i)) : console.timeStamp(a, t, n, Sg, void 0, i));
		}
		function er(e, t, n, r) {
			if (xg && !(t <= e)) {
				var i = (n & 738197653) === n ? "tertiary-dark" : "primary-dark";
				n = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", r ? r.run(console.timeStamp.bind(console, n, e, t, U, H, i)) : console.timeStamp(n, e, t, U, H, i);
			}
		}
		function tr(e, t, n, r) {
			!xg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, U, H, n)) : console.timeStamp("Prewarm", e, t, U, H, n));
		}
		function nr(e, t, n, r) {
			!xg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, U, H, n)) : console.timeStamp("Suspended", e, t, U, H, n));
		}
		function rr(e, t, n, r, i, a) {
			if (xg && !(t <= e)) {
				n = [];
				for (var o = 0; o < r.length; o++) {
					var s = r[o].value;
					n.push(["Recoverable Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "primary-dark",
						track: U,
						trackGroup: H,
						tooltipText: i ? "Hydration Failed" : "Recovered after Error",
						properties: n
					} }
				}, a ? a.run(performance.measure.bind(performance, "Recovered", e)) : performance.measure("Recovered", e);
			}
		}
		function ir(e, t, n, r) {
			!xg || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, U, H, "error")) : console.timeStamp("Errored", e, t, U, H, "error"));
		}
		function ar(e, t, n, r) {
			!xg || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, U, H, "secondary-light")) : console.timeStamp(n, e, t, U, H, "secondary-light"));
		}
		function or(e, t, n, r, i) {
			if (xg && !(t <= e)) {
				for (var a = [], o = 0; o < n.length; o++) {
					var s = n[o].value;
					a.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "error",
						track: U,
						trackGroup: H,
						tooltipText: r ? "Remaining Effects Errored" : "Commit Errored",
						properties: a
					} }
				}, i ? i.run(performance.measure.bind(performance, "Errored", e)) : performance.measure("Errored", e);
			}
		}
		function sr(e, t, n) {
			!xg || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, U, H, "secondary-dark")) : console.timeStamp("Animating", e, t, U, H, "secondary-dark"));
		}
		function cr() {
			for (var e = Mg, t = Ng = Mg = 0; t < e;) {
				var n = jg[t];
				jg[t++] = null;
				var r = jg[t];
				jg[t++] = null;
				var i = jg[t];
				jg[t++] = null;
				var a = jg[t];
				if (jg[t++] = null, r !== null && i !== null) {
					var o = r.pending;
					o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
				}
				a !== 0 && fr(n, i, a);
			}
		}
		function lr(e, t, n, r) {
			jg[Mg++] = e, jg[Mg++] = t, jg[Mg++] = n, jg[Mg++] = r, Ng |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function ur(e, t, n, r) {
			return lr(e, t, n, r), pr(e);
		}
		function dr(e, t) {
			return lr(e, null, null, t), pr(e);
		}
		function fr(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & kg || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Fp(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function pr(e) {
			if (Kx > Gx) throw Zx = Kx = 0, Qx = qx = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Zx > Xx && (Zx = 0, Qx = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && Gl(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && Gl(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function mr(e) {
			if (Fg === null) return e;
			var t = Fg(e);
			return t === void 0 ? e : t.current;
		}
		function hr(e) {
			if (Fg === null) return e;
			var t = Fg(e);
			return t === void 0 ? e != null && typeof e.render == "function" && (t = mr(e.render), e.render !== t) ? (t = {
				$$typeof: Rf,
				render: t
			}, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
		}
		function gr(e, t) {
			if (Fg === null) return !1;
			var n = e.elementType;
			t = t.type;
			var r = !1, i = typeof t == "object" && t ? t.$$typeof : null;
			switch (e.tag) {
				case 1:
					typeof t == "function" && (r = !0);
					break;
				case 0:
					(typeof t == "function" || i === Hf) && (r = !0);
					break;
				case 11:
					(i === Rf || i === Hf) && (r = !0);
					break;
				case 14:
				case 15:
					(i === Vf || i === Hf) && (r = !0);
					break;
				default: return !1;
			}
			return !!(r && (e = Fg(n), e !== void 0 && e === Fg(t)));
		}
		function _r(e) {
			Fg !== null && typeof WeakSet == "function" && (Ig === null && (Ig = /* @__PURE__ */ new WeakSet()), Ig.add(e));
		}
		function vr(e, t, n) {
			do {
				var r = e, i = r.alternate, a = r.child, o = r.sibling, s = r.tag;
				r = r.type;
				var c = null;
				switch (s) {
					case 0:
					case 15:
					case 1:
						c = r;
						break;
					case 11: c = r.render;
				}
				if (Fg === null) throw Error("Expected resolveFamily to be set during hot reload.");
				var l = !1;
				if (r = !1, c !== null && (c = Fg(c), c !== void 0 && (n.has(c) ? r = !0 : t.has(c) && (s === 1 ? r = !0 : l = !0))), Ig !== null && (Ig.has(e) || i !== null && Ig.has(i)) && (r = !0), r && (e._debugNeedsRemount = !0), (r || l) && (i = dr(e, 2), i !== null && nl(i, e, 2)), a === null || r || vr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function yr(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Vg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function br(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function xr(e, t) {
			var n = e.alternate;
			switch (n === null ? (n = g(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
				case 0:
				case 15:
					n.type = mr(e.type);
					break;
				case 1:
					n.type = mr(e.type);
					break;
				case 11: n.type = hr(e.type);
			}
			return n;
		}
		function Sr(e, t) {
			e.flags &= 65011714;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function Cr(e, t, n, r, i, a) {
			var o = 0, s = e;
			if (typeof e == "function") br(e) && (o = 1), s = mr(s);
			else if (typeof e == "string") o = k(), o = Wd(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (e) {
				case Uf: return t = g(31, n, t, i), t.elementType = Uf, t.lanes = a, t;
				case Nf: return Tr(n.children, i, a, t);
				case Pf:
					o = 8, i |= Rg, i |= zg;
					break;
				case Ff: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = g(12, e, t, r | G), t.elementType = Ff, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case zf: return t = g(13, n, t, i), t.elementType = zf, t.lanes = a, t;
				case Bf: return t = g(19, n, t, i), t.elementType = Bf, t.lanes = a, t;
				default:
					if (typeof e == "object" && e) switch (e.$$typeof) {
						case Lf:
							o = 10;
							break a;
						case If:
							o = 9;
							break a;
						case Rf:
							o = 11, s = hr(s);
							break a;
						case Vf:
							o = 14;
							break a;
						case Hf:
							o = 16, s = null;
							break a;
					}
					s = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : qf(e) ? n = "array" : e !== void 0 && e.$$typeof === jf ? (n = "<" + (w(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, (o = r ? T(r) : null) && (s += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (n + "." + s)), s = null;
			}
			return t = g(o, n, t, i), t.elementType = e, t.type = s, t.lanes = a, t._debugOwner = r, t;
		}
		function wr(e, t, n) {
			return t = Cr(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function Tr(e, t, n, r) {
			return e = g(7, e, r, t), e.lanes = n, e;
		}
		function Er(e, t, n) {
			return e = g(6, e, null, t), e.lanes = n, e;
		}
		function Dr(e) {
			var t = g(18, null, null, W);
			return t.stateNode = e, t;
		}
		function Or(e, t, n) {
			return t = g(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function kr(e, t) {
			if (typeof e == "object" && e) {
				var n = Hg.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: _e(t)
				}, Hg.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: _e(t)
			};
		}
		function Ar(e, t) {
			Ir(), Ug[Wg++] = Kg, Ug[Wg++] = Gg, Gg = e, Kg = t;
		}
		function jr(e, t, n) {
			Ir(), qg[Jg++] = Xg, qg[Jg++] = Zg, qg[Jg++] = Yg, Yg = e;
			var r = Xg;
			e = Zg;
			var i = 32 - Fp(r) - 1;
			r &= ~(1 << i), n += 1;
			var a = 32 - Fp(t) + i;
			if (30 < a) {
				var o = i - i % 5;
				a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Xg = 1 << 32 - Fp(t) + i | n << i | r, Zg = a + e;
			} else Xg = 1 << a | n << i | r, Zg = e;
		}
		function Mr(e) {
			Ir(), e.return !== null && (Ar(e, 1), jr(e, 1, 0));
		}
		function Nr(e) {
			for (; e === Gg;) Gg = Ug[--Wg], Ug[Wg] = null, Kg = Ug[--Wg], Ug[Wg] = null;
			for (; e === Yg;) Yg = qg[--Jg], qg[Jg] = null, Zg = qg[--Jg], qg[Jg] = null, Xg = qg[--Jg], qg[Jg] = null;
		}
		function Pr() {
			return Ir(), Yg === null ? null : {
				id: Xg,
				overflow: Zg
			};
		}
		function Fr(e, t) {
			Ir(), qg[Jg++] = Xg, qg[Jg++] = Zg, qg[Jg++] = Yg, Xg = t.id, Zg = t.overflow, Yg = e;
		}
		function Ir() {
			K || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Lr(e, t) {
			if (e.return === null) {
				if (t_ === null) t_ = {
					fiber: e,
					children: [],
					serverProps: void 0,
					serverTail: [],
					distanceFromLeaf: t
				};
				else {
					if (t_.fiber !== e) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
					t_.distanceFromLeaf > t && (t_.distanceFromLeaf = t);
				}
				return t_;
			}
			var n = Lr(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function Rr() {
			K && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function zr(e, t) {
			e_ || (e = Lr(e, 0), e.serverProps = null, t !== null && (t = yd(t), e.serverTail.push(t)));
		}
		function Br(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], n = "", r = t_;
			throw r !== null && (t_ = null, n = zt(r)), Kr(kr(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), i_;
		}
		function Vr(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[Kp] = e, t[qp] = r, _u(n, r), n) {
				case "dialog":
					R("cancel", t), R("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					R("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < fS.length; n++) R(fS[n], t);
					break;
				case "source":
					R("error", t);
					break;
				case "img":
				case "image":
				case "link":
					R("error", t), R("load", t);
					break;
				case "details":
					R("toggle", t);
					break;
				case "input":
					tt("input", r), R("invalid", t), pt(t, r), ht(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					_t(t, r);
					break;
				case "select":
					tt("select", r), R("invalid", t), bt(t, r);
					break;
				case "textarea": tt("textarea", r), R("invalid", t), xt(t, r), Ct(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Cu(t.textContent, n) ? (r.popover != null && (R("beforetoggle", t), R("toggle", t)), r.onScroll != null && R("scroll", t), r.onScrollEnd != null && R("scrollend", t), r.onClick != null && (t.onclick = an), t = !0) : t = !1, t || Br(e, !0);
		}
		function Hr(e) {
			for (Qg = e.return; Qg;) switch (Qg.tag) {
				case 5:
				case 31:
				case 13:
					r_ = !1;
					return;
				case 27:
				case 3:
					r_ = !0;
					return;
				default: Qg = Qg.return;
			}
		}
		function Ur(e) {
			if (e !== Qg) return !1;
			if (!K) return Hr(e), K = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Uu(e.type, e.memoizedProps)), n = !n), n && $g) {
				for (n = $g; n;) {
					var r = Lr(e, 0), i = yd(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? xd(n) : vd(n.nextSibling);
				}
				Br(e);
			}
			if (Hr(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				$g = xd(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				$g = xd(e);
			} else t === 27 ? (t = $g, ed(e.type) ? (e = nC, nC = null, $g = e) : $g = t) : $g = Qg ? vd(e.stateNode.nextSibling) : null;
			return !0;
		}
		function Wr() {
			$g = Qg = null, e_ = K = !1;
		}
		function Gr() {
			var e = n_;
			return e !== null && (mx === null ? mx = e : mx.push.apply(mx, e), n_ = null), e;
		}
		function Kr(e) {
			n_ === null ? n_ = [e] : n_.push(e);
		}
		function qr() {
			var e = t_;
			if (e !== null) {
				t_ = null;
				for (var t = zt(e); 0 < e.children.length;) e = e.children[0];
				A(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function Jr() {
			l_ = c_ = null, u_ = !1;
		}
		function Yr(e, t, n) {
			D(a_, t._currentValue, e), t._currentValue = n, D(o_, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== s_ && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = s_;
		}
		function Xr(e, t) {
			e._currentValue = a_.current;
			var n = o_.current;
			ae(o_, t), e._currentRenderer = n, ae(a_, t);
		}
		function Zr(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function Qr(e, t, n, r) {
			var i = e.child;
			for (i !== null && (i.return = e); i !== null;) {
				var a = i.dependencies;
				if (a !== null) {
					var o = i.child;
					a = a.firstContext;
					a: for (; a !== null;) {
						var s = a;
						a = i;
						for (var c = 0; c < t.length; c++) if (s.context === t[c]) {
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Zr(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Zr(o, n, e), o = null;
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
		function $r(e, t, n, r) {
			e = null;
			for (var i = t, a = !1; i !== null;) {
				if (!a) {
					if (i.flags & 524288) a = !0;
					else if (i.flags & 262144) break;
				}
				if (i.tag === 10) {
					var o = i.alternate;
					if (o === null) throw Error("Should have a current fiber. This is a bug in React.");
					if (o = o.memoizedProps, o !== null) {
						var s = i.type;
						Wh(i.pendingProps.value, o.value) || (e === null ? e = [s] : e.push(s));
					}
				} else if (i === np.current) {
					if (o = i.alternate, o === null) throw Error("Should have a current fiber. This is a bug in React.");
					o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [bC] : e.push(bC));
				}
				i = i.return;
			}
			e !== null && Qr(t, e, n, r), t.flags |= 262144;
		}
		function ei(e) {
			for (e = e.firstContext; e !== null;) {
				if (!Wh(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function ti(e) {
			c_ = e, l_ = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function ni(e) {
			return u_ && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), ii(c_, e);
		}
		function ri(e, t) {
			return c_ === null && ti(e), ii(e, t);
		}
		function ii(e, t) {
			var n = t._currentValue;
			if (t = {
				context: t,
				memoizedValue: n,
				next: null
			}, l_ === null) {
				if (e === null) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
				l_ = t, e.dependencies = {
					lanes: 0,
					firstContext: t,
					_debugThenableState: null
				}, e.flags |= 524288;
			} else l_ = l_.next = t;
			return n;
		}
		function ai() {
			return {
				controller: new d_(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function oi(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function si(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && f_(p_, function() {
				e.controller.abort();
			});
		}
		function ci(e, t, n) {
			e & 127 ? 0 > k_ && (k_ = h_(), A_ = g_(t), M_ = t, n != null && (N_ = E(n)), (Ub & (Pb | Fb)) !== Nb && (D_ = !0, j_ = __), e = Ku(), t = Gu(), e !== I_ || t !== F_ ? I_ = -1.1 : t !== null && (j_ = __), P_ = e, F_ = t) : e & 4194048 && 0 > B_ && (B_ = h_(), H_ = g_(t), U_ = t, n != null && (W_ = E(n)), 0 > z_) && (e = Ku(), t = Gu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function li(e) {
			if (0 > k_) {
				k_ = h_(), A_ = e._debugTask == null ? null : e._debugTask, (Ub & (Pb | Fb)) !== Nb && (j_ = __);
				var t = Ku(), n = Gu();
				t !== I_ || n !== F_ ? I_ = -1.1 : n !== null && (j_ = __), P_ = t, F_ = n;
			}
			0 > B_ && (B_ = h_(), H_ = e._debugTask == null ? null : e._debugTask, 0 > z_) && (e = Ku(), t = Gu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function ui() {
			var e = w_;
			return w_ = 0, e;
		}
		function di(e) {
			var t = w_;
			return w_ = e, t;
		}
		function fi(e) {
			var t = w_;
			return w_ += e, t;
		}
		function pi() {
			J = q = -1.1;
		}
		function mi() {
			var e = q;
			return q = -1.1, e;
		}
		function hi(e) {
			0 <= e && (q = e);
		}
		function gi() {
			var e = T_;
			return T_ = -0, e;
		}
		function _i(e) {
			0 <= e && (T_ = e);
		}
		function vi() {
			var e = E_;
			return E_ = null, e;
		}
		function yi() {
			var e = D_;
			return D_ = !1, e;
		}
		function bi(e) {
			C_ = h_(), 0 > e.actualStartTime && (e.actualStartTime = C_);
		}
		function xi(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, e.selfBaseDuration = t, C_ = -1;
			}
		}
		function Si(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, C_ = -1;
			}
		}
		function Ci() {
			if (0 <= C_) {
				var e = h_(), t = e - C_;
				C_ = -1, w_ += t, T_ += t, J = e;
			}
		}
		function wi(e) {
			E_ === null && (E_ = []), E_.push(e), S_ === null && (S_ = []), S_.push(e);
		}
		function Ti() {
			C_ = h_(), 0 > q && (q = C_);
		}
		function Ei(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Di(e, t) {
			if (rv === null) {
				var n = rv = [];
				iv = 0, av = ru(), ov = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return iv++, t.then(Oi, Oi), t;
		}
		function Oi() {
			if (--iv === 0 && (-1 < B_ || (z_ = -1.1), rv !== null)) {
				ov !== null && (ov.status = "fulfilled");
				var e = rv;
				rv = null, av = 0, ov = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function ki(e, t) {
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
		function Ai() {
			var e = cv.current;
			return e === null ? Wb.pooledCache : e;
		}
		function ji(e, t) {
			t === null ? D(cv, cv.current, e) : D(cv, t.pool, e);
		}
		function Mi() {
			var e = Ai();
			return e === null ? null : {
				parent: m_._currentValue,
				pool: e
			};
		}
		function Ni() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function Pi(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function Fi(e, t, n) {
			V.actQueue !== null && (V.didUsePromise = !0);
			var r = e.thenables;
			if (n = r[n], n === void 0 ? r.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(an, an), t = n), t._debugInfo === void 0) {
				e = performance.now(), r = t.displayName;
				var i = {
					name: typeof r == "string" ? r : "Promise",
					start: e,
					end: e,
					value: t
				};
				t._debugInfo = [{ awaited: i }], t.status !== "fulfilled" && t.status !== "rejected" && (e = function() {
					i.end = performance.now();
				}, t.then(e, e));
			}
			switch (t.status) {
				case "fulfilled": return t.value;
				case "rejected": throw e = t.reason, Ri(e), e;
				default:
					if (typeof t.status == "string") t.then(an, an);
					else {
						if (e = Wb, e !== null && 100 < e.shellSuspendCounter) throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
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
						case "rejected": throw e = t.reason, Ri(e), e;
					}
					throw Vv = t, Hv = !0, Lv;
			}
		}
		function Ii(e) {
			try {
				return Iv(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Vv = e, Hv = !0, Lv) : e;
			}
		}
		function Li() {
			if (Vv === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Vv;
			return Vv = null, Hv = !1, e;
		}
		function Ri(e) {
			if (e === Lv || e === zv) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function zi(e) {
			var t = Y;
			return e != null && (Y = t === null ? e : t.concat(e)), t;
		}
		function Bi() {
			var e = Y;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function N(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key") {
					t === null && (t = wr(e, n.mode, 0), t._debugInfo = Y, t.return = n), A(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function Vi(e) {
			var t = Wv;
			return Wv += 1, Uv === null && (Uv = Ni()), Fi(Uv, e, t);
		}
		function Hi(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function Ui(e, t) {
			throw t.$$typeof === Af ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function Wi(e, t) {
			var n = Bi();
			n === null ? Ui(e, t) : n.run(Ui.bind(null, e, t));
		}
		function Gi(e, t) {
			var n = E(e) || "Component";
			Jv[n] || (Jv[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function Ki(e, t) {
			var n = Bi();
			n === null ? Gi(e, t) : n.run(Gi.bind(null, e, t));
		}
		function qi(e, t) {
			var n = E(e) || "Component";
			Yv[n] || (Yv[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function Ji(e, t) {
			var n = Bi();
			n === null ? qi(e, t) : n.run(qi.bind(null, e, t));
		}
		function Yi(e) {
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
				return e = xr(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 67108866), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = Er(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === Nf ? (t = u(e, t, n.props.children, r, n.key), N(n, t, e), t) : t !== null && (t.elementType === a || gr(t, n) || typeof a == "object" && a && a.$$typeof === Hf && Ii(a) === t.type) ? (t = i(t, n.props), Hi(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = Y, t) : (t = wr(n, e.mode, r), Hi(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Or(n, e.mode, r), t.return = e, t._debugInfo = Y, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = Y, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Tr(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Er("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case jf: return n = wr(t, e.mode, n), Hi(n, t), n.return = e, e = zi(t._debugInfo), n._debugInfo = Y, Y = e, n;
						case Mf: return t = Or(t, e.mode, n), t.return = e, t._debugInfo = Y, t;
						case Hf:
							var r = zi(t._debugInfo);
							return t = Ii(t), e = d(e, t, n), Y = r, e;
					}
					if (qf(t) || re(t)) return n = Tr(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = zi(t._debugInfo), n._debugInfo = Y, Y = e, n;
					if (typeof t.then == "function") return r = zi(t._debugInfo), e = d(e, Vi(t), n), Y = r, e;
					if (t.$$typeof === Lf) return d(e, ri(e, t), n);
					Wi(e, t);
				}
				return typeof t == "function" && Ki(e, t), typeof t == "symbol" && Ji(e, t), null;
			}
			function f(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case jf: return n.key === i ? (i = zi(n._debugInfo), e = c(e, t, n, r), Y = i, e) : null;
						case Mf: return n.key === i ? l(e, t, n, r) : null;
						case Hf: return i = zi(n._debugInfo), n = Ii(n), e = f(e, t, n, r), Y = i, e;
					}
					if (qf(n) || re(n)) return i === null ? (i = zi(n._debugInfo), e = u(e, t, n, r, null), Y = i, e) : null;
					if (typeof n.then == "function") return i = zi(n._debugInfo), e = f(e, t, Vi(n), r), Y = i, e;
					if (n.$$typeof === Lf) return f(e, t, ri(e, n), r);
					Wi(e, n);
				}
				return typeof n == "function" && Ki(e, n), typeof n == "symbol" && Ji(e, n), null;
			}
			function m(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case jf: return n = e.get(r.key === null ? n : r.key) || null, e = zi(r._debugInfo), t = c(t, n, r, i), Y = e, t;
						case Mf: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Hf:
							var a = zi(r._debugInfo);
							return r = Ii(r), t = m(e, t, n, r, i), Y = a, t;
					}
					if (qf(r) || re(r)) return n = e.get(n) || null, e = zi(r._debugInfo), t = u(t, n, r, i, null), Y = e, t;
					if (typeof r.then == "function") return a = zi(r._debugInfo), t = m(e, t, n, Vi(r), i), Y = a, t;
					if (r.$$typeof === Lf) return m(e, t, n, ri(t, r), i);
					Wi(t, r);
				}
				return typeof r == "function" && Ki(t, r), typeof r == "symbol" && Ji(t, r), null;
			}
			function h(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case jf:
					case Mf:
						p(e, t, n);
						var i = n.key;
						if (typeof i != "string") break;
						if (r === null) {
							r = /* @__PURE__ */ new Set(), r.add(i);
							break;
						}
						if (!r.has(i)) {
							r.add(i);
							break;
						}
						A(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case Hf: n = Ii(n), h(e, t, n, r);
				}
				return r;
			}
			function _(i, o, s, c) {
				for (var l = null, u = null, p = null, g = o, _ = o = 0, v = null; g !== null && _ < s.length; _++) {
					g.index > _ ? (v = g, g = null) : v = g.sibling;
					var y = f(i, g, s[_], c);
					if (y === null) {
						g === null && (g = v);
						break;
					}
					l = h(i, y, s[_], l), e && g && y.alternate === null && t(i, g), o = a(y, o, _), p === null ? u = y : p.sibling = y, p = y, g = v;
				}
				if (_ === s.length) return n(i, g), K && Ar(i, _), u;
				if (g === null) {
					for (; _ < s.length; _++) g = d(i, s[_], c), g !== null && (l = h(i, g, s[_], l), o = a(g, o, _), p === null ? u = g : p.sibling = g, p = g);
					return K && Ar(i, _), u;
				}
				for (g = r(g); _ < s.length; _++) v = m(g, i, _, s[_], c), v !== null && (l = h(i, v, s[_], l), e && v.alternate !== null && g.delete(v.key === null ? _ : v.key), o = a(v, o, _), p === null ? u = v : p.sibling = v, p = v);
				return e && g.forEach(function(e) {
					return t(i, e);
				}), K && Ar(i, _), u;
			}
			function v(i, o, s, c) {
				if (s == null) throw Error("An iterable object provided no iterator.");
				for (var l = null, u = null, p = o, g = o = 0, _ = null, v = null, y = s.next(); p !== null && !y.done; g++, y = s.next()) {
					p.index > g ? (_ = p, p = null) : _ = p.sibling;
					var b = f(i, p, y.value, c);
					if (b === null) {
						p === null && (p = _);
						break;
					}
					v = h(i, b, y.value, v), e && p && b.alternate === null && t(i, p), o = a(b, o, g), u === null ? l = b : u.sibling = b, u = b, p = _;
				}
				if (y.done) return n(i, p), K && Ar(i, g), l;
				if (p === null) {
					for (; !y.done; g++, y = s.next()) p = d(i, y.value, c), p !== null && (v = h(i, p, y.value, v), o = a(p, o, g), u === null ? l = p : u.sibling = p, u = p);
					return K && Ar(i, g), l;
				}
				for (p = r(p); !y.done; g++, y = s.next()) _ = m(p, i, g, y.value, c), _ !== null && (v = h(i, _, y.value, v), e && _.alternate !== null && p.delete(_.key === null ? g : _.key), o = a(_, o, g), u === null ? l = _ : u.sibling = _, u = _);
				return e && p.forEach(function(e) {
					return t(i, e);
				}), K && Ar(i, g), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === Nf && a.key === null && (N(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case jf:
							var c = zi(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === Nf) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, N(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || gr(r, a) || typeof l == "object" && l && l.$$typeof === Hf && Ii(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), Hi(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, e = s;
											break a;
										}
										n(e, r);
										break;
									}
									t(e, r), r = r.sibling;
								}
								a.type === Nf ? (s = Tr(a.props.children, e.mode, s, a.key), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, N(a, s, e), e = s) : (s = wr(a, e.mode, s), Hi(s, a), s.return = e, s._debugInfo = Y, e = s);
							}
							return e = o(e), Y = c, e;
						case Mf:
							a: {
								for (c = a, a = c.key; r !== null;) {
									if (r.key === a) if (r.tag === 4 && r.stateNode.containerInfo === c.containerInfo && r.stateNode.implementation === c.implementation) {
										n(e, r.sibling), s = i(r, c.children || []), s.return = e, e = s;
										break a;
									} else {
										n(e, r);
										break;
									}
									t(e, r), r = r.sibling;
								}
								s = Or(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case Hf: return c = zi(a._debugInfo), a = Ii(a), e = y(e, r, a, s), Y = c, e;
					}
					if (qf(a)) return c = zi(a._debugInfo), e = _(e, r, a, s), Y = c, e;
					if (re(a)) {
						if (c = zi(a._debugInfo), l = re(a), typeof l != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						var u = l.call(a);
						return u === a ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(u) !== "[object Generator]") && (Kv || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), Kv = !0) : a.entries !== l || Gv || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Gv = !0), e = v(e, r, u, s), Y = c, e;
					}
					if (typeof a.then == "function") return c = zi(a._debugInfo), e = y(e, r, Vi(a), s), Y = c, e;
					if (a.$$typeof === Lf) return y(e, r, ri(e, a), s);
					Wi(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = Er(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, e = s), o(e)) : (typeof a == "function" && Ki(e, a), typeof a == "symbol" && Ji(e, a), n(e, r));
			}
			return function(e, t, n, r) {
				var i = Y;
				Y = null;
				try {
					Wv = 0;
					var a = y(e, t, n, r);
					return Uv = null, a;
				} catch (t) {
					if (t === Lv || t === zv) throw t;
					var o = g(29, t, null, e.mode);
					o.lanes = r, o.return = e;
					var s = o._debugInfo = Y;
					if (o._debugOwner = e._debugOwner, o._debugTask = e._debugTask, s != null) {
						for (var c = s.length - 1; 0 <= c; c--) if (typeof s[c].stack == "string") {
							o._debugOwner = s[c], o._debugTask = s[c].debugTask;
							break;
						}
					}
					return o;
				} finally {
					Y = i;
				}
			};
		}
		function Xi(e, t) {
			var n = qf(e);
			return e = !n && typeof re(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function Zi(e) {
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
		function Qi(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function $i(e) {
			return {
				lane: e,
				tag: Qv,
				payload: null,
				callback: null,
				next: null
			};
		}
		function ea(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, iy === r && !ry) {
				var i = E(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), ry = !0;
			}
			return (Ub & Pb) === Nb ? (lr(e, r, t, n), pr(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = pr(e), fr(e, null, n), t);
		}
		function ta(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, ze(e, n);
			}
		}
		function na(e, t) {
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
		function ra() {
			if (ay) {
				var e = ov;
				if (e !== null) throw e;
			}
		}
		function ia(e, t, n, r) {
			ay = !1;
			var i = e.updateQueue;
			ny = !1, iy = i.shared;
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
					if (p ? ($ & f) === f : (r & f) === f) {
						f !== 0 && f === av && (ay = !0), u !== null && (u = u.next = {
							lane: 0,
							tag: s.tag,
							payload: s.payload,
							callback: null,
							next: null
						});
						a: {
							f = e;
							var m = s, h = t, g = n;
							switch (m.tag) {
								case $v:
									if (m = m.payload, typeof m == "function") {
										u_ = !0;
										var _ = m.call(g, d, h);
										if (f.mode & Rg) {
											Oe(!0);
											try {
												m.call(g, d, h);
											} finally {
												Oe(!1);
											}
										}
										u_ = !1, d = _;
										break a;
									}
									d = m;
									break a;
								case ty: f.flags = f.flags & -65537 | 128;
								case Qv:
									if (_ = m.payload, typeof _ == "function") {
										if (u_ = !0, m = _.call(g, d, h), f.mode & Rg) {
											Oe(!0);
											try {
												_.call(g, d, h);
											} finally {
												Oe(!1);
											}
										}
										u_ = !1;
									} else m = _;
									if (m == null) break a;
									d = B({}, d, m);
									break a;
								case ey: ny = !0;
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
				u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), cx |= o, e.lanes = o, e.memoizedState = d;
			}
			iy = null;
		}
		function aa(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function oa(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) aa(n[e], t);
		}
		function sa(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) aa(n[e], t);
		}
		function ca(e, t) {
			var n = ox;
			D(sy, n, e), D(oy, t, e), ox = n | t.baseLanes;
		}
		function la(e) {
			D(sy, ox, e), D(oy, oy.current, e);
		}
		function ua(e) {
			ox = sy.current, ae(oy, e), ae(sy, e);
		}
		function da(e) {
			var t = e.alternate;
			D(fy, fy.current & uy, e), D(cy, e, e), ly === null && (t === null || oy.current !== null || t.memoizedState !== null) && (ly = e);
		}
		function fa(e) {
			D(fy, fy.current, e), D(cy, e, e), ly === null && (ly = e);
		}
		function pa(e) {
			e.tag === 22 ? (D(fy, fy.current, e), D(cy, e, e), ly === null && (ly = e)) : ma(e);
		}
		function ma(e) {
			D(fy, fy.current, e), D(cy, cy.current, e);
		}
		function ha(e) {
			ae(cy, e), ly === e && (ly = null), ae(fy, e);
		}
		function ga(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || hd(n) || gd(n))) return t;
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
		function P() {
			var e = Z;
			Py === null ? Py = [e] : Py.push(e);
		}
		function F() {
			var e = Z;
			if (Py !== null && (Fy++, Py[Fy] !== e)) {
				var t = E(X);
				if (!yy.has(t) && (yy.add(t), Py !== null)) {
					for (var n = "", r = 0; r <= Fy; r++) {
						var i = Py[r], a = r === Fy ? e : i;
						for (i = r + 1 + ". " + i; 30 > i.length;) i += " ";
						i += a + "\n", n += i;
					}
					console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", t, n);
				}
			}
		}
		function _a(e) {
			e == null || qf(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
		}
		function va() {
			var e = E(X);
			Sy.has(e) || (Sy.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function ya() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function ba(e, t) {
			if (Iy) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!Wh(e[n], t[n])) return !1;
			return !0;
		}
		function xa(e, t, n, r, i, a) {
			Cy = a, X = t, Py = e === null ? null : e._debugHookTypes, Fy = -1, Iy = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = E(X), xy.has(a) || (xy.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, V.H = e !== null && e.memoizedState !== null ? By : Py === null ? Ry : zy, Oy = a = (t.mode & Rg) !== W;
			var o = bv(n, r, i);
			if (Oy = !1, Dy && (o = Ca(t, n, r, i)), a) {
				Oe(!0);
				try {
					o = Ca(t, n, r, i);
				} finally {
					Oe(!1);
				}
			}
			return Sa(e, t), o;
		}
		function Sa(e, t) {
			t._debugHookTypes = Py, t.dependencies === null ? jy !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: jy
			}) : t.dependencies._debugThenableState = jy, V.H = Ly;
			var n = wy !== null && wy.next !== null;
			if (Cy = 0, Py = Z = Ty = wy = X = null, Fy = -1, e !== null && (e.flags & 65011712) != (t.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Ey = !1, Ay = 0, jy = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || ob || (e = e.dependencies, e !== null && ei(e) && (ob = !0)), Hv ? (Hv = !1, e = !0) : e = !1, e && (t = E(t) || "Unknown", by.has(t) || xy.has(t) || (by.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Ca(e, t, n, r) {
			X = e;
			var i = 0;
			do {
				if (Dy && (jy = null), Ay = 0, Dy = !1, i >= Ny) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
				if (i += 1, Iy = !1, Ty = wy = null, e.updateQueue != null) {
					var a = e.updateQueue;
					a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
				}
				Fy = -1, V.H = Vy, a = bv(t, n, r);
			} while (Dy);
			return a;
		}
		function wa() {
			var e = V.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? ja(t) : t, e = e.useState()[0], (wy === null ? null : wy.memoizedState) !== e && (X.flags |= 1024), t;
		}
		function Ta() {
			var e = ky !== 0;
			return ky = 0, e;
		}
		function Ea(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & zg) === W ? t.flags & -2053 : t.flags & -402655237, e.lanes &= ~n;
		}
		function Da(e) {
			if (Ey) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Ey = !1;
			}
			Cy = 0, Py = Ty = wy = X = null, Fy = -1, Z = null, Dy = !1, Ay = ky = 0, jy = null;
		}
		function Oa() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Ty === null ? X.memoizedState = Ty = e : Ty = Ty.next = e, Ty;
		}
		function ka() {
			if (wy === null) {
				var e = X.alternate;
				e = e === null ? null : e.memoizedState;
			} else e = wy.next;
			var t = Ty === null ? X.memoizedState : Ty.next;
			if (t !== null) Ty = t, wy = e;
			else {
				if (e === null) throw X.alternate === null ? Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.") : Error("Rendered more hooks than during the previous render.");
				wy = e, e = {
					memoizedState: wy.memoizedState,
					baseState: wy.baseState,
					baseQueue: wy.baseQueue,
					queue: wy.queue,
					next: null
				}, Ty === null ? X.memoizedState = Ty = e : Ty = Ty.next = e;
			}
			return Ty;
		}
		function Aa() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function ja(e) {
			var t = Ay;
			return Ay += 1, jy === null && (jy = Ni()), e = Fi(jy, e, t), t = X, (Ty === null ? t.memoizedState : Ty.next) === null && (t = t.alternate, V.H = t !== null && t.memoizedState !== null ? By : Ry), e;
		}
		function Ma(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return ja(e);
				if (e.$$typeof === Lf) return ni(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function Na(e) {
			var t = null, n = X.updateQueue;
			if (n !== null && (t = n.memoCache), t == null) {
				var r = X.alternate;
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
			}, n === null && (n = Aa(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Iy) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Wf;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function Pa(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function Fa(e, t, n) {
			var r = Oa();
			if (n !== void 0) {
				var i = n(t);
				if (Oy) {
					Oe(!0);
					try {
						n(t);
					} finally {
						Oe(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Uo.bind(null, X, e), [r.memoizedState, e];
		}
		function Ia(e) {
			return La(ka(), wy, e);
		}
		function La(e, t, n) {
			var r = e.queue;
			if (r === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			r.lastRenderedReducer = n;
			var i = e.baseQueue, a = r.pending;
			if (a !== null) {
				if (i !== null) {
					var o = i.next;
					i.next = a.next, a.next = o;
				}
				t.baseQueue !== i && console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), t.baseQueue = i = a, r.pending = null;
			}
			if (a = e.baseState, i === null) e.memoizedState = a;
			else {
				t = i.next;
				var s = o = null, c = null, l = t, u = !1;
				do {
					var d = l.lane & -536870913;
					if (d === l.lane ? (Cy & d) === d : ($ & d) === d) {
						var f = l.revertLane;
						if (f === 0) c !== null && (c = c.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}), d === av && (u = !0);
						else if ((Cy & f) === f) {
							l = l.next, f === av && (u = !0);
							continue;
						} else d = {
							lane: 0,
							revertLane: l.revertLane,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}, c === null ? (s = c = d, o = a) : c = c.next = d, X.lanes |= f, cx |= f;
						d = l.action, Oy && n(a, d), a = l.hasEagerState ? l.eagerState : n(a, d);
					} else f = {
						lane: d,
						revertLane: l.revertLane,
						gesture: l.gesture,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}, c === null ? (s = c = f, o = a) : c = c.next = f, X.lanes |= d, cx |= d;
					l = l.next;
				} while (l !== null && l !== t);
				if (c === null ? o = a : c.next = s, !Wh(a, e.memoizedState) && (ob = !0, u && (n = ov, n !== null))) throw n;
				e.memoizedState = a, e.baseState = o, e.baseQueue = c, r.lastRenderedState = a;
			}
			return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
		}
		function Ra(e) {
			var t = ka(), n = t.queue;
			if (n === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			n.lastRenderedReducer = e;
			var r = n.dispatch, i = n.pending, a = t.memoizedState;
			if (i !== null) {
				n.pending = null;
				var o = i = i.next;
				do
					a = e(a, o.action), o = o.next;
				while (o !== i);
				Wh(a, t.memoizedState) || (ob = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
			}
			return [a, r];
		}
		function za(e, t, n) {
			var r = X, i = Oa();
			if (K) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				vy || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), vy = !0);
			} else {
				if (a = t(), vy || (n = t(), Wh(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0)), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || Va(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, ho(Ua.bind(null, r, n, e), [e]), r.flags |= 2048, uo(my | _y, { destroy: void 0 }, Ha.bind(null, r, n, a, t), null), a;
		}
		function Ba(e, t, n) {
			var r = X, i = ka(), a = K;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !vy) {
				var o = t();
				Wh(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0);
			}
			if ((o = !Wh((wy || i).memoizedState, n)) && (i.memoizedState = n, ob = !0), i = i.queue, mo(2048, _y, Ua.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || Ty !== null && Ty.memoizedState.tag & my) {
				if (r.flags |= 2048, uo(my | _y, { destroy: void 0 }, Ha.bind(null, r, i, n, t), null), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || Cy & 127 || Va(r, t, n);
			}
			return n;
		}
		function Va(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = X.updateQueue, t === null ? (t = Aa(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function Ha(e, t, n, r) {
			t.value = n, t.getSnapshot = r, Wa(t) && Ga(e);
		}
		function Ua(e, t, n) {
			return n(function() {
				Wa(t) && (ci(2, "updateSyncExternalStore()", e), Ga(e));
			});
		}
		function Wa(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !Wh(e, n);
			} catch {
				return !0;
			}
		}
		function Ga(e) {
			var t = dr(e, 2);
			t !== null && nl(t, e, 2);
		}
		function Ka(e) {
			var t = Oa();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), Oy) {
					Oe(!0);
					try {
						n();
					} finally {
						Oe(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Pa,
				lastRenderedState: e
			}, t;
		}
		function qa(e) {
			e = Ka(e);
			var t = e.queue, n = Wo.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function Ja(e) {
			var t = Oa();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ko.bind(null, X, !0, n), n.dispatch = t, [e, t];
		}
		function Ya(e, t) {
			return Xa(ka(), wy, e, t);
		}
		function Xa(e, t, n, r) {
			return e.baseState = n, La(e, wy, typeof r == "function" ? r : Pa);
		}
		function Za(e, t) {
			var n = ka();
			return wy === null ? (n.baseState = e, [e, n.queue.dispatch]) : Xa(n, wy, e, t);
		}
		function Qa(e, t, n, r, i) {
			if (qo(e)) throw Error("Cannot update form state while rendering.");
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
				V.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, $a(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function $a(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = V.T, o = {};
				o._updatedFibers = /* @__PURE__ */ new Set(), V.T = o;
				try {
					var s = n(i, r), c = V.S;
					c !== null && c(o, s), eo(e, t, s);
				} catch (n) {
					no(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), V.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), eo(e, t, o);
			} catch (n) {
				no(e, t, n);
			}
		}
		function eo(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (V.asyncTransitions++, n.then(jo, jo), n.then(function(n) {
				to(e, t, n);
			}, function(n) {
				return no(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : to(e, t, n);
		}
		function to(e, t, n) {
			t.status = "fulfilled", t.value = n, ro(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, $a(e, n)));
		}
		function no(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, ro(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function ro(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function io(e, t) {
			return t;
		}
		function ao(e, t) {
			if (K) {
				var n = Wb.formState;
				if (n !== null) {
					a: {
						var r = X;
						if (K) {
							if ($g) {
								b: {
									for (var i = $g, a = r_; i.nodeType !== 8;) {
										if (!a) {
											i = null;
											break b;
										}
										if (i = vd(i.nextSibling), i === null) {
											i = null;
											break b;
										}
									}
									a = i.data, i = a === zS || a === BS ? i : null;
								}
								if (i) {
									$g = vd(i.nextSibling), r = i.data === zS;
									break a;
								}
							}
							Br(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = Oa(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: io,
				lastRenderedState: t
			}, n.queue = r, n = Wo.bind(null, X, r), r.dispatch = n, r = Ka(!1), a = Ko.bind(null, X, !1, r.queue), r = Oa(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = Qa.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function oo(e) {
			return so(ka(), wy, e);
		}
		function so(e, t, n) {
			if (t = La(e, t, io)[0], e = Ia(Pa)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = ja(t);
			} catch (e) {
				throw e === Lv ? zv : e;
			}
			else r = t;
			t = ka();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (X.flags |= 2048, uo(my | _y, { destroy: void 0 }, co.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function co(e, t) {
			e.action = t;
		}
		function lo(e) {
			var t = ka(), n = wy;
			if (n !== null) return so(t, n, e);
			ka(), t = t.memoizedState, n = ka();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function uo(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = X.updateQueue, t === null && (t = Aa(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function fo(e) {
			var t = Oa();
			return e = { current: e }, t.memoizedState = e;
		}
		function po(e, t, n, r) {
			var i = Oa();
			X.flags |= e, i.memoizedState = uo(my | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function mo(e, t, n, r) {
			var i = ka();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			wy !== null && r !== null && ba(r, wy.memoizedState.deps) ? i.memoizedState = uo(t, a, n, r) : (X.flags |= e, i.memoizedState = uo(my | t, a, n, r));
		}
		function ho(e, t) {
			(X.mode & zg) === W ? po(8390656, _y, e, t) : po(276826112, _y, e, t);
		}
		function go(e) {
			X.flags |= 4;
			var t = X.updateQueue;
			if (t === null) t = Aa(), X.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function _o(e) {
			var t = Oa(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function I(e) {
			var t = ka().memoizedState;
			return go({
				ref: t,
				nextImpl: e
			}), function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function vo(e, t) {
			var n = 4194308;
			return (X.mode & zg) !== W && (n |= 134217728), po(n, gy, e, t);
		}
		function yo(e, t) {
			if (typeof t == "function") {
				e = e();
				var n = t(e);
				return function() {
					typeof n == "function" ? n() : t(null);
				};
			}
			if (t != null) return t.hasOwnProperty("current") || console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(t).join(", ") + "}"), e = e(), t.current = e, function() {
				t.current = null;
			};
		}
		function bo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(X.mode & zg) !== W && (r |= 134217728), po(r, gy, yo.bind(null, t, e), n);
		}
		function xo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), mo(4, gy, yo.bind(null, t, e), n);
		}
		function So(e, t) {
			return Oa().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function Co(e, t) {
			var n = ka();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && ba(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function wo(e, t) {
			var n = Oa();
			t = t === void 0 ? null : t;
			var r = e();
			if (Oy) {
				Oe(!0);
				try {
					e();
				} finally {
					Oe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function To(e, t) {
			var n = ka();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && ba(t, r[1])) return r[0];
			if (r = e(), Oy) {
				Oe(!0);
				try {
					e();
				} finally {
					Oe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function Eo(e, t) {
			return ko(Oa(), e, t);
		}
		function Do(e, t) {
			return Ao(ka(), wy.memoizedState, e, t);
		}
		function Oo(e, t) {
			var n = ka();
			return wy === null ? ko(n, e, t) : Ao(n, wy.memoizedState, e, t);
		}
		function ko(e, t, n) {
			return n === void 0 || Cy & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = tl(), X.lanes |= e, cx |= e, n);
		}
		function Ao(e, t, n, r) {
			return Wh(n, t) ? n : oy.current === null ? !(Cy & 42) || Cy & 1073741824 && !($ & 261930) ? (ob = !0, e.memoizedState = n) : (e = tl(), X.lanes |= e, cx |= e, t) : (e = ko(e, n, r), Wh(e, t) || (ob = !0), e);
		}
		function jo() {
			V.asyncTransitions--;
		}
		function Mo(e, t, n, r, i) {
			var a = Jf.p;
			Jf.p = a !== 0 && a < Hp ? a : Hp;
			var o = V.T, s = {};
			s._updatedFibers = /* @__PURE__ */ new Set(), V.T = s, Ko(e, !1, t, n);
			try {
				var c = i(), l = V.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					V.asyncTransitions++, c.then(jo, jo);
					var u = ki(c, r);
					Go(e, t, u, el(e));
				} else Go(e, t, r, el(e));
			} catch (n) {
				Go(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, el(e));
			} finally {
				Jf.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), V.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function No(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = Po(e).queue;
			li(e), Mo(e, i, t, yC, n === null ? d : function() {
				return Fo(e), n(r);
			});
		}
		function Po(e) {
			var t = e.memoizedState;
			if (t !== null) return t;
			t = {
				memoizedState: yC,
				baseState: yC,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Pa,
					lastRenderedState: yC
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
					lastRenderedReducer: Pa,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function Fo(e) {
			V.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = Po(e);
			t.next === null && (t = e.alternate.memoizedState), Go(e, t.next.queue, {}, el(e));
		}
		function Io() {
			var e = Ka(!1);
			return e = Mo.bind(null, X, e.queue, !0, !1), Oa().memoizedState = e, [!1, e];
		}
		function Lo() {
			var e = Ia(Pa)[0], t = ka().memoizedState;
			return [typeof e == "boolean" ? e : ja(e), t];
		}
		function Ro() {
			var e = Ra(Pa)[0], t = ka().memoizedState;
			return [typeof e == "boolean" ? e : ja(e), t];
		}
		function zo() {
			return ni(bC);
		}
		function Bo() {
			var e = Oa(), t = Wb.identifierPrefix;
			if (K) {
				var n = Zg, r = Xg;
				n = (r & ~(1 << 32 - Fp(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = ky++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = My++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function Vo() {
			return Oa().memoizedState = Ho.bind(null, X);
		}
		function Ho(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = el(n), i = $i(r), a = ea(n, i, r);
						a !== null && (ci(r, "refresh()", e), nl(a, n, r), ta(a, n, r)), e = ai(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function Uo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = el(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			qo(e) ? Jo(t, i) : (i = ur(e, t, i, r), i !== null && (ci(r, "dispatch()", e), nl(i, e, r), Yo(i, t, r)));
		}
		function Wo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = el(e), Go(e, t, n, r) && ci(r, "setState()", e);
		}
		function Go(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (qo(e)) Jo(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = V.H;
					V.H = Uy;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, Wh(c, s)) return lr(e, t, i, 0), Wb === null && cr(), !1;
					} catch {} finally {
						V.H = o;
					}
				}
				if (n = ur(e, t, i, r), n !== null) return nl(n, e, r), Yo(n, t, r), !0;
			}
			return !1;
		}
		function Ko(e, t, n, r) {
			if (V.T === null && av === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: ru(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, qo(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = ur(e, n, r, 2), t !== null && (ci(2, "setOptimistic()", e), nl(t, e, 2));
		}
		function qo(e) {
			var t = e.alternate;
			return e === X || t !== null && t === X;
		}
		function Jo(e, t) {
			Dy = Ey = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function Yo(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, ze(e, n);
			}
		}
		function Xo(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				tb.has(t) || (tb.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function Zo(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Rg) {
				Oe(!0);
				try {
					a = n(r, i);
				} finally {
					Oe(!1);
				}
			}
			a === void 0 && (t = w(t) || "Component", Zy.has(t) || (Zy.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : B({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function Qo(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Rg) {
					Oe(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Oe(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", w(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !Pn(n, r) || !Pn(i, a) : !0;
		}
		function $o(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = E(e) || "Component", Ky.has(e) || (Ky.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), nb.enqueueReplaceState(t, t.state, null));
		}
		function es(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = B({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function ts(e) {
			fg(e), console.warn("%s\n\n%s\n", rb ? "An error occurred in the <" + rb + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function ns(e) {
			var t = rb ? "The above error occurred in the <" + rb + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((ib || "Anonymous") + ".");
			if (typeof e == "object" && e && typeof e.environmentName == "string") {
				var r = e.environmentName;
				e = [
					"%o\n\n%s\n\n%s\n",
					e,
					t,
					n
				].slice(0), typeof e[0] == "string" ? e.splice(0, 1, xC + " " + e[0], SC, wC + r + wC, CC) : e.splice(0, 0, xC, SC, wC + r + wC, CC), e.unshift(console), r = TC.apply(console.error, e), r();
			} else console.error("%o\n\n%s\n\n%s\n", e, t, n);
		}
		function rs(e) {
			fg(e);
		}
		function is(e, t) {
			try {
				rb = t.source ? E(t.source) : null, ib = null;
				var n = t.value;
				if (V.actQueue !== null) V.thrownErrors.push(n);
				else {
					var r = e.onUncaughtError;
					r(n, { componentStack: t.stack });
				}
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function as(e, t, n) {
			try {
				rb = n.source ? E(n.source) : null, ib = E(t);
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
		function os(e, t, n) {
			return n = $i(n), n.tag = ty, n.payload = { element: null }, n.callback = function() {
				A(t.source, is, e, t);
			}, n;
		}
		function ss(e) {
			return e = $i(e), e.tag = ty, e;
		}
		function cs(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					_r(n), A(r.source, as, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				_r(n), A(r.source, as, t, n, r), typeof i != "function" && (Cx === null ? Cx = /* @__PURE__ */ new Set([this]) : Cx.add(this)), Ov(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", E(n) || "Unknown");
			});
		}
		function ls(e, t, n, r, i) {
			if (n.flags |= 32768, Pp && Kl(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && $r(t, n, i, !0), K && (e_ = !0), n = cy.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13: return ly === null ? gl() : n.alternate === null && sx === Ib && (sx = zb), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Bv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Ll(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Bv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: /* @__PURE__ */ new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Ll(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return Ll(e, r, i), gl(), !1;
			}
			if (K) return e_ = !0, t = cy.current, t === null ? (r !== i_ && Kr(kr(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = kr(r, n), i = os(e.stateNode, r, i), na(e, i), sx !== Bb && (sx = Rb)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== i_ && Kr(kr(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = kr(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (px === null ? px = [a] : px.push(a), sx !== Bb && (sx = Rb), t === null) return !0;
			r = kr(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = os(n.stateNode, r, e), na(n, e), !1;
					case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (Cx === null || !Cx.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = ss(i), cs(i, e, n, r), na(n, i), !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function us(e, t, n, r) {
			t.child = e === null ? Zv(t, null, n, r) : Xv(t, e.child, n, r);
		}
		function ds(e, t, n, r, i) {
			n = n.render;
			var a = t.ref;
			if ("ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return ti(t), r = xa(e, t, n, o, a, i), s = Ta(), e !== null && !ob ? (Ea(e, t, i), Fs(e, t, i)) : (K && s && Mr(t), t.flags |= 1, us(e, t, r, i), t.child);
		}
		function fs(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !br(a) && a.defaultProps === void 0 && n.compare === null ? (n = mr(a), t.tag = 15, t.type = n, Ts(t, a), ps(e, t, n, r, i)) : (e = Cr(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !Is(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? Pn : n, n(o, r) && e.ref === t.ref) return Fs(e, t, i);
			}
			return t.flags |= 1, e = xr(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function ps(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (Pn(a, r) && e.ref === t.ref && t.type === e.type) if (ob = !1, t.pendingProps = r = a, Is(e, i)) e.flags & 131072 && (ob = !0);
				else return t.lanes = e.lanes, Fs(e, t, i);
			}
			return xs(e, t, n, r, i);
		}
		function ms(e, t, n, r) {
			var i = r.children, a = e === null ? null : e.memoizedState;
			if (e === null && t.stateNode === null && (t.stateNode = {
				_visibility: kg,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), r.mode === "hidden") {
				if (t.flags & 128) {
					if (a = a === null ? n : a.baseLanes | n, e !== null) {
						for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
						r = i & ~a;
					} else r = 0, t.child = null;
					return gs(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && ji(t, a === null ? null : a.cachePool), a === null ? la(t) : ca(t, a), pa(t);
				else return r = t.lanes = 536870912, gs(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && ji(t, null), la(t), ma(t)) : (ji(t, a.cachePool), ca(t, a), ma(t), t.memoizedState = null);
			return us(e, t, i, n), t.child;
		}
		function hs(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: kg,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function gs(e, t, n, r, i) {
			var a = Ai();
			return a = a === null ? null : {
				parent: m_._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && ji(t, null), la(t), pa(t), e !== null && $r(e, t, r, !0), t.childLanes = i, null;
		}
		function _s(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = As({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function vs(e, t, n) {
			return Xv(t, e.child, null, n), e = _s(t, t.pendingProps), e.flags |= 2, ha(t), t.memoizedState = null, e;
		}
		function ys(e, t, n) {
			var r = t.pendingProps, i = !!(t.flags & 128);
			if (t.flags &= -129, e === null) {
				if (K) {
					if (r.mode === "hidden") return e = _s(t, r), t.lanes = 536870912, hs(null, e);
					if (fa(t), (e = $g) ? (n = md(e, r_), n = n !== null && n.data === kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Pr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Dr(n), r.return = t, t.child = r, Qg = t, $g = null)) : n = null, n === null) throw zr(t, e), Br(t);
					return t.lanes = 536870912, null;
				}
				return _s(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (fa(t), i) if (t.flags & 256) t.flags &= -257, t = vs(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				else if (Rr(), n & 536870912 && hl(t), ob || $r(e, t, n, !1), i = (n & e.childLanes) !== 0, ob || i) {
					if (r = Wb, r !== null && (o = Be(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, dr(e, o), nl(r, e, o), ab;
					gl(), t = vs(e, t, n);
				} else e = a.treeContext, $g = vd(o.nextSibling), Qg = t, K = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Fr(t, e), t = _s(t, r), t.flags |= 4096;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && hl(t), e = xr(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function bs(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function xs(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = w(n) || "Unknown";
				sb[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), sb[a] = !0);
			}
			return t.mode & Rg && lv.recordLegacyContextWarning(t, null), e === null && (Ts(t, t.type), n.contextTypes && (a = w(n) || "Unknown", lb[a] || (lb[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), ti(t), n = xa(e, t, n, r, void 0, i), r = Ta(), e !== null && !ob ? (Ea(e, t, i), Fs(e, t, i)) : (K && r && Mr(t), t.flags |= 1, us(e, t, n, i), t.child);
		}
		function Ss(e, t, n, r, i, a) {
			return ti(t), Fy = -1, Iy = e !== null && e.type !== t.type, t.updateQueue = null, n = Ca(t, r, n, i), Sa(e, t), r = Ta(), e !== null && !ob ? (Ea(e, t, a), Fs(e, t, a)) : (K && r && Mr(t), t.flags |= 1, us(e, t, n, a), t.child);
		}
		function Cs(e, t, n, r, i) {
			switch (s(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var c = i & -i;
					if (t.lanes |= c, o = Wb, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					c = ss(c), cs(c, o, t, kr(a, t)), na(t, c);
			}
			if (ti(t), t.stateNode === null) {
				if (o = Pg, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== Lf) && !eb.has(n) && (eb.add(n), c = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === If ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", w(n) || "Component", c)), typeof a == "object" && a && (o = ni(a)), a = new n(r, o), t.mode & Rg) {
					Oe(!0);
					try {
						a = new n(r, o);
					} finally {
						Oe(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = nb, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = Gy, typeof n.getDerivedStateFromProps == "function" && o === null && (o = w(n) || "Component", qy.has(o) || (qy.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var l = c = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? c = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (c = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? l = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (l = "UNSAFE_componentWillUpdate"), o !== null || c !== null || l !== null) {
						a = w(n) || "Component";
						var u = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						Yy.has(a) || (Yy.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, u, o === null ? "" : "\n  " + o, c === null ? "" : "\n  " + c, l === null ? "" : "\n  " + l));
					}
				}
				a = t.stateNode, o = w(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !$y.has(n) && ($y.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !Qy.has(n) && (Qy.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", w(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), c = a.props !== r, a.props !== void 0 && c && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || Jy.has(n) || (Jy.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", w(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (c = a.state) && (typeof c != "object" || qf(c)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Zi(t), o = n.contextType, a.context = typeof o == "object" && o ? ni(o) : Pg, a.state === r && (o = w(n) || "Component", Xy.has(o) || (Xy.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Rg && lv.recordLegacyContextWarning(t, a), lv.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Zo(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", E(t) || "Component"), nb.enqueueReplaceState(a, a.state, null)), ia(t, r, a, i), ra(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zg) !== W && (t.flags |= 134217728), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				c = es(n, d), a.props = c;
				var f = a.context;
				l = n.contextType, o = Pg, typeof l == "object" && l && (o = ni(l)), u = n.getDerivedStateFromProps, l = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, l || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && $o(t, a, r, o), ny = !1;
				var p = t.memoizedState;
				a.state = p, ia(t, r, a, i), ra(), f = t.memoizedState, d || p !== f || ny ? (typeof u == "function" && (Zo(t, n, u, r), f = t.memoizedState), (c = ny || Qo(t, n, c, r, p, f, o)) ? (l || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zg) !== W && (t.flags |= 134217728)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zg) !== W && (t.flags |= 134217728), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zg) !== W && (t.flags |= 134217728), a = !1);
			} else {
				a = t.stateNode, Qi(e, t), o = t.memoizedProps, l = es(n, o), a.props = l, u = t.pendingProps, p = a.context, f = n.contextType, c = Pg, typeof f == "object" && f && (c = ni(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== u || p !== c) && $o(t, a, r, c), ny = !1, p = t.memoizedState, a.state = p, ia(t, r, a, i), ra();
				var m = t.memoizedState;
				o !== u || p !== m || ny || e !== null && e.dependencies !== null && ei(e.dependencies) ? (typeof d == "function" && (Zo(t, n, d, r), m = t.memoizedState), (l = ny || Qo(t, n, l, r, p, m, c) || e !== null && e.dependencies !== null && ei(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = c, a = l) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (c = a, bs(e, t), o = !!(t.flags & 128), c || o) {
				if (c = t.stateNode, xe(t), o && typeof n.getDerivedStateFromError != "function") n = null, C_ = -1;
				else if (n = Sv(c), t.mode & Rg) {
					Oe(!0);
					try {
						Sv(c);
					} finally {
						Oe(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = Xv(t, e.child, null, i), t.child = Xv(t, null, n, i)) : us(e, t, n, i), t.memoizedState = c.state, e = t.child;
			} else e = Fs(e, t, i);
			return i = t.stateNode, a && i.props !== r && (db || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", E(t) || "a component"), db = !0), e;
		}
		function ws(e, t, n, r) {
			return Wr(), t.flags |= 256, us(e, t, n, r), t.child;
		}
		function Ts(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = w(t) || "Unknown", ub[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), ub[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = w(t) || "Unknown", cb[t] || (console.error("%s: Function components do not support contextType.", t), cb[t] = !0));
		}
		function Es(e) {
			return {
				baseLanes: e,
				cachePool: Mi()
			};
		}
		function Ds(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= dx), e;
		}
		function Os(e, t, n) {
			var r, i = t.pendingProps;
			o(t) && (t.flags |= 128);
			var a = !1, s = !!(t.flags & 128);
			if ((r = s) || (r = e !== null && e.memoizedState === null ? !1 : (fy.current & dy) !== 0), r && (a = !0, t.flags &= -129), r = !!(t.flags & 32), t.flags &= -33, e === null) {
				if (K) {
					if (a ? da(t) : ma(t), (e = $g) ? (n = md(e, r_), n = n !== null && n.data !== kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Pr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Dr(n), r.return = t, t.child = r, Qg = t, $g = null)) : n = null, n === null) throw zr(t, e), Br(t);
					return gd(n) ? t.lanes = 32 : t.lanes = 536870912, null;
				}
				var c = i.children;
				if (i = i.fallback, a) {
					ma(t);
					var l = t.mode;
					return c = As({
						mode: "hidden",
						children: c
					}, l), i = Tr(i, l, n, null), c.return = t, i.return = t, c.sibling = i, t.child = c, i = t.child, i.memoizedState = Es(n), i.childLanes = Ds(e, r, n), t.memoizedState = mb, hs(null, i);
				}
				return da(t), ks(t, c);
			}
			var u = e.memoizedState;
			if (u !== null) {
				var d = u.dehydrated;
				if (d !== null) {
					if (s) t.flags & 256 ? (da(t), t.flags &= -257, t = js(e, t, n)) : t.memoizedState === null ? (ma(t), c = i.fallback, l = t.mode, i = As({
						mode: "visible",
						children: i.children
					}, l), c = Tr(c, l, n, null), c.flags |= 2, i.return = t, c.return = t, i.sibling = c, t.child = i, Xv(t, e.child, null, n), i = t.child, i.memoizedState = Es(n), i.childLanes = Ds(e, r, n), t.memoizedState = mb, t = hs(null, i)) : (ma(t), t.child = e.child, t.flags |= 128, t = null);
					else if (da(t), Rr(), n & 536870912 && hl(t), gd(d)) {
						if (r = d.nextSibling && d.nextSibling.dataset, r) {
							c = r.dgst;
							var f = r.msg;
							l = r.stck;
							var p = r.cstck;
						}
						a = f, r = c, i = l, d = p, c = a, l = d, c = Error(c || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), c.stack = i || "", c.digest = r, r = l === void 0 ? null : l, i = {
							value: c,
							source: null,
							stack: r
						}, typeof r == "string" && Hg.set(c, i), Kr(i), t = js(e, t, n);
					} else if (ob || $r(e, t, n, !1), r = (n & e.childLanes) !== 0, ob || r) {
						if (r = Wb, r !== null && (i = Be(r, n), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, dr(e, i), nl(r, e, i), ab;
						hd(d) || gl(), t = js(e, t, n);
					} else hd(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = u.treeContext, $g = vd(d.nextSibling), Qg = t, K = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Fr(t, e), t = ks(t, i.children), t.flags |= 4096);
					return t;
				}
			}
			return a ? (ma(t), c = i.fallback, l = t.mode, p = e.child, d = p.sibling, i = xr(p, {
				mode: "hidden",
				children: i.children
			}), i.subtreeFlags = p.subtreeFlags & 65011712, d === null ? (c = Tr(c, l, n, null), c.flags |= 2) : c = xr(d, c), c.return = t, i.return = t, i.sibling = c, t.child = i, hs(null, i), i = t.child, c = e.child.memoizedState, c === null ? c = Es(n) : (l = c.cachePool, l === null ? l = Mi() : (p = m_._currentValue, l = l.parent === p ? l : {
				parent: p,
				pool: p
			}), c = {
				baseLanes: c.baseLanes | n,
				cachePool: l
			}), i.memoizedState = c, i.childLanes = Ds(e, r, n), t.memoizedState = mb, hs(e.child, i)) : (u !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && hl(t), da(t), n = e.child, e = n.sibling, n = xr(n, {
				mode: "visible",
				children: i.children
			}), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function ks(e, t) {
			return t = As({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function As(e, t) {
			return e = g(22, e, null, t), e.lanes = 0, e;
		}
		function js(e, t, n) {
			return Xv(t, e.child, null, n), e = ks(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function Ms(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), Zr(e.return, t, n);
		}
		function Ns(e, t, n, r, i, a) {
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
		function Ps(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = fy.current;
			if ((r = (s & dy) !== 0) ? (s = s & uy | dy, t.flags |= 128) : s &= uy, D(fy, s, t), s = i ?? "null", i !== "forwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !fb[s]) if (fb[s] = !0, i == null) console.error("The default for the <SuspenseList revealOrder=\"...\"> prop is changing. To be future compatible you must explictly specify either \"independent\" (the current default), \"together\", \"forwards\" or \"legacy_unstable-backwards\".");
			else if (i === "backwards") console.error("The rendering order of <SuspenseList revealOrder=\"backwards\"> is changing. To be future compatible you must specify revealOrder=\"legacy_unstable-backwards\" instead.");
			else if (typeof i == "string") switch (i.toLowerCase()) {
				case "together":
				case "forwards":
				case "backwards":
				case "independent":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. Use lowercase \"%s\" instead.", i, i.toLowerCase());
					break;
				case "forward":
				case "backward":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use \"%ss\" instead.", i, i.toLowerCase());
					break;
				default: console.error("\"%s\" is not a supported revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			}
			else console.error("%s is not a supported value for revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			s = a ?? "null", pb[s] || (a == null ? (i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && (pb[s] = !0, console.error("The default for the <SuspenseList tail=\"...\"> prop is changing. To be future compatible you must explictly specify either \"visible\" (the current default), \"collapsed\" or \"hidden\".")) : a !== "visible" && a !== "collapsed" && a !== "hidden" ? (pb[s] = !0, console.error("\"%s\" is not a supported value for tail on <SuspenseList />. Did you mean \"visible\", \"collapsed\" or \"hidden\"?", a)) : i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && (pb[s] = !0, console.error("<SuspenseList tail=\"%s\" /> is only valid if revealOrder is \"forwards\" or \"backwards\". Did you mean to specify revealOrder=\"forwards\"?", a)));
			a: if ((i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && o != null && !1 !== o) if (qf(o)) {
				for (s = 0; s < o.length; s++) if (!Xi(o[s], s)) break a;
			} else if (s = re(o), typeof s == "function") {
				if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
					if (!Xi(c.value, l)) break a;
					l++;
				}
			} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			if (us(e, t, o, n), K ? (Ir(), o = Kg) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && Ms(e, n, t);
				else if (e.tag === 19) Ms(e, n, t);
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
					for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ga(e) === null && (i = n), n = n.sibling;
					n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ns(t, !1, i, n, a, o);
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && ga(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					Ns(t, !0, n, null, a, o);
					break;
				case "together":
					Ns(t, !1, null, null, void 0, o);
					break;
				default: t.memoizedState = null;
			}
			return t.child;
		}
		function Fs(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), C_ = -1, cx |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
				if ($r(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = xr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = xr(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function Is(e, t) {
			return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && ei(e)));
		}
		function Ls(e, t, n) {
			switch (t.tag) {
				case 3:
					se(t, t.stateNode.containerInfo), Yr(t, m_, e.memoizedState.cache), Wr();
					break;
				case 27:
				case 5:
					ce(t);
					break;
				case 4:
					se(t, t.stateNode.containerInfo);
					break;
				case 10:
					Yr(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, fa(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (da(t), e = Fs(e, t, n), e === null ? null : e.sibling) : Os(e, t, n) : (da(t), t.flags |= 128, null);
					da(t);
					break;
				case 19:
					var i = !!(e.flags & 128);
					if (r = (n & t.childLanes) !== 0, r ||= ($r(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return Ps(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), D(fy, fy.current, t), r) break;
					return null;
				case 22: return t.lanes = 0, ms(e, t, n, t.pendingProps);
				case 24: Yr(t, m_, e.memoizedState.cache);
			}
			return Fs(e, t, n);
		}
		function Rs(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = Cr(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
				var r = t.return;
				if (r === null) throw Error("Cannot swap the root fiber.");
				if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, n._debugInfo = t._debugInfo, t === r.child) r.child = n;
				else {
					var i = r.child;
					if (i === null) throw Error("Expected parent to have a child.");
					for (; i.sibling !== t;) if (i = i.sibling, i === null) throw Error("Expected to find the previous sibling.");
					i.sibling = n;
				}
				return t = r.deletions, t === null ? (r.deletions = [e], r.flags |= 16) : t.push(e), n.flags |= 2, n;
			}
			if (e !== null) if (e.memoizedProps !== t.pendingProps || t.type !== e.type) ob = !0;
			else {
				if (!Is(e, n) && !(t.flags & 128)) return ob = !1, Ls(e, t, n);
				ob = !!(e.flags & 131072);
			}
			else ob = !1, (r = K) && (Ir(), r = !!(t.flags & 1048576)), r && (r = t.index, Ir(), jr(t, Kg, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Ii(t.elementType), t.type = e, typeof e == "function") br(e) ? (r = es(e, r), t.tag = 1, t.type = e = mr(e), t = Cs(null, t, e, r, n)) : (t.tag = 0, Ts(t, e), t.type = e = mr(e), t = xs(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === Rf) {
								t.tag = 11, t.type = e = hr(e), t = ds(null, t, e, r, n);
								break a;
							}
							if (i === Vf) {
								t.tag = 14, t = fs(null, t, e, r, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Hf && (t = " Did you wrap a component in React.lazy() more than once?"), n = w(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return xs(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = es(r, t.pendingProps), Cs(e, t, r, i, n);
				case 3:
					a: {
						if (se(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, Qi(e, t), ia(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, Yr(t, m_, r), r !== a.cache && Qr(t, [m_], n, !0), ra(), r = o.element, a.isDehydrated) if (a = {
							element: r,
							isDehydrated: !1,
							cache: o.cache
						}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
							t = ws(e, t, r, n);
							break a;
						} else if (r !== i) {
							i = kr(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), Kr(i), t = ws(e, t, r, n);
							break a;
						} else {
							switch (e = t.stateNode.containerInfo, e.nodeType) {
								case 9:
									e = e.body;
									break;
								default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
							}
							for ($g = vd(e.firstChild), Qg = t, K = !0, n_ = null, e_ = !1, t_ = null, r_ = !0, n = Zv(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
						}
						else {
							if (Wr(), r === i) {
								t = Fs(e, t, n);
								break a;
							}
							us(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return bs(e, t), e === null ? (n = jd(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : K || (n = t.type, e = t.pendingProps, r = oe(tp.current), r = Bu(r).createElement(n), r[Kp] = t, r[qp] = e, Eu(r, n, e), Qe(r), t.stateNode = r) : t.memoizedState = jd(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return ce(t), e === null && K && (r = oe(tp.current), i = k(), r = t.stateNode = Ed(t.type, t.pendingProps, r, i, !1), e_ || (i = Iu(r, t.type, t.pendingProps, i), i !== null && (Lr(t, 0).serverProps = i)), Qg = t, r_ = !0, i = $g, ed(t.type) ? (nC = i, $g = vd(r.firstChild)) : $g = i), us(e, t, t.pendingProps.children, n), bs(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && K && (a = k(), r = Gt(t.type, a.ancestorInfo), i = $g, (o = !i) || (o = fd(i, t.type, t.pendingProps, r_), o === null ? a = !1 : (t.stateNode = o, e_ || (a = Iu(o, t.type, t.pendingProps, a), a !== null && (Lr(t, 0).serverProps = a)), Qg = t, $g = vd(o.firstChild), r_ = !1, a = !0), o = !a), o && (r && zr(t, i), Br(t))), ce(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Uu(i, a) ? r = null : o !== null && Uu(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = xa(e, t, wa, null, null, n), bC._currentValue = i), bs(e, t), us(e, t, r, n), t.child;
				case 6: return e === null && K && (n = t.pendingProps, e = k(), r = e.ancestorInfo.current, n = r == null || Kt(n, r.tag, e.ancestorInfo.implicitRootScope), e = $g, (r = !e) || (r = pd(e, t.pendingProps, r_), r === null ? r = !1 : (t.stateNode = r, Qg = t, $g = null, r = !0), r = !r), r && (n && zr(t, e), Br(t))), null;
				case 13: return Os(e, t, n);
				case 4: return se(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Xv(t, null, r, n) : us(e, t, r, n), t.child;
				case 11: return ds(e, t, t.type, t.pendingProps, n);
				case 7: return us(e, t, t.pendingProps, n), t.child;
				case 8: return us(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, us(e, t, t.pendingProps.children, n), t.child;
				case 10: return r = t.type, i = t.pendingProps, a = i.value, "value" in i || hb || (hb = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), Yr(t, r, a), us(e, t, i.children, n), t.child;
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), ti(t), i = ni(i), r = bv(r, i, void 0), t.flags |= 1, us(e, t, r, n), t.child;
				case 14: return fs(e, t, t.type, t.pendingProps, n);
				case 15: return ps(e, t, t.type, t.pendingProps, n);
				case 19: return Ps(e, t, n);
				case 31: return ys(e, t, n);
				case 22: return ms(e, t, n, t.pendingProps);
				case 24: return ti(t), r = ni(m_), e === null ? (i = Ai(), i === null && (i = Wb, a = ai(), i.pooledCache = a, oi(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, Zi(t), Yr(t, m_, i)) : ((e.lanes & n) !== 0 && (Qi(e, t), ia(t, null, null, n), ra()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, Yr(t, m_, r), r !== i.cache && Qr(t, [m_], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), Yr(t, m_, r))), us(e, t, t.pendingProps.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function zs(e) {
			e.flags |= 4;
		}
		function Bs(e, t, n, r, i) {
			if ((t = (e.mode & Bg) !== W) && (t = !1), t) {
				if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
				else if (fl()) e.flags |= 8192;
				else throw Vv = Bv, Rv;
			} else e.flags &= -16777217;
		}
		function Vs(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & sC) !== rC) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Gd(t)) if (fl()) e.flags |= 8192;
			else throw Vv = Bv, Rv;
		}
		function Hs(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Pe(), e.lanes |= t, fx |= t);
		}
		function Us(e, t) {
			if (!K) switch (e.tailMode) {
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
		function Ws(e) {
			var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
			if (t) if ((e.mode & G) !== W) {
				for (var i = e.selfBaseDuration, a = e.child; a !== null;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 65011712, r |= a.flags & 65011712, i += a.treeBaseDuration, a = a.sibling;
				e.treeBaseDuration = i;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
			else if ((e.mode & G) !== W) {
				i = e.actualDuration, a = e.selfBaseDuration;
				for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, i += o.actualDuration, a += o.treeBaseDuration, o = o.sibling;
				e.actualDuration = i, e.treeBaseDuration = a;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
			return e.subtreeFlags |= r, e.childLanes = n, t;
		}
		function Gs(e, t, n) {
			var r = t.pendingProps;
			switch (Nr(t), t.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return Ws(t), null;
				case 1: return Ws(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Xr(m_, t), O(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ur(t) ? (qr(), zs(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Gr())), Ws(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (zs(t), a === null ? (Ws(t), Bs(t, i, null, r, n)) : (Ws(t), Vs(t, a))) : a ? a === e.memoizedState ? (Ws(t), t.flags &= -16777217) : (zs(t), Ws(t), Vs(t, a)) : (e = e.memoizedProps, e !== r && zs(t), Ws(t), Bs(t, i, e, r, n)), null;
				case 27:
					if (le(t), n = oe(tp.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && zs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Ws(t), null;
						}
						e = k(), Ur(t) ? Vr(t, e) : (e = Ed(i, r, n, e, !0), t.stateNode = e, zs(t));
					}
					return Ws(t), null;
				case 5:
					if (le(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && zs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Ws(t), null;
						}
						var o = k();
						if (Ur(t)) Vr(t, o);
						else {
							switch (a = oe(tp.current), Gt(i, o.ancestorInfo), o = o.context, a = Bu(a), o) {
								case WS:
									a = a.createElementNS(Im, i);
									break;
								case GS:
									a = a.createElementNS(Fm, i);
									break;
								default: switch (i) {
									case "svg":
										a = a.createElementNS(Im, i);
										break;
									case "math":
										a = a.createElementNS(Fm, i);
										break;
									case "script":
										a = a.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
										break;
									case "select":
										a = typeof r.is == "string" ? a.createElement("select", { is: r.is }) : a.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
										break;
									default: a = typeof r.is == "string" ? a.createElement(i, { is: r.is }) : a.createElement(i), i.indexOf("-") === -1 && (i !== i.toLowerCase() && console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", i), Object.prototype.toString.call(a) !== "[object HTMLUnknownElement]" || _p.call(JS, i) || (JS[i] = !0, console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", i)));
								}
							}
							a[Kp] = t, a[qp] = r;
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
							a: switch (Eu(a, i, r), i) {
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
							r && zs(t);
						}
					}
					return Ws(t), Bs(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && zs(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = oe(tp.current), n = k(), Ur(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !e_, r = null, a = Qg, a !== null) switch (a.tag) {
								case 3:
									i && (i = bd(e, n, r), i !== null && (Lr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = bd(e, n, r), i !== null && (Lr(t, 0).serverProps = i));
							}
							e[Kp] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Cu(e.nodeValue, n)), e || Br(t, !0);
						} else i = n.ancestorInfo.current, i != null && Kt(r, i.tag, n.ancestorInfo.implicitRootScope), e = Bu(e).createTextNode(r), e[Kp] = t, t.stateNode = e;
					}
					return Ws(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = Ur(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Kp] = t, Ws(t), (t.mode & G) !== W && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else qr(), Wr(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, Ws(t), (t.mode & G) !== W && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = Gr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (ha(t), t) : (ha(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return Ws(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = Ur(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Kp] = t, Ws(t), (t.mode & G) !== W && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else qr(), Wr(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, Ws(t), (t.mode & G) !== W && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = Gr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (ha(t), t) : (ha(t), null);
					}
					return ha(t), t.flags & 128 ? (t.lanes = n, (t.mode & G) !== W && Ei(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Hs(t, t.updateQueue), Ws(t), (t.mode & G) !== W && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return O(t), e === null && uu(t.stateNode.containerInfo), Ws(t), null;
				case 10: return Xr(t.type, t), Ws(t), null;
				case 19:
					if (ae(fy, t), r = t.memoizedState, r === null) return Ws(t), null;
					if (i = !!(t.flags & 128), a = r.rendering, a === null) if (i) Us(r, !1);
					else {
						if (sx !== Ib || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (a = ga(e), a !== null) {
								for (t.flags |= 128, Us(r, !1), e = a.updateQueue, t.updateQueue = e, Hs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Sr(n, e), n = n.sibling;
								return D(fy, fy.current & uy | dy, t), K && Ar(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Sp() > yx && (t.flags |= 128, i = !0, Us(r, !1), t.lanes = 4194304);
					}
					else {
						if (!i) if (e = ga(a), e !== null) {
							if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Hs(t, e), Us(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !K) return Ws(t), null;
						} else 2 * Sp() - r.renderingStartTime > yx && n !== 536870912 && (t.flags |= 128, i = !0, Us(r, !1), t.lanes = 4194304);
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					return r.tail === null ? (Ws(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Sp(), e.sibling = null, n = fy.current, n = i ? n & uy | dy : n & uy, D(fy, n, t), K && Ar(t, r.treeForkCount), e);
				case 22:
				case 23: return ha(t), ua(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Ws(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ws(t), n = t.updateQueue, n !== null && Hs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ae(cv, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Xr(m_, t), Ws(t), null;
				case 25: return null;
				case 30: return null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Ks(e, t) {
			switch (Nr(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & G) !== W && Ei(t), t) : null;
				case 3: return Xr(m_, t), O(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return le(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (ha(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Wr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & G) !== W && Ei(t), t) : null;
				case 13:
					if (ha(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Wr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & G) !== W && Ei(t), t) : null;
				case 19: return ae(fy, t), null;
				case 4: return O(t), null;
				case 10: return Xr(t.type, t), null;
				case 22:
				case 23: return ha(t), ua(t), e !== null && ae(cv, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & G) !== W && Ei(t), t) : null;
				case 24: return Xr(m_, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function qs(e, t) {
			switch (Nr(t), t.tag) {
				case 3:
					Xr(m_, t), O(t);
					break;
				case 26:
				case 27:
				case 5:
					le(t);
					break;
				case 4:
					O(t);
					break;
				case 31:
					t.memoizedState !== null && ha(t);
					break;
				case 13:
					ha(t);
					break;
				case 19:
					ae(fy, t);
					break;
				case 10:
					Xr(t.type, t);
					break;
				case 22:
				case 23:
					ha(t), ua(t), e !== null && ae(cv, t);
					break;
				case 24: Xr(m_, t);
			}
		}
		function Js(e) {
			return (e.mode & G) !== W;
		}
		function Ys(e, t) {
			Js(e) ? (Ti(), Zs(t, e), Ci()) : Zs(t, e);
		}
		function Xs(e, t, n) {
			Js(e) ? (Ti(), Qs(n, e, t), Ci()) : Qs(n, e, t);
		}
		function Zs(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & hy) !== py && ($x = !0), r = A(t, Mv, n), (e & hy) !== py && ($x = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & gy) === 0 ? (n.tag & hy) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, A(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				Il(t, t.return, e);
			}
		}
		function Qs(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & hy) !== py && ($x = !0), i = t, A(i, Pv, i, n, s), (e & hy) !== py && ($x = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				Il(t, t.return, e);
			}
		}
		function $s(e, t) {
			Js(e) ? (Ti(), Zs(t, e), Ci()) : Zs(t, e);
		}
		function ec(e, t, n) {
			Js(e) ? (Ti(), Qs(n, e, t), Ci()) : Qs(n, e, t);
		}
		function tc(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || db || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", E(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", E(e) || "instance"));
				try {
					A(e, sa, t, n);
				} catch (t) {
					Il(e, e.return, t);
				}
			}
		}
		function nc(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function rc(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || db || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", E(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", E(e) || "instance"));
			try {
				var i = es(e.type, n), a = A(e, nc, t, i, r);
				n = gb, a !== void 0 || n.has(e.type) || (n.add(e.type), A(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", E(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				Il(e, e.return, t);
			}
		}
		function ic(e, t, n) {
			n.props = es(e.type, e.memoizedProps), n.state = e.memoizedState, Js(e) ? (Ti(), A(e, Av, e, t, n), Ci()) : A(e, Av, e, t, n);
		}
		function ac(e) {
			var t = e.ref;
			if (t !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var n = e.stateNode;
						break;
					case 30:
						n = e.stateNode;
						break;
					default: n = e.stateNode;
				}
				if (typeof t == "function") if (Js(e)) try {
					Ti(), e.refCleanup = t(n);
				} finally {
					Ci();
				}
				else e.refCleanup = t(n);
				else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", E(e)), t.current = n;
			}
		}
		function oc(e, t) {
			try {
				A(e, ac, e);
			} catch (n) {
				Il(e, t, n);
			}
		}
		function sc(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) if (typeof r == "function") try {
				if (Js(e)) try {
					Ti(), A(e, r);
				} finally {
					Ci(e);
				}
				else A(e, r);
			} catch (n) {
				Il(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				if (Js(e)) try {
					Ti(), A(e, n, null);
				} finally {
					Ci(e);
				}
				else A(e, n, null);
			} catch (n) {
				Il(e, t, n);
			}
			else n.current = null;
		}
		function cc(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function lc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function uc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				A(e, Ju, r, t, n, e);
			} catch (t) {
				Il(e, e.return, t);
			}
		}
		function dc(e, t, n) {
			try {
				A(e, Xu, e.stateNode, e.type, n, t, e);
			} catch (t) {
				Il(e, e.return, t);
			}
		}
		function fc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ed(e.type) || e.tag === 4;
		}
		function pc(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || fc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && ed(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function mc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? ($u(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t)) : ($u(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = an));
			else if (r !== 4 && (r === 27 && ed(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (mc(e, t, n), e = e.sibling; e !== null;) mc(e, t, n), e = e.sibling;
		}
		function hc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
			else if (r !== 4 && (r === 27 && ed(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (hc(e, t, n), e = e.sibling; e !== null;) hc(e, t, n), e = e.sibling;
		}
		function gc(e) {
			for (var t, n = e.return; n !== null;) {
				if (fc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, n = pc(e), hc(e, n, t);
					break;
				case 5:
					n = t.stateNode, t.flags & 32 && (Zu(n), t.flags &= -33), t = pc(e), hc(e, t, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, n = pc(e), mc(e, n, t);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function _c(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				A(e, Dd, e.type, n, t, e);
			} catch (t) {
				Il(e, e.return, t);
			}
		}
		function vc(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 && e.memoizedState.isDehydrated && !(t.flags & 256);
		}
		function yc(e, t) {
			if (e = e.containerInfo, KS = LC, e = Rn(e), zn(e)) {
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
						var o = 0, s = -1, c = -1, l = 0, u = 0, d = e, f = null;
						b: for (;;) {
							for (var p; d !== n || i !== 0 && d.nodeType !== 3 || (s = o + i), d !== a || r !== 0 && d.nodeType !== 3 || (c = o + r), d.nodeType === 3 && (o += d.nodeValue.length), (p = d.firstChild) !== null;) f = d, d = p;
							for (;;) {
								if (d === e) break b;
								if (f === n && ++l === i && (s = o), f === a && ++u === r && (c = o), (p = d.nextSibling) !== null) break;
								d = f, f = d.parentNode;
							}
							d = p;
						}
						n = s === -1 || c === -1 ? null : {
							start: s,
							end: c
						};
					} else n = null;
				}
				n ||= {
					start: 0,
					end: 0
				};
			} else n = null;
			for (qS = {
				focusedElem: e,
				selectionRange: n
			}, LC = !1, xb = t; xb !== null;) if (t = xb, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, xb = e;
			else for (; xb !== null;) {
				switch (e = t = xb, n = e.alternate, i = e.flags, e.tag) {
					case 0:
						if (i & 4 && (e = e.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
						break;
					case 11:
					case 15: break;
					case 1:
						i & 1024 && n !== null && rc(e, n);
						break;
					case 3:
						if (i & 1024) {
							if (e = e.stateNode.containerInfo, n = e.nodeType, n === 9) dd(e);
							else if (n === 1) switch (e.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									dd(e);
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
					default: if (i & 1024) throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
				}
				if (e = t.sibling, e !== null) {
					e.return = t.return, xb = e;
					break;
				}
				xb = t.return;
			}
		}
		function bc(e, t, n) {
			var r = mi(), i = gi(), a = vi(), o = yi(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Mc(e, n), s & 4 && Ys(n, gy | my);
					break;
				case 1:
					if (Mc(e, n), s & 4) if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", E(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", E(n) || "instance")), Js(n) ? (Ti(), A(n, wv, n, e), Ci()) : A(n, wv, n, e);
					else {
						var c = es(n.type, t.memoizedProps);
						t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", E(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", E(n) || "instance")), Js(n) ? (Ti(), A(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), Ci()) : A(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
					}
					s & 64 && tc(n), s & 512 && oc(n, n.return);
					break;
				case 3:
					if (t = ui(), Mc(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							A(n, sa, s, c);
						} catch (e) {
							Il(n, n.return, e);
						}
					}
					e.effectDuration += di(t);
					break;
				case 27: t === null && s & 4 && _c(n);
				case 26:
				case 5:
					if (Mc(e, n), t === null) {
						if (s & 4) uc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								A(n, Yu, c, e, t, n);
							} catch (e) {
								Il(n, n.return, e);
							}
						}
					}
					s & 512 && oc(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = ui(), Mc(e, n), e = n.stateNode, e.effectDuration += fi(s);
						try {
							A(n, cc, n, t, b_, e.effectDuration);
						} catch (e) {
							Il(n, n.return, e);
						}
					} else Mc(e, n);
					break;
				case 31:
					Mc(e, n), s & 4 && wc(e, n);
					break;
				case 13:
					Mc(e, n), s & 4 && Tc(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = Bl.bind(null, n), _d(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || _b, !s) {
						t = t !== null && t.memoizedState !== null || vb, c = _b;
						var l = vb;
						_b = s, (vb = t) && !l ? (Ic(e, n, !!(n.subtreeFlags & 8772)), (n.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && Xn(n, q, J)) : Mc(e, n), _b = c, vb = l;
					}
					break;
				case 30: break;
				default: Mc(e, n);
			}
			(n.mode & G) !== W && 0 <= q && 0 <= J && ((D_ || .05 < T_) && $n(n, q, J, T_, E_), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < J - q && (vc(n.return.alternate, n.return) || Yn(n, q, J, "Mount"))), hi(r), _i(i), E_ = a, D_ = o;
		}
		function xc(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, xc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && qe(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function Sc(e, t, n) {
			for (n = n.child; n !== null;) Cc(e, t, n), n = n.sibling;
		}
		function Cc(e, t, n) {
			if (Mp && typeof Mp.onCommitFiberUnmount == "function") try {
				Mp.onCommitFiberUnmount(jp, n);
			} catch (e) {
				Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = mi(), i = gi(), a = vi(), o = yi();
			switch (n.tag) {
				case 26:
					vb || sc(n, t), Sc(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					vb || sc(n, t);
					var s = wb, c = Tb;
					ed(n.type) && (wb = n.stateNode, Tb = !1), Sc(e, t, n), A(n, Od, n.stateNode), wb = s, Tb = c;
					break;
				case 5: vb || sc(n, t);
				case 6:
					if (s = wb, c = Tb, wb = null, Sc(e, t, n), wb = s, Tb = c, wb !== null) if (Tb) try {
						A(n, nd, wb, n.stateNode);
					} catch (e) {
						Il(n, t, e);
					}
					else try {
						A(n, td, wb, n.stateNode);
					} catch (e) {
						Il(n, t, e);
					}
					break;
				case 18:
					wb !== null && (Tb ? (e = wb, rd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Sf(e)) : rd(wb, n.stateNode));
					break;
				case 4:
					s = wb, c = Tb, wb = n.stateNode.containerInfo, Tb = !0, Sc(e, t, n), wb = s, Tb = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					Qs(hy, n, t), vb || Xs(n, t, gy), Sc(e, t, n);
					break;
				case 1:
					vb || (sc(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && ic(n, t, s)), Sc(e, t, n);
					break;
				case 21:
					Sc(e, t, n);
					break;
				case 22:
					vb = (s = vb) || n.memoizedState !== null, Sc(e, t, n), vb = s;
					break;
				default: Sc(e, t, n);
			}
			(n.mode & G) !== W && 0 <= q && 0 <= J && (D_ || .05 < T_) && $n(n, q, J, T_, E_), hi(r), _i(i), E_ = a, D_ = o;
		}
		function wc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					A(t, wd, e);
				} catch (e) {
					Il(t, t.return, e);
				}
			}
		}
		function Tc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				A(t, Td, e);
			} catch (e) {
				Il(t, t.return, e);
			}
		}
		function Ec(e) {
			switch (e.tag) {
				case 31:
				case 13:
				case 19:
					var t = e.stateNode;
					return t === null && (t = e.stateNode = new bb()), t;
				case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new bb()), t;
				default: throw Error("Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React.");
			}
		}
		function Dc(e, t) {
			var n = Ec(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), Pp) if (Sb !== null && Cb !== null) Kl(Cb, Sb);
					else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					var r = Vl.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function Oc(e, t) {
			var n = t.deletions;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = e, a = t, o = n[r], s = mi(), c = a;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 27:
							if (ed(c.type)) {
								wb = c.stateNode, Tb = !1;
								break a;
							}
							break;
						case 5:
							wb = c.stateNode, Tb = !1;
							break a;
						case 3:
						case 4:
							wb = c.stateNode.containerInfo, Tb = !0;
							break a;
					}
					c = c.return;
				}
				if (wb === null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
				Cc(i, a, o), wb = null, Tb = !1, (o.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && Yn(o, q, J, "Unmount"), hi(s), i = o, a = i.alternate, a !== null && (a.return = null), i.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) kc(t, e), t = t.sibling;
		}
		function kc(e, t) {
			var n = mi(), r = gi(), i = vi(), a = yi(), o = e.alternate, s = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Oc(t, e), Ac(e), s & 4 && (Qs(hy | my, e, e.return), Zs(hy | my, e), Xs(e, e.return, gy | my));
					break;
				case 1:
					if (Oc(t, e), Ac(e), s & 512 && (vb || o === null || sc(o, o.return)), s & 64 && _b && (s = e.updateQueue, s !== null && (o = s.callbacks, o !== null))) {
						var c = s.shared.hiddenCallbacks;
						s.shared.hiddenCallbacks = c === null ? o : c.concat(o);
					}
					break;
				case 26:
					if (c = Eb, Oc(t, e), Ac(e), s & 512 && (vb || o === null || sc(o, o.return)), s & 4) {
						var l = o === null ? null : o.memoizedState;
						if (s = e.memoizedState, o === null) if (s === null) if (e.stateNode === null) {
							a: {
								s = e.type, o = e.memoizedProps, c = c.ownerDocument || c;
								b: switch (s) {
									case "title":
										l = c.getElementsByTagName("title")[0], (!l || l[$p] || l[Kp] || l.namespaceURI === Im || l.hasAttribute("itemprop")) && (l = c.createElement(s), c.head.insertBefore(l, c.querySelector("head > title"))), Eu(l, s, o), l[Kp] = e, Qe(l), s = l;
										break a;
									case "link":
										var u = Hd("link", "href", c).get(s + (o.href || ""));
										if (u) {
											for (var d = 0; d < u.length; d++) if (l = u[d], l.getAttribute("href") === (o.href == null || o.href === "" ? null : o.href) && l.getAttribute("rel") === (o.rel == null ? null : o.rel) && l.getAttribute("title") === (o.title == null ? null : o.title) && l.getAttribute("crossorigin") === (o.crossOrigin == null ? null : o.crossOrigin)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Eu(l, s, o), c.head.appendChild(l);
										break;
									case "meta":
										if (u = Hd("meta", "content", c).get(s + (o.content || ""))) {
											for (d = 0; d < u.length; d++) if (l = u[d], j(o.content, "content"), l.getAttribute("content") === (o.content == null ? null : "" + o.content) && l.getAttribute("name") === (o.name == null ? null : o.name) && l.getAttribute("property") === (o.property == null ? null : o.property) && l.getAttribute("http-equiv") === (o.httpEquiv == null ? null : o.httpEquiv) && l.getAttribute("charset") === (o.charSet == null ? null : o.charSet)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Eu(l, s, o), c.head.appendChild(l);
										break;
									default: throw Error("getNodesForType encountered a type it did not expect: \"" + s + "\". This is a bug in React.");
								}
								l[Kp] = e, Qe(l), s = l;
							}
							e.stateNode = s;
						} else Ud(c, e.type, e.stateNode);
						else e.stateNode = Rd(c, s, e.memoizedProps);
						else l === s ? s === null && e.stateNode !== null && dc(e, e.memoizedProps, o.memoizedProps) : (l === null ? o.stateNode !== null && (o = o.stateNode, o.parentNode.removeChild(o)) : l.count--, s === null ? Ud(c, e.type, e.stateNode) : Rd(c, s, e.memoizedProps));
					}
					break;
				case 27:
					Oc(t, e), Ac(e), s & 512 && (vb || o === null || sc(o, o.return)), o !== null && s & 4 && dc(e, e.memoizedProps, o.memoizedProps);
					break;
				case 5:
					if (Oc(t, e), Ac(e), s & 512 && (vb || o === null || sc(o, o.return)), e.flags & 32) {
						c = e.stateNode;
						try {
							A(e, Zu, c);
						} catch (t) {
							Il(e, e.return, t);
						}
					}
					s & 4 && e.stateNode != null && (c = e.memoizedProps, dc(e, c, o === null ? c : o.memoizedProps)), s & 1024 && (yb = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (Oc(t, e), Ac(e), s & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						s = e.memoizedProps, o = o === null ? s : o.memoizedProps, c = e.stateNode;
						try {
							A(e, Qu, c, o, s);
						} catch (t) {
							Il(e, e.return, t);
						}
					}
					break;
				case 3:
					if (c = ui(), fC = null, l = Eb, Eb = kd(t.containerInfo), Oc(t, e), Eb = l, Ac(e), s & 4 && o !== null && o.memoizedState.isDehydrated) try {
						A(e, Cd, t.containerInfo);
					} catch (t) {
						Il(e, e.return, t);
					}
					yb && (yb = !1, jc(e)), t.effectDuration += di(c);
					break;
				case 4:
					s = Eb, Eb = kd(e.stateNode.containerInfo), Oc(t, e), Ac(e), Eb = s;
					break;
				case 12:
					s = ui(), Oc(t, e), Ac(e), e.stateNode.effectDuration += fi(s);
					break;
				case 31:
					Oc(t, e), Ac(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Dc(e, s)));
					break;
				case 13:
					Oc(t, e), Ac(e), e.child.flags & 8192 && e.memoizedState !== null != (o !== null && o.memoizedState !== null) && (gx = Sp()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Dc(e, s)));
					break;
				case 22:
					c = e.memoizedState !== null;
					var f = o !== null && o.memoizedState !== null, p = _b, m = vb;
					if (_b = p || c, vb = m || f, Oc(t, e), vb = m, _b = p, f && !c && !p && !m && (e.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && Xn(e, q, J), Ac(e), s & 8192) a: for (t = e.stateNode, t._visibility = c ? t._visibility & ~kg : t._visibility | kg, !c || o === null || f || _b || vb || (Pc(e), (e.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && Yn(e, q, J, "Disconnect")), o = null, t = e;;) {
						if (t.tag === 5 || t.tag === 26) {
							if (o === null) {
								f = o = t;
								try {
									l = f.stateNode, c ? A(f, od, l) : A(f, ld, f.stateNode, f.memoizedProps);
								} catch (e) {
									Il(f, f.return, e);
								}
							}
						} else if (t.tag === 6) {
							if (o === null) {
								f = t;
								try {
									u = f.stateNode, c ? A(f, sd, u) : A(f, ud, u, f.memoizedProps);
								} catch (e) {
									Il(f, f.return, e);
								}
							}
						} else if (t.tag === 18) {
							if (o === null) {
								f = t;
								try {
									d = f.stateNode, c ? A(f, ad, d) : A(f, cd, f.stateNode);
								} catch (e) {
									Il(f, f.return, e);
								}
							}
						} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
							t.child.return = t, t = t.child;
							continue;
						}
						if (t === e) break a;
						for (; t.sibling === null;) {
							if (t.return === null || t.return === e) break a;
							o === t && (o = null), t = t.return;
						}
						o === t && (o = null), t.sibling.return = t.return, t = t.sibling;
					}
					s & 4 && (s = e.updateQueue, s !== null && (o = s.retryQueue, o !== null && (s.retryQueue = null, Dc(e, o))));
					break;
				case 19:
					Oc(t, e), Ac(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Dc(e, s)));
					break;
				case 30: break;
				case 21: break;
				default: Oc(t, e), Ac(e);
			}
			(e.mode & G) !== W && 0 <= q && 0 <= J && ((D_ || .05 < T_) && $n(e, q, J, T_, E_), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < J - q && (vc(e.return.alternate, e.return) || Yn(e, q, J, "Mount"))), hi(n), _i(r), E_ = i, D_ = a;
		}
		function Ac(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					A(e, gc, e);
				} catch (t) {
					Il(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function jc(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				jc(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
			}
		}
		function Mc(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) bc(e, t.alternate, t), t = t.sibling;
		}
		function Nc(e) {
			var t = mi(), n = gi(), r = vi(), i = yi();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Xs(e, e.return, gy), Pc(e);
					break;
				case 1:
					sc(e, e.return);
					var a = e.stateNode;
					typeof a.componentWillUnmount == "function" && ic(e, e.return, a), Pc(e);
					break;
				case 27: A(e, Od, e.stateNode);
				case 26:
				case 5:
					sc(e, e.return), Pc(e);
					break;
				case 22:
					e.memoizedState === null && Pc(e);
					break;
				case 30:
					Pc(e);
					break;
				default: Pc(e);
			}
			(e.mode & G) !== W && 0 <= q && 0 <= J && (D_ || .05 < T_) && $n(e, q, J, T_, E_), hi(t), _i(n), E_ = r, D_ = i;
		}
		function Pc(e) {
			for (e = e.child; e !== null;) Nc(e), e = e.sibling;
		}
		function Fc(e, t, n, r) {
			var i = mi(), a = gi(), o = vi(), s = yi(), c = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Ic(e, n, r), Ys(n, gy);
					break;
				case 1:
					if (Ic(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && A(n, wv, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							A(n, oa, t, e);
						} catch (e) {
							Il(n, n.return, e);
						}
					}
					r && c & 64 && tc(n), oc(n, n.return);
					break;
				case 27: _c(n);
				case 26:
				case 5:
					Ic(e, n, r), r && t === null && c & 4 && uc(n), oc(n, n.return);
					break;
				case 12:
					if (r && c & 4) {
						c = ui(), Ic(e, n, r), r = n.stateNode, r.effectDuration += fi(c);
						try {
							A(n, cc, n, t, b_, r.effectDuration);
						} catch (e) {
							Il(n, n.return, e);
						}
					} else Ic(e, n, r);
					break;
				case 31:
					Ic(e, n, r), r && c & 4 && wc(e, n);
					break;
				case 13:
					Ic(e, n, r), r && c & 4 && Tc(e, n);
					break;
				case 22:
					n.memoizedState === null && Ic(e, n, r), oc(n, n.return);
					break;
				case 30: break;
				default: Ic(e, n, r);
			}
			(n.mode & G) !== W && 0 <= q && 0 <= J && (D_ || .05 < T_) && $n(n, q, J, T_, E_), hi(i), _i(a), E_ = o, D_ = s;
		}
		function Ic(e, t, n) {
			for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) Fc(e, t.alternate, t, n), t = t.sibling;
		}
		function Lc(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && oi(e), n != null && si(n));
		}
		function Rc(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (oi(t), e != null && si(e));
		}
		function zc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) {
				var a = t.sibling;
				Bc(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			}
		}
		function Bc(e, t, n, r, i) {
			var a = mi(), o = gi(), s = vi(), c = yi(), l = Cg, u = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & G) !== W && 0 < t.actualStartTime && t.flags & 1 && Zn(t, t.actualStartTime, i, Db, n), zc(e, t, n, r, i), u & 2048 && $s(t, _y | my);
					break;
				case 1:
					(t.mode & G) !== W && 0 < t.actualStartTime && (t.flags & 128 ? Qn(t, t.actualStartTime, i, []) : t.flags & 1 && Zn(t, t.actualStartTime, i, Db, n)), zc(e, t, n, r, i);
					break;
				case 3:
					var d = ui(), f = Db;
					Db = t.alternate !== null && t.alternate.memoizedState.isDehydrated && !(t.flags & 256), zc(e, t, n, r, i), Db = f, u & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (oi(r), n != null && si(n))), e.passiveEffectDuration += di(d);
					break;
				case 12:
					if (u & 2048) {
						u = ui(), zc(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += fi(u);
						try {
							A(t, lc, t, t.alternate, b_, e.passiveEffectDuration);
						} catch (e) {
							Il(t, t.return, e);
						}
					} else zc(e, t, n, r, i);
					break;
				case 31:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d !== null && f === null ? (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && Qn(t, t.actualStartTime, i, d)) : Db = !0) : Db = !1, zc(e, t, n, r, i), Db = u;
					break;
				case 13:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d === null || d.dehydrated === null || f !== null && f.dehydrated !== null ? Db = !1 : (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && Qn(t, t.actualStartTime, i, d)) : Db = !0), zc(e, t, n, r, i), Db = u;
					break;
				case 23: break;
				case 22:
					f = t.stateNode, d = t.alternate, t.memoizedState === null ? f._visibility & Ag ? zc(e, t, n, r, i) : (f._visibility |= Ag, Vc(e, t, n, r, !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & G) === W || Db || (e = t.actualStartTime, 0 <= e && .05 < i - e && Xn(t, e, i), 0 <= q && 0 <= J && .05 < J - q && Xn(t, q, J))) : f._visibility & Ag ? zc(e, t, n, r, i) : Uc(e, t, n, r, i), u & 2048 && Lc(d, t);
					break;
				case 24:
					zc(e, t, n, r, i), u & 2048 && Rc(t.alternate, t);
					break;
				default: zc(e, t, n, r, i);
			}
			(t.mode & G) !== W && ((e = !Db && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && Yn(t, n, i, "Mount")), 0 <= q && 0 <= J && ((D_ || .05 < T_) && $n(t, q, J, T_, E_), e && .05 < J - q && Yn(t, q, J, "Mount"))), hi(a), _i(o), E_ = s, D_ = c, Cg = l;
		}
		function Vc(e, t, n, r, i, a) {
			for (i &&= !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Hc(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Hc(e, t, n, r, i, a) {
			var o = mi(), s = gi(), c = vi(), l = yi(), u = Cg;
			i && (t.mode & G) !== W && 0 < t.actualStartTime && t.flags & 1 && Zn(t, t.actualStartTime, a, Db, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					Vc(e, t, n, r, i, a), $s(t, _y);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= Ag, Vc(e, t, n, r, i, a)) : f._visibility & Ag ? Vc(e, t, n, r, i, a) : Uc(e, t, n, r, a), i && d & 2048 && Lc(t.alternate, t);
					break;
				case 24:
					Vc(e, t, n, r, i, a), i && d & 2048 && Rc(t.alternate, t);
					break;
				default: Vc(e, t, n, r, i, a);
			}
			(t.mode & G) !== W && 0 <= q && 0 <= J && (D_ || .05 < T_) && $n(t, q, J, T_, E_), hi(o), _i(s), E_ = c, D_ = l, Cg = u;
		}
		function Uc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Cg;
				(a.mode & G) !== W && 0 < a.actualStartTime && a.flags & 1 && Zn(a, a.actualStartTime, l, Db, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						Uc(o, a, s, c, l), d & 2048 && Lc(a.alternate, a);
						break;
					case 24:
						Uc(o, a, s, c, l), d & 2048 && Rc(a.alternate, a);
						break;
					default: Uc(o, a, s, c, l);
				}
				Cg = u, a = t;
			}
		}
		function Wc(e, t, n) {
			if (e.subtreeFlags & Ob) for (e = e.child; e !== null;) Gc(e, t, n), e = e.sibling;
		}
		function Gc(e, t, n) {
			switch (e.tag) {
				case 26:
					Wc(e, t, n), e.flags & Ob && e.memoizedState !== null && Kd(n, Eb, e.memoizedState, e.memoizedProps);
					break;
				case 5:
					Wc(e, t, n);
					break;
				case 3:
				case 4:
					var r = Eb;
					Eb = kd(e.stateNode.containerInfo), Wc(e, t, n), Eb = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ob, Ob = 16777216, Wc(e, t, n), Ob = r) : Wc(e, t, n));
					break;
				default: Wc(e, t, n);
			}
		}
		function Kc(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function qc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = mi();
					xb = r, Zc(r, e), (r.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && Yn(r, q, J, "Unmount"), hi(i);
				}
				Kc(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Jc(e), e = e.sibling;
		}
		function Jc(e) {
			var t = mi(), n = gi(), r = vi(), i = yi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					qc(e), e.flags & 2048 && ec(e, e.return, _y | my);
					break;
				case 3:
					var a = ui();
					qc(e), e.stateNode.passiveEffectDuration += di(a);
					break;
				case 12:
					a = ui(), qc(e), e.stateNode.passiveEffectDuration += fi(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & Ag && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~Ag, Yc(e), (e.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && Yn(e, q, J, "Disconnect")) : qc(e);
					break;
				default: qc(e);
			}
			(e.mode & G) !== W && 0 <= q && 0 <= J && (D_ || .05 < T_) && $n(e, q, J, T_, E_), hi(t), _i(n), D_ = i, E_ = r;
		}
		function Yc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = mi();
					xb = r, Zc(r, e), (r.mode & G) !== W && 0 <= q && 0 <= J && .05 < J - q && Yn(r, q, J, "Unmount"), hi(i);
				}
				Kc(e);
			}
			for (e = e.child; e !== null;) Xc(e), e = e.sibling;
		}
		function Xc(e) {
			var t = mi(), n = gi(), r = vi(), i = yi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					ec(e, e.return, _y), Yc(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & Ag && (a._visibility &= ~Ag, Yc(e));
					break;
				default: Yc(e);
			}
			(e.mode & G) !== W && 0 <= q && 0 <= J && (D_ || .05 < T_) && $n(e, q, J, T_, E_), hi(t), _i(n), D_ = i, E_ = r;
		}
		function Zc(e, t) {
			for (; xb !== null;) {
				var n = xb, r = n, i = t, a = mi(), o = gi(), s = vi(), c = yi();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						ec(r, i, _y);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && oi(i));
						break;
					case 24: si(r.memoizedState.cache);
				}
				if ((r.mode & G) !== W && 0 <= q && 0 <= J && (D_ || .05 < T_) && $n(r, q, J, T_, E_), hi(a), _i(o), D_ = c, E_ = s, r = n.child, r !== null) r.return = n, xb = r;
				else a: for (n = e; xb !== null;) {
					if (r = xb, a = r.sibling, o = r.return, xc(r), r === n) {
						xb = null;
						break a;
					}
					if (a !== null) {
						a.return = o, xb = a;
						break a;
					}
					xb = o;
				}
			}
		}
		function Qc() {
			jb.forEach(function(e) {
				return e();
			});
		}
		function $c() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || V.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function el(e) {
			if ((Ub & Pb) !== Nb && $ !== 0) return $ & -$;
			var t = V.T;
			return t === null ? Ge() : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), ru());
		}
		function tl() {
			if (dx === 0) if (!($ & 536870912) || K) {
				var e = zp;
				zp <<= 1, !(zp & 3932160) && (zp = 262144), dx = e;
			} else dx = 536870912;
			return e = cy.current, e !== null && (e.flags |= 32), dx;
		}
		function nl(e, t, n) {
			if ($x && console.error("useInsertionEffect must not schedule updates."), Jx && (Yx = !0), (e === Wb && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) && (ul(e, 0), ol(e, $, dx, !1)), Ie(e, n), (Ub & Pb) !== Nb && e === Wb) {
				if (gp) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && E(Q) || "Unknown", nS.has(e) || (nS.add(e), t = E(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: tS ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else Pp && He(e, t, n), Jl(t), e === Wb && ((Ub & Pb) === Nb && (lx |= n), sx === Bb && ol(e, $, dx, !1)), Yl(e);
		}
		function rl(e, t, n) {
			if ((Ub & (Pb | Fb)) !== Nb) throw Error("Should not already be working.");
			if ($ !== 0 && Q !== null) {
				var r = Q, i = Sp();
				switch ($_) {
					case Jb:
					case qb:
						var a = ev;
						xg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Suspended", a, i, Sg, void 0, "primary-light")) : console.timeStamp("Suspended", a, i, Sg, void 0, "primary-light"));
						break;
					case ex:
						a = ev, xg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Action", a, i, Sg, void 0, "primary-light")) : console.timeStamp("Action", a, i, Sg, void 0, "primary-light"));
						break;
					default: xg && (r = i - ev, 3 > r || console.timeStamp("Blocked", ev, i, Sg, void 0, 5 > r ? "primary-light" : 10 > r ? "primary" : 100 > r ? "primary-dark" : "error"));
				}
			}
			a = (n = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Me(e, t)) ? yl(e, t) : _l(e, t, !0);
			var o = n;
			do {
				if (a === Ib) {
					ix && !n && ol(e, t, 0, !1), t = tx, ev = h_(), $_ = t;
					break;
				}
				if (r = Sp(), i = e.current.alternate, o && !al(i)) {
					Jn(t), i = y_, a = r, !xg || a <= i || (Sx ? Sx.run(console.timeStamp.bind(console, "Teared Render", i, a, U, H, "error")) : console.timeStamp("Teared Render", i, a, U, H, "error")), ll(t, r), a = _l(e, t, !1), o = !1;
					continue;
				}
				if (a === Rb) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						Jn(t), ir(y_, r, t, Sx), ll(t, r), t = s;
						a: {
							r = e, a = o, o = px;
							var c = r.current.memoizedState.isDehydrated;
							if (c && (ul(r, s).flags |= 256), s = _l(r, s, !1), s !== Rb) {
								if (ax && !c) {
									r.errorRecoveryDisabledLanes |= a, lx |= a, a = Bb;
									break a;
								}
								r = mx, mx = o, r !== null && (mx === null ? mx = r : mx.push.apply(mx, r));
							}
							a = s;
						}
						if (o = !1, a !== Rb) continue;
						r = Sp();
					}
				}
				if (a === Lb) {
					Jn(t), ir(y_, r, t, Sx), ll(t, r), ul(e, 0), ol(e, t, 0, !0);
					break;
				}
				a: {
					switch (n = e, a) {
						case Ib:
						case Lb: throw Error("Root did not complete. This is a bug in React.");
						case Bb: if ((t & 4194048) !== t) break;
						case Vb:
							Jn(t), tr(y_, r, t, Sx), ll(t, r), i = t, i & 127 ? L_ = r : i & 4194048 && (J_ = r), ol(n, t, dx, !rx);
							break a;
						case Rb:
							mx = null;
							break;
						case zb:
						case Hb: break;
						default: throw Error("Unknown root exit status.");
					}
					if (V.actQueue !== null) Dl(n, i, t, mx, xx, hx, dx, lx, fx, a, null, null, y_, r);
					else {
						if ((t & 62914560) === t && (o = gx + vx - Sp(), 10 < o)) {
							if (ol(n, t, dx, !rx), je(n, 0, !0) !== 0) break a;
							Lx = t, n.timeoutHandle = ZS(il.bind(null, n, i, mx, xx, hx, t, dx, lx, fx, rx, a, "Throttled", y_, r), o);
							break a;
						}
						il(n, i, mx, xx, hx, t, dx, lx, fx, rx, a, null, y_, r);
					}
				}
				break;
			} while (1);
			Yl(e);
		}
		function il(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.timeoutHandle = $S;
			var m = t.subtreeFlags, h = null;
			if ((m & 8192 || (m & 16785408) == 16785408) && (h = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: an
			}, Gc(t, a, h), m = (a & 62914560) === a ? gx - Sp() : (a & 4194048) === a ? _x - Sp() : 0, m = qd(h, m), m !== null)) {
				Lx = a, e.cancelPendingCommit = m(Dl.bind(null, e, t, a, n, r, i, o, s, c, u, h, h.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < h.count ? 0 < h.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : h.imgCount === 1 ? "Suspended on an Image" : 0 < h.imgCount ? "Suspended on Images" : null, f, p)), ol(e, a, o, !l);
				return;
			}
			Dl(e, t, a, n, r, i, o, s, c, u, h, d, f, p);
		}
		function al(e) {
			for (var t = e;;) {
				var n = t.tag;
				if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Wh(a(), i)) return !1;
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
		function ol(e, t, n, r) {
			t &= ~ux, t &= ~lx, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Fp(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && Re(e, n, t);
		}
		function sl() {
			return (Ub & (Pb | Fb)) !== Nb || (L(0, !1), !1);
		}
		function cl() {
			if (Q !== null) {
				if (tx === Gb) var e = Q.return;
				else e = Q, Jr(), Da(e), Uv = null, Wv = 0, e = Q;
				for (; e !== null;) qs(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function ll(e, t) {
			e & 127 && (O_ = t), e & 4194048 && (R_ = t), e & 62914560 && (Y_ = t), e & 2080374784 && (X_ = t);
		}
		function ul(e, t) {
			xg && (console.timeStamp("Blocking Track", .003, .003, "Blocking", H, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", H, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", H, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", H, "primary-light"));
			var n = y_;
			if (y_ = h_(), $ !== 0 && 0 < n) {
				if (Jn($), sx === zb || sx === Bb) tr(n, y_, t, Sx);
				else {
					var r = y_, i = Sx;
					if (xg && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, U, H, a)) : console.timeStamp(o, n, r, U, H, a);
					}
				}
				ll($, y_);
			}
			if (n = Sx, Sx = null, t & 127) {
				Sx = A_, i = 0 <= k_ && k_ < O_ ? O_ : k_, r = 0 <= P_ && P_ < O_ ? O_ : P_, a = 0 <= r ? r : 0 <= i ? i : y_, 0 <= L_ ? (Jn(2), nr(L_, a, t, n)) : Z_ & 127 && (Jn(2), sr(O_, a, Q_)), n = i;
				var s = r, c = F_, l = 0 < I_, u = j_ === __, d = j_ === v_;
				if (i = y_, r = A_, a = M_, o = N_, xg) {
					if (U = "Blocking", 0 < n ? n > i && (n = i) : n = i, 0 < s ? s > n && (s = n) : s = n, c !== null && n > s) {
						var f = l ? "secondary-light" : "warning";
						r ? r.run(console.timeStamp.bind(console, l ? "Consecutive" : "Event: " + c, s, n, U, H, f)) : console.timeStamp(l ? "Consecutive" : "Event: " + c, s, n, U, H, f);
					}
					i > n && (s = u ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", u = d ? "Promise Resolved" : u ? "Cascading Update" : 5 < i - n ? "Update Blocked" : "Update", d = [], o != null && d.push(["Component name", o]), a != null && d.push(["Method name", a]), n = {
						start: n,
						end: i,
						detail: { devtools: {
							properties: d,
							track: U,
							trackGroup: H,
							color: s
						} }
					}, r ? r.run(performance.measure.bind(performance, u, n)) : performance.measure(u, n));
				}
				k_ = -1.1, j_ = 0, N_ = M_ = null, L_ = -1.1, I_ = P_, P_ = -1.1, O_ = h_();
			}
			if (t & 4194048 && (Sx = H_, i = 0 <= z_ && z_ < R_ ? R_ : z_, n = 0 <= B_ && B_ < R_ ? R_ : B_, r = 0 <= G_ && G_ < R_ ? R_ : G_, a = 0 <= r ? r : 0 <= n ? n : y_, 0 <= J_ ? (Jn(256), nr(J_, a, t, Sx)) : Z_ & 4194048 && (Jn(256), sr(R_, a, Q_)), d = r, s = K_, c = 0 < q_, l = V_ === v_, a = y_, r = H_, o = U_, u = W_, xg && (U = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, U, H, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, U, H, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, U, H, "primary-dark")) : console.timeStamp("Action", i, n, U, H, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: U,
					trackGroup: H,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n))), B_ = z_ = -1.1, V_ = 0, J_ = -1.1, q_ = G_, G_ = -1.1, R_ = h_()), t & 62914560 && Z_ & 62914560 && (Jn(4194304), sr(Y_, y_, Q_)), t & 2080374784 && Z_ & 2080374784 && (Jn(268435456), sr(X_, y_, Q_)), n = e.timeoutHandle, n !== $S && (e.timeoutHandle = $S, QS(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Lx = 0, cl(), Wb = e, Q = n = xr(e.current, null), $ = t, tx = Gb, nx = null, rx = !1, ix = Me(e, t), ax = !1, sx = Ib, fx = dx = ux = lx = cx = 0, mx = px = null, hx = !1, t & 8 && (t |= t & 32), r = e.entangledLanes, r !== 0) for (e = e.entanglements, r &= t; 0 < r;) i = 31 - Fp(r), a = 1 << i, t |= e[i], r &= ~a;
			return ox = t, cr(), e = ug(), 1e3 < e - cg && (V.recentlyCreatedOwnerStacks = 0, cg = e), lv.discardPendingWarnings(), n;
		}
		function dl(e, t) {
			X = null, V.H = Ly, V.getCurrentStack = null, gp = !1, hp = null, t === Lv || t === zv ? (t = Li(), tx = Jb) : t === Rv ? (t = Li(), tx = Yb) : tx = t === ab ? $b : typeof t == "object" && t && typeof t.then == "function" ? Zb : Kb, nx = t;
			var n = Q;
			n === null ? (sx = Lb, is(e, kr(t, e.current))) : n.mode & G && xi(n);
		}
		function fl() {
			var e = cy.current;
			return e === null ? !0 : ($ & 4194048) === $ ? ly === null : ($ & 62914560) === $ || $ & 536870912 ? e === ly : !1;
		}
		function pl() {
			var e = V.H;
			return V.H = Ly, e === null ? Ly : e;
		}
		function ml() {
			var e = V.A;
			return V.A = kb, e;
		}
		function hl(e) {
			Sx === null && (Sx = e._debugTask == null ? null : e._debugTask);
		}
		function gl() {
			sx = Bb, rx || ($ & 4194048) !== $ && cy.current !== null || (ix = !0), !(cx & 134217727) && !(lx & 134217727) || Wb === null || ol(Wb, $, dx, !1);
		}
		function _l(e, t, n) {
			var r = Ub;
			Ub |= Pb;
			var i = pl(), a = ml();
			if (Wb !== e || $ !== t) {
				if (Pp) {
					var o = e.memoizedUpdaters;
					0 < o.size && (Kl(e, $), o.clear()), Ue(e, t);
				}
				xx = null, ul(e, t);
			}
			t = !1, o = sx;
			a: do
				try {
					if (tx !== Gb && Q !== null) {
						var s = Q, c = nx;
						switch (tx) {
							case $b:
								cl(), o = Vb;
								break a;
							case Jb:
							case qb:
							case ex:
							case Zb:
								cy.current === null && (t = !0);
								var l = tx;
								if (tx = Gb, nx = null, wl(e, s, c, l), n && ix) {
									o = Ib;
									break a;
								}
								break;
							default: l = tx, tx = Gb, nx = null, wl(e, s, c, l);
						}
					}
					vl(), o = sx;
					break;
				} catch (t) {
					dl(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, Jr(), Ub = r, V.H = i, V.A = a, Q === null && (Wb = null, $ = 0, cr()), o;
		}
		function vl() {
			for (; Q !== null;) xl(Q);
		}
		function yl(e, t) {
			var n = Ub;
			Ub |= Pb;
			var r = pl(), i = ml();
			if (Wb !== e || $ !== t) {
				if (Pp) {
					var a = e.memoizedUpdaters;
					0 < a.size && (Kl(e, $), a.clear()), Ue(e, t);
				}
				xx = null, yx = Sp() + bx, ul(e, t);
			} else ix = Me(e, t);
			a: do
				try {
					if (tx !== Gb && Q !== null) b: switch (t = Q, a = nx, tx) {
						case Kb:
							tx = Gb, nx = null, wl(e, t, a, Kb);
							break;
						case qb:
						case ex:
							if (Pi(a)) {
								tx = Gb, nx = null, Sl(t);
								break;
							}
							t = function() {
								tx !== qb && tx !== ex || Wb !== e || (tx = Qb), Yl(e);
							}, a.then(t, t);
							break a;
						case Jb:
							tx = Qb;
							break a;
						case Yb:
							tx = Xb;
							break a;
						case Qb:
							Pi(a) ? (tx = Gb, nx = null, Sl(t)) : (tx = Gb, nx = null, wl(e, t, a, Qb));
							break;
						case Xb:
							var o = null;
							switch (Q.tag) {
								case 26: o = Q.memoizedState;
								case 5:
								case 27:
									var s = Q;
									if (o ? Gd(o) : s.stateNode.complete) {
										tx = Gb, nx = null;
										var c = s.sibling;
										if (c !== null) Q = c;
										else {
											var l = s.return;
											l === null ? Q = null : (Q = l, Tl(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							tx = Gb, nx = null, wl(e, t, a, Xb);
							break;
						case Zb:
							tx = Gb, nx = null, wl(e, t, a, Zb);
							break;
						case $b:
							cl(), sx = Vb;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					V.actQueue === null ? bl() : vl();
					break;
				} catch (t) {
					dl(e, t);
				}
			while (1);
			return Jr(), V.H = r, V.A = i, Ub = n, Q === null ? (Wb = null, $ = 0, cr(), sx) : Ib;
		}
		function bl() {
			for (; Q !== null && !bp();) xl(Q);
		}
		function xl(e) {
			var t = e.alternate;
			(e.mode & G) === W ? t = A(e, Rs, t, e, ox) : (bi(e), t = A(e, Rs, t, e, ox), xi(e)), e.memoizedProps = e.pendingProps, t === null ? Tl(e) : Q = t;
		}
		function Sl(e) {
			var t = A(e, Cl, e);
			e.memoizedProps = e.pendingProps, t === null ? Tl(e) : Q = t;
		}
		function Cl(e) {
			var t = e.alternate, n = (e.mode & G) !== W;
			switch (n && bi(e), e.tag) {
				case 15:
				case 0:
					t = Ss(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = Ss(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5: Da(e);
				default: qs(t, e), e = Q = Sr(e, ox), t = Rs(t, e, ox);
			}
			return n && xi(e), t;
		}
		function wl(e, t, n, r) {
			Jr(), Da(t), Uv = null, Wv = 0;
			var i = t.return;
			try {
				if (ls(e, i, t, n, $)) {
					sx = Lb, is(e, kr(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				sx = Lb, is(e, kr(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? (K || r === Kb ? e = !0 : ix || $ & 536870912 ? e = !1 : (rx = e = !0, (r === qb || r === ex || r === Jb || r === Zb) && (r = cy.current, r !== null && r.tag === 13 && (r.flags |= 16384))), El(t, e)) : Tl(t);
		}
		function Tl(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					El(t, rx);
					return;
				}
				var n = t.alternate;
				if (e = t.return, bi(t), n = A(t, Gs, n, t, ox), (t.mode & G) !== W && Si(t), n !== null) {
					Q = n;
					return;
				}
				if (t = t.sibling, t !== null) {
					Q = t;
					return;
				}
				Q = t = e;
			} while (t !== null);
			sx === Ib && (sx = Hb);
		}
		function El(e, t) {
			do {
				var n = Ks(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & G) !== W) {
					Si(e), n = e.actualDuration;
					for (var r = e.child; r !== null;) n += r.actualDuration, r = r.sibling;
					e.actualDuration = n;
				}
				if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
					Q = e;
					return;
				}
				Q = e = n;
			} while (e !== null);
			sx = Vb, Q = null;
		}
		function Dl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.cancelPendingCommit = null;
			do
				Nl();
			while (Px !== Ox);
			if (lv.flushLegacyContextWarning(), lv.flushPendingUnsafeLifecycleWarnings(), (Ub & (Pb | Fb)) !== Nb) throw Error("Should not already be working.");
			if (Jn(n), l === Rb ? ir(f, p, n, Sx) : r === null ? er(f, p, n, Sx) : rr(f, p, n, r, t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && !!(t.flags & 256), Sx), t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				if (a = t.lanes | t.childLanes, a |= Ng, Le(e, n, a, o, s, c), e === Wb && (Q = Wb = null, $ = 0), Ix = t, Fx = e, Lx = n, Rx = a, Bx = i, Vx = r, zx = p, Hx = d, Ux = wx, Wx = null, t.actualDuration !== 0 || t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, ql(Ep, function() {
					return XS = window.event, Ux === wx && (Ux = Ex), Pl(), null;
				})) : (e.callbackNode = null, e.callbackPriority = 0), S_ = null, b_ = h_(), d !== null && ar(p, b_, d, Sx), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
					r = V.T, V.T = null, i = Jf.p, Jf.p = Vp, o = Ub, Ub |= Fb;
					try {
						yc(e, t, n);
					} finally {
						Ub = o, Jf.p = i, V.T = r;
					}
				}
				Px = kx, Ol(), kl(), Al();
			}
		}
		function Ol() {
			if (Px === kx) {
				Px = Ox;
				var e = Fx, t = Ix, n = Lx, r = !!(t.flags & 13878);
				if (t.subtreeFlags & 13878 || r) {
					r = V.T, V.T = null;
					var i = Jf.p;
					Jf.p = Vp;
					var a = Ub;
					Ub |= Fb;
					try {
						Sb = n, Cb = e, pi(), kc(t, e), Cb = Sb = null, n = qS;
						var o = Rn(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && Ln(s.ownerDocument.documentElement, s)) {
							if (c !== null && zn(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = In(s, h), v = In(s, g);
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
						LC = !!KS, qS = KS = null;
					} finally {
						Ub = a, Jf.p = i, V.T = r;
					}
				}
				e.current = t, Px = Ax;
			}
		}
		function kl() {
			if (Px === Ax) {
				Px = Ox;
				var e = Wx;
				if (e !== null) {
					b_ = h_();
					var t = x_, n = b_;
					!xg || n <= t || (Q_ ? Q_.run(console.timeStamp.bind(console, e, t, n, U, H, "secondary-light")) : console.timeStamp(e, t, n, U, H, "secondary-light"));
				}
				e = Fx, t = Ix, n = Lx;
				var r = !!(t.flags & 8772);
				if (t.subtreeFlags & 8772 || r) {
					r = V.T, V.T = null;
					var i = Jf.p;
					Jf.p = Vp;
					var a = Ub;
					Ub |= Fb;
					try {
						Sb = n, Cb = e, pi(), bc(e, t.alternate, t), Cb = Sb = null;
					} finally {
						Ub = a, Jf.p = i, V.T = r;
					}
				}
				e = zx, t = Hx, x_ = h_(), e = t === null ? e : b_, t = x_, n = Ux === Tx, r = Sx, S_ === null ? !xg || t <= e || (r ? r.run(console.timeStamp.bind(console, n ? "Commit Interrupted View Transition" : "Commit", e, t, U, H, n ? "error" : "secondary-dark")) : console.timeStamp(n ? "Commit Interrupted View Transition" : "Commit", e, t, U, H, n ? "error" : "secondary-dark")) : or(e, t, S_, !1, r), Px = jx;
			}
		}
		function Al() {
			if (Px === Mx || Px === jx) {
				if (Px === Mx) {
					var e = x_;
					x_ = h_();
					var t = x_, n = Ux === Tx;
					!xg || t <= e || (Q_ ? Q_.run(console.timeStamp.bind(console, n ? "Interrupted View Transition" : "Starting Animation", e, t, U, H, n ? "error" : "secondary-light")) : console.timeStamp(n ? "Interrupted View Transition" : "Starting Animation", e, t, U, H, n ? " error" : "secondary-light")), Ux !== Tx && (Ux = Dx);
				}
				Px = Ox, xp(), e = Fx;
				var r = Ix;
				t = Lx, n = Vx;
				var i = r.actualDuration !== 0 || !!(r.subtreeFlags & 10256) || !!(r.flags & 10256);
				i ? Px = Nx : (Px = Ox, Ix = Fx = null, Ml(e, e.pendingLanes), Zx = 0, Qx = null);
				var a = e.pendingLanes;
				if (a === 0 && (Cx = null), i || Wl(e), a = We(t), r = r.stateNode, Mp && typeof Mp.onCommitFiberRoot == "function") try {
					var o = (r.current.flags & 128) == 128;
					switch (a) {
						case Vp:
							var s = wp;
							break;
						case Hp:
							s = Tp;
							break;
						case Up:
							s = Ep;
							break;
						case Wp:
							s = Op;
							break;
						default: s = Ep;
					}
					Mp.onCommitFiberRoot(jp, r, s, o);
				} catch (e) {
					Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				if (Pp && e.memoizedUpdaters.clear(), Qc(), n !== null) {
					o = V.T, s = Jf.p, Jf.p = Vp, V.T = null;
					try {
						var c = e.onRecoverableError;
						for (r = 0; r < n.length; r++) {
							var l = n[r], u = jl(l.stack);
							A(l.source, c, l.value, u);
						}
					} finally {
						V.T = o, Jf.p = s;
					}
				}
				Lx & 3 && Nl(), Yl(e), a = e.pendingLanes, t & 261930 && a & 42 ? (nv = !0, e === qx ? Kx++ : (Kx = 0, qx = e)) : Kx = 0, i || ll(t, x_), L(0, !1);
			}
		}
		function jl(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function Ml(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, si(t)));
		}
		function Nl() {
			return Ol(), kl(), Al(), Pl();
		}
		function Pl() {
			if (Px !== Nx) return !1;
			var e = Fx, t = Rx;
			Rx = 0;
			var n = We(Lx), r = Up === 0 || Up > n ? Up : n;
			n = V.T;
			var i = Jf.p;
			try {
				Jf.p = r, V.T = null;
				var a = Bx;
				Bx = null, r = Fx;
				var o = Lx;
				if (Px = Ox, Ix = Fx = null, Lx = 0, (Ub & (Pb | Fb)) !== Nb) throw Error("Cannot flush passive effects while already rendering.");
				Jn(o), Jx = !0, Yx = !1;
				var s = 0;
				if (S_ = null, s = Sp(), Ux === Dx) sr(x_, s, Q_);
				else {
					var c = x_, l = s, u = Ux === Ex;
					!xg || l <= c || (Sx ? Sx.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, U, H, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, U, H, "secondary-light"));
				}
				c = Ub, Ub |= Fb;
				var d = r.current;
				pi(), Jc(d);
				var f = r.current;
				d = zx, pi(), Bc(r, f, o, a, d), Wl(r), Ub = c;
				var p = Sp();
				if (f = s, d = Sx, S_ === null ? !xg || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, U, H, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, U, H, "secondary-dark")) : or(f, p, S_, !0, d), ll(o, p), L(0, !1), Yx ? r === Qx ? Zx++ : (Zx = 0, Qx = r) : Zx = 0, Yx = Jx = !1, Mp && typeof Mp.onPostCommitFiberRoot == "function") try {
					Mp.onPostCommitFiberRoot(jp, r);
				} catch (e) {
					Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				Jf.p = i, V.T = n, Ml(e, t);
			}
		}
		function Fl(e, t, n) {
			t = kr(n, t), wi(t), t = os(e.stateNode, t, 2), e = ea(e, t, 2), e !== null && (Ie(e, 2), Yl(e));
		}
		function Il(e, t, n) {
			if ($x = !1, e.tag === 3) Fl(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						Fl(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Cx === null || !Cx.has(r))) {
							e = kr(n, e), wi(e), n = ss(2), r = ea(t, n, 2), r !== null && (cs(n, r, t, e), Ie(r, 2), Yl(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function Ll(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new Mb();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (ax = !0, i.add(n), r = Rl.bind(null, e, t, n), Pp && Kl(e, n), t.then(r, r));
		}
		function Rl(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > k_ && (O_ = k_ = h_(), A_ = g_("Promise Resolved"), j_ = v_) : n & 4194048 && 0 > B_ && (R_ = B_ = h_(), H_ = g_("Promise Resolved"), V_ = v_), $c() && V.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), Wb === e && ($ & n) === n && (sx === Bb || sx === zb && ($ & 62914560) === $ && Sp() - gx < vx ? (Ub & Pb) === Nb && ul(e, 0) : ux |= n, fx === $ && (fx = 0)), Yl(e);
		}
		function zl(e, t) {
			t === 0 && (t = Pe()), e = dr(e, t), e !== null && (Ie(e, t), Yl(e));
		}
		function Bl(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), zl(e, n);
		}
		function Vl(e, t) {
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
				default: throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
			}
			r !== null && r.delete(t), zl(e, n);
		}
		function Hl(e, t, n) {
			if (t.subtreeFlags & 67117056) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === Pf;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 8192 ? A(i, Ul, r, i) : i.subtreeFlags & 67108864 && A(i, Hl, r, i, a)) : i.flags & 67108864 ? a && A(i, Ul, r, i) : Hl(r, i, a), t = t.sibling;
			}
		}
		function Ul(e, t) {
			Oe(!0);
			try {
				Nc(t), Xc(t), Fc(e, t.alternate, t, !1), Hc(e, t, 0, null, !1, 0);
			} finally {
				Oe(!1);
			}
		}
		function Wl(e) {
			var t = !0;
			e.current.mode & (Rg | zg) || (t = !1), Hl(e, e.current, t);
		}
		function Gl(e) {
			if ((Ub & Pb) === Nb) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = E(e) || "ReactComponent", eS !== null) {
						if (eS.has(t)) return;
						eS.add(t);
					} else eS = /* @__PURE__ */ new Set([t]);
					A(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function Kl(e, t) {
			Pp && e.memoizedUpdaters.forEach(function(n) {
				He(e, n, t);
			});
		}
		function ql(e, t) {
			var n = V.actQueue;
			return n === null ? vp(e, t) : (n.push(t), rS);
		}
		function Jl(e) {
			$c() && V.actQueue === null && A(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", E(e));
			});
		}
		function Yl(e) {
			e !== aS && e.next === null && (aS === null ? iS = aS = e : aS = aS.next = e), cS = !0, V.actQueue === null ? oS || (oS = !0, nu()) : sS || (sS = !0, nu());
		}
		function L(e, t) {
			if (!lS && cS) {
				lS = !0;
				do
					for (var n = !1, r = iS; r !== null;) {
						if (!t) if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Fp(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, eu(r, a));
						} else a = $, a = je(r, r === Wb ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== $S), !(a & 3) || Me(r, a) || (n = !0, eu(r, a));
						r = r.next;
					}
				while (n);
				lS = !1;
			}
		}
		function Xl() {
			XS = window.event, Zl();
		}
		function Zl() {
			cS = sS = oS = !1;
			var e = 0;
			uS !== 0 && Wu() && (e = uS);
			for (var t = Sp(), n = null, r = iS; r !== null;) {
				var i = r.next, a = Ql(r, t);
				a === 0 ? (r.next = null, n === null ? iS = i : n.next = i, i === null && (aS = n)) : (n = r, (e !== 0 || a & 3) && (cS = !0)), r = i;
			}
			Px !== Ox && Px !== Nx || L(e, !1), uS !== 0 && (uS = 0);
		}
		function Ql(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Fp(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ne(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = Wb, n = $, n = je(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r = e.callbackNode, n === 0 || e === t && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) return r !== null && tu(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || Me(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || V.actQueue !== null && r !== dS) tu(r);
				else return t;
				switch (We(n)) {
					case Vp:
					case Hp:
						n = Tp;
						break;
					case Up:
						n = Ep;
						break;
					case Wp:
						n = Op;
						break;
					default: n = Ep;
				}
				return r = $l.bind(null, e), V.actQueue === null ? n = vp(n, r) : (V.actQueue.push(r), n = dS), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && tu(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function $l(e, t) {
			if (nv = tv = !1, XS = window.event, Px !== Ox && Px !== Nx) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (Ux === wx && (Ux = Ex), Nl() && e.callbackNode !== n) return null;
			var r = $;
			return r = je(e, e === Wb ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r === 0 ? null : (rl(e, r, t), Ql(e, Sp()), e.callbackNode != null && e.callbackNode === n ? $l.bind(null, e) : null);
		}
		function eu(e, t) {
			if (Nl()) return null;
			tv = nv, nv = !1, rl(e, t, !0);
		}
		function tu(e) {
			e !== dS && e !== null && yp(e);
		}
		function nu() {
			V.actQueue !== null && V.actQueue.push(function() {
				return Zl(), null;
			}), tC(function() {
				(Ub & (Pb | Fb)) === Nb ? Zl() : vp(wp, Xl);
			});
		}
		function ru() {
			if (uS === 0) {
				var e = av;
				e === 0 && (e = Rp, Rp <<= 1, !(Rp & 261888) && (Rp = 256)), uS = e;
			}
			return uS;
		}
		function iu(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (j(e, "action"), rn("" + e));
		}
		function au(e, t) {
			var n = t.ownerDocument.createElement("input");
			return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
		}
		function ou(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = iu((i[qp] || null).action), o = r.submitter;
				o && (t = (t = o[qp] || null) ? iu(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
				var s = new sh("action", "action", null, r, i);
				e.push({
					event: s,
					listeners: [{
						instance: null,
						listener: function() {
							if (r.defaultPrevented) {
								if (uS !== 0) {
									var e = o ? au(i, o) : new FormData(i), t = {
										pending: !0,
										data: e,
										method: i.method,
										action: a
									};
									Object.freeze(t), No(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = o ? au(i, o) : new FormData(i), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), No(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function su(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				fg(e);
			}
			e.currentTarget = null;
		}
		function cu(e, t) {
			t = !!(t & 4);
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? su(a, s, l) : A(c, su, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? su(a, s, l) : A(c, su, a, s, l), i = c;
					}
				}
			}
		}
		function R(e, t) {
			pS.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[Yp];
			n === void 0 && (n = t[Yp] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (du(t, e, 2, !1), n.add(r));
		}
		function lu(e, t, n) {
			pS.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), du(n, e, r, t);
		}
		function uu(e) {
			if (!e[mS]) {
				e[mS] = !0, em.forEach(function(t) {
					t !== "selectionchange" && (pS.has(t) || lu(t, !1, e), lu(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[mS] || (t[mS] = !0, lu("selectionchange", !1, t));
			}
		}
		function du(e, t, n, r) {
			switch (ff(t)) {
				case Vp:
					var i = sf;
					break;
				case Hp:
					i = cf;
					break;
				default: i = lf;
			}
			n = i.bind(null, t, n, e), i = void 0, !th || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
				capture: !0,
				passive: i
			}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
		}
		function fu(e, t, n, r, i) {
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
						if (o = Je(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			cn(function() {
				var r = a, i = on(n), o = [];
				a: {
					var s = og.get(e);
					if (s !== void 0) {
						var c = sh, l = e;
						switch (e) {
							case "keypress": if (dn(n) === 0) break a;
							case "keydown":
							case "keyup":
								c = wh;
								break;
							case "focusin":
								l = "focus", c = gh;
								break;
							case "focusout":
								l = "blur", c = gh;
								break;
							case "beforeblur":
							case "afterblur":
								c = gh;
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
								c = mh;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								c = hh;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								c = Eh;
								break;
							case $h:
							case eg:
							case tg:
								c = _h;
								break;
							case ag:
								c = Dh;
								break;
							case "scroll":
							case "scrollend":
								c = lh;
								break;
							case "wheel":
								c = Oh;
								break;
							case "copy":
							case "cut":
							case "paste":
								c = vh;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								c = Th;
								break;
							case "toggle":
							case "beforetoggle": c = kh;
						}
						var u = !!(t & 4), d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
						u = [];
						for (var p = r, m; p !== null;) {
							var h = p;
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = ln(p, f), h != null && u.push(pu(p, h, m))), d) break;
							p = p.return;
						}
						0 < u.length && (s = new c(s, l, null, n, i), o.push({
							event: s,
							listeners: u
						}));
					}
				}
				if (!(t & 7)) {
					a: {
						if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Xm && (l = n.relatedTarget || n.fromElement) && (Je(l) || l[Jp])) break a;
						if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Je(l) : null, l !== null && (d = x(l), u = l.tag, l !== d || u !== 5 && u !== 27 && u !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
							if (u = mh, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Th, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : Xe(c), m = l == null ? s : Xe(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Je(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
								for (u = hu, f = c, p = l, m = 0, h = f; h; h = u(h)) m++;
								h = 0;
								for (var g = p; g; g = u(g)) h++;
								for (; 0 < m - h;) f = u(f), m--;
								for (; 0 < h - m;) p = u(p), h--;
								for (; m--;) {
									if (f === p || p !== null && f === p.alternate) {
										u = f;
										break b;
									}
									f = u(f), p = u(p);
								}
								u = null;
							}
							else u = null;
							c !== null && gu(o, s, c, u, !1), l !== null && d !== null && gu(o, d, l, u, !0);
						}
					}
					a: {
						if (s = r ? Xe(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var _ = En;
						else if (xn(s)) if (Uh) _ = Mn;
						else {
							_ = An;
							var v = kn;
						}
						else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && Zt(r.elementType) && (_ = En) : _ = jn;
						if (_ &&= _(e, r)) {
							Cn(o, _, n, i);
							break a;
						}
						v && v(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && gt(s, "number", s.value);
					}
					switch (v = r ? Xe(r) : window, e) {
						case "focusin":
							(xn(v) || v.contentEditable === "true") && (Kh = v, qh = r, Jh = null);
							break;
						case "focusout":
							Jh = qh = Kh = null;
							break;
						case "mousedown":
							Yh = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							Yh = !1, Bn(o, n, i);
							break;
						case "selectionchange": if (Gh) break;
						case "keydown":
						case "keyup": Bn(o, n, i);
					}
					var y;
					if (Mh) b: {
						switch (e) {
							case "compositionstart":
								var b = "onCompositionStart";
								break b;
							case "compositionend":
								b = "onCompositionEnd";
								break b;
							case "compositionupdate":
								b = "onCompositionUpdate";
								break b;
						}
						b = void 0;
					}
					else zh ? _n(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === jh && (b = "onCompositionStart");
					b && (Fh && n.locale !== "ko" && (zh || b !== "onCompositionStart" ? b === "onCompositionEnd" && zh && (y = un()) : (rh = i, ih = "value" in rh ? rh.value : rh.textContent, zh = !0)), v = mu(r, b), 0 < v.length && (b = new yh(b, e, null, n, i), o.push({
						event: b,
						listeners: v
					}), y ? b.data = y : (y = vn(n), y !== null && (b.data = y)))), (y = Ph ? yn(e, n) : bn(e, n)) && (b = mu(r, "onBeforeInput"), 0 < b.length && (v = new bh("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: v,
						listeners: b
					}), v.data = y)), ou(o, e, r, n, i);
				}
				cu(o, t);
			});
		}
		function pu(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function mu(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = ln(e, n), i != null && r.unshift(pu(e, i, a)), i = ln(e, t), i != null && r.push(pu(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function hu(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function gu(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = ln(n, a), l != null && o.unshift(pu(n, l, c))) : i || (l = ln(n, a), l != null && o.push(pu(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function _u(e, t) {
			en(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Um || (Um = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: tm,
				possibleRegistrationNames: nm
			};
			Zt(e) || typeof t.is == "string" || nn(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function vu(e, t, n, r) {
			t !== n && (n = Su(n), Su(t) !== n && (r[e] = t));
		}
		function yu(e, t, n) {
			t.forEach(function(t) {
				n[Ou(t)] = t === "style" ? ku(e) : e.getAttribute(t);
			});
		}
		function bu(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function xu(e, t) {
			return e = e.namespaceURI === Fm || e.namespaceURI === Im ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function Su(e) {
			return Ce(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", Se(e)), we(e)), (typeof e == "string" ? e : "" + e).replace(CS, "\n").replace(wS, "");
		}
		function Cu(e, t) {
			return t = Su(t), Su(e) === t;
		}
		function wu(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					typeof r == "string" ? (Kt(r, t, !1), t === "body" || t === "textarea" && r === "" || qt(e, r)) : (typeof r == "number" || typeof r == "bigint") && (Kt("" + r, t, !1), t !== "body" && qt(e, "" + r));
					break;
				case "className":
					at(e, "class", r);
					break;
				case "tabIndex":
					at(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					at(e, n, r);
					break;
				case "style":
					Xt(e, r, a);
					break;
				case "data": if (t !== "object") {
					at(e, "data", r);
					break;
				}
				case "src":
				case "href":
					if (r === "" && (t !== "a" || n !== "href")) {
						console.error(n === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", n, n), e.removeAttribute(n);
						break;
					}
					if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					j(r, n), r = rn("" + r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || bS || (bS = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || yS || (yS = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || _S ? t !== "button" || i.type == null || i.type === "submit" || _S ? typeof r == "function" && (i.name == null || vS || (vS = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || bS || (bS = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || yS || (yS = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (_S = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (_S = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					}
					if (typeof a == "function" && (n === "formAction" ? (t !== "input" && wu(e, t, "name", i.name, i, null), wu(e, t, "formEncType", i.formEncType, i, null), wu(e, t, "formMethod", i.formMethod, i, null), wu(e, t, "formTarget", i.formTarget, i, null)) : (wu(e, t, "encType", i.encType, i, null), wu(e, t, "method", i.method, i, null), wu(e, t, "target", i.target, i, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					j(r, n), r = rn("" + r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && bu(n, r), e.onclick = an);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && bu(n, r), R("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && bu(n, r), R("scrollend", e));
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
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
					j(r, n), n = rn("" + r), e.setAttributeNS(TS, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (j(r, n), e.setAttribute(n, "" + r)) : e.removeAttribute(n);
					break;
				case "inert": r !== "" || SS[n] || (SS[n] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", n));
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
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (j(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (j(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (j(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					R("beforetoggle", e), R("toggle", e), it(e, "popover", r);
					break;
				case "xlinkActuate":
					ot(e, TS, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					ot(e, TS, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					ot(e, TS, "xlink:role", r);
					break;
				case "xlinkShow":
					ot(e, TS, "xlink:show", r);
					break;
				case "xlinkTitle":
					ot(e, TS, "xlink:title", r);
					break;
				case "xlinkType":
					ot(e, TS, "xlink:type", r);
					break;
				case "xmlBase":
					ot(e, ES, "xml:base", r);
					break;
				case "xmlLang":
					ot(e, ES, "xml:lang", r);
					break;
				case "xmlSpace":
					ot(e, ES, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), it(e, "is", r);
					break;
				case "innerText":
				case "textContent": break;
				case "popoverTarget": xS || typeof r != "object" || !r || (xS = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N" ? (n = Qt(n), it(e, n, r)) : tm.hasOwnProperty(n) && r != null && typeof r != "function" && bu(n, r);
			}
		}
		function Tu(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					Xt(e, r, a);
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							e.innerHTML = n;
						}
					}
					break;
				case "children":
					typeof r == "string" ? qt(e, r) : (typeof r == "number" || typeof r == "bigint") && qt(e, "" + r);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && bu(n, r), R("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && bu(n, r), R("scrollend", e));
					break;
				case "onClick":
					r != null && (typeof r != "function" && bu(n, r), e.onclick = an);
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": break;
				case "innerText":
				case "textContent": break;
				default: if (tm.hasOwnProperty(n)) r != null && typeof r != "function" && bu(n, r);
				else a: {
					if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[qp] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
						typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
						break a;
					}
					n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : it(e, n, r);
				}
			}
		}
		function Eu(e, t, n) {
			switch (_u(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					R("error", e), R("load", e);
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
							case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							default: wu(e, t, a, o, n, null);
						}
					}
					i && wu(e, t, "srcSet", n.srcSet, n, null), r && wu(e, t, "src", n.src, n, null);
					return;
				case "input":
					tt("input", n), R("invalid", e);
					var s = a = o = i = null, c = null, l = null;
					for (r in n) if (n.hasOwnProperty(r)) {
						var u = n[r];
						if (u != null) switch (r) {
							case "name":
								i = u;
								break;
							case "type":
								o = u;
								break;
							case "checked":
								c = u;
								break;
							case "defaultChecked":
								l = u;
								break;
							case "value":
								a = u;
								break;
							case "defaultValue":
								s = u;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (u != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: wu(e, t, r, u, n, null);
						}
					}
					pt(e, n), ht(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in tt("select", n), R("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: wu(e, t, i, s, n, null);
					}
					bt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && yt(e, !!r, n, !0) : yt(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in tt("textarea", n), R("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
						case "value":
							r = s;
							break;
						case "defaultValue":
							i = s;
							break;
						case "children":
							a = s;
							break;
						case "dangerouslySetInnerHTML":
							if (s != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: wu(e, t, o, s, n, null);
					}
					xt(e, n), Ct(e, r, i, a);
					return;
				case "option":
					for (c in _t(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: wu(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					R("beforetoggle", e), R("toggle", e), R("cancel", e), R("close", e);
					break;
				case "iframe":
				case "object":
					R("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < fS.length; r++) R(fS[r], e);
					break;
				case "image":
					R("error", e), R("load", e);
					break;
				case "details":
					R("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": R("error", e), R("load", e);
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
					for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
						default: wu(e, t, l, r, n, null);
					}
					return;
				default: if (Zt(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && Tu(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && wu(e, t, s, r, n, null));
		}
		function Du(e, t, n, r) {
			switch (_u(t, r), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "input":
					var i = null, a = null, o = null, s = null, c = null, l = null, u = null;
					for (p in n) {
						var d = n[p];
						if (n.hasOwnProperty(p) && d != null) switch (p) {
							case "checked": break;
							case "value": break;
							case "defaultValue": c = d;
							default: r.hasOwnProperty(p) || wu(e, t, p, null, r, d);
						}
					}
					for (var f in r) {
						var p = r[f];
						if (d = n[f], r.hasOwnProperty(f) && (p != null || d != null)) switch (f) {
							case "type":
								a = p;
								break;
							case "name":
								i = p;
								break;
							case "checked":
								l = p;
								break;
							case "defaultChecked":
								u = p;
								break;
							case "value":
								o = p;
								break;
							case "defaultValue":
								s = p;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (p != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: p !== d && wu(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || gS || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), gS = !0), !t || r || hS || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), hS = !0), mt(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || wu(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							f = a;
							break;
						case "defaultValue":
							s = a;
							break;
						case "multiple": o = a;
						default: a !== c && wu(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? yt(e, !!t, t ? [] : "", !1) : yt(e, !!t, r, !0)) : yt(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: wu(e, t, s, null, r, i);
					}
					for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
						case "value":
							f = i;
							break;
						case "defaultValue":
							p = i;
							break;
						case "children": break;
						case "dangerouslySetInnerHTML":
							if (i != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: i !== a && wu(e, t, o, i, r, a);
					}
					St(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: wu(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: wu(e, t, c, f, r, p);
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
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && wu(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: wu(e, t, l, f, r, p);
					}
					return;
				default: if (Zt(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && Tu(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || Tu(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && wu(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || wu(e, t, d, f, r, p);
		}
		function Ou(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function ku(e) {
			var t = {};
			e = e.style;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				t[r] = e.getPropertyValue(r);
			}
			return t;
		}
		function Au(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (Te(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || Pm.has(a) ? (Te(o, a), r += i + a.replace(wm, "-$1").toLowerCase().replace(Tm, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(wm, "-$1").toLowerCase().replace(Tm, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = Su(r), Su(t) !== r && (n.style = ku(e)));
			}
		}
		function ju(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (j(r, t), e === "" + r) return;
			}
			vu(t, e, r, a);
		}
		function Mu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) {
				switch (typeof r) {
					case "function":
					case "symbol": return;
				}
				if (!r) return;
			} else switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (r) return;
			}
			vu(t, e, r, a);
		}
		function Nu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (j(r, n), e === "" + r) return;
			}
			vu(t, e, r, a);
		}
		function Pu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
				default: if (isNaN(r)) return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (!isNaN(r) && (j(r, t), e === "" + r)) return;
			}
			vu(t, e, r, a);
		}
		function Fu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (j(r, t), n = rn("" + r), e === n) return;
			}
			vu(t, e, r, a);
		}
		function Iu(e, t, n, r) {
			for (var i = {}, a = /* @__PURE__ */ new Set(), o = e.attributes, s = 0; s < o.length; s++) switch (o[s].name.toLowerCase()) {
				case "value": break;
				case "checked": break;
				case "selected": break;
				default: a.add(o[s].name);
			}
			if (Zt(t)) {
				for (var c in n) if (n.hasOwnProperty(c)) {
					var l = n[c];
					if (l != null) {
						if (tm.hasOwnProperty(c)) typeof l != "function" && bu(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || vu("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = xu(e, l), vu(c, o, l, i));
								continue;
							case "style":
								a.delete(c), Au(e, l, i);
								continue;
							case "offsetParent":
							case "offsetTop":
							case "offsetLeft":
							case "offsetWidth":
							case "offsetHeight":
							case "isContentEditable":
							case "outerText":
							case "outerHTML":
								a.delete(c.toLowerCase()), console.error("Assignment to read-only property will result in a no-op: `%s`", c);
								continue;
							case "className":
								a.delete("class"), o = rt(e, "class", l), vu("className", o, l, i);
								continue;
							default: r.context === US && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = rt(e, c, l), vu(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if (tm.hasOwnProperty(l)) typeof c != "function" && bu(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || vu("children", e.textContent, c, i);
						continue;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning":
					case "value":
					case "checked":
					case "selected":
					case "defaultValue":
					case "defaultChecked":
					case "innerHTML":
					case "ref": continue;
					case "dangerouslySetInnerHTML":
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = xu(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						ju(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						ju(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), Au(e, c, i);
						continue;
					case "multiple":
						a.delete(l), vu(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), vu(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), vu(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), vu(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Fu(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						}
						if (o === DS) {
							a.delete(l.toLowerCase()), vu(l, "function", c, i);
							continue;
						}
						Fu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Fu(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						Nu(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						Nu(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						Nu(e, l, l, c, a, i);
						continue;
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
						Mu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "capture":
					case "download":
						a: {
							s = e;
							var u = o = l, d = i;
							if (a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol": break a;
								default: if (!1 === c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol": break;
								case "boolean":
									if (!0 === c && s === "") break a;
									break;
								default: if (j(c, o), s === "" + c) break a;
							}
							vu(o, s, c, d);
						}
						continue;
					case "cols":
					case "rows":
					case "size":
					case "span":
						a: {
							if (s = e, u = o = l, d = i, a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol":
								case "boolean": break a;
								default: if (isNaN(c) || 1 > c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol":
								case "boolean": break;
								default: if (!(isNaN(c) || 1 > c) && (j(c, o), s === "" + c)) break a;
							}
							vu(o, s, c, d);
						}
						continue;
					case "rowSpan":
						Pu(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						Pu(e, l, l, c, a, i);
						continue;
					case "xHeight":
						ju(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						ju(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						ju(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						ju(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						ju(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						ju(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						ju(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						ju(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						ju(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						ju(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || SS[l] || (SS[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), Mu(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = Qt(l), o = !1, r.context === US && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Rm.hasOwnProperty(u) && Rm[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, nt(d)) if (u.hasAttribute(d)) u = u.getAttribute(d), j(s, d), s = u === "" + s ? s : u;
						else {
							switch (typeof s) {
								case "function":
								case "symbol": break a;
								case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
							}
							s = s === void 0 ? void 0 : null;
						}
						else s = void 0;
						o || vu(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && yu(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function Lu(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function Ru(e) {
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
		function zu() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && Ru(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && Ru(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function Bu(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Vu(e) {
			switch (e) {
				case Im: return WS;
				case Fm: return GS;
				default: return US;
			}
		}
		function Hu(e, t) {
			if (e === US) switch (t) {
				case "svg": return WS;
				case "math": return GS;
				default: return US;
			}
			return e === WS && t === "foreignObject" ? US : e;
		}
		function Uu(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function Wu() {
			var e = window.event;
			return e && e.type === "popstate" ? e !== YS && (YS = e, !0) : (YS = null, !1);
		}
		function Gu() {
			var e = window.event;
			return e && e !== XS ? e.type : null;
		}
		function Ku() {
			var e = window.event;
			return e && e !== XS ? e.timeStamp : -1.1;
		}
		function qu(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function Ju(e, t, n) {
			switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && e.focus();
					break;
				case "img": n.src ? e.src = n.src : n.srcSet && (e.srcset = n.srcSet);
			}
		}
		function Yu() {}
		function Xu(e, t, n, r) {
			Du(e, t, n, r), e[qp] = r;
		}
		function Zu(e) {
			qt(e, "");
		}
		function Qu(e, t, n) {
			e.nodeValue = n;
		}
		function $u(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[qp] || null;
				if (t !== null) {
					var n = Ye(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, A(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, A(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function ed(e) {
			return e === "head";
		}
		function td(e, t) {
			e.removeChild(t);
		}
		function nd(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function rd(e, t) {
			var n = t, r = 0;
			do {
				var i = n.nextSibling;
				if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === MS || n === AS) {
					if (r === 0) {
						e.removeChild(i), Sf(t);
						return;
					}
					r--;
				} else if (n === jS || n === NS || n === PS || n === FS || n === kS) r++;
				else if (n === IS) Od(e.ownerDocument.documentElement);
				else if (n === RS) {
					n = e.ownerDocument.head, Od(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[$p] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === LS && Od(e.ownerDocument.body);
				n = i;
			} while (n);
			Sf(t);
		}
		function id(e, t) {
			var n = e;
			e = 0;
			do {
				var r = n.nextSibling;
				if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === MS) {
					if (e === 0) break;
					e--;
				} else n !== jS && n !== NS && n !== PS && n !== FS || e++;
				n = r;
			} while (n);
		}
		function ad(e) {
			id(e, !0);
		}
		function od(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function sd(e) {
			e.nodeValue = "";
		}
		function cd(e) {
			id(e, !1);
		}
		function ld(e, t) {
			t = t[HS], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function ud(e, t) {
			e.nodeValue = t;
		}
		function dd(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						dd(n), qe(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function fd(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) if (t === "input" && e.type === "hidden") {
					j(i.name, "name");
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
				else if (!e[$p]) switch (t) {
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
				if (e = vd(e.nextSibling), e === null) break;
			}
			return null;
		}
		function pd(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = vd(e.nextSibling), e === null)) return null;
			return e;
		}
		function md(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = vd(e.nextSibling), e === null)) return null;
			return e;
		}
		function hd(e) {
			return e.data === NS || e.data === PS;
		}
		function gd(e) {
			return e.data === FS || e.data === NS && e.ownerDocument.readyState !== VS;
		}
		function _d(e, t) {
			var n = e.ownerDocument;
			if (e.data === PS) e._reactRetry = t;
			else if (e.data !== NS || n.readyState !== VS) t();
			else {
				var r = function() {
					t(), n.removeEventListener("DOMContentLoaded", r);
				};
				n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
			}
		}
		function vd(e) {
			for (; e != null; e = e.nextSibling) {
				var t = e.nodeType;
				if (t === 1 || t === 3) break;
				if (t === 8) {
					if (t = e.data, t === jS || t === FS || t === NS || t === PS || t === kS || t === zS || t === BS) break;
					if (t === MS || t === AS) return null;
				}
			}
			return e;
		}
		function yd(e) {
			if (e.nodeType === 1) {
				for (var t = e.nodeName.toLowerCase(), n = {}, r = e.attributes, i = 0; i < r.length; i++) {
					var a = r[i];
					n[Ou(a.name)] = a.name.toLowerCase() === "style" ? ku(e) : a.value;
				}
				return {
					type: t,
					props: n
				};
			}
			return e.nodeType === 8 ? e.data === kS ? {
				type: "Activity",
				props: {}
			} : {
				type: "Suspense",
				props: {}
			} : e.nodeValue;
		}
		function bd(e, t, n) {
			return n === null || !0 !== n[OS] ? (e.nodeValue === t ? e = null : (t = Su(t), e = Su(e.nodeValue) === t ? null : e.nodeValue), e) : null;
		}
		function xd(e) {
			e = e.nextSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === MS || n === AS) {
						if (t === 0) return vd(e.nextSibling);
						t--;
					} else n !== jS && n !== FS && n !== NS && n !== PS && n !== kS || t++;
				}
				e = e.nextSibling;
			}
			return null;
		}
		function Sd(e) {
			e = e.previousSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === jS || n === FS || n === NS || n === PS || n === kS) {
						if (t === 0) return e;
						t--;
					} else n !== MS && n !== AS || t++;
				}
				e = e.previousSibling;
			}
			return null;
		}
		function Cd(e) {
			Sf(e);
		}
		function wd(e) {
			Sf(e);
		}
		function Td(e) {
			Sf(e);
		}
		function Ed(e, t, n, r, i) {
			switch (i && Gt(e, r.ancestorInfo), t = Bu(n), e) {
				case "html":
					if (e = t.documentElement, !e) throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "head":
					if (e = t.head, !e) throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "body":
					if (e = t.body, !e) throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				default: throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
		}
		function Dd(e, t, n, r) {
			if (!n[Jp] && Ye(n)) {
				var i = n.tagName.toLowerCase();
				console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.", i, i, i);
			}
			switch (e) {
				case "html":
				case "head":
				case "body": break;
				default: console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
			for (i = n.attributes; i.length;) n.removeAttributeNode(i[0]);
			Eu(n, e, t), n[Kp] = r, n[qp] = t;
		}
		function Od(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			qe(e);
		}
		function kd(e) {
			return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Ad(e, t, n) {
			var r = dC;
			if (r && typeof t == "string" && t) {
				var i = ft(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), lC.has(i) || (lC.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), Eu(t, "link", e), Qe(t), r.head.appendChild(t)));
			}
		}
		function jd(e, t, n, r) {
			var i = (i = tp.current) ? kd(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = z(n.href), t = Ze(i).hoistableStyles, r = t.get(n), r || (r = {
					type: "style",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				case "link":
					if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
						e = z(n.href);
						var a = Ze(i).hoistableStyles, o = a.get(e);
						if (!o && (i = i.ownerDocument || i, o = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: rC,
								preload: null
							}
						}, a.set(e, o), (a = i.querySelector(Nd(e))) && !a._p && (o.instance = a, o.state.loading = iC | sC), !cC.has(e))) {
							var s = {
								rel: "preload",
								as: "style",
								href: n.href,
								crossOrigin: n.crossOrigin,
								integrity: n.integrity,
								media: n.media,
								hrefLang: n.hrefLang,
								referrerPolicy: n.referrerPolicy
							};
							cC.set(e, s), a || Fd(i, e, s, o.state);
						}
						if (t && r === null) throw n = "\n\n  - " + Md(t) + "\n  + " + Md(n), Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
						return o;
					}
					if (t && r !== null) throw n = "\n\n  - " + Md(t) + "\n  + " + Md(n), Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
					return null;
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Id(n), t = Ze(i).hoistableScripts, r = t.get(n), r || (r = {
					type: "script",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				default: throw Error("getResource encountered a type it did not expect: \"" + e + "\". this is a bug in React.");
			}
		}
		function Md(e) {
			var t = 0, n = "<link";
			return typeof e.rel == "string" ? (t++, n += " rel=\"" + e.rel + "\"") : _p.call(e, "rel") && (t++, n += " rel=\"" + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + "\""), typeof e.href == "string" ? (t++, n += " href=\"" + e.href + "\"") : _p.call(e, "href") && (t++, n += " href=\"" + (e.href === null ? "null" : "invalid type " + typeof e.href) + "\""), typeof e.precedence == "string" ? (t++, n += " precedence=\"" + e.precedence + "\"") : _p.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
		}
		function z(e) {
			return "href=\"" + ft(e) + "\"";
		}
		function Nd(e) {
			return "link[rel=\"stylesheet\"][" + e + "]";
		}
		function Pd(e) {
			return B({}, e, {
				"data-precedence": e.precedence,
				precedence: null
			});
		}
		function Fd(e, t, n, r) {
			e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = iC : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
				return r.loading |= iC;
			}), t.addEventListener("error", function() {
				return r.loading |= aC;
			}), Eu(t, "link", n), Qe(t), e.head.appendChild(t));
		}
		function Id(e) {
			return "[src=\"" + ft(e) + "\"]";
		}
		function Ld(e) {
			return "script[async]" + e;
		}
		function Rd(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + ft(n.href) + "\"]");
					if (r) return t.instance = r, Qe(r), r;
					var i = B({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), Qe(r), Eu(r, "style", i), zd(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = z(n.href);
					var a = e.querySelector(Nd(i));
					if (a) return t.state.loading |= sC, t.instance = a, Qe(a), a;
					r = Pd(n), (i = cC.get(i)) && Bd(r, i), a = (e.ownerDocument || e).createElement("link"), Qe(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Eu(a, "link", r), t.state.loading |= sC, zd(a, n.precedence, e), t.instance = a;
				case "script": return a = Id(n.src), (i = e.querySelector(Ld(a))) ? (t.instance = i, Qe(i), i) : (r = n, (i = cC.get(a)) && (r = B({}, n), Vd(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), Qe(i), Eu(i, "link", r), e.head.appendChild(i), t.instance = i);
				case "void": return null;
				default: throw Error("acquireResource encountered a resource type it did not expect: \"" + t.type + "\". this is a bug in React.");
			}
			else t.type === "stylesheet" && (t.state.loading & sC) === rC && (r = t.instance, t.state.loading |= sC, zd(r, n.precedence, e));
			return t.instance;
		}
		function zd(e, t, n) {
			for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
				var s = r[o];
				if (s.dataset.precedence === t) a = s;
				else if (a !== i) break;
			}
			a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
		}
		function Bd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
		}
		function Vd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
		}
		function Hd(e, t, n) {
			if (fC === null) {
				var r = /* @__PURE__ */ new Map(), i = fC = /* @__PURE__ */ new Map();
				i.set(n, r);
			} else i = fC, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
			if (r.has(e)) return r;
			for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
				var a = n[i];
				if (!(a[$p] || a[Kp] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== Im) {
					var o = a.getAttribute(t) || "";
					o = e + o;
					var s = r.get(o);
					s ? s.push(a) : r.set(o, [a]);
				}
			}
			return r;
		}
		function Ud(e, t, n) {
			e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
		}
		function Wd(e, t, n) {
			var r = !n.ancestorInfo.containerTagInScope;
			if (n.context === WS || t.itemProp != null) return !r || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.", e, e), !1;
			switch (e) {
				case "meta":
				case "title": return !0;
				case "style":
					if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
						r && console.error("Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel=\"stylesheet\" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence=\"default\"` and `href=\"some unique resource identifier\"`.");
						break;
					}
					return !0;
				case "link":
					if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
						if (t.rel === "stylesheet" && typeof t.precedence == "string") {
							e = t.href;
							var i = t.onError, a = t.disabled;
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = Lu(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
						}
						r && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag") : (t.onError || t.onLoad) && console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));
						break;
					}
					switch (t.rel) {
						case "stylesheet": return e = t.precedence, t = t.disabled, typeof e != "string" && r && console.error("Cannot render a <link rel=\"stylesheet\" /> outside the main document without knowing its precedence. Consider adding precedence=\"default\" or moving it into the root <head> tag."), typeof e == "string" && t == null;
						default: return !0;
					}
				case "script":
					if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
						r && (e ? t.onLoad || t.onError ? console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async=\"\" or moving it into the root <head> tag."));
						break;
					}
					return !0;
				case "noscript":
				case "template": r && console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.", e);
			}
			return !1;
		}
		function Gd(e) {
			return e.type !== "stylesheet" || (e.state.loading & oC) !== rC;
		}
		function Kd(e, t, n, r) {
			if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && (n.state.loading & sC) === rC) {
				if (n.instance === null) {
					var i = z(r.href), a = t.querySelector(Nd(i));
					if (a) {
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jd.bind(e), t.then(e, e)), n.state.loading |= sC, n.instance = a, Qe(a);
						return;
					}
					a = t.ownerDocument || t, r = Pd(r), (i = cC.get(i)) && Bd(r, i), a = a.createElement("link"), Qe(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Eu(a, "link", r), n.instance = a;
				}
				e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & oC) === rC && (e.count++, n = Jd.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
			}
		}
		function qd(e, t) {
			return e.stylesheets && e.count === 0 && Yd(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
				var r = setTimeout(function() {
					if (e.stylesheets && Yd(e, e.stylesheets), e.unsuspend) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, pC + t);
				0 < e.imgBytes && gC === 0 && (gC = 125 * zu() * hC);
				var i = setTimeout(function() {
					if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Yd(e, e.stylesheets), e.unsuspend)) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, (e.imgBytes > gC ? 50 : mC) + t);
				return e.unsuspend = n, function() {
					e.unsuspend = null, clearTimeout(r), clearTimeout(i);
				};
			} : null;
		}
		function Jd() {
			if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
				if (this.stylesheets) Yd(this, this.stylesheets);
				else if (this.unsuspend) {
					var e = this.unsuspend;
					this.unsuspend = null, e();
				}
			}
		}
		function Yd(e, t) {
			e.stylesheets = null, e.unsuspend !== null && (e.count++, vC = /* @__PURE__ */ new Map(), t.forEach(Xd, e), vC = null, Jd.call(e));
		}
		function Xd(e, t) {
			if (!(t.state.loading & sC)) {
				var n = vC.get(e);
				if (n) var r = n.get(_C);
				else {
					n = /* @__PURE__ */ new Map(), vC.set(e, n);
					for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
						var o = i[a];
						(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
					}
					r && n.set(_C, r);
				}
				i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(_C, i), n.set(o, i), this.count++, r = Jd.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= sC;
			}
		}
		function Zd(e, t, n, r, i, a, o, s, c) {
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = $S, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Fe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fe(0), this.hiddenUpdates = Fe(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function Qd(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Zd(e, t, n, o, c, l, u, d, s), t = Lg, !0 === a && (t |= Rg | zg), t |= G, a = g(3, null, null, t), e.current = a, a.stateNode = e, t = ai(), oi(t), e.pooledCache = t, oi(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, Zi(a), e;
		}
		function $d(e) {
			return e ? (e = Pg, e) : Pg;
		}
		function ef(e, t, n, r, i, a) {
			if (Mp && typeof Mp.onScheduleFiberRoot == "function") try {
				Mp.onScheduleFiberRoot(jp, r, n);
			} catch (e) {
				Np || (Np = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			i = $d(i), r.context === null ? r.context = i : r.pendingContext = i, gp && hp !== null && !EC && (EC = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", E(hp) || "Unknown")), r = $i(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = ea(e, r, t), n !== null && (ci(t, "root.render()", null), nl(n, e, t), ta(n, e, t));
		}
		function tf(e, t) {
			if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
				var n = e.retryLane;
				e.retryLane = n !== 0 && n < t ? n : t;
			}
		}
		function nf(e, t) {
			tf(e, t), (e = e.alternate) && tf(e, t);
		}
		function rf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = dr(e, 67108864);
				t !== null && nl(t, e, 67108864), nf(e, 67108864);
			}
		}
		function af(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = el(e);
				t = Ve(t);
				var n = dr(e, t);
				n !== null && nl(n, e, t), nf(e, t);
			}
		}
		function of() {
			return hp;
		}
		function sf(e, t, n, r) {
			var i = V.T;
			V.T = null;
			var a = Jf.p;
			try {
				Jf.p = Vp, lf(e, t, n, r);
			} finally {
				Jf.p = a, V.T = i;
			}
		}
		function cf(e, t, n, r) {
			var i = V.T;
			V.T = null;
			var a = Jf.p;
			try {
				Jf.p = Hp, lf(e, t, n, r);
			} finally {
				Jf.p = a, V.T = i;
			}
		}
		function lf(e, t, n, r) {
			if (LC) {
				var i = uf(r);
				if (i === null) fu(e, t, r, RC, n), pf(e, r);
				else if (hf(i, e, t, n, r)) r.stopPropagation();
				else if (pf(e, r), t & 4 && -1 < KC.indexOf(e)) {
					for (; i !== null;) {
						var a = Ye(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Ae(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Fp(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										Yl(a), (Ub & (Pb | Fb)) === Nb && (yx = Sp() + bx, L(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = dr(a, 2), s !== null && nl(s, a, 2), sl(), nf(a, 2);
						}
						if (a = uf(r), a === null && fu(e, t, r, RC, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else fu(e, t, r, null, n);
			}
		}
		function uf(e) {
			return e = on(e), df(e);
		}
		function df(e) {
			if (RC = null, e = Je(e), e !== null) {
				var t = x(e);
				if (t === null) e = null;
				else {
					var n = t.tag;
					if (n === 13) {
						if (e = ee(t), e !== null) return e;
						e = null;
					} else if (n === 31) {
						if (e = te(t), e !== null) return e;
						e = null;
					} else if (n === 3) {
						if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
						e = null;
					} else t !== e && (e = null);
				}
			}
			return RC = e, null;
		}
		function ff(e) {
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
				case "selectstart": return Vp;
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
				case "pointerleave": return Hp;
				case "message": switch (Cp()) {
					case wp: return Vp;
					case Tp: return Hp;
					case Ep:
					case Dp: return Up;
					case Op: return Wp;
					default: return Up;
				}
				default: return Up;
			}
		}
		function pf(e, t) {
			switch (e) {
				case "focusin":
				case "focusout":
					BC = null;
					break;
				case "dragenter":
				case "dragleave":
					VC = null;
					break;
				case "mouseover":
				case "mouseout":
					HC = null;
					break;
				case "pointerover":
				case "pointerout":
					UC.delete(t.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture": WC.delete(t.pointerId);
			}
		}
		function mf(e, t, n, r, i, a) {
			return e === null || e.nativeEvent !== a ? (e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: a,
				targetContainers: [i]
			}, t !== null && (t = Ye(t), t !== null && rf(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
		}
		function hf(e, t, n, r, i) {
			switch (t) {
				case "focusin": return BC = mf(BC, e, t, n, r, i), !0;
				case "dragenter": return VC = mf(VC, e, t, n, r, i), !0;
				case "mouseover": return HC = mf(HC, e, t, n, r, i), !0;
				case "pointerover":
					var a = i.pointerId;
					return UC.set(a, mf(UC.get(a) || null, e, t, n, r, i)), !0;
				case "gotpointercapture": return a = i.pointerId, WC.set(a, mf(WC.get(a) || null, e, t, n, r, i)), !0;
			}
			return !1;
		}
		function gf(e) {
			var t = Je(e.target);
			if (t !== null) {
				var n = x(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = ee(n), t !== null) {
							e.blockedOn = t, Ke(e.priority, function() {
								af(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = te(n), t !== null) {
							e.blockedOn = t, Ke(e.priority, function() {
								af(n);
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
		function _f(e) {
			if (e.blockedOn !== null) return !1;
			for (var t = e.targetContainers; 0 < t.length;) {
				var n = uf(e.nativeEvent);
				if (n === null) {
					n = e.nativeEvent;
					var r = new n.constructor(n.type, n), i = r;
					Xm !== null && console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Xm = i, n.target.dispatchEvent(r), Xm === null && console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Xm = null;
				} else return t = Ye(n), t !== null && rf(t), e.blockedOn = n, !1;
				t.shift();
			}
			return !0;
		}
		function vf(e, t, n) {
			_f(e) && n.delete(t);
		}
		function yf() {
			zC = !1, BC !== null && _f(BC) && (BC = null), VC !== null && _f(VC) && (VC = null), HC !== null && _f(HC) && (HC = null), UC.forEach(vf), WC.forEach(vf);
		}
		function bf(e, t) {
			e.blockedOn === t && (e.blockedOn = null, zC || (zC = !0, Df.unstable_scheduleCallback(Df.unstable_NormalPriority, yf)));
		}
		function xf(e) {
			qC !== e && (qC = e, Df.unstable_scheduleCallback(Df.unstable_NormalPriority, function() {
				qC === e && (qC = null);
				for (var t = 0; t < e.length; t += 3) {
					var n = e[t], r = e[t + 1], i = e[t + 2];
					if (typeof r != "function") {
						if (df(r || n) === null) continue;
						break;
					}
					var a = Ye(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), No(a, n, r, i));
				}
			}));
		}
		function Sf(e) {
			function t(t) {
				return bf(t, e);
			}
			BC !== null && bf(BC, e), VC !== null && bf(VC, e), HC !== null && bf(HC, e), UC.forEach(t), WC.forEach(t);
			for (var n = 0; n < GC.length; n++) {
				var r = GC[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
			for (; 0 < GC.length && (n = GC[0], n.blockedOn === null);) gf(n), n.blockedOn === null && GC.shift();
			if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
				var i = n[r], a = n[r + 1], o = i[qp] || null;
				if (typeof a == "function") o || xf(n);
				else if (o) {
					var s = null;
					if (a && a.hasAttribute("formAction")) {
						if (i = a, o = a[qp] || null) s = o.formAction;
						else if (df(i) !== null) continue;
					} else s = o.action;
					typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), xf(n);
				}
			}
		}
		function Cf() {
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
		function wf(e) {
			this._internalRoot = e;
		}
		function Tf(e) {
			this._internalRoot = e;
		}
		function Ef(e) {
			e[Jp] && (e._reactRootContainer ? console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var Df = f(), Of = l(), kf = h(), B = Object.assign, Af = Symbol.for("react.element"), jf = Symbol.for("react.transitional.element"), Mf = Symbol.for("react.portal"), Nf = Symbol.for("react.fragment"), Pf = Symbol.for("react.strict_mode"), Ff = Symbol.for("react.profiler"), If = Symbol.for("react.consumer"), Lf = Symbol.for("react.context"), Rf = Symbol.for("react.forward_ref"), zf = Symbol.for("react.suspense"), Bf = Symbol.for("react.suspense_list"), Vf = Symbol.for("react.memo"), Hf = Symbol.for("react.lazy"), Uf = Symbol.for("react.activity"), Wf = Symbol.for("react.memo_cache_sentinel"), Gf = Symbol.iterator, Kf = Symbol.for("react.client.reference"), qf = Array.isArray, V = Of.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Jf = kf.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Yf = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), Xf = [], Zf = [], Qf = -1, $f = ie(null), ep = ie(null), tp = ie(null), np = ie(null), rp = 0, ip, ap, op, sp, cp, lp, up;
		ue.__reactDisabledLog = !0;
		var dp, fp, pp = !1, mp = new (typeof WeakMap == "function" ? WeakMap : Map)(), hp = null, gp = !1, _p = Object.prototype.hasOwnProperty, vp = Df.unstable_scheduleCallback, yp = Df.unstable_cancelCallback, bp = Df.unstable_shouldYield, xp = Df.unstable_requestPaint, Sp = Df.unstable_now, Cp = Df.unstable_getCurrentPriorityLevel, wp = Df.unstable_ImmediatePriority, Tp = Df.unstable_UserBlockingPriority, Ep = Df.unstable_NormalPriority, Dp = Df.unstable_LowPriority, Op = Df.unstable_IdlePriority, kp = Df.log, Ap = Df.unstable_setDisableYieldValue, jp = null, Mp = null, Np = !1, Pp = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Fp = Math.clz32 ? Math.clz32 : ke, Ip = Math.log, Lp = Math.LN2, Rp = 256, zp = 262144, Bp = 4194304, Vp = 2, Hp = 8, Up = 32, Wp = 268435456, Gp = Math.random().toString(36).slice(2), Kp = "__reactFiber$" + Gp, qp = "__reactProps$" + Gp, Jp = "__reactContainer$" + Gp, Yp = "__reactEvents$" + Gp, Xp = "__reactListeners$" + Gp, Zp = "__reactHandles$" + Gp, Qp = "__reactResources$" + Gp, $p = "__reactMarker$" + Gp, em = /* @__PURE__ */ new Set(), tm = {}, nm = {}, rm = {
			button: !0,
			checkbox: !0,
			image: !0,
			hidden: !0,
			radio: !0,
			reset: !0,
			submit: !0
		}, im = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), am = {}, om = {}, sm = /[\n"\\]/g, cm = !1, lm = !1, um = !1, dm = !1, fm = !1, pm = !1, mm = ["value", "defaultValue"], hm = !1, gm = /["'&<>\n\t]|^\s|\s$/, _m = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "), vm = "applet caption html table td th marquee object template foreignObject desc title".split(" "), ym = vm.concat(["button"]), bm = "dd dt li option optgroup p rp rt".split(" "), xm = {
			current: null,
			formTag: null,
			aTagInScope: null,
			buttonTagInScope: null,
			nobrTagInScope: null,
			pTagInButtonScope: null,
			listItemTagAutoclosing: null,
			dlItemTagAutoclosing: null,
			containerTagInScope: null,
			implicitRootScope: !1
		}, Sm = {}, Cm = {
			animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),
			background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),
			backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
			border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),
			borderBlockEnd: [
				"borderBlockEndColor",
				"borderBlockEndStyle",
				"borderBlockEndWidth"
			],
			borderBlockStart: [
				"borderBlockStartColor",
				"borderBlockStartStyle",
				"borderBlockStartWidth"
			],
			borderBottom: [
				"borderBottomColor",
				"borderBottomStyle",
				"borderBottomWidth"
			],
			borderColor: [
				"borderBottomColor",
				"borderLeftColor",
				"borderRightColor",
				"borderTopColor"
			],
			borderImage: [
				"borderImageOutset",
				"borderImageRepeat",
				"borderImageSlice",
				"borderImageSource",
				"borderImageWidth"
			],
			borderInlineEnd: [
				"borderInlineEndColor",
				"borderInlineEndStyle",
				"borderInlineEndWidth"
			],
			borderInlineStart: [
				"borderInlineStartColor",
				"borderInlineStartStyle",
				"borderInlineStartWidth"
			],
			borderLeft: [
				"borderLeftColor",
				"borderLeftStyle",
				"borderLeftWidth"
			],
			borderRadius: [
				"borderBottomLeftRadius",
				"borderBottomRightRadius",
				"borderTopLeftRadius",
				"borderTopRightRadius"
			],
			borderRight: [
				"borderRightColor",
				"borderRightStyle",
				"borderRightWidth"
			],
			borderStyle: [
				"borderBottomStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderTopStyle"
			],
			borderTop: [
				"borderTopColor",
				"borderTopStyle",
				"borderTopWidth"
			],
			borderWidth: [
				"borderBottomWidth",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth"
			],
			columnRule: [
				"columnRuleColor",
				"columnRuleStyle",
				"columnRuleWidth"
			],
			columns: ["columnCount", "columnWidth"],
			flex: [
				"flexBasis",
				"flexGrow",
				"flexShrink"
			],
			flexFlow: ["flexDirection", "flexWrap"],
			font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),
			fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),
			gap: ["columnGap", "rowGap"],
			grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),
			gridArea: [
				"gridColumnEnd",
				"gridColumnStart",
				"gridRowEnd",
				"gridRowStart"
			],
			gridColumn: ["gridColumnEnd", "gridColumnStart"],
			gridColumnGap: ["columnGap"],
			gridGap: ["columnGap", "rowGap"],
			gridRow: ["gridRowEnd", "gridRowStart"],
			gridRowGap: ["rowGap"],
			gridTemplate: [
				"gridTemplateAreas",
				"gridTemplateColumns",
				"gridTemplateRows"
			],
			listStyle: [
				"listStyleImage",
				"listStylePosition",
				"listStyleType"
			],
			margin: [
				"marginBottom",
				"marginLeft",
				"marginRight",
				"marginTop"
			],
			marker: [
				"markerEnd",
				"markerMid",
				"markerStart"
			],
			mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),
			maskPosition: ["maskPositionX", "maskPositionY"],
			outline: [
				"outlineColor",
				"outlineStyle",
				"outlineWidth"
			],
			overflow: ["overflowX", "overflowY"],
			padding: [
				"paddingBottom",
				"paddingLeft",
				"paddingRight",
				"paddingTop"
			],
			placeContent: ["alignContent", "justifyContent"],
			placeItems: ["alignItems", "justifyItems"],
			placeSelf: ["alignSelf", "justifySelf"],
			textDecoration: [
				"textDecorationColor",
				"textDecorationLine",
				"textDecorationStyle"
			],
			textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
			transition: [
				"transitionDelay",
				"transitionDuration",
				"transitionProperty",
				"transitionTimingFunction"
			],
			wordWrap: ["overflowWrap"]
		}, wm = /([A-Z])/g, Tm = /^ms-/, Em = /^(?:webkit|moz|o)[A-Z]/, Dm = /^-ms-/, Om = /-(.)/g, km = /;\s*$/, Am = {}, jm = {}, Mm = !1, Nm = !1, Pm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Fm = "http://www.w3.org/1998/Math/MathML", Im = "http://www.w3.org/2000/svg", Lm = /* @__PURE__ */ new Map([
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
		]), Rm = {
			accept: "accept",
			acceptcharset: "acceptCharset",
			"accept-charset": "acceptCharset",
			accesskey: "accessKey",
			action: "action",
			allowfullscreen: "allowFullScreen",
			alt: "alt",
			as: "as",
			async: "async",
			autocapitalize: "autoCapitalize",
			autocomplete: "autoComplete",
			autocorrect: "autoCorrect",
			autofocus: "autoFocus",
			autoplay: "autoPlay",
			autosave: "autoSave",
			capture: "capture",
			cellpadding: "cellPadding",
			cellspacing: "cellSpacing",
			challenge: "challenge",
			charset: "charSet",
			checked: "checked",
			children: "children",
			cite: "cite",
			class: "className",
			classid: "classID",
			classname: "className",
			cols: "cols",
			colspan: "colSpan",
			content: "content",
			contenteditable: "contentEditable",
			contextmenu: "contextMenu",
			controls: "controls",
			controlslist: "controlsList",
			coords: "coords",
			crossorigin: "crossOrigin",
			dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
			data: "data",
			datetime: "dateTime",
			default: "default",
			defaultchecked: "defaultChecked",
			defaultvalue: "defaultValue",
			defer: "defer",
			dir: "dir",
			disabled: "disabled",
			disablepictureinpicture: "disablePictureInPicture",
			disableremoteplayback: "disableRemotePlayback",
			download: "download",
			draggable: "draggable",
			enctype: "encType",
			enterkeyhint: "enterKeyHint",
			fetchpriority: "fetchPriority",
			for: "htmlFor",
			form: "form",
			formmethod: "formMethod",
			formaction: "formAction",
			formenctype: "formEncType",
			formnovalidate: "formNoValidate",
			formtarget: "formTarget",
			frameborder: "frameBorder",
			headers: "headers",
			height: "height",
			hidden: "hidden",
			high: "high",
			href: "href",
			hreflang: "hrefLang",
			htmlfor: "htmlFor",
			httpequiv: "httpEquiv",
			"http-equiv": "httpEquiv",
			icon: "icon",
			id: "id",
			imagesizes: "imageSizes",
			imagesrcset: "imageSrcSet",
			inert: "inert",
			innerhtml: "innerHTML",
			inputmode: "inputMode",
			integrity: "integrity",
			is: "is",
			itemid: "itemID",
			itemprop: "itemProp",
			itemref: "itemRef",
			itemscope: "itemScope",
			itemtype: "itemType",
			keyparams: "keyParams",
			keytype: "keyType",
			kind: "kind",
			label: "label",
			lang: "lang",
			list: "list",
			loop: "loop",
			low: "low",
			manifest: "manifest",
			marginwidth: "marginWidth",
			marginheight: "marginHeight",
			max: "max",
			maxlength: "maxLength",
			media: "media",
			mediagroup: "mediaGroup",
			method: "method",
			min: "min",
			minlength: "minLength",
			multiple: "multiple",
			muted: "muted",
			name: "name",
			nomodule: "noModule",
			nonce: "nonce",
			novalidate: "noValidate",
			open: "open",
			optimum: "optimum",
			pattern: "pattern",
			placeholder: "placeholder",
			playsinline: "playsInline",
			poster: "poster",
			preload: "preload",
			profile: "profile",
			radiogroup: "radioGroup",
			readonly: "readOnly",
			referrerpolicy: "referrerPolicy",
			rel: "rel",
			required: "required",
			reversed: "reversed",
			role: "role",
			rows: "rows",
			rowspan: "rowSpan",
			sandbox: "sandbox",
			scope: "scope",
			scoped: "scoped",
			scrolling: "scrolling",
			seamless: "seamless",
			selected: "selected",
			shape: "shape",
			size: "size",
			sizes: "sizes",
			span: "span",
			spellcheck: "spellCheck",
			src: "src",
			srcdoc: "srcDoc",
			srclang: "srcLang",
			srcset: "srcSet",
			start: "start",
			step: "step",
			style: "style",
			summary: "summary",
			tabindex: "tabIndex",
			target: "target",
			title: "title",
			type: "type",
			usemap: "useMap",
			value: "value",
			width: "width",
			wmode: "wmode",
			wrap: "wrap",
			about: "about",
			accentheight: "accentHeight",
			"accent-height": "accentHeight",
			accumulate: "accumulate",
			additive: "additive",
			alignmentbaseline: "alignmentBaseline",
			"alignment-baseline": "alignmentBaseline",
			allowreorder: "allowReorder",
			alphabetic: "alphabetic",
			amplitude: "amplitude",
			arabicform: "arabicForm",
			"arabic-form": "arabicForm",
			ascent: "ascent",
			attributename: "attributeName",
			attributetype: "attributeType",
			autoreverse: "autoReverse",
			azimuth: "azimuth",
			basefrequency: "baseFrequency",
			baselineshift: "baselineShift",
			"baseline-shift": "baselineShift",
			baseprofile: "baseProfile",
			bbox: "bbox",
			begin: "begin",
			bias: "bias",
			by: "by",
			calcmode: "calcMode",
			capheight: "capHeight",
			"cap-height": "capHeight",
			clip: "clip",
			clippath: "clipPath",
			"clip-path": "clipPath",
			clippathunits: "clipPathUnits",
			cliprule: "clipRule",
			"clip-rule": "clipRule",
			color: "color",
			colorinterpolation: "colorInterpolation",
			"color-interpolation": "colorInterpolation",
			colorinterpolationfilters: "colorInterpolationFilters",
			"color-interpolation-filters": "colorInterpolationFilters",
			colorprofile: "colorProfile",
			"color-profile": "colorProfile",
			colorrendering: "colorRendering",
			"color-rendering": "colorRendering",
			contentscripttype: "contentScriptType",
			contentstyletype: "contentStyleType",
			cursor: "cursor",
			cx: "cx",
			cy: "cy",
			d: "d",
			datatype: "datatype",
			decelerate: "decelerate",
			descent: "descent",
			diffuseconstant: "diffuseConstant",
			direction: "direction",
			display: "display",
			divisor: "divisor",
			dominantbaseline: "dominantBaseline",
			"dominant-baseline": "dominantBaseline",
			dur: "dur",
			dx: "dx",
			dy: "dy",
			edgemode: "edgeMode",
			elevation: "elevation",
			enablebackground: "enableBackground",
			"enable-background": "enableBackground",
			end: "end",
			exponent: "exponent",
			externalresourcesrequired: "externalResourcesRequired",
			fill: "fill",
			fillopacity: "fillOpacity",
			"fill-opacity": "fillOpacity",
			fillrule: "fillRule",
			"fill-rule": "fillRule",
			filter: "filter",
			filterres: "filterRes",
			filterunits: "filterUnits",
			floodopacity: "floodOpacity",
			"flood-opacity": "floodOpacity",
			floodcolor: "floodColor",
			"flood-color": "floodColor",
			focusable: "focusable",
			fontfamily: "fontFamily",
			"font-family": "fontFamily",
			fontsize: "fontSize",
			"font-size": "fontSize",
			fontsizeadjust: "fontSizeAdjust",
			"font-size-adjust": "fontSizeAdjust",
			fontstretch: "fontStretch",
			"font-stretch": "fontStretch",
			fontstyle: "fontStyle",
			"font-style": "fontStyle",
			fontvariant: "fontVariant",
			"font-variant": "fontVariant",
			fontweight: "fontWeight",
			"font-weight": "fontWeight",
			format: "format",
			from: "from",
			fx: "fx",
			fy: "fy",
			g1: "g1",
			g2: "g2",
			glyphname: "glyphName",
			"glyph-name": "glyphName",
			glyphorientationhorizontal: "glyphOrientationHorizontal",
			"glyph-orientation-horizontal": "glyphOrientationHorizontal",
			glyphorientationvertical: "glyphOrientationVertical",
			"glyph-orientation-vertical": "glyphOrientationVertical",
			glyphref: "glyphRef",
			gradienttransform: "gradientTransform",
			gradientunits: "gradientUnits",
			hanging: "hanging",
			horizadvx: "horizAdvX",
			"horiz-adv-x": "horizAdvX",
			horizoriginx: "horizOriginX",
			"horiz-origin-x": "horizOriginX",
			ideographic: "ideographic",
			imagerendering: "imageRendering",
			"image-rendering": "imageRendering",
			in2: "in2",
			in: "in",
			inlist: "inlist",
			intercept: "intercept",
			k1: "k1",
			k2: "k2",
			k3: "k3",
			k4: "k4",
			k: "k",
			kernelmatrix: "kernelMatrix",
			kernelunitlength: "kernelUnitLength",
			kerning: "kerning",
			keypoints: "keyPoints",
			keysplines: "keySplines",
			keytimes: "keyTimes",
			lengthadjust: "lengthAdjust",
			letterspacing: "letterSpacing",
			"letter-spacing": "letterSpacing",
			lightingcolor: "lightingColor",
			"lighting-color": "lightingColor",
			limitingconeangle: "limitingConeAngle",
			local: "local",
			markerend: "markerEnd",
			"marker-end": "markerEnd",
			markerheight: "markerHeight",
			markermid: "markerMid",
			"marker-mid": "markerMid",
			markerstart: "markerStart",
			"marker-start": "markerStart",
			markerunits: "markerUnits",
			markerwidth: "markerWidth",
			mask: "mask",
			maskcontentunits: "maskContentUnits",
			maskunits: "maskUnits",
			mathematical: "mathematical",
			mode: "mode",
			numoctaves: "numOctaves",
			offset: "offset",
			opacity: "opacity",
			operator: "operator",
			order: "order",
			orient: "orient",
			orientation: "orientation",
			origin: "origin",
			overflow: "overflow",
			overlineposition: "overlinePosition",
			"overline-position": "overlinePosition",
			overlinethickness: "overlineThickness",
			"overline-thickness": "overlineThickness",
			paintorder: "paintOrder",
			"paint-order": "paintOrder",
			panose1: "panose1",
			"panose-1": "panose1",
			pathlength: "pathLength",
			patterncontentunits: "patternContentUnits",
			patterntransform: "patternTransform",
			patternunits: "patternUnits",
			pointerevents: "pointerEvents",
			"pointer-events": "pointerEvents",
			points: "points",
			pointsatx: "pointsAtX",
			pointsaty: "pointsAtY",
			pointsatz: "pointsAtZ",
			popover: "popover",
			popovertarget: "popoverTarget",
			popovertargetaction: "popoverTargetAction",
			prefix: "prefix",
			preservealpha: "preserveAlpha",
			preserveaspectratio: "preserveAspectRatio",
			primitiveunits: "primitiveUnits",
			property: "property",
			r: "r",
			radius: "radius",
			refx: "refX",
			refy: "refY",
			renderingintent: "renderingIntent",
			"rendering-intent": "renderingIntent",
			repeatcount: "repeatCount",
			repeatdur: "repeatDur",
			requiredextensions: "requiredExtensions",
			requiredfeatures: "requiredFeatures",
			resource: "resource",
			restart: "restart",
			result: "result",
			results: "results",
			rotate: "rotate",
			rx: "rx",
			ry: "ry",
			scale: "scale",
			security: "security",
			seed: "seed",
			shaperendering: "shapeRendering",
			"shape-rendering": "shapeRendering",
			slope: "slope",
			spacing: "spacing",
			specularconstant: "specularConstant",
			specularexponent: "specularExponent",
			speed: "speed",
			spreadmethod: "spreadMethod",
			startoffset: "startOffset",
			stddeviation: "stdDeviation",
			stemh: "stemh",
			stemv: "stemv",
			stitchtiles: "stitchTiles",
			stopcolor: "stopColor",
			"stop-color": "stopColor",
			stopopacity: "stopOpacity",
			"stop-opacity": "stopOpacity",
			strikethroughposition: "strikethroughPosition",
			"strikethrough-position": "strikethroughPosition",
			strikethroughthickness: "strikethroughThickness",
			"strikethrough-thickness": "strikethroughThickness",
			string: "string",
			stroke: "stroke",
			strokedasharray: "strokeDasharray",
			"stroke-dasharray": "strokeDasharray",
			strokedashoffset: "strokeDashoffset",
			"stroke-dashoffset": "strokeDashoffset",
			strokelinecap: "strokeLinecap",
			"stroke-linecap": "strokeLinecap",
			strokelinejoin: "strokeLinejoin",
			"stroke-linejoin": "strokeLinejoin",
			strokemiterlimit: "strokeMiterlimit",
			"stroke-miterlimit": "strokeMiterlimit",
			strokewidth: "strokeWidth",
			"stroke-width": "strokeWidth",
			strokeopacity: "strokeOpacity",
			"stroke-opacity": "strokeOpacity",
			suppresscontenteditablewarning: "suppressContentEditableWarning",
			suppresshydrationwarning: "suppressHydrationWarning",
			surfacescale: "surfaceScale",
			systemlanguage: "systemLanguage",
			tablevalues: "tableValues",
			targetx: "targetX",
			targety: "targetY",
			textanchor: "textAnchor",
			"text-anchor": "textAnchor",
			textdecoration: "textDecoration",
			"text-decoration": "textDecoration",
			textlength: "textLength",
			textrendering: "textRendering",
			"text-rendering": "textRendering",
			to: "to",
			transform: "transform",
			transformorigin: "transformOrigin",
			"transform-origin": "transformOrigin",
			typeof: "typeof",
			u1: "u1",
			u2: "u2",
			underlineposition: "underlinePosition",
			"underline-position": "underlinePosition",
			underlinethickness: "underlineThickness",
			"underline-thickness": "underlineThickness",
			unicode: "unicode",
			unicodebidi: "unicodeBidi",
			"unicode-bidi": "unicodeBidi",
			unicoderange: "unicodeRange",
			"unicode-range": "unicodeRange",
			unitsperem: "unitsPerEm",
			"units-per-em": "unitsPerEm",
			unselectable: "unselectable",
			valphabetic: "vAlphabetic",
			"v-alphabetic": "vAlphabetic",
			values: "values",
			vectoreffect: "vectorEffect",
			"vector-effect": "vectorEffect",
			version: "version",
			vertadvy: "vertAdvY",
			"vert-adv-y": "vertAdvY",
			vertoriginx: "vertOriginX",
			"vert-origin-x": "vertOriginX",
			vertoriginy: "vertOriginY",
			"vert-origin-y": "vertOriginY",
			vhanging: "vHanging",
			"v-hanging": "vHanging",
			videographic: "vIdeographic",
			"v-ideographic": "vIdeographic",
			viewbox: "viewBox",
			viewtarget: "viewTarget",
			visibility: "visibility",
			vmathematical: "vMathematical",
			"v-mathematical": "vMathematical",
			vocab: "vocab",
			widths: "widths",
			wordspacing: "wordSpacing",
			"word-spacing": "wordSpacing",
			writingmode: "writingMode",
			"writing-mode": "writingMode",
			x1: "x1",
			x2: "x2",
			x: "x",
			xchannelselector: "xChannelSelector",
			xheight: "xHeight",
			"x-height": "xHeight",
			xlinkactuate: "xlinkActuate",
			"xlink:actuate": "xlinkActuate",
			xlinkarcrole: "xlinkArcrole",
			"xlink:arcrole": "xlinkArcrole",
			xlinkhref: "xlinkHref",
			"xlink:href": "xlinkHref",
			xlinkrole: "xlinkRole",
			"xlink:role": "xlinkRole",
			xlinkshow: "xlinkShow",
			"xlink:show": "xlinkShow",
			xlinktitle: "xlinkTitle",
			"xlink:title": "xlinkTitle",
			xlinktype: "xlinkType",
			"xlink:type": "xlinkType",
			xmlbase: "xmlBase",
			"xml:base": "xmlBase",
			xmllang: "xmlLang",
			"xml:lang": "xmlLang",
			xmlns: "xmlns",
			"xml:space": "xmlSpace",
			xmlnsxlink: "xmlnsXlink",
			"xmlns:xlink": "xmlnsXlink",
			xmlspace: "xmlSpace",
			y1: "y1",
			y2: "y2",
			y: "y",
			ychannelselector: "yChannelSelector",
			z: "z",
			zoomandpan: "zoomAndPan"
		}, zm = {
			"aria-current": 0,
			"aria-description": 0,
			"aria-details": 0,
			"aria-disabled": 0,
			"aria-hidden": 0,
			"aria-invalid": 0,
			"aria-keyshortcuts": 0,
			"aria-label": 0,
			"aria-roledescription": 0,
			"aria-autocomplete": 0,
			"aria-checked": 0,
			"aria-expanded": 0,
			"aria-haspopup": 0,
			"aria-level": 0,
			"aria-modal": 0,
			"aria-multiline": 0,
			"aria-multiselectable": 0,
			"aria-orientation": 0,
			"aria-placeholder": 0,
			"aria-pressed": 0,
			"aria-readonly": 0,
			"aria-required": 0,
			"aria-selected": 0,
			"aria-sort": 0,
			"aria-valuemax": 0,
			"aria-valuemin": 0,
			"aria-valuenow": 0,
			"aria-valuetext": 0,
			"aria-atomic": 0,
			"aria-busy": 0,
			"aria-live": 0,
			"aria-relevant": 0,
			"aria-dropeffect": 0,
			"aria-grabbed": 0,
			"aria-activedescendant": 0,
			"aria-colcount": 0,
			"aria-colindex": 0,
			"aria-colspan": 0,
			"aria-controls": 0,
			"aria-describedby": 0,
			"aria-errormessage": 0,
			"aria-flowto": 0,
			"aria-labelledby": 0,
			"aria-owns": 0,
			"aria-posinset": 0,
			"aria-rowcount": 0,
			"aria-rowindex": 0,
			"aria-rowspan": 0,
			"aria-setsize": 0,
			"aria-braillelabel": 0,
			"aria-brailleroledescription": 0,
			"aria-colindextext": 0,
			"aria-rowindextext": 0
		}, Bm = {}, Vm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Hm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Um = !1, Wm = {}, Gm = /^on./, Km = /^on[^A-Z]/, qm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Jm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ym = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, Xm = null, Zm = null, Qm = null, $m = !1, eh = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), th = !1;
		if (eh) try {
			var nh = {};
			Object.defineProperty(nh, "passive", { get: function() {
				th = !0;
			} }), window.addEventListener("test", nh, nh), window.removeEventListener("test", nh, nh);
		} catch {
			th = !1;
		}
		var rh = null, ih = null, ah = null, oh = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		}, sh = mn(oh), ch = B({}, oh, {
			view: 0,
			detail: 0
		}), lh = mn(ch), uh, dh, fh, ph = B({}, ch, {
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
			getModifierState: gn,
			button: 0,
			buttons: 0,
			relatedTarget: function(e) {
				return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
			},
			movementX: function(e) {
				return "movementX" in e ? e.movementX : (e !== fh && (fh && e.type === "mousemove" ? (uh = e.screenX - fh.screenX, dh = e.screenY - fh.screenY) : dh = uh = 0, fh = e), uh);
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : dh;
			}
		}), mh = mn(ph), hh = mn(B({}, ph, { dataTransfer: 0 })), gh = mn(B({}, ch, { relatedTarget: 0 })), _h = mn(B({}, oh, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), vh = mn(B({}, oh, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), yh = mn(B({}, oh, { data: 0 })), bh = yh, xh = {
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
		}, Sh = {
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
		}, Ch = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		}, wh = mn(B({}, ch, {
			key: function(e) {
				if (e.key) {
					var t = xh[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = dn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Sh[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: gn,
			charCode: function(e) {
				return e.type === "keypress" ? dn(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? dn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), Th = mn(B({}, ph, {
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
		})), Eh = mn(B({}, ch, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: gn
		})), Dh = mn(B({}, oh, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), Oh = mn(B({}, ph, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), kh = mn(B({}, oh, {
			newState: 0,
			oldState: 0
		})), Ah = [
			9,
			13,
			27,
			32
		], jh = 229, Mh = eh && "CompositionEvent" in window, Nh = null;
		eh && "documentMode" in document && (Nh = document.documentMode);
		var Ph = eh && "TextEvent" in window && !Nh, Fh = eh && (!Mh || Nh && 8 < Nh && 11 >= Nh), Ih = 32, Lh = String.fromCharCode(Ih), Rh = !1, zh = !1, Bh = {
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
		}, Vh = null, Hh = null, Uh = !1;
		eh && (Uh = Sn("input") && (!document.documentMode || 9 < document.documentMode));
		var Wh = typeof Object.is == "function" ? Object.is : Nn, Gh = eh && "documentMode" in document && 11 >= document.documentMode, Kh = null, qh = null, Jh = null, Yh = !1, Xh = {
			animationend: Vn("Animation", "AnimationEnd"),
			animationiteration: Vn("Animation", "AnimationIteration"),
			animationstart: Vn("Animation", "AnimationStart"),
			transitionrun: Vn("Transition", "TransitionRun"),
			transitionstart: Vn("Transition", "TransitionStart"),
			transitioncancel: Vn("Transition", "TransitionCancel"),
			transitionend: Vn("Transition", "TransitionEnd")
		}, Zh = {}, Qh = {};
		eh && (Qh = document.createElement("div").style, "AnimationEvent" in window || (delete Xh.animationend.animation, delete Xh.animationiteration.animation, delete Xh.animationstart.animation), "TransitionEvent" in window || delete Xh.transitionend.transition);
		var $h = Hn("animationend"), eg = Hn("animationiteration"), tg = Hn("animationstart"), ng = Hn("transitionrun"), rg = Hn("transitionstart"), ig = Hn("transitioncancel"), ag = Hn("transitionend"), og = /* @__PURE__ */ new Map(), sg = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		sg.push("scrollEnd");
		var cg = 0;
		if (typeof performance == "object" && typeof performance.now == "function") var lg = performance, ug = function() {
			return lg.now();
		};
		else {
			var dg = Date;
			ug = function() {
				return dg.now();
			};
		}
		var fg = typeof reportError == "function" ? reportError : function(e) {
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
		}, pg = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", mg = 0, hg = 1, gg = 2, _g = 3, vg = "–\xA0", yg = "+\xA0", bg = " \xA0", xg = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", Sg = "Components ⚛", H = "Scheduler ⚛", U = "Blocking", Cg = !1, wg = {
			color: "primary",
			properties: null,
			tooltipText: "",
			track: Sg
		}, Tg = {
			start: -0,
			end: -0,
			detail: { devtools: wg }
		}, Eg = ["Changed Props", ""], Dg = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", Og = ["Changed Props", Dg], kg = 1, Ag = 2, jg = [], Mg = 0, Ng = 0, Pg = {};
		Object.freeze(Pg);
		var Fg = null, Ig = null, W = 0, Lg = 1, G = 2, Rg = 8, zg = 16, Bg = 32, Vg = !1;
		try {
			Object.preventExtensions({});
		} catch {
			Vg = !0;
		}
		var Hg = /* @__PURE__ */ new WeakMap(), Ug = [], Wg = 0, Gg = null, Kg = 0, qg = [], Jg = 0, Yg = null, Xg = 1, Zg = "", Qg = null, $g = null, K = !1, e_ = !1, t_ = null, n_ = null, r_ = !1, i_ = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), a_ = ie(null), o_ = ie(null), s_ = {}, c_ = null, l_ = null, u_ = !1, d_ = typeof AbortController < "u" ? AbortController : function() {
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
		}, f_ = Df.unstable_scheduleCallback, p_ = Df.unstable_NormalPriority, m_ = {
			$$typeof: Lf,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
			_currentRenderer: null,
			_currentRenderer2: null
		}, h_ = Df.unstable_now, g_ = console.createTask ? console.createTask : function() {
			return null;
		}, __ = 1, v_ = 2, y_ = -0, b_ = -0, x_ = -0, S_ = null, C_ = -1.1, w_ = -0, T_ = -0, q = -1.1, J = -1.1, E_ = null, D_ = !1, O_ = -0, k_ = -1.1, A_ = null, j_ = 0, M_ = null, N_ = null, P_ = -1.1, F_ = null, I_ = -1.1, L_ = -1.1, R_ = -0, z_ = -1.1, B_ = -1.1, V_ = 0, H_ = null, U_ = null, W_ = null, G_ = -1.1, K_ = null, q_ = -1.1, J_ = -1.1, Y_ = -0, X_ = -0, Z_ = 0, Q_ = null, $_ = 0, ev = -1.1, tv = !1, nv = !1, rv = null, iv = 0, av = 0, ov = null, sv = V.S;
		V.S = function(e, t) {
			if (_x = Sp(), typeof t == "object" && t && typeof t.then == "function") {
				if (0 > z_ && 0 > B_) {
					z_ = h_();
					var n = Ku(), r = Gu();
					(n !== q_ || r !== K_) && (q_ = -1.1), G_ = n, K_ = r;
				}
				Di(e, t);
			}
			sv !== null && sv(e, t);
		};
		var cv = ie(null), lv = {
			recordUnsafeLifecycleWarnings: function() {},
			flushPendingUnsafeLifecycleWarnings: function() {},
			recordLegacyContextWarning: function() {},
			flushLegacyContextWarning: function() {},
			discardPendingWarnings: function() {}
		}, uv = [], dv = [], fv = [], pv = [], mv = [], hv = [], gv = /* @__PURE__ */ new Set();
		lv.recordUnsafeLifecycleWarnings = function(e, t) {
			gv.has(e.type) || (typeof t.componentWillMount == "function" && !0 !== t.componentWillMount.__suppressDeprecationWarning && uv.push(e), e.mode & Rg && typeof t.UNSAFE_componentWillMount == "function" && dv.push(e), typeof t.componentWillReceiveProps == "function" && !0 !== t.componentWillReceiveProps.__suppressDeprecationWarning && fv.push(e), e.mode & Rg && typeof t.UNSAFE_componentWillReceiveProps == "function" && pv.push(e), typeof t.componentWillUpdate == "function" && !0 !== t.componentWillUpdate.__suppressDeprecationWarning && mv.push(e), e.mode & Rg && typeof t.UNSAFE_componentWillUpdate == "function" && hv.push(e));
		}, lv.flushPendingUnsafeLifecycleWarnings = function() {
			var e = /* @__PURE__ */ new Set();
			0 < uv.length && (uv.forEach(function(t) {
				e.add(E(t) || "Component"), gv.add(t.type);
			}), uv = []);
			var t = /* @__PURE__ */ new Set();
			0 < dv.length && (dv.forEach(function(e) {
				t.add(E(e) || "Component"), gv.add(e.type);
			}), dv = []);
			var n = /* @__PURE__ */ new Set();
			0 < fv.length && (fv.forEach(function(e) {
				n.add(E(e) || "Component"), gv.add(e.type);
			}), fv = []);
			var r = /* @__PURE__ */ new Set();
			0 < pv.length && (pv.forEach(function(e) {
				r.add(E(e) || "Component"), gv.add(e.type);
			}), pv = []);
			var i = /* @__PURE__ */ new Set();
			0 < mv.length && (mv.forEach(function(e) {
				i.add(E(e) || "Component"), gv.add(e.type);
			}), mv = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < hv.length && (hv.forEach(function(e) {
				a.add(E(e) || "Component"), gv.add(e.type);
			}), hv = []), 0 < t.size) {
				var o = m(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = m(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = m(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = m(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = m(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = m(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
		};
		var _v = /* @__PURE__ */ new Map(), vv = /* @__PURE__ */ new Set();
		lv.recordLegacyContextWarning = function(e, t) {
			for (var n = null, r = e; r !== null;) r.mode & Rg && (n = r), r = r.return;
			n === null ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !vv.has(e.type) && (r = _v.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (r === void 0 && (r = [], _v.set(n, r)), r.push(e));
		}, lv.flushLegacyContextWarning = function() {
			_v.forEach(function(e) {
				if (e.length !== 0) {
					var t = e[0], n = /* @__PURE__ */ new Set();
					e.forEach(function(e) {
						n.add(E(e) || "Component"), vv.add(e.type);
					});
					var r = m(n);
					A(t, function() {
						console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", r);
					});
				}
			});
		}, lv.discardPendingWarnings = function() {
			uv = [], dv = [], fv = [], pv = [], mv = [], hv = [], _v = /* @__PURE__ */ new Map();
		};
		var yv = { react_stack_bottom_frame: function(e, t, n) {
			var r = gp;
			gp = !0;
			try {
				return e(t, n);
			} finally {
				gp = r;
			}
		} }, bv = yv.react_stack_bottom_frame.bind(yv), xv = { react_stack_bottom_frame: function(e) {
			var t = gp;
			gp = !0;
			try {
				return e.render();
			} finally {
				gp = t;
			}
		} }, Sv = xv.react_stack_bottom_frame.bind(xv), Cv = { react_stack_bottom_frame: function(e, t) {
			try {
				t.componentDidMount();
			} catch (t) {
				Il(e, e.return, t);
			}
		} }, wv = Cv.react_stack_bottom_frame.bind(Cv), Tv = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				Il(e, e.return, t);
			}
		} }, Ev = Tv.react_stack_bottom_frame.bind(Tv), Dv = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, Ov = Dv.react_stack_bottom_frame.bind(Dv), kv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				Il(e, t, n);
			}
		} }, Av = kv.react_stack_bottom_frame.bind(kv), jv = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Mv = jv.react_stack_bottom_frame.bind(jv), Nv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				Il(e, t, n);
			}
		} }, Pv = Nv.react_stack_bottom_frame.bind(Nv), Fv = { react_stack_bottom_frame: function(e) {
			var t = e._init;
			return t(e._payload);
		} }, Iv = Fv.react_stack_bottom_frame.bind(Fv), Lv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), Rv = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), zv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."), Bv = { then: function() {
			console.error("Internal React error: A listener was unexpectedly attached to a \"noop\" thenable. This is a bug in React. Please file an issue.");
		} }, Vv = null, Hv = !1, Uv = null, Wv = 0, Y = null, Gv, Kv = Gv = !1, qv = {}, Jv = {}, Yv = {};
		p = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = E(e), i = r || "null";
				if (!qv[i]) {
					qv[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = E(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = E(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), A(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var Xv = Yi(!0), Zv = Yi(!1), Qv = 0, $v = 1, ey = 2, ty = 3, ny = !1, ry = !1, iy = null, ay = !1, oy = ie(null), sy = ie(0), cy = ie(null), ly = null, uy = 1, dy = 2, fy = ie(0), py = 0, my = 1, hy = 2, gy = 4, _y = 8, vy, yy = /* @__PURE__ */ new Set(), by = /* @__PURE__ */ new Set(), xy = /* @__PURE__ */ new Set(), Sy = /* @__PURE__ */ new Set(), Cy = 0, X = null, wy = null, Ty = null, Ey = !1, Dy = !1, Oy = !1, ky = 0, Ay = 0, jy = null, My = 0, Ny = 25, Z = null, Py = null, Fy = -1, Iy = !1, Ly = {
			readContext: ni,
			use: Ma,
			useCallback: ya,
			useContext: ya,
			useEffect: ya,
			useImperativeHandle: ya,
			useLayoutEffect: ya,
			useInsertionEffect: ya,
			useMemo: ya,
			useReducer: ya,
			useRef: ya,
			useState: ya,
			useDebugValue: ya,
			useDeferredValue: ya,
			useTransition: ya,
			useSyncExternalStore: ya,
			useId: ya,
			useHostTransitionStatus: ya,
			useFormState: ya,
			useActionState: ya,
			useOptimistic: ya,
			useMemoCache: ya,
			useCacheRefresh: ya
		};
		Ly.useEffectEvent = ya;
		var Ry = null, zy = null, By = null, Vy = null, Hy = null, Uy = null, Wy = null;
		Ry = {
			readContext: function(e) {
				return ni(e);
			},
			use: Ma,
			useCallback: function(e, t) {
				return Z = "useCallback", P(), _a(t), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", P(), ni(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", P(), _a(t), ho(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", P(), _a(n), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", P(), _a(t), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", P(), _a(t), vo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", P(), _a(t);
				var n = V.H;
				V.H = Hy;
				try {
					return wo(e, t);
				} finally {
					V.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", P();
				var r = V.H;
				V.H = Hy;
				try {
					return Fa(e, t, n);
				} finally {
					V.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", P(), fo(e);
			},
			useState: function(e) {
				Z = "useState", P();
				var t = V.H;
				V.H = Hy;
				try {
					return qa(e);
				} finally {
					V.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", P();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", P(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", P(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", P(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", P(), Bo();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", P(), va(), ao(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", P(), ao(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", P(), Ja(e);
			},
			useHostTransitionStatus: zo,
			useMemoCache: Na,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", P(), Vo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", P(), _o(e);
			}
		}, zy = {
			readContext: function(e) {
				return ni(e);
			},
			use: Ma,
			useCallback: function(e, t) {
				return Z = "useCallback", F(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", F(), ni(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", F(), ho(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", F(), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", F(), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", F(), vo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", F();
				var n = V.H;
				V.H = Hy;
				try {
					return wo(e, t);
				} finally {
					V.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", F();
				var r = V.H;
				V.H = Hy;
				try {
					return Fa(e, t, n);
				} finally {
					V.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", F(), fo(e);
			},
			useState: function(e) {
				Z = "useState", F();
				var t = V.H;
				V.H = Hy;
				try {
					return qa(e);
				} finally {
					V.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", F(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", F(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", F(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", F(), Bo();
			},
			useActionState: function(e, t) {
				return Z = "useActionState", F(), ao(e, t);
			},
			useFormState: function(e, t) {
				return Z = "useFormState", F(), va(), ao(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", F(), Ja(e);
			},
			useHostTransitionStatus: zo,
			useMemoCache: Na,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), Vo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", F(), _o(e);
			}
		}, By = {
			readContext: function(e) {
				return ni(e);
			},
			use: Ma,
			useCallback: function(e, t) {
				return Z = "useCallback", F(), Co(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", F(), ni(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", F(), mo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", F(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", F(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", F(), mo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", F();
				var n = V.H;
				V.H = Uy;
				try {
					return To(e, t);
				} finally {
					V.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", F();
				var r = V.H;
				V.H = Uy;
				try {
					return Ia(e, t, n);
				} finally {
					V.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", F(), ka().memoizedState;
			},
			useState: function() {
				Z = "useState", F();
				var e = V.H;
				V.H = Uy;
				try {
					return Ia(Pa);
				} finally {
					V.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", F(), Do(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", F(), Lo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", F(), Ba(e, t, n);
			},
			useId: function() {
				return Z = "useId", F(), ka().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", F(), va(), oo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", F(), oo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", F(), Ya(e, t);
			},
			useHostTransitionStatus: zo,
			useMemoCache: Na,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), ka().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", F(), I(e);
			}
		}, Vy = {
			readContext: function(e) {
				return ni(e);
			},
			use: Ma,
			useCallback: function(e, t) {
				return Z = "useCallback", F(), Co(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", F(), ni(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", F(), mo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", F(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", F(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", F(), mo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", F();
				var n = V.H;
				V.H = Wy;
				try {
					return To(e, t);
				} finally {
					V.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", F();
				var r = V.H;
				V.H = Wy;
				try {
					return Ra(e, t, n);
				} finally {
					V.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", F(), ka().memoizedState;
			},
			useState: function() {
				Z = "useState", F();
				var e = V.H;
				V.H = Wy;
				try {
					return Ra(Pa);
				} finally {
					V.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", F(), Oo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", F(), Ro();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", F(), Ba(e, t, n);
			},
			useId: function() {
				return Z = "useId", F(), ka().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", F(), va(), lo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", F(), lo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", F(), Za(e, t);
			},
			useHostTransitionStatus: zo,
			useMemoCache: Na,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), ka().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", F(), I(e);
			}
		}, Hy = {
			readContext: function(e) {
				return u(), ni(e);
			},
			use: function(e) {
				return c(), Ma(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), P(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), P(), ni(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", c(), P(), ho(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), P(), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", c(), P(), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), P(), vo(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), P();
				var n = V.H;
				V.H = Hy;
				try {
					return wo(e, t);
				} finally {
					V.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), P();
				var r = V.H;
				V.H = Hy;
				try {
					return Fa(e, t, n);
				} finally {
					V.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", c(), P(), fo(e);
			},
			useState: function(e) {
				Z = "useState", c(), P();
				var t = V.H;
				V.H = Hy;
				try {
					return qa(e);
				} finally {
					V.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), P();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), P(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), P(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), P(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), P(), Bo();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", c(), P(), ao(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", c(), P(), ao(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", c(), P(), Ja(e);
			},
			useMemoCache: function(e) {
				return c(), Na(e);
			},
			useHostTransitionStatus: zo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", P(), Vo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), P(), _o(e);
			}
		}, Uy = {
			readContext: function(e) {
				return u(), ni(e);
			},
			use: function(e) {
				return c(), Ma(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), F(), Co(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), F(), ni(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), F(), mo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), F(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), F(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), F(), mo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), F();
				var n = V.H;
				V.H = Uy;
				try {
					return To(e, t);
				} finally {
					V.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), F();
				var r = V.H;
				V.H = Uy;
				try {
					return Ia(e, t, n);
				} finally {
					V.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), F(), ka().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), F();
				var e = V.H;
				V.H = Uy;
				try {
					return Ia(Pa);
				} finally {
					V.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), F(), Do(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), F(), Lo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), F(), Ba(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), F(), ka().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), F(), oo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), F(), oo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), F(), Ya(e, t);
			},
			useMemoCache: function(e) {
				return c(), Na(e);
			},
			useHostTransitionStatus: zo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), ka().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), F(), I(e);
			}
		}, Wy = {
			readContext: function(e) {
				return u(), ni(e);
			},
			use: function(e) {
				return c(), Ma(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), F(), Co(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), F(), ni(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), F(), mo(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), F(), xo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), F(), mo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), F(), mo(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), F();
				var n = V.H;
				V.H = Uy;
				try {
					return To(e, t);
				} finally {
					V.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), F();
				var r = V.H;
				V.H = Uy;
				try {
					return Ra(e, t, n);
				} finally {
					V.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), F(), ka().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), F();
				var e = V.H;
				V.H = Uy;
				try {
					return Ra(Pa);
				} finally {
					V.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), F(), Oo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), F(), Ro();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), F(), Ba(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), F(), ka().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), F(), lo(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), F(), lo(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), F(), Za(e, t);
			},
			useMemoCache: function(e) {
				return c(), Na(e);
			},
			useHostTransitionStatus: zo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), ka().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), F(), I(e);
			}
		};
		var Gy = {}, Ky = /* @__PURE__ */ new Set(), qy = /* @__PURE__ */ new Set(), Jy = /* @__PURE__ */ new Set(), Yy = /* @__PURE__ */ new Set(), Xy = /* @__PURE__ */ new Set(), Zy = /* @__PURE__ */ new Set(), Qy = /* @__PURE__ */ new Set(), $y = /* @__PURE__ */ new Set(), eb = /* @__PURE__ */ new Set(), tb = /* @__PURE__ */ new Set();
		Object.freeze(Gy);
		var nb = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = el(e), i = $i(r);
				i.payload = t, n != null && (Xo(n), i.callback = n), t = ea(e, i, r), t !== null && (ci(r, "this.setState()", e), nl(t, e, r), ta(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = el(e), i = $i(r);
				i.tag = $v, i.payload = t, n != null && (Xo(n), i.callback = n), t = ea(e, i, r), t !== null && (ci(r, "this.replaceState()", e), nl(t, e, r), ta(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = el(e), r = $i(n);
				r.tag = ey, t != null && (Xo(t), r.callback = t), t = ea(e, r, n), t !== null && (ci(n, "this.forceUpdate()", e), nl(t, e, n), ta(t, e, n));
			}
		}, rb = null, ib = null, ab = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."), ob = !1, sb = {}, cb = {}, lb = {}, ub = {}, db = !1, fb = {}, pb = {}, mb = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		}, hb = !1, gb = null;
		gb = /* @__PURE__ */ new Set();
		var _b = !1, vb = !1, yb = !1, bb = typeof WeakSet == "function" ? WeakSet : Set, xb = null, Sb = null, Cb = null, wb = null, Tb = !1, Eb = null, Db = !1, Ob = 8192, kb = {
			getCacheForType: function(e) {
				var t = ni(m_), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return ni(m_).controller.signal;
			},
			getOwner: function() {
				return hp;
			}
		};
		if (typeof Symbol == "function" && Symbol.for) {
			var Ab = Symbol.for;
			Ab("selector.component"), Ab("selector.has_pseudo_class"), Ab("selector.role"), Ab("selector.test_id"), Ab("selector.text");
		}
		var jb = [], Mb = typeof WeakMap == "function" ? WeakMap : Map, Nb = 0, Pb = 2, Fb = 4, Ib = 0, Lb = 1, Rb = 2, zb = 3, Bb = 4, Vb = 6, Hb = 5, Ub = Nb, Wb = null, Q = null, $ = 0, Gb = 0, Kb = 1, qb = 2, Jb = 3, Yb = 4, Xb = 5, Zb = 6, Qb = 7, $b = 8, ex = 9, tx = Gb, nx = null, rx = !1, ix = !1, ax = !1, ox = 0, sx = Ib, cx = 0, lx = 0, ux = 0, dx = 0, fx = 0, px = null, mx = null, hx = !1, gx = 0, _x = 0, vx = 300, yx = Infinity, bx = 500, xx = null, Sx = null, Cx = null, wx = 0, Tx = 1, Ex = 2, Dx = 3, Ox = 0, kx = 1, Ax = 2, jx = 3, Mx = 4, Nx = 5, Px = 0, Fx = null, Ix = null, Lx = 0, Rx = 0, zx = -0, Bx = null, Vx = null, Hx = null, Ux = wx, Wx = null, Gx = 50, Kx = 0, qx = null, Jx = !1, Yx = !1, Xx = 50, Zx = 0, Qx = null, $x = !1, eS = null, tS = !1, nS = /* @__PURE__ */ new Set(), rS = {}, iS = null, aS = null, oS = !1, sS = !1, cS = !1, lS = !1, uS = 0, dS = {};
		(function() {
			for (var e = 0; e < sg.length; e++) {
				var t = sg[e], n = t.toLowerCase();
				t = t[0].toUpperCase() + t.slice(1), Un(n, "on" + t);
			}
			Un($h, "onAnimationEnd"), Un(eg, "onAnimationIteration"), Un(tg, "onAnimationStart"), Un("dblclick", "onDoubleClick"), Un("focusin", "onFocus"), Un("focusout", "onBlur"), Un(ng, "onTransitionRun"), Un(rg, "onTransitionStart"), Un(ig, "onTransitionCancel"), Un(ag, "onTransitionEnd");
		})(), et("onMouseEnter", ["mouseout", "mouseover"]), et("onMouseLeave", ["mouseout", "mouseover"]), et("onPointerEnter", ["pointerout", "pointerover"]), et("onPointerLeave", ["pointerout", "pointerover"]), $e("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), $e("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), $e("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), $e("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), $e("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), $e("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var fS = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), pS = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fS)), mS = "_reactListening" + Math.random().toString(36).slice(2), hS = !1, gS = !1, _S = !1, vS = !1, yS = !1, bS = !1, xS = !1, SS = {}, CS = /\r\n?/g, wS = /\u0000|\uFFFD/g, TS = "http://www.w3.org/1999/xlink", ES = "http://www.w3.org/XML/1998/namespace", DS = "javascript:throw new Error('React form unexpectedly submitted.')", OS = "suppressHydrationWarning", kS = "&", AS = "/&", jS = "$", MS = "/$", NS = "$?", PS = "$~", FS = "$!", IS = "html", LS = "body", RS = "head", zS = "F!", BS = "F", VS = "loading", HS = "style", US = 0, WS = 1, GS = 2, KS = null, qS = null, JS = {
			dialog: !0,
			webview: !0
		}, YS = null, XS = void 0, ZS = typeof setTimeout == "function" ? setTimeout : void 0, QS = typeof clearTimeout == "function" ? clearTimeout : void 0, $S = -1, eC = typeof Promise == "function" ? Promise : void 0, tC = typeof queueMicrotask == "function" ? queueMicrotask : eC === void 0 ? ZS : function(e) {
			return eC.resolve(null).then(e).catch(qu);
		}, nC = null, rC = 0, iC = 1, aC = 2, oC = 3, sC = 4, cC = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set(), uC = Jf.d;
		Jf.d = {
			f: function() {
				var e = uC.f(), t = sl();
				return e || t;
			},
			r: function(e) {
				var t = Ye(e);
				t !== null && t.tag === 5 && t.type === "form" ? Fo(t) : uC.r(e);
			},
			D: function(e) {
				uC.D(e), Ad("dns-prefetch", e, null);
			},
			C: function(e, t) {
				uC.C(e, t), Ad("preconnect", e, t);
			},
			L: function(e, t, n) {
				uC.L(e, t, n);
				var r = dC;
				if (r && e && t) {
					var i = "link[rel=\"preload\"][as=\"" + ft(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + ft(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + ft(n.imageSizes) + "\"]")) : i += "[href=\"" + ft(e) + "\"]";
					var a = i;
					switch (t) {
						case "style":
							a = z(e);
							break;
						case "script": a = Id(e);
					}
					cC.has(a) || (e = B({
						rel: "preload",
						href: t === "image" && n && n.imageSrcSet ? void 0 : e,
						as: t
					}, n), cC.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Nd(a)) || t === "script" && r.querySelector(Ld(a)) || (t = r.createElement("link"), Eu(t, "link", e), Qe(t), r.head.appendChild(t)));
				}
			},
			m: function(e, t) {
				uC.m(e, t);
				var n = dC;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + ft(r) + "\"][href=\"" + ft(e) + "\"]", a = i;
					switch (r) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script": a = Id(e);
					}
					if (!cC.has(a) && (e = B({
						rel: "modulepreload",
						href: e
					}, t), cC.set(a, e), n.querySelector(i) === null)) {
						switch (r) {
							case "audioworklet":
							case "paintworklet":
							case "serviceworker":
							case "sharedworker":
							case "worker":
							case "script": if (n.querySelector(Ld(a))) return;
						}
						r = n.createElement("link"), Eu(r, "link", e), Qe(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				uC.X(e, t);
				var n = dC;
				if (n && e) {
					var r = Ze(n).hoistableScripts, i = Id(e), a = r.get(i);
					a || (a = n.querySelector(Ld(i)), a || (e = B({
						src: e,
						async: !0
					}, t), (t = cC.get(i)) && Vd(e, t), a = n.createElement("script"), Qe(a), Eu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			},
			S: function(e, t, n) {
				uC.S(e, t, n);
				var r = dC;
				if (r && e) {
					var i = Ze(r).hoistableStyles, a = z(e);
					t ||= "default";
					var o = i.get(a);
					if (!o) {
						var s = {
							loading: rC,
							preload: null
						};
						if (o = r.querySelector(Nd(a))) s.loading = iC | sC;
						else {
							e = B({
								rel: "stylesheet",
								href: e,
								"data-precedence": t
							}, n), (n = cC.get(a)) && Bd(e, n);
							var c = o = r.createElement("link");
							Qe(c), Eu(c, "link", e), c._p = new Promise(function(e, t) {
								c.onload = e, c.onerror = t;
							}), c.addEventListener("load", function() {
								s.loading |= iC;
							}), c.addEventListener("error", function() {
								s.loading |= aC;
							}), s.loading |= sC, zd(o, t, r);
						}
						o = {
							type: "stylesheet",
							instance: o,
							count: 1,
							state: s
						}, i.set(a, o);
					}
				}
			},
			M: function(e, t) {
				uC.M(e, t);
				var n = dC;
				if (n && e) {
					var r = Ze(n).hoistableScripts, i = Id(e), a = r.get(i);
					a || (a = n.querySelector(Ld(i)), a || (e = B({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = cC.get(i)) && Vd(e, t), a = n.createElement("script"), Qe(a), Eu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			}
		};
		var dC = typeof document > "u" ? null : document, fC = null, pC = 6e4, mC = 800, hC = 500, gC = 0, _C = null, vC = null, yC = Yf, bC = {
			$$typeof: Lf,
			Provider: null,
			Consumer: null,
			_currentValue: yC,
			_currentValue2: yC,
			_threadCount: 0
		}, xC = "%c%s%c", SC = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", CC = "", wC = " ", TC = Function.prototype.bind, EC = !1, DC = null, OC = null, kC = null, AC = null, jC = null, MC = null, NC = null, PC = null, FC = null, IC = null;
		DC = function(e, r, i, a) {
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = B({}, e.memoizedProps), i = dr(e, 2), i !== null && nl(i, e, 2));
		}, OC = function(e, n, r) {
			n = t(e, n), n !== null && (r = a(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = B({}, e.memoizedProps), r = dr(e, 2), r !== null && nl(r, e, 2));
		}, kC = function(e, n, i, a) {
			n = t(e, n), n !== null && (i = r(n.memoizedState, i, a), n.memoizedState = i, n.baseState = i, e.memoizedProps = B({}, e.memoizedProps), i = dr(e, 2), i !== null && nl(i, e, 2));
		}, AC = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = dr(e, 2), t !== null && nl(t, e, 2);
		}, jC = function(e, t) {
			e.pendingProps = a(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = dr(e, 2), t !== null && nl(t, e, 2);
		}, MC = function(e, t, n) {
			e.pendingProps = r(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = dr(e, 2), t !== null && nl(t, e, 2);
		}, NC = function(e) {
			var t = dr(e, 2);
			t !== null && nl(t, e, 2);
		}, PC = function(e) {
			var t = Pe(), n = dr(e, t);
			n !== null && nl(n, e, t);
		}, FC = function(e) {
			s = e;
		}, IC = function(e) {
			o = e;
		};
		var LC = !0, RC = null, zC = !1, BC = null, VC = null, HC = null, UC = /* @__PURE__ */ new Map(), WC = /* @__PURE__ */ new Map(), GC = [], KC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), qC = null;
		if (Tf.prototype.render = wf.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : b(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
			var r = t.current;
			ef(r, el(r), n, t, null, null);
		}, Tf.prototype.unmount = wf.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(Ub & (Pb | Fb)) !== Nb && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), ef(e.current, 2, null, e, null, null), sl(), t[Jp] = null;
			}
		}, Tf.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = Ge();
				e = {
					blockedOn: null,
					target: e,
					priority: t
				};
				for (var n = 0; n < GC.length && t !== 0 && t < GC[n].priority; n++);
				GC.splice(n, 0, e), n === 0 && gf(e);
			}
		}, (function() {
			var e = Of.version;
			if (e !== "19.2.8") throw Error("Incompatible React versions: The \"react\" and \"react-dom\" packages must have the exact same version. Instead got:\n  - react:      " + (e + "\n  - react-dom:  19.2.8\nLearn more: https://react.dev/warnings/version-mismatch"));
		})(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"), Jf.findDOMNode = function(e) {
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error("Argument appears to not be a ReactComponent. Keys: " + e));
			return e = C(t), e = e === null ? null : ne(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.2.8",
				rendererPackageName: "react-dom",
				currentDispatcherRef: V,
				reconcilerVersion: "19.2.8"
			};
			return e.overrideHookState = DC, e.overrideHookStateDeletePath = OC, e.overrideHookStateRenamePath = kC, e.overrideProps = AC, e.overridePropsDeletePath = jC, e.overridePropsRenamePath = MC, e.scheduleUpdate = NC, e.scheduleRetry = PC, e.setErrorHandler = FC, e.setSuspenseHandler = IC, e.scheduleRefresh = v, e.scheduleRoot = _, e.setRefreshHandler = y, e.getCurrentFiber = of, De(e);
		})() && eh && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var JC = window.location.protocol;
			/^(https?|file):$/.test(JC) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (JC === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			Ef(e);
			var n = !1, r = "", i = ts, a = ns, o = rs;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === jf && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Qd(e, 1, !1, null, null, n, r, null, i, a, o, Cf), e[Jp] = t.current, uu(e), new wf(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			Ef(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = ts, o = ns, s = rs, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = Qd(e, 1, !0, t, n ?? null, r, i, c, a, o, s, Cf), t.context = $d(null), n = t.current, r = el(n), r = Ve(r), i = $i(r), i.callback = null, ea(n, i, r), ci(r, "hydrateRoot()", null), n = r, t.current.lanes = n, Ie(t, n), Yl(t), e[Jp] = t.current, uu(e), new Tf(t);
		}, e.version = "19.2.8", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), v = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = g()) : t.exports = _();
})), y = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), b = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), x = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), ee = (e) => {
	let t = x(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, te = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, S = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, C = l(), ne = (0, C.createContext)({}), re = () => (0, C.useContext)(ne), w = (0, C.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = re() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, C.createElement)("svg", {
		ref: c,
		...te,
		width: t ?? l ?? te.width,
		height: t ?? l ?? te.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: y("lucide", p, i),
		...!a && !S(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, C.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), T = (e, t) => {
	let n = (0, C.forwardRef)(({ className: n, ...r }, i) => (0, C.createElement)(w, {
		ref: i,
		iconNode: t,
		className: y(`lucide-${b(ee(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = ee(e), n;
}, E = T("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), ie = T("captions", [["rect", {
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
}]]), ae = T("chart-column", [
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
]), D = T("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), oe = T("info", [
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
]), se = T("maximize-2", [
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
]), O = T("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]), k = T("minimize-2", [
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
]), ce = T("pause", [["rect", {
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
}]]), le = T("picture-in-picture-2", [["path", {
	d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4",
	key: "daa4of"
}], ["rect", {
	width: "10",
	height: "7",
	x: "12",
	y: "13",
	rx: "2",
	key: "1nb8gs"
}]]), ue = T("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]), de = T("rectangle-horizontal", [["rect", {
	width: "20",
	height: "12",
	x: "2",
	y: "6",
	rx: "2",
	key: "9lu3g6"
}]]), fe = T("refresh-cw", [
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
]), pe = T("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), me = T("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]), he = T("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), ge = T("skip-forward", [["path", {
	d: "M21 4v16",
	key: "7j8fe9"
}], ["path", {
	d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
	key: "zs4d6"
}]]), _e = T("volume-2", [
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
]), ve = T("volume-x", [
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
]), ye = T("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), be = v(), A = /^﻿/;
function xe(e) {
	return e.replace(/\{[^}]*\\p[1-9][^}]*\}[^{]*/g, "").replace(/\{[^}]*\}/g, "").replace(/\\N/gi, "\n").replace(/\\h/gi, " ").replace(/\\\{/g, "{").replace(/\\\}/g, "}").split("\n").map((e) => e.trim()).join("\n").trim();
}
function Se(e) {
	let t = e.replace(A, "").trim();
	if (!t) return "";
	let n = t.match(/^Dialogue:\s*(.*)$/is), r = (n ? n[1] : t).split(","), i = n ? 9 : 8;
	return xe(r.length > i ? r.slice(i).join(",") : t);
}
function Ce(e, t) {
	return e.filter((e) => t >= e.start && t < e.end);
}
//#endregion
//#region src/lib/codec.ts
function we(e) {
	let t = e.language && e.language !== "und" ? ` · ${e.language}` : "", n = e.name ? ` · ${e.name}` : "";
	return e.kind === "video" ? `${e.width || "?"}×${e.height || "?"} · ${e.codec || e.codecId}` : e.kind === "audio" ? `${e.codec || e.codecId} · ${e.channels || 2}ch${t}${n}` : `${e.codecId}${t}${n}`;
}
var j = /* @__PURE__ */ new Set([
	"S_TEXT/UTF8",
	"S_TEXT/ASCII",
	"S_TEXT/ASS",
	"S_TEXT/SSA",
	"S_ASS",
	"S_SSA"
]);
function Te(e) {
	return e.kind === "subtitle" && j.has(e.codecId.toUpperCase());
}
function Ee(e) {
	let t = e.codecId.toUpperCase();
	return t === "S_TEXT/ASS" || t === "S_TEXT/SSA" || t === "S_ASS" || t === "S_SSA";
}
//#endregion
//#region src/lib/subtitle-style.ts
var De = [
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
], Oe = {
	font: "system",
	scale: 1,
	offset: 0
}, ke = {
	min: .6,
	max: 2.4,
	step: .1
}, Ae = {
	min: -11,
	max: 74,
	step: 1
}, je = "mx-player-pro:subtitle-style:";
function Me(e) {
	return (De.find((t) => t.id === e) || De[0]).stack;
}
function Ne(e) {
	return Number.isFinite(e) ? Math.round(Math.min(ke.max, Math.max(ke.min, e)) * 10) / 10 : Oe.scale;
}
function Pe(e) {
	return Number.isFinite(e) ? Math.round(Math.min(Ae.max, Math.max(Ae.min, e))) : Oe.offset;
}
function Fe(e) {
	return {
		font: De.some((t) => t.id === e?.font) ? e.font : Oe.font,
		scale: Ne(Number(e?.scale)),
		offset: Pe(Number(e?.offset))
	};
}
function Ie(e) {
	if (e.kind === "file") return "local-file";
	try {
		return new URL(e.url).hostname || "unknown-host";
	} catch {
		return "unknown-host";
	}
}
function Le(e) {
	try {
		let t = localStorage.getItem(je + e);
		return t ? Fe(JSON.parse(t)) : { ...Oe };
	} catch {
		return { ...Oe };
	}
}
function Re(e, t) {
	try {
		localStorage.setItem(je + e, JSON.stringify(Fe(t)));
	} catch {}
}
var ze = .004, Be = class {
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
		let t = e + ze;
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
}, Ve = class {
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
}, He = class {
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
}, Ue = class {
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
function We(e) {
	return e.inFlight || e.eof || e.bufferedBytes >= 100663296 ? !1 : e.bufferedAhead < (e.playing ? 20 : 3);
}
function Ge(e) {
	return e.decodeQueueSize < 8 && e.frameQueueLength < 6;
}
function Ke(e) {
	return e.decodeQueueSize < 8 && e.audioHorizonAhead < 1;
}
//#endregion
//#region src/lib/packet-buffer.ts
var qe = class {
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
}, Je = 5e3, Ye = class {
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
}, Xe = class {
	canvas;
	onStatus;
	ctx = null;
	videoDecoder = null;
	audioDecoder = null;
	videoConfig = null;
	audioConfig = null;
	audioContext = null;
	gainNode = null;
	frames = new Be();
	packets = new qe();
	clock = new Ue(new Ve());
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
		}), this.audioClock = null, this.clock = new Ue(new Ve()), this.frames.clearFloor(), this.awaitingKeyframe = !0, this.endOfStream = !1, this.flushed = !1, this.stalled = !1, this.seekTarget = 0, this.packets.setActive("video", !!(e?.codec && e.width && e.height)), this.packets.setActive("audio", !!t?.codec);
		let r = !1, i = !1;
		if (e?.codec && e.width && e.height) {
			let t = {
				codec: e.codec,
				codedWidth: e.width,
				codedHeight: e.height,
				description: e.codecPrivate
			};
			try {
				if ((await n.VideoDecoder.isConfigSupported?.(t))?.supported === !1) this.onStatus({
					videoReady: !1,
					audioReady: i,
					error: `DECODER_UNSUPPORTED_VIDEO:${e.codec}`
				});
				else {
					let i = n.VideoDecoder;
					this.videoConfig = t, this.videoDecoder = new i({
						output: (e) => this.acceptFrame(e),
						error: (e) => this.failVideo(e)
					}), this.videoDecoder.configure(t), r = !0, this.canvas.width = e.width, this.canvas.height = e.height;
				}
			} catch (e) {
				this.onStatus({
					videoReady: !1,
					audioReady: i,
					error: `DECODER_ERROR_VIDEO:${Ze(e)}`
				});
			}
		}
		if (t?.codec && n.AudioDecoder && n.EncodedAudioChunk) {
			let e = {
				codec: t.codec,
				sampleRate: t.sampleRate || 48e3,
				numberOfChannels: t.channels || 2,
				description: t.codecPrivate
			};
			try {
				if ((await n.AudioDecoder.isConfigSupported?.(e))?.supported === !1) this.onStatus({
					videoReady: r,
					audioReady: !1,
					error: `DECODER_UNSUPPORTED_AUDIO:${t.codec}`
				});
				else {
					let t = n.AudioDecoder;
					this.audioConfig = e, this.audioDecoder = new t({
						output: (e) => this.onAudioData(e),
						error: (e) => this.failAudio(e)
					}), this.audioDecoder.configure(e), i = !0;
				}
			} catch (e) {
				this.onStatus({
					videoReady: r,
					audioReady: !1,
					error: `DECODER_ERROR_AUDIO:${Ze(e)}`
				});
			}
		}
		this.packets.setActive("video", r), this.packets.setActive("audio", i), this.onStatus({
			videoReady: r,
			audioReady: i
		});
	}
	enqueue(e, t, n) {
		e.trackId === t ? this.packets.push("video", e) : e.trackId === n && this.packets.push("audio", e);
	}
	needsPackets(e = this.playing, t = !1, n = !1) {
		return !this.packets.isActive("video") && !this.packets.isActive("audio") ? !1 : We({
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
		this.seekTarget = e, this.clock.reset(e), this.packets.clear(), this.frames.flush(), this.frames.setFloor(e), this.stopScheduledAudio(), this.pendingAudio.forEach((e) => e.close()), this.pendingAudio = [], this.endOfStream = !1, this.flushed = !1, this.stalled = !1, this.audioWaitSince = performance.now(), this.resetDecoders(), this.previewPending = !this.playing;
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
		for (; this.videoDecoder && e.EncodedVideoChunk && this.packets.pending("video") && Ge(this.decodePressure("video"));) {
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
		for (; this.playing && this.audioDecoder && e.EncodedAudioChunk && this.packets.pending("audio") && Ke(this.decodePressure("audio"));) {
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
		!this.playing || !this.packets.isActive("audio") || this.packets.endOf("audio") === -Infinity && this.packets.endOf("video") !== -Infinity && (performance.now() - this.audioWaitSince < Je || (this.packets.setActive("audio", !1), this.rebuildClockWithoutAudio(), this.onStatus({
			videoReady: this.videoDecoder !== null,
			audioReady: !1,
			error: "DECODER_ERROR_AUDIO:音频轨没有数据"
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
			error: `DECODER_ERROR_VIDEO:${Ze(e)}`
		});
	}
	failAudio(e) {
		try {
			this.audioDecoder?.close();
		} catch {}
		this.audioDecoder = null, this.packets.setActive("audio", !1), this.stopScheduledAudio(), this.rebuildClockWithoutAudio(), this.onStatus({
			videoReady: this.videoDecoder !== null,
			audioReady: !1,
			error: `DECODER_ERROR_AUDIO:${Ze(e)}`
		});
	}
	rebuildClockWithoutAudio() {
		if (!this.audioClock) return;
		let e = this.clock.currentTime;
		this.audioClock = null, this.clock = new Ue(new Ve()), this.clock.reset(e), this.clock.setRate(this.playbackRate), this.playing && !this.stalled && this.clock.start();
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
		this.frames.push(new Ye(e)), this.previewPending && (this.previewPending = !1, this.renderPreviewFrame());
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
			this.scheduleAudio(e, t);
		}
	}
	ensureAudioContext() {
		if (this.audioContext) return this.audioContext;
		if (!this.audioDecoder) return null;
		let e = globalThis.AudioContext;
		return e ? (this.audioContext = new e(), this.gainNode = this.audioContext.createGain(), this.gainNode.gain.value = this.volume, this.gainNode.connect(this.audioContext.destination), this.audioClock = new He(() => this.audioContext?.currentTime ?? 0), this.clock = new Ue(new Ve(), this.audioClock), this.clock.reset(this.seekTarget), this.clock.setRate(this.playbackRate), this.playing && this.clock.start(), this.audioScheduleEnd = this.audioContext.currentTime, this.audioContext) : null;
	}
	scheduleAudio(e, t) {
		let n = e.createBuffer(t.numberOfChannels, t.numberOfFrames, t.sampleRate);
		for (let e = 0; e < t.numberOfChannels; e += 1) {
			let r = new Float32Array(t.numberOfFrames);
			t.copyTo(r, { planeIndex: e }), n.copyToChannel(r, e);
		}
		let r = (t.timestamp || 0) / 1e6, i = Math.max(e.currentTime + .03, this.audioScheduleEnd), a = e.createBufferSource();
		a.buffer = n, a.playbackRate.value = this.playbackRate, this.gainNode && a.connect(this.gainNode), a.start(i);
		let o = n.duration / this.playbackRate;
		a.onended = () => this.scheduledSources.delete(a), this.scheduledSources.add(a), this.audioScheduleEnd = i + o, this.audioClock?.addSpan({
			startAt: i,
			endAt: i + o,
			mediaStart: r,
			rate: this.playbackRate
		}), t.close();
	}
	stopScheduledAudio() {
		let e = this.clock.currentTime;
		for (let e of this.scheduledSources) try {
			e.stop();
		} catch {}
		this.scheduledSources.clear(), this.audioScheduleEnd = this.audioContext?.currentTime ?? 0, this.audioClock?.reset(e);
	}
};
function Ze(e) {
	return e instanceof Error ? e.message : typeof e == "string" ? e : "未知解码错误";
}
//#endregion
//#region src/lib/playback-error.ts
var Qe = [
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
	[/^WORKER_CREATE_FAILED(?:$|:)/i, "解封装 Worker 创建失败。若站点的内容安全策略禁止 blob: Worker，请在播放器配置中提供同源 workerUrl。"]
];
function $e(e) {
	for (let [t, n] of Qe) {
		if (!t.test(e)) continue;
		if (typeof n == "string") return n;
		let r = e.slice(e.indexOf(":") + 1).trim();
		return n(e.includes(":") ? r : "");
	}
	return e;
}
//#endregion
//#region src/worker/demux.worker.ts?worker&inline
var et = "function e(e){return e.codecId===`V_MPEG4/ISO/AVC`?t(e.codecPrivate)||`avc1.640028`:e.codecId===`V_MPEGH/ISO/HEVC`?`hvc1.1.6.L150.B0`:e.codecId===`A_AAC`?`mp4a.40.2`:null}function t(e){if(!e||e.byteLength<4)return null;let t=new Uint8Array(e);return t[0]!==1||t.length<4?null:`avc1.${[t[1],t[2],t[3]].map(e=>e.toString(16).padStart(2,`0`)).join(``)}`}const n=new Set([`S_TEXT/UTF8`,`S_TEXT/ASCII`,`S_TEXT/ASS`,`S_TEXT/SSA`,`S_ASS`,`S_SSA`]);function r(e){return e.kind===`subtitle`&&n.has(e.codecId.toUpperCase())}function i(e,t){if(t>=e.length)return null;let n=e[t];if(n===0)return null;let r=128,i=1;for(;i<=8&&!(n&r);)r>>=1,i+=1;if(i>8||t+i>e.length)return null;let a=n&r-1,o=a===r-1;for(let n=1;n<i;n+=1){let r=e[t+n];a=a*256+r,r!==255&&(o=!1)}return o?{length:i,value:a,unknown:!0}:Number.isSafeInteger(a)?{length:i,value:a,unknown:!1}:null}function a(e,t){if(t<0||t>=e.length)return null;let n=e[t];if(n===0)return null;let r=128,a=1;for(;a<=4&&!(n&r);)r>>=1,a+=1;if(a>4||t+a>=e.length)return null;let o=0;for(let n=0;n<a;n+=1)o=o*256+e[t+n];let s=i(e,t+a);if(!s)return null;let c=t+a+s.length;if(s.unknown)return{id:o,data:c,size:-1,end:e.length,unknownSize:!0,truncated:!1};if(!Number.isSafeInteger(c+s.value))return null;let l=c+s.value;return{id:o,data:c,size:s.value,end:l,unknownSize:!1,truncated:l>e.length}}function o(e,t,n,r){let i=t,o=Math.min(n,e.length);for(;i<o;){let t=a(e,i);if(!t||t.truncated||t.end>o||t.end<=i)return{complete:!1,consumed:i};r(t),i=t.end}return{complete:i===o,consumed:i}}function s(e,t,n,r){let i=t,o=Math.min(n,e.length);for(;i<o;){let t=a(e,i);if(!t)return null;if(t.id===r)return t;if(t.truncated||t.unknownSize||t.end<=i)return null;i=t.end}return null}function c(e,t){let n=0;for(let r=t.data;r<Math.min(t.end,e.length);r+=1)n=n*256+e[r];return n}function l(e,t){let n=e[t]<<8|e[t+1];return n&32768?n-65536:n}function u(e,t){return new TextDecoder().decode(e.subarray(t.data,Math.min(t.end,e.length))).replace(/\\0+$/,``)}function d(e,t){if(t.end>e.length)return 0;let n=new DataView(e.buffer,e.byteOffset+t.data,t.size);return t.size===4?n.getFloat32(0):t.size===8?n.getFloat64(0):c(e,t)}function f(e,t){return e.slice(t.data,Math.min(t.end,e.length)).buffer}function p(e,t,n,r){let i=[],a=t;for(let t=0;t<r;t+=1){let t=0;for(;;){if(a>=n)return null;let r=e[a];if(a+=1,t+=r,r!==255)break}i.push(t)}return{sizes:i,offset:a}}function m(e,t,n,r){let a=[],o=t,s=i(e,o);if(!s||o+s.length>n)return null;o+=s.length,a.push(s.value);for(let t=1;t<r;t+=1){let t=i(e,o);if(!t||o+t.length>n)return null;o+=t.length;let r=2**(7*t.length-1)-1,s=a[a.length-1]+(t.value-r);if(s<0)return null;a.push(s)}return{sizes:a,offset:o}}function h(e,t,n){let r=Math.min(t.end,e.length);if(r-t.data<4)return[];let a=i(e,t.data);if(!a||t.data+a.length+3>r)return[];let o=a.value;if(!n.trackIds.has(o))return[];let s=l(e,t.data+a.length),c=e[t.data+a.length+2],u=t.data+a.length+3,d=(c&6)>>1,f=n.kind===`simple`?!!(c&128):!n.groupHasReference,h=Math.round((n.clusterTime+s)*n.timecodeScale/1e3),g=n.defaultDurations?.get(o),_=n.blockDurationTicks===void 0?void 0:Math.round(n.blockDurationTicks*n.timecodeScale/1e3);if(d===0)return[{trackId:o,timestamp:h,duration:_===void 0?g===void 0?0:Math.round(g/1e3):_,key:f,data:e.slice(u,r)}];if(u>=r)return[];let v=e[u]+1;if(v<1)return[];let y=u+1,b;if(d===2){let e=r-y;if(e<=0||e%v!==0)return[];b=Array(v).fill(e/v)}else{let t=d===1?p(e,y,r,v-1):m(e,y,r,v-1);if(!t)return[];y=t.offset;let n=t.sizes.reduce((e,t)=>e+t,0),i=r-y;if(n>i)return[];b=[...t.sizes,i-n]}if(b.some(e=>e<0))return[];let x=_===void 0?g===void 0?0:Math.round(g/1e3):Math.round(_/v),S=[];for(let t=0;t<b.length;t+=1){let n=b[t];if(y+n>r)return[];S.push({trackId:o,timestamp:h+t*x,duration:x,key:f,data:e.slice(y,y+n)}),y+=n}return S}const g=[26,69,223,163];function _(e){return e.length>=g.length&&g.every((t,n)=>e[n]===t)}const v={segment:408125543,info:357149030,timecodeScale:2807729,duration:17545,tracks:374648427,trackEntry:174,trackNumber:215,trackType:131,codecId:134,codecPrivate:25506,language:2274716,name:21358,defaultDuration:2352003,video:224,pixelWidth:176,pixelHeight:186,audio:225,samplingFrequency:181,channels:159,cues:475249515,cuePoint:187,cueTime:179,cueTrackPositions:183,cueTrack:247,cueClusterPosition:241,cueRelativePosition:240,seekHead:290298740,seek:19899,seekId:21419,seekPosition:21420,cluster:524531317,timecode:231,simpleBlock:163,blockGroup:160,block:161,blockDuration:155,referenceBlock:251},y=new Set([v.timecode,22612,167,171,v.simpleBlock,v.blockGroup,175]),b=[1048576,4194304,16777216],x=65536,S=67108864;function C(t,n){let r=0,i=0,a=``,s,l,p,m,h,g,_,y;o(t,n.data,n.end,e=>{e.id===v.trackNumber?r=c(t,e):e.id===v.trackType?i=c(t,e):e.id===v.codecId?a=u(t,e):e.id===v.codecPrivate?s=f(t,e):e.id===v.language?l=u(t,e):e.id===v.name?p=u(t,e):e.id===v.defaultDuration?y=c(t,e):e.id===v.video?o(t,e.data,e.end,e=>{e.id===v.pixelWidth&&(m=c(t,e)),e.id===v.pixelHeight&&(h=c(t,e))}):e.id===v.audio&&o(t,e.data,e.end,e=>{e.id===v.samplingFrequency&&(g=Math.round(d(t,e))),e.id===v.channels&&(_=c(t,e))})});let b=i===1?`video`:i===2?`audio`:i===17?`subtitle`:null;if(!r||!b||!a)return null;let x={id:r,kind:b,codecId:a,codecPrivate:s,language:l,name:p,width:m,height:h,sampleRate:g,channels:_,defaultDurationNs:y};return x.codec=e(x)||void 0,x}var w=class{loader;selected=new Set;metadata=null;cues=[];clusterIndex=[];defaultDurations=new Map;segmentDataStart=0;segmentEnd=1/0;firstClusterOffset=0;cursor=0;atEnd=!1;constructor(e){this.loader=e}get endOfStream(){return this.atEnd}async init(){let e=await this.loader.probe();if(e.cors===`blocked`)throw Error(`CORS_BLOCKED:${e.message||``}`);let t=e.size??this.loader.totalSize??b[b.length-1],n=new Uint8Array,i=null,l=!1;for(let e of b){if(n=await this.loader.read(0,Math.min(e,t)),!_(n))throw Error(`MKV_EBML_HEADER_INVALID`);if(i=s(n,0,n.length,v.segment),!i){if(!a(n,0)||n.length>=t)throw Error(`MKV_SEGMENT_NOT_FOUND`);continue}if(l=s(n,i.data,Math.min(i.end,n.length),v.tracks)?.truncated===!1,l||n.length>=t)break}if(!i)throw Error(`MKV_SEGMENT_NOT_FOUND`);this.segmentDataStart=i.data,this.segmentEnd=i.unknownSize?this.loader.totalSize??t:Math.min(i.data+i.size,this.loader.totalSize??1/0);let u=1e6,f=0,p=[],m=null,h=null;if(o(n,i.data,Math.min(i.end,n.length),e=>{e.id===v.info?o(n,e.data,e.end,e=>{e.id===v.timecodeScale&&(u=c(n,e)),e.id===v.duration&&(f=d(n,e))}):e.id===v.tracks?o(n,e.data,e.end,e=>{if(e.id===v.trackEntry){let t=C(n,e);t&&p.push(t)}}):e.id===v.cues?m=e:e.id===v.seekHead&&(h=e)}),!p.length)throw Error(`MKV_TRACKS_NOT_FOUND`);this.selected.clear();for(let e of[`video`,`audio`]){let t=p.find(t=>t.kind===e);t&&this.selected.add(t.id)}p.filter(r).forEach(e=>this.selected.add(e.id)),this.defaultDurations=new Map(p.filter(e=>e.defaultDurationNs).map(e=>[e.id,e.defaultDurationNs])),this.metadata={tracks:p,duration:f?f*u/1e9:0,timecodeScale:u},m?this.parseCues(n,m,u):h&&await this.loadCuesViaSeekHead(n,h,u);let g=await this.locateFirstCluster(n,i);if(g<0)throw Error(`MKV_NO_CLUSTER`);return this.firstClusterOffset=g,this.cursor=g,this.atEnd=!1,this.metadata}async locateFirstCluster(e,t){let n=e,r=0,i=t.data,o=0;for(;i<this.segmentEnd&&o<4096;){if(o+=1,i<r||i-r+16>n.length){let e=await this.loader.readWindow(i,x);if(n=e.bytes,r=e.base,i-r>=n.length)return-1}let e=a(n,i-r);if(!e)return-1;if(e.id===v.cluster)return i;if(e.unknownSize)return-1;e.id===v.cues&&!this.cues.length&&!e.truncated&&this.parseCues(n,e,this.metadata?.timecodeScale??1e6);let t=r+e.end;if(t<=i)return-1;i=t}return-1}async loadCuesViaSeekHead(e,t,n){let r=-1;if(o(e,t.data,t.end,t=>{if(t.id!==v.seek)return;let n=0,i=-1;o(e,t.data,t.end,t=>{t.id===v.seekId&&(n=c(e,t)),t.id===v.seekPosition&&(i=c(e,t))}),n===v.cues&&i>=0&&(r=i)}),r<0)return;let i=this.segmentDataStart+r;try{let{bytes:e,base:t}=await this.loader.readWindow(i,x),r=a(e,i-t);if(!r||r.id!==v.cues)return;let o=r.end-(i-t),s=r.truncated?await this.loader.readWindow(i,o):{bytes:e,base:t},c=a(s.bytes,i-s.base);c&&c.id===v.cues&&!c.truncated&&this.parseCues(s.bytes,c,n)}catch{}}parseCues(e,t,n){let r=[];o(e,t.data,Math.min(t.end,e.length),t=>{if(t.id!==v.cuePoint)return;let i=0;o(e,t.data,t.end,t=>{if(t.id===v.cueTime&&(i=c(e,t)),t.id===v.cueTrackPositions){let a=0,s=-1;o(e,t.data,t.end,t=>{t.id===v.cueTrack&&(a=c(e,t)),t.id===v.cueClusterPosition&&(s=c(e,t))}),s>=0&&r.push({time:i*n/1e9,offset:this.segmentDataStart+s,track:a})}})}),this.cues=r.sort((e,t)=>e.time-t.time)}resolveSeekOffset(e){let t=this.cueOffsetFor(e);return t>=0?t:this.indexOffsetFor(e)?.offset??this.firstClusterOffset}cueOffsetFor(e){let t=this.metadata?.tracks.find(e=>e.kind===`video`),n=t?this.cues.filter(e=>e.track===t.id):[],r=n.length?n:this.cues,i=-1;for(let t of r)if(t.time<=e)i=t.offset;else break;return i}indexOffsetFor(e){let t=null;for(let n of this.clusterIndex)n.time<=e&&(!t||n.time>=t.time)&&(t=n);return t}async seekOffsetFor(e){if(e<=0)return this.resolveSeekOffset(e);let t=this.cueOffsetFor(e);if(t>=0)return t;let n=this.indexOffsetFor(e);if(n&&e-n.time<=4)return n.offset;let r=n?.offset??this.firstClusterOffset,i=await this.scanForCluster(e,n?.time??0,r);return i>=0?i:r}async scanForCluster(e,t,n){let r=Number.isFinite(this.segmentEnd)?this.segmentEnd:this.loader.totalSize??0;if(!r||r<=n)return-1;let i=n,a=r,o=t<=e?n:-1;for(let t=0;t<12&&i<a;t+=1){let t=Math.floor((i+a)/2),n=await this.clusterAtOrAfter(t,a);if(!n||n.offset>=a){a=t;continue}n.time<=e?(o=n.offset,i=n.offset+1):a=t}return o}async clusterAtOrAfter(e,t){let n=Math.max(e,0);for(let e=0;e<8&&n<t;e+=1){let{bytes:e,base:t}=await this.loader.readWindow(n,262144),r=n-t;if(r>=e.length)return null;for(let n=r;n+4<=e.length;n+=1){if(e[n]!==31||e[n+1]!==67||e[n+2]!==182||e[n+3]!==117)continue;let r=a(e,n);if(!r||r.id!==v.cluster)continue;let i=-1;if(o(e,r.data,Math.min(r.end,e.length),t=>{i<0&&t.id===v.timecode&&(i=c(e,t))}),i<0)continue;let s=t+n,l=i*(this.metadata?.timecodeScale??1e6)/1e9;return this.recordCluster(s,l),{offset:s,time:l}}n=t+Math.max(e.length-3,1)}return null}async packetsFor(e=0){if(!this.metadata)throw Error(`DEMUX_NOT_INITIALIZED`);return this.cursor=await this.seekOffsetFor(e),this.atEnd=!1,this.next()}async next(){if(!this.metadata)throw Error(`DEMUX_NOT_INITIALIZED`);let e=[],t=0,n=1/0,r=-1/0;for(;!this.atEnd&&this.cursor<this.segmentEnd;){let i=await this.readClusterAt(this.cursor);if(i.nextOffset<=this.cursor){this.atEnd=!0;break}if(this.cursor=i.nextOffset,this.cursor>=this.segmentEnd&&(this.atEnd=!0),i.packets.length){t+=1;for(let t of i.packets){e.push(t);let i=t.timestamp/1e6;i<n&&(n=i),i>r&&(r=i)}}if(i.truncated||e.length&&(t>=24||r-n>=2))break}return e.length?e.sort((e,t)=>e.timestamp-t.timestamp):(this.atEnd=!0,[])}select(e,t){this.metadata?.tracks.find(n=>n.id===t&&n.kind===e)&&e!==`subtitle`&&(this.metadata?.tracks.filter(t=>t.kind===e).forEach(e=>this.selected.delete(e.id)),this.selected.add(t))}async readClusterAt(e){let{bytes:t,base:n}=await this.loader.readWindow(e,x),r=e-n;if(r>=t.length)return{packets:[],nextOffset:this.segmentEnd,truncated:!0};let i=a(t,r);if(!i)throw Error(`MKV_CLUSTER_HEADER_INVALID`);if(i.id!==v.cluster)return i.unknownSize?{packets:[],nextOffset:this.segmentEnd,truncated:!1}:{packets:[],nextOffset:n+i.end,truncated:!1};if(i.unknownSize)return this.readUnboundedCluster(e);let o=i.data-r+i.size;if(e+o>this.segmentEnd){let n=Math.min(t.length-r,Math.max(0,this.segmentEnd-e));return{packets:this.parseClusterBody(t,r,r+n,e),nextOffset:this.segmentEnd,truncated:!0}}if(o>t.length-r){let i=await this.loader.readWindow(e,o);if(t=i.bytes,n=i.base,r=e-n,o>t.length-r){let n=Math.max(0,t.length-r);return{packets:this.parseClusterBody(t,r,r+n,e),nextOffset:this.segmentEnd,truncated:!0}}}return{packets:this.parseClusterBody(t,r,r+o,e),nextOffset:e+o,truncated:!1}}async readUnboundedCluster(e){let t=x;for(;;){let{bytes:n,base:r}=await this.loader.readWindow(e,t),i=e-r,o=a(n,i);if(!o)throw Error(`MKV_CLUSTER_HEADER_INVALID`);let s=o.data,c=-1,l=!1;for(;s<n.length;){let e=a(n,s);if(!e){l=!0;break}if(!y.has(e.id)){c=s;break}if(e.truncated){l=!0;break}s=e.end}if(c<0&&l&&n.length-i>=t&&t<S){t*=4;continue}let u=c>=0?c:Math.min(s,n.length);if(c<0&&t>=S)throw Error(`MKV_CLUSTER_UNBOUNDED`);return{packets:this.parseClusterBody(n,i,u,e),nextOffset:r+u,truncated:!1}}}parseClusterBody(e,t,n,r){let i=a(e,t);if(!i)return[];let s=0,l=[],u=new Set(this.selected),d=this.metadata?.timecodeScale||1e6;return o(e,i.data,Math.min(n,e.length),t=>{if(t.id===v.timecode){s=c(e,t),this.recordCluster(r,s*d/1e9);return}if(t.id===v.simpleBlock){l.push(...h(e,t,{clusterTime:s,timecodeScale:d,trackIds:u,kind:`simple`,defaultDurations:this.defaultDurations}));return}if(t.id===v.blockGroup){let n=!1,r;o(e,t.data,t.end,t=>{t.id===v.referenceBlock&&(n=!0),t.id===v.blockDuration&&(r=c(e,t))}),o(e,t.data,t.end,t=>{t.id===v.block&&l.push(...h(e,t,{clusterTime:s,timecodeScale:d,trackIds:u,kind:`group`,groupHasReference:n,blockDurationTicks:r,defaultDurations:this.defaultDurations}))})}}),l}recordCluster(e,t){this.clusterIndex.some(t=>t.offset===e)||(this.clusterIndex.push({offset:e,time:t}),this.clusterIndex.sort((e,t)=>e.offset-t.offset))}},T=class{source;chunkSize;chunks=new Map;inflight=new Map;cachedBytes=0;downloadedBytes=0;size=null;contentType=null;rangeSupport=!1;fullBody=null;lastProbe={size:null,contentType:null,acceptsRanges:!1,status:null,cors:`unknown`};constructor(e,t=1048576){this.source=e,this.chunkSize=t}async probe(){if(this.source.kind===`file`)return this.size=this.source.file.size,this.contentType=this.source.file.type||`video/x-matroska`,this.rangeSupport=!0,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:!0,status:200,cors:`ok`},this.lastProbe;let e=null;try{e=await fetch(this.source.url,{method:`HEAD`,redirect:`follow`})}catch{}if(e&&(this.size=this.parseLength(e.headers.get(`content-length`)),this.contentType=e.headers.get(`content-type`),this.rangeSupport=e.headers.get(`accept-ranges`)?.toLowerCase()===`bytes`,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:this.rangeSupport,status:e.status,cors:`ok`,message:e.ok&&this.rangeSupport?void 0:e.ok?`正在验证 GET Range 响应`:`探测请求返回 HTTP ${e.status}`},e.ok&&this.rangeSupport))return this.lastProbe;try{let e=await fetch(this.source.url,{headers:{Range:`bytes=0-0`},redirect:`follow`});return this.updateFromResponse(e),e.body&&await e.body.cancel(),this.lastProbe}catch(t){return this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:!1,status:e?.status||null,cors:`blocked`,message:t instanceof Error?t.message:`跨域或网络请求被阻止`},this.lastProbe}}async read(e,t){if(e<0||t<=0)throw Error(`READ_RANGE_INVALID`);let n=this.size===null?t:Math.min(t,Math.max(0,this.size-e));if(n<=0)return new Uint8Array;if(this.source.kind===`file`)return new Uint8Array(await this.source.file.slice(e,e+n).arrayBuffer());if(this.fullBody)return this.fullBody.slice(e,e+n);let r=Math.floor(e/this.chunkSize),i=Math.floor((e+n-1)/this.chunkSize);await this.ensureChunks(r,i);let a=this.fullBody;return a?a.slice(e,e+n):(this.prefetch(i+1,i+4),this.assemble(e,n))}async readChunk(e){return this.read(e,this.chunkSize)}async readWindow(e,t){if(e<0||t<=0)throw Error(`READ_RANGE_INVALID`);if(this.source.kind===`file`)return{bytes:await this.read(e,t),base:e};let n=Math.floor(e/this.chunkSize)*this.chunkSize,r=e-n+t,i=Math.max(this.chunkSize,r);return{bytes:await this.read(n,i),base:n}}async ensureChunks(e,t){let n=[],r=-1;for(let i=e;i<=t+1;i+=1){let e=i<=t&&!this.chunks.has(i)&&!this.inflight.has(i);e&&r<0&&(r=i),!e&&r>=0&&(n.push(this.startRun(r,i-1)),r=-1);let a=i<=t?this.inflight.get(i):void 0;a&&n.push(a)}n.length&&await Promise.all(n)}startRun(e,t){let n=this.fetchRun(e,t).finally(()=>{for(let r=e;r<=t;r+=1)this.inflight.get(r)===n&&this.inflight.delete(r)});for(let r=e;r<=t;r+=1)this.inflight.set(r,n);return n}prefetch(e,t){if(this.fullBody||this.size===null)return;let n=Math.floor(Math.max(0,this.size-1)/this.chunkSize),r=Math.min(t,n);for(let t=e;t<=r;t+=1){if(this.chunks.has(t)||this.inflight.has(t))continue;let e=t;for(;e+1<=r&&!this.chunks.has(e+1)&&!this.inflight.has(e+1);)e+=1;this.startRun(t,e).catch(()=>void 0),t=e}}async fetchRun(e,t){let n=e*this.chunkSize,r=(t+1)*this.chunkSize-1,i=this.size===null?r:Math.min(r,this.size-1);if(i<n)return;let a=await this.fetchWithRetry({Range:`bytes=${n}-${i}`});if(a.status===416){(this.size===null||this.size>n)&&(this.size=n);return}if(!a.ok)throw Error(`RANGE_HTTP_${a.status}`);let o=new Uint8Array(await a.arrayBuffer());if(this.downloadedBytes+=o.byteLength,a.status===206){if(this.updateFromResponse(a),!o.byteLength){(this.size===null||this.size>n)&&(this.size=n);return}this.storeChunks(n,o);return}if(a.status===200){if(o.byteLength>536870912)throw Error(`RANGE_UNSUPPORTED:服务器忽略 Range 且文件过大`);this.fullBody=o,this.size=o.byteLength,this.contentType=a.headers.get(`content-type`)||this.contentType,this.rangeSupport=!1,this.chunks.clear(),this.cachedBytes=0,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:!1,status:a.status,cors:`ok`,message:`资源未返回 206 Partial Content，将使用完整响应读取`};return}throw Error(`RANGE_HTTP_${a.status}`)}async fetchWithRetry(e){let t=this.source.kind===`url`?this.source.url:``,n=null;for(let r=0;r<2;r+=1)try{let n=await fetch(t,{headers:e,redirect:`follow`});if(n.status>=500&&r===0){await E(200);continue}return n}catch(e){n=e,r===0&&await E(200)}throw n instanceof Error?n:Error(`RANGE_NETWORK_ERROR`)}storeChunks(e,t){for(let n=0;n<t.byteLength;n+=this.chunkSize){let r=(e+n)/this.chunkSize;if(!Number.isInteger(r))continue;let i=t.slice(n,n+this.chunkSize),a=this.chunks.get(r);a&&(this.cachedBytes-=a.byteLength),this.chunks.set(r,i),this.cachedBytes+=i.byteLength}this.evict()}evict(){for(;this.cachedBytes>134217728;){let e=this.chunks.keys().next();if(e.done)break;let t=this.chunks.get(e.value);this.chunks.delete(e.value),this.cachedBytes-=t?.byteLength??0}}assemble(e,t){let n=new Uint8Array(t),r=0;for(;r<t;){let i=e+r,a=Math.floor(i/this.chunkSize),o=this.chunks.get(a);if(!o)break;this.chunks.delete(a),this.chunks.set(a,o);let s=i-a*this.chunkSize;if(s>=o.byteLength)break;let c=Math.min(o.byteLength-s,t-r);n.set(o.subarray(s,s+c),r),r+=c}return r===t?n:n.slice(0,r)}parseLength(e){let t=Number(e);return Number.isFinite(t)&&t>0?t:null}updateFromResponse(e){let t=e.headers.get(`content-range`)?.match(/^bytes\\s+(\\d+)-(\\d+)\\/(\\d+|\\*)$/i),n=t?.[3]&&t[3]!==`*`?Number(t[3]):null;n&&Number.isFinite(n)&&(this.size=n),this.contentType=e.headers.get(`content-type`)||this.contentType,this.rangeSupport=e.status===206,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:this.rangeSupport,status:e.status,cors:`ok`,message:this.rangeSupport?void 0:`资源未返回 206 Partial Content`}}get totalSize(){return this.size}get supportsRange(){return this.rangeSupport}get probeInfo(){return this.lastProbe}get networkBytes(){return this.downloadedBytes}};function E(e){return new Promise(t=>setTimeout(t,e))}let D=null,O=!1;function k(e){if(e.type===`packets`){let t=e.packets.map(e=>e.data.buffer);self.postMessage(e,t)}else self.postMessage(e)}self.onmessage=async e=>{let t=e.data,n=`epoch`in t?t.epoch:0;try{if(t.type===`init`){O=!1;let e=new T(t.source);D=new w(e),k({type:`progress`,phase:`加载 TypeScript 解封装器`,value:.08}),k({type:`progress`,phase:`读取 Matroska 头部`,value:.1}),k({type:`metadata`,metadata:await D.init(),probe:e.probeInfo}),k({type:`progress`,phase:`解析首个 Cluster`,value:.35});let n=await D.packetsFor(0);O=!0,k({type:`packets`,packets:n,epoch:0});return}if(!D||!O){(t.type===`next`||t.type===`seek`||t.type===`select-track`)&&k({type:`packets`,packets:[],epoch:n});return}if(t.type===`seek`)k({type:`progress`,phase:`定位关键帧`,value:.2}),k({type:`packets`,packets:await D.packetsFor(t.time),epoch:n});else if(t.type===`next`){let e=await D.next();e.length?k({type:`packets`,packets:e,epoch:n}):k({type:`eof`,epoch:n})}else t.type===`select-track`?(D.select(t.kind,t.trackId),t.kind===`subtitle`?k({type:`packets`,packets:[],epoch:n}):k({type:`packets`,packets:await D.packetsFor(t.time),epoch:n})):t.type===`close`&&(D=null,O=!1,k({type:`eof`,epoch:n}))}catch(e){k({type:`error`,code:e instanceof Error?e.message.split(`:`)[0]:`DEMUX_ERROR`,message:e instanceof Error?e.message:`Matroska 解析失败`})}};\n//# sourceMappingURL=demux.worker-B44Y66q-.js.map", tt = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", et], { type: "text/javascript;charset=utf-8" });
function nt(e) {
	let t;
	try {
		if (t = tt && (self.URL || self.webkitURL).createObjectURL(tt), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(et), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region src/worker/worker-factory.ts
var rt = {
	name: "mx-player-demux",
	type: "module"
};
function it(e, t, n = Worker) {
	return e ? new n(e, rt) : new t(rt);
}
//#endregion
//#region src/worker/create-demux-worker.ts
function at(e) {
	try {
		return it(e, nt);
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		throw Error(`WORKER_CREATE_FAILED:${t}`);
	}
}
//#endregion
//#region node_modules/.pnpm/react@19.2.8/node_modules/react/cjs/react-jsx-runtime.production.js
var ot = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
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
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), st = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === T ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case S: return "Suspense";
				case C: return "SuspenseList";
				case w: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case ee: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case te:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case ne: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case re:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === re) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = E.A;
			return e === null ? null : e.getOwner();
		}
		function o() {
			return Error("react-stack-top-frame");
		}
		function s(e) {
			if (ie.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function c(e, t) {
			function n() {
				oe || (oe = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return se[e] || (se[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, l, u) {
			var f = n.children;
			if (f !== void 0) if (o) if (ae(f)) {
				for (o = 0; o < f.length; o++) p(f[o]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (ie.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", ce[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), ce[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), s(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && c(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, i, a(), l, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === re && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = l(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), re = Symbol.for("react.lazy"), w = Symbol.for("react.activity"), T = Symbol.for("react.client.reference"), E = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ie = Object.prototype.hasOwnProperty, ae = Array.isArray, D = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var oe, se = {}, O = h.react_stack_bottom_frame.bind(h, o)(), k = D(i(o)), ce = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : O, r ? D(i(e)) : k);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : O, r ? D(i(e)) : k);
		};
	})();
})), M = (/* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? ot() : st();
})))(), ct = "1.2.0", lt = 2048, ut = "ABCabc123", dt = 34, ft = 4, pt = {
	currentTime: 0,
	bufferedStart: 0,
	bufferedEnd: 0,
	bufferedAhead: 0,
	bufferedBytes: 0,
	stalled: !1,
	droppedFrames: 0
}, mt = (0, C.forwardRef)(function(e, t) {
	let { source: n, label: r = "MX Player Pro", onExit: i, embedded: a = !1, autoplay: o = !1, initialVolume: s = .85, initialMuted: c = !1, workerUrl: l, onNext: u, qualities: d = [], selectedQuality: f = "auto", onQualityChange: p, danmaku: m, className: h, style: g } = e, _ = (0, C.useRef)(null), v = (0, C.useRef)(null), y = (0, C.useRef)(null), b = (0, C.useRef)(null), x = (0, C.useRef)(0), ee = (0, C.useRef)(!1), te = (0, C.useRef)(!1), S = (0, C.useRef)(!1), ne = (0, C.useRef)(null), re = (0, C.useRef)(null), w = (0, C.useRef)(null), T = (0, C.useRef)({
		x: 0,
		y: 0
	}), ae = (0, C.useRef)(!1), [D, oe] = (0, C.useState)(null), [pe, ye] = (0, C.useState)(null), [be, A] = (0, C.useState)(n ? "正在连接媒体…" : "等待媒体地址"), [j, De] = (0, C.useState)(""), [ke, Ae] = (0, C.useState)(!1), [je, Fe] = (0, C.useState)(c), [Ie, ze] = (0, C.useState)(Ot(s)), [Be, Ve] = (0, C.useState)(1), [He, Ue] = (0, C.useState)(0), [We, Ge] = (0, C.useState)(), [Ke, qe] = (0, C.useState)(), [Je, Ye] = (0, C.useState)(null), [Ze, Qe] = (0, C.useState)(!1), [et, tt] = (0, C.useState)([]), [nt, rt] = (0, C.useState)(!1), [it, ot] = (0, C.useState)(!1), [st, ct] = (0, C.useState)("track"), [dt, ft] = (0, C.useState)(!1), [mt, kt] = (0, C.useState)(() => Le(Dt(n))), [At, jt] = (0, C.useState)(!0), [Mt, Nt] = (0, C.useState)(!1), [Pt, Ft] = (0, C.useState)(!1), [It, Lt] = (0, C.useState)({
		open: !1,
		x: 0,
		y: 0
	}), [Rt, zt] = (0, C.useState)(!1), [Bt, Vt] = (0, C.useState)(!1), [Ht, Ut] = (0, C.useState)("等待 WebCodecs…"), [Wt, Gt] = (0, C.useState)(pt), [Kt, qt] = (0, C.useState)(m?.visible ?? !0), [Jt, Yt] = (0, C.useState)(0), Xt = (0, C.useRef)(!1), Zt = (0, C.useRef)(void 0), Qt = (0, C.useRef)(void 0), $t = (0, C.useRef)(null), en = (0, C.useRef)(!1), tn = (0, C.useRef)(/* @__PURE__ */ new Map()), nn = (0, C.useRef)(/* @__PURE__ */ new Map()), rn = (0, C.useRef)(""), an = (0, C.useRef)(() => void 0), on = (0, C.useRef)(() => void 0), sn = (0, C.useRef)(0), cn = (0, C.useRef)(Dt(n)), ln = (0, C.useRef)(!1), un = (0, C.useRef)(() => void 0), dn = (0, C.useRef)(e), fn = (0, C.useRef)(null), pn = (0, C.useRef)(null);
	dn.current = e;
	let mn = D?.tracks.filter((e) => e.kind === "video") || [], hn = D?.tracks.filter((e) => e.kind === "audio") || [], gn = D?.tracks.filter((e) => e.kind === "subtitle") || [], _n = gn.filter(Te), vn = D?.duration || 0, yn = _n.find((e) => e.id === Je), bn = it || dt;
	Xt.current = ke, Zt.current = We, Qt.current = Ke, $t.current = Je, en.current = Ze, sn.current = vn, an.current = Cn, on.current = xn, un.current = Xn, (0, C.useImperativeHandle)(t, () => ({
		play: En,
		pause: Dn,
		toggle: On,
		seek: kn,
		setVolume: tr,
		setMuted: (e) => {
			Fe(e), b.current?.setVolume(e ? 0 : Ie);
		},
		setPlaybackRate: (e) => {
			let t = Math.max(.25, Math.min(4, e));
			Ve(t), b.current?.setPlaybackRate(t);
		},
		requestFullscreen: jn,
		requestPictureInPicture: Mn,
		getState: () => ({
			ready: S.current,
			playing: Xt.current,
			currentTime: b.current?.currentTime ?? He,
			duration: vn,
			volume: Ie,
			muted: je,
			playbackRate: Be,
			bufferedAhead: Wt.bufferedAhead,
			stalled: Wt.stalled,
			error: j || null
		}),
		getTracks: () => D?.tracks ?? []
	})), (0, C.useEffect)(() => {
		let e = v.current;
		if (!e || !n) {
			oe(null), ye(null), A("等待媒体地址"), De(""), Ae(!1), Ue(0), Gt(pt);
			return;
		}
		oe(null), ye(null), A("正在连接媒体…"), De(""), Ae(!1), Xt.current = !1, Ue(0), Gt(pt), tt([]), rn.current = "";
		let t;
		try {
			t = at(l);
		} catch (e) {
			let t = $e(e instanceof Error ? e.message : String(e));
			De(t), A("Worker 创建失败"), dn.current.onError?.({ message: t });
			return;
		}
		let r = new Xe(e, (e) => {
			if (Ut(e.error ? $e(e.error) : `${e.videoReady ? "视频" : "视频不可用"}${e.audioReady ? " · 音频" : " · 音频不可用"}`), e.error && !/^DECODER_(?:ERROR|UNSUPPORTED)_AUDIO/i.test(e.error)) {
				let t = $e(e.error);
				De(t), dn.current.onError?.({ message: t });
			}
		});
		y.current = t, b.current = r, x.current = 0, ee.current = !1, te.current = !1, S.current = !1, t.onmessage = (e) => an.current(e.data), t.postMessage({
			type: "init",
			source: n
		});
		let i = window.setInterval(() => {
			let e = b.current;
			if (!e) return;
			e.tick();
			let t = e.stats();
			Gt(t);
			let n = sn.current ? Math.min(t.currentTime, sn.current) : t.currentTime;
			Ue(n), dn.current.onTimeUpdate?.({
				currentTime: n,
				duration: sn.current
			}), Sn(n), on.current();
		}, 100);
		return () => {
			window.clearInterval(i), t.postMessage({ type: "close" }), t.terminate(), r.close(), y.current = null, b.current = null;
		};
	}, [
		n,
		l,
		Jt
	]), (0, C.useEffect)(() => {
		function e() {
			Nt(document.fullscreenElement === _.current);
		}
		function t(e) {
			let t = e.target;
			t && _.current?.contains(t) || (Lt((e) => e.open ? {
				...e,
				open: !1
			} : e), rt(!1), un.current());
		}
		return document.addEventListener("fullscreenchange", e), document.addEventListener("pointerdown", t), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("pointerdown", t);
		};
	}, []), (0, C.useEffect)(() => () => {
		ne.current !== null && window.clearTimeout(ne.current), re.current !== null && window.clearTimeout(re.current), w.current !== null && window.clearTimeout(w.current), pn.current?.getTracks().forEach((e) => e.stop()), pn.current = null, fn.current?.remove(), fn.current = null;
	}, []), (0, C.useEffect)(() => {
		let e = Dt(n);
		cn.current = e, kt(Le(e));
	}, [n]), (0, C.useEffect)(() => {
		Re(cn.current, mt);
	}, [mt]);
	function xn() {
		!S.current || ee.current || te.current || b.current?.needsPackets(Xt.current, te.current, ee.current) && (ee.current = !0, y.current?.postMessage({
			type: "next",
			epoch: x.current
		}));
	}
	function Sn(e) {
		let t = $t.current, n = en.current && t !== null ? tn.current.get(t) : void 0, r = n ? Ce(n, e).map((e) => e.text) : [], i = r.join(" ");
		i !== rn.current && (rn.current = i, tt(r));
	}
	function Cn(e) {
		if (e.type === "progress") {
			A(e.phase);
			return;
		}
		if (e.type === "error") {
			ee.current = !1;
			let t = $e(e.message);
			De(t), A("读取失败"), dn.current.onError?.({ message: t });
			return;
		}
		if (e.type === "metadata") {
			let t = e.metadata.tracks, n = t.find((e) => e.kind === "video"), r = t.find((e) => e.kind === "audio");
			oe({
				tracks: t,
				duration: e.metadata.duration
			}), ye(e.probe), Ge(n?.id), qe(r?.id), Zt.current = n?.id, Qt.current = r?.id, Ye(null), $t.current = null, Qe(!1), en.current = !1, tn.current = /* @__PURE__ */ new Map(), nn.current = new Map(t.filter(Te).map((e) => [e.id, Ee(e)])), rn.current = "", tt([]), A("轨道已识别"), S.current = !0, b.current?.configure(n, r), b.current?.setVolume(je ? 0 : Ie), dn.current.onReady?.({
				tracks: t,
				duration: e.metadata.duration
			}), o && window.setTimeout(() => {
				!Xt.current && !bn && On();
			}, 0);
			return;
		}
		if (e.type === "packets") {
			if (e.epoch < x.current) return;
			ee.current = !1, e.packets.forEach((e) => wn(e)), e.packets.length && xn();
			return;
		}
		if (e.type === "eof") {
			if (e.epoch < x.current) return;
			ee.current = !1, te.current = !0, b.current?.markEndOfStream(), A("已到达文件末端"), dn.current.onEnded?.();
		}
	}
	function wn(e) {
		let t = nn.current.get(e.trackId);
		if (t !== void 0) {
			let n = new TextDecoder().decode(e.data), r = t ? Se(n) : xe(n.trim());
			r && Tn(e, r);
			return;
		}
		b.current?.enqueue(e, Zt.current, Qt.current);
	}
	function Tn(e, t) {
		let n = e.timestamp / 1e6, r = n + (e.duration > 0 ? e.duration / 1e6 : 3), i = tn.current.get(e.trackId) || [], a = i.length;
		for (; a > 0 && i[a - 1].start > n;) --a;
		if (!(a > 0 && i[a - 1].start === n && i[a - 1].text === t)) {
			for (let e = a; e < i.length && i[e].start === n; e += 1) if (i[e].text === t) return;
			i.splice(a, 0, {
				start: n,
				end: r,
				text: t
			}), i.length > lt && i.splice(0, i.length - lt), tn.current.set(e.trackId, i);
		}
	}
	function En() {
		if (bn || !S.current || !b.current || Xt.current) {
			Fn(bn);
			return;
		}
		Ae(!0), Xt.current = !0, b.current.play(), xn(), dn.current.onPlay?.(), Fn();
	}
	function Dn() {
		!b.current || !Xt.current || (Ae(!1), Xt.current = !1, b.current.pause(), dn.current.onPause?.(), Fn());
	}
	function On() {
		if (bn) {
			Fn(!0);
			return;
		}
		Xt.current ? Dn() : En(), Fn();
	}
	function kn(e) {
		let t = Math.max(0, Math.min(e, vn || e));
		Ue(t), x.current += 1, te.current = !1, ee.current = !1, b.current?.seekTo(t), Sn(t), y.current?.postMessage({
			type: "seek",
			time: t,
			epoch: x.current
		}), ee.current = !0, Fn();
	}
	function An(e, t) {
		if (e === "subtitle") {
			Ye(t), $t.current = t, Qe(t !== null), en.current = t !== null, Xn(), Sn(b.current?.currentTime ?? He);
			return;
		}
		if (qe(t === null ? void 0 : t), Qt.current = t === null ? void 0 : t, t === null) return;
		let n = b.current?.currentTime ?? 0;
		x.current += 1, te.current = !1, b.current?.seekTo(n), y.current?.postMessage({
			type: "select-track",
			kind: e,
			trackId: t,
			time: n,
			epoch: x.current
		}), ee.current = !0;
	}
	function jn() {
		let e = _.current;
		e && (document.fullscreenElement ? document.exitFullscreen() : e.requestFullscreen());
	}
	async function Mn() {
		let e = v.current, t = document;
		if (t.pictureInPictureElement) {
			await t.exitPictureInPicture?.();
			return;
		}
		if (!e?.captureStream) throw Error("当前浏览器不支持 Canvas 画中画。");
		let n = fn.current;
		n || (n = document.createElement("video"), n.muted = !0, n.playsInline = !0, n.style.display = "none", document.body.appendChild(n), fn.current = n), pn.current?.getTracks().forEach((e) => e.stop());
		let r = e.captureStream(30);
		if (pn.current = r, n.srcObject = r, await n.play(), !n.requestPictureInPicture) throw Error("当前浏览器不支持画中画。");
		await n.requestPictureInPicture();
	}
	function Nn() {
		let e = !Pt;
		Ft(e), dn.current.onTheaterChange?.(e);
	}
	function Pn() {
		let e = !Kt;
		qt(e), m?.onToggle?.(e);
	}
	function Fn(e = !1) {
		jt(!0), re.current !== null && window.clearTimeout(re.current), !(e || In()) && (re.current = window.setTimeout(() => jt(!1), 5e3));
	}
	function In() {
		return It.open || Rt || Bt || nt || it || dt;
	}
	function Ln(e) {
		xt(e.target) || (Gn(), ne.current !== null && window.clearTimeout(ne.current), ne.current = window.setTimeout(() => {
			ne.current = null, On();
		}, 220));
	}
	function Rn(e) {
		xt(e.target) || (ne.current !== null && (window.clearTimeout(ne.current), ne.current = null), jn());
	}
	function zn(e) {
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
				Gn(), zt(!1), Vt(!1), rt(!1), Xn();
				return;
			}
			Fn(), n === " " ? On() : n === "arrowleft" ? kn(He - 5) : n === "arrowright" ? kn(He + 5) : n === "j" ? kn(He - 10) : n === "l" ? kn(He + 10) : n === "arrowup" ? tr(Math.min(1, Ie + .05)) : n === "arrowdown" ? tr(Math.max(0, Ie - .05)) : n === "m" ? nr() : n === "f" && jn();
		}
	}
	function Bn(e) {
		if (xt(e.target)) return;
		let t = e.touches[0];
		t && (T.current = {
			x: t.clientX,
			y: t.clientY
		}, ae.current = !1, w.current !== null && window.clearTimeout(w.current), w.current = window.setTimeout(() => {
			ae.current = !0, Wn(T.current.x, T.current.y);
		}, 500));
	}
	function Vn(e) {
		let t = e.touches[0];
		!t || w.current === null || (Math.abs(t.clientX - T.current.x) > 10 || Math.abs(t.clientY - T.current.y) > 10) && (window.clearTimeout(w.current), w.current = null);
	}
	function Hn(e) {
		if (!xt(e.target)) {
			if (e.preventDefault(), w.current !== null && (window.clearTimeout(w.current), w.current = null), ae.current) {
				ae.current = !1;
				return;
			}
			At ? jt(!1) : Fn();
		}
	}
	function Un(e) {
		e.preventDefault(), Wn(e.clientX, e.clientY);
	}
	function Wn(e, t) {
		let n = _.current;
		if (!n) return;
		let r = n.getBoundingClientRect(), i = Math.max(8, Math.min(e - r.left, r.width - 234 - 8)), a = Math.max(8, Math.min(t - r.top, r.height - 84 - 8));
		Lt({
			open: !0,
			x: i,
			y: a
		}), rt(!1), Xn(), Fn(!0), n.focus();
	}
	function Gn() {
		Lt((e) => e.open ? {
			...e,
			open: !1
		} : e);
	}
	function Kn() {
		Gn(), zt(!0), rt(!1), Xn(), Fn(!0);
	}
	function qn() {
		Gn(), Vt(!0), rt(!1), Xn(), Fn(!0);
	}
	function Jn() {
		if (it) {
			Xn();
			return;
		}
		Yn(), ot(!0), ct("track"), rt(!1), Fn(!0);
	}
	function Yn() {
		bn || (ln.current = !ke), ke && (Ae(!1), Xt.current = !1, b.current?.pause(), dn.current.onPause?.());
	}
	function Xn() {
		!it && !dt || (ot(!1), ft(!1), ln.current || (Ae(!0), Xt.current = !0, b.current?.play(), xn(), dn.current.onPlay?.()), Fn());
	}
	function Zn() {
		Yn(), rt(!1), ft(!0), Fn(!0);
	}
	function Qn() {
		ft(!1), Fn();
	}
	function $n(e) {
		if (!_.current) return;
		e.stopPropagation();
		let t = _.current, n = e.clientY, r = mt.offset, i = t.getBoundingClientRect().height;
		function a(e) {
			let t = -(e.clientY - n) / i * 100;
			kt((e) => ({
				...e,
				offset: Pe(r + t)
			}));
		}
		function o() {
			document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", o);
		}
		document.addEventListener("pointermove", a), document.addEventListener("pointerup", o);
	}
	function er(e) {
		let t = e.currentTarget.parentElement?.getBoundingClientRect();
		if (!t) return;
		e.stopPropagation(), e.preventDefault();
		let n = t.left + t.width / 2, r = t.top + t.height / 2, i = Math.hypot(e.clientX - n, e.clientY - r), a = mt.scale;
		if (i < 1) return;
		function o(e) {
			let t = Math.hypot(e.clientX - n, e.clientY - r);
			kt((e) => ({
				...e,
				scale: Ne(t / i * a)
			}));
		}
		function s() {
			document.removeEventListener("pointermove", o), document.removeEventListener("pointerup", s);
		}
		document.addEventListener("pointermove", o), document.addEventListener("pointerup", s);
	}
	function tr(e) {
		ze(e), Fe(e <= 0), b.current?.setVolume(e);
	}
	function nr() {
		let e = !je;
		Fe(e), b.current?.setVolume(e ? 0 : Ie);
	}
	let rr = [
		["源", n?.kind === "file" ? "本地文件" : n ? Ct(r) : "未加载"],
		["状态", Wt.stalled ? "缓冲中" : be],
		["HTTP", String(pe?.status || "--")],
		["CORS", pe?.cors === "ok" ? "允许" : pe?.cors === "blocked" ? "阻断" : "未知"],
		["Range", pe?.acceptsRanges ? "206 Partial Content" : "完整响应 / 不支持 206"],
		["视频", mn[0] ? we(mn[0]) : "未识别"],
		["音频", hn[0] ? we(hn[0]) : "未识别"],
		["字幕", `${gn.length} 条（${_n.length} 条可用）`],
		["缓冲", `${Wt.bufferedAhead.toFixed(1)} 秒 · ${Tt(Wt.bufferedBytes)}`],
		["丢帧", String(Wt.droppedFrames)],
		["解码器", Ht]
	], ir = vn || 100, ar = wt(Math.min(He, ir) / ir * 100), or = wt(Math.min(Math.max(Wt.bufferedEnd, He), ir) / ir * 100);
	return /* @__PURE__ */ (0, M.jsxs)("div", {
		className: `${a ? "mx-player-embed" : "player-page"} ${Pt ? "is-theater" : ""} ${h || ""}`.trim(),
		style: g,
		children: [!a && /* @__PURE__ */ (0, M.jsxs)("header", {
			className: "player-topbar",
			children: [
				/* @__PURE__ */ (0, M.jsxs)("button", {
					className: "back-button",
					onClick: i,
					children: [
						/* @__PURE__ */ (0, M.jsx)(E, {
							size: 18,
							"aria-hidden": "true"
						}),
						" ",
						/* @__PURE__ */ (0, M.jsx)("span", { children: "重新选择" })
					]
				}),
				/* @__PURE__ */ (0, M.jsx)("div", {
					className: "player-title",
					title: r,
					children: r
				}),
				/* @__PURE__ */ (0, M.jsx)("div", {
					className: "player-topbar-right",
					children: /* @__PURE__ */ (0, M.jsxs)("span", {
						className: "status-dot",
						children: [
							/* @__PURE__ */ (0, M.jsx)("i", {}),
							" ",
							be
						]
					})
				})
			]
		}), /* @__PURE__ */ (0, M.jsx)("main", {
			className: a ? "mx-player-embed-main" : "player-layout",
			children: /* @__PURE__ */ (0, M.jsxs)("section", {
				className: "player-column",
				children: [/* @__PURE__ */ (0, M.jsxs)("div", {
					ref: _,
					className: "player-frame",
					tabIndex: 0,
					onMouseMove: () => Fn(),
					onMouseLeave: () => {
						In() || jt(!1);
					},
					onClick: Ln,
					onDoubleClick: Rn,
					onContextMenu: Un,
					onKeyDown: zn,
					onTouchStart: Bn,
					onTouchMove: Vn,
					onTouchEnd: Hn,
					"aria-label": "MX Player 视频播放器",
					children: [
						/* @__PURE__ */ (0, M.jsx)("canvas", {
							ref: v,
							className: "video-canvas",
							"aria-label": "视频画面"
						}),
						!D && !j && /* @__PURE__ */ (0, M.jsxs)("div", {
							className: "player-loading",
							"data-player-control": !0,
							children: [/* @__PURE__ */ (0, M.jsx)("span", { className: "spinner" }), /* @__PURE__ */ (0, M.jsx)("strong", { children: be })]
						}),
						D && !j && Wt.stalled && /* @__PURE__ */ (0, M.jsxs)("div", {
							className: "player-buffering",
							"data-player-control": !0,
							children: [/* @__PURE__ */ (0, M.jsx)("span", { className: "spinner" }), /* @__PURE__ */ (0, M.jsx)("strong", { children: "缓冲中…" })]
						}),
						j && /* @__PURE__ */ (0, M.jsxs)("div", {
							className: "player-error",
							"data-player-control": !0,
							children: [
								/* @__PURE__ */ (0, M.jsx)("strong", { children: "无法播放此媒体" }),
								/* @__PURE__ */ (0, M.jsx)("span", { children: j }),
								n && /* @__PURE__ */ (0, M.jsxs)("button", {
									className: "secondary-button",
									onClick: () => Yt((e) => e + 1),
									children: [/* @__PURE__ */ (0, M.jsx)(fe, { size: 15 }), " 重新读取"]
								})
							]
						}),
						(et.length > 0 || dt) && /* @__PURE__ */ (0, M.jsxs)("div", {
							className: `subtitle-overlay ${dt ? "is-editing" : ""}`,
							style: {
								"--subtitle-font": Me(mt.font),
								"--subtitle-scale": mt.scale,
								"--subtitle-offset": `${mt.offset}%`
							},
							"data-player-control": dt ? "" : void 0,
							onPointerDown: dt ? $n : void 0,
							children: [et.length > 0 ? et.flatMap((e, t) => e.split("\n").map((e, n) => /* @__PURE__ */ (0, M.jsx)("span", { children: e }, `${t}-${n}-${e}`))) : /* @__PURE__ */ (0, M.jsx)("span", {
								className: "subtitle-sample",
								children: ut
							}), dt && /* @__PURE__ */ (0, M.jsxs)(C.Fragment, { children: [
								/* @__PURE__ */ (0, M.jsx)("span", {
									className: "subtitle-handle is-nw",
									onPointerDown: er,
									title: "拖动调整大小"
								}),
								/* @__PURE__ */ (0, M.jsx)("span", {
									className: "subtitle-handle is-ne",
									onPointerDown: er,
									title: "拖动调整大小"
								}),
								/* @__PURE__ */ (0, M.jsx)("span", {
									className: "subtitle-handle is-sw",
									onPointerDown: er,
									title: "拖动调整大小"
								}),
								/* @__PURE__ */ (0, M.jsx)("span", {
									className: "subtitle-handle is-se",
									onPointerDown: er,
									title: "拖动调整大小"
								})
							] })]
						}),
						Rt && /* @__PURE__ */ (0, M.jsx)(vt, {
							rows: rr,
							onClose: () => zt(!1)
						}),
						Bt && /* @__PURE__ */ (0, M.jsx)(yt, { onClose: () => Vt(!1) }),
						it && /* @__PURE__ */ (0, M.jsx)(gt, {
							page: st,
							tracks: _n,
							selectedId: Je,
							enabled: Ze,
							style: mt,
							onSelect: (e) => An("subtitle", e),
							onFontChange: (e) => kt((t) => ({
								...t,
								font: e
							})),
							onPage: ct,
							onEdit: Zn
						}),
						dt && /* @__PURE__ */ (0, M.jsx)(_t, {
							style: mt,
							onReset: () => kt({ ...Oe }),
							onDone: Qn
						}),
						/* @__PURE__ */ (0, M.jsxs)("div", {
							className: `player-controls ${At ? "is-visible" : ""}`,
							"data-player-control": !0,
							onClick: (e) => e.stopPropagation(),
							children: [/* @__PURE__ */ (0, M.jsxs)("div", {
								className: "seek-shell",
								style: {
									"--played": `${ar}%`,
									"--buffered": `${or}%`
								},
								children: [/* @__PURE__ */ (0, M.jsxs)("div", {
									className: "seek-rail",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ (0, M.jsx)("i", { className: "seek-buffered" }), /* @__PURE__ */ (0, M.jsx)("i", { className: "seek-played" })]
								}), /* @__PURE__ */ (0, M.jsx)("input", {
									className: "seek-slider",
									type: "range",
									min: "0",
									max: vn || 100,
									step: "0.1",
									value: Math.min(He, vn || 100),
									onChange: (e) => kn(Number(e.target.value)),
									"aria-label": "播放进度",
									"aria-valuetext": `${Et(He)}，已缓冲至 ${Et(Wt.bufferedEnd)}`
								})]
							}), /* @__PURE__ */ (0, M.jsxs)("div", {
								className: "player-control-row",
								children: [/* @__PURE__ */ (0, M.jsxs)("div", {
									className: "player-control-group",
									children: [
										/* @__PURE__ */ (0, M.jsx)("button", {
											className: "control-button",
											title: bn ? "字幕菜单打开时已暂停" : ke ? "暂停" : "播放",
											"aria-label": ke ? "暂停" : "播放",
											disabled: bn,
											onClick: On,
											children: ke ? /* @__PURE__ */ (0, M.jsx)(ce, { size: 21 }) : /* @__PURE__ */ (0, M.jsx)(ue, {
												size: 21,
												fill: "currentColor"
											})
										}),
										u && /* @__PURE__ */ (0, M.jsx)("button", {
											className: "control-button",
											title: "下一集",
											"aria-label": "下一集",
											onClick: u,
											children: /* @__PURE__ */ (0, M.jsx)(ge, { size: 20 })
										}),
										/* @__PURE__ */ (0, M.jsx)("button", {
											className: "control-button",
											title: je ? "取消静音" : "静音",
											"aria-label": je ? "取消静音" : "静音",
											onClick: nr,
											children: je ? /* @__PURE__ */ (0, M.jsx)(ve, { size: 20 }) : /* @__PURE__ */ (0, M.jsx)(_e, { size: 20 })
										}),
										/* @__PURE__ */ (0, M.jsx)("input", {
											className: "volume-slider",
											type: "range",
											min: "0",
											max: "1",
											step: "0.01",
											value: je ? 0 : Ie,
											onChange: (e) => tr(Number(e.target.value)),
											"aria-label": "音量"
										}),
										/* @__PURE__ */ (0, M.jsxs)("span", {
											className: "time-readout",
											children: [
												Et(He),
												" / ",
												Et(vn)
											]
										}),
										m && /* @__PURE__ */ (0, M.jsx)("button", {
											className: `control-button ${Kt ? "is-active" : ""}`,
											title: Kt ? "隐藏弹幕" : "显示弹幕",
											"aria-label": Kt ? "隐藏弹幕" : "显示弹幕",
											"aria-pressed": Kt,
											onClick: Pn,
											children: /* @__PURE__ */ (0, M.jsx)(O, { size: 20 })
										}),
										m?.onCompose && /* @__PURE__ */ (0, M.jsx)("button", {
											className: "control-button",
											title: "发送弹幕",
											"aria-label": "发送弹幕",
											onClick: m.onCompose,
											children: /* @__PURE__ */ (0, M.jsx)(me, { size: 19 })
										})
									]
								}), /* @__PURE__ */ (0, M.jsxs)("div", {
									className: "player-control-group secondary",
									children: [
										_n.length > 0 && /* @__PURE__ */ (0, M.jsx)("button", {
											className: `control-button ${Ze ? "is-active" : ""}`,
											title: yn ? `字幕：${St(yn)}` : "字幕",
											"aria-label": "字幕",
											"aria-pressed": Ze,
											onClick: Jn,
											children: /* @__PURE__ */ (0, M.jsx)(ie, { size: 20 })
										}),
										/* @__PURE__ */ (0, M.jsx)("button", {
											className: "control-button",
											title: "画中画",
											"aria-label": "画中画",
											onClick: () => void Mn().catch((e) => {
												let t = e instanceof Error ? e.message : String(e);
												De(t), dn.current.onError?.({ message: t });
											}),
											children: /* @__PURE__ */ (0, M.jsx)(le, { size: 20 })
										}),
										/* @__PURE__ */ (0, M.jsx)("button", {
											className: `control-button ${Pt ? "is-active" : ""}`,
											title: "剧场模式",
											"aria-label": "剧场模式",
											"aria-pressed": Pt,
											onClick: Nn,
											children: /* @__PURE__ */ (0, M.jsx)(de, { size: 20 })
										}),
										/* @__PURE__ */ (0, M.jsx)("button", {
											className: `control-button ${nt ? "is-active" : ""}`,
											title: "设置",
											"aria-label": "设置",
											onClick: () => {
												let e = !nt;
												rt(e), Xn(), Fn(e);
											},
											children: /* @__PURE__ */ (0, M.jsx)(he, { size: 20 })
										}),
										/* @__PURE__ */ (0, M.jsx)("button", {
											className: "control-button",
											title: Mt ? "退出全屏" : "全屏",
											"aria-label": Mt ? "退出全屏" : "全屏",
											onClick: jn,
											children: Mt ? /* @__PURE__ */ (0, M.jsx)(k, { size: 20 }) : /* @__PURE__ */ (0, M.jsx)(se, { size: 20 })
										})
									]
								})]
							})]
						}),
						nt && /* @__PURE__ */ (0, M.jsx)(bt, {
							rate: Be,
							setRate: (e) => {
								Ve(e), b.current?.setPlaybackRate(e);
							},
							audioTracks: hn,
							subtitleTracks: _n,
							audioTrackId: Ke,
							subtitleTrackId: Je,
							selectTrack: An,
							qualities: d,
							selectedQuality: f,
							onQualityChange: p
						}),
						It.open && /* @__PURE__ */ (0, M.jsx)(ht, {
							x: It.x,
							y: It.y,
							onClose: Gn,
							onStats: Kn,
							onAbout: qn
						})
					]
				}), !a && /* @__PURE__ */ (0, M.jsxs)("div", {
					className: "player-status-line",
					children: [
						/* @__PURE__ */ (0, M.jsx)("span", { children: Wt.stalled ? "缓冲中…" : Ht }),
						/* @__PURE__ */ (0, M.jsxs)("span", { children: [
							"已缓冲 ",
							Wt.bufferedAhead.toFixed(1),
							" 秒"
						] }),
						/* @__PURE__ */ (0, M.jsxs)("span", { children: ["当前时间 ", Et(He)] })
					]
				})]
			})
		})]
	});
});
function ht({ x: e, y: t, onClose: n, onStats: r, onAbout: i }) {
	let a = (0, C.useRef)(null);
	(0, C.useEffect)(() => {
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
	return /* @__PURE__ */ (0, M.jsxs)("div", {
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
			/* @__PURE__ */ (0, M.jsxs)("button", {
				role: "menuitem",
				onClick: r,
				children: [/* @__PURE__ */ (0, M.jsx)(ae, { size: 15 }), " 播放器统计"]
			}),
			/* @__PURE__ */ (0, M.jsx)("span", { className: "menu-separator" }),
			/* @__PURE__ */ (0, M.jsxs)("button", {
				role: "menuitem",
				onClick: i,
				children: [/* @__PURE__ */ (0, M.jsx)(oe, { size: 15 }), " 关于 MX Player Pro"]
			})
		]
	});
}
function gt({ page: e, tracks: t, selectedId: n, enabled: r, style: i, onSelect: a, onFontChange: o, onPage: s, onEdit: c }) {
	let l = e === "font", u = t.length + 1, d = u * dt + (u - 1) * ft;
	return /* @__PURE__ */ (0, M.jsxs)("div", {
		className: "subtitle-menu",
		role: "menu",
		"data-player-control": !0,
		onClick: (e) => e.stopPropagation(),
		children: [/* @__PURE__ */ (0, M.jsxs)("div", {
			className: "subtitle-menu-head",
			children: [
				/* @__PURE__ */ (0, M.jsx)("button", {
					className: `subtitle-tab ${l ? "" : "is-active"}`,
					onClick: () => s("track"),
					children: "字幕"
				}),
				/* @__PURE__ */ (0, M.jsx)("button", {
					className: `subtitle-tab ${l ? "is-active" : ""}`,
					onClick: () => s("font"),
					children: "选择字体"
				}),
				/* @__PURE__ */ (0, M.jsx)("button", {
					className: "control-button subtitle-head-icon",
					title: "编辑",
					"aria-label": "编辑字幕样式",
					onClick: c,
					children: /* @__PURE__ */ (0, M.jsx)(he, { size: 20 })
				})
			]
		}), /* @__PURE__ */ (0, M.jsx)("div", {
			className: "subtitle-menu-body",
			style: { "--menu-body-height": `${d}px` },
			children: l ? De.map((e) => /* @__PURE__ */ (0, M.jsxs)("button", {
				className: `subtitle-font-item ${i.font === e.id ? "is-selected" : ""}`,
				onClick: () => o(e.id),
				children: [/* @__PURE__ */ (0, M.jsxs)("span", {
					className: "subtitle-font-name",
					children: [e.label, i.font === e.id ? /* @__PURE__ */ (0, M.jsx)(D, { size: 13 }) : null]
				}), /* @__PURE__ */ (0, M.jsx)("span", {
					className: "subtitle-font-sample",
					style: { fontFamily: e.stack },
					children: ut
				})]
			}, e.id)) : /* @__PURE__ */ (0, M.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, M.jsx)("button", {
				className: !r || n === null ? "is-selected" : "",
				onClick: () => a(null),
				children: "关闭"
			}), t.map((e) => /* @__PURE__ */ (0, M.jsx)("button", {
				className: r && n === e.id ? "is-selected" : "",
				onClick: () => a(e.id),
				children: St(e)
			}, e.id))] })
		})]
	});
}
function _t({ style: e, onReset: t, onDone: n }) {
	return /* @__PURE__ */ (0, M.jsxs)("div", {
		className: "subtitle-edit-bar",
		"data-player-control": !0,
		onClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, M.jsx)("span", {
				className: "subtitle-edit-hint",
				children: "拖动字幕调整位置，拖动上下边框调整大小"
			}),
			/* @__PURE__ */ (0, M.jsxs)("em", { children: [
				Math.round(e.scale * 100),
				"% · ",
				e.offset > 0 ? `+${e.offset}` : e.offset
			] }),
			/* @__PURE__ */ (0, M.jsxs)("button", {
				onClick: t,
				children: [/* @__PURE__ */ (0, M.jsx)(pe, { size: 13 }), " 恢复默认"]
			}),
			/* @__PURE__ */ (0, M.jsxs)("button", {
				onClick: n,
				children: [/* @__PURE__ */ (0, M.jsx)(D, { size: 14 }), " 完成"]
			})
		]
	});
}
function vt({ rows: e, onClose: t }) {
	return /* @__PURE__ */ (0, M.jsxs)("section", {
		className: "player-modal player-stats",
		"data-player-control": !0,
		children: [/* @__PURE__ */ (0, M.jsxs)("header", { children: [/* @__PURE__ */ (0, M.jsx)("strong", { children: "播放器统计" }), /* @__PURE__ */ (0, M.jsx)("button", {
			className: "modal-close",
			title: "关闭",
			"aria-label": "关闭",
			onClick: t,
			children: /* @__PURE__ */ (0, M.jsx)(ye, { size: 17 })
		})] }), /* @__PURE__ */ (0, M.jsx)("dl", { children: e.map(([e, t]) => /* @__PURE__ */ (0, M.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, M.jsx)("dt", { children: e }), /* @__PURE__ */ (0, M.jsx)("dd", { children: t })] }, e)) })]
	});
}
function yt({ onClose: e }) {
	return /* @__PURE__ */ (0, M.jsxs)("section", {
		className: "player-modal player-about",
		"data-player-control": !0,
		children: [
			/* @__PURE__ */ (0, M.jsx)("button", {
				className: "modal-close",
				title: "关闭",
				"aria-label": "关闭",
				onClick: e,
				children: /* @__PURE__ */ (0, M.jsx)(ye, { size: 17 })
			}),
			/* @__PURE__ */ (0, M.jsx)("strong", { children: "MX Player" }),
			/* @__PURE__ */ (0, M.jsxs)("span", { children: ["v", ct] }),
			/* @__PURE__ */ (0, M.jsx)("p", { children: "纯客户端 Matroska 播放器。文件和链接只在本机读取，视频帧由 WebCodecs 输出。" })
		]
	});
}
function bt({ rate: e, setRate: t, audioTracks: n, subtitleTracks: r, audioTrackId: i, subtitleTrackId: a, selectTrack: o, qualities: s, selectedQuality: c, onQualityChange: l }) {
	return /* @__PURE__ */ (0, M.jsxs)("div", {
		className: "settings-panel",
		"data-player-control": !0,
		children: [
			/* @__PURE__ */ (0, M.jsxs)("label", { children: [/* @__PURE__ */ (0, M.jsx)("span", { children: "播放速度" }), /* @__PURE__ */ (0, M.jsx)("select", {
				value: e,
				onChange: (e) => t(Number(e.target.value)),
				children: [
					.5,
					.75,
					1,
					1.25,
					1.5,
					2
				].map((e) => /* @__PURE__ */ (0, M.jsxs)("option", {
					value: e,
					children: [e, "×"]
				}, e))
			})] }),
			s.length > 0 && /* @__PURE__ */ (0, M.jsxs)("label", { children: [/* @__PURE__ */ (0, M.jsx)("span", { children: "清晰度" }), /* @__PURE__ */ (0, M.jsxs)("select", {
				value: c,
				onChange: (e) => l?.(e.target.value),
				children: [/* @__PURE__ */ (0, M.jsx)("option", {
					value: "auto",
					children: "自动"
				}), s.map((e) => /* @__PURE__ */ (0, M.jsx)("option", {
					value: e.id,
					children: e.label
				}, e.id))]
			})] }),
			/* @__PURE__ */ (0, M.jsxs)("label", { children: [/* @__PURE__ */ (0, M.jsx)("span", { children: "音频轨" }), /* @__PURE__ */ (0, M.jsxs)("select", {
				value: i ?? "",
				onChange: (e) => o("audio", e.target.value ? Number(e.target.value) : null),
				children: [/* @__PURE__ */ (0, M.jsx)("option", {
					value: "",
					children: "自动"
				}), n.map((e) => /* @__PURE__ */ (0, M.jsx)("option", {
					value: e.id,
					children: we(e)
				}, e.id))]
			})] }),
			r.length > 0 && /* @__PURE__ */ (0, M.jsxs)("label", { children: [/* @__PURE__ */ (0, M.jsx)("span", { children: "字幕轨" }), /* @__PURE__ */ (0, M.jsxs)("select", {
				value: a ?? "",
				onChange: (e) => o("subtitle", e.target.value ? Number(e.target.value) : null),
				children: [/* @__PURE__ */ (0, M.jsx)("option", {
					value: "",
					children: "关闭"
				}), r.map((e) => /* @__PURE__ */ (0, M.jsx)("option", {
					value: e.id,
					children: St(e)
				}, e.id))]
			})] })
		]
	});
}
function xt(e) {
	return e instanceof Element && !!e.closest("[data-player-control]");
}
function St(e) {
	return [e.language, e.name].filter(Boolean).join(" · ") || `字幕轨 ${e.id}`;
}
function Ct(e) {
	try {
		return new URL(e).hostname || "远程 URL";
	} catch {
		return "远程 URL";
	}
}
function wt(e) {
	return Number.isFinite(e) ? Math.max(0, Math.min(100, e)) : 0;
}
function Tt(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(0)} KB` : `${(e / 1024 / 1024).toFixed(1)} MB`;
}
function Et(e) {
	if (!Number.isFinite(e) || e < 0) return "00:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}`;
}
function Dt(e) {
	return e ? Ie(e) : "unknown-host";
}
function Ot(e) {
	return Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : .85;
}
//#endregion
//#region src/sdk/MXPlayer.ts
var kt = class {
	container;
	root;
	surfaceRef = (0, C.createRef)();
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
		} : void 0, this.label = e.label || At(this.source), this.container.classList.add("mxplayer-container"), this.root = (0, be.createRoot)(t), e.localPlayback && this.enableLocalPlayback(), this.render();
	}
	async load(e) {
		if (this.destroyed) throw Error("MX Player: 播放器已销毁");
		this.source = e, this.label = At(e), this.render();
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
			volume: jt(this.options.volume ?? .85),
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
		this.root.render((0, C.createElement)(mt, {
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
function At(e) {
	if (!e) return "MX Player Pro";
	if (e.kind === "file") return e.file.name;
	try {
		let t = new URL(e.url);
		return decodeURIComponent(t.pathname.split("/").filter(Boolean).pop() || "") || t.hostname || e.url;
	} catch {
		return e.url;
	}
}
function jt(e) {
	return Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : .85;
}
//#endregion
//#region src/vue/MxPlayer.ts
var Mt = e({
	name: "MxPlayer",
	props: {
		url: {
			type: String,
			default: void 0
		},
		file: {
			type: Object,
			default: void 0
		},
		autoplay: {
			type: Boolean,
			default: !1
		},
		muted: {
			type: Boolean,
			default: !1
		},
		volume: {
			type: Number,
			default: .85
		},
		localPlayback: {
			type: Boolean,
			default: !1
		},
		workerUrl: {
			type: String,
			default: void 0
		},
		wasmBaseUrl: {
			type: String,
			default: void 0
		},
		fluid: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"ready",
		"play",
		"pause",
		"timeupdate",
		"ended",
		"error"
	],
	setup(e, { emit: o, expose: s }) {
		let c = i(null), l = i(null);
		return r(() => {
			if (!c.value) return;
			let t = new kt({
				playerElm: c.value,
				url: e.url,
				file: e.file,
				autoplay: e.autoplay,
				muted: e.muted,
				volume: e.volume,
				localPlayback: e.localPlayback,
				workerUrl: e.workerUrl,
				wasmBaseUrl: e.wasmBaseUrl
			});
			t.on("ready", (e) => o("ready", e)), t.on("play", () => o("play")), t.on("pause", () => o("pause")), t.on("timeupdate", (e) => o("timeupdate", e)), t.on("ended", () => o("ended")), t.on("error", (e) => o("error", e)), l.value = t;
		}), a(() => e.url, (e) => {
			e && l.value && l.value.load({
				kind: "url",
				url: e
			});
		}), a(() => e.file, (e) => {
			e && l.value && l.value.load({
				kind: "file",
				file: e
			});
		}), a(() => e.volume, (e) => l.value?.setVolume(e)), a(() => e.muted, (e) => l.value?.setMuted(e)), n(() => {
			l.value?.destroy(), l.value = null;
		}), s({
			play: () => l.value?.play(),
			pause: () => l.value?.pause(),
			toggle: () => l.value?.toggle(),
			seek: (e) => l.value?.seek(e),
			setVolume: (e) => l.value?.setVolume(e),
			setMuted: (e) => l.value?.setMuted(e),
			setPlaybackRate: (e) => l.value?.setPlaybackRate(e),
			requestFullscreen: () => l.value?.requestFullscreen(),
			requestPictureInPicture: () => l.value?.requestPictureInPicture(),
			getState: () => l.value?.getState(),
			getTracks: () => l.value?.tracks ?? [],
			get player() {
				return l.value;
			}
		}), () => t("div", {
			ref: c,
			class: "mxplayer-container",
			style: e.fluid ? {
				width: "100%",
				aspectRatio: "16 / 9",
				background: "#000"
			} : { background: "#000" }
		});
	}
});
//#endregion
export { Mt as MxPlayer, Mt as default };

//# sourceMappingURL=mx-player-vue.js.map