import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/registry/magicui/animated-gradient-text";

export function AnimatedGradientTextDemo() {
    return (
        <div className="z-10 flex items-center justify-center">
            <a
                href="https://gh.de/g/hs"
                target="_blank"
                rel="noopener noreferrer"
            >
                <AnimatedGradientText>
                    💰{" "}
                    <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
                    <span
                        className={cn(
                            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c65d7] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                        )}
                    >
                        Hier den besten Preis finden
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-white" />
                </AnimatedGradientText>
            </a>
        </div>
    );
}
