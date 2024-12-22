import { ItemType } from "@/utils/ItemType";
import { TaxRates } from "@/utils/TaxRate";

export interface NewItem {
  price: number;
  obj_name: string;
  quantity: number;
  itemType: keyof typeof ItemType;
  taxRate: typeof TaxRates;
}
