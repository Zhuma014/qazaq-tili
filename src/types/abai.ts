/** One student's «Даналық кесесі» answer (sent from the reflection QR code). */
export interface ReflectionAnswer {
  /** Chosen option id. */
  value: string
  name?: string
  /** What the student did not understand («Сұрағым»). */
  question?: string
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
