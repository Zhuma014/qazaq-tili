import { StageFrame } from '@/components/abai/StageFrame'
import { THINKING_QUESTIONS } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

export const GroupSplitPage = () => <StageFrame file="topqa-bolinu.html" title="Даналық кафесі — топқа бөлу" />

export const JarsPage = () => (
  <>
    <StageFrame file="eki-quty.html" title="Жақсы, жаман қасиеттерді жіктеу ойыны" />
    <section className="thinking">
      <h2 className="abai-section-title">🤔 {kkAbai.thinkingTitle}</h2>
      <ol className="thinking__list">
        {THINKING_QUESTIONS.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
    </section>
  </>
)
