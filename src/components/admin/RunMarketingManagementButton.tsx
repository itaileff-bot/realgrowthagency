import Link from 'next/link';

/**
 * Placed inside the owner-only dashboard. Opens the workspace; it does not
 * start generation. The page and API verify the owner session server-side.
 */
export function RunMarketingManagementButton({
  href = '/admin/marketing-management',
  className = 'adm-btn',
}: { href?: string; className?: string }) {
  return (
    <Link href={href} className={className} prefetch={false}>
      Run Marketing Management
    </Link>
  );
}
