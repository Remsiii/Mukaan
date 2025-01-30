import { FunctionComponent } from 'react'

interface DetailPageProps {
  title: string
  subtitle?: string
  imagePath: string
  imageAlt: string
  content: {
    text: string
    type?: 'paragraph' | 'heading' | 'list'
  }[]
  button?: {
    text: string
    link: string
  }
}

const DetailPage: FunctionComponent<DetailPageProps> = ({
  title,
  subtitle,
  imagePath,
  imageAlt,
  content,
  button
}) => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          {subtitle && <h2 className="text-2xl text-gray-600">{subtitle}</h2>}
        </div>

        {/* Image Section */}
        <div className="mb-12">
          <img
            src={imagePath}
            alt={imageAlt}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="prose prose-lg mx-auto mb-12">
          {content.map((item, index) => {
            switch (item.type) {
              case 'heading':
                return (
                  <h3 key={index} className="text-2xl font-bold text-gray-900 mb-4">
                    {item.text}
                  </h3>
                )
              case 'list':
                return (
                  <ul key={index} className="list-disc list-inside mb-6">
                    {item.text.split('\n').map((line, i) => (
                      <li key={i} className="text-gray-700 mb-2">{line.trim()}</li>
                    ))}
                  </ul>
                )
              default:
                return (
                  <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">
                    {item.text}
                  </p>
                )
            }
          })}
        </div>

        {/* Button Section */}
        {button && (
          <div className="text-center">
            <a
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              {button.text}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailPage
