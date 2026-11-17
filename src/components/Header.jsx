import './Header.css'
import { useState } from 'react'
import { MoveUpRight, Menu, X } from 'lucide-react'
import ShapeDivider from './ShapeDivider'
import handDiya from '../assets/hand_diya.svg'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Days', href: '#days' },
  { label: 'Playgrounds', href: '#playgrounds' },
  { label: 'Countdown', href: '#countdown' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="header-wrap">
      <header className="header">
        <a href="#home" className="logo">
          <img src="/logo.svg" alt="" className="logo-icon" />
          <span className="app-name">Deepalaya</span>
        </a>

        <nav
          id="main-nav"
          className={`nav-bar ${menuOpen ? 'open' : ''}`}
          aria-label="Main"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
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