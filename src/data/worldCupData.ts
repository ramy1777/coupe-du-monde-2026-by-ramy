import { Group, Match, Goalscorer } from '../types';

export async function fetchLiveWorldCupData() {
  // Liste des 5 meilleurs buteurs
  const topScorers: Goalscorer[] = [
    { id: '1', name: 'Messi L.', teamFlag: '🇦🇷', goals: 5, assists: 0 },
    { id: '2', name: 'Vinicius Jr', teamFlag: '🇧🇷', goals: 4, assists: 1 },
    { id: '3', name: 'Haaland E.', teamFlag: '🇳🇴', goals: 4, assists: 0 },
    { id: '4', name: 'Mbappé K.', teamFlag: '🇫🇷', goals: 4, assists: 0 },
    { id: '5', name: 'Undav D.', teamFlag: '🇩🇪', goals: 3, assists: 2 }
  ];

  return {
    groups: [
      { id: 'A', teams: ['Mexique (7 pts)', 'Corée du Sud (6 pts)', 'Rép. Tchèque (4 pts)', 'Afrique du Sud (0 pts)'] },
      { id: 'B', teams: ['Suisse (6 pts)', 'Canada (4 pts)', 'Bosnie (3 pts)', 'Qatar (1 pt)'] }
    ],
    matches: [
      { id: 'm1', group: 'Direct', date: 'En cours', teamAName: 'Tunisie', teamAFlag: '🇹🇳', teamBName: 'Pays-Bas', teamBFlag: '🇳🇱', scoreA: 1, scoreB: 1, isLive: true },
      { id: 'm2', group: 'Prochain', date: '25.06 - 21:00', teamAName: 'Allemagne', teamAFlag: '🇩🇪', teamBName: 'Équateur', teamBFlag: '🇪🇨', scoreA: 0, scoreB: 0, isLive: false }
    ],
    topScorers
  };
}
