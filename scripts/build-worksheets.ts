/**
 * Generates a printable worksheet per topic: public/worksheets/<id>.docx,
 * then converts each to PDF with LibreOffice (soffice must be installed).
 * Run: npm run worksheets
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  HeadingLevel,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx'
import { AUTHOR } from '../src/data/site'
import { TOPICS } from '../src/data/topics'
import { stripFindMarks } from '../src/lib/findText'
import type { FillTask, FindTask, MatchTask, SelectTask, SortTask, Task, Topic } from '../src/types/content'

const OUT_DIR = join(import.meta.dirname, '..', 'public', 'worksheets')
const FONT = 'Arial'
const BODY_SIZE = 26 // half-points → 13pt
const TITLE_COLOR = '1673B3'
const SORT_EMPTY_ROWS = 5
const TEST_QUESTIONS_ON_SHEET = 5
const LETTERS = ['а', 'ә', 'б', 'в', 'г', 'ғ', 'д', 'е'] as const
const ANSWER_LETTERS = ['А', 'Ә', 'Б', 'В'] as const
const BLANK = '____________'

const stripBold = (s: string) => s.replace(/\*\*/g, '')

/** Deterministic reordering so the sheet differs from the answer order but stays stable between builds. */
const stableShuffle = <T,>(items: readonly T[], key: (t: T) => string): T[] => {
  const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + (c.codePointAt(0) ?? 0)) % 1_000_003, 7)
  return [...items].sort((a, b) => hash(key(a)) - hash(key(b)))
}

interface RunOpts {
  bold?: boolean
  size?: number
  color?: string
  italics?: boolean
}

const EMOJI_FONT = 'Noto Emoji'
const EMOJI_SIZE = 36
const EMOJI_RE = /(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic}|\uFE0F\u200D\p{Extended_Pictographic})*\uFE0F?)/u

const run = (value: string, opts: RunOpts, font: string) =>
  new TextRun({ text: value, font, size: opts.size ?? BODY_SIZE, bold: opts.bold, color: opts.color, italics: opts.italics })

/** Text runs with emoji split into their own runs, since the body font has no emoji glyphs. */
const runs = (value: string, opts: RunOpts = {}): TextRun[] =>
  value
    .split(EMOJI_RE)
    .filter(Boolean)
    .map((part) => (EMOJI_RE.test(part) ? run(part, { ...opts, size: EMOJI_SIZE }, EMOJI_FONT) : run(part, opts, FONT)))

const text = (value: string, opts: RunOpts = {}) => run(value, opts, FONT)

const para = (children: TextRun[] | string, spacingAfter = 120) =>
  new Paragraph({ children: typeof children === 'string' ? runs(children) : children, spacing: { after: spacingAfter } })

const cell = (value: string, opts: { bold?: boolean; fill?: string; width?: number } = {}) =>
  new TableCell({
    children: [para(runs(value, { bold: opts.bold }), 60)],
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill, color: 'auto' } : undefined,
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
  })

const taskHeading = (n: number, task: Task) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 100 },
    children: [text(`${n}-тапсырма. ${task.title}`, { bold: true, size: 28, color: TITLE_COLOR })],
  })

const instruction = (task: Task) => para([text(task.instruction, { italics: true })])

const selectBlock = (t: SelectTask) => [
  para(`${t.instruction.replace(/\.$/, '')} (астын сыз):`),
  para(runs(t.words.map((w) => w.text).join(',   '), { bold: true }), 200),
]

const matchBlock = (t: MatchTask) => {
  const rights = stableShuffle(t.pairs.map((p) => p.right), (r) => r)
  const rows = t.pairs.map(
    (p, i) => new TableRow({ children: [cell(`${i + 1}. ${p.left}`, { width: 45 }), cell('', { width: 10 }), cell(`${LETTERS[i]}) ${rights[i]}`, { width: 45 })] }),
  )
  return [
    instruction(t),
    new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE }, borders: noInnerBorders() }),
    para(`Жауабы: ${t.pairs.map((_, i) => `${i + 1} – ___`).join(';   ')}`, 200),
  ]
}

