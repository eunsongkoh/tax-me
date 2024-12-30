import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userId: null,
  purchases: [],
  userName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userId = action.payload.userId;
      state.purchases = action.payload.purchases;
      state.userName = action.payload.userName;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userId = null;
      state.purchases = [];
      state.userName = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
