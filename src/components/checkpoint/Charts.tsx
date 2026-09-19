/**
 * Data graphics for the Checkpoint proposal.
 *
 * Drawn as inline SVG and CSS rather than exported as images from the deck,
 * for three reasons that all matter for a document sent to a client:
 *
 *   - A raster chart pulled from a deck arrives at one fixed size and goes
 *     soft on a retina phone. These stay sharp at any width.
 *   - The numbers come from the same object the prose reads, so a chart can
 *     never disagree with the sentence next to it.
 *   - Every series is also rendered as text in the legend, so the figures are
 *     available to a screen reader and survive images being blocked.
 */

export const ACCENT_HEX = {
  lime: '#c8ff2e',
  coral: '#ff6b5a',
  cream: '#fdfcf9',
  stone: '#cfc9b8',
} as const;

type Accent = keyof typeof ACCENT_HEX;

/* -------------------------------------------------------------------------- */
/* Age split                                                                  */
/* -------------------------------------------------------------------------- */

const RADIUS = 68;
const STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function AgeDonut({
  segments,
  centreValue,
  centreLabel,
}: {
  segments: readonly { label: string; value: number; accent: Accent }[];
  centreValue: string;
  centreLabel: string;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  // Each arc starts where the previous one ended. The running offset is folded
  // rather than accumulated in a mutable binding: the arcs must agree with one
  // another, so deriving them in one pass is what guarantees no gap or overlap.
  const arcs = segments.reduce<
    { label: string; accent: Accent; length: number; dash: string; dashOffset: number }[]
  >((acc, segment) => {
    const previous = acc[acc.length - 1];
    // A dash offset is negative because it advances clockwise from the
    // 12 o'clock start; the next arc begins one arc-length further round.
    const start = previous ? previous.dashOffset - previous.length : 0;
    const length = (segment.value / total) * CIRCUMFERENCE;
    return [
      ...acc,
      {
        label: segment.label,
        accent: segment.accent,
        length,
        dash: `${length} ${CIRCUMFERENCE - length}`,
        dashOffset: start,
      },
    ];
  }, []);

  return (
    <div className="cp-donut">
      <svg
        viewBox="0 0 180 180"
        className="cp-donut__svg"
        role="img"
        aria-label={segments.map((s) => `${s.label}, ${s.value} percent`).join('. ')}
      >
        {/* Track, so the ring reads as a whole even before the arcs are parsed. */}
        <circle cx="90" cy="90" r={RADIUS} fill="none" stroke="#2a2d38" strokeWidth={STROKE} />
        <g transform="rotate(-90 90 90)">
          {arcs.map((arc) => (
            <circle
              key={arc.label}
              cx="90"
              cy="90"
              r={RADIUS}
              fill="none"
              stroke={ACCENT_HEX[arc.accent]}
              strokeWidth={STROKE}
              strokeDasharray={arc.dash}
              strokeDashoffset={arc.dashOffset}
            />
          ))}
        </g>
        <text
          x="90"
          y="86"
          textAnchor="middle"
          className="cp-figure"
          fill="#fdfcf9"
          fontSize="30"
          fontWeight="600"
        >
          {centreValue}
        </text>
        <text x="90" y="104" textAnchor="middle" fill="#9aa0b0" fontSize="10" letterSpacing="0.08em">
          {centreLabel}
        </text>
      </svg>

      <ul className="cp-donut__legend">
        {segments.map((segment) => (
          <li key={segment.label} className="cp-donut__row">
            <span className="cp-donut__name">
              <span
                aria-hidden="true"
                className="cp-swatch"
                style={{ background: ACCENT_HEX[segment.accent] }}
              />
              {segment.label}
            </span>
            <span className="cp-figure cp-donut__value">{segment.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Regional split                                                             */
/* -------------------------------------------------------------------------- */

export function RegionBars({
  regions,
  unit,
}: {
  regions: readonly { label: string; value: number }[];
  unit: string;
}) {
  const max = Math.max(...regions.map((r) => r.value));
  return (
    <ul>
      {regions.map((region) => (
        <li key={region.label} className="cp-bars__row">
          {/* Label and figure on one baseline above the bar: on a 375px screen
              a label beside its bar squeezes the bar to nothing. */}
          <div className="cp-bars__head">
            <span className="cp-bars__label">{region.label}</span>
            <span className="cp-figure cp-bars__value">
              {region.value}
              <span className="cp-bars__unit">m</span>
            </span>
          </div>
          <div className="cp-bars__track">
            <div className="cp-bars__fill" style={{ width: `${(region.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
      <li className="cp-sr">Figures in {unit}.</li>
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Attention comparison                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Brand world dwell time against a social ad.
 *
 * The bars are deliberately not to scale with each other beyond the ratio the
 * copy states; the second row is a hairline because "seconds" against twelve
 * minutes has no honest length at this width. The values are spelled out in
 * text beside each bar, which is what the reader actually takes away.
 */
export function AttentionBars({
  rows,
}: {
  rows: readonly { label: string; value: string; weight: number }[];
}) {
  return (
    <ul>
      {rows.map((row, i) => (
        <li key={row.label} className="cp-attention__row">
          <div className="cp-bars__head">
            <span className="cp-bars__label" style={{ fontWeight: 500 }}>
              {row.label}
            </span>
            <span className="cp-body--sm cp-muted">{row.value}</span>
          </div>
          <div className="cp-bars__track cp-attention__track">
            <div
              className={`cp-bars__fill${i === 0 ? '' : ' cp-bars__fill--coral'}`}
              style={{ width: `${Math.max(row.weight, 2)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
