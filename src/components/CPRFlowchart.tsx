import { ShieldAlert, PhoneCall, Zap } from 'lucide-react'
import { SceneScanIcon, SpeechBubbleIcon, PhoneCallIcon, AEDCabinetIcon, CompressionIcon, TorsoAEDPadsIcon } from './bls-icons'
import BeatMetronome from './BeatMetronome'
import { Arrow, FlowCard } from './flowchart-ui'

// Visual training reference — paraphrased, lay-rescuer-level summary of publicly
// reported Hands-Only CPR guidance. Original layout, wording, and iconography — not
// official artwork or verbatim text. Not a substitute for an accredited certification
// course.

export default function CPRFlowchart() {
  return (
    <div className="space-y-0">
      <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5">
        Visual training reference — paraphrased, lay-rescuer-level summary of publicly reported Hands-Only CPR
        guidance. Not official artwork or verbatim text, and not a substitute for an accredited certification course.
      </div>

      <FlowCard
        icon={<ShieldAlert size={15} />}
        eyebrow="Step 1–2 · Check"
        title="Check the Scene & the Person"
        bg="#E0F2FE" border="#0284C7" text="#0369A1" iconBg="#0284C7"
      >
        <div className="flex items-start gap-3">
          <SceneScanIcon className="w-10 h-10 shrink-0" style={{ color: '#0284C7' }} />
          <p className="pt-1">Make sure the scene is safe before you approach.</p>
        </div>
        <div className="flex items-start gap-3">
          <SpeechBubbleIcon className="w-16 h-9 shrink-0" style={{ color: '#0284C7' }} />
          <p className="pt-1">Tap and shout — check for a response and normal breathing.</p>
        </div>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<PhoneCall size={15} />}
        eyebrow="If unresponsive, not breathing normally"
        title="Call for Help"
        bg="#FEE2E2" border="#DC2626" text="#B91C1C" iconBg="#DC2626"
      >
        <div className="flex items-start gap-3">
          <span className="relative shrink-0">
            <span className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
            <PhoneCallIcon className="relative w-10 h-10" style={{ color: '#DC2626' }} />
          </span>
          <p className="pt-1">Call your local emergency number (or have someone else call) and ask for an AED.</p>
        </div>
        <div className="flex items-start gap-3">
          <AEDCabinetIcon className="w-10 h-10 shrink-0" style={{ color: '#DC2626' }} />
          <p className="pt-1">Stay on the line if instructed — dispatchers can guide you through compressions.</p>
        </div>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<Zap size={15} />}
        eyebrow="Hands-Only CPR"
        title="Push Hard, Push Fast"
        bg="#FEF3C7" border="#D97706" text="#B45309" iconBg="#D97706"
      >
        <div className="flex items-start gap-4">
          <span style={{ display: 'inline-block', animation: 'beat-pulse 0.6s ease-in-out infinite', transformOrigin: 'center' }}>
            <CompressionIcon className="w-14 h-14 shrink-0" style={{ color: '#D97706' }} />
          </span>
          <div className="flex-1 pt-1 space-y-1">
            <p>Push in the center of the chest, 100–120 pushes per minute.</p>
            <p>Let the chest come back up fully between pushes.</p>
          </div>
        </div>
        <BeatMetronome color="#D97706" bpm={110} />
        <p className="inline-flex items-center gap-1.5 mt-1 px-2 py-1 rounded-full bg-white/70 text-xs font-semibold" style={{ color: '#B45309' }}>
          <Zap size={12} /> Appropriate for untrained bystanders — keep going until help arrives
        </p>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<Zap size={15} />}
        eyebrow="If an AED arrives"
        title="Use the AED as Soon as Possible"
        bg="#F3E8FF" border="#7C3AED" text="#6D28D9" iconBg="#7C3AED"
      >
        <div className="flex items-start gap-4">
          <TorsoAEDPadsIcon className="w-14 h-[70px] shrink-0" style={{ color: '#7C3AED' }} />
          <p className="pt-1">Turn it on and follow its voice prompts — it will tell you if a shock is advised.</p>
        </div>
      </FlowCard>
    </div>
  )
}
