import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TASK_MUSIC } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

const LESSON_PREFIX = '/abai'
const STUDENT_PAGE_SUFFIX = '/zhauap'
const embedUrl = `https://www.youtube-nocookie.com/embed/${TASK_MUSIC.youtubeId}?rel=0`

/**
 * Floating background-music player for the Abai lesson. Once opened, the iframe stays mounted
 * (only visually collapsed) so the song keeps playing while the teacher moves between stages.
 */
export const LessonMusic = () => {
  const { pathname } = useLocation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // Remounting the iframe is the only reliable way to silence it from outside.
  const [playerKey, setPlayerKey] = useState(0)

  if (!pathname.startsWith(LESSON_PREFIX) || pathname.endsWith(STUDENT_PAGE_SUFFIX)) return null

  const open = () => {
    setIsLoaded(true)
    setIsOpen(true)
  }

  return (
    <div className="lesson-music">
      {isLoaded && (
        <section
          className={`lesson-music__panel${isOpen ? '' : ' lesson-music__panel--hidden'}`}
          aria-label={kkAbai.music.title}
          aria-hidden={!isOpen || undefined}
        >
          <header className="lesson-music__head">
            <b>🎵 {kkAbai.music.title}</b>
            <button type="button" className="lesson-music__btn" onClick={() => setIsOpen(false)}>
              {kkAbai.music.hide}
            </button>
          </header>
          <p className="lesson-music__song">{TASK_MUSIC.title}</p>
          <div className="lesson-music__frame">
            <iframe
              key={playerKey}
              src={embedUrl}
              title={TASK_MUSIC.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="lesson-music__hint">{kkAbai.music.hint}</p>
          <button type="button" className="lesson-music__btn lesson-music__btn--stop" onClick={() => setPlayerKey(playerKey + 1)}>
            {kkAbai.music.stop}
          </button>
        </section>
      )}
      {!isOpen && (
        <button type="button" className="lesson-music__toggle" onClick={open} aria-label={isLoaded ? `${kkAbai.music.open} (${kkAbai.music.playing})` : kkAbai.music.open}>
          <span aria-hidden="true">🎵</span>
          {isLoaded && <span className="lesson-music__dot" aria-hidden="true" />}
        </button>
      )}
    </div>
  )
}
