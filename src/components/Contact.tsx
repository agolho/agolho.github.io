
export default function Contact() {
    return (
        <section className="w-full max-w-4xl mb-24 liquid-glass p-8">
            <h2 className="text-4xl font-serif text-slate-200 mb-6 flex items-center gap-2">
                <span className="text-gold gold-shimmer">Communication</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="mailto:agolho@gmail.com" className="flex items-center gap-4 bg-black/40 border border-white/5 p-6 rounded-xl hover:border-gold hover:bg-black/60 transition-all hover:-translate-y-1 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="text-5xl group-hover:scale-110 transition-transform filter drop-shadow-lg">
                        📫
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-slate-100 group-hover:text-gold transition-colors text-xl">Email</h3>
                        <p className="text-slate-400 font-mono text-sm">agolho@gmail.com</p>
                    </div>
                </a>

                <a href="https://www.canva.com/design/DAGFq6qB6VM/k2RS3wza_8939sZzA4oOpw/view?utm_content=DAGFq6qB6VM&utm_campaign=designshare&utm_medium=link&utm_source=editor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-black/40 border border-white/5 p-6 rounded-xl hover:border-gold hover:bg-black/60 transition-all hover:-translate-y-1 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="text-5xl group-hover:scale-110 transition-transform filter drop-shadow-lg">
                        🌐
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-slate-100 group-hover:text-gold transition-colors text-xl">Portfolio / CV</h3>
                        <p className="text-slate-400 font-mono text-sm">View Full Document</p>
                    </div>
                </a>
            </div>
        </section>
    );
}
