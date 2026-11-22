import { Link } from 'react-router-dom'
import { LESSON_SUBTITLE, LESSON_TITLE } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

const portrait = `${import.meta.env.BASE_URL}abai/abai-portrait.jpg`

export const AbaiBanner = () => (
  <Link to="/abai" className="abai-banner">
    <img src={portrait} alt="" className="abai-banner__portrait" />
    <span className="abai-banner__text">
      <small>☕ {LESSON_SUBTITLE}</small>
      <b>{LESSON_TITLE}</b>
      <span className="abai-banner__cta">{kkAbai.start} →</span>
    </span>
  </Link>
)
