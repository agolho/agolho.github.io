import { useState } from "react";
import { RTP_PERCENTAGE, VOLATILITY_LEVEL } from "../utils/slotAlgorithm";

export default function ProbabilityAccordion() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-56 border border-white/10 rounded-lg overflow-hidden backdrop-blur-md bg-black/40 shadow-xl transition-all duration-300 hover:border-white/30 group">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-yellow-400 transition-colors"
            >
                <span>Probabilities</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-yellow-500' : ''}`}>
                    ▼
                </span>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-4 bg-black/40 text-xs font-mono text-slate-500 space-y-2 border-t border-white/5">
                    <div className="flex justify-between">
                        <span>RTP (Return to Player):</span>
                        <span className="text-yellow-500/80">{RTP_PERCENTAGE}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Volatility:</span>
                        <span className="text-red-400/80">{VOLATILITY_LEVEL}</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-white/5 text-center">
                        <a
                            href="https://gist.github.com/agolho/cebbbf6c00f292d03fe4b247a03d3f0e"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300 transition-all"
                        >
                            View Algorithm Gist
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
