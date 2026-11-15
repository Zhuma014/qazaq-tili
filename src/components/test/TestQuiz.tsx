import { useState } from 'react'
import { Feedback } from '@/components/ui/Feedback'
import { kk } from '@/i18n/kk'
import { progressActions, selectTestBest, useProgress } from '@/lib/progressStore'
import { shuffle } from '@/lib/random'
import type { TestQuestion } from '@/types/content'

interface TestQuizProps {
  topicId: string
  title: string
  questions: readonly TestQuestion[]
}

const LETTERS = ['А', 'Ә', 'Б', 'В'] as const

const verdictOf = (score: number, total: number) => {
  const ratio = score / total
  if (ratio >= 0.9) return kk.test.grades[3]
  if (ratio >= 0.7) return kk.test.grades[2]
  if (ratio >= 0.5) return kk.test.grades[1]
  return kk.test.grades[0]
}

const STAR_STEPS = [0.5, 0.7, 0.9] as const

/** Shuffles options so the right answer is not always in the same position. */
const shuffleOptions = (q: TestQuestion): TestQuestion => {
  const order = shuffle(q.options.map((_, i) => i))
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) }
}

export const TestQuiz = ({ topicId, title, questions: source }: TestQuizProps) => {
  const [questions, setQuestions] = useState(() => source.map(shuffleOptions))
  const [phase, setPhase] = useState<'intro' | 'play' | 'over'>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<readonly number[]>([])
  const best = useProgress(selectTestBest)[topicId]

  const total = questions.length
  const score = answers.filter((a, i) => a === questions[i].answer).length
  const current = questions[index]
  const chosen = answers[index]
  const isAnswered = chosen !== undefined

  const start = () => {
    setQuestions(source.map(shuffleOptions))
    setIndex(0)
    setAnswers([])
    setPhase('play')
  }

  const next = () => {
    if (index + 1 < total) {
      setIndex(index + 1)
      return
    }
    progressActions.saveTestScore(topicId, score)
    setPhase('over')
  }

  if (phase === 'intro') {
    return (
      <div className="card test-intro">
        <h2 className="task__title">📝 {title}</h2>
        <p>{kk.test.intro(total)}</p>
        <p className="game-intro__best">
          🏆 {kk.test.best}: {best !== undefined ? `${best} / ${total}` : kk.test.notTaken}
        </p>
        <button type="button" className="btn btn--primary btn--lg" onClick={start}>
          {kk.test.start}
        </button>
      </div>
    )
  }

  if (phase === 'over') {
    const stars = STAR_STEPS.filter((s) => score / total >= s).length
    return (
      <div className="card test-result" role="status">
        <div className="test-result__stars" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className={i < stars ? 'is-on' : ''}>★</span>
          ))}
        </div>
        <p className="test-result__score">{kk.test.result(score, total)}</p>
        <p>{verdictOf(score, total)}</p>
        <ol className="test-review">
          {questions.map((q, i) => (
            <li key={q.question} className={answers[i] === q.answer ? 'is-right' : 'is-wrong'}>
              <span>{q.question}</span>
              <b>{q.options[q.answer]}</b>
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn--primary" onClick={start}>
          🔄 {kk.test.again}
        </button>
      </div>
    )
  }

  return (
    <div className="card test">
      <div className="test__progress">
        <span>{kk.test.question(index + 1, total)}</span>
        <span className="test__bar" aria-hidden="true">
          {questions.map((q, i) => (
            <i key={q.question} className={i < answers.length ? (answers[i] === q.answer ? 'is-right' : 'is-wrong') : i === index ? 'is-now' : ''} />
          ))}
        </span>
      </div>
      <h2 className="test__question">{current.question}</h2>
      <div className="test__options">
        {current.options.map((o, i) => {
          const mark = isAnswered ? (i === current.answer ? 'is-right' : i === chosen ? 'is-wrong' : '') : ''
          return (
            <button
              key={o}
              type="button"
              className={`option ${mark}`}
              disabled={isAnswered}
              onClick={() => setAnswers([...answers.slice(0, index), i])}
            >
              <span className="option__letter">{LETTERS[i]}</span>
              {o}
            </button>
          )
        })}
      </div>
      {isAnswered && (
        <>
          <Feedback tone={chosen === current.answer ? 'success' : 'error'}>
            <b>{chosen === current.answer ? kk.test.right : kk.test.wrong}</b> {current.explanation}
          </Feedback>
          <button type="button" className="btn btn--primary" onClick={next}>
            {index + 1 < total ? kk.test.next : kk.test.finish} →
          </button>
        </>
      )}
    </div>
  )
}
