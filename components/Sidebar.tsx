import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Terminal, Calculator, FileEdit, Clock, X, BrainCircuit, Settings, Home } from 'lucide-react';
import { AppTheme } from '../types';

interface SidebarProps {
  theme: AppTheme;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  currentPath: string;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ theme, isOpen, setIsOpen, currentPath, onOpenSettings }) => {
  // Pomodoro Logic
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };
  const toggleMode = () => {
    const newMode = mode === 'focus' ? 'break' : 'focus';
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Styles based on theme
  const getStyles = () => {
    switch (theme) {
      case AppTheme.LIQUID_NEON:
        return "bg-black/80 border-r border-cyan-900/30 backdrop-blur-xl";
      case AppTheme.DARK_GLASS:
        return "bg-black/90 border-r border-white/5 backdrop-blur-lg";
      case AppTheme.VISION_GLASS:
        return "bg-white/60 border-r border-white/40 backdrop-blur-2xl shadow-xl";
      case AppTheme.TRUE_CALM:
        return "bg-[#ebebe6] border-r border-stone-300";
      default:
        return "bg-gray-900";
    }
  };

  const getItemClass = (path: string) => {
    const isActive = currentPath.startsWith(path);
    if (theme === AppTheme.LIQUID_NEON) {
      return isActive 
        ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]" 
        : "text-gray-400 hover:text-cyan-200 hover:bg-cyan-900/20";
    }
    if (theme === AppTheme.VISION_GLASS) {
      return isActive
        ? "bg-black/5 text-black font-semibold"
        : "text-gray-600 hover:bg-black/5";
    }
    if (theme === AppTheme.TRUE_CALM) {
        return isActive
          ? "bg-stone-200 text-stone-800 font-medium"
          : "text-stone-500 hover:bg-stone-200/50";
    }
    // Dark Glass
    return isActive 
      ? "bg-white/10 text-white border-l border-white" 
      : "text-neutral-500 hover:text-white hover:bg-white/5";
  };

  return (
    <aside 
      className={`fixed md:static inset-y-0 left-0 z-30 w-72 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col ${getStyles()}`}
    >
      {/* Header / Logo */}
      <div className="p-6 flex justify-between items-center">
        <Link to="/home" className="flex items-center space-x-3 group cursor-pointer select-none">
            <div className={`relative p-2 rounded-xl transition-all duration-500 group-hover:rotate-180 ${
                theme === AppTheme.LIQUID_NEON 
                ? "bg-cyan-500/20 group-hover:bg-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
                : "bg-current/10"
            }`}>
                <BrainCircuit className={`transition-all duration-500 ${theme === AppTheme.LIQUID_NEON ? "text-cyan-400" : ""}`} size={24} />
                {/* Animated orbit ring for decoration */}
                <div className="absolute inset-0 border border-current rounded-xl opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-700"></div>
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight font-mono leading-tight group-hover:tracking-widest transition-all">JK TL</span>
                <span className="text-[9px] opacity-50 font-mono tracking-widest uppercase">Univ.Core v5</span>
            </div>
        </Link>
        <button onClick={() => setIsOpen(false)} className="md:hidden p-1 rounded hover:bg-current/10">
          <X size={24} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto scrollbar-hide">
        <div className="text-xs font-mono opacity-40 px-4 py-2 uppercase tracking-wider">Modules</div>
        
        <Link to="/home" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${getItemClass('/home')}`}>
          <Home size={18} />
          <span>Главная</span>
        </Link>

        <Link to="/curriculum" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${getItemClass('/curriculum')}`}>
          <BookOpen size={18} />
          <span>База Знаний</span>
        </Link>
        <Link to="/cpp-terminal" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${getItemClass('/cpp-terminal')}`}>
          <Terminal size={18} />
          <span>C++ Simulator</span>
        </Link>
        <Link to="/matrix-engine" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${getItemClass('/matrix-engine')}`}>
          <Calculator size={18} />
          <span>Matrix Engine</span>
        </Link>
        <Link to="/latex-editor" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${getItemClass('/latex-editor')}`}>
          <FileEdit size={18} />
          <span>LaTeX Editor</span>
        </Link>
      </nav>

      {/* Footer Area */}
      <div className="p-4 space-y-4">
        {/* Timer */}
        <div className={`rounded-2xl p-4 backdrop-blur-md ${theme === AppTheme.VISION_GLASS ? "bg-white/40 shadow-sm border border-white/40" : "bg-white/5 border border-white/5"}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-xs font-medium uppercase tracking-wider opacity-70">
                <Clock size={14} className={isActive ? "animate-pulse text-red-400" : ""} />
                <span>{mode}</span>
            </div>
            <button onClick={toggleMode} className="text-[10px] opacity-60 hover:opacity-100 border border-current/20 px-1.5 rounded hover:bg-current/10 transition-colors">SWITCH</button>
          </div>
          <div className="text-3xl font-mono font-bold text-center my-1 tracking-wider">
            {formatTime(timeLeft)}
          </div>
          <div className="flex space-x-2 mt-3">
            <button 
              onClick={toggleTimer}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-lg ${
                  isActive 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' 
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
              }`}
            >
              {isActive ? 'PAUSE' : 'START'}
            </button>
            <button 
              onClick={resetTimer}
              className="px-3 py-1.5 rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-all active:scale-95 border border-gray-500/20 text-xs font-bold"
            >
              RST
            </button>
          </div>
        </div>

        {/* Settings Button */}
        <button 
            onClick={onOpenSettings}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl transition-all duration-200 border ${
                theme === AppTheme.LIQUID_NEON 
                    ? "border-cyan-900/50 bg-cyan-900/10 text-cyan-400 hover:bg-cyan-900/30" 
                    : "border-current/10 bg-current/5 hover:bg-current/10 opacity-70 hover:opacity-100"
            }`}
        >
            <Settings size={18} />
            <span className="font-medium">Настройки</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;