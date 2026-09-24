import React, { useState } from 'react';

export default function SmartAttendanceEngine() {
  const [attended, setAttended] = useState(18);
  const [total, setTotal] = useState(20);
  const [target, setTarget] = useState(75);

  const currentPercentage = total > 0 ? ((attended / total) * 100).toFixed(1) : 0;
  
  // Calculate back-to-back classes you can safely skip
  const targetFraction = target / 100;
  const maxBunks = Math.floor((attended - targetFraction * total) / targetFraction);
  const safeBunks = maxBunks > 0 ? maxBunks : 0;

  // Calculate classes needed if attendance is low
  const classesNeeded = Math.ceil((targetFraction * total - attended) / (1 - targetFraction));

  return (
    <div style={{ padding: '20px', borderRadius: '12px', background: '#1e1e2e', color: '#fff', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#89b4fa' }}>
        Smart Attendance Manager
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <label>
          Attended Classes:
          <input 
            type="number" 
            value={attended} 
            onChange={(e) => setAttended(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#fff' }}
          />
        </label>

        <label>
          Total Classes Held:
          <input 
            type="number" 
            value={total} 
            onChange={(e) => setTotal(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#fff' }}
          />
        </label>

        <label>
          Target Percentage (%):
          <input 
            type="number" 
            value={target} 
            onChange={(e) => setTarget(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#fff' }}
          />
        </label>
      </div>

      <div style={{ padding: '15px', borderRadius: '8px', background: '#313244', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
          Current Attendance: <strong>{currentPercentage}%</strong>
        </p>

        {currentPercentage >= target ? (
          <p style={{ color: '#a6e3a1', fontWeight: 'bold' }}>
            🎉 You can safely skip <strong>{safeBunks} classes back-to-back</strong> while maintaining required attendance!
          </p>
        ) : (
          <p style={{ color: '#f38ba8', fontWeight: 'bold' }}>
            ⚠️ Attendance low! You need to attend <strong>{classesNeeded > 0 ? classesNeeded : 0} consecutive classes</strong> to reach {target}%.
          </p>
        )}
      </div>
    </div>
  );
}