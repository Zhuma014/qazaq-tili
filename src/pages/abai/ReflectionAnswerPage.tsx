import { type UseFormRegisterReturn, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { OptionGroup } from '@/components/abai/OptionGroup'
import { StudentShell } from '@/components/abai/StudentShell'
import { findMethod, type ReflectionMethod, type TextMethod } from '@/data/abai/reflection'
import { readSession } from '@/hooks/useLessonSession'
import { useSendAnswer } from '@/hooks/useSendAnswer'
import { kkAbai } from '@/i18n/kkAbai'
import { NAME_MAX_LENGTH, REFLECTION_GUARDS, SENTENCE_MAX_LENGTH } from '@/lib/abaiAnswers'
import { topicFor } from '@/lib/liveBoard'

interface AnswerForm {
  value: string | null
  name: string
}

type ValueField = UseFormRegisterReturn<'value'>

const SentenceField = ({ method, field }: { method: TextMethod; field: ValueField }) => (
  <fieldset className="option-group">
    <legend>
      <span className="option-group__num">{method.number}</span> {method.title}
    </legend>
    <label htmlFor="refl-sentence" className="option-group__question">
      {method.question}
    </label>
    <textarea id="refl-sentence" rows={4} maxLength={SENTENCE_MAX_LENGTH} placeholder={method.placeholder} {...field} />
  </fieldset>
)

const MethodForm = ({ session, method }: { session: string; method: ReflectionMethod }) => {
  const { isSent, state, send } = useSendAnswer(topicFor(session, `refleksiya-${method.id}`))
  const { register, handleSubmit, formState } = useForm<AnswerForm>({ defaultValues: { value: null, name: '' } })

  if (isSent) return <p className="student__done">{kkAbai.reflection.sent}</p>

  const submit = ({ value, name }: AnswerForm) => {
    const answer = { value: value?.trim() ?? '', name: name.trim() || undefined }
    if (REFLECTION_GUARDS[method.id](answer)) void send(answer)
  }
  const required = method.kind === 'choice' ? kkAbai.reflection.required : kkAbai.reflection.requiredText
  const field = register('value', { validate: (v) => Boolean(v?.trim()) || required })
  const isSending = state.status === 'sending'

  return (
    <form className="student__form" onSubmit={handleSubmit(submit)}>
      {method.kind === 'choice' && <OptionGroup method={method} field={field} error={formState.errors.value?.message} />}
      {method.kind === 'text' && <SentenceField method={method} field={field} />}
      {method.kind === 'text' && formState.errors.value && <p className="student__error">{formState.errors.value.message}</p>}
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
  const method = findMethod(params.get('m'))
  const isValidLink = session && method

  return (
    <StudentShell title={method?.title ?? kkAbai.reflection.studentTitle} lead={kkAbai.reflection.studentLead}>
      {isValidLink ? <MethodForm key={method.id} session={session} method={method} /> : <p className="student__error">{kkAbai.noSession}</p>}
    </StudentShell>
  )
}
