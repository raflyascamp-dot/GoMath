import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import { INITIAL_MODULES } from "./data";

export default function App() {
  const [activeView, setActiveView] = useState<"landing" | "dashboard">("landing");
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // Router dispatcher
  const handleStartLearning = (moduleSlug?: string, lessonId?: string) => {
    if (moduleSlug) {
      setSelectedModuleId(moduleSlug);
    } else {
      setSelectedModuleId(null);
    }
    setActiveView("dashboard");
  };

  const handleBackToLanding = () => {
    setActiveView("landing");
  };

  return (
    <div className="min-h-screen bg-brand-bg transition-colors duration-300">
      {activeView === "landing" ? (
        <LandingPage 
          modules={INITIAL_MODULES} 
          onStartLearning={handleStartLearning} 
        />
      ) : (
        <Dashboard 
          initialModules={INITIAL_MODULES} 
          onBackToLanding={handleBackToLanding} 
          selectedModuleId={selectedModuleId}
        />
      )}
    </div>
  );
}
