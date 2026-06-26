// TOKENS wordmark — the Figma source (node 49:885): "TOKENS" set in the heaviest
// Archivo weight, with the "O" swapped for a pixel-art gold coin (coin.svg, the
// "tokens" motif). Letters are deck ink; the coin carries the gold.
//
// The "O" is a real 3D coin (Coin3D) — an octagonal prism textured with the coin
// art and lit gold — so it shows genuine depth as it spins, which a flat SVG
// rotated in CSS could not.
import { Coin3D } from './Coin3D';

export function TokensWordmark() {
  return (
    <div className="tokens-wordmark" role="img" aria-label="TOKENS">
      <span aria-hidden="true">T</span>
      <Coin3D />
      <span aria-hidden="true">KENS</span>
    </div>
  );
}
