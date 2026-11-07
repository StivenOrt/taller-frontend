import { useEffect, useRef } from 'react';
import './LoadMore.css';

/**
 * Botón "Cargar más". Con `auto` activo, también carga sola
 * cuando el usuario se acerca al final de la lista.
 */
function LoadMore({ hasMore, loading, error, auto = true, onLoadMore }) {
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node || !auto || error) return;
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && onLoadMore(),
            { rootMargin: '400px' }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [auto, error, onLoadMore]);

    return (
        <>
            {error && (
                <p className="load-more__error" role="alert">
                    {error} <button className="load-more__retry" onClick={onLoadMore}>Reintentar</button>
                </p>
            )}
            {hasMore && (
                <div ref={ref} className="load-more">
                    <button className="btn" onClick={onLoadMore} disabled={loading}>
                        {loading && <span className="load-more__spinner" aria-hidden="true" />}
                        {loading ? 'Cargando…' : 'Cargar más'}
                    </button>
                </div>
            )}
        </>
    );
}

export default LoadMore;
