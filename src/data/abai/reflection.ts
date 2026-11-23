export interface ReflectionOption {
  id: string
  label: string
  icon: string
}

export interface ReflectionMethod {
  id: string
  title: string
  question: string
  options: readonly ReflectionOption[]
}

/** The lesson's single feedback method, answered from one QR code. */
export const REFLECTION_METHOD: ReflectionMethod = {
  id: 'cup',
  title: '«Даналық кесесі»',
  question: 'Білім кесең қаншалықты толды?',
  options: [
    { id: 'full', label: 'Кесем толды — маған сабақ ұнады, барлығы түсінікті болды', icon: '☕' },
    { id: 'half', label: 'Жарты кесе — сабақта түсінбеген сұрағым болды', icon: '🍵' },
    { id: 'low', label: 'Кесем әлі бос — сабақта тапсырмаларды орындау қиындық туғызды', icon: '🫗' },
  ],
}

export interface MoodOption {
  id: string
  label: string
  icon: string
}

/** Smileys the students tap on the board at the very end of the lesson. */
export const MOOD_OPTIONS: readonly MoodOption[] = [
  { id: 'great', label: 'Керемет', icon: '😄' },
  { id: 'good', label: 'Жақсы', icon: '🙂' },
  { id: 'okay', label: 'Орташа', icon: '😐' },
  { id: 'sad', label: 'Көңілсіз', icon: '😔' },
]
