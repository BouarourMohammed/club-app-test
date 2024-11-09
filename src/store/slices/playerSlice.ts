import { createSlice } from "@reduxjs/toolkit";
import { fetchClubPlayers } from "../thunks/dataThunks";
import { Player } from "../../types";

interface PlayerState {
  players: Player[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayerState = {
  players: [],
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchClubPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading players";
      });
  },
});

export const { addPlayer } = playerSlice.actions;
export default playerSlice.reducer;
