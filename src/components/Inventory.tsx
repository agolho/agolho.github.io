"use client";

import React from 'react';

interface SkillItem {
    name: string;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    effect: string;
    flavorText: string;
    icon?: string;
}

const SKILLS: SkillItem[] = [
    {
        name: "Unity3D",
        rarity: "Legendary",
        effect: "+150 Game Logic, Enables 3D Manipulation",
        flavorText: "A powerful engine forged in the fires of C++.",
        icon: "🎮"
    },
    {
        name: "C#",
        rarity: "Legendary",
        effect: "+50 Scripting Speed, -10 Sanity",
        flavorText: "Ideally used with a strongly typed coffee.",
        icon: "📝"
    },
    {
        name: "React / Next.js",
        rarity: "Epic",
        effect: "Summons Component Trees, +40 UI Responsiveness",
        flavorText: "It renders... and then it re-renders.",
        icon: "⚛️"
    },
    {
        name: "TypeScript",
        rarity: "Epic",
        effect: "Prevents 'Undefined is not a function' Curses",
        flavorText: "A shield against the chaos of loose typing.",
        icon: "🛡️"
    },
    {
        name: "Node.js",
        rarity: "Rare",
        effect: "Enables Server-Side Sorcery",
        flavorText: "JavaScript everywhere? It's more likely than you think.",
        icon: "🟢"
    },
    {
        name: "Git",
        rarity: "Rare",
        effect: "Allows Time Travel (Revert Commit)",
        flavorText: "Remember to push before you leave the building.",
        icon: "🌲"
    },
    {
        name: "Firebase",
        rarity: "Common",
        effect: "Instant Backend Deployment",
        flavorText: "Great for when you don't want to manage a server.",
        icon: "🔥"
    },
    {
        name: "Performance Optimization",
        rarity: "Epic",
        effect: "+60 FPS, Removes Lag Spikes",
        flavorText: "Premature optimization is the root of all evil, but this is necessary.",
        icon: "⚡"
    }

];

const RARITY_COLORS = {
    Common: "border-slate-500 text-slate-300",
    Rare: "border-blue-500 text-blue-400",
    Epic: "border-purple-500 text-purple-400",
    Legendary: "border-orange-500 text-orange-400"
};

const RARITY_BG = {
    Common: "bg-slate-900/90",
    Rare: "bg-blue-900/90",
    Epic: "bg-purple-900/90",
    Legendary: "bg-orange-900/90"
};

export default function Inventory() {
    const [selectedSkill, setSelectedSkill] = React.useState<SkillItem | null>(null);

    return (
        <section className="w-full relative">
            <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                <span className="text-indigo-400">Inventory</span>
                <span className="text-sm font-normal text-slate-500 uppercase tracking-widest">Core Competencies</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SKILLS.map((skill, i) => (
                    <InventorySlot
                        key={i}
                        skill={skill}
                        onClick={() => setSelectedSkill(skill)}
                    />
                ))}
            </div>

            {/* Mobile/Detail Modal Overlay */}
            {selectedSkill && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedSkill(null)}
                >
                    <div
                        className={`
                            w-full max-w-sm relative overflow-hidden rounded-xl border-2 p-1 shadow-2xl animate-in zoom-in-95 duration-200
                            ${RARITY_COLORS[selectedSkill.rarity].split(' ')[0]} 
                            bg-slate-900
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Content matching Tooltip style but bigger */}
                        <div className="bg-[#1a1b26] rounded-lg p-6 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-2 right-2 text-slate-500 hover:text-white"
                            >
                                ✕
                            </button>

                            <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${RARITY_COLORS[selectedSkill.rarity].split(' ')[1]}`}>
                                {selectedSkill.rarity} Item
                            </div>

                            <div className="flex items-center gap-4 mb-4 border-b border-slate-700 pb-4">
                                <div className="text-4xl">{selectedSkill.icon}</div>
                                <div className="text-2xl font-bold text-white">
                                    {selectedSkill.name}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Effect</div>
                                    <div className="text-green-400 font-medium">
                                        {selectedSkill.effect}
                                    </div>
                                </div>

                                <div className="bg-slate-950/50 p-3 rounded border border-slate-800">
                                    <div className="text-sm text-slate-400 italic font-serif leading-relaxed">
                                        "{selectedSkill.flavorText}"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function InventorySlot({ skill, onClick }: { skill: SkillItem, onClick: () => void }) {
    return (
        <div
            className="group relative"
            onClick={onClick}
        >
            {/* Slot Container */}
            <div className={`
                h-24 md:h-32 bg-slate-900/50 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200
                hover:scale-105 hover:bg-slate-800 active:scale-95
                ${RARITY_COLORS[skill.rarity].split(' ')[0]}
            `}>
                <div className="text-3xl md:text-4xl mb-2">{skill.icon}</div>
                <div className="text-xs md:text-sm font-bold text-slate-200 text-center px-1">{skill.name}</div>
            </div>

            {/* RPG Tooltip - Only visible on Desktop (md+) on hover */}
            <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
                <div className="bg-[#1a1b26] border-2 border-[#414868] rounded-lg p-3 shadow-2xl text-left relative overflow-hidden">
                    {/* Rarity Header */}
                    <div className={`text-sm font-bold uppercase tracking-wider mb-1 ${RARITY_COLORS[skill.rarity].split(' ')[1]}`}>
                        {skill.rarity} Item
                    </div>

                    {/* Name */}
                    <div className="text-lg font-bold text-white mb-2 border-b border-slate-700 pb-1">
                        {skill.name}
                    </div>

                    {/* Effect */}
                    <div className="text-sm text-green-400 mb-2">
                        {skill.effect}
                    </div>

                    {/* Flavor Text */}
                    <div className="text-xs text-slate-500 italic font-serif">
                        "{skill.flavorText}"
                    </div>

                    {/* Decorative Corner (Optional) */}
                    <div className="absolute top-0 right-0 p-1">
                        <div className={`w-2 h-2 rounded-full ${RARITY_COLORS[skill.rarity].replace('border-', 'bg-').split(' ')[0]}`} />
                    </div>
                </div>

                {/* Tooltip Arrow */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-[#1a1b26] border-r-2 border-b-2 border-[#414868] rotate-45 transform" />
            </div>
        </div>
    );
}
