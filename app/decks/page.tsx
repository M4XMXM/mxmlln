import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { SiteLogo } from '../components/SiteLogo';

interface Deck {
  slug: string;
  title: string;
  thumbnail: string | null;
}

// Convention: drop a thumbnail.{svg,png,jpg,webp} in public/decks/<slug>/.
const THUMB_EXTS = ['svg', 'png', 'jpg', 'jpeg', 'webp', 'gif'];

function findThumbnail(slug: string): string | null {
  const dir = join(process.cwd(), 'public', 'decks', slug);
  for (const ext of THUMB_EXTS) {
    if (existsSync(join(dir, `thumbnail.${ext}`))) return `/decks/${slug}/thumbnail.${ext}`;
  }
  return null;
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
        thumbnail: findThumbnail(slug),
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
      <SiteLogo
        href="/"
        ariaLabel="MXMLLN"
        className="decks-logo"
        lottieClassName="decks-logo-lottie"
      />
      <div className="decks-index-title-block">
        <div className="decks-index-title-script">Maximillian Piras</div>
        <h1>Decks</h1>
      </div>

      {decks.length === 0 ? (
        <p className="decks-empty">No decks yet. Add one at app/decks/&lt;slug&gt;/page.tsx.</p>
      ) : (
        <div className="decks-list">
          {decks.map((deck) => (
            <Link
              key={deck.slug}
              href={`/decks/${deck.slug}`}
              className="decks-preview"
              aria-label={deck.title}
            >
              <div className="decks-preview-thumb">
                {deck.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={deck.thumbnail} alt={deck.title} />
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
