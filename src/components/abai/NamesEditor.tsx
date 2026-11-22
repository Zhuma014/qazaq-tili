import { useForm } from 'react-hook-form'
import { kkAbai } from '@/i18n/kkAbai'

interface NamesEditorProps {
  names: readonly string[]
  onSave: (names: string[]) => void
  onCancel: () => void
}

interface NamesForm {
  text: string
}

const toNames = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

export const NamesEditor = ({ names, onSave, onCancel }: NamesEditorProps) => {
  const { register, handleSubmit } = useForm<NamesForm>({ defaultValues: { text: names.join('\n') } })

  return (
    <form className="names-editor" onSubmit={handleSubmit(({ text }) => onSave(toNames(text)))}>
      <label htmlFor="names-text">{kkAbai.wheel.namesHint}</label>
      <textarea id="names-text" rows={14} {...register('text')} />
      <div className="names-editor__actions">
        <button type="submit" className="btn btn--primary">
          {kkAbai.wheel.save}
        </button>
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          {kkAbai.wheel.cancel}
        </button>
      </div>
    </form>
  )
}
