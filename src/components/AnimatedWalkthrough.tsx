import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

export interface WalkthroughScene {
  id: string
  caption: string
  durationSeconds: number
  render: () => ReactNode
}

const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

export default function AnimatedWalkthrough({
  scenes, speed = 1, accent = '#DC2626', onSceneChange,
}: { scenes: WalkthroughScene[]; speed?: number; accent?: string; onSceneChange?: (index: number) => void }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [sceneProgress, setSceneProgress] = useState(0) // 0..1 within current scene
  const [muted, setMuted] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const pausedAtRef = useRef<number>(0)

  const scene = scenes[Math.min(index, scenes.length - 1)] ?? scenes[0]!
  const totalDuration = scenes.reduce((sum, s) => sum + s.durationSeconds, 0)
  const elapsedBefore = scenes.slice(0, index).reduce((sum, s) => sum + s.durationSeconds, 0)

  useEffect(() => {
    onSceneChange?.(index)
  }, [index, onSceneChange])

  // Narration — spoken via the browser's built-in speech engine, synced to the
  // caption already on screen. No external audio files or generated voice assets.
  useEffect(() => {
    if (!speechSupported) return
    window.speechSynthesis.cancel()
    if (!playing || muted) return
    const utterance = new SpeechSynthesisUtterance(scene.caption)
    utterance.rate = Math.min(2, Math.max(0.5, speed))
    utterance.pitch = 1
    utterance.volume = 1
    window.speechSynthesis.speak(utterance)
    return () => window.speechSynthesis.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.id, playing, muted, speed])

  useEffect(() => () => { if (speechSupported) window.speechSynthesis.cancel() }, [])

  useEffect(() => {
    if (!playing) return
    startRef.current = performance.now() - pausedAtRef.current
    function tick(now: number) {
      const elapsed = (now - startRef.current) / 1000
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
    if (!playing && sceneProgress >= 1) {
      goTo(0)
    }
    setPlaying((p) => !p)
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
          title={muted ? 'Unmute narration' : 'Mute narration'}
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
