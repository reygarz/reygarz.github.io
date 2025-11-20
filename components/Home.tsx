import React from 'react';
import { Link } from 'react-router-dom';
import { AppTheme, AppSettings } from '../types';
import ParticleHero from './ParticleHero';
import { ArrowRight, Cpu, BookOpen, Grid3X3, Sparkles } from 'lucide-react';

interface HomeProps {
  theme: AppTheme;
  settings: AppSettings;
}

const Home: React.FC<HomeProps> = ({ theme, settings }) => {
  const getCardStyle = () => {
    if (theme === AppTheme.LIQUID_NEON) return "bg-black/40 border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] text-cyan-50";
    if (theme === AppTheme.VISION_GLASS) return "bg-white/60 border-white/60 text-gray-900 hover:bg-white/80 shadow-xl";
    if (theme === AppTheme.TRUE_CALM) return "bg-[#f5f5f0] border-stone-300 text-stone-800 hover:border-stone-400";
    return "bg-neutral-900/40 border-white/10 text-white hover:bg-neutral-800/60 hover:border-white/30";
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      
      {/* Fixed Background Layer */}
      <div className={`absolute inset-0 z-0 transition-colors duration-700 ${
        theme === AppTheme.VISION_GLASS ? 'bg-[#eef0f4]' : 
        theme === AppTheme.TRUE_CALM ? 'bg-[#e5e5e0]' : 
        'bg-black'
      }`}>
         <ParticleHero theme={theme} highPerformance={settings.highPerformance} />
      </div>

      {/* Gradient Overlay for Text Readability (Vignette) */}
      <div className={`absolute inset-0 z-0 pointer-events-none bg-gradient-to-b ${
          theme === AppTheme.VISION_GLASS || theme === AppTheme.TRUE_CALM 
          ? 'from-white/0 via-white/30 to-white/90' 
          : 'from-black/0 via-black/40 to-black/90'
      }`} />

      {/* Scrollable Content Layer */}
      <div className="absolute inset-0 z-10 overflow-y-auto custom-scrollbar">
        <div className="min-h-full flex flex-col items-center justify-center p-6 md:p-12">
            
            {/* Hero Section */}
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-20 md:mt-0 mb-20">
                <div className={`animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mb-8 border backdrop-blur-md ${
                    theme === AppTheme.LIQUID_NEON ? "border-cyan-500/30 bg-cyan-950/30 text-cyan-300" : 
                    theme === AppTheme.VISION_GLASS ? "border-gray-300 bg-white/50 text-gray-600" :
                    "border-white/10 bg-white/5 text-gray-400"
                }`}>
                    <Sparkles size={10} /> System V5.1 Operational
                </div>
                
                <h1 className={`animate-fade-in-up text-5xl md:text-8xl font-extralight tracking-tighter mb-8 leading-tight ${
                    theme === AppTheme.VISION_GLASS || theme === AppTheme.TRUE_CALM ? "text-gray-900" : "text-white"
                }`}>
                    JK Techno<span className={theme === AppTheme.LIQUID_NEON ? "text-cyan-400 font-normal" : "font-normal"}>Library</span>
                </h1>
                
                <p className={`animate-fade-in-up max-w-2xl text-lg md:text-xl font-light leading-relaxed mb-12 ${
                    theme === AppTheme.VISION_GLASS || theme === AppTheme.TRUE_CALM ? "text-gray-600" : "text-gray-400"
                }`}>
                    Универсальная вычислительная платформа для инженеров нового поколения. 
                    Синтез математического моделирования, нативной компиляции и 
                    академической базы знаний.
                </p>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    
                    {/* Card 1 */}
                    <Link to="/curriculum" className={`group relative p-8 rounded-[2rem] border backdrop-blur-md transition-all duration-500 flex flex-col items-start justify-between min-h-[240px] overflow-hidden ${getCardStyle()}`}>
                        <div className="relative z-10">
                            <div className="mb-6 p-3 rounded-2xl bg-current/5 w-fit">
                                <BookOpen size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light tracking-tight mb-2">Knowledge Base</h3>
                            <p className="text-sm opacity-60 font-mono">Curriculum Core v5</p>
                        </div>
                        <div className="relative z-10 flex items-center gap-2 text-xs font-bold tracking-widest uppercase mt-8 opacity-60 group-hover:opacity-100 group-hover:gap-4 transition-all">
                            Explore <ArrowRight size={14} />
                        </div>
                        {/* Hover Gradient Blob */}
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-current opacity-0 group-hover:opacity-10 blur-[60px] rounded-full transition-opacity duration-700 pointer-events-none"></div>
                    </Link>

                    {/* Card 2 */}
                    <Link to="/cpp-terminal" className={`group relative p-8 rounded-[2rem] border backdrop-blur-md transition-all duration-500 flex flex-col items-start justify-between min-h-[240px] overflow-hidden ${getCardStyle()}`}>
                        <div className="relative z-10">
                            <div className="mb-6 p-3 rounded-2xl bg-current/5 w-fit">
                                <Cpu size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light tracking-tight mb-2">C++ Simulator</h3>
                            <p className="text-sm opacity-60 font-mono">WebAssembly Engine</p>
                        </div>
                        <div className="relative z-10 flex items-center gap-2 text-xs font-bold tracking-widest uppercase mt-8 opacity-60 group-hover:opacity-100 group-hover:gap-4 transition-all">
                            Launch <ArrowRight size={14} />
                        </div>
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-current opacity-0 group-hover:opacity-10 blur-[60px] rounded-full transition-opacity duration-700 pointer-events-none"></div>
                    </Link>

                    {/* Card 3 */}
                    <Link to="/matrix-engine" className={`group relative p-8 rounded-[2rem] border backdrop-blur-md transition-all duration-500 flex flex-col items-start justify-between min-h-[240px] overflow-hidden ${getCardStyle()}`}>
                        <div className="relative z-10">
                            <div className="mb-6 p-3 rounded-2xl bg-current/5 w-fit">
                                <Grid3X3 size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-light tracking-tight mb-2">Matrix Engine</h3>
                            <p className="text-sm opacity-60 font-mono">Linear Algebra</p>
                        </div>
                        <div className="relative z-10 flex items-center gap-2 text-xs font-bold tracking-widest uppercase mt-8 opacity-60 group-hover:opacity-100 group-hover:gap-4 transition-all">
                            Compute <ArrowRight size={14} />
                        </div>
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-current opacity-0 group-hover:opacity-10 blur-[60px] rounded-full transition-opacity duration-700 pointer-events-none"></div>
                    </Link>

                </div>
            </div>
            
            {/* Footer */}
            <div className="w-full max-w-5xl border-t border-current/5 pt-8 flex flex-col md:flex-row justify-between items-center opacity-40 text-xs font-mono">
                <p>© 2025 JK Laboratory Inc.</p>
                <p>System Status: Optimal</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;