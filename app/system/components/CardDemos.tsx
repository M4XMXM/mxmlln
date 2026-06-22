/**
 * Card specimen for the /system previews — an empty white surface showing the
 * container itself: the 16px radius, the layered "Folio card" + "Card hover"
 * elevation (with inset hairline) at rest, and the lift on hover. Holds its
 * shape with a fixed 3:2 aspect ratio rather than content. Values live in
 * system.css (.ui-card).
 */
export function CardDemo() {
  return <div className="ui-card" />;
}
