import { BrainsayHero } from '@/components/findme-hero';
import { Features } from '@/components/features';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AccountManagement } from '@/components/account-management';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh text-foreground font-body">
      <Header />
      <main className="flex-grow">
        <BrainsayHero />
        <div className="container mx-auto px-4 py-16 sm:py-24 space-y-24">
          <Features />
          <AccountManagement />
        </div>
      </main>
      <Footer />
    </div>
  );
}
