import ClientApp from "@/components/ClientApp";

// The public site: one persistent client shell for every path (see (site)/[[...slug]]/page.tsx).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientApp />
      {children}
    </>
  );
}
