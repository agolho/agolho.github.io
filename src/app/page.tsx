import QuestLog from "@/components/QuestLog";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full max-w-4xl p-6 space-y-12 pb-24">

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

      {/* Skills / Inventory */}
      <section className="w-full">
        <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-2">
          <span className="text-indigo-400">Inventory</span>
          <span className="text-sm font-normal text-slate-500 uppercase tracking-widest">Core Competencies</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCard title="Game Development" items={["Unity3D", "C#", "Gameplay Mechanics", "UI/UX Implementation", "Performance Optimization"]} />
          <SkillCard title="Web Development" items={["Next.js", "React", "JavaScript", "TypeScript", "HTML/CSS"]} />
          <SkillCard title="Backend & Databases" items={["Node.js", "Firebase", "SQL", "MongoDB"]} />
          <SkillCard title="Platforms & Tools" items={["Git", "Android Studio", "Xcode", "Google Play / App Store"]} />
        </div>
      </section>


      <QuestLog />
      <Contact />
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

function SkillCard({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-xl hover:bg-slate-900/50 transition-colors">
      <h3 className="text-lg font-semibold text-indigo-300 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 text-sm rounded border border-slate-700">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
