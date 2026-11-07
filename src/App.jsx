import { useState, useDeferredValue, useMemo, useRef } from 'react';
import { usePokemonPages } from './hooks/usePokemonPages';
import { typeInfo } from './constants/pokemon';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import TypeFilter from './components/TypeFilter/TypeFilter';
import PokemonGrid from './components/PokemonGrid/PokemonGrid';
import StatusMessage from './components/StatusMessage/StatusMessage';
import LoadMore from './components/LoadMore/LoadMore';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import PokemonModal from './components/PokemonModal/PokemonModal';
import './App.css';

const PAGE_SIZE = 24;

function App() {
  const { pokemons, total, status, error, loadingMore, hasMore, loadMore, retry } = usePokemonPages(PAGE_SIZE);

  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const deferredSearch = useDeferredValue(search);
  const searchRef = useRef(null);

  const filtering = deferredSearch.trim() !== '' || activeType !== null;

  const availableTypes = useMemo(() => {
    const set = new Set(pokemons.flatMap((p) => p.types.map((t) => t.type.name)));
    return [...set].sort((a, b) => typeInfo(a).label.localeCompare(typeInfo(b).label));
  }, [pokemons]);

  const filteredPokemons = useMemo(() => {
    const term = deferredSearch.trim().toLowerCase().replace(/^#0*/, '');
    return pokemons.filter((p) => {
      const matchesSearch = !term || p.name.includes(term) || String(p.id) === term;
      const matchesType = !activeType || p.types.some((t) => t.type.name === activeType);
      return matchesSearch && matchesType;
    });
  }, [pokemons, deferredSearch, activeType]);

  const selectedIndex = filteredPokemons.findIndex((p) => p.id === selectedId);
  const selected = filteredPokemons[selectedIndex];
  const goTo = (i) => setSelectedId(filteredPokemons[i].id);

  const clearFilters = () => {
    setSearch('');
    setActiveType(null);
    searchRef.current?.focus();
  };

  const countText = filtering
    ? `${filteredPokemons.length} resultado${filteredPokemons.length === 1 ? '' : 's'} de ${pokemons.length} cargados`
    : `Mostrando ${pokemons.length} de ${total} Pokémon`;

  return (
    <>
      <Header />

      <div className="toolbar">
        <div className="toolbar__inner">
          <SearchBar ref={searchRef} value={search} onChange={setSearch} shortcutEnabled={!selected} />
          <TypeFilter types={availableTypes} active={activeType} onChange={setActiveType} />
        </div>
      </div>

      <main className="content">
        {status === 'loading' && <PokemonGrid loading />}

        {status === 'error' && (
          <StatusMessage variant="error" title="¡Ups! Algo salió mal" message={error} actionLabel="Reintentar" onAction={retry} />
        )}

        {status === 'ready' && (
          <>
            <p className="results-count" aria-live="polite">{countText}</p>

            {filteredPokemons.length > 0 ? (
              <PokemonGrid pokemons={filteredPokemons} loadingMore={loadingMore} onSelect={(p) => setSelectedId(p.id)} />
            ) : (
              <StatusMessage
                title="Ningún Pokémon por aquí"
                message={`No hay coincidencias entre los ${pokemons.length} cargados.${hasMore ? ' Prueba a cargar más.' : ''}`}
                actionLabel="Limpiar filtros"
                onAction={clearFilters}
              />
            )}

            <LoadMore hasMore={hasMore} loading={loadingMore} error={error} auto={!filtering} onLoadMore={loadMore} />
          </>
        )}
      </main>

      <ScrollToTop />

      {selected && (
        <PokemonModal
          pokemon={selected}
          onClose={() => setSelectedId(null)}
          onPrev={selectedIndex > 0 ? () => goTo(selectedIndex - 1) : null}
          onNext={selectedIndex < filteredPokemons.length - 1 ? () => goTo(selectedIndex + 1) : null}
        />
      )}
    </>
  );
}

export default App;
