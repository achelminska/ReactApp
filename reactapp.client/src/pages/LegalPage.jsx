import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/legal.scss';
import { legalContent } from '../content/legalContent';

const DOCS = [
    { type: 'terms', path: '/regulamin', icon: 'bi-journal-text' },
    { type: 'privacy', path: '/polityka-prywatnosci', icon: 'bi-shield-lock' },
    { type: 'cookies', path: '/cookies', icon: 'bi-cookie' },
];

export default function LegalPage({ type }) {
    const { i18n } = useTranslation();
    const location = useLocation();
    const lang = legalContent[i18n.resolvedLanguage] ? i18n.resolvedLanguage : 'pl';
    const doc = legalContent[lang][type];

    return (
        <div className="legal-page">
            <div className="legal-container">
                <nav className="legal-tabs">
                    {DOCS.map(d => (
                        <Link
                            key={d.type}
                            to={d.path}
                            className={location.pathname === d.path ? 'legal-tab active' : 'legal-tab'}
                        >
                            <i className={`bi ${d.icon}`}></i>
                            {legalContent[lang][d.type].title}
                        </Link>
                    ))}
                </nav>

                <header className="legal-head">
                    <h1>{doc.title}</h1>
                    <p className="legal-updated">
                        <i className="bi bi-clock-history"></i>
                        {doc.updated}
                    </p>
                </header>

                <p className="legal-intro">{doc.intro}</p>

                <div className="legal-sections">
                    {doc.sections.map(section => (
                        <section key={section.heading}>
                            <h2>{section.heading}</h2>
                            <p>{section.body}</p>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
