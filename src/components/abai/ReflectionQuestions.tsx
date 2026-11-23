import { kkAbai } from '@/i18n/kkAbai'
import type { LiveMessage } from '@/lib/liveBoard'
import type { ReflectionAnswer } from '@/types/abai'

interface ReflectionQuestionsProps {
  answers: readonly LiveMessage<ReflectionAnswer>[]
}

/** The «Сұрағым» notes students left with their reflection, shown on the board. */
export const ReflectionQuestions = ({ answers }: ReflectionQuestionsProps) => {
  const withQuestion = answers.filter((a) => a.data.question)

  return (
    <section className="result-card">
      <h3>{kkAbai.reflection.questionsTitle}</h3>
      {withQuestion.length === 0 && <p className="muted">{kkAbai.reflection.noQuestions}</p>}
      {withQuestion.length > 0 && (
        <ul className="questions">
          {withQuestion.map((a) => (
            <li key={a.id} className="questions__item">
              <p className="questions__text">{a.data.question}</p>
              <small className="questions__name">— {a.data.name ?? kkAbai.reflection.anonymous}</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
