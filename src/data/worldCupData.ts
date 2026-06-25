import { Group, Match, Goalscorer } from '../types';

export async function fetchLiveWorldCupData() {
  const API_KEY = '741453c7f2a1c2aa2fc553c3afa103cb';
  const API_URL = 'https://v3.football.api-sports.io';

  try {
    // جلب المباريات المباشرة لكأس العالم 2026 (الدوري رقم 1 في API-Football)
    const response = await fetch(`${API_URL}/fixtures?league=1&season=2026&live=all`, {
      headers: { 'x-apisports-key': API_KEY }
    });
    const data = await response.json();
    
    // سيعود التطبيق ببيانات حقيقية من الـ API
    return {
      groups: [], // سيتم ملؤها لاحقاً من endpoint الترتيب
      matches: data.response, 
      topScorers: [] 
    };
  } catch (error) {
    console.error("خطأ في الاتصال بـ API:", error);
    return { groups: [], matches: [], topScorers: [] };
  }
}
