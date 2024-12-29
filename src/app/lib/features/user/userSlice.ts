import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userId: null,
  purchases: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.userId = action.payload.userId;
      state.purchases = action.payload.purchases;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userId = null;
      state.purchases = [];
    },
    // addPurchase: (state, action) => {
    //   state.purchases.push(action.payload);
    // },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
