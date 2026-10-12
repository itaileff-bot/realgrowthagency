import type { ReactNode } from 'react';

/**
 * The one data table for proposal pages.
 *
 * The standing Checkpoint proposal has no tables, so there was nothing to
 * reuse. Tables are the right element for the fee schedule, the payback grid
 * and the milestone plan: they are read across and down, and a screen reader
 * announces the column header for every cell.
 *
 * The wrapper is the mobile fix. A seven-column table cannot fit 375px, and
 * squeezing it makes every cell unreadable, so the table keeps a minimum width
 * and the wrapper scrolls sideways. It is focusable (tabIndex 0) with a label
 * so a keyboard user can scroll it too; without that, the overflow region is
 * unreachable by keyboard.
 */
export default function DataTable({
  caption,
  columns,
  rows,
  emphasisRow,
  minWidth = 640,
}: {
  /** Announced by assistive tech and shown as the region label. Not drawn. */
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  /** Index of a row to set apart, such as a total. */
  emphasisRow?: number;
  minWidth?: number;
}) {
  return (
    <div className="cp-rhp-tablewrap" role="region" aria-label={caption} tabIndex={0}>
      <table className="cp-rhp-table" style={{ minWidth }}>
        <caption className="cp-sr">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex === emphasisRow ? 'cp-rhp-table__emphasis' : undefined}
            >
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th key={cellIndex} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={cellIndex}>{cell}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
