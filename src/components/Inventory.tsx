"use client";

import React from 'react';

// Replaced SkillItem with ProjectItem
interface ProjectItem {
    id: string;
    codename: string;
    theme: 'Neon' | 'Pharaoh' | 'Wilds' | 'Space' | 'Ocean' | 'Dragon'; // Added themes for visual variety
    status: 'SHIPPED / LIVE';
    techSpecs: string;
    uptime: string;
    icon: string;
}

const PROJECTS: ProjectItem[] = [
    {
        id: "P-001",
        codename: "Project: Pharaoh",
        theme: "Pharaoh",
        status: "SHIPPED / LIVE",
        techSpecs: "Lead Engineer on major engine upgrade from Unity 2018 to 2022 LTS.",
        uptime: "99.99%",
        icon: "🏺"
    },
    {
        id: "P-002",
        codename: "Project: Neon",
        theme: "Neon",
        status: "SHIPPED / LIVE",
        techSpecs: "Developed custom Editor tools to automate reel strip configuration.",
        uptime: "99.95%",
        icon: "🕹️"
    },
    {
        id: "P-003",
        codename: "Project: Wilds",
        theme: "Wilds",
        status: "SHIPPED / LIVE",
        techSpecs: "Refactored legacy game logic for new jurisdictional compliance standards.",
        uptime: "99.99%",
        icon: "🦁"
    },
    {
        id: "P-004",
        codename: "Project: Void",
        theme: "Space",
        status: "SHIPPED / LIVE",
        techSpecs: "Fixed critical memory leak in Attract Mode causing crash after 48h.",
        uptime: "100.0%",
        icon: "🌌"
    },
    {
        id: "P-005",
        codename: "Project: Tides",
        theme: "Ocean",
        status: "SHIPPED / LIVE",
        techSpecs: "Optimized texture compression pipeline, reducing build size by 35%.",
        uptime: "99.98%",
        icon: "🌊"
    },
    {
        id: "P-006",
        codename: "Project: Scales",
        theme: "Dragon",
        status: "SHIPPED / LIVE",
        techSpecs: "Migrated full project codebase to Unity 6 rendering pipeline.",
        uptime: "99.99%",
        icon: "🐉"
    },
    {
        id: "P-007",
        codename: "Project: Ruby",
        theme: "Neon",
        status: "SHIPPED / LIVE",
        techSpecs: "Resolved complex race condition in bonus round state machine.",
        uptime: "99.90%",
        icon: "💎"
    },
    {
        id: "P-008",
        codename: "Project: Oasis",
        theme: "Pharaoh",
        status: "SHIPPED / LIVE",
        techSpecs: "Created automated symbol validation tool for designers.",
        uptime: "99.99%",
        icon: "🌴"
    },
    {
        id: "P-009",
        codename: "Project: Storm",
        theme: "Wilds",
        status: "SHIPPED / LIVE",
        techSpecs: "Standardized math engine implementation across 15+ legacy titles.",
        uptime: "99.99%",
        icon: "⚡"
    },
    {
        id: "P-010",
        codename: "Project: Nebula",
        theme: "Space",
        status: "SHIPPED / LIVE",
        techSpecs: "Debugged and fixed intermittent garbage collection spikes on low-end cabinets.",
        uptime: "99.99%",
        icon: "☄️"
    },
    {
        id: "P-011",
        codename: "Project: Deep",
        theme: "Ocean",
        status: "SHIPPED / LIVE",
        techSpecs: "Implemented strict outcome validation logic for regulatory recall.",
        uptime: "99.97%",
        icon: "🦈"
    },
    {
        id: "P-012",
        codename: "Project: Ember",
        theme: "Dragon",
        status: "SHIPPED / LIVE",
        techSpecs: "Architected component-based UI system replacing legacy immediate mode GUI.",
        uptime: "99.99%",
        icon: "🔥"
    }
];

// Tech Stack Data
interface TechTool {
    name: string;
    icon: string;
    desc: string;
}

interface TechCategory {
    title: string;
    style: string;
    tools: TechTool[];
}

