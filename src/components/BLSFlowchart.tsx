import { ShieldAlert, PhoneCall, HeartPulse, Zap, Wind, Syringe, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  SceneScanIcon, SpeechBubbleIcon, PulseCheckIcon, PhoneCallIcon, AEDCabinetIcon,
  CompressionIcon, MetronomePulseIcon, TorsoAEDPadsIcon, EcgShockableIcon, EcgNonShockableIcon,
  BackBlowsIcon, AbdominalThrustIcon,
} from './bls-icons'

// Visual training reference, paraphrased at a high level from publicly reported 2025
// AHA/ILCOR adult BLS guideline highlights. Original layout, wording, and iconography —
// not the official AHA algorithm artwork, poster, or verbatim text. Always follow your
// institution's current protocol and an accredited certification course; this is a
// training aid only. See the numbered node list below for the equivalent interactive
// walkthrough, which carries the same "review" / not-for-clinical-use status.

function Arrow() {
  return (
    <div className="flex justify-center py-1.5">
      <ChevronDown size={20} className="text-slate-300" />
    </div>
  )
}

function FlowCard({
  icon, eyebrow, title, bg, border, text, iconBg, children,
}: {
  icon: ReactNode
  eyebrow: string
  title: string
  bg: string
  border: string
  text: string
  iconBg: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border-2 p-5" style={{ backgroundColor: bg, borderColor: border }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0" style={{ backgroundColor: iconBg }}>
          {icon}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: text }}>{eyebrow}</span>
      </div>
      <div className="font-semibold text-slate-900 mb-2">{title}</div>
      <div className="text-sm text-slate-700 space-y-1.5">{children}</div>
    </div>
  )
}

