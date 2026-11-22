import { REFLECTION_METHODS, type ReflectionMethod, type ReflectionMethodId } from '@/data/abai/reflection'
import type { ClusterAnswer, ReflectionAnswer } from '@/types/abai'

export const CLUSTER_MAX_LENGTH = 40
export const SENTENCE_MAX_LENGTH = 200
export const NAME_MAX_LENGTH = 40

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

export const isClusterAnswer = (v: unknown): v is ClusterAnswer =>
  isRecord(v) && typeof v.text === 'string' && v.text.trim().length > 0 && v.text.length <= CLUSTER_MAX_LENGTH

const isValidValue = (method: ReflectionMethod, value: string) =>
  method.kind === 'choice'
    ? method.options.some((o) => o.id === value)
    : value.trim().length > 0 && value.length <= SENTENCE_MAX_LENGTH

const guardFor =
  (method: ReflectionMethod) =>
  (v: unknown): v is ReflectionAnswer =>
    isRecord(v) &&
    typeof v.value === 'string' &&
    isValidValue(method, v.value) &&
    (v.name === undefined || (typeof v.name === 'string' && v.name.length <= NAME_MAX_LENGTH))

// Built once so each guard keeps a stable identity (it is an effect dependency of useLiveMessages).
export const REFLECTION_GUARDS = Object.fromEntries(REFLECTION_METHODS.map((m) => [m.id, guardFor(m)])) as Record<
  ReflectionMethodId,
  (v: unknown) => v is ReflectionAnswer
>
