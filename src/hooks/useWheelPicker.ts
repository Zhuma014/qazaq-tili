import { useState } from 'react'
import type { WheelItem } from '@/components/abai/FortuneWheel'

/** Tracks the wheel's winner and (optionally) drops already-picked items from the wheel. */
export const useWheelPicker = (allItems: readonly WheelItem[]) => {
  const [removedIds, setRemovedIds] = useState<readonly string[]>([])
  const [winner, setWinner] = useState<WheelItem | null>(null)
  const [shouldRemove, setShouldRemove] = useState(true)

  const items = allItems.filter((item) => !removedIds.includes(item.id))

  // Removal waits until the winner is acknowledged so the wheel doesn't redraw under the pointer.
  const accept = () => {
    if (winner && shouldRemove) setRemovedIds([...removedIds, winner.id])
    setWinner(null)
  }

  const refill = () => {
    setRemovedIds([])
    setWinner(null)
  }

  return { items, winner, setWinner, accept, refill, shouldRemove, setShouldRemove }
}
