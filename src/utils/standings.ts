import { Match, GroupStanding, Group } from '../types';

export function calculateGroupStandings(
  matches: Match[],
  group: Group
): GroupStanding[] {
  // Initialize standings map for each team in the group
  const standingsMap: Record<string, GroupStanding> = {};
  
  group.teams.forEach((teamId) => {
    standingsMap[teamId] = {
      teamId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0,
    };
  });

  // Filter matches belonging to this group
  const groupMatches = matches.filter(
    (m) => m.group === group.id && m.scoreA !== null && m.scoreB !== null
  );

  groupMatches.forEach((match) => {
    const idA = match.teamAId;
    const idB = match.teamBId;
    const sA = match.scoreA as number;
    const sB = match.scoreB as number;

    // Verify both teams exist in the group standings map (to be safe)
    if (standingsMap[idA] && standingsMap[idB]) {
      standingsMap[idA].played += 1;
      standingsMap[idB].played += 1;
      standingsMap[idA].gf += sA;
      standingsMap[idA].ga += sB;
      standingsMap[idB].gf += sB;
      standingsMap[idB].ga += sA;

      if (sA > sB) {
        standingsMap[idA].won += 1;
        standingsMap[idA].pts += 3;
        standingsMap[idB].lost += 1;
      } else if (sA < sB) {
        standingsMap[idB].won += 1;
        standingsMap[idB].pts += 3;
        standingsMap[idA].lost += 1;
      } else {
        standingsMap[idA].drawn += 1;
        standingsMap[idA].pts += 1;
        standingsMap[idB].drawn += 1;
        standingsMap[idB].pts += 1;
      }
    }
  });

  // Recalculate goal difference and map to array
  const standings = Object.values(standingsMap).map((standing) => {
    standing.gd = standing.gf - standing.ga;
    return standing;
  });

  // Sort standings: Pts descending, then GD descending, then GF descending
  return standings.sort((a, b) => {
    if (b.pts !== a.pts) {
      return b.pts - a.pts;
    }
    if (b.gd !== a.gd) {
      return b.gd - a.gd;
    }
    return b.gf - a.gf;
  });
}
