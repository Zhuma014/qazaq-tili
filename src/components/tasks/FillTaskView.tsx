import { useState } from 'react'
import { kk } from '@/i18n/kk'
import { shuffle } from '@/lib/random'
import type { FillTask } from '@/types/content'
import { TaskFooter } from './TaskFooter'
import { useTaskResult } from './useTaskResult'

interface FillTaskViewProps {
  task: FillTask
  onSolved?: () => void
}

const startsWithPunctuation = (s: string) => /^[.,!?:;]/.test(s)

export const FillTaskView = ({ task, onSolved }: FillTaskViewProps) => {
  const [items] = useState(() => task.items.map((item) => ({ ...item, options: shuffle(item.options) })))
  const [answers, setAnswers] = useState<readonly (string | null)[]>(() => task.items.map(() => null))
  const { result, isChecked, check, reset } = useTaskResult(onSolved)

  const choose = (index: number, option: string) =>
    setAnswers(answers.map((a, i) => (i === index ? option : a)))

  const handleCheck = () => check(items.filter((item, i) => answers[i] === item.answer).length, items.length)

  return (
    <div className="task-body">
      <ol className="fill-list">
        {items.map((item, i) => {
          const chosen = answers[i]
          const mark = isChecked ? (chosen === item.answer ? 'is-right' : 'is-wrong') : ''
          return (
            <li key={`${item.before}-${i}`} className={`fill-item ${mark}`}>
              {item.emoji && (
                <span className="fill-item__emoji" aria-hidden="true">
                  {item.emoji}
                </span>
              )}
              <div className="fill-item__main">
                <p className="fill-item__sentence">
                  {item.before}{' '}
                  <span className={`gap ${chosen ? 'gap--filled' : ''}`}>{chosen ?? '…'}</span>
                  {startsWithPunctuation(item.after) ? '' : ' '}
                  {item.after}
                </p>
                <div className="fill-item__options" role="group" aria-label={kk.task.fillPick}>
                  {item.options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      disabled={isChecked}
                      className={`chip chip--sm ${chosen === o ? 'is-picked' : ''}`}
                      aria-pressed={chosen === o}
                      onClick={() => choose(i, o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
      <TaskFooter
        result={result}
        canCheck={answers.every(Boolean)}
        onCheck={handleCheck}
        onReset={() => {
          setAnswers(task.items.map(() => null))
          reset()
        }}
      />
    </div>
  )
}
