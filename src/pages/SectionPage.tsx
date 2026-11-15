import { TopicCard } from '@/components/topic/TopicCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { topicsBySection } from '@/data/topics'
import { kk } from '@/i18n/kk'
import type { SectionId } from '@/types/content'

const META = {
  'soz-taby': { emoji: '📚', title: kk.sections.sozTabyTitle, lead: kk.sections.sozTabyLead, color: 'sky' },
  zhalgau: { emoji: '🔗', title: kk.sections.zhalgauTitle, lead: kk.sections.zhalgauLead, color: 'coral' },
} as const

export const SectionPage = ({ section }: { section: SectionId }) => {
  const meta = META[section]
  return (
    <>
      <PageHeader emoji={meta.emoji} title={meta.title} lead={meta.lead} color={meta.color} />
      <div className="topic-grid">
        {topicsBySection(section).map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>
    </>
  )
}
