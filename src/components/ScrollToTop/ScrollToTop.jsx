import { useEffect, useState } from 'react';
import './ScrollToTop.css';

function ScrollToTop({ threshold = 700 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > threshold);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return (
        <button
            className={`to-top ${visible ? 'is-visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            tabIndex={visible ? 0 : -1}
        >
            ↑
        </button>
    );
}

export default ScrollToTop;
