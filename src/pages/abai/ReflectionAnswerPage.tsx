import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { OptionGroup } from '@/components/abai/OptionGroup'
import { StudentShell } from '@/components/abai/StudentShell'
import { VIRTUES } from '@/data/abai/lesson'
import { CUP_LEVELS, MOODS, REFLECTION_METHODS, TRAFFIC_LIGHTS } from '@/data/abai/reflection'
import { readSession } from '@/hooks/useLessonSession'
import { useSendAnswer } from '@/hooks/useSendAnswer'
import { kkAbai } from '@/i18n/kkAbai'
import { isReflectionAnswer, NAME_MAX_LENGTH, SENTENCE_MAX_LENGTH } from '@/lib/abaiAnswers'
import { topicFor } from '@/lib/liveBoard'

interface ReflectionForm {
  light: string | null
  cup: string | null
  mood: string | null
  virtue: string | null
  sentence: string
  name: string
}

const VIRTUE_OPTIONS = VIRTUES.map((v) => ({ id: v, label: v, icon: '✨' }))

// Empty fields are dropped so the payload only carries what the student chose.
const toAnswer = (f: ReflectionForm) => ({
  light: f.light ?? undefined,
  cup: f.cup ?? undefined,
  mood: f.mood ?? undefined,
  virtue: f.virtue ?? undefined,
  sentence: f.sentence.trim() || undefined,
  name: f.name.trim() || undefined,
})

const ReflectionFormView = ({ session }: { session: string }) => {
  const { isSent, state, send } = useSendAnswer(topicFor(session, 'refleksiya'))
  const { register, handleSubmit, formState } = useForm<ReflectionForm>({
    defaultValues: { light: null, cup: null, mood: null, virtue: null, sentence: '', name: '' },
  })

  if (isSent) return <p className="student__done">{kkAbai.reflection.sent}</p>

  const submit = (form: ReflectionForm) => {
    const answer = toAnswer(form)
    if (isReflectionAnswer(answer)) void send(answer)
  }
  const isSending = state.status === 'sending'
  const m = REFLECTION_METHODS

  return (
    <form className="student__form" onSubmit={handleSubmit(submit)}>
      <OptionGroup
        {...m.light}
        options={TRAFFIC_LIGHTS}
        variant="light"
        field={register('light', { required: kkAbai.reflection.required })}
        error={formState.errors.light?.message}
      />
      <OptionGroup {...m.cup} options={CUP_LEVELS} field={register('cup')} />
      <OptionGroup {...m.mood} options={MOODS} variant="row" field={register('mood')} />
      <OptionGroup {...m.virtue} options={VIRTUE_OPTIONS} variant="row" field={register('virtue')} />
      <fieldset className="option-group">
        <legend>
          <span className="option-group__num">{m.sentence.number}</span> {m.sentence.title}
        </legend>
        <label htmlFor="refl-sentence" className="option-group__question">
          {m.sentence.question}
        </label>
        <textarea id="refl-sentence" rows={3} maxLength={SENTENCE_MAX_LENGTH} placeholder={kkAbai.reflection.sentencePlaceholder} {...register('sentence')} />
      </fieldset>
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
      {session ? <ReflectionFormView session={session} /> : <p className="student__error">{kkAbai.noSession}</p>}
    </StudentShell>
  )
}
