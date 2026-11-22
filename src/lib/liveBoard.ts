import { useEffect, useState } from 'react'

/*
 * Student answers travel through ntfy.sh — a free public pub/sub service that
 * needs no account and allows CORS, so the static GitHub Pages site can collect
 * answers from phones. Messages are cached by ntfy.sh for ~12 hours.
 */
const NTFY_BASE = 'https://ntfy.sh'
const TOPIC_PREFIX = 'qazaq-tili-abai'

export type LiveChannel = 'klaster' | 'refleksiya'
export type LiveStatus = 'connecting' | 'live' | 'offline'

export interface LiveMessage<T> {
  id: string
  time: number
  data: T
}

interface NtfyEvent {
  id: string
  time: number
  event: string
  message?: string
}

export const topicFor = (session: string, channel: LiveChannel) => `${TOPIC_PREFIX}-${session}-${channel}`

export const publishAnswer = async (topic: string, data: unknown): Promise<void> => {
  const response = await fetch(`${NTFY_BASE}/${topic}`, { method: 'POST', body: JSON.stringify(data) })
  if (!response.ok) throw new Error(`ntfy publish failed: ${response.status}`)
}

const parseEvent = <T>(raw: string, isValid: (v: unknown) => v is T): LiveMessage<T> | null => {
  try {
    const event = JSON.parse(raw) as NtfyEvent
    if (event.event !== 'message' || !event.message) return null
    const data: unknown = JSON.parse(event.message)
    return isValid(data) ? { id: event.id, time: event.time, data } : null
  } catch {
    return null
  }
}

interface TopicMessages<T> {
  topic: string
  list: LiveMessage<T>[]
}

/** Streams every message of a topic (including ones sent before the page opened). */
export const useLiveMessages = <T>(topic: string, isValid: (v: unknown) => v is T) => {
  const [state, setState] = useState<TopicMessages<T>>({ topic, list: [] })
  const [status, setStatus] = useState<LiveStatus>('connecting')

  useEffect(() => {
    const source = new EventSource(`${NTFY_BASE}/${topic}/sse?since=all`)
    source.onopen = () => setStatus('live')
    // EventSource reconnects by itself; replayed messages are de-duplicated by id.
    source.onerror = () => setStatus('offline')
    source.onmessage = (e: MessageEvent<string>) => {
      const message = parseEvent(e.data, isValid)
      if (!message) return
      setState((prev) => {
        const list = prev.topic === topic ? prev.list : []
        if (list.some((m) => m.id === message.id)) return prev
        return { topic, list: [...list, message].sort((a, b) => a.time - b.time) }
      })
    }
    return () => source.close()
  }, [topic, isValid])

  const messages = state.topic === topic ? state.list : []
  return { messages, status }
}
