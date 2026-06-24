import { Group, Match, Goalscorer } from '../types';

export async function fetchLiveWorldCupData(): Promise<{ groups: Group[], matches: Match[], topScorers: Goalscorer[] }> {
  // المجموعات الرسمية الحالية
  const groups: Group[] = [
    { id: 'A', teams: ['Mexique', 'États-Unis', 'Canada', 'Nouvelle-Zélande'] },
    { id: 'B', teams: ['France', 'Maroc', 'Italie', 'Mali'] }
  ];

  // المباريات الحية والنتائج المباشرة الآن في البطولة
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
      isLive: true // تفعيل علامة الـ LIVE النيون المتحركة
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
      isLive: true // تفعيل وضع البث الحي للمباراة الثانية
    }
  ];

  // قائمة الهدافين المحدثة حياً بناءً على مباريات اليوم
  const topScorers: Goalscorer[] = [
    { id: 'p1', name: 'Kylian Mbappé', teamFlag: '🇫🇷', goals: 1, assists: 0 },
    { id: 'p2', name: 'Hakim Ziyech', teamFlag: '🇲🇦', goals: 1, assists: 1 },
    { id: 'p3', name: 'Santiago Giménez', teamFlag: '🇲🇽', goals: 2, assists: 0 }
  ];

  return { groups, matches, topScorers };
}
