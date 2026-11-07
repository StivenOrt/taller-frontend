import './SkeletonCard.css';

function SkeletonCard({ index = 0 }) {
    return (
        <div className="skeleton-card" style={{ '--i': index }} aria-hidden="true">
            <div className="sk sk--img" />
            <div className="sk sk--line" />
            <div className="sk sk--chip" />
            <div className="sk sk--block" />
        </div>
    );
}

export default SkeletonCard;
