import React, { useState, useEffect } from 'react';
import { Group, Match, Goalscorer } from './types';
import { fetchLiveWorldCupData } from './data/worldCupData';
import { calculateGroupStandings } from './utils/standings';

export default function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [topScorers, setTopScorers] = useState<Goalscorer[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string>('A');
  const [time, setTime] = useState<string>('00:00');

  // جلب البيانات الحقيقية تلقائياً فور فتح التطبيق
  useEffect(() => {
    async function loadRealData() {
      const liveData = await fetchLiveWorldCupData();
      if (liveData.matches && liveData.matches.length > 0) {
        setMatches(liveData.matches);
        if (liveData.groups && liveData.groups.length > 0) {
          setGroups(liveData.groups);
          setActiveGroupId(liveData.groups[0].id);
        }
        if (liveData.topScorers) setTopScorers(liveData.topScorers);
      }
    }
    loadRealData();
  }, []);

  // تحديث الوقت تلقائياً
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  // تصفية وحساب بيانات المجموعة النشطة حياً
  const currentGroup = groups.find(g => g.id === activeGroupId);
  const groupMatches = matches.filter(m => m.group === activeGroupId);
  const standings = currentGroup ? calculateGroupStandings(matches, currentGroup) : [];

  return (
    <div className="min-h-screen bg-[#0a0c24] text-white p-4 flex flex-col items-center justify-center font-sans">
      {/* الـ Widget الزجاجي الفاخر الموحد */}
      <div className="w-full max-w-4xl backdrop-blur-3xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        
        {/* هيدر الأندرويد والوقت */}
        <div className="flex justify-between items-center mb-6 text-sm text-white/60 border-b border-white/10 pb-3">
          <div className="font-bold text-white">{time}</div>
          <div className="flex items-center gap-2">
            <span>5G</span>
            <span>📶</span>
            <span>🔋 100%</span>
          </div>
        </div>

        <h1 className="text-2xl font-black text-center mb-6 tracking-wider bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 bg-clip-text text-transparent">
          COUPE DU MONDE 2026
        </h1>

        {/* أزرار اختيار المجموعات المتوفرة لايف */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {groups.map(g => (
            <button
              key={g.id}
              onClick={() => setActiveGroupId(g.id)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                activeGroupId === g.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' 
                  : 'bg-white/5 hover:bg-white/10 text-white/70'
              }`}
            >
              Groupe {g.id}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* قسم المباريات والترتيب */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-cyan-400 tracking-wide uppercase">Matchs du Groupe</h3>
              {groupMatches.length === 0 ? (
                <p className="text-white/40 text-sm">Chargement des matchs en direct...</p>
              ) : (
                groupMatches.map(match => (
                  <div key={match.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs text-white/50">
                      <span>{match.date}</span>
                      {match.isLive && <span className="bg-pink-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE</span>}
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <div className="flex items-center gap-2 w-2/5">
                        <span className="text-xl">{match.teamAFlag}</span>
                        <span className="truncate">{match.teamAName}</span>
                      </div>
                      <div className="bg-black/30 px-3 py-1 rounded-xl text-cyan-300">
                        {match.scoreA !== null ? `${match.scoreA} - ${match.scoreB}` : 'vs'}
                      </div>
                      <div className="flex items-center gap-2 w-2/5 justify-end">
                        <span className="truncate">{match.teamBName}</span>
                        <span className="text-xl">{match.teamBFlag}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* جدول الترتيب المدمج */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-yellow-400 tracking-wide uppercase">Classement Direct</h3>
              <div className="bg-black/20 rounded-2xl overflow-hidden border border-white/5 text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-white/60 font-bold border-b border-white/10">
                      <th className="p-3">Pos</th>
                      <th className="p-3">Équipe</th>
                      <th className="p-3 text-center">J</th>
                      <th className="p-3 text-center">GD</th>
                      <th className="p-3 text-center font-bold text-yellow-400">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((row, index) => (
                      <tr key={row.teamId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-3 font-bold text-white/50">{index + 1}</td>
                        <td className="p-3 font-bold">{row.teamId}</td>
                        <td className="p-3 text-center text-white/70">{row.played}</td>
                        <td className="p-3 text-center text-white/70">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                        <td className="p-3 text-center font-black text-yellow-400">{row.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* قسم الهدافين الـ 6 الأوائل */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-pink-400 tracking-wide uppercase">Meilleurs Buteurs</h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
              {topScorers.slice(0, 6).map((scorer, i) => (
                <div key={scorer.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-none last:pb-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-white/40">#{i + 1}</span>
                    <span className="text-base">{scorer.teamFlag}</span>
                    <span className="font-semibold truncate text-sm">{scorer.name}</span>
                  </div>
                  <div className="flex gap-3 text-xs font-bold">
                    <span className="text-pink-400">{scorer.goals} ⚽</span>
                    <span className="text-white/40">{scorer.assists} A</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
