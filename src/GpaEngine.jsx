import React, { useState, useEffect } from 'react';
import { Award, Plus, Trash2, Calculator, TrendingUp } from 'lucide-react';

export default function GpaPredictorEngine() {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('gpaCourses');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Data Structures', credits: 4, gradePoint: 9 },
      { id: 2, name: 'Operating Systems', credits: 3, gradePoint: 8 },
      { id: 3, name: 'Computer Networks', credits: 3, gradePoint: 7 },
    ];
  });

  const [targetGpa, setTargetGpa] = useState(8.5);
  const [name, setName] = useState('');
  const [credits, setCredits] = useState('');
  const [gradePoint, setGradePoint] = useState(8);

  useEffect(() => {
    localStorage.setItem('gpaCourses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = () => {
    if (!name.trim() || !credits) return;
    setCourses([
      ...courses,
      { id: Date.now(), name, credits: Number(credits), gradePoint: Number(gradePoint) }
    ]);
    setName(''); setCredits('');
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // GPA Math
  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const totalPoints = courses.reduce((acc, c) => acc + (c.credits * c.gradePoint), 0);
  const currentGpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-indigo-400" />
          <div>
            <h1 className="text-xl font-bold text-slate-50">GPA Predictor & Planner</h1>
            <p className="text-xs text-slate-400">Calculate SGPA/CGPA based on course credits</p>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
        <input 
          type="text" 
          placeholder="Course Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
        />
        <input 
          type="number" 
          placeholder="Credits (e.g. 3 or 4)" 
          value={credits} 
          onChange={(e) => setCredits(e.target.value)} 
          className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
        />
        <select 
          value={gradePoint} 
          onChange={(e) => setGradePoint(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
        >
          <option value={10}>S / O Grade (10)</option>
          <option value={9}>A+ Grade (9)</option>
          <option value={8}>A Grade (8)</option>
          <option value={7}>B+ Grade (7)</option>
          <option value={6}>B Grade (6)</option>
          <option value={5}>C Grade (5)</option>
        </select>
        <input 
          type="number" 
          placeholder="Target GPA" 
          value={targetGpa} 
          onChange={(e) => setTargetGpa(e.target.value)} 
          className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
        />
        <button 
          onClick={addCourse} 
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition p-2 col-span-2 md:col-span-1"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      {/* Summary Analytics Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Calculated GPA</span>
          <div className="text-4xl font-extrabold text-indigo-400">{currentGpa}</div>
          <p className="text-xs text-slate-400 mt-2">Total Credits: <strong className="text-slate-200">{totalCredits}</strong></p>
        </div>

        <div className="md:col-span-2 bg-slate-800/30 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Status</h4>
          {currentGpa >= targetGpa ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-emerald-300">On Track!</p>
                <p className="text-xs text-emerald-400/80 mt-0.5">Your GPA ({currentGpa}) meets or exceeds your target of {targetGpa}.</p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-center gap-3">
              <Calculator className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-300">Below Target Goal</p>
                <p className="text-xs text-amber-400/80 mt-0.5">Target is {targetGpa}. You need higher grade points in upcoming courses/credits to balance it out.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Breakdown</h3>
        <div className="grid grid-cols-1 gap-2">
          {courses.map((c) => (
            <div key={c.id} className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 flex justify-between items-center text-xs">
              <div>
                <span className="font-semibold text-slate-200 text-sm">{c.name}</span>
                <p className="text-slate-400 mt-0.5">{c.credits} Credits • Grade Point: {c.gradePoint}/10</p>
              </div>
              <button onClick={() => deleteCourse(c.id)} className="text-slate-500 hover:text-red-400 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}