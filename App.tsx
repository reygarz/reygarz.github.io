import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppTheme, AppSettings } from './types';
import Sidebar from './components/Sidebar';
import SettingsModal from './components/SettingsModal';
import CurriculumViewer from './components/CurriculumViewer';
import CppTerminal from './components/CppTerminal';
import MatrixCalc from './components/MatrixCalc';
import LatexEditor from './components/LatexEditor';
import Home from './components/Home';
import { LayoutDashboard } from 'lucide-react';

const MainLayout: React.FC<{ 
  theme: AppTheme; 
  setTheme: (t: AppTheme) => void;
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
}> = ({ theme, setTheme, settings, setSettings }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  // Liquid/Glass Background Logic
  const getBgClass = () => {
    switch (theme) {
      case AppTheme.LIQUID_NEON:
        return "bg-black text-cyan-50 selection:bg-cyan-500/30";
      case AppTheme.DARK_GLASS:
        return "bg-neutral-950 text-neutral-200 selection:bg-white/20";
      case AppTheme.VISION_GLASS:
        return "bg-gray-100 text-gray-900 selection:bg-blue-500/20";
      case AppTheme.TRUE_CALM:
        return "bg-[#f5f5f0] text-stone-800 selection:bg-stone-300";
      default:
        return "bg-black text-white";
    }
  };

  // Dynamic Blobs for visual effects (disabled in high performance mode)
  const renderBlobs = () => {
    if (settings.highPerformance) return null;
    if (theme === AppTheme.DARK_GLASS || theme === AppTheme.TRUE_CALM) return null;
    
    const colors = theme === AppTheme.LIQUID_NEON 
      ? ["bg-purple-600", "bg-cyan-600", "bg-blue-600"]
      : ["bg-blue-300", "bg-indigo-300", "bg-purple-300"];
      
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-0 -left-20 w-96 h-96 ${colors[0]} rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob`}></div>
        <div className={`absolute top-0 -right-20 w-96 h-96 ${colors[1]} rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-32 left-20 w-96 h-96 ${colors[2]} rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-4000`}></div>
      </div>
    );
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-700 ${getBgClass()}`}>
      {renderBlobs()}
      
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-md"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        theme={theme} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        currentPath={location.pathname}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-1 relative z-10 flex flex-col h-full overflow-hidden">
         <div className="flex items-center justify-between p-4 md:hidden backdrop-blur-lg bg-inherit/50 border-b border-white/5">
            <h1 className="text-xl font-bold font-mono">JK TechnoLibrary</h1>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg border border-current/20 hover:bg-current/10">
              <LayoutDashboard size={20} />
            </button>
         </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
           <div className="h-full flex flex-col">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home theme={theme} settings={settings} />} />
              <Route path="/curriculum/*" element={<div className="p-4 md:p-8 h-full"><CurriculumViewer theme={theme} /></div>} />
              <Route path="/cpp-terminal" element={<div className="p-4 md:p-8 h-full"><CppTerminal theme={theme} /></div>} />
              <Route path="/matrix-engine" element={<div className="p-4 md:p-8 h-full"><MatrixCalc theme={theme} /></div>} />
              <Route path="/latex-editor" element={<div className="p-4 md:p-8 h-full"><LatexEditor theme={theme} /></div>} />
            </Routes>
           </div>
        </div>
        
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          theme={theme} 
          setTheme={setTheme} 
          settings={settings}
          setSettings={setSettings}
        />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.LIQUID_NEON);
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    highPerformance: false,
  });

  return (
    <HashRouter>
      <MainLayout theme={theme} setTheme={setTheme} settings={settings} setSettings={setSettings} />
    </HashRouter>
  );
};

export default App;