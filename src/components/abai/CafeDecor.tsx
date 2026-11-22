const BOOKS = [
  { x: 10, h: 92, w: 22, fill: '#6b3f27' },
  { x: 34, h: 104, w: 18, fill: '#a8703f' },
  { x: 54, h: 86, w: 26, fill: '#3e2719' },
  { x: 82, h: 98, w: 16, fill: '#c9963f' },
  { x: 100, h: 110, w: 24, fill: '#7b5137' },
  { x: 126, h: 80, w: 20, fill: '#d9bf9b' },
] as const

const SHELF_Y = 120

/** Decorative stack of books with a steaming coffee cup — the literary-café motif. */
export const CafeDecor = ({ className = '' }: { className?: string }) => (
  <svg className={`cafe-decor ${className}`} viewBox="0 0 260 140" aria-hidden="true">
    {BOOKS.map((b) => (
      <g key={b.x}>
        <rect x={b.x} y={SHELF_Y - b.h} width={b.w} height={b.h} rx="3" fill={b.fill} stroke="#2e1c13" strokeWidth="1.5" />
        <rect x={b.x + 3} y={SHELF_Y - b.h + 12} width={b.w - 6} height="5" fill="#f1e2c8" opacity=".7" />
        <rect x={b.x + 3} y={SHELF_Y - 24} width={b.w - 6} height="3" fill="#f1e2c8" opacity=".5" />
      </g>
    ))}
    <rect x="152" y="108" width="62" height="12" rx="3" fill="#8a5a3b" stroke="#2e1c13" strokeWidth="1.5" />
    <rect x="156" y="96" width="56" height="12" rx="3" fill="#c9963f" stroke="#2e1c13" strokeWidth="1.5" />
    <path d="M178 62 h40 v22 a20 14 0 0 1 -40 0 z" fill="#fbf1de" stroke="#2e1c13" strokeWidth="2" transform="translate(0 2)" />
    <path d="M218 70 a9 9 0 0 1 0 16" fill="none" stroke="#2e1c13" strokeWidth="3" />
    <path className="cafe-decor__steam" d="M190 56 q-6 -10 0 -20 q6 -10 0 -20 M205 56 q-6 -10 0 -20 q6 -10 0 -20" fill="none" stroke="#b07a4a" strokeWidth="3" strokeLinecap="round" />
    <rect x="0" y={SHELF_Y} width="260" height="10" rx="4" fill="#3e2719" />
  </svg>
)
