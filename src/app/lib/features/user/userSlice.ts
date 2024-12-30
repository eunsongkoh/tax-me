import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userId: null,
  budget: 0,
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
      state.budget = action.payload.budget;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userId = null;
      state.purchases = [];
      state.userName = "";
    },
    updatePurchases: (state, action) => {
      console.log(action.payload.purchases);
      state.purchases = action.payload.purchases;
    },
    updateBudget: (state, action) => {
      state.budget = action.payload.budget;
    },
  },
});

export const { login, logout, updatePurchases, updateBudget } =
  userSlice.actions;
export default userSlice.reducer;
