import QuestLog from "@/components/QuestLog";
import DebugProfile from "@/components/DebugProfile";
import JackpotFooter from "@/components/JackpotFooter";
import Contact from "@/components/Contact";
import SlotMachine from "@/components/SlotMachine";
import Inventory from "@/components/Inventory";
import Ticker from "@/components/Ticker";
import ShaderBackground from "@/components/ShaderBackground";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen pb-24 relative overflow-x-hidden print:block print:min-h-0 print:pb-0">
      <ShaderBackground />
      <Ticker />

      <div className="w-full max-w-4xl p-6 space-y-12 flex flex-col items-center">

        {/* Hero / Character Card */}
        <section className="w-full liquid-glass p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar / Class Icon Placeholder */}
            {/* Avatar / Class Icon Placeholder */}
            {/* Avatar / Class Icon Placeholder */}
            <DebugProfile />

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-100 mb-2">
                  <span className="text-gold gold-shimmer block">Senior Gameplay Engineer</span>
                  <span className="text-2xl md:text-3xl text-slate-400 font-sans font-normal opacity-80 block mt-1">
                    Yusuf Bektas
                  </span>
                </h1>
                <p className="text-yellow-500/80 text-lg mt-2 font-serif italic border-t border-white/10 pt-2 inline-block">
                  Role: The House | Status: High Roller (12+ Shipped Titles)
                </p>
              </div>

              <div className="text-slate-200 leading-relaxed max-w-2xl font-light text-lg md:text-xl tracking-wide">
                Specialized in <span className="text-gold font-bold">Deterministic State Systems</span> & <span className="text-gold font-bold">Session Recall</span> across Mobile, WebGL, & <span className="text-gold font-bold">Physical Slot Cabinets</span>.
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <StatBox label="Shipped Titles" value="12+" />
                <StatBox label="Engine" value="Unity3D" />
                <StatBox label="Language" value="C# / TS" />
                <StatBox label="Specialty" value="Gameplay" />
              </div>
            </div>
          </div>
        </section>

        <SlotMachine />

        <Inventory />

        <QuestLog />
        <Contact />
        <JackpotFooter />
      </div>
    </main>
  );
}

function StatBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-black/40 p-1 rounded border border-yellow-500/20 flex flex-col items-center justify-center transition-all hover:border-gold group relative overflow-hidden">
      {/* Simple Casino Plaque Look */}
      <div className="w-full h-full bg-gradient-to-b from-slate-900 to-black p-3 flex flex-col items-center justify-center rounded-[2px] relative z-10">
        <div className="text-gold font-serif font-bold text-lg group-hover:scale-110 transition-transform">{value}</div>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-1">{label}</div>
      </div>

      {/* Table Felt Highlight */}
      <div className="absolute inset-0 bg-green-900/10 z-0" />
    </div>
  )
}
