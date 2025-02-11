"use client"

import { useState } from "react"

interface ProductCardProps {
    imageUrl: string
    title: string
}

export function ProductCard({ imageUrl, title }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white line-clamp-3">
                    {title}
                </h3>
                <button
                    className={`
            w-full py-2 px-4 rounded-full font-semibold
            transition-all duration-300 ease-in-out
            ${isHovered
                            ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white transform scale-105"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                        }
            hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
          `}
                >
                    Entdecken
                </button>
            </div>
        </div>
    )
}

