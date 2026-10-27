import AuthorizationGate from "@/components/auth/AuthorizationGate";

export const metadata = { title: "Dashboard" };

// Nested layouts must not render <html>/<body>; the root layout owns those.
export default function DashboardLayout({ children }) {
  return <AuthorizationGate>{children}</AuthorizationGate>;
}
