import { Category } from "./productListTypes";

export interface FiltersType {
  text: string;
  category: Category | "Tutti";
  priceRange: number[];
}
