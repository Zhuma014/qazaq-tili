export type SectionId = 'soz-taby' | 'zhalgau'

/** Grade band a task targets: 1–4 classes get pictures and short instructions, 5–8 get text analysis. */
export type GradeBand = '1-4' | '5-8' | '1-8'

export type AccentColor = 'sky' | 'coral' | 'sun' | 'mint' | 'violet' | 'rose' | 'teal' | 'amber' | 'indigo'

export interface Example {
  /** Main word or sentence. Wrap the highlighted part in **double asterisks**. */
  text: string
  /** Short explanation shown under the example. */
  note?: string
  emoji?: string
}

export interface RuleTable {
  caption?: string
  headers: string[]
  rows: string[][]
}

export interface RuleSection {
  title: string
  /** Paragraphs; **bold** is supported. */
  paragraphs?: string[]
  bullets?: string[]
}

/* ---------- Tasks (5 per topic) ---------- */

interface TaskBase {
  id: string
  title: string
  instruction: string
  grade: GradeBand
}

/** 1. Tap every word that belongs to the target category. */
export interface SelectTask extends TaskBase {
  kind: 'select'
  words: { text: string; isCorrect: boolean; emoji?: string }[]
}

/** 2. Pair left items with right items. */
export interface MatchTask extends TaskBase {
  kind: 'match'
  pairs: { left: string; right: string; emoji?: string }[]
}

/** 3. Distribute words into 2–3 groups. */
export interface SortTask extends TaskBase {
  kind: 'sort'
  groups: { title: string; items: string[] }[]
}

/** 4. Complete each sentence by choosing the right option for the gap. */
export interface FillTask extends TaskBase {
  kind: 'fill'
  items: { emoji?: string; before: string; after: string; options: string[]; answer: string }[]
}

/**
 * 5. Find target words in a short text. Mark targets with [square brackets]:
 * "[Ақ] қар жауды." — the bracket content is a correct target.
 */
export interface FindTask extends TaskBase {
  kind: 'find'
  text: string
}

export type Task = SelectTask | MatchTask | SortTask | FillTask | FindTask

/* ---------- Games (1 per topic) ---------- */

interface GameBase {
  title: string
  description: string
  grade: GradeBand
}

/** Words fly in one by one; the player sends each to the right bucket against the clock. */
export interface QuickfireGame extends GameBase {
  kind: 'quickfire'
  buckets: string[]
  items: { text: string; bucket: string }[]
}

/** Classic memory: flip cards and find pairs. */
export interface MemoryGame extends GameBase {
  kind: 'memory'
  pairs: { a: string; b: string }[]
}

/** Build the word: pick the correct ending (or missing letter) for each stem. */
export interface BuilderGame extends GameBase {
  kind: 'builder'
  items: { stem: string; options: string[]; answer: string; hint?: string }[]
}

export type Game = QuickfireGame | MemoryGame | BuilderGame

/* ---------- Test (10 questions per topic) ---------- */

export interface TestQuestion {
  question: string
  options: string[]
  /** Index into `options`. */
  answer: number
  explanation: string
}

/* ---------- Topic ---------- */

export interface Topic {
  id: string
  section: SectionId
  order: number
  title: string
  emoji: string
  color: AccentColor
  /** One-line teaser for cards. */
  tagline: string
  definition: string
  /** Grammatical questions the category answers, e.g. "Кім?", "Не?". */
  questions: string[]
  rules: RuleSection[]
  table?: RuleTable
  examples: Example[]
  tasks: Task[]
  game: Game
  test: TestQuestion[]
  /** Methodical tips for the teacher. */
  teacherTips: string[]
}
