import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Clock, CheckSquare, BarChart2, Bell, 
  Plus, Trash2, Sparkles, CheckCircle2, Calendar 
} from 'lucide-react';
import { OFFICIAL_HOLIDAYS, EXAM_SCHEDULE } from './academicData';

export default function CampusHub() {
  const [attended, setAttended] = useState(28);
  const [totalClasses, setTotalClasses] = useState(35);
  const [targetPercent, setTargetPercent] = useState(75);

  const currentPercent = totalClasses > 0 ? ((attended / totalClasses) * 100).toFixed(1) : 0;
  
  const safeBunks = Math.floor((attended - (targetPercent / 100) * totalClasses) / (targetPercent / 100));
  const classesToAttend = Math.ceil(((targetPercent / 100) * totalClasses - attended) / (1 - (targetPercent / 100)));

  // Countdown timer linked to Academic Calendar (Oct 26, 2026)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });
  const midSemDate = new Date(EXAM_SCHEDULE.midSem.startDate);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = midSemDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [tasks, setTasks] = useState([
    { id: '1', title: 'C Lab Assignment 4 (Pointers)', subject: 'Programming with C', dueDate: 'Tomorrow', done: false },
    { id: '2', title: 'Verilog Digital Module Simulation', subject: 'Digital Electronics', dueDate: 'Sep 10', done: true },
  ]);
  const [newTask, setNewTask] = useState('');
  const [newSub, setNewSub] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask, subject: newSub || 'General', dueDate: 'Upcoming', done: false }]);
    setNewTask('');
    setNewSub('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const [notifEnabled, setNotifEnabled] = useState(false);

  return (
    <div className="space-y-6 text-slate-100 p-4">
      
      {/* Mid-Sem Countdown (Official Calendar Date) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/30 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> IIITNR Official Academic Calendar
            </span>
            <h3 className="text-xl font-extrabold text-white">Mid-Term Exams (MTE)</h3>
            <p className="text-xs text-slate-400">Scheduled: Oct 26 – Nov 03, 2026</p>
          </div>

          <div className="flex gap-2 text-center">
            <div className="bg-slate-800/80 border border-indigo-500/30 p-2.5 rounded-xl min-w-[55px]">
              <span className="block text-2xl font-black text-indigo-300">{timeLeft.days}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Days</span>
            </div>
            <div className="bg-slate-800/80 border border-indigo-500/30 p-2.5 rounded-xl min-w-[55px]">
              <span className="block text-2xl font-black text-indigo-300">{timeLeft.hours}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Hours</span>
            </div>
            <div className="bg-slate-800/80 border border-indigo-500/30 p-2.5 rounded-xl min-w-[55px]">
              <span className="block text-2xl font-black text-indigo-300">{timeLeft.mins}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Mins</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-sm">Class Alerts</h4>
            </div>
            <button
              onClick={() => setNotifEnabled(!notifEnabled)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                notifEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {notifEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Get browser notifications 10 mins before room or lab lectures start.
          </p>
        </div>
      </div>

      {/* Official Holiday Tracker & Smart Predictor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Smart Bunk Predictor */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-slate-100">Smart Bunk Predictor</h3>
              <p className="text-xs text-slate-400">Target Percentage Safe Guard</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <label className="block text-[11px] font-medium text-slate-400">Attended</label>
              <input
                type="number"
                value={attended}
                onChange={(e) => setAttended(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm font-bold mt-1 text-indigo-300"
              />
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <label className="block text-[11px] font-medium text-slate-400">Total Held</label>
              <input
                type="number"
                value={totalClasses}
                onChange={(e) => setTotalClasses(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm font-bold mt-1 text-indigo-300"
              />
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
              <label className="block text-[11px] font-medium text-slate-400">Target %</label>
              <input
                type="number"
                value={targetPercent}
                onChange={(e) => setTargetPercent(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm font-bold mt-1 text-amber-400"
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${
            safeBunks >= 0 
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold">Current: {currentPercent}%</span>
              <span className="text-xs font-bold uppercase tracking-wide">
                {safeBunks >= 0 ? 'Safe Zone' : 'Detention Risk'}
              </span>
            </div>
            <p className="text-sm font-extrabold mt-2">
              {safeBunks >= 0 
                ? `You can safely bunk ${safeBunks} upcoming classes!` 
                : `You must attend next ${classesToAttend} classes continuously!`}
            </p>
          </div>
        </div>

        {/* Upcoming Official Holidays Section */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-slate-100">Upcoming Official Holidays</h3>
              <p className="text-xs text-slate-400">As per IIITNR GAD Notification</p>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            {OFFICIAL_HOLIDAYS.map((h, i) => (
              <div key={i} className="flex justify-between items-center bg-slate-800/40 border border-slate-800 p-2.5 rounded-xl">
                <div>
                  <h5 className="text-xs font-bold text-slate-200">{h.name}</h5>
                  <span className="text-[10px] text-slate-400">{h.day}</span>
                </div>
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                  {h.date}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Task Tracker */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <CheckSquare className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="font-bold text-slate-100">Lab Submissions & Homework</h3>
            <p className="text-xs text-slate-400">Keep track of pending academic tasks</p>
          </div>
        </div>

        <form onSubmit={addTask} className="flex gap-2">
          <input
            type="text"
            placeholder="Assignment details..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 bg-slate-800/40 border border-slate-700/60 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Subject..."
            value={newSub}
            onChange={(e) => setNewSub(e.target.value)}
            className="w-1/3 bg-slate-800/40 border border-slate-700/60 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </form>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                task.done ? 'bg-slate-800/20 border-slate-800/60 opacity-60' : 'bg-slate-800/40 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <button onClick={() => toggleTask(task.id)} className="text-indigo-400">
                  <CheckCircle2 className={`w-5 h-5 ${task.done ? 'fill-indigo-500 text-slate-900' : ''}`} />
                </button>
                <div>
                  <h5 className={`text-xs font-bold ${task.done ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                    {task.title}
                  </h5>
                  <span className="text-[10px] text-slate-400">{task.subject} • Due: {task.dueDate}</span>
                </div>
              </div>

              <button onClick={() => deleteTask(task.id)} className="text-slate-500 hover:text-rose-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}