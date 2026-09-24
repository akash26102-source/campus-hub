import React, { useState } from 'react';

export default function CampusHub() {
  const [attended, setAttended] = useState(28);
  const [totalHeld, setTotalHeld] = useState(35);
  const [targetPct, setTargetPct] = useState(75);

  const currentPct = totalHeld > 0 ? ((attended / totalHeld) * 100).toFixed(1) : 0;
  const targetFrac = targetPct / 100;
  const maxBunks = Math.floor((attended - targetFrac * totalHeld) / targetFrac);
  const safeBunks = maxBunks > 0 ? maxBunks : 0;

  return (
    <div style={{ padding: '24px', color: '#f3f4f6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Banner Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', background: 'linear-gradient(90deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ⚡ IIITNR OFFICIAL ACADEMIC CALENDAR
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '8px 0 4px 0', color: '#fff' }}>Mid-Term Exams (MTE)</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>Scheduled: Oct 26 - Nov 03, 2026</p>
        </div>

        {/* Alerts Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>🔔 Class Alerts</h3>
            <span style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>Disabled</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '12px', lineHeight: '1.4' }}>
            Get instant browser push notifications 10 mins before room or lab lectures start.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* Smart Attendance Manager Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#38bdf8' }}>
              🛡️ Smart Attendance Manager
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Target Percentage Safe Guard</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[['Attended', attended, setAttended], ['Total Held', totalHeld, setTotalHeld], ['Target %', targetPct, setTargetPct]].map(([label, val, setter], idx) => (
              <div key={idx}>
                <label style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '600', display: 'block', marginBottom: '6px' }}>{label}</label>
                <input 
                  type="number" 
                  value={val} 
                  onChange={(e) => setter(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Result Box */}
          <div style={{
            background: currentPct >= targetPct ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            border: currentPct >= targetPct ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: '700', color: currentPct >= targetPct ? '#4ade80' : '#f87171' }}>
                Current: {currentPct}%
              </span>
              <span style={{
                background: currentPct >= targetPct ? '#22c55e' : '#ef4444',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '6px',
                letterSpacing: '0.5px'
              }}>
                {currentPct >= targetPct ? 'SAFE ZONE' : 'DANGER ZONE'}
              </span>
            </div>
            {currentPct >= targetPct ? (
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.4' }}>
                🎉 You can safely skip <strong style={{ color: '#4ade80', fontSize: '1.05rem' }}>{safeBunks} classes back-to-back</strong>!
              </p>
            ) : (
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.4' }}>
                ⚠️ Attendance low! You must attend upcoming lectures continuously.
              </p>
            )}
          </div>
        </div>

        {/* Holidays Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.15rem', fontWeight: '700' }}>📅 Upcoming Official Holidays</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: '0 0 16px 0' }}>As per IIITNR GAD Notification</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Krishna Janmashtami', day: 'Friday', date: '2026-09-04' },
              { title: 'Haritalika Teej', day: 'Monday', date: '2026-09-14' },
              { title: 'Nuwakhai', day: 'Tuesday', date: '2026-09-15' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '12px 14px',
                borderRadius: '10px'
              }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: '#f3f4f6' }}>{item.title}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.day}</span>
                </div>
                <span style={{ color: '#818cf8', fontSize: '0.8rem', fontWeight: '600', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}