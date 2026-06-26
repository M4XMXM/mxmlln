// "TOKENS" with the "O" replaced by the 3D coin (Coin3D).
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
