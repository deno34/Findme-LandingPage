import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function FindmeHero() {
  return (
    <div className="relative h-dvh w-full overflow-hidden flex items-center justify-center">
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold font-headline" style={{ textShadow: '0 0 15px hsl(var(--primary)), 0 0 25px hsl(var(--accent))' }}>
          Findme Messenger
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-foreground/80 font-headline">
          Smarter Conversations. Live Connections.
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
          The only AI-powered messenger with real-time location groups, voice translation, and absolute privacy.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" className="glowing-button w-full sm:w-auto">
            <Download className="mr-2 h-5 w-5" /> Download for Android
          </Button>
          <Button size="lg" variant="outline" className="glowing-button-secondary w-full sm:w-auto">
            <Download className="mr-2 h-5 w-5" /> Download for iOS
          </Button>
        </div>
      </div>
    </div>
  );
}
