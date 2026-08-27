// DEMO SEED DATA — NOT FOR CLINICAL USE.
// This content is generic placeholder training-flow logic only. It is NOT sourced
// from AHA/ILCOR/ACLS/PALS/NALS/ATLS guidelines and must never be treated as such.
// Real deployments must replace every ClinicalReference with licensed, reviewed content
// (see Section 25 / 40 of the platform spec) before publishing.

import type {
  Algorithm, Course, Module, Video, Scenario, Question, LearningObjective, ClinicalReference,
} from '../types/domain'

const demoReference = (title: string): ClinicalReference => ({
  sourceOrganization: '[INSERT LICENSED SOURCE ORGANIZATION]',
  sourceTitle: title,
  contentVersion: 'DEMO-0.1',
  status: 'draft',
  isDemoOnly: true,
})

// Real, current provenance for the BLS/ACLS demo pathways below. The node text is
// paraphrased in our own words at a high level and is NOT a reproduction of the
// official AHA algorithm diagrams/text — those are copyrighted AHA works. Any real
// deployment must still route through the Section 40 clinical-review workflow before
// this leaves "draft" status, and must link out to cpr.heart.org for the authoritative
// algorithm rather than reproducing it.
const aha2025Reference = (title: string): ClinicalReference => ({
  sourceOrganization: 'American Heart Association (AHA) / ILCOR',
  sourceTitle: title,
  sourceUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines',
  publicationDate: '2025-10-22',
  contentVersion: '2025 AHA Guidelines for CPR & ECC',
  status: 'review',
  isDemoOnly: true,
})

export const courses: Course[] = [
  { id: 'course-cpr', key: 'CPR', title: 'CPR', subtitle: 'Cardiopulmonary Resuscitation',
    description: 'Foundational recognition and response skills for cardiac arrest.',
    objectives: ['Recognize cardiac arrest', 'Activate emergency response', 'Perform compressions and ventilation', 'Use an AED', 'Coordinate team CPR'],
    estimatedHours: 3, status: 'published', moduleIds: ['mod-cpr-1'] },
  { id: 'course-bls', key: 'BLS', title: 'BLS', subtitle: 'Basic Life Support',
    description: 'Guideline-aligned training framework for adult, pediatric, and infant basic life support.',
    objectives: ['Adult BLS sequence', 'Pediatric BLS sequence', 'Infant BLS sequence', 'AED use', 'Choking management', 'Team dynamics'],
    estimatedHours: 4, status: 'published', moduleIds: ['mod-bls-1'] },
  { id: 'course-acls', key: 'ACLS', title: 'ACLS', subtitle: 'Advanced Cardiovascular Life Support',
    description: 'Guideline-aligned training framework for advanced cardiac arrest and peri-arrest management.',
    objectives: ['VF/pulseless VT management', 'PEA/asystole management', 'Bradycardia/tachycardia', 'Post-arrest care', 'ACS and stroke recognition'],
    estimatedHours: 6, status: 'published', moduleIds: ['mod-acls-1'] },
  { id: 'course-pals', key: 'PALS', title: 'PALS', subtitle: 'Pediatric Advanced Life Support',
    description: 'Guideline-aligned training framework for pediatric emergencies.',
    objectives: ['Pediatric assessment', 'Respiratory emergencies', 'Shock recognition', 'Pediatric cardiac arrest'],
    estimatedHours: 5, status: 'published', moduleIds: ['mod-pals-1'] },
  { id: 'course-nals', key: 'NALS', title: 'NALS', subtitle: 'Neonatal Advanced Life Support',
    description: 'Guideline-aligned training framework for newborn stabilization and resuscitation.',
    objectives: ['Initial newborn assessment', 'Initial stabilization', 'Ventilation', 'Chest compressions', 'Advanced airway and medications'],
    estimatedHours: 5, status: 'published', moduleIds: ['mod-nals-1'] },
  { id: 'course-atls', key: 'ATLS', title: 'ATLS', subtitle: 'Advanced Trauma Life Support',
    description: 'Guideline-aligned training framework for the systematic trauma primary and secondary survey.',
    objectives: ['Scene assessment', 'Primary survey (ABCDE)', 'Secondary survey', 'Trauma resuscitation', 'Shock recognition'],
    estimatedHours: 6, status: 'published', moduleIds: ['mod-atls-1'] },
]

