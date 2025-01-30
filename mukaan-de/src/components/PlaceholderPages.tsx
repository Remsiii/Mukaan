import { usePageTitle } from '../hooks/usePageTitle'

export const PCScreen = () => {
  usePageTitle('PC Beratung')
  return (
    <div className="min-h-screen bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">PC Beratung</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Hier finden Sie bald unsere PC-Beratung und Dienstleistungen.
          </p>
        </div>
      </div>
    </div>
  )
}

export const TipsScreen = () => {
  usePageTitle('Tipps')
  return (
    <div className="min-h-screen bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tipps & Tricks</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Hier finden Sie bald hilfreiche Tipps und Tricks rund um Computer und Technologie.
          </p>
        </div>
      </div>
    </div>
  )
}
