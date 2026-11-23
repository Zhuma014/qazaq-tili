import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AbaiLayout } from '@/components/abai/AbaiLayout'
import { LessonTimer } from '@/components/timer/LessonTimer'
import { Layout } from '@/components/layout/Layout'
import { AbaiHomePage } from '@/pages/abai/AbaiHomePage'
import { ClusterAnswerPage } from '@/pages/abai/ClusterAnswerPage'
import { ClusterPage } from '@/pages/abai/ClusterPage'
import { GroupSplitPage, JarsPage } from '@/pages/abai/GameStagePages'
import { GroupTasksPage } from '@/pages/abai/GroupTasksPage'
import { HomeworkPage } from '@/pages/abai/HomeworkPage'
import { MoodPage } from '@/pages/abai/MoodPage'
import { NameWheelPage } from '@/pages/abai/NameWheelPage'
import { ObjectivesPage } from '@/pages/abai/ObjectivesPage'
import { PairsPage } from '@/pages/abai/PairsPage'
import { ReflectionAnswerPage } from '@/pages/abai/ReflectionAnswerPage'
import { ReflectionPage } from '@/pages/abai/ReflectionPage'
import { SiteQrPage } from '@/pages/abai/SiteQrPage'
import { WarmupPage } from '@/pages/abai/WarmupPage'
import { WorksheetPage } from '@/pages/abai/WorksheetPage'
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
      <Route path="abai" element={<AbaiLayout />}>
        <Route index element={<AbaiHomePage />} />
        <Route path="topqa-bolinu" element={<GroupSplitPage />} />
        <Route path="oqu-maqsattary" element={<ObjectivesPage />} />
        <Route path="eki-quty" element={<JarsPage />} />
        <Route path="toptyq-zhumys" element={<GroupTasksPage />} />
        <Route path="oqushy-dongelegi" element={<NameWheelPage />} />
        <Route path="zhuptyq-zhumys" element={<PairsPage />} />
        <Route path="sergitu-sati" element={<WarmupPage />} />
        <Route path="zheke-zhumys" element={<WorksheetPage />} />
        <Route path="abai-beinesi" element={<ClusterPage />} />
        <Route path="uy-zhumysy" element={<HomeworkPage />} />
        <Route path="refleksiya" element={<ReflectionPage />} />
        <Route path="konil-kui" element={<MoodPage />} />
        <Route path="sait" element={<SiteQrPage />} />
      </Route>
      <Route path="abai/klaster/zhauap" element={<ClusterAnswerPage />} />
      <Route path="abai/refleksiya/zhauap" element={<ReflectionAnswerPage />} />
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
    <LessonTimer />
  </HashRouter>
)
