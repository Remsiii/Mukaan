import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative h-[600px] bg-muted rounded-lg overflow-hidden mb-12">
      <div className="absolute top-1/4 left-12 z-10 max-w-xl">
        <h1 className="text-6xl font-bold text-foreground leading-tight mb-6">
          TOP DEAL
          <br />
          IPHONE 14
          <br />
          PRO MAX
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Das iPhone 14 Pro Max ist Apples Flaggschiff-Smartphone mit der innovativen Dynamic Island, einem Always-On
          Display und einem leistungsstarken A16 Bionic Chip.
        </p>
        <Button className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
          ZUM ANGEBOT
        </Button>
      </div>
      <div className="absolute right-0 bottom-0 w-2/3 h-full">
        <Image src="/placeholder.svg" alt="iPhone 14 Pro Max" fill className="object-contain object-right-bottom" />
      </div>
    </div>
  )
}

