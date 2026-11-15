import { TaskView } from '@/components/tasks/TaskView'
import { PageHeader } from '@/components/ui/PageHeader'
import { PICTURE_ACTIVITIES } from '@/data/pictureTasks'
import { kk } from '@/i18n/kk'
import { progressActions } from '@/lib/progressStore'

export const PicturesPage = () => (
  <>
    <PageHeader emoji="🖼️" title={kk.pages.picturesTitle} lead={kk.pages.picturesLead} color="sun" />
    <nav className="chip-nav">
      {PICTURE_ACTIVITIES.map((a) => (
        <a key={a.id} href={`#${a.id}`} className="chip" onClick={(e) => {
          e.preventDefault()
          document.getElementById(a.id)?.scrollIntoView({ behavior: 'smooth' })
        }}>
          {a.emoji} {a.title}
        </a>
      ))}
    </nav>
    <div className="stack">
      {PICTURE_ACTIVITIES.map((a, i) => (
        <section key={a.id} id={a.id} className="picture-activity">
          <TaskView task={a.task} number={i + 1} onSolved={() => progressActions.markTaskDone(a.task.id)} />
        </section>
      ))}
    </div>
  </>
)
