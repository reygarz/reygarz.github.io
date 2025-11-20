export enum AppTheme {
  LIQUID_NEON = 'LIQUID_NEON',
  DARK_GLASS = 'DARK_GLASS',
  VISION_GLASS = 'VISION_GLASS',
  TRUE_CALM = 'TRUE_CALM'
}

export interface AppSettings {
  soundEnabled: boolean;
  highPerformance: boolean; // If true, disables heavy blur/particles
}

export enum ModuleType {
  HOME = 'home',
  CURRICULUM = 'curriculum',
  CPP_TERMINAL = 'cpp-terminal',
  MATRIX = 'matrix-engine',
  LATEX = 'latex-editor'
}

export interface CurriculumChapter {
  id: string;
  title: string;
  content: string; // Markdown content
  moduleId: string; // Links to section
}

export interface CurriculumSection {
  id: string;
  title: string;
  icon: any; // Lucide icon component
  description: string;
}

export interface MatrixState {
  rows: number;
  cols: number;
  data: number[][];
}

export interface PomodoroState {
  timeLeft: number; // in seconds
  isActive: boolean;
  mode: 'focus' | 'break';
}