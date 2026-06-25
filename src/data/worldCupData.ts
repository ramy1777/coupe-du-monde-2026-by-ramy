import { Group, Match, Goalscorer } from '../types';

export async function fetchLiveWorldCupData(): Promise<{ groups: Group[], matches: Match[], topScorers: Goalscorer[] }> {
  // Les 12 groupes officiels du tournoi 2026
  const groups: Group[] = [
    { id: 'A', teams: ['Mexico', 'South Korea', 'Czech Republic', 'South Africa'] },
    { id: 'B', teams: ['Switzerland', 'Canada', 'Bosnia & Herzegovina', 'Qatar'] },
    { id: 'C', teams: ['Brazil', 'Morocco', 'Scotland', 'Haiti'] },
    { id: 'D', teams: ['USA', 'Australia', 'Paraguay', 'Turkey'] },
    { id: 'E', teams: ['Germany', 'Ivory Coast', 'Ecuador', 'Curacao'] },
    { id: 'F', teams: ['Netherlands', 'Japan', 'Sweden', 'Tunisia'] },
    { id: 'G', teams: ['Egypt', 'Iran', 'Belgium', 'New Zealand'] },
    { id: 'H', teams: ['Spain', 'Uruguay', 'Cape Verde', 'Saudi Arabia'] },
    { id: 'I', teams: ['France', 'Norway', 'Senegal', 'Iraq'] },
    { id: 'J', teams: ['Argentina', 'Austria', 'Algeria', 'Jordan'] },
    { id: 'K', teams: ['Colombia', 'Portugal', 'D.R. Congo', 'Uzbekistan'] },
    { id: 'L', teams: ['England', 'Ghana', 'Croatia', 'Panama'] }
  ];

  // Les matchs du prochain tour (1/16 Finales) tels que vus sur Flashscore
  const matches: Match[] = [
    { id: 'r1', group: '1/16 Final', date: '29.06 - 21:30', teamAName: 'Germany', teamAFlag: '🇩🇪', teamBName: 'I1', teamBFlag: '🏆', scoreA: null, scoreB: null, isLive: false },
    { id: 'r2', group: '1/16 Final', date: '30.06 - 22:00', teamAName: 'C3', teamAFlag: '⚡', teamBName: 'East Rutherford', teamBFlag: '🏟️', scoreA: null, scoreB: null, isLive: false },
    { id: 'r3', group: '1/16 Final', date: '28.06 - 20:00', teamAName: 'Canada', teamAFlag: '🇨🇦', teamBName: 'Inglewood', teamBFlag: '🏟️', scoreA: null, scoreB: null, isLive: false },
    { id: 'r4', group: '1/16 Final', date: '02.07 - 01:00', teamAName: 'USA', teamAFlag: '🇺🇸', teamBName: 'Santa Clara', teamBFlag: '🏟️', scoreA: null, scoreB: null, isLive: false }
  ];

  // Classement des buteurs mis à jour
  const topScorers: Goalscorer[] = [
    { id: 'p1', name: 'Messi L.', teamFlag: '🇦🇷', goals: 5, assists: 0 },
    { id: 'p2', name: 'Vinicius Junior', teamFlag: '🇧🇷', goals: 4, assists: 1 },
    { id: 'p3', name: 'Haaland E.', teamFlag: '🇳🇴', goals: 4, assists: 0 },
    { id: 'p4', name: 'Mbappe K.', teamFlag: '🇫🇷', goals: 4, assists: 0 },
    { id: 'p5', name: 'Undav D.', teamFlag: '🇩🇪', goals: 3, assists: 2 },
    { id: 'p6', name: 'Manzambi J.', teamFlag: '🇨🇭', goals: 3, assists: 1 }
  ];

  return { groups, matches, topScorers };
}