const ARMORY: TechCategory[] = [
    {
        title: "Operations",
        style: "border-orange-500/30 bg-orange-900/10 text-orange-400",
        tools: [
            { name: "C#", icon: "👑", desc: "Memory Mgmt & Threading" },
            { name: "Unity3D", icon: "💎", desc: "DOTS, ECS, Custom Render" },
            { name: "Visual Studio", icon: "🍋", desc: "Debugging & Profiling" },
            { name: "Git / Perforce", icon: "🍉", desc: "Version Control at Scale" }
        ]
    },
    {
        title: "Architecture",
        style: "border-blue-500/30 bg-blue-900/10 text-blue-400",
        tools: [
            { name: "State Machines", icon: "🍒", desc: "Deterministic Logic" },
            { name: "Command Pattern", icon: "🍇", desc: "Replay Systems" },
            { name: "Serialization", icon: "🍊", desc: "JSON / Protobuf" },
            { name: "Addressables", icon: "🍀", desc: "Asset Bundles" }
        ]
    },
    {
        title: "R&D Lab",
        style: "border-pink-500/30 bg-pink-900/10 text-pink-400",
        tools: [
            { name: "React", icon: "💎", desc: "UI Experiments" },
            { name: "TypeScript", icon: "👑", desc: "Type Safety" },
            { name: "Tailwind", icon: "🍒", desc: "Rapid Styling" },
            { name: "WebGL", icon: "🍋", desc: "Shaders & FX" }
        ]
    }
];

