import { Group, Match, Goalscorer } from '../types';

export async function fetchLiveWorldCupData() {
  const API_KEY = '741453c7f2a1c2aa2fc553c3afa103cb';
  const API_URL = 'https://v3.football.api-sports.io';

  try {
    // جلب مباريات اليوم (سواء مباشرة أو قادمة) بدلاً من المباشرة فقط
    const response = await fetch(`${API_URL}/fixtures?league=1&season=2026&date=2026-06-25`, {
      headers: { 'x-apisports-key': API_KEY }
    });
    
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();

    const formattedMatches = data.response.map((f: any) => ({
      id: f.fixture.id.toString(),
      group: f.league.round || 'World Cup 2026',
      date: new Date(f.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      teamAName: f.teams.home.name,
      teamAFlag: f.teams.home.logo,
      teamBName: f.teams.away.name,
      teamBFlag: f.teams.away.logo,
      scoreA: f.goals.home ?? 0,
      scoreB: f.goals.away ?? 0,
      isLive: f.fixture.status.short === '1H' || f.fixture.status.short === '2H'
    }));

    return {
      groups: [],
      matches: formattedMatches,
      topScorers: [] 
    };

  } catch (error) {
    console.error("خطأ في الاتصال، لا توجد مباريات اليوم:", error);
    return { groups: [], matches: [], topScorers: [] };
  }
}
