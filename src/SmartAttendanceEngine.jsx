import React, { useState } from 'react';

export default function SmartAttendanceEngine() {
  const [attended, setAttended] = useState(18);
  const [total, setTotal] = useState(20);
  const [target, setTarget] = useState(75);

  const currentPercentage = total > 0 ? ((attended / total) * 100).toFixed(1) : 0;
  const targetFraction = target / 100;
  const maxBunks = Math.floor((attended - targetFraction * total) / targetFraction);
  const safeBunks = maxBunks > 0 ? maxBunks : 0;
  const classesNeeded = Math.ceil((targetFraction * total - attended) / (1 - targetFraction));

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)', padding: '20px' }}>
      <div style={{ background: '#121324', border: '1px solid #232542', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '20px', textAlign: 'center', color: '#38bdf8' }}>
          🛡️ Smart Attendance Manager
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Attended Classes:</label>
            <input 
              type="number" 
              value={attended} 
              onChange={(e) => setAttended(Number(e.target.value))}
              style={{ width: '100%', padding: '12px', background: '#090a16', border: '1px solid #232542', color: '#fff', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Total Classes Held:</label>
            <input 
              type="number" 
              value={total} 
              onChange={(e) => setTotal(Number(e.target.value))}
              style={{ width: '100%', padding: '12px', background: '#090a16', border: '1px solid #232542', color: '#fff', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Target Percentage (%):</label>
            <input 
              type="number" 
              value={target} 
              onChange={(e) => setTarget(Number(e.target.value))}
              style={{ width: '100%', padding: '12px', background: '#090a16', border: '1px solid #232542', color: '#fff', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{
          background: currentPercentage >= target ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          border: currentPercentage >= target ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
          padding: '20px',
          borderRadius: '14px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 10px 0', color: currentPercentage >= target ? '#4ade80' : '#f87171' }}>
            Current Attendance: {currentPercentage}%
          </p>

          {currentPercentage >= target ? (
            <p style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
              🎉 You can safely skip <strong style={{ color: '#4ade80' }}>{safeBunks} classes back-to-back</strong> while maintaining required attendance!
            </p>
          ) : (
            <p style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
              ⚠️ Attendance low! You need to attend <strong style={{ color: '#f87171' }}>{classesNeeded > 0 ? classesNeeded : 0} consecutive classes</strong> to reach {target}%.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}