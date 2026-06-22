import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';

interface Deck {
  slug: string;
  title: string;
}

// Auto-discovers any subfolder of app/decks/ that has a page.tsx (its own route).
// Add a deck = drop in app/decks/<slug>/page.tsx + assets in public/decks/<slug>/.
function getDecks(): Deck[] {
  const decksDir = join(process.cwd(), 'app', 'decks');
  try {
    return readdirSync(decksDir)
      .filter((entry) => {
        const full = join(decksDir, entry);
        return statSync(full).isDirectory() && existsSync(join(full, 'page.tsx'));
      })
      .map((slug) => ({
        slug,
        title: slug.replace(/-/g, ' '),
      }))
      .sort((a, b) => a.slug.localeCompare(b.slug));
  } catch {
    return [];
  }
}

export default function DecksIndex() {
  const decks = getDecks();

  return (
    <main className="decks-index">
      <header className="decks-hero">
        <p className="decks-subhead">unlisted · work in progress</p>
        <h1 className="decks-title">Decks</h1>
        <p className="decks-lede">
          Prototype graphics for presentations. Live by URL, not yet surfaced anywhere.
        </p>
      </header>

      {decks.length === 0 ? (
        <p className="decks-empty">No decks yet. Add one at app/decks/&lt;slug&gt;/page.tsx.</p>
      ) : (
        <ul className="decks-list">
          {decks.map((deck) => (
            <li key={deck.slug}>
              <Link href={`/decks/${deck.slug}`} className="decks-link">
                {deck.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
