import React, { useState } from 'react';
import CampusHub from './CampusHub';
import TimetableEngine from './TimetableEngine';
import SmartAttendanceEngine from './SmartAttendanceEngine';
import MultiSubjectEngine from './MultiSubjectEngine';
import GpaEngine from './GpaEngine';
import CampusFeedEngine from './CampusFeedEngine';
import { User, Megaphone, X, UserPlus } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');

  // Load saved profile or start empty
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('student_profile');
    return saved
      ? JSON.parse(saved)
      : {
          name: '',
          rollNo: '',
          email: '',
          branch: 'B.Tech CSE',
          semester: 'Sem 1',
        };
  });

  const [isProfileOpen, setIsProfileOpen] = useState(!profile.name);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  // Notices List with LocalStorage Sync
  const [notices, setNotices] = useState(() => {
    const savedNotices = localStorage.getItem('campus_notices');
    return savedNotices
      ? JSON.parse(savedNotices)
      : [
          {
            id: 1,
            title: 'Mid-Sem Exam Schedule Announced',
            category: 'Exam',
            target: 'All Branches',
            date: new Date().toISOString().split('T')[0],
            description: 'Mid-semester exams schedule published by academic cell.',
            author: 'Academic Office'
          }
        ];
  });

  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('General');
  const [noticeTarget, setNoticeTarget] = useState('All Branches');
  const [noticeDesc, setNoticeDesc] = useState('');

  const courseOptions = [
    'B.Tech CSE',
    'B.Tech DSAI',
    'B.Tech ECE',
    'M.Tech CSE',
    'M.Tech ECE',
    'Ph.D. Scholar'
  ];

  const semesterOptions = [
    'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4',
    'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('student_profile', JSON.stringify(profile));
    setIsProfileOpen(false);
  };

  const handlePostNoticeSubmit = (e) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: noticeTitle,
      category: noticeCategory,
      target: noticeTarget,
      date: new Date().toISOString().split('T')[0],
      description: noticeDesc || 'No additional details provided.',
      author: profile.name || 'Student'
    };

    const updated = [newEntry, ...notices];
    setNotices(updated);
    localStorage.setItem('campus_notices', JSON.stringify(updated));

    setNoticeTitle('');
    setNoticeDesc('');
    setIsNoticeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 p-6 font-sans">
      
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-[#0f172a]/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800/80 shadow-lg overflow-x-auto">
          {[
            { id: 'hub', label: 'Campus Hub' },
            { id: 'timetable', label: 'Timetable' },
            { id: 'quickbunk', label: 'Quick Bunk' },
            { id: 'multisubject', label: 'Multi-Subject' },
            { id: 'gpa', label: 'GPA Predictor' },
            { id: 'feed', label: 'Campus Feed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNoticeModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
          >
            <Megaphone className="w-3.5 h-3.5" /> Post Notice
          </button>

          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-2.5 bg-[#0f172a] hover:bg-slate-800 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs cursor-pointer transition-all"
          >
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-[10px]">
              {profile.name ? profile.name.charAt(0).toUpperCase() : <UserPlus className="w-3 h-3" />}
            </div>
            <div className="text-left hidden sm:block">
              <p className="font-bold text-slate-200 leading-tight">
                {profile.name || 'Setup Profile'}
              </p>
              <p className="text-[10px] text-slate-400">
                {profile.rollNo ? profile.rollNo : profile.branch} • {profile.semester}
              </p>
            </div>
          </button>
        </div>

      </div>

      {/* Main Views */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'hub' && <CampusHub notices={notices} profile={profile} />}
        {activeTab === 'timetable' && <TimetableEngine userBranch={profile.branch} />}
        {activeTab === 'quickbunk' && <SmartAttendanceEngine />}
        {activeTab === 'multisubject' && <MultiSubjectEngine userBranch={profile.branch} userSem={profile.semester} />}
        {activeTab === 'gpa' && <GpaEngine />}
        {activeTab === 'feed' && (
          <CampusFeedEngine
            notices={notices}
            profile={profile}
            onPostNotice={(newNotice) => setNotices([newNotice, ...notices])}
          />
        )}
      </main>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveProfile} className="bg-[#0f172a] border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" /> Student Profile Settings
              </h3>
              {profile.name && (
                <button type="button" onClick={() => setIsProfileOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Roll Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 2310010001"
                    value={profile.rollNo}
                    onChange={(e) => setProfile({ ...profile, rollNo: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">College Email ID</label>
                  <input
                    type="email"
                    placeholder="student@iiitnr.edu.in"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Branch / Course</label>
                  <select
                    value={profile.branch}
                    onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-indigo-300 focus:outline-none focus:border-indigo-500"
                  >
                    {courseOptions.map((course, idx) => (
                      <option key={idx} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Semester</label>
                  <select
                    value={profile.semester}
                    onChange={(e) => setProfile({ ...profile, semester: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-indigo-300 focus:outline-none focus:border-indigo-500"
                  >
                    {semesterOptions.map((sem, idx) => (
                      <option key={idx} value={sem}>{sem}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all mt-2 cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              Save & Sync Profile
            </button>
          </form>
        </div>
      )}

      {/* Post Notice Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handlePostNoticeSubmit} className="bg-[#0f172a] border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-indigo-400" /> Post Campus Notice
              </h3>
              <button type="button" onClick={() => setIsNoticeModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Notice Title</label>
                <input
                  type="text"
                  placeholder="e.g. Lab schedule change"
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select
                    value={noticeCategory}
                    onChange={(e) => setNoticeCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200"
                  >
                    <option value="General">General</option>
                    <option value="Exam">Exam</option>
                    <option value="Event">Event</option>
                    <option value="Placement">Placement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Target Audience</label>
                  <select
                    value={noticeTarget}
                    onChange={(e) => setNoticeTarget(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200"
                  >
                    <option value="All Branches">All Branches</option>
                    <option value="CSE Only">CSE Only</option>
                    <option value="ECE Only">ECE Only</option>
                    <option value="DSAI Only">DSAI Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Details / Description</label>
                <textarea
                  rows="3"
                  placeholder="Notice details..."
                  value={noticeDesc}
                  onChange={(e) => setNoticeDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              Publish Notice Immediately
            </button>
          </form>
        </div>
      )}

    </div>
  );
}