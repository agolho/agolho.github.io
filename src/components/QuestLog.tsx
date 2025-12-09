import Link from 'next/link';

export default function QuestLog() {
    return (
        <section className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                <span className="text-yellow-500">Quest Log</span>
                <span className="text-sm font-normal text-slate-500 uppercase tracking-widest">Active Projects</span>
            </h2>

            <div className="space-y-4">
                <QuestItem
                    title="Refactor Shokupan Calculator"
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
                />
            </div>
        </section>
    );
}

function QuestItem({ title, desc, tags, reward, status, link }: { title: string, desc: string, tags: string[], reward: string, status: string, link: string }) {
    return (
        <Link href={link} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-900/40 border border-slate-800 p-6 rounded-lg hover:bg-slate-800/60 hover:border-yellow-500/50 transition-all group cursor-pointer">
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
        </Link>
    )
}
