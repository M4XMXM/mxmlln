// Closing slide: the entropy thesis stated over Shannon's 1948 paper
// "A Mathematical Theory of Communication", presented as a document tilted back
// in 3D. The paper art (with its page stack) is a baked asset; the slide adds the
// perspective tilt + shadow.
export function EntropyPaper() {
  return (
    <div className="ent-stage rack-in">
      <h1 className="ent-headline">
        In information theory, entropy measures the uncertainty in a probability
        distribution.
      </h1>
      <div className="ent-paper-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element -- offline deck: no image optimisation */}
        <img
          className="ent-paper"
          src="/decks/mousepower/info-theory.png"
          alt="A Mathematical Theory of Communication, by C. E. Shannon"
        />
      </div>
    </div>
  );
}
