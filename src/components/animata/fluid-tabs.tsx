"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox, Landmark, PieChart, Shapes, Sparkles } from "lucide-react";
import { useFilter } from "../../context/FilterContext";

const tabs = [
    {
        id: "all",
        label: "Alle",
        icon: <Shapes size={18} />,
    },
    {
        id: "tipps",
        label: "Tipps",
        icon: <Sparkles size={18} />,
    },
    {
        id: "pc",
        label: "PC",
        icon: <Inbox size={18} />,
    },
    {
        id: "angebote",
        label: "Angebote",
        icon: <Landmark size={18} />,
    },
    {
        id: "apps",
        label: "Apps",
        icon: <PieChart size={18} />,
    },
];

export default function FluidTabs() {
    const { activeFilter, setActiveFilter } = useFilter();
    const [touchedTab, setTouchedTab] = useState<string | null>(null);
    const [prevActiveTab, setPrevActiveTab] = useState(activeFilter);

    const handleTabClick = (tabId: string) => {
        setPrevActiveTab(activeFilter);
        setActiveFilter(tabId);
        setTouchedTab(tabId);
        setTimeout(() => setTouchedTab(null), 300);
    };

    const getTabIndex = (tabId: string) => tabs.findIndex((tab) => tab.id === tabId);

    return (
        <div className="flex items-center justify-center py-4">
            <div className="relative flex w-full max-w-xl space-x-1 overflow-hidden rounded-full bg-[#f5f1eb] p-1 shadow-lg">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={activeFilter}
                        className="absolute inset-y-0 my-1 rounded-full bg-white"
                        initial={{ x: `${getTabIndex(prevActiveTab) * 20}%` }}
                        animate={{ x: `${getTabIndex(activeFilter) * 20}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ width: '20%' }}
                    />
                </AnimatePresence>
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        className={`relative z-10 flex w-full items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-300 
                            ${activeFilter === tab.id ? "font-bold text-black" : "text-gray-500"}
                            ${touchedTab === tab.id ? "blur-sm" : ""}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.icon}
                        {tab.label}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
