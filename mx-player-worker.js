//#region src/lib/codec.ts
function e(e) {
	return e.codecId === "V_MPEG4/ISO/AVC" ? t(e.codecPrivate) || "avc1.640028" : e.codecId === "V_MPEGH/ISO/HEVC" ? "hvc1.1.6.L150.B0" : e.codecId === "A_AAC" ? "mp4a.40.2" : null;
}
function t(e) {
	if (!e || e.byteLength < 4) return null;
	let t = new Uint8Array(e);
	return t[0] !== 1 || t.length < 4 ? null : `avc1.${[
		t[1],
		t[2],
		t[3]
	].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
var n = /* @__PURE__ */ new Set([
	"S_TEXT/UTF8",
	"S_TEXT/ASCII",
	"S_TEXT/ASS",
	"S_TEXT/SSA",
	"S_ASS",
	"S_SSA"
]);
function r(e) {
	return e.kind === "subtitle" && n.has(e.codecId.toUpperCase());
}
//#endregion
//#region src/worker/ebml-elements.ts
function i(e, t) {
	if (t >= e.length) return null;
	let n = e[t];
	if (n === 0) return null;
	let r = 128, i = 1;
	for (; i <= 8 && !(n & r);) r >>= 1, i += 1;
	if (i > 8 || t + i > e.length) return null;
	let a = n & r - 1, o = a === r - 1;
	for (let n = 1; n < i; n += 1) {
		let r = e[t + n];
		a = a * 256 + r, r !== 255 && (o = !1);
	}
	return o ? {
		length: i,
		value: a,
		unknown: !0
	} : Number.isSafeInteger(a) ? {
		length: i,
		value: a,
		unknown: !1
	} : null;
}
function a(e, t) {
	if (t < 0 || t >= e.length) return null;
	let n = e[t];
	if (n === 0) return null;
	let r = 128, a = 1;
	for (; a <= 4 && !(n & r);) r >>= 1, a += 1;
	if (a > 4 || t + a >= e.length) return null;
	let o = 0;
	for (let n = 0; n < a; n += 1) o = o * 256 + e[t + n];
	let s = i(e, t + a);
	if (!s) return null;
	let c = t + a + s.length;
	if (s.unknown) return {
		id: o,
		data: c,
		size: -1,
		end: e.length,
		unknownSize: !0,
		truncated: !1
	};
	if (!Number.isSafeInteger(c + s.value)) return null;
	let l = c + s.value;
	return {
		id: o,
		data: c,
		size: s.value,
		end: l,
		unknownSize: !1,
		truncated: l > e.length
	};
}
function o(e, t, n, r) {
	let i = t, o = Math.min(n, e.length);
	for (; i < o;) {
		let t = a(e, i);
		if (!t || t.truncated || t.end > o || t.end <= i) return {
			complete: !1,
			consumed: i
		};
		r(t), i = t.end;
	}
	return {
		complete: i === o,
		consumed: i
	};
}
function s(e, t, n, r) {
	let i = t, o = Math.min(n, e.length);
	for (; i < o;) {
		let t = a(e, i);
		if (!t) return null;
		if (t.id === r) return t;
		if (t.truncated || t.unknownSize || t.end <= i) return null;
		i = t.end;
	}
	return null;
}
function c(e, t) {
	let n = 0;
	for (let r = t.data; r < Math.min(t.end, e.length); r += 1) n = n * 256 + e[r];
	return n;
}
function l(e, t) {
	let n = e[t] << 8 | e[t + 1];
	return n & 32768 ? n - 65536 : n;
}
function u(e, t) {
	return new TextDecoder().decode(e.subarray(t.data, Math.min(t.end, e.length))).replace(/\0+$/, "");
}
function d(e, t) {
	if (t.end > e.length) return 0;
	let n = new DataView(e.buffer, e.byteOffset + t.data, t.size);
	return t.size === 4 ? n.getFloat32(0) : t.size === 8 ? n.getFloat64(0) : c(e, t);
}
function f(e, t) {
	return e.slice(t.data, Math.min(t.end, e.length)).buffer;
}
//#endregion
//#region src/worker/ebml-block.ts
function p(e, t, n, r) {
	let i = [], a = t;
	for (let t = 0; t < r; t += 1) {
		let t = 0;
		for (;;) {
			if (a >= n) return null;
			let r = e[a];
			if (a += 1, t += r, r !== 255) break;
		}
		i.push(t);
	}
	return {
		sizes: i,
		offset: a
	};
}
function m(e, t, n, r) {
	let a = [], o = t, s = i(e, o);
	if (!s || o + s.length > n) return null;
	o += s.length, a.push(s.value);
	for (let t = 1; t < r; t += 1) {
		let t = i(e, o);
		if (!t || o + t.length > n) return null;
		o += t.length;
		let r = 2 ** (7 * t.length - 1) - 1, s = a[a.length - 1] + (t.value - r);
		if (s < 0) return null;
		a.push(s);
	}
	return {
		sizes: a,
		offset: o
	};
}
function h(e, t, n) {
	let r = Math.min(t.end, e.length);
	if (r - t.data < 4) return [];
	let a = i(e, t.data);
	if (!a || t.data + a.length + 3 > r) return [];
	let o = a.value;
	if (!n.trackIds.has(o)) return [];
	let s = l(e, t.data + a.length), c = e[t.data + a.length + 2], u = t.data + a.length + 3, d = (c & 6) >> 1, f = n.kind === "simple" ? !!(c & 128) : !n.groupHasReference, h = Math.round((n.clusterTime + s) * n.timecodeScale / 1e3), g = n.defaultDurations?.get(o), _ = n.blockDurationTicks === void 0 ? void 0 : Math.round(n.blockDurationTicks * n.timecodeScale / 1e3);
	if (d === 0) return [{
		trackId: o,
		timestamp: h,
		duration: _ === void 0 ? g === void 0 ? 0 : Math.round(g / 1e3) : _,
		key: f,
		data: e.slice(u, r)
	}];
	if (u >= r) return [];
	let v = e[u] + 1;
	if (v < 1) return [];
	let y = u + 1, b;
	if (d === 2) {
		let e = r - y;
		if (e <= 0 || e % v !== 0) return [];
		b = Array(v).fill(e / v);
	} else {
		let t = d === 1 ? p(e, y, r, v - 1) : m(e, y, r, v - 1);
		if (!t) return [];
		y = t.offset;
		let n = t.sizes.reduce((e, t) => e + t, 0), i = r - y;
		if (n > i) return [];
		b = [...t.sizes, i - n];
	}
	if (b.some((e) => e < 0)) return [];
	let x = _ === void 0 ? g === void 0 ? 0 : Math.round(g / 1e3) : Math.round(_ / v), S = [];
	for (let t = 0; t < b.length; t += 1) {
		let n = b[t];
		if (y + n > r) return [];
		S.push({
			trackId: o,
			timestamp: h + t * x,
			duration: x,
			key: f,
			data: e.slice(y, y + n)
		}), y += n;
	}
	return S;
}
//#endregion
//#region src/worker/ebml-probe.ts
var g = [
	26,
	69,
	223,
	163
];
function _(e) {
	return e.length >= g.length && g.every((t, n) => e[n] === t);
}
//#endregion
//#region src/worker/ebml.ts
var v = {
	segment: 408125543,
	info: 357149030,
	timecodeScale: 2807729,
	duration: 17545,
	tracks: 374648427,
	trackEntry: 174,
	trackNumber: 215,
	trackType: 131,
	codecId: 134,
	codecPrivate: 25506,
	language: 2274716,
	name: 21358,
	defaultDuration: 2352003,
	video: 224,
	pixelWidth: 176,
	pixelHeight: 186,
	audio: 225,
	samplingFrequency: 181,
	channels: 159,
	cues: 475249515,
	cuePoint: 187,
	cueTime: 179,
	cueTrackPositions: 183,
	cueTrack: 247,
	cueClusterPosition: 241,
	cueRelativePosition: 240,
	seekHead: 290298740,
	seek: 19899,
	seekId: 21419,
	seekPosition: 21420,
	cluster: 524531317,
	timecode: 231,
	simpleBlock: 163,
	blockGroup: 160,
	block: 161,
	blockDuration: 155,
	referenceBlock: 251
}, y = /* @__PURE__ */ new Set([
	v.timecode,
	22612,
	167,
	171,
	v.simpleBlock,
	v.blockGroup,
	175
]), b = [
	1048576,
	4194304,
	16777216
], x = 65536, S = 67108864, C = 2, w = 24, T = 4, E = 12, D = 262144, O = 8;
function k(t, n) {
	let r = 0, i = 0, a = "", s, l, p, m, h, g, _, y;
	o(t, n.data, n.end, (e) => {
		e.id === v.trackNumber ? r = c(t, e) : e.id === v.trackType ? i = c(t, e) : e.id === v.codecId ? a = u(t, e) : e.id === v.codecPrivate ? s = f(t, e) : e.id === v.language ? l = u(t, e) : e.id === v.name ? p = u(t, e) : e.id === v.defaultDuration ? y = c(t, e) : e.id === v.video ? o(t, e.data, e.end, (e) => {
			e.id === v.pixelWidth && (m = c(t, e)), e.id === v.pixelHeight && (h = c(t, e));
		}) : e.id === v.audio && o(t, e.data, e.end, (e) => {
			e.id === v.samplingFrequency && (g = Math.round(d(t, e))), e.id === v.channels && (_ = c(t, e));
		});
	});
	let b = i === 1 ? "video" : i === 2 ? "audio" : i === 17 ? "subtitle" : null;
	if (!r || !b || !a) return null;
	let x = {
		id: r,
		kind: b,
		codecId: a,
		codecPrivate: s,
		language: l,
		name: p,
		width: m,
		height: h,
		sampleRate: g,
		channels: _,
		defaultDurationNs: y
	};
	return x.codec = e(x) || void 0, x;
}
var A = class {
	loader;
	selected = /* @__PURE__ */ new Set();
	metadata = null;
	cues = [];
	clusterIndex = [];
	defaultDurations = /* @__PURE__ */ new Map();
	segmentDataStart = 0;
	segmentEnd = Infinity;
	firstClusterOffset = 0;
	cursor = 0;
	atEnd = !1;
	constructor(e) {
		this.loader = e;
	}
	get endOfStream() {
		return this.atEnd;
	}
	async init() {
		let e = await this.loader.probe();
		if (e.cors === "blocked") throw Error(`CORS_BLOCKED:${e.message || ""}`);
		let t = e.size ?? this.loader.totalSize ?? b[b.length - 1], n = /* @__PURE__ */ new Uint8Array(), i = null, l = !1;
		for (let e of b) {
			if (n = await this.loader.read(0, Math.min(e, t)), !_(n)) throw Error("MKV_EBML_HEADER_INVALID");
			if (i = s(n, 0, n.length, v.segment), !i) {
				if (!a(n, 0) || n.length >= t) throw Error("MKV_SEGMENT_NOT_FOUND");
				continue;
			}
			if (l = s(n, i.data, Math.min(i.end, n.length), v.tracks)?.truncated === !1, l || n.length >= t) break;
		}
		if (!i) throw Error("MKV_SEGMENT_NOT_FOUND");
		this.segmentDataStart = i.data, this.segmentEnd = i.unknownSize ? this.loader.totalSize ?? t : Math.min(i.data + i.size, this.loader.totalSize ?? Infinity);
		let u = 1e6, f = 0, p = [], m = null, h = null;
		if (o(n, i.data, Math.min(i.end, n.length), (e) => {
			e.id === v.info ? o(n, e.data, e.end, (e) => {
				e.id === v.timecodeScale && (u = c(n, e)), e.id === v.duration && (f = d(n, e));
			}) : e.id === v.tracks ? o(n, e.data, e.end, (e) => {
				if (e.id === v.trackEntry) {
					let t = k(n, e);
					t && p.push(t);
				}
			}) : e.id === v.cues ? m = e : e.id === v.seekHead && (h = e);
		}), !p.length) throw Error("MKV_TRACKS_NOT_FOUND");
		this.selected.clear();
		for (let e of ["video", "audio"]) {
			let t = p.find((t) => t.kind === e);
			t && this.selected.add(t.id);
		}
		p.filter(r).forEach((e) => this.selected.add(e.id)), this.defaultDurations = new Map(p.filter((e) => e.defaultDurationNs).map((e) => [e.id, e.defaultDurationNs])), this.metadata = {
			tracks: p,
			duration: f ? f * u / 1e9 : 0,
			timecodeScale: u
		}, m ? this.parseCues(n, m, u) : h && await this.loadCuesViaSeekHead(n, h, u);
		let g = await this.locateFirstCluster(n, i);
		if (g < 0) throw Error("MKV_NO_CLUSTER");
		return this.firstClusterOffset = g, this.cursor = g, this.atEnd = !1, this.metadata;
	}
	async locateFirstCluster(e, t) {
		let n = e, r = 0, i = t.data, o = 0;
		for (; i < this.segmentEnd && o < 4096;) {
			if (o += 1, i < r || i - r + 16 > n.length) {
				let e = await this.loader.readWindow(i, x);
				if (n = e.bytes, r = e.base, i - r >= n.length) return -1;
			}
			let e = a(n, i - r);
			if (!e) return -1;
			if (e.id === v.cluster) return i;
			if (e.unknownSize) return -1;
			e.id === v.cues && !this.cues.length && !e.truncated && this.parseCues(n, e, this.metadata?.timecodeScale ?? 1e6);
			let t = r + e.end;
			if (t <= i) return -1;
			i = t;
		}
		return -1;
	}
	async loadCuesViaSeekHead(e, t, n) {
		let r = -1;
		if (o(e, t.data, t.end, (t) => {
			if (t.id !== v.seek) return;
			let n = 0, i = -1;
			o(e, t.data, t.end, (t) => {
				t.id === v.seekId && (n = c(e, t)), t.id === v.seekPosition && (i = c(e, t));
			}), n === v.cues && i >= 0 && (r = i);
		}), r < 0) return;
		let i = this.segmentDataStart + r;
		try {
			let { bytes: e, base: t } = await this.loader.readWindow(i, x), r = a(e, i - t);
			if (!r || r.id !== v.cues) return;
			let o = r.end - (i - t), s = r.truncated ? await this.loader.readWindow(i, o) : {
				bytes: e,
				base: t
			}, c = a(s.bytes, i - s.base);
			c && c.id === v.cues && !c.truncated && this.parseCues(s.bytes, c, n);
		} catch {}
	}
	parseCues(e, t, n) {
		let r = [];
		o(e, t.data, Math.min(t.end, e.length), (t) => {
			if (t.id !== v.cuePoint) return;
			let i = 0;
			o(e, t.data, t.end, (t) => {
				if (t.id === v.cueTime && (i = c(e, t)), t.id === v.cueTrackPositions) {
					let a = 0, s = -1;
					o(e, t.data, t.end, (t) => {
						t.id === v.cueTrack && (a = c(e, t)), t.id === v.cueClusterPosition && (s = c(e, t));
					}), s >= 0 && r.push({
						time: i * n / 1e9,
						offset: this.segmentDataStart + s,
						track: a
					});
				}
			});
		}), this.cues = r.sort((e, t) => e.time - t.time);
	}
	resolveSeekOffset(e) {
		let t = this.cueOffsetFor(e);
		return t >= 0 ? t : this.indexOffsetFor(e)?.offset ?? this.firstClusterOffset;
	}
	cueOffsetFor(e) {
		let t = this.metadata?.tracks.find((e) => e.kind === "video"), n = t ? this.cues.filter((e) => e.track === t.id) : [], r = n.length ? n : this.cues, i = -1;
		for (let t of r) if (t.time <= e) i = t.offset;
		else break;
		return i;
	}
	indexOffsetFor(e) {
		let t = null;
		for (let n of this.clusterIndex) n.time <= e && (!t || n.time >= t.time) && (t = n);
		return t;
	}
	async seekOffsetFor(e) {
		if (e <= 0) return this.resolveSeekOffset(e);
		let t = this.cueOffsetFor(e);
		if (t >= 0) return t;
		let n = this.indexOffsetFor(e);
		if (n && e - n.time <= T) return n.offset;
		let r = n?.offset ?? this.firstClusterOffset, i = await this.scanForCluster(e, n?.time ?? 0, r);
		return i >= 0 ? i : r;
	}
	async scanForCluster(e, t, n) {
		let r = Number.isFinite(this.segmentEnd) ? this.segmentEnd : this.loader.totalSize ?? 0;
		if (!r || r <= n) return -1;
		let i = n, a = r, o = t <= e ? n : -1;
		for (let t = 0; t < E && i < a; t += 1) {
			let t = Math.floor((i + a) / 2), n = await this.clusterAtOrAfter(t, a);
			if (!n || n.offset >= a) {
				a = t;
				continue;
			}
			n.time <= e ? (o = n.offset, i = n.offset + 1) : a = t;
		}
		return o;
	}
	async clusterAtOrAfter(e, t) {
		let n = Math.max(e, 0);
		for (let e = 0; e < O && n < t; e += 1) {
			let { bytes: e, base: t } = await this.loader.readWindow(n, D), r = n - t;
			if (r >= e.length) return null;
			for (let n = r; n + 4 <= e.length; n += 1) {
				if (e[n] !== 31 || e[n + 1] !== 67 || e[n + 2] !== 182 || e[n + 3] !== 117) continue;
				let r = a(e, n);
				if (!r || r.id !== v.cluster) continue;
				let i = -1;
				if (o(e, r.data, Math.min(r.end, e.length), (t) => {
					i < 0 && t.id === v.timecode && (i = c(e, t));
				}), i < 0) continue;
				let s = t + n, l = i * (this.metadata?.timecodeScale ?? 1e6) / 1e9;
				return this.recordCluster(s, l), {
					offset: s,
					time: l
				};
			}
			n = t + Math.max(e.length - 3, 1);
		}
		return null;
	}
	async packetsFor(e = 0) {
		if (!this.metadata) throw Error("DEMUX_NOT_INITIALIZED");
		return this.cursor = await this.seekOffsetFor(e), this.atEnd = !1, this.next();
	}
	async next() {
		if (!this.metadata) throw Error("DEMUX_NOT_INITIALIZED");
		let e = [], t = 0, n = Infinity, r = -Infinity;
		for (; !this.atEnd && this.cursor < this.segmentEnd;) {
			let i = await this.readClusterAt(this.cursor);
			if (i.nextOffset <= this.cursor) {
				this.atEnd = !0;
				break;
			}
			if (this.cursor = i.nextOffset, this.cursor >= this.segmentEnd && (this.atEnd = !0), i.packets.length) {
				t += 1;
				for (let t of i.packets) {
					e.push(t);
					let i = t.timestamp / 1e6;
					i < n && (n = i), i > r && (r = i);
				}
			}
			if (i.truncated || e.length && (t >= w || r - n >= C)) break;
		}
		return e.length ? e.sort((e, t) => e.timestamp - t.timestamp) : (this.atEnd = !0, []);
	}
	select(e, t) {
		this.metadata?.tracks.find((n) => n.id === t && n.kind === e) && e !== "subtitle" && (this.metadata?.tracks.filter((t) => t.kind === e).forEach((e) => this.selected.delete(e.id)), this.selected.add(t));
	}
	async readClusterAt(e) {
		let { bytes: t, base: n } = await this.loader.readWindow(e, x), r = e - n;
		if (r >= t.length) return {
			packets: [],
			nextOffset: this.segmentEnd,
			truncated: !0
		};
		let i = a(t, r);
		if (!i) throw Error("MKV_CLUSTER_HEADER_INVALID");
		if (i.id !== v.cluster) return i.unknownSize ? {
			packets: [],
			nextOffset: this.segmentEnd,
			truncated: !1
		} : {
			packets: [],
			nextOffset: n + i.end,
			truncated: !1
		};
		if (i.unknownSize) return this.readUnboundedCluster(e);
		let o = i.data - r + i.size;
		if (e + o > this.segmentEnd) {
			let n = Math.min(t.length - r, Math.max(0, this.segmentEnd - e));
			return {
				packets: this.parseClusterBody(t, r, r + n, e),
				nextOffset: this.segmentEnd,
				truncated: !0
			};
		}
		if (o > t.length - r) {
			let i = await this.loader.readWindow(e, o);
			if (t = i.bytes, n = i.base, r = e - n, o > t.length - r) {
				let n = Math.max(0, t.length - r);
				return {
					packets: this.parseClusterBody(t, r, r + n, e),
					nextOffset: this.segmentEnd,
					truncated: !0
				};
			}
		}
		return {
			packets: this.parseClusterBody(t, r, r + o, e),
			nextOffset: e + o,
			truncated: !1
		};
	}
	async readUnboundedCluster(e) {
		let t = x;
		for (;;) {
			let { bytes: n, base: r } = await this.loader.readWindow(e, t), i = e - r, o = a(n, i);
			if (!o) throw Error("MKV_CLUSTER_HEADER_INVALID");
			let s = o.data, c = -1, l = !1;
			for (; s < n.length;) {
				let e = a(n, s);
				if (!e) {
					l = !0;
					break;
				}
				if (!y.has(e.id)) {
					c = s;
					break;
				}
				if (e.truncated) {
					l = !0;
					break;
				}
				s = e.end;
			}
			if (c < 0 && l && n.length - i >= t && t < S) {
				t *= 4;
				continue;
			}
			let u = c >= 0 ? c : Math.min(s, n.length);
			if (c < 0 && t >= S) throw Error("MKV_CLUSTER_UNBOUNDED");
			return {
				packets: this.parseClusterBody(n, i, u, e),
				nextOffset: r + u,
				truncated: !1
			};
		}
	}
	parseClusterBody(e, t, n, r) {
		let i = a(e, t);
		if (!i) return [];
		let s = 0, l = [], u = new Set(this.selected), d = this.metadata?.timecodeScale || 1e6;
		return o(e, i.data, Math.min(n, e.length), (t) => {
			if (t.id === v.timecode) {
				s = c(e, t), this.recordCluster(r, s * d / 1e9);
				return;
			}
			if (t.id === v.simpleBlock) {
				l.push(...h(e, t, {
					clusterTime: s,
					timecodeScale: d,
					trackIds: u,
					kind: "simple",
					defaultDurations: this.defaultDurations
				}));
				return;
			}
			if (t.id === v.blockGroup) {
				let n = !1, r;
				o(e, t.data, t.end, (t) => {
					t.id === v.referenceBlock && (n = !0), t.id === v.blockDuration && (r = c(e, t));
				}), o(e, t.data, t.end, (t) => {
					t.id === v.block && l.push(...h(e, t, {
						clusterTime: s,
						timecodeScale: d,
						trackIds: u,
						kind: "group",
						groupHasReference: n,
						blockDurationTicks: r,
						defaultDurations: this.defaultDurations
					}));
				});
			}
		}), l;
	}
	recordCluster(e, t) {
		this.clusterIndex.some((t) => t.offset === e) || (this.clusterIndex.push({
			offset: e,
			time: t
		}), this.clusterIndex.sort((e, t) => e.offset - t.offset));
	}
}, j = 1048576, M = 134217728, N = 4, P = 536870912, F = 200, I = class {
	source;
	chunkSize;
	chunks = /* @__PURE__ */ new Map();
	inflight = /* @__PURE__ */ new Map();
	cachedBytes = 0;
	downloadedBytes = 0;
	size = null;
	contentType = null;
	rangeSupport = !1;
	fullBody = null;
	lastProbe = {
		size: null,
		contentType: null,
		acceptsRanges: !1,
		status: null,
		cors: "unknown"
	};
	constructor(e, t = j) {
		this.source = e, this.chunkSize = t;
	}
	async probe() {
		if (this.source.kind === "file") return this.size = this.source.file.size, this.contentType = this.source.file.type || "video/x-matroska", this.rangeSupport = !0, this.lastProbe = {
			size: this.size,
			contentType: this.contentType,
			acceptsRanges: !0,
			status: 200,
			cors: "ok"
		}, this.lastProbe;
		let e = null;
		try {
			e = await fetch(this.source.url, {
				method: "HEAD",
				redirect: "follow"
			});
		} catch {}
		if (e && (this.size = this.parseLength(e.headers.get("content-length")), this.contentType = e.headers.get("content-type"), this.rangeSupport = e.headers.get("accept-ranges")?.toLowerCase() === "bytes", this.lastProbe = {
			size: this.size,
			contentType: this.contentType,
			acceptsRanges: this.rangeSupport,
			status: e.status,
			cors: "ok",
			message: e.ok && this.rangeSupport ? void 0 : e.ok ? "正在验证 GET Range 响应" : `探测请求返回 HTTP ${e.status}`
		}, e.ok && this.rangeSupport)) return this.lastProbe;
		try {
			let e = await fetch(this.source.url, {
				headers: { Range: "bytes=0-0" },
				redirect: "follow"
			});
			return this.updateFromResponse(e), e.body && await e.body.cancel(), this.lastProbe;
		} catch (t) {
			return this.lastProbe = {
				size: this.size,
				contentType: this.contentType,
				acceptsRanges: !1,
				status: e?.status || null,
				cors: "blocked",
				message: t instanceof Error ? t.message : "跨域或网络请求被阻止"
			}, this.lastProbe;
		}
	}
	async read(e, t) {
		if (e < 0 || t <= 0) throw Error("READ_RANGE_INVALID");
		let n = this.size === null ? t : Math.min(t, Math.max(0, this.size - e));
		if (n <= 0) return /* @__PURE__ */ new Uint8Array();
		if (this.source.kind === "file") return new Uint8Array(await this.source.file.slice(e, e + n).arrayBuffer());
		if (this.fullBody) return this.fullBody.slice(e, e + n);
		let r = Math.floor(e / this.chunkSize), i = Math.floor((e + n - 1) / this.chunkSize);
		await this.ensureChunks(r, i);
		let a = this.fullBody;
		return a ? a.slice(e, e + n) : (this.prefetch(i + 1, i + N), this.assemble(e, n));
	}
	async readChunk(e) {
		return this.read(e, this.chunkSize);
	}
	async readWindow(e, t) {
		if (e < 0 || t <= 0) throw Error("READ_RANGE_INVALID");
		if (this.source.kind === "file") return {
			bytes: await this.read(e, t),
			base: e
		};
		let n = Math.floor(e / this.chunkSize) * this.chunkSize, r = e - n + t, i = Math.max(this.chunkSize, r);
		return {
			bytes: await this.read(n, i),
			base: n
		};
	}
	async ensureChunks(e, t) {
		let n = [], r = -1;
		for (let i = e; i <= t + 1; i += 1) {
			let e = i <= t && !this.chunks.has(i) && !this.inflight.has(i);
			e && r < 0 && (r = i), !e && r >= 0 && (n.push(this.startRun(r, i - 1)), r = -1);
			let a = i <= t ? this.inflight.get(i) : void 0;
			a && n.push(a);
		}
		n.length && await Promise.all(n);
	}
	startRun(e, t) {
		let n = this.fetchRun(e, t).finally(() => {
			for (let r = e; r <= t; r += 1) this.inflight.get(r) === n && this.inflight.delete(r);
		});
		for (let r = e; r <= t; r += 1) this.inflight.set(r, n);
		return n;
	}
	prefetch(e, t) {
		if (this.fullBody || this.size === null) return;
		let n = Math.floor(Math.max(0, this.size - 1) / this.chunkSize), r = Math.min(t, n);
		for (let t = e; t <= r; t += 1) {
			if (this.chunks.has(t) || this.inflight.has(t)) continue;
			let e = t;
			for (; e + 1 <= r && !this.chunks.has(e + 1) && !this.inflight.has(e + 1);) e += 1;
			this.startRun(t, e).catch(() => void 0), t = e;
		}
	}
	async fetchRun(e, t) {
		let n = e * this.chunkSize, r = (t + 1) * this.chunkSize - 1, i = this.size === null ? r : Math.min(r, this.size - 1);
		if (i < n) return;
		let a = await this.fetchWithRetry({ Range: `bytes=${n}-${i}` });
		if (a.status === 416) {
			(this.size === null || this.size > n) && (this.size = n);
			return;
		}
		if (!a.ok) throw Error(`RANGE_HTTP_${a.status}`);
		let o = new Uint8Array(await a.arrayBuffer());
		if (this.downloadedBytes += o.byteLength, a.status === 206) {
			if (this.updateFromResponse(a), !o.byteLength) {
				(this.size === null || this.size > n) && (this.size = n);
				return;
			}
			this.storeChunks(n, o);
			return;
		}
		if (a.status === 200) {
			if (o.byteLength > P) throw Error("RANGE_UNSUPPORTED:服务器忽略 Range 且文件过大");
			this.fullBody = o, this.size = o.byteLength, this.contentType = a.headers.get("content-type") || this.contentType, this.rangeSupport = !1, this.chunks.clear(), this.cachedBytes = 0, this.lastProbe = {
				size: this.size,
				contentType: this.contentType,
				acceptsRanges: !1,
				status: a.status,
				cors: "ok",
				message: "资源未返回 206 Partial Content，将使用完整响应读取"
			};
			return;
		}
		throw Error(`RANGE_HTTP_${a.status}`);
	}
	async fetchWithRetry(e) {
		let t = this.source.kind === "url" ? this.source.url : "", n = null;
		for (let r = 0; r < 2; r += 1) try {
			let n = await fetch(t, {
				headers: e,
				redirect: "follow"
			});
			if (n.status >= 500 && r === 0) {
				await L(F);
				continue;
			}
			return n;
		} catch (e) {
			n = e, r === 0 && await L(F);
		}
		throw n instanceof Error ? n : /* @__PURE__ */ Error("RANGE_NETWORK_ERROR");
	}
	storeChunks(e, t) {
		for (let n = 0; n < t.byteLength; n += this.chunkSize) {
			let r = (e + n) / this.chunkSize;
			if (!Number.isInteger(r)) continue;
			let i = t.slice(n, n + this.chunkSize), a = this.chunks.get(r);
			a && (this.cachedBytes -= a.byteLength), this.chunks.set(r, i), this.cachedBytes += i.byteLength;
		}
		this.evict();
	}
	evict() {
		for (; this.cachedBytes > M;) {
			let e = this.chunks.keys().next();
			if (e.done) break;
			let t = this.chunks.get(e.value);
			this.chunks.delete(e.value), this.cachedBytes -= t?.byteLength ?? 0;
		}
	}
	assemble(e, t) {
		let n = new Uint8Array(t), r = 0;
		for (; r < t;) {
			let i = e + r, a = Math.floor(i / this.chunkSize), o = this.chunks.get(a);
			if (!o) break;
			this.chunks.delete(a), this.chunks.set(a, o);
			let s = i - a * this.chunkSize;
			if (s >= o.byteLength) break;
			let c = Math.min(o.byteLength - s, t - r);
			n.set(o.subarray(s, s + c), r), r += c;
		}
		return r === t ? n : n.slice(0, r);
	}
	parseLength(e) {
		let t = Number(e);
		return Number.isFinite(t) && t > 0 ? t : null;
	}
	updateFromResponse(e) {
		let t = e.headers.get("content-range")?.match(/^bytes\s+(\d+)-(\d+)\/(\d+|\*)$/i), n = t?.[3] && t[3] !== "*" ? Number(t[3]) : null;
		n && Number.isFinite(n) && (this.size = n), this.contentType = e.headers.get("content-type") || this.contentType, this.rangeSupport = e.status === 206, this.lastProbe = {
			size: this.size,
			contentType: this.contentType,
			acceptsRanges: this.rangeSupport,
			status: e.status,
			cors: "ok",
			message: this.rangeSupport ? void 0 : "资源未返回 206 Partial Content"
		};
	}
	get totalSize() {
		return this.size;
	}
	get supportsRange() {
		return this.rangeSupport;
	}
	get probeInfo() {
		return this.lastProbe;
	}
	get networkBytes() {
		return this.downloadedBytes;
	}
};
function L(e) {
	return new Promise((t) => setTimeout(t, e));
}
//#endregion
//#region src/worker/demux.worker.ts
var R = null, z = !1;
function B(e) {
	if (e.type === "packets") {
		let t = e.packets.map((e) => e.data.buffer);
		self.postMessage(e, t);
	} else self.postMessage(e);
}
self.onmessage = async (e) => {
	let t = e.data, n = "epoch" in t ? t.epoch : 0;
	try {
		if (t.type === "init") {
			z = !1;
			let e = new I(t.source);
			R = new A(e), B({
				type: "progress",
				phase: "加载 TypeScript 解封装器",
				value: .08
			}), B({
				type: "progress",
				phase: "读取 Matroska 头部",
				value: .1
			}), B({
				type: "metadata",
				metadata: await R.init(),
				probe: e.probeInfo
			}), B({
				type: "progress",
				phase: "解析首个 Cluster",
				value: .35
			});
			let n = await R.packetsFor(0);
			z = !0, B({
				type: "packets",
				packets: n,
				epoch: 0
			});
			return;
		}
		if (!R || !z) {
			(t.type === "next" || t.type === "seek" || t.type === "select-track") && B({
				type: "packets",
				packets: [],
				epoch: n
			});
			return;
		}
		if (t.type === "seek") B({
			type: "progress",
			phase: "定位关键帧",
			value: .2
		}), B({
			type: "packets",
			packets: await R.packetsFor(t.time),
			epoch: n
		});
		else if (t.type === "next") {
			let e = await R.next();
			e.length ? B({
				type: "packets",
				packets: e,
				epoch: n
			}) : B({
				type: "eof",
				epoch: n
			});
		} else t.type === "select-track" ? (R.select(t.kind, t.trackId), t.kind === "subtitle" ? B({
			type: "packets",
			packets: [],
			epoch: n
		}) : B({
			type: "packets",
			packets: await R.packetsFor(t.time),
			epoch: n
		})) : t.type === "close" && (R = null, z = !1, B({
			type: "eof",
			epoch: n
		}));
	} catch (e) {
		B({
			type: "error",
			code: e instanceof Error ? e.message.split(":")[0] : "DEMUX_ERROR",
			message: e instanceof Error ? e.message : "Matroska 解析失败"
		});
	}
};
//#endregion

//# sourceMappingURL=mx-player-worker.js.map