export const modules: Module[] = [
  { id: 'mod-cpr-1', courseId: 'course-cpr', title: 'Recognizing Cardiac Arrest', description: 'Recognition and activation sequence.',
    estimatedMinutes: 25, difficulty: 'beginner', videoId: 'vid-cpr-1', algorithmId: 'algo-cpr-1', quizId: 'quiz-cpr-1', status: 'published' },
  { id: 'mod-bls-1', courseId: 'course-bls', title: 'Adult Cardiac Arrest Recognition', description: 'Adult BLS sequence and AED use.',
    estimatedMinutes: 30, difficulty: 'beginner', videoId: 'vid-bls-1', algorithmId: 'algo-bls-1', scenarioId: 'scn-bls-1', quizId: 'quiz-bls-1', status: 'published' },
  { id: 'mod-acls-1', courseId: 'course-acls', title: 'Shockable Rhythm Management', description: 'VF/pulseless VT decision pathway.',
    estimatedMinutes: 40, difficulty: 'advanced', videoId: 'vid-acls-1', algorithmId: 'algo-acls-1', scenarioId: 'scn-acls-1', quizId: 'quiz-acls-1', status: 'published' },
  { id: 'mod-pals-1', courseId: 'course-pals', title: 'Pediatric Assessment Triangle', description: 'Rapid pediatric assessment framework.',
    estimatedMinutes: 30, difficulty: 'intermediate', videoId: 'vid-pals-1', algorithmId: 'algo-pals-1', quizId: 'quiz-pals-1', status: 'published' },
  { id: 'mod-nals-1', courseId: 'course-nals', title: 'Initial Newborn Stabilization', description: 'First-minute newborn assessment sequence.',
    estimatedMinutes: 30, difficulty: 'intermediate', videoId: 'vid-nals-1', algorithmId: 'algo-nals-1', quizId: 'quiz-nals-1', status: 'published' },
  { id: 'mod-atls-1', courseId: 'course-atls', title: 'Primary Survey (ABCDE)', description: 'Systematic trauma primary survey.',
    estimatedMinutes: 35, difficulty: 'advanced', videoId: 'vid-atls-1', algorithmId: 'algo-atls-1', quizId: 'quiz-atls-1', status: 'published' },
]

export const videos: Video[] = modules.map((m) => ({
  id: m.videoId!,
  title: `${m.title} — Overview`,
  courseKey: courses.find((c) => c.id === m.courseId)!.key,
  durationSeconds: 512,
  sourceType: 'external',
  sourceUrl: '',
  chapters: [
    { id: 'ch1', title: 'Introduction', startSeconds: 0 },
    { id: 'ch2', title: 'Key decision points', startSeconds: 180 },
    { id: 'ch3', title: 'Summary', startSeconds: 420 },
  ],
  status: 'draft',
}))

// Generic, clearly-fictional decision-flow logic (NOT clinical guidance).
function demoAlgorithm(id: string, title: string, courseKey: Algorithm['courseKey']): Algorithm {
  return {
    id,
    title,
    courseKey,
    startNodeId: 'n1',
    reference: demoReference(`[INSERT CURRENT ${courseKey} ALGORITHM]`),
    status: 'draft',
    nodes: {
      n1: { id: 'n1', type: 'START', title: 'Scenario begins', description: 'A patient requires assessment.', choices: [], defaultNextNodeId: 'n2' },
      n2: {
        id: 'n2', type: 'ASSESSMENT', title: 'Initial assessment', description: 'Assess the patient using your standard sequence.',
        choices: [], defaultNextNodeId: 'n3',
      },
      n3: {
        id: 'n3', type: 'DECISION', title: 'Is the patient responsive?', description: 'Choose the branch that matches your assessment finding.',
        choices: [
          { id: 'c1', label: 'Yes — responsive', nextNodeId: 'n4', isCorrect: false, feedback: 'This demo branch is a placeholder; consult licensed course content for the actual pathway.' },
          { id: 'c2', label: 'No — unresponsive', nextNodeId: 'n5', isCorrect: true, feedback: 'Placeholder feedback: an unresponsive finding continues toward emergency activation in this demo flow.' },
        ],
      },
      n4: { id: 'n4', type: 'ACTION', title: 'Continue reassessment', description: 'Placeholder action node.', choices: [], defaultNextNodeId: 'n6' },
      n5: { id: 'n5', type: 'ACTION', title: 'Activate emergency response', description: 'Placeholder action node.', choices: [], defaultNextNodeId: 'n6' },
      n6: { id: 'n6', type: 'END', title: 'Algorithm complete', description: 'This is a demo pathway only.', choices: [] },
    },
  }
}