const sortBlock = (t: SortTask) => {
  const bank = stableShuffle(t.groups.flatMap((g) => g.items), (s) => s)
  const width = Math.floor(100 / t.groups.length)
  const header = new TableRow({ children: t.groups.map((g) => cell(g.title, { bold: true, fill: 'E3F2FC', width })) })
  const empty = Array.from({ length: SORT_EMPTY_ROWS }, () => new TableRow({ children: t.groups.map(() => cell('', { width })) }))
  return [
    instruction(t),
    para([text('Сөздер: ', { bold: true }), text(bank.join(',  '))]),
    new Table({ rows: [header, ...empty], width: { size: 100, type: WidthType.PERCENTAGE } }),
  ]
}

const fillBlock = (t: FillTask) => [
  instruction(t),
  ...t.items.map((item, i) =>
    para([
      ...runs(item.emoji ? `${item.emoji}  ` : ''),
      text(`${i + 1}. ${item.before} ${BLANK}${/^[.,!?]/.test(item.after) ? '' : ' '}${item.after}  `),
      text(`(${item.options.join(' / ')})`, { color: '6B7280' }),
    ]),
  ),
]

const findBlock = (t: FindTask) => [
  para(`${t.instruction.replace(/\.$/, '')} және астын сыз.`),
  new Paragraph({
    children: [text(stripFindMarks(t.text), { size: 28 })],
    spacing: { after: 200, line: 400 },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: TITLE_COLOR, space: 10 } },
  }),
]

const taskBlock = (task: Task) => {
  switch (task.kind) {
    case 'select':
      return selectBlock(task)
    case 'match':
      return matchBlock(task)
    case 'sort':
      return sortBlock(task)
    case 'fill':
      return fillBlock(task)
    case 'find':
      return findBlock(task)
  }
}

const noInnerBorders = () => {
  const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
  return { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none }
}

const testBlock = (topic: Topic) => [
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 100 },
    children: [text('Өзіңді тексер', { bold: true, size: 28, color: TITLE_COLOR })],
  }),
  ...topic.test.slice(0, TEST_QUESTIONS_ON_SHEET).flatMap((q, i) => [
    para([text(`${i + 1}. ${q.question}`, { bold: true })], 60),
    para(q.options.map((o, j) => text(`${ANSWER_LETTERS[j]}) ${o}     `)), 160),
  ]),
]

const header = (topic: Topic) => [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [text('ҚАЗАҚ ТІЛІ ӘЛЕМІ  •  ЖҰМЫС ПАРАҒЫ', { bold: true, size: 20, color: '6B7280' })],
  }),
  new Paragraph({
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [text(topic.title, { bold: true, size: 44, color: TITLE_COLOR })],
  }),
  para(`Аты-жөні: ________________________   Сынып: _____   Күні: __________`, 240),
  new Paragraph({
    spacing: { after: 200 },
    shading: { type: ShadingType.CLEAR, fill: 'FFF4D1', color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: 'E0A100', space: 8 } },
    children: [
      text('Есте сақта! ', { bold: true }),
      text(stripBold(topic.definition)),
      ...(topic.questions.length ? [text(`  Сұрақтары: ${topic.questions.join(' ')}`, { bold: true })] : []),
    ],
  }),
]

const buildDoc = (topic: Topic) =>
  new Document({
    creator: AUTHOR.name,
    title: `${topic.title} — жұмыс парағы`,
    styles: { default: { document: { run: { font: FONT, size: BODY_SIZE } } } },
    sections: [
      {
        properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [text(`Авторы: ${AUTHOR.name}, ${AUTHOR.school}`, { size: 18, color: '9CA3AF' })],
              }),
            ],
          }),
        },
        children: [
          ...header(topic),
          ...topic.tasks.flatMap((task, i) => [taskHeading(i + 1, task), ...taskBlock(task)]),
          ...testBlock(topic),
        ],
      },
    ],
  })

const main = async () => {
  mkdirSync(OUT_DIR, { recursive: true })
  const docxPaths: string[] = []
  for (const topic of TOPICS) {
    const path = join(OUT_DIR, `${topic.id}.docx`)
    writeFileSync(path, await Packer.toBuffer(buildDoc(topic)))
    docxPaths.push(path)
  }
  console.log(`Wrote ${docxPaths.length} .docx files`)
  execFileSync('soffice', ['--headless', '--convert-to', 'pdf', '--outdir', OUT_DIR, ...docxPaths], { stdio: 'inherit' })
}

main().catch((err: unknown) => {
  console.error('Worksheet build failed:', err)
  process.exit(1)
})
