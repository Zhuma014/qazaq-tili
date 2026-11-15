import type { Game, Task } from '@/types/content'
import { buildWord } from './buildWord'
import { findTargets } from './findText'

/** Human-readable answer lines for a task (used on the teacher page). */
export const taskAnswerLines = (task: Task): string[] => {
  switch (task.kind) {
    case 'select':
      return [task.words.filter((w) => w.isCorrect).map((w) => w.text).join(', ')]
    case 'match':
      return task.pairs.map((p) => `${p.left} — ${p.right}`)
    case 'sort':
      return task.groups.map((g) => `${g.title}: ${g.items.join(', ')}`)
    case 'fill':
      return task.items.map((i) => `${i.before} ${i.answer.toUpperCase()} ${i.after}`.replace(/\s+([.,!?])/g, '$1'))
    case 'find':
      return [findTargets(task.text).join(', ')]
  }
}

export const gameAnswerLines = (game: Game): string[] => {
  switch (game.kind) {
    case 'quickfire':
      return game.buckets.map(
        (b) => `${b}: ${game.items.filter((i) => i.bucket === b).map((i) => i.text).join(', ')}`,
      )
    case 'memory':
      return game.pairs.map((p) => `${p.a} — ${p.b}`)
    case 'builder':
      return game.items.map((i) => buildWord(i.stem, i.answer))
  }
}
