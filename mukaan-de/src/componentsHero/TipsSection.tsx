import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const tips = [
  { id: 1, title: "How to Choose the Right GPU for Your PC", category: "PC Building" },
  { id: 2, title: "Top 5 Mechanical Keyboards for Programmers", category: "Peripherals" },
  { id: 3, title: "Maximizing Battery Life on Your Laptop", category: "Laptops" },
  { id: 4, title: "The Ultimate Guide to Home Network Setup", category: "Networking" },
]

export default function TipsSection() {
  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Tech Tips & Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <Card
              key={tip.id}
              className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{tip.title}</span>
                  <ArrowRight className="h-5 w-5 text-blue-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{tip.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

