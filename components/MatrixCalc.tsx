import React, { useState } from 'react';
import { MatrixEngine } from '../services/matrixEngine';
import { AppTheme } from '../types';
import { Plus, Minus, Grid3X3, Sigma, ArrowRightLeft } from 'lucide-react';

const MatrixCalc: React.FC<{ theme: AppTheme }> = ({ theme }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState<number[][]>(MatrixEngine.create(3, 3));
  const [result, setResult] = useState<string | null>(null);

  const updateSize = (dRow: number, dCol: number) => {
    const newR = Math.max(1, Math.min(5, rows + dRow));
    const newC = Math.max(1, Math.min(5, cols + dCol));
    setRows(newR);
    setCols(newC);
    
    // Resize matrix preserving data
    const newMat = MatrixEngine.create(newR, newC);
    for(let i=0; i<Math.min(rows, newR); i++) {
        for(let j=0; j<Math.min(cols, newC); j++) {
            newMat[i][j] = matrix[i][j];
        }
    }
    setMatrix(newMat);
    setResult(null);
  };

  const updateCell = (r: number, c: number, val: string) => {
    const newMat = [...matrix];
    newMat[r] = [...newMat[r]];
    newMat[r][c] = parseFloat(val) || 0;
    setMatrix(newMat);
  };

  const calculate = (op: 'det' | 'rank') => {
    try {
        if (op === 'det') {
            const det = MatrixEngine.determinant(matrix);
            setResult(`Определитель (Δ): ${det}`);
        } else {
            const rank = MatrixEngine.rank(matrix);
            setResult(`Ранг матрицы (Rank): ${rank}`);
        }
    } catch (e: any) {
        setResult(`Ошибка: ${e.message}`);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className={`w-full max-w-4xl p-8 md:p-12 rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 ${
        theme === AppTheme.LIQUID_NEON ? "bg-black/40 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)]" : 
        theme === AppTheme.VISION_GLASS ? "bg-white/60 border-white shadow-2xl" :
        theme === AppTheme.TRUE_CALM ? "bg-white border-stone-200 shadow-xl" :
        "bg-neutral-900/80 border-white/10"
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${theme === AppTheme.LIQUID_NEON ? "bg-purple-500/20 text-purple-300" : "bg-current/10"}`}>
                    <Grid3X3 size={24}/>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Матричный процессор</h2>
                    <p className="text-sm opacity-60">Linear Algebra Core</p>
                </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-6 p-2 rounded-2xl bg-current/5 border border-current/5">
                <div className="flex flex-col items-center px-2">
                    <span className="text-[10px] font-bold opacity-40 mb-1 tracking-widest">СТРОКИ</span>
                    <div className="flex items-center gap-3">
                        <button onClick={() => updateSize(-1, 0)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-current/10 transition-colors"><Minus size={14}/></button>
                        <span className="font-mono text-lg font-bold w-4 text-center">{rows}</span>
                        <button onClick={() => updateSize(1, 0)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-current/10 transition-colors"><Plus size={14}/></button>
                    </div>
                </div>
                <div className="w-px h-8 bg-current/10"></div>
                <div className="flex flex-col items-center px-2">
                    <span className="text-[10px] font-bold opacity-40 mb-1 tracking-widest">СТОЛБЦЫ</span>
                    <div className="flex items-center gap-3">
                        <button onClick={() => updateSize(0, -1)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-current/10 transition-colors"><Minus size={14}/></button>
                        <span className="font-mono text-lg font-bold w-4 text-center">{cols}</span>
                        <button onClick={() => updateSize(0, 1)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-current/10 transition-colors"><Plus size={14}/></button>
                    </div>
                </div>
            </div>
        </div>

        {/* Matrix Grid */}
        <div className="overflow-x-auto mb-10 pb-4 flex justify-center custom-scrollbar">
            <div className="relative p-6 rounded-2xl bg-current/5 border border-current/5 inline-block">
                {/* Decorative brackets */}
                <div className="absolute top-4 bottom-4 left-2 w-4 border-l-2 border-t-2 border-b-2 border-current opacity-30 rounded-l-xl"></div>
                <div className="absolute top-4 bottom-4 right-2 w-4 border-r-2 border-t-2 border-b-2 border-current opacity-30 rounded-r-xl"></div>
                
                <div className="flex flex-col gap-3">
                    {matrix.map((row, i) => (
                        <div key={i} className="flex gap-3">
                            {row.map((cell, j) => (
                                <input 
                                    key={`${i}-${j}`}
                                    type="number" 
                                    value={cell}
                                    onChange={(e) => updateCell(i, j, e.target.value)}
                                    className={`w-16 h-16 md:w-20 md:h-20 text-center text-xl md:text-2xl font-mono rounded-xl focus:outline-none transition-all duration-300 ${
                                        theme === AppTheme.VISION_GLASS 
                                        ? "bg-white shadow-inner border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10" 
                                        : theme === AppTheme.LIQUID_NEON
                                        ? "bg-black/40 border border-cyan-500/30 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] text-cyan-100"
                                        : "bg-white/5 border border-white/10 focus:border-white/40 focus:bg-white/10"
                                    }`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <button 
                onClick={() => calculate('det')}
                className="group relative overflow-hidden px-6 py-4 rounded-xl bg-current/10 hover:bg-current/20 font-bold transition-all active:scale-95 border border-current/10 flex items-center justify-center gap-2"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Sigma size={18} />
                <span>Определитель</span>
            </button>
            <button 
                onClick={() => calculate('rank')}
                className="group relative overflow-hidden px-6 py-4 rounded-xl bg-current/10 hover:bg-current/20 font-bold transition-all active:scale-95 border border-current/10 flex items-center justify-center gap-2"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <ArrowRightLeft size={18} />
                <span>Ранг Матрицы</span>
            </button>
        </div>

        {/* Result Area */}
        {result && (
            <div className={`mt-8 p-6 rounded-2xl text-center animate-fade-in border backdrop-blur-xl transform transition-all hover:scale-105 ${
                result.startsWith('Ошибка') 
                    ? "bg-red-500/10 border-red-500/30 text-red-400" 
                    : theme === AppTheme.LIQUID_NEON 
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                        : "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
            }`}>
                <span className="text-2xl font-mono font-bold">{result}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default MatrixCalc;