import type { ReactNode } from 'react';
import { SOURCES, type SourceKey } from '@/lib/checkpoint-proposal';

/**
 * Layout primitives for the Checkpoint proposal.
 *
 * WHY THESE EXIST
 * The source deck's most visible problem was drift: section labels sat at
 * different heights slide to slide, stat rows were ragged because the figures
 * were set in proportional numerals, and cards in the same row ended at
 * different depths because each was sized to its own copy.
 *
 * Fixing that on a web page is not a matter of nudging boxes. It is a matter
 * of there being exactly one component that draws a section shell, exactly one
 * that draws a section header, and exactly one that draws a figure, so no two
 * instances can disagree. The measurements themselves live as custom
 * properties in src/styles/checkpoint.css, declared once.
 */

type Accent = 'lime' | 'coral' | 'cream' | 'stone';

const ACCENT_CLASS: Record<Accent, string> = {
  lime: 'cp-lime',
  coral: 'cp-coral',
  cream: 'cp-cream',
  stone: 'cp-stone',
};

/* -------------------------------------------------------------------------- */

/** The one section shell. Every band on the page goes through it. */
export function Section({
  id,
  children,
  tone = 'base',
  tight = false,
  wide = false,
}: {
  id?: string;
  children: ReactNode;
  /** `raised` lifts the band off the ink ground to separate adjacent sections. */
  tone?: 'base' | 'raised';
  tight?: boolean;
  /**
   * Drops the 1152px measure and lets the band use the whole page, for a
   * section carrying enough figures that the centre column would crush them.
   * Prose inside still gets a measure of its own; only the data spreads.
   */
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className={`cp-section${tone === 'raised' ? ' cp-section--raised' : ''}${
        tight ? ' cp-section--tight' : ''
      }`}
    >
      <div className={`cp-container${wide ? ' cp-container--wide' : ''}`}>{children}</div>
    </section>
  );
}

/** Inner container for content that needs the page gutter outside a Section. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`cp-container ${className}`.trim()}>{children}</div>;
}

/**
 * The number-and-label eyebrow that replaces the deck's corner slide numbers,
 * which is what lets a reader keep their place in a single long scroll.
 */
export function Kicker({ number, label }: { number: string; label: string }) {
  return (
    <div className="cp-kicker">
      <span className="cp-eyebrow cp-eyebrow--accent">{number}</span>
      <span aria-hidden="true" className="cp-kicker__rule" />
      <span className="cp-eyebrow">{label}</span>
    </div>
  );
}

/**
 * The one section header. Because the eyebrow, rule, title and lead are drawn
 * here and nowhere else, every section header shares one baseline grid.
 */
export function SectionHeader({
  number,
  label,
  title,
  lead,
  tight = false,
}: {
  number: string;
  label: string;
  title: string;
  lead?: string;
  tight?: boolean;
}) {
  return (
    <header className={`cp-section__head${tight ? ' cp-section__head--tight' : ''}`}>
      <Kicker number={number} label={label} />
      <h2 className="cp-display cp-h2">{title}</h2>
      {lead && <p className="cp-lead">{lead}</p>}
    </header>
  );
}

/**
 * The one big-figure treatment.
 *
 * `.cp-figure` sets tabular lining numerals, which is the fix for the deck's
 * ragged stat rows: proportional figures give "123M" and "27M" different
 * optical left edges, and a row of them never lines up.
 */
export function Figure({
  value,
  unit,
  accent = 'cream',
  size = 'md',
}: {
  value: string;
  unit?: string;
  accent?: Accent;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <p className={`cp-figure cp-figure--${size} ${ACCENT_CLASS[accent]}`}>
      {value}
      {unit && <span className="cp-figure__unit">{unit}</span>}
    </p>
  );
}

/** A stat card. Stretches to its row so every card in a row ends level. */
export function StatCard({
  value,
  label,
  note,
  accent = 'cream',
}: {
  value: string;
  label: string;
  note?: string;
  accent?: Accent;
}) {
  return (
    <div className="cp-card">
      <Figure value={value} accent={accent} size="sm" />
      <p className="cp-card__label">{label}</p>
      {note && (
        <div className="cp-card__foot">
          <p className="cp-card__note">{note}</p>
        </div>
      )}
    </div>
  );
}

/** Small uppercase label used above a sub-block inside a section. */
export function Eyebrow({
  children,
  tone = 'muted',
}: {
  children: ReactNode;
  tone?: 'muted' | 'accent';
}) {
  return (
    <p className={`cp-eyebrow${tone === 'accent' ? ' cp-eyebrow--accent' : ''}`}>{children}</p>
  );
}

/** Pill tag, used for case-study categories. */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="cp-tag">{children}</span>;
}

/**
 * Inline source attribution.
 *
 * Every figure on the page is traceable. Where the underlying document is
 * named and checkable the attribution states it; where it is not, the claim is
 * attributed to its class of source instead of borrowing a citation it does
 * not have. See the sourcing policy in src/lib/checkpoint-proposal.ts.
 */
export function SourceNote({ source }: { source: SourceKey }) {
  const entry = SOURCES[source];
  return (
    <p className="cp-source">
      <span className="cp-eyebrow" style={{ display: 'inline' }}>
        Source
      </span>
      <span aria-hidden="true" className="cp-source__sep">
        /
      </span>
      {entry.short}
      {!entry.verified && (
        <>
          <span aria-hidden="true" className="cp-source__sep">
            /
          </span>
          <em>reference on request</em>
        </>
      )}
    </p>
  );
}