export default function BLSFlowchart() {
  return (
    <div className="space-y-0">
      <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5">
        Visual training reference — paraphrased summary of publicly reported 2025 AHA/ILCOR adult BLS guideline
        highlights. Not official AHA artwork or verbatim text, and not a substitute for an accredited certification
        course or your institution's protocol.
      </div>

      {/* 1. Scene safety & initial assessment — blue */}
      <FlowCard
        icon={<ShieldAlert size={15} />}
        eyebrow="Step 1–3 · Initial Assessment"
        title="Scene Safety & Initial Assessment"
        bg="#E0F2FE" border="#0284C7" text="#0369A1" iconBg="#0284C7"
      >
        <div className="flex items-start gap-3">
          <SceneScanIcon className="w-10 h-10 shrink-0 mt-0.5" style={{ color: '#0284C7' }} />
          <p className="pt-1">1. Verify the scene is safe before approaching.</p>
        </div>
        <div className="flex items-start gap-3">
          <SpeechBubbleIcon className="w-16 h-9 shrink-0" style={{ color: '#0284C7' }} />
          <p className="pt-1">2. Check responsiveness ("Are you OK?") and call out for nearby help.</p>
        </div>
        <div className="flex items-start gap-3">
          <PulseCheckIcon className="w-10 h-10 shrink-0 mt-0.5" style={{ color: '#0284C7' }} />
          <p className="pt-1">3. Simultaneously check breathing (chest rise) and carotid pulse — 5 to 10 seconds, no longer.</p>
        </div>
      </FlowCard>
      <Arrow />

      {/* 2. Emergency activation — red */}
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
          <p className="pt-1">Activate the emergency response system — call 911 or your code team.</p>
        </div>
        <div className="flex items-start gap-3">
          <AEDCabinetIcon className="w-10 h-10 shrink-0" style={{ color: '#DC2626' }} />
          <p className="pt-1">Send someone to retrieve an AED and emergency equipment.</p>
        </div>
      </FlowCard>
      <Arrow />

      {/* 3. CPR sequence — amber/orange */}
      <FlowCard
        icon={<HeartPulse size={15} />}
        eyebrow="2025 Guideline Emphasis"
        title="Start High-Quality CPR"
        bg="#FEF3C7" border="#D97706" text="#B45309" iconBg="#D97706"
      >
        <div className="flex items-start gap-4">
          <CompressionIcon className="w-14 h-14 shrink-0" style={{ color: '#D97706' }} />
          <div className="flex-1 pt-1 space-y-1.5">
            <p>30 chest compressions : 2 rescue breaths.</p>
            <p>Rate 100–120/min · Depth 2–2.4 in (5–6 cm), allow full recoil.</p>
          </div>
        </div>
        <MetronomePulseIcon className="w-full h-8 mt-1" style={{ color: '#D97706' }} />
        <p className="inline-flex items-center gap-1.5 mt-1 px-2 py-1 rounded-full bg-white/70 text-xs font-semibold" style={{ color: '#B45309' }}>
          <Zap size={12} /> Minimize interruptions · avoid hyperventilation
        </p>
      </FlowCard>
      <Arrow />

      {/* 4. AED rhythm analysis — violet, branching */}
      <div className="rounded-2xl border-2 p-5" style={{ backgroundColor: '#F3E8FF', borderColor: '#7C3AED' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0" style={{ backgroundColor: '#7C3AED' }}>
            <Zap size={15} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: '#6D28D9' }}>AED / Rhythm Analysis</span>
        </div>
        <div className="flex items-start gap-4 mb-4">
          <TorsoAEDPadsIcon className="w-16 h-20 shrink-0" style={{ color: '#7C3AED' }} />
          <div className="pt-1">
            <div className="font-semibold text-slate-900 mb-1">Attach AED as soon as available and follow its prompts</div>
            <p className="text-sm text-slate-600">Pad placement: upper-right chest, below the collarbone, and lower-left side, below the armpit.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border-2 p-3.5" style={{ backgroundColor: '#DCFCE7', borderColor: '#16A34A' }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#15803D' }}>Shockable — VF / pulseless VT</div>
            <EcgShockableIcon className="w-full h-8 my-1" style={{ color: '#16A34A' }} />
            <p className="text-sm text-slate-700">Deliver 1 shock → immediately resume CPR for 2 minutes.</p>
          </div>
          <div className="rounded-xl border-2 p-3.5" style={{ backgroundColor: '#FFEDD5', borderColor: '#EA580C' }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#C2410C' }}>Non-shockable — Asystole / PEA</div>
            <EcgNonShockableIcon className="w-full h-8 my-1" style={{ color: '#EA580C' }} />
            <p className="text-sm text-slate-700">Resume CPR immediately for 2 minutes → recheck rhythm every 2 minutes.</p>
          </div>
        </div>
      </div>

      {/* 5. Specialized pathways — teal + gray */}
      <div className="grid sm:grid-cols-2 gap-4 mt-5">
        <FlowCard
          icon={<Wind size={15} />}
          eyebrow="2025 Update · Choking / FBAO"
          title="Airway Obstruction (Adult & Child)"
          bg="#CCFBF1" border="#0D9488" text="#0F766E" iconBg="#0D9488"
        >
          <p className="mb-2">5 back blows, then 5 abdominal thrusts — repeat the cycle until the object is cleared or the person becomes unresponsive.</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white/60 p-2 flex flex-col items-center">
              <BackBlowsIcon className="w-full h-16" style={{ color: '#0D9488' }} />
              <span className="text-xs font-semibold mt-1" style={{ color: '#0F766E' }}>5 back blows</span>
            </div>
            <div className="rounded-lg bg-white/60 p-2 flex flex-col items-center">
              <AbdominalThrustIcon className="w-full h-16" style={{ color: '#0D9488' }} />
              <span className="text-xs font-semibold mt-1" style={{ color: '#0F766E' }}>5 abdominal thrusts</span>
            </div>
          </div>
        </FlowCard>

        <div className="rounded-2xl border-2 border-dashed p-5 bg-slate-50 border-slate-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-500 text-white shrink-0">
              <Syringe size={15} />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Vascular & Medication Notes</span>
          </div>
          <div className="font-semibold text-slate-900 mb-2">Access Priority</div>
          <p className="text-sm text-slate-600">Prioritize early IV access over IO for epinephrine delivery when feasible; follow your team's protocol if IV access is delayed.</p>
        </div>
      </div>
    </div>
  )
}
