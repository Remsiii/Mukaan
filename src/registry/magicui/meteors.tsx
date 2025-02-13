"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const meteorKeyframes = `
  @keyframes meteor {
    0% {
      transform: rotate(var(--angle)) translateX(0);
      opacity: 1;
    }
    70% { 
      opacity: 1;
    }
    100% {
      transform: rotate(var(--angle)) translateX(-500px);
      opacity: 0;
    }
  }
`;

// Add style tag to head
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = meteorKeyframes;
    document.head.appendChild(style);
}

interface MeteorsProps {
    number?: number;
    minDelay?: number;
    maxDelay?: number;
    minDuration?: number;
    maxDuration?: number;
    angle?: number;
    className?: string;
}

export const Meteors = ({
    number = 20,
    minDelay = 0.2,
    maxDelay = 1.2,
    minDuration = 2,
    maxDuration = 10,
    angle = 215,
    className,
}: MeteorsProps) => {
    const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

    useEffect(() => {
        const styles = [...new Array(number)].map(() => ({
            "--angle": angle + "deg",
            top: -5,
            left: `calc(-50% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
            animationName: "meteor",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
            animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s",
        } as React.CSSProperties));
        setMeteorStyles(styles);
    }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

    return (
        <>
            {[...meteorStyles].map((style, idx) => (
                <span
                    key={idx}
                    style={style}
                    className={cn(
                        "pointer-events-none absolute size-0.5 rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]",
                        className,
                    )}
                >
                    <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent" />
                </span>
            ))}
        </>
    );
};
