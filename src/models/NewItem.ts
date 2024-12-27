import { ItemType } from "@/types/ItemType";
import { TaxRates } from "@/types/TaxRate";

export interface NewItem {
  price: number;
  obj_name: string;
  quantity: number;
  itemType: ItemType;
  taxRate: keyof typeof TaxRates;
  id: number;
}
