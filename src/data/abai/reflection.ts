import type { CupLevel, Mood, TrafficLight } from '@/types/abai'

export interface ReflectionOption<T extends string> {
  id: T
  label: string
  icon: string
}

export const TRAFFIC_LIGHTS: readonly ReflectionOption<TrafficLight>[] = [
  { id: 'green', label: 'Түсіндім', icon: '🟢' },
  { id: 'yellow', label: 'Әлі де үйренемін', icon: '🟡' },
  { id: 'red', label: 'Көмек қажет', icon: '🔴' },
]

export const CUP_LEVELS: readonly ReflectionOption<CupLevel>[] = [
  { id: 'full', label: 'Кесем толды — көп білдім', icon: '☕' },
  { id: 'half', label: 'Жарты кесе — біраз білдім', icon: '🍵' },
  { id: 'low', label: 'Кесем әлі бос — қайталау керек', icon: '🫗' },
]

export const MOODS: readonly ReflectionOption<Mood>[] = [
  { id: 'great', label: 'Керемет', icon: '😄' },
  { id: 'good', label: 'Жақсы', icon: '🙂' },
  { id: 'ok', label: 'Орташа', icon: '😐' },
  { id: 'hard', label: 'Қиын болды', icon: '😕' },
]

/** The five feedback methods shown to students; «Бағдаршам» is the only required one. */
export const REFLECTION_METHODS = {
  light: { number: 1, title: '«Бағдаршам»', question: 'Бүгінгі тақырыпты қаншалықты түсіндің?' },
  cup: { number: 2, title: '«Даналық кесесі»', question: 'Білім кесең қаншалықты толды?' },
  mood: { number: 3, title: '«Көңіл-күй смайлигі»', question: 'Сабақтан кейінгі көңіл-күйің қандай?' },
  virtue: { number: 4, title: '«Бес асыл іс»', question: 'Қай асыл істі өз бойыңда дамытқың келеді?' },
  sentence: { number: 5, title: '«Аяқталмаған сөйлем»', question: 'Сөйлемді аяқта: «Бүгін мен ... үйрендім» немесе «Маған ... ұнады».' },
} as const
