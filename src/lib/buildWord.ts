const GAP_RE = /_{2,}|…/

export const hasGap = (stem: string) => GAP_RE.test(stem)

/** Joins a stem with an ending; a stem containing "___" gets the part in place of the gap. */
export const buildWord = (stem: string, part: string) =>
  hasGap(stem) ? stem.replace(GAP_RE, part) : `${stem}${part.replace(/^-/, '')}`
