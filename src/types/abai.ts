import type { VIRTUES } from '@/data/abai/lesson'

export type Virtue = (typeof VIRTUES)[number]
export type TrafficLight = 'green' | 'yellow' | 'red'
export type CupLevel = 'full' | 'half' | 'low'
export type Mood = 'great' | 'good' | 'ok' | 'hard'

/** One student's feedback sent from the reflection page (QR). */
export interface ReflectionAnswer {
  light: TrafficLight
  cup?: CupLevel
  mood?: Mood
  virtue?: Virtue
  sentence?: string
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
