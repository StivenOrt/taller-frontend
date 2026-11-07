import { typeInfo } from '../../constants/pokemon';
import './TypeBadge.css';

function TypeBadge({ type, size = 'sm' }) {
    const { label, color } = typeInfo(type);
    return (
        <span className={`type-badge type-badge--${size}`} style={{ '--type': color }}>
            {label}
        </span>
    );
}

export function TypeList({ types, size }) {
    return (
        <div className="type-list">
            {types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} size={size} />
            ))}
        </div>
    );
}

export default TypeBadge;
