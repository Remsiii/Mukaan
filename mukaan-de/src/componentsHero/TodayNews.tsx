import Image from "next/image"

const news = [
  {
    id: 1,
    date: "03 Juni 2023",
    category: "SMARTPHONES",
    title: "Samsung Galaxy S23 Ultra jetzt 200€ günstiger bei MediaMarkt",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    date: "03 Juni 2023",
    category: "GAMING",
    title: "PS5 wieder verfügbar - Hier gibt es die besten Bundle-Angebote",
    image: "/placeholder.svg",
  },
]

export default function TodayNews() {
  return (
    <div>
      <h2 className="text-sm font-medium text-muted-foreground mb-4">Heute</h2>
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="bg-card rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <span>{item.category}</span>
                <span className="mx-2">·</span>
                <span>{item.date}</span>
              </div>
              <h3 className="font-medium text-card-foreground">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

