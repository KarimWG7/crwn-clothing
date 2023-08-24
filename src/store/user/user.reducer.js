import { createSlice } from "@reduxjs/toolkit";

const USER_INITIAL_STATE = { currentUser: null };

export const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      const { payload } = action;
      state.currentUser = payload;
    },
  },
});
export const userReducer = userSlice.reducer
export const {setCurrentUser} = userSlice.actions