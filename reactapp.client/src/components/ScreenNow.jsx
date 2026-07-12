import { useTranslation } from 'react-i18next';
import MovieCarousel from './MovieCarousel';

export default function ScreenNow() {
    const { t } = useTranslation();
    return <MovieCarousel title={t('home.sectionNow')} category="now" />;
}
