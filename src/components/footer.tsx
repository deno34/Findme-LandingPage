export function Footer() {
    return (
        <footer className="border-t border-border/20 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
                <div className="space-y-4">
                    <p>&copy; {new Date().getFullYear()} Brainsay, a subsidiary of Trapslash Inc. All rights reserved.</p>
                    <div className="text-sm max-w-2xl mx-auto">
                        <p className="font-semibold text-foreground/80 mb-1">From the creators of Brainsay:</p>
                        <p>
                            <a href="https://NeridaAi.com" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">
                                Nerida AI
                            </a>
                            &nbsp;&mdash;&nbsp;an agentic AI platform to help businesses automate workflows, enhance decision-making, and increase operational efficiency.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
