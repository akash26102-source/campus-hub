import React, { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';

// DSPM IIIT Naya Raipur - Exact Curriculum Subject Database
const SUBJECT_DATABASE = {
  // B.Tech 1st Semesters
  'B.Tech_CSE_1': [
    'Linear Algebra & Matrix Analysis',
    'Calculas',
    'Programming with C',
    'Digital Electronics using Verilog',
    'Internet of Things',
    'International Language Competency (ILC)',
    'IT Workshop',
    'Entrepreneruship',
    'Music',
    'Yoga'
  ],
  'B.Tech_DSAI_1': [
    'Linear Algebra & Matrix Analysis',
    'Calculas',
    'Programming with C',
    'Digital Electronics using Verilog',
    'Internet of Things',
    'International Language Competency (ILC)',
    'IT Workshop',
    'Entrepreneruship',
    'Music',
    'Yoga'
  ],
  'B.Tech_ECE_1': [
    'Linear Algebra & Matrix Analysis',
    'Calculas',
    'Programming with C',
    'Digital Electronics using Verilog',
    'Internet of Things',
    'International Language Competency (ILC)',
    'IT Workshop',
    'Entrepreneruship',
    'Music',
    'Yoga'
  ],

  // M.Tech 1st Semesters
  'M.Tech_CSE_1': [
    'Mathematics for Machine Learning',
    'Data Structures and Algorithm Analysis',
    'Cyber Security Fundamentals',
    'Generative AI and Prompt Engineering',
    'Data Visualisation Analysis',
    'Foundation of data science',
    'Digital Transformation-I',
    'Personality Development and Life Skills'
  ],
  'M.Tech_DSAI_1': [
    'Data Structures and Algorithm Analysis',
    'Cyber Security Fundamentals',
    'Data Visualisation Analysis',
    'Foundation of data science',
    'Digital Transformation-I',
    'Personality Development and Life Skills',
    'Inside Indian Governance: Policies, People, and Processes'
  ],
  'M.Tech_ECE_1': [
    'Optimization Algorithms',
    'VLSI Design',
    'Intelligent Systems',
    'Programming Lab-1 (FPGA/Python)',
    'Data Structures and Algorithm Analysis',
    'Foundations of Data Science',
    'AI for Autonomous Systems',
    'Personality Development and Life Skills',
    'Digital System Design',
    'Microelectronics'
  ]
};

export default function MultiSubjectEngine({ branch = 'CSE', year = '1', semester = '1', degree = 'B.Tech' }) {
  // Format key for database lookup (e.g., "B.Tech_CSE_1")
  const profileKey = `${degree}_${branch}_${semester}`;
  const storageKey = `multi_subject_data_${profileKey}`;

  // Helper to load default subjects for the current profile
  const getDefaultSubjects = () => {
    const defaultList = SUBJECT_DATABASE[profileKey] || SUBJECT_DATABASE['B.Tech_CSE_1'];
    return defaultList.map((name, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: name,
      attended: 0,
      total: 0,
      target: 75
    }));
  };

  // State management
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : getDefaultSubjects();
  });

  const [newSubjectName, setNewSubjectName] = useState('');

  // Re-load subjects whenever Branch / Degree / Semester changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setSubjects(JSON.parse(saved));
    } else {
      setSubjects(getDefaultSubjects());
    }
  }, [profileKey]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(subjects));
  }, [subjects, storageKey]);

  // Reset to default timetable subjects
  const handleResetToDefault = () => {
    if (window.confirm("Reset subjects to official timetable list? Custom edits will be lost.")) {
      const defaults = getDefaultSubjects();
      setSubjects(defaults);
      localStorage.setItem(storageKey, JSON.stringify(defaults));
    }
  };

  // Add new subject manually
  const addSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const newSub = {
      id: Date.now().toString(),
      name: newSubjectName.trim(),
      attended: 0,
      total: 0,
      target: 75
    };
    setSubjects([...subjects, newSub]);
    setNewSubjectName('');
  };

  // Delete subject
  const deleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  // Dynamic input update
  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(s => {
      if (s.id === id) {
        return { ...s, [field]: Math.max(0, parseInt(value) || 0) };
      }
      return s;
    }));
  };

  // Quick action (+1 attend / +1 bunk)
  const handleQuickAction = (id, action) => {
    setSubjects(subjects.map(s => {
      if (s.id === id) {
        if (action === 'attend') return { ...s, attended: s.attended + 1, total: s.total + 1 };
        if (action === 'bunk') return { ...s, total: s.total + 1 };
      }
      return s;
    }));
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 shadow-2xl space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Layers className="w-6 h-6 text-indigo-400" />
          <div>
            <h2 className="text-xl font-bold text-slate-50 tracking-tight">Multi-Subject Attendance Tracker</h2>
            <p className="text-xs text-slate-400">Synced with Autumn Sem 2026-27 Timetable</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            title="Reset to official timetable subjects"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" /> Reset Subjects
          </button>
          <div className="bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-400">
            {degree} • {branch} • Sem {semester}
          </div>
        </div>
      </div>

      {/* Manual Subject Form */}
      <form onSubmit={addSubject} className="flex gap-3">
        <input
          type="text"
          placeholder="Add extra subject/lab..."
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
          className="flex-1 bg-slate-800/40 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-100 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* Subject Cards Grid */}
      <div className="space-y-4">
        {subjects.length === 0 ? (
          <div className="text-center py-10 bg-slate-800/20 border border-slate-800 rounded-xl">
            <p className="text-sm text-slate-400">No subjects found. Click 'Reset Subjects' or add one manually!</p>
          </div>
        ) : (
          subjects.map((sub) => {
            const pct = sub.total > 0 ? (sub.attended / sub.total) * 100 : 0;
            const pctText = pct.toFixed(1);
            const isDanger = pct < sub.target;
            const targetPct = sub.target / 100;

            let outputText = "";
            if (pct < sub.target) {
              const needed = Math.ceil((targetPct * sub.total - sub.attended) / (1 - targetPct));
              outputText = `Attend ${Math.max(0, needed)} more back-to-back classes to reach ${sub.target}%`;
            } else {
              const bunks = Math.floor((sub.attended - targetPct * sub.total) / targetPct);
              outputText = `Safe to bunk ${Math.max(0, bunks)} upcoming classes`;
            }

            return (
              <div 
                key={sub.id} 
                className={`p-5 rounded-xl border transition-all space-y-4 ${
                  isDanger 
                    ? 'bg-red-950/20 border-red-600/40' 
                    : 'bg-slate-800/30 border-slate-800/80'
                }`}
              >
                {/* Subject Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {isDanger ? (
                      <ShieldAlert className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                    <h3 className="font-bold text-base text-slate-100">{sub.name}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      isDanger 
                        ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {pctText}%
                    </span>
                    <button 
                      onClick={() => deleteSubject(sub.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-all"
                      title="Delete Subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Inputs Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Attended</label>
                    <input
                      type="number"
                      value={sub.attended}
                      onChange={(e) => updateSubject(sub.id, 'attended', e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Total</label>
                    <input
                      type="number"
                      value={sub.total}
                      onChange={(e) => updateSubject(sub.id, 'total', e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Target %</label>
                    <input
                      type="number"
                      value={sub.target}
                      onChange={(e) => updateSubject(sub.id, 'target', e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Quick Actions & Calculation */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
                  <p className={`text-xs font-medium ${isDanger ? 'text-red-400' : 'text-slate-300'}`}>
                    {outputText}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleQuickAction(sub.id, 'attend')}
                      className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-semibold transition-all active:scale-95"
                    >
                      +1 Attended
                    </button>
                    <button
                      onClick={() => handleQuickAction(sub.id, 'bunk')}
                      className="bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 px-3 py-1 rounded-lg text-xs font-semibold transition-all active:scale-95"
                    >
                      +1 Bunked
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}