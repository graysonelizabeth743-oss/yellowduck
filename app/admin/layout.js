import AuthorizationGate from "@/components/auth/AuthorizationGate";

export const metadata = { title: "Admin" };

// Nested layouts must not render <html>/<body>; the root layout owns those.
export default function AdminLayout({ children }) {
  return <AuthorizationGate requireAdmin>{children}</AuthorizationGate>;
}
