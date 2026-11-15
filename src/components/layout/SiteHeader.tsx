import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { kk } from '@/i18n/kk'
import { Logo } from './Logo'
import { NAV_ITEMS } from './navItems'

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link to="/" className="brand" onClick={close}>
          <Logo />
          <span className="brand__name">{kk.siteName}</span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="main-nav"
          aria-label={isOpen ? kk.nav.closeMenu : kk.nav.menu}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span aria-hidden="true">{isOpen ? '✕' : '☰'}</span>
        </button>
        <nav id="main-nav" className={`main-nav ${isOpen ? 'is-open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className="main-nav__link" onClick={close}>
              <span className="main-nav__emoji" aria-hidden="true">{item.emoji} </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
