import { defineComponent, h, onBeforeUnmount, onMounted, ref, watch, type PropType } from 'vue'
import { MXPlayer, type MXPlayerOptions, type MXPlayerState } from '../sdk/MXPlayer'
import type { TrackInfo } from '../types'

/**
 * Vue 3 组件封装。
 *
 * 组件只负责生命周期与 prop 同步，播放逻辑全部在 MXPlayer 内。
 * 通过 ref 可以拿到 player 实例调用命令式 API。
 */
export const MxPlayer = defineComponent({
  name: 'MxPlayer',
  props: {
    url: { type: String, default: undefined },
    file: { type: Object as PropType<File>, default: undefined },
    format: { type: String as PropType<'auto' | 'mkv' | 'hls' | 'native'>, default: 'auto' },
    hls: { type: Object as PropType<{ lowLatencyMode?: boolean; withCredentials?: boolean; maxBufferLength?: number }>, default: undefined },
    autoplay: { type: Boolean, default: false },
    muted: { type: Boolean, default: false },
    volume: { type: Number, default: 0.85 },
    localPlayback: { type: Boolean, default: false },
    workerUrl: { type: String, default: undefined },
    /** @deprecated 0.x 兼容参数，播放器已不再加载 WASM。 */
    wasmBaseUrl: { type: String, default: undefined },
    /** 自适应宽度，宽高比 16:9 */
    fluid: { type: Boolean, default: true },
  },
  emits: ['ready', 'play', 'pause', 'timeupdate', 'ended', 'error'],
  setup(props, { emit, expose }) {
    const container = ref<HTMLElement | null>(null)
    const player = ref<MXPlayer | null>(null)

    onMounted(() => {
      if (!container.value) return
      const options: MXPlayerOptions = {
        playerElm: container.value,
        url: props.url,
        file: props.file,
        format: props.format,
        hls: props.hls,
        autoplay: props.autoplay,
        muted: props.muted,
        volume: props.volume,
        localPlayback: props.localPlayback,
        workerUrl: props.workerUrl,
        wasmBaseUrl: props.wasmBaseUrl,
      }
      const instance = new MXPlayer(options)
      instance.on('ready', (payload) => emit('ready', payload))
      instance.on('play', () => emit('play'))
      instance.on('pause', () => emit('pause'))
      instance.on('timeupdate', (payload) => emit('timeupdate', payload))
      instance.on('ended', () => emit('ended'))
      instance.on('error', (payload) => emit('error', payload))
      player.value = instance
    })

    // 换源要走 load()，重建实例会白白丢掉已缓存的分片。
    watch(() => props.url, (next) => {
      if (next && player.value) void player.value.load({ kind: 'url', url: next, format: props.format })
    })
    watch(() => props.format, (next) => {
      if (props.url && player.value) void player.value.load({ kind: 'url', url: props.url, format: next })
    })
    watch(() => props.file, (next) => {
      if (next && player.value) void player.value.load({ kind: 'file', file: next })
    })
    watch(() => props.volume, (next) => player.value?.setVolume(next))
    watch(() => props.muted, (next) => player.value?.setMuted(next))

    onBeforeUnmount(() => {
      player.value?.destroy()
      player.value = null
    })

    expose({
      play: () => player.value?.play(),
      pause: () => player.value?.pause(),
      toggle: () => player.value?.toggle(),
      seek: (time: number) => player.value?.seek(time),
      setVolume: (value: number) => player.value?.setVolume(value),
      setMuted: (value: boolean) => player.value?.setMuted(value),
      setPlaybackRate: (rate: number) => player.value?.setPlaybackRate(rate),
      requestFullscreen: () => player.value?.requestFullscreen(),
      requestPictureInPicture: () => player.value?.requestPictureInPicture(),
      getState: (): MXPlayerState | undefined => player.value?.getState(),
      getTracks: (): TrackInfo[] => player.value?.tracks ?? [],
      get player() { return player.value },
    })

    return () => h('div', {
      ref: container,
      class: 'mxplayer-container',
      style: props.fluid
        ? { width: '100%', aspectRatio: '16 / 9', background: '#000' }
        : { background: '#000' },
    })
  },
})

export default MxPlayer
