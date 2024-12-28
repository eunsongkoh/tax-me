import { NewItem } from "@/models/NewItem";
import { ItemType } from "@/types/ItemType";
import { TaxRates } from "@/types/TaxRate";
import { useAppDispatch } from "@/app/hooks";
import { addItem, removeItem } from "@/app/lib/features/items/itemSlice";
import { persistor } from "@/app/lib/store";

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

export function RemoveItem(_id: number) {
  const dispatch = useAppDispatch();
  dispatch(removeItem(_id));
}
