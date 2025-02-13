import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AffiliateStrip() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="relative mt-8"
        >
            <div className="mx-auto max-w-3xl px-4">
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-800/50"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                        <div className="flex items-center gap-3">
                            <motion.span
                                initial={{ rotate: 0 }}
                                animate={{ rotate: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                                role="img"
                                aria-label="sparkles"
                                className="text-2xl opacity-90"
                            >
                                💪
                            </motion.span>
                            <p className="text-sm font-medium text-gray-300">
                                Unterstütze mich durch Affiliate Links – danke für deine Hilfe!
                            </p>
                        </div>

                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02, x: 3 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => navigate('/deals')}                            // Inline styles override mobile defaults: force desired background color
                            style={{ WebkitAppearance: 'none', backgroundColor: 'rgba(31,41,55,0.8)' }}
                            className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-200 
                            transition-all hover:bg-gray-700/80 hover:shadow-md appearance-none"
                        >
                            Deals ansehen
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}