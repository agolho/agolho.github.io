export default function Ticker() {
    return (
        <div className="w-full bg-black border-y border-yellow-500/30 overflow-hidden py-2 relative z-40 shadow-lg no-print">
            <div className="flex animate-scroll-left whitespace-nowrap">
                <TickerContent />
                {/* Duplicate strip for a seamless loop; hidden from screen readers */}
                <TickerContent ariaHidden />
            </div>
        </div>
    );
}

function TickerContent({ ariaHidden = false }: { ariaHidden?: boolean }) {
    const wins = [
        "👑 Recruiter_Steve just downloaded Resume.pdf (Win: $120k Salary)",
        "🎰 User_123 hit the JACKPOT in Portfolio Slots",
        "🧾 Auditor recalled Game #4471 (Result: 100% Match)",
        "🤖 Claude & Antigravity joined the crew (AI-First Workflow Unlocked)",
        "🚀 Hiring_Manager unlocked 'Senior Dev' Achievement",
        "💎 Visitor_99 found the Hidden Easter Egg",
        "📄 HR_Rep viewed 'Contact Me' (Win: Interview Scheduled)",
        "🔥 Project 'Free-Tuner' just deployed to Vercel",
        "✨ Agolho leveled up to Level 30",
        "🎲 Tech_Lead rolled a critical success on Code Review",
    ];

    return (
        <div className="flex gap-8 items-center px-4" aria-hidden={ariaHidden || undefined}>
            {wins.map((win, i) => (
                <span key={i} className="text-yellow-400 font-mono text-sm tracking-wide uppercase flex items-center gap-2">
                    <span className="text-yellow-600">★</span> {win}
                </span>
            ))}
        </div>
    );
}
