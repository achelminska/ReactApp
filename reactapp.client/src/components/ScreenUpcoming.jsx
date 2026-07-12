import { useTranslation } from 'react-i18next';
import MovieCarousel from './MovieCarousel';

export default function ScreenUpcoming() {
    const { t } = useTranslation();
    return <MovieCarousel title={t('home.sectionUpcoming')} category="upcoming" />;
}
