import React, { useState } from "react";
import { AnimatedDock } from "./animata/animated-dock";
import { Home, Search, X } from "lucide-react";
import { ComputerDesktopIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import {
    Bars3Icon,
    XMarkIcon,
    GiftIcon,
    DevicePhoneMobileIcon,
    TagIcon,
} from '@heroicons/react/24/outline'
import { SearchBar } from "./SearchBar";
import { callouts } from "../data/callouts";

// Hier wird Callouts in das von SearchBar erwartete Format gemappt:
const mappedCallouts = callouts.map((c) => ({
    title: c.pageContent.title,
    description: c.description,
    image: c.imageSrc,
    badge: "", // Hier kannst du ggf. einen Badge-Text setzen
    link: c.pageContent.button?.link ?? "",
}));

const FixedNavCard: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const dockItems = [
        {
            icon: <Search />,
            title: "Search",
            onClick: () => setIsSearchOpen(true),
        },
        {
            href: "/pc",
            icon: <ComputerDesktopIcon />,
            title: "PC",
        },
        {
            href: "/tipps",
            icon: <LightBulbIcon />,
            title: "Tipps",
        },
        {
            href: "/apps",
            icon: <DevicePhoneMobileIcon />,
            title: "Apps",
        },
        {
            href: "/angebote",
            icon: <GiftIcon />,
            title: "Angebote",
        },
    ];

    return (
        <>
            <div className="fixed inset-x-0 bottom-10 flex justify-center items-center z-99990">
                <AnimatedDock items={dockItems} largeClassName="max-w-lg" />
            </div>
            {isSearchOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsSearchOpen(false)}
                    />
                    {/* X-Button außerhalb der Card, links oben */}
                    <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute top-4 left-4 text-white cursor-pointer z-50"
                    >
                        <X size={24} />
                    </button>
                    <div className="relative mx-auto mt-20 max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <SearchBar collections={mappedCallouts} />
                    </div>
                </div>
            )}
        </>
    );
};

export default FixedNavCard;