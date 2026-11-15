import { Navigate, useParams } from 'react-router-dom'
import { GameView } from '@/components/games/GameView'
import { TaskView } from '@/components/tasks/TaskView'
import { TestQuiz } from '@/components/test/TestQuiz'
import { StepNav } from '@/components/topic/StepNav'
import { TopicRule } from '@/components/topic/TopicRule'
import { TopicStepper } from '@/components/topic/TopicStepper'
import { buildSteps, type TopicStep } from '@/components/topic/topicSteps'
import { WorksheetLinks } from '@/components/topic/WorksheetLinks'
import { PageHeader } from '@/components/ui/PageHeader'
import { RichText } from '@/components/ui/RichText'
import { findTopic } from '@/data/topics'
import { kk } from '@/i18n/kk'
import { progressActions } from '@/lib/progressStore'
import type { Topic } from '@/types/content'

const StepContent = ({ topic, step }: { topic: Topic; step: TopicStep }) => {
  switch (step.kind) {
    case 'rule':
      return <TopicRule topic={topic} />
    case 'task': {
      const task = topic.tasks[step.taskIndex ?? 0]
      return (
        <TaskView
          task={task}
          number={(step.taskIndex ?? 0) + 1}
          onSolved={() => progressActions.markTaskDone(task.id)}
        />
      )
    }
    case 'game':
      return <GameView game={topic.game} gameId={topic.id} />
    case 'test':
      return <TestQuiz topicId={topic.id} title={`${topic.title}: ${kk.topic.steps.test}`} questions={topic.test} />
    case 'worksheet':
      return (
        <div className="card finish">
          <span className="finish__emoji" aria-hidden="true">🏆</span>
          <h2>{kk.topic.finishTitle}</h2>
          <p>{kk.topic.finishLead}</p>
          <WorksheetLinks topicId={topic.id} />
        </div>
      )
  }
}

export const TopicPage = () => {
  const { topicId, step: stepSlug } = useParams()
  const topic = findTopic(topicId)
  if (!topic) return <Navigate to="/404" replace />

  const steps = buildSteps(topic)
  const index = steps.findIndex((s) => s.slug === stepSlug)
  if (index < 0) return <Navigate to={`/taqyryp/${topic.id}/ereje`} replace />

  const step = steps[index]
  const prev = steps[index - 1]
  const next = steps[index + 1]
  const base = `/taqyryp/${topic.id}`

  return (
    <div className={`topic-page accent-${topic.color}`}>
      <PageHeader emoji={topic.emoji} title={topic.title} color={topic.color} />
      <RichText as="p" text={topic.tagline} className="topic-page__tagline" />
      <TopicStepper topic={topic} steps={steps} />
      <StepContent key={step.slug} topic={topic} step={step} />
      <StepNav
        prevTo={prev && `${base}/${prev.slug}`}
        nextTo={next && `${base}/${next.slug}`}
        nextLabel={next?.kind === 'task' ? kk.topic.nextTask : next?.label}
      />
    </div>
  )
}
