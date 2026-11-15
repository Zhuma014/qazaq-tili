import { useMemo, useState } from 'react'
import { kk } from '@/i18n/kk'
import { parseFindText } from '@/lib/findText'
import type { FindTask } from '@/types/content'
import { TaskFooter } from './TaskFooter'
import { useTaskResult } from './useTaskResult'

interface FindTaskViewProps {
  task: FindTask
  onSolved?: () => void
}

export const FindTaskView = ({ task, onSolved }: FindTaskViewProps) => {
  const tokens = useMemo(() => parseFindText(task.text), [task.text])
  const [picked, setPicked] = useState<ReadonlySet<number>>(new Set())
  const { result, isChecked, check, reset } = useTaskResult(onSolved)

  const toggle = (id: number) => {
    const next = new Set(picked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setPicked(next)
  }

  const handleCheck = () => {
    const targets = tokens.filter((t) => t.isTarget)
    const hits = targets.filter((t) => picked.has(t.id)).length
    const falsePicks = tokens.filter((t) => !t.isTarget && picked.has(t.id)).length
    check(Math.max(0, hits - falsePicks), targets.length)
  }

  const markOf = (id: number, isTarget: boolean) => {
    const isPicked = picked.has(id)
    if (!isChecked) return isPicked ? 'is-picked' : ''
    if (isPicked) return isTarget ? 'is-right' : 'is-wrong'
    return isTarget ? 'is-missed' : ''
  }

  return (
    <div className="task-body">
      <p className="task-hint">{kk.task.findHint}</p>
      <p className="find-text">
        {tokens.map((t) => (
          <span key={t.id}>
            {t.lead}
            <button
              type="button"
              disabled={isChecked}
              className={`find-word ${markOf(t.id, t.isTarget)}`}
              aria-pressed={picked.has(t.id)}
              onClick={() => toggle(t.id)}
            >
              {t.word}
            </button>
            {t.trail}{' '}
          </span>
        ))}
      </p>
      <TaskFooter
        result={result}
        canCheck={picked.size > 0}
        onCheck={handleCheck}
        onReset={() => {
          setPicked(new Set())
          reset()
        }}
      />
    </div>
  )
}
