export const metadata = {
  title: "Admin — Rodolfo Portfolio",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-bg-primary text-text-primary">{children}</div>;
}
