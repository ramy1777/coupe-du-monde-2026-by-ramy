import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Sparkles, 
  Clock, 
  Pin, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Play, 
  Check,
  Calendar,
  Zap,
  Target
} from 'lucide-react';
import { Match, Group, Team, Goalscorer, ScorerEvent } from './types';
import { fetchLiveWorldCupData } from './data/worldCupData';
import { calculateGroupStandings } from './utils/standings';

// Presets of players for realistic goal simulation
const TEAM_PLAYERS: Record<string, string[]> = {
  fra: ['Kylian Mbappé', 'Antoine Griezmann', 'Ousmane Dembélé', 'Olivier Giroud', 'Marcus Thuram'],
  ned: ['Memphis Depay', 'Cody Gakpo', 'Xavi Simons', 'Frenkie de Jong', 'Virgil van Dijk'],
  sen: ['Sadio Mané', 'Ismaïla Sarr', 'Nicolas Jackson', 'Idrissa Gueye', 'Boulaye Dia'],
  aus: ['Mitchell Duke', 'Craig Goodwin', 'Martin Boyle', 'Jackson Irvine', 'Harry Souttar'],
  usa: ['Christian Pulisic', 'Timothy Weah', 'Folarin Balogun', 'Weston McKennie', 'Yunus Musah'],
  mex: ['Santiago Giménez', 'Hirving Lozano', 'Henry Martín', 'Luis Chávez', 'Guillermo Ochoa'],
  can: ['Jonathan David', 'Alphonso Davies', 'Cyle Larin', 'Tajon Buchanan', 'Stephen Eustáquio'],
  ecu: ['Enner Valencia', 'Moises Caicedo', 'Pervis Estupiñán', 'Gonzalo Plata', 'Jeremy Sarmiento'],
  arg: ['Lionel Messi', 'Lautaro Martínez', 'Julián Álvarez', 'Angel Di María', 'Enzo Fernández'],
  ksa: ['Salem Al-Dawsari', 'Saleh Al-Shehri', 'Firas Al-Buraikan', 'Abdulelah Al-Malki'],
  swe: ['Alexander Isak', 'Viktor Gyökeres', 'Dejan Kulusevski', 'Emil Forsberg', 'Victor Lindelöf'],
  tun: ['Youssef Msakni', 'Aïssa Laïdouni', 'Wahbi Khazri', 'Anis Slimane', 'Montassar Talbi'],
  eng: ['Harry Kane', 'Bukayo Saka', 'Jude Bellingham', 'Phil Foden', 'Marcus Rashford'],
  ita: ['Federico Chiesa', 'Mateo Retegui', 'Nicolò Barella', 'Lorenzo Pellegrini', 'Federico Dimarco'],
  egy: ['Mohamed Salah', 'Omar Marmoush', 'Mostafa Mohamed', 'Mohamed Elneny', 'Trezeguet'],
  jpn: ['Kaoru Mitoma', 'Takefusa Kubo', 'Wataru Endo', 'Takumi Minamino', 'Junya Ito'],
  esp: ['Lamine Yamal', 'Nico Williams', 'Alvaro Morata', 'Dani Olmo', 'Pedri'],
  ger: ['Jamal Musiala', 'Florian Wirtz', 'Niclas Füllkrug', 'Kai Havertz', 'Leroy Sané'],
  col: ['Luis Díaz', 'James Rodríguez', 'Rafael Borré', 'Jhon Arias', 'Jefferson Lerma'],
  gha: ['Mohammed Kudus', 'Inaki Williams', 'Jordan Ayew', 'Thomas Partey', 'Mohammed Salisu'],
  bel: ['Romelu Lukaku', 'Kevin De Bruyne', 'Jérémy Doku', 'Leandro Trossard', 'Youri Tielemans'],
  cro: ['Luka Modrić', 'Ivan Perišić', 'Andrej Kramarić', 'Mateo Kovačić', 'Joško Gvardiol'],
  mar: ['Hakim Ziyech', 'Youssef En-Nesyri', 'Achraf Hakimi', 'Sofyan Amrabat', 'Sofiane Boufal'],
  kor: ['Son Heung-min', 'Hwang Hee-chan', 'Lee Kang-in', 'Cho Gue-sung', 'Kim Min-jae'],
  bra: ['Vinícius Júnior', 'Neymar Jr', 'Rodrygo', 'Richarlison', 'Gabriel Martinelli'],
  sui: ['Breel Embolo', 'Xherdan Shaqiri', 'Granit Xhaka', 'Remo Freuler', 'Manuel Akanji'],
  cmr: ['Eric Choupo-Moting', 'Vincent Aboubakar', 'Bryan Mbeumo', 'Karl Toko Ekambi'],
  ukr: ['Mykhailo Mudryk', 'Artem Dovbyk', 'Viktor Tsygankov', 'Oleksandr Zinchenko', 'Roman Yaremchuk'],
  por: ['Cristiano Ronaldo', 'Bruno Fernandes', 'Rafael Leão', 'João Félix', 'Bernardo Silva'],
  uru: ['Darwin Núñez', 'Luis Suárez', 'Federico Valverde', 'Facundo Pellistri', 'Rodrigo Bentancur'],
  alg: ['Riyad Mahrez', 'Baghdad Bounedjah', 'Islam Slimani', 'Sofiane Feghouli', 'Ismaël Bennacer'],
  den: ['Rasmus Højlund', 'Christian Eriksen', 'Jonas Wind', 'Pierre-Emile Højbjerg', 'Andreas Christensen']
};

