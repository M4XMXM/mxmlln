// Statement slide — the thesis. Headline left, a handwritten aside with a
// hand-drawn arrow pointing across to a photo (me at a whiteboard, the
// Charlie-Day conspiracy meme on the laptop) on the right. From Figma node 96:27;
// adapted to the deck's type tokens. Assets in public/decks/mousepower/.
export function MeasurementProblem() {
  return (
    <div className="measure-slide rack-in">
      <div className="measure-text">
        <h2 className="slide-section-title measure-headline">
          Agents have a measurement problem.
        </h2>
        <div className="measure-aside">
          <p className="slide-footnote measure-caption">me trying to measure them</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="measure-arrow" src="/decks/mousepower/measure-arrow.svg" alt="" aria-hidden />
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="measure-photo"
        src="/decks/mousepower/measurement-photo.jpg"
        alt="Maximillian at a whiteboard mapping out agent measurement, the Charlie-Day conspiracy-board meme on the laptop"
      />
    </div>
  );
}
