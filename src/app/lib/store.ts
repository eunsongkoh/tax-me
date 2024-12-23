import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import itemReducer from "./features/items/itemSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      items: itemReducer,
    },
  });
};



export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