// Aesthetic styles for different project themes
const THEME_STYLES: Record<string, { rim: string; face: string; accent: string }> = {
    Pharaoh: {
        rim: "conic-gradient(#854d0e 0deg 15deg, #fef08a 15deg 30deg, #854d0e 30deg 45deg, #fef08a 45deg 60deg, #854d0e 60deg 75deg, #fef08a 75deg 90deg, #854d0e 90deg 105deg, #fef08a 105deg 120deg, #854d0e 120deg 135deg, #fef08a 135deg 150deg, #854d0e 150deg 165deg, #fef08a 165deg 180deg, #854d0e 180deg 195deg, #fef08a 195deg 210deg, #854d0e 210deg 225deg, #fef08a 225deg 240deg, #854d0e 240deg 255deg, #fef08a 255deg 270deg, #854d0e 270deg 285deg, #fef08a 285deg 300deg, #854d0e 300deg 315deg, #fef08a 315deg 330deg, #854d0e 330deg 345deg, #fef08a 345deg 360deg)",
        face: "bg-gradient-to-br from-yellow-800 to-yellow-950",
        accent: "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
    },
    Neon: {
        rim: "conic-gradient(#c026d3 0deg 15deg, #f0abfc 15deg 30deg, #c026d3 30deg 45deg, #f0abfc 45deg 60deg, #c026d3 60deg 75deg, #f0abfc 75deg 90deg, #c026d3 90deg 105deg, #f0abfc 105deg 120deg, #c026d3 120deg 135deg, #f0abfc 135deg 150deg, #c026d3 150deg 165deg, #f0abfc 165deg 180deg, #c026d3 180deg 195deg, #f0abfc 195deg 210deg, #c026d3 210deg 225deg, #f0abfc 225deg 240deg, #c026d3 240deg 255deg, #f0abfc 255deg 270deg, #c026d3 270deg 285deg, #f0abfc 285deg 300deg, #c026d3 300deg 315deg, #f0abfc 315deg 330deg, #c026d3 330deg 345deg, #f0abfc 345deg 360deg)",
        face: "bg-gradient-to-br from-fuchsia-800 to-fuchsia-950",
        accent: "border-fuchsia-500/50 shadow-[0_0_15px_rgba(192,38,211,0.4)]"
    },
    Wilds: {
        rim: "conic-gradient(#166534 0deg 15deg, #86efac 15deg 30deg, #166534 30deg 45deg, #86efac 45deg 60deg, #166534 60deg 75deg, #86efac 75deg 90deg, #166534 90deg 105deg, #86efac 105deg 120deg, #166534 120deg 135deg, #86efac 135deg 150deg, #166534 150deg 165deg, #86efac 165deg 180deg, #166534 180deg 195deg, #86efac 195deg 210deg, #166534 210deg 225deg, #86efac 225deg 240deg, #166534 240deg 255deg, #86efac 255deg 270deg, #166534 270deg 285deg, #86efac 285deg 300deg, #166534 300deg 315deg, #86efac 315deg 330deg, #166534 330deg 345deg, #86efac 345deg 360deg)",
        face: "bg-gradient-to-br from-green-800 to-green-950",
        accent: "border-green-500/50 shadow-[0_0_15px_rgba(22,163,74,0.4)]"
    },
    Space: {
        rim: "conic-gradient(#4f46e5 0deg 15deg, #c7d2fe 15deg 30deg, #4f46e5 30deg 45deg, #c7d2fe 45deg 60deg, #4f46e5 60deg 75deg, #c7d2fe 75deg 90deg, #4f46e5 90deg 105deg, #c7d2fe 105deg 120deg, #4f46e5 120deg 135deg, #c7d2fe 135deg 150deg, #4f46e5 150deg 165deg, #c7d2fe 165deg 180deg, #4f46e5 180deg 195deg, #c7d2fe 195deg 210deg, #4f46e5 210deg 225deg, #c7d2fe 225deg 240deg, #4f46e5 240deg 255deg, #c7d2fe 255deg 270deg, #4f46e5 270deg 285deg, #c7d2fe 285deg 300deg, #4f46e5 300deg 315deg, #c7d2fe 315deg 330deg, #4f46e5 330deg 345deg, #c7d2fe 345deg 360deg)",
        face: "bg-gradient-to-br from-indigo-800 to-indigo-950",
        accent: "border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
    },
    Ocean: {
        rim: "conic-gradient(#0891b2 0deg 15deg, #a5f3fc 15deg 30deg, #0891b2 30deg 45deg, #a5f3fc 45deg 60deg, #0891b2 60deg 75deg, #a5f3fc 75deg 90deg, #0891b2 90deg 105deg, #a5f3fc 105deg 120deg, #0891b2 120deg 135deg, #a5f3fc 135deg 150deg, #0891b2 150deg 165deg, #a5f3fc 165deg 180deg, #0891b2 180deg 195deg, #a5f3fc 195deg 210deg, #0891b2 210deg 225deg, #a5f3fc 225deg 240deg, #0891b2 240deg 255deg, #a5f3fc 255deg 270deg, #0891b2 270deg 285deg, #a5f3fc 285deg 300deg, #0891b2 300deg 315deg, #a5f3fc 315deg 330deg, #0891b2 330deg 345deg, #a5f3fc 345deg 360deg)",
        face: "bg-gradient-to-br from-cyan-800 to-cyan-950",
        accent: "border-cyan-500/50 shadow-[0_0_15px_rgba(8,145,178,0.4)]"
    },
    Dragon: {
        rim: "conic-gradient(#991b1b 0deg 15deg, #fca5a5 15deg 30deg, #991b1b 30deg 45deg, #fca5a5 45deg 60deg, #991b1b 60deg 75deg, #fca5a5 75deg 90deg, #991b1b 90deg 105deg, #fca5a5 105deg 120deg, #991b1b 120deg 135deg, #fca5a5 135deg 150deg, #991b1b 150deg 165deg, #fca5a5 165deg 180deg, #991b1b 180deg 195deg, #fca5a5 195deg 210deg, #991b1b 210deg 225deg, #fca5a5 225deg 240deg, #991b1b 240deg 255deg, #fca5a5 255deg 270deg, #991b1b 270deg 285deg, #fca5a5 285deg 300deg, #991b1b 300deg 315deg, #fca5a5 315deg 330deg, #991b1b 330deg 345deg, #fca5a5 345deg 360deg)",
        face: "bg-gradient-to-br from-red-800 to-red-950",
        accent: "border-red-500/50 shadow-[0_0_15px_rgba(153,27,27,0.4)]"
    }
};

