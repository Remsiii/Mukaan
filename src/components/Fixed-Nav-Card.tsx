import React from "react";
import AnimatedDock from "./animata/animated-dock";
import { Home, Search } from "lucide-react";
import { ComputerDesktopIcon, LightBulbIcon } from "@heroicons/react/24/outline";

const FixedNavCard: React.FC = () => {
    return (
        <div className="fixed inset-x-0 bottom-10 flex justify-center items-center z-99990">
            <AnimatedDock
                items={[
                    {
                        href: '/',
                        icon: <Home />,
                        title: 'Home'
                    },
                    {
                        href: '/search',
                        icon: <Search />,
                        title: 'Search'
                    },
                    {
                        href: '/Mukaan/pc',
                        icon: <ComputerDesktopIcon />,
                        title: 'PC'
                    },
                    {
                        href: '/Mukaan/tipps',
                        icon: <LightBulbIcon />,
                        title: 'Tipps'
                    }
                ]}
                largeClassName="max-w-lg"
            />
        </div>
    );
};

export default FixedNavCard;