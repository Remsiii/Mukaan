import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const deals = [
  { id: 1, title: "iPhone 13 Pro", price: "$999", store: "TechMart", discount: "10% off" },
  { id: 2, title: "Sony WH-1000XM4", price: "$278", store: "AudioWorld", discount: "20% off" },
  { id: 3, title: "Samsung QLED TV", price: "$1299", store: "ElectroHub", discount: "15% off" },
  { id: 4, title: "MacBook Air M1", price: "$899", store: "AppleZone", discount: "12% off" },
]

export default function FeaturedDeals() {
  return (
    <section className="py-16 px-4 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{deal.title}</span>
                  <Badge variant="secondary" className="bg-blue-500 text-white">
                    {deal.discount}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">{deal.price}</p>
                <p className="text-sm text-gray-400">Best price at {deal.store}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

