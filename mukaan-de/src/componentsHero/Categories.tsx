import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: 1,
    title: "SMARTPHONES",
    description: "Die neuesten Angebote für iPhones, Samsung Galaxy und mehr",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "LAPTOPS",
    description: "Top Deals für MacBooks, Gaming Laptops und Ultrabooks",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "GAMING",
    description: "PS5, Xbox Series X und Nintendo Switch zum besten Preis",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "AUDIO",
    description: "Kopfhörer, Soundbars und Bluetooth-Lautsprecher im Angebot",
    image: "/placeholder.svg",
  },
]

export default function Categories() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-foreground">Kategorien</h2>
      <div className="grid grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/kategorie/${category.title.toLowerCase()}`}
            className="group relative h-64 bg-muted rounded-lg overflow-hidden"
          >
            <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
              <p className="text-sm text-gray-200">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

