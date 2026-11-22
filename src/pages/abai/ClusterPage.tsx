import { useState } from 'react'
import { ClusterBoard } from '@/components/abai/ClusterBoard'
import { QrPanel } from '@/components/abai/QrPanel'
import { useLessonSession } from '@/hooks/useLessonSession'
import { isClusterAnswer } from '@/lib/abaiAnswers'
import { topicFor, useLiveMessages } from '@/lib/liveBoard'

const CLUSTER_ANSWER_PATH = '/abai/klaster/zhauap'

export const ClusterPage = () => {
  const { session, restart } = useLessonSession()
  const { messages, status } = useLiveMessages(topicFor(session, 'klaster'), isClusterAnswer)
  const [hiddenIds, setHiddenIds] = useState<readonly string[]>([])

  const items = messages.filter((m) => !hiddenIds.includes(m.id)).map((m) => ({ id: m.id, text: m.data.text.trim() }))

  return (
    <div className="live-stage">
      <ClusterBoard items={items} onHide={(id) => setHiddenIds([...hiddenIds, id])} />
      <QrPanel path={CLUSTER_ANSWER_PATH} session={session} answerCount={items.length} status={status} onRestart={restart} />
    </div>
  )
}
