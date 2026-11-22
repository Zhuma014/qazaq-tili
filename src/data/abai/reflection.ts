import { VIRTUES } from './lesson'

export interface ReflectionOption {
  id: string
  label: string
  icon: string
}

export type ReflectionMethodId = 'light' | 'cup' | 'mood' | 'virtue' | 'sentence'

interface MethodBase {
  id: ReflectionMethodId
  number: number
  title: string
  question: string
}

export interface ChoiceMethod extends MethodBase {
  kind: 'choice'
  variant: 'light' | 'list' | 'row'
  options: readonly ReflectionOption[]
}

export interface TextMethod extends MethodBase {
  kind: 'text'
  placeholder: string
}

export type ReflectionMethod = ChoiceMethod | TextMethod

/** Five feedback methods; each one gets its own QR code and its own results. */
export const REFLECTION_METHODS: readonly ReflectionMethod[] = [
  {
    id: 'light',
    number: 1,
    title: '«Бағдаршам»',
    question: 'Бүгінгі тақырыпты қаншалықты түсіндің?',
    kind: 'choice',
    variant: 'light',
    options: [
      { id: 'green', label: 'Түсіндім', icon: '🟢' },
      { id: 'yellow', label: 'Әлі де үйренемін', icon: '🟡' },
      { id: 'red', label: 'Көмек қажет', icon: '🔴' },
    ],
  },
  {
    id: 'cup',
    number: 2,
    title: '«Даналық кесесі»',
    question: 'Білім кесең қаншалықты толды?',
    kind: 'choice',
    variant: 'list',
    options: [
      { id: 'full', label: 'Кесем толды — көп білдім', icon: '☕' },
      { id: 'half', label: 'Жарты кесе — біраз білдім', icon: '🍵' },
      { id: 'low', label: 'Кесем әлі бос — қайталау керек', icon: '🫗' },
    ],
  },
  {
    id: 'mood',
    number: 3,
    title: '«Көңіл-күй смайлигі»',
    question: 'Сабақтан кейінгі көңіл-күйің қандай?',
    kind: 'choice',
    variant: 'row',
    options: [
      { id: 'great', label: 'Керемет', icon: '😄' },
      { id: 'good', label: 'Жақсы', icon: '🙂' },
      { id: 'ok', label: 'Орташа', icon: '😐' },
      { id: 'hard', label: 'Қиын болды', icon: '😕' },
    ],
  },
  {
    id: 'virtue',
    number: 4,
    title: '«Бес асыл іс»',
    question: 'Қай асыл істі өз бойыңда дамытқың келеді?',
    kind: 'choice',
    variant: 'row',
    options: VIRTUES.map((v) => ({ id: v, label: v, icon: '✨' })),
  },
  {
    id: 'sentence',
    number: 5,
    title: '«Аяқталмаған сөйлем»',
    question: 'Сөйлемді аяқта: «Бүгін мен ... үйрендім» немесе «Маған ... ұнады».',
    kind: 'text',
    placeholder: 'Бүгін мен … үйрендім',
  },
]

export const DEFAULT_METHOD_ID: ReflectionMethodId = 'light'

export const findMethod = (id: string | null): ReflectionMethod | undefined => REFLECTION_METHODS.find((m) => m.id === id)
