import { useState } from 'react'
import { publishAnswer } from '@/lib/liveBoard'
import type { SendState } from '@/types/abai'
import { useStoredState } from './useStoredState'

/** Sends one student answer; remembers on the device that it was sent so a reload doesn't double-count. */
export const useSendAnswer = (topic: string) => {
  const [isSent, setIsSent] = useStoredState(`abai-sent-${topic}`, () => false)
  const [state, setState] = useState<SendState>({ status: 'idle' })

  const send = async (data: unknown) => {
    setState({ status: 'sending' })
    try {
      await publishAnswer(topic, data)
      setIsSent(true)
      setState({ status: 'sent' })
    } catch {
      setState({ status: 'error' })
    }
  }

  return { isSent, state, send }
}
