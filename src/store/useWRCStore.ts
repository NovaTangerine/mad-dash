import { create } from 'zustand';
import { addDays, addHours, addMinutes } from 'date-fns';

export type RunStatus = 'JOINED' | 'INVITED' | 'READY';
export type ViewportSize = 'desktop' | 'iphone15' | 'iphone15pro' | 'iphone15promax';

export interface Run {
  id: string;
  title: string;
  club: string;
  distance: number;
  participants: number;
  date: Date;
  status: RunStatus;
  badge?: string;
}

export interface Club {
  id: string;
  name: string;
  members: number;
  users: string[];
  gradient: string;
}

interface WRCState {
  runs: Run[];
  clubs: Club[];
  devToolsOpen: boolean;
  viewport: ViewportSize;
  setViewport: (v: ViewportSize) => void;
  setDevToolsOpen: (open: boolean) => void;
  addRun: (run: Omit<Run, 'id'>) => void;
  removeRun: (id: string) => void;
  updateRun: (id: string, updates: Partial<Run>) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useWRCStore = create<WRCState>((set) => ({
  runs: [
    {
      id: generateId(),
      title: 'Starting today',
      club: 'Working Off The Fast Food',
      distance: 0.8,
      participants: 1,
      date: addMinutes(new Date(), 4), // Starts in 4 minutes for timer testing
      status: 'JOINED'
    },
    {
      id: generateId(),
      title: 'Starting today',
      club: 'Worldwide Run Club',
      distance: 3.1,
      participants: 3,
      date: addHours(new Date(), 3), // Starts in 3 hours
      status: 'JOINED',
      badge: 'Weekly'
    },
    {
      id: generateId(),
      title: 'Starting tomorrow',
      club: 'Worldwide Run Club',
      distance: 3.1,
      participants: 1,
      date: addDays(new Date(), 1), // Starts tomorrow
      status: 'INVITED',
      badge: 'Weekly'
    }
  ],
  clubs: [
    {
      id: 'c1',
      name: 'Working Off The Fast Food',
      members: 1,
      users: ['KD'],
      gradient: 'from-orange-400 to-blue-500'
    },
    {
      id: 'c2',
      name: 'Worldwide Run Club',
      members: 30,
      users: ['ZB', 'TR', 'JM'],
      gradient: 'from-blue-900 to-slate-800'
    }
  ],
  devToolsOpen: false,
  viewport: 'desktop',
  setViewport: (viewport) => set({ viewport }),
  setDevToolsOpen: (open) => set({ devToolsOpen: open }),
  addRun: (run) => set((state) => ({ runs: [...state.runs, { ...run, id: generateId() }] })),
  removeRun: (id) => set((state) => ({ runs: state.runs.filter(r => r.id !== id) })),
  updateRun: (id, updates) => set((state) => ({
    runs: state.runs.map(r => r.id === id ? { ...r, ...updates } : r)
  })),
}));
