import React, { useState } from "react";
import { AnimatedDock } from "./animata/animated-dock";
import { Home, Search, X, User } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { callouts } from "../data/callouts";

// Hier wird Callouts in das von SearchBar erwartete Format gemappt:
const mappedCallouts = callouts.map((c) => ({
    title: c.pageContent.title,
    description: c.description,
    image: c.imageSrc,
    badge: "", // Hier kannst du ggf. einen Badge-Text setzen
    link: c.pageContent.button?.link ?? "",
    slug: c.slug,
}));

const FixedNavCard: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const dockItems = [
        {
            href: "/",
            icon: <Home />,
            title: "Home",
        },
        {
            icon: <Search />,
            title: "Search",
            href: "",
            onClick: () => setIsSearchOpen(true),
        },
        {
            href: "/admin",
            icon: <User />,
            title: "Login",
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
                        <SearchBar
                            collections={mappedCallouts}
                            onResultClick={() => setIsSearchOpen(false)} // Add this line
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default FixedNavCard;