import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import { kkAbai } from '@/i18n/kkAbai'

interface QrImageProps {
  value: string
  className?: string
}

const QR_PIXELS = 640
const QR_COLORS = { dark: '#2e1c13', light: '#fffaf0' }

interface RenderedQr {
  value: string
  url: string
}

export const QrImage = ({ value, className = 'qr' }: QrImageProps) => {
  const [rendered, setRendered] = useState<RenderedQr | null>(null)

  useEffect(() => {
    let isActive = true
    QRCode.toDataURL(value, { margin: 1, width: QR_PIXELS, color: QR_COLORS })
      .then((url) => {
        if (isActive) setRendered({ value, url })
      })
      .catch(() => {
        if (isActive) setRendered(null)
      })
    return () => {
      isActive = false
    }
  }, [value])

  if (rendered?.value !== value) return <div className={`${className} qr--loading`} aria-hidden="true" />
  return <img className={className} src={rendered.url} alt={kkAbai.qrAlt} />
}