// Adult BLS pathway — paraphrased at a high level from publicly reported 2025 AHA/ILCOR
// guideline highlights (unified Chain of Survival, naloxone step for suspected opioid
// emergencies, revised choking sequence). This is a training-flow summary, not the
// official AHA algorithm artwork or verbatim text, and is marked "review" pending a
// licensed clinical reviewer signing off against the primary source before publish.
function blsAlgorithm2025(): Algorithm {
  return {
    id: 'algo-bls-1',
    title: 'Adult BLS Sequence — 2025 Guideline-Aligned Training Framework',
    courseKey: 'BLS',
    startNodeId: 'b1',
    reference: aha2025Reference('Part 7: Adult Basic Life Support — 2025 AHA Guidelines for CPR and ECC'),
    status: 'review',
    nodes: {
      b1: { id: 'b1', type: 'START', title: 'Scene safety', description: 'Confirm the scene is safe before approaching the patient.', choices: [], defaultNextNodeId: 'b2' },
      b2: { id: 'b2', type: 'ASSESSMENT', title: 'Check responsiveness and breathing', description: 'Tap and shout. Check for normal breathing (no more than 10 seconds).', choices: [], defaultNextNodeId: 'b3' },
      b3: {
        id: 'b3', type: 'DECISION', title: 'Responsive and breathing normally?', description: 'Choose the branch matching your finding.',
        choices: [
          { id: 'bc1', label: 'Responsive, breathing normally', nextNodeId: 'b4', isCorrect: false, feedback: 'Monitor and reassess; this pathway continues toward first-aid care, not covered in this demo module.' },
          { id: 'bc2', label: 'Unresponsive, not breathing normally / gasping', nextNodeId: 'b5', isCorrect: true, feedback: 'Correct — treat agonal/absent breathing as cardiac arrest and activate the emergency response system.' },
        ],
      },
      b4: { id: 'b4', type: 'ACTION', title: 'Continue monitoring', description: 'Reassess periodically; escalate if condition changes.', choices: [], defaultNextNodeId: 'b9' },
      b5: { id: 'b5', type: 'ACTION', title: 'Activate emergency response & get an AED', description: 'Call for help / activate EMS and send someone for an AED, per your local activation protocol.', choices: [], defaultNextNodeId: 'b6' },
      b6: { id: 'b6', type: 'DECISION', title: 'Suspected opioid-associated emergency?', description: 'The 2025 guideline update highlights a naloxone decision point for suspected opioid overdose during resuscitation. Follow your institutional protocol for administration.', choices: [
          { id: 'bc3', label: 'Suspected opioid overdose, pulse present', nextNodeId: 'b7', isCorrect: true, feedback: 'Consider naloxone per local protocol while continuing to support airway/breathing; this does not replace standard arrest management if no pulse is present.' },
          { id: 'bc4', label: 'No suspicion of opioid involvement', nextNodeId: 'b8', isCorrect: true, feedback: 'Proceed directly to high-quality CPR.' },
        ],
      },
      b7: { id: 'b7', type: 'MEDICATION', title: 'Naloxone per local protocol', description: 'Administer per your institution\u2019s current opioid-emergency protocol; continue to reassess airway, breathing, and pulse.', choices: [], defaultNextNodeId: 'b8' },
      b8: { id: 'b8', type: 'ACTION', title: 'Begin high-quality CPR', description: 'Push hard and fast on the center of the chest; allow full recoil; minimize interruptions; attach the AED as soon as available and follow its prompts.', choices: [], defaultNextNodeId: 'b9' },
      b9: { id: 'b9', type: 'END', title: 'Continue per team/EMS protocol', description: 'Continue CPR/AED cycles and reassessment until EMS/advanced providers take over or ROSC occurs. Training pathway ends here.', choices: [] },
    },
  }
}

