import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { StudentShell } from '@/components/abai/StudentShell'
import { readSession } from '@/hooks/useLessonSession'
import { useSendAnswer } from '@/hooks/useSendAnswer'
import { kkAbai } from '@/i18n/kkAbai'
import { CLUSTER_MAX_LENGTH } from '@/lib/abaiAnswers'
import { topicFor } from '@/lib/liveBoard'

interface ClusterForm {
  text: string
}

const ClusterForm = ({ session }: { session: string }) => {
  const { isSent, state, send } = useSendAnswer(topicFor(session, 'klaster'))
  const { register, handleSubmit, formState } = useForm<ClusterForm>({ defaultValues: { text: '' } })

  if (isSent) return <p className="student__done">{kkAbai.cluster.sent}</p>

  const isSending = state.status === 'sending'
  return (
    <form className="student__form" onSubmit={handleSubmit(({ text }) => send({ text: text.trim() }))}>
      <label htmlFor="cluster-text" className="visually-hidden">
        {kkAbai.cluster.studentPrompt}
      </label>
      <input
        id="cluster-text"
        className="student__input"
        maxLength={CLUSTER_MAX_LENGTH}
        placeholder={kkAbai.cluster.placeholder}
        autoComplete="off"
        {...register('text', { validate: (v) => v.trim().length > 0 || kkAbai.cluster.required })}
      />
      {formState.errors.text && <p className="student__error">{formState.errors.text.message}</p>}
      {state.status === 'error' && <p className="student__error">{kkAbai.cluster.error}</p>}
      <button type="submit" className="btn btn--primary btn--lg" disabled={isSending}>
        {isSending ? kkAbai.cluster.sending : kkAbai.cluster.send}
      </button>
    </form>
  )
}

export const ClusterAnswerPage = () => {
  const [params] = useSearchParams()
  const session = readSession(params)

  return (
    <StudentShell title={kkAbai.cluster.studentTitle} lead={kkAbai.cluster.studentPrompt}>
      {session ? <ClusterForm session={session} /> : <p className="student__error">{kkAbai.noSession}</p>}
    </StudentShell>
  )
}
