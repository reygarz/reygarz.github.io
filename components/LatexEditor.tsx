import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { AppTheme } from '../types';
import { Printer, FileText } from 'lucide-react';

const DEFAULT_LATEX = `# Science Report

## Formula Analysis

The quadratic formula is:
$$ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$

## Maxwell's Equations
$$ \\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0} $$
$$ \\nabla \\cdot \\mathbf{B} = 0 $$
`;

const LatexEditor: React.FC<{ theme: AppTheme }> = ({ theme }) => {
  const [content, setContent] = useState(DEFAULT_LATEX);

  const handlePrint = () => {
    const printContent = document.getElementById('latex-preview');
    if (printContent) {
       // Basic print strategy: In a real app, we'd likely use an iframe or a print-specific css
       window.print();
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText /> LaTeX Editor
        </h2>
        <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-current/10 hover:bg-current/20 transition-colors"
        >
            <Printer size={16} /> Export PDF
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Input */}
        <div className={`flex-1 flex flex-col rounded-2xl p-4 border ${
            theme === AppTheme.VISION_GLASS ? "bg-white/60 border-white/40" : "bg-white/5 border-white/10"
        }`}>
            <span className="text-xs uppercase tracking-wider opacity-50 mb-2">Source (Markdown + LaTeX)</span>
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
                spellCheck={false}
            />
        </div>

        {/* Preview */}
        <div 
            id="latex-preview"
            className={`flex-1 rounded-2xl p-8 overflow-y-auto border ${
                theme === AppTheme.LIQUID_NEON ? "bg-black border-cyan-900 shadow-[0_0_20px_rgba(34,211,238,0.1)]" : 
                "bg-white text-black border-transparent"
            }`}
            style={{ color: theme === AppTheme.LIQUID_NEON ? '#fff' : '#000' }} // Force black text on white paper unless neon
        >
            <div className={`prose max-w-none ${theme === AppTheme.LIQUID_NEON ? 'prose-invert' : ''}`}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
      </div>

      <style>{`
        @media print {
            body * {
                visibility: hidden;
            }
            #latex-preview, #latex-preview * {
                visibility: visible;
            }
            #latex-preview {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background: white;
                color: black;
            }
        }
      `}</style>
    </div>
  );
};

export default LatexEditor;