
export default function Contact() {
    return (
        <section className="w-full max-w-4xl mb-24">
            <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                <span className="text-red-400">Communication</span>
                <span className="text-sm font-normal text-slate-500 uppercase tracking-widest">Channels</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="mailto:agolho@gmail.com" className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-red-400/50 transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 bg-red-400/20 text-red-400 rounded-full flex items-center justify-center text-2xl">
                        📫
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-200">Email</h3>
                        <p className="text-slate-400">agolho@gmail.com</p>
                    </div>
                </a>

                <a href="https://www.canva.com/design/DAGFq6qB6VM/k2RS3wza_8939sZzA4oOpw/view?utm_content=DAGFq6qB6VM&utm_campaign=designshare&utm_medium=link&utm_source=editor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-blue-400/50 transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 bg-blue-400/20 text-blue-400 rounded-full flex items-center justify-center text-2xl">
                        🌐
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-200">Full Portfolio / CV</h3>
                        <p className="text-slate-400">Check via Canva</p>
                    </div>
                </a>
            </div>
        </section>
    );
}