export default function Inventory() {
    const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);

    return (
        <section className="w-full flex flex-col gap-12">

            {/* Tech Stack HOUSE ADVANTAGE */}
            <div className="w-full liquid-glass p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4 relative z-10">
                    <div>
                        <h2 className="text-3xl font-serif text-slate-200 mb-1">
                            House Advantage
                        </h2>
                        <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">
                            Equipment & Specifications
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 relative z-10">
                    {ARMORY.map((category, i) => (
                        <div key={i} className={`p-6 rounded-xl border-t-2 ${category.style} relative group overflow-hidden`}>
                            {/* Card Back Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{
                                    backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)`,
                                    backgroundSize: '10px 10px',
                                }}
                            />

                            <h3 className="font-serif font-bold text-xl mb-4 flex items-center gap-2 relative z-10">
                                {category.title}
                            </h3>
                            <ul className="space-y-3 relative z-10">
                                {category.tools.map((tool, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm">
                                        <span className="text-xl mt-[-2px]">{tool.icon}</span>
                                        <div>
                                            <div className="font-bold text-slate-200">{tool.name}</div>
                                            <div className="font-mono text-xs opacity-70">{tool.desc}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Hover shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Shipped Titles VAULT */}
            <div className="w-full liquid-glass p-8 relative">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-4xl font-serif text-gold gold-shimmer mb-1">
                            Recently Shipped Games
                        </h2>
                        <p className="text-sm font-mono text-green-400 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            99.9% Uptime Verified
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-slate-500 uppercase tracking-widest">Global Reach</div>
                        <div className="text-xl font-mono text-cyan-400">10M+ Users</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
                    {PROJECTS.map((project, i) => (
                        <ProjectChip
                            key={i}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>

                {/* Modal - Tech Spec View */}
                {selectedProject && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
                        onClick={() => setSelectedProject(null)}
                    >
                        <div
                            className={`
                                w-full max-w-sm relative overflow-hidden rounded-2xl border-2 p-1 shadow-2xl animate-in zoom-in-95 duration-200
                                border-slate-700
                                bg-slate-950
                            `}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-[#0f0f12] rounded-xl p-8 relative flex flex-col items-center text-center">
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 text-slate-500 hover:text-white"
                                >
                                    ✕
                                </button>

                                {/* Large Chip Representation */}
                                <div className="mb-6 transform scale-110">
                                    <div className="relative w-32 h-32 rounded-full shadow-2xl flex items-center justify-center"
                                        style={{ background: THEME_STYLES[selectedProject.theme!].rim }}>
                                        <div className={`absolute inset-2 rounded-full ${THEME_STYLES[selectedProject.theme!].face} flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]`}>
                                            <div className="w-20 h-20 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                                                <span className="text-5xl drop-shadow-lg">{selectedProject.icon}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-500">
                                    {selectedProject.id} // {selectedProject.theme.toUpperCase()}
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-white mb-2 decoration-gold underline-offset-4">
                                    {selectedProject.codename}
                                </h3>

                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-green-400 font-mono text-xs font-bold tracking-wider">
                                        {selectedProject.status}
                                    </span>
                                </div>

                                <div className="space-y-4 w-full text-left">
                                    <div className="bg-slate-900/50 p-4 rounded border border-white/5">
                                        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <span className="text-gold">⚙️</span>
                                            Tech Specs
                                        </div>
                                        <div className="text-slate-200 font-mono text-sm leading-relaxed">
                                            {selectedProject.techSpecs}
                                        </div>
                                    </div>
                                    <div className="text-center text-xs text-slate-600 font-mono">
                                        SYSTEM UPTIME: {selectedProject.uptime}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function ProjectChip({ project, onClick }: { project: ProjectItem, onClick: () => void }) {
    const style = THEME_STYLES[project.theme];

    return (
        <div
            className="group relative flex flex-col items-center"
            onClick={onClick}
        >
            {/* 3D Chip / Cartridge Visual */}
            <div className={`
                relative w-24 h-24 md:w-32 md:h-32 rounded-full 
                cursor-pointer transition-all duration-300 ease-out
                hover:scale-110 hover:-translate-y-2 hover:rotate-[15deg] 
                shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.6)]
                ${style.accent}
            `}
                style={{ background: style.rim }}
            >
                {/* Inner Face (Recessed) */}
                <div className={`
                    absolute inset-[10%] rounded-full 
                    ${style.face}
                    shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.1)]
                    flex items-center justify-center
                    group-hover:inset-[8%] transition-all duration-300
                `}>
                    {/* Dashed Ring Decoration */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-white/20 opacity-50"></div>

                    {/* Center Icon */}
                    <div className="relative z-10 flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl md:text-5xl drop-shadow-md filter">{project.icon}</span>
                    </div>
                </div>

                {/* Shine/Reflection Overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
            </div>

            {/* Label below chip */}
            <div className="mt-4 text-center">
                <div className="font-serif font-bold text-slate-200 text-sm md:text-base group-hover:text-gold transition-colors">
                    {project.codename}
                </div>
                <div className="font-mono text-[10px] md:text-xs text-green-500/80 mt-1 uppercase tracking-wider">
                    [ SHIPPED ]
                </div>
            </div>
        </div>
    );
}
