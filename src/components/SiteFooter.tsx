import { useLanguage } from '../context/LanguageContext';

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="app-footer">
      <span aria-hidden="true" className="footer-flag">
        <span className="flag-stripe saffron" />
        <span className="flag-stripe white" />
        <span className="flag-stripe green" />
      </span>
      {t.footerNote}
    </footer>
  );
}
