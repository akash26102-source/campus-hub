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
    <div className="campus-hub-container" style={{ padding: '20px', color: '#fff' }}>
      
      {/* Top Banner & Calendar Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: '#181825', padding: '20px', borderRadius: '12px', border: '1px solid #313244' }}>
          <span style={{ fontSize: '0.8rem', color: '#b4befe', letterSpacing: '1px' }}>✨ IIITNR OFFICIAL ACADEMIC CALENDAR</span>
          <h2 style={{ fontSize: '1.5rem', margin: '10px 0 5px 0' }}>Mid-Term Exams (MTE)</h2>
          <p style={{ color: '#a6adc8', fontSize: '0.9rem' }}>Scheduled: Oct 26 - Nov 03, 2026</p>
        </div>

        <div style={{ background: '#181825', padding: '20px', borderRadius: '12px', border: '1px solid #313244' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>🔔 Class Alerts</h3>
            <span style={{ background: '#313244', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', color: '#a6adc8' }}>Disabled</span>
          </div>
          <p style={{ color: '#a6adc8', fontSize: '0.85rem', marginTop: '10px' }}>
            Get browser notifications 10 mins before room or lab lectures start.
          </p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Attendance Manager Card */}
        <div style={{ background: '#181825', padding: '20px', borderRadius: '12px', border: '1px solid #313244' }}>
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#cba6f7' }}>🛡️ Smart Attendance Manager</h3>
            <span style={{ fontSize: '0.8rem', color: '#a6adc8' }}>Target Percentage Safe Guard</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#a6adc8' }}>Attended</label>
              <input 
                type="number" 
                value={attended} 
                onChange={(e) => setAttended(Number(e.target.value))}
                style={{ width: '100%', background: '#11111b', border: '1px solid #45475a', color: '#fff', padding: '8px', borderRadius: '6px', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#a6adc8' }}>Total Held</label>
              <input 
                type="number" 
                value={totalHeld} 
                onChange={(e) => setTotalHeld(Number(e.target.value))}
                style={{ width: '100%', background: '#11111b', border: '1px solid #45475a', color: '#fff', padding: '8px', borderRadius: '6px', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#a6adc8' }}>Target %</label>
              <input 
                type="number" 
                value={targetPct} 
                onChange={(e) => setTargetPct(Number(e.target.value))}
                style={{ width: '100%', background: '#11111b', border: '1px solid #45475a', color: '#fff', padding: '8px', borderRadius: '6px', marginTop: '4px' }}
              />
            </div>
          </div>

          <div style={{ background: '#11111b', padding: '12px', borderRadius: '8px', border: '1px solid #313244' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: '#89b4fa' }}>Current: {currentPct}%</span>
              <span style={{ fontSize: '0.8rem', color: '#a6e3a1', fontWeight: 'bold' }}>SAFE ZONE</span>
            </div>
            {currentPct >= targetPct ? (
              <p style={{ margin: 0, color: '#a6e3a1', fontSize: '0.9rem' }}>
                You can safely skip <strong>{safeBunks} classes back-to-back</strong>!
              </p>
            ) : (
              <p style={{ margin: 0, color: '#f38ba8', fontSize: '0.9rem' }}>
                Attendance low! Attend upcoming classes regularly.
              </p>
            )}
          </div>
        </div>

        {/* Holidays List */}
        <div style={{ background: '#181825', padding: '20px', borderRadius: '12px', border: '1px solid #313244' }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>📅 Upcoming Official Holidays</h3>
          <p style={{ color: '#a6adc8', fontSize: '0.8rem', marginTop: 0 }}>As per IIITNR GAD Notification</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#11111b', padding: '10px', borderRadius: '6px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>Krishna Janmashtami</strong>
                <span style={{ fontSize: '0.75rem', color: '#a6adc8' }}>Friday</span>
              </div>
              <span style={{ color: '#89b4fa', fontSize: '0.85rem' }}>2026-09-04</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#11111b', padding: '10px', borderRadius: '6px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem' }}>Haritalika Teej</strong>
                <span style={{ fontSize: '0.75rem', color: '#a6adc8' }}>Monday</span>
              </div>
              <span style={{ color: '#89b4fa', fontSize: '0.85rem' }}>2026-09-14</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}