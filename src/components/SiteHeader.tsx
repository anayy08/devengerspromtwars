import { Link, NavLink } from 'react-router-dom';
import BrandMark from './BrandMark';
import LanguageMenu from './LanguageMenu';
import { useLanguage } from '../context/LanguageContext';

export default function SiteHeader() {
  const { t } = useLanguage();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `site-nav-link ${isActive ? 'active' : ''}`;

  return (
    <header className="app-header">
      <Link to="/" className="brand">
        <BrandMark />
        <span className="brand-text">
          <span className="app-title">{t.appName}</span>
          <span className="app-tagline">{t.tagline}</span>
        </span>
      </Link>

      <nav className="site-nav" aria-label="Site">
        <NavLink to="/" end className={navLinkClass}>
          {t.landing.navHome}
        </NavLink>
        <NavLink to="/tools" className={navLinkClass}>
          {t.landing.navTools}
        </NavLink>
      </nav>

      <div className="header-actions">
        <LanguageMenu />
      </div>
    </header>
  );
}
