import { QrImage } from '@/components/abai/QrImage'
import { kk } from '@/i18n/kk'
import { kkAbai } from '@/i18n/kkAbai'

const siteLink = () => `${window.location.origin}${window.location.pathname}`

export const SiteQrPage = () => {
  const link = siteLink()
  return (
    <section className="site-qr">
      <div className="site-qr__code">
        <QrImage value={link} />
      </div>
      <div className="site-qr__text">
        <p className="site-qr__scan">📱 {kkAbai.site.scan}</p>
        <h2 className="site-qr__name">{kk.siteName}</h2>
        <p className="site-qr__lead">{kkAbai.site.lead}</p>
        <a className="site-qr__link" href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </div>
    </section>
  )
}
