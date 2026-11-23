import { MOOD_OPTIONS } from '@/data/abai/reflection'
import { useLessonSession } from '@/hooks/useLessonSession'
import { useStoredState } from '@/hooks/useStoredState'
import { kkAbai } from '@/i18n/kkAbai'

/** Students come to the board one by one and tap a smiley; taps are kept per lesson code. */
export const MoodPage = () => {
  const { session } = useLessonSession()
  const [taps, setTaps] = useStoredState<readonly string[]>(`abai-mood-${session}`, () => [])

  const reset = () => {
    if (window.confirm(kkAbai.mood.resetConfirm)) setTaps([])
  }

  return (
    <section className="mood">
      <h2 className="mood__title">{kkAbai.mood.title}</h2>
      <p className="mood__hint">{kkAbai.mood.hint}</p>
      <ul className="mood__grid">
        {MOOD_OPTIONS.map((o) => {
          const count = taps.filter((t) => t === o.id).length
          return (
            <li key={o.id}>
              <button type="button" className="mood__btn" onClick={() => setTaps([...taps, o.id])} aria-label={kkAbai.mood.tap(o.label)}>
                <span className="mood__icon" aria-hidden="true">{o.icon}</span>
                <span className="mood__label">{o.label}</span>
                <b className="mood__count" key={count}>{count}</b>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="mood__footer">
        <p className="mood__total" aria-live="polite">{kkAbai.mood.total(taps.length)}</p>
        <button type="button" className="btn btn--ghost" onClick={() => setTaps(taps.slice(0, -1))} disabled={taps.length === 0}>
          {kkAbai.mood.undo}
        </button>
        <button type="button" className="btn btn--ghost" onClick={reset} disabled={taps.length === 0}>
          {kkAbai.mood.reset}
        </button>
      </div>
    </section>
  )
}
