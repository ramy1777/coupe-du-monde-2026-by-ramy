import React, { useEffect, useState } from 'react';
import { fetchLiveWorldCupData } from './data/worldCupData';

export default function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchLiveWorldCupData().then(setData);
  }, []);

  if (!data) return <div style={{ color: 'white', padding: '20px' }}>Chargement...</div>;

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#0a0c24', color: 'white', padding: '20px', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#00ccff' }}>Coupe du Monde 2026</h2>
      
      {data.matches.map((m: any) => (
        <div key={m.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '15px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{m.teamAName} vs {m.teamBName}</span>
            <strong>{m.scoreA} : {m.scoreB}</strong>
          </div>
          {m.isLive && <div style={{ color: '#ff0055', fontSize: '12px', marginTop: '5px' }}>● LIVE</div>}
        </div>
      ))}

      <h3 style={{ color: '#ffcc00' }}>Top Buteurs</h3>
      {data.topScorers.map((p: any) => (
        <div key={p.id} style={{ fontSize: '14px', marginBottom: '5px' }}>
          {p.name} ({p.goals} buts)
        </div>
      ))}
    </div>
  );
}
