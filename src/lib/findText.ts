export interface FindToken {
  id: number
  word: string
  /** Punctuation glued after the word, rendered but not clickable. */
  trail: string
  lead: string
  isTarget: boolean
}

const TOKEN_RE = /^([«"(]*)(\[)?([^\]\s«»"(),.!?:;—]+(?:-[^\]\s«»"(),.!?:;—]+)*)(\])?([»"),.!?:;—]*)$/u

/** Splits a find-task text like "[Ақ] қар жауды." into clickable tokens. */
export const parseFindText = (text: string): FindToken[] =>
  text
    .split(/\s+/)
    .filter(Boolean)
    .map((raw, id) => {
      const m = TOKEN_RE.exec(raw)
      if (!m) return { id, word: raw.replace(/[[\]]/g, ''), lead: '', trail: '', isTarget: raw.includes('[') }
      return { id, lead: m[1], word: m[3], trail: m[5], isTarget: Boolean(m[2] && m[4]) }
    })

export const stripFindMarks = (text: string): string => text.replace(/[[\]]/g, '')

export const findTargets = (text: string): string[] =>
  parseFindText(text)
    .filter((t) => t.isTarget)
    .map((t) => t.word)
