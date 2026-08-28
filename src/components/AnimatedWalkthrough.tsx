import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

export interface WalkthroughScene {
  id: string
  caption: string
  durationSeconds: number
  render: () => ReactNode
}

const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

// Prefer an Indian-English system voice when one is installed, since that's what the
// person asked for; otherwise fall back gracefully. Voice *quality* itself is entirely
// up to the browser/OS's built-in speech engine — this only controls which installed
// voice gets used, it can't improve the engine itself.
function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const byLangIN = voices.find((v) => v.lang?.toLowerCase() === 'en-in')
  if (byLangIN) return byLangIN
  const byNameIN = voices.find((v) => /india|hindi|veena|rishi|neerja/i.test(v.name))
  if (byNameIN) return byNameIN
  return voices.find((v) => v.lang?.toLowerCase() === 'en-gb') ?? voices.find((v) => v.lang?.toLowerCase().startsWith('en'))
}

// Split a caption into short clauses so narration gets a natural breathing rhythm
// (brief pause at each clause) instead of one flat, machine-paced sentence.
function splitClauses(text: string): string[] {
  return text.split(/(?<=[,;:])\s+|(?<=[.!?])\s+(?=\S)/).filter(Boolean)
}

// A very small procedural ambient bed — two detuned low tones through a filter with a
// slow gain swell — generated entirely in the browser, not a recording of anything.
class AmbientBed {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null

  start() {
    if (this.ctx) return
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()
    const master = ctx.createGain()
    master.gain.value = 0.035
    master.connect(ctx.destination)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 900
    filter.connect(master)

    const freqs = [110, 164.81] // A2 + E3 — a calm open fifth
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = f
      osc.detune.value = i === 0 ? -4 : 4
      osc.connect(filter)
      osc.start()
    })

    // slow LFO swelling the master gain for a gentle "breathing" pad rather than a flat drone
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.07
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.015
    lfo.connect(lfoGain)
    lfoGain.connect(master.gain)
    lfo.start()

    this.ctx = ctx
    this.master = master
  }

  setMuted(muted: boolean) {
    if (this.master) this.master.gain.value = muted ? 0 : 0.035
  }

  stop() {
    this.ctx?.close()
    this.ctx = null
    this.master = null
  }
}

export default function AnimatedWalkthrough({
  scenes, speed = 1, onSceneChange,
}: { scenes: WalkthroughScene[]; speed?: number; onSceneChange?: (index: number) => void }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [sceneProgress, setSceneProgress] = useState(0) // 0..1 within current scene
  const [muted, setMuted] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const pausedAtRef = useRef<number>(0)
  const elapsedMsRef = useRef<number>(0)
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])
  const bedRef = useRef<AmbientBed | null>(null)

  const scene = scenes[Math.min(index, scenes.length - 1)] ?? scenes[0]!
  const totalDuration = scenes.reduce((sum, s) => sum + s.durationSeconds, 0)
  const elapsedBefore = scenes.slice(0, index).reduce((sum, s) => sum + s.durationSeconds, 0)

  useEffect(() => {
    onSceneChange?.(index)
  }, [index, onSceneChange])

  // Load available system voices (async on some browsers).
  useEffect(() => {
    if (!speechSupported) return
    function loadVoices() { voicesRef.current = window.speechSynthesis.getVoices() }
    loadVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  // Background ambient bed — starts once, follows play/pause and mute state.
  useEffect(() => {
    if (!bedRef.current) bedRef.current = new AmbientBed()
    return () => bedRef.current?.stop()
  }, [])
  useEffect(() => {
    if (!bedRef.current) return
    if (playing) bedRef.current.start()
    bedRef.current.setMuted(muted || !playing)
  }, [playing, muted])

  // Narration — spoken via the browser's built-in speech engine, synced to the
  // caption already on screen, using an Indian-English voice when available and
  // clause-by-clause pacing for a more natural rhythm. No external audio files.
  useEffect(() => {
    if (!speechSupported) return
    window.speechSynthesis.cancel()
    if (!playing || muted) return
    const voice = pickVoice(voicesRef.current)
    const clauses = splitClauses(scene.caption)
    clauses.forEach((clause) => {
      const utterance = new SpeechSynthesisUtterance(clause)
      if (voice) utterance.voice = voice
      utterance.lang = voice?.lang ?? 'en-IN'
      utterance.rate = Math.min(1.15, Math.max(0.45, 0.92 * speed))
      utterance.pitch = 1.02
      utterance.volume = 1
      window.speechSynthesis.speak(utterance)
    })
    return () => window.speechSynthesis.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.id, playing, muted, speed])

  useEffect(() => () => { if (speechSupported) window.speechSynthesis.cancel() }, [])

  useEffect(() => {
    if (!playing) return
    startRef.current = performance.now() - pausedAtRef.current
    function tick(now: number) {
      const elapsedMs = now - startRef.current
      elapsedMsRef.current = elapsedMs
      const elapsed = elapsedMs / 1000
      const durAdj = scene.durationSeconds / speed
      const p = Math.min(1, elapsed / durAdj)
      setSceneProgress(p)
      if (p >= 1) {
        pausedAtRef.current = 0
        if (index < scenes.length - 1) {
          setIndex((i) => i + 1)
        } else {
          setPlaying(false)
        }
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, speed])

  function goTo(i: number) {
    pausedAtRef.current = 0
    setSceneProgress(0)
    setIndex(Math.max(0, Math.min(scenes.length - 1, i)))
  }

  function togglePlay() {
    if (!playing) {
      if (sceneProgress >= 1) goTo(0)
      setPlaying(true)
    } else {
      // Capture exactly how far into this scene we are so resuming continues
      // from here instead of restarting the scene's timer from zero.
      pausedAtRef.current = elapsedMsRef.current
      setPlaying(false)
    }
  }

  function restart() {
    goTo(0)
    setPlaying(true)
  }

  const overallProgress = ((elapsedBefore + scene.durationSeconds * sceneProgress) / totalDuration) * 100

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] [background-size:26px_26px]" />

      {speechSupported && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="absolute top-2 right-2 text-white/80 hover:text-white bg-black/25 hover:bg-black/40 rounded-full p-1.5 z-10"
          title={muted ? 'Unmute narration & music' : 'Mute narration & music'}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      )}

      <div key={scene.id} className="relative flex flex-col items-center gap-4 text-white px-6" style={{ animation: 'fade-in 0.35s ease' }}>
        <div className="text-white [&_svg]:drop-shadow-sm">{scene.render()}</div>
        <div className="max-w-sm text-center text-sm font-medium bg-black/25 backdrop-blur-sm rounded-lg px-3 py-1.5">
          {scene.caption}
        </div>
      </div>

      {/* controls */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-6 bg-gradient-to-t from-black/50 to-transparent">
        <div className="h-1 rounded-full bg-white/25 mb-2 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-[width]" style={{ width: `${overallProgress}%` }} />
        </div>
        <div className="flex items-center justify-center gap-3">
          <button type="button" onClick={() => goTo(index - 1)} className="text-white/80 hover:text-white">
            <SkipBack size={16} />
          </button>
          <button type="button" onClick={togglePlay} className="text-white bg-white/20 hover:bg-white/30 rounded-full p-1.5">
            {playing && sceneProgress < 1 ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button type="button" onClick={() => goTo(index + 1)} className="text-white/80 hover:text-white">
            <SkipForward size={16} />
          </button>
          <button type="button" onClick={restart} className="text-white/60 hover:text-white ml-1">
            <RotateCcw size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
