import { movies } from './movies';
import { upcoming } from './upcoming';
import { family } from './family';

function getRandomMovies(source, count = 10) {
    const shuffled = [...source].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(movie => {
        const showtimeCount = Math.floor(Math.random() * 4) + 1; 
        const baseHour = 12 + Math.floor(Math.random() * 4);
        const times = Array.from({ length: showtimeCount }, (_, i) => {
            const hour = baseHour + i * 2;
            return `${String(hour).padStart(2, '0')}:30`;
        });

        return {
            title: movie.alt,
            src: movie.src,
            times
        };
    });
}

export const weeklyMovies = {
    dzis: getRandomMovies([...movies, ...family], 10),
    so: getRandomMovies([...upcoming, ...family], 10),
    nd: getRandomMovies([...movies, ...upcoming], 10),
    pn: getRandomMovies([...family], 10),
    wt: getRandomMovies([...movies], 10),
    sr: getRandomMovies([...upcoming], 10),
    cz: getRandomMovies([...movies, ...upcoming, ...family], 10),
};