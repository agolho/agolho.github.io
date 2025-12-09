import QuestLog from "@/components/QuestLog";
import Contact from "@/components/Contact";
import SlotMachine from "@/components/SlotMachine";
import Inventory from "@/components/Inventory";
import Ticker from "@/components/Ticker";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen pb-24 relative overflow-x-hidden">

      <Ticker />

      <div className="w-full max-w-4xl p-6 space-y-12 flex flex-col items-center">

        {/* Hero / Character Card */}
        <section className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar / Class Icon Placeholder */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-800 rounded-full border-4 border-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] overflow-hidden relative">
              <img src="/avatar.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Senior Game Dev
                </h1>
                <p className="text-slate-400 text-lg mt-1">Class: Technomancer | Lvl. 5+ (Years Exp)</p>
              </div>

              <div className="text-slate-300 leading-relaxed max-w-2xl">
                With over 5 years of professional experience in the gaming industry, I have contributed to the development of over 40 projects across Android, iOS, and WebGL. My expertise lies in Unity3D and C#, and I am passionate about creating engaging and polished gameplay experiences.
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <StatBox label="Titles Shipped" value="4+" color="text-green-400" />
                <StatBox label="Engine" value="Unity3D" color="text-blue-400" />
                <StatBox label="Language" value="C# / TS" color="text-yellow-400" />
                <StatBox label="Specialty" value="Gameplay" color="text-red-400" />
              </div>
            </div>
          </div>
        </section>

        <SlotMachine />

        <Inventory />

        <QuestLog />
        <Contact />
      </div>
    </main>
  );
}

function StatBox({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 flex flex-col items-center justify-center hover:border-indigo-500/50 transition-colors">
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  )
}