const INITIAL_SCORERS: Goalscorer[] = [
  { id: 's1', rank: 1, name: 'Kylian Mbappé', teamFlag: '🇫🇷', teamCode: 'FRA', goals: 5, assists: 2 },
  { id: 's2', rank: 2, name: 'Vinícius Júnior', teamFlag: '🇧🇷', teamCode: 'BRA', goals: 4, assists: 3 },
  { id: 's3', rank: 3, name: 'Erling Haaland', teamFlag: '🇳🇴', teamCode: 'NOR', goals: 4, assists: 1 },
  { id: 's4', rank: 4, name: 'Harry Kane', teamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', teamCode: 'ENG', goals: 3, assists: 2 },
  { id: 's5', rank: 5, name: 'Lionel Messi', teamFlag: '🇦🇷', teamCode: 'ARG', goals: 3, assists: 1 },
  { id: 's6', rank: 6, name: 'Jamal Musiala', teamFlag: '🇩🇪', teamCode: 'GER', goals: 3, assists: 0 }
];

export default function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [topScorers, setTopScorers] = useState<Goalscorer[]>([]);

  useEffect(() => {
    async function loadRealData() {
      const liveData = await fetchLiveWorldCupData();
      if (liveData.matches && liveData.matches.length > 0) {
        setMatches(liveData.matches);
        // إذا كان الخادم يوفر المجموعات والهدافين أيضاً:
        if (liveData.groups) setGroups(liveData.groups);
        if (liveData.topScorers) setTopScorers(liveData.topScorers);
      }
    }
    loadRealData();
  }, []);
  const [activeGroupId, setActiveGroupId] = useState<string>('D');
  const [goalscorers, setGoalscorers] = useState<Goalscorer[]>(INITIAL_SCORERS);
  const [time, setTime] = useState<string>('18:36');

  // Sync virtual clock
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

  // Filter current group matches
  const currentGroup = GROUPS.find(g => g.id === activeGroupId) || GROUPS[0];
  const groupMatches = matches.filter(m => m.group === activeGroupId);
  const standings = calculateGroupStandings(matches, currentGroup);

  // Score editing handler
  const handleScoreChange = (matchId: string, team: 'A' | 'B', value: number | null) => {
    setMatches(prev => prev.map(m => {
      if (m.id === matchId) {
        const scoreA = team === 'A' ? value : m.scoreA;
        const scoreB = team === 'B' ? value : m.scoreB;
        // If it's a manual change and both are filled, consider it finished unless manually set live
        const isFinished = !m.isLive && scoreA !== null && scoreB !== null;
        return { ...m, scoreA, scoreB, isFinished };
      }
      return m;
    }));
  };

  // Toggle Live State
  const toggleLive = (matchId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id === matchId) {
        const nextLive = !m.isLive;
        return {
          ...m,
          isLive: nextLive,
          isFinished: nextLive ? false : (m.scoreA !== null && m.scoreB !== null),
          // Initialize scores to 0-0 if starting live from null
          scoreA: nextLive && m.scoreA === null ? 0 : m.scoreA,
          scoreB: nextLive && m.scoreB === null ? 0 : m.scoreB,
          scorers: nextLive ? (m.scorers || []) : m.scorers
        };
      }
      return m;
    }));
  };

  // Terminer (Finish) live match
  const finishMatch = (matchId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id === matchId) {
        return {
          ...m,
          isLive: false,
          isFinished: true
        };
      }
      return m;
    }));
  };

  // Simulate Goal for Team A or Team B
  const simulateGoal = (matchId: string, team: 'A' | 'B') => {
    setMatches(prev => prev.map(m => {
      if (m.id === matchId) {
        const scoreA = (m.scoreA || 0) + (team === 'A' ? 1 : 0);
        const scoreB = (m.scoreB || 0) + (team === 'B' ? 1 : 0);
        
        const teamId = team === 'A' ? m.teamAId : m.teamBId;
        const opponentId = team === 'A' ? m.teamBId : m.teamAId;
        
        const players = TEAM_PLAYERS[teamId] || ['Joueur Mystère'];
        const otherPlayers = TEAM_PLAYERS[teamId]?.filter(p => p !== players[0]) || ['Coéquipier'];

        // Pick random scorer & assister
        const randomScorer = players[Math.floor(Math.random() * players.length)];
        const needsAssist = Math.random() > 0.3;
        const randomAssister = needsAssist ? otherPlayers[Math.floor(Math.random() * otherPlayers.length)] : undefined;
        const randomMinute = Math.min(90, Math.max(1, (m.scorers?.length || 0) * 15 + Math.floor(Math.random() * 12) + 5));

        const newEvent: ScorerEvent = {
          player: randomScorer,
          assist: randomAssister,
          minute: randomMinute
        };

        // Dynamically increment stats in top goalscorers if they are on the list
        updateGoalscorerStats(randomScorer, teamId, needsAssist ? randomAssister : undefined, teamId);

        return {
          ...m,
          scoreA,
          scoreB,
          scorers: [...(m.scorers || []), newEvent]
        };
      }
      return m;
    }));
  };

  // Real-time update for Goalscorers stats
  const updateGoalscorerStats = (scorerName: string, scorerTeamId: string, assisterName?: string, assisterTeamId?: string) => {
    setGoalscorers(prev => {
      let updated = prev.map(gs => {
        let goals = gs.goals;
        let assists = gs.assists;
        if (gs.name.toLowerCase() === scorerName.toLowerCase()) {
          goals += 1;
        }
        if (assisterName && gs.name.toLowerCase() === assisterName.toLowerCase()) {
          assists += 1;
        }
        return { ...gs, goals, assists };
      });

      // Check if scorer isn't in top 6 but has high goals to be added
      const scorerInList = updated.some(gs => gs.name.toLowerCase() === scorerName.toLowerCase());
      if (!scorerInList) {
        const teamObj = TEAMS[scorerTeamId];
        updated.push({
          id: 'temp-' + Date.now(),
          rank: 99,
          name: scorerName,
          teamFlag: teamObj?.flag || '🏳️',
          teamCode: teamObj?.code || scorerTeamId.toUpperCase(),
          goals: 1,
          assists: 0
        });
      }

      if (assisterName) {
        const assisterInList = updated.some(gs => gs.name.toLowerCase() === assisterName.toLowerCase());
        if (!assisterInList) {
          const teamObj = TEAMS[assisterTeamId || ''];
          updated.push({
            id: 'temp-ast-' + Date.now(),
            rank: 99,
            name: assisterName,
            teamFlag: teamObj?.flag || '🏳️',
            teamCode: teamObj?.code || (assisterTeamId || 'team').toUpperCase(),
            goals: 0,
            assists: 1
          });
        }
      }

      // Sort and retake top 6
      const sorted = [...updated].sort((a, b) => {
        if (b.goals !== a.goals) return b.goals - a.goals;
        return b.assists - a.assists;
      });

      return sorted.slice(0, 6).map((item, index) => ({
        ...item,
        rank: index + 1
      }));
    });
  };

  // Reset scores and simulated stats
  const handleReset = () => {
    setMatches(INITIAL_MATCHES);
    setGoalscorers(INITIAL_SCORERS);
  };

  return (
    <div className="min-h-screen bg-radial-gradient text-slate-100 font-sans flex flex-col items-center justify-center p-3 md:p-6 lg:p-10 relative overflow-hidden select-none">
      
      {/* Background Ambient Glow Nodes - Vibrant Palette Style */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[65%] h-[65%] rounded-full bg-gradient-to-br from-[#ff0055] to-transparent blur-[140px]"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-[65%] h-[65%] rounded-full bg-gradient-to-tl from-[#00ccff] to-transparent blur-[140px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[45%] h-[45%] rounded-full bg-gradient-to-bl from-[#ffcc00] to-transparent blur-[120px]"></div>
      </div>

      <div className="w-full max-w-5xl z-10 space-y-6 flex flex-col items-center">
        
        {/* Simple & Minimalist Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase">
            <Trophy className="h-3.5 w-3.5 text-[#ffcc00]" />
            <span>FIFA WORLD CUP 2026</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight leading-none text-white">
            World Cup <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#00ccff] to-[#ffcc00]">Glassify OS</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto font-medium">
            Interface Widget ultra-simplifiée & réactive. Choisissez votre groupe, simulez les scores en direct et observez l'évolution instantanée des classements et du top buteurs !
          </p>
        </div>

        {/* MAIN ELEMENT: Transparent Glassmorphism Widget */}
        <div className="w-full bg-white/10 backdrop-blur-3xl rounded-[32px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden">
          
          {/* Widget Header Area */}
          <div className="p-5 md:p-6 bg-white/5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Widget branding */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff0055] to-[#ffcc00] flex items-center justify-center shadow-lg border border-white/20">
                  <Trophy className="h-5 w-5 text-slate-950" />
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">Live Widget Active</div>
                  <div className="text-lg font-black italic uppercase leading-none tracking-tight text-white">Coupe du Monde 2026</div>
                </div>
              </div>
            </div>

            {/* Dynamic Clock & Location Widget details */}
            <div className="flex items-center space-x-6 justify-between md:justify-end">
              <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400 bg-black/30 px-3 py-1.5 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#00ccff] animate-pulse"></span>
                <span>Los Angeles, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-[#ffcc00]" />
                <span className="text-2xl font-mono font-black text-white text-glow">{time}</span>
              </div>
              
              <button 
                onClick={handleReset}
                title="Réinitialiser toutes les données de simulation"
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl transition-all flex items-center space-x-1.5 text-xs font-bold"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden xs:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Group Tab Selector */}
          <div className="px-5 py-3 bg-white/2 border-b border-white/5 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest pr-2 hidden md:inline">Groupes :</span>
            {GROUPS.map((group) => {
              const isActive = activeGroupId === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveGroupId(group.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider transition-all border shrink-0 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#ff0055]/20 to-[#00ccff]/20 text-white border-[#ff0055]/50 shadow-[0_0_15px_rgba(255,0,85,0.15)]'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:border-white/10'
                  }`}
                >
                  GROUPE {group.id}
                </button>
              );
            })}
          </div>

          {/* Match Section Container */}
          <div className="p-5 md:p-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black tracking-[0.2em] uppercase text-slate-400 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff0055]"></span>
                <span>Matchs du Groupe {activeGroupId}</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-400">Total : {groupMatches.length} matchs</span>
            </div>

            {/* Grid of group matches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupMatches.map((match) => {
                const teamA = TEAMS[match.teamAId];
                const teamB = TEAMS[match.teamBId];
                
                return (
                  <div 
                    key={match.id}
                    className={`glass-card rounded-2xl p-4 flex flex-col space-y-3 relative overflow-hidden transition-all duration-300 border ${
                      match.isLive 
                        ? 'border-[#ff0055]/40 bg-[#ff0055]/5 shadow-[0_0_20px_rgba(255,0,85,0.1)]' 
                        : 'border-white/10'
                    }`}
                  >
                    {/* Match header information */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-bold tracking-wider text-[#00ccff]">{match.stadium.split(',')[0]}</span>
                      {match.isLive ? (
                        <span className="flex items-center space-x-1 font-mono font-black bg-[#ff0055] text-white px-2 py-0.5 rounded-full animate-pulse text-[9px]">
                          <span>LIVE 74'</span>
                        </span>
                      ) : match.isFinished ? (
                        <span className="font-bold text-slate-500 uppercase">Terminé</span>
                      ) : (
                        <span className="font-mono">{match.date} • {match.time}</span>
                      )}
                    </div>

                    {/* Team flags and Score row */}
                    <div className="flex items-center justify-between py-1">
                      
                      {/* Team A */}
                      <div className="flex items-center space-x-2.5 w-[38%]">
                        <span className="text-2xl" title={teamA?.name}>{teamA?.flag}</span>
                        <span className="font-black text-sm md:text-base text-white truncate">{teamA?.code}</span>
                      </div>

                      {/* Interactive Scores or standard VS */}
                      <div className="flex items-center space-x-1.5 justify-center w-[24%]">
                        {match.isLive ? (
                          <div className="flex items-center space-x-1">
                            <span className="text-xl md:text-2xl font-mono font-black text-white text-glow-pink">
                              {match.scoreA ?? 0}
                            </span>
                            <span className="text-slate-500 font-bold">:</span>
                            <span className="text-xl md:text-2xl font-mono font-black text-white text-glow-pink">
                              {match.scoreB ?? 0}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              min="0"
                              max="20"
                              placeholder="-"
                              value={match.scoreA ?? ''}
                              onChange={(e) => {
                                const val = e.target.value === '' ? null : parseInt(e.target.value);
                                handleScoreChange(match.id, 'A', val);
                              }}
                              className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 text-center font-mono font-black text-sm text-white focus:outline-none focus:border-[#00ccff]"
                            />
                            <span className="text-slate-500 font-bold">-</span>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              placeholder="-"
                              value={match.scoreB ?? ''}
                              onChange={(e) => {
                                const val = e.target.value === '' ? null : parseInt(e.target.value);
                                handleScoreChange(match.id, 'B', val);
                              }}
                              className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 text-center font-mono font-black text-sm text-white focus:outline-none focus:border-[#00ccff]"
                            />
                          </div>
                        )}
                      </div>

                      {/* Team B */}
                      <div className="flex items-center space-x-2.5 justify-end w-[38%] text-right">
                        <span className="font-black text-sm md:text-base text-white truncate">{teamB?.code}</span>
                        <span className="text-2xl" title={teamB?.name}>{teamB?.flag}</span>
                      </div>

                    </div>

                    {/* LIVE BUTEUR & PASSEUR INFO (As explicitly requested by user) */}
                    {match.isLive && match.scorers && match.scorers.length > 0 && (
                      <div className="pt-2.5 border-t border-white/5 space-y-1">
                        <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center space-x-1">
                          <Target className="h-2.5 w-2.5 text-[#ff0055]" />
                          <span>Buteurs & Passeurs :</span>
                        </div>
                        <div className="space-y-1 max-h-[75px] overflow-y-auto pr-1">
                          {match.scorers.map((evt, idx) => (
                            <div key={idx} className="flex items-center justify-between text-[11px] text-slate-300 bg-white/5 px-2 py-0.5 rounded-md">
                              <span className="font-bold flex items-center space-x-1">
                                <span className="text-[#ff0055] mr-1">⚽</span>
                                <span>{evt.player}</span>
                              </span>
                              <span className="text-[10px] text-slate-400 italic">
                                {evt.assist ? `(Passe: ${evt.assist})` : '(Solo)'}
                                <span className="ml-1.5 font-mono text-white/50">{evt.minute}'</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* LIVE SIMULATION QUICK CONTROLS */}
                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/5">
                      
                      {/* Live Toggle Button */}
                      <button
                        onClick={() => toggleLive(match.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all border ${
                          match.isLive
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${match.isLive ? 'bg-amber-400 animate-pulse' : 'bg-slate-400'}`}></span>
                        <span>{match.isLive ? 'En cours' : 'Lancer Live'}</span>
                      </button>

                      {/* Goal sim buttons if match is currently live */}
                      {match.isLive ? (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => simulateGoal(match.id, 'A')}
                            className="px-2 py-1 bg-white/5 hover:bg-[#ff0055]/20 hover:border-[#ff0055]/30 text-[10px] font-bold text-white rounded-lg border border-white/10 transition-all"
                            title={`Simuler but pour ${teamA?.name}`}
                          >
                            ⚽ +1 {teamA?.code}
                          </button>
                          <button
                            onClick={() => simulateGoal(match.id, 'B')}
                            className="px-2 py-1 bg-white/5 hover:bg-[#ff0055]/20 hover:border-[#ff0055]/30 text-[10px] font-bold text-white rounded-lg border border-white/10 transition-all"
                            title={`Simuler but pour ${teamB?.name}`}
                          >
                            ⚽ +1 {teamB?.code}
                          </button>
                          <button
                            onClick={() => finishMatch(match.id)}
                            className="p-1 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/30 rounded-lg transition-all"
                            title="Siffler la fin du match"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-[9px] text-slate-500 font-mono italic">
                          Double-cliquez pour éditer les scores manuellement
                        </div>
                      )}

                    </div>

                  </div>
                );
              })}
            </div>

            {/* LOWER PORTION: 2-column Layout (Standings Table on Left, Top Goalscorers on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-white/10">
              
              {/* Left column: Standings Table (8 columns wide on large screen) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black tracking-widest text-[#00ccff] uppercase flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ccff]"></span>
                    <span>Classement Groupe {activeGroupId}</span>
                  </h3>
                  <span className="text-[10px] text-slate-400 italic">Mise à jour en temps réel</span>
                </div>

                <div className="bg-black/30 border border-white/5 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/5">
                        <th className="px-3 py-2 text-center w-8">#</th>
                        <th className="px-3 py-2">Équipe</th>
                        <th className="px-3 py-2 text-center w-10">MJ</th>
                        <th className="px-3 py-2 text-center w-8">G</th>
                        <th className="px-3 py-2 text-center w-8">N</th>
                        <th className="px-3 py-2 text-center w-8">P</th>
                        <th className="px-3 py-2 text-center w-12">Diff</th>
                        <th className="px-3 py-2 text-center w-12 text-[#ffcc00] font-black">Pts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/2">
                      {standings.map((standing, index) => {
                        const team = TEAMS[standing.teamId];
                        return (
                          <tr 
                            key={standing.teamId}
                            className={`hover:bg-white/2 transition-colors text-xs ${
                              index < 2 ? 'bg-gradient-to-r from-[#00ccff]/3 to-transparent' : ''
                            }`}
                          >
                            <td className="px-3 py-2.5 text-center font-mono font-bold text-slate-400">
                              <span className={index < 2 ? 'text-[#00ccff]' : ''}>{index + 1}</span>
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="flex items-center space-x-2 font-semibold">
                                <span className="text-lg">{team?.flag}</span>
                                <span className="text-slate-200 hidden sm:inline truncate max-w-[100px]">{team?.name}</span>
                                <span className="text-white sm:hidden font-mono font-bold">{team?.code}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-center font-mono text-slate-300">{standing.played}</td>
                            <td className="px-3 py-2.5 text-center font-mono text-slate-400">{standing.won}</td>
                            <td className="px-3 py-2.5 text-center font-mono text-slate-400">{standing.drawn}</td>
                            <td className="px-3 py-2.5 text-center font-mono text-slate-400">{standing.lost}</td>
                            <td className={`px-3 py-2.5 text-center font-mono font-bold ${
                              standing.gd > 0 ? 'text-emerald-400' : standing.gd < 0 ? 'text-rose-400' : 'text-slate-400'
                            }`}>
                              {standing.gd > 0 ? `+${standing.gd}` : standing.gd}
                            </td>
                            <td className="px-3 py-2.5 text-center font-mono font-black text-[#ffcc00] text-glow-gold text-sm bg-[#ffcc00]/5">
                              {standing.pts}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="text-[10px] text-slate-500 italic px-1 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ccff] inline-block"></span>
                  <span>Les 2 premières équipes sont qualifiées pour les 16èmes de finale.</span>
                </div>
              </div>

              {/* Right column: Top 6 Goalscorers (4 columns wide on large screen) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black tracking-widest text-[#ff0055] uppercase flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff0055]"></span>
                    <span>Top 6 Meilleurs Buteurs</span>
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono uppercase text-glow-pink">Live Stats</span>
                </div>

                <div className="bg-black/30 border border-white/5 rounded-2xl overflow-hidden">
                  <div className="divide-y divide-white/2">
                    {goalscorers.map((scorer, idx) => (
                      <div 
                        key={scorer.id} 
                        className="p-2.5 flex items-center justify-between hover:bg-white/2 transition-all"
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <span className="text-xs font-mono font-black text-slate-400 w-4 text-center">
                            {idx + 1}
                          </span>
                          <span className="text-lg" title={scorer.teamCode}>{scorer.teamFlag}</span>
                          <div className="truncate">
                            <div className="text-xs font-bold text-slate-200 truncate">{scorer.name}</div>
                            <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">{scorer.teamCode}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <span className="text-xs font-black text-[#ff0055] font-mono block text-glow-pink">
                              {scorer.goals} <span className="text-[9px] font-medium text-slate-400">buts</span>
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono block">
                              {scorer.assists} passes
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] bg-white/5 border border-white/10 rounded-xl p-2.5 text-slate-400 flex items-start space-x-2">
                  <Sparkles className="h-4 w-4 text-[#ffcc00] shrink-0 mt-0.5" />
                  <p className="text-[9px] leading-snug">
                    <strong>Astuce :</strong> Lancez un match en direct ("Lancer Live") et cliquez sur <strong>⚽ Goal</strong> pour faire marquer un buteur de manière aléatoire !
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
