import { Link } from 'react-router-dom'
import { kk } from '@/i18n/kk'

interface StepNavProps {
  prevTo?: string
  nextTo?: string
  nextLabel?: string
}

export const StepNav = ({ prevTo, nextTo, nextLabel = kk.topic.next }: StepNavProps) => (
  <nav className="step-nav">
    {prevTo ? (
      <Link to={prevTo} className="btn btn--ghost">
        ← {kk.topic.back}
      </Link>
    ) : (
      <span />
    )}
    <Link to="/" className="btn btn--ghost step-nav__home">
      🏠 {kk.topic.home}
    </Link>
    {nextTo ? (
      <Link to={nextTo} className="btn btn--primary">
        {nextLabel} →
      </Link>
    ) : (
      <span />
    )}
  </nav>
)
