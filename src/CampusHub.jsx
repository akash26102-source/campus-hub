import React, { useState, useEffect } from 'react';

export default function CampusHub() {
  const [attended, setAttended] = useState(28);
  const [totalHeld, setTotalHeld] = useState(35);
  const [targetPct, setTargetPct] = useState(75);
  const [alertsEnabled, setAlertsEnabled] = useState(false);

  // Live Exam Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 31, hours: 23, mins: 11, secs: 45 });

  useEffect(() => {
    const examDate = new Date('2026-10-26T00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = examDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentPct = totalHeld > 0 ? ((attended / totalHeld) * 100).toFixed(1) : 0;
  const targetFrac = targetPct / 100;
  const maxBunks = Math.floor((attended - targetFrac * totalHeld) / targetFrac);
  const safeBunks = maxBunks > 0 ? maxBunks : 0;

  return (
    <div style={{ padding: '20px', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Top Banner & Calendar Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Banner with Live Countdown */}
        <div style={{ background: '#121324', padding: '24px', borderRadius: '16px', border: '1px solid #232542', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#818cf8', letterSpacing: '1px', fontWeight: '700' }}>⚡ IIITNR OFFICIAL ACADEMIC CALENDAR</span>
            <h2 style={{ fontSize: '1.6rem', margin: '8px 0 4px 0', fontWeight: '800' }}>Mid-Term Exams (MTE)</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>Scheduled: Oct 26 - Nov 03, 2026</p>
          </div>

          {/* Countdown Boxes */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINS', val: timeLeft.mins },
              { label: 'SECS', val: timeLeft.secs }
            ].map((unit, i) => (
              <div key={i} style={{ background: '#1e203d', padding: '10px 14px', borderRadius: '10px', textAlign: 'center', border: '1px solid #2d305c', minWidth: '50px' }}>
                <span style={{ display: 'block', fontSize: '1.3rem', fontWeight: '800', color: '#a78bfa' }}>{unit.val}</span>
                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '700' }}>{unit.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Class Alerts */}
        <div style={{ background: '#121324', padding: '24px', borderRadius: '16px', border: '1px solid #232542' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: '700' }}>🔔 Class Alerts</h3>
            <button 
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              style={{
                background: alertsEnabled ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${alertsEnabled ? '#22c55e' : '#ef4444'}`,
                color: alertsEnabled ? '#4ade80' : '#f87171',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {alertsEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '14px', lineHeight: '1.4' }}>
            Get instant browser push notifications 10 mins before room or lab lectures start.
          </p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Smart Attendance Manager Card */}
        <div style={{ background: '#121324', padding: '24px', borderRadius: '16px', border: '1px solid #232542' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#38bdf8', fontWeight: '700' }}>🛡️ Smart Attendance Manager</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Target Percentage Safe Guard</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {[
              { label: 'Attended', val: attended, set: setAttended },
              { label: 'Total Held', val: totalHeld, set: setTotalHeld },
              { label: 'Target %', val: targetPct, set: setTargetPct }
            ].map((f, i) => (
              <div key={i}>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                <input 
                  type="number" 
                  value={f.val} 
                  onChange={(e) => f.set(Number(e.target.value))}
                  style={{ width: '100%', background: '#090a16', border: '1px solid #232542', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>

          <div style={{ background: currentPct >= targetPct ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${currentPct >= targetPct ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, padding: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: currentPct >= targetPct ? '#4ade80' : '#f87171', fontWeight: '700' }}>Current: {currentPct}%</span>
              <span style={{ background: currentPct >= targetPct ? '#22c55e' : '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: '800', padding: '2px 8px', borderRadius: '4px' }}>
                {currentPct >= targetPct ? 'SAFE ZONE' : 'DANGER ZONE'}
              </span>
            </div>
            {currentPct >= targetPct ? (
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.9rem' }}>
                🎉 You can safely skip <strong style={{ color: '#4ade80' }}>{safeBunks} classes back-to-back</strong>!
              </p>
            ) : (
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.9rem' }}>
                ⚠️ Attendance low! You must attend upcoming lectures continuously.
              </p>
            )}
          </div>
        </div>

        {/* Scrollable Holidays List */}
        <div style={{ background: '#121324', padding: '24px', borderRadius: '16px', border: '1px solid #232542' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700' }}>📅 Upcoming Official Holidays</h3>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 16px 0' }}>As per IIITNR GAD Notification</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '170px', overflowY: 'auto', paddingRight: '6px' }}>
            {[
              { name: 'Krishna Janmashtami', day: 'Friday', date: '2026-09-04' },
              { name: 'Haritalika Teej', day: 'Monday', date: '2026-09-14' },
              { name: 'Nuwakhai', day: 'Tuesday', date: '2026-09-15' },
              { name: 'Gandhi Jayanti', day: 'Friday', date: '2026-10-02' },
              { name: 'Dussehra', day: 'Tuesday', date: '2026-10-20' },
              { name: 'Diwali', day: 'Sunday', date: '2026-11-08' }
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#090a16', border: '1px solid #1e203d', padding: '10px 14px', borderRadius: '8px' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.88rem', color: '#e2e8f0' }}>{h.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{h.day}</span>
                </div>
                <span style={{ color: '#818cf8', fontSize: '0.8rem', fontWeight: '600', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>{h.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}