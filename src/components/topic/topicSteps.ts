import { kk } from '@/i18n/kk'
import type { Topic } from '@/types/content'

export type StepKind = 'rule' | 'task' | 'game' | 'test' | 'worksheet'

export interface TopicStep {
  slug: string
  kind: StepKind
  label: string
  short: string
  taskIndex?: number
}

export const buildSteps = (topic: Topic): TopicStep[] => [
  { slug: 'ereje', kind: 'rule', label: kk.topic.steps.rule, short: '📖' },
  ...topic.tasks.map((_, i) => ({
    slug: `tapsyrma-${i + 1}`,
    kind: 'task' as const,
    label: kk.topic.steps.task(i + 1),
    short: String(i + 1),
    taskIndex: i,
  })),
  { slug: 'oiyn', kind: 'game', label: kk.topic.steps.game, short: '🎮' },
  { slug: 'test', kind: 'test', label: kk.topic.steps.test, short: '📝' },
  { slug: 'paraq', kind: 'worksheet', label: kk.topic.steps.worksheet, short: '📄' },
]
