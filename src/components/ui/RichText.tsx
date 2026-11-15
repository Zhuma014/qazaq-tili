import { Fragment } from 'react'

interface RichTextProps {
  text: string
  as?: 'p' | 'span'
  className?: string
}

/** Renders text with **bold** segments. */
export const RichText = ({ text, as: Tag = 'span', className }: RichTextProps) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </Tag>
  )
}
