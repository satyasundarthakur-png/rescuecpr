import type { Algorithm, AlgorithmNode } from '../types/domain'

export type AlgorithmMode = 'learn' | 'practice' | 'test'

export interface AlgorithmRunState {
  currentNodeId: string
  visitedNodeIds: string[]
  errors: { nodeId: string; choiceId: string }[]
  startedAt: number
  finishedAt: number | null
}

export function startAlgorithm(algorithm: Algorithm): AlgorithmRunState {
  return {
    currentNodeId: algorithm.startNodeId,
    visitedNodeIds: [algorithm.startNodeId],
    errors: [],
    startedAt: Date.now(),
    finishedAt: null,
  }
}

export function currentNode(algorithm: Algorithm, state: AlgorithmRunState): AlgorithmNode {
  return algorithm.nodes[state.currentNodeId]!
}

/** Advance a linear (non-decision) node. */
export function advance(algorithm: Algorithm, state: AlgorithmRunState): AlgorithmRunState {
  const node = currentNode(algorithm, state)
  const nextId = node.defaultNextNodeId ?? null
  return applyNext(algorithm, state, nextId)
}

/** Choose a branch on a DECISION node. */
export function choose(algorithm: Algorithm, state: AlgorithmRunState, choiceId: string): AlgorithmRunState {
  const node = currentNode(algorithm, state)
  const choice = node.choices.find((c) => c.id === choiceId)
  if (!choice) return state
  const errors = choice.isCorrect ? state.errors : [...state.errors, { nodeId: node.id, choiceId }]
  return applyNext(algorithm, { ...state, errors }, choice.nextNodeId)
}

function applyNext(algorithm: Algorithm, state: AlgorithmRunState, nextId: string | null): AlgorithmRunState {
  if (!nextId) {
    return { ...state, finishedAt: Date.now() }
  }
  const nextNode = algorithm.nodes[nextId]
  const finished = nextNode!.type === 'END'
  return {
    ...state,
    currentNodeId: nextId,
    visitedNodeIds: [...state.visitedNodeIds, nextId],
    finishedAt: finished ? Date.now() : null,
  }
}

export function score(state: AlgorithmRunState) {
  const decisionsMade = state.visitedNodeIds.length
  const errorCount = state.errors.length
  const accuracy = decisionsMade === 0 ? 100 : Math.max(0, Math.round(100 * (1 - errorCount / decisionsMade)))
  const timeMs = (state.finishedAt ?? Date.now()) - state.startedAt
  return { accuracy, errorCount, timeMs }
}
