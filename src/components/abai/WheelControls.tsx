import { kkAbai } from '@/i18n/kkAbai'

interface WheelControlsProps {
  shouldRemove: boolean
  onToggleRemove: (value: boolean) => void
  onRefill: () => void
}

export const WheelControls = ({ shouldRemove, onToggleRemove, onRefill }: WheelControlsProps) => (
  <div className="wheel-controls">
    <label className="toggle">
      <input type="checkbox" checked={shouldRemove} onChange={(e) => onToggleRemove(e.target.checked)} />
      {kkAbai.wheel.removePicked}
    </label>
    <button type="button" className="btn btn--ghost" onClick={onRefill}>
      {kkAbai.wheel.reset}
    </button>
  </div>
)
