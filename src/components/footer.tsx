export function Footer() {
    return (
        <footer className="border-t border-border/20 bg-background">
            <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Findme Messenger. All rights reserved.</p>
            </div>
        </footer>
    )
}
