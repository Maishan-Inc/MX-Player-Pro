//#region src/lib/codec.ts
var e = {
	A_AAC: "mp4a.40.2",
	A_FLAC: "flac",
	A_OPUS: "opus",
	A_VORBIS: "vorbis",
	"A_MPEG/L3": "mp3",
	A_AC3: "ac-3",
	"A_AC-3": "ac-3",
	A_EAC3: "ec-3",
	"A_E-AC-3": "ec-3"
};
function t(t) {
	let i = t.codecId.toUpperCase();
	return i === "V_MPEG4/ISO/AVC" ? n(t.codecPrivate) || "avc1.640028" : i === "V_MPEGH/ISO/HEVC" ? r(t.codecPrivate) || "hvc1.1.6.L150.B0" : e[i] ?? null;
}
function n(e) {
	if (!e || e.byteLength < 4) return null;
	let t = new Uint8Array(e);
	return t[0] !== 1 || t.length < 4 ? null : `avc1.${[
		t[1],
		t[2],
		t[3]
	].map((e) => e.toString(16).padStart(2, "0")).join("")}`;
}
function r(e) {
	if (!e || e.byteLength < 13) return null;
	let t = new Uint8Array(e);
	if (t[0] !== 1) return null;
	let n = (t[1] & 192) >> 6, r = (t[1] & 32) >> 5, a = t[1] & 31, o = new DataView(t.buffer, t.byteOffset, t.byteLength).getUint32(2), s = [
		`${[
			"",
			"A",
			"B",
			"C"
		][n]}${a}`,
		i(o).toString(16),
		`${r ? "H" : "L"}${t[12]}`
	], c = Array.from(t.subarray(6, 12));
	for (; c.length && c[c.length - 1] === 0;) c.pop();
	return s.push(...c.map((e) => e.toString(16).toUpperCase().padStart(2, "0"))), `hvc1.${s.join(".")}`;
}
function i(e) {
	let t = 0;
	for (let n = 0; n < 32; n += 1) t = t << 1 | e >>> n & 1;
	return t >>> 0;
}
var a = /* @__PURE__ */ new Set([
	"S_TEXT/UTF8",
	"S_TEXT/ASCII",
	"S_TEXT/ASS",
	"S_TEXT/SSA",
	"S_ASS",
	"S_SSA"
]);
function o(e) {
	return e.kind === "subtitle" && a.has(e.codecId.toUpperCase());
}
//#endregion
//#region src/worker/ebml-elements.ts
function s(e, t) {
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
function c(e, t) {
	if (t < 0 || t >= e.length) return null;
	let n = e[t];
	if (n === 0) return null;
	let r = 128, i = 1;
	for (; i <= 4 && !(n & r);) r >>= 1, i += 1;
	if (i > 4 || t + i >= e.length) return null;
	let a = 0;
	for (let n = 0; n < i; n += 1) a = a * 256 + e[t + n];
	let o = s(e, t + i);
	if (!o) return null;
	let c = t + i + o.length;
	if (o.unknown) return {
		id: a,
		data: c,
		size: -1,
		end: e.length,
		unknownSize: !0,
		truncated: !1
	};
	if (!Number.isSafeInteger(c + o.value)) return null;
	let l = c + o.value;
	return {
		id: a,
		data: c,
		size: o.value,
		end: l,
		unknownSize: !1,
		truncated: l > e.length
	};
}
function l(e, t, n, r) {
	let i = t, a = Math.min(n, e.length);
	for (; i < a;) {
		let t = c(e, i);
		if (!t || t.truncated || t.end > a || t.end <= i) return {
			complete: !1,
			consumed: i
		};
		r(t), i = t.end;
	}
	return {
		complete: i === a,
		consumed: i
	};
}
function u(e, t, n, r) {
	let i = t, a = Math.min(n, e.length);
	for (; i < a;) {
		let t = c(e, i);
		if (!t) return null;
		if (t.id === r) return t;
		if (t.truncated || t.unknownSize || t.end <= i) return null;
		i = t.end;
	}
	return null;
}
function d(e, t) {
	let n = 0;
	for (let r = t.data; r < Math.min(t.end, e.length); r += 1) n = n * 256 + e[r];
	return n;
}
function f(e, t) {
	let n = e[t] << 8 | e[t + 1];
	return n & 32768 ? n - 65536 : n;
}
function p(e, t) {
	return new TextDecoder().decode(e.subarray(t.data, Math.min(t.end, e.length))).replace(/\0+$/, "");
}
function m(e, t) {
	if (t.end > e.length) return 0;
	let n = new DataView(e.buffer, e.byteOffset + t.data, t.size);
	return t.size === 4 ? n.getFloat32(0) : t.size === 8 ? n.getFloat64(0) : d(e, t);
}
function h(e, t) {
	return e.slice(t.data, Math.min(t.end, e.length)).buffer;
}
//#endregion
//#region src/worker/ebml-block.ts
function g(e, t, n, r) {
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
function _(e, t, n, r) {
	let i = [], a = t, o = s(e, a);
	if (!o || a + o.length > n) return null;
	a += o.length, i.push(o.value);
	for (let t = 1; t < r; t += 1) {
		let t = s(e, a);
		if (!t || a + t.length > n) return null;
		a += t.length;
		let r = 2 ** (7 * t.length - 1) - 1, o = i[i.length - 1] + (t.value - r);
		if (o < 0) return null;
		i.push(o);
	}
	return {
		sizes: i,
		offset: a
	};
}
function v(e, t, n) {
	let r = Math.min(t.end, e.length);
	if (r - t.data < 4) return [];
	let i = s(e, t.data);
	if (!i || t.data + i.length + 3 > r) return [];
	let a = i.value;
	if (!n.trackIds.has(a)) return [];
	let o = f(e, t.data + i.length), c = e[t.data + i.length + 2], l = t.data + i.length + 3, u = (c & 6) >> 1, d = n.kind === "simple" ? !!(c & 128) : !n.groupHasReference, p = Math.round((n.clusterTime + o) * n.timecodeScale / 1e3), m = n.defaultDurations?.get(a), h = n.blockDurationTicks === void 0 ? void 0 : Math.round(n.blockDurationTicks * n.timecodeScale / 1e3);
	if (u === 0) return [{
		trackId: a,
		timestamp: p,
		duration: h === void 0 ? m === void 0 ? 0 : Math.round(m / 1e3) : h,
		key: d,
		data: e.slice(l, r)
	}];
	if (l >= r) return [];
	let v = e[l] + 1;
	if (v < 1) return [];
	let y = l + 1, b;
	if (u === 2) {
		let e = r - y;
		if (e <= 0 || e % v !== 0) return [];
		b = Array(v).fill(e / v);
	} else {
		let t = u === 1 ? g(e, y, r, v - 1) : _(e, y, r, v - 1);
		if (!t) return [];
		y = t.offset;
		let n = t.sizes.reduce((e, t) => e + t, 0), i = r - y;
		if (n > i) return [];
		b = [...t.sizes, i - n];
	}
	if (b.some((e) => e < 0)) return [];
	let x = h === void 0 ? m === void 0 ? 0 : Math.round(m / 1e3) : Math.round(h / v), S = [];
	for (let t = 0; t < b.length; t += 1) {
		let n = b[t];
		if (y + n > r) return [];
		S.push({
			trackId: a,
			timestamp: p + t * x,
			duration: x,
			key: d,
			data: e.slice(y, y + n)
		}), y += n;
	}
	return S;
}
//#endregion
//#region src/worker/ebml-probe.ts
var y = [
	26,
	69,
	223,
	163
];
function b(e) {
	return e.length >= y.length && y.every((t, n) => e[n] === t);
}
//#endregion
//#region src/worker/ebml.ts
var x = {
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
}, S = /* @__PURE__ */ new Set([
	x.timecode,
	22612,
	167,
	171,
	x.simpleBlock,
	x.blockGroup,
	175
]), C = [
	1048576,
	4194304,
	16777216
], w = 65536, T = 67108864, E = 2, D = 24, O = 4, k = 12, A = 262144, j = 8;
function M(e, n) {
	let r = 0, i = 0, a = "", o, s, c, u, f, g, _, v;
	l(e, n.data, n.end, (t) => {
		t.id === x.trackNumber ? r = d(e, t) : t.id === x.trackType ? i = d(e, t) : t.id === x.codecId ? a = p(e, t) : t.id === x.codecPrivate ? o = h(e, t) : t.id === x.language ? s = p(e, t) : t.id === x.name ? c = p(e, t) : t.id === x.defaultDuration ? v = d(e, t) : t.id === x.video ? l(e, t.data, t.end, (t) => {
			t.id === x.pixelWidth && (u = d(e, t)), t.id === x.pixelHeight && (f = d(e, t));
		}) : t.id === x.audio && l(e, t.data, t.end, (t) => {
			t.id === x.samplingFrequency && (g = Math.round(m(e, t))), t.id === x.channels && (_ = d(e, t));
		});
	});
	let y = i === 1 ? "video" : i === 2 ? "audio" : i === 17 ? "subtitle" : null;
	if (!r || !y || !a) return null;
	let b = {
		id: r,
		kind: y,
		codecId: a,
		codecPrivate: o,
		language: s,
		name: c,
		width: u,
		height: f,
		sampleRate: g,
		channels: _,
		defaultDurationNs: v
	};
	return b.codec = t(b) || void 0, b;
}
var N = class {
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
		let t = e.size ?? this.loader.totalSize ?? Infinity, n = /* @__PURE__ */ new Uint8Array(), r = null, i = !1;
		for (let e of C) {
			if (n = await this.loader.read(0, Math.min(e, t)), !b(n)) throw Error("MKV_EBML_HEADER_INVALID");
			if (r = u(n, 0, n.length, x.segment), !r) {
				if (!c(n, 0) || n.length >= t) throw Error("MKV_SEGMENT_NOT_FOUND");
				continue;
			}
			if (i = u(n, r.data, Math.min(r.end, n.length), x.tracks)?.truncated === !1, i || n.length >= t) break;
		}
		if (!r) throw Error("MKV_SEGMENT_NOT_FOUND");
		this.segmentDataStart = r.data, this.segmentEnd = r.unknownSize ? this.loader.totalSize ?? t : Math.min(r.data + r.size, this.loader.totalSize ?? Infinity);
		let a = 1e6, s = 0, f = [], p = null, h = null;
		if (l(n, r.data, Math.min(r.end, n.length), (e) => {
			e.id === x.info ? l(n, e.data, e.end, (e) => {
				e.id === x.timecodeScale && (a = d(n, e)), e.id === x.duration && (s = m(n, e));
			}) : e.id === x.tracks ? l(n, e.data, e.end, (e) => {
				if (e.id === x.trackEntry) {
					let t = M(n, e);
					t && f.push(t);
				}
			}) : e.id === x.cues ? p = e : e.id === x.seekHead && (h = e);
		}), !f.length) throw Error("MKV_TRACKS_NOT_FOUND");
		this.selected.clear();
		for (let e of ["video", "audio"]) {
			let t = f.find((t) => t.kind === e);
			t && this.selected.add(t.id);
		}
		f.filter(o).forEach((e) => this.selected.add(e.id)), this.defaultDurations = new Map(f.filter((e) => e.defaultDurationNs).map((e) => [e.id, e.defaultDurationNs])), this.metadata = {
			tracks: f,
			duration: s ? s * a / 1e9 : 0,
			timecodeScale: a
		}, p ? this.parseCues(n, p, a) : h && await this.loadCuesViaSeekHead(n, h, a);
		let g = await this.locateFirstCluster(n, r);
		if (g < 0) throw Error("MKV_NO_CLUSTER");
		return this.firstClusterOffset = g, this.cursor = g, this.atEnd = !1, this.metadata;
	}
	async locateFirstCluster(e, t) {
		let n = e, r = 0, i = t.data, a = 0;
		for (; i < this.segmentEnd && a < 4096;) {
			if (a += 1, i < r || i - r + 16 > n.length) {
				let e = await this.loader.readWindow(i, w);
				if (n = e.bytes, r = e.base, i - r >= n.length) return -1;
			}
			let e = c(n, i - r);
			if (!e) return -1;
			if (e.id === x.cluster) return i;
			if (e.unknownSize) return -1;
			e.id === x.cues && !this.cues.length && !e.truncated && this.parseCues(n, e, this.metadata?.timecodeScale ?? 1e6);
			let t = r + e.end;
			if (t <= i) return -1;
			i = t;
		}
		return -1;
	}
	async loadCuesViaSeekHead(e, t, n) {
		let r = -1;
		if (l(e, t.data, t.end, (t) => {
			if (t.id !== x.seek) return;
			let n = 0, i = -1;
			l(e, t.data, t.end, (t) => {
				t.id === x.seekId && (n = d(e, t)), t.id === x.seekPosition && (i = d(e, t));
			}), n === x.cues && i >= 0 && (r = i);
		}), r < 0) return;
		let i = this.segmentDataStart + r;
		try {
			let { bytes: e, base: t } = await this.loader.readWindow(i, w), r = c(e, i - t);
			if (!r || r.id !== x.cues) return;
			let a = r.end - (i - t), o = r.truncated ? await this.loader.readWindow(i, a) : {
				bytes: e,
				base: t
			}, s = c(o.bytes, i - o.base);
			s && s.id === x.cues && !s.truncated && this.parseCues(o.bytes, s, n);
		} catch {}
	}
	parseCues(e, t, n) {
		let r = [];
		l(e, t.data, Math.min(t.end, e.length), (t) => {
			if (t.id !== x.cuePoint) return;
			let i = 0;
			l(e, t.data, t.end, (t) => {
				if (t.id === x.cueTime && (i = d(e, t)), t.id === x.cueTrackPositions) {
					let a = 0, o = -1;
					l(e, t.data, t.end, (t) => {
						t.id === x.cueTrack && (a = d(e, t)), t.id === x.cueClusterPosition && (o = d(e, t));
					}), o >= 0 && r.push({
						time: i * n / 1e9,
						offset: this.segmentDataStart + o,
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
		if (n && e - n.time <= O) return n.offset;
		let r = n?.offset ?? this.firstClusterOffset, i = await this.scanForCluster(e, n?.time ?? 0, r);
		return i >= 0 ? i : r;
	}
	async scanForCluster(e, t, n) {
		let r = Number.isFinite(this.segmentEnd) ? this.segmentEnd : this.loader.totalSize ?? 0;
		if (!r || r <= n) return -1;
		let i = n, a = r, o = t <= e ? n : -1;
		for (let t = 0; t < k && i < a; t += 1) {
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
		for (let e = 0; e < j && n < t; e += 1) {
			let { bytes: e, base: t } = await this.loader.readWindow(n, A), r = n - t;
			if (r >= e.length) return null;
			for (let n = r; n + 4 <= e.length; n += 1) {
				if (e[n] !== 31 || e[n + 1] !== 67 || e[n + 2] !== 182 || e[n + 3] !== 117) continue;
				let r = c(e, n);
				if (!r || r.id !== x.cluster) continue;
				let i = -1;
				if (l(e, r.data, Math.min(r.end, e.length), (t) => {
					i < 0 && t.id === x.timecode && (i = d(e, t));
				}), i < 0) continue;
				let a = t + n, o = i * (this.metadata?.timecodeScale ?? 1e6) / 1e9;
				return this.recordCluster(a, o), {
					offset: a,
					time: o
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
			if (i.truncated || e.length && (t >= D || r - n >= E)) break;
		}
		return this.cursor >= this.segmentEnd && (this.atEnd = !0), e;
	}
	select(e, t) {
		this.metadata?.tracks.find((n) => n.id === t && n.kind === e) && e !== "subtitle" && (this.metadata?.tracks.filter((t) => t.kind === e).forEach((e) => this.selected.delete(e.id)), this.selected.add(t));
	}
	async readClusterAt(e) {
		let { bytes: t, base: n } = await this.loader.readWindow(e, w), r = e - n;
		if (r >= t.length) return {
			packets: [],
			nextOffset: this.segmentEnd,
			truncated: !0
		};
		let i = c(t, r);
		if (!i) throw Error("MKV_CLUSTER_HEADER_INVALID");
		if (i.id !== x.cluster) return i.unknownSize ? {
			packets: [],
			nextOffset: this.segmentEnd,
			truncated: !1
		} : {
			packets: [],
			nextOffset: n + i.end,
			truncated: !1
		};
		if (i.unknownSize) return this.readUnboundedCluster(e);
		let a = i.data - r + i.size;
		if (e + a > this.segmentEnd) {
			let n = Math.min(t.length - r, Math.max(0, this.segmentEnd - e));
			return {
				packets: this.parseClusterBody(t, r, r + n, e),
				nextOffset: this.segmentEnd,
				truncated: !0
			};
		}
		if (a > t.length - r) {
			let i = await this.loader.readWindow(e, a);
			if (t = i.bytes, n = i.base, r = e - n, a > t.length - r) {
				let n = Math.max(0, t.length - r);
				return {
					packets: this.parseClusterBody(t, r, r + n, e),
					nextOffset: this.segmentEnd,
					truncated: !0
				};
			}
		}
		return {
			packets: this.parseClusterBody(t, r, r + a, e),
			nextOffset: e + a,
			truncated: !1
		};
	}
	async readUnboundedCluster(e) {
		let t = w;
		for (;;) {
			let { bytes: n, base: r } = await this.loader.readWindow(e, t), i = e - r, a = c(n, i);
			if (!a) throw Error("MKV_CLUSTER_HEADER_INVALID");
			let o = a.data, s = -1, l = !1;
			for (; o < n.length;) {
				let e = c(n, o);
				if (!e) {
					l = !0;
					break;
				}
				if (!S.has(e.id)) {
					s = o;
					break;
				}
				if (e.truncated) {
					l = !0;
					break;
				}
				o = e.end;
			}
			if (s < 0 && l && n.length - i >= t && t < T) {
				t *= 4;
				continue;
			}
			let u = s >= 0 ? s : Math.min(o, n.length);
			if (s < 0 && t >= T) throw Error("MKV_CLUSTER_UNBOUNDED");
			return {
				packets: this.parseClusterBody(n, i, u, e),
				nextOffset: r + u,
				truncated: !1
			};
		}
	}
	parseClusterBody(e, t, n, r) {
		let i = c(e, t);
		if (!i) return [];
		let a = 0, o = [], s = new Set(this.selected), u = this.metadata?.timecodeScale || 1e6;
		return l(e, i.data, Math.min(n, e.length), (t) => {
			if (t.id === x.timecode) {
				a = d(e, t), this.recordCluster(r, a * u / 1e9);
				return;
			}
			if (t.id === x.simpleBlock) {
				o.push(...v(e, t, {
					clusterTime: a,
					timecodeScale: u,
					trackIds: s,
					kind: "simple",
					defaultDurations: this.defaultDurations
				}));
				return;
			}
			if (t.id === x.blockGroup) {
				let n = !1, r;
				l(e, t.data, t.end, (t) => {
					t.id === x.referenceBlock && (n = !0), t.id === x.blockDuration && (r = d(e, t));
				}), l(e, t.data, t.end, (t) => {
					t.id === x.block && o.push(...v(e, t, {
						clusterTime: a,
						timecodeScale: u,
						trackIds: s,
						kind: "group",
						groupHasReference: n,
						blockDurationTicks: r,
						defaultDurations: this.defaultDurations
					}));
				});
			}
		}), o;
	}
	recordCluster(e, t) {
		this.clusterIndex.some((t) => t.offset === e) || (this.clusterIndex.push({
			offset: e,
			time: t
		}), this.clusterIndex.sort((e, t) => e.offset - t.offset));
	}
}, P = 1048576, F = 134217728, I = 4, L = 536870912, R = 200, z = class {
	source;
	chunkSize;
	fetcher;
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
	constructor(e, t = P, n = (e, t) => fetch(e, t)) {
		this.source = e, this.chunkSize = t, this.fetcher = n;
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
			e = await this.fetcher(this.source.url, {
				method: "HEAD",
				mode: "cors",
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
			let e = await this.fetcher(this.source.url, {
				headers: { Range: "bytes=0-0" },
				mode: "cors",
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
		return a ? a.slice(e, e + n) : (this.prefetch(i + 1, i + I), this.assemble(e, n));
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
			if (o.byteLength > L) throw Error("RANGE_UNSUPPORTED:服务器忽略 Range 且文件过大");
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
			let n = await this.fetcher(t, {
				headers: e,
				mode: "cors",
				redirect: "follow"
			});
			if (n.status >= 500 && r === 0) {
				await B(R);
				continue;
			}
			return n;
		} catch (e) {
			n = e, r === 0 && await B(R);
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
		for (; this.cachedBytes > F;) {
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
function B(e) {
	return new Promise((t) => setTimeout(t, e));
}
//#endregion
//#region src/lib/direct-media.ts
function V(e) {
	let t = 0, n = !1, r = /* @__PURE__ */ new Map();
	return e.onmessage = (e) => {
		let t = e.data, n = t && r.get(t.id);
		if (n) {
			if (r.delete(t.id), !t.ok) {
				n.reject(TypeError(t.error));
				return;
			}
			n.resolve(new Response(t.body, {
				status: t.status,
				statusText: t.statusText,
				headers: t.headers
			}));
		}
	}, e.start(), {
		fetch: (i, a = {}) => {
			if (n) return Promise.reject(/* @__PURE__ */ TypeError("FETCH_BRIDGE_CLOSED"));
			let o = ++t, s = {
				id: o,
				url: i,
				init: {
					method: a.method,
					headers: Array.from(new Headers(a.headers).entries()),
					mode: a.mode,
					redirect: a.redirect,
					cache: a.cache
				}
			};
			return new Promise((t, n) => {
				r.set(o, {
					resolve: t,
					reject: n
				}), e.postMessage(s);
			});
		},
		close() {
			n || (n = !0, r.forEach(({ reject: e }) => e(/* @__PURE__ */ TypeError("FETCH_BRIDGE_CLOSED"))), r.clear(), e.close());
		}
	};
}
//#endregion
//#region src/worker/demux.worker.ts
var H = null, U = !1, W = null, G = 0, K = Promise.resolve();
function q(e) {
	if (e.type === "packets") {
		let t = e.packets.map((e) => e.data.buffer);
		self.postMessage(e, t);
	} else self.postMessage(e);
}
self.onmessage = (e) => {
	let t = e.data;
	t.type === "init" ? G = 0 : "epoch" in t && t.epoch > G && (G = t.epoch), K = K.then(() => J(t)).catch(() => void 0);
};
async function J(e) {
	let t = "epoch" in e ? e.epoch : 0;
	try {
		if (e.type === "init") {
			U = !1, W?.close(), W = e.fetchPort ? V(e.fetchPort) : null;
			let t = new z(e.source, void 0, W?.fetch);
			H = new N(t), q({
				type: "progress",
				phase: "加载 TypeScript 解封装器",
				value: .08
			}), q({
				type: "progress",
				phase: "读取 Matroska 头部",
				value: .1
			}), q({
				type: "metadata",
				metadata: await H.init(),
				probe: t.probeInfo
			}), q({
				type: "progress",
				phase: "解析首个 Cluster",
				value: .35
			});
			let n = await H.packetsFor(0);
			U = !0, q({
				type: "packets",
				packets: n,
				epoch: 0
			});
			return;
		}
		if (!H || !U) {
			(e.type === "next" || e.type === "seek" || e.type === "select-track") && q({
				type: "packets",
				packets: [],
				epoch: t
			});
			return;
		}
		if (t < G && (e.type === "next" || e.type === "seek")) return;
		if (e.type === "seek") q({
			type: "progress",
			phase: "定位关键帧",
			value: .2
		}), q({
			type: "packets",
			packets: await H.packetsFor(e.time),
			epoch: t
		});
		else if (e.type === "next") {
			let e = await H.next();
			e.length ? q({
				type: "packets",
				packets: e,
				epoch: t
			}) : H.endOfStream ? q({
				type: "eof",
				epoch: t
			}) : q({
				type: "packets",
				packets: [],
				epoch: t
			});
		} else e.type === "select-track" ? (H.select(e.kind, e.trackId), e.kind === "subtitle" ? q({
			type: "packets",
			packets: [],
			epoch: t
		}) : q({
			type: "packets",
			packets: await H.packetsFor(e.time),
			epoch: t
		})) : e.type === "close" && (H = null, U = !1, W?.close(), W = null, q({
			type: "eof",
			epoch: t
		}));
	} catch (e) {
		q({
			type: "error",
			code: e instanceof Error ? e.message.split(":")[0] : "DEMUX_ERROR",
			message: e instanceof Error ? e.message : "Matroska 解析失败"
		});
	}
}
//#endregion

//# sourceMappingURL=mx-player-worker.js.map