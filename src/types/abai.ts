/** One student's answer to a single reflection method (sent from its own QR code). */
export interface ReflectionAnswer {
  /** Chosen option id, or the student's sentence for the text method. */
  value: string
  name?: string
}

/** One student's word for the «Абай бейнесі» cluster (QR). */
export interface ClusterAnswer {
  text: string
}

export type SendState =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'sent' }
  | { status: 'error' }
