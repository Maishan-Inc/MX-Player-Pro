import { Fragment as e, createContext as t, createElement as n, forwardRef as r, useContext as i, useEffect as a, useImperativeHandle as o, useMemo as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region node_modules/.pnpm/lucide-react@1.28.0_react@19.2.8/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var f = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), p = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), m = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), h = (e) => {
	let t = m(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, g = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, ee = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, te = t({}), ne = () => i(te), re = r(({ color: e, size: t, strokeWidth: r, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: p = !1, color: m = "currentColor", className: h = "" } = ne() ?? {}, te = i ?? p ? Number(r ?? d) * 24 / Number(t ?? u) : r ?? d;
	return n("svg", {
		ref: l,
		...g,
		width: t ?? u ?? g.width,
		height: t ?? u ?? g.height,
		stroke: e ?? m,
		strokeWidth: te,
		className: f("lucide", h, a),
		...!o && !ee(c) && { "aria-hidden": "true" },
		...c
	}, [...s.map(([e, t]) => n(e, t)), ...Array.isArray(o) ? o : [o]]);
}), _ = (e, t) => {
	let i = r(({ className: r, ...i }, a) => n(re, {
		ref: a,
		iconNode: t,
		className: f(`lucide-${p(h(e))}`, `lucide-${e}`, r),
		...i
	}));
	return i.displayName = h(e), i;
}, ie = _("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), ae = _("captions", [["rect", {
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
}]]), v = _("chart-column", [
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
]), oe = _("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), y = _("info", [
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
]), se = _("maximize-2", [
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
]), ce = _("message-circle", [["path", {
	d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	key: "1sd12s"
}]]), le = _("minimize-2", [
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
]), ue = _("pause", [["rect", {
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
}]]), de = _("picture-in-picture-2", [["path", {
	d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4",
	key: "daa4of"
}], ["rect", {
	width: "10",
	height: "7",
	x: "12",
	y: "13",
	rx: "2",
	key: "1nb8gs"
}]]), fe = _("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]), pe = _("rectangle-horizontal", [["rect", {
	width: "20",
	height: "12",
	x: "2",
	y: "6",
	rx: "2",
	key: "9lu3g6"
}]]), me = _("refresh-cw", [
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
]), he = _("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), ge = _("send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]), _e = _("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), ve = _("skip-forward", [["path", {
	d: "M21 4v16",
	key: "7j8fe9"
}], ["path", {
	d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
	key: "zs4d6"
}]]), ye = _("volume-2", [
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
]), be = _("volume-x", [
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
]), b = _("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), x = /^﻿/;
function xe(e) {
	return e.replace(/\{[^}]*\\p[1-9][^}]*\}[^{]*/g, "").replace(/\{[^}]*\}/g, "").replace(/\\N/gi, "\n").replace(/\\h/gi, " ").replace(/\\\{/g, "{").replace(/\\\}/g, "}").split("\n").map((e) => e.trim()).join("\n").trim();
}
function Se(e) {
	let t = e.replace(x, "").trim();
	if (!t) return "";
	let n = t.match(/^Dialogue:\s*(.*)$/is), r = (n ? n[1] : t).split(","), i = n ? 9 : 8;
	return xe(r.length > i ? r.slice(i).join(",") : t);
}
function Ce(e, t) {
	return e.filter((e) => t >= e.start && t < e.end);
}
//#endregion
//#region src/lib/codec.ts
var S = {
	A_AAC: "mp4a.40.2",
	A_FLAC: "flac",
	A_OPUS: "opus",
	A_VORBIS: "vorbis",
	"A_MPEG/L3": "mp3",
	A_AC3: "ac-3",
	"A_AC-3": "ac-3",
	A_EAC3: "ec-3",
	"A_E-AC-3": "ec-3"
}, C = /* @__PURE__ */ new Set([
	"mp3",
	"ac-3",
	"ec-3"
]);
function w(e) {
	let t = e.codecId.toUpperCase();
	return t === "V_MPEG4/ISO/AVC" ? D(e.codecPrivate) || "avc1.640028" : t === "V_MPEGH/ISO/HEVC" ? O(e.codecPrivate) || "hvc1.1.6.L150.B0" : S[t] ?? null;
}
function T(e) {
	let t = e.codec ?? w(e);
	if (!(t && C.has(t))) return t === "flac" ? E(e.codecPrivate) : e.codecPrivate;
}
function E(e) {
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
function D(e) {
	if (!e || e.byteLength < 4) return null;
	let t = new Uint8Array(e);
	return t[0] !== 1 || t.length < 4 ? null : `avc1.${[
		t[1],
		t[2],
		t[3]
	].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
function O(e) {
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
		we(a).toString(16),
		`${r ? "H" : "L"}${t[12]}`
	], s = Array.from(t.subarray(6, 12));
	for (; s.length && s[s.length - 1] === 0;) s.pop();
	return o.push(...s.map((e) => e.toString(16).toUpperCase().padStart(2, "0"))), `hvc1.${o.join(".")}`;
}
function we(e) {
	let t = 0;
	for (let n = 0; n < 32; n += 1) t = t << 1 | e >>> n & 1;
	return t >>> 0;
}
var Te = {
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
	return Te[e.codecId.toUpperCase()] || (e.codec || e.codecId).replace(/^[VAS]_/, "").replace(/\/ISO\//g, "/").replace(/_/g, " ");
}
function Ee(e) {
	let t = e.language && e.language !== "und" ? ` · ${e.language}` : "", n = e.name ? ` · ${e.name}` : "";
	return e.kind === "video" ? `${e.width || "?"}×${e.height || "?"} · ${k(e)}` : e.kind === "audio" ? `${k(e)} · ${e.channels || 2}ch${t}${n}` : `${k(e)}${t}${n}`;
}
var De = /* @__PURE__ */ new Set([
	"S_TEXT/UTF8",
	"S_TEXT/ASCII",
	"S_TEXT/ASS",
	"S_TEXT/SSA",
	"S_ASS",
	"S_SSA"
]);
function Oe(e) {
	return e.kind === "subtitle" && De.has(e.codecId.toUpperCase());
}
function ke(e) {
	let t = e.codecId.toUpperCase();
	return t === "S_TEXT/ASS" || t === "S_TEXT/SSA" || t === "S_ASS" || t === "S_SSA";
}
//#endregion
//#region src/lib/subtitle-style.ts
var A = [
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
], j = {
	font: "system",
	scale: 1,
	offset: 0
}, Ae = {
	min: .6,
	max: 2.4,
	step: .1
}, je = {
	min: -11,
	max: 74,
	step: 1
}, M = "mx-player-pro:subtitle-style:";
function Me(e) {
	return (A.find((t) => t.id === e) || A[0]).stack;
}
function Ne(e) {
	return Number.isFinite(e) ? Math.round(Math.min(Ae.max, Math.max(Ae.min, e)) * 10) / 10 : j.scale;
}
function Pe(e) {
	return Number.isFinite(e) ? Math.round(Math.min(je.max, Math.max(je.min, e))) : j.offset;
}
function N(e) {
	return {
		font: A.some((t) => t.id === e?.font) ? e.font : j.font,
		scale: Ne(Number(e?.scale)),
		offset: Pe(Number(e?.offset))
	};
}
function P(e) {
	if (e.kind === "file") return "local-file";
	try {
		return new URL(e.url).hostname || "unknown-host";
	} catch {
		return "unknown-host";
	}
}
function Fe(e) {
	try {
		let t = localStorage.getItem(M + e);
		return t ? N(JSON.parse(t)) : { ...j };
	} catch {
		return { ...j };
	}
}
function Ie(e, t) {
	try {
		localStorage.setItem(M + e, JSON.stringify(N(t)));
	} catch {}
}
var F = .004, I = class {
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
		let t = e + F;
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
}, L = class {
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
}, Le = class {
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
}, R = class {
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
function Re(e) {
	return e.inFlight || e.eof || e.bufferedBytes >= 100663296 ? !1 : e.bufferedAhead < (e.playing ? 20 : 3);
}
function ze(e) {
	return e.decodeQueueSize < 8 && e.frameQueueLength < 6;
}
function Be(e) {
	return e.decodeQueueSize < 8 && e.audioHorizonAhead < 1;
}
//#endregion
//#region src/lib/packet-buffer.ts
var z = class {
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
}, Ve = 5e3, He = class {
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
}, Ue = class {
	canvas;
	onStatus;
	ctx = null;
	videoDecoder = null;
	audioDecoder = null;
	videoConfig = null;
	audioConfig = null;
	audioContext = null;
	gainNode = null;
	frames = new I();
	packets = new z();
	clock = new R(new L());
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
		}), this.audioClock = null, this.clock = new R(new L()), this.frames.clearFloor(), this.awaitingKeyframe = !0, this.endOfStream = !1, this.flushed = !1, this.stalled = !1, this.seekTarget = 0, this.audioPrimed = !1, this.packets.setActive("video", !!(e?.codec && e.width && e.height)), this.packets.setActive("audio", !!t?.codec);
		let r = !1, i = !1, a, o;
		if (e?.codec && e.width && e.height) {
			let t = {
				codec: e.codec,
				codedWidth: e.width,
				codedHeight: e.height,
				description: T(e)
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
				a = `DECODER_ERROR_VIDEO:${B(e)}`;
			}
		}
		if (t?.codec && n.AudioDecoder && n.EncodedAudioChunk) {
			let e = {
				codec: t.codec,
				sampleRate: t.sampleRate || 48e3,
				numberOfChannels: t.channels || 2,
				description: T(t)
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
				o = `DECODER_ERROR_AUDIO:${B(e)}`;
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
				description: T(e)
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
				r = `DECODER_ERROR_AUDIO:${B(e)}`;
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
		return !this.packets.isActive("video") && !this.packets.isActive("audio") ? !1 : Re({
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
		for (; this.videoDecoder && e.EncodedVideoChunk && this.packets.pending("video") && ze(this.decodePressure("video"));) {
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
		for (; this.playing && this.audioDecoder && e.EncodedAudioChunk && this.packets.pending("audio") && Be(this.decodePressure("audio"));) {
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
		!this.playing || !this.packets.isActive("audio") || this.packets.endOf("video") !== -Infinity && (this.audioPrimed || performance.now() - this.audioWaitSince < Ve || (this.packets.setActive("audio", !1), this.rebuildClockWithoutAudio(), this.onStatus({
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
			error: `DECODER_ERROR_VIDEO:${B(e)}`
		});
	}
	failAudio(e) {
		this.disposeAudioPipeline(), this.onStatus({
			videoReady: this.videoDecoder !== null,
			audioReady: !1,
			error: `DECODER_ERROR_AUDIO:${B(e)}`
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
		this.audioClock = null, this.clock = new R(new L()), this.clock.reset(e), this.clock.setRate(this.playbackRate), this.playing && !this.stalled && this.clock.start();
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
		this.frames.push(new He(e)), this.previewPending && (this.previewPending = !1, this.renderPreviewFrame());
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
		return e ? (this.audioContext = new e(), this.gainNode = this.audioContext.createGain(), this.gainNode.gain.value = this.volume, this.gainNode.connect(this.audioContext.destination), this.audioClock = new Le(() => this.audioContext?.currentTime ?? 0), this.clock = new R(new L(), this.audioClock), this.clock.reset(this.seekTarget), this.clock.setRate(this.playbackRate), this.playing && this.clock.start(), this.audioScheduleEnd = this.audioContext.currentTime, this.audioContext) : null;
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
function B(e) {
	return e instanceof Error ? e.message : typeof e == "string" ? e : "未知解码错误";
}
//#endregion
//#region src/lib/playback-error.ts
var We = [
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
function Ge(e) {
	for (let [t, n] of We) {
		if (!t.test(e)) continue;
		if (typeof n == "string") return n;
		let r = e.slice(e.indexOf(":") + 1).trim();
		return n(e.includes(":") ? r : "");
	}
	return e;
}
//#endregion
//#region src/worker/demux.worker.ts?worker&inline
var Ke = "const e={A_AAC:`mp4a.40.2`,A_FLAC:`flac`,A_OPUS:`opus`,A_VORBIS:`vorbis`,\"A_MPEG/L3\":`mp3`,A_AC3:`ac-3`,\"A_AC-3\":`ac-3`,A_EAC3:`ec-3`,\"A_E-AC-3\":`ec-3`};function t(t){let i=t.codecId.toUpperCase();return i===`V_MPEG4/ISO/AVC`?n(t.codecPrivate)||`avc1.640028`:i===`V_MPEGH/ISO/HEVC`?r(t.codecPrivate)||`hvc1.1.6.L150.B0`:e[i]??null}function n(e){if(!e||e.byteLength<4)return null;let t=new Uint8Array(e);return t[0]!==1||t.length<4?null:`avc1.${[t[1],t[2],t[3]].map(e=>e.toString(16).padStart(2,`0`)).join(``)}`}function r(e){if(!e||e.byteLength<13)return null;let t=new Uint8Array(e);if(t[0]!==1)return null;let n=(t[1]&192)>>6,r=(t[1]&32)>>5,a=t[1]&31,o=new DataView(t.buffer,t.byteOffset,t.byteLength).getUint32(2),s=[`${[``,`A`,`B`,`C`][n]}${a}`,i(o).toString(16),`${r?`H`:`L`}${t[12]}`],c=Array.from(t.subarray(6,12));for(;c.length&&c[c.length-1]===0;)c.pop();return s.push(...c.map(e=>e.toString(16).toUpperCase().padStart(2,`0`))),`hvc1.${s.join(`.`)}`}function i(e){let t=0;for(let n=0;n<32;n+=1)t=t<<1|e>>>n&1;return t>>>0}const a=new Set([`S_TEXT/UTF8`,`S_TEXT/ASCII`,`S_TEXT/ASS`,`S_TEXT/SSA`,`S_ASS`,`S_SSA`]);function o(e){return e.kind===`subtitle`&&a.has(e.codecId.toUpperCase())}function s(e,t){if(t>=e.length)return null;let n=e[t];if(n===0)return null;let r=128,i=1;for(;i<=8&&!(n&r);)r>>=1,i+=1;if(i>8||t+i>e.length)return null;let a=n&r-1,o=a===r-1;for(let n=1;n<i;n+=1){let r=e[t+n];a=a*256+r,r!==255&&(o=!1)}return o?{length:i,value:a,unknown:!0}:Number.isSafeInteger(a)?{length:i,value:a,unknown:!1}:null}function c(e,t){if(t<0||t>=e.length)return null;let n=e[t];if(n===0)return null;let r=128,i=1;for(;i<=4&&!(n&r);)r>>=1,i+=1;if(i>4||t+i>=e.length)return null;let a=0;for(let n=0;n<i;n+=1)a=a*256+e[t+n];let o=s(e,t+i);if(!o)return null;let c=t+i+o.length;if(o.unknown)return{id:a,data:c,size:-1,end:e.length,unknownSize:!0,truncated:!1};if(!Number.isSafeInteger(c+o.value))return null;let l=c+o.value;return{id:a,data:c,size:o.value,end:l,unknownSize:!1,truncated:l>e.length}}function l(e,t,n,r){let i=t,a=Math.min(n,e.length);for(;i<a;){let t=c(e,i);if(!t||t.truncated||t.end>a||t.end<=i)return{complete:!1,consumed:i};r(t),i=t.end}return{complete:i===a,consumed:i}}function u(e,t,n,r){let i=t,a=Math.min(n,e.length);for(;i<a;){let t=c(e,i);if(!t)return null;if(t.id===r)return t;if(t.truncated||t.unknownSize||t.end<=i)return null;i=t.end}return null}function d(e,t){let n=0;for(let r=t.data;r<Math.min(t.end,e.length);r+=1)n=n*256+e[r];return n}function f(e,t){let n=e[t]<<8|e[t+1];return n&32768?n-65536:n}function p(e,t){return new TextDecoder().decode(e.subarray(t.data,Math.min(t.end,e.length))).replace(/\\0+$/,``)}function m(e,t){if(t.end>e.length)return 0;let n=new DataView(e.buffer,e.byteOffset+t.data,t.size);return t.size===4?n.getFloat32(0):t.size===8?n.getFloat64(0):d(e,t)}function h(e,t){return e.slice(t.data,Math.min(t.end,e.length)).buffer}function g(e,t,n,r){let i=[],a=t;for(let t=0;t<r;t+=1){let t=0;for(;;){if(a>=n)return null;let r=e[a];if(a+=1,t+=r,r!==255)break}i.push(t)}return{sizes:i,offset:a}}function _(e,t,n,r){let i=[],a=t,o=s(e,a);if(!o||a+o.length>n)return null;a+=o.length,i.push(o.value);for(let t=1;t<r;t+=1){let t=s(e,a);if(!t||a+t.length>n)return null;a+=t.length;let r=2**(7*t.length-1)-1,o=i[i.length-1]+(t.value-r);if(o<0)return null;i.push(o)}return{sizes:i,offset:a}}function v(e,t,n){let r=Math.min(t.end,e.length);if(r-t.data<4)return[];let i=s(e,t.data);if(!i||t.data+i.length+3>r)return[];let a=i.value;if(!n.trackIds.has(a))return[];let o=f(e,t.data+i.length),c=e[t.data+i.length+2],l=t.data+i.length+3,u=(c&6)>>1,d=n.kind===`simple`?!!(c&128):!n.groupHasReference,p=Math.round((n.clusterTime+o)*n.timecodeScale/1e3),m=n.defaultDurations?.get(a),h=n.blockDurationTicks===void 0?void 0:Math.round(n.blockDurationTicks*n.timecodeScale/1e3);if(u===0)return[{trackId:a,timestamp:p,duration:h===void 0?m===void 0?0:Math.round(m/1e3):h,key:d,data:e.slice(l,r)}];if(l>=r)return[];let v=e[l]+1;if(v<1)return[];let y=l+1,b;if(u===2){let e=r-y;if(e<=0||e%v!==0)return[];b=Array(v).fill(e/v)}else{let t=u===1?g(e,y,r,v-1):_(e,y,r,v-1);if(!t)return[];y=t.offset;let n=t.sizes.reduce((e,t)=>e+t,0),i=r-y;if(n>i)return[];b=[...t.sizes,i-n]}if(b.some(e=>e<0))return[];let x=h===void 0?m===void 0?0:Math.round(m/1e3):Math.round(h/v),S=[];for(let t=0;t<b.length;t+=1){let n=b[t];if(y+n>r)return[];S.push({trackId:a,timestamp:p+t*x,duration:x,key:d,data:e.slice(y,y+n)}),y+=n}return S}const y=[26,69,223,163];function b(e){return e.length>=y.length&&y.every((t,n)=>e[n]===t)}const x={segment:408125543,info:357149030,timecodeScale:2807729,duration:17545,tracks:374648427,trackEntry:174,trackNumber:215,trackType:131,codecId:134,codecPrivate:25506,language:2274716,name:21358,defaultDuration:2352003,video:224,pixelWidth:176,pixelHeight:186,audio:225,samplingFrequency:181,channels:159,cues:475249515,cuePoint:187,cueTime:179,cueTrackPositions:183,cueTrack:247,cueClusterPosition:241,cueRelativePosition:240,seekHead:290298740,seek:19899,seekId:21419,seekPosition:21420,cluster:524531317,timecode:231,simpleBlock:163,blockGroup:160,block:161,blockDuration:155,referenceBlock:251},S=new Set([x.timecode,22612,167,171,x.simpleBlock,x.blockGroup,175]),C=[1048576,4194304,16777216],w=65536,T=67108864;function E(e,n){let r=0,i=0,a=``,o,s,c,u,f,g,_,v;l(e,n.data,n.end,t=>{t.id===x.trackNumber?r=d(e,t):t.id===x.trackType?i=d(e,t):t.id===x.codecId?a=p(e,t):t.id===x.codecPrivate?o=h(e,t):t.id===x.language?s=p(e,t):t.id===x.name?c=p(e,t):t.id===x.defaultDuration?v=d(e,t):t.id===x.video?l(e,t.data,t.end,t=>{t.id===x.pixelWidth&&(u=d(e,t)),t.id===x.pixelHeight&&(f=d(e,t))}):t.id===x.audio&&l(e,t.data,t.end,t=>{t.id===x.samplingFrequency&&(g=Math.round(m(e,t))),t.id===x.channels&&(_=d(e,t))})});let y=i===1?`video`:i===2?`audio`:i===17?`subtitle`:null;if(!r||!y||!a)return null;let b={id:r,kind:y,codecId:a,codecPrivate:o,language:s,name:c,width:u,height:f,sampleRate:g,channels:_,defaultDurationNs:v};return b.codec=t(b)||void 0,b}var D=class{loader;selected=new Set;metadata=null;cues=[];clusterIndex=[];defaultDurations=new Map;segmentDataStart=0;segmentEnd=1/0;firstClusterOffset=0;cursor=0;atEnd=!1;constructor(e){this.loader=e}get endOfStream(){return this.atEnd}async init(){let e=await this.loader.probe();if(e.cors===`blocked`)throw Error(`CORS_BLOCKED:${e.message||``}`);let t=e.size??this.loader.totalSize??C[C.length-1],n=new Uint8Array,r=null,i=!1;for(let e of C){if(n=await this.loader.read(0,Math.min(e,t)),!b(n))throw Error(`MKV_EBML_HEADER_INVALID`);if(r=u(n,0,n.length,x.segment),!r){if(!c(n,0)||n.length>=t)throw Error(`MKV_SEGMENT_NOT_FOUND`);continue}if(i=u(n,r.data,Math.min(r.end,n.length),x.tracks)?.truncated===!1,i||n.length>=t)break}if(!r)throw Error(`MKV_SEGMENT_NOT_FOUND`);this.segmentDataStart=r.data,this.segmentEnd=r.unknownSize?this.loader.totalSize??t:Math.min(r.data+r.size,this.loader.totalSize??1/0);let a=1e6,s=0,f=[],p=null,h=null;if(l(n,r.data,Math.min(r.end,n.length),e=>{e.id===x.info?l(n,e.data,e.end,e=>{e.id===x.timecodeScale&&(a=d(n,e)),e.id===x.duration&&(s=m(n,e))}):e.id===x.tracks?l(n,e.data,e.end,e=>{if(e.id===x.trackEntry){let t=E(n,e);t&&f.push(t)}}):e.id===x.cues?p=e:e.id===x.seekHead&&(h=e)}),!f.length)throw Error(`MKV_TRACKS_NOT_FOUND`);this.selected.clear();for(let e of[`video`,`audio`]){let t=f.find(t=>t.kind===e);t&&this.selected.add(t.id)}f.filter(o).forEach(e=>this.selected.add(e.id)),this.defaultDurations=new Map(f.filter(e=>e.defaultDurationNs).map(e=>[e.id,e.defaultDurationNs])),this.metadata={tracks:f,duration:s?s*a/1e9:0,timecodeScale:a},p?this.parseCues(n,p,a):h&&await this.loadCuesViaSeekHead(n,h,a);let g=await this.locateFirstCluster(n,r);if(g<0)throw Error(`MKV_NO_CLUSTER`);return this.firstClusterOffset=g,this.cursor=g,this.atEnd=!1,this.metadata}async locateFirstCluster(e,t){let n=e,r=0,i=t.data,a=0;for(;i<this.segmentEnd&&a<4096;){if(a+=1,i<r||i-r+16>n.length){let e=await this.loader.readWindow(i,w);if(n=e.bytes,r=e.base,i-r>=n.length)return-1}let e=c(n,i-r);if(!e)return-1;if(e.id===x.cluster)return i;if(e.unknownSize)return-1;e.id===x.cues&&!this.cues.length&&!e.truncated&&this.parseCues(n,e,this.metadata?.timecodeScale??1e6);let t=r+e.end;if(t<=i)return-1;i=t}return-1}async loadCuesViaSeekHead(e,t,n){let r=-1;if(l(e,t.data,t.end,t=>{if(t.id!==x.seek)return;let n=0,i=-1;l(e,t.data,t.end,t=>{t.id===x.seekId&&(n=d(e,t)),t.id===x.seekPosition&&(i=d(e,t))}),n===x.cues&&i>=0&&(r=i)}),r<0)return;let i=this.segmentDataStart+r;try{let{bytes:e,base:t}=await this.loader.readWindow(i,w),r=c(e,i-t);if(!r||r.id!==x.cues)return;let a=r.end-(i-t),o=r.truncated?await this.loader.readWindow(i,a):{bytes:e,base:t},s=c(o.bytes,i-o.base);s&&s.id===x.cues&&!s.truncated&&this.parseCues(o.bytes,s,n)}catch{}}parseCues(e,t,n){let r=[];l(e,t.data,Math.min(t.end,e.length),t=>{if(t.id!==x.cuePoint)return;let i=0;l(e,t.data,t.end,t=>{if(t.id===x.cueTime&&(i=d(e,t)),t.id===x.cueTrackPositions){let a=0,o=-1;l(e,t.data,t.end,t=>{t.id===x.cueTrack&&(a=d(e,t)),t.id===x.cueClusterPosition&&(o=d(e,t))}),o>=0&&r.push({time:i*n/1e9,offset:this.segmentDataStart+o,track:a})}})}),this.cues=r.sort((e,t)=>e.time-t.time)}resolveSeekOffset(e){let t=this.cueOffsetFor(e);return t>=0?t:this.indexOffsetFor(e)?.offset??this.firstClusterOffset}cueOffsetFor(e){let t=this.metadata?.tracks.find(e=>e.kind===`video`),n=t?this.cues.filter(e=>e.track===t.id):[],r=n.length?n:this.cues,i=-1;for(let t of r)if(t.time<=e)i=t.offset;else break;return i}indexOffsetFor(e){let t=null;for(let n of this.clusterIndex)n.time<=e&&(!t||n.time>=t.time)&&(t=n);return t}async seekOffsetFor(e){if(e<=0)return this.resolveSeekOffset(e);let t=this.cueOffsetFor(e);if(t>=0)return t;let n=this.indexOffsetFor(e);if(n&&e-n.time<=4)return n.offset;let r=n?.offset??this.firstClusterOffset,i=await this.scanForCluster(e,n?.time??0,r);return i>=0?i:r}async scanForCluster(e,t,n){let r=Number.isFinite(this.segmentEnd)?this.segmentEnd:this.loader.totalSize??0;if(!r||r<=n)return-1;let i=n,a=r,o=t<=e?n:-1;for(let t=0;t<12&&i<a;t+=1){let t=Math.floor((i+a)/2),n=await this.clusterAtOrAfter(t,a);if(!n||n.offset>=a){a=t;continue}n.time<=e?(o=n.offset,i=n.offset+1):a=t}return o}async clusterAtOrAfter(e,t){let n=Math.max(e,0);for(let e=0;e<8&&n<t;e+=1){let{bytes:e,base:t}=await this.loader.readWindow(n,262144),r=n-t;if(r>=e.length)return null;for(let n=r;n+4<=e.length;n+=1){if(e[n]!==31||e[n+1]!==67||e[n+2]!==182||e[n+3]!==117)continue;let r=c(e,n);if(!r||r.id!==x.cluster)continue;let i=-1;if(l(e,r.data,Math.min(r.end,e.length),t=>{i<0&&t.id===x.timecode&&(i=d(e,t))}),i<0)continue;let a=t+n,o=i*(this.metadata?.timecodeScale??1e6)/1e9;return this.recordCluster(a,o),{offset:a,time:o}}n=t+Math.max(e.length-3,1)}return null}async packetsFor(e=0){if(!this.metadata)throw Error(`DEMUX_NOT_INITIALIZED`);return this.cursor=await this.seekOffsetFor(e),this.atEnd=!1,this.next()}async next(){if(!this.metadata)throw Error(`DEMUX_NOT_INITIALIZED`);let e=[],t=0,n=1/0,r=-1/0;for(;!this.atEnd&&this.cursor<this.segmentEnd;){let i=await this.readClusterAt(this.cursor);if(i.nextOffset<=this.cursor){this.atEnd=!0;break}if(this.cursor=i.nextOffset,this.cursor>=this.segmentEnd&&(this.atEnd=!0),i.packets.length){t+=1;for(let t of i.packets){e.push(t);let i=t.timestamp/1e6;i<n&&(n=i),i>r&&(r=i)}}if(i.truncated||e.length&&(t>=24||r-n>=2))break}return this.cursor>=this.segmentEnd&&(this.atEnd=!0),e}select(e,t){this.metadata?.tracks.find(n=>n.id===t&&n.kind===e)&&e!==`subtitle`&&(this.metadata?.tracks.filter(t=>t.kind===e).forEach(e=>this.selected.delete(e.id)),this.selected.add(t))}async readClusterAt(e){let{bytes:t,base:n}=await this.loader.readWindow(e,w),r=e-n;if(r>=t.length)return{packets:[],nextOffset:this.segmentEnd,truncated:!0};let i=c(t,r);if(!i)throw Error(`MKV_CLUSTER_HEADER_INVALID`);if(i.id!==x.cluster)return i.unknownSize?{packets:[],nextOffset:this.segmentEnd,truncated:!1}:{packets:[],nextOffset:n+i.end,truncated:!1};if(i.unknownSize)return this.readUnboundedCluster(e);let a=i.data-r+i.size;if(e+a>this.segmentEnd){let n=Math.min(t.length-r,Math.max(0,this.segmentEnd-e));return{packets:this.parseClusterBody(t,r,r+n,e),nextOffset:this.segmentEnd,truncated:!0}}if(a>t.length-r){let i=await this.loader.readWindow(e,a);if(t=i.bytes,n=i.base,r=e-n,a>t.length-r){let n=Math.max(0,t.length-r);return{packets:this.parseClusterBody(t,r,r+n,e),nextOffset:this.segmentEnd,truncated:!0}}}return{packets:this.parseClusterBody(t,r,r+a,e),nextOffset:e+a,truncated:!1}}async readUnboundedCluster(e){let t=w;for(;;){let{bytes:n,base:r}=await this.loader.readWindow(e,t),i=e-r,a=c(n,i);if(!a)throw Error(`MKV_CLUSTER_HEADER_INVALID`);let o=a.data,s=-1,l=!1;for(;o<n.length;){let e=c(n,o);if(!e){l=!0;break}if(!S.has(e.id)){s=o;break}if(e.truncated){l=!0;break}o=e.end}if(s<0&&l&&n.length-i>=t&&t<T){t*=4;continue}let u=s>=0?s:Math.min(o,n.length);if(s<0&&t>=T)throw Error(`MKV_CLUSTER_UNBOUNDED`);return{packets:this.parseClusterBody(n,i,u,e),nextOffset:r+u,truncated:!1}}}parseClusterBody(e,t,n,r){let i=c(e,t);if(!i)return[];let a=0,o=[],s=new Set(this.selected),u=this.metadata?.timecodeScale||1e6;return l(e,i.data,Math.min(n,e.length),t=>{if(t.id===x.timecode){a=d(e,t),this.recordCluster(r,a*u/1e9);return}if(t.id===x.simpleBlock){o.push(...v(e,t,{clusterTime:a,timecodeScale:u,trackIds:s,kind:`simple`,defaultDurations:this.defaultDurations}));return}if(t.id===x.blockGroup){let n=!1,r;l(e,t.data,t.end,t=>{t.id===x.referenceBlock&&(n=!0),t.id===x.blockDuration&&(r=d(e,t))}),l(e,t.data,t.end,t=>{t.id===x.block&&o.push(...v(e,t,{clusterTime:a,timecodeScale:u,trackIds:s,kind:`group`,groupHasReference:n,blockDurationTicks:r,defaultDurations:this.defaultDurations}))})}}),o}recordCluster(e,t){this.clusterIndex.some(t=>t.offset===e)||(this.clusterIndex.push({offset:e,time:t}),this.clusterIndex.sort((e,t)=>e.offset-t.offset))}},O=class{source;chunkSize;chunks=new Map;inflight=new Map;cachedBytes=0;downloadedBytes=0;size=null;contentType=null;rangeSupport=!1;fullBody=null;lastProbe={size:null,contentType:null,acceptsRanges:!1,status:null,cors:`unknown`};constructor(e,t=1048576){this.source=e,this.chunkSize=t}async probe(){if(this.source.kind===`file`)return this.size=this.source.file.size,this.contentType=this.source.file.type||`video/x-matroska`,this.rangeSupport=!0,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:!0,status:200,cors:`ok`},this.lastProbe;let e=null;try{e=await fetch(this.source.url,{method:`HEAD`,redirect:`follow`})}catch{}if(e&&(this.size=this.parseLength(e.headers.get(`content-length`)),this.contentType=e.headers.get(`content-type`),this.rangeSupport=e.headers.get(`accept-ranges`)?.toLowerCase()===`bytes`,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:this.rangeSupport,status:e.status,cors:`ok`,message:e.ok&&this.rangeSupport?void 0:e.ok?`正在验证 GET Range 响应`:`探测请求返回 HTTP ${e.status}`},e.ok&&this.rangeSupport))return this.lastProbe;try{let e=await fetch(this.source.url,{headers:{Range:`bytes=0-0`},redirect:`follow`});return this.updateFromResponse(e),e.body&&await e.body.cancel(),this.lastProbe}catch(t){return this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:!1,status:e?.status||null,cors:`blocked`,message:t instanceof Error?t.message:`跨域或网络请求被阻止`},this.lastProbe}}async read(e,t){if(e<0||t<=0)throw Error(`READ_RANGE_INVALID`);let n=this.size===null?t:Math.min(t,Math.max(0,this.size-e));if(n<=0)return new Uint8Array;if(this.source.kind===`file`)return new Uint8Array(await this.source.file.slice(e,e+n).arrayBuffer());if(this.fullBody)return this.fullBody.slice(e,e+n);let r=Math.floor(e/this.chunkSize),i=Math.floor((e+n-1)/this.chunkSize);await this.ensureChunks(r,i);let a=this.fullBody;return a?a.slice(e,e+n):(this.prefetch(i+1,i+4),this.assemble(e,n))}async readChunk(e){return this.read(e,this.chunkSize)}async readWindow(e,t){if(e<0||t<=0)throw Error(`READ_RANGE_INVALID`);if(this.source.kind===`file`)return{bytes:await this.read(e,t),base:e};let n=Math.floor(e/this.chunkSize)*this.chunkSize,r=e-n+t,i=Math.max(this.chunkSize,r);return{bytes:await this.read(n,i),base:n}}async ensureChunks(e,t){let n=[],r=-1;for(let i=e;i<=t+1;i+=1){let e=i<=t&&!this.chunks.has(i)&&!this.inflight.has(i);e&&r<0&&(r=i),!e&&r>=0&&(n.push(this.startRun(r,i-1)),r=-1);let a=i<=t?this.inflight.get(i):void 0;a&&n.push(a)}n.length&&await Promise.all(n)}startRun(e,t){let n=this.fetchRun(e,t).finally(()=>{for(let r=e;r<=t;r+=1)this.inflight.get(r)===n&&this.inflight.delete(r)});for(let r=e;r<=t;r+=1)this.inflight.set(r,n);return n}prefetch(e,t){if(this.fullBody||this.size===null)return;let n=Math.floor(Math.max(0,this.size-1)/this.chunkSize),r=Math.min(t,n);for(let t=e;t<=r;t+=1){if(this.chunks.has(t)||this.inflight.has(t))continue;let e=t;for(;e+1<=r&&!this.chunks.has(e+1)&&!this.inflight.has(e+1);)e+=1;this.startRun(t,e).catch(()=>void 0),t=e}}async fetchRun(e,t){let n=e*this.chunkSize,r=(t+1)*this.chunkSize-1,i=this.size===null?r:Math.min(r,this.size-1);if(i<n)return;let a=await this.fetchWithRetry({Range:`bytes=${n}-${i}`});if(a.status===416){(this.size===null||this.size>n)&&(this.size=n);return}if(!a.ok)throw Error(`RANGE_HTTP_${a.status}`);let o=new Uint8Array(await a.arrayBuffer());if(this.downloadedBytes+=o.byteLength,a.status===206){if(this.updateFromResponse(a),!o.byteLength){(this.size===null||this.size>n)&&(this.size=n);return}this.storeChunks(n,o);return}if(a.status===200){if(o.byteLength>536870912)throw Error(`RANGE_UNSUPPORTED:服务器忽略 Range 且文件过大`);this.fullBody=o,this.size=o.byteLength,this.contentType=a.headers.get(`content-type`)||this.contentType,this.rangeSupport=!1,this.chunks.clear(),this.cachedBytes=0,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:!1,status:a.status,cors:`ok`,message:`资源未返回 206 Partial Content，将使用完整响应读取`};return}throw Error(`RANGE_HTTP_${a.status}`)}async fetchWithRetry(e){let t=this.source.kind===`url`?this.source.url:``,n=null;for(let r=0;r<2;r+=1)try{let n=await fetch(t,{headers:e,redirect:`follow`});if(n.status>=500&&r===0){await k(200);continue}return n}catch(e){n=e,r===0&&await k(200)}throw n instanceof Error?n:Error(`RANGE_NETWORK_ERROR`)}storeChunks(e,t){for(let n=0;n<t.byteLength;n+=this.chunkSize){let r=(e+n)/this.chunkSize;if(!Number.isInteger(r))continue;let i=t.slice(n,n+this.chunkSize),a=this.chunks.get(r);a&&(this.cachedBytes-=a.byteLength),this.chunks.set(r,i),this.cachedBytes+=i.byteLength}this.evict()}evict(){for(;this.cachedBytes>134217728;){let e=this.chunks.keys().next();if(e.done)break;let t=this.chunks.get(e.value);this.chunks.delete(e.value),this.cachedBytes-=t?.byteLength??0}}assemble(e,t){let n=new Uint8Array(t),r=0;for(;r<t;){let i=e+r,a=Math.floor(i/this.chunkSize),o=this.chunks.get(a);if(!o)break;this.chunks.delete(a),this.chunks.set(a,o);let s=i-a*this.chunkSize;if(s>=o.byteLength)break;let c=Math.min(o.byteLength-s,t-r);n.set(o.subarray(s,s+c),r),r+=c}return r===t?n:n.slice(0,r)}parseLength(e){let t=Number(e);return Number.isFinite(t)&&t>0?t:null}updateFromResponse(e){let t=e.headers.get(`content-range`)?.match(/^bytes\\s+(\\d+)-(\\d+)\\/(\\d+|\\*)$/i),n=t?.[3]&&t[3]!==`*`?Number(t[3]):null;n&&Number.isFinite(n)&&(this.size=n),this.contentType=e.headers.get(`content-type`)||this.contentType,this.rangeSupport=e.status===206,this.lastProbe={size:this.size,contentType:this.contentType,acceptsRanges:this.rangeSupport,status:e.status,cors:`ok`,message:this.rangeSupport?void 0:`资源未返回 206 Partial Content`}}get totalSize(){return this.size}get supportsRange(){return this.rangeSupport}get probeInfo(){return this.lastProbe}get networkBytes(){return this.downloadedBytes}};function k(e){return new Promise(t=>setTimeout(t,e))}let A=null,j=!1,M=0,N=Promise.resolve();function P(e){if(e.type===`packets`){let t=e.packets.map(e=>e.data.buffer);self.postMessage(e,t)}else self.postMessage(e)}self.onmessage=e=>{let t=e.data;t.type===`init`?M=0:`epoch`in t&&t.epoch>M&&(M=t.epoch),N=N.then(()=>F(t)).catch(()=>void 0)};async function F(e){let t=`epoch`in e?e.epoch:0;try{if(e.type===`init`){j=!1;let t=new O(e.source);A=new D(t),P({type:`progress`,phase:`加载 TypeScript 解封装器`,value:.08}),P({type:`progress`,phase:`读取 Matroska 头部`,value:.1}),P({type:`metadata`,metadata:await A.init(),probe:t.probeInfo}),P({type:`progress`,phase:`解析首个 Cluster`,value:.35});let n=await A.packetsFor(0);j=!0,P({type:`packets`,packets:n,epoch:0});return}if(!A||!j){(e.type===`next`||e.type===`seek`||e.type===`select-track`)&&P({type:`packets`,packets:[],epoch:t});return}if(t<M&&(e.type===`next`||e.type===`seek`))return;if(e.type===`seek`)P({type:`progress`,phase:`定位关键帧`,value:.2}),P({type:`packets`,packets:await A.packetsFor(e.time),epoch:t});else if(e.type===`next`){let e=await A.next();e.length?P({type:`packets`,packets:e,epoch:t}):A.endOfStream?P({type:`eof`,epoch:t}):P({type:`packets`,packets:[],epoch:t})}else e.type===`select-track`?(A.select(e.kind,e.trackId),e.kind===`subtitle`?P({type:`packets`,packets:[],epoch:t}):P({type:`packets`,packets:await A.packetsFor(e.time),epoch:t})):e.type===`close`&&(A=null,j=!1,P({type:`eof`,epoch:t}))}catch(e){P({type:`error`,code:e instanceof Error?e.message.split(`:`)[0]:`DEMUX_ERROR`,message:e instanceof Error?e.message:`Matroska 解析失败`})}}\n//# sourceMappingURL=demux.worker-BWgC37uP.js.map", qe = typeof self < "u" && self.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Ke], { type: "text/javascript;charset=utf-8" });
function Je(e) {
	let t;
	try {
		if (t = qe && (self.URL || self.webkitURL).createObjectURL(qe), !t) throw "";
		let n = new Worker(t, {
			type: "module",
			name: e?.name
		});
		return n.addEventListener("error", () => {
			(self.URL || self.webkitURL).revokeObjectURL(t);
		}), n;
	} catch {
		return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(Ke), {
			type: "module",
			name: e?.name
		});
	}
}
//#endregion
//#region src/worker/worker-factory.ts
var Ye = {
	name: "mx-player-demux",
	type: "module"
};
function Xe(e, t, n = Worker) {
	return e ? new n(e, Ye) : new t(Ye);
}
//#endregion
//#region src/worker/create-demux-worker.ts
function Ze(e) {
	try {
		return Xe(e, Je);
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		throw Error(`WORKER_CREATE_FAILED:${t}`);
	}
}
//#endregion
//#region src/components/ProgressPreview.tsx
function Qe({ currentTime: e, duration: t, bufferedEnd: n, source: r, onSeek: i }) {
	let o = c(null), s = c(null), [f, p] = l(""), [m, h] = l(!1), [g, ee] = l(0), [te, ne] = l(80), [re, _] = l(!1), [ie, ae] = l(!1);
	a(() => {
		if (!r) {
			p("");
			return;
		}
		if (r.kind === "url") {
			p(r.url);
			return;
		}
		let e = URL.createObjectURL(r.file);
		return p(e), () => URL.revokeObjectURL(e);
	}, [r]), a(() => {
		_(!1), ae(!1), h(!1), s.current !== null && window.clearTimeout(s.current), s.current = null;
	}, [f]), a(() => () => {
		s.current !== null && window.clearTimeout(s.current);
	}, []);
	let v = Number.isFinite(t) && t > 0 ? t : .01, oe = $e(Math.max(0, e) / v * 100), y = $e(Math.max(0, n) / v * 100);
	function se(e) {
		s.current !== null && window.clearTimeout(s.current), s.current = window.setTimeout(() => {
			s.current = null;
			let t = o.current;
			if (!t || ie || t.readyState < 1) return;
			let n = Math.min(Math.max(0, e), Math.max(0, v - .05));
			try {
				t.currentTime = n, t.pause();
			} catch {
				ae(!0);
			}
		}, 80);
	}
	function ce(e) {
		if (e.pointerType && !["mouse", "pen"].includes(e.pointerType)) return;
		let t = e.currentTarget.getBoundingClientRect();
		if (t.width <= 0) return;
		let n = Math.min(t.width, Math.max(0, e.clientX - t.left)), r = Math.min(80, t.width / 2), i = n / t.width * v;
		ne(Math.min(t.width - r, Math.max(r, n))), ee(i), h(!0), se(i);
	}
	function le(e) {
		i(Number(e.target.value));
	}
	return /* @__PURE__ */ d("div", {
		className: "mx-player-progress",
		"data-player-control": !0,
		onPointerMove: ce,
		onPointerLeave: () => h(!1),
		children: [
			m && /* @__PURE__ */ d("div", {
				className: `mx-player-progress-preview ${re ? "frame-ready" : ""}`,
				style: { left: `${te}px` },
				"aria-hidden": "true",
				children: [
					f && !ie && /* @__PURE__ */ u("video", {
						ref: o,
						className: "mx-player-progress-preview-video",
						src: f,
						muted: !0,
						playsInline: !0,
						preload: "auto",
						onLoadedMetadata: () => se(g),
						onSeeked: () => _(!0),
						onError: () => ae(!0)
					}),
					/* @__PURE__ */ u("span", { className: "mx-player-progress-preview-empty" }),
					/* @__PURE__ */ u("time", { children: et(g) })
				]
			}),
			/* @__PURE__ */ d("div", {
				className: "mx-player-progress-rail",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ u("span", {
					className: "buffered",
					style: { width: `${y}%` }
				}), /* @__PURE__ */ u("span", {
					className: "played",
					style: { width: `${oe}%` }
				})]
			}),
			/* @__PURE__ */ u("input", {
				type: "range",
				min: "0",
				max: v,
				step: "0.05",
				value: Math.min(Math.max(0, e), v),
				"aria-label": "播放进度",
				"aria-valuetext": `${et(e)}，已缓冲至 ${et(n)}`,
				onChange: le
			})
		]
	});
}
function $e(e) {
	return Math.min(100, Math.max(0, Number.isFinite(e) ? e : 0));
}
function et(e) {
	let t = Math.max(0, Math.floor(Number.isFinite(e) ? e : 0)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60).toString().padStart(n ? 2 : 1, "0"), i = (t % 60).toString().padStart(2, "0");
	return n ? `${n}:${r}:${i}` : `${r}:${i}`;
}
//#endregion
//#region src/components/PlayerSurface.tsx
var tt = "1.2.6", nt = 2048, rt = "ABCabc123", it = "字幕示例", at = 34, ot = 4, st = 42, ct = {
	currentTime: 0,
	bufferedStart: 0,
	bufferedEnd: 0,
	bufferedAhead: 0,
	bufferedBytes: 0,
	stalled: !1,
	droppedFrames: 0
}, V = r(function(t, n) {
	let { source: r, label: i = "MX Player Pro", onExit: s, embedded: f = !1, autoplay: p = !1, initialVolume: m = .85, initialMuted: h = !1, workerUrl: g, onNext: ee, qualities: te = [], selectedQuality: ne = "auto", onQualityChange: re, danmaku: _, className: v, style: oe } = t, y = c(null), he = c(null), b = c(null), x = c(null), S = c(0), C = c(!1), w = c(!1), T = c(!1), E = c(null), D = c(null), O = c(null), we = c({
		x: 0,
		y: 0
	}), Te = c(!1), [k, De] = l(null), [A, Ae] = l(null), [je, M] = l(r ? "正在连接媒体…" : "等待媒体地址"), [N, P] = l(""), [F, I] = l(!1), [L, Le] = l(h), [R, Re] = l(St(m)), [ze, Be] = l(1), [z, Ve] = l(0), [He, B] = l(), [We, Ke] = l(), [qe, Je] = l(!0), [Ye, Xe] = l(null), [$e, et] = l(!1), [tt, at] = l([]), [ot, V] = l(!1), [H, Ct] = l(!1), [wt, Tt] = l("track"), [U, Et] = l(!1), [W, G] = l(() => Fe(xt(r))), [Dt, Ot] = l(!0), [kt, At] = l(!1), [jt, Mt] = l(!1), [Nt, Pt] = l({
		open: !1,
		x: 0,
		y: 0
	}), [Ft, It] = l(!1), [Lt, Rt] = l(!1), [zt, Bt] = l("等待 WebCodecs…"), [K, Vt] = l(ct), [Ht, Ut] = l(_?.visible ?? !0), [Wt, Gt] = l(0), q = c(!1), Kt = c(void 0), J = c(void 0), Y = c([]), qt = c(!0), Jt = c(/* @__PURE__ */ new Set()), Yt = c(!1), Xt = c(null), Zt = c(!1), Qt = c(/* @__PURE__ */ new Map()), $t = c(/* @__PURE__ */ new Map()), en = c(""), tn = c(() => void 0), nn = c(() => void 0), rn = c(0), an = c(xt(r)), on = c(!1), sn = c(() => void 0), cn = c(!1), ln = c(!1), un = c(!1), X = c(t), dn = c(null), fn = c(null);
	X.current = t;
	let pn = k?.tracks.filter((e) => e.kind === "video") || [], mn = k?.tracks.filter((e) => e.kind === "audio") || [], hn = k?.tracks.filter((e) => e.kind === "subtitle") || [], gn = hn.filter(Oe), _n = k?.duration || 0, vn = gn.find((e) => e.id === Ye), yn = _t(pn.find((e) => e.id === He) || pn[0], mn.find((e) => e.id === We) || mn[0]), Z = H || U;
	q.current = F, Kt.current = He, J.current = We, Xt.current = Ye, Zt.current = $e, cn.current = H, ln.current = U, rn.current = _n, tn.current = Sn, nn.current = bn, sn.current = $, o(n, () => ({
		play: Tn,
		pause: En,
		toggle: Dn,
		seek: On,
		setVolume: Qn,
		setMuted: (e) => {
			Le(e), x.current?.setVolume(e ? 0 : R);
		},
		setPlaybackRate: (e) => {
			let t = Math.max(.25, Math.min(4, e));
			Be(t), x.current?.setPlaybackRate(t);
		},
		requestFullscreen: An,
		requestPictureInPicture: jn,
		getState: () => ({
			ready: T.current,
			playing: q.current,
			currentTime: x.current?.currentTime ?? z,
			duration: _n,
			volume: R,
			muted: L,
			playbackRate: ze,
			bufferedAhead: K.bufferedAhead,
			stalled: K.stalled,
			error: N || null
		}),
		getTracks: () => k?.tracks ?? []
	})), a(() => {
		let e = he.current;
		if (!e || !r) {
			De(null), Ae(null), M("等待媒体地址"), P(""), I(!1), Ve(0), Vt(ct);
			return;
		}
		De(null), Ae(null), M("正在连接媒体…"), P(""), I(!1), q.current = !1, Ve(0), Vt(ct), at([]), en.current = "";
		let t;
		try {
			t = Ze(g);
		} catch (e) {
			let t = Ge(e instanceof Error ? e.message : String(e));
			P(t), M("Worker 创建失败"), X.current.onError?.({ message: t });
			return;
		}
		let n = new Ue(e, (e) => {
			if (Bt(e.error ? Ge(e.error) : `${e.videoReady ? "视频就绪" : "视频不可用"} · ${e.audioReady ? "音频就绪" : "音频不可用"}`), e.error && !/^DECODER_(?:ERROR|UNSUPPORTED)_AUDIO/i.test(e.error)) {
				let t = Ge(e.error);
				P(t), X.current.onError?.({ message: t });
			}
			if (e.error && /^DECODER_(?:ERROR|UNSUPPORTED)_AUDIO/i.test(e.error) && qt.current) {
				let e = J.current;
				if (e !== void 0 && !Jt.current.has(e)) {
					Jt.current.add(e);
					let t = Y.current.findIndex((t) => t.id === e), r = (t >= 0 ? [...Y.current.slice(t + 1), ...Y.current.slice(0, t)] : Y.current).find((e) => !!e.codec && !Jt.current.has(e.id));
					r && window.setTimeout(() => {
						x.current !== n || !qt.current || J.current !== e || kn("audio", r.id, { automatic: !0 });
					}, 0);
				}
			}
		});
		b.current = t, x.current = n, S.current = 0, C.current = !1, w.current = !1, T.current = !1, Yt.current = !1;
		let i = (e, n) => {
			if (b.current !== t) return;
			C.current = !1, T.current = !1;
			let r = Ge(n ? `${e}:${n}` : e);
			P(r), M("解封装失败"), X.current.onError?.({ message: r });
		};
		t.onmessage = (e) => tn.current(e.data), t.onerror = (e) => {
			i("WORKER_RUNTIME_FAILED", e.message || "Worker 运行时异常");
		}, t.onmessageerror = () => {
			i("WORKER_RUNTIME_FAILED", "Worker 消息无法反序列化");
		}, t.postMessage({
			type: "init",
			source: r
		});
		let a = window.setTimeout(() => {
			!Yt.current && b.current === t && i("DEMUX_INIT_TIMEOUT");
		}, 15e3), o = window.setInterval(() => {
			let e = x.current;
			if (!e) return;
			e.tick();
			let t = e.stats();
			Vt(t);
			let n = rn.current ? Math.min(t.currentTime, rn.current) : t.currentTime;
			Ve(n), X.current.onTimeUpdate?.({
				currentTime: n,
				duration: rn.current
			}), xn(n), nn.current();
		}, 100);
		return () => {
			window.clearInterval(o), window.clearTimeout(a), t.postMessage({ type: "close" }), t.terminate(), n.close(), b.current = null, x.current = null;
		};
	}, [
		r,
		g,
		Wt
	]), a(() => {
		function e() {
			At(document.fullscreenElement === y.current);
		}
		function t(e) {
			let t = e.target, n = t instanceof Element ? t : null, r = !!(t && y.current?.contains(t)), i = !!n?.closest(".subtitle-menu"), a = !!n?.closest("[data-subtitle-toggle]");
			if (ln.current) {
				r || (Pt((e) => e.open ? {
					...e,
					open: !1
				} : e), V(!1));
				return;
			}
			r && cn.current && !i && !a && (un.current = !0, window.setTimeout(() => {
				un.current = !1;
			}, 0), sn.current()), !r && (Pt((e) => e.open ? {
				...e,
				open: !1
			} : e), V(!1), sn.current());
		}
		return document.addEventListener("fullscreenchange", e), document.addEventListener("pointerdown", t), () => {
			document.removeEventListener("fullscreenchange", e), document.removeEventListener("pointerdown", t);
		};
	}, []), a(() => () => {
		E.current !== null && window.clearTimeout(E.current), D.current !== null && window.clearTimeout(D.current), O.current !== null && window.clearTimeout(O.current), fn.current?.getTracks().forEach((e) => e.stop()), fn.current = null, dn.current?.remove(), dn.current = null;
	}, []), a(() => {
		let e = xt(r);
		an.current = e, G(Fe(e));
	}, [r]), a(() => {
		Ie(an.current, W);
	}, [W]);
	function bn() {
		!T.current || C.current || w.current || x.current?.needsPackets(q.current, w.current, C.current) && (C.current = !0, b.current?.postMessage({
			type: "next",
			epoch: S.current
		}));
	}
	function xn(e) {
		let t = Xt.current, n = Zt.current && t !== null ? Qt.current.get(t) : void 0, r = n ? Ce(n, e).map((e) => e.text) : [], i = r.join(" ");
		i !== en.current && (en.current = i, at(r));
	}
	function Sn(e) {
		if (e.type === "progress") {
			M(e.phase);
			return;
		}
		if (e.type === "error") {
			C.current = !1;
			let t = Ge(e.message);
			P(t), M("读取失败"), X.current.onError?.({ message: t });
			return;
		}
		if (e.type === "metadata") {
			Yt.current = !0;
			let t = e.metadata.tracks, n = t.find((e) => e.kind === "video"), r = t.find((e) => e.kind === "audio");
			De({
				tracks: t,
				duration: e.metadata.duration
			}), Ae(e.probe), B(n?.id), Ke(r?.id), Je(!0), Kt.current = n?.id, J.current = r?.id, Y.current = t.filter((e) => e.kind === "audio"), qt.current = !0, Jt.current = /* @__PURE__ */ new Set(), Xe(null), Xt.current = null, et(!1), Zt.current = !1, Qt.current = /* @__PURE__ */ new Map(), $t.current = new Map(t.filter(Oe).map((e) => [e.id, ke(e)])), en.current = "", at([]), M("轨道已识别"), T.current = !0, x.current?.configure(n, r), x.current?.setVolume(L ? 0 : R), X.current.onReady?.({
				tracks: t,
				duration: e.metadata.duration
			}), p && window.setTimeout(() => {
				!q.current && !Z && Dn();
			}, 0);
			return;
		}
		if (e.type === "packets") {
			if (e.epoch < S.current) return;
			C.current = !1, e.packets.forEach((e) => Cn(e)), e.packets.length && bn();
			return;
		}
		if (e.type === "eof") {
			if (e.epoch < S.current) return;
			C.current = !1, w.current = !0, x.current?.markEndOfStream(), M("已到达文件末端"), X.current.onEnded?.();
		}
	}
	function Cn(e) {
		let t = $t.current.get(e.trackId);
		if (t !== void 0) {
			let n = new TextDecoder().decode(e.data), r = t ? Se(n) : xe(n.trim());
			r && wn(e, r);
			return;
		}
		x.current?.enqueue(e, Kt.current, J.current);
	}
	function wn(e, t) {
		let n = e.timestamp / 1e6, r = n + (e.duration > 0 ? e.duration / 1e6 : 3), i = Qt.current.get(e.trackId) || [], a = i.length;
		for (; a > 0 && i[a - 1].start > n;) --a;
		if (!(a > 0 && i[a - 1].start === n && i[a - 1].text === t)) {
			for (let e = a; e < i.length && i[e].start === n; e += 1) if (i[e].text === t) return;
			i.splice(a, 0, {
				start: n,
				end: r,
				text: t
			}), i.length > nt && i.splice(0, i.length - nt), Qt.current.set(e.trackId, i);
		}
	}
	function Tn() {
		if (Z || !T.current || !x.current || q.current) {
			Q(Z);
			return;
		}
		I(!0), q.current = !0, x.current.play(), bn(), X.current.onPlay?.(), Q();
	}
	function En() {
		!x.current || !q.current || (I(!1), q.current = !1, x.current.pause(), X.current.onPause?.(), Q());
	}
	function Dn() {
		if (Z) {
			Q(!0);
			return;
		}
		q.current ? En() : Tn(), Q();
	}
	function On(e) {
		let t = Math.max(0, Math.min(e, _n || e));
		Ve(t), S.current += 1, w.current = !1, C.current = !1, x.current?.seekTo(t), xn(t), b.current?.postMessage({
			type: "seek",
			time: t,
			epoch: S.current
		}), C.current = !0, Q();
	}
	function kn(e, t, n) {
		if (e === "subtitle") {
			Xe(t), Xt.current = t, et(t !== null), Zt.current = t !== null, $(!U), xn(x.current?.currentTime ?? z);
			return;
		}
		let r = n?.automatic ?? t === null;
		qt.current = r, Je(r);
		let i = t ?? Y.current.find((e) => !!e.codec)?.id;
		if (i === void 0) {
			Ke(void 0), J.current = void 0;
			return;
		}
		Ke(i), J.current = i, Jt.current.has(i) && Jt.current.delete(i);
		let a = x.current?.currentTime ?? 0;
		S.current += 1, w.current = !1;
		let o = S.current, s = x.current, c = Y.current.find((e) => e.id === i);
		if (!s || !c) {
			C.current = !1;
			return;
		}
		C.current = !0, s.configureAudio(c).then(() => {
			o === S.current && J.current === i && x.current === s && (s.seekTo(a), b.current?.postMessage({
				type: "select-track",
				kind: e,
				trackId: i,
				time: a,
				epoch: o
			}));
		}).catch(() => {
			C.current = !1;
		});
	}
	function An() {
		let e = y.current;
		e && (document.fullscreenElement ? document.exitFullscreen() : e.requestFullscreen());
	}
	async function jn() {
		let e = he.current, t = document;
		if (t.pictureInPictureElement) {
			await t.exitPictureInPicture?.();
			return;
		}
		if (!e?.captureStream) throw Error("当前浏览器不支持 Canvas 画中画。");
		let n = dn.current;
		n || (n = document.createElement("video"), n.muted = !0, n.playsInline = !0, n.style.display = "none", document.body.appendChild(n), dn.current = n), fn.current?.getTracks().forEach((e) => e.stop());
		let r = e.captureStream(30);
		if (fn.current = r, n.srcObject = r, await n.play(), !n.requestPictureInPicture) throw Error("当前浏览器不支持画中画。");
		await n.requestPictureInPicture();
	}
	function Mn() {
		let e = !jt;
		Mt(e), X.current.onTheaterChange?.(e);
	}
	function Nn() {
		let e = !Ht;
		Ut(e), _?.onToggle?.(e);
	}
	function Q(e = !1) {
		Ot(!0), D.current !== null && window.clearTimeout(D.current), !(e || Pn()) && (D.current = window.setTimeout(() => Ot(!1), 5e3));
	}
	function Pn() {
		return Nt.open || Ft || Lt || ot || H || U;
	}
	function Fn(e) {
		if (!ht(e.target)) {
			if (un.current) {
				un.current = !1;
				return;
			}
			Un(), E.current !== null && window.clearTimeout(E.current), E.current = window.setTimeout(() => {
				E.current = null, Dn();
			}, 220);
		}
	}
	function In(e) {
		ht(e.target) || (E.current !== null && (window.clearTimeout(E.current), E.current = null), An());
	}
	function Ln(e) {
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
				Un(), It(!1), Rt(!1), V(!1), $();
				return;
			}
			Q(), n === " " ? Dn() : n === "arrowleft" ? On(z - 5) : n === "arrowright" ? On(z + 5) : n === "j" ? On(z - 10) : n === "l" ? On(z + 10) : n === "arrowup" ? Qn(Math.min(1, R + .05)) : n === "arrowdown" ? Qn(Math.max(0, R - .05)) : n === "m" ? $n() : n === "f" && An();
		}
	}
	function Rn(e) {
		if (ht(e.target)) return;
		let t = e.touches[0];
		t && (we.current = {
			x: t.clientX,
			y: t.clientY
		}, Te.current = !1, O.current !== null && window.clearTimeout(O.current), O.current = window.setTimeout(() => {
			Te.current = !0, Hn(we.current.x, we.current.y);
		}, 500));
	}
	function zn(e) {
		let t = e.touches[0];
		!t || O.current === null || (Math.abs(t.clientX - we.current.x) > 10 || Math.abs(t.clientY - we.current.y) > 10) && (window.clearTimeout(O.current), O.current = null);
	}
	function Bn(e) {
		if (!ht(e.target)) {
			if (e.preventDefault(), O.current !== null && (window.clearTimeout(O.current), O.current = null), Te.current) {
				Te.current = !1;
				return;
			}
			Dt ? Ot(!1) : Q();
		}
	}
	function Vn(e) {
		e.preventDefault(), Hn(e.clientX, e.clientY);
	}
	function Hn(e, t) {
		let n = y.current;
		if (!n) return;
		let r = n.getBoundingClientRect(), i = Math.max(8, Math.min(e - r.left, r.width - 234 - 8)), a = Math.max(8, Math.min(t - r.top, r.height - 84 - 8));
		Pt({
			open: !0,
			x: i,
			y: a
		}), V(!1), $(), Q(!0), n.focus();
	}
	function Un() {
		Pt((e) => e.open ? {
			...e,
			open: !1
		} : e);
	}
	function Wn() {
		Un(), It(!0), V(!1), $(), Q(!0);
	}
	function Gn() {
		Un(), Rt(!0), V(!1), $(), Q(!0);
	}
	function Kn() {
		if (H || U) {
			$(!0);
			return;
		}
		qn(), Ct(!0), Tt("track"), V(!1), Q(!0);
	}
	function qn() {
		Z || (on.current = !F), F && (I(!1), q.current = !1, x.current?.pause(), X.current.onPause?.());
	}
	function $(e = !1) {
		!H && !U || (Ct(!1), e && Et(!1), (e || !U) && !on.current && (I(!0), q.current = !0, x.current?.play(), bn(), X.current.onPlay?.()), Q());
	}
	function Jn() {
		qn(), V(!1), G((e) => e.offset < st ? {
			...e,
			offset: st
		} : e), Et(!0), Q(!0);
	}
	function Yn() {
		Et(!1), Q();
	}
	function Xn(e) {
		if (!y.current) return;
		e.stopPropagation();
		let t = y.current, n = e.clientY, r = W.offset, i = t.getBoundingClientRect().height;
		function a(e) {
			let t = -(e.clientY - n) / i * 100;
			G((e) => ({
				...e,
				offset: Pe(r + t)
			}));
		}
		function o() {
			document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", o);
		}
		document.addEventListener("pointermove", a), document.addEventListener("pointerup", o);
	}
	function Zn(e) {
		let t = e.currentTarget.parentElement?.getBoundingClientRect();
		if (!t) return;
		e.stopPropagation(), e.preventDefault();
		let n = t.top + t.height / 2, r = Math.abs(e.clientY - n), i = W.scale;
		if (r < 1) return;
		function a(e) {
			let t = Math.abs(e.clientY - n);
			G((e) => ({
				...e,
				scale: Ne(t / r * i)
			}));
		}
		function o() {
			document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", o);
		}
		document.addEventListener("pointermove", a), document.addEventListener("pointerup", o);
	}
	function Qn(e) {
		Re(e), Le(e <= 0), x.current?.setVolume(e);
	}
	function $n() {
		let e = !L;
		Le(e), x.current?.setVolume(e ? 0 : R);
	}
	let er = [
		["源", r?.kind === "file" ? "本地文件" : r ? vt(i) : "未加载"],
		["状态", K.stalled ? "缓冲中" : je],
		["HTTP", String(A?.status || "--")],
		["CORS", A?.cors === "ok" ? "允许" : A?.cors === "blocked" ? "阻断" : "未知"],
		["Range", A?.acceptsRanges ? "206 Partial Content" : "完整响应 / 不支持 206"],
		["视频", pn[0] ? Ee(pn[0]) : "未识别"],
		["音频", mn[0] ? Ee(mn[0]) : "未识别"],
		["字幕", `${hn.length} 条（${gn.length} 条可用）`],
		["缓冲", `${K.bufferedAhead.toFixed(1)} 秒 · ${yt(K.bufferedBytes)}`],
		["丢帧", String(K.droppedFrames)],
		["解码器", zt]
	];
	return /* @__PURE__ */ d("div", {
		className: `${f ? "mx-player-embed" : "player-page"} ${jt ? "is-theater" : ""} ${v || ""}`.trim(),
		style: oe,
		children: [!f && /* @__PURE__ */ d("header", {
			className: "player-topbar",
			children: [
				/* @__PURE__ */ d("button", {
					className: "back-button",
					onClick: s,
					children: [
						/* @__PURE__ */ u(ie, {
							size: 18,
							"aria-hidden": "true"
						}),
						" ",
						/* @__PURE__ */ u("span", { children: "重新选择" })
					]
				}),
				/* @__PURE__ */ u("div", {
					className: "player-title",
					title: i,
					children: i
				}),
				/* @__PURE__ */ u("div", {
					className: "player-topbar-right",
					children: /* @__PURE__ */ d("span", {
						className: "status-dot",
						children: [
							/* @__PURE__ */ u("i", {}),
							" ",
							je
						]
					})
				})
			]
		}), /* @__PURE__ */ u("main", {
			className: f ? "mx-player-embed-main" : "player-layout",
			children: /* @__PURE__ */ d("section", {
				className: "player-column",
				children: [/* @__PURE__ */ d("div", {
					ref: y,
					className: "player-frame",
					tabIndex: 0,
					onMouseMove: () => Q(),
					onMouseLeave: () => {
						Pn() || Ot(!1);
					},
					onClick: Fn,
					onDoubleClick: In,
					onContextMenu: Vn,
					onKeyDown: Ln,
					onTouchStart: Rn,
					onTouchMove: zn,
					onTouchEnd: Bn,
					"aria-label": "MX Player 视频播放器",
					children: [
						/* @__PURE__ */ u("canvas", {
							ref: he,
							className: "video-canvas",
							"aria-label": "视频画面"
						}),
						!k && !N && /* @__PURE__ */ d("div", {
							className: "player-loading",
							"data-player-control": !0,
							children: [/* @__PURE__ */ u("span", { className: "spinner" }), /* @__PURE__ */ u("strong", { children: je })]
						}),
						k && !N && K.stalled && /* @__PURE__ */ d("div", {
							className: "player-buffering",
							"data-player-control": !0,
							children: [/* @__PURE__ */ u("span", { className: "spinner" }), /* @__PURE__ */ u("strong", { children: "缓冲中…" })]
						}),
						N && /* @__PURE__ */ d("div", {
							className: "player-error",
							"data-player-control": !0,
							children: [
								/* @__PURE__ */ u("strong", { children: "无法播放此媒体" }),
								/* @__PURE__ */ u("span", { children: N }),
								r && /* @__PURE__ */ d("button", {
									className: "secondary-button",
									onClick: () => Gt((e) => e + 1),
									children: [/* @__PURE__ */ u(me, { size: 15 }), " 重新读取"]
								})
							]
						}),
						(tt.length > 0 || U) && /* @__PURE__ */ d("div", {
							className: `subtitle-overlay ${U ? "is-editing" : ""}`,
							style: {
								"--subtitle-font": Me(W.font),
								"--subtitle-scale": W.scale,
								"--subtitle-offset": `${W.offset}%`
							},
							"data-player-control": U ? "" : void 0,
							onPointerDown: U ? Xn : void 0,
							children: [U ? /* @__PURE__ */ u("span", {
								className: "subtitle-sample",
								children: it
							}) : tt.length > 0 ? tt.flatMap((e, t) => e.split("\n").map((e, n) => /* @__PURE__ */ u("span", { children: e }, `${t}-${n}-${e}`))) : /* @__PURE__ */ u("span", {
								className: "subtitle-sample",
								children: rt
							}), U && /* @__PURE__ */ d(e, { children: [/* @__PURE__ */ u("span", {
								className: "subtitle-handle is-top",
								onPointerDown: Zn,
								title: "拖动调整大小"
							}), /* @__PURE__ */ u("span", {
								className: "subtitle-handle is-bottom",
								onPointerDown: Zn,
								title: "拖动调整大小"
							})] })]
						}),
						Ft && /* @__PURE__ */ u(ft, {
							rows: er,
							onClose: () => It(!1)
						}),
						Lt && /* @__PURE__ */ u(pt, { onClose: () => Rt(!1) }),
						H && /* @__PURE__ */ u(ut, {
							page: wt,
							tracks: gn,
							selectedId: Ye,
							enabled: $e,
							style: W,
							onSelect: (e) => kn("subtitle", e),
							onFontChange: (e) => G((t) => ({
								...t,
								font: e
							})),
							onPage: Tt,
							onEdit: Jn
						}),
						U && /* @__PURE__ */ u(dt, {
							style: W,
							onReset: () => G({ ...j }),
							onDone: Yn
						}),
						/* @__PURE__ */ d("div", {
							className: `player-controls ${Dt ? "is-visible" : ""}`,
							"data-player-control": !0,
							onClick: (e) => e.stopPropagation(),
							children: [/* @__PURE__ */ d("div", {
								className: "player-control-row",
								children: [/* @__PURE__ */ d("div", {
									className: "player-control-group",
									children: [
										/* @__PURE__ */ u("button", {
											className: "control-button",
											title: Z ? "字幕菜单打开时已暂停" : F ? "暂停" : "播放",
											"aria-label": F ? "暂停" : "播放",
											disabled: Z,
											onClick: Dn,
											children: F ? /* @__PURE__ */ u(ue, { size: 21 }) : /* @__PURE__ */ u(fe, {
												size: 21,
												fill: "currentColor"
											})
										}),
										ee && /* @__PURE__ */ u("button", {
											className: "control-button",
											title: "下一集",
											"aria-label": "下一集",
											onClick: ee,
											children: /* @__PURE__ */ u(ve, { size: 20 })
										}),
										/* @__PURE__ */ u("button", {
											className: "control-button",
											title: L ? "取消静音" : "静音",
											"aria-label": L ? "取消静音" : "静音",
											onClick: $n,
											children: u(L ? be : ye, { size: 20 })
										}),
										/* @__PURE__ */ u("input", {
											className: "volume-slider",
											type: "range",
											min: "0",
											max: "1",
											step: "0.01",
											value: L ? 0 : R,
											style: { "--volume": `${(L ? 0 : R) * 100}%` },
											onChange: (e) => Qn(Number(e.target.value)),
											"aria-label": "音量"
										}),
										/* @__PURE__ */ d("span", {
											className: "time-readout",
											children: [
												bt(z),
												" / ",
												bt(_n)
											]
										}),
										_ && /* @__PURE__ */ u("button", {
											className: `control-button ${Ht ? "is-active" : ""}`,
											title: Ht ? "隐藏弹幕" : "显示弹幕",
											"aria-label": Ht ? "隐藏弹幕" : "显示弹幕",
											"aria-pressed": Ht,
											onClick: Nn,
											children: /* @__PURE__ */ u(ce, { size: 20 })
										}),
										_?.onCompose && /* @__PURE__ */ u("button", {
											className: "control-button",
											title: "发送弹幕",
											"aria-label": "发送弹幕",
											onClick: _.onCompose,
											children: /* @__PURE__ */ u(ge, { size: 19 })
										})
									]
								}), /* @__PURE__ */ d("div", {
									className: "player-control-group secondary",
									children: [
										gn.length > 0 && /* @__PURE__ */ u("button", {
											"data-subtitle-toggle": !0,
											className: `control-button ${$e ? "is-active" : ""}`,
											title: vn ? `字幕：${gt(vn)}` : "字幕",
											"aria-label": "字幕",
											"aria-pressed": $e,
											onClick: Kn,
											children: /* @__PURE__ */ u(ae, { size: 20 })
										}),
										/* @__PURE__ */ u("button", {
											className: "control-button",
											title: "画中画",
											"aria-label": "画中画",
											onClick: () => void jn().catch((e) => {
												let t = e instanceof Error ? e.message : String(e);
												P(t), X.current.onError?.({ message: t });
											}),
											children: /* @__PURE__ */ u(de, { size: 20 })
										}),
										/* @__PURE__ */ u("button", {
											className: `control-button ${jt ? "is-active" : ""}`,
											title: "剧场模式",
											"aria-label": "剧场模式",
											"aria-pressed": jt,
											onClick: Mn,
											children: /* @__PURE__ */ u(pe, { size: 20 })
										}),
										/* @__PURE__ */ u("button", {
											className: `control-button ${ot ? "is-active" : ""}`,
											title: "设置",
											"aria-label": "设置",
											onClick: () => {
												let e = !ot;
												V(e), $(), Q(e);
											},
											children: /* @__PURE__ */ u(_e, { size: 20 })
										}),
										/* @__PURE__ */ u("button", {
											className: "control-button",
											title: kt ? "退出全屏" : "全屏",
											"aria-label": kt ? "退出全屏" : "全屏",
											onClick: An,
											children: u(kt ? le : se, { size: 20 })
										})
									]
								})]
							}), /* @__PURE__ */ u(Qe, {
								currentTime: z,
								duration: _n,
								bufferedEnd: K.bufferedEnd,
								source: r,
								onSeek: On
							})]
						}),
						ot && /* @__PURE__ */ u(mt, {
							rate: ze,
							setRate: (e) => {
								Be(e), x.current?.setPlaybackRate(e);
							},
							audioTracks: mn,
							subtitleTracks: gn,
							audioTrackId: We,
							audioAuto: qe,
							subtitleTrackId: Ye,
							selectTrack: kn,
							qualities: te,
							selectedQuality: ne,
							onQualityChange: re
						}),
						Nt.open && /* @__PURE__ */ u(lt, {
							x: Nt.x,
							y: Nt.y,
							onClose: Un,
							onStats: Wn,
							onAbout: Gn
						})
					]
				}), !f && /* @__PURE__ */ d("div", {
					className: "player-status-line",
					children: [
						/* @__PURE__ */ u("span", { children: K.stalled ? "缓冲中…" : zt }),
						/* @__PURE__ */ d("span", { children: [
							"已缓冲 ",
							K.bufferedAhead.toFixed(1),
							" 秒"
						] }),
						/* @__PURE__ */ d("span", { children: ["当前时间 ", bt(z)] }),
						/* @__PURE__ */ u("span", {
							className: "player-codec-summary",
							children: yn
						})
					]
				})]
			})
		})]
	});
});
function lt({ x: e, y: t, onClose: n, onStats: r, onAbout: i }) {
	let o = c(null);
	a(() => {
		o.current?.querySelector("button")?.focus();
	}, []);
	function s(e) {
		let t = Array.from(o.current?.querySelectorAll("button") || []), r = t.indexOf(document.activeElement);
		if (e.key === "Escape") {
			e.preventDefault(), n();
			return;
		}
		!["ArrowDown", "ArrowUp"].includes(e.key) || !t.length || (e.preventDefault(), t[(r + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length]?.focus());
	}
	return /* @__PURE__ */ d("div", {
		ref: o,
		className: "context-menu",
		role: "menu",
		"data-player-control": !0,
		style: {
			left: e,
			top: t
		},
		onKeyDown: s,
		onClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ d("button", {
				role: "menuitem",
				onClick: r,
				children: [/* @__PURE__ */ u(v, { size: 15 }), " 播放器统计"]
			}),
			/* @__PURE__ */ u("span", { className: "menu-separator" }),
			/* @__PURE__ */ d("button", {
				role: "menuitem",
				onClick: i,
				children: [/* @__PURE__ */ u(y, { size: 15 }), " 关于 MX Player Pro"]
			})
		]
	});
}
function ut({ page: t, tracks: n, selectedId: r, enabled: i, style: a, onSelect: o, onFontChange: s, onPage: c, onEdit: l }) {
	let f = t === "font", p = n.length + 1, m = p * at + (p - 1) * ot;
	return /* @__PURE__ */ d("div", {
		className: "subtitle-menu",
		role: "menu",
		"data-player-control": !0,
		onClick: (e) => e.stopPropagation(),
		children: [/* @__PURE__ */ d("div", {
			className: "subtitle-menu-head",
			children: [
				/* @__PURE__ */ u("button", {
					className: `subtitle-tab ${f ? "" : "is-active"}`,
					onClick: () => c("track"),
					children: "字幕"
				}),
				/* @__PURE__ */ u("button", {
					className: `subtitle-tab ${f ? "is-active" : ""}`,
					onClick: () => c("font"),
					children: "选择字体"
				}),
				/* @__PURE__ */ u("button", {
					className: "control-button subtitle-head-icon",
					title: "编辑",
					"aria-label": "编辑字幕样式",
					onClick: l,
					children: /* @__PURE__ */ u(_e, { size: 20 })
				})
			]
		}), /* @__PURE__ */ u("div", {
			className: "subtitle-menu-body",
			style: { "--menu-body-height": `${m}px` },
			children: f ? A.map((e) => /* @__PURE__ */ d("button", {
				className: `subtitle-font-item ${a.font === e.id ? "is-selected" : ""}`,
				onClick: () => s(e.id),
				children: [/* @__PURE__ */ d("span", {
					className: "subtitle-font-name",
					children: [e.label, a.font === e.id ? /* @__PURE__ */ u(oe, { size: 13 }) : null]
				}), /* @__PURE__ */ u("span", {
					className: "subtitle-font-sample",
					style: { fontFamily: e.stack },
					children: rt
				})]
			}, e.id)) : /* @__PURE__ */ d(e, { children: [/* @__PURE__ */ u("button", {
				className: !i || r === null ? "is-selected" : "",
				onClick: () => o(null),
				children: "关闭"
			}), n.map((e) => /* @__PURE__ */ u("button", {
				className: i && r === e.id ? "is-selected" : "",
				onClick: () => o(e.id),
				children: gt(e)
			}, e.id))] })
		})]
	});
}
function dt({ style: e, onReset: t, onDone: n }) {
	return /* @__PURE__ */ d("div", {
		className: "subtitle-edit-bar",
		"data-player-control": !0,
		onClick: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ u("span", {
				className: "subtitle-edit-hint",
				children: "拖动字幕调整位置，拖动上下边框调整大小"
			}),
			/* @__PURE__ */ d("em", { children: [
				Math.round(e.scale * 100),
				"% · ",
				e.offset > 0 ? `+${e.offset}` : e.offset
			] }),
			/* @__PURE__ */ d("button", {
				onClick: t,
				children: [/* @__PURE__ */ u(he, { size: 13 }), " 恢复默认"]
			}),
			/* @__PURE__ */ d("button", {
				onClick: n,
				children: [/* @__PURE__ */ u(oe, { size: 14 }), " 完成"]
			})
		]
	});
}
function ft({ rows: t, onClose: n }) {
	return /* @__PURE__ */ d("section", {
		className: "player-modal player-stats",
		"data-player-control": !0,
		children: [/* @__PURE__ */ d("header", { children: [/* @__PURE__ */ u("strong", { children: "播放器统计" }), /* @__PURE__ */ u("button", {
			className: "modal-close",
			title: "关闭",
			"aria-label": "关闭",
			onClick: n,
			children: /* @__PURE__ */ u(b, { size: 17 })
		})] }), /* @__PURE__ */ u("dl", { children: t.map(([t, n]) => /* @__PURE__ */ d(e, { children: [/* @__PURE__ */ u("dt", { children: t }), /* @__PURE__ */ u("dd", { children: n })] }, t)) })]
	});
}
function pt({ onClose: e }) {
	return /* @__PURE__ */ d("section", {
		className: "player-modal player-about",
		"data-player-control": !0,
		children: [
			/* @__PURE__ */ u("button", {
				className: "modal-close",
				title: "关闭",
				"aria-label": "关闭",
				onClick: e,
				children: /* @__PURE__ */ u(b, { size: 17 })
			}),
			/* @__PURE__ */ u("strong", { children: "MX Player" }),
			/* @__PURE__ */ d("span", { children: ["v", tt] }),
			/* @__PURE__ */ u("p", { children: "纯客户端 Matroska 播放器。文件和链接只在本机读取，视频帧由 WebCodecs 输出。" })
		]
	});
}
function mt({ rate: e, setRate: t, audioTracks: n, subtitleTracks: r, audioTrackId: i, audioAuto: a, subtitleTrackId: o, selectTrack: s, qualities: c, selectedQuality: l, onQualityChange: f }) {
	return /* @__PURE__ */ d("div", {
		className: "settings-panel",
		"data-player-control": !0,
		children: [
			/* @__PURE__ */ d("label", { children: [/* @__PURE__ */ u("span", { children: "播放速度" }), /* @__PURE__ */ u("select", {
				value: e,
				onChange: (e) => t(Number(e.target.value)),
				children: [
					.5,
					.75,
					1,
					1.25,
					1.5,
					2
				].map((e) => /* @__PURE__ */ d("option", {
					value: e,
					children: [e, "×"]
				}, e))
			})] }),
			c.length > 0 && /* @__PURE__ */ d("label", { children: [/* @__PURE__ */ u("span", { children: "清晰度" }), /* @__PURE__ */ d("select", {
				value: l,
				onChange: (e) => f?.(e.target.value),
				children: [/* @__PURE__ */ u("option", {
					value: "auto",
					children: "自动"
				}), c.map((e) => /* @__PURE__ */ u("option", {
					value: e.id,
					children: e.label
				}, e.id))]
			})] }),
			/* @__PURE__ */ d("label", { children: [/* @__PURE__ */ u("span", { children: "音频轨" }), /* @__PURE__ */ d("select", {
				value: a ? "" : i ?? "",
				onChange: (e) => s("audio", e.target.value ? Number(e.target.value) : null),
				children: [/* @__PURE__ */ u("option", {
					value: "",
					children: "自动"
				}), n.map((e) => /* @__PURE__ */ u("option", {
					value: e.id,
					children: Ee(e)
				}, e.id))]
			})] }),
			r.length > 0 && /* @__PURE__ */ d("label", { children: [/* @__PURE__ */ u("span", { children: "字幕轨" }), /* @__PURE__ */ d("select", {
				value: o ?? "",
				onChange: (e) => s("subtitle", e.target.value ? Number(e.target.value) : null),
				children: [/* @__PURE__ */ u("option", {
					value: "",
					children: "关闭"
				}), r.map((e) => /* @__PURE__ */ u("option", {
					value: e.id,
					children: gt(e)
				}, e.id))]
			})] })
		]
	});
}
function ht(e) {
	return e instanceof Element && !!e.closest("[data-player-control]");
}
function gt(e) {
	return [e.language, e.name].filter(Boolean).join(" · ") || `字幕轨 ${e.id}`;
}
function _t(e, t) {
	let n = [];
	return e && n.push(k(e)), t && n.push(`${k(t)} · ${t.channels || 2}ch`), n.join(" · ") || "编码待识别";
}
function vt(e) {
	try {
		return new URL(e).hostname || "远程 URL";
	} catch {
		return "远程 URL";
	}
}
function yt(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(0)} KB` : `${(e / 1024 / 1024).toFixed(1)} MB`;
}
function bt(e) {
	if (!Number.isFinite(e) || e < 0) return "00:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}`;
}
function xt(e) {
	return e ? P(e) : "unknown-host";
}
function St(e) {
	return Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : .85;
}
//#endregion
//#region src/react/MXPlayerReact.tsx
var H = r(function(e, t) {
	let n = c(null), [r, i] = l(!1), [d, f] = l(null), p = s(() => {
		if (d && d.baseUrl === e.url && d.baseFile === e.file) return {
			kind: "file",
			file: d.file
		};
		if (e.url) return {
			kind: "url",
			url: e.url
		};
		if (e.file) return {
			kind: "file",
			file: e.file
		};
	}, [
		d,
		e.file,
		e.url
	]);
	a(() => {
		e.volume !== void 0 && n.current?.setVolume(e.volume);
	}, [e.volume]), a(() => {
		e.muted !== void 0 && n.current?.setMuted(e.muted);
	}, [e.muted]), o(t, () => ({
		play: () => n.current?.play(),
		pause: () => n.current?.pause(),
		toggle: () => n.current?.toggle(),
		seek: (e) => n.current?.seek(e),
		setVolume: (e) => n.current?.setVolume(e),
		setMuted: (e) => n.current?.setMuted(e),
		setPlaybackRate: (e) => n.current?.setPlaybackRate(e),
		requestFullscreen: () => n.current?.requestFullscreen(),
		requestPictureInPicture: () => n.current?.requestPictureInPicture() ?? Promise.resolve(),
		getState: () => n.current?.getState(),
		getTracks: () => n.current?.getTracks() ?? []
	}), []);
	function m(t) {
		if (!(!t || !e.localPlayback)) {
			if (!t.name.toLowerCase().endsWith(".mkv") && t.type !== "video/x-matroska") {
				e.onError?.({ message: "请拖入 Matroska (.mkv) 文件。" });
				return;
			}
			f({
				file: t,
				baseUrl: e.url,
				baseFile: e.file
			});
		}
	}
	let h = e.fluid ?? !0;
	return /* @__PURE__ */ u("div", {
		className: `mxplayer-container ${r ? "mxplayer-dragging" : ""} ${e.className || ""}`.trim(),
		style: {
			background: "#000",
			...h ? {
				width: "100%",
				aspectRatio: "16 / 9"
			} : {},
			...e.style
		},
		onDragOver: e.localPlayback ? (e) => {
			e.preventDefault(), i(!0);
		} : void 0,
		onDragLeave: e.localPlayback ? () => i(!1) : void 0,
		onDrop: e.localPlayback ? (e) => {
			e.preventDefault(), i(!1), m(e.dataTransfer.files[0]);
		} : void 0,
		children: /* @__PURE__ */ u(V, {
			ref: n,
			source: p,
			label: e.label,
			embedded: !0,
			autoplay: e.autoplay,
			initialVolume: e.volume,
			initialMuted: e.muted,
			workerUrl: e.workerUrl,
			onNext: e.onNext,
			qualities: e.qualities,
			selectedQuality: e.selectedQuality,
			onQualityChange: e.onQualityChange,
			danmaku: e.danmaku,
			onTheaterChange: e.onTheaterChange,
			onReady: e.onReady,
			onPlay: e.onPlay,
			onPause: e.onPause,
			onTimeUpdate: e.onTimeUpdate,
			onEnded: e.onEnded,
			onError: e.onError,
			style: {
				width: "100%",
				height: "100%"
			}
		})
	});
});
//#endregion
export { H as MXPlayerReact, H as default };

//# sourceMappingURL=mx-player-react.js.map