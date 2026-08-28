import type { CSSProperties } from 'react'

type IconProps = { className?: string; style?: CSSProperties }

// Hand placement + arm-lock posture + depth gauge, on a torso silhouette.
export function CompressionTechniqueIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 140 120" className={className} style={style} fill="none">
      {/* torso */}
      <path d="M30 40 C 30 20 50 10 70 10 C 90 10 110 20 110 40 L 110 100 C 110 110 100 116 70 116 C 40 116 30 110 30 100 Z"
            stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" opacity="0.45" />
      {/* sternum guide line */}
      <line x1="70" y1="22" x2="70" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" opacity="0.35" />
      {/* locked arms, straight, hands stacked at lower sternum */}
      <path d="M12 6 L62 66" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M128 6 L78 66" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      {/* stacked hands */}
      <ellipse cx="70" cy="70" rx="16" ry="9" fill="currentColor" opacity="0.9" />
      <ellipse cx="70" cy="66" rx="13" ry="7" fill="currentColor" opacity="0.6" />
      {/* depth gauge */}
      <line x1="100" y1="66" x2="100" y2="96" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
      <path d="M96 66 L100 60 L104 66" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M96 96 L100 102 L104 96" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <text x="112" y="84" fontSize="9" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">5-6cm</text>
    </svg>
  )
}

export function EndotrachealTubeIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <path d="M20 20 C 40 30 55 45 62 65 L 74 80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="66" cy="70" rx="9" ry="6" transform="rotate(35 66 70)" fill="currentColor" opacity="0.35" />
      <circle cx="78" cy="84" r="7" stroke="currentColor" strokeWidth="3.5" />
      <path d="M16 16 l8 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function TensionPneumoIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <path d="M50 18 C 36 18 32 32 32 46 C 20 48 16 60 20 72 C 24 82 36 84 42 76"
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" fill="none" />
      <path d="M50 18 C 64 18 68 32 68 46 C 68 60 62 74 50 82"
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" fill="none" />
      <circle cx="68" cy="46" r="12" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="3 3" />
      <path d="M50 10 L50 18" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

export function TamponadeIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <path d="M50 82 C 26 64 14 48 14 32 C 14 18 26 10 38 10 C 45 10 50 14 50 20 C 50 14 55 10 62 10 C 74 10 86 18 86 32 C 86 48 74 64 50 82 Z"
            stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" opacity="0.85" fill="none" />
      <circle cx="50" cy="40" r="24" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.55" />
    </svg>
  )
}

export function ThrombosisIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <path d="M50 84 C 22 64 10 46 10 30 C 10 16 22 8 34 8 C 42 8 50 13 50 22 C 50 13 58 8 66 8 C 78 8 90 16 90 30 C 90 46 78 64 50 84 Z"
            stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" fill="none" opacity="0.85" />
      <circle cx="50" cy="40" r="9" fill="currentColor" opacity="0.9" />
      <circle cx="44" cy="35" r="4" fill="currentColor" opacity="0.6" />
      <circle cx="57" cy="46" r="4" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
