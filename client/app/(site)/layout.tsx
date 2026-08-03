import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-text">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
}
