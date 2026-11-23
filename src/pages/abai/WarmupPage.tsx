import { useState } from 'react'
import { WARMUP_SONG, WARMUP_VIDEO_ID } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

const videoEmbedUrl = `https://www.youtube-nocookie.com/embed/${WARMUP_VIDEO_ID}?rel=0`
const videoWatchUrl = `https://youtu.be/${WARMUP_VIDEO_ID}`
const songEmbedUrl = `https://suno.com/embed/${WARMUP_SONG.sunoId}`
const songPageUrl = `https://suno.com/song/${WARMUP_SONG.sunoId}`

export const WarmupPage = () => {
  // Suno's embedded player can keep playing after its own pause button; remounting the iframe always silences it.
  const [songLoad, setSongLoad] = useState(0)

  return (
    <div className="warmup">
      <section className="warmup__block">
        <div className="warmup__frame">
          <iframe
            src={videoEmbedUrl}
            title={kkAbai.warmup.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <a className="btn btn--secondary" href={videoWatchUrl} target="_blank" rel="noreferrer">
          {kkAbai.warmup.openYoutube}
        </a>
      </section>

      <section className="warmup__block">
        <h2 className="abai-section-title">
          🎵 {kkAbai.warmup.songLabel}: «{WARMUP_SONG.title}»
        </h2>
        <div className="warmup__song">
          <iframe
            key={songLoad}
            src={songEmbedUrl}
            title={`${kkAbai.warmup.songLabel}: ${WARMUP_SONG.title}`}
            allow="autoplay; encrypted-media"
          />
        </div>
        <div className="warmup__actions">
          <button type="button" className="btn btn--primary" onClick={() => setSongLoad(songLoad + 1)}>
            {kkAbai.warmup.stopSong}
          </button>
          <a className="btn btn--secondary" href={songPageUrl} target="_blank" rel="noreferrer">
            {kkAbai.warmup.openSuno}
          </a>
        </div>
      </section>
    </div>
  )
}
