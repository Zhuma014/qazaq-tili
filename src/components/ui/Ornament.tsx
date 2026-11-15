interface OrnamentProps {
  className?: string
}

/** Stylised «қошқар мүйіз» (ram's horn) motif used as decoration. */
export const RamHorn = ({ className }: OrnamentProps) => (
  <svg className={className} viewBox="0 0 120 60" aria-hidden="true" focusable="false">
    <path
      d="M60 56 V30 C60 14 46 6 34 10 C22 14 22 30 32 32 C40 34 42 24 36 22 M60 30 C60 14 74 6 86 10 C98 14 98 30 88 32 C80 34 78 24 84 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/** Repeating ornament band. */
export const OrnamentBand = ({ className }: OrnamentProps) => (
  <div className={`ornament-band ${className ?? ''}`} aria-hidden="true" />
)
