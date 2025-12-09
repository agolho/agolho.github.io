"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

export default function BonusGameModal({ onClose }: { onClose: () => void }) {
    const [openedChest, setOpenedChest] = useState<number | null>(null);

    const prizes = [
        { label: "My GitHub", link: "https://github.com/agolho" },
        { label: "LinkedIn", link: "https://www.linkedin.com/in/yusufbektas/" },
        { label: "Resume", link: "/resume.pdf" }
    ];

    const handleChestClick = (index: number) => {
        if (openedChest !== null) return;
        setOpenedChest(index);

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500']
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className={`bg-slate-900 border-2 border-yellow-400 rounded-2xl p-8 max-w-2xl w-full text-center relative shadow-[0_0_50px_rgba(255,215,0,0.3)] ${openedChest === null ? 'animate-pulse-gold' : ''}`}>

                <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-2 uppercase tracking-widest drop-shadow-md">
                    {openedChest === null ? "Choose Your Reward" : "You Won!"}
                </h2>
                <p className="text-yellow-200/80 mb-8 max-w-md mx-auto">
                    {openedChest === null
                        ? "Select a chest to reveal your exclusive bonus content."
                        : "Excellent choice. Equip this item to boost your stats."}
                </p>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8 pb-4">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            onClick={() => handleChestClick(i)}
                            className={`
                                relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 cursor-pointer transition-all duration-500
                                ${openedChest === null ? 'hover:scale-110 hover:-translate-y-2' : ''}
                                ${openedChest !== null && openedChest !== i ? 'opacity-30 scale-90 grayscale' : ''}
                                ${openedChest === i ? 'scale-110 -translate-y-4' : ''}
                            `}
                        >
                            {/* Simple CSS Chest illustration or Emoji for now */}
                            <div className="text-6xl sm:text-7xl md:text-8xl flex items-center justify-center h-full drop-shadow-2xl">
                                {openedChest === i ? "💰" : "🎁"}
                            </div>

                            {/* Prize Reveal */}
                            <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 transition-all duration-500 ${openedChest === i ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                                <a
                                    href={prizes[i].link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-6 py-2 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transition-transform"
                                >
                                    OPEN {prizes[i].label}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {openedChest !== null && (
                    <button
                        onClick={onClose}
                        className="mt-24 px-8 py-3 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-white hover:bg-white/5 transition-all text-sm uppercase tracking-widest font-bold"
                    >
                        Close & Return
                    </button>
                )}

            </div>
        </div>
    );
}
