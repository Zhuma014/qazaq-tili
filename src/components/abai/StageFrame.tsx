import { kkAbai } from '@/i18n/kkAbai'

interface StageFrameProps {
  file: string
  title: string
}

/** Embeds one of the teacher's standalone HTML games stored in public/abai. */
export const StageFrame = ({ file, title }: StageFrameProps) => {
  const src = `${import.meta.env.BASE_URL}abai/${file}`
  return (
    <div className="stage-frame">
      <iframe src={src} title={title} className="stage-frame__iframe" />
      <a className="btn btn--secondary" href={src} target="_blank" rel="noreferrer">
        {kkAbai.openFullScreen}
      </a>
    </div>
  )
}
