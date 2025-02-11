import { AuroraText } from "@/registry/magicui/aurora-text";
import { BoxReveal } from "@/registry/magicui/box-reveal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BoxRevealDemo() {
    const [techWord, setTechWord] = useState("Tech");
    const techWords = ["Tech", "PC", "Gaming", "Software", "Hardware"];

    useEffect(() => {
        const interval = setInterval(() => {
            setTechWord(techWords[Math.floor(Math.random() * techWords.length)]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[25vh] w-full overflow-hidden rounded-xl">

            {/* Dark background with subtle gradient - increased blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-purple-950/40 to-gray-950/90 blur-[400px]" />


            {/* Ambient light effects - darker and more subtle */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.05, 0.08, 0.05]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 -left-1/4 h-[20rem] w-[20rem] bg-purple-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.08, 0.05]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 -right-1/4 h-[25rem] w-[15rem] bg-gray-800/10 rounded-full blur-3xl"
                />
            </div>

            {/* Content container stays sharp */}
            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4">
                {/* Main heading with smaller text size */}
                <BoxReveal boxColor="#7C3AED" duration={0.8}>
                    <motion.h1
                        className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block">Muhammed{" "}</span>
                        <motion.span
                            className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{ backgroundSize: "200% 100%" }}
                        >
                            Kaan
                        </motion.span>
                    </motion.h1>
                </BoxReveal>

                {/* Subheading with smaller text */}
                <BoxReveal boxColor="#7C3AED" duration={0.6}>
                    <motion.div
                        className="mt-2 text-sm md:text-base font-medium text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <motion.span
                            key={techWord}
                            className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent inline-block"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {techWord}
                        </motion.span>
                        {" Tipps & Tricks"}
                    </motion.div>
                </BoxReveal>

                {/* Smaller decorative elements */}
                <motion.div
                    className="mt-3 flex gap-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    <div className="w-2 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-70" />
                    <div className="w-1 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-40" />
                </motion.div>
            </div>

            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
        </div>
    );
}
