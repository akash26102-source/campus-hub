import React, { useState } from 'react';
import { Megaphone, Filter, Tag, Calendar, UserCheck, Search } from 'lucide-react';

export default function CampusFeedEngine({ notices = [], profile = {}, onPostNotice }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract branch & semester dynamically from profile
  const userBranch = profile?.branch || 'All Branches';
  const userSem = profile?.semester || 'All Semesters';

  // Filter Notices based on Category, Search query, and Branch target
  const filteredNotices = notices.filter((notice) => {
    const matchesCategory =
      selectedCategory === 'All' || notice.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch =
      notice.target === 'All Branches' ||
      notice.target.toLowerCase().includes(userBranch.split(' ')[1]?.toLowerCase() || '');

    return matchesCategory && matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Section with Dynamic Subtitle */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2.5 text-slate-100">
            <Megaphone className="w-6 h-6 text-indigo-400" /> Campus Feed
          </h2>
          {/* Dynamic subtitle based on active user profile */}
          <p className="text-xs text-indigo-300 font-semibold mt-1">
            Filtered for: <span className="underline decoration-indigo-500/50">{userBranch} ({userSem})</span> & General Updates
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search feed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0" />
        {['All', 'General', 'Exam', 'Event', 'Placement'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-[#0f172a] text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-[#0f172a] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                      notice.category === 'Exam'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : notice.category === 'Event'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : notice.category === 'Placement'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}
                  >
                    {notice.category}
                  </span>

                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {notice.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-1.5 leading-snug">
                  {notice.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {notice.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> {notice.author}
                </span>
                <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800/80 text-slate-400 text-[10px]">
                  <Tag className="w-3 h-3 text-slate-500" /> {notice.target}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-[#0f172a] border border-slate-800 rounded-2xl p-12 text-center">
            <p className="text-slate-400 text-sm font-semibold">No updates found matching your filters.</p>
            <p className="text-slate-500 text-xs mt-1">Try switching categories or clearing search query.</p>
          </div>
        )}
      </div>

    </div>
  );
}