import { useState } from 'react'

export interface TaskResult {
  ok: number
  total: number
}

/** Holds the check result of a task and reports full success upward once. */
export const useTaskResult = (onSolved?: () => void) => {
  const [result, setResult] = useState<TaskResult | null>(null)
  const check = (ok: number, total: number) => {
    setResult({ ok, total })
    if (ok === total) onSolved?.()
  }
  return { result, isChecked: result !== null, check, reset: () => setResult(null) }
}
