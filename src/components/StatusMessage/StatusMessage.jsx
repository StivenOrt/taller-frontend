import Pokeball from '../Pokeball/Pokeball';
import './StatusMessage.css';

/** Mensaje de estado vacío o de error, con una acción opcional. */
function StatusMessage({ variant = 'empty', title, message, actionLabel, onAction }) {
    const isError = variant === 'error';

    return (
        <div className={`state state--${variant}`} role={isError ? 'alert' : undefined}>
            <Pokeball className="state__icon" />
            <h2>{title}</h2>
            {message && <p>{message}</p>}
            {actionLabel && (
                <button className={`btn ${isError ? '' : 'btn--ghost'}`} onClick={onAction}>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}

export default StatusMessage;
