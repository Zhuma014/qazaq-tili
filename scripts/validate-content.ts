import { TOPICS } from '../src/data/topics'
import { PICTURE_ACTIVITIES } from '../src/data/pictureTasks'
import { findTargets } from '../src/lib/findText'
import type { Game, Task, Topic } from '../src/types/content'

const errors: string[] = []
const fail = (where: string, msg: string) => errors.push(`${where}: ${msg}`)
const dupes = (xs: string[]) => xs.filter((x, i) => xs.indexOf(x) !== i)

const checkTask = (where: string, t: Task) => {
  switch (t.kind) {
    case 'select':
      if (!t.words.some((w) => w.isCorrect)) fail(where, 'no correct words')
      if (dupes(t.words.map((w) => w.text)).length) fail(where, `duplicate words ${dupes(t.words.map((w) => w.text))}`)
      break
    case 'match':
      if (dupes(t.pairs.map((p) => p.left)).length || dupes(t.pairs.map((p) => p.right)).length) fail(where, 'duplicate pair side')
      break
    case 'sort': {
      const all = t.groups.flatMap((g) => g.items)
      if (dupes(all).length) fail(where, `duplicate items ${dupes(all)}`)
      break
    }
    case 'fill':
      t.items.forEach((i, n) => {
        if (!i.options.includes(i.answer)) fail(where, `item ${n} answer not in options`)
        if (dupes(i.options).length) fail(where, `item ${n} duplicate options`)
      })
      break
    case 'find': {
      const targets = findTargets(t.text)
      if (targets.length < 3) fail(where, `only ${targets.length} targets`)
      if ((t.text.match(/\[/g) ?? []).length !== targets.length) fail(where, 'bracket parse mismatch')
      break
    }
  }
}

const checkGame = (where: string, g: Game) => {
  switch (g.kind) {
    case 'quickfire':
      g.items.forEach((i) => !g.buckets.includes(i.bucket) && fail(where, `bad bucket ${i.bucket}`))
      if (dupes(g.items.map((i) => i.text)).length) fail(where, `duplicate items ${dupes(g.items.map((i) => i.text))}`)
      break
    case 'memory': {
      const all = g.pairs.flatMap((p) => [p.a, p.b])
      if (dupes(all).length) fail(where, `duplicate cards ${dupes(all)}`)
      break
    }
    case 'builder':
      g.items.forEach((i, n) => !i.options.includes(i.answer) && fail(where, `item ${n} answer not in options`))
      break
  }
}

const checkTopic = (t: Topic) => {
  if (t.tasks.length !== 5) fail(t.id, `${t.tasks.length} tasks`)
  if (t.test.length !== 10) fail(t.id, `${t.test.length} test questions`)
  t.tasks.forEach((task) => checkTask(`${t.id}/${task.id}`, task))
  checkGame(`${t.id}/game`, t.game)
  t.test.forEach((q, i) => {
    if (q.answer < 0 || q.answer >= q.options.length) fail(t.id, `test ${i + 1} bad answer index`)
    if (dupes(q.options).length) fail(t.id, `test ${i + 1} duplicate options`)
  })
  if (dupes(t.test.map((q) => q.question)).length) fail(t.id, 'duplicate test questions')
  t.table?.rows.forEach((r, i) => r.length !== t.table?.headers.length && fail(t.id, `table row ${i} width`))
}

TOPICS.forEach(checkTopic)
PICTURE_ACTIVITIES.forEach((a) => checkTask(`picture/${a.id}`, a.task))
if (dupes(TOPICS.map((t) => t.id)).length) fail('topics', 'duplicate ids')
const taskIds = [...TOPICS.flatMap((t) => t.tasks.map((x) => x.id)), ...PICTURE_ACTIVITIES.map((a) => a.task.id)]
if (dupes(taskIds).length) fail('tasks', `duplicate ids ${dupes(taskIds)}`)

const answerSpread = TOPICS.flatMap((t) => t.test.map((q) => q.answer)).reduce<Record<number, number>>(
  (acc, a) => ({ ...acc, [a]: (acc[a] ?? 0) + 1 }),
  {},
)
console.log('test answer index spread:', answerSpread)
console.log('games:', TOPICS.map((t) => `${t.id}:${t.game.kind}`).join(' '))

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`OK — ${TOPICS.length} topics validated`)
