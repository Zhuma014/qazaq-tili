import { useStoredState } from './useStoredState'

const SESSION_KEY = 'abai-lesson-session'
const SESSION_ID_LENGTH = 10

const newSessionId = () => crypto.randomUUID().replaceAll('-', '').slice(0, SESSION_ID_LENGTH)

/**
 * The teacher's current lesson code. It is embedded in the QR links, so every
 * class gets its own answer board; «жаңа сабақ» starts an empty one.
 */
export const useLessonSession = () => {
  const [session, setSession] = useStoredState(SESSION_KEY, newSessionId)
  const restart = () => setSession(newSessionId())
  return { session, restart }
}

export const studentLink = (path: string, session: string) =>
  `${window.location.origin}${window.location.pathname}#${path}?s=${session}`

const SESSION_PATTERN = /^[a-z0-9]{6,32}$/i

/** Lesson code from a student's QR link; null when missing or malformed. */
export const readSession = (params: URLSearchParams): string | null => {
  const value = params.get('s')
  return value && SESSION_PATTERN.test(value) ? value : null
}
