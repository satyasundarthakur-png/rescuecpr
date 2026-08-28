import type { CourseKey } from '../types/domain'
import type { WalkthroughScene } from '../components/AnimatedWalkthrough'
import {
  SceneScanIcon, SpeechBubbleIcon, PulseCheckIcon, PhoneCallIcon,
  CompressionIcon, TorsoAEDPadsIcon, BackBlowsIcon, AbdominalThrustIcon,
} from '../components/bls-icons'
import { CompressionTechniqueIcon, EndotrachealTubeIcon } from '../components/acls-icons'
import { AssessmentTriangleIcon, PediatricCompressionIcon, NewbornIcon, PPVIcon, SurveyTorsoIcon } from '../components/module-icons'
import EcgTrace from '../components/EcgTrace'

// Original animated walkthrough scripts — a lightweight in-app substitute for real
// filmed video, built from the same illustrated icon set used in each course's visual
// flowchart. Not a replacement for accredited certification course video content.

function Beat() {
  return (
    <span style={{ display: 'inline-block', animation: 'beat-pulse 0.6s ease-in-out infinite' }}>
      <CompressionIcon className="w-20 h-20" style={{ color: '#fff' }} />
    </span>
  )
}

export const walkthroughScenes: Partial<Record<CourseKey, WalkthroughScene[]>> = {
  CPR: [
    { id: 'c1', caption: 'Check the scene is safe, then check the person.', durationSeconds: 4, render: () => <SceneScanIcon className="w-20 h-20" style={{ color: '#fff' }} /> },
    { id: 'c2', caption: 'Tap and shout — "Are you OK?"', durationSeconds: 4, render: () => <SpeechBubbleIcon className="w-32 h-16" style={{ color: '#fff' }} /> },
    { id: 'c3', caption: 'No response? Call your emergency number and ask for an AED.', durationSeconds: 4, render: () => <PhoneCallIcon className="w-20 h-20" style={{ color: '#fff' }} /> },
    { id: 'c4', caption: 'Push hard, push fast — 100 to 120 pushes per minute.', durationSeconds: 6, render: () => <Beat /> },
    { id: 'c5', caption: 'If an AED arrives, turn it on and follow the prompts.', durationSeconds: 4, render: () => <TorsoAEDPadsIcon className="w-16 h-20" style={{ color: '#fff' }} /> },
  ],

  BLS: [
    { id: 'b1', caption: 'Verify the scene is safe before you approach.', durationSeconds: 4, render: () => <SceneScanIcon className="w-20 h-20" style={{ color: '#fff' }} /> },
    { id: 'b2', caption: 'Check responsiveness and breathing at the same time.', durationSeconds: 5, render: () => <PulseCheckIcon className="w-20 h-20" style={{ color: '#fff' }} /> },
    { id: 'b3', caption: 'Activate the emergency response system and get an AED.', durationSeconds: 4, render: () => <PhoneCallIcon className="w-20 h-20" style={{ color: '#fff' }} /> },
    { id: 'b4', caption: 'Start high-quality CPR — 30 compressions to 2 breaths.', durationSeconds: 6, render: () => <Beat /> },
    { id: 'b5', caption: 'Attach the AED as soon as it arrives and follow its prompts.', durationSeconds: 5, render: () => <TorsoAEDPadsIcon className="w-16 h-20" style={{ color: '#fff' }} /> },
    { id: 'b6', caption: 'Choking? 5 back blows, then 5 abdominal thrusts.', durationSeconds: 5, render: () => (
      <div className="flex gap-4"><BackBlowsIcon className="w-24 h-16" style={{ color: '#fff' }} /><AbdominalThrustIcon className="w-24 h-16" style={{ color: '#fff' }} /></div>
    ) },
  ],

  ACLS: [
    { id: 'a1', caption: 'Cardiac arrest confirmed — begin high-quality CPR immediately.', durationSeconds: 5, render: () => <Beat /> },
    { id: 'a2', caption: 'Rhythm check: shockable?', durationSeconds: 4, render: () => <EcgTrace pattern="vf" className="w-40 h-12" color="#fff" /> },
    { id: 'a3', caption: 'Shockable — deliver 1 shock, then resume CPR immediately.', durationSeconds: 5, render: () => <TorsoAEDPadsIcon className="w-16 h-20" style={{ color: '#fff' }} /> },
    { id: 'a4', caption: 'Non-shockable — resume CPR and search for a reversible cause.', durationSeconds: 5, render: () => <EcgTrace pattern="asystole" className="w-40 h-12" color="#fff" /> },
    { id: 'a5', caption: 'Hands on the lower sternum, arms locked, full recoil.', durationSeconds: 6, render: () => <CompressionTechniqueIcon className="w-28 h-24" style={{ color: '#fff' }} /> },
    { id: 'a6', caption: 'Consider advanced airway and epinephrine per protocol.', durationSeconds: 4, render: () => <EndotrachealTubeIcon className="w-16 h-16" style={{ color: '#fff' }} /> },
  ],

  PALS: [
    { id: 'p1', caption: 'Form a rapid impression: appearance, breathing, circulation.', durationSeconds: 5, render: () => <AssessmentTriangleIcon className="w-24 h-24" style={{ color: '#fff' }} /> },
    { id: 'p2', caption: 'Unresponsive with no pulse? Activate your emergency response.', durationSeconds: 4, render: () => <PhoneCallIcon className="w-20 h-20" style={{ color: '#fff' }} /> },
    { id: 'p3', caption: 'Pediatric CPR — 30:2 alone, 15:2 with two rescuers.', durationSeconds: 6, render: () => <PediatricCompressionIcon className="w-20 h-20" style={{ color: '#fff' }} /> },
    { id: 'p4', caption: 'Check the rhythm and follow the AED/monitor prompts.', durationSeconds: 4, render: () => <EcgTrace pattern="vf" className="w-40 h-12" color="#fff" /> },
  ],

  NALS: [
    { id: 'n1', caption: 'Warm, dry, stimulate, and position the airway.', durationSeconds: 5, render: () => <NewbornIcon className="w-16 h-20" style={{ color: '#fff' }} /> },
    { id: 'n2', caption: 'Assess heart rate and breathing effort.', durationSeconds: 4, render: () => <NewbornIcon className="w-16 h-20" style={{ color: '#fff' }} /> },
    { id: 'n3', caption: 'HR below 100? Begin positive-pressure ventilation.', durationSeconds: 5, render: () => <PPVIcon className="w-24 h-24" style={{ color: '#fff' }} /> },
    { id: 'n4', caption: 'HR below 60 despite ventilation — start compressions, 3:1.', durationSeconds: 5, render: () => <PediatricCompressionIcon className="w-20 h-20" style={{ color: '#fff' }} /> },
  ],

  ATLS: [
    { id: 't1', caption: 'Activate the trauma team and confirm scene safety.', durationSeconds: 4, render: () => <SceneScanIcon className="w-20 h-20" style={{ color: '#fff' }} /> },
    { id: 't2', caption: 'A — Airway, with cervical spine protection.', durationSeconds: 4, render: () => <SurveyTorsoIcon region="airway" className="w-16 h-20" style={{ color: '#fff' }} /> },
    { id: 't3', caption: 'B — Breathing and ventilation.', durationSeconds: 4, render: () => <SurveyTorsoIcon region="breathing" className="w-16 h-20" style={{ color: '#fff' }} /> },
    { id: 't4', caption: 'C — Circulation and hemorrhage control.', durationSeconds: 4, render: () => <SurveyTorsoIcon region="circulation" className="w-16 h-20" style={{ color: '#fff' }} /> },
    { id: 't5', caption: 'D & E — Disability check, then fully expose the patient.', durationSeconds: 5, render: () => (
      <div className="flex gap-3"><SurveyTorsoIcon region="disability" className="w-16 h-20" style={{ color: '#fff' }} /><SurveyTorsoIcon region="exposure" className="w-16 h-20" style={{ color: '#fff' }} /></div>
    ) },
  ],
}
