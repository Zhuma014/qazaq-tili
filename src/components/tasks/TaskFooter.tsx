import { Feedback } from '@/components/ui/Feedback'
import { kk } from '@/i18n/kk'
import type { TaskResult } from './useTaskResult'

interface TaskFooterProps {
  result: TaskResult | null
  canCheck: boolean
  onCheck: () => void
  onReset: () => void
}

export const TaskFooter = ({ result, canCheck, onCheck, onReset }: TaskFooterProps) => {
  const isSolved = result !== null && result.ok === result.total
  return (
    <div className="task-footer">
      {result && (
        <Feedback tone={isSolved ? 'success' : 'warning'}>
          {isSolved ? kk.task.correct : kk.task.partly(result.ok, result.total)}
        </Feedback>
      )}
      <div className="task-footer__actions">
        {!result && (
          <button type="button" className="btn btn--primary" disabled={!canCheck} onClick={onCheck}>
            {kk.task.check}
          </button>
        )}
        {result && !isSolved && (
          <button type="button" className="btn btn--primary" onClick={onReset}>
            {kk.task.retry}
          </button>
        )}
      </div>
    </div>
  )
}
