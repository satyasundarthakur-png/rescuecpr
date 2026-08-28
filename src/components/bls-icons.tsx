// Original, simplified line-art illustrations for the BLS visual flowchart.
// Deliberately abstract/schematic (not photorealistic figures, not reproductions
// of any published diagram) — instructional icons only.
import type { CSSProperties } from 'react'

export function SceneScanIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <circle cx="38" cy="30" r="9" stroke="currentColor" strokeWidth="4" />
      <path d="M38 42 C 24 42 18 54 18 66 L 58 66 C 58 54 52 42 38 42 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M62 30 A 22 22 0 0 1 62 66" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
      <path d="M70 22 A 34 34 0 0 1 70 74" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.3" />
      <path d="M78 14 A 46 46 0 0 1 78 82" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.18" />
    </svg>
  )
}

export function SpeechBubbleIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 110 62" className={className} style={style} fill="none">
      <path d="M10 8 h86 a6 6 0 0 1 6 6 v26 a6 6 0 0 1 -6 6 h-56 l-14 12 v-12 h-16 a6 6 0 0 1 -6 -6 v-26 a6 6 0 0 1 6 -6 Z"
            stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <text x="55" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif"
            textLength="88" lengthAdjust="spacingAndGlyphs">Are you OK?</text>
    </svg>
  )
}

export function PulseCheckIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="4" opacity="0.35" />
      <path d="M50 20 L50 26 M50 74 L50 80 M20 50 L26 50 M74 50 L80 50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
      <line x1="50" y1="50" x2="50" y2="30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="50" x2="66" y2="58" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
      <text x="50" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor" fontFamily="Arial, sans-serif">5-10 sec</text>
    </svg>
  )
}

export function PhoneCallIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <circle cx="46" cy="46" r="30" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <circle cx="46" cy="46" r="20" stroke="currentColor" strokeWidth="3" opacity="0.4" />
      <path d="M36 26 c-4 0 -8 3 -8 8 0 20 16 36 36 36 5 0 8 -4 8 -8 l0 -6 c0 -2 -1.5 -4 -3.5 -4.5 l-9 -2.5 c-2 -0.5 -4 0 -5.5 1.5 l-3 3 c-7 -3.5 -12.5 -9 -16 -16 l3 -3 c1.5 -1.5 2 -3.5 1.5 -5.5 L37 30 c-0.5 -2 -2.5 -3.5 -4.5 -3.5 Z"
            fill="currentColor" />
      <text x="50" y="90" textAnchor="middle" fontSize="15" fontWeight="800" fill="currentColor" fontFamily="Arial, sans-serif">911</text>
    </svg>
  )
}

export function AEDCabinetIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <rect x="22" y="14" width="56" height="72" rx="6" stroke="currentColor" strokeWidth="4" fill="none" />
      <path d="M32 50 h10 l6 -14 l8 24 l6 -18 l4 8 h12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 62 l0 14 M43 69 l14 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export function CompressionIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none">
      <ellipse cx="50" cy="78" rx="30" ry="8" stroke="currentColor" strokeWidth="3.5" opacity="0.5" />
      <path d="M50 8 c-16 0 -26 12 -26 28 c0 18 12 32 26 42 c14 -10 26 -24 26 -42 c0 -16 -10 -28 -26 -28 Z"
            stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M38 28 L58 28 L48 42 L64 42 L40 66" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <path d="M50 4 v10 M42 8 l8 8 l8 -8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MetronomePulseIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 160 50" className={className} style={style} fill="none">
      <polyline points="0,25 30,25 40,8 50,42 60,25 75,25 85,14 95,32 105,25 160,25"
                stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function TorsoAEDPadsIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 120" className={className} style={style} fill="none">
      <circle cx="50" cy="16" r="11" stroke="currentColor" strokeWidth="3.5" opacity="0.5" />
      <path d="M50 30 c-20 0 -30 14 -30 34 l0 34 c0 6 5 10 10 10 l40 0 c5 0 10 -4 10 -10 l0 -34 c0 -20 -10 -34 -30 -34 Z"
            stroke="currentColor" strokeWidth="3.5" opacity="0.5" strokeLinejoin="round" />
      <rect x="55" y="42" width="20" height="26" rx="5" transform="rotate(12 65 55)" fill="currentColor" opacity="0.9" />
      <rect x="24" y="76" width="20" height="26" rx="5" transform="rotate(-8 34 89)" fill="currentColor" opacity="0.9" />
      <path d="M65 55 C 50 70, 45 78, 34 89" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.6" fill="none" />
    </svg>
  )
}

export function BackBlowsIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} fill="none">
      {/* victim, leaning forward */}
      <circle cx="42" cy="22" r="9" stroke="currentColor" strokeWidth="3.5" />
      <path d="M42 31 C 30 36 24 48 26 62 L58 62 C 60 48 54 36 42 31 Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" opacity="0.55" />
      {/* rescuer behind, arm raised to strike between shoulder blades */}
      <circle cx="80" cy="18" r="8" stroke="currentColor" strokeWidth="3.5" />
      <path d="M80 26 C 68 30 64 42 66 56 L 96 56 C 98 42 92 30 80 26 Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M70 34 L52 46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M46 40 l6 6 l-2 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    </svg>
  )
}

export function AbdominalThrustIcon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} fill="none">
      {/* victim, standing */}
      <circle cx="46" cy="20" r="9" stroke="currentColor" strokeWidth="3.5" opacity="0.55" />
      <path d="M46 29 C 34 33 30 46 32 62 L60 62 C 62 46 58 33 46 29 Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" opacity="0.55" />
      {/* rescuer behind, arms wrapped, fist above navel with inward-upward thrust arrow */}
      <circle cx="80" cy="16" r="8" stroke="currentColor" strokeWidth="3.5" />
      <path d="M80 24 C 68 28 63 40 65 54 L 97 54 C 99 40 92 28 80 24 Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M68 32 C 58 38 52 44 50 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="49" cy="52" r="5.5" fill="currentColor" />
      <path d="M49 52 L49 38" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      <path d="M43 42 l6 -6 l6 6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    </svg>
  )
}
