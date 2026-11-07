function Pokeball({ className = '' }) {
    return (
        <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
            <path d="M50 4a46 46 0 0 1 46 42H67a17 17 0 0 0-34 0H4A46 46 0 0 1 50 4Z" fill="currentColor" />
            <path d="M50 96A46 46 0 0 1 4 54h29a17 17 0 0 0 34 0h29a46 46 0 0 1-46 42Z" fill="currentColor" opacity=".55" />
            <circle cx="50" cy="50" r="11" fill="currentColor" />
        </svg>
    );
}

export default Pokeball;
