import { useState } from 'react'
import { Heart, Play } from 'lucide-react'
import type { Video } from '../types/domain'

const SPEEDS = [0.75, 1, 1.25, 1.5, 2]

export default function VideoPlayer({ video }: { video: Video }) {
  const [speed, setSpeed] = useState(1)
  const [activeChapter, setActiveChapter] = useState(0)

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="relative aspect-video bg-gradient-to-br from-clinical-700 via-clinical-600 to-brand-blue-700 flex items-center justify-center overflow-hidden">
        {video.sourceUrl ? (
          <video src={video.sourceUrl} controls className="w-full h-full" />
        ) : (
          <>
            <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] [background-size:26px_26px]" />
            <div className="relative flex flex-col items-center gap-3 text-white">
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white/25 animate-ping" />
                <span className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm">
                  <Heart size={26} className="animate-pulse" fill="currentColor" />
                </span>
              </span>
              <div className="text-sm font-medium text-white/90">Video coming soon</div>
              <div className="text-xs text-white/60">Interactive walkthrough is in production</div>
              <button
                type="button"
                className="mt-1 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white hover:bg-white/25 transition-colors"
              >
                <Play size={12} fill="currentColor" /> Preview outline
              </button>
            </div>
          </>
        )}
      </div>

      <div className="p-4 flex items-center justify-between text-sm">
        <div>
          <div className="font-medium text-slate-900">{video.title}</div>
          <div className="text-xs text-slate-500">{Math.round(video.durationSeconds / 60)} min</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Speed</span>
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5">
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  speed === s
                    ? 'bg-clinical-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-clinical-700 hover:bg-white'
                }`}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>
      </div>

      {video.chapters.length > 0 && (
        <div className="border-t border-slate-100 px-4 py-4">
          <div className="text-xs font-medium text-slate-500 mb-3">Chapters</div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-3 h-1 rounded-full bg-slate-100" />
            <div
              className="absolute left-0 top-3 h-1 rounded-full bg-gradient-to-r from-clinical-500 to-gold-500 transition-all"
              style={{ width: `${(activeChapter / Math.max(video.chapters.length - 1, 1)) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {video.chapters.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveChapter(i)}
                  className="group flex flex-col items-center gap-2 flex-1"
                >
                  <span
                    className={`h-3 w-3 rounded-full border-2 transition-all ${
                      i <= activeChapter
                        ? 'bg-clinical-600 border-clinical-600 shadow-[0_0_0_4px_oklch(0.54_0.21_27_/_15%)]'
                        : 'bg-white border-slate-300 group-hover:border-clinical-400'
                    }`}
                  />
                  <span className={`text-[11px] text-center leading-tight px-1 ${i === activeChapter ? 'text-clinical-700 font-medium' : 'text-slate-500'}`}>
                    {c.title}
                    <br />
                    <span className="text-slate-400">{Math.floor(c.startSeconds / 60)}:{String(c.startSeconds % 60).padStart(2, '0')}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
