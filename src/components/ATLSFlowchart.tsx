import { ShieldAlert, ClipboardList } from 'lucide-react'
import { SurveyTorsoIcon } from './module-icons'
import { Arrow, FlowCard } from './flowchart-ui'

// Visual training reference — paraphrased summary of publicly reported ATLS primary/
// secondary survey structure. Original layout, wording, and iconography — not official
// artwork or verbatim text. Not a substitute for an accredited certification course or
// your institution's protocol.

export default function ATLSFlowchart() {
  return (
    <div className="space-y-0">
      <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5">
        Visual training reference — paraphrased summary of publicly reported ATLS primary/secondary survey
        structure. Not official artwork or verbatim text, and not a substitute for an accredited certification
        course or your institution's protocol.
      </div>

      <FlowCard
        icon={<ShieldAlert size={15} />}
        eyebrow="Step 0 · Preparation"
        title="Trauma Team Activation & Scene Safety"
        bg="#FEE2E2" border="#DC2626" text="#B91C1C" iconBg="#DC2626"
        teachingNote="The primary survey is deliberately ordered by what kills fastest, not by anatomy — an airway problem kills in minutes, a breathing problem in minutes, a circulation problem can be slower. Treat life threats as you find them in each step rather than deferring everything to the end."
      >
        <p>Activate the trauma team per your center's criteria; confirm scene safety and standard precautions.</p>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<span className="text-xs font-bold">A</span>}
        eyebrow="Primary Survey · A"
        title="Airway (with C-spine protection)"
        bg="#E0F2FE" border="#0284C7" text="#0369A1" iconBg="#0284C7"
      >
        <div className="flex items-start gap-4">
          <SurveyTorsoIcon region="airway" className="w-12 h-14 shrink-0" style={{ color: '#0284C7' }} />
          <p className="pt-1">Assess and secure the airway while maintaining cervical spine precautions.</p>
        </div>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<span className="text-xs font-bold">B</span>}
        eyebrow="Primary Survey · B"
        title="Breathing & Ventilation"
        bg="#FEF3C7" border="#D97706" text="#B45309" iconBg="#D97706"
      >
        <div className="flex items-start gap-4">
          <SurveyTorsoIcon region="breathing" className="w-12 h-14 shrink-0" style={{ color: '#D97706' }} />
          <p className="pt-1">Expose the chest; assess rate, effort, and breath sounds; treat immediately life-threatening chest injuries.</p>
        </div>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<span className="text-xs font-bold">C</span>}
        eyebrow="Primary Survey · C"
        title="Circulation & Hemorrhage Control"
        bg="#F3E8FF" border="#7C3AED" text="#6D28D9" iconBg="#7C3AED"
      >
        <div className="flex items-start gap-4">
          <SurveyTorsoIcon region="circulation" className="w-12 h-14 shrink-0" style={{ color: '#7C3AED' }} />
          <p className="pt-1">Control external bleeding; assess perfusion; establish IV access per protocol.</p>
        </div>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<span className="text-xs font-bold">D·E</span>}
        eyebrow="Primary Survey · D & E"
        title="Disability & Exposure"
        bg="#CCFBF1" border="#0D9488" text="#0F766E" iconBg="#0D9488"
      >
        <div className="flex items-start gap-4">
          <SurveyTorsoIcon region="disability" className="w-12 h-14 shrink-0" style={{ color: '#0D9488' }} />
          <SurveyTorsoIcon region="exposure" className="w-12 h-14 shrink-0" style={{ color: '#0D9488' }} />
          <p className="pt-1">Quick neurologic check (level of consciousness, pupils); fully expose the patient while preventing hypothermia.</p>
        </div>
      </FlowCard>
      <Arrow />

      <FlowCard
        icon={<ClipboardList size={15} />}
        eyebrow="After the Primary Survey"
        title="Secondary Survey"
        bg="#F8FAFC" border="#CBD5E1" text="#64748B" iconBg="#64748B"
      >
        <p>Head-to-toe exam and focused history once immediately life-threatening problems are addressed.</p>
      </FlowCard>
    </div>
  )
}
