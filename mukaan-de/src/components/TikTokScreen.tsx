import React, { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";

const API_KEY = "3eb52bf4eamshd634f2c8b8b87cap1d3ec9jsn68591327b38d"; // Dein RapidAPI Key
const USERNAME = "muhammed_kaan"; // Dein TikTok Username

const TikTokScreen: React.FC = () => {
    usePageTitle("Neuestes TikTok-Video");
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLatestTikTok = async () => {
            try {
                const response = await fetch(
                    `https://tiktok-video-no-watermark2.p.rapidapi.com/user/posts?unique_id=${USERNAME}&count=1`,
                    {
                        method: "GET",
                        headers: {
                            "X-RapidAPI-Key": API_KEY,
                            "X-RapidAPI-Host": "tiktok-video-no-watermark2.p.rapidapi.com",
                        },
                    }
                );
                const data = await response.json();

                if (data.code === 0 && data.data.videos.length > 0) {
                    const latestVideo = data.data.videos[0];
                    setVideoUrl(latestVideo.play); // `play` enthält die URL zur Videodatei
                } else {
                    setError("Kein Video gefunden.");
                }
            } catch (error) {
                console.error("Fehler beim Laden des TikTok-Videos:", error);
                setError("Fehler beim Abrufen der TikTok-Daten.");
            } finally {
                setLoading(false);
            }
        };

        fetchLatestTikTok();
    }, []);

    if (loading) return <p className="text-center mt-6">Lade das neueste TikTok-Video...</p>;
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
    if (!videoUrl) return <p className="text-center mt-6">Kein Video verfügbar.</p>;

    return (
        <div className="min-h-screen bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Neuestes TikTok-Video
                    </h2>
                    <div className="mt-4">
                        <video controls width="100%" src={videoUrl}></video>
                    </div>
                    <a
                        href={`https://www.tiktok.com/@${USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mt-4 inline-block"
                    >
                        Zum TikTok-Profil
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TikTokScreen;
