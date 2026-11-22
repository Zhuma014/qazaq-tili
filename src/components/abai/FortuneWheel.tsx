import { useState } from 'react'
import { kkAbai } from '@/i18n/kkAbai'

export interface WheelItem {
  id: string
  label: string
}

interface FortuneWheelProps {
  items: readonly WheelItem[]
  onResult: (item: WheelItem) => void
  ariaLabel: string
}

const CENTER = 200
const RADIUS = 190
const FULL_TURNS = 6
const JITTER_SHARE = 0.6
const LABEL_RADIUS_SHARE = 0.6
const MAX_LABEL_CHARS = 16
const DENSE_WHEEL = 16
const SEGMENT_COLORS = [
  { fill: '#5a3825', text: '#fbf1de' },
  { fill: '#d9bf9b', text: '#3a2417' },
  { fill: '#8a5a3b', text: '#fff6e6' },
  { fill: '#f1e2c8', text: '#3a2417' },
] as const

const pointAt = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180
  return `${CENTER + r * Math.sin(rad)} ${CENTER - r * Math.cos(rad)}`
}

const segmentPath = (start: number, end: number) =>
  `M${CENTER} ${CENTER} L${pointAt(start, RADIUS)} A${RADIUS} ${RADIUS} 0 ${end - start > 180 ? 1 : 0} 1 ${pointAt(end, RADIUS)} Z`

// The last segment must not share a colour with the first one it touches.
const colorFor = (i: number, total: number) =>
  SEGMENT_COLORS[i === total - 1 && i % SEGMENT_COLORS.length === 0 ? 2 : i % SEGMENT_COLORS.length]

const shorten = (label: string) => (label.length > MAX_LABEL_CHARS ? `${label.slice(0, MAX_LABEL_CHARS - 1)}…` : label)

export const FortuneWheel = ({ items, onResult, ariaLabel }: FortuneWheelProps) => {
  const [rotation, setRotation] = useState(0)
  const [pendingIndex, setPendingIndex] = useState<number | null>(null)
  const isSpinning = pendingIndex !== null
  const segment = 360 / Math.max(items.length, 1)

  const spin = () => {
    if (isSpinning || items.length === 0) return
    const index = Math.floor(Math.random() * items.length)
    const centerOfSegment = (index + 0.5) * segment
    const jitter = (Math.random() - 0.5) * segment * JITTER_SHARE
    const base = rotation - (rotation % 360)
    setRotation(base + FULL_TURNS * 360 + (360 - centerOfSegment) + jitter)
    setPendingIndex(index)
  }

  const finish = () => {
    if (pendingIndex === null) return
    const item = items[pendingIndex]
    setPendingIndex(null)
    if (item) onResult(item)
  }

  return (
    <div className="wheel">
      <div className="wheel__stage">
        <span className="wheel__pointer" aria-hidden="true" />
        <div className="wheel__disc" style={{ transform: `rotate(${rotation}deg)` }} onTransitionEnd={finish}>
          <svg viewBox="0 0 400 400" role="img" aria-label={ariaLabel}>
            {items.length === 1 && <circle cx={CENTER} cy={CENTER} r={RADIUS} fill={SEGMENT_COLORS[0].fill} />}
            {items.map((item, i) => {
              const color = colorFor(i, items.length)
              const mid = (i + 0.5) * segment
              return (
                <g key={item.id}>
                  {items.length > 1 && <path d={segmentPath(i * segment, (i + 1) * segment)} fill={color.fill} stroke="#3a2417" strokeWidth="1.5" />}
                  <g transform={`rotate(${mid - 90} ${CENTER} ${CENTER})`}>
                    <text
                      x={CENTER + RADIUS * LABEL_RADIUS_SHARE}
                      y={CENTER}
                      fill={color.text}
                      className={items.length > DENSE_WHEEL ? 'wheel__label wheel__label--dense' : 'wheel__label'}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {shorten(item.label)}
                    </text>
                  </g>
                </g>
              )
            })}
            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#c9963f" strokeWidth="8" />
          </svg>
        </div>
        <span className="wheel__hub" aria-hidden="true">☕</span>
      </div>
      <button type="button" className="btn btn--primary btn--lg" onClick={spin} disabled={isSpinning || items.length === 0}>
        {isSpinning ? kkAbai.wheel.spinning : kkAbai.wheel.spin}
      </button>
    </div>
  )
}
