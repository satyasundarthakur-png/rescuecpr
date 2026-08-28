import type { CourseKey } from '../types/domain'
import type { FlowchartData } from '../components/AlgorithmFlowchart'

// Visual training references only — paraphrased at a high level from publicly reported
// AHA/ILCOR/ATLS guideline highlights. Original layout and wording, not official
// artwork or verbatim text. Not a substitute for an accredited certification course
// or your institution's protocol. Same "review" / not-for-clinical-use posture as the
// interactive algorithm data in seed.ts.

const STANDARD_DISCLAIMER =
  "Visual training reference — paraphrased summary of publicly reported guideline highlights. Not official artwork or verbatim text, and not a substitute for an accredited certification course or your institution's protocol."

export const flowchartData: Partial<Record<CourseKey, FlowchartData>> = {
  CPR: {
    disclaimer: STANDARD_DISCLAIMER,
    sections: [
      {
        theme: 'blue', icon: 'shield', eyebrow: 'Step 1–2 · Check',
        title: 'Check the Scene & the Person',
        bullets: [
          'Make sure the scene is safe before you approach.',
          'Tap and shout — check for a response and normal breathing.',
        ],
      },
      {
        theme: 'red', icon: 'phone', eyebrow: 'If unresponsive, not breathing normally',
        title: 'Call for Help',
        bullets: [
          'Call your local emergency number (or have someone else call) and ask for an AED.',
          'Stay on the line if instructed — dispatchers can guide you through compressions.',
        ],
      },
      {
        theme: 'amber', icon: 'heart', eyebrow: 'Hands-Only CPR',
        title: 'Push Hard, Push Fast',
        bullets: [
          'Push in the center of the chest, 100–120 pushes per minute.',
          'Let the chest come back up fully between pushes.',
        ],
        badge: 'Hands-only is appropriate for untrained bystanders — keep going until help arrives',
      },
      {
        theme: 'violet', icon: 'zap', eyebrow: 'If an AED arrives',
        title: 'Use the AED as Soon as Possible',
        bullets: ['Turn it on and follow its voice prompts — it will tell you if a shock is advised.'],
      },
    ],
  },

  ACLS: {
    disclaimer: STANDARD_DISCLAIMER,
    sections: [
      {
        theme: 'blue', icon: 'stethoscope', eyebrow: 'Recognize & Begin',
        title: 'Cardiac Arrest Confirmed',
        bullets: ['Start high-quality CPR immediately.', 'Attach monitor/defibrillator as soon as available.'],
      },
      {
        theme: 'violet', icon: 'zap', eyebrow: 'Rhythm Check (~every 2 min)',
        title: 'Shockable or Non-Shockable?',
        bullets: ['Briefly pause compressions to check the rhythm, then resume immediately.'],
        teachingNote: 'The rhythm check itself should take only a few seconds. Charging the defibrillator while compressions continue (a "hands-on" or peri-shock charge) is the single biggest lever for cutting the pre-shock pause, and pre-shock pauses are strongly linked to lower shock success and worse outcomes.',
        branches: [
          {
            theme: 'green', label: 'Shockable — VF / pulseless VT', ecg: 'vf',
            bullets: ['Resume CPR while charging → deliver 1 shock → resume CPR immediately for 2 min.'],
          },
          {
            theme: 'orange', label: 'Non-shockable — PEA / Asystole', ecg: 'asystole',
            bullets: ['Resume CPR immediately for 2 min → recheck rhythm.'],
          },
        ],
      },
      {
        theme: 'amber', icon: 'heart', eyebrow: 'Throughout',
        title: 'High-Quality CPR & Medications',
        bullets: [
          'Minimize interruptions; rotate compressors roughly every 2 minutes to avoid fatigue.',
          'Vasopressor (e.g. epinephrine) per protocol timing; consider amiodarone or lidocaine for refractory VF/VT.',
        ],
        badge: 'Avoid excessive ventilation',
      },
      {
        theme: 'gray', icon: 'clipboard', eyebrow: 'Throughout — Reversible Causes',
        title: "Consider the H's and T's",
        bullets: ['Hypovolemia, hypoxia, hydrogen ion (acidosis), hypo/hyperkalemia, hypothermia, tension pneumothorax, tamponade, toxins, thrombosis (pulmonary/coronary).'],
        teachingNote: "PEA and asystole are rarely \"nothing to fix\" rhythms — they're often the presenting sign of one of these reversible causes. Running through the list systematically during compressions, rather than only when things stall, is what actually changes outcomes in non-shockable arrests.",
      },
      {
        theme: 'teal', icon: 'activity', eyebrow: 'On ROSC',
        title: 'Post-Cardiac-Arrest Care',
        bullets: ['Optimize oxygenation/ventilation and hemodynamics; treat the underlying cause; targeted temperature management per protocol.'],
      },
    ],
  },

  PALS: {
    disclaimer: STANDARD_DISCLAIMER,
    sections: [
      {
        theme: 'blue', icon: 'baby', eyebrow: 'Step 1 · Rapid Assessment',
        title: 'Pediatric Assessment Triangle',
        bullets: ['Appearance, work of breathing, and circulation/skin — a quick visual read before you touch the patient.'],
        teachingNote: "The triangle is deliberately hands-off — you're forming a general impression from across the room before any exam. Most experienced pediatric providers can flag a sick-looking child correctly from this alone, which is what makes it useful for fast triage rather than diagnosis.",
      },
      {
        theme: 'red', icon: 'phone', eyebrow: 'If unresponsive · no normal breathing · no pulse',
        title: 'Activate Emergency Response',
        bullets: ['Call for help / activate your emergency response system and get the code cart/AED.'],
      },
      {
        theme: 'amber', icon: 'heart', eyebrow: 'High-Quality CPR — Pediatric',
        title: 'Compressions & Ventilation',
        bullets: [
          'Single rescuer: 30:2 · Two rescuers: 15:2.',
          'Depth: about 1/3 the anterior-posterior chest diameter; rate 100–120/min.',
        ],
        badge: 'Weight-based dosing for all medications — confirm against your protocol',
      },
      {
        theme: 'violet', icon: 'zap', eyebrow: 'Rhythm Check',
        title: 'Shockable or Non-Shockable?',
        bullets: ['Attach AED/monitor as soon as available and follow prompts.'],
        branches: [
          { theme: 'green', label: 'Shockable — VF / pulseless VT', ecg: 'vf', bullets: ['Shock at weight-based dose → resume CPR immediately.'] },
          { theme: 'orange', label: 'Non-shockable — PEA / Asystole', ecg: 'asystole', bullets: ['Resume CPR immediately → recheck rhythm.'] },
        ],
      },
    ],
  },

  NALS: {
    disclaimer: STANDARD_DISCLAIMER,
    sections: [
      {
        theme: 'blue', icon: 'baby', eyebrow: 'Step 1 · Initial Steps',
        title: 'Warm, Dry, Stimulate, Position Airway',
        bullets: ['Warm and dry the newborn, position the airway, and stimulate — clear the airway only if needed.'],
        teachingNote: 'Most newborns who need help respond to these initial steps alone. Because the vast majority of neonatal resuscitation is a ventilation problem rather than a circulation problem, effective PPV is the single most important intervention — compressions and medications are needed far less often than in adult arrest.',
      },
      {
        theme: 'violet', icon: 'activity', eyebrow: 'Step 2 · Assess',
        title: 'Check Heart Rate & Breathing',
        bullets: ['Assess heart rate and respiratory effort within the first minute.'],
        branches: [
          { theme: 'orange', label: 'HR below 100 bpm', bullets: ['Begin positive-pressure ventilation (PPV).'] },
          { theme: 'green', label: 'HR ≥100 bpm, breathing well', bullets: ['Routine care — skin-to-skin, ongoing observation.'] },
        ],
      },
      {
        theme: 'red', icon: 'heart', eyebrow: 'If HR below 60 despite effective PPV',
        title: 'Start Chest Compressions',
        bullets: ['Coordinate 3 compressions : 1 breath; reassess heart rate periodically.'],
        badge: 'Confirm effective ventilation first — most newborn resuscitation is airway-driven',
      },
      {
        theme: 'gray', icon: 'clipboard', eyebrow: 'If HR remains below 60',
        title: 'Escalate per Protocol',
        bullets: ['Consider epinephrine and vascular access (umbilical venous line) per your institution\'s neonatal protocol.'],
      },
    ],
  },

  ATLS: {
    disclaimer: STANDARD_DISCLAIMER,
    sections: [
      {
        theme: 'red', icon: 'shield', eyebrow: 'Step 0 · Preparation',
        title: 'Trauma Team Activation & Scene Safety',
        bullets: ['Activate the trauma team per your center\'s criteria; confirm scene safety and standard precautions.'],
        teachingNote: 'The primary survey is deliberately ordered by what kills fastest, not by anatomy — an airway problem kills in minutes, a breathing problem in minutes, a circulation problem can be slower. Treat life threats as you find them in each step rather than deferring everything to the end.',
      },
      {
        theme: 'blue', icon: 'stethoscope', eyebrow: 'Primary Survey · A',
        title: 'Airway (with C-spine protection)',
        bullets: ['Assess and secure the airway while maintaining cervical spine precautions.'],
      },
      {
        theme: 'amber', icon: 'wind', eyebrow: 'Primary Survey · B',
        title: 'Breathing & Ventilation',
        bullets: ['Expose the chest; assess rate, effort, and breath sounds; treat immediately life-threatening chest injuries.'],
      },
      {
        theme: 'violet', icon: 'heart', eyebrow: 'Primary Survey · C',
        title: 'Circulation & Hemorrhage Control',
        bullets: ['Control external bleeding; assess perfusion; establish IV access per protocol.'],
      },
      {
        theme: 'teal', icon: 'activity', eyebrow: 'Primary Survey · D & E',
        title: 'Disability & Exposure',
        bullets: ['Quick neurologic check (e.g. level of consciousness, pupils); fully expose the patient while preventing hypothermia.'],
      },
      {
        theme: 'gray', icon: 'clipboard', eyebrow: 'After the Primary Survey',
        title: 'Secondary Survey',
        bullets: ['Head-to-toe exam and focused history once immediately life-threatening problems are addressed.'],
      },
    ],
  },
}
