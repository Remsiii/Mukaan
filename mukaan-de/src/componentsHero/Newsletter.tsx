import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Newsletter() {
  return (
    <section className="py-16 px-4 bg-black">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Bleib auf dem neuesten Stand
        </h2>
        <p className="text-gray-400 mb-6">
          Abonniere unseren Newsletter und erhalte die besten Tech-Deals und Tipps direkt in dein Postfach.
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Deine E-Mail-Adresse"
            className="flex-grow bg-white/10 border-purple-500 text-white placeholder-gray-400"
          />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Abonnieren
          </Button>
        </form>
      </div>
    </section>
  )
}

