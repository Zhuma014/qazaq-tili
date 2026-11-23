import { useForm } from 'react-hook-form'
import { kk } from '@/i18n/kk'

export const CUSTOM_MIN_MINUTES = 1
export const CUSTOM_MAX_MINUTES = 60

interface CustomTimeFormProps {
  onStart: (minutes: number) => void
}

interface CustomTimeValues {
  minutes: string
}

const isValidMinutes = (value: string) => {
  const n = Number(value)
  return Number.isInteger(n) && n >= CUSTOM_MIN_MINUTES && n <= CUSTOM_MAX_MINUTES
}

/** Lets the teacher type any whole number of minutes besides the presets. */
export const CustomTimeForm = ({ onStart }: CustomTimeFormProps) => {
  const { register, handleSubmit, formState } = useForm<CustomTimeValues>({ defaultValues: { minutes: '' } })

  return (
    <form className="lesson-timer__custom" noValidate onSubmit={handleSubmit(({ minutes }) => onStart(Number(minutes)))}>
      <label htmlFor="timer-custom-minutes">{kk.timer.custom}</label>
      <input
        id="timer-custom-minutes"
        type="number"
        inputMode="numeric"
        min={CUSTOM_MIN_MINUTES}
        max={CUSTOM_MAX_MINUTES}
        step={1}
        placeholder="7"
        aria-invalid={formState.errors.minutes ? true : undefined}
        {...register('minutes', { validate: (v) => isValidMinutes(v) || kk.timer.customInvalid(CUSTOM_MIN_MINUTES, CUSTOM_MAX_MINUTES) })}
      />
      <button type="submit" className="lesson-timer__start">
        {kk.timer.start}
      </button>
      {formState.errors.minutes && (
        <p className="lesson-timer__error" role="alert">
          {formState.errors.minutes.message}
        </p>
      )}
    </form>
  )
}
