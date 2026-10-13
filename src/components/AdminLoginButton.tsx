/**
 * Public footer link to the owner login. It grants nothing by itself:
 * the login page, admin pages and APIs enforce access on the server.
 */
export function AdminLoginButton({ href = '/admin/login', className }: { href?: string; className?: string }) {
  return (
    <a href={href} className={className} rel="nofollow">
      Owner Admin
    </a>
  );
}
