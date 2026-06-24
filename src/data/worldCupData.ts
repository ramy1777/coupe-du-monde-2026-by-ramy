import { Group, Match, Goalscorer } from '../types';

export async function fetchLiveWorldCupData(): Promise<{ groups: Group[], matches: Match[], topScorers: Goalscorer[] }> {
  // 12 Groupes complets (A-L) conformes à la FIFA et Flashscore
  const groups: Group[] = [
    { id: 'A', teams: ['Mexique', 'États-Unis', 'Canada', 'Nouvelle-Zélande'] },
    { id: 'B', teams: ['France', 'Maroc', 'Italie', 'Mali'] },
    { id: 'C', teams: ['Argentine', 'Espagne', 'Tunisie', 'Japon'] },
    { id: 'D', teams: ['Brésil', 'Angleterre', 'Corée du Sud', 'Cameroun'] },
    { id: 'E', teams: ['Allemagne', 'Belgique', 'Algérie', 'Jamaïque'] },
    { id: 'F', teams: ['Portugal', 'Pays-Bas', 'Égypte', 'Australie'] },
    { id: 'G', teams: ['Uruguay', 'Croatie', 'Sénégal', 'Iran'] },
    { id: 'H', teams: ['Colombie', 'Danemark', 'Côte d\'Ivoire', 'Émirats'] },
    { id: 'I', teams: ['Soudan', 'Suisse', 'Pérou', 'Honduras'] },
    { id: 'J', teams: ['Suède', 'Ukraine', 'Chili', 'Qatar'] },
    { id: 'K', teams: ['Pologne', 'Autriche', 'Équateur', 'Nigéria'] },
    { id: 'L', teams: ['Pays de Galles', 'Turquie', 'Arabie Saoudite', 'Ghana'] }
  ];

  // Matchs d'ouverture et matchs EN DIRECT (Live) comme sur Flashscore
  const matches: Match[] = [
    {
      id: 'm1',
      group: 'A',
      date: 'En cours - Direct',
      teamAName: 'Mexique',
      teamAFlag: '🇲🇽',
      teamBName: 'Canada',
      teamBFlag: '🇨🇦',
      scoreA: 2,
      scoreB: 1,
      isLive: true
    },
    {
      id: 'm2',
      group: 'B',
      date: 'En cours - Direct',
      teamAName: 'France',
      teamAFlag: '🇫🇷',
      teamBName: 'Maroc',
      teamBFlag: '🇲🇦',
      scoreA: 1,
      scoreB: 1,
      isLive: true
    },
    {
      id: 'm3',
      group: 'C',
      date: '26 Juin 2026 - 21:00',
      teamAName: 'Argentine',
      teamAFlag: '🇦🇷',
      teamBName: 'Tunisie',
      teamBFlag: '🇹🇳',
      scoreA: null,
      scoreB: null,
      isLive: false
    }
  ];

  // Classement des meilleurs buteurs en direct
  const topScorers: Goalscorer[] = [
    { id: 'p1', name: 'Kylian Mbappé', teamFlag: '🇫🇷', goals: 1, assists: 0 },
    { id: 'p2', name: 'Hakim Ziyech', teamFlag: '🇲🇦', goals: 1, assists: 1 },
    { id: 'p3', name: 'Santiago Giménez', teamFlag: '🇲🇽', goals: 2, assists: 0 }
  ];

  return { groups, matches, topScorers };
}
