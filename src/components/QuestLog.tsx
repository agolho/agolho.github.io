interface TicketProps {
    title: string;
    desc: string;
    odds: string;
    payout: string;
    status: 'LIVE' | 'ENCRYPTED' | 'SANDBOX' | 'HOBBY' | 'OFFLINE';
    link?: string; // Omit for offline pursuits that have nowhere to go
    type: 'Win' | 'Locked' | 'Loss';
}

const SLIPS: TicketProps[] = [
    {
        title: "Lignin",
        desc: "Prototype game - featured in popular feeds",
        odds: "1 : 1",
        payout: "CREATIVE FUN",
        status: "LIVE",
        link: "https://lightwhite.itch.io/lignin",
        type: "Win",
    },
    {
        title: "Baker's Calculator",
        desc: "Bread recipe hydration engine",
        odds: "1 : 1",
        payout: "FRESH LOAVES",
        status: "HOBBY",
        link: "https://agolho.github.io/ShokupanCalculator/",
        type: "Win",
    },
    {
        title: "Free-Tuner",
        desc: "Audio DSP pitch detection system",
        odds: "1 : 1",
        payout: "PERFECT PITCH",
        status: "HOBBY",
        link: "https://free-tuner.vercel.app",
        type: "Win",
    },
    {
        title: "Custom Joinery",
        desc: "Hand-crafted furniture & cabinetry",
        odds: "---",
        payout: "HEIRLOOMS",
        status: "OFFLINE",
        type: "Locked", // Using Locked style for Offline/Void look, but without the glitched text
    },
];

export default function QuestLog() {
    return (
        <section className="w-full max-w-4xl liquid-glass p-6">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <div>
                    <h2 className="text-2xl font-serif text-gold gold-shimmer mb-0.5">
                        The Lounge
                    </h2>
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                        Off-the-Clock Pursuits
                    </p>
                </div>
            </div>

            <div className="grid gap-4">
                {SLIPS.map((slip) => (
                    <BettingSlip key={slip.title} {...slip} />
                ))}
            </div>
        </section>
    );
}

function BettingSlip({ title, desc, odds, payout, status, link, type }: TicketProps) {
    // Determine badge styles based on status
    const getBadgeStyle = (status: string) => {
        switch (status) {
            case 'LIVE':
                return 'border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(74,222,128,0.2)]';
            case 'ENCRYPTED':
                return 'border-red-500 text-red-500 bg-red-500/10 glitch-text shadow-[0_0_10px_rgba(239,68,68,0.2)]';
            case 'SANDBOX':
                return 'border-yellow-500 text-yellow-500 bg-yellow-500/10 border-dashed shadow-[0_0_10px_rgba(234,179,8,0.2)]';
            case 'HOBBY':
                return 'border-orange-400 text-orange-400 bg-orange-500/10 shadow-[0_0_10px_rgba(251,146,60,0.2)]';
            case 'OFFLINE':
                return 'border-slate-600 text-slate-500 bg-slate-500/5 border-dashed';
            default:
                return 'border-slate-500 text-slate-400 bg-slate-500/10';
        }
    };

    const badgeStyle = getBadgeStyle(status);
    const wrapperClass = `block group relative ${status === 'OFFLINE' ? 'opacity-70 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 transition-all' : ''}`;

    const ticket = (
        <div className={`
            bg-white/5 border border-white/10 p-4 relative overflow-hidden clip-ticket transition-all duration-300
            ${status === 'OFFLINE' ? 'hover:border-slate-500' : 'hover:border-gold'}
        `}>

            {/* Perforated Edge Visuals */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#181015] rounded-r-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#181015] rounded-l-full" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pl-4 pr-4">

                {/* Left: Info */}
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className={`font-mono text-xs px-2 py-1 border rounded tracking-wider ${badgeStyle}`}>
                            {status}
                        </span>
                        {status !== 'OFFLINE' && (
                            <span className="font-mono text-xs text-slate-500 tracking-widest">ODDS: {odds}</span>
                        )}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-slate-200 group-hover:text-gold transition-colors leading-tight">
                        {title}
                    </h3>
                    <p className="text-slate-400 font-sans text-xs mt-0.5 opacity-80">{desc}</p>
                </div>

                {/* Right: Payout */}
                <div className="text-right min-w-[120px]">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Potential Payout</div>
                    <div className={`text-xl md:text-2xl font-mono font-bold ${status === 'OFFLINE' ? 'text-slate-500' : 'text-gold'}`}>
                        {payout}
                    </div>
                </div>
            </div>

            {/* "Void" / "Wager" stamp overlay */}
            <div aria-hidden="true" className="absolute top-[-10px] right-[40px] md:right-[80px] text-[50px] md:text-[80px] text-white/5 font-serif font-bold rotate-12 pointer-events-none select-none">
                {type === 'Locked' ? 'VOID' : 'WAGER'}
            </div>
        </div>
    );

    if (!link) {
        return <div className={wrapperClass}>{ticket}</div>;
    }

    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={wrapperClass}>
            {ticket}
        </a>
    );
}
