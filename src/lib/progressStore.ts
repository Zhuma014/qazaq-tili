import { useSyncExternalStore } from 'react'

export type GradeFilter = 'all' | '1-4' | '5-8'

interface ProgressState {
  grade: GradeFilter
  doneTasks: Record<string, true>
  testBest: Record<string, number>
  gameBest: Record<string, number>
}

const STORAGE_KEY = 'qazaq-tili-progress-v1'
const INITIAL: ProgressState = { grade: 'all', doneTasks: {}, testBest: {}, gameBest: {} }

const load = (): ProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...INITIAL, ...(JSON.parse(raw) as Partial<ProgressState>) } : INITIAL
  } catch {
    return INITIAL
  }
}

let state: ProgressState = load()
const listeners = new Set<() => void>()

const setState = (next: ProgressState) => {
  state = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage may be unavailable (private mode); progress then lives only in memory.
  }
  listeners.forEach((l) => l())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const useProgress = <T,>(selector: (s: ProgressState) => T): T =>
  useSyncExternalStore(subscribe, () => selector(state))

export const progressActions = {
  setGrade: (grade: GradeFilter) => setState({ ...state, grade }),
  markTaskDone: (taskId: string) =>
    state.doneTasks[taskId] ? undefined : setState({ ...state, doneTasks: { ...state.doneTasks, [taskId]: true } }),
  saveTestScore: (topicId: string, score: number) =>
    score > (state.testBest[topicId] ?? -1) ? setState({ ...state, testBest: { ...state.testBest, [topicId]: score } }) : undefined,
  saveGameScore: (gameId: string, score: number) =>
    score > (state.gameBest[gameId] ?? -1) ? setState({ ...state, gameBest: { ...state.gameBest, [gameId]: score } }) : undefined,
}

export const selectGrade = (s: ProgressState) => s.grade
export const selectDoneTasks = (s: ProgressState) => s.doneTasks
export const selectTestBest = (s: ProgressState) => s.testBest
export const selectGameBest = (s: ProgressState) => s.gameBest

export const matchesGrade = (band: '1-4' | '5-8' | '1-8', filter: GradeFilter): boolean =>
  filter === 'all' || band === '1-8' || band === filter
