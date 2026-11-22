import { kkAbai } from '@/i18n/kkAbai'

export const CLUSTER_SLOTS = 23

export interface ClusterItem {
  id: string
  text: string
}

interface ClusterBoardProps {
  items: readonly ClusterItem[]
  onHide: (id: string) => void
}

// Board geometry in SVG units; the HTML slots use the same numbers as percentages.
// Ring radii and slot size were searched so that no two of the 23 slots overlap.
const VIEW_W = 1000
const VIEW_H = 780
const CX = VIEW_W / 2
const CY = VIEW_H / 2
const RING_RX = 451
const RING_RY = 352
const CENTER_R = 128
const SLOT_HALF_W = 44
const SLOT_HALF_H = 32
const ARROW_GAP = 8
const NEAR_ZERO = 1e-6

const SLOTS = Array.from({ length: CLUSTER_SLOTS }, (_, i) => {
  const angle = ((-90 + (i * 360) / CLUSTER_SLOTS) * Math.PI) / 180
  const x = CX + RING_RX * Math.cos(angle)
  const y = CY + RING_RY * Math.sin(angle)
  const length = Math.hypot(x - CX, y - CY)
  const ux = (x - CX) / length
  const uy = (y - CY) / length
  const toEdge = Math.min(SLOT_HALF_W / Math.max(Math.abs(ux), NEAR_ZERO), SLOT_HALF_H / Math.max(Math.abs(uy), NEAR_ZERO))
  return {
    key: `slot-${i}`,
    left: `${(x / VIEW_W) * 100}%`,
    top: `${(y / VIEW_H) * 100}%`,
    from: { x: CX + ux * CENTER_R, y: CY + uy * CENTER_R },
    to: { x: x - ux * (toEdge + ARROW_GAP), y: y - uy * (toEdge + ARROW_GAP) },
  }
})

const portrait = `${import.meta.env.BASE_URL}abai/abai-portrait.jpg`

export const ClusterBoard = ({ items, onHide }: ClusterBoardProps) => {
  const extra = items.slice(CLUSTER_SLOTS)

  return (
    <div className="cluster">
      <div className="cluster__board">
        <svg className="cluster__arrows" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true">
          <defs>
            <marker id="cluster-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#7b5137" />
            </marker>
          </defs>
          {SLOTS.map((s, i) => (
            <line
              key={s.key}
              x1={s.from.x}
              y1={s.from.y}
              x2={s.to.x}
              y2={s.to.y}
              className={items[i] ? 'cluster__line cluster__line--filled' : 'cluster__line'}
              markerEnd="url(#cluster-arrow)"
            />
          ))}
        </svg>

        <div className="cluster__center">
          <img src={portrait} alt="" />
          <span>{kkAbai.cluster.center}</span>
        </div>

        {SLOTS.map((s, i) => {
          const item = items[i]
          return (
            <div key={s.key} className={item ? 'cluster__slot cluster__slot--filled' : 'cluster__slot'} style={{ left: s.left, top: s.top }}>
              {item ? (
                <>
                  <span className="cluster__text">{item.text}</span>
                  <button type="button" className="cluster__hide" onClick={() => onHide(item.id)} aria-label={`${kkAbai.live.hide}: ${item.text}`}>
                    ×
                  </button>
                </>
              ) : (
                <span className="cluster__empty">{i + 1}</span>
              )}
            </div>
          )
        })}
      </div>

      {extra.length > 0 && (
        <div className="cluster__extra">
          <p>{kkAbai.cluster.extra(extra.length)}</p>
          <ul className="chips">
            {extra.map((item) => (
              <li key={item.id} className="chip">
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
