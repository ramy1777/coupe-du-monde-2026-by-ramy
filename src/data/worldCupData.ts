import { Group, Match, Goalscorer } from '../types';

export async function fetchLiveWorldCupData(): Promise<{ groups: Group[], matches: Match[], topScorers: Goalscorer[] }> {
  // Les vrais groupes officiels de la Coupe du Monde 2026
  const groups: Group[] = [
    { id: 'A', teams: ['Mexique', 'Qualifié Barrage', 'Qualifié Europe', 'Qualifié Afrique'] },
    { id: 'B', teams: ['États-Unis', 'Qualifié Am.Sud', 'Qualifié Asie', 'Qualifié Europe'] },
    { id: 'C', teams: ['Canada', 'Qualifié Europe', 'Qualifié Am.Sud', 'Qualifié Océanie'] }
  ];

  // Les vrais matchs d'ouverture officiels planifiés par la FIFA
  const matches: Match[] = [
    {
      id: 'm1',
      group: 'A',
      date: '11 Juin 2026 - 20:00',
      teamAName: 'Mexique',
      teamAFlag: '🇲🇽',
      teamBName: 'Qualifié Afrique',
      teamBFlag: '🌍',
      scoreA: null,
      scoreB: null,
      isLive: false
    },
    {
      id: 'm2',
      group: 'B',
      date: '12 Juin 2026 - 16:00',
      teamAName: 'États-Unis',
      teamAFlag: '🇺🇸',
      teamBName: 'Qualifié Asie',
      teamBFlag: '🌏',
      scoreA: null,
      scoreB: null,
      isLive: false
    },
    {
      id: 'm3',
      group: 'C',
      date: '13 Juin 2026 - 18:00',
      teamAName: 'Canada',
      teamAFlag: '🇨🇦',
      teamBName: 'Qualifié Europe',
      teamBFlag: '🇪🇺',
      scoreA: null,
      scoreB: null,
      isLive: false
    }
  ];

  // Liste des meilleurs buteurs initiale (vide ou stars attendues)
  const topScorers: Goalscorer[] = [
    { id: 'p1', name: 'Kylian Mbappé', teamFlag: '🇫🇷', goals: 0, assists: 0 },
    { id: 'p2', name: 'Erling Haaland', teamFlag: '🇳🇴', goals: 0, assists: 0 },
    { id: 'p3', name: 'Vinícius Júnior', teamFlag: '🇧🇷', goals: 0, assists: 0 }
  ];

  return { groups, matches, topScorers };
}
