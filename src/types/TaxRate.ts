import { ItemType } from "./ItemType";

export const TaxRates = {
  [ItemType.Produce]: 0,
  [ItemType["Alcoholic Beverages"]]: 15,
  [ItemType["Carbonated drinks, candies, snack foods"]]: 5,
  [ItemType["Prepared Foods"]]: 5,
};
