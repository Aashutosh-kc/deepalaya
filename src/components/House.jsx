import { useState } from 'react'
import './House.css'

// Points along a curved line from p0 to p2, pulled toward p1
function curvePoints(p0, p1, p2, count) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    return {
      x: (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0],
      y: (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1],
    }
  })
}

const GOLD = 'var(--pack-yellow)'
const ACCENTS = ['var(--pack-pink)', 'var(--pack-blue)', 'var(--pack-orange)', 'var(--pack-green)']
const RANGOLI_COLORS = ['var(--pack-pink)', 'var(--pack-yellow)', 'var(--pack-blue)', 'var(--pack-orange)', 'var(--pack-green)', 'var(--pack-purple)']
const LIGHTS = curvePoints([70, 142], [200, 178], [330, 142], 15)
const GARLAND = curvePoints([176, 186], [200, 200], [224, 186], 7)
const RANGOLI_DOTS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 2 * Math.PI
  return { x: 200 + 40 * Math.cos(angle), y: 282 + 9 * Math.sin(angle) }
})

export default function House() {
  const [lightsOn, setLightsOn] = useState(true)

  return (
    <div className={lightsOn ? 'house' : 'house dark'}>
      <svg viewBox="0 0 400 300">
        <defs>
          <radialGradient id="window-glow">
            <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFC83D" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="ground-group">
          <rect className="shape ground" x="0" y="260" width="400" height="40" />
          <rect className="shape step" x="170" y="258" width="60" height="8" />
        </g>

        <g className="rangoli">
          <ellipse className="shape rangoli-base" cx="200" cy="282" rx="48" ry="12" />
          <ellipse className="shape rangoli-inner" cx="200" cy="282" rx="22" ry="5" />
          {RANGOLI_DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r="3.5"
              style={{ fill: RANGOLI_COLORS[i % RANGOLI_COLORS.length] }} />
          ))}
        </g>

        <g className="house-body">
          <rect className="shape wall" x="100" y="130" width="200" height="130" />
          <circle className="glow" cx="140" cy="190" r="45" fill="url(#window-glow)" />
          <circle className="glow" cx="260" cy="190" r="45" fill="url(#window-glow)" />
          <rect className="shape window" x="120" y="170" width="40" height="40" />
          <rect className="shape window" x="240" y="170" width="40" height="40" />
          <line className="bar" x1="140" y1="170" x2="140" y2="210" />
          <line className="bar" x1="120" y1="190" x2="160" y2="190" />
          <line className="bar" x1="260" y1="170" x2="260" y2="210" />
          <line className="bar" x1="240" y1="190" x2="280" y2="190" />
          <rect className="shape door" x="180" y="190" width="40" height="70" rx="3" />
          {GARLAND.map((g, i) => (
            <circle key={i} className="marigold" cx={g.x} cy={g.y} r="3.5" />
          ))}
        </g>

        <g className="roof">
          <polygon className="shape roof-shape" points="75,132 135,72 265,72 325,132" />
          <line className="roof-line" x1="115" y1="92" x2="285" y2="92" />
          <line className="roof-line" x1="95" y1="112" x2="305" y2="112" />
          <rect className="shape trim" x="75" y="132" width="250" height="8" />
          <circle className="shape finial" cx="200" cy="72" r="5" />
        </g>

        <g className="lights" onClick={() => setLightsOn(!lightsOn)}>
          <path className="wire" d="M70,142 Q200,178 330,142" fill="none" />
          {LIGHTS.map((b, i) => {
            const color = i % 2 === 0 ? GOLD : ACCENTS[Math.floor(i / 2) % ACCENTS.length]
            return (
              <circle key={i} className="bulb" cx={b.x} cy={b.y} r="5"
                style={{ fill: color, color, animationDelay: `${(i * 0.23) % 1.6}s` }} />
            )
          })}
        </g>

        <g className="diyas">
          {[150, 250].map((x) => (
            <g key={x}>
              <path className="shape diya-bowl" d={`M${x - 10},252 Q${x},266 ${x + 10},252 Z`} />
              <ellipse className="flame" cx={x} cy="246" rx="3.5" ry="6" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}