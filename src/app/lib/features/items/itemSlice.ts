import { NewItem } from "@/models/NewItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemState {
  items: NewItem[];
  itemId: number;
}

const initialState: ItemState = {
  items: ([] = [
    // {
    //   price: 3.2,
    //   obj_name: "cheese",
    //   quantity: 4,
    //   itemType: ItemType.Produce,
    //   taxRate: 1 as keyof typeof TaxRates,
    //   id: 1234,
    // },
    // {
    //   price: 5.2,
    //   obj_name: "cheetos",
    //   quantity: 2,
    //   itemType: ItemType["Carbonated drinks, candies, snack foods"],
    //   taxRate: 1 as keyof typeof TaxRates,
    //   id: 2345,
    // },
  ]),
  // should change this to whatever our API returns
  itemId: 0,
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<NewItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementId: (state) => {
      state.itemId += 1;
    },
    decrementQuant: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },
    incrementQuant: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    clearItems: (state) => {
      return {
        ...state,
        items: [],
      };
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementId,
  incrementQuant,
  decrementQuant,
  clearItems,
} = itemSlice.actions;
export default itemSlice.reducer;
