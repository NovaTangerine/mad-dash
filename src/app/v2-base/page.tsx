'use client';

import React, { useState } from 'react';
import { Bell, Home, MessageSquare, Globe, Settings, ChevronRight, Plus, MapPin, Users, Calendar, BellRing, Share } from 'lucide-react';
import { useWRCStore } from '@/store/useWRCStore';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { format } from 'date-fns';

export default function V2Exploratory() {
  const { runs, clubs, viewport } = useWRCStore();
  const [showMoreRuns, setShowMoreRuns] = useState(false);

  // Split runs into "Runs this week" and "Available Runs"
  // For the prototype, we assume the first two JOINED runs are "Runs this week"
  const joinedRuns = runs.filter(r => r.status === 'JOINED').sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // The rest are listed under Available Runs
  const availableRuns = runs.filter(r => r.status !== 'JOINED' || !joinedRuns.slice(0, 2).includes(r));

  // Determine which runs to show in the top section based on the toggle state
  const displayedTopRuns = showMoreRuns ? joinedRuns.slice(0, 2) : joinedRuns.slice(0, 1);
  const hiddenTopRunsCount = joinedRuns.length > 1 ? joinedRuns.length - 1 : 0;

  const viewportWidth = {
    desktop: '768px',
    iphone15: '390px',
    iphone15pro: '393px',
    iphone15promax: '430px'
  }[viewport] || '768px';

  return (
    <div 
      className="flex flex-col min-h-[100dvh] bg-[#f4f6fa] w-full mx-auto shadow-2xl relative font-sans text-slate-800 transition-all duration-300 ease-in-out"
      style={{ maxWidth: viewportWidth }}
    >
      
      {/* HEADER */}
      <header className="bg-wrc-blue-dark text-white px-6 pt-14 pb-10 flex justify-between items-center rounded-b-[2.5rem]">
        <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center font-bold text-white shadow-sm border-2 border-white/20">
          KD
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white/80 rounded-full" style={{ opacity: i === 2 ? 1 : 0.6 - (Math.abs(2-i)*0.2) }} />
            ))}
          </div>
          <span className="font-heading font-black text-xl tracking-tight">WRC</span>
        </div>
        
        <div className="w-10 h-10 rounded-xl bg-white text-wrc-blue-dark flex items-center justify-center shadow-sm relative">
          <Bell className="w-5 h-5 fill-current" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
        </div>
      </header>

      {/* MAIN SCROLL AREA */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 pb-28 -mt-6">
        
        {/* Runs this week */}
        <section className="mb-6 bg-white rounded-3xl p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h2 className="font-heading font-extrabold text-xl text-slate-800">Runs this week</h2>
          </div>

          <div className="flex flex-col gap-4">
            {displayedTopRuns.map((run, idx) => (
              <div key={run.id} className="bg-gradient-to-b from-[#edf4f5] to-white rounded-xl p-3 border border-[#d3e0ea]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {/* Simplified avatar match from club */}
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${clubs.find(c => c.name === run.club)?.gradient || 'from-gray-200 to-gray-300'} border-2 border-white shadow-sm`}></div>
                    <span className="font-bold text-slate-800">{run.club}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>

                <CountdownTimer targetDate={run.date} />

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white rounded-lg p-3 flex items-center gap-3 border border-[#d3e0ea]">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center shadow-inner"><MapPin className="w-4 h-4 fill-current" /></div>
                    <div>
                      <div className="font-heading font-bold text-lg leading-none">{run.distance}</div>
                      <div className="text-xs text-slate-400 font-semibold">Miles</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 flex items-center gap-3 border border-[#d3e0ea]">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-inner"><Users className="w-4 h-4 fill-current" /></div>
                    <div>
                      <div className="font-heading font-bold text-lg leading-none">{run.participants}</div>
                      <div className="text-xs text-slate-400 font-semibold">{run.participants === 1 ? 'Runner' : 'Runners'}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#d3e0ea] bg-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-white text-sm shadow-inner">KD</div>
                    <div>
                      <div className="font-bold flex items-center gap-1 text-slate-800">You're going! <svg className="w-4 h-4 text-wrc-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                      <div className="text-xs text-slate-400">Tap to invite connects</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg py-3 flex flex-col items-center justify-center font-semibold text-xs transition-transform active:scale-95 shadow-inner">
                      <Calendar className="w-4 h-4 mb-1" /> Calendar
                    </button>
                    <button className="bg-white border border-[#d3e0ea] text-wrc-blue rounded-lg py-3 flex flex-col items-center justify-center font-semibold text-xs transition-transform active:scale-95">
                      <BellRing className="w-4 h-4 mb-1" /> Remind
                    </button>
                    <button className="bg-white border border-[#d3e0ea] text-slate-500 rounded-lg py-3 flex flex-col items-center justify-center font-semibold text-xs transition-transform active:scale-95">
                      <Share className="w-4 h-4 mb-1" /> Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {hiddenTopRunsCount > 0 && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => setShowMoreRuns(!showMoreRuns)}
                className="text-wrc-blue text-sm font-semibold flex items-center gap-1 transition-transform active:scale-95"
              >
                {showMoreRuns ? `Hide ${hiddenTopRunsCount} run` : `Show ${hiddenTopRunsCount} more run`}
                <ChevronRight className={`w-4 h-4 transition-transform ${showMoreRuns ? '-rotate-90' : 'rotate-90'}`} />
              </button>
            </div>
          )}
        </section>

        {/* Clubs */}
        <section className="mb-6 bg-white rounded-3xl p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-xl text-slate-800">Clubs</h2>
              <span className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-inner">{clubs.length}</span>
            </div>
            <button className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg flex items-center justify-center shadow-inner transition-transform active:scale-90">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            {clubs.map((club) => (
              <div key={club.id} className="bg-gradient-to-b from-[#edf4f5] to-white rounded-xl p-3 border border-[#d3e0ea] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${club.gradient} shadow-inner`}></div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{club.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="flex -space-x-1.5">
                        {club.users.map((u, ui) => (
                          <div key={ui} className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-sm ${u === 'KD' ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : u === 'ZB' ? 'bg-gradient-to-br from-emerald-500 to-green-600' : u === 'TR' ? 'bg-gradient-to-br from-red-400 to-rose-600' : 'bg-gradient-to-br from-orange-400 to-amber-600'}`}>
                            {u}
                          </div>
                        ))}
                      </div>
                      <span>{club.members} {club.members === 1 ? 'member' : 'members'}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            ))}
          </div>
        </section>
        
        {/* Available Runs */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <div className="flex flex-col items-center mb-4">
            <h2 className="font-heading font-extrabold text-xl text-slate-800 mb-2">Upcoming Runs</h2>
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <div className="w-2 h-2 bg-white rounded-full"></div> Ready
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            {availableRuns.map((run) => (
              <div key={run.id} className="bg-gradient-to-b from-[#edf4f5] to-white rounded-xl p-3 border border-[#d3e0ea]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${clubs.find(c => c.name === run.club)?.gradient || 'from-gray-200 to-gray-300'}`}></div>
                    <span className={`font-bold text-xs uppercase tracking-wide ${run.status === 'INVITED' ? 'text-slate-500' : 'text-wrc-blue'}`}>{run.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {run.badge && <span className="bg-blue-100 text-wrc-blue text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg> {run.badge}</span>}
                    <span className="text-xs text-slate-500 font-semibold">{format(run.date, "EEEE • h:mm a")}</span>
                  </div>
                </div>
                
                <h3 className="font-heading font-bold text-lg text-slate-800 mb-1">{run.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{run.club}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 border border-[#d3e0ea] rounded-full px-2 py-1 text-xs text-slate-600 font-semibold">
                      <MapPin className="w-3 h-3 text-slate-400" /> {run.distance} mi
                    </div>
                    <div className="flex items-center gap-1 border border-[#d3e0ea] rounded-full px-2 py-1 text-xs text-slate-600 font-semibold">
                      <Users className="w-3 h-3 text-slate-400" /> {run.participants}
                    </div>
                  </div>
                  {run.status === 'JOINED' ? (
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">KD</div>
                    </div>
                  ) : (
                    <div className="flex -space-x-2">
                      {['TR', 'ZB', 'KD'].map((u, ui) => (
                        <div key={ui} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-sm ${u === 'KD' ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : u === 'ZB' ? 'bg-gradient-to-br from-emerald-500 to-green-600' : 'bg-gradient-to-br from-red-400 to-rose-600'}`}>
                          {u}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* BOTTOM NAV */}
      <nav className="absolute bottom-0 w-full bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.06)] flex justify-between px-6 pb-6 pt-4 rounded-b-[2.5rem]">
        {[
          { icon: Home, label: 'Home', active: true },
          { icon: MessageSquare, label: 'Messages', badge: 1 },
          { icon: Globe, label: 'Network' },
          { icon: Settings, label: 'Settings' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1 relative cursor-pointer group" onClick={() => {}}>
            <item.icon className={`w-6 h-6 transition-colors group-hover:text-wrc-blue ${item.active ? 'text-wrc-blue' : 'text-slate-400'}`} fill={item.active ? 'currentColor' : 'none'} />
            <span className={`text-[10px] font-semibold transition-colors group-hover:text-wrc-blue ${item.active ? 'text-wrc-blue' : 'text-slate-400'}`}>{item.label}</span>
            {item.badge && (
              <div className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                {item.badge}
              </div>
            )}
            {item.active && <div className="absolute -bottom-2 w-8 h-1 bg-wrc-blue rounded-t-full"></div>}
          </div>
        ))}
      </nav>
      
    </div>
  );
}
