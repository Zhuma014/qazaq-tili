import { kk } from '@/i18n/kk'

export const NAV_ITEMS = [
  { to: '/soz-taptary', label: kk.nav.sozTaby, emoji: '📚' },
  { to: '/zhalgaular', label: kk.nav.zhalgau, emoji: '🔗' },
  { to: '/oiyndar', label: kk.nav.games, emoji: '🎮' },
  { to: '/testter', label: kk.nav.tests, emoji: '📝' },
  { to: '/suretti', label: kk.nav.pictures, emoji: '🖼️' },
  { to: '/paraqtar', label: kk.nav.worksheets, emoji: '📄' },
  { to: '/mugalimge', label: kk.nav.teacher, emoji: '👩‍🏫' },
] as const
