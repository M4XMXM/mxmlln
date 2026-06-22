// Template deck. Copy this folder to app/decks/<your-slug>/ and build graphics
// here. Static assets (images / video / svg) go in public/decks/<your-slug>/
// and are referenced as /decks/<your-slug>/file.ext.
//
// Inherits robots:{index:false,follow:false} + the back-to-home logo from the
// parent layout, so it's reachable at /decks/sample but unlisted everywhere.
export default function SampleDeck() {
  return (
    <main className="deck">
      <header className="decks-hero">
        <p className="decks-subhead">deck · sample</p>
        <h1 className="decks-title">Sample Deck</h1>
        <p className="decks-lede">
          A placeholder graphic surface. Replace this with your presentation prototype.
        </p>
      </header>
    </main>
  );
}
