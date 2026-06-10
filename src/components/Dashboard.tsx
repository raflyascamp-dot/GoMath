import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft,
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Award, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  FileText, 
  MessageSquare, 
  ChevronUp,
  RotateCcw,
  Plus,
  Trash2,
  Bookmark,
  Share2,
  Printer,
  Compass,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { Module, Lesson, Question, Comment } from "../types";
import { QUIZ_QUESTIONS, INITIAL_COMMENTS } from "../data";

interface DashboardProps {
  initialModules: Module[];
  onBackToLanding: () => void;
  selectedModuleId?: string | null;
}

export default function Dashboard({ initialModules, onBackToLanding, selectedModuleId }: DashboardProps) {
  // Navigation & Progress State
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  
  // Collapsible state for modules in sidebar
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "module-boolean": true,
    "module-probability": true,
    "module-graph": true
  });

  // User details
  const [studentName, setStudentName] = useState<string>("Rafli");
  
  // Quiz states
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<Record<string, number>>({});
  const [activeQuizSubmitted, setActiveQuizSubmitted] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState<Record<string, number>>({}); // tracks score per module: { "module-boolean": 2 }

  // Notes state (saved in localStorage)
  const [notesText, setNotesText] = useState<string>("");
  const [showNotes, setShowNotes] = useState<boolean>(true);
  
  // Discussion state
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState<string>("");

  // Completed Lessons list
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  
  // UI triggers
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeAchievement, setActiveAchievement] = useState<{title: string, badge: string} | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Focus module or set initial index from landing route
  useEffect(() => {
    if (selectedModuleId) {
      const idx = modules.findIndex(m => m.id === selectedModuleId);
      if (idx !== -1) {
        setActiveModuleIdx(idx);
        setActiveLessonIdx(0);
        // Expand the active module
        setExpandedModules(prev => ({ ...prev, [selectedModuleId]: true }));
      }
    }
  }, [selectedModuleId, modules]);

  // Read notes from localStorage whenever active lesson changes
  const activeModule = modules[activeModuleIdx];
  const activeLesson = activeModule.lessons[activeLessonIdx];
  
  useEffect(() => {
    if (activeLesson) {
      const savedNote = localStorage.getItem(`note_${activeLesson.id}`);
      setNotesText(savedNote || "");
    }
  }, [activeLessonIdx, activeModuleIdx]);

  // Save notes handler
  const handleSaveNotes = () => {
    localStorage.setItem(`note_${activeLesson.id}`, notesText);
    triggerToast("Catatan Anda berhasil disimpan!");
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Mark lesson as complete
  const handleToggleComplete = (lessonId: string) => {
    let newCompletedList: string[];
    const isAlreadyCompleted = completedLessonIds.includes(lessonId);

    if (isAlreadyCompleted) {
      newCompletedList = completedLessonIds.filter(id => id !== lessonId);
    } else {
      newCompletedList = [...completedLessonIds, lessonId];
      triggerToast("Materi berhasil diselesaikan! +10 XP");
    }

    setCompletedLessonIds(newCompletedList);

    // Calculate modules progress
    const updatedModules = modules.map(m => {
      const totalLessons = m.lessons.length;
      const completed = m.lessons.filter(l => newCompletedList.includes(l.id)).length;
      return {
        ...m,
        progress: Math.round((completed / totalLessons) * 100)
      };
    });
    setModules(updatedModules);

    // Check if the current module is now fully completed
    const currentModuleObj = updatedModules[activeModuleIdx];
    const originalProgress = modules[activeModuleIdx].progress;
    if (currentModuleObj.progress === 100 && originalProgress < 100) {
      setActiveAchievement({
        title: `Selamat! Kamu menyelesaikan modul ${currentModuleObj.title}`,
        badge: currentModuleObj.badge
      });
    }
  };

  // Toggle module expansion in sidebar
  const toggleModuleCollapse = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Math Factorial solver
  const fact = (num: number): number => {
    if (num <= 1) return 1;
    return num * fact(num - 1);
  };

  // ==========================================
  // WIDGET 1: TRUTH TABLE GENERATOR LOGIC
  // ==========================================
  const [tbInputA, setTbInputA] = useState(true);
  const [tbInputB, setTbInputB] = useState(false);
  const [tbCustomFunc, setTbCustomFunc] = useState<"AND" | "OR" | "NAND" | "NOR" | "XOR" | "XNOR">("AND");

  // ==========================================
  // WIDGET 2: KARNAUGH MAP (2x4) FOR SOP/POS
  // ==========================================
  // Variables: A (row: 0, 1), BC (cols: 00, 01, 11, 10)
  // cells indexed as A_BC (binary value / minterm order:
  // m0 = A'B'C' (A=0, BC=00)
  // m1 = A'B'C (A=0, BC=01)
  // m2 = A'BC (A=0, BC=11) -> Wait, Gray code column is 00, 01, 11, 10
  // Index value mapped below:
  const kmapCellMapping = [
    { label: "m0", spec: "A'B'C'", row: 0, colBin: "00", colVal: 0, valIndex: 0 },
    { label: "m1", spec: "A'B'C",  row: 0, colBin: "01", colVal: 1, valIndex: 1 },
    { label: "m3", spec: "A'BC",   row: 0, colBin: "11", colVal: 3, valIndex: 3 }, // Note Gray Code order!
    { label: "m2", spec: "A'BC'",  row: 0, colBin: "10", colVal: 2, valIndex: 2 },
    { label: "m4", spec: "AB'C'",  row: 1, colBin: "00", colVal: 4, valIndex: 4 },
    { label: "m5", spec: "AB'C",   row: 1, colBin: "01", colVal: 5, valIndex: 5 },
    { label: "m7", spec: "ABC",    row: 1, colBin: "11", colVal: 7, valIndex: 7 },
    { label: "m6", spec: "ABC'",   row: 1, colBin: "10", colVal: 6, valIndex: 6 }
  ];
  const [kmapValues, setKmapValues] = useState<Record<number, number>>({
    0: 0, 1: 1, 2: 0, 3: 1,
    4: 1, 5: 0, 6: 0, 7: 1
  });

  const toggleKmapCell = (valIndex: number) => {
    setKmapValues(prev => ({
      ...prev,
      [valIndex]: prev[valIndex] === 0 ? 1 : 0
    }));
  };

  // Generate SOP string based on KMap active cells
  const getKmapSopString = () => {
    const minterms = Object.entries(kmapValues)
      .filter(([_, value]) => value === 1)
      .map(([idx, _]) => `m${idx}`);
    
    if (minterms.length === 0) return "F = 0";
    if (minterms.length === 8) return "F = 1 (Sederhana Mutlak)";

    // Let's create visual SOP formulation
    const parts = Object.entries(kmapValues)
      .filter(([_, value]) => value === 1)
      .map(([idx, _]) => {
        const i = parseInt(idx);
        const mapped = kmapCellMapping.find(c => c.valIndex === i);
        return mapped ? mapped.spec : `m${i}`;
      });

    return `F = ` + parts.join(" + ") + ` = Σ(${minterms.map(m => m.replace("m", "")).join(", ")})`;
  };

  // ==========================================
  // WIDGET 3: COMBINATORICS EXPLAINER (N & R) + WORD PERMUTATIONS
  // ==========================================
  const [combN, setCombN] = useState<number>(6);
  const [combR, setCombR] = useState<number>(3);
  const [wordInput, setWordInput] = useState<string>("BOSAN");

  // Word analyzer logic
  const analyzeWordPermutations = (word: string) => {
    const cleanWord = word.trim().toUpperCase();
    if (!cleanWord) return { count: 0, letters: {}, formula: "", breakdown: "" };
    
    const countMap: Record<string, number> = {};
    for (const char of cleanWord) {
      countMap[char] = (countMap[char] || 0) + 1;
    }

    const n = cleanWord.length;
    let denominatorFactorialVal = 1;
    const repeatsList: string[] = [];

    Object.entries(countMap).forEach(([char, count]) => {
      if (count > 1) {
        denominatorFactorialVal *= fact(count);
        repeatsList.push(`${char}: ${count}!`);
      }
    });

    const numerator = fact(n);
    const resultCount = Math.round(numerator / denominatorFactorialVal);
    
    const formulaText = repeatsList.length > 0 
      ? `${n}! / (${repeatsList.map(item => item.split(": ")[1]).join(" × ")})`
      : `${n}!`;

    const explanationBreakdown = repeatsList.length > 0
      ? `Kata "${cleanWord}" memiliki ${n} huruf dengan pengulangan karakter: ${Object.entries(countMap).filter(([_, c]) => c > 1).map(([char, count]) => `huruf "${char}" diulang ${count} kali`).join(", ")}.`
      : `Kata "${cleanWord}" memiliki ${n} huruf yang semuanya unik (tidak ada karakter pengulangan).`;

    return {
      count: resultCount,
      letters: countMap,
      formula: formulaText,
      breakdown: explanationBreakdown
    };
  };

  const wordResult = analyzeWordPermutations(wordInput);

  // ==========================================
  // WIDGET 4: INTERACTIVE GRAPH CANVAS (EULER)
  // ==========================================
  const [graphNodes, setGraphNodes] = useState<{ id: string, label: string, x: number, y: number }[]>([
    { id: "v1", label: "A", x: 60, y: 30 },
    { id: "v2", label: "B", x: 190, y: 15 },
    { id: "v3", label: "C", x: 280, y: 70 },
    { id: "v4", label: "D", x: 190, y: 125 },
    { id: "v5", label: "E", x: 60, y: 110 }
  ]);

  const [graphEdges, setGraphEdges] = useState<{ id: string, from: string, to: string }[]>([
    { id: "e1", from: "v1", to: "v2" },
    { id: "e2", from: "v2", to: "v3" },
    { id: "e3", from: "v3", to: "v4" },
    { id: "v4", from: "v4", to: "v5" },
    { id: "e5", from: "v5", to: "v1" },
    { id: "e6", from: "v1", to: "v4" },
    { id: "e7", from: "v2", to: "v4" }
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Handle vertex selection & connection toggling
  const handleNodeClick = (id: string) => {
    if (!selectedNodeId) {
      setSelectedNodeId(id);
    } else {
      if (selectedNodeId !== id) {
        // Toggle the edge
        const alreadyConnected = graphEdges.find(
          e => (e.from === selectedNodeId && e.to === id) || (e.from === id && e.to === selectedNodeId)
        );

        if (alreadyConnected) {
          // Remove edge
          setGraphEdges(prev => prev.filter(e => e.id !== alreadyConnected.id));
        } else {
          // Add edge
          const newEdge = {
            id: `e_${Date.now()}`,
            from: selectedNodeId,
            to: id
          };
          setGraphEdges(prev => [...prev, newEdge]);
        }
      }
      setSelectedNodeId(null);
    }
  };

  // Quick Presets for Graph theory
  const applyPresetGraph = (preset: "planar" | "k4" | "cycle") => {
    if (preset === "planar") {
      setGraphEdges([
        { id: "p1", from: "v1", to: "v2" },
        { id: "p2", from: "v2", to: "v3" },
        { id: "p3", from: "v3", to: "v4" },
        { id: "p4", from: "v4", to: "v5" },
        { id: "p5", from: "v5", to: "v1" }
      ]);
    } else if (preset === "k4") {
      setGraphEdges([
        { id: "k1", from: "v1", to: "v2" },
        { id: "k2", from: "v2", to: "v3" },
        { id: "k3", from: "v3", to: "v4" },
        { id: "k4", from: "v4", to: "v1" },
        { id: "k5", from: "v1", to: "v3" },
        { id: "k6", from: "v2", to: "v4" }
      ]);
    } else {
      setGraphEdges([
        { id: "c1", from: "v1", to: "v2" },
        { id: "c2", from: "v2", to: "v3" },
        { id: "c3", from: "v3", to: "v1" }
      ]);
    }
    triggerToast("Gaya graf berhasil disetel!");
  };

  // Euler computations
  const graphV = graphNodes.length;
  const graphE = graphEdges.length;
  // Euler planar formula: V - E + F = 2 => F = E - V + 2
  const graphF = graphE - graphV + 2;

  // Planar limits solver: E <= 3V - 6
  const planarMaxEdges = 3 * graphV - 6;
  const isSafarPlanar = graphE <= planarMaxEdges;

  // Check total completion percentage
  const totalLessonsCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompletedCount = completedLessonIds.length;
  const totalPercentage = Math.round((totalCompletedCount / totalLessonsCount) * 100);

  // Community discussion handlers
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comm_${Date.now()}`,
      userName: "Anda (Mahasiswa)",
      userRole: "Pengguna DiskritLearn",
      text: newCommentText,
      likes: 0,
      timestamp: "Seketika sebelumnya"
    };

    setComments(prev => [newComment, ...prev]);
    setNewCommentText("");
    triggerToast("Komentar diskusi dipublikasikan!");
  };

  const handleLikeComment = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  // Next and Previous lesson selectors
  const handleNextLesson = () => {
    if (activeLessonIdx < activeModule.lessons.length - 1) {
      setActiveLessonIdx(prev => prev + 1);
    } else if (activeModuleIdx < modules.length - 1) {
      setActiveModuleIdx(prev => prev + 1);
      setActiveLessonIdx(0);
    } else {
      triggerToast("Hebat! Anda telah berada di materi penutup kurikulum.");
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(prev => prev - 1);
    } else if (activeModuleIdx > 0) {
      setActiveModuleIdx(prev => prev - 1);
      setActiveLessonIdx(modules[activeModuleIdx - 1].lessons.length - 1);
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen font-sans">
      {/* Top Main Navbar */}
      <nav className="bg-white border-b border-brand-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Back button and title */}
            <div className="flex items-center gap-4">
              <button 
                onClick={onBackToLanding}
                className="p-2 -ml-2 text-brand-secondary hover:text-brand-text hover:bg-brand-bg rounded-lg transition-all flex items-center gap-1.5 font-medium text-xs border border-transparent hover:border-brand-border"
                id="back-to-landing-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                Landing Page
              </button>
              <div className="h-5 w-px bg-brand-border block"></div>
              <div>
                <span className="text-[11px] text-brand-secondary block leading-none font-semibold uppercase tracking-wider font-mono">DiskritLearn Platform</span>
                <span className="font-bold text-sm text-brand-text">Area Kelas Belajar</span>
              </div>
            </div>

            {/* Total Student Progress tracker banner */}
            <div className="hidden lg:flex items-center gap-6 text-xs">
              <div className="text-right">
                <span className="block text-brand-secondary">Status Kelulusan Kurikulum</span>
                <span className="font-bold text-brand-text">{totalCompletedCount} dari {totalLessonsCount} materi diselesaikan ({totalPercentage}%)</span>
              </div>
              <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-success h-full transition-all duration-500" style={{ width: `${totalPercentage}%` }}></div>
              </div>
              
              {/* Certificate Unlock Banner */}
              {totalPercentage >= 60 ? (
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="bg-brand-warning text-brand-text font-bold px-3 py-1.5 rounded flex items-center gap-1.5 hover:shadow transition-all"
                  id="unlock-cert-badge-btn"
                >
                  <Award className="w-4 h-4 animate-bounce" />
                  Klaim Sertifikat
                </button>
              ) : (
                <div className="bg-brand-bg text-brand-secondary font-medium px-2.5 py-1.5 rounded border border-brand-border flex items-center gap-1" title="Selesaikan minimal 60% kurikulum untuk membuka sertifikat!">
                  <Award className="w-3.5 h-3.5" />
                  Sertifikat Terkunci
                </div>
              )}
            </div>

            {/* User name customiser */}
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-brand-secondary block uppercase font-bold font-mono">Identitas Mahasiswa</span>
                <input 
                  type="text" 
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ketik Nama Anda"
                  className="text-xs font-semibold text-brand-text border-b border-brand-border hover:border-brand-primary focus:border-brand-primary bg-transparent text-right outline-none w-28 transition-colors pb-0.5"
                  title="Nama ini akan dicetak otomatis di sertifikat kelulusan!"
                />
              </div>
              <div className="h-8 w-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm shadow-sm font-mono border border-brand-primary/20">
                {studentName ? studentName.charAt(0).toUpperCase() : "U"}
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Course Core Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================= */}
          {/* SIDEBAR MINI MODULE LIST (LEFT PANEL - col-span-3) */}
          {/* ========================================================= */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-brand-border rounded-lg shadow-brand p-4">
              <div className="flex items-center justify-between mb-3 border-b border-brand-border pb-3">
                <h4 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
                  <BookOpen className="w-4.5 h-4.5 text-brand-primary" />
                  Struktur Silabus
                </h4>
                <span className="text-[11px] font-mono font-bold bg-blue-50 text-brand-primary px-1.5 py-0.5 rounded border border-blue-100">
                  3 Modul
                </span>
              </div>

              {/* Module collapsible loop */}
              <div className="space-y-3">
                {modules.map((m, mIdx) => {
                  const mId = m.id;
                  const isExpanded = !!expandedModules[mId];
                  const isActiveModule = mIdx === activeModuleIdx;

                  return (
                    <div key={mId} className="border border-brand-border rounded-lg overflow-hidden bg-brand-bg/40">
                      
                      {/* Module title control block */}
                      <button 
                        onClick={() => toggleModuleCollapse(mId)}
                        className={`w-full p-2.5 flex items-center justify-between transition-colors text-left font-sans ${isActiveModule ? "bg-white border-b border-brand-border" : "hover:bg-brand-bg bg-white"}`}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wide block">
                            Modul {mIdx + 1}
                          </span>
                          <span className={`text-xs font-bold leading-tight block ${isActiveModule ? "text-brand-text font-extrabold" : "text-brand-secondary"}`}>
                            {m.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-1">
                          <span className="text-[10px] font-mono font-bold text-brand-success bg-emerald-50 px-1 rounded border border-emerald-100">
                            {m.progress}%
                          </span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                      {/* Lessons loop inside expanded module */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="bg-white overflow-hidden divide-y divide-brand-border/60"
                          >
                            {m.lessons.map((lesson, lIdx) => {
                              const isCurrentActive = isActiveModule && lIdx === activeLessonIdx;
                              const isCompleted = completedLessonIds.includes(lesson.id);

                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => {
                                    setActiveModuleIdx(mIdx);
                                    setActiveLessonIdx(lIdx);
                                  }}
                                  className={`w-full text-left p-2.5 text-xs transition-all flex items-start gap-2.5 font-sans ${isCurrentActive ? "bg-blue-50/55 border-l-4 border-brand-primary pl-2 shadow-inner" : "hover:bg-brand-bg pl-3"}`}
                                >
                                  {/* Progress indicator state */}
                                  <div className="mt-0.5 shrink-0">
                                    {isCompleted ? (
                                      <CheckCircle className="w-3.5 h-3.5 text-brand-success stroke-[2.5]" id={`check-${lesson.id}`} />
                                    ) : isCurrentActive ? (
                                      <span className="w-3.5 h-3.5 rounded-full border-2 border-brand-primary flex items-center justify-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping"></span>
                                      </span>
                                    ) : (
                                      <span className="w-3.5 h-3.5 rounded-full border border-gray-300 bg-white block"></span>
                                    )}
                                  </div>

                                  <div className="space-y-1 flex-1 min-w-0">
                                    <span className={`block leading-snug break-words ${isCurrentActive ? "font-bold text-brand-primary" : "text-brand-text font-medium"}`}>
                                      {lesson.title}
                                    </span>
                                    <div className="flex gap-2 items-center text-[10px] text-brand-secondary">
                                      <span>{lesson.duration}</span>
                                      <span>•</span>
                                      <span className={`${lesson.difficulty === "Dasar" ? "text-brand-success" : lesson.difficulty === "Menengah" ? "text-amber-600" : "text-brand-error"}`}>{lesson.difficulty}</span>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </div>

              {/* Total reset button helper */}
              <div className="mt-5 border-t border-brand-border pt-4">
                <button
                  onClick={() => {
                    setCompletedLessonIds([]);
                    setKmapValues({ 0: 0, 1: 1, 2: 0, 3: 1, 4: 1, 5: 0, 6: 0, 7: 1 });
                    setActiveQuizAnswers({});
                    setActiveQuizSubmitted({});
                    triggerToast("Progress belajar kelas berhasil dimulai ulang.");
                  }}
                  className="w-full text-center py-2 bg-brand-bg hover:bg-red-50 text-brand-secondary hover:text-brand-error rounded-lg text-[11px] font-semibold transition-colors border border-brand-border flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Mulai Ulang Materi Kelas
                </button>
              </div>

            </div>
          </aside>

          {/* ========================================================= */}
          {/* MAIN CONTENT AREA - MODULE CONTENT TRACK (col-span-6) */}
          {/* ========================================================= */}
          <main className="col-span-12 lg:col-span-6 space-y-6">
            
            {/* Navigational breadcrumbs */}
            <div className="bg-white border border-brand-border rounded-lg p-4 shadow-brand flex items-center justify-between">
              <div className="text-xs text-brand-secondary flex items-center gap-1.5 flex-wrap">
                <span>Dashboard</span>
                <ChevronRight className="w-3 h-3" />
                <span>Matematika Diskrit</span>
                <ChevronRight className="w-3 h-3" />
                <span className="font-bold text-brand-primary">{activeModule.title}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className={`font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[10px] ${activeLesson.difficulty === "Dasar" ? "bg-emerald-50 text-brand-success border border-emerald-100" : "bg-blue-50 text-brand-primary border border-blue-100"}`}>
                  {activeLesson.difficulty}
                </span>
                <span className="text-brand-secondary font-mono">{activeLesson.duration}</span>
              </div>
            </div>

            {/* Core dynamic content card */}
            <article className="bg-white border border-brand-border rounded-lg shadow-brand p-6 space-y-6">
              
              {/* Header Title inside class paper */}
              <div className="space-y-2 border-b border-brand-border pb-4">
                <span className="text-xs font-semibold text-brand-primary uppercase tracking-widest font-mono">
                  Pelajaran {activeLessonIdx + 1} dari {activeModule.lessons.length}
                </span>
                <h2 className="text-2xl font-extrabold text-brand-text tracking-tight">
                  {activeLesson.title}
                </h2>
                <p className="text-sm text-brand-secondary font-medium">Modul Pembelajaran Pendamping DiskritLearn</p>
              </div>

              {/* Dynamic Course Curriculum Content Renderer */}
              {/* 1. MODULE AL JABAR BOOLEAN CUSTOM LESSON WRITER */}
              {activeModule.id === "module-boolean" && (
                <div className="space-y-5 text-sm text-brand-text leading-relaxed">
                  
                  {activeLesson.id === "boolean-intro" && (
                    <>
                      <p>
                        <strong>Aljabar Boolean</strong> dibangun pertamakali oleh matematikawan Inggris bernama George Boole pada abad ke-19. Struktur matematika ini mendasari operasi logika digital, pemodelan himpunan, dan rekayasa mikroprosesor komputer.
                      </p>
                      
                      {/* Tujuan Pembelajaran Card */}
                      <div className="bg-blue-50/55 p-4 rounded-xl border border-blue-100 space-y-2 my-4">
                        <span className="text-xs font-bold font-mono text-brand-primary uppercase flex items-center gap-1"><Award className="w-4 h-4" /> Tujuan Pembelajaran:</span>
                        <ul className="list-disc pl-5 text-xs text-brand-secondary space-y-1">
                          <li>Memahami latar belakang George Boole dan fungsi sakelar digital</li>
                          <li>Mengenal operator +, ·, dan komplemen (')</li>
                          <li>Memahami aplikasi Aljabar Boolean pada sistem biner komputer</li>
                        </ul>
                      </div>

                      <h4 className="text-base font-bold text-brand-text mt-4">Mengapa Aljabar Boolean Penting?</h4>
                      <p>
                        Komputer hanya memproses kombinasi bit <strong>0 (salah)</strong> and <strong>1 (benar)</strong>. Aljabar Boolean merumuskan kalkulus logis untuk menyederhanakan perkabelan fisik gerbang-gerbang logika menjadi rumus matematika sederhana sehingga integrasi fisis chip sirkuit dapat diproduksi sekecil mungkin.
                      </p>
                    </>
                  )}

                  {activeLesson.id === "boolean-def" && (
                    <>
                      <p>
                        Secara deduktif formal, sebuah Aljabar Boolean adalah struktur aljabar yang didefinisikan pada sebuah himpunan elemen B dengan dua operator biner yang dilambangkan dengan <code className="font-mono bg-brand-bg px-1 rounded font-bold text-brand-primary">+</code> (OR) dan <code className="font-mono bg-brand-bg px-1 rounded font-bold text-brand-primary">·</code> (AND), serta satu operator unier <code className="font-mono bg-brand-bg px-1 rounded font-bold text-brand-primary">'</code> (NOT / komplemen).
                      </p>
                      
                      <div className="my-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                        <span className="text-xs font-bold font-mono text-amber-800 uppercase block mb-1">Definisi Aksioma Huntington:</span>
                        <p className="text-xs text-amber-950 font-serif leading-relaxed">
                          "Struktur (B, +, ·, ', 0, 1) disebut Aljabar Boolean apabila untuk setiap a, b, c ∈ B memenuhi postulat penutupan (closure), distributif, identitas, dan komplemen."
                        </p>
                      </div>

                      <h4 className="text-base font-bold text-brand-text">Elemen Netral / Identitas</h4>
                      <ul className="list-disc pl-5 space-y-1 py-1 text-xs">
                        <li>Identitas penjumlahan: <code className="font-mono bg-brand-bg px-1 text-brand-primary">a + 0 = a</code></li>
                        <li>Identitas perkalian: <code className="font-mono bg-brand-bg px-1 text-brand-primary">a · 1 = a</code></li>
                      </ul>
                    </>
                  )}

                  {activeLesson.id === "boolean-2-values" && (
                    <>
                      <p>
                        <strong>Aljabar Boolean Dua-Nilai</strong> mendefinisikan himpunan B yang hanya beranggotakan dua elemen, yaitu <code className="font-mono bg-brand-bg px-1 font-bold">B = &#123;0, 1&#125;</code>. Ini adalah basis sistem komputasi modern.
                      </p>

                      <div className="bg-white border border-brand-border p-4 rounded-xl">
                        <span className="text-xs font-bold text-brand-secondary block uppercase mb-2">Simulasi Operasi AND, OR &amp; NOT:</span>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <button 
                            onClick={() => { setTbInputA(!tbInputA); }} 
                            className={`p-2 rounded font-mono text-xs font-bold text-white transition-colors ${tbInputA ? "bg-brand-primary" : "bg-gray-400"}`}
                          >
                            A = {tbInputA ? "1" : "0"} (Klik toggle)
                          </button>
                          <button 
                            onClick={() => { setTbInputB(!tbInputB); }} 
                            className={`p-2 rounded font-mono text-xs font-bold text-white transition-colors ${tbInputB ? "bg-brand-primary" : "bg-gray-400"}`}
                          >
                            B = {tbInputB ? "1" : "0"} (Klik toggle)
                          </button>
                          <div className="p-2 border border-brand-border rounded flex flex-col justify-center bg-brand-bg">
                            <span className="text-[9px] text-brand-secondary leading-none">A · B (AND)</span>
                            <span className="text-xs font-bold text-brand-text mt-1">{tbInputA && tbInputB ? "1" : "0"}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "boolean-laws" && (
                    <>
                      <p>
                        Berikut adalah daftar tabel hukum sirkuit logika penting untuk menyederhanakan fungsi boolean majemuk:
                      </p>
                      
                      <div className="bg-brand-bg border border-brand-border rounded-lg overflow-hidden my-3">
                        <table className="w-full text-xs divide-y divide-brand-border">
                          <thead className="bg-white">
                            <tr>
                              <th className="p-2.5 text-left font-bold text-brand-secondary">Nama Hukum</th>
                              <th className="p-2.5 text-left font-bold text-brand-secondary">Bentuk Penjumlahan (+)</th>
                              <th className="p-2.5 text-left font-bold text-brand-secondary">Bentuk Perkalian (·)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brand-border/60">
                            <tr>
                              <td className="p-2.5 font-bold">1. Identitas</td>
                              <td className="p-2.5 font-mono">a + 0 = a</td>
                              <td className="p-2.5 font-mono">a · 1 = a</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-bold">2. Komplemen</td>
                              <td className="p-2.5 font-mono">a + a' = 1</td>
                              <td className="p-2.5 font-mono">a · a' = 0</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-bold">3. Idempoten</td>
                              <td className="p-2.5 font-mono">a + a = a</td>
                              <td className="p-2.5 font-mono">a · a = a</td>
                            </tr>
                            <tr>
                              <td className="p-2.5 font-bold">4. De Morgan</td>
                              <td className="p-2.5 font-mono font-semibold text-brand-primary">(a + b)' = a'b'</td>
                              <td className="p-2.5 font-mono font-semibold text-brand-primary">(ab)' = a' + b'</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "boolean-gates" && (
                    <>
                      <p>
                        Gerbang logika adalah implementasi fisik rangkaian transistor biner. Di bawah ini adalah simulator gerbang logika diskrit secara komprehensif. Pilih gerbang dan lihat hasil keluarannya:
                      </p>

                      <div className="bg-white border border-brand-border p-4 rounded-xl space-y-4">
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {["AND", "OR", "NAND", "NOR", "XOR", "XNOR"].map(gate => (
                            <button
                              key={gate}
                              onClick={() => setTbCustomFunc(gate as any)}
                              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${tbCustomFunc === gate ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-secondary hover:bg-brand-border"}`}
                            >
                              Gate: {gate}
                            </button>
                          ))}
                        </div>

                        <div className="bg-brand-bg border border-brand-border p-4 rounded-lg flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
                          <div className="flex gap-4">
                            <div className="space-y-1">
                              <span className="text-[10px] text-brand-secondary uppercase font-bold block">Input A</span>
                              <button onClick={() => setTbInputA(!tbInputA)} className={`w-12 py-1.5 rounded font-mono font-bold text-white transition-colors ${tbInputA ? "bg-brand-primary" : "bg-gray-400"}`}>
                                {tbInputA ? "1" : "0"}
                              </button>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-brand-secondary uppercase font-bold block">Input B</span>
                              <button onClick={() => setTbInputB(!tbInputB)} className={`w-12 py-1.5 rounded font-mono font-bold text-white transition-colors ${tbInputB ? "bg-brand-primary" : "bg-gray-400"}`}>
                                {tbInputB ? "1" : "0"}
                              </button>
                            </div>
                          </div>

                          <div className="h-10 w-0.5 bg-brand-border hidden sm:block"></div>

                          <div className="space-y-1">
                            {/* Calculation logic */}
                            {(() => {
                              let ans = false;
                              if (tbCustomFunc === "AND") ans = tbInputA && tbInputB;
                              else if (tbCustomFunc === "OR") ans = tbInputA || tbInputB;
                              else if (tbCustomFunc === "NAND") ans = !(tbInputA && tbInputB);
                              else if (tbCustomFunc === "NOR") ans = !(tbInputA || tbInputB);
                              else if (tbCustomFunc === "XOR") ans = tbInputA !== tbInputB;
                              else if (tbCustomFunc === "XNOR") ans = tbInputA === tbInputB;

                              return (
                                <>
                                  <span className="text-[10px] text-brand-secondary uppercase font-bold block">Keluaran Gerbang ({tbCustomFunc})</span>
                                  <span className={`text-xl font-mono font-bold block ${ans ? "text-brand-success" : "text-brand-error"}`}>
                                    {ans ? "1 (AKTIF)" : "0 (MATI)"}
                                  </span>
                                </>
                              );
                            })()}
                          </div>
                        </div>

                        {/* Symbolic schema drawing */}
                        <div className="h-24 bg-brand-bg border border-brand-border rounded flex items-center justify-center relative overflow-hidden">
                          {/* Beautiful line logic schematics representing active logic flows */}
                          <svg className="w-56 h-16" viewBox="0 0 200 60">
                            {/* Inputs lines */}
                            <line x1="20" y1="20" x2="80" y2="20" stroke={tbInputA ? "#1FA15F" : "#D6DBDF"} strokeWidth="2.5" />
                            <text x="12" y="24" fontSize="11" fontWeight="bold" fill="#5C5C5C">A</text>
                            
                            <line x1="20" y1="40" x2="80" y2="40" stroke={tbInputB ? "#1FA15F" : "#D6DBDF"} strokeWidth="2.5" />
                            <text x="12" y="44" fontSize="11" fontWeight="bold" fill="#5C5C5C">B</text>

                            {/* Gate Graphic */}
                            <rect x="80" y="12" width="40" height="36" rx="6" fill="#0056D2" />
                            <text x="100" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">{tbCustomFunc}</text>

                            {/* Output line */}
                            {(() => {
                              let ans = false;
                              if (tbCustomFunc === "AND") ans = tbInputA && tbInputB;
                              else if (tbCustomFunc === "OR") ans = tbInputA || tbInputB;
                              else if (tbCustomFunc === "NAND") ans = !(tbInputA && tbInputB);
                              else if (tbCustomFunc === "NOR") ans = !(tbInputA || tbInputB);
                              else if (tbCustomFunc === "XOR") ans = tbInputA !== tbInputB;
                              else if (tbCustomFunc === "XNOR") ans = tbInputA === tbInputB;

                              return (
                                <line x1="120" y1="30" x2="180" y2="30" stroke={ans ? "#1FA15F" : "#D6DBDF"} strokeWidth="2.5" />
                              );
                            })()}
                            <text x="188" y="34" fontSize="11" fontWeight="bold" fill="#5C5C5C">F</text>
                          </svg>
                        </div>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "boolean-sop-pos" && (
                    <>
                      <p>
                        Setiap fungsi Boolean selalu dapat diekspresikan sebagai gabungan baris tabel kebenarannya dalam bentuk kanonikal:
                      </p>
                      <ul className="list-decimal pl-5 space-y-2 text-xs">
                        <li>
                          <strong>SOP (Sum of Products) / Jumlah dari Hasil Kali</strong>: dibangun dengan mengambil baris-baris ber-keluaran <strong className="text-brand-success">1</strong>, menggunakan literal perkalian (<strong className="text-brand-primary">Minterm</strong>).
                        </li>
                        <li>
                          <strong>POS (Product of Sums) / Hasil Kali dari Jumlah</strong>: dibangun dengan mengambil baris-baris ber-keluaran <strong className="text-brand-error">0</strong>, menggunakan literal penjumlahan (<strong className="text-brand-primary">Maxterm</strong>).
                        </li>
                      </ul>
                      <div className="bg-white border border-brand-border p-4 rounded-xl space-y-1.5 font-mono text-xs">
                        <span className="text-[10px] text-brand-secondary uppercase block">Contoh Fungsi SOP:</span>
                        <p className="font-bold text-brand-primary">f(x, y, z) = x'yz + xyz' + xyz = Σ(3, 6, 7)</p>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "boolean-kmap" && (
                    <>
                      <p>
                        <strong>Peta Karnaugh (K-Map)</strong> adalah diagram grafis 2-dimensi yang digunakan untuk meminimalkan fungsi logika Boolean alih-alih menggunakan serangkaian teorema hukum aljabar yang rumit.
                      </p>

                      <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 mb-2">
                        <span className="text-xs font-bold text-brand-primary uppercase block mb-1">Pengelompokkan K-Map Grid (Gray Code):</span>
                        <p className="text-xs text-brand-secondary leading-relaxed">
                          Kolom disusun berderet mengikuti urutan Gray Code (00, 01, 11, 10). Perubahan bit antar kolom tetangga hanya sebesar 1-bit, memungkinkan penyederhanaan seluler instan.
                        </p>
                      </div>

                      {/* Interactive KMap Solver Card */}
                      <div className="bg-white border border-brand-border p-4 rounded-xl space-y-4">
                        <div className="flex justify-between items-center bg-brand-bg px-3 py-1.5 rounded">
                          <span className="text-[11px] font-bold text-brand-secondary">K-Map 2x4 (Variabel A dan BC)</span>
                          <span className="text-[10px] font-bold text-brand-primary uppercase bg-white px-2 py-0.5 rounded border border-brand-border/60">Klik sel untuk merubah nilai 0/1</span>
                        </div>

                        {/* Grid container */}
                        <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-mono">
                          {/* Row headers column */}
                          <div className="p-2 font-bold text-brand-secondary self-center">A \ BC</div>
                          {["00", "01", "11", "10"].map(header => (
                            <div key={header} className="p-2 font-bold text-brand-secondary bg-brand-bg rounded">
                              {header}
                            </div>
                          ))}

                          {/* Row 1 (A = 0) */}
                          <div className="p-2 font-bold text-brand-secondary bg-brand-bg rounded self-center">A = 0</div>
                          {[0, 1, 3, 2].map(valIdx => {
                            const mapped = kmapCellMapping.find(c => c.valIndex === valIdx)!;
                            return (
                              <button
                                key={valIdx}
                                onClick={() => toggleKmapCell(valIdx)}
                                className={`p-4 rounded-lg font-bold text-sm transition-all border ${kmapValues[valIdx] === 1 ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-hover" : "bg-white text-gray-400 border-badge-border hover:bg-blue-50/30"}`}
                              >
                                {kmapValues[valIdx]}
                                <span className="block text-[9px] font-normal text-white/70 block mt-1 font-sans">{mapped.label}</span>
                              </button>
                            );
                          })}

                          {/* Row 2 (A = 1) */}
                          <div className="p-2 font-bold text-brand-secondary bg-brand-bg rounded self-center md:whitespace-nowrap">A = 1</div>
                          {[4, 5, 7, 6].map(valIdx => {
                            const mapped = kmapCellMapping.find(c => c.valIndex === valIdx)!;
                            return (
                              <button
                                key={valIdx}
                                onClick={() => toggleKmapCell(valIdx)}
                                className={`p-4 rounded-lg font-bold text-sm transition-all border ${kmapValues[valIdx] === 1 ? "bg-brand-primary text-white border-brand-primary hover:bg-brand-hover" : "bg-white text-gray-400 border-badge-border hover:bg-blue-50/30"}`}
                              >
                                {kmapValues[valIdx]}
                                <span className="block text-[9px] font-normal text-white/70 block mt-1 font-sans">{mapped.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* SOP Result mapping */}
                        <div className="bg-brand-bg border border-brand-border p-3 rounded-lg font-mono text-center">
                          <span className="text-[10px] text-brand-secondary block uppercase mb-1">Hasil Ekspresi SOP Kanonikal:</span>
                          <span className="font-bold text-brand-primary text-xs break-all">{getKmapSopString()}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Fallback general content */}
                  {!["boolean-intro", "boolean-def", "boolean-2-values", "boolean-laws", "boolean-gates", "boolean-sop-pos", "boolean-kmap"].includes(activeLesson.id) && (
                    <p className="text-xs text-brand-secondary bg-brand-bg rounded p-4 border border-brand-border">
                      Materi detil bab <strong>{activeLesson.title}</strong> memuat ringkasan praktis, hukum Boolean, dan implementasinya pada sirkuit digital. Silakan membaca rangkuman untuk menyelesaikan kuis latihan kompetensi.
                    </p>
                  )}

                </div>
              )}

              {/* 2. MODULE PELUANG, PERMUTASI, KOMBINASI CUSTOM LESSON WRITER */}
              {activeModule.id === "module-probability" && (
                <div className="space-y-5 text-sm text-brand-text leading-relaxed">
                  
                  {activeLesson.id === "prob-theory" && (
                    <>
                      <p>
                        <strong>Teori Kemungkinan / Peluang</strong> adalah salah satu cabang ilmu matematika diskrit yang mendalami frekuensi kemunculan sebuah kejadian (peristiwa) acak dari semesta himpunan ruang sampel total.
                      </p>

                      {/* Diferensiasi Permutasi vs Kombinasi */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="border border-brand-border bg-amber-50/20 p-4 rounded-xl">
                          <h5 className="font-bold text-brand-text mb-1 flex items-center gap-1.5 text-xs uppercase text-amber-700">
                            <TrendingUp className="w-4 h-4" /> Konsep Permutasi
                          </h5>
                          <p className="text-xs text-brand-secondary">
                            Mementingkan urutan elemen. Urutan <code className="font-bold">A-B</code> berbeda dengan <code className="font-bold">B-A</code>. Digunakan untuk menyusun kepengurusan, antrean, nilai tempat, dll.
                          </p>
                        </div>
                        <div className="border border-brand-border bg-emerald-50/20 p-4 rounded-xl">
                          <h5 className="font-bold text-brand-text mb-1 flex items-center gap-1.5 text-xs uppercase text-emerald-700">
                            <Award className="w-4 h-4" /> Konsep Kombinasi
                          </h5>
                          <p className="text-xs text-brand-secondary">
                            Mengabaikan urutan elemen. Urutan <code className="font-bold">A-B</code> setara dengan <code className="font-bold">B-A</code>. Digunakan untuk memilih delegasi, kartu, atau buah.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "prob-filling-slots" && (
                    <>
                      <p>
                        Aturan pengisian tempat (<strong>Kaidah Perkalian</strong> atau <em>Rule of Product</em>) menyatakan bahwa jika sebuah posisi pertama dapat diisi sebanyak m cara, dan posisi kedua dapat diisi sebanyak n cara, maka total cara pengisian posisi secara berurutan adalah <code className="font-mono bg-brand-bg px-1 rounded text-brand-primary font-bold">m × n</code> cara.
                      </p>

                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-xs">
                        <strong>Contoh Kasus Pengisian Tempat:</strong>
                        <p className="mt-1.5 text-brand-secondary">
                          "Budi memiliki 3 celana panjang dan 4 baju kemeja. Berapa banyak cara mencocokkan pakaian?"
                          <br />
                          Jawab: 3 × 4 = <strong>12 pilihan kombinasi pakaian</strong>.
                        </p>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "prob-comb" && (
                    <>
                      <p>
                        <strong>Kombinasi</strong> mendefinisikan pemilihan r elemen dari total n elemen tanpa memperhatikan urutan susunannya. Kombinasi dirumuskan dengan menggunakan pembagi berupa factorial dari r (banyak elemen yang dipilih).
                      </p>

                      {/* Interactive Formula box */}
                      <div className="bg-white border border-brand-border p-4 rounded-xl">
                        <span className="text-xs font-bold text-brand-secondary block uppercase mb-3">Formula Kombinatorika &amp; Permutasi Interaktif:</span>
                        
                        <div className="grid grid-cols-2 gap-4 text-center border-b border-brand-border pb-4 mb-4">
                          <div className="bg-brand-bg p-3 rounded-lg border border-brand-border">
                            <span className="text-[10px] text-brand-secondary uppercase block font-bold mb-1">Permutasi P(n, r)</span>
                            <span className="text-xs font-mono block mb-1">n! / (n - r)!</span>
                          </div>
                          <div className="bg-brand-bg p-3 rounded-lg border border-brand-border">
                            <span className="text-[10px] text-brand-secondary uppercase block font-bold mb-1">Kombinasi C(n, r)</span>
                            <span className="text-xs font-mono block mb-1">n! / [r! (n - r)!]</span>
                          </div>
                        </div>

                        {/* Slider controls */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold font-mono">Jumlah Total Elemen (n) = {combN}</label>
                            <input 
                              type="range" 
                              min="2" 
                              max="12" 
                              value={combN} 
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setCombN(val);
                                if (combR > val) setCombR(val);
                              }}
                              className="w-1/2 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold font-mono">Sampel Elemen Dipilih (r) = {combR}</label>
                            <input 
                              type="range" 
                              min="1" 
                              max={combN} 
                              value={combR} 
                              onChange={(e) => { setCombR(parseInt(e.target.value)); }}
                              className="w-1/2 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                            />
                          </div>
                        </div>

                        {/* Interactive computation readout */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-brand-border text-center">
                          <div className="bg-blue-50/40 p-2 rounded border border-blue-100">
                            <span className="text-[9px] text-brand-secondary uppercase font-bold block">P(n, r) (Urutan Penting)</span>
                            <span className="text-lg font-mono font-bold text-brand-primary">{Math.round(fact(combN) / fact(combN - combR))}</span>
                          </div>
                          <div className="bg-emerald-50/40 p-2 rounded border border-emerald-100">
                            <span className="text-[9px] text-brand-secondary uppercase font-bold block">C(n, r) (Urutan Abaikan)</span>
                            <span className="text-lg font-mono font-bold text-brand-success">{Math.round(fact(combN) / (fact(combR) * fact(combN - combR)))}</span>
                          </div>
                          <div className="bg-amber-50/40 p-2 rounded border border-amber-100 col-span-1">
                            <span className="text-[9px] text-brand-secondary uppercase font-bold block">C Ulang(n, r) (Boleh Ulang)</span>
                            {/* C(n+r-1, r) */}
                            <span className="text-lg font-mono font-bold text-amber-700">
                              {Math.round(fact(combN + combR - 1) / (fact(combR) * fact(combN - 1)))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "prob-perm-repeat" && (
                    <>
                      <p>
                        Jika ada elemen-elemen yang identik atau diulang, maka jumlah susunan permutasinya berkurang karena terbilang setara. Formula susunannya dibagikan oleh faktorial jumlah masing-masing pengulangan.
                      </p>

                      {/* Interactive String Anagram Calculator */}
                      <div className="bg-white border border-brand-border p-4 rounded-xl space-y-4">
                        <div>
                          <label className="text-xs font-bold text-brand-secondary block uppercase mb-1.5">Kata Untuk Dihitung Permutasinya (Ketik Bebas):</label>
                          <input 
                            type="text" 
                            value={wordInput}
                            onChange={(e) => setWordInput(e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase())}
                            className="bg-brand-bg border border-brand-border rounded px-3 py-2 text-sm font-semibold focus:outline-none focus:border-brand-primary w-full"
                            placeholder="Contoh: BOSAN, MATEMATIKA, KATAK"
                          />
                        </div>

                        {wordResult.count > 0 && (
                          <div className="bg-brand-bg border border-brand-border p-3.5 rounded-lg space-y-2 text-xs">
                            <div className="flex justify-between items-center bg-white p-2.5 rounded border border-brand-border font-mono">
                              <span className="text-brand-secondary">Rumus Penyusunan:</span>
                              <span className="font-bold text-brand-primary text-sm">{wordResult.formula}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-2.5 rounded border border-brand-border">
                              <span className="text-brand-secondary">Total Susunan Unik:</span>
                              <span className="font-bold text-brand-success text-base font-mono">{wordResult.count.toLocaleString()} kata</span>
                            </div>
                            <p className="text-[11px] text-brand-secondary italic pt-1">{wordResult.breakdown}</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Fallback lessons helper */}
                  {!["prob-theory", "prob-filling-slots", "prob-comb", "prob-perm-repeat"].includes(activeLesson.id) && (
                    <p className="text-xs text-brand-secondary bg-brand-bg rounded p-4 border border-brand-border">
                      Materi detil bab <strong>{activeLesson.title}</strong> memuat ringkasan praktis, ulasan diagram pohon keputusan, permutasi melingkar (siklis), serta rumus permutasi sebagian elemen. Sering berlatih akan mempertajam pemahaman Anda.
                    </p>
                  )}

                </div>
              )}

              {/* 3. MODULE GRAPH THEORY CUSTOM LESSON WRITER */}
              {activeModule.id === "module-graph" && (
                <div className="space-y-4 text-sm text-brand-text leading-relaxed">
                  
                  {activeLesson.id === "graph-intro" && (
                    <>
                      <p>
                        <strong>Graf</strong> adalah sirkuit abstrak yang memodelkan jaring relasi antar objek. Graf dilambangkan dengan himpunan pasangan <code className="font-mono bg-brand-bg px-1 font-bold">G = (V, E)</code>, di mana <code className="font-mono bg-brand-bg px-1">V</code> adalah himpunan Vertex (simpul) dan <code className="font-mono bg-brand-bg px-1">E</code> adalah himpunan Edges (garis sisi penyambung).
                      </p>
                      
                      <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-200 text-xs">
                        <strong>Simbol Graf:</strong>
                        <ul className="list-disc pl-5 mt-1 text-amber-950 space-y-0.5">
                          <li>V = &#123;A, B, C, D&#125; (Jumlah Vertex = 4)</li>
                          <li>E = &#123;(A,B), (B,C), (C,D), (D,A)&#125; (Jumlah Edges = 4)</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "graph-isomorphic" && (
                    <>
                      <p>
                        Dua buah graf dikatakan <strong>Isomorfik (Isomorphic)</strong> jika keduanya secara struktur identik (isomorf), hanya saja digambarkan dengan penamaan label simpul atau desain rentang koordinat visual yang berbeda.
                      </p>
                      <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 text-xs">
                        <strong>Kaidah Utama Syarat Isomorfis:</strong>
                        <ul className="list-decimal pl-5 mt-1 space-y-1 text-brand-secondary">
                          <li>Memiliki jumlah simpul (V) yang sama.</li>
                          <li>Memiliki jumlah sisi (E) yang sama.</li>
                          <li>Memiliki representasi derajat keterhubungan simpul yang sama persis.</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "graph-euler" && (
                    <>
                      <p>
                        Pada graf planar terhubung sederhana, <strong>Rumus Euler</strong> mendefinisikan hubungan intrinsik yang konstan antara jumlah simpul (<code className="font-mono font-bold text-brand-primary">V</code>), jumlah sisi (<code className="font-mono font-bold text-brand-primary">E</code>), dan jumlah muka bidang (<code className="font-mono font-bold text-brand-primary">F</code>).
                      </p>

                      {/* Interactive Graph Drawing Board Solver */}
                      <div className="bg-white border border-brand-border p-4 rounded-xl space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 bg-brand-bg px-3 py-2 rounded">
                          <div>
                            <span className="font-bold text-xs text-brand-text block leading-none">Papan Graf Planar Edukatif</span>
                            <span className="text-[10px] text-brand-secondary block mt-1">Klik simpul untuk memilih, lalu klik simpul lain untuk memantik jalur sisi baru.</span>
                          </div>
                          
                          {/* Presets dropdown selector */}
                          <div className="flex gap-1">
                            <button onClick={() => applyPresetGraph("cycle")} className="px-2 py-1 bg-white hover:bg-brand-border text-[9px] font-bold rounded border border-brand-border">K3 (Siklus)</button>
                            <button onClick={() => applyPresetGraph("planar")} className="px-2 py-1 bg-white hover:bg-brand-border text-[9px] font-bold rounded border border-brand-border">Planar</button>
                            <button onClick={() => applyPresetGraph("k4")} className="px-2 py-1 bg-white hover:bg-brand-border text-[9px] font-bold rounded border border-brand-border">K4 (Lengkap)</button>
                          </div>
                        </div>

                        {/* Interactive Graph SVG board */}
                        <div className="border border-brand-border bg-white rounded-lg p-2 h-44 relative overflow-hidden flex justify-center">
                          <svg className="w-full h-full max-w-[340px]" viewBox="0 0 340 160">
                            {/* Lines rendering */}
                            {graphEdges.map((edge) => {
                              const fromNode = graphNodes.find(n => n.id === edge.from)!;
                              const toNode = graphNodes.find(n => n.id === edge.to)!;
                              if (!fromNode || !toNode) return null;

                              return (
                                <line
                                  key={edge.id}
                                  x1={fromNode.x}
                                  y1={fromNode.y}
                                  x2={toNode.x}
                                  y2={toNode.y}
                                  stroke="#0056D2"
                                  strokeWidth="2.5"
                                  className="transition-all"
                                />
                              );
                            })}

                            {/* Node rendering */}
                            {graphNodes.map((n) => {
                              const isSelected = selectedNodeId === n.id;
                              return (
                                <g key={n.id} className="cursor-pointer" onClick={() => handleNodeClick(n.id)}>
                                  <circle
                                    cx={n.x}
                                    cy={n.y}
                                    r={isSelected ? "11" : "9"}
                                    fill={isSelected ? "#F5AF02" : "#0056D2"}
                                    className="transition-all"
                                    stroke="#FFFFFF"
                                    strokeWidth="1.5"
                                  />
                                  <text
                                    x={n.x}
                                    y={n.y + 3}
                                    fontSize="8"
                                    textAnchor="middle"
                                    fontWeight="bold"
                                    fill="#FFFFFF"
                                    className="select-none font-mono"
                                  >
                                    {n.label}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>

                          {/* Quick selection notification */}
                          {selectedNodeId && (
                            <div className="absolute top-2 right-2 bg-amber-50 border border-amber-200 text-[10px] text-amber-800 rounded px-2 py-1 font-semibold">
                              Dipilih: {graphNodes.find(n => n.id === selectedNodeId)?.label}. Klik simpul lain!
                            </div>
                          )}
                        </div>

                        {/* Live mathematical calculations of drawn Graph */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                          <div className="bg-brand-bg p-2 rounded border border-brand-border">
                            <span className="text-[9px] uppercase tracking-wider block text-brand-secondary font-bold">Simpul (V)</span>
                            <span className="text-base font-bold font-mono text-brand-text">{graphV}</span>
                          </div>
                          <div className="bg-brand-bg p-2 rounded border border-brand-border">
                            <span className="text-[9px] uppercase tracking-wider block text-brand-secondary font-bold">Jalur Sisi (E)</span>
                            <span className="text-base font-bold font-mono text-brand-text">{graphE}</span>
                          </div>
                          <div className="bg-brand-bg p-2 rounded border border-brand-border">
                            <span className="text-[9px] uppercase tracking-wider block text-brand-secondary font-bold">Muka Face (F)</span>
                            <span className="text-base font-bold font-mono text-brand-text">{graphF}</span>
                          </div>
                          <div className={`p-2 rounded border ${isSafarPlanar ? "bg-emerald-50 border-emerald-100 text-brand-success" : "bg-red-50 border-red-100 text-brand-error"}`}>
                            <span className="text-[9px] uppercase tracking-wider block text-brand-secondary font-bold">Syarat Planar?</span>
                            <span className="text-xs font-bold font-mono block mt-1">{isSafarPlanar ? "✓ Terpenuhi" : "⚠ Melimpah"}</span>
                          </div>
                        </div>

                        {/* Euler equation layout validation */}
                        <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100 text-xs text-center font-mono">
                          Hukum Pembuktian Euler: <strong className="text-brand-text">V - E + F = 2</strong>
                          <div className="text-brand-primary font-bold text-sm mt-1">
                            {graphV} - {graphE} + {graphF} = 2 ✓ (Terbukti Akurat!)
                          </div>
                        </div>

                        {/* Adjacency Matrix generator representation */}
                        <div className="bg-brand-bg p-3 rounded-lg border border-brand-border">
                          <span className="text-[10px] text-brand-secondary block uppercase font-bold mb-1.5 text-center">Matriks Ketetanggaan (Adjacency Matrix G)</span>
                          <div className="flex justify-center">
                            <table className="text-[10px] font-mono border-collapse">
                              <thead>
                                <tr>
                                  <th className="px-1.5 py-0.5"></th>
                                  {graphNodes.map(n => <th key={n.id} className="px-1.5 py-0.5 text-brand-secondary text-center">{n.label}</th>)}
                                </tr>
                              </thead>
                              <tbody>
                                {graphNodes.map((rowNode) => (
                                  <tr key={rowNode.id}>
                                    <td className="px-1.5 py-0.5 text-brand-secondary font-bold">{rowNode.label}</td>
                                    {graphNodes.map((colNode) => {
                                      const isLinked = graphEdges.some(
                                        e => (e.from === rowNode.id && e.to === colNode.id) || (e.from === colNode.id && e.to === rowNode.id)
                                      );
                                      return (
                                        <td key={colNode.id} className={`px-2 py-0.5 text-center font-bold border border-brand-border/40 ${isLinked ? "text-brand-primary bg-blue-50" : "text-gray-300"}`}>
                                          {isLinked ? "1" : "0"}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeLesson.id === "graph-forming-dual" && (
                    <>
                      <p>
                        Graf Dual (dilambangkan <code className="font-mono">G*</code>) dibentuk dari graf planar bidang <code className="font-mono">G</code> dengan menempatkan satu simpul dual pada setiap daerah (muka) dari <code className="font-mono">G</code>.
                      </p>

                      {/* Stepper block list */}
                      <div className="bg-brand-bg border border-brand-border p-4 rounded-xl space-y-3">
                        <span className="text-xs font-bold text-brand-secondary block uppercase">Tahapan Membentuk Graf Dual:</span>
                        
                        {[
                          { step: "1", title: "Petakan Muka Bidang", desc: "Gambar graf planar tanpa tumpang tindih sisi dan identifikasi semua face (tingkat daerah luar & dalam)." },
                          { step: "2", title: "Tempatkan Simpul Baru", desc: "Letakkan satu simpul dual tepat di bagian tengah dari setiap area muka bidang yang teridentifikasi." },
                          { step: "3", title: "Tarik Jalur Penghubung", desc: "Hubungkan simpul dual tersebut dengan sebuah busur baru jika dua batas muka bidang asli saling berbagi sisi." },
                          { step: "4", title: "Graf Dual G* Terbentuk", desc: "Struktur dualitas berhasil diselesaikan, melambangkan topologi sirkuit cetak (PCB) atau pola jaringan." }
                        ].map((st, idx) => (
                          <div key={idx} className="flex gap-3 bg-white p-2.5 rounded-lg border border-brand-border/60">
                            <span className="h-6 w-6 rounded-full bg-blue-50 text-brand-primary border border-blue-200 text-xs font-bold flex items-center justify-center shrink-0">{st.step}</span>
                            <div>
                              <h6 className="font-bold text-xs text-brand-text">{st.title}</h6>
                              <p className="text-[11px] text-brand-secondary leading-snug">{st.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Fallback lessons helper */}
                  {!["graph-intro", "graph-isomorphic", "graph-euler", "graph-forming-dual"].includes(activeLesson.id) && (
                    <p className="text-xs text-brand-secondary bg-brand-bg rounded p-4 border border-brand-border">
                      Materi detil bab <strong>{activeLesson.title}</strong> memuat penjelasan graf bidang, pembuktian pemetaan bijektif, teorema Kuratowski tentang graf non-planar K5 dan K3,3, serta matriks ketetanggaan. Selamat belajar.
                    </p>
                  )}

                </div>
              )}

              {/* Toggle to set lessons finished */}
              <div className="border-t border-brand-border pt-5 flex flex-wrap gap-3 items-center justify-between">
                <button
                  onClick={() => handleToggleComplete(activeLesson.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${completedLessonIds.includes(activeLesson.id) ? "bg-emerald-50 text-brand-success border border-brand-success" : "bg-brand-primary text-white hover:bg-brand-hover shadow"}`}
                  id="toggle-lesson-complete-btn"
                >
                  <CheckCircle className="w-4 h-4" />
                  {completedLessonIds.includes(activeLesson.id) ? "Terselesaikan ✓" : "Tandai Materi Selesai"}
                </button>

                {/* Progress back / forward buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrevLesson}
                    className="p-2 border border-brand-border rounded-lg bg-white hover:bg-brand-bg text-brand-secondary transition-colors"
                    title="Materi Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleNextLesson}
                    className="px-3.5 py-2 border border-brand-border rounded-lg bg-white hover:bg-brand-bg text-brand-text font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    Materi Selanjutnya
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </article>

            {/* Discussion / Comment Section in active lesson */}
            <section className="bg-white border border-brand-border rounded-lg shadow-brand p-6 space-y-4">
              <h4 className="font-bold text-sm text-brand-text flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-brand-primary" />
                Papan Diskusi Pelajaran
              </h4>

              {/* Input for comments */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Ketik pertanyaan atau tanggapan Anda mengenai materi ini..."
                  className="w-full text-xs p-3 bg-brand-bg border border-brand-border rounded-lg focus:outline-none focus:border-brand-primary min-h-[70px] resize-none"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Kirim Tanggapan
                  </button>
                </div>
              </form>

              {/* Loop list comments */}
              <div className="space-y-3 pt-2">
                {comments.map((comm) => (
                  <div key={comm.id} className="p-3 rounded-lg bg-brand-bg/50 border border-brand-border/60 text-xs text-brand-text space-y-1.5 hover:bg-brand-bg transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <strong className="text-brand-text block">{comm.userName}</strong>
                        <span className="text-[10px] text-brand-secondary">{comm.userRole}</span>
                      </div>
                      <span className="text-[10px] text-brand-secondary">{comm.timestamp}</span>
                    </div>
                    <p className="text-brand-text/90 leading-relaxed font-sans">{comm.text}</p>
                    <div className="flex items-center gap-3 pt-1">
                      <button 
                        onClick={() => handleLikeComment(comm.id)}
                        className="text-[10px] font-bold text-brand-primary hover:underline flex items-center gap-1"
                      >
                        Suka ({comm.likes})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* ========================================================= */}
          {/* LATIHAN & CATATAN BELAJAR (RIGHT PANEL - col-span-3) */}
          {/* ========================================================= */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Latihan / Quiz Section Card */}
            <div className="bg-white border border-brand-border rounded-lg shadow-brand p-4 space-y-4">
              <div className="border-b border-brand-border pb-3 flex items-center justify-between">
                <h4 className="font-bold text-sm text-brand-text flex items-center gap-1.5">
                  <HelpCircle className="w-4.5 h-4.5 text-brand-warning" />
                  Kuis Kompetensi
                </h4>
                <span className="text-[10px] font-bold text-brand-secondary">Evaluasi Modul</span>
              </div>

              {/* Active Quiz card based on current module */}
              {(() => {
                const quizQuestions = QUIZ_QUESTIONS.filter(q => q.moduleSlug === activeModule.id);
                // We show one question corresponding to the sub-topics, let's keep track of simple state selection
                const [activeIdx, setActiveIdx] = useState(0);
                const currentQuestion = quizQuestions[activeIdx];

                if (!currentQuestion) {
                  return (
                    <div className="text-xs text-brand-secondary text-center py-4">
                      Belum ada kuis khusus di modul ini.
                    </div>
                  );
                }

                const questionKey = currentQuestion.id;
                const isSelected = activeQuizAnswers[questionKey] !== undefined;
                const selectedAnswerOption = activeQuizAnswers[questionKey];
                const isSubmitted = activeQuizSubmitted[questionKey];
                const isCorrect = selectedAnswerOption === currentQuestion.correctAnswer;

                const handleOptionClick = (optIdx: number) => {
                  if (isSubmitted) return;
                  setActiveQuizAnswers(prev => ({ ...prev, [questionKey]: optIdx }));
                };

                const handleSubmitQuizAnswer = () => {
                  if (!isSelected) {
                    triggerToast("Pilih salah satu jawaban terlebih dahulu!");
                    return;
                  }
                  setActiveQuizSubmitted(prev => ({ ...prev, [questionKey]: true }));
                  
                  if (isCorrect) {
                    // Update score
                    const mId = activeModule.id;
                    const prevScore = quizScore[mId] || 0;
                    setQuizScore(prev => ({ ...prev, [mId]: prevScore + 1 }));
                    triggerToast("Jawaban Anda benar! +20 XP");
                  } else {
                    triggerToast("Jawaban kurang tepat. Pelajari pembahasan di bawah!");
                  }
                };

                return (
                  <div className="space-y-3.5">
                    
                    {/* Stepper indicator inside mini quiz */}
                    <div className="flex justify-between items-center text-[11px] text-brand-secondary">
                      <span>Pertanyaan {activeIdx + 1} dari {quizQuestions.length}</span>
                      <div className="flex gap-1">
                        {quizQuestions.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveIdx(i)}
                            className={`w-2.5 h-2.5 rounded-full ${i === activeIdx ? "bg-brand-primary" : "bg-gray-200"}`}
                          ></button>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-brand-text font-bold leading-relaxed">
                      {currentQuestion.text}
                    </p>

                    {/* Options list */}
                    <div className="space-y-1.5">
                      {currentQuestion.options.map((opt, oIdx) => {
                        let optStyle = "bg-brand-bg text-brand-text hover:bg-brand-border border-brand-border/60";
                        if (isSelected && selectedAnswerOption === oIdx) {
                          optStyle = "bg-blue-50 text-brand-primary border-brand-primary ring-1 ring-brand-primary";
                        }
                        if (isSubmitted) {
                          if (oIdx === currentQuestion.correctAnswer) {
                            optStyle = "bg-emerald-50 text-brand-success border-brand-success font-bold";
                          } else if (selectedAnswerOption === oIdx) {
                            optStyle = "bg-red-50 text-brand-error border-brand-error line-through";
                          } else {
                            optStyle = "bg-brand-bg text-brand-secondary opacity-60 border-brand-border/40 pointer-events-none";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isSubmitted}
                            onClick={() => handleOptionClick(oIdx)}
                            className={`w-full text-left p-2.5 rounded-lg border text-[11px] leading-snug transition-all flex items-center justify-between ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && oIdx === currentQuestion.correctAnswer && <span className="text-[9px] font-bold text-brand-success uppercase">Kunci</span>}
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit Control / Explanation state */}
                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmitQuizAnswer}
                        className="w-full text-center py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        id="submit-quiz-ans-btn"
                      >
                        Kirim Jawaban
                      </button>
                    ) : (
                      <div className="bg-brand-bg p-3 rounded-lg border border-brand-border space-y-1.5 animate-fadeIn">
                        <span className={`text-[10px] font-extrabold uppercase block ${isCorrect ? "text-brand-success" : "text-brand-error"}`}>
                          {isCorrect ? "Jawaban Benar! (Skor Diposkan)" : "Jawaban Kurang Tepat"}
                        </span>
                        <p className="text-[10px] text-brand-secondary leading-normal">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    )}

                  </div>
                );
              })()}
            </div>

            {/* Notes Panel widget (reusable) */}
            <div className="bg-white border border-brand-border rounded-lg shadow-brand p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-brand-border pb-2.5">
                <span className="font-bold text-sm text-brand-text flex items-center gap-1.5">
                  <FileText className="w-4.5 h-4.5 text-brand-primary" />
                  Buku Catatan Digital
                </span>
                <span className="text-[9px] font-bold text-brand-success uppercase font-mono uppercase">Auto-Save</span>
              </div>
              <p className="text-[11px] text-brand-secondary">
                Tulis ulasan pribadi untuk materi <strong>{activeLesson.title}</strong> di sini. Catatan tersimpan otomatis per pelajaran secara persisten.
              </p>
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Tulis ulasan ringkasan pelajaran Anda..."
                className="w-full min-h-[140px] p-2.5 bg-brand-bg border border-brand-border rounded-lg text-xs font-sans leading-relaxed focus:outline-none focus:border-brand-primary resize-y"
              ></textarea>
              <button
                onClick={handleSaveNotes}
                className="w-full text-center py-1.5 bg-brand-bg hover:bg-brand-primary hover:text-white border border-brand-border hover:border-brand-primary text-brand-text text-xs font-semibold rounded-lg transition-all cursor-pointer"
                id="save-notes-btn"
              >
                Simpan Catatan
              </button>
            </div>

          </aside>

        </div>
      </div>

      {/* Footer copyright segment inside workspace */}
      <footer className="bg-white border-t border-brand-border py-8 mt-12 text-center text-xs text-brand-secondary">
        <p>&copy; {new Date().getFullYear()} DiskritLearn Academic Platform. Kurikulum Matematika Diskrit Terintegrasi.</p>
      </footer>

      {/* ========================================================= */}
      {/* TOAST PANEL NOTIFICATION (SUSPENDED FROM ABSOLUTE VIEW) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-brand-text text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2.5 text-xs font-semibold"
          >
            <CheckCircle className="w-5 h-5 text-brand-success shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* ACHIEVEMENT MODAL DIALOG ON COMPLETION */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activeAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 text-center border-2 border-brand-warning shadow-2xl relative"
            >
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setActiveAchievement(null)}
                  className="text-brand-secondary hover:text-brand-text text-sm font-bold"
                >
                  ✕ Close
                </button>
              </div>

              <div className="h-16 w-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-warning">
                <Award className="w-10 h-10 text-brand-warning animate-bounce" />
              </div>

              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block font-mono">Modul Selesai di-Sertifikasi</span>
              <h3 className="text-xl font-extrabold text-brand-text mt-2 mb-3">
                {activeAchievement.title}
              </h3>
              <p className="text-xs text-brand-secondary leading-relaxed mb-6">
                Selamat! Hasil kerja keras Anda di materi khusus <strong>{activeAchievement.badge}</strong> telah diselesaikan secara penuh dengan tingkat kepatuhan akademis 100%. Kemajuan Anda terus terpantau di papan reputasi kurikulum.
              </p>

              <div className="flex gap-2.5">
                <button
                  onClick={() => {
                    setActiveAchievement(null);
                    setShowCertificateModal(true);
                  }}
                  className="flex-1 bg-brand-primary hover:bg-brand-hover text-white py-2.5 rounded-lg text-xs font-bold transition-all"
                >
                  Klaim Sertifikat Anda
                </button>
                <button
                  onClick={() => setActiveAchievement(null)}
                  className="flex-1 bg-brand-bg hover:bg-brand-border text-brand-text py-2.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  Lanjut Belajar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* ACADEMIC GRADUATION CERTIFICATE PREVIEW MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-brand-border shadow-2xl relative my-8"
            >
              {/* Close Button */}
              <div className="pb-4 border-b border-brand-border flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-warning" />
                  <span className="font-bold text-sm text-brand-text">Pusat Sertifikat Kelulusan</span>
                </div>
                <button 
                  onClick={() => setShowCertificateModal(false)}
                  className="text-brand-secondary hover:text-brand-text text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Certificate Canvas Area (Printable layout inside custom styled card) */}
              <div className="bg-slate-50 border-4 border-double border-slate-300 p-6 sm:p-8 text-center rounded-xl relative overflow-hidden shadow-inner font-sans select-none" id="academic-certificate-print">
                
                {/* Background watermarks decoration */}
                <div className="absolute top-0 right-0 h-28 w-28 bg-brand-primary/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 h-28 w-28 bg-brand-primary/5 rounded-full blur-xl pointer-events-none"></div>

                <div className="border border-slate-200 p-4 sm:p-6 bg-white rounded-lg">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block font-mono">SERTAFIKAT PENGHARGAAN RESMI</span>
                  <div className="w-16 h-0.5 bg-brand-primary mx-auto my-3"></div>
                  
                  <span className="text-xs text-brand-secondary block font-serif italic mb-4">Dengan ini disahkan bahwa</span>

                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight my-4">
                    {studentName || "Siswa DiskritLearn"}
                  </h4>

                  <p className="text-xs text-brand-secondary leading-relaxed max-w-md mx-auto mb-6">
                    Telah menyelesaikan secara penuh seluruh kurikulum materi serta lulus dalam penilaian kuis kompetensi pada platform pembelajaran digital
                  </p>

                  <h5 className="text-base font-bold text-brand-primary tracking-tight">
                    Matematika Diskrit Komprehensif
                  </h5>
                  <span className="text-[10px] text-brand-secondary uppercase block font-mono mt-1">DiskritLearn E-Learning Syllabus</span>

                  {/* Stamp / Signature visuals */}
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 items-baseline">
                    <div className="text-center">
                      <span className="text-[11px] font-bold text-slate-800 block">George Boole II</span>
                      <span className="text-[9px] text-brand-secondary block">Spesialis Logika &amp; Kurikulum</span>
                    </div>
                    <div className="text-center flex flex-col items-center">
                      <div className="border border-brand-success/30 px-2 py-0.5 rounded text-[8px] font-bold text-brand-success bg-emerald-50 mb-1">
                        VALIDATED
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 block">Sistem Penilaian</span>
                      <span className="text-[9px] text-brand-secondary block">Cryptographic DiskritLearn ID</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action buttons inside certificate preview */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="text-[10px] text-brand-secondary uppercase font-bold block mb-1">Ubah Ejaan Nama Sertifikat:</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-brand-bg border border-brand-border rounded focus:outline-none focus:border-brand-primary font-bold"
                    placeholder="Nama di Sertifikat"
                  />
                </div>
                <div className="flex items-end gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-1 sm:flex-none bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold px-4 py-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    Cetak / Print
                  </button>
                  <button
                    onClick={() => triggerToast("Tautan sertifikat digital berhasil disalin ke papan klip!")}
                    className="flex-1 sm:flex-none border border-brand-border hover:bg-brand-bg text-brand-text text-xs font-semibold px-4 py-3 rounded-lg flex items-center justify-center gap-1"
                  >
                    <Share2 className="w-4 h-4" />
                    Bagikan
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
