// Core domain types — kept separate from UI components and clinical content (Section 51).

export type Role = 'learner' | 'instructor' | 'admin'

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived'

export type CourseKey = 'CPR' | 'BLS' | 'ACLS' | 'PALS' | 'NALS' | 'ATLS'

export interface UserProfile {
  id: string
  fullName: string
  email: string
  role: Role
  createdAt: string
}

/** Every clinical/algorithmic content item must carry provenance (Section 25). */
export interface ClinicalReference {
  sourceOrganization: string
  sourceTitle: string
  sourceUrl?: string
  publicationDate?: string
  reviewedDate?: string
  reviewerName?: string
  nextReviewDate?: string
  contentVersion: string
  status: ContentStatus
  isDemoOnly: boolean
}

export interface Course {
  id: string
  key: CourseKey
  title: string
  subtitle: string
  description: string
  objectives: string[]
  estimatedHours: number
  status: ContentStatus
  moduleIds: string[]
}

export interface Module {
  id: string
  courseId: string
  title: string
  description: string
  estimatedMinutes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  videoId?: string
  algorithmId?: string
  scenarioId?: string
  quizId?: string
  status: ContentStatus
}

export interface VideoChapter {
  id: string
  title: string
  startSeconds: number
}

export interface Video {
  id: string
  title: string
  courseKey: CourseKey
  durationSeconds: number
  sourceType: 'external' | 'hosted' | 'cdn'
  sourceUrl: string
  transcript?: string
  captionsUrl?: string
  chapters: VideoChapter[]
  status: ContentStatus
}

export interface VideoProgress {
  videoId: string
  userId: string
  watchedSeconds: number
  completed: boolean
  lastPositionSeconds: number
}

export type AlgorithmNodeType =
  | 'START'
  | 'ASSESSMENT'
  | 'DECISION'
  | 'ACTION'
  | 'MEDICATION'
  | 'PROCEDURE'
  | 'TIMER'
  | 'RHYTHM'
  | 'ALERT'
  | 'END'

export interface AlgorithmChoice {
  id: string
  label: string
  nextNodeId: string | null
  isCorrect: boolean
  feedback: string
}

export interface AlgorithmNode {
  id: string
  type: AlgorithmNodeType
  title: string
  description: string
  instructorNote?: string
  choices: AlgorithmChoice[]
  /** For linear (non-decision) nodes. */
  defaultNextNodeId?: string | null
}

export interface Algorithm {
  id: string
  title: string
  courseKey: CourseKey
  startNodeId: string
  nodes: Record<string, AlgorithmNode>
  reference: ClinicalReference
  status: ContentStatus
}

export interface ScenarioChoice {
  id: string
  label: string
  nextNodeId: string | null
  isCorrect: boolean
  consequence: string
}

export interface ScenarioNode {
  id: string
  prompt: string
  informationRevealed?: string
  choices: ScenarioChoice[]
}

export interface Scenario {
  id: string
  title: string
  courseKey: CourseKey
  patientType: string
  ageGroup: string
  setting: string
  initialCondition: string
  startNodeId: string
  nodes: Record<string, ScenarioNode>
  debriefPrompts: string[]
  reference: ClinicalReference
  status: ContentStatus
}

export interface ScenarioAttemptStep {
  nodeId: string
  choiceId: string
  correct: boolean
  timestamp: string
  responseTimeMs: number
}

export interface ScenarioAttempt {
  id: string
  scenarioId: string
  userId: string
  steps: ScenarioAttemptStep[]
  score: number
  completedAt?: string
}

export type QuestionType =
  | 'single_best'
  | 'multiple_response'
  | 'true_false'
  | 'sequence'
  | 'image_based'
  | 'rhythm_recognition'
  | 'scenario'
  | 'algorithm_decision'

export interface QuestionOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface Question {
  id: string
  type: QuestionType
  courseKey: CourseKey
  moduleId?: string
  text: string
  options: QuestionOption[]
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  learningObjective: string
  imageUrl?: string
  reference?: ClinicalReference
  status: ContentStatus
}

export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  answers: { questionId: string; selectedOptionIds: string[]; correct: boolean; responseTimeMs: number }[]
  scorePercent: number
  completedAt: string
}

export interface LearningObjective {
  id: string
  courseKey: CourseKey
  label: string
}

export interface MasteryRecord {
  userId: string
  objectiveId: string
  masteryPercent: number
  lastAttemptAt: string
  attempts: number
}

export interface CompetencyBreakdown {
  knowledge: number
  recognition: number
  decisionMaking: number
  technicalSequence: number
  teamCommunication: number
  timeCriticalResponse: number
  algorithmMastery: number
  simulationPerformance: number
  overall: number
}

export interface Certificate {
  id: string
  userId: string
  courseId: string
  completionDate: string
  scorePercent: number
  instructorName?: string
  certificateNumber: string
}
