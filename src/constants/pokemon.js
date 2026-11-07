export const TYPES = {
    normal: { label: 'Normal', color: '#A8A77A' },
    fire: { label: 'Fuego', color: '#EE8130' },
    water: { label: 'Agua', color: '#6390F0' },
    electric: { label: 'Eléctrico', color: '#E5B800' },
    grass: { label: 'Planta', color: '#5FB043' },
    ice: { label: 'Hielo', color: '#5CC4C0' },
    fighting: { label: 'Lucha', color: '#C22E28' },
    poison: { label: 'Veneno', color: '#A33EA1' },
    ground: { label: 'Tierra', color: '#D0A548' },
    flying: { label: 'Volador', color: '#8F75E8' },
    psychic: { label: 'Psíquico', color: '#F95587' },
    bug: { label: 'Bicho', color: '#97A81A' },
    rock: { label: 'Roca', color: '#B6A136' },
    ghost: { label: 'Fantasma', color: '#735797' },
    dragon: { label: 'Dragón', color: '#6F35FC' },
    dark: { label: 'Siniestro', color: '#705746' },
    steel: { label: 'Acero', color: '#8E8EB0' },
    fairy: { label: 'Hada', color: '#D685AD' },
};

export const STATS = {
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'At. Esp.',
    'special-defense': 'Def. Esp.',
    speed: 'Velocidad',
};

export const typeInfo = (name) => TYPES[name] ?? { label: name, color: '#94a3b8' };

export const formatId = (id) => `#${String(id).padStart(4, '0')}`;

export const getArtwork = (pokemon, shiny = false) => {
    const art = pokemon.sprites?.other?.['official-artwork'];
    if (shiny) return art?.front_shiny ?? pokemon.sprites?.front_shiny;
    return art?.front_default ?? pokemon.sprites?.front_default;
};

export const formatName = (name) => name.replace(/-/g, ' ');
