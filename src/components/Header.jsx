import './Header.css'
import { useState } from 'react'
import { MoveUpRight, Menu, X } from 'lucide-react'
import ShapeDivider from './ShapeDivider'
import handDiya from '../assets/hand_diya.svg'

const links = [
  { label: 'Home', screen: 'home', anchor: 'home' },
  { label: 'Days', screen: 'fivedays', anchor: null },
  { label: 'Playgrounds', screen: 'home', anchor: 'playgrounds' },
  { label: 'Countdown', screen: 'countdown', anchor: null },
]
export default function Header({ setOnSelect }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function go(screen, anchor) {
    setOnSelect(screen)
    setMenuOpen(false)
    setTimeout(() => {
      const target = anchor && document.getElementById(anchor)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  return (
    <div className="header-wrap">
      <header className="header">
        <button type="button" className="logo" onClick={() => go('home', 'home')}>
          <img src="/logo.svg" alt="" className="logo-icon" />
          <span className="app-name">Deepalaya</span>
        </button>

        <nav
          id="main-nav"
          className={`nav-bar ${menuOpen ? 'open' : ''}`}
          aria-label="Main"
        >
          {links.map((link) => (
            <button
              key={link.label}
              type="button"
              className="nav-link"
              onClick={() => go(link.screen, link.anchor)}
            >
              {link.label}
            </button>
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

        <button
          type="button"
          className="menu-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      <ShapeDivider />
      <img src={handDiya} alt="" className="divider-diya" />
    </div>
  )
}