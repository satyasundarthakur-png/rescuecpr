import { Users, PhoneCall, Zap } from 'lucide-react'
import { PhoneCallIcon } from './bls-icons'
import { AssessmentTriangleIcon, PediatricCompressionIcon } from './module-icons'
import BeatMetronome from './BeatMetronome'
import { Arrow, FlowCard, RhythmCard } from './flowchart-ui'

// Visual training reference — paraphrased summary of publicly reported AHA/ILCOR
// pediatric PALS guideline highlights. Original layout, wording, and iconography — not
// official artwork or verbatim text. Not a substitute for an accredited certification
// course or your institution's protocol.

export default function PALSFlowchart() {
  return (
    <div className="space-y-0">
      <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5">
        Visual training reference — paraphrased summary of publicly reported AHA/ILCOR pediatric PALS guideline
        highlights. Not official artwork or verbatim text, and not a substitute for an accredited certification
        course or your institution's protocol.
      </div>

      <FlowCard
        icon={<Users size={15} />}
        eyebrow="Step 1 · Rapid Assessment"
        title="Pediatric Assessment Triangle"
        bg="#E0F2FE" border="#0284C7" text="#0369A1" iconBg="#0284C7"
        teachingNote="The triangle is deliberately hands-off — you're forming a general impression from across the room before any exam. Most experienced pediatric providers can flag a sick-looking child correctly from this alone, which is what makes it useful for fast triage rather than diagnosis."
      >
        <div className="flex items-start gap-4">
          <AssessmentTriangleIcon className="w-20 h-20 shrink-0" style={{ color: '#0284C7' }} />
          <div className="pt-1">
            <p>Appearance, work of breathing, and circulation/skin — a quick visual read before you touch the patient.</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['Appearance', 'Breathing', 'Circulation'].map((label) => (
                <span key={label} className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70" style={{ color: '#0369A1' }}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<PhoneCall size={15} />}
        eyebrow="If unresponsive · no normal breathing · no pulse"
        title="Activate Emergency Response"
        bg="#FEE2E2" border="#DC2626" text="#B91C1C" iconBg="#DC2626"
      >
        <div className="flex items-start gap-3">
          <span className="relative shrink-0">
            <span className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
            <PhoneCallIcon className="relative w-10 h-10" style={{ color: '#DC2626' }} />
          </span>
          <p className="pt-1">Call for help / activate your emergency response system and get the code cart/AED.</p>
        </div>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<Zap size={15} />}
        eyebrow="High-Quality CPR — Pediatric"
        title="Compressions & Ventilation"
        bg="#FEF3C7" border="#D97706" text="#B45309" iconBg="#D97706"
      >
        <div className="flex items-start gap-4">
          <PediatricCompressionIcon className="w-16 h-16 shrink-0" style={{ color: '#D97706' }} />
          <div className="flex-1 pt-1 space-y-1">
            <p>Single rescuer: 30:2 · Two rescuers: 15:2.</p>
            <p>Depth: about 1/3 the anterior-posterior chest diameter.</p>
          </div>
        </div>
        <BeatMetronome color="#D97706" bpm={110} />
        <p className="inline-flex items-center gap-1.5 mt-1 px-2 py-1 rounded-full bg-white/70 text-xs font-semibold" style={{ color: '#B45309' }}>
          <Zap size={12} /> Weight-based dosing for all medications — confirm against your protocol
        </p>
      </FlowCard>
      <Arrow />

      <div className="rounded-2xl border-2 p-5" style={{ backgroundColor: '#F3E8FF', borderColor: '#7C3AED' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0" style={{ backgroundColor: '#7C3AED' }}>
            <Zap size={15} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: '#6D28D9' }}>Rhythm Check</span>
        </div>
        <div className="font-semibold text-slate-900 mb-3">Attach AED/monitor as soon as available and follow prompts</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <RhythmCard
            theme="green" label="Shockable — VF / pulseless VT" pattern="vf"
            action="Shock at weight-based dose → resume CPR immediately."
            criteria="Chaotic irregular waveform (VF) or wide rapid complexes with no pulse (pulseless VT) — treated with immediate weight-based defibrillation."
          />
          <RhythmCard
            theme="orange" label="Non-shockable — PEA / Asystole" pattern="asystole"
            action="Resume CPR immediately → recheck rhythm."
            criteria="Organized activity without a pulse (PEA) or a flat line (asystole) — priority is CPR quality and finding a reversible cause, not shocking."
          />
        </div>
      </div>
    </div>
  )
}
