import { useState, useEffect, useCallback } from 'react';
import { getPokemonPage } from '../services/PokemonService';

/** Carga los Pokémon por páginas y expone el estado de carga/error. */
export function usePokemonPages(pageSize) {
    const [pokemons, setPokemons] = useState([]);
    const [total, setTotal] = useState(0);
    const [nextOffset, setNextOffset] = useState(0);
    const [status, setStatus] = useState('loading'); // loading | ready | error
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);

    // El estado sólo se actualiza en los callbacks de la promesa,
    // nunca de forma síncrona dentro del cuerpo de un efecto.
    const loadPage = useCallback((start, signal) => {
        getPokemonPage(pageSize, start, signal)
            .then(({ pokemons: page, count }) => {
                setPokemons((prev) => {
                    if (start === 0) return page;
                    const seen = new Set(prev.map((p) => p.id));
                    return [...prev, ...page.filter((p) => !seen.has(p.id))];
                });
                setTotal(count);
                setNextOffset(start + pageSize);
                setStatus('ready');
                setError(null);
            })
            .catch((err) => {
                if (signal?.aborted) return;
                setError(err.message);
                if (start === 0) setStatus('error');
            })
            .finally(() => {
                if (!signal?.aborted) setLoadingMore(false);
            });
    }, [pageSize]);

    useEffect(() => {
        const controller = new AbortController();
        loadPage(0, controller.signal);
        return () => controller.abort();
    }, [loadPage]);

    const hasMore = nextOffset < total;

    const loadMore = useCallback(() => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        loadPage(nextOffset);
    }, [loadingMore, hasMore, nextOffset, loadPage]);

    const retry = useCallback(() => {
        setStatus('loading');
        setError(null);
        loadPage(0);
    }, [loadPage]);

    return { pokemons, total, status, error, loadingMore, hasMore, loadMore, retry };
}
