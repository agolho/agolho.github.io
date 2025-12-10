"use client";

import { useState } from 'react';

export default function QuestLog() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="w-full max-w-4xl liquid-glass p-8">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-4xl font-serif text-gold gold-shimmer mb-1">
                        High Stakes
                    </h2>
                    <p className="text-sm font-mono text-slate-400 uppercase tracking-widest">
                        Active Bets & Wagers
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                <BettingSlip
                    title="Baker's Calculator"
                    desc="Bread recipe hydration engine"
                    odds="1 : 1.5"
                    payout="$5k"
                    status="Cashed Out"
                    link="https://agolho.github.io/ShokupanCalculator/"
                    type="Win"
                />
                <BettingSlip
                    title="Free-Tuner"
                    desc="Audio DSP pitch detection system"
                    odds="1 : 2.0"
                    payout="$8k"
                    status="Cashed Out"
                    link="https://free-tuner.vercel.app"
                    type="Win"
                />
                <BettingSlip
                    title="NFT Gaming Platform"
                    desc="Web3 Wallet Integration & Unity WebGL"
                    odds="1 : 100"
                    payout="JACKPOT"
                    status="NDA Lock"
                    link="#"
                    onClick={() => setIsModalOpen(true)}
                    type="Locked"
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-slate-950 border border-gold-gradient rounded-xl p-8 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gold" />

                        <h3 className="text-2xl font-serif font-bold text-gold mb-2">Restricted Access</h3>
                        <p className="text-slate-400 mb-6 font-mono text-sm leading-relaxed">
                            This wager is currently under a Non-Disclosure Agreement (NDA).
                            Access is restricted to authorized personnel only.
                        </p>

                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors font-mono text-xs uppercase tracking-widest"
                            >
                                Fold
                            </button>
                            <a
                                href="mailto:contact@agolho.com"
                                className="px-6 py-2 rounded-lg bg-gold text-black font-bold hover:bg-yellow-400 transition-colors font-mono text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20"
                            >
                                Contact Pit Boss
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

interface TicketProps {
    title: string;
    desc: string;
    odds: string;
    payout: string;
    status: string;
    link: string;
    type: 'Win' | 'Locked' | 'Loss';
    onClick?: () => void;
}

function BettingSlip({ title, desc, odds, payout, status, link, type, onClick }: TicketProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <a
            href={link}
            onClick={handleClick}
            className="block group relative"
        >
            {/* Ticket Shape */}
            <div className="bg-white/5 border border-white/10 hover:border-gold transition-all duration-300 p-6 md:p-8 relative overflow-hidden clip-ticket">

                {/* Perforated Edge Visuals (CSS tricks could go here, simplified for now) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#181015] rounded-r-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#181015] rounded-l-full" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pl-4 pr-4">

                    {/* Left: Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`font-mono text-xs px-2 py-1 border rounded ${type === 'Win' ? 'border-green-500 text-green-400 bg-green-500/10' : 'border-red-500 text-red-400 bg-red-500/10'}`}>
                                {status.toUpperCase()}
                            </span>
                            <span className="font-mono text-xs text-slate-500 tracking-widest">ODDS: {odds}</span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-slate-200 group-hover:text-gold transition-colors">
                            {title}
                        </h3>
                        <p className="text-slate-400 font-sans text-sm mt-1">{desc}</p>
                    </div>

                    {/* Right: Payout */}
                    <div className="text-right min-w-[120px]">
                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Potential Payout</div>
                        <div className={`text-3xl font-mono font-bold ${type === 'Locked' ? 'text-red-500 animate-pulse' : 'text-gold'}`}>
                            {payout}
                        </div>
                    </div>
                </div>

                {/* "Void" stamp overlay for locked items? Or just watermark */}
                <div className="absolute top-[-20px] right-[100px] text-[100px] text-white/5 font-serif font-bold rotate-12 pointer-events-none select-none">
                    BET
                </div>
            </div>
        </a>
    )
}
