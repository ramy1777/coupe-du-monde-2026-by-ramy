export interface Team {
  id: string;
  name: string;
  flag: string; // Emoji or SVG
  code: string; // e.g. FRA, BRA, SEN, ARG
}

export interface Group {
  id: string; // 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
  name: string; // 'Groupe A', etc.
  teams: string[]; // List of Team IDs
}

export interface GroupStanding {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number; // Goals For
  ga: number; // Goals Against
  gd: number; // Goal Difference
  pts: number; // Points
}

export interface ScorerEvent {
  player: string;
  assist?: string;
  minute: number;
}

export interface Match {
  id: string;
  group: string; // 'A', 'B', etc., or 'knockout'
  teamAId: string;
  teamBId: string;
  scoreA: number | null;
  scoreB: number | null;
  date: string; // e.g. "2026-06-25"
  time: string; // e.g. "18:00"
  stadium: string;
  stage: 'group' | 'r16' | 'qf' | 'sf' | 'final';
  isFinished: boolean;
  isLive?: boolean;
  scorers?: ScorerEvent[];
}

export interface Goalscorer {
  id: string;
  rank: number;
  name: string;
  teamFlag: string;
  teamCode: string;
  goals: number;
  assists: number;
}

export interface WidgetConfig {
  id: string;
  type: 'match' | 'group' | 'quick-actions';
  title: string;
  targetId: string; // Match ID or Group ID
}
