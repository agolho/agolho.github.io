"use client";

import React from 'react';

interface SkillItem {
    name: string;
    rarity: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
    effect: string;
    flavorText: string;
    icon?: string;
    value: string;
}

const SKILLS: SkillItem[] = [
    {
        name: "Unity3D",
        rarity: "Diamond",
        effect: "Enables 3D World Construction",
        flavorText: "The engine that drives the industry.",
        icon: "🎲",
        value: "$500k"
    },
    {
        name: "C#",
        rarity: "Diamond",
        effect: "High Performance Scripting",
        flavorText: "Precision engineered for reliability.",
        icon: "💎",
        value: "$500k"
    },
    {
        name: "React",
        rarity: "Gold",
        effect: "Dynamic UI Creation",
        flavorText: "The interface of the future.",
        icon: "⚜️",
        value: "$250k"
    },
    {
        name: "TypeScript",
        rarity: "Gold",
        effect: "Type Safety Shield",
        flavorText: "Prevents costly errors on the floor.",
        icon: "⚖️",
        value: "$250k"
    },
    {
        name: "Node.js",
        rarity: "Silver",
        effect: "Backend Operations",
        flavorText: "The invisible hand moving the chips.",
        icon: "🔗",
        value: "$100k"
    },
    {
        name: "Git",
        rarity: "Silver",
        effect: "Version Control Safety",
        flavorText: "Insurance against catastrophic loss.",
        icon: "🏦",
        value: "$100k"
    },
    {
        name: "Firebase",
        rarity: "Bronze",
        effect: "Rapid Deployment",
        flavorText: "Standard issue backend utility.",
        icon: "🔥",
        value: "$50k"
    },
    {
        name: "Optimization",
        rarity: "Gold",
        effect: "Frame Rate Boost",
        flavorText: "Efficiency equals profit.",
        icon: "⚡",
        value: "$250k"
    }

];

const CHIP_STYLES = {
    Bronze: "border-orange-700 text-orange-200 bg-gradient-to-br from-orange-900 to-black",
    Silver: "border-slate-400 text-slate-100 bg-gradient-to-br from-slate-600 to-black",
    Gold: "border-yellow-500 text-yellow-100 bg-gradient-to-br from-yellow-600 to-black shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    Diamond: "border-cyan-400 text-cyan-100 bg-gradient-to-br from-cyan-600 to-black shadow-[0_0_20px_rgba(34,211,238,0.4)]"
};

export default function Inventory() {
    const [selectedSkill, setSelectedSkill] = React.useState<SkillItem | null>(null);

    return (
        <section className="w-full liquid-glass p-8 relative">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-4xl font-serif text-gold gold-shimmer mb-1">
                        The Vault
                    </h2>
                    <p className="text-sm font-mono text-slate-400 uppercase tracking-widest">
                        High Value Assets
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-xs text-slate-500 uppercase tracking-widest">Total Valuation</div>
                    <div className="text-xl font-mono text-green-400">$2.5M+</div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {SKILLS.map((skill, i) => (
                    <ChipItem
                        key={i}
                        skill={skill}
                        onClick={() => setSelectedSkill(skill)}
                    />
                ))}
            </div>

            {/* Modal - Safety Deposit Box View */}
            {selectedSkill && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setSelectedSkill(null)}
                >
                    <div
                        className={`
                            w-full max-w-sm relative overflow-hidden rounded-2xl border-2 p-1 shadow-2xl animate-in zoom-in-95 duration-200
                            ${CHIP_STYLES[selectedSkill.rarity].split(' ')[0]} 
                            bg-slate-950
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-[#0f0f12] rounded-xl p-8 relative flex flex-col items-center text-center">
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-4 right-4 text-slate-500 hover:text-white"
                            >
                                ✕
                            </button>

                            <div className="w-24 h-24 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center text-5xl mb-6 shadow-inner bg-black/50">
                                {selectedSkill.icon}
                            </div>

                            <div className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-500">
                                {selectedSkill.rarity} ASSET
                            </div>

                            <h3 className="text-3xl font-serif font-bold text-white mb-2">
                                {selectedSkill.name}
                            </h3>

                            <div className="text-gold font-mono text-xl mb-6 border-b border-white/10 pb-4 w-full">
                                EST. VALUE: {selectedSkill.value}
                            </div>

                            <div className="space-y-4 w-full text-left">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Utility</div>
                                    <div className="text-green-400 font-medium">
                                        {selectedSkill.effect}
                                    </div>
                                </div>

                                <div className="bg-black/40 p-4 rounded border border-white/5 mx-[-1rem]">
                                    <div className="text-sm text-slate-300 italic font-serif leading-relaxed">
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

function ChipItem({ skill, onClick }: { skill: SkillItem, onClick: () => void }) {
    return (
        <div
            className="group relative flex flex-col items-center"
            onClick={onClick}
        >
            {/* Poker Chip Visual */}
            <div className={`
                w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-dashed 
                flex items-center justify-center cursor-pointer transition-all duration-300
                hover:scale-110 hover:-translate-y-2 hover:rotate-3 shadow-xl
                ${CHIP_STYLES[skill.rarity]}
            `}>
                <div className="w-[85%] h-[85%] rounded-full border border-white/10 bg-black/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-3xl md:text-5xl drop-shadow-md filter">{skill.icon}</span>
                </div>
            </div>

            {/* Label below chip */}
            <div className="mt-4 text-center">
                <div className="font-serif font-bold text-slate-200 text-lg group-hover:text-gold transition-colors">{skill.name}</div>
                <div className="font-mono text-xs text-slate-500">{skill.value}</div>
            </div>
        </div>
    );
}
