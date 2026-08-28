export default function BeatMetronome({ color, bpm = 110 }: { color: string; bpm?: number }) {
  const period = 60 / bpm
  return (
    <div className="flex items-center gap-2.5 py-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color, animation: `beat-dot ${period}s ease-in-out ${i * period * 0.125}s infinite` }}
        />
      ))}
      <span className="text-[11px] font-semibold ml-1" style={{ color }}>~{bpm} bpm</span>
    </div>
  )
}
