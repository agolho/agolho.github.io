"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import BackgroundMusic from "./BackgroundMusic";
import BonusGameModal from "./BonusGameModal";
import CoinRain from "./CoinRain";
import GoldLiquidShader from "./GoldLiquidShader";
import { spinReel } from "../utils/slotAlgorithm";
import ProbabilityAccordion from "./ProbabilityAccordion";

const SYMBOLS = ["🍒", "🍋", "🍉", "💎", "🍀"];
const WINNING_SYMBOL = "💎";

type ReelState = 'stopped' | 'spinning' | 'braking';

// Sound Helper
const playSound = (type: 'stop' | 'anticipation' | 'win') => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'stop') {
        // Mechanical Click
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'anticipation') {
        // Rising tension
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 2.0);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.0);
        osc.start();
        osc.stop(ctx.currentTime + 2.0);
    }
};

export default function SlotMachine() {
    const [results, setResults] = useState<number[]>([0, 1, 2]);
    const [reelStates, setReelStates] = useState<ReelState[]>(['stopped', 'stopped', 'stopped']);
    const [isWon, setIsWon] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnticipating, setIsAnticipating] = useState(false);

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

    const forceWinRef = useRef(false);

    // Konami Code & Easter Egg Listener
    useEffect(() => {
        // Expose Cheat Code
        (window as any).winJackpot = () => {
            console.log("🎲 RIGGING SLOTS... NEXT SPIN WILL WIN! 🎲");
            forceWinRef.current = true;
            return "Cheat Activated: Spin now!";
        };
        console.log("%cHey! Want to rig the slots? Run winJackpot() to see the prize.", "color: #FFD700; font-size: 16px; font-weight: bold; background: #000; padding: 4px; border-radius: 4px;");

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
        if (reelStates.some(s => s !== 'stopped')) return;

        // Start all spinning
        setReelStates(['spinning', 'spinning', 'spinning']);
        setIsWon(false);
        setShowBonusModal(false);
        setIsAnticipating(false);

        // Determine results using weighted algorithm
        const newResults = [
            spinReel(),
            spinReel(),
            spinReel()
        ];

        const winningIndex = SYMBOLS.indexOf(WINNING_SYMBOL);

        // Debug/Cheat force win logic (kept for ease of testing)
        if (forceWinRef.current) {
            newResults[0] = winningIndex; newResults[1] = winningIndex; newResults[2] = winningIndex;
            forceWinRef.current = false;
        }

        // Detect anticipation (Reel 1 & 2 are Winning Symbols)
        const willAnticipate = newResults[0] === winningIndex && newResults[1] === winningIndex;

        // TIMING CONFIGURATION
        const reel1Brake = 1000;
        const brakeDuration = 300;

        const reel2Brake = 1500;
        const reel3Brake = willAnticipate ? 4000 : 2000;

        // --- REEL 1 SEQUENCE ---
        setTimeout(() => {
            setReelStates(prev => ['braking', prev[1], prev[2]]);
        }, reel1Brake);

        setTimeout(() => {
            setResults(prev => [newResults[0], prev[1], prev[2]]);
            setReelStates(prev => ['stopped', prev[1], prev[2]]);
            playSound('stop');
        }, reel1Brake + brakeDuration);

        // --- REEL 2 SEQUENCE ---
        setTimeout(() => {
            setReelStates(prev => [prev[0], 'braking', prev[2]]);
        }, reel2Brake);

        setTimeout(() => {
            setResults(prev => [newResults[0], newResults[1], prev[2]]);
            setReelStates(prev => [prev[0], 'stopped', prev[2]]);
            playSound('stop');

            if (willAnticipate) {
                setIsAnticipating(true);
                playSound('anticipation');
            }
        }, reel2Brake + brakeDuration);

        // --- REEL 3 SEQUENCE ---
        setTimeout(() => {
            setReelStates(prev => [prev[0], prev[1], 'braking']);
            // If anticipating, we stop the anticipation sound/effect slightly before the stop? 
            // Or keep it running until hard stop?
            // Usually anticipation keeps pure tension until the brake/stop.
            if (willAnticipate) {
                setIsAnticipating(false); // Stop the "fast" anticipation visual, switch to braking
            }
        }, reel3Brake);

        setTimeout(() => {
            // Reset bonus mode if it was active (one-time bonus)
            if (isBonusMode) {
                setIsBonusMode(false);
            }

            setResults(newResults);
            setReelStates(['stopped', 'stopped', 'stopped']);
            playSound('stop');

            // Check win
            if (newResults[0] === newResults[1] && newResults[1] === newResults[2] && newResults[0] === winningIndex) {
                setIsWon(true);
                setIsBonusMode(true); // Win triggers bonus mode too!
                triggerConfetti();
                setTimeout(() => setShowBonusModal(true), 1000); // Delay modal slightly
            }
        }, reel3Brake + brakeDuration);
    };


    return (
        <section className="flex flex-col items-center gap-8 w-full relative">
            {isWon && <CoinRain />}
            {isBonusMode && <BackgroundMusic />}

            {showBonusModal && <BonusGameModal onClose={() => setShowBonusModal(false)} />}

            {/* Minimalist Reels Container */}
            <div
                className={`w-full relative group liquid-glass overflow-hidden transition-all duration-500 border-yellow-500/30 shadow-2xl ${isBonusMode ? 'border-yellow-500/50 shadow-yellow-500/40' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Gold Liquid Shader Background */}
                <div className="absolute inset-0 z-0">
                    <GoldLiquidShader />
                    {/* Dark overlay to ensure text/reels contrast */}
                    <div className="absolute inset-0 bg-black/60 z-10" />
                </div>

                {/* Instruction Label */}
                <div className={`absolute top-3 left-4 z-20 text-xs font-mono tracking-widest uppercase opacity-90 font-bold bg-black/40 px-3 py-1 rounded-full border border-white/10 ${isBonusMode ? 'text-yellow-400' : 'text-slate-300'}`}>
                    {isBonusMode ? "BONUS MODE ACTIVE" : "Match 3 💎 to Unlock"}
                </div>

                {/* Probability Info - Top Right */}
                <div className="absolute top-3 right-4 z-40">
                    <ProbabilityAccordion />
                </div>

                {/* Reels Container - Height matched to 3x Item Height for perfect centering */}
                {/* Mobile: 3 * h-24 (6rem) = 18rem (h-72) */}
                {/* Desktop: 3 * h-32 (8rem) = 24rem (h-96) */}
                <div className="flex justify-around gap-2 md:gap-4 relative z-20 h-72 md:h-96 items-stretch px-8 md:px-12 my-8">
                    {/* Payline Frame - Arrows Only - Centered */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-24 z-30 pointer-events-none">
                        {/* Left Arrow */}
                        <div className={`absolute left-2 top-1/2 -translate-y-1/2 text-5xl md:text-6xl transition-all duration-300 ${isWon ? 'text-yellow-400 animate-pulse drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] scale-110' : 'text-slate-700/80'}`}>▶</div>
                        {/* Right Arrow */}
                        <div className={`absolute right-2 top-1/2 -translate-y-1/2 text-5xl md:text-6xl transition-all duration-300 ${isWon ? 'text-yellow-400 animate-pulse drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] scale-110' : 'text-slate-700/80'}`}>◀</div>
                    </div>

                    {results.map((resultIndex, i) => (
                        <Reel
                            key={i}
                            symbolIndex={resultIndex}
                            state={reelStates[i]}
                            isAnticipating={isAnticipating && i === 2}
                        />
                    ))}
                </div>

                {/* Spin Button - Floating at 6 o'clock position */}
                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 ${reelStates.some(s => s !== 'stopped') ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 hover:scale-110 scale-100'}`}>
                    {/* Rotating Shine Container */}
                    <div className="relative p-[3px] rounded-full overflow-hidden group/btn">
                        {/* Spinning Conic Gradient - Always Visible */}
                        <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin-slow opacity-70 group-hover/btn:opacity-100 transition-opacity duration-500" />

                        <button
                            onClick={spin}
                            disabled={reelStates.some(s => s !== 'stopped')}
                            className={`relative px-12 py-4 rounded-full font-bold shadow-2xl hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] active:scale-95 transition-all text-base tracking-[0.2em] uppercase disabled:opacity-50 disabled:cursor-not-allowed border backdrop-blur-md overflow-hidden ${isBonusMode ? 'bg-yellow-500 text-black border-yellow-400' : 'bg-gradient-to-r from-red-700 to-red-600 text-white border-red-500'}`}
                        >
                            {/* Glass Sheen */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <span className="relative z-10 flex items-center gap-2">
                                {isBonusMode ? "SPIN BONUS" : "SPIN"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {!showBonusModal && isWon && (
                <div className="text-center animate-fade-in text-yellow-400 mt-4">
                    <p className="tracking-widest uppercase">Select your prize above</p>
                </div>
            )}
        </section>
    );
}

function Reel({ symbolIndex, state, isAnticipating = false }: { symbolIndex: number, state: ReelState, isAnticipating?: boolean }) {
    // 3 Sets of symbols to ensure we always have neighbors for the 3-row view
    const strip = [...SYMBOLS, ...SYMBOLS, ...SYMBOLS];

    // Target the middle set (index + length)
    const targetIndex = symbolIndex + SYMBOLS.length;

    // Animation Logic
    const isSpinning = state === 'spinning';
    const isBraking = state === 'braking';
    const isMoving = isSpinning || isBraking;

    // Determine Animation Class
    let animationClass = "transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1.2)]"; // Default stopped
    if (isSpinning) animationClass = "animate-spin-scroll";
    if (isBraking) animationClass = "animate-spin-braking";

    return (
        // Container Full Height
        // Removed Mask Gradient so edges are visible ("Recessed Look")
        <div className={`w-1/3 h-full bg-slate-900 rounded-lg overflow-hidden relative border-x border-slate-700/50 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] transition-all duration-300 ${isAnticipating ? 'shadow-[0_0_30px_rgba(255,215,0,0.4)] border-yellow-500/50' : ''}`}>

            {/* Top Shine/Shadow for Curve - Opaque Black Fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />

            <div
                className={`flex flex-col items-center w-full will-change-transform ${animationClass}`}
                style={{
                    // Shift to target, then shift down 1 unit (100% / strip-length) to center it
                    transform: isMoving ? undefined : `translateY(calc(-${targetIndex} * (100% / ${strip.length}) + (100% / ${strip.length})))`,
                    animationDuration: isAnticipating ? '0.08s' : undefined
                }}
            >
                {strip.map((char, i) => {
                    // Dynamic Sizing Logic for "Fisheye" effect
                    const isWinner = !isMoving && i === targetIndex;
                    const isNeighbor = !isMoving && Math.abs(i - targetIndex) === 1;

                    // Blur Logic
                    let blurClass = 'opacity-80 blur-[1px]'; // Standard spin blur
                    if (isBraking) blurClass = 'opacity-90 blur-[0.5px]'; // Less blur while braking
                    if (isAnticipating) blurClass = 'opacity-70 blur-[2px]'; // Super fast blur

                    return (
                        // Item Height relative to container. 
                        <div
                            key={i}
                            className={`h-24 md:h-32 w-full flex items-center justify-center select-none shrink-0 transition-all duration-300
                                ${isMoving
                                    ? `text-6xl md:text-8xl ${blurClass}`
                                    : isWinner
                                        ? 'text-8xl md:text-9xl text-yellow-400 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] scale-110 z-10 opacity-100'
                                        : isNeighbor
                                            ? 'text-4xl md:text-6xl opacity-30 blur-[2px] scale-75'
                                            : 'text-6xl md:text-8xl opacity-80 blur-[1px]'
                                }
                            `}
                        >
                            {char}
                        </div>
                    );
                })}
            </div>

            {/* Bottom Shine/Shadow for Curve - Opaque Black Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
        </div>
    )
}
