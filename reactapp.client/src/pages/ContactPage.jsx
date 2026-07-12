import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { useTranslation, Trans } from 'react-i18next';
import Footer from '../components/Footer';
import faqData from '../content/faqData';
import '../styles/contactpage.scss';

// Ikony wg pozycji kategorii (kolejność jest wspólna dla wszystkich języków)
const CATEGORY_ICONS = ['bi-film', 'bi-ticket-perforated', 'bi-person-circle', 'bi-chat-dots'];

function FaqAccordion({ items, withBadges = false }) {
    return (
        <Accordion className="faq-accordion" alwaysOpen={false}>
            {items.map((item, index) => (
                <Accordion.Item eventKey={index.toString()} key={item.question}>
                    <Accordion.Header>
                        <span className="faq-q">
                            {item.question}
                            {withBadges && <span className="faq-badge">{item.badge}</span>}
                        </span>
                    </Accordion.Header>
                    <Accordion.Body>
                        {item.answer.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}

export default function ContactPage() {
    const { t, i18n } = useTranslation();
    const faq = faqData[i18n.resolvedLanguage] || faqData.pl;
    const categories = Object.keys(faq);

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeSub, setActiveSub] = useState(null);
    const [query, setQuery] = useState('');

    const searching = query.trim().length >= 2;

    // Spłaszczona lista wszystkich pytań w aktywnym języku — dla wyszukiwarki
    const allQuestions = useMemo(() =>
        Object.entries(faq).flatMap(([category, value]) =>
            Array.isArray(value)
                ? value.map(item => ({ ...item, badge: category }))
                : Object.entries(value.subcategories).flatMap(([sub, items]) =>
                    items.map(item => ({ ...item, badge: `${category} — ${sub}` })))
        ), [faq]);

    const searchResults = useMemo(() => {
        if (!searching) return [];
        const q = query.trim().toLowerCase();
        return allQuestions.filter(item =>
            item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q));
    }, [query, searching, allQuestions]);

    const activeCategory = categories[Math.min(activeIndex, categories.length - 1)];
    const categoryValue = faq[activeCategory];
    const subcategories = Array.isArray(categoryValue) ? null : Object.keys(categoryValue.subcategories);
    const currentSub = subcategories ? (activeSub && subcategories.includes(activeSub) ? activeSub : subcategories[0]) : null;
    const currentItems = Array.isArray(categoryValue) ? categoryValue : categoryValue.subcategories[currentSub];

    const selectCategory = (index) => {
        setActiveIndex(index);
        setActiveSub(null);
    };

    return (
        <div className="contact-page">
            <header className="help-header">
                <div className="help-header-inner">
                    <Link to="/" className="help-logo">
                        <img src="/image/logo2.png" alt="CinemaBox" />
                    </Link>
                    <nav className="help-header-actions">
                        <Link to="/" className="help-link">
                            <i className="bi bi-arrow-left"></i>
                            <span>{t('common.home')}</span>
                        </Link>
                        <Link to="/kontakt/formularz" className="help-cta">
                            <i className="bi bi-envelope"></i>
                            {t('contact.contactUs')}
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="help-main">
                <section className="help-hero">
                    <p className="help-eyebrow">{t('contact.eyebrow')}</p>
                    <h1>{t('contact.title')}</h1>
                    <p className="help-subtitle">{t('contact.subtitle')}</p>

                    <div className="help-search">
                        <i className="bi bi-search"></i>
                        <input
                            type="search"
                            placeholder={t('contact.searchPlaceholder')}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            aria-label={t('contact.knowledgeBase')}
                        />
                        {query && (
                            <button type="button" className="help-search-clear" onClick={() => setQuery('')} aria-label={t('contact.clear')}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}
                    </div>
                </section>

                {searching ? (
                    <section className="help-results">
                        <p className="help-results-count">
                            {searchResults.length > 0
                                ? (
                                    <Trans
                                        i18nKey="contact.found"
                                        count={searchResults.length}
                                        values={{ query: query.trim() }}
                                    >
                                        Znaleziono <strong>{{ count: searchResults.length }}</strong> odpowiedzi
                                    </Trans>
                                )
                                : t('contact.noResultsFor', { query: query.trim() })}
                        </p>
                        {searchResults.length > 0 ? (
                            <FaqAccordion items={searchResults} withBadges />
                        ) : (
                            <div className="help-empty">
                                <i className="bi bi-binoculars"></i>
                                <p>{t('contact.emptyHint')}</p>
                                <Link to="/kontakt/formularz" className="help-cta">{t('contact.writeToUs')}</Link>
                            </div>
                        )}
                    </section>
                ) : (
                    <>
                        <div className="help-tabs" role="tablist">
                            {categories.map((category, index) => (
                                <button
                                    key={category}
                                    type="button"
                                    role="tab"
                                    aria-selected={index === activeIndex}
                                    className={`help-tab ${index === activeIndex ? 'active' : ''}`}
                                    onClick={() => selectCategory(index)}
                                >
                                    <i className={`bi ${CATEGORY_ICONS[index] || 'bi-question-circle'}`}></i>
                                    {category}
                                </button>
                            ))}
                        </div>

                        {subcategories && (
                            <div className="help-subtabs">
                                {subcategories.map(sub => (
                                    <button
                                        key={sub}
                                        type="button"
                                        className={`help-subtab ${sub === currentSub ? 'active' : ''}`}
                                        onClick={() => setActiveSub(sub)}
                                    >
                                        {sub}
                                    </button>
                                ))}
                            </div>
                        )}

                        <FaqAccordion items={currentItems} />
                    </>
                )}

                <section className="help-contact-card">
                    <div className="help-contact-icon">
                        <i className="bi bi-headset"></i>
                    </div>
                    <div className="help-contact-text">
                        <h2>{t('contact.cantFindTitle')}</h2>
                        <p>{t('contact.cantFindText')}</p>
                    </div>
                    <Link to="/kontakt/formularz" className="help-cta large">
                        {t('contact.contactUs')}
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}
