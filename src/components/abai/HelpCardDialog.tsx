import { useRef } from 'react'
import { HELP_CARD } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

export const HelpCardDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button type="button" className="btn btn--primary btn--lg help-card-btn" onClick={() => dialogRef.current?.showModal()}>
        {kkAbai.help.open}
      </button>
      <dialog ref={dialogRef} className="help-card" aria-labelledby="help-card-title">
        <h2 id="help-card-title" className="help-card__title">
          💡 {kkAbai.help.title}
        </h2>
        <h3>{kkAbai.help.keywords}</h3>
        <ul className="chips">
          {HELP_CARD.keywords.map((word) => (
            <li key={word} className="chip">
              {word}
            </li>
          ))}
        </ul>
        <h3>{kkAbai.help.starters}</h3>
        <ul className="help-card__starters">
          {HELP_CARD.starters.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <form method="dialog">
          <button type="submit" className="btn btn--secondary">
            {kkAbai.help.close}
          </button>
        </form>
      </dialog>
    </>
  )
}
