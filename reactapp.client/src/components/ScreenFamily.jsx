import { useTranslation } from 'react-i18next';
import MovieCarousel from './MovieCarousel';

export default function ScreenFamily() {
    const { t } = useTranslation();
    return <MovieCarousel title={t('home.sectionFamily')} category="family" />;
}
