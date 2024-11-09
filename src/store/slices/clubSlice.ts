import { createSlice } from "@reduxjs/toolkit";
import { addNewClub, fetchClubs } from "../thunks/dataThunks";
import { Club } from "../../types";

interface ClubState {
  clubs: Club[];
  loading: boolean;
  addClubLoading: boolean;
  error: string | null;
  addClubError: string | null;
}

const initialState: ClubState = {
  clubs: [],
  loading: false,
  addClubLoading: false,
  error: null,
  addClubError: null,
};

const clubSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = action.payload;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading clubs";
      })
      .addCase(addNewClub.pending, (state) => {
        state.addClubLoading = true;
        state.addClubError = null;
      })
      .addCase(addNewClub.fulfilled, (state, action) => {
        state.addClubLoading = false;
        state.clubs.push(action.payload);
      })
      .addCase(addNewClub.rejected, (state, action) => {
        state.addClubLoading = false;
        state.addClubError = action.error.message || "Error adding club";
      });
  },
});

export const {} = clubSlice.actions;
export default clubSlice.reducer;
