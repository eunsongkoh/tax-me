import { NewItem } from "@/models/NewItem";
import { TaxRates } from "@/types/TaxRate";
import { useAppDispatch } from "@/app/hooks";
import {
  addItem,
  clearItems,
  decrementQuant,
  incrementQuant,
  removeItem,
} from "@/app/lib/features/items/itemSlice";

export function useAddItem() {
  const dispatch = useAppDispatch();

  const addNewItem = (
    price: number,
    itemName: string,
    quantity: number,
    itemType: number
  ) => {
    const taxRate = TaxRates[itemType as keyof typeof TaxRates];

    const newItem: NewItem = {
      price,
      obj_name: itemName,
      quantity,
      itemType,
      taxRate,
      id: Date.now(),
    };

    dispatch(addItem(newItem));
  };

  return { addNewItem };
}

export function useClearItems() {
  const dispatch = useAppDispatch();

  const clearAllItems = () => {
    dispatch(clearItems());
  };

  return { clearAllItems };
}

export function useRemoveItem() {
  const dispatch = useAppDispatch();
  const removeCurrentItem = (_id: number) => {
    dispatch(removeItem(_id));
  };

  return { removeCurrentItem };
}

export function useModifyQuant() {
  const dispatch = useAppDispatch();

  const incQuant = (_id: number) => {
    dispatch(incrementQuant(_id));
  };

  const decQuant = (_id: number) => {
    dispatch(decrementQuant(_id));
  };

  return { incQuant, decQuant };
}
