import { taxRates } from "@/utils/itemType";

interface NewItem {
  price: number;
  obj_name: string;
  quantity: number;
  itemType: keyof typeof taxRates;
  taxRate: number;
}
