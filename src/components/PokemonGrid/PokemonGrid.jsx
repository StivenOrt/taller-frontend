import PokemonCard from '../PokemonCard/PokemonCard';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import './PokemonGrid.css';

const skeletons = (count) =>
    Array.from({ length: count }, (_, i) => <SkeletonCard key={`sk-${i}`} index={i} />);

function PokemonGrid({ pokemons = [], loading = false, loadingMore = false, onSelect }) {
    if (loading) {
        return (
            <div className="grid" aria-busy="true" aria-label="Cargando Pokémon">
                {skeletons(12)}
            </div>
        );
    }

    return (
        <div className="grid">
            {pokemons.map((pokemon, i) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} index={i} onSelect={onSelect} />
            ))}
            {loadingMore && skeletons(4)}
        </div>
    );
}

export default PokemonGrid;
