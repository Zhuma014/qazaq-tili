import type { UseFormRegisterReturn } from 'react-hook-form'
import type { ReflectionMethod } from '@/data/abai/reflection'

interface OptionGroupProps {
  method: ReflectionMethod
  field: UseFormRegisterReturn
  error?: string
}

/** The reflection question rendered as a group of big tappable radio buttons. */
export const OptionGroup = ({ method, field, error }: OptionGroupProps) => (
  <fieldset className="option-group">
    <legend>{method.title}</legend>
    <p className="option-group__question">{method.question}</p>
    <div className="option-group__options">
      {method.options.map((o) => (
        <label key={o.id} className="refl-option">
          <input type="radio" value={o.id} {...field} />
          <span className="refl-option__icon" aria-hidden="true">{o.icon}</span>
          <span className="refl-option__label">{o.label}</span>
        </label>
      ))}
    </div>
    {error && <p className="student__error">{error}</p>}
  </fieldset>
)
