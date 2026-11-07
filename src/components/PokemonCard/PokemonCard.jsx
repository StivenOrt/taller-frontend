import { useState } from 'react';
import { typeInfo, formatId, getArtwork, formatName } from '../../constants/pokemon';
import { TypeList } from '../TypeBadge/TypeBadge';
import Pokeball from '../Pokeball/Pokeball';
import './PokemonCard.css';

function PokemonCard({ pokemon, index = 0, onSelect }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const { color } = typeInfo(pokemon.types[0]?.type.name);

    return (
        <button
            type="button"
            className="card"
            style={{ '--type': color, '--i': Math.min(index, 12) }}
            onClick={() => onSelect(pokemon)}
            aria-label={`Ver detalles de ${pokemon.name}`}
        >
            <Pokeball className="card__ball" />
            <span className="card__id">{formatId(pokemon.id)}</span>

            <div className="card__media">
                <img
                    src={getArtwork(pokemon)}
                    alt=""
                    loading="lazy"
                    width="140"
                    height="140"
                    className={`card__img ${imgLoaded ? 'is-loaded' : ''}`}
                    onLoad={() => setImgLoaded(true)}
                />
            </div>

            <h3 className="card__name">{formatName(pokemon.name)}</h3>
            <TypeList types={pokemon.types} />

            <dl className="card__stats">
                <div>
                    <dt>PS</dt>
                    <dd>{pokemon.stats[0].base_stat}</dd>
                </div>
                <div>
                    <dt>Ataque</dt>
                    <dd>{pokemon.stats[1].base_stat}</dd>
                </div>
            </dl>
        </button>
    );
}

export default PokemonCard;
