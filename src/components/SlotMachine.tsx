"use client";

import { useState, useEffect } from "react";

import confetti from "canvas-confetti";

const SYMBOLS = ["💎", "7️⃣", "🍇", "🍒", "🔔", "⭐"];
const WINNING_SYMBOL = "💎";

export default function SlotMachine() {
    const [results, setResults] = useState<number[]>([0, 1, 2]); // Indices of SYMBOLS
    const [spinning, setSpinning] = useState([false, false, false]);
    const [isWon, setIsWon] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const spin = () => {
        if (spinning.some(s => s)) return;

        // Start all spinning
        setSpinning([true, true, true]);
        setIsWon(false);

        // Determine results ahead of time
        const newResults = [
            Math.floor(Math.random() * SYMBOLS.length),
            Math.floor(Math.random() * SYMBOLS.length),
            Math.floor(Math.random() * SYMBOLS.length)
        ];

        // Force win for demo purposes (20% chance)
        if (Math.random() < 0.2) {
            newResults[0] = 0; // Diamond
            newResults[1] = 0;
            newResults[2] = 0;
        }

        // Stop reels one by one
        setTimeout(() => {
            setResults(prev => [newResults[0], prev[1], prev[2]]);
            setSpinning(prev => [false, true, true]);
        }, 1000);

        setTimeout(() => {
            setResults(prev => [newResults[0], newResults[1], prev[2]]);
            setSpinning(prev => [false, false, true]);
        }, 1500);

        setTimeout(() => {
            setResults(newResults);
            setSpinning([false, false, false]);

            // Check win
            if (newResults[0] === newResults[1] && newResults[1] === newResults[2] && newResults[0] === 0) {
                setIsWon(true);
                triggerConfetti();
            }
        }, 2000);
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            // launch a few confetti from the left edge
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#6366f1', '#a855f7', '#ec4899'], // Indigo, Purple, Pink
                shapes: ['circle', 'square'],
            });
            // and launch a few from the right edge
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#6366f1', '#a855f7', '#ec4899'],
                shapes: ['circle', 'square'],
            });

            // Stars from the bottom center
            if (Date.now() % 150 < 30) { // Throttled star bursts
                confetti({
                    particleCount: 15,
                    spread: 100,
                    origin: { y: 0.8 },
                    colors: ['#FFD700', '#FFA500'], // Gold
                    shapes: ['star'],
                    scalar: 1.5, // Bigger stars
                    gravity: 0.5,
                    drift: 0,
                    ticks: 100,
                });
            }

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    return (
        <section className="flex flex-col items-center gap-8 w-full">

            {/* Minimalist Reels Container - Matches width of other sections (w-full) */}
            <div
                className="w-full relative group bg-slate-900/40 rounded-2xl backdrop-blur-sm border border-slate-800/50 shadow-2xl overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Instruction Label */}
                <div className="absolute top-3 left-4 z-10 text-xs font-mono text-slate-500 tracking-widest uppercase opacity-70">
                    Match 3 💎 to Unlock
                </div>

                <div className="flex justify-around p-8 md:p-12 gap-2 md:gap-4">
                    {results.map((resultIndex, i) => (
                        <Reel key={i} symbolIndex={resultIndex} isSpinning={spinning[i]} />
                    ))}
                </div>

                {/* Spin Button - Floating at 6 o'clock position */}
                {/* Always visible (semi-transparent) unless spinning. No hover dependency for visibility. */}
                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${spinning.some(s => s) ? 'opacity-0 pointer-events-none scale-95' : 'opacity-90 hover:opacity-100 scale-100'}`}>
                    <button
                        onClick={spin}
                        disabled={spinning.some(s => s)}
                        className="px-10 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:scale-105 active:scale-95 transition-all text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-400/30 backdrop-blur-md"
                    >
                        SPIN
                    </button>
                </div>

                {/* Subtle Win State Overlay (inside the container purely for layout, or keep outside) */}
                <div className="absolute inset-x-0 top-4 text-center pointer-events-none">
                    <div className={`transition-all duration-700 ${isWon ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                        <span className="inline-block px-4 py-1 rounded-full bg-slate-950/80 border border-green-500/30 text-green-400 text-xs font-mono tracking-widest shadow-lg backdrop-blur-md">
                            JACKPOT UNLOCKED
                        </span>
                    </div>
                </div>
            </div>

            {/* Win Actions - Kept outside for accessibility and cleaner UI flow */}
            <div className={`text-center transition-all duration-700 ${isWon ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none h-0 overflowing-hidden"}`}>
                <p className="text-indigo-400 font-medium mb-4 text-lg">System Override Authorized.</p>
                <div className="flex gap-6 text-base justify-center">
                    <a href="/resume.pdf" className="px-6 py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:border-indigo-500 transition-all shadow-lg">Download CV</a>
                    <a href="mailto:agolho@gmail.com?subject=Jackpot!%20I%20want%20to%20hire%20you" className="px-6 py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:border-indigo-500 transition-all shadow-lg">Contact Agent</a>
                </div>
            </div>

        </section>
    );
}

function Reel({ symbolIndex, isSpinning }: { symbolIndex: number, isSpinning: boolean }) {
    // We duplicate the symbols list to create a seamless loop for the animation
    const strip = [...SYMBOLS, ...SYMBOLS];

    return (
        // Increased height and width for "Bigger" request
        <div className="w-1/3 h-48 md:h-64 bg-slate-950/50 rounded-xl overflow-hidden relative border border-slate-800/50 shadow-inner">
            <div
                className={`flex flex-col items-center w-full transition-transform duration-100 ${isSpinning ? "animate-spin-scroll blur-[2px]" : ""}`}
                style={{
                    // FIX: shift by (index / total_items)% to move exactly one item height.
                    transform: isSpinning ? undefined : `translateY(calc(-${symbolIndex} * (100% / ${strip.length})))`
                }}
            >
                {strip.map((char, i) => (
                    // Height must match container height (100%)
                    <div key={i} className="h-48 md:h-64 w-full flex items-center justify-center text-6xl md:text-8xl select-none shrink-0">
                        {char}
                    </div>
                ))}
            </div>

            {/* Stronger overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/80 pointer-events-none z-10" />
        </div>
    )
}
