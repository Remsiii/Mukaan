"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox, Landmark, PieChart, Shapes, Sparkles } from "lucide-react";
import { useFilter } from "../../context/FilterContext";

const tabs = [
    {
        id: "all",
        label: "Alle",
        icon: <Shapes className="sm:size-[18px] size-[22px]" />,
    },
    {
        id: "tipps",
        label: "Tipps",
        icon: <Sparkles className="sm:size-[18px] size-[22px]" />,
    },
    {
        id: "pc",
        label: "PC",
        icon: <Inbox className="sm:size-[18px] size-[22px]" />,
    },
    {
        id: "angebote",
        label: "Angebote",
        icon: <Landmark className="sm:size-[18px] size-[22px]" />,
    },
    {
        id: "apps",
        label: "Apps",
        icon: <PieChart className="sm:size-[18px] size-[22px]" />,
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
        <div className="flex items-center justify-center py-2 sm:py-4">
            <div className="relative flex w-full max-w-xl space-x-0.25 sm:space-x-1 overflow-hidden rounded-full bg-[#f5f1eb] p-0.5 sm:p-1 shadow-lg">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={activeFilter}
                        className="absolute rounded-full bg-white"
                        initial={{ left: `${getTabIndex(prevActiveTab) * (100 / tabs.length)}%` }}
                        animate={{ left: `${getTabIndex(activeFilter) * (100 / tabs.length)}%` }}
                        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                        style={{
                            width: `${100 / tabs.length}%`,
                            height: '85%',
                            top: '7.5%'
                        }}
                    />
                </AnimatePresence>
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        className={`relative z-10 flex w-full flex-col sm:flex-row items-center justify-center gap-0 sm:gap-1.5 px-1 sm:px-3 py-2 sm:py-2 text-[10px] sm:text-sm font-medium transition-colors duration-300 
                            ${activeFilter === tab.id ? "font-bold text-black" : "text-gray-500"}
                            ${touchedTab === tab.id ? "blur-sm" : ""}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.icon}
                        <span className="mt-1 sm:mt-0">{tab.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
