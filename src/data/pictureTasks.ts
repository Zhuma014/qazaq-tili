import type { Task } from '@/types/content'

export interface PictureActivity {
  id: string
  emoji: string
  title: string
  lead: string
  task: Task
}

export const PICTURE_ACTIVITIES: readonly PictureActivity[] = [
  {
    id: 'zatty-ata',
    emoji: '🔍',
    title: 'Затты ата',
    lead: 'Суреттегі заттың атын тап.',
    task: {
      id: 'pic-1',
      kind: 'match',
      title: 'Затты ата',
      instruction: 'Әр суретті оның атауымен сәйкестендір.',
      grade: '1-4',
      pairs: [
        { left: '🐫', right: 'түйе' },
        { left: '🍉', right: 'қарбыз' },
        { left: '🌙', right: 'ай' },
        { left: '🦅', right: 'бүркіт' },
        { left: '🎒', right: 'сөмке' },
        { left: '🌷', right: 'қызғалдақ' },
      ],
    },
  },
  {
    id: 'kim-ne',
    emoji: '👀',
    title: 'Суреттегі адамдар',
    lead: '«Кім?» сұрағына жауап беретін суреттерді тап.',
    task: {
      id: 'pic-2',
      kind: 'select',
      title: 'Кім?',
      instruction: '«Кім?» сұрағына жауап беретін суреттерді белгіле.',
      grade: '1-4',
      words: [
        { text: 'дәрігер', isCorrect: true, emoji: '👨‍⚕️' },
        { text: 'мысық', isCorrect: false, emoji: '🐈' },
        { text: 'аспаз', isCorrect: true, emoji: '🧑‍🍳' },
        { text: 'автобус', isCorrect: false, emoji: '🚌' },
        { text: 'ғарышкер', isCorrect: true, emoji: '🧑‍🚀' },
        { text: 'гүл', isCorrect: false, emoji: '🌻' },
        { text: 'әже', isCorrect: true, emoji: '👵' },
        { text: 'кітап', isCorrect: false, emoji: '📗' },
      ],
    },
  },
  {
    id: 'sipatta',
    emoji: '🖌️',
    title: 'Сипатта',
    lead: 'Суретке қарап, затты сипаттайтын сөзді таңда.',
    task: {
      id: 'pic-3',
      kind: 'fill',
      title: 'Сипатта',
      instruction: 'Суретке қарап, сөйлемге сәйкес сын есімді таңда.',
      grade: '1-4',
      items: [
        { emoji: '🍋', before: 'Лимон', after: 'болады.', options: ['қышқыл', 'тәтті', 'ащы'], answer: 'қышқыл' },
        { emoji: '🐘', before: 'Піл —', after: 'жануар.', options: ['кішкентай', 'үлкен', 'жеңіл'], answer: 'үлкен' },
        { emoji: '🔥', before: 'От', after: 'болады.', options: ['ыстық', 'суық', 'дымқыл'], answer: 'ыстық' },
        { emoji: '🐢', before: 'Тасбақаның жүрісі', after: '.', options: ['жылдам', 'баяу', 'биік'], answer: 'баяу' },
        { emoji: '❄️', before: 'Қар', after: 'түсті.', options: ['қара', 'ақ', 'қызыл'], answer: 'ақ' },
      ],
    },
  },
  {
    id: 'soilem-qura',
    emoji: '🧩',
    title: 'Сөйлем құра',
    lead: 'Суретке қарап, сөйлемді толықтыр.',
    task: {
      id: 'pic-4',
      kind: 'fill',
      title: 'Сөйлем құра',
      instruction: 'Суретте не болып жатыр? Сөйлемді етістікпен толықтыр.',
      grade: '1-4',
      items: [
        { emoji: '🏊', before: 'Ерлан бассейнде', after: '.', options: ['жүзді', 'ұшты', 'жазды'], answer: 'жүзді' },
        { emoji: '🎨', before: 'Әсем сурет', after: '.', options: ['салды', 'ішті', 'жүгірді'], answer: 'салды' },
        { emoji: '📖', before: 'Атам газет', after: '.', options: ['оқыды', 'пісірді', 'тікті'], answer: 'оқыды' },
        { emoji: '🎤', before: 'Әпкем ән', after: '.', options: ['салды', 'жеді', 'жуды'], answer: 'салды' },
        { emoji: '🚲', before: 'Інім велосипед', after: '.', options: ['тепті', 'оқыды', 'сызды'], answer: 'тепті' },
      ],
    },
  },
  {
    id: 'top-kurastyr',
    emoji: '🗂️',
    title: 'Суреттерді топтастыр',
    lead: 'Суреттерді белгісіне қарай топқа бөл.',
    task: {
      id: 'pic-5',
      kind: 'sort',
      title: 'Топтастыр',
      instruction: 'Сөздерді «Жеміс» және «Көкөніс» топтарына бөл.',
      grade: '1-4',
      groups: [
        { title: 'Жеміс 🍎', items: ['🍐 алмұрт', '🍇 жүзім', '🍒 шие', '🍌 банан'] },
        { title: 'Көкөніс 🥕', items: ['🥕 сәбіз', '🥔 картоп', '🧅 пияз', '🥒 қияр'] },
      ],
    },
  },
]
