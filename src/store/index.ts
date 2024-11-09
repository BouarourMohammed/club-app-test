import { configureStore } from "@reduxjs/toolkit";
import clubReducer from "./slices/clubSlice";
import playerReducer from "./slices/playerSlice";

export const store = configureStore({
  reducer: {
    clubs: clubReducer,
    players: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
