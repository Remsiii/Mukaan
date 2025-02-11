"use client";

import { LineShadowText } from "@/registry/magicui/line-shadow-text";

export function LineShadowTextDemo() {
    return (
        <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Muhammed{" "}
            <LineShadowText className="italic" shadowColor="white">
                Mukaan
            </LineShadowText>
        </h1>
    );
}
