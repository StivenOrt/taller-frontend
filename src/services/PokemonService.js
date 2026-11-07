import axios from 'axios';

const BASE_URL = import.meta.env.VITE_POKEAPI_URL;

export const getPokemonList = async (limit = 20, offset = 0) => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        return response.data.results;
    } catch (error) {
        throw new Error('Error al obtener la lista de datos de Pokémon: ' + error.message);
    }
}

export const getPokemonDetails = async (pokemonName) => {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        throw new Error(`No se pudo obtener los detalles del Pokémon "${pokemonName}": ${error.message}`);
    }
}