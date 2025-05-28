export function scrollByRef(ref, offset) {
    const el = ref.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScrollLeft = scrollWidth - clientWidth;

   
    if (offset > 0 && scrollLeft + offset >= maxScrollLeft) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
        return;
    }

    
    if (offset < 0 && scrollLeft + offset <= 0) {
        el.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        return;
    }

    el.scrollBy({ left: offset, behavior: 'smooth' });
}