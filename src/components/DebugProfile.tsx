"use client";

import React, { useState, useEffect, useRef } from "react";

const LOG_LINES = [
    "> INIT_CORE... OK",
    "> MEMORY_CHECK... OK",
    "> LOADING_ASSETS... OK",
    "> CHECKING_RNG_INTEGRITY... PASS",
    "> ESTABLISHING_SECURE_CONNECTION... OK",
    "> DECRYPTING_VAULT... DONE",
    "> READY."
];

export default function DebugProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const [logContent, setLogContent] = useState<string[]>([]);
    const lineIndexRef = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const toggleDebug = () => {
        if (isOpen) {
            // Close
            setIsOpen(false);
            setLogContent([]);
            lineIndexRef.current = 0;
            if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
            // Open
            setIsOpen(true);
            setLogContent([]);
            lineIndexRef.current = 0;

            // Start typing animation
            intervalRef.current = setInterval(() => {
                if (lineIndexRef.current < LOG_LINES.length) {
                    setLogContent(prev => [...prev, LOG_LINES[lineIndexRef.current]]);
                    lineIndexRef.current++;
                } else {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }
            }, 300); // Speed of log printing
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="relative group cursor-pointer z-50" onClick={toggleDebug}>
            {/* Spinning 'Sha Sha' Glow Ring */}
            <div className={`absolute inset-[-10px] rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-200 to-yellow-600 blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100 animate-spin-fast' : 'opacity-70 animate-spin-slow group-hover:opacity-100'}`} />

            {/* Static Gold Rim Container */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-[4px] bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 shadow-[0_0_50px_rgba(234,179,8,0.6)] relative z-10">
                {/* Inner Dark Rim */}
                <div className="w-full h-full rounded-full p-[4px] bg-black">
                    {/* Dashed Chip Pattern */}
                    <div className="w-full h-full rounded-full border-2 border-dashed border-yellow-500/50 flex items-center justify-center overflow-hidden bg-slate-900 relative">
                        <img
                            src="/avatarCasino.png"
                            alt="Avatar"
                            className={`w-full h-full object-cover relative z-10 transition-transform duration-500 ${isOpen ? 'scale-90 grayscale' : 'hover:scale-110'}`}
                        />

                        {/* Gloss Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-20" />

                        {/* CRT Scanline Overlay when active */}
                        {isOpen && (
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-30 bg-[length:100%_2px,3px_100%] pointer-events-none" />
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Toggle Badge */}
            <div className={`absolute -bottom-4 -right-10 z-30 px-3 py-1 rounded border-2 shadow-lg transform transition-all duration-300 font-mono text-xs font-bold
        ${isOpen
                    ? 'bg-black border-green-500 text-green-500 rotate-0 translate-y-1'
                    : 'bg-gradient-to-r from-yellow-600 to-yellow-400 border-white text-black rotate-[-5deg] group-hover:rotate-0'
                }`}
            >
                {isOpen ? '>_ DEBUG: ON' : '>DEV'}
            </div>

            {/* System Log Overlay */}
            {isOpen && (
                <div className="absolute top-0 left-full ml-4 w-64 md:w-80 bg-black/90 border border-green-500/50 rounded p-4 shadow-[0_0_20px_rgba(34,197,94,0.2)] backdrop-blur-sm z-40 animate-in fade-in slide-in-from-left-4 duration-200">
                    <div className="font-mono text-xs text-green-500 space-y-1 h-32 overflow-hidden flex flex-col justify-end">
                        {logContent.map((line, i) => (
                            <div key={i} className="animate-in fade-in duration-100">{line}</div>
                        ))}
                        {logContent.length < LOG_LINES.length && (
                            <div className="animate-pulse">_</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
