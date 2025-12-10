"use client";

import React from 'react';

export default function JackpotFooter() {
    const [displayText, setDisplayText] = React.useState("0");
    const containerRef = React.useRef<HTMLElement>(null);
    const FINAL_TEXT = "DESIGNED WITH ❤️ BY YUSUF";
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Start Animation
                        if (intervalRef.current) clearInterval(intervalRef.current);

                        let currentLength = 1;
                        let resolveIndex = 0;
                        const targetLength = FINAL_TEXT.length;

                        // Phase 1: Grow Numbers (0 -> 10^24)
                        // Phase 2: Resolve Text

                        intervalRef.current = setInterval(() => {
                            // Phase 1: Grow Length
                            if (currentLength < targetLength) {
                                currentLength++;
                                // Generate random number string of currentLength
                                let randomStr = "";
                                for (let i = 0; i < currentLength; i++) {
                                    randomStr += Math.floor(Math.random() * 10).toString();
                                }
                                setDisplayText(randomStr);
                            }
                            // Phase 2: Resolve Characters
                            else {
                                if (resolveIndex <= targetLength) {
                                    const solvedPart = FINAL_TEXT.substring(0, resolveIndex);
                                    let randomPart = "";
                                    for (let i = 0; i < targetLength - resolveIndex; i++) {
                                        // Random numbers or mix of chars? User said "10^24" so keep it numbers for the 'scramble' part
                                        randomPart += Math.floor(Math.random() * 10).toString();
                                    }
                                    setDisplayText(solvedPart + randomPart);
                                    resolveIndex++;
                                } else {
                                    // Done
                                    if (intervalRef.current) clearInterval(intervalRef.current);
                                    setDisplayText(FINAL_TEXT);
                                }
                            }
                        }, 50); // Speed of update

                    } else {
                        // Reset when out of view
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        setDisplayText("0");
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Interactive Font Sizing based on Length to ensure 10^0 fits as well as 10^24
    // User requested fixed size "small from start"

    return (
        <footer ref={containerRef} className="w-full max-w-lg mx-auto py-8">
            <div className="relative group">
                {/* Outer Gold Casing */}
                <div className="bg-gradient-to-b from-yellow-600 via-yellow-400 to-yellow-800 p-1 rounded-lg shadow-lg">
                    {/* Inner Black Bezel */}
                    <div className="bg-black p-2 rounded border border-yellow-900 shadow-[inset_0_2px_10px_rgba(0,0,0,1)]">

                        {/* Digital Display Screen */}
                        <div className="bg-red-950/30 border border-red-900/50 rounded flex flex-col items-center justify-center py-2 relative overflow-hidden h-16">

                            {/* Scanlines */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-50" />

                            <div className="text-[10px] text-yellow-600 font-mono tracking-widest uppercase mb-1 z-20">Current Credits</div>

                            {/* Fixed Font Size: Matches final text size always */}
                            <div className="font-mono font-bold text-yellow-400 tracking-wider z-20 animate-pulse drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] text-xs sm:text-sm md:text-base">
                                {displayText}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reflection/Sheen */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            </div>
        </footer>
    );
}
