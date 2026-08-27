import { useState } from 'react'
import type { Video } from '../types/domain'

export default function VideoPlayer({ video }: { video: Video }) {
  const [speed, setSpeed] = useState(1)

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="aspect-video bg-slate-900 flex items-center justify-center text-slate-400 text-sm">
        {video.sourceUrl
          ? <video src={video.sourceUrl} controls className="w-full h-full" />
          : 'Video source pending — draft content'}
      </div>
      <div className="p-4 flex items-center justify-between text-sm">
        <div>
          <div className="font-medium text-slate-900">{video.title}</div>
          <div className="text-xs text-slate-500">{Math.round(video.durationSeconds / 60)} min</div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500">Speed</label>
          <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="border border-slate-300 rounded px-2 py-1 text-xs">
            {[0.75, 1, 1.25, 1.5, 2].map((s) => <option key={s} value={s}>{s}×</option>)}
          </select>
        </div>
      </div>
      {video.chapters.length > 0 && (
        <div className="border-t border-slate-100 px-4 py-3">
          <div className="text-xs font-medium text-slate-500 mb-2">Chapters</div>
          <div className="flex flex-wrap gap-2">
            {video.chapters.map((c) => (
              <span key={c.id} className="text-xs px-2 py-1 bg-slate-50 border border-slate-200 rounded">
                {c.title} · {Math.floor(c.startSeconds / 60)}:{String(c.startSeconds % 60).padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
