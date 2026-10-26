"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        // TODO: Pixabay now blocks hotlinking (403). Drop a loop into /public and point this at it.
        const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/24/audio_196323f46b.mp3?filename=fun-disco-1100.mp3"); // Example Fun Loop
        audio.loop = true;
        audio.volume = 0.5;
        // Hide the mute toggle when the track can't load, since it would control nothing
        audio.onerror = () => setFailed(true);

        audio.play().catch(e => console.log("Audio autoplay blocked:", e));

        audioRef.current = audio;

        return () => {
            audio.onerror = null; // clearing src below would otherwise fire it
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

    if (failed) return null;

    return (
        <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute music" : "Mute music"}
            className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-yellow-400 text-black shadow-lg hover:scale-110 transition-transform animate-bounce"
        >
            {isMuted ? "🔇" : "🔊"}
        </button>
    );
}
