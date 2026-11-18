import './FootprintTrail.css'
import { useState, useEffect, useRef } from 'react'
import { Footprints } from 'lucide-react'
import footprint from '../assets/footprint.svg'

const STEP = 70
const SIDE_OFFSET = 20
const MAX_PRINTS = 14
const STORAGE_KEY = 'deepalaya-trail'

function getInitialEnabled() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) return saved === 'on'
  } catch {
    // storage unavailable, fall through to the default
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function FootprintTrail({ screen }) {
  const [enabled, setEnabled] = useState(getInitialEnabled)
  const [prints, setPrints] = useState([])
  const last = useRef(null)
  const stepCount = useRef(0)
  const nextId = useRef(0)

  const active = enabled && screen !== 'maker'

  useEffect(() => {
    if (!active) {
      setPrints((current) => (current.length ? [] : current))
      last.current = null
      return
    }

    function onMove(e) {
      if (e.pointerType !== 'mouse') return

      const point = { x: e.clientX, y: e.clientY }

      if (!last.current) {
        last.current = point
        return
      }

      const dx = point.x - last.current.x
      const dy = point.y - last.current.y
      const distance = Math.hypot(dx, dy)

      if (distance < STEP) return

      const ux = dx / distance
      const uy = dy / distance
      const side = stepCount.current % 2 === 0 ? -1 : 1

      stepCount.current += 1
      last.current = point

      const print = {
        id: nextId.current++,
        x: point.x - uy * side * SIDE_OFFSET,
        y: point.y + ux * side * SIDE_OFFSET,
        angle: (Math.atan2(dy, dx) * 180) / Math.PI + 90,
        mirror: side === 1,
      }

      setPrints((current) => [...current.slice(-(MAX_PRINTS - 1)), print])
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [active])

  function toggle() {
    const next = !enabled
    setEnabled(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
    } catch {
      // storage unavailable, the choice just won't persist
    }
  }

  return (
    <>
      <div className="trail-layer" aria-hidden="true">
        {prints.map((p) => (
          <img
            key={p.id}
            src={footprint}
            alt=""
            className="trail-print"
            style={{
              left: p.x,
              top: p.y,
              transform: `translate(-50%, -50%) rotate(${p.angle}deg) ${p.mirror ? 'scaleX(-1)' : ''}`,
            }}
            onAnimationEnd={() =>
              setPrints((current) => current.filter((item) => item.id !== p.id))
            }
          />
        ))}
      </div>

      {screen !== 'maker' && (
        <button
          type="button"
          className={`trail-toggle ${enabled ? 'on' : ''}`}
          onClick={toggle}
          aria-pressed={enabled}
          title="Toggle Laxmi's footprint trail"
        >
          <Footprints size={20} />
          <span>{enabled ? 'Trail on' : 'Trail off'}</span>
        </button>
      )}
    </>
  )
}