const BEEP_COUNT = 3
const BEEP_GAP_S = 0.35
const BEEP_LENGTH_S = 0.25
const BEEP_HZ = 880
const BEEP_VOLUME = 0.3

/** Three short beeps when the timer ends; silent if the browser blocks audio. */
export const playChime = () => {
  try {
    const ctx = new AudioContext()
    for (let i = 0; i < BEEP_COUNT; i += 1) {
      const start = ctx.currentTime + i * BEEP_GAP_S
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = BEEP_HZ
      gain.gain.setValueAtTime(BEEP_VOLUME, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + BEEP_LENGTH_S)
      osc.connect(gain).connect(ctx.destination)
      osc.start(start)
      osc.stop(start + BEEP_LENGTH_S)
    }
    window.setTimeout(() => void ctx.close(), (BEEP_COUNT * BEEP_GAP_S + 1) * 1000)
  } catch {
    // No Web Audio: the flashing «Уақыт бітті!» is enough.
  }
}
