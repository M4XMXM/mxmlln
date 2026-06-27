const CARDS = [
  { img: 'closing-steam-engine.jpg', alt: 'Engraving of a Watt steam engine' },
  { img: 'closing-horse-gin.jpg', alt: 'Engraving of a horse driving a mill gin' },
];

export function ClosingPower() {
  return (
    <div className="closing-slide rack-in">
      {CARDS.map((c) => (
        <div className="closing-card" key={c.img}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/decks/mousepower/${c.img}`} alt={c.alt} />
        </div>
      ))}
    </div>
  );
}
