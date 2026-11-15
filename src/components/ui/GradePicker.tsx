import { kk } from '@/i18n/kk'
import { type GradeFilter, progressActions, selectGrade, useProgress } from '@/lib/progressStore'

const OPTIONS: { value: GradeFilter; label: string }[] = [
  { value: 'all', label: kk.grade.all },
  { value: '1-4', label: kk.grade.primary },
  { value: '5-8', label: kk.grade.middle },
]

export const GradePicker = ({ compact = false }: { compact?: boolean }) => {
  const grade = useProgress(selectGrade)
  return (
    <div className={`segmented ${compact ? 'segmented--compact' : ''}`} role="radiogroup" aria-label={kk.grade.label}>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={grade === o.value}
          className="segmented__item"
          onClick={() => progressActions.setGrade(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
