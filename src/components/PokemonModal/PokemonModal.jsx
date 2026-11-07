import { useEffect, useRef, useState } from 'react';
import { typeInfo, formatId, getArtwork, formatName } from '../../constants/pokemon';
import { TypeList } from '../TypeBadge/TypeBadge';
import Pokeball from '../Pokeball/Pokeball';
import StatBars from '../StatBars/StatBars';
import './PokemonModal.css';

function PokemonModal({ pokemon, onClose, onPrev, onNext }) {
    const [closing, setClosing] = useState(false);
    const [shiny, setShiny] = useState(false);
    const closeBtnRef = useRef(null);
    const audioRef = useRef(null);

    const { color } = typeInfo(pokemon.types[0]?.type.name);
    const cry = pokemon.cries?.latest ?? pokemon.cries?.legacy;
    const requestClose = () => setClosing(true);

    // Enfoca el botón de cerrar y bloquea el scroll del fondo
    useEffect(() => {
        closeBtnRef.current?.focus();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
            audioRef.current?.pause();
        };
    }, []);

    // Teclado: Esc cierra, flechas navegan
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setClosing(true);
            if (e.key === 'ArrowLeft' && onPrev) onPrev();
            if (e.key === 'ArrowRight' && onNext) onNext();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onPrev, onNext]);

    const playCry = () => {
        audioRef.current?.pause();
        audioRef.current = new Audio(cry);
        audioRef.current.volume = 0.35;
        audioRef.current.play().catch(() => {});
    };

    return (
        <div
            className={`modal ${closing ? 'is-closing' : ''}`}
            onClick={requestClose}
            onAnimationEnd={(e) => closing && e.target === e.currentTarget && onClose()}
        >
            <div
                className="modal__panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                style={{ '--type': color }}
                onClick={(e) => e.stopPropagation()}
            >
                <header className="modal__hero">
                    <Pokeball className="modal__ball" />
                    <div className="modal__top">
                        <span className="modal__id">{formatId(pokemon.id)}</span>
                        <button ref={closeBtnRef} className="modal__close" onClick={requestClose} aria-label="Cerrar">✕</button>
                    </div>

                    {onPrev && <button className="modal__nav modal__nav--prev" onClick={onPrev} aria-label="Anterior">‹</button>}
                    {onNext && <button className="modal__nav modal__nav--next" onClick={onNext} aria-label="Siguiente">›</button>}

                    <img
                        key={`${pokemon.id}-${shiny}`}
                        className="modal__img"
                        src={getArtwork(pokemon, shiny) ?? getArtwork(pokemon)}
                        alt={pokemon.name}
                        width="220"
                        height="220"
                    />
                </header>

                <div className="modal__body" key={pokemon.id}>
                    <h2 id="modal-title" className="modal__name">{formatName(pokemon.name)}</h2>
                    <TypeList types={pokemon.types} size="md" />

                    <div className="modal__actions">
                        <button className={`chip ${shiny ? 'is-active' : ''}`} onClick={() => setShiny((s) => !s)} aria-pressed={shiny}>
                            ✨ Variocolor
                        </button>
                        {cry && <button className="chip" onClick={playCry}>🔊 Grito</button>}
                    </div>

                    <dl className="modal__facts">
                        <div>
                            <dt>Altura</dt>
                            <dd>{(pokemon.height / 10).toFixed(1)} m</dd>
                        </div>
                        <div>
                            <dt>Peso</dt>
                            <dd>{(pokemon.weight / 10).toFixed(1)} kg</dd>
                        </div>
                        <div>
                            <dt>Habilidades</dt>
                            <dd className="capitalize">{pokemon.abilities.map((a) => formatName(a.ability.name)).join(', ')}</dd>
                        </div>
                    </dl>

                    <h3 className="modal__subtitle">Estadísticas base</h3>
                    <StatBars stats={pokemon.stats} />
                </div>
            </div>
        </div>
    );
}

export default PokemonModal;
