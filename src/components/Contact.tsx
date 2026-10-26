const CHANNELS = [
    { label: "Email", sub: "Wire Transfer", icon: "📨", href: "mailto:agolho@gmail.com", glow: "via-green-500/10" },
    { label: "LinkedIn", sub: "High Roller Table", icon: "🤝", href: "https://www.linkedin.com/in/yusufbektas/", glow: "via-blue-500/10" },
    { label: "GitHub", sub: "Source Vault", icon: "🗝️", href: "https://github.com/agolho", glow: "via-purple-500/10" },
    { label: "Resume", sub: "Full Ledger (PDF)", icon: "🧾", href: "/resume.pdf", glow: "via-yellow-500/10" },
    { label: "Portfolio", sub: "Highlight Reel", icon: "🎴", href: "https://www.canva.com/design/DAGFq6qB6VM/k2RS3wza_8939sZzA4oOpw/view?utm_content=DAGFq6qB6VM&utm_campaign=designshare&utm_medium=link&utm_source=editor", glow: "via-red-500/10" },
];

export default function Contact() {
    return (
        <section className="w-full max-w-4xl mb-24 relative">
            {/* The Cage Structure */}
            <div className="liquid-glass p-8 border-2 border-gold/30">

                {/* Vertical Bars Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-5"
                    style={{ backgroundImage: 'linear-gradient(90deg, transparent 95%, currentColor 95%)', backgroundSize: '40px 100%' }}
                />

                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 relative z-10">
                    <div>
                        <h2 className="text-4xl font-serif text-slate-200 mb-1 flex items-center gap-2">
                            <span className="text-gold gold-shimmer">Contact</span>
                        </h2>
                        <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">
                            Cash Out // The Cage
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                    {CHANNELS.map((channel) => {
                        const isExternal = channel.href.startsWith("http");
                        return (
                            <a
                                key={channel.label}
                                href={channel.href}
                                {...(isExternal || channel.href.endsWith(".pdf") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="flex items-center gap-4 bg-black/40 border border-white/10 p-6 rounded hover:border-gold hover:bg-black/60 transition-all hover:-translate-y-1 group relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${channel.glow} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />
                                <div aria-hidden="true" className="text-4xl group-hover:scale-110 transition-transform filter drop-shadow-lg">
                                    {channel.icon}
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-slate-100 group-hover:text-gold transition-colors text-lg">{channel.label}</h3>
                                    <p className="text-slate-500 font-mono text-xs uppercase tracking-wider">{channel.sub}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Security Camera Detail (Decorative) */}
            <div aria-hidden="true" className="absolute -top-3 -right-3 text-2xl opacity-20 rotate-45 pointer-events-none">
                📹
            </div>
        </section>
    );
}
