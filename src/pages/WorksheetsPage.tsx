import { WorksheetLinks } from '@/components/topic/WorksheetLinks'
import { PageHeader } from '@/components/ui/PageHeader'
import { topicsBySection } from '@/data/topics'
import { kk } from '@/i18n/kk'
import type { SectionId } from '@/types/content'

const GROUPS: { section: SectionId; title: string }[] = [
  { section: 'soz-taby', title: kk.sections.sozTabyTitle },
  { section: 'zhalgau', title: kk.sections.zhalgauTitle },
]

export const WorksheetsPage = () => (
  <>
    <PageHeader emoji="📄" title={kk.pages.worksheetsTitle} lead={kk.pages.worksheetsLead} color="mint" />
    {GROUPS.map((g) => (
      <section key={g.section} className="stack">
        <h2 className="section-title">{g.title}</h2>
        <ul className="worksheet-list">
          {topicsBySection(g.section).map((t) => (
            <li key={t.id} className={`worksheet-card accent-${t.color}`}>
              <span className="worksheet-card__paper" aria-hidden="true">{t.emoji}</span>
              <h3>{t.title}</h3>
              <p className="muted">{t.tagline}</p>
              <WorksheetLinks topicId={t.id} />
            </li>
          ))}
        </ul>
      </section>
    ))}
  </>
)
