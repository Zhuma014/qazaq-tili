import { REFLECTION_METHOD } from '@/data/abai/reflection'
import type { ClusterAnswer, ReflectionAnswer } from '@/types/abai'

export const CLUSTER_MAX_LENGTH = 40
export const NAME_MAX_LENGTH = 40

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

export const isClusterAnswer = (v: unknown): v is ClusterAnswer =>
  isRecord(v) && typeof v.text === 'string' && v.text.trim().length > 0 && v.text.length <= CLUSTER_MAX_LENGTH

export const isReflectionAnswer = (v: unknown): v is ReflectionAnswer =>
  isRecord(v) &&
  typeof v.value === 'string' &&
  REFLECTION_METHOD.options.some((o) => o.id === v.value) &&
  (v.name === undefined || (typeof v.name === 'string' && v.name.length <= NAME_MAX_LENGTH))
