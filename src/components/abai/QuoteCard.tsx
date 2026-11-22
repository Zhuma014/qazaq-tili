import type { AbaiQuote } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

interface QuoteCardProps {
  quote: AbaiQuote
  variant?: 'card' | 'strip'
}

export const QuoteCard = ({ quote, variant = 'card' }: QuoteCardProps) => (
  <figure className={`quote quote--${variant}`}>
    <figcaption className="quote__label">🪶 {kkAbai.quoteLabel}</figcaption>
    <blockquote>
      {quote.lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </blockquote>
    <span className="quote__author">— Абай</span>
  </figure>
)
