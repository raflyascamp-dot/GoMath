import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  HelpCircle, 
  Award, 
  CheckCircle, 
  ChevronRight, 
  Users, 
  Layers, 
  TrendingUp, 
  BarChart, 
  ArrowRight,
  Computer,
  MonitorPlay,
  FileText,
  MessageSquare,
  ShieldAlert,
  Hash,
  Infinity as InfinityIcon
} from "lucide-react";
import { Module } from "../types";

interface LandingPageProps {
  modules: Module[];
  onStartLearning: (moduleSlug?: string, lessonId?: string) => void;
}

export default function LandingPage({ modules, onStartLearning }: LandingPageProps) {
  const [activeHeroTab, setActiveHeroTab] = useState<"graf" | "boolean" | "komb">("graf");
  
  // Custom states for interactive widgets in hero preview
  const [combN, setCombN] = useState(5);
  const [combR, setCombR] = useState(2);
  const [activeBooleanA, setActiveBooleanA] = useState(true);
  const [activeBooleanB, setActiveBooleanB] = useState(false);

  // Math Factorial helper
  const fact = (num: number): number => {
    if (num <= 1) return 1;
    return num * fact(num - 1);
  };
  const permResult = Math.round(fact(combN) / fact(combN - combR));
  const combResult = Math.round(fact(combN) / (fact(combR) * fact(combN - combR)));

  // Scroll smoothly to id helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen font-sans selection:bg-brand-primary selection:text-white">
      {/* Navbar segment */}
      <nav className="sticky top-0 z-50 bg-white border-b border-brand-border backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="bg-brand-primary text-white p-2 rounded-lg flex items-center justify-center">
                <Hash className="w-6 h-6 stroke-[2.5]" id="logo-icon" />
              </div>
              <span className="font-sans font-bold text-2xl text-brand-text tracking-tight flex items-center gap-1">
                Diskrit<span className="text-brand-primary">Learn</span>
              </span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-brand-text hover:text-brand-primary text-sm font-medium transition-colors">Home</button>
              <button onClick={() => scrollToId("materi-utama")} className="text-brand-secondary hover:text-brand-primary text-sm font-medium transition-colors">Materi</button>
              <button onClick={() => scrollToId("fitur-platform")} className="text-brand-secondary hover:text-brand-primary text-sm font-medium transition-colors">Fitur</button>
              <button onClick={() => scrollToId("alur-belajar")} className="text-brand-secondary hover:text-brand-primary text-sm font-medium transition-colors">Alur Belajar</button>
              <button onClick={() => scrollToId("preview-dashboard")} className="text-brand-secondary hover:text-brand-primary text-sm font-medium transition-colors">Preview</button>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => onStartLearning()}
                className="bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
                id="btn-nav-mulai"
              >
                Mulai Belajar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-white pt-12 pb-20 sm:pb-24 border-b border-brand-border overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#0056D2 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-brand-primary border border-blue-200 mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Platform Belajar Matematika Diskrit
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-brand-text tracking-tight leading-[1.12] mb-6">
              Belajar Matematika Diskrit Lebih <span className="text-brand-primary">Terstruktur</span>, Interaktif, dan Mudah Dipahami
            </h1>
            <p className="text-lg text-brand-secondary leading-relaxed mb-8 max-w-xl">
              Pelajari Aljabar Boolean, Peluang, Permutasi, Kombinasi, dan Graf melalui materi yang rapi, visual interaktif, latihan soal terarah, serta pemantauan progress belajar real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => onStartLearning()}
                className="bg-brand-primary hover:bg-brand-hover text-white py-3.5 px-8 rounded-lg font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                id="hero-cta-primary"
              >
                Mulai Belajar Sekarang
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToId("materi-utama")}
                className="border border-brand-border bg-brand-bg hover:bg-white text-brand-text py-3.5 px-8 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2"
                id="hero-cta-secondary"
              >
                Lihat Materi
              </button>
            </div>
          </div>

          {/* Right Visual Dashboard Mockup - Highly Interactive */}
          <div className="lg:col-span-5">
            <div className="bg-brand-bg border border-brand-border rounded-2xl shadow-xl overflow-hidden p-6 relative">
              {/* Header inside Mockup */}
              <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  <span className="text-xs font-mono text-brand-secondary ml-2">diskrithub-preview.exe</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 bg-brand-primary/10 text-[10px] font-bold text-brand-primary rounded">LIVE SIMULATION</span>
                </div>
              </div>

              {/* Interactive Tabs */}
              <div className="flex border-b border-brand-border mb-4">
                <button
                  onClick={() => setActiveHeroTab("graf")}
                  className={`flex-1 pb-2.5 text-xs font-bold text-center border-b-2 transition-all ${activeHeroTab === "graf" ? "border-brand-primary text-brand-primary" : "border-transparent text-brand-secondary"}`}
                >
                  Node Graf (Euler)
                </button>
                <button
                  onClick={() => setActiveHeroTab("boolean")}
                  className={`flex-1 pb-2.5 text-xs font-bold text-center border-b-2 transition-all ${activeHeroTab === "boolean" ? "border-brand-primary text-brand-primary" : "border-transparent text-brand-secondary"}`}
                >
                  Tabel Kebenaran
                </button>
                <button
                  onClick={() => setActiveHeroTab("komb")}
                  className={`flex-1 pb-2.5 text-xs font-bold text-center border-b-2 transition-all ${activeHeroTab === "komb" ? "border-brand-primary text-brand-primary" : "border-transparent text-brand-secondary"}`}
                >
                  Kombinatorika
                </button>
              </div>

              {/* Tab Display Area */}
              <div className="min-h-[190px] flex flex-col justify-between">
                {activeHeroTab === "graf" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p className="text-xs text-brand-secondary">
                      Simulasi graf planar sederhana. Membuktikan Hukum Euler <strong className="text-brand-text">V - E + F = 2</strong>
                    </p>
                    <div className="h-28 bg-white border border-brand-border rounded-lg relative flex items-center justify-center overflow-hidden">
                      {/* Interactive Canvas Simulation inside Landing */}
                      <svg className="w-full h-full" viewBox="0 0 300 110">
                        {/* Perfect Planar Graph representation */}
                        {/* Edges */}
                        <line x1="50" y1="55" x2="150" y2="20" stroke="#0056D2" strokeWidth="2" />
                        <line x1="50" y1="55" x2="150" y2="90" stroke="#0056D2" strokeWidth="2" />
                        <line x1="150" y1="20" x2="150" y2="90" stroke="#0056D2" strokeWidth="2" />
                        <line x1="150" y1="20" x2="250" y2="55" stroke="#0056D2" strokeWidth="2" />
                        <line x1="150" y1="90" x2="250" y2="55" stroke="#0056D2" strokeWidth="2" />
                        <line x1="50" y1="55" x2="250" y2="55" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3,3" />

                        {/* Nodes */}
                        <circle cx="50" cy="55" r="7" fill="#0056D2" className="animate-pulse" />
                        <text x="50" y="44" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#1F1F1F">A</text>

                        <circle cx="150" cy="20" r="7" fill="#0056D2" />
                        <text x="150" y="12" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#1F1F1F">B</text>

                        <circle cx="150" cy="90" r="7" fill="#0056D2" />
                        <text x="150" y="102" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#1F1F1F">C</text>

                        <circle cx="250" cy="55" r="7" fill="#0056D2" />
                        <text x="250" y="44" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#1F1F1F">D</text>

                        {/* Labels for Faces */}
                        <text x="110" y="55" fontSize="8" fill="#5C5C5C" fontStyle="italic">Face 1</text>
                        <text x="190" y="55" fontSize="8" fill="#5C5C5C" fontStyle="italic">Face 2</text>
                        <text x="150" y="115" fontSize="8" fill="#5C5C5C" fontStyle="italic" transform="translate(0, -50)">Face 3 (Luar)</text>
                      </svg>
                    </div>
                    {/* Graph metadata math */}
                    <div className="flex justify-between items-center text-[11px] bg-blue-50/50 p-2 rounded border border-blue-100">
                      <span><strong>Simpul (V)</strong> = 4</span>
                      <span><strong>Sisi (E)</strong> = 5</span>
                      <span><strong>Muka (F)</strong> = 3</span>
                      <span className="text-brand-primary font-bold">4 - 5 + 3 = 2 ✓</span>
                    </div>
                  </motion.div>
                )}

                {activeHeroTab === "boolean" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p className="text-xs text-brand-secondary">
                      Tabel kebenaran interaktif untuk gerbang <strong className="text-brand-text">AND</strong> &amp; <strong className="text-brand-text">OR</strong>. Coba klik nilai input:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Interactive toggle block */}
                      <div className="p-2.5 bg-white border border-brand-border rounded-lg text-center">
                        <span className="text-[10px] text-brand-secondary block mb-1">INPUT SWITCHES</span>
                        <div className="flex justify-center gap-2 mb-2">
                          <button 
                            onClick={() => setActiveBooleanA(!activeBooleanA)}
                            className={`px-2 py-1 rounded text-xs font-mono font-bold transition-all ${activeBooleanA ? "bg-brand-success text-white" : "bg-gray-200 text-gray-600"}`}
                          >
                            A: {activeBooleanA ? "1" : "0"}
                          </button>
                          <button 
                            onClick={() => setActiveBooleanB(!activeBooleanB)}
                            className={`px-2 py-1 rounded text-xs font-mono font-bold transition-all ${activeBooleanB ? "bg-brand-success text-white" : "bg-gray-200 text-gray-600"}`}
                          >
                            B: {activeBooleanB ? "1" : "0"}
                          </button>
                        </div>
                      </div>

                      <div className="p-2.5 bg-white border border-brand-border rounded-lg flex flex-col justify-center text-center">
                        <span className="text-[10px] text-brand-secondary block mb-1">OUTPUT GATES</span>
                        <div className="text-xs font-mono space-y-1 text-left px-1">
                          <div className="flex justify-between">
                            <span>A <strong>AND</strong> B :</span>
                            <span className={`font-bold ${activeBooleanA && activeBooleanB ? "text-brand-success" : "text-brand-error"}`}>
                              {(activeBooleanA && activeBooleanB) ? "1 (True)" : "0 (False)"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>A <strong>OR</strong> B :</span>
                            <span className={`font-bold ${activeBooleanA || activeBooleanB ? "text-brand-success" : "text-brand-error"}`}>
                              {(activeBooleanA || activeBooleanB) ? "1 (True)" : "0 (False)"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50/60 border border-amber-200 rounded p-2 text-center text-[11px] text-amber-800">
                      Formula Hukum De Morgan: <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-100">(A + B)' = A' · B'</code>
                    </div>
                  </motion.div>
                )}

                {activeHeroTab === "komb" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <p className="text-xs text-brand-secondary">
                      Formula penemu kombinasi &amp; permutasi interaktif:
                    </p>
                    <div className="bg-white border border-brand-border rounded-lg p-3 space-y-3 text-brand-text">
                      <div className="flex items-center gap-4 justify-center">
                        {/* Interactive fields inside landing */}
                        <div className="flex items-center gap-1.5">
                          <label className="text-xs font-mono font-bold">n =</label>
                          <select 
                            value={combN} 
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              setCombN(v);
                              if (combR > v) setCombR(v);
                            }}
                            className="bg-brand-bg border border-brand-border text-xs rounded px-1.5 py-0.5 focus:outline-none focus:border-brand-primary"
                          >
                            {[3,4,5,6,7,8,9,10].map(x => <option key={x} value={x}>{x}</option>)}
                          </select>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <label className="text-xs font-mono font-bold">r =</label>
                          <select 
                            value={combR} 
                            onChange={(e) => setCombR(Number(e.target.value))}
                            className="bg-brand-bg border border-brand-border text-xs rounded px-1.5 py-0.5 focus:outline-none focus:border-brand-primary"
                          >
                            {Array.from({ length: combN }, (_, idx) => idx + 1).map(x => <option key={x} value={x}>{x}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-center divide-x divide-brand-border pt-1">
                        <div>
                          <span className="text-[10px] text-brand-secondary block uppercase">Permutasi P(n, r)</span>
                          <span className="text-base font-bold text-brand-primary font-mono">{permResult}</span>
                          <span className="block text-[9px] text-brand-secondary font-mono">{combN}! / ({combN}-{combR})!</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-brand-secondary block uppercase">Kombinasi C(n, r)</span>
                          <span className="text-base font-bold text-brand-success font-mono">{combResult}</span>
                          <span className="block text-[9px] text-brand-secondary font-mono">{combN}! / [{combR}!({combN}-{combR})!]</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Progress UI indicator in box */}
              <div className="mt-4 pt-3.5 border-t border-brand-border flex items-center justify-between text-xs text-brand-secondary">
                <span className="flex items-center gap-1 text-[11px]"><CheckCircle className="w-3.5 h-3.5 text-brand-success" /> 20+ Pembahasan Interaktif</span>
                <span>Kemajuan: <strong className="text-brand-text">35%</strong></span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-brand-success h-full w-[35%] transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Statistik Singkat */}
      <section className="bg-brand-bg py-10 border-b border-brand-border" id="statistik">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-brand border border-brand-border p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="block text-3xl font-extrabold text-brand-primary">3 Topik</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Materi Utama</span>
            </div>
            <div className="space-y-1 border-l border-brand-border">
              <span className="block text-3xl font-extrabold text-brand-primary">20+ Sub</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Modul Pembelajaran</span>
            </div>
            <div className="space-y-1 border-l border-brand-border">
              <span className="block text-3xl font-extrabold text-brand-primary">Interaktif</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Latihan &amp; K-Map</span>
            </div>
            <div className="space-y-1 border-l border-brand-border">
              <span className="block text-3xl font-extrabold text-brand-primary">Dinamis</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">Grafik &amp; Progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Materi Utama */}
      <section className="py-20 bg-white" id="materi-utama">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-blue-50 px-2.5 py-1 rounded-full">Syllabus</span>
            <h2 className="text-3xl font-extrabold text-brand-text tracking-tight mt-3 mb-4">
              Kurikulum Matematika Diskrit Terintegrasi
            </h2>
            <p className="text-base text-brand-secondary">
              Pilihlah cabang ilmu matematika diskrit berikut untuk mulai mendalami definisinya, mengerjakan studi kasus, dan mengisi kuis penilaian kompetensi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modules.map((m, index) => {
              // icon representation
              let Icon = Layers;
              let bgAccent = "bg-blue-50 text-brand-primary border-blue-100";
              let badgeColor = "bg-blue-100 text-[#0056D2]";
              if (index === 1) {
                Icon = TrendingUp;
                bgAccent = "bg-emerald-50 text-brand-success border-emerald-100";
                badgeColor = "bg-emerald-100 text-[#1FA15F]";
              } else if (index === 2) {
                Icon = BarChart;
                bgAccent = "bg-amber-50 text-brand-warning border-amber-100";
                badgeColor = "bg-amber-100 text-[#B28000]";
              }

              return (
                <div 
                  key={m.id} 
                  className="bg-white border border-brand-border rounded-lg shadow-brand hover:shadow-md transition-all p-6 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Header track info */}
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-lg border ${bgAccent}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${badgeColor}`}>
                        {m.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-primary transition-colors mt-2">
                      {m.title}
                    </h3>
                    <p className="text-sm text-brand-secondary leading-relaxed">
                      {m.description}
                    </p>

                    {/* Meta info */}
                    <div className="pt-2 flex flex-wrap gap-2 text-xs text-brand-secondary">
                      <span className="bg-brand-bg px-2 py-0.5 rounded font-medium border border-brand-border/60">
                        {index === 0 ? "Dasar ke Lanjut" : index === 1 ? "Menengah ke Lanjut" : "Menengah"}
                      </span>
                      <span className="bg-brand-bg px-2 py-0.5 rounded font-medium border border-brand-border/60">
                        {m.lessons.length} Pelajaran
                      </span>
                    </div>

                    {/* Dummy progress loader */}
                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] text-brand-secondary mb-1">
                        <span>Status Mulai</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-brand-primary h-full w-0 group-hover:w-[15%] transition-all duration-700"></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-border">
                    <button
                      onClick={() => onStartLearning(m.id)}
                      className="w-full bg-brand-bg hover:bg-brand-primary hover:text-white border border-brand-border hover:border-brand-primary text-brand-text py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Pelajari Kompetensi
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Fitur Website */}
      <section className="bg-brand-bg py-20 border-y border-brand-border" id="fitur-platform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-blue-50 px-2.5 py-1 rounded-full">Teknologi Belajar</span>
            <h2 className="text-3xl font-extrabold text-brand-text tracking-tight mt-3 mb-4">
              Fitur Utama Platform E-Learning
            </h2>
            <p className="text-base text-brand-secondary">
              DiskritLearn didesain secara khusus untuk memenuhi kaidah pengajaran universitas modern dengan kelengkapan materi simulasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-brand-border shadow-brand flex gap-4">
              <div className="text-brand-primary bg-blue-50 p-3 h-12 w-12 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-text mb-1.5">Materi Berbasis Modul</h4>
                <p className="text-sm text-brand-secondary leading-relaxed">Penyusunan materi dirangkai dari elemen yang paling mendasar sampai tingkat praktis secara sekuensial.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-brand-border shadow-brand flex gap-4">
              <div className="text-brand-success bg-emerald-50 p-3 h-12 w-12 rounded-lg flex items-center justify-center shrink-0 border border-emerald-100">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-text mb-1.5">Progress Belajar Persisten</h4>
                <p className="text-sm text-brand-secondary leading-relaxed">Catatan status penyelesaian tersimpan secara dinamis sehingga Anda dapat melanjutkan langsung nanti.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-brand-border shadow-brand flex gap-4">
              <div className="text-brand-warning bg-amber-50 p-3 h-12 w-12 rounded-lg flex items-center justify-center shrink-0 border border-amber-100">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-text mb-1.5">Quiz Interaktif per Materi</h4>
                <p className="text-sm text-brand-secondary leading-relaxed">Validasi pemahaman seketika lewat kuis pilihan ganda yang menyajikan konfirmasi dan pembahasan rinci.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-brand-border shadow-brand flex gap-4">
              <div className="text-blue-600 bg-sky-50 p-3 h-12 w-12 rounded-lg flex items-center justify-center shrink-0 border border-sky-100">
                <Computer className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-text mb-1.5">Visualisasi Graf &amp; K-Map</h4>
                <p className="text-sm text-brand-secondary leading-relaxed">Modul interaktif khusus graf Euler dan peta Karnaugh berukuran 2x4 cell untuk memecahkan ekspresi logika.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-brand-border shadow-brand flex gap-4">
              <div className="text-purple-600 bg-purple-50 p-3 h-12 w-12 rounded-lg flex items-center justify-center shrink-0 border border-purple-100">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-text mb-1.5">Sertifikat Penyelesaian</h4>
                <p className="text-sm text-brand-secondary leading-relaxed">Unduh sertifikat kelulusan formal berisikan nama Anda setelah menamatkan seluruh rangkaian materi modul.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-brand-border shadow-brand flex gap-4">
              <div className="text-rose-600 bg-rose-50 p-3 h-12 w-12 rounded-lg flex items-center justify-center shrink-0 border border-rose-100">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-text mb-1.5">Papan Diskusi &amp; Catatan</h4>
                <p className="text-sm text-brand-secondary leading-relaxed">Tulis ulasan pelajaran interaktif dan buat catatan pribadi pada setiap bab di bilah catatan khusus.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Alur Belajar */}
      <section className="bg-white py-20 border-b border-brand-border" id="alur-belajar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-blue-50 px-2.5 py-1 rounded-full">Roadmap</span>
            <h2 className="text-3xl font-extrabold text-brand-text tracking-tight mt-3 mb-4">
              Rangkaian Alur Belajar DiskritLearn
            </h2>
            <p className="text-base text-brand-secondary">
              Langkah sistematis agar proses transfer ilmu berjalan maksimal dari fondasi hingga pemecahan kuis akademis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Visual connector line in desktop */}
            <div className="hidden md:block absolute top-1/3 left-6 right-6 h-0.5 bg-brand-border z-0"></div>

            {[
              { num: "01", title: "Pilih Materi", desc: "Tentukan materi yang ingin dipelajari, dari Aljabar Boolean, Kombinatorika, hingga Teori Graf." },
              { num: "02", title: "Pelajari Konsep", desc: "Gunakan modul interaktif, baca ulasan teori, dan jalankan simulasi truth table atau graf." },
              { num: "03", title: "Kerjakan Latihan", desc: "Selesaikan kuis interaktif dengan peninjauan jawaban yang detail dan sistem pembahasan." },
              { num: "04", title: "Pantau Progress", desc: "Pantau tingkat pemahaman Anda, penuhi target modul, dan raih sertifikat kelulusan." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white border border-brand-border rounded-lg p-6 relative z-10 hover:shadow-md shadow-brand transition-shadow">
                <span className="text-3xl font-extrabold text-brand-primary/15 font-mono block mb-3">{step.num}</span>
                <h4 className="text-lg font-bold text-brand-text mb-2">{step.title}</h4>
                <p className="text-sm text-brand-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Dashboard section */}
      <section className="bg-brand-bg py-20" id="preview-dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-blue-50 px-2.5 py-1 rounded-full">Dashboard Mockup</span>
              <h3 className="text-3xl font-extrabold text-brand-text tracking-tight">
                Ruang Belajar yang Dipoles Rapi &amp; Fokus
              </h3>
              <p className="text-base text-brand-secondary leading-relaxed">
                Tampilan antarmuka ruang belajar didesain tenang tanpa distraksi visual. Struktur modul tersusun di panel samping kiri, menyajikan area text teori, panel interaktif rumus di tengah, dan area catatan kuis instan di sebelah kanan.
              </p>
              <div className="space-y-3.5">
                {[
                  "Sidebar modul collapsible dengan status check & marker",
                  "Formulasi rumus matematika yang di-highlight elegan",
                  "Umpan balik instan pada pengerjaan kuis materi"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-brand-text font-medium">
                    <CheckCircle className="w-4 h-4 text-brand-success shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => onStartLearning()}
                  className="bg-brand-primary hover:bg-brand-hover text-white font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  Buka Aplikasi Belajar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-lg border border-brand-border shadow-brand">
              <div className="border border-brand-border rounded-lg overflow-hidden shadow-inner bg-brand-bg">
                {/* Simulated Header */}
                <div className="bg-white border-b border-brand-border py-3 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-brand-primary" />
                    <span className="font-bold text-sm text-brand-text">DiskritLearn Dashboard</span>
                  </div>
                  <span className="text-xs font-semibold text-brand-success bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Modul 1 Aktif
                  </span>
                </div>

                {/* Simulated Sidebar & Content Panel */}
                <div className="grid grid-cols-12 min-h-[300px]">
                  {/* Left mini sidebar */}
                  <div className="col-span-4 bg-white border-r border-brand-border p-3 space-y-4 hidden sm:block">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brand-secondary font-bold block mb-1.5">Aljabar Boolean</span>
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-medium text-brand-primary bg-blue-50 py-1.5 px-2 rounded flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                          Pengantar Boolean
                        </div>
                        <div className="text-[11px] font-medium text-brand-secondary py-1 px-2 hover:bg-brand-bg rounded flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                          Definisi Aljabar
                        </div>
                        <div className="text-[11px] font-medium text-brand-secondary py-1 px-2 hover:bg-brand-bg rounded flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                          Karnaugh Map
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right simulated content */}
                  <div className="col-span-12 sm:col-span-8 p-4 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-brand-secondary block">Langkah 1 dari 13</span>
                      <h4 className="text-base font-extrabold text-brand-text">Pengantar Aljabar Boolean</h4>
                      <p className="text-xs text-brand-secondary leading-relaxed">
                        Aljabar Boolean adalah struktur matematika yang digunakan untuk memodelkan logika, himpunan, dan rangkaian digital...
                      </p>
                    </div>

                    {/* Formula card style inside simulation */}
                    <div className="bg-white border border-brand-border p-3 rounded-lg">
                      <span className="text-[10px] font-bold text-brand-secondary block uppercase mb-1">Rumus Utama (De Morgan)</span>
                      <p className="text-xs font-mono text-brand-primary font-bold">(A + B)' = A' · B'</p>
                    </div>

                    <div className="flex justify-between items-center bg-blue-50/50 rounded p-2.5 border border-blue-100">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-brand-warning" />
                        <span className="text-[11px] text-brand-secondary font-medium">Buku Catatan Digital Siap Digunakan</span>
                      </div>
                      <span className="text-xs text-brand-primary font-bold">Buka</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-text text-white/90 py-16 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4 col-span-1 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary text-white p-1.5 rounded flex items-center justify-center">
                  <Hash className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">
                  Diskrit<span className="text-brand-primary">Learn</span>
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed max-w-sm">
                Platform pembelajaran interaktif terpercaya untuk mempelajari cabang ilmu Matematika Diskrit. Didesain secara khusus untuk menunjang kebutuhan akademis dan dunia digital nyata.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-white/40 mb-4 font-mono">Daftar Materi</h5>
              <ul className="space-y-2 text-xs text-white/70">
                <li><button onClick={() => { onStartLearning("module-boolean"); }} className="hover:text-white transition-colors">Aljabar Boolean</button></li>
                <li><button onClick={() => { onStartLearning("module-probability"); }} className="hover:text-white transition-colors">Peluang &amp; Kombinatorika</button></li>
                <li><button onClick={() => { onStartLearning("module-graph"); }} className="hover:text-white transition-colors">Teori Graf Planar</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-white/40 mb-4 font-mono">Navigasi</h5>
              <div className="grid grid-cols-1 gap-2 text-xs text-white/70">
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-left hover:text-white transition-colors">Home</button>
                <button onClick={() => scrollToId("materi-utama")} className="text-left hover:text-white transition-colors">Materi Syllabus</button>
                <button onClick={() => scrollToId("fitur-platform")} className="text-left hover:text-white transition-colors">Fitur Platform</button>
                <button onClick={() => onStartLearning()} className="text-left hover:text-white transition-colors font-semibold text-brand-primary">Dashboard Belajar</button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between text-xs text-white/40">
            <span>&copy; {new Date().getFullYear()} DiskritLearn Platform. Semua Hak Dilindungi.</span>
            <span>Dikembangkan untuk kurikulum pembelajaran Matematika Diskrit Modern</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
