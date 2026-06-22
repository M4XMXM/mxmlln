/**
 * Card specimen for the /system previews. A white surface with the
 * near-monochrome token ladder from app/globals.css. Its resting elevation
 * combines the two card shadows documented in the Elevation section — the
 * wide "Folio card" lift (with its inset hairline) layered over the tighter
 * "Card hover" shadow — so the resting card already reads as raised. Values
 * live in system.css (.ui-card).
 */
export function CardDemo() {
  return (
    <div className="ui-card">
      <div className="ui-card-eyebrow">Case study</div>
      <h4 className="ui-card-title">Form follows functionality</h4>
      <p className="ui-card-body">
        A surface for grouping related content — work samples, metadata, and
        actions — lifted off the page with soft, layered elevation.
      </p>
    </div>
  );
}
