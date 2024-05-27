import { authApi } from "../../services/authApi";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  currentUser: User | undefined;
  token: string | undefined;
}

const initialStateValue: UserState = {
  currentUser: undefined,
  token: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateValue,
  reducers: {
    resetUserReducer: () => initialStateValue,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        if (action.payload) {
          const { jwtToken, ...rest } = action.payload;
          state.currentUser = rest;
          state.token = jwtToken;
        }
      }
    );
  },
});

export const getCurrentUser = (state: RootState): User | undefined =>
  state.user.currentUser;
export const getCurrentUserToken = (state: RootState): User | undefined =>
  state.user.token;

export const { resetUserReducer } = userSlice.actions;

export default userSlice.reducer;
