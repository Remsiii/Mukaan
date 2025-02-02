import { usePageTitle } from '../hooks/usePageTitle'
import { motion } from 'framer-motion'
import { SearchBar } from './SearchBar'

const apps = [
  {
    title: "Screenshots von einer ganzen Seite in JEDER App",
    date: "Mai 28, 2024",
    image: "/images/screenshot-app.jpg",
    description: "Lerne, wie du in jeder App komplette Screenshots einer ganzen Seite erstellen kannst.",
    category: "Produktivität",
    badge: "Neu",
    link: "#"
  },
  {
    title: "Jede App mit Face ID/Code Sperren",
    date: "December 4, 2023",
    image: "/images/lock-app.jpg",
    description: "Sichere deine Apps mit Face ID oder Code-Sperre - für maximale Privatsphäre.",
    category: "Sicherheit",
    badge: "Beliebt",
    link: "#"
  },
  {
    title: "DB Bahnhof live",
    date: "November 13, 2023",
    image: "/images/db-app.jpg",
    description: "Die praktische App für Bahnreisende, die keiner kennt.",
    category: "Reisen",
    badge: "Geheimtipp",
    link: "#"
  },
  {
    title: "Chat-GPT auf dem iPhone",
    date: "Juni 1, 2023",
    image: "/images/chatgpt-app.jpg",
    description: "So nutzt du ChatGPT optimal auf deinem iPhone.",
    category: "KI",
    badge: "Must-Have",
    link: "#"
  },
  {
    title: "RODE Capture!",
    date: "April 4, 2023",
    image: "/images/rode-app.jpg",
    description: "Die professionelle Kamera App von Audio Firma RODE.",
    category: "Multimedia",
    badge: "Pro",
    link: "#"
  },
  {
    title: "Apps, die jeder lieben wird",
    date: "März 8, 2023",
    image: "/images/apps-collection.jpg",
    description: "Eine kuratierte Sammlung der besten Apps für jeden Zweck.",
    category: "Sammlung",
    badge: "Top",
    link: "#"
  }
]

const pcConfigs = [
  {
    title: "Perfekte Prepaid SIM Karte für Ausländer",
    price: "9.99€",
    image: "/images/sim-card.jpg",
    specs: [
      "5GB Datenvolumen im Ausland",
      "Ohne Vertrag",
      "Deutsches Netz",
      "Sofort nutzbar",
      "Ideal für Reisende"
    ],
    badge: "Bestseller",
    description: "5GB Datenvolumen im Ausland für 9,99€ ohne Vertrag. Diese SIM-Karte bietet sich als in Deutschland lebender Türke gerne viel früher gekannt.",
    link: "#"
  },
  {
    title: "iPhone 16 Bestpreis 🔥",
    price: "759€",
    image: "/images/iphone16.jpg",
    specs: [
      "iPhone 16 schwarz 128 GB",
      "Beim noch relativ unbekannten Anbieter",
      "Smartport",
      "Bestpreis garantiert",
      "Inkl. Versand"
    ],
    badge: "Hot Deal",
    description: "iPhone 16 schwarz 128 GB Beim noch relativ unbekannten Anbieter Smartport bekommt ihr gerade ein iPhone 16 zum Bestpreis von 759,90€",
    link: "#"
  },
  {
    title: "Spiele immer günstiger bekommen",
    price: "Variabel",
    image: "/images/keyforsteam.jpg",
    specs: [
      "Legale Game Keys",
      "Große Auswahl",
      "Sofortige Lieferung",
      "Sichere Bezahlung",
      "24/7 Support"
    ],
    badge: "Tipp",
    description: "Spiele immer günstiger bekommen. keyforsteam.de Wer meinen Kanal schon länger verfolgt, hat bestimmt schon mal von idealo oder Geizhals gehört.",
    link: "#"
  }
]

export function PCScreen() {
  usePageTitle('PC Beratung')
  return (
    <div className="min-h-screen ">
      <div className="relative isolate">
        {/* Gradient Background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Hero Section */}
        <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 sm:text-6xl">
              Aktuelle Angebote
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Die besten Deals und Angebote, sorgfältig ausgewählt für dich.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <SearchBar collections={pcConfigs} />
          </motion.div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pcConfigs.map((config, index) => (
              <motion.div
                key={config.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={config.image}
                    alt={config.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-purple-600/90 px-3 py-1 text-sm font-semibold text-white">
                      {config.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{config.title}</h3>
                    <p className="text-lg font-semibold text-purple-400">{config.price}</p>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{config.description}</p>
                  <ul className="space-y-2">
                    {config.specs.map((spec, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={config.link}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors duration-200"
                  >
                    Mehr Details
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}

export const TipsScreen = () => {
  usePageTitle('Tipps')
  return (
    <div className="min-h-screen bg-black">
      <div className="relative isolate">
        {/* Gradient Background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Content */}
        <div className="mx-auto max-w-2xl text-center py-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Tipps & Tricks</h2>
          <p className="mt-2 text-lg leading-8 text-gray-400">
            Hier finden Sie bald hilfreiche Tipps und Tricks rund um Computer und Technologie.
          </p>
        </div>

        {/* Bottom Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}

export const AppsScreen = () => {
  usePageTitle('App Tipps')
  return (
    <div className="min-h-screen bg-black">
      <div className="relative isolate">
        {/* Gradient Background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-blue-500/90 px-3 py-1 text-sm font-semibold text-white">
                      {app.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{app.date}</span>
                    <span className="text-sm font-medium text-blue-400">{app.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{app.description}</p>
                  <a
                    href={app.link}
                    className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300"
                  >
                    Mehr erfahren
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}
