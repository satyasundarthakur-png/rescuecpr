import {
  Stethoscope, Zap, Volume2, Wind, Syringe, Snowflake, Droplet,
  FlaskConical, Battery, Thermometer, Activity, Gauge, Droplets,
} from 'lucide-react'
import { PulseCheckIcon, TorsoAEDPadsIcon } from './bls-icons'
import { CompressionTechniqueIcon, EndotrachealTubeIcon, TensionPneumoIcon, TamponadeIcon, ThrombosisIcon } from './acls-icons'
import EcgTrace from './EcgTrace'
import BeatMetronome from './BeatMetronome'
import { Arrow, FlowCard, RhythmCard } from './flowchart-ui'

// Visual training reference — paraphrased summary of publicly reported AHA/ILCOR adult
// ACLS guideline highlights. Original layout, wording, and iconography — not official
// artwork or verbatim text. Not a substitute for an accredited certification course or
// your institution's protocol. Same "review" posture as the interactive algorithm data.

const HT_CAUSES: { label: string; icon: React.ReactNode }[] = [
  { label: 'Hypovolemia', icon: <Droplet size={20} /> },
  { label: 'Hypoxia', icon: <Wind size={20} /> },
  { label: 'Hydrogen ion (acidosis)', icon: <FlaskConical size={20} /> },
  { label: 'Hypo/hyperkalemia', icon: <Battery size={20} /> },
  { label: 'Hypothermia', icon: <Snowflake size={20} /> },
  { label: 'Tension pneumothorax', icon: <TensionPneumoIcon className="w-5 h-5" /> },
  { label: 'Tamponade (cardiac)', icon: <TamponadeIcon className="w-5 h-5" /> },
  { label: 'Toxins', icon: <Syringe size={20} /> },
  { label: 'Thrombosis (pulmonary)', icon: <ThrombosisIcon className="w-5 h-5" /> },
  { label: 'Thrombosis (coronary)', icon: <ThrombosisIcon className="w-5 h-5" /> },
]

