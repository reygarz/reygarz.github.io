import React, { useState } from 'react';
import { Play, Trash2, Copy, Cpu, Terminal as TerminalIcon } from 'lucide-react';
import { AppTheme } from '../types';
import { CppSimulator, CppResult } from '../services/cppService';

const DEFAULT_CODE = `#include <iostream>
#include <string>
using namespace std;

int main() {
    int students = 150;
    string course = "Engineering 101";
    
    cout << "System Boot..." << endl;
    cout << "Course: " << course << endl;
    cout << "Active Students: " << students << endl;
    
    if (students > 100) {
        cout << "Class status: OVERFLOW" << endl;
    } else {
        cout << "Class status: OK" << endl;
    }
    
    return 0;
}`;

const CppTerminal: React.FC<{ theme: AppTheme }> = ({ theme }) => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<CppResult | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const runCode = async () => {
    setIsCompiling(true);
    const result = await CppSimulator.execute(code);
    setOutput(result);
    setIsCompiling(false);
  };

  const getContainerClass = () => {
    if (theme === AppTheme.LIQUID_NEON) return "border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)] bg-black/60 backdrop-blur-xl";
    if (theme === AppTheme.VISION_GLASS) return "bg-white/60 backdrop-blur-xl shadow-xl border-white/50";
    if (theme === AppTheme.TRUE_CALM) return "bg-white shadow-sm border-stone-200";
    return "border-white/10 bg-neutral-900/80 backdrop-blur-md";
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-black/5 p-2 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3 px-2">
           <div className={`p-2 rounded-lg ${theme === AppTheme.LIQUID_NEON ? "bg-cyan-500/20 text-cyan-400" : "bg-current/10"}`}>
             <Cpu size={20} />
           </div>
           <div>
             <h2 className="text-lg font-bold font-mono leading-none">C++ Simulator</h2>
             <span className="text-[10px] opacity-50 font-mono tracking-widest">GCC_MOCK_ENV v4.0</span>
           </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={runCode}
            disabled={isCompiling}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg ${
              isCompiling ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'
            } ${
                theme === AppTheme.LIQUID_NEON 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/20' 
                : theme === AppTheme.TRUE_CALM || theme === AppTheme.VISION_GLASS
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            <Play size={14} fill="currentColor" />
            <span>{isCompiling ? 'СБОРКА...' : 'ЗАПУСК'}</span>
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className={`flex-1 flex flex-col lg:flex-row gap-6 min-h-0`}>
        <div className={`flex-1 flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${getContainerClass()} relative group`}>
            <div className="absolute top-3 right-3 z-10 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => navigator.clipboard.writeText(code)} className="p-2 bg-black/20 rounded-lg hover:bg-black/40 backdrop-blur text-xs text-white/70 flex items-center gap-1">
                    <Copy size={12}/> COPY
                </button>
            </div>
            {/* Line numbers column mockup */}
            <div className="flex flex-1">
                <div className={`hidden md:block w-10 py-4 text-right pr-2 font-mono text-sm opacity-20 select-none ${theme === AppTheme.TRUE_CALM ? "bg-stone-100" : "bg-black/20"}`}>
                    {code.split('\n').map((_, i) => <div key={i}>{i+1}</div>)}
                </div>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`flex-1 p-4 font-mono text-sm resize-none focus:outline-none bg-transparent leading-6 ${
                        theme === AppTheme.TRUE_CALM || theme === AppTheme.VISION_GLASS ? "text-gray-800 placeholder-gray-400" : "text-gray-300 placeholder-gray-700"
                    }`}
                    spellCheck={false}
                    placeholder="// Введите ваш код здесь..."
                />
            </div>
        </div>

        {/* Output Terminal */}
        <div className={`lg:w-[400px] flex flex-col rounded-2xl overflow-hidden border shadow-2xl ${
            theme === AppTheme.LIQUID_NEON ? "bg-black/90 border-cyan-900/50" : 
            theme === AppTheme.TRUE_CALM ? "bg-[#2d2d2d] border-stone-300 text-white" : "bg-black border-white/10"
        }`}>
          <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <TerminalIcon size={14} />
                <span>CONSOLE OUTPUT</span>
            </div>
            <button onClick={() => setOutput(null)} className="p-1 hover:bg-white/10 rounded text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14}/></button>
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-black/50">
            {isCompiling && (
                <div className="flex flex-col gap-1 text-yellow-500 animate-pulse">
                    <span>&gt; g++ main.cpp -o out</span>
                    <span>&gt; Compiling...</span>
                </div>
            )}
            {output && (
                <div className="animate-fade-in">
                    {output.error ? (
                        <div className="text-red-500 border-l-2 border-red-500 pl-2">
                            <div className="font-bold mb-1">COMPILATION ERROR</div>
                            {output.error}
                        </div>
                    ) : (
                        <>
                            <div className="text-green-400 whitespace-pre-wrap">{output.output}</div>
                            <div className="mt-6 pt-2 border-t border-white/10 text-[10px] text-gray-500 uppercase tracking-wider">
                                Process finished with exit code 0 ({output.executionTime.toFixed(2)}ms)
                            </div>
                        </>
                    )}
                </div>
            )}
            {!output && !isCompiling && (
                <div className="h-full flex items-center justify-center opacity-20 text-center">
                   <div>Ожидание сборки...</div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CppTerminal;