// Adult shockable-rhythm ACLS pathway — same paraphrase/citation approach as above.
function aclsShockableAlgorithm2025(): Algorithm {
  return {
    id: 'algo-acls-1',
    title: 'Adult Cardiac Arrest — Shockable Rhythm Training Framework',
    courseKey: 'ACLS',
    startNodeId: 'a1',
    reference: aha2025Reference('Part 9: Adult Advanced Life Support — 2025 AHA Guidelines for CPR and ECC'),
    status: 'review',
    nodes: {
      a1: { id: 'a1', type: 'START', title: 'Cardiac arrest confirmed', description: 'High-quality CPR is already in progress; a rhythm check is due.', choices: [], defaultNextNodeId: 'a2' },
      a2: { id: 'a2', type: 'RHYTHM', title: 'Rhythm check', description: 'Pause compressions briefly to check the rhythm.', choices: [], defaultNextNodeId: 'a3' },
      a3: {
        id: 'a3', type: 'DECISION', title: 'Is the rhythm shockable?', description: 'Choose the branch matching the monitor.',
        choices: [
          { id: 'ac1', label: 'Shockable (VF / pulseless VT)', nextNodeId: 'a4', isCorrect: true, feedback: 'Correct — resume compressions while the defibrillator charges, then deliver one shock as soon as ready.' },
          { id: 'ac2', label: 'Non-shockable (PEA / asystole)', nextNodeId: 'a6', isCorrect: false, feedback: 'This demo branch does not model the PEA/asystole pathway — see the separate training module for that sequence.' },
        ],
      },
      a4: { id: 'a4', type: 'ACTION', title: 'Deliver one shock, resume CPR immediately', description: 'Resume chest compressions immediately after the shock; do not pause to recheck rhythm or pulse.', choices: [], defaultNextNodeId: 'a5' },
      a5: { id: 'a5', type: 'MEDICATION', title: 'Vasopressor / antiarrhythmic per protocol', description: 'Give epinephrine per your institution\u2019s current dosing/timing protocol; consider amiodarone or lidocaine for refractory VF/VT per protocol.', choices: [], defaultNextNodeId: 'a7' },
      a6: { id: 'a6', type: 'ACTION', title: 'Non-shockable pathway (see PEA/asystole module)', description: 'Continue CPR, treat reversible causes, and give vasopressor per protocol.', choices: [], defaultNextNodeId: 'a7' },
      a7: { id: 'a7', type: 'END', title: 'Continue cycles until ROSC or termination', description: 'Repeat rhythm checks every ~2 minutes; consider reversible causes throughout. Training pathway ends here.', choices: [] },
    },
  }
}

export const algorithms: Algorithm[] = modules
  .filter((m) => m.algorithmId)
  .map((m) => {
    if (m.algorithmId === 'algo-bls-1') return blsAlgorithm2025()
    if (m.algorithmId === 'algo-acls-1') return aclsShockableAlgorithm2025()
    return demoAlgorithm(m.algorithmId!, `DEMO — ${m.title} Algorithm`, courses.find((c) => c.id === m.courseId)!.key)
  })

function demoScenario(id: string, title: string, courseKey: Scenario['courseKey']): Scenario {
  return {
    id,
    title,
    courseKey,
    patientType: 'Adult',
    ageGroup: 'Adult',
    setting: 'General ward',
    initialCondition: 'You arrive at a patient who has suddenly collapsed.',
    startNodeId: 's1',
    reference: demoReference(`[INSERT CURRENT ${courseKey} SCENARIO SOURCE]`),
    status: 'draft',
    debriefPrompts: ['What you did well', 'Where you deviated', 'Decision points to review', 'Recommended learning'],
    nodes: {
      s1: {
        id: 's1', prompt: 'What do you do first?',
        choices: [
          { id: 'sc1', label: 'Check responsiveness and call for help', nextNodeId: 's2', isCorrect: true, consequence: 'Placeholder consequence text.' },
          { id: 'sc2', label: 'Begin compressions immediately without assessment', nextNodeId: 's2', isCorrect: false, consequence: 'Placeholder consequence text — review assessment-first sequencing.' },
        ],
      },
      s2: {
        id: 's2', prompt: 'What should happen next?',
        choices: [
          { id: 'sc3', label: 'Continue per your standard sequence', nextNodeId: null, isCorrect: true, consequence: 'Scenario complete (demo).' },
        ],
      },
    },
  }
}

export const scenarios: Scenario[] = modules
  .filter((m) => m.scenarioId)
  .map((m) => demoScenario(m.scenarioId!, `DEMO — ${m.title} Scenario`, courses.find((c) => c.id === m.courseId)!.key))

export const questions: Question[] = modules.map((m, i) => ({
  id: `q-${m.id}-1`,
  type: 'single_best',
  courseKey: courses.find((c) => c.id === m.courseId)!.key,
  moduleId: m.id,
  text: `DEMO question ${i + 1}: which action best matches the placeholder sequence taught in "${m.title}"?`,
  options: [
    { id: 'o1', text: 'Follow the assess → activate → intervene → reassess sequence', isCorrect: true },
    { id: 'o2', text: 'Skip assessment and intervene immediately', isCorrect: false },
    { id: 'o3', text: 'Wait for additional staff before any action', isCorrect: false },
  ],
  explanation: 'Placeholder explanation — replace with reviewed, referenced clinical rationale before publishing.',
  difficulty: 'easy',
  learningObjective: `Applies the ${m.title} sequence`,
  reference: demoReference(`[INSERT CURRENT ${courses.find((c) => c.id === m.courseId)!.key} REFERENCE]`),
  status: 'draft',
}))

export const learningObjectives: LearningObjective[] = courses.map((c) => ({
  id: `lo-${c.key}`,
  courseKey: c.key,
  label: `Demonstrates core ${c.key} decision sequence`,
}))
