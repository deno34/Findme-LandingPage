import Image from 'next/image';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="https://placehold.co/32x32.png" alt="Brainsay app icon" width={32} height={32} className="rounded-md" />
          <h1 className="text-2xl font-bold font-headline">Brainsay</h1>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
        </nav>
      </div>
    </header>
  );
}
