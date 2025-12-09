"use client";

import { useState } from 'react';

export default function QuestLog() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                <span className="text-yellow-500">Quest Log</span>
                <span className="text-sm font-normal text-slate-500 uppercase tracking-widest">Active Projects</span>
            </h2>

            <div className="space-y-4">
                <QuestItem
                    title="Baker's Calculator"
                    desc="A precise hydration and detailed recipe calculator for bread making."
                    tags={["React", "Algorithms", "Utility"]}
                    reward="XP: 500"
                    status="Complete"
                    link="https://agolho.github.io/ShokupanCalculator/"
                />
                <QuestItem
                    title="Deploy Free-Tuner"
                    desc="A browser-based guitar tuner with visual pitch detection and high accuracy."
                    tags={["Web Audio API", "Canvas", "Next.js"]}
                    reward="XP: 800"
                    status="Complete"
                    link="https://free-tuner.vercel.app"
                />
                <QuestItem
                    title="NFT-Gated Gaming Platform"
                    desc="Exclusive WebGL game access for NFT holders with wallet integration."
                    tags={["Web3", "Unity", "Next.js"]}
                    reward="XP: 1000"
                    status="Under NDA"
                    link="#"
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">Restricted Access</h3>
                        <p className="text-slate-400 mb-6">
                            This project is currently under a Non-Disclosure Agreement (NDA). Please contact me directly for more information or access requests.
                        </p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <a
                                href="mailto:contact@agolho.com"
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors"
                            >
                                Contact via Email
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

interface QuestItemProps {
    title: string;
    desc: string;
    tags: string[];
    reward: string;
    status: string;
    link: string;
    onClick?: () => void;
}

function QuestItem({ title, desc, tags, reward, status, link, onClick }: QuestItemProps) {
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
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-900/40 border border-slate-800 p-6 rounded-lg hover:bg-slate-800/60 hover:border-yellow-500/50 transition-all group cursor-pointer"
        >
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${status === 'Complete' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400'}`}>
                        {status}
                    </span>
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-yellow-400 transition-colors">{title}</h3>
                </div>
                <p className="text-slate-400 mb-3">{desc}</p>
                <div className="flex gap-2">
                    {tags.map((t, i) => (
                        <span key={i} className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded">{t}</span>
                    ))}
                </div>
            </div>

            <div className="mt-4 md:mt-0 md:pl-6 flex flex-col items-end min-w-[100px]">
                <div className="text-yellow-500 font-mono text-sm">{reward}</div>
                <div className="text-slate-600 text-xs mt-1 group-hover:text-yellow-400/70">Click to View &gt;</div>
            </div>
        </a>
    )
}
