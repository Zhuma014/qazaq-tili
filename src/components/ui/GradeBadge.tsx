import { kk } from '@/i18n/kk'
import type { GradeBand } from '@/types/content'

export const GradeBadge = ({ band }: { band: GradeBand }) => (
  <span className={`badge badge--grade badge--g${band.replace('-', '')}`}>{kk.grade.badge(band)}</span>
)
