// Modal definitions

export interface Club {
  id: string;
  name: string;
  logoUrl: string;
  country: string;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  clubHistory: ClubHistory[];
}

export interface Season {
  // we can add Id to Season if needed - avoided for simplicity
  startYear: number;
  endYear: number;
}

export interface ClubHistory {
  clubId: string;
  season: Season;
  number: number;
  stats: PlayerStats;
  // A player can play in one or more football clubs during a given season.
  // We consider that a player can be associated with multiple clubs in the same season,
  // with no constraints on the number of clubs they can play for simultaneously.
  // Therefore, the player can appear in multiple clubs, so there’s no need to add a joining date.

  //joinDate: Date;
}

export interface PlayerStats {
  goalsScored: number;
  matchesPlayed: number;
}
