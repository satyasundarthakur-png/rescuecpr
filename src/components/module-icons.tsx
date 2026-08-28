import type { CSSProperties } from 'react'

type IconProps = { className?: string; style?: CSSProperties }

// Pediatric assessment triangle — appearance / breathing / circulation.
export function AssessmentTriangleIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <path d="M50 10 L90 82 L10 82 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="50" cy="10" r="5" fill="currentColor" />
      <circle cx="90" cy="82" r="5" fill="currentColor" />
      <circle cx="10" cy="82" r="5" fill="currentColor" />
      <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// Pediatric-scale compression icon — smaller child figure, single/two-hand technique.
export function PediatricCompressionIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <path d="M50 26 C 38 26 30 36 30 48 C 30 66 40 78 50 90 C 60 78 70 66 70 48 C 70 36 62 26 50 26 Z"
            stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" opacity="0.5" />
      <ellipse cx="50" cy="52" rx="10" ry="6" fill="currentColor" opacity="0.9" />
      <path d="M50 20 L50 52" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M40 12 L50 20 L60 12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Newborn wrapped/swaddled figure for NALS initial steps.
export function NewbornIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <circle cx="50" cy="30" r="16" stroke="currentColor" strokeWidth="3.5" />
      <path d="M26 46 C 20 60 20 78 30 88 L 70 88 C 80 78 80 60 74 46 C 66 40 34 40 26 46 Z"
            stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" opacity="0.6" />
      <path d="M30 60 Q 50 68 70 60" stroke="currentColor" strokeWidth="2.5" opacity="0.4" fill="none" />
    </svg>
  )
}

// Bag-mask ventilation (PPV) icon.
export function PPVIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <ellipse cx="36" cy="46" rx="22" ry="26" stroke="currentColor" strokeWidth="3.5" />
      <path d="M58 46 L78 46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 32 C 88 36 88 56 78 60 L 62 54 L 62 38 Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" fill="none" />
      <path d="M20 78 Q 36 70 52 78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
    </svg>
  )
}

// Heart-rate gauge (dial + needle) for NALS assessment.
export function HeartRateGaugeIcon({ className = '', style }: IconProps) {
  return (
    <svg viewBox="0 0 100 70" className={className} style={style} fill="none">
      <path d="M10 60 A 40 40 0 0 1 90 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.35" />
      <path d="M10 60 A 40 40 0 0 1 40 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      <line x1="50" y1="60" x2="30" y2="30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="60" r="4" fill="currentColor" />
    </svg>
  )
}

// ABCDE primary-survey torso with a highlighted body region. `region` picks the highlight.
export function SurveyTorsoIcon({
  className = '', style, region,
}: IconProps & { region: 'airway' | 'breathing' | 'circulation' | 'disability' | 'exposure' }) {
  const hi = 'currentColor'
  return (
    <svg viewBox="0 0 100 120" className={className} style={style} fill="none">
      <circle cx="50" cy="18" r="14" stroke="currentColor" strokeWidth="3" opacity={region === 'airway' || region === 'disability' ? 1 : 0.3} />
      <path d="M50 32 C 26 32 18 50 18 70 L 18 100 C 18 110 30 116 50 116 C 70 116 82 110 82 100 L 82 70 C 82 50 74 32 50 32 Z"
            stroke="currentColor" strokeWidth="3" strokeLinejoin="round" opacity={region === 'exposure' ? 1 : 0.3} />
      {/* airway = trachea line */}
      {region === 'airway' && <path d="M50 12 L50 34" stroke={hi} strokeWidth="4" strokeLinecap="round" />}
      {/* breathing = lungs */}
      {region === 'breathing' && (
        <>
          <path d="M42 44 C 30 48 28 66 34 78 C 38 80 42 76 42 68 Z" fill={hi} opacity="0.8" />
          <path d="M58 44 C 70 48 72 66 66 78 C 62 80 58 76 58 68 Z" fill={hi} opacity="0.8" />
        </>
      )}
      {/* circulation = heart + pulse */}
      {region === 'circulation' && (
        <path d="M50 52 C 46 46 36 48 36 58 C 36 68 50 78 50 78 C 50 78 64 68 64 58 C 64 48 54 46 50 52 Z" fill={hi} opacity="0.85" />
      )}
      {/* disability = brain/head glow already highlighted via circle opacity above, add spark */}
      {region === 'disability' && <path d="M44 14 L50 20 L56 12" stroke={hi} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
      {/* exposure = full body outline already highlighted via body opacity above */}
    </svg>
  )
}