export default function ACLSFlowchart() {
  return (
    <div className="space-y-0">
      <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5">
        Visual training reference — paraphrased summary of publicly reported AHA/ILCOR adult ACLS guideline highlights.
        Not official artwork or verbatim text, and not a substitute for an accredited certification course or your
        institution's protocol.
      </div>

      {/* Recognize & Begin — blue */}
      <FlowCard
        icon={<Stethoscope size={15} />}
        eyebrow="Recognize & Begin"
        title="Cardiac Arrest Confirmed"
        bg="#E0F2FE" border="#0284C7" text="#0369A1" iconBg="#0284C7"
        teachingNote="A pulse check under 10 seconds is the standard, but when it's ambiguous the default is to treat it as arrest and start CPR — the cost of unnecessary compressions is far lower than the cost of a missed arrest."
      >
        <div className="flex items-start gap-3">
          <PulseCheckIcon className="w-10 h-10 shrink-0" style={{ color: '#0284C7' }} />
          <div className="pt-1 flex-1">
            <p>Confirm unresponsiveness and absent/abnormal pulse (≤10 seconds).</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70" style={{ color: '#0369A1' }}>
                <Volume2 size={12} /> "Are you OK?"
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70" style={{ color: '#0369A1' }}>
                <Wind size={12} /> No normal chest rise
              </span>
            </div>
          </div>
        </div>
        <p>Start high-quality CPR immediately.</p>

        <div className="flex items-start gap-4 mt-3 pt-3 border-t border-white/60">
          <div className="relative shrink-0">
            <TorsoAEDPadsIcon className="w-14 h-[70px]" style={{ color: '#0284C7' }} />
            <svg viewBox="0 0 100 120" className="absolute inset-0 w-14 h-[70px]" fill="none">
              <path d="M65 55 C 50 70, 45 78, 34 89" stroke="#0284C7" strokeWidth="2" strokeDasharray="4 3" fill="none"
                    style={{ animation: 'ecg-scroll 1.2s linear infinite', strokeDashoffset: 0 }} />
            </svg>
          </div>
          <div className="pt-1">
            <div className="font-medium text-slate-800 text-sm">Attach monitor/defibrillator as soon as available</div>
            <p className="text-xs text-slate-600 mt-0.5">Pad placement: upper-right chest below the collarbone, lower-left ribcage below the armpit.</p>
          </div>
        </div>
      </FlowCard>
      <Arrow />

      {/* Rhythm check — violet, branching, interactive */}
      <div className="rounded-2xl border-2 p-5" style={{ backgroundColor: '#F3E8FF', borderColor: '#7C3AED' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0" style={{ backgroundColor: '#7C3AED' }}>
            <Zap size={15} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: '#6D28D9' }}>Rhythm Check (~every 2 min)</span>
        </div>
        <div className="font-semibold text-slate-900 mb-3">Briefly pause compressions to check the rhythm, then resume immediately</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <RhythmCard
            theme="green" label="Shockable — VF / pulseless VT" pattern="vf"
            action="Resume CPR while charging → deliver 1 shock → resume CPR immediately for 2 min."
            criteria="VF: chaotic, irregular waveform with no identifiable QRS complexes. Pulseless VT: wide, regular, rapid complexes with no palpable pulse. Both are treated with immediate defibrillation."
          />
          <div className="space-y-2">
            <RhythmCard
              theme="orange" label="Non-shockable — Asystole" pattern="asystole"
              action="Resume CPR immediately for 2 min → recheck rhythm."
              criteria="A flat or near-flat line with no discernible electrical activity. Confirm true asystole (not a disconnected lead) by checking a second lead before treating."
            />
            <RhythmCard
              theme="orange" label="Non-shockable — PEA" pattern="pea"
              action="Resume CPR immediately for 2 min → search for a reversible cause."
              criteria="An organized electrical rhythm on the monitor with no palpable pulse. The priority is finding and treating the underlying cause (see H's & T's below), not shocking."
            />
          </div>
        </div>
      </div>
      <Arrow />

      {/* CPR & Meds — amber */}
      <FlowCard
        icon={<Zap size={15} />}
        eyebrow="Throughout"
        title="High-Quality CPR & Medications"
        bg="#FEF3C7" border="#D97706" text="#B45309" iconBg="#D97706"
        teachingNote="Charging the defibrillator while compressions continue, and rotating compressors every ~2 minutes before fatigue sets in, are two of the highest-yield habits for keeping compression fraction high across a long resuscitation."
      >
        <div className="flex items-start gap-4">
          <CompressionTechniqueIcon className="w-24 h-20 shrink-0" style={{ color: '#D97706' }} />
          <div className="flex-1 pt-1 space-y-1">
            <p>Hands stacked on the lower half of the sternum, arms locked straight.</p>
            <p>Depth 2–2.4 in (5–6 cm); allow full recoil; minimize interruptions.</p>
          </div>
        </div>
        <BeatMetronome color="#D97706" bpm={110} />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="flex items-center gap-2 bg-white/60 rounded-lg px-2.5 py-2">
            <Syringe size={18} style={{ color: '#B45309' }} />
            <div>
              <div className="text-xs font-semibold text-slate-800">Epinephrine</div>
              <div className="text-[11px] text-slate-500">Per protocol timing/dose</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/60 rounded-lg px-2.5 py-2">
            <EndotrachealTubeIcon className="w-[18px] h-[18px]" style={{ color: '#B45309' }} />
            <div>
              <div className="text-xs font-semibold text-slate-800">Advanced airway</div>
              <div className="text-[11px] text-slate-500">If bag-mask inadequate</div>
            </div>
          </div>
        </div>
      </FlowCard>
      <Arrow />

      {/* H's and T's — icon grid */}
      <div className="rounded-2xl border-2 p-5 bg-slate-50 border-slate-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-500 text-white shrink-0">
            <FlaskConical size={15} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Throughout — Reversible Causes</span>
        </div>
        <div className="font-semibold text-slate-900 mb-3">Consider the H's and T's</div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {HT_CAUSES.map((c) => (
            <div key={c.label} className="flex flex-col items-center text-center gap-1.5 bg-white rounded-xl border border-slate-200 p-3">
              <span className="text-slate-500">{c.icon}</span>
              <span className="text-[11px] font-medium text-slate-700 leading-tight">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
      <Arrow />

      {/* Post-ROSC — teal */}
      <FlowCard
        icon={<Activity size={15} />}
        eyebrow="On ROSC"
        title="Post-Cardiac-Arrest Care"
        bg="#CCFBF1" border="#0D9488" text="#0F766E" iconBg="#0D9488"
      >
        <p className="mb-2">Optimize oxygenation/ventilation and hemodynamics; treat the underlying cause.</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 bg-white/70 rounded-xl p-2.5">
            <Thermometer size={20} style={{ color: '#0D9488' }} />
            <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight">TTM<br />Temp Mgmt</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-white/70 rounded-xl p-2.5">
            <div className="w-full">
              <EcgTrace pattern="sinus" color="#0D9488" className="w-full h-5" />
            </div>
            <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight">12-Lead<br />ECG</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-white/70 rounded-xl p-2.5">
            <div className="flex items-center gap-1">
              <Gauge size={18} style={{ color: '#0D9488' }} />
              <Droplets size={18} style={{ color: '#0D9488' }} />
            </div>
            <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight">BP / SpO₂</span>
          </div>
        </div>
      </FlowCard>
    </div>
  )
}
