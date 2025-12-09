"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // In a real app, this would be a real local file or CDN URL
        // Using a data URI for a simple placeholder loop or a public URL if available. 
        // For this demo, I'll use a placeholder "beep" sequence or assume a file exists.
        // Let's assume a generic fun loop from a CDN for "Bonus Mode" vibe.
        // If this URL fails, the user can replace it.
        const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/24/audio_196323f46b.mp3?filename=fun-disco-1100.mp3"); // Example Fun Loop
        audio.loop = true;
        audio.volume = 0.5;

        audio.play().catch(e => console.log("Audio autoplay blocked:", e));

        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = "";
        }
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-yellow-400 text-black shadow-lg hover:scale-110 transition-transform animate-bounce"
        >
            {isMuted ? "🔇" : "🔊"}
        </button>
    );
}
