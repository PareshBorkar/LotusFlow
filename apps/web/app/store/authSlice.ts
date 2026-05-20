import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type AuthSession = {
  email: string;
  rememberMe: boolean;
  loggedInAt: string;
  permissions: string[];
};

type AuthState = {
  session: AuthSession | null;
  activeWorkspace: string;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  session: null,
  activeWorkspace: "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSucceeded: (
      state,
      action: PayloadAction<{
        session: AuthSession;
        activeWorkspace: string;
      }>,
    ) => {
      state.session = action.payload.session;
      state.activeWorkspace = action.payload.activeWorkspace;
      state.isLoading = false;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.session = null;
    },
    loggedOut: (state) => {
      state.session = null;
      state.activeWorkspace = "";
      state.error = null;
    },
    switchWorkspace: (state, action: PayloadAction<string>) => {
      state.activeWorkspace = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Selectors
export const selectSession = (state: RootState) => state.auth.session;
export const selectActiveWorkspace = (state: RootState) => state.auth.activeWorkspace;
export const selectIsAuthenticated = (state: RootState) => state.auth.session !== null;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUserEmail = (state: RootState) => state.auth.session?.email;

export const { loginStart, loginSucceeded, loginFailed, loggedOut, switchWorkspace, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
