import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Paginacja po stronie klienta dla list w panelu admina
export function usePagination(items, pageSize = 10) {
    const [page, setPage] = useState(1);
    const pages = Math.max(1, Math.ceil(items.length / pageSize));
    const safePage = Math.min(page, pages);
    const paged = items.slice((safePage - 1) * pageSize, safePage * pageSize);
    return { page: safePage, setPage, paged, total: items.length, pageSize };
}

function pageList(pages, current) {
    const wanted = new Set([1, pages, current - 1, current, current + 1]);
    const sorted = [...wanted].filter(p => p >= 1 && p <= pages).sort((a, b) => a - b);
    const out = [];
    let prev = 0;
    for (const p of sorted) {
        if (p - prev > 1) out.push('ellipsis-' + p);
        out.push(p);
        prev = p;
    }
    return out;
}

export default function AdminPagination({ page, total, pageSize, onChange }) {
    const { t } = useTranslation();
    const pages = Math.ceil(total / pageSize);
    if (pages <= 1) return null;

    const from = (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    return (
        <div className="admin-pagination">
            <span className="admin-pagination-info">{from}–{to} {t('admin.pagination.of')} {total}</span>
            <div className="admin-pagination-pages">
                <button
                    type="button"
                    aria-label={t('admin.pagination.prev')}
                    disabled={page === 1}
                    onClick={() => onChange(page - 1)}
                >
                    <i className="bi bi-chevron-left"></i>
                </button>
                {pageList(pages, page).map(p =>
                    typeof p === 'number' ? (
                        <button
                            key={p}
                            type="button"
                            className={p === page ? 'active' : ''}
                            aria-current={p === page ? 'page' : undefined}
                            onClick={() => onChange(p)}
                        >
                            {p}
                        </button>
                    ) : (
                        <span key={p} className="admin-pagination-dots">…</span>
                    )
                )}
                <button
                    type="button"
                    aria-label={t('admin.pagination.next')}
                    disabled={page === pages}
                    onClick={() => onChange(page + 1)}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}
