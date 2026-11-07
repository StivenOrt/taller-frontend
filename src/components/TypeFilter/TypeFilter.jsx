import { typeInfo } from '../../constants/pokemon';
import './TypeFilter.css';

function TypeFilter({ types, active, onChange }) {
    if (types.length === 0) return null;

    return (
        <div className="types-filter" role="group" aria-label="Filtrar por tipo">
            <button
                className={`chip ${active === null ? 'is-active' : ''}`}
                onClick={() => onChange(null)}
                aria-pressed={active === null}
            >
                Todos
            </button>
            {types.map((type) => {
                const { label, color } = typeInfo(type);
                const isActive = active === type;
                return (
                    <button
                        key={type}
                        className={`chip ${isActive ? 'is-active' : ''}`}
                        style={{ '--type': color }}
                        onClick={() => onChange(isActive ? null : type)}
                        aria-pressed={isActive}
                    >
                        <span className="types-filter__dot" />
                        {label}
                    </button>
                );
            })}
        </div>
    );
}

export default TypeFilter;
