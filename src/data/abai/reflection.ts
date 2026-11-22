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
    { id: 'full', label: 'Кесем толды — көп білдім', icon: '☕' },
    { id: 'half', label: 'Жарты кесе — біраз білдім', icon: '🍵' },
    { id: 'low', label: 'Кесем әлі бос — қайталау керек', icon: '🫗' },
  ],
}
