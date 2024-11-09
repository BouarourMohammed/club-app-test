import { createAsyncThunk } from "@reduxjs/toolkit";
import { Club, Player, Season } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { delay } from "../../utils";

var clubs: Club[] = [
  {
    id: uuidv4(),
    name: "FC Barcelona",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/640px-FC_Barcelona_%28crest%29.svg.png",
    country: "Spain",
  },
  {
    id: uuidv4(),
    name: "Paris Saint-Germain",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png",
    country: "France",
  },
  {
    id: uuidv4(),
    name: "Real Madrid",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    country: "Spain",
  },
  {
    id: uuidv4(),
    name: "Manchester City",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    country: "England",
  },
  {
    id: uuidv4(),
    name: "Bayern Munich",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg",
    country: "Germany",
  },
];

const seasons: Season[] = [
  { startYear: 2022, endYear: 2023 },
  { startYear: 2023, endYear: 2024 },
];

const players: Player[] = [
  {
    id: uuidv4(),
    firstName: "Kylian",
    lastName: "Mbappé",
    clubHistory: [
      {
        clubId: clubs[1].id,
        season: seasons[1],
        number: 7,
        stats: {
          goalsScored: 25,
          matchesPlayed: 30,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    firstName: "Lionel",
    lastName: "Messi",
    clubHistory: [
      {
        clubId: clubs[0].id,
        season: seasons[0],
        number: 30,
        stats: {
          goalsScored: 15,
          matchesPlayed: 25,
        },
      },
      {
        clubId: clubs[2].id,
        season: seasons[1],
        number: 10,
        stats: {
          goalsScored: 20,
          matchesPlayed: 30,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    firstName: "Jude",
    lastName: "Bellingham",
    clubHistory: [
      {
        clubId: clubs[2].id,
        season: seasons[1],
        number: 5,
        stats: {
          goalsScored: 15,
          matchesPlayed: 28,
        },
      },
    ],
  },
  {
    id: uuidv4(),
    firstName: "Erling",
    lastName: "Haaland",
    clubHistory: [
      {
        clubId: clubs[3].id,
        season: seasons[1],
        number: 9,
        stats: {
          goalsScored: 30,
          matchesPlayed: 25,
        },
      },
    ],
  },
];

// Thunk for loading clubs
export const fetchClubs = createAsyncThunk("clubs/fetchClubs", async () => {
  try {
    // Simulate the delay for loading clubs
    await delay(1800);
    return clubs;
  } catch (error) {
    throw new Error("Failed to fetch clubs");
  }
});

// Thunk for loading players of a specific club
export const fetchClubPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async (clubId: string) => {
    try {
      // Simulate the delay for loading players
      await delay(1000);
      return players
        .filter((p) => p.clubHistory.some((h) => h.clubId === clubId))
        .map((p) => ({
          ...p,
          clubHistory: p.clubHistory.filter((h) => h.clubId === clubId),
        }));
    } catch (error) {
      throw new Error("Failed to fetch players");
    }
  }
);

// Thunk to add a club to the database
export const addNewClub = createAsyncThunk(
  "clubs/addClub",
  async (newClub: Club) => {
    try {
      clubs = [...clubs, newClub];
      return newClub;
    } catch (error) {
      console.error("Error adding club:", error);
      throw new Error("Failed to add club");
    }
  }
);
