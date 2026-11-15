import { Link } from 'react-router-dom'
import { OrnamentBand } from '@/components/ui/Ornament'
import { AUTHOR } from '@/data/site'
import { kk } from '@/i18n/kk'
import { NAV_ITEMS } from './navItems'

const YEAR = new Date().getFullYear()

export const SiteFooter = () => (
  <footer className="site-footer">
    <OrnamentBand />
    <div className="container site-footer__inner">
      <div>
        <p className="site-footer__brand">{kk.siteName}</p>
        <p>{kk.footer.madeFor}</p>
        <p className="site-footer__author">
          {kk.footer.author}: <b>{AUTHOR.name}</b>
          <br />
          {AUTHOR.role}, {AUTHOR.school}
        </p>
      </div>
      <nav className="site-footer__nav">
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
    <p className="container site-footer__note">
      🔒 {kk.footer.privacy} © {YEAR}
    </p>
  </footer>
)
