import { TrendingUp, TrendingDown } from 'lucide-react'

export default function Sparkline({ data, showTrendIcon = true }: { data: number[]; showTrendIcon?: boolean }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / range) * 24}`).join(' ')
  const up = data[data.length - 1]! >= data[0]!
  const color = up ? '#16A34A' : '#DC2626'
  return (
    <div className="flex items-center gap-1.5">
      <svg viewBox="0 0 100 28" className="w-16 h-7" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {showTrendIcon && (
        <span className="flex items-center gap-0.5 text-[11px] font-semibold" style={{ color }}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        </span>
      )}
    </div>
  )
}
