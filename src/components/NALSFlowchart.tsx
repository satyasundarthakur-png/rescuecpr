import { Activity, HeartPulse, Syringe } from 'lucide-react'
import { NewbornIcon, PPVIcon, HeartRateGaugeIcon, PediatricCompressionIcon } from './module-icons'
import { Arrow, FlowCard } from './flowchart-ui'

// Visual training reference — paraphrased summary of publicly reported neonatal
// resuscitation (NRP-aligned) guideline highlights. Original layout, wording, and
// iconography — not official artwork or verbatim text. Not a substitute for an
// accredited certification course or your institution's protocol.

export default function NALSFlowchart() {
  return (
    <div className="space-y-0">
      <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5">
        Visual training reference — paraphrased summary of publicly reported neonatal resuscitation guideline
        highlights. Not official artwork or verbatim text, and not a substitute for an accredited certification
        course or your institution's protocol.
      </div>

      <FlowCard
        icon={<Activity size={15} />}
        eyebrow="Step 1 · Initial Steps"
        title="Warm, Dry, Stimulate, Position Airway"
        bg="#E0F2FE" border="#0284C7" text="#0369A1" iconBg="#0284C7"
        teachingNote="Most newborns who need help respond to these initial steps alone. Because the vast majority of neonatal resuscitation is a ventilation problem rather than a circulation problem, effective PPV is the single most important intervention — compressions and medications are needed far less often than in adult arrest."
      >
        <div className="flex items-start gap-4">
          <NewbornIcon className="w-14 h-16 shrink-0" style={{ color: '#0284C7' }} />
          <p className="pt-1">Warm and dry the newborn, position the airway, and stimulate — clear the airway only if needed.</p>
        </div>
      </FlowCard>
      <Arrow />

      <div className="rounded-2xl border-2 p-5" style={{ backgroundColor: '#F3E8FF', borderColor: '#7C3AED' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0" style={{ backgroundColor: '#7C3AED' }}>
            <HeartPulse size={15} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: '#6D28D9' }}>Step 2 · Assess</span>
        </div>
        <div className="flex items-start gap-4 mb-3">
          <HeartRateGaugeIcon className="w-20 h-14 shrink-0" style={{ color: '#7C3AED' }} />
          <div className="font-semibold text-slate-900 pt-1">Check Heart Rate & Breathing</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border-2 p-3.5" style={{ backgroundColor: '#FFEDD5', borderColor: '#EA580C' }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#C2410C' }}>HR below 100 bpm</div>
            <div className="flex items-center gap-2">
              <PPVIcon className="w-9 h-9 shrink-0" style={{ color: '#EA580C' }} />
              <p className="text-sm text-slate-700">Begin positive-pressure ventilation (PPV).</p>
            </div>
          </div>
          <div className="rounded-xl border-2 p-3.5" style={{ backgroundColor: '#DCFCE7', borderColor: '#16A34A' }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: '#15803D' }}>HR ≥100 bpm, breathing well</div>
            <p className="text-sm text-slate-700">Routine care — skin-to-skin, ongoing observation.</p>
          </div>
        </div>
      </div>
      <Arrow />

      <FlowCard
        icon={<HeartPulse size={15} />}
        eyebrow="If HR below 60 despite effective PPV"
        title="Start Chest Compressions"
        bg="#FEE2E2" border="#DC2626" text="#B91C1C" iconBg="#DC2626"
      >
        <div className="flex items-start gap-4">
          <PediatricCompressionIcon className="w-14 h-14 shrink-0" style={{ color: '#DC2626' }} />
          <p className="pt-1">Coordinate 3 compressions : 1 breath; reassess heart rate periodically.</p>
        </div>
        <p className="inline-flex items-center gap-1.5 mt-1 px-2 py-1 rounded-full bg-white/70 text-xs font-semibold" style={{ color: '#B91C1C' }}>
          Confirm effective ventilation first — most newborn resuscitation is airway-driven
        </p>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<Syringe size={15} />}
        eyebrow="If HR remains below 60"
        title="Escalate per Protocol"
        bg="#F8FAFC" border="#CBD5E1" text="#64748B" iconBg="#64748B"
      >
        <p>Consider epinephrine and vascular access (umbilical venous line) per your institution's neonatal protocol.</p>
      </FlowCard>
    </div>
  )
}
