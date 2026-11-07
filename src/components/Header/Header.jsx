import Pokeball from '../Pokeball/Pokeball';
import './Header.css';

function Header() {
    return (
        <header className="hero">
            <div className="hero__brand">
                <Pokeball className="hero__logo" />
                <div>
                    <h1 className="hero__title">Pokédex</h1>
                    <p className="hero__subtitle">Explora, filtra y descubre a cada Pokémon</p>
                </div>
            </div>
        </header>
    );
}

export default Header;
