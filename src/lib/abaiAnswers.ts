import { REFLECTION_METHOD } from '@/data/abai/reflection'
import type { ClusterAnswer, ReflectionAnswer } from '@/types/abai'

export const CLUSTER_MAX_LENGTH = 40
export const NAME_MAX_LENGTH = 40
export const QUESTION_MAX_LENGTH = 200

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

const isOptionalText = (v: unknown, maxLength: number) => v === undefined || (typeof v === 'string' && v.length <= maxLength)

export const isClusterAnswer = (v: unknown): v is ClusterAnswer =>
  isRecord(v) && typeof v.text === 'string' && v.text.trim().length > 0 && v.text.length <= CLUSTER_MAX_LENGTH

export const isReflectionAnswer = (v: unknown): v is ReflectionAnswer =>
  isRecord(v) &&
  typeof v.value === 'string' &&
  REFLECTION_METHOD.options.some((o) => o.id === v.value) &&
  isOptionalText(v.name, NAME_MAX_LENGTH) &&
  isOptionalText(v.question, QUESTION_MAX_LENGTH)
