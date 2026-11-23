import { WARMUP_VIDEO_ID } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

const embedUrl = `https://www.youtube-nocookie.com/embed/${WARMUP_VIDEO_ID}?rel=0`
const watchUrl = `https://youtu.be/${WARMUP_VIDEO_ID}`

export const WarmupPage = () => (
  <section className="warmup">
    <div className="warmup__frame">
      <iframe
        src={embedUrl}
        title={kkAbai.warmup.videoTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
    <a className="btn btn--secondary" href={watchUrl} target="_blank" rel="noreferrer">
      {kkAbai.warmup.openYoutube}
    </a>
  </section>
)
