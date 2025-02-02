import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const deals = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    price: "999€",
    store: "MediaMarkt",
    image: "/placeholder.svg",
    description: "Das beste iPhone aller Zeiten mit Dynamic Island",
  },
  {
    id: 2,
    title: "Sony WH-1000XM5",
    price: "299€",
    store: "Amazon",
    image: "/placeholder.svg",
    description: "Premium Noise-Cancelling Kopfhörer",
  },
  {
    id: 3,
    title: "Samsung Neo QLED TV",
    price: "1.499€",
    store: "Saturn",
    image: "/placeholder.svg",
    description: "Brillante Bildqualität mit Mini-LED Technologie",
  },
  {
    id: 4,
    title: "MacBook Air M2",
    price: "1.299€",
    store: "Gravis",
    image: "/placeholder.svg",
    description: "Ultraleicht und leistungsstark",
  },
]

export default function BestDeals() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Top Angebote</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="bg-card text-card-foreground">
              <div className="relative h-48">
                <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{deal.description}</p>
                <p className="text-2xl font-bold mb-2">{deal.price}</p>
                <p className="text-sm text-muted-foreground mb-4">Bester Preis bei {deal.store}</p>
                <Button className="w-full" asChild>
                  <Link href={`/produkt/${deal.title.toLowerCase().replace(/\s+/g, "-")}`}>Zum Angebot</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

