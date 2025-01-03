import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  sessionBudget: 0,
};

const budgetSlice = createSlice({
  name: "sessionBudget",
  initialState,
  reducers: {
    updateSessionBudget: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        sessionBudget: action.payload,
      };
    },
  },
});

export const { updateSessionBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
