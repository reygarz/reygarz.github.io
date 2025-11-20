import React from 'react';
import { X, Palette, Moon, Eye, Coffee, Droplets, Volume2, Zap, VolumeX } from 'lucide-react';
import { AppTheme, AppSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, theme, setTheme, settings, setSettings }) => {
  if (!isOpen) return null;

  const toggleSound = () => setSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  const togglePerf = () => setSettings({ ...settings, highPerformance: !settings.highPerformance });

  const themes = [
    { id: AppTheme.LIQUID_NEON, icon: Droplets, label: 'Liquid Neon', desc: 'Киберпанк и неон', color: 'from-cyan-500 to-purple-600' },
    { id: AppTheme.DARK_GLASS, icon: Moon, label: 'Dark Glass', desc: 'Строгий минимализм', color: 'from-neutral-700 to-neutral-900' },
    { id: AppTheme.VISION_GLASS, icon: Eye, label: 'Vision Pro', desc: 'Светлое стекло', color: 'from-gray-200 to-white text-black' },
    { id: AppTheme.TRUE_CALM, icon: Coffee, label: 'True Calm', desc: 'Для чтения', color: 'from-[#e5e5e0] to-[#d6d6d0] text-stone-800' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className={`relative w-full max-w-md rounded-3xl border overflow-hidden shadow-2xl transform transition-all ${
        theme === AppTheme.VISION_GLASS || theme === AppTheme.TRUE_CALM 
          ? "bg-white/90 border-white/50 text-gray-900" 
          : "bg-black/90 border-white/10 text-white"
      } backdrop-blur-2xl`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-current/10">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Palette size={20} /> Настройки
            </h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-current/10 transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Theme Section */}
            <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase opacity-60 tracking-wider">Тема оформления</h3>
                <div className="grid grid-cols-1 gap-3">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`flex items-center p-3 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                                theme === t.id 
                                    ? "border-current shadow-lg scale-[1.02]" 
                                    : "border-transparent hover:bg-current/5"
                            }`}
                        >
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${t.color} transition-opacity`}></div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-gradient-to-br ${t.color} shadow-inner text-white`}>
                                <t.icon size={18} />
                            </div>
                            <div className="text-left">
                                <div className="font-bold">{t.label}</div>
                                <div className="text-xs opacity-60">{t.desc}</div>
                            </div>
                            {theme === t.id && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toggles Section */}
            <div className="space-y-3 pt-4 border-t border-current/10">
                 <h3 className="text-sm font-mono uppercase opacity-60 tracking-wider">Система</h3>
                 
                 <button onClick={toggleSound} className="w-full flex items-center justify-between p-3 rounded-xl bg-current/5 hover:bg-current/10 transition-colors">
                    <div className="flex items-center gap-3">
                        {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18}/>}
                        <span>Звуковые эффекты</span>
                    </div>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${settings.soundEnabled ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "bg-gray-500/50"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${settings.soundEnabled ? "left-[22px]" : "left-1"}`}></div>
                    </div>
                 </button>

                 <button onClick={togglePerf} className="w-full flex items-center justify-between p-3 rounded-xl bg-current/5 hover:bg-current/10 transition-colors">
                    <div className="flex items-center gap-3">
                        <Zap size={18} />
                        <div className="text-left">
                            <div className="leading-none">Режим производительности</div>
                            <div className="text-[10px] opacity-50">Отключает частицы и блюр</div>
                        </div>
                    </div>
                     <div className={`w-10 h-6 rounded-full relative transition-colors ${settings.highPerformance ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "bg-gray-500/50"}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${settings.highPerformance ? "left-[22px]" : "left-1"}`}></div>
                    </div>
                 </button>
            </div>
            
        </div>

        {/* Footer */}
        <div className="p-4 bg-current/5 text-center text-xs opacity-40 font-mono">
            JK TechnoLibrary v5.0 Build 2025
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;