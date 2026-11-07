import axios from 'axios';

const BASE_URL = import.meta.env.VITE_POKEAPI_URL;

export const getPokemonList = async (limit = 20, offset = 0, signal) => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, { signal });
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener la lista de datos de Pokémon: ' + error.message, { cause: error });
    }
}

export const getPokemonDetails = async (pokemonName, signal) => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`, { signal });
        return response.data;
    } catch (error) {
        throw new Error(`No se pudo obtener los detalles del Pokémon "${pokemonName}": ${error.message}`, { cause: error });
    }
}

/**
 * Obtiene una página de Pokémon con sus detalles completos.
 * Si el detalle de alguno falla, se omite en lugar de romper toda la página.
 */
export const getPokemonPage = async (limit, offset, signal) => {
    const { results, count } = await getPokemonList(limit, offset, signal);
    const settled = await Promise.allSettled(
        results.map((p) => getPokemonDetails(p.name, signal))
    );
    const pokemons = settled
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value);

    if (pokemons.length === 0 && results.length > 0) {
        throw new Error('No se pudieron cargar los detalles de los Pokémon.');
    }
    return { pokemons, count };
}
