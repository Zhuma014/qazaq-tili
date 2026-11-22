import { VIRTUES } from '@/data/abai/lesson'
import type { ClusterAnswer, CupLevel, Mood, ReflectionAnswer, TrafficLight, Virtue } from '@/types/abai'

export const CLUSTER_MAX_LENGTH = 40
export const SENTENCE_MAX_LENGTH = 200
export const NAME_MAX_LENGTH = 40

const LIGHTS: readonly TrafficLight[] = ['green', 'yellow', 'red']
const CUPS: readonly CupLevel[] = ['full', 'half', 'low']
const MOOD_IDS: readonly Mood[] = ['great', 'good', 'ok', 'hard']

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

const isOptionalOf = <T extends string>(v: unknown, allowed: readonly T[]) =>
  v === undefined || (typeof v === 'string' && (allowed as readonly string[]).includes(v))

const isOptionalText = (v: unknown, max: number) => v === undefined || (typeof v === 'string' && v.length <= max)

export const isClusterAnswer = (v: unknown): v is ClusterAnswer =>
  isRecord(v) && typeof v.text === 'string' && v.text.trim().length > 0 && v.text.length <= CLUSTER_MAX_LENGTH

export const isReflectionAnswer = (v: unknown): v is ReflectionAnswer =>
  isRecord(v) &&
  isOptionalOf(v.light, LIGHTS) &&
  v.light !== undefined &&
  isOptionalOf(v.cup, CUPS) &&
  isOptionalOf(v.mood, MOOD_IDS) &&
  isOptionalOf<Virtue>(v.virtue, VIRTUES) &&
  isOptionalText(v.sentence, SENTENCE_MAX_LENGTH) &&
  isOptionalText(v.name, NAME_MAX_LENGTH)

/** Counts how many answers picked each option, keeping the option order. */
export const countBy = <T extends string>(values: readonly (T | undefined)[], options: readonly T[]) =>
  options.map((id) => ({ id, count: values.filter((v) => v === id).length }))
