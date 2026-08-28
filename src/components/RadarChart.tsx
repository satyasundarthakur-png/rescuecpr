export interface RadarAxis {
  label: string
  value: number // 0-100
}

export default function RadarChart({
  axes, size = 280, color = '#DC2626', maxValue = 100,
}: { axes: RadarAxis[]; size?: number; color?: string; maxValue?: number }) {
  const center = size / 2
  const radius = size / 2 - 40
  const n = axes.length
  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2

  const pointFor = (i: number, value: number) => {
    const r = (Math.min(value, maxValue) / maxValue) * radius
    const angle = angleFor(i)
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)] as const
  }

  const dataPoints = axes.map((a, i) => pointFor(i, a.value))
  const dataPath = dataPoints.map((p) => p.join(',')).join(' ')

  const rings = [0.25, 0.5, 0.75, 1]

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* background rings */}
      {rings.map((r) => {
        const pts = axes.map((_, i) => {
          const [x, y] = pointFor(i, r * maxValue)
          return `${x},${y}`
        }).join(' ')
        return <polygon key={r} points={pts} fill="none" stroke="#E2E8F0" strokeWidth="1" />
      })}
      {/* spokes */}
      {axes.map((_, i) => {
        const [x, y] = pointFor(i, maxValue)
        return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#E2E8F0" strokeWidth="1" />
      })}
      {/* data polygon */}
      <polygon points={dataPath} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill={color} />
      ))}
      {/* labels */}
      {axes.map((a, i) => {
        const [x, y] = pointFor(i, maxValue * 1.24)
        return (
          <text key={a.label} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontWeight="600" fill="#475569" fontFamily="Arial, sans-serif">
            {a.label}
          </text>
        )
      })}
    </svg>
  )
}
