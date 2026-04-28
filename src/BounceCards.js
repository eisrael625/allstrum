import './BounceCards.css';

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
}) {
  return (
    <div
      className={`bounceCardsContainer ${className}`.trim()}
      style={{ maxWidth: containerWidth, minHeight: containerHeight }}
    >
      {images.map((src, idx) => (
        <div key={src || idx} className="bounce-card">
          <img
            className="bounce-card__image"
            src={src}
            alt={`AllStrum gallery ${idx + 1}`}
            width="340"
            height="340"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
