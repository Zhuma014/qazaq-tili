import { GradeBadge } from '@/components/ui/GradeBadge'
import type { Task } from '@/types/content'
import { FillTaskView } from './FillTaskView'
import { FindTaskView } from './FindTaskView'
import { MatchTaskView } from './MatchTaskView'
import { SelectTaskView } from './SelectTaskView'
import { SortTaskView } from './SortTaskView'

interface TaskViewProps {
  task: Task
  number?: number
  onSolved?: () => void
}

const TaskBody = ({ task, onSolved }: TaskViewProps) => {
  switch (task.kind) {
    case 'select':
      return <SelectTaskView task={task} onSolved={onSolved} />
    case 'match':
      return <MatchTaskView task={task} onSolved={onSolved} />
    case 'sort':
      return <SortTaskView task={task} onSolved={onSolved} />
    case 'fill':
      return <FillTaskView task={task} onSolved={onSolved} />
    case 'find':
      return <FindTaskView task={task} onSolved={onSolved} />
  }
}

export const TaskView = ({ task, number, onSolved }: TaskViewProps) => (
  <article className="card task">
    <header className="task__head">
      <div>
        {number !== undefined && <span className="task__number">{number}</span>}
        <h2 className="task__title">{task.title}</h2>
      </div>
      <GradeBadge band={task.grade} />
    </header>
    <p className="task__instruction">{task.instruction}</p>
    <TaskBody key={task.id} task={task} onSolved={onSolved} />
  </article>
)
