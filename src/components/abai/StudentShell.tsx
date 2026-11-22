import type { ReactNode } from 'react'
import { LESSON_TITLE } from '@/data/abai/lesson'

const portrait = `${import.meta.env.BASE_URL}abai/abai-portrait.jpg`

interface StudentShellProps {
  title: string
  lead: string
  children: ReactNode
}

/** Phone-sized frame for the pages students open from a QR code. */
export const StudentShell = ({ title, lead, children }: StudentShellProps) => (
  <div className="abai abai--student">
    <main className="student">
      <header className="student__head">
        <img src={portrait} alt="" className="student__portrait" />
        <p className="student__lesson">{LESSON_TITLE}</p>
        <h1>{title}</h1>
        <p>{lead}</p>
      </header>
      {children}
    </main>
  </div>
)
