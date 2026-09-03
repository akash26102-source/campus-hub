import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronDown, Beaker } from 'lucide-react';

const ROOM_MAPPING = {
  CSE: 'Room No 138',
  DSAI: 'Room No 135',
  ECE: 'Room No 122',
};

const TIMETABLE_DATA = {
  CSE: {
    Monday: [
      { time: '9:00-9:55', subject: 'Music', slot: 'Music', faculty: 'Dr. Darash', isLab: false },
      { time: '10:00-10:55', subject: 'Music', slot: 'Music', faculty: 'Dr. Darash', isLab: false },
      { time: '11:00-11:55', subject: 'Digital Electronics using Verilog', slot: 'L', faculty: 'Dr. Manoj', isLab: false },
      { time: '12:00-12:55', subject: 'Programming with C', slot: 'B', faculty: 'Dr. Ruhul', isLab: false },
      { time: '14:00-15:55', subject: 'C Programming Lab (Batch P1) / IT Lab (Batch P2)', slot: 'Lab', faculty: 'Dr. Ruhul / Prof. Srinivasa', isLab: true, venue: 'CC Lab 1 / 2' },
      { time: '16:00-17:55', subject: 'ILC / Yoga Practicals', slot: 'ILC/Yoga', faculty: 'Dr. Aruna / GF', isLab: false }
    ],
    Tuesday: [
      { time: '9:00-10:55', subject: 'Linear Algebra & Matrix Analysis', slot: 'A', faculty: 'Dr. Mithilesh', isLab: false },
      { time: '11:00-11:55', subject: 'IT Workshop', slot: 'P', faculty: 'Prof. Srinivasa', isLab: false },
      { time: '12:00-12:55', subject: 'Programming with C', slot: 'B', faculty: 'Dr. Ruhul', isLab: false },
      { time: '14:00-15:55', subject: 'IoT Hardware Lab (Batch P1)', slot: 'Lab', faculty: 'Dr. Abhishek', isLab: true, venue: 'IoT & Embedded Systems Lab' },
      { time: '16:00-17:55', subject: 'Entrepreneurship Sessions', slot: 'E', faculty: 'Dr. Amit', isLab: false }
    ],
    Wednesday: [
      { time: '9:00-9:55', subject: 'International Language Competency', slot: 'ILC', faculty: 'Dr. Aruna', isLab: false },
      { time: '10:00-10:55', subject: 'Linear Algebra & Matrix Analysis', slot: 'A', faculty: 'Dr. Mithilesh', isLab: false },
      { time: '11:00-12:55', subject: 'Calculus', slot: 'Z', faculty: 'Dr. P P Paltani', isLab: false },
      { time: '14:00-15:55', subject: 'Digital Electronics Lab (Batch P2)', slot: 'Lab', faculty: 'Dr. Manoj', isLab: true, venue: 'Digital Hardware Lab' },
      { time: '16:00-17:55', subject: 'Music Practicals', slot: 'Music', faculty: 'Dr. Darash', isLab: false }
    ],
    Thursday: [
      { time: '10:00-10:55', subject: 'Calculus', slot: 'Z', faculty: 'Dr. P P Paltani', isLab: false },
      { time: '11:00-11:55', subject: 'Digital Electronics using Verilog', slot: 'L', faculty: 'Dr. Manoj', isLab: false },
      { time: '12:00-12:55', subject: 'International Language Competency', slot: 'ILC', faculty: 'Dr. Aruna', isLab: false },
      { time: '14:00-15:55', subject: 'Verilog HDL Hardware Lab (Batch P1)', slot: 'Lab', faculty: 'Dr. Manoj', isLab: true, venue: 'Digital Hardware Lab' },
      { time: '16:00-16:55', subject: 'Internet of Things', slot: 'F', faculty: 'Dr. Abhishek', isLab: false },
      { time: '17:00-17:55', subject: 'Linear Algebra & Matrix Analysis', slot: 'A', faculty: 'Dr. Mithilesh', isLab: false }
    ],
    Friday: [
      { time: '9:00-10:55', subject: 'Programming with C', slot: 'B', faculty: 'Dr. Ruhul', isLab: false },
      { time: '11:00-12:55', subject: 'IT Workshop Lab (Batch P2)', slot: 'Lab', faculty: 'Prof. Srinivasa', isLab: true, venue: 'CC Lab 3' },
      { time: '14:00-15:55', subject: 'International Language Competency', slot: 'ILC', faculty: 'Dr. Aruna', isLab: false },
      { time: '16:00-17:55', subject: 'Yoga Session', slot: 'Yoga', faculty: 'GF', isLab: false }
    ]
  },
  DSAI: {
    Monday: [
      { time: '9:00-10:55', subject: 'Music Practicals', slot: 'Music', faculty: 'Dr. Darash', isLab: false },
      { time: '11:00-12:55', subject: 'IoT Hardware Lab (Batch P1)', slot: 'Lab', faculty: 'Dr. Shubhangi', isLab: true, venue: 'IoT Lab' },
      { time: '14:00-14:55', subject: 'International Language Competency', slot: 'ILC', faculty: 'Dr. Aruna', isLab: false },
      { time: '15:00-15:55', subject: 'Linear Algebra & Matrix Analysis', slot: 'F', faculty: 'Dr. Ramakrishna', isLab: false },
      { time: '16:00-17:55', subject: 'ILC / Yoga', slot: 'ILC/Yoga', faculty: 'Dr. Aruna / GF', isLab: false }
    ],
    Tuesday: [
      { time: '9:00-9:55', subject: 'Programming with C', slot: 'M', faculty: 'Prof. Srinivasa', isLab: false },
      { time: '10:00-11:55', subject: 'Entrepreneurship', slot: 'A', faculty: 'Dr. Amit', isLab: false },
      { time: '14:00-15:55', subject: 'C Programming Lab (Batch P1)', slot: 'Lab', faculty: 'Prof. Srinivasa', isLab: true, venue: 'CC Lab 2' },
      { time: '16:00-17:55', subject: 'Digital Electronics using Verilog', slot: 'B', faculty: 'Dr. Lakhindar', isLab: false }
    ],
    Wednesday: [
      { time: '9:00-9:55', subject: 'International Language Competency', slot: 'ILC', faculty: 'Dr. Aruna', isLab: false },
      { time: '10:00-10:55', subject: 'IT Workshop', slot: 'G', faculty: 'Prof. Srinivasa', isLab: false },
      { time: '11:00-11:55', subject: 'Digital Electronics using Verilog', slot: 'B', faculty: 'Dr. Lakhindar', isLab: false },
      { time: '12:00-12:55', subject: 'Calculus', slot: 'N', faculty: 'Dr. Mithilesh', isLab: false },
      { time: '14:00-15:55', subject: 'Digital Hardware Lab (Batch P2)', slot: 'Lab', faculty: 'Dr. Lakhindar', isLab: true, venue: 'Digital Electronics Lab' },
      { time: '16:00-17:55', subject: 'Music Practicals', slot: 'Music', faculty: 'Dr. Darash', isLab: false }
    ],
    Thursday: [
      { time: '9:00-10:55', subject: 'IT Workshop Lab (Batch P1/P2)', slot: 'Lab', faculty: 'Prof. Srinivasa', isLab: true, venue: 'CC Lab 1' },
      { time: '11:00-11:55', subject: 'Programming with C', slot: 'M', faculty: 'Prof. Srinivasa', isLab: false },
      { time: '12:00-12:55', subject: 'International Language Competency', slot: 'ILC', faculty: 'Dr. Aruna', isLab: false },
      { time: '14:00-15:55', subject: 'C Programming Advanced Lab (Batch P2)', slot: 'Lab', faculty: 'Prof. Srinivasa', isLab: true, venue: 'CC Lab 3' },
      { time: '16:00-16:55', subject: 'Calculus', slot: 'N', faculty: 'Dr. Mithilesh', isLab: false },
      { time: '17:00-17:55', subject: 'Digital Electronics using Verilog', slot: 'B', faculty: 'Dr. Lakhindar', isLab: false }
    ],
    Friday: [
      { time: '9:00-10:55', subject: 'Calculus', slot: 'N', faculty: 'Dr. Mithilesh', isLab: false },
      { time: '11:00-11:55', subject: 'Internet of Things', slot: 'C', faculty: 'Dr. Shubhangi', isLab: false },
      { time: '12:00-12:55', subject: 'Linear Algebra & Matrix Analysis', slot: 'F', faculty: 'Dr. Ramakrishna', isLab: false },
      { time: '14:00-15:55', subject: 'Language Lab (Batch P1/P2)', slot: 'Lab', faculty: 'Dr. Aruna', isLab: true, venue: 'Language Lab' },
      { time: '16:00-17:55', subject: 'Yoga', slot: 'Yoga', faculty: 'GF', isLab: false }
    ]
  },
  ECE: {
    Monday: [
      { time: '9:00-10:55', subject: 'Music', slot: 'Music', faculty: 'Dr. Darash', isLab: false },
      { time: '11:00-11:55', subject: 'IT Workshop', slot: 'H', faculty: 'Prof. Srinivasa', isLab: false },
      { time: '12:00-12:55', subject: 'Linear Algebra & Matrix Analysis', slot: 'V', faculty: 'Dr. Ramakrishna', isLab: false },
      { time: '14:00-15:55', subject: 'Basic Electronics & Verilog Lab (Batch P1)', slot: 'Lab', faculty: 'Dr. Maifuz', isLab: true, venue: 'ECE Hardware Lab' },
      { time: '16:00-17:55', subject: 'ILC / Yoga', slot: 'ILC/Yoga', faculty: 'Dr. Aruna / GF', isLab: false }
    ],
    Tuesday: [
      { time: '9:00-10:55', subject: 'Programming with C', slot: 'A', faculty: 'Dr. M K Rao', isLab: false },
      { time: '11:00-11:55', subject: 'Linear Algebra & Matrix Analysis', slot: 'V', faculty: 'Dr. Ramakrishna', isLab: false },
      { time: '12:00-12:55', subject: 'Internet of Things', slot: 'C', faculty: 'Dr. Lakhindar', isLab: false },
      { time: '14:00-15:55', subject: 'IT Workshop Lab (Batch P1)', slot: 'Lab', faculty: 'Prof. Srinivasa', isLab: true, venue: 'CC Lab 1' },
      { time: '16:00-17:55', subject: 'Calculus', slot: 'B', faculty: 'Dr. P P Paltani', isLab: false }
    ],
    Wednesday: [
      { time: '9:00-9:55', subject: 'International Language Competency', slot: 'ILC', faculty: 'Dr. Aruna', isLab: false },
      { time: '10:00-10:55', subject: 'Digital Electronics using Verilog', slot: 'G', faculty: 'Dr. Maifuz', isLab: false },
      { time: '11:00-12:55', subject: 'Entrepreneurship', slot: 'D', faculty: 'Dr. Amit', isLab: false },
      { time: '14:00-15:55', subject: 'C Programming Lab (Batch P2)', slot: 'Lab', faculty: 'Dr. M K Rao', isLab: true, venue: 'CC Lab 3' },
      { time: '16:00-17:55', subject: 'Music Practicals', slot: 'Music', faculty: 'Dr. Darash', isLab: false }
    ],
    Thursday: [
      { time: '9:00-10:55', subject: 'Digital Electronics using Verilog', slot: 'G', faculty: 'Dr. Maifuz', isLab: false },
      { time: '11:00-11:55', subject: 'Programming with C', slot: 'A', faculty: 'Dr. M K Rao', isLab: false },
      { time: '12:00-12:55', subject: 'International Language Competency', slot: 'ILC', faculty: 'Dr. Aruna', isLab: false },
      { time: '14:00-14:55', subject: 'Calculus', slot: 'B', faculty: 'Dr. P P Paltani', isLab: false },
      { time: '15:00-16:55', subject: 'Linear Algebra & Matrix Analysis', slot: 'V', faculty: 'Dr. Ramakrishna', isLab: false },
      { time: '17:00-17:55', subject: 'Digital Electronics using Verilog', slot: 'G', faculty: 'Dr. Maifuz', isLab: false }
    ],
    Friday: [
      { time: '10:00-10:55', subject: 'Calculus', slot: 'B', faculty: 'Dr. P P Paltani', isLab: false },
      { time: '11:00-12:55', subject: 'Internet of Things Lab (Batch P2)', slot: 'Lab', faculty: 'Dr. Lakhindar', isLab: true, venue: 'IoT Hardware Lab' },
      { time: '14:00-15:55', subject: 'Language Lab (Batch P1/P2)', slot: 'Lab', faculty: 'Dr. Aruna', isLab: true, venue: 'Language Lab' },
      { time: '16:00-17:55', subject: 'Yoga', slot: 'Yoga', faculty: 'GF', isLab: false }
    ]
  }
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function TimetableSync() {
  const [selectedBranch, setSelectedBranch] = useState('DSAI');
  const [selectedDay, setSelectedDay] = useState('Thursday');

  const currentRoom = ROOM_MAPPING[selectedBranch];
  const daySchedule = TIMETABLE_DATA[selectedBranch]?.[selectedDay] || [];

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-100 shadow-2xl space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-indigo-400" />
          <div>
            <h2 className="text-xl font-bold text-slate-50 tracking-tight">Class & Lab Timetable Sync</h2>
            <p className="text-xs text-slate-400">Autumn Semester 2026-27</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700/60 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>Lecture Hall: {currentRoom}</span>
          </div>

          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="appearance-none bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 pr-8 rounded-lg cursor-pointer focus:outline-none transition-all"
            >
              <option value="CSE">B.Tech • CSE • Sem 1</option>
              <option value="DSAI">B.Tech • DSAI • Sem 1</option>
              <option value="ECE">B.Tech • ECE • Sem 1</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="grid grid-cols-5 gap-2 bg-slate-800/40 p-1.5 rounded-xl border border-slate-800">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              selectedDay === day
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Schedule List */}
      <div className="space-y-3">
        {daySchedule.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/20 border border-slate-800 rounded-xl text-slate-400 text-sm">
            No sessions scheduled for {selectedDay}.
          </div>
        ) : (
          daySchedule.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                item.isLab
                  ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-500/70'
                  : 'bg-slate-800/30 border-slate-800 hover:border-slate-700/80'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold min-w-[110px] justify-center ${
                    item.isLab
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-900/80 text-indigo-300 border border-slate-700/50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {item.time}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-100">{item.subject}</h4>
                    {item.isLab && (
                      <span className="flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                        <Beaker className="w-3 h-3" /> LAB
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-500" /> {item.faculty}
                    </span>
                    {item.venue && (
                      <span className="flex items-center gap-1 text-amber-400/90 font-medium">
                        <MapPin className="w-3 h-3" /> Venue: {item.venue}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`border text-[11px] font-semibold px-2.5 py-1 rounded-md ${
                    item.isLab
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700/60'
                  }`}
                >
                  {item.slot}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}