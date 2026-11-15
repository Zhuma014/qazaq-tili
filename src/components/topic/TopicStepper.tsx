import { NavLink } from 'react-router-dom'
import { selectDoneTasks, selectTestBest, useProgress } from '@/lib/progressStore'
import type { Topic } from '@/types/content'
import type { TopicStep } from './topicSteps'

interface TopicStepperProps {
  topic: Topic
  steps: TopicStep[]
}

export const TopicStepper = ({ topic, steps }: TopicStepperProps) => {
  const done = useProgress(selectDoneTasks)
  const testBest = useProgress(selectTestBest)

  const isDone = (step: TopicStep) => {
    if (step.kind === 'task' && step.taskIndex !== undefined) return Boolean(done[topic.tasks[step.taskIndex].id])
    if (step.kind === 'test') return testBest[topic.id] !== undefined
    return false
  }

  return (
    <nav className="stepper" aria-label={topic.title}>
      <ol>
        {steps.map((s) => (
          <li key={s.slug}>
            <NavLink
              to={`/taqyryp/${topic.id}/${s.slug}`}
              className={({ isActive }) => `stepper__item ${isActive ? 'is-active' : ''} ${isDone(s) ? 'is-done' : ''}`}
              title={s.label}
            >
              <span className="stepper__dot" aria-hidden="true">
                {isDone(s) ? '✓' : s.short}
              </span>
              <span className="stepper__label">{s.label}</span>
            </NavLink>
          </li>
        ))}
      </ol>
    </nav>
  )
}
