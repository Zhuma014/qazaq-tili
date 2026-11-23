export const LESSON_TITLE = 'Абай Құнанбаев «Ғылым таппай мақтанба» өлеңі'
export const LESSON_SUBTITLE = 'Әдеби кафе • 6-сынып'

export interface AbaiStage {
  slug: string
  title: string
  emoji: string
  lead: string
}

export const ABAI_STAGES: readonly AbaiStage[] = [
  { slug: 'topqa-bolinu', title: 'Топқа бөліну', emoji: '☕', lead: 'Даналық кафесінің есігін ашып, өз тобыңды тап.' },
  { slug: 'oqu-maqsattary', title: 'Оқу мақсаттары', emoji: '🎯', lead: 'Бүгінгі сабақта қандай мақсатқа жетеміз?' },
  { slug: 'eki-quty', title: 'Екі құты', emoji: '🫙', lead: 'Жақсы және жаман қасиеттерді екі құтыға орналастыр.' },
  { slug: 'toptyq-zhumys', title: 'Топтық жұмыс', emoji: '👥', lead: 'Әр топ Абайдың даналық соты мен даналық зертханасында жұмыс істейді.' },
  { slug: 'oqushy-dongelegi', title: 'Оқушылар дөңгелегі', emoji: '🎡', lead: 'Дөңгелекті айналдырып, жауап беретін оқушыны таңда.' },
  { slug: 'zhuptyq-zhumys', title: 'Жұптық жұмыс', emoji: '🤝', lead: 'Дөңгелек қай жұпты таңдаса, сол жұп жағдаятты талдайды.' },
  { slug: 'sergitu-sati', title: 'Сергіту сәті', emoji: '🤸', lead: 'Видеоны көріп, қимылдарды бірге қайталаңдар!' },
  { slug: 'zheke-zhumys', title: 'Жеке жұмыс', emoji: '📜', lead: '«Әдеби жаңалықтар»: жалған ақпаратты тауып, дұрыс нұсқасын жаз.' },
  { slug: 'abai-beinesi', title: 'Абай бейнесі', emoji: '🖋️', lead: 'QR-кодты оқып, Абай бейнесін бір-екі сөзбен сипатта.' },
  { slug: 'uy-zhumysy', title: 'Үй жұмысы', emoji: '🏠', lead: '«Абай өсиеті – менің өмірімде»' },
  { slug: 'refleksiya', title: 'Рефлексия', emoji: '☕', lead: '«Даналық кесесі»: QR-код арқылы кесеңнің күйін белгіле, сұрағың болса жаз.' },
  { slug: 'konil-kui', title: 'Көңіл күй', emoji: '😊', lead: 'Тақтаға шығып, бүгінгі сабақтан кейінгі көңіл күйіңді белгіле.' },
  { slug: 'sait', title: 'Біздің сайт', emoji: '🌐', lead: 'QR-кодты оқып, «Қазақ тілі әлемі» сайтына кір.' },
]

export interface LearningObjective {
  code: string
  text: string
}

export const LEARNING_OBJECTIVES: readonly LearningObjective[] = [
  { code: '6.1.2.1', text: 'әдеби шығармада көтерілген әлеуметтік-қоғамдық мәселені идеясы арқылы түсіндіру;' },
  { code: '6.2.2.1', text: 'эпикалық, поэзиялық шығармалардағы автор бейнесін анықтау.' },
]

export interface AbaiQuote {
  id: string
  lines: readonly string[]
}

export const ABAI_QUOTES: readonly AbaiQuote[] = [
  { id: 'mactanba', lines: ['Ғылым таппай мақтанба,', 'Орын таппай баптанба'] },
  { id: 'bes-narse', lines: ['Бес нәрседен қашық бол,', 'Бес нәрсеге асық бол,', 'Адам болам десеңіз'] },
  { id: 'dushpan', lines: ['Өсек, өтірік, мақтаншақ,', 'Еріншек, бекер мал шашпақ —', 'Бес дұшпаның білсеңіз'] },
  { id: 'asyl', lines: ['Талап, еңбек, терең ой,', 'Қанағат, рақым ойлап қой —', 'Бес асыл іс, көнсеңіз'] },
  { id: 'kirpish', lines: ['Сен де бір кірпіш дүниеге,', 'Кетігін тап та, бар қалан!'] },
]

export const THINKING_QUESTIONS: readonly string[] = [
  'Екі құтыдағы қасиеттердің айырмашылығы қандай?',
  'Адам бойында қандай қасиеттер басым болуы керек?',
  'Жақсы қасиеттер адамды қандай жетістікке жетелейді?',
]

export const VIRTUES = ['Талап', 'Еңбек', 'Терең ой', 'Қанағат', 'Рақым'] as const
export const ENEMIES = ['Өсек', 'Өтірік', 'Мақтаншақтық', 'Еріншектік', 'Бекер мал шашпақ'] as const

export const HELP_CARD = {
  keywords: ['Ғылым', 'білім', 'еңбек', 'талап', 'бес асыл іс', 'бес дұшпан'],
  starters: ['«Абай жастарды ... шақырады».', '«Ақын ... қасиетін сынайды».'],
} as const

export const WORKSHEET_IMAGE = 'abai/zheke-zhumys.jpeg'

export interface AnswerKeyItem {
  wrong: string
  right: string
}

export const WORKSHEET_ANSWER_KEY: readonly AnswerKeyItem[] = [
  { wrong: 'Жастарды байлық жинауға шақырады.', right: 'Абай жастарды ғылым-білімге, еңбекке шақырады.' },
  { wrong: 'Өз жетістігін мақтан етуге шақырады.', right: 'Ақын мақтанбауға үндейді: «Ғылым таппай мақтанба».' },
  { wrong: 'Адамға білімнен гөрі атақ маңызды.', right: 'Абай үшін атақтан гөрі білім мен адамгершілік маңызды.' },
  { wrong: 'Бес асыл істің қатарына өсек пен өтірікті қосады.', right: 'Өсек пен өтірік — бес дұшпанның қатарында. Бес асыл іс: талап, еңбек, терең ой, қанағат, рақым.' },
  { wrong: 'Адам еңбектенбей-ақ жетістікке жете алады.', right: 'Абайдың ойынша, жетістікке тек еңбек арқылы жетуге болады.' },
]

export const HOMEWORK = {
  title: '«Абай өсиеті – менің өмірімде»',
  task: 'Абайдың бес асыл ісінің бірін таңдап, сол қасиетті күнделікті өмірде қалай жүзеге асыратыныңды 5–6 сөйлеммен жаз.',
} as const

/** YouTube id of the «Сергіту сәті» exercise video. */
export const WARMUP_VIDEO_ID = '-rIi2dgBqB8'

/** Suno id of the teacher's song «Бес дұшпаның», played under the warm-up video. */
export const WARMUP_SONG = { title: 'Бес дұшпаның', sunoId: 'c70b84a9-d515-4493-a7cc-5ff4fd3c0cb0' } as const
