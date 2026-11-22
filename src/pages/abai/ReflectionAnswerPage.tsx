import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { OptionGroup } from '@/components/abai/OptionGroup'
import { StudentShell } from '@/components/abai/StudentShell'
import { REFLECTION_METHOD } from '@/data/abai/reflection'
import { readSession } from '@/hooks/useLessonSession'
import { useSendAnswer } from '@/hooks/useSendAnswer'
import { kkAbai } from '@/i18n/kkAbai'
import { isReflectionAnswer, NAME_MAX_LENGTH } from '@/lib/abaiAnswers'
import { topicFor } from '@/lib/liveBoard'

interface AnswerForm {
  value: string | null
  name: string
}

const ReflectionForm = ({ session }: { session: string }) => {
  const { isSent, state, send } = useSendAnswer(topicFor(session, 'refleksiya-cup'))
  const { register, handleSubmit, formState } = useForm<AnswerForm>({ defaultValues: { value: null, name: '' } })

  if (isSent) return <p className="student__done">{kkAbai.reflection.sent}</p>

  const submit = ({ value, name }: AnswerForm) => {
    const answer = { value: value ?? '', name: name.trim() || undefined }
    if (isReflectionAnswer(answer)) void send(answer)
  }
  const isSending = state.status === 'sending'

  return (
    <form className="student__form" onSubmit={handleSubmit(submit)}>
      <OptionGroup
        method={REFLECTION_METHOD}
        field={register('value', { required: kkAbai.reflection.required })}
        error={formState.errors.value?.message}
      />
      <label className="student__name">
        {kkAbai.reflection.name}
        <input maxLength={NAME_MAX_LENGTH} autoComplete="given-name" {...register('name')} />
      </label>
      {state.status === 'error' && <p className="student__error">{kkAbai.reflection.error}</p>}
      <button type="submit" className="btn btn--primary btn--lg" disabled={isSending}>
        {isSending ? kkAbai.reflection.sending : kkAbai.reflection.send}
      </button>
    </form>
  )
}

export const ReflectionAnswerPage = () => {
  const [params] = useSearchParams()
  const session = readSession(params)

  return (
    <StudentShell title={kkAbai.reflection.studentTitle} lead={kkAbai.reflection.studentLead}>
      {session ? <ReflectionForm session={session} /> : <p className="student__error">{kkAbai.noSession}</p>}
    </StudentShell>
  )
}
