"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import BackgroundMusic from "./BackgroundMusic";
import BonusGameModal from "./BonusGameModal";

const SYMBOLS = ["💎", "🍀", "🍋", "🍒", "🔔", "👑"];
const WINNING_SYMBOL = "💎";

export default function SlotMachine() {
    const [results, setResults] = useState<number[]>([0, 1, 2]); // Indices of SYMBOLS
    const [spinning, setSpinning] = useState([false, false, false]);
    const [isWon, setIsWon] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Bonus Mode States
    const [isBonusMode, setIsBonusMode] = useState(false);
    const [showBonusModal, setShowBonusModal] = useState(false);

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
                colors: isBonusMode ? ['#FFD700', '#FFA500'] : ['#6366f1', '#a855f7', '#ec4899'],
                shapes: ['circle', 'square'],
            });
            // and launch a few from the right edge
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: isBonusMode ? ['#FFD700', '#FFA500'] : ['#6366f1', '#a855f7', '#ec4899'],
                shapes: ['circle', 'square'],
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    // Konami Code Listener
    useEffect(() => {
        const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let keyIndex = 0;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === konamiCode[keyIndex]) {
                keyIndex++;
                if (keyIndex === konamiCode.length) {
                    activateBonusMode();
                    keyIndex = 0;
                }
            } else {
                keyIndex = 0; // Reset if mistake
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Toggle Body Class for Global Theme Overrides
    useEffect(() => {
        if (isBonusMode) {
            document.body.classList.add("bonus-mode");
            triggerConfetti();
        } else {
            document.body.classList.remove("bonus-mode");
        }
    }, [isBonusMode]);

    const activateBonusMode = () => {
        setIsBonusMode(true);
        setShowBonusModal(true);
    };

    const spin = () => {
        if (spinning.some(s => s)) return;

        // Start all spinning
        setSpinning([true, true, true]);
        setIsWon(false);
        setShowBonusModal(false);

        // Determine results ahead of time
        const newResults = [
            Math.floor(Math.random() * SYMBOLS.length),
            Math.floor(Math.random() * SYMBOLS.length),
            Math.floor(Math.random() * SYMBOLS.length)
        ];

        // Force win logic (keeping the demo 20% chance or higher for Bonus Mode?)
        // If Bonus Mode is active, maybe higher win rate? Let's keep it standard for now.
        // Force win for demo purposes (20% chance)
        if (Math.random() < 0.2) {
            newResults[0] = 0; newResults[1] = 0; newResults[2] = 0;
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
            // Reset bonus mode if it was active (one-time bonus)
            if (isBonusMode) {
                setIsBonusMode(false);
            }

            setResults(newResults);
            setSpinning([false, false, false]);

            // Check win
            if (newResults[0] === newResults[1] && newResults[1] === newResults[2] && newResults[0] === 0) {
                setIsWon(true);
                setIsBonusMode(true); // Win triggers bonus mode too!
                triggerConfetti();
                setTimeout(() => setShowBonusModal(true), 1000); // Delay modal slightly
            }
        }, 2000);
    };


    return (
        <section className="flex flex-col items-center gap-8 w-full relative">
            {isBonusMode && <BackgroundMusic />}

            {showBonusModal && <BonusGameModal onClose={() => setShowBonusModal(false)} />}

            {/* Minimalist Reels Container */}
            <div
                className={`w-full relative group bg-slate-900/40 rounded-2xl backdrop-blur-sm border border-slate-800/50 shadow-2xl overflow-hidden transition-all duration-500 ${isBonusMode ? 'border-yellow-500/50 shadow-yellow-500/20' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Instruction Label */}
                <div className={`absolute top-3 left-4 z-10 text-xs font-mono tracking-widest uppercase opacity-70 ${isBonusMode ? 'text-yellow-400' : 'text-slate-500'}`}>
                    {isBonusMode ? "BONUS MODE ACTIVE" : "Match 3 💎 to Unlock"}
                </div>

                <div className="flex justify-around p-8 md:p-12 gap-2 md:gap-4">
                    {results.map((resultIndex, i) => (
                        <Reel key={i} symbolIndex={resultIndex} isSpinning={spinning[i]} />
                    ))}
                </div>

                {/* Spin Button - Floating at 6 o'clock position */}
                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${spinning.some(s => s) ? 'opacity-0 pointer-events-none scale-95' : 'opacity-90 hover:opacity-100 scale-100'}`}>
                    <button
                        onClick={spin}
                        disabled={spinning.some(s => s)}
                        className={`px-10 py-3 rounded-full font-bold shadow-lg  hover:scale-105 active:scale-95 transition-all text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed border backdrop-blur-md ${isBonusMode ? 'bg-yellow-500 text-black shadow-yellow-500/30 border-yellow-400/30 hover:bg-yellow-400' : 'bg-indigo-600 text-white shadow-indigo-500/30 border-indigo-400/30 hover:bg-indigo-500'}`}
                    >
                        {isBonusMode ? "SPIN BONUS" : "SPIN"}
                    </button>
                </div>
            </div>

            {/* Text result - Hidden when modal is active, but kept for fallback/transition */}
            {!showBonusModal && isWon && (
                <div className="text-center animate-fade-in text-yellow-400 mt-4">
                    <p className="tracking-widest uppercase">Select your prize above</p>
                </div>
            )}
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
                className={`flex flex-col items-center w-full will-change-transform ${isSpinning ? "animate-spin-scroll blur-[2px]" : "transition-transform duration-100"}`}
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
