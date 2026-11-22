import { HelpCardDialog } from '@/components/abai/HelpCardDialog'
import { WORKSHEET_ANSWER_KEY, WORKSHEET_IMAGE } from '@/data/abai/lesson'
import { kkAbai } from '@/i18n/kkAbai'

const imageSrc = `${import.meta.env.BASE_URL}${WORKSHEET_IMAGE}`

export const WorksheetPage = () => (
  <div className="worksheet">
    <div className="worksheet__actions no-print">
      <HelpCardDialog />
      <button type="button" className="btn btn--secondary" onClick={() => window.print()}>
        {kkAbai.worksheet.print}
      </button>
      <a className="btn btn--secondary" href={imageSrc} download="zheke-zhumys.jpeg">
        {kkAbai.worksheet.download}
      </a>
    </div>

    <img className="worksheet__image" src={imageSrc} alt={kkAbai.worksheet.imageAlt} />

    <details className="answer-key no-print">
      <summary>🔑 {kkAbai.worksheet.answerKey}</summary>
      <ol>
        {WORKSHEET_ANSWER_KEY.map((item) => (
          <li key={item.wrong}>
            <p>
              <span className="answer-key__tag answer-key__tag--wrong">{kkAbai.worksheet.wrong}</span> {item.wrong}
            </p>
            <p>
              <span className="answer-key__tag answer-key__tag--right">{kkAbai.worksheet.right}</span> {item.right}
            </p>
          </li>
        ))}
      </ol>
    </details>
  </div>
)
