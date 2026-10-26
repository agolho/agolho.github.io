// Career history styled as a slot cabinet "game recall" log: each role is a replayable game record.

interface RecallRecord {
    game: string;
    role: string;
    company: string;
    start: string;
    end: string;
    current?: boolean;
    icon: string;
    highlights: string[];
    tags: string[];
}

const RECORDS: RecallRecord[] = [
    {
        game: "#003",
        role: "Frontend Developer (Game Systems)",
        company: "Dreidel Interactive",
        start: "May 2024",
        end: "Present",
        current: true,
        icon: "🎰",
        highlights: [
            "Architected game recall systems and compliance audit modules for cabinet video slot machines, built to global gaming regulations and dispute-resolution standards.",
            "Pioneered an AI-first development culture, using Claude and Antigravity for rapid prototyping, code generation and complex debugging.",
            "Mentored and onboarded peer engineers onto AI-assisted coding workflows, cutting iteration time and keeping architectures modular.",
        ],
        tags: ["Game Recall", "Compliance", "Claude", "Antigravity"],
    },
    {
        game: "#002",
        role: "Game Developer",
        company: "On Off Games",
        start: "Apr 2022",
        end: "May 2024",
        icon: "📱",
        highlights: [
            "Led development and technical architecture of 40+ Unity (C#) mobile projects across hybrid-casual, puzzle and idle arcade genres.",
            "Integrated mediation (AppLovin Max, Google Ads), analytics (GameAnalytics, Adjust, AppsFlyer) and marketing SDKs.",
            "Built native bridges in Swift (Xcode) and Kotlin/Java (Android Studio), and owned delivery through Google Play Console and App Store Connect.",
        ],
        tags: ["Unity", "C#", "Swift", "Kotlin", "AppLovin Max"],
    },
    {
        game: "#001",
        role: "Solo Game Developer",
        company: "Self-Employed",
        start: "Jun 2015",
        end: "Feb 2019",
        icon: "🕹️",
        highlights: [
            "Designed, developed and published multiple hyper-casual titles on iOS and Android with Unity.",
            "Ran the full production cycle solo: mechanics, UI/UX art, performance optimization and App Store Optimization.",
        ],
        tags: ["Unity", "iOS", "Android", "ASO"],
    },
];

const CREDENTIALS = [
    { title: "BS, Mathematics & Computer Science", school: "Afyon Kocatepe Üniversitesi" },
    { title: "BA, English Language & Literature", school: "Kocaeli Üniversitesi" },
    { title: "Full Stack Web Development", school: "freeCodeCamp" },
    { title: "Pedagogical Formation", school: "Kocaeli Üniversitesi" },
];

const LANGUAGES = [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "Professional" },
    { name: "French", level: "Basic" },
    { name: "Russian", level: "Basic" },
];

export default function GameRecall() {
    return (
        <section className="w-full liquid-glass p-5 md:p-8 relative overflow-hidden">
            <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4 gap-4">
                <div>
                    <h2 className="text-4xl font-serif text-gold gold-shimmer mb-1">
                        Game Recall
                    </h2>
                    <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">
                        Career History // Audit Trail
                    </p>
                </div>
                <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-500 uppercase tracking-widest">Records</div>
                    <div className="text-xl font-mono text-gold">{String(RECORDS.length).padStart(3, "0")}</div>
                </div>
            </div>

            {/* Timeline */}
            <ol className="relative">
                {RECORDS.map((record, i) => (
                    <li key={record.game} className="relative pl-12 sm:pl-16 md:pl-20 pb-10 last:pb-0">
                        {/* Connector Rail */}
                        {i < RECORDS.length - 1 && (
                            <div aria-hidden="true" className="absolute left-[18px] sm:left-6 md:left-7 top-11 sm:top-14 bottom-0 w-px bg-gradient-to-b from-yellow-500/60 via-yellow-500/20 to-transparent" />
                        )}

                        {/* Chip Marker */}
                        <div
                            aria-hidden="true"
                            className={`absolute left-0 top-0 w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full p-[3px] bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 ${record.current ? 'shadow-[0_0_25px_rgba(234,179,8,0.5)]' : 'opacity-80'}`}
                        >
                            <div className="w-full h-full rounded-full bg-black border-2 border-dashed border-yellow-500/50 flex items-center justify-center text-sm sm:text-xl md:text-2xl">
                                {record.icon}
                            </div>
                        </div>

                        {/* Recall Record Card */}
                        <article className="bg-black/40 border border-white/10 rounded-lg p-4 sm:p-5 hover:border-yellow-500/40 transition-colors">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2 font-mono text-xs uppercase tracking-widest">
                                <span className="text-slate-500">Game {record.game}</span>
                                <span className="text-slate-600" aria-hidden="true">•</span>
                                <span className="text-slate-400">
                                    <time>{record.start}</time> – <time>{record.end}</time>
                                </span>
                                <span
                                    className={`ml-auto px-2 py-0.5 border rounded ${record.current
                                        ? 'border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(74,222,128,0.2)]'
                                        : 'border-slate-600 text-slate-500 bg-slate-500/5'}`}
                                >
                                    {record.current && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1.5 align-middle" />}
                                    {record.current ? 'In Play' : 'Settled'}
                                </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-100 leading-tight">
                                {record.role}
                            </h3>
                            <p className="text-gold font-serif italic mb-4">{record.company}</p>

                            <ul className="space-y-2 mb-4">
                                {record.highlights.map((line) => (
                                    <li key={line} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                                        <span className="text-yellow-600 mt-0.5 shrink-0" aria-hidden="true">♦</span>
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {record.tags.map((tag) => (
                                    <span key={tag} className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-yellow-500/20 text-yellow-500/80 bg-yellow-500/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    </li>
                ))}
            </ol>

            {/* Credentials & Languages */}
            <div className="grid md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
                <div className="md:col-span-2">
                    <h3 className="font-serif font-bold text-xl text-slate-200">Credentials</h3>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Licensed to Deal</p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                        {CREDENTIALS.map((cred) => (
                            <li key={cred.title} className="bg-black/40 border border-white/10 rounded p-3">
                                <div className="font-bold text-sm text-slate-200">{cred.title}</div>
                                <div className="font-mono text-xs text-slate-500 mt-0.5">{cred.school}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-serif font-bold text-xl text-slate-200">Languages</h3>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Tables Served</p>
                    <ul className="space-y-2">
                        {LANGUAGES.map((lang) => (
                            <li key={lang.name} className="flex items-center justify-between bg-black/40 border border-white/10 rounded px-3 py-2 text-sm">
                                <span className="text-slate-200">{lang.name}</span>
                                <span className="font-mono text-xs uppercase tracking-wider text-yellow-500/80">{lang.level}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
