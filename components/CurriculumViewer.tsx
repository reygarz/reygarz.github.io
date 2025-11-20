import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { SAMPLE_CURRICULUM, CURRICULUM_SECTIONS } from '../constants';
import { AppTheme } from '../types';
import { Book, Search, Hash, ChevronRight, ChevronDown, FolderOpen, Folder } from 'lucide-react';

interface Props {
  theme: AppTheme;
}

const CurriculumViewer: React.FC<Props> = ({ theme }) => {
  const [selectedChapterId, setSelectedChapterId] = useState(SAMPLE_CURRICULUM[0].id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ 'math': true });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeChapter = SAMPLE_CURRICULUM.find(c => c.id === selectedChapterId);
  const isSearching = searchQuery.length > 0;
  const filteredChapters = SAMPLE_CURRICULUM.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCardClass = () => {
    if (theme === AppTheme.LIQUID_NEON) return "bg-black/40 border border-cyan-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.05)]";
    if (theme === AppTheme.VISION_GLASS) return "bg-white/70 backdrop-blur-2xl border border-white/60 shadow-xl text-gray-900";
    if (theme === AppTheme.TRUE_CALM) return "bg-white border border-stone-200 shadow-sm text-stone-800";
    return "bg-neutral-900/60 border border-white/10 backdrop-blur-lg text-neutral-200"; // Dark Glass
  };

  const getIconContainerClass = () => {
    if (theme === AppTheme.LIQUID_NEON) return "bg-cyan-900/30 text-cyan-400";
    if (theme === AppTheme.DARK_GLASS) return "bg-white/10 text-white"; // Fixed for Dark Glass
    if (theme === AppTheme.VISION_GLASS) return "bg-black/5 text-black";
    return "bg-stone-200 text-stone-700";
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {/* Navigation Sidebar */}
      <div className={`lg:w-80 w-full flex-shrink-0 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${getCardClass()}`}>
        <div className="p-5 border-b border-current/5">
            <div className="flex items-center gap-2 mb-4 text-lg font-bold opacity-90">
                <Book size={20} className={theme === AppTheme.LIQUID_NEON ? "text-cyan-400" : ""} />
                <span>Навигатор</span>
            </div>
            <div className={`relative flex items-center px-3 py-2 rounded-xl border transition-colors ${
                theme === AppTheme.LIQUID_NEON ? "bg-black/30 border-cyan-500/30 focus-within:border-cyan-500" : "bg-current/5 border-transparent focus-within:bg-white/20"
            }`}>
                <Search size={16} className="opacity-50 mr-2" />
                <input 
                    type="text" 
                    placeholder="Поиск по темам..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent w-full focus:outline-none text-sm placeholder-current/40"
                />
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {isSearching ? (
            <div>
                 <div className="px-4 py-2 text-xs font-mono opacity-50">РЕЗУЛЬТАТЫ</div>
                 {filteredChapters.map(chapter => (
                    <button
                      key={chapter.id}
                      onClick={() => setSelectedChapterId(chapter.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm mb-1 transition-all ${selectedChapterId === chapter.id ? "bg-current/10 font-bold" : "hover:bg-current/5 opacity-70"}`}
                    >
                        {chapter.title}
                    </button>
                 ))}
                 {filteredChapters.length === 0 && <div className="px-4 text-sm opacity-50">Ничего не найдено.</div>}
            </div>
          ) : (
            CURRICULUM_SECTIONS.map(section => {
                const sectionChapters = SAMPLE_CURRICULUM.filter(c => c.moduleId === section.id);
                const isOpen = openSections[section.id];
                
                return (
                    <div key={section.id} className="mb-2">
                        <button 
                            onClick={() => toggleSection(section.id)}
                            className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all ${isOpen ? "bg-current/5" : "hover:bg-current/5"}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-lg ${getIconContainerClass()}`}>
                                    <section.icon size={16} />
                                </div>
                                <span className="font-semibold text-sm">{section.title}</span>
                            </div>
                            {isOpen ? <ChevronDown size={14} className="opacity-50"/> : <ChevronRight size={14} className="opacity-50"/>}
                        </button>

                        {isOpen && (
                            <div className="ml-4 mt-1 border-l border-current/10 pl-2 space-y-1 animate-fade-in">
                                {sectionChapters.map(chapter => (
                                    <button
                                        key={chapter.id}
                                        onClick={() => setSelectedChapterId(chapter.id)}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                                            selectedChapterId === chapter.id 
                                                ? (theme === AppTheme.LIQUID_NEON 
                                                    ? "text-cyan-300 bg-cyan-500/10 font-medium border border-cyan-500/20" 
                                                    : "bg-current/10 font-semibold")
                                                : "opacity-60 hover:opacity-100 hover:translate-x-1"
                                        }`}
                                    >
                                        <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
                                        {chapter.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })
          )}
        </div>
      </div>

      {/* Content Viewer */}
      <div className={`flex-1 rounded-3xl p-6 md:p-12 overflow-y-auto transition-all duration-500 custom-scrollbar ${getCardClass()}`}>
        {activeChapter ? (
          <div className={`prose max-w-4xl mx-auto ${
            theme === AppTheme.VISION_GLASS || theme === AppTheme.TRUE_CALM ? "prose-stone prose-lg" : "prose-invert prose-lg"
          } prose-headings:font-mono prose-headings:tracking-tight prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-img:rounded-2xl`}>
            
            <div className="mb-8 flex items-center gap-2 opacity-50 text-sm font-mono uppercase tracking-widest border-b border-current/10 pb-4">
                <Hash size={14} />
                MODULE / {activeChapter.moduleId.toUpperCase()}
            </div>

            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkMath]} 
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({node, ...props}) => <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === AppTheme.LIQUID_NEON ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" : ""}`} {...props} />,
                code({node, inline, className, children, ...props} : any) {
                  return !inline ? (
                    <div className="relative group my-6">
                        {theme === AppTheme.LIQUID_NEON && (
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                        )}
                        <pre className={`relative p-4 rounded-2xl overflow-x-auto ${theme === AppTheme.VISION_GLASS ? "bg-gray-100 text-gray-800 border border-white" : "bg-[#0d1117] border border-white/5"}`} {...props}>
                          <code className={`${className} font-mono text-sm`}>{children}</code>
                        </pre>
                    </div>
                  ) : (
                    <code className={`${className} px-1.5 py-0.5 rounded-md font-mono text-[0.9em] ${theme === AppTheme.VISION_GLASS ? "bg-black/5 text-blue-600" : "bg-white/10 text-cyan-300"}`} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {activeChapter.content}
            </ReactMarkdown>
            <div className="h-20"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full opacity-40 text-center p-8">
            <Book size={48} className="mb-4 stroke-1" />
            <h3 className="text-xl font-medium">Выберите тему</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumViewer;