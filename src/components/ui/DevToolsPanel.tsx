'use client';

import React from 'react';
import { Settings, X, Plus, Trash2, Edit3, Clock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWRCStore, RunStatus } from '@/store/useWRCStore';
import { addDays, addHours, addMinutes, addSeconds } from 'date-fns';

export function DevToolsPanel() {
  const pathname = usePathname();
  const { runs, devToolsOpen, setDevToolsOpen, addRun, removeRun, updateRun, viewport, setViewport } = useWRCStore();

  if (!devToolsOpen) {
    return (
      <button 
        onClick={() => setDevToolsOpen(true)}
        className="fixed bottom-4 right-4 bg-slate-800 text-white p-3 rounded-full shadow-lg z-50 hover:scale-105 transition-transform"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col p-4 text-slate-800 text-sm overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg flex items-center gap-2"><Settings className="w-5 h-5 text-wrc-blue" /> Dev Tools</h2>
        <button onClick={() => setDevToolsOpen(false)} className="p-1 text-slate-400 hover:text-slate-800 bg-slate-100 rounded-md">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-slate-500 uppercase tracking-wider text-xs mb-3 border-b pb-2">Prototype Version</h3>
        <div className="flex gap-2">
          <Link href="/v1" className={`flex-1 text-center py-2 rounded-lg text-xs font-medium transition-colors ${pathname === '/v1' ? 'bg-wrc-blue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>V1 Exact</Link>
          <Link href="/v2-base" className={`flex-1 text-center py-2 rounded-lg text-xs font-medium transition-colors ${pathname === '/v2-base' ? 'bg-wrc-blue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>V2 Base</Link>
          <Link href="/v2" className={`flex-1 text-center py-2 rounded-lg text-xs font-medium transition-colors ${pathname === '/v2' ? 'bg-wrc-blue text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>V2 Expl.</Link>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-slate-500 uppercase tracking-wider text-xs mb-3 border-b pb-2">Viewport Size</h3>
        <select 
          value={viewport} 
          onChange={(e) => setViewport(e.target.value as any)}
          className="w-full bg-slate-100 border border-slate-200 rounded p-2 text-sm font-medium"
        >
          <option value="desktop">Tablet / Desktop (Max 768px)</option>
          <option value="iphone15">iPhone 15 (390px)</option>
          <option value="iphone15pro">iPhone 15 Pro (393px)</option>
          <option value="iphone15promax">iPhone 15 Pro Max (430px)</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-slate-500 uppercase tracking-wider text-xs mb-3 border-b pb-2">Global State Actions</h3>
        <button 
          onClick={() => {
            addRun({
              title: 'New Mock Run',
              club: 'Worldwide Run Club',
              distance: 1.5,
              participants: 10,
              date: addMinutes(new Date(), 60),
              status: 'READY'
            });
          }}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Mock Run
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-slate-500 uppercase tracking-wider text-xs mb-3 border-b pb-2">Active Runs</h3>
        <div className="flex flex-col gap-3">
          {runs.map(run => (
            <div key={run.id} className="bg-slate-50 border border-slate-200 p-3 rounded-lg relative group">
              <button 
                onClick={() => removeRun(run.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              
              <div className="font-bold mb-1">{run.title}</div>
              <div className="text-xs text-slate-500 mb-2">{run.club}</div>
              
              <select 
                value={run.status} 
                onChange={(e) => updateRun(run.id, { status: e.target.value as RunStatus })}
                className="w-full bg-white border border-slate-300 rounded p-1 mb-2 text-xs"
              >
                <option value="JOINED">JOINED (Shows in top section)</option>
                <option value="INVITED">INVITED (Shows in bottom list)</option>
                <option value="READY">READY</option>
              </select>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button 
                  onClick={() => updateRun(run.id, { date: addSeconds(new Date(), 10) })}
                  className="bg-wrc-blue/10 text-wrc-blue font-semibold py-1 rounded flex items-center justify-center gap-1"
                >
                  <Clock className="w-3 h-3" /> Start in 10s
                </button>
                <button 
                  onClick={() => updateRun(run.id, { participants: run.participants + 1 })}
                  className="bg-wrc-green/10 text-wrc-green font-semibold py-1 rounded flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Runner
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
