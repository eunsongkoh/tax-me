import { NewItem } from "@/models/NewItem";
import { ItemType } from "@/utils/ItemType";
import { TaxRates } from "@/utils/TaxRate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemState {
  items: NewItem[];
}

const initialState: ItemState = {
  items: ([] = [
    {
      price: 3.2,
      obj_name: "cheese",
      quantity: 4,
      itemType: ItemType.Produce,
      taxRate: 1 as keyof typeof TaxRates,
      id: 1234,
    },
    {
      price: 5.2,
      obj_name: "cheetos",
      quantity: 2,
      itemType: ItemType["Carbonated drinks, candies, snack foods"],
      taxRate: 1 as keyof typeof TaxRates,
      id: 2345,
    },
  ]),
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
  },
});

export const { addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
