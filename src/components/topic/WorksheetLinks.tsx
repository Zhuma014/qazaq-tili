import { kk } from '@/i18n/kk'

const fileUrl = (topicId: string, ext: 'pdf' | 'docx') => `${import.meta.env.BASE_URL}worksheets/${topicId}.${ext}`

export const WorksheetLinks = ({ topicId }: { topicId: string }) => (
  <div className="worksheet-links">
    <a className="btn btn--primary" href={fileUrl(topicId, 'pdf')} download>
      📕 {kk.pages.downloadPdf}
    </a>
    <a className="btn btn--secondary" href={fileUrl(topicId, 'docx')} download>
      📘 {kk.pages.downloadWord}
    </a>
  </div>
)
