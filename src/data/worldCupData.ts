import { Team, Group, Match } from '../types';

export const TEAMS: Record<string, Team> = {
  usa: { id: 'usa', name: 'États-Unis', code: 'USA', flag: '🇺🇸' },
  mex: { id: 'mex', name: 'Mexique', code: 'MEX', flag: '🇲🇽' },
  can: { id: 'can', name: 'Canada', code: 'CAN', flag: '🇨🇦' },
  ecu: { id: 'ecu', name: 'Équateur', code: 'ECU', flag: '🇪🇨' },
  
  fra: { id: 'fra', name: 'France', code: 'FRA', flag: '🇫🇷' },
  ned: { id: 'ned', name: 'Pays-Bas', code: 'NED', flag: '🇳🇱' },
  sen: { id: 'sen', name: 'Sénégal', code: 'SEN', flag: '🇸🇳' },
  aus: { id: 'aus', name: 'Australie', code: 'AUS', flag: '🇦🇺' },
  
  arg: { id: 'arg', name: 'Argentine', code: 'ARG', flag: '🇦🇷' },
  ksa: { id: 'ksa', name: 'Arabie Saoudite', code: 'KSA', flag: '🇸🇦' },
  swe: { id: 'swe', name: 'Suède', code: 'SWE', flag: '🇸🇪' },
  tun: { id: 'tun', name: 'Tunisie', code: 'TUN', flag: '🇹🇳' },
  
  eng: { id: 'eng', name: 'Angleterre', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  ita: { id: 'ita', name: 'Italie', code: 'ITA', flag: '🇮🇹' },
  egy: { id: 'egy', name: 'Égypte', code: 'EGY', flag: '🇪🇬' },
  jpn: { id: 'jpn', name: 'Japon', code: 'JPN', flag: '🇯🇵' },
  
  esp: { id: 'esp', name: 'Espagne', code: 'ESP', flag: '🇪🇸' },
  ger: { id: 'ger', name: 'Allemagne', code: 'GER', flag: '🇩🇪' },
  col: { id: 'col', name: 'Colombie', code: 'COL', flag: '🇨🇴' },
  gha: { id: 'gha', name: 'Ghana', code: 'GHA', flag: '🇬🇭' },
  
  bel: { id: 'bel', name: 'Belgique', code: 'BEL', flag: '🇧🇪' },
  cro: { id: 'cro', name: 'Croatie', code: 'CRO', flag: '🇭🇷' },
  mar: { id: 'mar', name: 'Maroc', code: 'MAR', flag: '🇲🇦' },
  kor: { id: 'kor', name: 'Corée du Sud', code: 'KOR', flag: '🇰🇷' },
  
  bra: { id: 'bra', name: 'Brésil', code: 'BRA', flag: '🇧🇷' },
  sui: { id: 'sui', name: 'Suisse', code: 'SUI', flag: '🇨🇭' },
  cmr: { id: 'cmr', name: 'Cameroun', code: 'CMR', flag: '🇨🇲' },
  ukr: { id: 'ukr', name: 'Ukraine', code: 'UKR', flag: '🇺🇦' },
  
  por: { id: 'por', name: 'Portugal', code: 'POR', flag: '🇵🇹' },
  uru: { id: 'uru', name: 'Uruguay', code: 'URU', flag: '🇺🇾' },
  alg: { id: 'alg', name: 'Algérie', code: 'ALG', flag: '🇩🇿' },
  den: { id: 'den', name: 'Danemark', code: 'DEN', flag: '🇩🇰' }
};

export const GROUPS: Group[] = [
  { id: 'A', name: 'Groupe A', teams: ['usa', 'mex', 'can', 'ecu'] },
  { id: 'B', name: 'Groupe B', teams: ['fra', 'ned', 'sen', 'aus'] },
  { id: 'C', name: 'Groupe C', teams: ['arg', 'ksa', 'swe', 'tun'] },
  { id: 'D', name: 'Groupe D', teams: ['eng', 'ita', 'egy', 'jpn'] },
  { id: 'E', name: 'Groupe E', teams: ['esp', 'ger', 'col', 'gha'] },
  { id: 'F', name: 'Groupe F', teams: ['bel', 'cro', 'mar', 'kor'] },
  { id: 'G', name: 'Groupe G', teams: ['bra', 'sui', 'cmr', 'ukr'] },
  { id: 'H', name: 'Groupe H', teams: ['por', 'uru', 'alg', 'den'] }
];

export const INITIAL_MATCHES: Match[] = [
  // --- Group A ---
  {
    id: 'm-a1',
    group: 'A',
    teamAId: 'usa',
    teamBId: 'ecu',
    scoreA: 2,
    scoreB: 1,
    date: '2026-06-11',
    time: '18:00',
    stadium: 'Estadio Azteca, Mexico City',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-a2',
    group: 'A',
    teamAId: 'mex',
    teamBId: 'can',
    scoreA: 3,
    scoreB: 1,
    date: '2026-06-12',
    time: '20:00',
    stadium: 'SoFi Stadium, Los Angeles',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-a3',
    group: 'A',
    teamAId: 'usa',
    teamBId: 'mex',
    scoreA: 1,
    scoreB: 1,
    date: '2026-06-17',
    time: '19:00',
    stadium: 'MetLife Stadium, New York',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-a4',
    group: 'A',
    teamAId: 'can',
    teamBId: 'ecu',
    scoreA: 2,
    scoreB: 2,
    date: '2026-06-18',
    time: '17:00',
    stadium: 'BC Place, Vancouver',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-a5',
    group: 'A',
    teamAId: 'can',
    teamBId: 'usa',
    scoreA: null,
    scoreB: null,
    date: '2026-06-25',
    time: '18:00',
    stadium: 'Mercedes-Benz Stadium, Atlanta',
    stage: 'group',
    isFinished: false
  },
  {
    id: 'm-a6',
    group: 'A',
    teamAId: 'ecu',
    teamBId: 'mex',
    scoreA: null,
    scoreB: null,
    date: '2026-06-25',
    time: '18:00',
    stadium: 'NRG Stadium, Houston',
    stage: 'group',
    isFinished: false
  },

  // --- Group B ---
  {
    id: 'm-b1',
    group: 'B',
    teamAId: 'fra',
    teamBId: 'aus',
    scoreA: 4,
    scoreB: 1,
    date: '2026-06-12',
    time: '15:00',
    stadium: 'Hard Rock Stadium, Miami',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-b2',
    group: 'B',
    teamAId: 'ned',
    teamBId: 'sen',
    scoreA: 1,
    scoreB: 2,
    date: '2026-06-13',
    time: '18:00',
    stadium: 'AT&T Stadium, Dallas',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-b3',
    group: 'B',
    teamAId: 'fra',
    teamBId: 'ned',
    scoreA: 2,
    scoreB: 0,
    date: '2026-06-18',
    time: '21:00',
    stadium: 'Gillette Stadium, Boston',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-b4',
    group: 'B',
    teamAId: 'sen',
    teamBId: 'aus',
    scoreA: 2,
    scoreB: 0,
    date: '2026-06-19',
    time: '15:00',
    stadium: 'Arrowhead Stadium, Kansas City',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-b5',
    group: 'B',
    teamAId: 'sen',
    teamBId: 'fra',
    scoreA: null,
    scoreB: null,
    date: '2026-06-26',
    time: '16:00',
    stadium: 'Lumen Field, Seattle',
    stage: 'group',
    isFinished: false
  },
  {
    id: 'm-b6',
    group: 'B',
    teamAId: 'aus',
    teamBId: 'ned',
    scoreA: null,
    scoreB: null,
    date: '2026-06-26',
    time: '16:00',
    stadium: 'Levi Stadium, San Francisco',
    stage: 'group',
    isFinished: false
  },

  // --- Group C ---
  {
    id: 'm-c1',
    group: 'C',
    teamAId: 'arg',
    teamBId: 'tun',
    scoreA: 2,
    scoreB: 0,
    date: '2026-06-13',
    time: '12:00',
    stadium: 'Lincoln Financial Field, Philadelphia',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-c2',
    group: 'C',
    teamAId: 'ksa',
    teamBId: 'swe',
    scoreA: 1,
    scoreB: 3,
    date: '2026-06-14',
    time: '16:00',
    stadium: 'Estadio BBVA, Monterrey',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-c3',
    group: 'C',
    teamAId: 'arg',
    teamBId: 'ksa',
    scoreA: 3,
    scoreB: 1,
    date: '2026-06-19',
    time: '19:00',
    stadium: 'SoFi Stadium, Los Angeles',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-c4',
    group: 'C',
    teamAId: 'swe',
    teamBId: 'tun',
    scoreA: 1,
    scoreB: 1,
    date: '2026-06-20',
    time: '14:00',
    stadium: 'MetLife Stadium, New York',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-c5',
    group: 'C',
    teamAId: 'swe',
    teamBId: 'arg',
    scoreA: null,
    scoreB: null,
    date: '2026-06-27',
    time: '15:00',
    stadium: 'Hard Rock Stadium, Miami',
    stage: 'group',
    isFinished: false
  },
  {
    id: 'm-c6',
    group: 'C',
    teamAId: 'tun',
    teamBId: 'ksa',
    scoreA: null,
    scoreB: null,
    date: '2026-06-27',
    time: '15:00',
    stadium: 'Estadio Akron, Guadalajara',
    stage: 'group',
    isFinished: false
  },

  // --- Group D (Currently Active on June 24, 2026!) ---
  {
    id: 'm-d1',
    group: 'D',
    teamAId: 'eng',
    teamBId: 'jpn',
    scoreA: 2,
    scoreB: 1,
    date: '2026-06-14',
    time: '19:00',
    stadium: 'Mercedes-Benz Stadium, Atlanta',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-d2',
    group: 'D',
    teamAId: 'ita',
    teamBId: 'egy',
    scoreA: 1,
    scoreB: 1,
    date: '2026-06-15',
    time: '15:00',
    stadium: 'BC Place, Vancouver',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-d3',
    group: 'D',
    teamAId: 'eng',
    teamBId: 'ita',
    scoreA: 2,
    scoreB: 2,
    date: '2026-06-20',
    time: '18:00',
    stadium: 'AT&T Stadium, Dallas',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-d4',
    group: 'D',
    teamAId: 'egy',
    teamBId: 'jpn',
    scoreA: 0,
    scoreB: 2,
    date: '2026-06-21',
    time: '12:00',
    stadium: 'Arrowhead Stadium, Kansas City',
    stage: 'group',
    isFinished: true
  },
  // Upcoming Match - NEXT MATCH - scheduled for Today / Tomorrow
  {
    id: 'm-d5',
    group: 'D',
    teamAId: 'egy',
    teamBId: 'eng',
    scoreA: null,
    scoreB: null,
    date: '2026-06-24', // Today!
    time: '19:30',
    stadium: 'SoFi Stadium, Los Angeles',
    stage: 'group',
    isFinished: false
  },
  {
    id: 'm-d6',
    group: 'D',
    teamAId: 'jpn',
    teamBId: 'ita',
    scoreA: null,
    scoreB: null,
    date: '2026-06-24', // Today!
    time: '19:30',
    stadium: 'Levi Stadium, San Francisco',
    stage: 'group',
    isFinished: false
  },

  // --- Group E ---
  {
    id: 'm-e1',
    group: 'E',
    teamAId: 'esp',
    teamBId: 'gha',
    scoreA: 3,
    scoreB: 0,
    date: '2026-06-15',
    time: '18:00',
    stadium: 'Gillette Stadium, Boston',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-e2',
    group: 'E',
    teamAId: 'ger',
    teamBId: 'col',
    scoreA: 2,
    scoreB: 1,
    date: '2026-06-16',
    time: '20:00',
    stadium: 'NRG Stadium, Houston',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-e3',
    group: 'E',
    teamAId: 'esp',
    teamBId: 'ger',
    scoreA: 1,
    scoreB: 1,
    date: '2026-06-21',
    time: '21:00',
    stadium: 'MetLife Stadium, New York',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-e4',
    group: 'E',
    teamAId: 'col',
    teamBId: 'gha',
    scoreA: 2,
    scoreB: 0,
    date: '2026-06-22',
    time: '16:00',
    stadium: 'Estadio BBVA, Monterrey',
    stage: 'group',
    isFinished: true
  },
  {
    id: 'm-e5',
    group: 'E',
    teamAId: 'col',
    teamBId: 'esp',
    scoreA: null,
    scoreB: null,
    date: '2026-06-28',
    time: '18:00',
    stadium: 'Lumen Field, Seattle',
    stage: 'group',
    isFinished: false
  },
  {
    id: 'm-e6',
    group: 'E',
    teamAId: 'gha',
    teamBId: 'ger',
    scoreA: null,
    scoreB: null,
    date: '2026-06-28',
    time: '18:00',
    stadium: 'BC Place, Vancouver',
    stage: 'group',
    isFinished: false
  }
];
