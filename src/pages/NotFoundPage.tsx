import { Link } from 'react-router-dom'
import { kk } from '@/i18n/kk'

export const NotFoundPage = () => (
  <div className="card not-found">
    <span className="not-found__emoji" aria-hidden="true">🧐</span>
    <h1>{kk.pages.notFoundTitle}</h1>
    <p>{kk.pages.notFoundLead}</p>
    <Link to="/" className="btn btn--primary">🏠 {kk.topic.home}</Link>
  </div>
)
