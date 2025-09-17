export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nathan Healea | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
