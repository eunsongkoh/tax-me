import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemCount: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    initializeItemCount: (state, action) => {
      state.itemCount = action.payload;
    },
    increment: (state) => {
      state.itemCount += 1;
    },
    decrement: (state) => {
      state.itemCount -= 1;
    },
  },
});

export const { initializeItemCount, increment } = counterSlice.actions;
export default counterSlice.reducer;
