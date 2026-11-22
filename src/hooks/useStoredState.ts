import { useState } from 'react'

const write = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage unavailable (private mode): the value then lives only in memory.
  }
}

// The fallback is stored right away so a random default (e.g. a lesson code) stays the same after reload.
const read = <T>(key: string, fallback: () => T): T => {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch {
    // Unreadable value: replaced by the fallback below.
  }
  const initial = fallback()
  write(key, initial)
  return initial
}

/** useState that survives a page reload on this device (falls back to memory when storage is blocked). */
export const useStoredState = <T>(key: string, fallback: () => T) => {
  const [value, setValue] = useState<T>(() => read(key, fallback))
  const update = (next: T) => {
    setValue(next)
    write(key, next)
  }
  return [value, update] as const
}
