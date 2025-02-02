import Link from "next/link"
import { Search } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-serif italic text-foreground">
            TechDealsHub
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-foreground hover:text-muted-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/kategorie" className="text-foreground hover:text-muted-foreground">
                  Kategorie
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-foreground hover:text-muted-foreground">
                  Trending Deals
                </Link>
              </li>
              <li>
                <Link href="/neu" className="text-foreground hover:text-muted-foreground">
                  Neue Angebote
                </Link>
              </li>
              <li>
                <Link href="/bestenliste" className="text-foreground hover:text-muted-foreground">
                  Bestenliste
                </Link>
              </li>
              <li>
                <Link href="/tech-artikel" className="text-foreground hover:text-muted-foreground">
                  Tech Artikel
                </Link>
              </li>
            </ul>
          </nav>
          <button className="bg-secondary text-secondary-foreground p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

