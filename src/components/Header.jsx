import './Header.css'
import { MoveUpRight } from 'lucide-react'
import ShapeDivider from './ShapeDivider'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Days', href: '#days' },
  { label: 'Playgrounds', href: '#playgrounds' },
  { label: 'Countdown', href: '#countdown' },
]

export default function Header() {
  return (
    <div className="header-wrap">
      <header className="header">
        <a href="#home" className="logo">
          <img src="/logo.svg" alt="" className="logo-icon" />
          <span className="app-name">Deepalaya</span>
        </a>

        <nav className="nav-bar" aria-label="Main">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://github.com/Aashutosh-kc/YOUR-REPO"
          target="_blank"
          rel="noreferrer"
          className="github-link"
        >
          <img src="https://skillicons.dev/icons?i=github" alt="" />
          <span>GitHub</span>
          <MoveUpRight size={18} />
        </a>
      </header>
      <ShapeDivider />
      <svg className="divider-medallion" viewBox="-24 -24 48 48" aria-hidden="true">
  <circle r="22" fill="var(--pack-yellow)" />
  <circle r="19" fill="var(--pack-purple)" />
  <circle r="13" fill="var(--pack-blue)" />
  {[0, 60, 120, 180, 240, 300].map((angle) => (
    <ellipse
      key={angle}
      cy="-9"
      rx="3.5"
      ry="6"
      fill="var(--pack-pink)"
      transform={`rotate(${angle})`}
    />
  ))}
  <circle r="5" fill="var(--pack-yellow)" />
</svg>
    </div>
  )
}