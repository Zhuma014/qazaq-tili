import type { SectionId, Topic } from '@/types/content'
import { elikteuSoz } from './elikteuSoz'
import { esimdik } from './esimdik'
import { etistik } from './etistik'
import { koptikZhalgau } from './koptikZhalgau'
import { odagai } from './odagai'
import { sanEsim } from './sanEsim'
import { septikZhalgau } from './septikZhalgau'
import { shylau } from './shylau'
import { synEsim } from './synEsim'
import { taueldikZhalgau } from './taueldikZhalgau'
import { usteu } from './usteu'
import { zatEsim } from './zatEsim'
import { zhiktikZhalgau } from './zhiktikZhalgau'

export const TOPICS: readonly Topic[] = [
  zatEsim,
  synEsim,
  sanEsim,
  esimdik,
  etistik,
  usteu,
  elikteuSoz,
  shylau,
  odagai,
  koptikZhalgau,
  taueldikZhalgau,
  septikZhalgau,
  zhiktikZhalgau,
]

export const topicsBySection = (section: SectionId): Topic[] =>
  TOPICS.filter((t) => t.section === section).sort((a, b) => a.order - b.order)

export const findTopic = (id: string | undefined): Topic | undefined => TOPICS.find((t) => t.id === id)
