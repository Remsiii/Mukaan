'use client'

import { motion } from 'framer-motion'
import { Search, Copy, Share2, ExternalLink, Check, Plus } from 'lucide-react'
import { useState } from 'react'

interface Deal {
    id: string
    title: string
    description: string
    imageUrl: string
    couponCode?: string
    affiliateLink: string
    submittedBy?: string
    expiryDate?: string
    category: string
    discount: string
    isVerified?: boolean
}

const initialDeals: Deal[] = [
    {
        id: '1',
        title: "NordVPN Jahresabo",
        description: "63% Rabatt auf das 2-Jahres-Abo + 3 Monate geschenkt",
        imageUrl: "https://lizenzguru.at/media/image/90/ef/6b/NordVpn.png",
        couponCode: "TECH63",
        affiliateLink: "https://nordvpn.com/special-deal",
        category: "VPN",
        discount: "63% Rabatt",
        isVerified: true
    },
    // ...more initial deals
]

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>(initialDeals)
    const [showSubmitForm, setShowSubmitForm] = useState(false)
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code)
        setCopiedCode(code)
        setTimeout(() => setCopiedCode(null), 2000)
    }

    const handleShareDeal = async (deal: Deal) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: deal.title,
                    text: `Spare mit diesem Code: ${deal.couponCode}`,
                    url: deal.affiliateLink
                })
            } catch (err) {
                console.error('Error sharing:', err)
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white mt-10">
            <motion.div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header Section */}
                <motion.div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Exklusive Tech-Deals & Rabatte
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Spare bei deinen Lieblings-Tech-Produkten und unterstütze die Community.
                        Alle Codes sind verifiziert und werden regelmäßig aktualisiert.
                    </p>
                </motion.div>

                {/* Add Deal Button */}
                <motion.button
                    onClick={() => setShowSubmitForm(true)}
                    className="fixed bottom-6 right-6 bg-purple-600 p-4 rounded-full shadow-lg hover:bg-purple-500 transition-all duration-300"
                >
                    <Plus className="w-6 h-6" />
                </motion.button>

                {/* Deals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deals.map((deal) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={deal.imageUrl}
                                    alt={deal.title}
                                    className="w-full h-48 object-cover"
                                />
                                {deal.isVerified && (
                                    <span className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded-full text-xs">
                                        Verifiziert
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{deal.description}</p>

                                {deal.couponCode && (
                                    <div className="flex items-center gap-2 mb-4 bg-gray-700 p-3 rounded-lg">
                                        <code className="text-purple-400 font-mono">{deal.couponCode}</code>
                                        <button
                                            onClick={() => handleCopyCode(deal.couponCode!)}
                                            className="ml-auto p-2 hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            {copiedCode === deal.couponCode ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 text-white">
                                    <a
                                        href={deal.affiliateLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-blue-900 hover:bg-blue-500 px-4 py-2 rounded-lg text-center font-semibold transition-all duration-300 text-white group"
                                    >
                                        <span className="text-white">Zum Angebot</span>
                                        <ExternalLink className="w-4 h-4 inline ml-1 text-white" />
                                    </a>
                                    <button
                                        onClick={() => handleShareDeal(deal)}
                                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Submit Form Modal */}
            {showSubmitForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    {/* Add form implementation here */}
                </div>
            )}
        </div>
    )
}
