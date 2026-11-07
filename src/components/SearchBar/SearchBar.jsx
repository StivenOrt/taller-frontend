import { useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange, shortcutEnabled = true, ref }) {
    // Atajo "/" para enfocar el buscador
    useEffect(() => {
        if (!shortcutEnabled) return;
        const onKey = (e) => {
            if (e.key === '/' && document.activeElement !== ref.current) {
                e.preventDefault();
                ref.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [shortcutEnabled, ref]);

    return (
        <label className="search">
            <span className="search__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                </svg>
            </span>
            <input
                ref={ref}
                type="search"
                className="search__input"
                placeholder="Buscar por nombre o número…"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label="Buscar Pokémon"
            />
            {value ? (
                <button className="search__clear" onClick={() => onChange('')} aria-label="Limpiar búsqueda">✕</button>
            ) : (
                <kbd className="search__kbd">/</kbd>
            )}
        </label>
    );
}

export default SearchBar;
