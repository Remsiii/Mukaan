import { Particles } from '@/registry/magicui/particles'

export const LoadingSkeleton = () => (
    <div className="mt-10 relative backdrop-blur-xl bg-gradient-to-b to-grey/10 rounded-2xl p-8 pb-16 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100/20">
        <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            color={"#ffffff"}
            refresh
        />
        <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {/* Header Skeleton */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <div className="h-8 w-32 bg-gray-700 rounded-md animate-pulse"></div>
                        <div className="flex space-x-4">
                            <div className="h-10 w-48 bg-gray-700 rounded-md animate-pulse"></div>
                            <div className="h-10 w-40 bg-gray-700 rounded-md animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Grid Skeleton */}
                <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div key={index} className="group relative">
                            {/* Image Skeleton */}
                            <div className="h-80 w-full bg-gray-700 rounded-lg animate-pulse">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                            </div>

                            {/* Content Skeleton */}
                            <div className="mt-6 space-y-4">
                                <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse"></div>

                                {/* Buttons Skeleton */}
                                <div className="flex justify-between mt-4 space-x-2">
                                    <div className="h-8 w-32 bg-gray-700 rounded-md animate-pulse"></div>
                                    <div className="h-8 w-24 bg-gray-700 rounded-md animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
