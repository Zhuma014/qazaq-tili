import { RamHorn } from './Ornament'

interface PageHeaderProps {
  emoji: string
  title: string
  lead?: string
  color?: string
}

export const PageHeader = ({ emoji, title, lead, color = 'sky' }: PageHeaderProps) => (
  <header className={`page-header accent-${color}`}>
    <RamHorn className="page-header__horn" />
    <span className="page-header__emoji" aria-hidden="true">
      {emoji}
    </span>
    <div>
      <h1 className="page-header__title">{title}</h1>
      {lead && <p className="page-header__lead">{lead}</p>}
    </div>
  </header>
)
