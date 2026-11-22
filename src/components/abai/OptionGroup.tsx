import type { UseFormRegisterReturn } from 'react-hook-form'
import type { ReflectionOption } from '@/data/abai/reflection'

interface OptionGroupProps {
  number: number
  title: string
  question: string
  options: readonly ReflectionOption<string>[]
  field: UseFormRegisterReturn
  variant?: 'light' | 'list' | 'row'
  error?: string
}

/** One reflection method rendered as a group of big tappable radio buttons. */
export const OptionGroup = ({ number, title, question, options, field, variant = 'list', error }: OptionGroupProps) => (
  <fieldset className={`option-group option-group--${variant}`}>
    <legend>
      <span className="option-group__num">{number}</span> {title}
    </legend>
    <p className="option-group__question">{question}</p>
    <div className="option-group__options">
      {options.map((o) => (
        <label key={o.id} className={`refl-option refl-option--${o.id}`}>
          <input type="radio" value={o.id} {...field} />
          <span className="refl-option__icon" aria-hidden="true">{o.icon}</span>
          <span className="refl-option__label">{o.label}</span>
        </label>
      ))}
    </div>
    {error && <p className="student__error">{error}</p>}
  </fieldset>
)
