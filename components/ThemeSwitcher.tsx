import React, { useState } from 'react';
import { Palette, Droplets, Eye, Coffee, Moon } from 'lucide-react';
import { AppTheme } from '../types';

interface ThemeSwitcherProps {
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: AppTheme.LIQUID_NEON, icon: Droplets, label: 'Neon', color: 'bg-cyan-500' },
    { id: AppTheme.DARK_GLASS, icon: Moon, label: 'Dark', color: 'bg-neutral-800' },
    { id: AppTheme.VISION_GLASS, icon: Eye, label: 'Vision', color: 'bg-gray-200 text-black' },
    { id: AppTheme.TRUE_CALM, icon: Coffee, label: 'Calm', color: 'bg-[#e5e5e0] text-stone-800' },
  ];

  return (
    <div className="absolute bottom-6 right-6 z-50 flex flex-col-reverse items-end space-y-reverse space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95 ${
            theme === AppTheme.LIQUID_NEON ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.6)]" : 
            theme === AppTheme.VISION_GLASS ? "bg-white text-black" :
            "bg-neutral-800 text-white border border-white/20"
        }`}
      >
        <Palette size={24} />
      </button>

      {isOpen && (
        <div className="flex flex-col space-y-2 mb-4 animate-fade-in-up">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setIsOpen(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg transform transition-all hover:scale-105 ${t.color}`}
            >
              <t.icon size={16} />
              <span className="text-sm font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;