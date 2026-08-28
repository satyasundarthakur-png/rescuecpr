// Original implementation. Renders a continuously scrolling ECG-style trace by
// tiling one waveform segment twice inside a wider SVG and animating its
// horizontal position — a generic, widely-used web animation technique
// (not any specific published clinical rhythm strip).

export type EcgPattern = 'sinus' | 'vf' | 'vt' | 'asystole' | 'pea'

const SEGMENTS: Record<EcgPattern, string> = {
  sinus: '0,25 10,25 14,15 18,25 24,25 28,8 32,38 36,25 46,25 54,25',
  vf: '0,25 4,10 8,36 12,14 16,30 20,6 24,40 28,18 32,32 36,10 40,26 44,12 48,36 52,20 56,30',
  vt: '0,25 8,25 14,4 20,46 26,4 32,46 38,4 44,46 50,25 56,25',
  asystole: '0,25 56,25',
  pea: '0,25 16,25 20,19 24,29 28,25 44,25 48,19 52,29 56,25',
}

export default function EcgTrace({
  pattern, className = '', color = 'currentColor', animated = true,
}: { pattern: EcgPattern; className?: string; color?: string; animated?: boolean }) {
  const seg = SEGMENTS[pattern]
  // duplicate the segment shifted by its own width (56 units) so the two
  // copies tile seamlessly, then animate a -50% translateX to loop forever
  const segWidth = 56
  const shifted = seg.split(' ').map((pt) => {
    const [x, y] = pt.split(',')
    return `${Number(x) + segWidth},${y}`
  }).join(' ')

  return (
    <div className={`overflow-hidden ${className}`}>
      <svg viewBox="0 0 112 50" width="200%" height="100%" preserveAspectRatio="none"
           style={animated ? { animation: 'ecg-scroll 2.4s linear infinite' } : undefined}>
        <polyline points={seg} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={shifted} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
