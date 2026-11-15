import { useState } from 'react'
import { KAZAKH_LETTERS } from '@/data/site'
import { kk } from '@/i18n/kk'

export const LetterTiles = () => {
  const [flipped, setFlipped] = useState<string | null>(null)
  return (
    <div className="letters" aria-label={kk.home.lettersTitle}>
      <p className="letters__title">
        {kk.home.lettersTitle} <small>— {kk.home.lettersHint}</small>
      </p>
      <div className="letters__grid">
        {KAZAKH_LETTERS.map((l, i) => {
          const isFlipped = flipped === l.letter
          return (
            <button
              key={l.letter}
              type="button"
              className={`letter-tile letter-tile--${(i % 5) + 1} ${isFlipped ? 'is-flipped' : ''}`}
              aria-pressed={isFlipped}
              onClick={() => setFlipped(isFlipped ? null : l.letter)}
            >
              {isFlipped ? (
                <span className="letter-tile__back">
                  <span aria-hidden="true">{l.emoji}</span>
                  {l.word}
                </span>
              ) : (
                <span className="letter-tile__front">
                  {l.letter}
                  <small>{l.letter.toLowerCase()}</small>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
