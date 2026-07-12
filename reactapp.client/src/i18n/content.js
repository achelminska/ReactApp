// Tłumaczenie treści pochodzących z bazy danych (baza jest seedowana po polsku).
// Gatunki, tagi, nazwy sal i typów biletów to zamknięte słowniki, więc tłumaczymy
// je po stronie klienta; opisy filmów mają pełne tłumaczenia w movieContent.js.

import i18n from './index';
import movieDescriptions from './movieContent';

const GENRES = {
    'Thriller': { en: 'Thriller', nl: 'Thriller' },
    'Akcja': { en: 'Action', nl: 'Actie' },
    'Dramat': { en: 'Drama', nl: 'Drama' },
    'Komedia': { en: 'Comedy', nl: 'Komedie' },
    'Animacja': { en: 'Animation', nl: 'Animatie' },
    'Horror': { en: 'Horror', nl: 'Horror' },
    'Sci-Fi': { en: 'Sci-Fi', nl: 'Sci-fi' },
    'Familijny': { en: 'Family', nl: 'Familie' },
    'Przygodowy': { en: 'Adventure', nl: 'Avontuur' },
    'Biograficzny': { en: 'Biography', nl: 'Biografie' },
    'Sensacyjny': { en: 'Crime', nl: 'Misdaad' },
    'Musical': { en: 'Musical', nl: 'Musical' },
    'Muzyczny': { en: 'Music', nl: 'Muziek' },
    'Anime': { en: 'Anime', nl: 'Anime' },
    'Fantasy': { en: 'Fantasy', nl: 'Fantasy' },
    'Dramat historyczny': { en: 'Historical drama', nl: 'Historisch drama' },
    'Komedia romantyczna': { en: 'Romantic comedy', nl: 'Romantische komedie' },
};

const TAG_WORDS = {
    'napisy': { en: 'subtitles', nl: 'ondertiteld' },
    'dubbing': { en: 'dubbed', nl: 'nagesynchroniseerd' },
    'lektor': { en: 'voice-over', nl: 'voice-over' },
};

const TICKET_TYPES = {
    'Normalny': { en: 'Regular', nl: 'Normaal' },
    'Ulgowy': { en: 'Reduced', nl: 'Korting' },
};

const lang = () => i18n.resolvedLanguage;

/** „Thriller / Akcja" -> „Thriller / Action" */
export function localizeGenre(genre) {
    const l = lang();
    if (!genre || l === 'pl') return genre;
    return genre
        .split('/')
        .map(part => {
            const key = part.trim();
            return GENRES[key]?.[l] || key;
        })
        .join(' / ');
}

/** „2D | PL (napisy)" -> „2D | PL (subtitles)" */
export function localizeTags(tags) {
    const l = lang();
    if (!tags || l === 'pl') return tags;
    return Object.entries(TAG_WORDS).reduce(
        (acc, [pl, tr]) => acc.replace(new RegExp(pl, 'gi'), tr[l]),
        tags
    );
}

/** „Sala 3" -> „Hall 3" / „Zaal 3" */
export function localizeHall(name) {
    const l = lang();
    if (!name || l === 'pl') return name;
    const match = name.match(/^Sala\s+(.+)$/i);
    if (!match) return name;
    return l === 'nl' ? `Zaal ${match[1]}` : `Hall ${match[1]}`;
}

/** „Normalny" -> „Regular" / „Normaal" */
export function localizeTicketType(name) {
    const l = lang();
    if (!name || l === 'pl') return name;
    return TICKET_TYPES[name]?.[l] || name;
}

/** Opis filmu w aktywnym języku (fallback: oryginał z bazy). */
export function localizeDescription(title, description) {
    const l = lang();
    if (l === 'pl') return description;
    return movieDescriptions[title]?.[l] || description;
}
