import { STATS } from '../../constants/pokemon';
import './StatBars.css';

const MAX_STAT = 255;

function StatBars({ stats }) {
    const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

    return (
        <ul className="stats">
            {stats.map((s, i) => (
                <li key={s.stat.name} className="stat" style={{ '--i': i }}>
                    <span className="stat__label">{STATS[s.stat.name] ?? s.stat.name}</span>
                    <span className="stat__value">{s.base_stat}</span>
                    <span className="stat__track">
                        <span className="stat__bar" style={{ '--value': Math.min(s.base_stat / MAX_STAT, 1) }} />
                    </span>
                </li>
            ))}
            <li className="stat stat--total">
                <span className="stat__label">Total</span>
                <span className="stat__value">{total}</span>
            </li>
        </ul>
    );
}

export default StatBars;
