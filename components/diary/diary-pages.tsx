import type { ComponentType } from 'react'
import { PageCover } from './pages/page-cover'
import { PageFirstMemories } from './pages/page-first-memories'
import { PageTravel } from './pages/page-travel'
import { PageLittleThings } from './pages/page-little-things'
import { PageLetter } from './pages/page-letter'
import { PageComic } from './pages/page-comic'
import { PageFamily } from './pages/page-family'
import { PageFuture } from './pages/page-future'

export type DiaryPage = {
  id: string
  /** Short label for the page-selector tabs. */
  tab: string
  Component: ComponentType
}

export const diaryPages: DiaryPage[] = [
  { id: 'cover', tab: 'Cover', Component: PageCover },
  { id: 'first', tab: 'First memories', Component: PageFirstMemories },
  { id: 'travel', tab: 'Travels', Component: PageTravel },
  { id: 'little', tab: 'Little things', Component: PageLittleThings },
  { id: 'letter', tab: 'A letter', Component: PageLetter },
  { id: 'comic', tab: 'Funny us', Component: PageComic },
  { id: 'family', tab: 'Family', Component: PageFamily },
  { id: 'future', tab: 'What\u2019s next', Component: PageFuture },
]
