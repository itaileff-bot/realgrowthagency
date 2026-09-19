import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { CheckpointFooter, CheckpointHeader } from '@/components/checkpoint/Chrome';
import '@/styles/checkpoint.css';

/**
 * Client proposal section.
 *
 * Proposals are pitch documents prepared for a named recipient, so they carry
 * the client's identity end to end rather than the Real Growth Agency one.
 * This layout supplies its own chrome; the root layout renders a bare <body>
 * and each page brings its own <nav>, so nothing needs suppressing.
 *
 * The stylesheet is imported here rather than added to globals.css. It is one
 * section's identity, not site furniture, and every rule inside it is scoped
 * under `.cp-root` so the two cannot leak into one another.
 *
 * TYPEFACES
 * Bricolage Grotesque (display) and DM Sans (body) are the two faces the
 * source deck was set in. Both are variable Google faces, so no weight is
 * declared: next/font self-hosts the full weight axis from our own origin,
 * which means no request leaves the visitor's browser for Google and no
 * layout shift as the fonts land.
 */
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

export default function ProposalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${bricolage.variable} ${dmSans.variable} cp-root`}>
      <a href="#top" className="cp-skip">
        Skip to content
      </a>
      <CheckpointHeader />
      {children}
      <CheckpointFooter />
    </div>
  );
}
