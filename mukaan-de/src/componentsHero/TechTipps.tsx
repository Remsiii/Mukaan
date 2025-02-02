import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const tipps = [
  { id: 1, title: "Die richtige GPU für deinen PC wählen", kategorie: "PC-Bau", icon: "🖥️" },
  { id: 2, title: "Top 5 mechanische Tastaturen für Programmierer", kategorie: "Peripheriegeräte", icon: "⌨️" },
  { id: 3, title: "Maximiere die Akkulaufzeit deines Laptops", kategorie: "Laptops", icon: "🔋" },
  { id: 4, title: "Der ultimative Leitfaden für Heimnetzwerk-Setup", kategorie: "Netzwerke", icon: "🌐" },
]

export default function TechTipps() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-900 to-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Tech-Tipps & Ratgeber
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tipps.map((tipp) => (
            <Link href={`/tipps/${tipp.id}`} key={tipp.id}>
              <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="text-4xl">{tipp.icon}</div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {tipp.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">{tipp.kategorie}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-400 group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

