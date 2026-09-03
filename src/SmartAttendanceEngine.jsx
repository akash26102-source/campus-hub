import React, { useState, useEffect } from 'react';
import { Calculator, AlertTriangle, ShieldAlert, CheckCircle2, RotateCcw, Plus, Minus } from 'lucide-react';

export default function SmartAttendanceEngine({ branch, year, semester }) {
  const storageKey = `bunk_data_${branch}_${year}_${semester}`;

  // Load from LocalStorage or default
  const [attended, setAttended] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).attended : 10;
  });
  const [total, setTotal] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).total : 20;
  });
  const [target, setTarget] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).target : 75;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ attended, total, target }));
  }, [attended, total, target, storageKey]);

  const currentPctNum = total > 0 ? (attended / total) * 100 : 0;
  const currentPercentage = currentPctNum.toFixed(1);

  // Math Logic
  const calculateOutput = () => {
    if (total === 0) return { type: 'safe', count: 0 };
    const targetPct = target / 100;

    if (currentPctNum < target) {
      if (targetPct >= 1) return { type: 'danger', count: '∞' };
      const needed = Math.ceil((targetPct * total - attended) / (1 - targetPct));
      return { type: 'danger', count: Math.max(0, needed) };
    } else {
      const bunks = Math.floor((attended - targetPct * total) / targetPct);
      return { type: 'safe', count: Math.max(0, bunks) };
    }
  };

  const output = calculateOutput();

  // Tier Status Logic
  const isCritical = currentPctNum < 65;
  const isShortage = currentPctNum >= 65 && currentPctNum < target;
  const isWarning = currentPctNum >= target && currentPctNum < target + 5;

  // Colors mapping
  const getTheme = () => {
    if (isCritical) return {
      card: 'bg-red-950/25 border-red-600/50',
      badge: 'bg-red-500/20 text-red-400 border-red-500/30',
      bar: 'bg-red-500',
      text: 'text-red-500',
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      label: 'Critical Shortage Zone (<65%)'
    };
    if (isShortage) return {
      card: 'bg-orange-950/25 border-orange-500/40',
      badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      bar: 'bg-orange-500',
      text: 'text-orange-400',
      icon: <AlertTriangle className="w-5 h-5 text-orange-400" />,
      label: 'Danger Zone / Shortage'
    };
    if (isWarning) return {
      card: 'bg-amber-950/25 border-amber-500/40',
      badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      bar: 'bg-amber-400',
      text: 'text-amber-400',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      label: 'Warning Zone (Borderline)'
    };
    return {
      card: 'bg-emerald-950/25 border-emerald-500/40',
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      bar: 'bg-emerald-500',
      text: 'text-emerald-400',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      label: 'Safe Zone'
    };
  };

  const theme = getTheme();

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-50 tracking-tight">Quick Bunk Calculator</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { setAttended(0); setTotal(0); }}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-all"
            title="Reset Counter"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300">
            Profile: <span className="text-indigo-400 font-bold">{branch} • {year} • {semester}</span>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/80 space-y-2">
          <label className="block text-xs font-medium text-slate-400">Attended Classes</label>
          <input
            type="number"
            value={attended}
            onChange={(e) => setAttended(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/80 space-y-2">
          <label className="block text-xs font-medium text-slate-400">Total Classes Conducted</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/80 space-y-2">
          <label className="block text-xs font-medium text-slate-400">Target Attendance %</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Math.min(100, Math.max(1, parseInt(e.target.value) || 0)))}
            className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* QUICK ACTION BUTTONS */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => { setAttended(a => a + 1); setTotal(t => t + 1); }}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 py-2 px-4 rounded-xl text-xs font-semibold transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" /> Attended Class (+1)
        </button>
        <button
          onClick={() => setTotal(t => t + 1)}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 py-2 px-4 rounded-xl text-xs font-semibold transition-all active:scale-95"
        >
          <Minus className="w-3.5 h-3.5" /> Bunked Class (+1 Total)
        </button>
      </div>

      {/* CURRENT ATTENDANCE + PROGRESS BAR */}
      <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">Current Attendance</span>
          <span className={`px-4 py-1 rounded-lg text-sm font-bold tracking-wide border ${theme.badge}`}>
            {currentPercentage}%
          </span>
        </div>

        {/* Visual Progress Bar with Marker */}
        <div className="relative w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div 
            className={`h-full transition-all duration-500 ${theme.bar}`}
            style={{ width: `${Math.min(100, currentPctNum)}%` }}
          />
          {/* Target Threshold Marker */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white/70 shadow-[0_0_8px_white]"
            style={{ left: `${target}%` }}
            title={`Target Threshold (${target}%)`}
          />
        </div>
      </div>

      {/* PREDICTIVE OUTPUT */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">PREDICTIVE OUTPUT</span>
        
        <div className={`p-4 rounded-xl border transition-all ${theme.card}`}>
          <div className="flex items-center gap-3 mb-1.5">
            {theme.icon}
            <h4 className={`font-bold text-sm tracking-wide ${theme.text}`}>
              {theme.label}
            </h4>
          </div>

          <p className="text-xs pl-8 text-slate-300 leading-relaxed">
            {currentPctNum < target ? (
              <>
                Attend <strong className="text-white font-bold">{output.count}</strong> back-to-back classes to recover to {target}%.
              </>
            ) : (
              <>
                You can safely bunk <strong className="text-white font-bold">{output.count}</strong> upcoming classes while maintaining above {target}%.
              </>
            )}
          </p>
        </div>
      </div>

    </div>
  );
}