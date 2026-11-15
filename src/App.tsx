import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { GamesPage } from '@/pages/GamesPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PicturesPage } from '@/pages/PicturesPage'
import { SectionPage } from '@/pages/SectionPage'
import { TeacherPage } from '@/pages/TeacherPage'
import { TestsPage } from '@/pages/TestsPage'
import { TopicPage } from '@/pages/TopicPage'
import { WorksheetsPage } from '@/pages/WorksheetsPage'

export const App = () => (
  <HashRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="soz-taptary" element={<SectionPage section="soz-taby" />} />
        <Route path="zhalgaular" element={<SectionPage section="zhalgau" />} />
        <Route path="taqyryp/:topicId" element={<Navigate to="ereje" replace />} />
        <Route path="taqyryp/:topicId/:step" element={<TopicPage />} />
        <Route path="oiyndar" element={<GamesPage />} />
        <Route path="testter" element={<TestsPage />} />
        <Route path="suretti" element={<PicturesPage />} />
        <Route path="paraqtar" element={<WorksheetsPage />} />
        <Route path="mugalimge" element={<TeacherPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
)
