import { FindmeHero } from '@/components/findme-hero';
import { VoiceTranslation } from '@/components/voice-translation';
import { SmarterConversations } from '@/components/smarter-conversations';
import { Features } from '@/components/features';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-body">
      <Header />
      <main className="flex-grow">
        <FindmeHero />
        <div className="container mx-auto px-4 py-16 sm:py-24 space-y-24">
          <Features />
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <VoiceTranslation />
            <SmarterConversations />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
